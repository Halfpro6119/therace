/**
 * Number-line UI for inequalityPlot questions.
 * User selects an interval by dragging left/right handles; shaded region and
 * open/closed endpoints are shown. Submission is graded against accepted intervals.
 */

import { useCallback, useRef, useState } from 'react'
import type { NormalizedQuestion } from '../../utils/questionEngine'
import { parseIntervalFromString, type InequalityInterval } from '../../utils/questionEngine/grade'

const LINE_WIDTH = 500
const PADDING = 48
const LINE_Y = 56
const TICK_HEIGHT = 10
const HANDLE_R = 10
const SHADE_TOP = 24
const SHADE_BOTTOM = 88

export interface InequalityNumberLineValue {
  left: number
  right: number
  leftClosed: boolean
  rightClosed: boolean
}

function getDefaultRange(q: NormalizedQuestion): { min: number; max: number } {
  const qd = q.meta?.questionData || {}
  if (typeof qd.numberLineMin === 'number' && typeof qd.numberLineMax === 'number') {
    return { min: qd.numberLineMin, max: qd.numberLineMax }
  }
  const first = q.answersAccepted?.[0]
  if (first) {
    const interval = parseIntervalFromString(first)
    if (interval) {
      return {
        min: Math.min(interval.left, interval.right) - 2,
        max: Math.max(interval.left, interval.right) + 2,
      }
    }
  }
  return { min: -2, max: 6 }
}

function valueToPx(value: number, min: number, max: number): number {
  const lineLength = LINE_WIDTH - 2 * PADDING
  return PADDING + ((value - min) / (max - min)) * lineLength
}

function pxToValue(px: number, min: number, max: number): number {
  const lineLength = LINE_WIDTH - 2 * PADDING
  return min + ((px - PADDING) / lineLength) * (max - min)
}

function snapToHalf(v: number): number {
  return Math.round(v * 2) / 2
}

export interface InequalityNumberLineInputProps {
  q: NormalizedQuestion
  value: InequalityNumberLineValue | null | undefined
  onChange: (v: InequalityNumberLineValue) => void
  disabled: boolean
  showFeedback?: boolean
  gradeResult?: {
    isCorrect: boolean
    correctAnswer: string
  }
}

export function InequalityNumberLineInput({
  q,
  value,
  onChange,
  disabled,
  showFeedback,
  gradeResult,
}: InequalityNumberLineInputProps) {
  const range = getDefaultRange(q)
  const { min, max } = range
  const lineLength = LINE_WIDTH - 2 * PADDING

  const interval: InequalityNumberLineValue | null =
    value && typeof value.left === 'number' && typeof value.right === 'number'
      ? {
          left: Math.min(value.left, value.right),
          right: Math.max(value.left, value.right),
          leftClosed: value.leftClosed !== false,
          rightClosed: value.rightClosed !== false,
        }
      : null

  const [dragging, setDragging] = useState<'left' | 'right' | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const getEventX = useCallback((e: React.MouseEvent | React.TouchEvent): number | null => {
    const svg = svgRef.current
    if (!svg) return null
    const rect = svg.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0]?.clientX : e.clientX
    if (clientX == null) return null
    const frac = (clientX - rect.left) / rect.width
    return frac * LINE_WIDTH
  }, [])

  const commit = useCallback(
    (left: number, right: number, leftClosed?: boolean, rightClosed?: boolean) => {
      const L = snapToHalf(Math.max(min, Math.min(max, left)))
      const R = snapToHalf(Math.max(min, Math.min(max, right)))
      const a = Math.min(L, R)
      const b = Math.max(L, R)
      onChange({
        left: a,
        right: b,
        leftClosed: leftClosed ?? interval?.leftClosed ?? true,
        rightClosed: rightClosed ?? interval?.rightClosed ?? true,
      })
    },
    [min, max, interval, onChange]
  )

  const handleLineClick = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || dragging) return
      const px = getEventX(e)
      if (px == null) return
      const v = pxToValue(px, min, max)
      const snapped = snapToHalf(v)
      if (interval == null) {
        commit(snapped, snapped)
        return
      }
      const distLeft = Math.abs(snapped - interval.left)
      const distRight = Math.abs(snapped - interval.right)
      if (distLeft <= distRight) {
        commit(snapped, interval.right, undefined, interval.rightClosed)
      } else {
        commit(interval.left, snapped, interval.leftClosed, undefined)
      }
    },
    [disabled, dragging, getEventX, min, max, interval, commit]
  )

  const handleHandleMouseDown = useCallback(
    (e: React.MouseEvent, which: 'left' | 'right') => {
      e.stopPropagation()
      if (disabled) return
      setDragging(which)
    },
    [disabled]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (dragging === null) return
      const px = getEventX(e)
      if (px == null) return
      const v = snapToHalf(pxToValue(px, min, max))
      const clamped = Math.max(min, Math.min(max, v))
      if (!interval) return
      if (dragging === 'left') {
        const newLeft = Math.min(clamped, interval.right - 0.5)
        commit(newLeft, interval.right, interval.leftClosed, interval.rightClosed)
      } else {
        const newRight = Math.max(clamped, interval.left + 0.5)
        commit(interval.left, newRight, interval.leftClosed, interval.rightClosed)
      }
    },
    [dragging, getEventX, min, max, interval, commit]
  )

  const handlePointerUp = useCallback(() => setDragging(null), [])

  const toggleLeftClosed = useCallback(() => {
    if (!interval || disabled) return
    onChange({ ...interval, leftClosed: !interval.leftClosed })
  }, [interval, disabled, onChange])

  const toggleRightClosed = useCallback(() => {
    if (!interval || disabled) return
    onChange({ ...interval, rightClosed: !interval.rightClosed })
  }, [interval, disabled, onChange])

  const correctInterval: InequalityInterval | null =
    showFeedback && gradeResult?.correctAnswer
      ? parseIntervalFromString(gradeResult.correctAnswer)
      : null

  const leftPx = interval ? valueToPx(interval.left, min, max) : null
  const rightPx = interval ? valueToPx(interval.right, min, max) : null
  const correctLeftPx = correctInterval ? valueToPx(correctInterval.left, min, max) : null
  const correctRightPx = correctInterval ? valueToPx(correctInterval.right, min, max) : null

  const ticks: number[] = []
  const step = max - min <= 10 ? 1 : 2
  for (let v = Math.ceil(min); v <= Math.floor(max); v += step) ticks.push(v)

  return (
    <div className="space-y-3">
      <div
        className="rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
        style={{ maxWidth: LINE_WIDTH }}
      >
        <svg
          ref={svgRef}
          width="100%"
          height={112}
          viewBox={`0 0 ${LINE_WIDTH} 112`}
          preserveAspectRatio="xMidYMid meet"
          onMouseMove={handleMouseMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{ touchAction: 'none', cursor: dragging ? 'grabbing' : 'default' }}
        >
          <defs>
            <marker
              id="numberline-arrow"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <polygon points="0 0, 8 4, 0 8" fill="rgb(148, 163, 184)" />
            </marker>
          </defs>

          {/* Correct-answer shaded region (after submit) */}
          {showFeedback && correctLeftPx != null && correctRightPx != null && (
            <rect
              x={correctLeftPx}
              y={SHADE_TOP}
              width={correctRightPx - correctLeftPx}
              height={SHADE_BOTTOM - SHADE_TOP}
              fill={gradeResult?.isCorrect ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.15)'}
              stroke="rgba(34, 197, 94, 0.5)"
              strokeWidth={1}
            />
          )}

          {/* User shaded region */}
          {leftPx != null && rightPx != null && (
            <rect
              x={leftPx}
              y={SHADE_TOP}
              width={rightPx - leftPx}
              height={SHADE_BOTTOM - SHADE_TOP}
              fill={
                showFeedback && !gradeResult?.isCorrect
                  ? 'rgba(239, 68, 68, 0.2)'
                  : 'rgba(59, 130, 246, 0.25)'
              }
              stroke={
                showFeedback && !gradeResult?.isCorrect
                  ? 'rgba(239, 68, 68, 0.6)'
                  : 'rgba(59, 130, 246, 0.6)'
              }
              strokeWidth={1.5}
            />
          )}

          {/* Main line */}
          <line
            x1={PADDING}
            y1={LINE_Y}
            x2={LINE_WIDTH - PADDING}
            y2={LINE_Y}
            stroke="rgb(148, 163, 184)"
            strokeWidth={2}
            markerEnd="url(#numberline-arrow)"
          />

          {/* Ticks and labels */}
          {ticks.map((t) => {
            const x = valueToPx(t, min, max)
            return (
              <g key={t}>
                <line
                  x1={x}
                  y1={LINE_Y - TICK_HEIGHT}
                  x2={x}
                  y2={LINE_Y + TICK_HEIGHT}
                  stroke="rgb(148, 163, 184)"
                  strokeWidth={2}
                />
                <text
                  x={x}
                  y={LINE_Y + 28}
                  fill="rgb(148, 163, 184)"
                  textAnchor="middle"
                  fontSize={14}
                >
                  {t}
                </text>
              </g>
            )
          })}

          {/* Clickable line for setting endpoints */}
          <line
            x1={PADDING}
            y1={LINE_Y}
            x2={LINE_WIDTH - PADDING}
            y2={LINE_Y}
            stroke="transparent"
            strokeWidth={32}
            onClick={handleLineClick}
            style={{ cursor: disabled ? 'default' : 'crosshair' }}
          />

          {/* Left handle */}
          {leftPx != null && (
            <g
              onMouseDown={(e) => handleHandleMouseDown(e, 'left')}
              style={{ cursor: disabled ? 'default' : 'grab' }}
            >
              {interval?.leftClosed ? (
                <circle
                  cx={leftPx}
                  cy={LINE_Y}
                  r={HANDLE_R}
                  fill="rgb(59, 130, 246)"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              ) : (
                <circle
                  cx={leftPx}
                  cy={LINE_Y}
                  r={HANDLE_R}
                  fill="none"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth={2.5}
                />
              )}
            </g>
          )}

          {/* Right handle */}
          {rightPx != null && (
            <g
              onMouseDown={(e) => handleHandleMouseDown(e, 'right')}
              style={{ cursor: disabled ? 'default' : 'grab' }}
            >
              {interval?.rightClosed ? (
                <circle
                  cx={rightPx}
                  cy={LINE_Y}
                  r={HANDLE_R}
                  fill="rgb(59, 130, 246)"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              ) : (
                <circle
                  cx={rightPx}
                  cy={LINE_Y}
                  r={HANDLE_R}
                  fill="none"
                  stroke="rgb(59, 130, 246)"
                  strokeWidth={2.5}
                />
              )}
            </g>
          )}

          {/* Correct-answer endpoints (small markers when wrong) */}
          {showFeedback && correctInterval && !gradeResult?.isCorrect && (
            <>
              <line
                x1={correctLeftPx!}
                y1={SHADE_TOP}
                x2={correctLeftPx!}
                y2={SHADE_BOTTOM}
                stroke="rgb(34, 197, 94)"
                strokeWidth={2}
                strokeDasharray="4 2"
              />
              <line
                x1={correctRightPx!}
                y1={SHADE_TOP}
                x2={correctRightPx!}
                y2={SHADE_BOTTOM}
                stroke="rgb(34, 197, 94)"
                strokeWidth={2}
                strokeDasharray="4 2"
              />
            </>
          )}
        </svg>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="button"
          onClick={toggleLeftClosed}
          disabled={disabled || !interval}
          className="btn-secondary text-sm"
          title="Toggle left endpoint: filled = included, open = excluded"
        >
          Left: {interval?.leftClosed ? '● included' : '○ excluded'}
        </button>
        <button
          type="button"
          onClick={toggleRightClosed}
          disabled={disabled || !interval}
          className="btn-secondary text-sm"
          title="Toggle right endpoint: filled = included, open = excluded"
        >
          Right: {interval?.rightClosed ? '● included' : '○ excluded'}
        </button>
        <span className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          Drag the endpoints or click on the number line to set the solution interval.
        </span>
      </div>

      {interval && (
        <div className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          Interval: {interval.leftClosed ? '[' : '('} {interval.left}, {interval.right}{' '}
          {interval.rightClosed ? ']' : ')'}
        </div>
      )}
    </div>
  )
}
