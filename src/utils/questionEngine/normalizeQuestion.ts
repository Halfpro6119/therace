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
} from './utils'

function safeType(v: unknown): QuestionType {
  const t = safeString(v, 'short').toLowerCase()
  if (t === 'mcq' || t === 'fill' || t === 'match' || t === 'label' || t === 'short') return t
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

  return qd
}

export function normalizeQuestion(raw: Prompt | any): NormalizedQuestion {
  // IMPORTANT: never throw
  try {
    const id = safeString(raw?.id)

    const type = safeType(raw?.type)

    const question = safeTrim(raw?.question)
    const answersAccepted = uniq(toStringArray(raw?.answers))

    const marks = safeInt(raw?.marks ?? raw?.meta?.marks ?? 1, 1, 1)

    const explanation = safeTrim(raw?.explanation)
    const hint = safeTrim(raw?.hint)

    const calculatorAllowed = raw?.calculatorAllowed ?? raw?.calculator_allowed
    const calculatorAllowedNormalized = calculatorAllowed === null || calculatorAllowed === undefined
      ? null
      : safeBool(calculatorAllowed)

    const drawingRecommended = safeBool(raw?.meta?.drawingRecommended, false)

    const meta = normalizeMeta(raw?.meta)
    const questionData = legacyToQuestionData(type, raw, meta.questionData)

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
      answersAccepted: toStringArray(raw?.answers),
      marks: 1,
      explanation: safeTrim(raw?.explanation),
      hint: safeTrim(raw?.hint),
      calculatorAllowed: null,
      drawingRecommended: false,
      meta: { questionData: {}, diagram: undefined },
    }
  }
}
