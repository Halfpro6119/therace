/**
 * Interactive coordinate grid for graphPlot and geometryConstruct.
 * Users plot points by clicking; points are stored as math coordinates { x, y }.
 * For geometryConstruct: up to 3 points (triangle), draggable.
 * For graphPlot: unlimited points, polyline drawn through them.
 */

import { useCallback, useRef, useState } from 'react'
import type { NormalizedQuestion } from '../../utils/questionEngine'

const GRID_SIZE = 400
const PADDING = 44
const X_MIN = -5
const X_MAX = 5
const Y_MIN = -5
const Y_MAX = 5

export interface GridPoint {
  x: number
  y: number
}

export interface CoordinateGridValue {
  points: GridPoint[]
}

function roundToGrid(x: number): number {
  return Math.round(x * 2) / 2 // half-integer grid
}

function mathToSvg(x: number, y: number): { sx: number; sy: number } {
  const w = GRID_SIZE - 2 * PADDING
  const h = GRID_SIZE - 2 * PADDING
  const sx = PADDING + ((x - X_MIN) / (X_MAX - X_MIN)) * w
  const sy = GRID_SIZE - PADDING - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * h
  return { sx, sy }
}

function svgToMath(sx: number, sy: number): { x: number; y: number } {
  const w = GRID_SIZE - 2 * PADDING
  const h = GRID_SIZE - 2 * PADDING
  const x = X_MIN + ((sx - PADDING) / w) * (X_MAX - X_MIN)
  const y = Y_MIN + ((GRID_SIZE - PADDING - sy) / h) * (Y_MAX - Y_MIN)
  return {
    x: Math.max(X_MIN, Math.min(X_MAX, roundToGrid(x))),
    y: Math.max(Y_MIN, Math.min(Y_MAX, roundToGrid(y))),
  }
}

export interface CoordinateGridInputProps {
  q: NormalizedQuestion
  value: CoordinateGridValue | null | undefined
  onChange: (v: CoordinateGridValue) => void
  disabled: boolean
  mode: 'graphPlot' | 'geometryConstruct'
}

export function CoordinateGridInput({
  q,
  value,
  onChange,
  disabled,
  mode,
}: CoordinateGridInputProps) {
  const points = Array.isArray(value?.points) ? value.points : []
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null)
  const [dragStart, setDragStart] = useState<GridPoint | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const maxPoints = mode === 'geometryConstruct' ? 3 : 50
  const canAdd = points.length < maxPoints

  const getEventCoords = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const svg = svgRef.current
    if (!svg) return null
    const rect = svg.getBoundingClientRect()
    let clientX: number
    let clientY: number
    if ('touches' in e) {
      if (e.touches.length === 0) return null
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }
    const sx = ((clientX - rect.left) / rect.width) * GRID_SIZE
    const sy = ((clientY - rect.top) / rect.height) * GRID_SIZE
    return svgToMath(sx, sy)
  }, [])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (draggingIndex !== null) e.preventDefault()
      handleMouseMove(e as unknown as React.MouseEvent)
    },
    [draggingIndex, handleMouseMove]
  )

  const handleSvgClick = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || !canAdd || draggingIndex !== null) return
      const coords = getEventCoords(e)
      if (!coords) return
      const existing = points.some(
        (p) => Math.abs(p.x - coords.x) < 0.3 && Math.abs(p.y - coords.y) < 0.3
      )
      if (existing) return
      const next = [...points, { x: coords.x, y: coords.y }]
      onChange({ points: next })
    },
    [disabled, canAdd, draggingIndex, points, getEventCoords, onChange]
  )

  const handlePointMouseDown = useCallback(
    (e: React.MouseEvent, index: number) => {
      e.stopPropagation()
      if (disabled) return
      if (mode === 'geometryConstruct') {
        setDraggingIndex(index)
        setDragStart(points[index] ? { ...points[index] } : null)
      }
    },
    [disabled, mode, points]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (draggingIndex === null || dragStart === null) return
      const coords = getEventCoords(e)
      if (!coords) return
      const next = [...points]
      next[draggingIndex] = { x: coords.x, y: coords.y }
      onChange({ points: next })
    },
    [draggingIndex, dragStart, points, getEventCoords, onChange]
  )

  const handlePointerUp = useCallback(() => {
    setDraggingIndex(null)
    setDragStart(null)
  }, [])

  const handleClear = useCallback(() => {
    if (!disabled) onChange({ points: [] })
  }, [disabled, onChange])

  const handleRemoveLast = useCallback(() => {
    if (!disabled && points.length > 0) onChange({ points: points.slice(0, -1) })
  }, [disabled, points, onChange])

  const axisStroke = 'rgb(148, 163, 184)'
  const gridStroke = 'rgba(148, 163, 184, 0.35)'
  const pointFill = 'rgb(59, 130, 246)'
  const lineStroke = 'rgb(59, 130, 246)'

  return (
    <div className="space-y-3">
      <div
        className="rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900"
        style={{ maxWidth: GRID_SIZE }}
      >
        <svg
          ref={svgRef}
          width="100%"
          height={GRID_SIZE}
          viewBox={`0 0 ${GRID_SIZE} ${GRID_SIZE}`}
          preserveAspectRatio="xMidYMid meet"
          onClick={handleSvgClick}
          onMouseMove={handleMouseMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onTouchMove={handleTouchMove}
          onTouchEnd={handlePointerUp}
          onTouchCancel={handlePointerUp}
          style={{ touchAction: draggingIndex !== null ? 'none' : 'manipulation', cursor: canAdd ? 'crosshair' : 'default' }}
        >
          {/* Grid lines */}
          {Array.from({ length: X_MAX - X_MIN + 1 }, (_, i) => {
            const x = X_MIN + i
            const { sx } = mathToSvg(x, 0)
            return (
              <line
                key={`v${x}`}
                x1={sx}
                y1={PADDING}
                x2={sx}
                y2={GRID_SIZE - PADDING}
                stroke={gridStroke}
                strokeWidth={1}
              />
            )
          })}
          {Array.from({ length: Y_MAX - Y_MIN + 1 }, (_, i) => {
            const y = Y_MIN + i
            const { sy } = mathToSvg(0, y)
            return (
              <line
                key={`h${y}`}
                x1={PADDING}
                y1={sy}
                x2={GRID_SIZE - PADDING}
                y2={sy}
                stroke={gridStroke}
                strokeWidth={1}
              />
            )
          })}
          {/* Axes */}
          <line
            x1={PADDING}
            y1={GRID_SIZE / 2}
            x2={GRID_SIZE - PADDING}
            y2={GRID_SIZE / 2}
            stroke={axisStroke}
            strokeWidth={2}
          />
          <line
            x1={GRID_SIZE / 2}
            y1={PADDING}
            x2={GRID_SIZE / 2}
            y2={GRID_SIZE - PADDING}
            stroke={axisStroke}
            strokeWidth={2}
          />
          {/* Axis labels */}
          {[1, 2, 3, 4, 5].map((n) => {
            const { sx } = mathToSvg(n, 0)
            const { sy } = mathToSvg(0, n)
            return (
              <g key={`l${n}`}>
                <text x={sx} y={GRID_SIZE / 2 + 18} fill={axisStroke} textAnchor="middle" fontSize={12}>
                  {n}
                </text>
                <text x={GRID_SIZE / 2 - 12} y={sy + 4} fill={axisStroke} textAnchor="middle" fontSize={12}>
                  {n}
                </text>
              </g>
            )
          })}
          {[-1, -2, -3, -4, -5].map((n) => {
            const { sx } = mathToSvg(n, 0)
            const { sy } = mathToSvg(0, n)
            return (
              <g key={`l${n}`}>
                <text x={sx} y={GRID_SIZE / 2 + 18} fill={axisStroke} textAnchor="middle" fontSize={12}>
                  {n}
                </text>
                <text x={GRID_SIZE / 2 - 12} y={sy + 4} fill={axisStroke} textAnchor="middle" fontSize={12}>
                  {n}
                </text>
              </g>
            )
          })}
          <text x={GRID_SIZE - PADDING + 12} y={GRID_SIZE / 2 + 4} fill={axisStroke} fontSize={14} fontWeight="bold">
            x
          </text>
          <text x={GRID_SIZE / 2 - 8} y={PADDING - 8} fill={axisStroke} fontSize={14} fontWeight="bold">
            y
          </text>

          {/* Polyline for graphPlot */}
          {mode === 'graphPlot' && points.length >= 2 && (
            <polyline
              points={points.map((p) => {
                const { sx, sy } = mathToSvg(p.x, p.y)
                return `${sx},${sy}`
              }).join(' ')}
              fill="none"
              stroke={lineStroke}
              strokeWidth={2}
              strokeLinejoin="round"
            />
          )}

          {/* Polygon for geometryConstruct (triangle) */}
          {mode === 'geometryConstruct' && points.length >= 2 && (
            <polygon
              points={points.map((p) => {
                const { sx, sy } = mathToSvg(p.x, p.y)
                return `${sx},${sy}`
              }).join(' ')}
              fill="rgba(59, 130, 246, 0.15)"
              stroke={lineStroke}
              strokeWidth={2}
            />
          )}

          {/* Drawn points */}
          {points.map((p, i) => {
            const { sx, sy } = mathToSvg(p.x, p.y)
            return (
              <g key={i}>
                <circle
                  cx={sx}
                  cy={sy}
                  r={mode === 'geometryConstruct' ? 8 : 5}
                  fill={pointFill}
                  stroke="#2563eb"
                  strokeWidth={2}
                  onMouseDown={(e) => handlePointMouseDown(e, i)}
                  style={{ cursor: mode === 'geometryConstruct' ? 'grab' : 'default' }}
                />
                {mode === 'geometryConstruct' && (
                  <text x={sx + 10} y={sy - 6} fill={pointFill} fontSize={12} fontWeight="bold">
                    {['A', 'B', 'C'][i]}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <button
          type="button"
          onClick={handleRemoveLast}
          disabled={disabled || points.length === 0}
          className="btn-secondary text-sm"
        >
          Remove last point
        </button>
        <button
          type="button"
          onClick={handleClear}
          disabled={disabled || points.length === 0}
          className="btn-secondary text-sm"
        >
          Clear
        </button>
        <span className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          {mode === 'graphPlot'
            ? 'Click on the grid to plot points. They will be joined in order.'
            : 'Click to place vertices A, B, C (triangle). Drag to move.'}
          {points.length > 0 && ` (${points.length} point${points.length === 1 ? '' : 's'})`}
        </span>
      </div>
    </div>
  )
}
