/**
 * Protractor overlay for bearing diagrams. Aligns to the diagram grid (viewBox 0 0 500 500)
 * with origin at point A (250, 350). North = 0°, clockwise. Snaps to 1° for accurate measurement.
 */

import { useCallback, useEffect, useRef, useState } from 'react';

const VIEW_WIDTH = 500;
const VIEW_HEIGHT = 500;
const AX = 250;
const AY = 350;
const PROTRACTOR_RADIUS = 130;
const SNAP_DEGREES = 1;

function bearingToPoint(deg: number, r: number): { x: number; y: number } {
  const rad = (deg * Math.PI) / 180;
  return {
    x: AX + r * Math.sin(rad),
    y: AY - r * Math.cos(rad),
  };
}

function pointToBearing(px: number, py: number): number {
  const dx = px - AX;
  const dy = py - AY;
  let deg = (Math.atan2(dx, -dy) * 180) / Math.PI;
  if (deg < 0) deg += 360;
  return deg;
}

function snapToGrid(deg: number): number {
  const n = Math.round(deg / SNAP_DEGREES) * SNAP_DEGREES;
  if (n >= 360) return 0;
  if (n < 0) return 360 + n;
  return n;
}

export interface BearingProtractorOverlayProps {
  /** Current answer value (degrees as string), used to show initial angle */
  value?: string;
  /** Called when user selects an angle (snapped to degree grid) */
  onChange?: (degrees: number) => void;
  disabled?: boolean;
  /** Optional: show degree grid lines (matches diagram's showDegreeGrid) */
  showGrid?: boolean;
}

export function BearingProtractorOverlay({
  value,
  onChange,
  disabled = false,
  showGrid = false,
}: BearingProtractorOverlayProps) {
  const parsedValue = value != null && String(value).trim() !== '' ? parseInt(String(value), 10) : null;
  const validValue = parsedValue != null && !Number.isNaN(parsedValue) && parsedValue >= 0 && parsedValue < 360 ? parsedValue : null;
  const [angle, setAngle] = useState<number | null>(validValue ?? 0);
  const [isDragging, setIsDragging] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!isDragging && validValue != null) setAngle(validValue);
  }, [validValue, isDragging]);

  const displayAngle = angle !== null ? angle : (validValue ?? 0);
  const snappedAngle = snapToGrid(displayAngle);

  const getPoint = useCallback((e: React.MouseEvent | MouseEvent): { x: number; y: number } | null => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const scaleX = VIEW_WIDTH / rect.width;
    const scaleY = VIEW_HEIGHT / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (disabled) return;
      e.preventDefault();
      const pt = getPoint(e);
      if (!pt) return;
      const deg = pointToBearing(pt.x, pt.y);
      const snapped = snapToGrid(deg);
      setAngle(snapped);
      setIsDragging(true);
      onChange?.(snapped);
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [disabled, getPoint, onChange]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || disabled) return;
      const pt = getPoint(e);
      if (!pt) return;
      const deg = pointToBearing(pt.x, pt.y);
      const snapped = snapToGrid(deg);
      setAngle(snapped);
      onChange?.(snapped);
    },
    [isDragging, disabled, getPoint, onChange]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (isDragging) {
        (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
        setIsDragging(false);
      }
    },
    [isDragging]
  );

  const rayEnd = bearingToPoint(snappedAngle, PROTRACTOR_RADIUS);

  const tickMarks = Array.from({ length: 72 }, (_, i) => {
    const deg = i * 5;
    const inner = deg % 10 === 0 ? PROTRACTOR_RADIUS - 12 : PROTRACTOR_RADIUS - 6;
    const outer = PROTRACTOR_RADIUS;
    const start = bearingToPoint(deg, inner);
    const end = bearingToPoint(deg, outer);
    return { deg, start, end, isMajor: deg % 10 === 0 };
  });

  const labels = Array.from({ length: 36 }, (_, i) => {
    const deg = i * 10;
    if (deg >= 360) return null;
    const pos = bearingToPoint(deg, PROTRACTOR_RADIUS - 22);
    return { deg, x: pos.x, y: pos.y };
  }).filter(Boolean) as { deg: number; x: number; y: number }[];

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      className="absolute inset-0 w-full h-full block"
      style={{ pointerEvents: disabled ? 'none' : 'auto', touchAction: 'none' }}
      preserveAspectRatio="xMidYMid meet"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <defs>
        <filter id="protractor-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Optional grid (matches diagram) */}
      {showGrid && (
        <g opacity="0.3" stroke="#64748b" strokeWidth="0.5">
          {Array.from({ length: 36 }, (_, i) => {
            const deg = i * 10;
            const rad = (deg * Math.PI) / 180;
            const x2 = AX + 120 * Math.sin(rad);
            const y2 = AY - 120 * Math.cos(rad);
            return (
              <line key={i} x1={AX} y1={AY} x2={x2} y2={y2} />
            );
          })}
          {[40, 80, 120].map((r) => (
            <circle key={r} cx={AX} cy={AY} r={r} fill="none" />
          ))}
        </g>
      )}

      {/* Protractor arc (full 360) */}
      <circle
        cx={AX}
        cy={AY}
        r={PROTRACTOR_RADIUS}
        fill="rgba(30, 41, 59, 0.85)"
        stroke="rgb(148, 163, 184)"
        strokeWidth="2"
        filter="url(#protractor-shadow)"
      />
      <circle
        cx={AX}
        cy={AY}
        r={PROTRACTOR_RADIUS}
        fill="none"
        stroke="rgb(148, 163, 184)"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Tick marks - snap to 5° grid */}
      <g stroke="rgb(226, 232, 240)" strokeWidth="1">
        {tickMarks.map(({ start, end, isMajor }, i) => (
          <line
            key={i}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            strokeWidth={isMajor ? 1.5 : 1}
          />
        ))}
      </g>

      {/* Degree labels (every 10°) */}
      <g fill="rgb(226, 232, 240)" fontSize="11" textAnchor="middle" dominantBaseline="middle" fontFamily="system-ui, sans-serif">
        {labels.map(({ deg, x, y }) => (
          <text key={deg} x={x} y={y}>
            {deg === 0 ? '0' : deg}
          </text>
        ))}
      </g>

      {/* North indicator */}
      <g fill="rgb(96, 165, 250)">
        <text x={AX} y={AY - PROTRACTOR_RADIUS - 14} textAnchor="middle" fontSize="12" fontWeight="bold">
          N
        </text>
      </g>

      {/* Draggable ray from A */}
      <line
        x1={AX}
        y1={AY}
        x2={rayEnd.x}
        y2={rayEnd.y}
        stroke="rgb(96, 165, 250)"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ pointerEvents: 'none' }}
      />

      {/* Center dot */}
      <circle cx={AX} cy={AY} r="4" fill="rgb(96, 165, 250)" />

      {/* Current angle label */}
      <text
        x={AX}
        y={AY + PROTRACTOR_RADIUS + 24}
        textAnchor="middle"
        fill="rgb(226, 232, 240)"
        fontSize="14"
        fontWeight="bold"
      >
        {snappedAngle.toString().padStart(3, '0')}°
      </text>
      <text
        x={AX}
        y={AY + PROTRACTOR_RADIUS + 42}
        textAnchor="middle"
        fill="rgb(148, 163, 184)"
        fontSize="11"
      >
        Drag protractor to measure
      </text>
    </svg>
  );
}
