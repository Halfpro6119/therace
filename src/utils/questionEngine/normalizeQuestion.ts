/**
 * normalizeQuestion(raw)
 *
 * Converts a raw Prompt row (and/or import row) into a single canonical
 * NormalizedQuestion model used across the app.
 *
 * CRITICAL:
 * - Must never throw
 * - Must be backwards compatible with existing questions
 * - Must fill defaults for missing fields
 */

import type { Prompt } from '../../types'
import type { NormalizedQuestion, QuestionType } from './types'
import {
  safeBool,
  safeInt,
  safeString,
  safeTrim,
  toStringArray,
  uniq,
  countBlanksInQuestion,
  parseNumericOrNull,
} from './utils'

/** Types that keep their identity for rendering/grading (SUPPORTED_QUESTION_TYPES + short, mcq). */
const DEDICATED_TYPES = new Set([
  'short', 'mcq', 'fill', 'match', 'label', 'numeric', 'numericwithtolerance', 'multinumeric',
  'expression', 'tablefill', 'ordersteps', 'graphplot', 'graphread', 'inequalityplot',
  'geometryconstruct', 'proofshort', 'dragmatch',
])
/** Types that normalize to short when not in DEDICATED_TYPES. */
const NORMALIZE_TO_SHORT = new Set([
  'matrixinput', 'vectordiagram', 'functionmachine',
])

function toCanonicalType(t: string): QuestionType {
  if (t === 'expression') return 'expression'
  if (t === 'tablefill') return 'tableFill'
  if (t === 'ordersteps') return 'orderSteps'
  if (t === 'graphplot') return 'graphPlot'
  if (t === 'graphread') return 'graphRead'
  if (t === 'inequalityplot') return 'inequalityPlot'
  if (t === 'proofshort') return 'proofShort'
  if (t === 'geometryconstruct') return 'geometryConstruct'
  if (t === 'dragmatch') return 'dragMatch'
  return t as QuestionType
}

function safeType(v: unknown): QuestionType {
  const t = safeString(v, 'short').toLowerCase()
  if (t === 'mcq' || t === 'fill' || t === 'match' || t === 'label' || t === 'short') return t
  if (t === 'numeric' || t === 'numericwithtolerance') return t === 'numericwithtolerance' ? 'numericWithTolerance' : 'numeric'
  if (t === 'multinumeric') return 'multiNumeric'
  if (DEDICATED_TYPES.has(t)) return toCanonicalType(t)
  if (NORMALIZE_TO_SHORT.has(t)) return 'short'
  return 'short'
}

function normalizeMeta(meta: any): { questionData: Record<string, any>; diagram?: any } {
  const m = meta && typeof meta === 'object' ? meta : {}
  const questionData = m.questionData && typeof m.questionData === 'object' ? m.questionData : {}
  const diagram = m.diagram && typeof m.diagram === 'object' ? m.diagram : undefined
  return { questionData, diagram }
}

/**
 * Convert legacy/flat structures into meta.questionData when possible.
 */
function legacyToQuestionData(type: QuestionType, raw: any, existingQuestionData: any): Record<string, any> {
  const qd = { ...(existingQuestionData || {}) }

  if (type === 'mcq') {
    // Accept choices from meta.questionData.choices OR choiceA/choiceB... OR choices:[".."]
    if (!Array.isArray(qd.choices)) {
      const choices: Array<{ key: string; text: string }> = []

      // flat choiceA etc
      const keys = ['A', 'B', 'C', 'D', 'E', 'F']
      for (const k of keys) {
        const txt = safeTrim(raw?.[`choice${k}`])
        if (txt) choices.push({ key: k, text: txt })
      }

      // array choices
      if (choices.length === 0 && Array.isArray(raw?.choices)) {
        raw.choices.forEach((c: any, i: number) => {
          if (typeof c === 'string') choices.push({ key: String.fromCharCode(65 + i), text: safeTrim(c) })
          else if (c && typeof c === 'object') {
            choices.push({
              key: safeTrim(c.key || c.id || String.fromCharCode(65 + i)),
              text: safeTrim(c.text || c.label),
            })
          }
        })
      }

      if (choices.length) qd.choices = choices
    }
  }

  if (type === 'fill') {
    if (qd.blanks === undefined) {
      const blanksFromMeta = raw?.blanks
      const blanksFromText = countBlanksInQuestion(safeString(raw?.question))
      qd.blanks = safeInt(blanksFromMeta ?? blanksFromText ?? 1, 1, 1)
    }

    // Support acceptedPerBlank via acceptedSets or acceptedPerBlank
    if (!Array.isArray(qd.acceptedPerBlank) && Array.isArray(qd.acceptedSets)) {
      qd.acceptedPerBlank = qd.acceptedSets
    }

    // If acceptedPerBlank missing but answers exist, treat as composite fallback
    if (!Array.isArray(qd.acceptedPerBlank) && !Array.isArray(qd.acceptedComposite)) {
      const fallback = toStringArray(raw?.answers)
      if (fallback.length) qd.acceptedComposite = fallback
    }
  }

  if (type === 'match') {
    // Standardize key names
    if (!Array.isArray(qd.leftItems) && Array.isArray(qd.matchLeft)) qd.leftItems = qd.matchLeft
    if (!Array.isArray(qd.rightItems) && Array.isArray(qd.matchRight)) qd.rightItems = qd.matchRight
  }

  if (type === 'label') {
    // Standardize label bank naming
    if (!Array.isArray(qd.labelBank) && Array.isArray(qd.labels)) qd.labelBank = qd.labels
  }

  if (type === 'graphRead') {
    // When answers are comma-separated numerics (e.g. "Solve x² = 4 graphically" → "2,-2"),
    // populate fields so UI can show multiple answer boxes. Only when raw answers is a
    // string with comma (canonical multi-value format) — array alternatives (e.g. median
    // question with ['35','36','37','median']) stay as single box.
    if (!Array.isArray(qd.fields) || qd.fields.length === 0) {
      const rawAnswers = raw?.answers ?? raw?.answer
      if (typeof rawAnswers === 'string' && rawAnswers.includes(',')) {
        const parts = rawAnswers.split(',').map(s => safeTrim(s)).filter(Boolean)
        const numericParts = parts.filter(p => parseNumericOrNull(p) !== null)
        if (numericParts.length > 1) {
          qd.fields = numericParts.map((part, i) => {
            const num = parseNumericOrNull(part) ?? 0
            const tolerance = part.includes('.') ? 0.3 : 0
            return {
              label: `Answer ${i + 1}`,
              answer: num,
              tolerance,
            }
          })
        }
      } else if (Array.isArray(rawAnswers) && rawAnswers.length > 1) {
        // Array like ['2','5'] (DB stores as array) — all numeric → multi-box
        const parts = rawAnswers.map((a: any) => safeTrim(String(a))).filter(Boolean)
        const numericParts = parts.filter(p => parseNumericOrNull(p) !== null)
        if (numericParts.length === parts.length && numericParts.length > 1) {
          qd.fields = numericParts.map((part, i) => {
            const num = parseNumericOrNull(part) ?? 0
            const tolerance = part.includes('.') ? 0.3 : 0
            return {
              label: `Answer ${i + 1}`,
              answer: num,
              tolerance,
            }
          })
        }
      }
    }
  }

  if (type === 'multiNumeric') {
    // If fields not provided, infer from comma-separated answers or array of answers
    if (!Array.isArray(qd.fields) || qd.fields.length === 0) {
      const answers = toStringArray(raw?.answers ?? raw?.answer)
      if (answers.length > 0) {
        // Get parts: comma-separated first answer (e.g. "0,7") or array of answers (e.g. ["0","7"])
        let parts: string[]
        const firstAnswer = answers[0]
        if (firstAnswer.includes(',')) {
          parts = firstAnswer.split(',').map(s => safeTrim(s)).filter(Boolean)
        } else if (answers.length > 1) {
          parts = answers.map(s => safeTrim(s)).filter(Boolean)
        } else {
          parts = [firstAnswer]
        }
        qd.fields = parts.map((part, i) => {
          const num = parseNumericOrNull(part) ?? 0
          const tolerance = part.includes('.') ? 0.3 : 0
          return {
            label: parts.length > 1 ? `Answer ${i + 1}` : `Value ${i + 1}`,
            answer: num,
            tolerance,
          }
        })
      } else {
        // No answers, create default fields (e.g., x, y for coordinates)
        qd.fields = [
          { label: 'x', answer: 0 },
          { label: 'y', answer: 0 },
        ]
      }
    }
  }

  // When raw type is 'numeric', ensure numericTolerance for short-style grading
  const rawType = safeString(raw?.type).toLowerCase()
  if (rawType === 'numeric' && qd.numericTolerance === undefined) {
    qd.numericTolerance = 0.3
  }

  return qd
}

export function normalizeQuestion(raw: Prompt | any): NormalizedQuestion {
  // IMPORTANT: never throw
  try {
    const id = safeString(raw?.id)

    const type = safeType(raw?.type)

    const question = safeTrim(raw?.question)
    const rawAnswers = raw?.answers ?? raw?.answer
    // For graphRead/multiNumeric with comma-separated string (e.g. "0,7"), preserve as single element
    // so grading and correctAnswer display get "0,7" not ["0","7"]
    let answersAccepted: string[]
    if ((type === 'graphRead' || type === 'multiNumeric') && typeof rawAnswers === 'string' && rawAnswers.includes(',')) {
      answersAccepted = [safeTrim(rawAnswers)]
    } else if ((type === 'graphRead' || type === 'multiNumeric') && Array.isArray(rawAnswers) && rawAnswers.length === 1 && typeof rawAnswers[0] === 'string' && rawAnswers[0].includes(',')) {
      answersAccepted = [safeTrim(rawAnswers[0])]
    } else {
      answersAccepted = uniq(toStringArray(rawAnswers))
    }
    // Filter out empty strings for diagram-dependent types that can work without answers
    // Paper 3 questions are problem-solving and may not have predefined answers
    const canHaveEmptyAnswers = [
      'graphPlot', 'graphRead', 'tableFill', 'inequalityPlot', 'geometryConstruct', 
      'proofShort', 'short', 'expression', 'numeric', 'multiNumeric'
    ].includes(type)
    if (canHaveEmptyAnswers && answersAccepted.length === 1 && !safeTrim(answersAccepted[0])) {
      // Allow empty for these types
      answersAccepted = ['']
    } else {
      // Remove empty strings for other types
      answersAccepted = answersAccepted.filter(a => safeTrim(a))
      // Ensure at least one answer (use empty string as fallback for diagram types)
      if (answersAccepted.length === 0 && canHaveEmptyAnswers) {
        answersAccepted = ['']
      }
    }

    let marks = safeInt(raw?.marks ?? raw?.meta?.marks ?? 1, 1, 1)

    const explanation = safeTrim(raw?.explanation)
    const hint = safeTrim(raw?.hint)

    const calculatorAllowed = raw?.calculatorAllowed ?? raw?.calculator_allowed
    const calculatorAllowedNormalized = calculatorAllowed === null || calculatorAllowed === undefined
      ? null
      : safeBool(calculatorAllowed)

    const drawingRecommended = safeBool(raw?.meta?.drawingRecommended, false)

    const meta = normalizeMeta(raw?.meta)
    const questionData = legacyToQuestionData(type, raw, meta.questionData)

    // Multiple correct answers (e.g. Solve x² + 5x + 6 = 0 → -2, -3): award at least 1 mark per answer
    if (type === 'multiNumeric' && Array.isArray(questionData.fields) && questionData.fields.length > 1) {
      marks = Math.max(marks, questionData.fields.length)
    }
    // graphRead with comma-separated numeric answers (e.g. Solve x² = 4 graphically → 2, -2): same rule
    if (type === 'graphRead') {
      const graphReadFields = Array.isArray(questionData.fields) ? questionData.fields : []
      const numParts = graphReadFields.length > 1
        ? graphReadFields.length
        : answersAccepted.length > 0 && safeTrim(answersAccepted[0]).includes(',')
          ? safeTrim(answersAccepted[0]).split(',').map(s => safeTrim(s)).filter(Boolean).length
          : 0
      if (numParts > 1) marks = Math.max(marks, numParts)
    }

    return {
      id,
      subject_id: safeString(raw?.subjectId ?? raw?.subject_id),
      unit_id: safeString(raw?.unitId ?? raw?.unit_id) || undefined,
      topic_id: safeString(raw?.topicId ?? raw?.topic_id) || undefined,
      paper_id: safeString(raw?.paperId ?? raw?.paper_id) || undefined,
      tier: raw?.tier ?? null,

      type,
      question,
      answersAccepted,
      marks,
      explanation,
      hint,
      calculatorAllowed: calculatorAllowedNormalized,
      drawingRecommended,
      meta: {
        questionData,
        diagram: meta.diagram,
      },
    }
  } catch (e) {
    // Ultimate safe fallback
    return {
      id: safeString(raw?.id),
      subject_id: safeString(raw?.subjectId ?? raw?.subject_id),
      unit_id: safeString(raw?.unitId ?? raw?.unit_id) || undefined,
      topic_id: safeString(raw?.topicId ?? raw?.topic_id) || undefined,
      paper_id: safeString(raw?.paperId ?? raw?.paper_id) || undefined,
      tier: raw?.tier ?? null,
      type: 'short',
      question: safeTrim(raw?.question),
      answersAccepted: toStringArray(raw?.answers ?? raw?.answer),
      marks: 1,
      explanation: safeTrim(raw?.explanation),
      hint: safeTrim(raw?.hint),
      calculatorAllowed: null,
      drawingRecommended: false,
      meta: { questionData: {}, diagram: undefined },
    }
  }
}
