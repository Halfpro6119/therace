/**
 * Shared validation for the canonical NormalizedQuestion.
 *
 * Used in:
 * - Admin (block save / show warnings)
 * - Import preview (block row / show warnings)
 * - Runtime (safe fallback rendering)
 */

import type { NormalizedQuestion } from './types'
import { countBlanksInQuestion, safeTrim, uniq } from './utils'

export interface ValidationOutput {
  errors: string[]
  warnings: string[]
}

function baseValidation(q: NormalizedQuestion): ValidationOutput {
  const errors: string[] = []
  const warnings: string[] = []

  if (safeTrim(q.question).length < 5) errors.push('Question text must be at least 5 characters.')
  if (!Array.isArray(q.answersAccepted) || q.answersAccepted.length < 1) errors.push('At least one accepted answer is required.')
  if (!Number.isFinite(q.marks) || q.marks < 1) errors.push('Marks must be at least 1.')

  return { errors, warnings }
}

function validateShort(q: NormalizedQuestion): ValidationOutput {
  return baseValidation(q)
}

function validateMcq(q: NormalizedQuestion): ValidationOutput {
  const out = baseValidation(q)
  const choices = q.meta.questionData?.choices

  if (!Array.isArray(choices) || choices.length < 2) {
    out.errors.push('MCQ requires at least 2 choices in meta.questionData.choices.')
    return out
  }

  const keys = choices.map((c: any) => safeTrim(c?.key)).filter(Boolean)
  const texts = choices.map((c: any) => safeTrim(c?.text)).filter(Boolean)

  if (keys.length !== choices.length) out.errors.push('All MCQ choices must have a key.')
  if (texts.length !== choices.length) out.errors.push('All MCQ choices must have text.')
  if (uniq(keys).length !== keys.length) out.errors.push('MCQ choices must have unique keys.')

  const accepted = q.answersAccepted.map(a => safeTrim(a))
  const hasCorrectKey = accepted.some(a => keys.includes(a))
  if (!hasCorrectKey) out.errors.push('MCQ answersAccepted must include at least one choice key (e.g. "A").')

  if (choices.length < 4) out.warnings.push('MCQ usually has 4 choices (A–D).')

  return out
}

function validateFill(q: NormalizedQuestion): ValidationOutput {
  const out = baseValidation(q)
  const blanks = q.meta.questionData?.blanks
  const blanksNum = typeof blanks === 'number' ? blanks : 1

  if (!Number.isFinite(blanksNum) || blanksNum < 1) out.errors.push('Fill requires blanks >= 1.')

  const placeholderCount = countBlanksInQuestion(q.question)
  if (placeholderCount > 0 && placeholderCount !== blanksNum) {
    out.warnings.push(`Question contains ${placeholderCount} blank placeholders, but blanks is ${blanksNum}.`)
  }

  const perBlank = q.meta.questionData?.acceptedPerBlank
  const composite = q.meta.questionData?.acceptedComposite

  if (!Array.isArray(perBlank) && !Array.isArray(composite)) {
    out.warnings.push('Fill question is missing acceptedPerBlank or acceptedComposite; will fall back to answersAccepted.')
  }

  if (Array.isArray(perBlank) && perBlank.length !== blanksNum) {
    out.errors.push('acceptedPerBlank length must equal blanks.')
  }

  return out
}

function validateMatch(q: NormalizedQuestion): ValidationOutput {
  const out = baseValidation(q)
  const leftItems = q.meta.questionData?.leftItems
  const rightItems = q.meta.questionData?.rightItems

  if (!Array.isArray(leftItems) || leftItems.length < 2) out.errors.push('Match requires leftItems (>=2).')
  if (!Array.isArray(rightItems) || rightItems.length < 2) out.errors.push('Match requires rightItems (>=2).')

  const leftIds = Array.isArray(leftItems) ? leftItems.map((i: any) => safeTrim(i?.id)).filter(Boolean) : []
  const rightIds = Array.isArray(rightItems) ? rightItems.map((i: any) => safeTrim(i?.id)).filter(Boolean) : []

  if (leftIds.length && uniq(leftIds).length !== leftIds.length) out.errors.push('Duplicate ids in leftItems.')
  if (rightIds.length && uniq(rightIds).length !== rightIds.length) out.errors.push('Duplicate ids in rightItems.')

  const hasMapping = q.answersAccepted.some(a => /[A-Za-z0-9]+[A-Za-z0-9]+/.test(a))
  if (!hasMapping) out.errors.push('Match answersAccepted must include canonical mapping string e.g. "1A,2C".')

  return out
}

function validateLabel(q: NormalizedQuestion): ValidationOutput {
  const out = baseValidation(q)

  if (!q.meta.diagram) out.errors.push('Label requires meta.diagram to be present.')

  const labelBank = q.meta.questionData?.labelBank
  const targets = q.meta.questionData?.targets

  if (!Array.isArray(labelBank) || labelBank.length < 1) out.errors.push('Label requires labelBank (>=1).')
  if (!Array.isArray(targets) || targets.length < 1) out.errors.push('Label requires targets (>=1).')

  if (Array.isArray(targets)) {
    targets.forEach((t: any, idx: number) => {
      if (!safeTrim(t?.id)) out.errors.push(`Target ${idx + 1} missing id.`)
      if (!safeTrim(t?.correctLabelId)) out.errors.push(`Target ${idx + 1} missing correctLabelId.`)
    })
  }

  return out
}

export function validateNormalizedQuestion(q: NormalizedQuestion): ValidationOutput {
  switch (q.type) {
    case 'short':
      return validateShort(q)
    case 'mcq':
      return validateMcq(q)
    case 'fill':
      return validateFill(q)
    case 'match':
      return validateMatch(q)
    case 'label':
      return validateLabel(q)
    default:
      return { errors: ['Unknown question type'], warnings: [] }
  }
}
