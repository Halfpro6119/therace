/**
 * Central deterministic grading engine.
 *
 * grade(question, userResponse) =>
 * {
 *   isCorrect,
 *   marksAwarded,
 *   maxMarks,
 *   feedback: { summary, correctAnswer, mistakeTags },
 *   normalizedUserAnswer
 * }
 */

import type { GradeResult, NormalizedQuestion, UserResponse } from './types'
import {
  mappingObjectToString,
  normalizeMappingString,
  normalizeMathNotation,
  safeLower,
  safeString,
  safeTrim,
  toStringArray,
} from './utils'

function emptyIsZero(text: string): boolean {
  return safeTrim(text).length === 0
}

/**
 * For algebra-type answers (e.g. "make r the subject", "solve for x"), allow optional
 * "variable=" prefix so "r=∛(3V/(4π))" is treated like "∛(3V/(4π))".
 * Strips a leading single-letter variable followed by "=" and returns the rest; otherwise returns original.
 */
function stripSubjectPrefix(text: string): string {
  const t = safeTrim(text)
  const m = t.match(/^\s*[a-zA-Z]\s*=\s*(.+)$/s)
  if (m && safeTrim(m[1]).length > 0) return safeTrim(m[1])
  return t
}

/** One row of a mark scheme: award marks if the answer contains any of the keywords or any of the key numbers. */
export interface MarkSchemeCriterion {
  keywords?: string[]
  keyNumbers?: (string | number)[]
  marks: number
}

function getShortConfig(q: NormalizedQuestion) {
  const qd = q.meta.questionData || {}
  return {
    caseSensitive: qd.caseSensitive === true,
    numericTolerance: typeof qd.numericTolerance === 'number' ? qd.numericTolerance : undefined,
    acceptEquivalentFractions: qd.acceptEquivalentFractions === true,
  }
}

function parseNumberOrNull(v: string): number | null {
  const n = Number(String(v).replace(/,/g, ''))
  return Number.isFinite(n) ? n : null
}

function fractionToNumberOrNull(v: string): number | null {
  // Supports "1/2" " 3 / 4 "
  const m = safeTrim(v).match(/^(-?\d+)\s*\/\s*(-?\d+)$/)
  if (!m) return null
  const num = Number(m[1])
  const den = Number(m[2])
  if (!Number.isFinite(num) || !Number.isFinite(den) || den === 0) return null
  return num / den
}

/** Parse a key number from config (string like "3/8" or "5/12", or number). */
function keyNumberToValue(k: string | number): number | null {
  if (typeof k === 'number' && Number.isFinite(k)) return k
  const s = safeTrim(String(k))
  const n = parseNumberOrNull(s) ?? fractionToNumberOrNull(s)
  return n
}

/** Extract numeric values from text (decimals and fractions like 3/8). */
function extractNumbersFromText(text: string): number[] {
  const out: number[] = []
  const t = safeTrim(text)
  // Fractions: 3/8, 5/12, -1/2
  const fracRegex = /(-?\d+)\s*\/\s*(-?\d+)/g
  let m: RegExpExecArray | null
  while ((m = fracRegex.exec(t)) !== null) {
    const num = Number(m[1])
    const den = Number(m[2])
    if (Number.isFinite(num) && Number.isFinite(den) && den !== 0) out.push(num / den)
  }
  // Decimals and integers (avoid matching digits that are part of fractions)
  const numberRegex = /(?<!\d)-?\d+\.?\d*(?!\s*\/)/g
  while ((m = numberRegex.exec(t)) !== null) {
    const n = parseFloat(m[0])
    if (Number.isFinite(n)) out.push(n)
  }
  return out
}

const MARK_SCHEME_NUMERIC_TOLERANCE = 0.3

/** Normalized direction keywords for transformation-style short answers (e.g. "translation 3 right"). */
const DIRECTION_WORDS = ['right', 'left', 'up', 'down'] as const
type DirectionWord = (typeof DIRECTION_WORDS)[number]

/**
 * Parse transformation-style answer into key units: numbers and directions.
 * Used so "3 spaces right" gets credit when answer is "translation 3 right".
 * Returns null if text doesn't look like a transformation (so we don't override other grading).
 */
function parseTransformationUnits(text: string): { numbers: number[]; directions: DirectionWord[] } | null {
  const t = safeTrim(text)
  if (!t) return null
  const lower = safeLower(t)
  const numbers = extractNumbersFromText(t)
  const directions: DirectionWord[] = []
  // Match "right", "left", "up", "down" as whole words or after "spaces"/"units" (e.g. "3 spaces right")
  for (const d of DIRECTION_WORDS) {
    const wordBoundary = new RegExp(`\\b${d}\\b`, 'i')
    const afterSpaces = new RegExp(`(?:spaces|units|to the)\\s+${d}`, 'i')
    if (wordBoundary.test(lower) || afterSpaces.test(lower)) directions.push(d)
  }
  // Only use for answers that have at least one number or one direction (transformation-like)
  if (numbers.length === 0 && directions.length === 0) return null
  return { numbers, directions }
}

/** True if user's units cover all accepted units (same numbers within tolerance, same directions). */
function transformationUnitsMatch(
  accepted: { numbers: number[]; directions: DirectionWord[] },
  user: { numbers: number[]; directions: DirectionWord[] },
  tolerance: number = MARK_SCHEME_NUMERIC_TOLERANCE
): boolean {
  const userDirSet = new Set(user.directions)
  for (const d of accepted.directions) {
    if (!userDirSet.has(d)) return false
  }
  const used = new Set<number>()
  for (const an of accepted.numbers) {
    let found = false
    for (let j = 0; j < user.numbers.length; j++) {
      if (used.has(j)) continue
      if (Math.abs(user.numbers[j] - an) <= tolerance) {
        used.add(j)
        found = true
        break
      }
    }
    if (!found) return false
  }
  return true
}

/** Stopwords excluded when extracting content words for describe/explain key-units. */
const CONTENT_STOPWORDS = new Set([
  'a', 'an', 'the', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did',
  'in', 'on', 'at', 'to', 'for', 'of', 'and', 'or', 'but', 'by', 'with', 'from', 'as', 'it', 'its', 'this', 'that',
  'these', 'those', 'i', 'you', 'he', 'she', 'we', 'they', 'what', 'which', 'who', 'when', 'where', 'how',
])

/** Min length for a token to count as a content word (avoids single letters like x, y in algebra). */
const MIN_CONTENT_WORD_LENGTH = 2

/**
 * Extract significant (content) words from text for key-units grading: lowercase, split on non-alphanumeric,
 * drop stopwords and short tokens. Used so "it shows positive correlation" matches accepted "positive correlation".
 */
function extractContentWords(text: string): string[] {
  const t = safeTrim(text)
  if (!t) return []
  const lower = safeLower(t)
  const tokens = lower.split(/[\s,;:!?()\[\]{}]+/).filter(Boolean)
  const out: string[] = []
  const seen = new Set<string>()
  for (const w of tokens) {
    const clean = w.replace(/^\W+|\W+$/g, '')
    if (clean.length < MIN_CONTENT_WORD_LENGTH) continue
    if (CONTENT_STOPWORDS.has(clean)) continue
    if (!seen.has(clean)) {
      seen.add(clean)
      out.push(clean)
    }
  }
  return out
}

/** Key units parsed from a short/describe/explain answer: numbers, directions, and content words. */
export interface KeyUnits {
  numbers: number[]
  directions: DirectionWord[]
  contentWords: string[]
}

/**
 * Parse any short/describe/explain answer into key units (numbers, directions, content words).
 * Used for units-based grading across all such questions.
 */
function parseKeyUnits(text: string): KeyUnits {
  const t = safeTrim(text)
  const numbers = extractNumbersFromText(t)
  const lower = safeLower(t)
  const directions: DirectionWord[] = []
  for (const d of DIRECTION_WORDS) {
    const wordBoundary = new RegExp(`\\b${d}\\b`, 'i')
    const afterSpaces = new RegExp(`(?:spaces|units|to the)\\s+${d}`, 'i')
    if (wordBoundary.test(lower) || afterSpaces.test(lower)) directions.push(d)
  }
  const contentWords = extractContentWords(t)
  return { numbers, directions, contentWords }
}

/**
 * Synonyms for transformation-description content words so answers like "flipped and doubled"
 * are accepted when the model answer is "enlargement scale factor 2, reflection".
 */
const TRANSFORMATION_WORD_SYNONYMS: Record<string, string[]> = {
  reflection: ['reflection', 'reflect', 'reflected', 'flip', 'flipped'],
  enlargement: ['enlargement', 'enlarge', 'enlarged', 'doubled', 'double', 'twice', 'scaled', 'scale'],
  scale: ['scale', 'scaled', 'scaling', 'doubled', 'double', 'twice'],
  factor: ['factor', 'doubled', 'double', 'twice'],
  centre: ['centre', 'center', 'origin'],
}

/** Words that can satisfy scale factor 2 when the accepted answer expects 2 (e.g. enlargement scale factor 2). */
const SCALE_FACTOR_TWO_WORDS = /\b(doubled|double|twice|two)\b/i

/** True if accepted answer looks like a transformation description (enlargement/reflection/scale factor). */
function isTransformationDescription(acceptedRaw: string): boolean {
  const lower = safeLower(acceptedRaw)
  return (
    lower.includes('reflection') ||
    lower.includes('enlargement') ||
    lower.includes('scale factor') ||
    (lower.includes('scale') && lower.includes('factor'))
  )
}

/** True if user text matches an accepted content word (exact or transformation synonym). */
function contentWordMatches(
  acceptedWord: string,
  userLower: string,
  acceptedRaw: string
): boolean {
  if (userLower.includes(acceptedWord)) return true
  const synonyms = TRANSFORMATION_WORD_SYNONYMS[acceptedWord]
  if (synonyms) {
    for (const syn of synonyms) {
      if (userLower.includes(syn)) return true
    }
  }
  return false
}

/** For transformation answers, centre is optional when reflection + enlargement are the main idea. */
function isCentreOptional(accepted: KeyUnits, acceptedRaw: string): boolean {
  if (!isTransformationDescription(acceptedRaw)) return false
  const lower = safeLower(acceptedRaw)
  const hasReflection = lower.includes('reflection') || lower.includes('reflected')
  const hasEnlargement = lower.includes('enlargement') || lower.includes('scale factor')
  return hasReflection && hasEnlargement
}

/** True when the accepted answer is the two-part type: reflection + enlargement scale factor 2 (e.g. scale factor −2). */
function isTwoPartReflectionEnlargement(acceptedRaw: string): boolean {
  const lower = safeLower(acceptedRaw)
  const hasReflection = lower.includes('reflection') || lower.includes('reflected')
  const hasScaleFactor2 =
    lower.includes('scale factor 2') ||
    (lower.includes('scale factor') && /\b2\b/.test(acceptedRaw)) ||
    (extractNumbersFromText(acceptedRaw).some(n => Math.abs(n - 2) <= MARK_SCHEME_NUMERIC_TOLERANCE) &&
      (lower.includes('enlargement') || lower.includes('scale')))
  return hasReflection && hasScaleFactor2
}

/** Words that indicate reflection/flip (Idea 1). */
const REFLECTION_INDICATORS = /\b(reflection|reflect|reflected|flip|flipped)\b/i
/** Words/numbers that indicate scale factor 2 / doubled (Idea 2). */
function hasScaleFactorTwo(userRaw: string): boolean {
  const lower = safeLower(userRaw)
  if (SCALE_FACTOR_TWO_WORDS.test(userRaw)) return true
  const nums = extractNumbersFromText(userRaw)
  return nums.some(n => Math.abs(n - 2) <= MARK_SCHEME_NUMERIC_TOLERANCE)
}
function hasReflection(userRaw: string): boolean {
  return REFLECTION_INDICATORS.test(userRaw)
}

/**
 * Score a two-part transformation (reflection + enlargement scale factor 2).
 * Idea 1: shape is flipped/reflected. Idea 2: shape is doubled/twice the size.
 * Returns marks: 0, half of maxMarks (one idea), or maxMarks (both).
 */
function scoreTwoPartTransformation(
  userRaw: string,
  _acceptedRaw: string,
  maxMarks: number
): { idea1: boolean; idea2: boolean; marksAwarded: number } {
  const idea1 = hasReflection(userRaw)
  const idea2 = hasScaleFactorTwo(userRaw)
  const ideasCorrect = (idea1 ? 1 : 0) + (idea2 ? 1 : 0)
  const marksAwarded = ideasCorrect === 0 ? 0 : (maxMarks * ideasCorrect) / 2
  return { idea1, idea2, marksAwarded }
}

/** True if user's answer contains all key units from the accepted answer (numbers, directions, content words). */
function keyUnitsMatch(
  accepted: KeyUnits,
  user: KeyUnits,
  userRawText: string,
  tolerance: number = MARK_SCHEME_NUMERIC_TOLERANCE,
  acceptedRawText?: string
): boolean {
  const userLower = safeLower(userRawText)
  const acceptedRaw = acceptedRawText ?? ''
  const transformationStyle = isTransformationDescription(acceptedRaw)
  const centreOptional = transformationStyle && isCentreOptional(accepted, acceptedRaw)

  for (const word of accepted.contentWords) {
    if (centreOptional && (word === 'centre' || word === 'center')) continue
    if (transformationStyle) {
      if (!contentWordMatches(word, userLower, acceptedRaw)) return false
    } else {
      if (!userLower.includes(word)) return false
    }
  }
  const userDirSet = new Set(user.directions)
  for (const d of accepted.directions) {
    if (!userDirSet.has(d)) return false
  }
  // When centre is optional (e.g. reflection + enlargement), don't require matching (0,0) coordinates
  const numbersToMatch = centreOptional
    ? accepted.numbers.filter(n => Math.abs(n) > tolerance)
    : accepted.numbers
  const used = new Set<number>()
  for (const an of numbersToMatch) {
    let found = false
    for (let j = 0; j < user.numbers.length; j++) {
      if (used.has(j)) continue
      if (Math.abs(user.numbers[j] - an) <= tolerance) {
        used.add(j)
        found = true
        break
      }
    }
    // For transformation descriptions, "doubled"/"twice" etc. can satisfy scale factor 2
    if (!found && transformationStyle && Math.abs(an - 2) <= tolerance && SCALE_FACTOR_TWO_WORDS.test(userRawText)) {
      found = true
    }
    if (!found) return false
  }
  return true
}

/** True when we should try key-units grading for this accepted answer (has at least one unit). */
function acceptedHasKeyUnits(units: KeyUnits): boolean {
  return (
    units.numbers.length > 0 ||
    units.directions.length > 0 ||
    units.contentWords.length > 0
  )
}

/** Grade short/proofShort using mark scheme: sum marks for each criterion matched by keywords or key numbers. */
function gradeShortWithMarkScheme(
  q: NormalizedQuestion,
  raw: string,
  maxMarks: number,
  caseSensitive: boolean
): GradeResult {
  const qd = q.meta.questionData || {}
  const scheme = Array.isArray(qd.markScheme) ? (qd.markScheme as MarkSchemeCriterion[]) : []
  if (scheme.length === 0) {
    return {
      isCorrect: false,
      marksAwarded: 0,
      maxMarks,
      feedback: {
        summary: 'Mark scheme not configured.',
        correctAnswer: q.answersAccepted[0] || '',
        mistakeTags: ['invalid'],
      },
      normalizedUserAnswer: { text: raw },
    }
  }

  const normText = caseSensitive ? safeTrim(raw) : safeLower(raw)
  const userNumbers = extractNumbersFromText(raw)
  let totalMarks = 0

  for (const row of scheme) {
    const marks = typeof row.marks === 'number' && row.marks >= 0 ? row.marks : 0
    if (marks === 0) continue

    let matched = false
    if (Array.isArray(row.keywords) && row.keywords.length > 0) {
      for (const kw of row.keywords) {
        const k = caseSensitive ? safeTrim(String(kw)) : safeLower(String(kw))
        if (k && normText.includes(k)) {
          matched = true
          break
        }
      }
    }
    if (!matched && Array.isArray(row.keyNumbers) && row.keyNumbers.length > 0) {
      const expectedValues = row.keyNumbers
        .map(k => keyNumberToValue(k))
        .filter((n): n is number => n !== null)
      for (const ev of expectedValues) {
        for (const un of userNumbers) {
          if (Math.abs(un - ev) <= MARK_SCHEME_NUMERIC_TOLERANCE) {
            matched = true
            break
          }
        }
        if (matched) break
      }
    }
    if (matched) totalMarks += marks
  }

  const marksAwarded = Math.min(totalMarks, maxMarks)
  const isCorrect = marksAwarded >= maxMarks
  const correctAnswer = q.answersAccepted[0] || '(see mark scheme)'

  return {
    isCorrect,
    marksAwarded,
    maxMarks,
    feedback: {
      summary:
        marksAwarded >= maxMarks
          ? `Correct (+${marksAwarded}/${maxMarks}).`
          : marksAwarded > 0
            ? `Partially correct (+${marksAwarded}/${maxMarks}).`
            : `No key points matched (0/${maxMarks}).`,
      correctAnswer,
      mistakeTags: isCorrect ? [] : marksAwarded > 0 ? ['partial'] : ['mismatch'],
    },
    normalizedUserAnswer: { text: raw },
  }
}

function gradeShort(q: NormalizedQuestion, r: Extract<UserResponse, { type: 'short' }>): GradeResult {
  const cfg = getShortConfig(q)
  const maxMarks = q.marks

  const raw = safeTrim(r.text)
  if (emptyIsZero(raw)) {
    return {
      isCorrect: false,
      marksAwarded: 0,
      maxMarks,
      feedback: {
        summary: 'No answer given.',
        correctAnswer: q.answersAccepted[0] || '',
        mistakeTags: ['empty'],
      },
      normalizedUserAnswer: { text: '' },
    }
  }

  // For algebra-type answers (e.g. make x the subject, solve for x), allow optional "x=" prefix
  const comparisonText = stripSubjectPrefix(raw)

  // Mark scheme: award marks by keywords/key numbers (for proofShort and open-ended short)
  const qd = q.meta.questionData || {}
  const scheme = Array.isArray(qd.markScheme) ? qd.markScheme : []
  if (scheme.length > 0) {
    return gradeShortWithMarkScheme(q, raw, maxMarks, cfg.caseSensitive)
  }

  const accepted = q.answersAccepted

  // Numeric tolerance
  if (cfg.numericTolerance !== undefined) {
    const userN = parseNumberOrNull(comparisonText) ?? fractionToNumberOrNull(comparisonText)
    if (userN !== null) {
      for (const a of accepted) {
        const aStripped = stripSubjectPrefix(a)
        const an = parseNumberOrNull(aStripped) ?? fractionToNumberOrNull(aStripped)
        if (an === null) continue
        if (Math.abs(userN - an) <= cfg.numericTolerance) {
          return {
            isCorrect: true,
            marksAwarded: maxMarks,
            maxMarks,
            feedback: {
              summary: `Correct (+${maxMarks}/${maxMarks}).`,
              correctAnswer: a,
              mistakeTags: [],
            },
            normalizedUserAnswer: { text: raw },
          }
        }
      }
    }
  }

  // Equivalent fractions (optional)
  if (cfg.acceptEquivalentFractions) {
    const userFrac = fractionToNumberOrNull(comparisonText)
    if (userFrac !== null) {
      for (const a of accepted) {
        const afrac = fractionToNumberOrNull(stripSubjectPrefix(a))
        if (afrac !== null && userFrac === afrac) {
          return {
            isCorrect: true,
            marksAwarded: maxMarks,
            maxMarks,
            feedback: {
              summary: `Correct (+${maxMarks}/${maxMarks}).`,
              correctAnswer: a,
              mistakeTags: [],
            },
            normalizedUserAnswer: { text: raw },
          }
        }
      }
    }
  }

  // Interval-equivalence: accept same bounds regardless of variable letter (e.g. 3.445≤x<3.455 vs 3.445≤m<3.455)
  const userInterval = parseIntervalWithAnyVariable(comparisonText)
  if (userInterval) {
    for (const a of accepted) {
      const acceptedInterval = parseIntervalWithAnyVariable(stripSubjectPrefix(a))
      if (acceptedInterval && intervalsEqual(userInterval, acceptedInterval)) {
        return {
          isCorrect: true,
          marksAwarded: maxMarks,
          maxMarks,
          feedback: {
            summary: `Correct (+${maxMarks}/${maxMarks}).`,
            correctAnswer: a,
            mistakeTags: [],
          },
          normalizedUserAnswer: { text: raw },
        }
      }
    }
  }

  // Order-independent product of factors (e.g. prime factorisation: 2²×5×3² same as 2²×3²×5)
  const userFactors = parseProductOfFactors(comparisonText)
  if (userFactors) {
    for (const a of accepted) {
      const acceptedFactors = parseProductOfFactors(stripSubjectPrefix(a))
      if (acceptedFactors && productOfFactorsEqual(userFactors, acceptedFactors)) {
        return {
          isCorrect: true,
          marksAwarded: maxMarks,
          maxMarks,
          feedback: {
            summary: `Correct (+${maxMarks}/${maxMarks}).`,
            correctAnswer: q.answersAccepted[0] || a,
            mistakeTags: [],
          },
          normalizedUserAnswer: { text: raw },
        }
      }
    }
  }

  // Order-independent product of algebraic factors (e.g. factorise: (x+5)(x+4) same as (x+4)(x+5))
  const userAlgebraicFactors = extractParenthesisedFactors(comparisonText)
  if (userAlgebraicFactors) {
    for (const a of accepted) {
      const acceptedAlgebraicFactors = extractParenthesisedFactors(stripSubjectPrefix(a))
      if (
        acceptedAlgebraicFactors &&
        productOfAlgebraicFactorsEqual(userAlgebraicFactors, acceptedAlgebraicFactors)
      ) {
        return {
          isCorrect: true,
          marksAwarded: maxMarks,
          maxMarks,
          feedback: {
            summary: `Correct (+${maxMarks}/${maxMarks}).`,
            correctAnswer: q.answersAccepted[0] || a,
            mistakeTags: [],
          },
          normalizedUserAnswer: { text: raw },
        }
      }
    }
  }

  // Units-based grading for transformation/describe-style short answers: award marks when the user
  // includes the same key units (numbers and directions) as the model answer, e.g. "3 spaces right"
  // matches "translation 3 right" (both have 3 and right). Only trigger when the model answer
  // contains a direction word (right/left/up/down) so we don't match coordinate-style answers.
  if (accepted.length === 1 && maxMarks >= 1) {
    const acceptedUnits = parseTransformationUnits(accepted[0])
    if (acceptedUnits && acceptedUnits.directions.length > 0) {
      const userUnits = parseTransformationUnits(raw)
      if (
        userUnits &&
        transformationUnitsMatch(acceptedUnits, userUnits, MARK_SCHEME_NUMERIC_TOLERANCE)
      ) {
        return {
          isCorrect: true,
          marksAwarded: maxMarks,
          maxMarks,
          feedback: {
            summary: `Correct (+${maxMarks}/${maxMarks}).`,
            correctAnswer: q.answersAccepted[0] || '',
            mistakeTags: [],
          },
          normalizedUserAnswer: { text: raw },
        }
      }
    }
  }

  // Two-part transformation (reflection + enlargement scale factor 2): award partial marks for each idea.
  // Idea 1: flipped/reflected. Idea 2: doubled/twice the size. Run before full key-units so partial is possible.
  if (maxMarks >= 1 && accepted.length >= 1) {
    const acceptedStripped = stripSubjectPrefix(accepted[0])
    if (isTwoPartReflectionEnlargement(acceptedStripped)) {
      const { idea1, idea2, marksAwarded } = scoreTwoPartTransformation(raw, acceptedStripped, maxMarks)
      const isCorrect = marksAwarded >= maxMarks
      const summary =
        isCorrect
          ? `Correct (+${marksAwarded}/${maxMarks}).`
          : marksAwarded > 0
            ? `Partially correct (+${marksAwarded}/${maxMarks}).`
            : `Incorrect (0/${maxMarks}).`
      return {
        isCorrect,
        marksAwarded,
        maxMarks,
        feedback: {
          summary,
          correctAnswer: q.answersAccepted[0] || '',
          mistakeTags: isCorrect ? [] : marksAwarded > 0 ? ['partial'] : ['mismatch'],
        },
        normalizedUserAnswer: { text: raw },
      }
    }
  }

  // General units-based grading for all short/describe/explain: if the user's answer contains all
  // key units (numbers, directions, content words) from any one accepted answer, award full marks.
  // Applies to single or multiple accepted answers (e.g. "positive" / "positive correlation").
  if (maxMarks >= 1) {
    const userUnits = parseKeyUnits(raw)
    for (const a of accepted) {
      const acceptedStripped = stripSubjectPrefix(a)
      const acceptedUnits = parseKeyUnits(acceptedStripped)
      if (!acceptedHasKeyUnits(acceptedUnits)) continue
      if (keyUnitsMatch(acceptedUnits, userUnits, raw, MARK_SCHEME_NUMERIC_TOLERANCE, acceptedStripped)) {
        return {
          isCorrect: true,
          marksAwarded: maxMarks,
          maxMarks,
          feedback: {
            summary: `Correct (+${maxMarks}/${maxMarks}).`,
            correctAnswer: q.answersAccepted[0] || '',
            mistakeTags: [],
          },
          normalizedUserAnswer: { text: raw },
        }
      }
    }
  }

  // Text compare (normalize math notation so e.g. * and × match); accept with or without variable= prefix
  const mathNorm = (s: string) => normalizeMathNotation(cfg.caseSensitive ? safeTrim(s) : safeLower(s))
  const normUser = mathNorm(comparisonText)
  const normAccepted = accepted.map(a => mathNorm(stripSubjectPrefix(a)))

  const ok = normAccepted.includes(normUser)

  return {
    isCorrect: ok,
    marksAwarded: ok ? maxMarks : 0,
    maxMarks,
    feedback: {
      summary: ok ? `Correct (+${maxMarks}/${maxMarks}).` : `Incorrect (0/${maxMarks}).`,
      correctAnswer: q.answersAccepted[0] || '',
      mistakeTags: ok ? [] : ['mismatch'],
    },
    normalizedUserAnswer: { text: raw },
  }
}

function gradeMcq(q: NormalizedQuestion, r: Extract<UserResponse, { type: 'mcq' }>): GradeResult {
  const maxMarks = q.marks
  const key = safeTrim(r.selectedKey)
  if (!key) {
    return {
      isCorrect: false,
      marksAwarded: 0,
      maxMarks,
      feedback: {
        summary: 'No option selected.',
        correctAnswer: q.answersAccepted[0] || '',
        mistakeTags: ['empty'],
      },
      normalizedUserAnswer: { selectedKey: '' },
    }
  }

  const acceptedKeys = q.answersAccepted.map(a => safeTrim(a))
  const ok = acceptedKeys.includes(key)

  return {
    isCorrect: ok,
    marksAwarded: ok ? maxMarks : 0,
    maxMarks,
    feedback: {
      summary: ok ? `Correct (+${maxMarks}/${maxMarks}).` : `Incorrect (0/${maxMarks}).`,
      correctAnswer: acceptedKeys.join(', '),
      mistakeTags: ok ? [] : ['mismatch'],
    },
    normalizedUserAnswer: { selectedKey: key },
  }
}

function gradeFill(q: NormalizedQuestion, r: Extract<UserResponse, { type: 'fill' }>): GradeResult {
  const maxMarks = q.marks
  const qd = q.meta.questionData || {}
  const blanks = typeof qd.blanks === 'number' && qd.blanks >= 1 ? qd.blanks : 1

  const userBlanks = Array.isArray(r.blanks) ? r.blanks.map(b => safeTrim(b)) : []

  // Anti-cheese: if all blanks empty => 0
  if (userBlanks.every(b => !b)) {
    return {
      isCorrect: false,
      marksAwarded: 0,
      maxMarks,
      feedback: {
        summary: 'No answers provided.',
        correctAnswer: q.answersAccepted[0] || '',
        mistakeTags: ['empty'],
      },
      normalizedUserAnswer: { blanks: userBlanks },
    }
  }

  // Determine marking scheme (normalize math notation so e.g. * and × match)
  const norm = (a: string) => safeLower(normalizeMathNotation(a))
  const acceptedPerBlank: string[][] | null = Array.isArray(qd.acceptedPerBlank)
    ? qd.acceptedPerBlank.map((arr: any) => toStringArray(arr).map(a => norm(a)))
    : null

  const acceptedComposite: string[] | null = Array.isArray(qd.acceptedComposite)
    ? toStringArray(qd.acceptedComposite).map(a => norm(a))
    : null

  // Partial marks: by blank
  const perBlankMax = maxMarks / blanks
  let correctCount = 0

  for (let i = 0; i < blanks; i++) {
    const u = norm(userBlanks[i] || '')
    if (!u) continue

    if (acceptedPerBlank && Array.isArray(acceptedPerBlank[i])) {
      if (acceptedPerBlank[i].includes(u)) correctCount += 1
      continue
    }

    // Fallback: if acceptedComposite exists, accept any composite entry
    if (acceptedComposite && acceptedComposite.includes(u)) {
      correctCount += 1
      continue
    }

    // Final fallback: answersAccepted
    const fallbackAccepted = q.answersAccepted.map(a => norm(a))
    if (fallbackAccepted.includes(u)) correctCount += 1
  }

  const marksAwarded = Math.max(0, Math.min(maxMarks, Math.round(correctCount * perBlankMax)))
  const isCorrect = correctCount === blanks

  return {
    isCorrect,
    marksAwarded,
    maxMarks,
    feedback: {
      summary: isCorrect
        ? `Correct (+${maxMarks}/${maxMarks}).`
        : `Partially correct (+${marksAwarded}/${maxMarks}).`,
      correctAnswer: q.answersAccepted.join(', '),
      mistakeTags: isCorrect ? [] : ['partial'],
    },
    normalizedUserAnswer: { blanks: userBlanks },
  }
}

function gradeMatch(q: NormalizedQuestion, r: Extract<UserResponse, { type: 'match' }>): GradeResult {
  const maxMarks = q.marks

  const userString = mappingObjectToString(r.mapping || {})
  if (!userString) {
    return {
      isCorrect: false,
      marksAwarded: 0,
      maxMarks,
      feedback: {
        summary: 'No matches provided.',
        correctAnswer: q.answersAccepted[0] || '',
        mistakeTags: ['empty'],
      },
      normalizedUserAnswer: { mapping: {} },
    }
  }

  const correct = normalizeMappingString(q.answersAccepted[0] || '')
  const user = normalizeMappingString(userString)

  // Partial marks per correctly matched pair
  const correctPairs = new Set(correct.split(',').filter(Boolean))
  const userPairs = user.split(',').filter(Boolean)
  const correctCount = userPairs.filter(p => correctPairs.has(p)).length
  const totalPairs = Math.max(1, correctPairs.size)

  const perPairMax = maxMarks / totalPairs
  const marksAwarded = Math.max(0, Math.min(maxMarks, Math.round(correctCount * perPairMax)))
  const isCorrect = correctCount === correctPairs.size

  return {
    isCorrect,
    marksAwarded,
    maxMarks,
    feedback: {
      summary: isCorrect
        ? `Correct (+${maxMarks}/${maxMarks}).`
        : `Partially correct (+${marksAwarded}/${maxMarks}).`,
      correctAnswer: correct,
      mistakeTags: isCorrect ? [] : ['partial'],
    },
    normalizedUserAnswer: { mapping: r.mapping, mappingString: user },
  }
}

function gradeLabel(q: NormalizedQuestion, r: Extract<UserResponse, { type: 'label' }>): GradeResult {
  const maxMarks = q.marks
  const qd = q.meta.questionData || {}
  const targets = Array.isArray(qd.targets) ? qd.targets : []

  if (!targets.length) {
    return {
      isCorrect: false,
      marksAwarded: 0,
      maxMarks,
      feedback: {
        summary: 'Unable to grade this question (missing targets).',
        correctAnswer: '',
        mistakeTags: ['invalid'],
      },
      normalizedUserAnswer: { placements: r.placements || {} },
    }
  }

  const placements = r.placements || {}

  // Anti-cheese: none placed => 0
  if (!Object.values(placements).some(v => safeTrim(v))) {
    return {
      isCorrect: false,
      marksAwarded: 0,
      maxMarks,
      feedback: {
        summary: 'No labels placed.',
        correctAnswer: '',
        mistakeTags: ['empty'],
      },
      normalizedUserAnswer: { placements },
    }
  }

  const perTargetMax = maxMarks / targets.length
  let correctCount = 0

  for (const t of targets) {
    const tid = safeString(t?.id)
    const expected = safeString(t?.correctLabelId)
    const actual = safeString(placements[tid])
    if (!tid || !expected) continue
    if (actual && actual === expected) correctCount += 1
  }

  const marksAwarded = Math.max(0, Math.min(maxMarks, Math.round(correctCount * perTargetMax)))
  const isCorrect = correctCount === targets.length

  const correctAnswer = targets
    .map((t: any) => `${safeString(t.id)}→${safeString(t.correctLabelId)}`)
    .join(', ')

  return {
    isCorrect,
    marksAwarded,
    maxMarks,
    feedback: {
      summary: isCorrect
        ? `Correct (+${maxMarks}/${maxMarks}).`
        : `Partially correct (+${marksAwarded}/${maxMarks}).`,
      correctAnswer,
      mistakeTags: isCorrect ? [] : ['partial'],
    },
    normalizedUserAnswer: { placements },
  }
}

function gradeNumeric(q: NormalizedQuestion, r: Extract<UserResponse, { type: 'numeric' }>): GradeResult {
  const maxMarks = q.marks
  const qd = q.meta?.questionData || {}
  const tolerance = typeof qd.tolerance === 'number' ? qd.tolerance : typeof qd.numericTolerance === 'number' ? qd.numericTolerance : 0
  const raw = safeTrim(r.text)
  if (emptyIsZero(raw)) {
    return {
      isCorrect: false,
      marksAwarded: 0,
      maxMarks,
      feedback: {
        summary: 'No answer given.',
        correctAnswer: q.answersAccepted[0] || '',
        mistakeTags: ['empty'],
      },
      normalizedUserAnswer: { text: '' },
    }
  }
  // Allow "x=7" etc. for algebra-type numeric questions (e.g. Solve 4x − 7 = 21)
  const comparisonText = stripSubjectPrefix(raw)
  const userN = parseNumberOrNull(comparisonText) ?? fractionToNumberOrNull(comparisonText)
  if (userN === null) {
    // Accept symbolic answers that match exactly (e.g. "49π" when correct answer is "49π")
    const norm = (s: string) => normalizeMathNotation(safeLower(safeTrim(s)))
    const normUser = norm(comparisonText)
    const accepted = q.answersAccepted
    for (const a of accepted) {
      const normAccepted = norm(stripSubjectPrefix(a))
      if (normUser === normAccepted) {
        return {
          isCorrect: true,
          marksAwarded: maxMarks,
          maxMarks,
          feedback: {
            summary: `Correct (+${maxMarks}/${maxMarks}).`,
            correctAnswer: a,
            mistakeTags: [],
          },
          normalizedUserAnswer: { text: raw },
        }
      }
    }
    return {
      isCorrect: false,
      marksAwarded: 0,
      maxMarks,
      feedback: {
        summary: 'Please enter a number.',
        correctAnswer: q.answersAccepted[0] || '',
        mistakeTags: ['invalid'],
      },
      normalizedUserAnswer: { text: raw },
    }
  }
  const accepted = q.answersAccepted
  for (const a of accepted) {
    const aStripped = stripSubjectPrefix(a)
    const an = parseNumberOrNull(aStripped) ?? fractionToNumberOrNull(aStripped)
    if (an === null) continue
    if (Math.abs(userN - an) <= tolerance) {
      return {
        isCorrect: true,
        marksAwarded: maxMarks,
        maxMarks,
        feedback: {
          summary: `Correct (+${maxMarks}/${maxMarks}).`,
          correctAnswer: a,
          mistakeTags: [],
        },
        normalizedUserAnswer: { text: raw },
      }
    }
  }
  return {
    isCorrect: false,
    marksAwarded: 0,
    maxMarks,
    feedback: {
      summary: `Incorrect (0/${maxMarks}).`,
      correctAnswer: q.answersAccepted[0] || '',
      mistakeTags: ['mismatch'],
    },
    normalizedUserAnswer: { text: raw },
  }
}

function gradeMultiNumeric(q: NormalizedQuestion, r: Extract<UserResponse, { type: 'multiNumeric' }>): GradeResult {
  const maxMarks = q.marks
  const qd = q.meta?.questionData || {}
  const fields = Array.isArray(qd.fields) ? qd.fields : []
  const userValues = Array.isArray(r.values) ? r.values : []

  if (fields.length === 0) {
    return {
      isCorrect: false,
      marksAwarded: 0,
      maxMarks,
      feedback: {
        summary: 'Unable to grade (missing fields).',
        correctAnswer: '',
        mistakeTags: ['invalid'],
      },
      normalizedUserAnswer: { values: userValues },
    }
  }

  // Order-independent matching: for quadratics etc., -3 in Answer 1 is correct even if Answer 1 slot expects -2
  const expectedWithTol = fields.map((f: any) => {
    const ans = typeof f?.answer === 'number' ? f.answer : parseNumberOrNull(String(f?.answer ?? ''))
    const tol = typeof f?.tolerance === 'number' ? f.tolerance : 0
    return ans !== null ? { expected: ans, tolerance: tol } : null
  }).filter((x): x is { expected: number; tolerance: number } => x !== null)

  // Allow "x=2" / "x=-2" etc. in algebra-type multi answers (e.g. Solve 2x² − 8 = 0)
  const userNumbers = userValues
    .map((v: any) => {
      const s = String(v ?? '')
      const stripped = stripSubjectPrefix(s)
      return typeof v === 'number' ? v : (parseNumberOrNull(stripped) ?? fractionToNumberOrNull(stripped))
    })
    .filter((n): n is number => n !== null)

  const used = new Set<number>()
  let correctCount = 0
  for (const userN of userNumbers) {
    for (let j = 0; j < expectedWithTol.length; j++) {
      if (used.has(j)) continue
      const { expected, tolerance } = expectedWithTol[j]
      if (Math.abs(userN - expected) <= tolerance) {
        used.add(j)
        correctCount += 1
        break
      }
    }
  }

  const perFieldMax = maxMarks / fields.length
  const marksAwarded = Math.max(0, Math.min(maxMarks, Math.round(correctCount * perFieldMax)))
  const isCorrect = correctCount === fields.length

  return {
    isCorrect,
    marksAwarded,
    maxMarks,
    feedback: {
      summary: isCorrect
        ? `Correct (+${maxMarks}/${maxMarks}).`
        : `Partially correct (+${marksAwarded}/${maxMarks}).`,
      correctAnswer: fields.length > 1 ? fields.map((f: any) => String(f?.answer ?? '')).join(', ') : (q.answersAccepted[0] || ''),
      mistakeTags: isCorrect ? [] : ['partial'],
    },
    normalizedUserAnswer: { values: userValues },
  }
}

function gradeOrderSteps(q: NormalizedQuestion, r: Extract<UserResponse, { type: 'orderSteps' }>): GradeResult {
  const maxMarks = q.marks
  const userOrder = Array.isArray(r.order) ? r.order.map(safeTrim).filter(Boolean) : []
  const raw = q.answersAccepted[0] || ''
  let accepted: string[]
  if (raw.startsWith('[')) {
    try {
      const parsed = JSON.parse(raw)
      accepted = Array.isArray(parsed) ? parsed.map((s: any) => safeTrim(String(s))).filter(Boolean) : []
    } catch {
      accepted = raw.split(',').map(safeTrim).filter(Boolean)
    }
  } else {
    accepted = raw.split(',').map(safeTrim).filter(Boolean)
  }

  if (userOrder.length === 0) {
    return {
      isCorrect: false,
      marksAwarded: 0,
      maxMarks,
      feedback: {
        summary: 'No order provided.',
        correctAnswer: accepted.join(', '),
        mistakeTags: ['empty'],
      },
      normalizedUserAnswer: { order: userOrder },
    }
  }

  const sameLength = userOrder.length === accepted.length
  const exactMatch = sameLength && userOrder.every((s, i) => s === accepted[i])
  const marksAwarded = exactMatch ? maxMarks : 0

  return {
    isCorrect: exactMatch,
    marksAwarded,
    maxMarks,
    feedback: {
      summary: exactMatch ? `Correct (+${maxMarks}/${maxMarks}).` : `Incorrect (0/${maxMarks}).`,
      correctAnswer: accepted.join(', '),
      mistakeTags: exactMatch ? [] : ['mismatch'],
    },
    normalizedUserAnswer: { order: userOrder },
  }
}

function gradeTableFill(q: NormalizedQuestion, r: Extract<UserResponse, { type: 'tableFill' }>): GradeResult {
  const maxMarks = q.marks
  const qd = q.meta?.questionData || {}
  const expectedRows = Array.isArray(qd.rows) ? qd.rows : []
  const userCells = Array.isArray(r.cells) ? r.cells : []

  if (expectedRows.length === 0) {
    return {
      isCorrect: false,
      marksAwarded: 0,
      maxMarks,
      feedback: {
        summary: 'Unable to grade (missing expected data).',
        correctAnswer: '',
        mistakeTags: ['invalid'],
      },
      normalizedUserAnswer: { cells: userCells },
    }
  }

  let correctCount = 0
  let total = 0
  for (let i = 0; i < expectedRows.length; i++) {
    const row = expectedRows[i]
    const userRow = userCells[i]
    if (!row || typeof row !== 'object') continue
    for (const [key, expectedVal] of Object.entries(row)) {
      total++
      const u = userRow && typeof userRow === 'object' ? userRow[key] : undefined
      const uStr = safeTrim(String(u ?? ''))
      const eStr = safeTrim(String(expectedVal ?? ''))
      if (uStr === eStr) correctCount++
    }
  }

  const perCellMax = total > 0 ? maxMarks / total : 0
  const marksAwarded = Math.max(0, Math.min(maxMarks, Math.round(correctCount * perCellMax)))
  const isCorrect = total > 0 && correctCount === total

  return {
    isCorrect,
    marksAwarded,
    maxMarks,
    feedback: {
      summary: isCorrect ? `Correct (+${maxMarks}/${maxMarks}).` : `Partially correct (+${marksAwarded}/${maxMarks}).`,
      correctAnswer: q.answersAccepted[0] || '',
      mistakeTags: isCorrect ? [] : ['partial'],
    },
    normalizedUserAnswer: { cells: userCells },
  }
}

function gradeAsShort(q: NormalizedQuestion, text: string): GradeResult {
  return gradeShort(q, { type: 'short', text })
}

/** Grade graphRead when the answer is comma-separated numerics (e.g. Solve x² = 4 graphically → 2, -2). Award 1 mark per correct value. */
function gradeGraphReadMulti(q: NormalizedQuestion, text: string): GradeResult {
  const maxMarks = q.marks
  const raw = safeTrim(text)
  if (!raw) {
    const correctAnswer = getGraphReadMultiCorrectAnswer(q)
    return {
      isCorrect: false,
      marksAwarded: 0,
      maxMarks,
      feedback: { summary: 'No answer given.', correctAnswer, mistakeTags: ['empty'] },
      normalizedUserAnswer: { text: '' },
    }
  }
  const qd = q.meta?.questionData || {}
  const fields = Array.isArray(qd.fields) ? qd.fields : []
  let expectedNums: number[]
  if (fields.length > 0) {
    expectedNums = fields
      .map((f: any) => (typeof f?.answer === 'number' ? f.answer : parseNumberOrNull(String(f?.answer ?? ''))))
      .filter((n): n is number => n !== null)
  } else {
    const firstAnswer = q.answersAccepted[0] || ''
    const expectedStrs = firstAnswer.split(',').map(s => safeTrim(s)).filter(Boolean)
    expectedNums = expectedStrs
      .map(s => parseNumberOrNull(s) ?? fractionToNumberOrNull(s))
      .filter((n): n is number => n !== null)
  }
  if (expectedNums.length === 0) return gradeAsShort(q, text)

  const userNumbers = extractNumbersFromText(raw)
  const tolerance = 0.3
  const used = new Set<number>()
  let correctCount = 0
  for (const exp of expectedNums) {
    for (let j = 0; j < userNumbers.length; j++) {
      if (used.has(j)) continue
      if (Math.abs(userNumbers[j] - exp) <= tolerance) {
        used.add(j)
        correctCount++
        break
      }
    }
  }
  const marksAwarded = correctCount
  const isCorrect = correctCount === expectedNums.length
  const correctAnswer = getGraphReadMultiCorrectAnswer(q, expectedNums)
  return {
    isCorrect,
    marksAwarded,
    maxMarks,
    feedback: {
      summary: isCorrect ? `Correct (+${maxMarks}/${maxMarks}).` : `Partially correct (+${marksAwarded}/${maxMarks}).`,
      correctAnswer,
      mistakeTags: isCorrect ? [] : ['partial'],
    },
    normalizedUserAnswer: { text: raw },
  }
}

function getGraphReadMultiCorrectAnswer(q: NormalizedQuestion, expectedNums?: number[]): string {
  const qd = q.meta?.questionData || {}
  const fields = Array.isArray(qd.fields) ? qd.fields : []
  if (fields.length > 0) {
    return fields.map((f: any) => String(f?.answer ?? '')).join(', ')
  }
  if (Array.isArray(expectedNums) && expectedNums.length > 0) {
    return expectedNums.join(', ')
  }
  return q.answersAccepted[0] || ''
}

// ----------------
// inequalityPlot: interval on number line
// ----------------

export interface InequalityInterval {
  left: number
  right: number
  leftClosed: boolean
  rightClosed: boolean
}

const NUMERIC_TOLERANCE = 0.3

/** Parse interval string e.g. "0≤x≤4", "0<=x<=4", "0 \\le x \\le 4", "x < 5", "-2 ≤ x ≤ 3". */
export function parseIntervalFromString(s: string): InequalityInterval | null {
  const raw = safeTrim(s)
  if (!raw) return null
  // Normalize: replace \le, \ge, \lt, \gt with single-char or two-char
  const t = raw
    .replace(/\\le\b/g, '≤')
    .replace(/\\ge\b/g, '≥')
    .replace(/\\lt\b/g, '<')
    .replace(/\\gt\b/g, '>')
    .replace(/\s+/g, ' ')
  // Double-bounded: a ≤ x ≤ b or a <= x <= b (and strict variants)
  const doubleMatch = t.match(
    /^(-?[\d.]+)\s*(≤|≥|>=|<=|>|<)\s*x\s*(≤|≥|>=|<=|>|<)\s*(-?[\d.]+)$/i
  )
  if (doubleMatch) {
    const a = parseFloat(doubleMatch[1])
    const b = parseFloat(doubleMatch[4])
    if (!Number.isFinite(a) || !Number.isFinite(b)) return null
    const leftOp = doubleMatch[2]
    const rightOp = doubleMatch[3]
    const leftClosed = leftOp === '≤' || leftOp === '<=' || leftOp === '≥' || leftOp === '>='
    const rightClosed = rightOp === '≤' || rightOp === '<=' || rightOp === '≥' || rightOp === '>='
    return {
      left: Math.min(a, b),
      right: Math.max(a, b),
      leftClosed,
      rightClosed,
    }
  }
  // Alternative: a ≤ x ≤ b with \le
  const altMatch = t.match(/^(-?[\d.]+)\s*≤\s*x\s*≤\s*(-?[\d.]+)$/)
  if (altMatch) {
    const a = parseFloat(altMatch[1])
    const b = parseFloat(altMatch[2])
    if (!Number.isFinite(a) || !Number.isFinite(b)) return null
    return {
      left: Math.min(a, b),
      right: Math.max(a, b),
      leftClosed: true,
      rightClosed: true,
    }
  }
  return null
}

/**
 * Parse interval string with any single-letter variable (e.g. 3.445≤m<3.455, 3.445 ≤ x < 3.455).
 * Used for short-answer grading so "3.445 ≤ x < 3.455" matches accepted "3.445≤m<3.455".
 */
function parseIntervalWithAnyVariable(s: string): InequalityInterval | null {
  const raw = safeTrim(s)
  if (!raw) return null
  const t = raw
    .replace(/\\le\b/g, '≤')
    .replace(/\\ge\b/g, '≥')
    .replace(/\\lt\b/g, '<')
    .replace(/\\gt\b/g, '>')
    .replace(/\s+/g, ' ')
  // a ≤ var ≤ b or a < var < b etc. — variable is any single letter
  const doubleMatch = t.match(
    /^(-?[\d.]+)\s*(≤|≥|>=|<=|>|<)\s*[a-zA-Z]\s*(≤|≥|>=|<=|>|<)\s*(-?[\d.]+)$/i
  )
  if (doubleMatch) {
    const a = parseFloat(doubleMatch[1])
    const b = parseFloat(doubleMatch[4])
    if (!Number.isFinite(a) || !Number.isFinite(b)) return null
    const leftOp = doubleMatch[2]
    const rightOp = doubleMatch[3]
    const leftClosed = leftOp === '≤' || leftOp === '<=' || leftOp === '≥' || leftOp === '>='
    const rightClosed = rightOp === '≤' || rightOp === '<=' || rightOp === '≥' || rightOp === '>='
    return {
      left: Math.min(a, b),
      right: Math.max(a, b),
      leftClosed,
      rightClosed,
    }
  }
  const altMatch = t.match(/^(-?[\d.]+)\s*≤\s*[a-zA-Z]\s*≤\s*(-?[\d.]+)$/i)
  if (altMatch) {
    const a = parseFloat(altMatch[1])
    const b = parseFloat(altMatch[2])
    if (!Number.isFinite(a) || !Number.isFinite(b)) return null
    return {
      left: Math.min(a, b),
      right: Math.max(a, b),
      leftClosed: true,
      rightClosed: true,
    }
  }
  return null
}

function intervalsEqual(a: InequalityInterval, b: InequalityInterval): boolean {
  return (
    Math.abs(a.left - b.left) <= NUMERIC_TOLERANCE &&
    Math.abs(a.right - b.right) <= NUMERIC_TOLERANCE &&
    a.leftClosed === b.leftClosed &&
    a.rightClosed === b.rightClosed
  )
}

// ----------------
// Order-independent product of factors (e.g. prime factorisation: 2²×3²×5 vs 2²×5×3²)
// ----------------

const SUPerscriptToDigit: Record<string, number> = {
  '\u2070': 0, '\u00B9': 1, '\u00B2': 2, '\u00B3': 3, '\u2074': 4, '\u2075': 5,
  '\u2076': 6, '\u2077': 7, '\u2078': 8, '\u2079': 9,
}

/** Parse one factor exponent from trailing part: ², ³, ^2, **2, etc. Default 1. */
function parseFactorExponent(tail: string): number | null {
  const t = safeTrim(tail)
  if (!t) return 1
  const sup = SUPerscriptToDigit[t]
  if (sup !== undefined) return sup
  const caret = t.match(/^\^(\d+)$/)
  if (caret) return parseInt(caret[1], 10)
  const star = t.match(/^\*\*(\d+)$/)
  if (star) return parseInt(star[1], 10)
  return null
}

/**
 * Parse a product-of-factors string (e.g. "2²×3²×5", "2^2 x 5 x 3^2") into a canonical list of [base, exponent].
 * Returns null if the string doesn't look like a product of numeric factors (so we fall back to text compare).
 */
function parseProductOfFactors(s: string): [number, number][] | null {
  const raw = safeTrim(s)
  if (!raw) return null
  // Normalise multiplication signs to × and split
  const normalized = raw
    .replace(/\s*[xX]\s*/g, '×')
    .replace(/\s*\*\s*/g, '×')
  const parts = normalized.split(/[\s×]+/).map(p => safeTrim(p)).filter(Boolean)
  if (parts.length < 2) return null
  const factors: [number, number][] = []
  for (const part of parts) {
    const baseMatch = part.match(/^(\d+)(.*)$/s)
    if (!baseMatch) return null
    const base = parseInt(baseMatch[1], 10)
    if (!Number.isFinite(base) || base < 2) return null
    const exp = parseFactorExponent(baseMatch[2])
    if (exp === null || exp < 0) return null
    factors.push([base, exp])
  }
  // Canonical order: sort by base (so 2²×3²×5 is comparable regardless of input order)
  factors.sort((a, b) => a[0] - b[0])
  return factors
}

function productOfFactorsEqual(user: [number, number][], accepted: [number, number][]): boolean {
  if (user.length !== accepted.length) return false
  for (let i = 0; i < user.length; i++) {
    if (user[i][0] !== accepted[i][0] || user[i][1] !== accepted[i][1]) return false
  }
  return true
}

// ----------------
// Order-independent product of algebraic factors (e.g. factorise: (x+5)(x+4) same as (x+4)(x+5))
// ----------------

/**
 * Extract top-level parenthesised factors from a product like "(x+4)(x+5)" or "(x+4)*(x+5)".
 * Returns array of inner contents (e.g. ["x+4", "x+5"]) or null if not a product of at least two such factors.
 */
function extractParenthesisedFactors(s: string): string[] | null {
  const raw = safeTrim(s)
  if (!raw || raw.length < 4) return null
  const normalized = raw.replace(/\s*\*\s*/g, '').replace(/\s+/g, ' ').trim()
  const factors: string[] = []
  let i = 0
  const n = normalized.length
  while (i < n) {
    if (normalized[i] !== '(') return null
    let depth = 1
    const start = i
    i++
    while (i < n && depth > 0) {
      if (normalized[i] === '(') depth++
      else if (normalized[i] === ')') depth--
      i++
    }
    if (depth !== 0) return null
    factors.push(safeTrim(normalized.slice(start + 1, i - 1)))
  }
  if (factors.length < 2) return null
  const reconstructed = factors.map(f => `(${f})`).join('')
  if (reconstructed !== normalized) return null
  return factors
}

/**
 * Canonicalise one factor so (x+4) and (4+x) compare equal: sort additive terms (split by + or -).
 */
function canonicaliseAlgebraicFactor(f: string): string {
  const t = safeTrim(f)
  if (!t) return t
  const terms: string[] = []
  let i = 0
  const n = t.length
  while (i < n) {
    let sign = ''
    if (i === 0 && (t[i] === '+' || t[i] === '-')) {
      sign = t[i]
      i++
    } else if (i > 0 && (t[i] === '+' || t[i] === '-')) {
      sign = t[i]
      i++
    }
    let term = ''
    while (i < n && t[i] !== '+' && t[i] !== '-') {
      term += t[i]
      i++
    }
    if (term) terms.push(sign + safeTrim(term))
  }
  terms.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
  return terms.join('+').replace(/^\+\s*/, '').replace(/\+\-/g, '-')
}

function productOfAlgebraicFactorsEqual(userFactors: string[], acceptedFactors: string[]): boolean {
  if (userFactors.length !== acceptedFactors.length) return false
  const u = userFactors.map(canonicaliseAlgebraicFactor).sort()
  const a = acceptedFactors.map(canonicaliseAlgebraicFactor).sort()
  for (let i = 0; i < u.length; i++) {
    if (u[i] !== a[i]) return false
  }
  return true
}

function gradeInequalityPlot(
  question: NormalizedQuestion,
  response: { type: 'inequalityPlot'; value: unknown }
): GradeResult {
  const maxMarks = question.marks || 1
  const raw = response.value

  let userInterval: InequalityInterval | null = null
  if (raw && typeof raw === 'object' && typeof (raw as any).left === 'number' && typeof (raw as any).right === 'number') {
    const r = raw as any
    userInterval = {
      left: Number(r.left),
      right: Number(r.right),
      leftClosed: r.leftClosed !== false,
      rightClosed: r.rightClosed !== false,
    }
    if (userInterval.left > userInterval.right) {
      const L = userInterval.left
      userInterval.left = userInterval.right
      userInterval.right = L
    }
  } else if (typeof raw === 'string' && raw.trim()) {
    userInterval = parseIntervalFromString(raw)
  }

  if (!userInterval) {
    return {
      isCorrect: false,
      marksAwarded: 0,
      maxMarks,
      feedback: {
        summary: 'No interval given.',
        correctAnswer: question.answersAccepted[0] || '',
        mistakeTags: ['empty'],
      },
      normalizedUserAnswer: response.value,
    }
  }

  const accepted = question.answersAccepted || []
  for (const ans of accepted) {
    const acceptedInterval = parseIntervalFromString(ans)
    if (acceptedInterval && intervalsEqual(userInterval, acceptedInterval)) {
      return {
        isCorrect: true,
        marksAwarded: maxMarks,
        maxMarks,
        feedback: {
          summary: `Correct (+${maxMarks}/${maxMarks}).`,
          correctAnswer: ans,
          mistakeTags: [],
        },
        normalizedUserAnswer: { type: 'inequalityPlot', value: userInterval },
      }
    }
  }
  return {
    isCorrect: false,
    marksAwarded: 0,
    maxMarks,
    feedback: {
      summary: 'Incorrect interval.',
      correctAnswer: question.answersAccepted[0] || '',
      mistakeTags: ['mismatch'],
    },
    normalizedUserAnswer: { type: 'inequalityPlot', value: userInterval },
  }
}

/** Expected point shape for graphPlot / geometryConstruct grading */
interface ExpectedPoint {
  x: number
  y: number
}

function distance(p: ExpectedPoint, q: ExpectedPoint): number {
  return Math.hypot(p.x - q.x, p.y - q.y)
}

/**
 * Grade graphPlot or geometryConstruct by comparing submitted points to expected points with tolerance.
 * questionData.expectedPoints: Array<{x, y}> (required for coordinate grading)
 * questionData.coordinateTolerance: number (default 0.6, so half-unit grid snaps are accepted)
 * For geometryConstruct, order of points matters (A', B', C'). For graphPlot, each expected point
 * must have some user point within tolerance (order-independent).
 */
function gradeCoordinatePlot(
  question: NormalizedQuestion,
  response: { type: 'graphPlot' | 'geometryConstruct'; value: unknown }
): GradeResult {
  const maxMarks = question.marks || 1
  const qd = question.meta?.questionData || {}
  const expectedPoints = Array.isArray(qd.expectedPoints) ? qd.expectedPoints as ExpectedPoint[] : []
  const tolerance = typeof qd.coordinateTolerance === 'number' && qd.coordinateTolerance >= 0 ? qd.coordinateTolerance : 0.6

  const raw = response.value
  const userPoints: ExpectedPoint[] =
    raw && typeof raw === 'object' && Array.isArray((raw as any).points)
      ? (raw as any).points.map((p: any) => ({
          x: Number(p?.x) || 0,
          y: Number(p?.y) || 0,
        }))
      : []

  if (expectedPoints.length === 0) {
    return {
      isCorrect: false,
      marksAwarded: 0,
      maxMarks,
      feedback: {
        summary: 'Unable to grade (no expected points defined).',
        correctAnswer: question.answersAccepted[0] || '',
        mistakeTags: ['invalid'],
      },
      normalizedUserAnswer: { points: userPoints },
    }
  }

  let matched = 0
  const orderMatters = question.type === 'geometryConstruct'

  if (orderMatters) {
    for (let i = 0; i < expectedPoints.length && i < userPoints.length; i++) {
      if (distance(expectedPoints[i], userPoints[i]) <= tolerance) matched++
    }
  } else {
    const used = new Set<number>()
    for (const exp of expectedPoints) {
      for (let j = 0; j < userPoints.length; j++) {
        if (used.has(j)) continue
        if (distance(exp, userPoints[j]) <= tolerance) {
          used.add(j)
          matched++
          break
        }
      }
    }
  }

  const isCorrect = matched === expectedPoints.length
  const perPoint = expectedPoints.length > 0 ? maxMarks / expectedPoints.length : 0
  const marksAwarded = Math.max(0, Math.min(maxMarks, Math.round(matched * perPoint)))

  return {
    isCorrect,
    marksAwarded,
    maxMarks,
    feedback: {
      summary: isCorrect ? `Correct (+${maxMarks}/${maxMarks}).` : `Partially correct (+${marksAwarded}/${maxMarks}).`,
      correctAnswer: question.answersAccepted[0] || expectedPoints.map((p) => `(${p.x}, ${p.y})`).join(', '),
      mistakeTags: isCorrect ? [] : ['partial'],
    },
    normalizedUserAnswer: { points: userPoints },
  }
}

export function grade(question: NormalizedQuestion, response: UserResponse): GradeResult {
  try {
    switch (question.type) {
      case 'short':
        return gradeShort(question, response as any)
      case 'numeric':
      case 'numericWithTolerance':
        return gradeNumeric(question, { type: 'numeric', text: (response as any).text ?? '' })
      case 'multiNumeric':
        return gradeMultiNumeric(question, response as any)
      case 'mcq':
        return gradeMcq(question, response as any)
      case 'fill':
        return gradeFill(question, response as any)
      case 'match':
        return gradeMatch(question, response as any)
      case 'dragMatch':
        return gradeMatch(question, { type: 'match', mapping: (response as any).mapping ?? {} })
      case 'label':
        return gradeLabel(question, response as any)
      case 'expression':
      case 'proofShort':
        return gradeAsShort(question, (response as any).text ?? '')
      case 'graphRead': {
        const text = (response as any).text ?? ''
        const firstAccepted = question.answersAccepted[0] || ''
        const fields = Array.isArray(question.meta?.questionData?.fields) ? question.meta.questionData.fields : []
        if (safeTrim(firstAccepted).includes(',') || fields.length > 1) return gradeGraphReadMulti(question, text)
        return gradeAsShort(question, text)
      }
      case 'orderSteps':
        return gradeOrderSteps(question, response as any)
      case 'tableFill':
        return gradeTableFill(question, response as any)
      case 'graphPlot':
      case 'geometryConstruct': {
        const val = (response as any).value
        const qd = question.meta?.questionData || {}
        const hasExpectedPoints = Array.isArray(qd.expectedPoints) && qd.expectedPoints.length > 0
        if (hasExpectedPoints && val && typeof val === 'object' && Array.isArray((val as any).points)) {
          return gradeCoordinatePlot(question, { type: question.type, value: val })
        }
        const text = typeof val === 'string' ? val : val != null ? JSON.stringify(val) : ''
        return gradeAsShort(question, text)
      }
      case 'inequalityPlot':
        return gradeInequalityPlot(question, response as { type: 'inequalityPlot'; value: unknown })
      default:
        return {
          isCorrect: false,
          marksAwarded: 0,
          maxMarks: question.marks || 1,
          feedback: {
            summary: 'Unable to grade this question type.',
            correctAnswer: question.answersAccepted[0] || '',
            mistakeTags: ['invalid'],
          },
          normalizedUserAnswer: response,
        }
    }
  } catch (e) {
    return {
      isCorrect: false,
      marksAwarded: 0,
      maxMarks: question.marks || 1,
      feedback: {
        summary: 'An error occurred while grading. You can skip this question.',
        correctAnswer: question.answersAccepted[0] || '',
        mistakeTags: ['error'],
      },
      normalizedUserAnswer: response,
    }
  }
}
