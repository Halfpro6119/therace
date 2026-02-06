/**
 * Production-ready quiz question components.
 *
 * IMPORTANT CONSTRAINT:
 * - Do not change public site styling.
 * - These components use existing CSS utility classes from src/index.css:
 *   - input, quiz-input
 *   - btn-primary, btn-secondary, btn-icon
 *   - badge, badge-accent, badge-success, badge-warning
 */

import { useCallback, useEffect, useMemo, useRef } from 'react'
import { CheckCircle, XCircle } from 'lucide-react'
import type { NormalizedQuestion, UserResponse } from '../../utils/questionEngine'
import { safeTrim } from '../../utils/questionEngine'

export type QuestionComponentProps = {
  q: NormalizedQuestion
  value: any
  onChange: (v: any) => void
  disabled: boolean
  showFeedback: boolean
  gradeResult?: {
    isCorrect: boolean
    marksAwarded: number
    maxMarks: number
    correctAnswer: string
    summary: string
  }
  onSubmit: () => void
  /** Called with the answer input element (for toolkit/calculator insert) */
  inputRefCallback?: (el: HTMLInputElement | null) => void
}

export function MarksBadge({ q }: { q: NormalizedQuestion }) {
  return (
    <div className="mt-3">
      <span className="badge badge-accent" aria-label={`This question is worth ${q.marks} marks`}>
        {q.marks} mark{q.marks === 1 ? '' : 's'}
      </span>
    </div>
  )
}

export function FeedbackBlock({ show, gradeResult, explanation }: { show: boolean; gradeResult?: any; explanation: string }) {
  if (!show || !gradeResult) return null

  const badgeClass = gradeResult.isCorrect ? 'badge badge-success' : 'badge badge-warning'

  return (
    <div className="mt-6 space-y-3" aria-live="polite">
      <div className="flex items-center justify-between">
        <span className={badgeClass}>
          {gradeResult.isCorrect ? <CheckCircle size={14} /> : <XCircle size={14} />}
          <span>{gradeResult.summary}</span>
        </span>
        <span className="badge badge-accent">
          {gradeResult.marksAwarded}/{gradeResult.maxMarks}
        </span>
      </div>

      {gradeResult.correctAnswer ? (
        <div className="card p-4">
          <div className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            Correct answer:
          </div>
          <div className="font-semibold" style={{ color: 'rgb(var(--text))' }}>
            {gradeResult.correctAnswer}
          </div>
        </div>
      ) : null}

      {explanation ? (
        <div className="card p-4">
          <div className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            Explanation:
          </div>
          <div style={{ color: 'rgb(var(--text))' }}>{explanation}</div>
        </div>
      ) : null}
    </div>
  )
}

// ---------------------------
// Numeric (single number; optional unit, tolerance note)
// ---------------------------

export function NumericQuestion({ q, value, onChange, disabled, onSubmit, inputRefCallback }: QuestionComponentProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const qd = q.meta?.questionData || {}
  const units = typeof qd.units === 'string' ? qd.units : ''
  const tolerance = typeof qd.tolerance === 'number' ? qd.tolerance : typeof qd.numericTolerance === 'number' ? qd.numericTolerance : undefined

  useEffect(() => {
    if (!disabled) inputRef.current?.focus()
  }, [disabled, q.id])

  const setRef = useCallback(
    (el: HTMLInputElement | null) => {
      ;(inputRef as { current: HTMLInputElement | null }).current = el
      inputRefCallback?.(el ?? null)
    },
    [inputRefCallback]
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={setRef}
          type="text"
          inputMode="decimal"
          className="quiz-input"
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') onSubmit() }}
          placeholder="Enter a number..."
          autoComplete="off"
          disabled={disabled}
          aria-label="Numeric answer"
        />
        {units ? <span className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{units}</span> : null}
      </div>
      {tolerance != null && tolerance > 0 && (
        <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>±{tolerance} accepted</p>
      )}
    </div>
  )
}

// ---------------------------
// Multi-numeric (multiple labeled inputs; partial marks)
// ---------------------------

export function MultiNumericQuestion({ q, value, onChange, disabled, onSubmit }: QuestionComponentProps) {
  const qd = q.meta?.questionData || {}
  const fields = Array.isArray(qd.fields) ? qd.fields : []
  const arr: string[] = Array.isArray(value) ? value : fields.map(() => '')

  return (
    <div className="space-y-3" aria-label="Multi-numeric inputs">
      {fields.map((f: { label?: string; answer?: number }, i: number) => (
        <div key={i}>
          <label className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            {f?.label || `Value ${i + 1}`}
          </label>
          <input
            type="text"
            inputMode="decimal"
            className="input w-full"
            value={arr[i] ?? ''}
            onChange={(e) => {
              const next = [...arr]
              next[i] = e.target.value
              onChange(next)
            }}
            onKeyDown={(e) => { if (e.key === 'Enter') onSubmit() }}
            disabled={disabled}
            aria-label={f?.label || `Field ${i + 1}`}
          />
        </div>
      ))}
    </div>
  )
}

// ---------------------------
// Short
// ---------------------------

export function ShortQuestion({ q, value, onChange, disabled, onSubmit, inputRefCallback }: QuestionComponentProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    // Focus only when enabled
    if (!disabled) inputRef.current?.focus()
  }, [disabled, q.id])

  const setRef = useCallback(
    (el: HTMLInputElement | null) => {
      ;(inputRef as { current: HTMLInputElement | null }).current = el
      inputRefCallback?.(el ?? null)
    },
    [inputRefCallback]
  )

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          ref={setRef}
          type="text"
          className="quiz-input"
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSubmit()
          }}
          placeholder="Type your answer..."
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          disabled={disabled}
          aria-label="Answer input"
        />
      </div>
    </div>
  )
}

// ---------------------------
// MCQ
// ---------------------------

export function MCQQuestion({ q, value, onChange, disabled }: QuestionComponentProps) {
  const choices = Array.isArray(q.meta.questionData?.choices) ? q.meta.questionData.choices : []
  const selected = safeTrim(value)

  return (
    <div className="space-y-3" role="radiogroup" aria-label="Multiple choice options">
      {choices.map((c: any) => {
        const key = safeTrim(c?.key)
        const text = safeTrim(c?.text)
        if (!key || !text) return null

        const isSelected = selected === key

        return (
          <button
            key={key}
            type="button"
            className="btn-secondary w-full text-left"
            aria-checked={isSelected}
            role="radio"
            disabled={disabled}
            onClick={() => onChange(key)}
          >
            <span className="font-semibold">{key}.</span> {text}
          </button>
        )
      })}
    </div>
  )
}

// ---------------------------
// Fill
// ---------------------------

export function FillQuestion({ q, value, onChange, disabled }: QuestionComponentProps) {
  const blanks = Number(q.meta.questionData?.blanks || 1)
  const arr: string[] = Array.isArray(value) ? value : Array.from({ length: blanks }).map(() => '')

  return (
    <div className="space-y-3" aria-label="Fill in the blanks inputs">
      {Array.from({ length: blanks }).map((_, i) => (
        <div key={i}>
          <label className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            Blank {i + 1}
          </label>
          <input
            className="input"
            value={arr[i] || ''}
            onChange={(e) => {
              const next = [...arr]
              next[i] = e.target.value
              onChange(next)
            }}
            disabled={disabled}
            aria-label={`Blank ${i + 1}`}
          />
        </div>
      ))}
    </div>
  )
}

// ---------------------------
// Match
// ---------------------------

export function MatchQuestion({ q, value, onChange, disabled }: QuestionComponentProps) {
  const leftItems = Array.isArray(q.meta.questionData?.leftItems) ? q.meta.questionData.leftItems : []
  const rightItems = Array.isArray(q.meta.questionData?.rightItems) ? q.meta.questionData.rightItems : []

  const mapping: Record<string, string> = value && typeof value === 'object' ? value : {}

  return (
    <div className="space-y-3" aria-label="Matching question">
      {leftItems.map((l: any) => {
        const lid = safeTrim(l?.id)
        const ltext = safeTrim(l?.text)
        if (!lid || !ltext) return null

        return (
          <div key={lid} className="card p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="font-semibold" style={{ color: 'rgb(var(--text))' }}>
                {ltext}
              </div>
              <select
                className="input"
                value={mapping[lid] || ''}
                onChange={(e) => {
                  onChange({ ...mapping, [lid]: e.target.value })
                }}
                disabled={disabled}
                aria-label={`Match for ${ltext}`}
              >
                <option value="">Select…</option>
                {rightItems.map((r: any) => {
                  const rid = safeTrim(r?.id)
                  const rtext = safeTrim(r?.text)
                  if (!rid || !rtext) return null
                  return (
                    <option key={rid} value={rid}>
                      {rtext}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ---------------------------
// Label
// ---------------------------

export function LabelQuestion({ q, value, onChange, disabled }: QuestionComponentProps) {
  const labelBank = Array.isArray(q.meta.questionData?.labelBank) ? q.meta.questionData.labelBank : []
  const targets = Array.isArray(q.meta.questionData?.targets) ? q.meta.questionData.targets : []

  const placements: Record<string, string> = value && typeof value === 'object' ? value : {}

  return (
    <div className="space-y-3" aria-label="Labeling question">
      {targets.map((t: any) => {
        const tid = safeTrim(t?.id)
        const prompt = safeTrim(t?.prompt) || `Target ${tid}`
        if (!tid) return null

        return (
          <div key={tid} className="card p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="font-semibold" style={{ color: 'rgb(var(--text))' }}>
                {prompt}
              </div>
              <select
                className="input"
                value={placements[tid] || ''}
                onChange={(e) => onChange({ ...placements, [tid]: e.target.value })}
                disabled={disabled}
                aria-label={`Label for ${prompt}`}
              >
                <option value="">Select…</option>
                {labelBank.map((l: any) => {
                  const lid = safeTrim(l?.id)
                  const ltext = safeTrim(l?.text)
                  if (!lid || !ltext) return null
                  return (
                    <option key={lid} value={lid}>
                      {ltext}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
        )
      })}
    </div>
  )
}
