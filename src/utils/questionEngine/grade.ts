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

export function grade(question: NormalizedQuestion, response: UserResponse): GradeResult {
  try {
    switch (question.type) {
      case 'short':
        return gradeShort(question, response as any)
      case 'mcq':
        return gradeMcq(question, response as any)
      case 'fill':
        return gradeFill(question, response as any)
      case 'match':
        return gradeMatch(question, response as any)
      case 'label':
        return gradeLabel(question, response as any)
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
