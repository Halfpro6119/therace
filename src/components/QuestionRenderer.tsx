/**
 * QUESTION RENDERER (Production)
 *
 * CRITICAL CONSTRAINT:
 * - Do NOT change public site design/styling.
 * - This component uses existing CSS classes (btn-primary, btn-secondary, quiz-input, card, badge).
 *
 * This renderer is now type-driven using the canonical NormalizedQuestion + grade().
 *
 * Backwards compatibility:
 * - It accepts the existing Prompt shape from the DB
 * - It normalizes to a canonical model safely (never throws)
 */

import { useMemo } from 'react'
import type { Prompt } from '../types'
import { normalizeQuestion, grade, type NormalizedQuestion, type GradeResult, type UserResponse } from '../utils/questionEngine'
import { validateNormalizedQuestion } from '../utils/questionEngine'
import { MarksBadge, FeedbackBlock, ShortQuestion, MCQQuestion, FillQuestion, MatchQuestion, LabelQuestion } from './questions/QuestionTypes'

export interface QuestionRendererProps {
  prompt: Prompt
  value: any
  onChange: (v: any) => void
  disabled: boolean
  showFeedback: boolean
  gradeResult?: GradeResult
  onSubmit: () => void
  /** Called with the answer input element when it mounts/unmounts (for toolkit/calculator insert) */
  inputRefCallback?: (el: HTMLInputElement | null) => void
}

/**
 * This helper converts the UI value state into a deterministic UserResponse.
 */
function toUserResponse(q: NormalizedQuestion, value: any): UserResponse {
  switch (q.type) {
    case 'short':
      return { type: 'short', text: typeof value === 'string' ? value : '' }
    case 'mcq':
      return { type: 'mcq', selectedKey: typeof value === 'string' ? value : '' }
    case 'fill':
      return { type: 'fill', blanks: Array.isArray(value) ? value : [] }
    case 'match':
      return { type: 'match', mapping: value && typeof value === 'object' ? value : {} }
    case 'label':
      return { type: 'label', placements: value && typeof value === 'object' ? value : {} }
    default:
      return { type: 'short', text: '' }
  }
}

/**
 * Determine if the question is minimally answered (for enabling Submit).
 */
export function isMinimallyAnswered(q: NormalizedQuestion, value: any): boolean {
  switch (q.type) {
    case 'short':
      return typeof value === 'string' && value.trim().length > 0
    case 'mcq':
      return typeof value === 'string' && value.trim().length > 0
    case 'fill': {
      if (!Array.isArray(value)) return false
      return value.some((v: any) => typeof v === 'string' && v.trim().length > 0)
    }
    case 'match': {
      if (!value || typeof value !== 'object') return false
      return Object.values(value).some(v => typeof v === 'string' && v.trim().length > 0)
    }
    case 'label': {
      if (!value || typeof value !== 'object') return false
      return Object.values(value).some(v => typeof v === 'string' && v.trim().length > 0)
    }
    default:
      return false
  }
}

export function QuestionRenderer({ prompt, value, onChange, disabled, showFeedback, gradeResult, onSubmit, inputRefCallback }: QuestionRendererProps) {
  const q = useMemo(() => normalizeQuestion(prompt), [prompt])

  // Validate at runtime to prevent crashes.
  const validation = useMemo(() => validateNormalizedQuestion(q), [q])

  // If invalid, show safe fallback block (student can still skip in player).
  if (validation.errors.length > 0) {
    return (
      <div className="space-y-4">
        <div className="card p-4">
          <div className="font-semibold" style={{ color: 'rgb(var(--text))' }}>
            Unable to render this question.
          </div>
          <div className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            This question has missing/invalid data.
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <MarksBadge q={q} />

      {q.type === 'short' && (
        <ShortQuestion q={q} value={value} onChange={onChange} disabled={disabled} showFeedback={showFeedback} gradeResult={undefined} onSubmit={onSubmit} inputRefCallback={inputRefCallback} />
      )}
      {q.type === 'mcq' && (
        <MCQQuestion q={q} value={value} onChange={onChange} disabled={disabled} showFeedback={showFeedback} gradeResult={undefined} onSubmit={onSubmit} />
      )}
      {q.type === 'fill' && (
        <FillQuestion q={q} value={value} onChange={onChange} disabled={disabled} showFeedback={showFeedback} gradeResult={undefined} onSubmit={onSubmit} />
      )}
      {q.type === 'match' && (
        <MatchQuestion q={q} value={value} onChange={onChange} disabled={disabled} showFeedback={showFeedback} gradeResult={undefined} onSubmit={onSubmit} />
      )}
      {q.type === 'label' && (
        <LabelQuestion q={q} value={value} onChange={onChange} disabled={disabled} showFeedback={showFeedback} gradeResult={undefined} onSubmit={onSubmit} />
      )}

      <FeedbackBlock show={showFeedback} gradeResult={gradeResult ? {
        isCorrect: gradeResult.isCorrect,
        marksAwarded: gradeResult.marksAwarded,
        maxMarks: gradeResult.maxMarks,
        correctAnswer: gradeResult.feedback.correctAnswer,
        summary: gradeResult.feedback.summary,
      } : undefined} explanation={q.explanation} />
    </div>
  )
}

/**
 * Convenience function for callers (quiz player) to grade current state.
 */
export function gradeFromRenderer(prompt: Prompt, value: any): GradeResult {
  const q = normalizeQuestion(prompt)
  const response = toUserResponse(q, value)
  return grade(q, response)
}
