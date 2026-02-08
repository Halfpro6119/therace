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
import { MarksBadge, FeedbackBlock, ShortQuestion, NumericQuestion, MultiNumericQuestion, MCQQuestion, FillQuestion, MatchQuestion, DragMatchQuestion, LabelQuestion, TableFillQuestion } from './questions/QuestionTypes'
import { CoordinateGridInput } from './questions/CoordinateGridInput'
import { InequalityNumberLineInput } from './questions/InequalityNumberLineInput'

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

function parsePointsFromJson(value: string): { points: unknown[] } {
  try {
    const p = JSON.parse(value)
    return Array.isArray(p?.points) ? p : { points: [] }
  } catch (_) {
    return { points: [] }
  }
}

function parseJsonSafe(value: string): unknown {
  try {
    return JSON.parse(value)
  } catch (_) {
    return value
  }
}

/**
 * This helper converts the UI value state into a deterministic UserResponse.
 */
function toUserResponse(q: NormalizedQuestion, value: any): UserResponse {
  switch (q.type) {
    case 'short':
      return { type: 'short', text: typeof value === 'string' ? value : '' }
    case 'numeric':
      return { type: 'numeric', text: typeof value === 'string' ? value : '' }
    case 'numericWithTolerance':
      return { type: 'numericWithTolerance', text: typeof value === 'string' ? value : '' }
    case 'multiNumeric':
      return { type: 'multiNumeric', values: Array.isArray(value) ? value : [] }
    case 'mcq':
      return { type: 'mcq', selectedKey: typeof value === 'string' ? value : '' }
    case 'fill':
      return { type: 'fill', blanks: Array.isArray(value) ? value : [] }
    case 'match':
      return { type: 'match', mapping: value && typeof value === 'object' ? value : {} }
    case 'dragMatch':
      return { type: 'dragMatch', mapping: value && typeof value === 'object' ? value : {} }
    case 'label':
      return { type: 'label', placements: value && typeof value === 'object' ? value : {} }
    case 'expression':
    case 'graphRead':
    case 'proofShort':
      return { type: q.type, text: typeof value === 'string' ? value : '' }
    case 'orderSteps':
      return { type: 'orderSteps', order: Array.isArray(value) ? value : (typeof value === 'string' ? value.split(',').map(s => s.trim()).filter(Boolean) : []) }
    case 'tableFill': {
      if (Array.isArray(value)) return { type: 'tableFill', cells: value }
      if (typeof value === 'string') {
        try {
          const parsed = JSON.parse(value)
          return { type: 'tableFill', cells: Array.isArray(parsed) ? parsed : [] }
        } catch (_) { return { type: 'tableFill', cells: [] } }
      }
      return { type: 'tableFill', cells: [] }
    }
    case 'graphPlot':
    case 'geometryConstruct': {
      const v = value && typeof value === 'object' && Array.isArray((value as any).points)
        ? { points: (value as any).points }
        : typeof value === 'string' && (value.startsWith('[') || value.startsWith('{'))
          ? parsePointsFromJson(value)
          : { points: [] }
      return { type: q.type, value: v }
    }
    case 'inequalityPlot': {
      const v = typeof value === 'string' && (value.startsWith('[') || value.startsWith('{')) ? parseJsonSafe(value) : value
      return { type: q.type, value: v }
    }
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
    case 'numeric':
    case 'numericWithTolerance':
      return typeof value === 'string' && value.trim().length > 0
    case 'multiNumeric': {
      if (!Array.isArray(value)) return false
      return value.some((v: any) => typeof v === 'string' && v.trim().length > 0)
    }
    case 'expression':
    case 'graphRead':
    case 'proofShort':
      return typeof value === 'string' && value.trim().length > 0
    case 'dragMatch': {
      if (!value || typeof value !== 'object') return false
      return Object.values(value).some(v => typeof v === 'string' && v.trim().length > 0)
    }
    case 'orderSteps':
      return Array.isArray(value) && value.length > 0
    case 'tableFill':
      return Array.isArray(value) && value.some((row: any) => row && typeof row === 'object' && Object.values(row).some((c: any) => c != null && String(c).trim().length > 0))
    case 'graphPlot':
    case 'geometryConstruct':
      return value != null && Array.isArray((value as any)?.points) && (value as any).points.length > 0
    case 'inequalityPlot':
      return (
        value != null &&
        typeof value === 'object' &&
        typeof (value as any).left === 'number' &&
        typeof (value as any).right === 'number'
      )
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
      {(q.type === 'numeric' || q.type === 'numericWithTolerance') && (
        <NumericQuestion q={q} value={value} onChange={onChange} disabled={disabled} showFeedback={showFeedback} gradeResult={undefined} onSubmit={onSubmit} inputRefCallback={inputRefCallback} />
      )}
      {q.type === 'multiNumeric' && (
        <MultiNumericQuestion q={q} value={value} onChange={onChange} disabled={disabled} showFeedback={showFeedback} gradeResult={undefined} onSubmit={onSubmit} />
      )}
      {q.type === 'mcq' && (
        <MCQQuestion q={q} value={value} onChange={onChange} disabled={disabled} showFeedback={showFeedback} gradeResult={undefined} onSubmit={onSubmit} />
      )}
      {q.type === 'fill' && (
        <FillQuestion q={q} value={value} onChange={onChange} disabled={disabled} showFeedback={showFeedback} gradeResult={undefined} onSubmit={onSubmit} inputRefCallback={inputRefCallback} />
      )}
      {q.type === 'match' && (
        <MatchQuestion q={q} value={value} onChange={onChange} disabled={disabled} showFeedback={showFeedback} gradeResult={undefined} onSubmit={onSubmit} />
      )}
      {q.type === 'label' && (
        <LabelQuestion q={q} value={value} onChange={onChange} disabled={disabled} showFeedback={showFeedback} gradeResult={undefined} onSubmit={onSubmit} />
      )}
      {q.type === 'dragMatch' && (
        <DragMatchQuestion q={q} value={value} onChange={onChange} disabled={disabled} showFeedback={showFeedback} gradeResult={undefined} onSubmit={onSubmit} />
      )}
      {/* graphRead with multiple answer fields: multi-input UI (e.g. Solve x² = 4 graphically → 2, -2) */}
      {q.type === 'graphRead' && Array.isArray(q.meta?.questionData?.fields) && q.meta.questionData.fields.length > 1 && (
        <MultiNumericQuestion
          q={q}
          value={typeof value === 'string' ? value.split(',').map(s => s.trim()) : []}
          onChange={(arr) => onChange(Array.isArray(arr) ? arr.join(', ') : '')}
          disabled={disabled}
          showFeedback={showFeedback}
          gradeResult={undefined}
          onSubmit={onSubmit}
        />
      )}
      {/* Text-based types: single input until dedicated UI */}
      {((q.type === 'expression' || q.type === 'proofShort') || (q.type === 'graphRead' && (!Array.isArray(q.meta?.questionData?.fields) || q.meta.questionData.fields.length <= 1))) && (
        <ShortQuestion q={q} value={typeof value === 'string' ? value : ''} onChange={onChange} disabled={disabled} showFeedback={showFeedback} gradeResult={undefined} onSubmit={onSubmit} inputRefCallback={inputRefCallback} />
      )}
      {/* orderSteps: comma-separated list; stored as array, shown as string */}
      {q.type === 'orderSteps' && (
        <ShortQuestion q={q} value={Array.isArray(value) ? value.join(', ') : typeof value === 'string' ? value : ''} onChange={(v) => onChange(typeof v === 'string' ? v.split(',').map(s => s.trim()).filter(Boolean) : [])} disabled={disabled} showFeedback={showFeedback} gradeResult={undefined} onSubmit={onSubmit} inputRefCallback={inputRefCallback} />
      )}
      {/* graphPlot / geometryConstruct: dedicated coordinate grid */}
      {(q.type === 'graphPlot' || q.type === 'geometryConstruct') && (
        <CoordinateGridInput
          q={q}
          value={value && typeof value === 'object' && Array.isArray((value as any).points) ? (value as any) : undefined}
          onChange={onChange}
          disabled={disabled}
          mode={q.type}
        />
      )}
      {/* tableFill: grid UI when meta.questionData.rows is present */}
      {q.type === 'tableFill' && (
        <TableFillQuestion q={q} value={value} onChange={onChange} disabled={disabled} showFeedback={showFeedback} gradeResult={gradeResult} onSubmit={onSubmit} />
      )}
      {/* inequalityPlot: number-line UI with shaded interval */}
      {q.type === 'inequalityPlot' && (
        <InequalityNumberLineInput
          q={q}
          value={
            value && typeof value === 'object' && typeof (value as any).left === 'number' && typeof (value as any).right === 'number'
              ? (value as { left: number; right: number; leftClosed?: boolean; rightClosed?: boolean })
              : undefined
          }
          onChange={onChange}
          disabled={disabled}
          showFeedback={showFeedback}
          gradeResult={gradeResult ? { isCorrect: gradeResult.isCorrect, correctAnswer: gradeResult.feedback.correctAnswer } : undefined}
        />
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
