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
  safeLower,
  safeString,
  safeTrim,
  toStringArray,
} from './utils'

function emptyIsZero(text: string): boolean {
  return safeTrim(text).length === 0
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

const MARK_SCHEME_NUMERIC_TOLERANCE = 0.001

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

  // Mark scheme: award marks by keywords/key numbers (for proofShort and open-ended short)
  const qd = q.meta.questionData || {}
  const scheme = Array.isArray(qd.markScheme) ? qd.markScheme : []
  if (scheme.length > 0) {
    return gradeShortWithMarkScheme(q, raw, maxMarks, cfg.caseSensitive)
  }

  const accepted = q.answersAccepted

  // Numeric tolerance
  if (cfg.numericTolerance !== undefined) {
    const userN = parseNumberOrNull(raw) ?? fractionToNumberOrNull(raw)
    if (userN !== null) {
      for (const a of accepted) {
        const an = parseNumberOrNull(a) ?? fractionToNumberOrNull(a)
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
    const userFrac = fractionToNumberOrNull(raw)
    if (userFrac !== null) {
      for (const a of accepted) {
        const afrac = fractionToNumberOrNull(a)
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

  // Text compare
  const normUser = cfg.caseSensitive ? safeTrim(raw) : safeLower(raw)
  const normAccepted = accepted.map(a => (cfg.caseSensitive ? safeTrim(a) : safeLower(a)))

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

  // Determine marking scheme
  const acceptedPerBlank: string[][] | null = Array.isArray(qd.acceptedPerBlank)
    ? qd.acceptedPerBlank.map((arr: any) => toStringArray(arr).map(a => safeLower(a)))
    : null

  const acceptedComposite: string[] | null = Array.isArray(qd.acceptedComposite)
    ? toStringArray(qd.acceptedComposite).map(a => safeLower(a))
    : null

  // Partial marks: by blank
  const perBlankMax = maxMarks / blanks
  let correctCount = 0

  for (let i = 0; i < blanks; i++) {
    const u = safeLower(userBlanks[i] || '')
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
    const fallbackAccepted = q.answersAccepted.map(a => safeLower(a))
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
  const userN = parseNumberOrNull(raw) ?? fractionToNumberOrNull(raw)
  if (userN === null) {
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
    const an = parseNumberOrNull(a) ?? fractionToNumberOrNull(a)
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

  const perFieldMax = maxMarks / fields.length
  let correctCount = 0

  for (let i = 0; i < fields.length; i++) {
    const field = fields[i]
    const expected = typeof field?.answer === 'number' ? field.answer : parseNumberOrNull(String(field?.answer ?? ''))
    const tol = typeof field?.tolerance === 'number' ? field.tolerance : 0
    const userRaw = userValues[i]
    const userN = typeof userRaw === 'number' ? userRaw : (parseNumberOrNull(String(userRaw ?? '')) ?? fractionToNumberOrNull(String(userRaw ?? '')))
    if (expected === null) continue
    if (userN !== null && Math.abs(userN - expected) <= tol) correctCount += 1
  }

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
      correctAnswer: q.answersAccepted[0] || fields.map((f: any) => f.answer).join(', '),
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

// ----------------
// inequalityPlot: interval on number line
// ----------------

export interface InequalityInterval {
  left: number
  right: number
  leftClosed: boolean
  rightClosed: boolean
}

const NUMERIC_TOLERANCE = 0.01

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

function intervalsEqual(a: InequalityInterval, b: InequalityInterval): boolean {
  return (
    Math.abs(a.left - b.left) <= NUMERIC_TOLERANCE &&
    Math.abs(a.right - b.right) <= NUMERIC_TOLERANCE &&
    a.leftClosed === b.leftClosed &&
    a.rightClosed === b.rightClosed
  )
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
      case 'graphRead':
      case 'proofShort':
        return gradeAsShort(question, (response as any).text ?? '')
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
