/**
 * Factor Essay Planning Triangle – for AQA History factor-evaluation essays.
 * Centre = question factor (read-only). Three corners = user’s factors + annotations.
 * Stays visible and editable during the writing task.
 */

import { useState } from 'react';
import type { FactorEssayPlan, FactorEssayCorner } from '../types/historyHub';

export interface FactorEssayPlanningTriangleProps {
  /** The factor from the question (e.g. "War", "Science and technology") – read-only. */
  centreLabel: string;
  /** Current plan; corners can be edited. */
  plan: FactorEssayPlan;
  /** Called when the user edits a corner (factor label or annotation). */
  onChange: (plan: FactorEssayPlan) => void;
  /** Optional: collapse to a small bar so more space for the essay. */
  collapsible?: boolean;
  /** Optional class for the container. */
  className?: string;
}

const DEFAULT_CORNER: FactorEssayCorner = { factorLabel: '', annotation: '' };

export function FactorEssayPlanningTriangle({
  centreLabel,
  plan,
  onChange,
  collapsible = true,
  className = '',
}: FactorEssayPlanningTriangleProps) {
  const [collapsed, setCollapsed] = useState(false);
  const corners = plan.corners;

  const updateCorner = (index: 0 | 1 | 2, field: 'factorLabel' | 'annotation', value: string) => {
    const next = [...corners] as [FactorEssayCorner, FactorEssayCorner, FactorEssayCorner];
    next[index] = { ...next[index], [field]: value };
    onChange({ ...plan, corners: next });
  };

  if (collapsed) {
    return (
      <div
        className={`rounded-xl border p-3 ${className}`}
        style={{
          background: 'rgb(var(--surface))',
          borderColor: 'rgb(var(--border))',
        }}
      >
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          className="flex items-center justify-between w-full text-left font-medium"
          style={{ color: 'rgb(var(--text))' }}
        >
          <span>Factor plan: {centreLabel}</span>
          <span className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            Expand
          </span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border p-4 ${className}`}
      style={{
        background: 'rgb(var(--surface))',
        borderColor: 'rgb(var(--border))',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold" style={{ color: 'rgb(var(--text))' }}>
          Your factor plan
        </h3>
        {collapsible && (
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            className="text-xs"
            style={{ color: 'rgb(var(--text-secondary))' }}
          >
            Minimise
          </button>
        )}
      </div>

      {/* Triangle layout: centre in middle, three corners at top-left, top-right, bottom */}
      <div className="relative w-full max-w-sm mx-auto" style={{ minHeight: 200 }}>
        {/* Centre */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 rounded-lg border-2 p-3 text-center"
          style={{
            background: 'rgb(var(--accent) / 0.08)',
            borderColor: 'rgb(var(--accent))',
          }}
        >
          <p className="text-xs font-medium mb-0.5" style={{ color: 'rgb(var(--text-secondary))' }}>
            Question factor
          </p>
          <p className="text-sm font-bold break-words" style={{ color: 'rgb(var(--text))' }}>
            {centreLabel}
          </p>
        </div>

        {/* Corner 1 – top-left */}
        <div className="absolute left-0 top-0 w-36">
          <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
            Factor 1
          </label>
          <input
            type="text"
            value={corners[0]?.factorLabel ?? ''}
            onChange={(e) => updateCorner(0, 'factorLabel', e.target.value)}
            placeholder="e.g. Government"
            className="w-full rounded border px-2 py-1.5 text-sm mb-1"
            style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
          />
          <textarea
            value={corners[0]?.annotation ?? ''}
            onChange={(e) => updateCorner(0, 'annotation', e.target.value)}
            placeholder="Notes / evidence..."
            rows={2}
            className="w-full rounded border px-2 py-1 text-xs resize-none"
            style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
          />
        </div>

        {/* Corner 2 – top-right */}
        <div className="absolute right-0 top-0 w-36 text-right">
          <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
            Factor 2
          </label>
          <input
            type="text"
            value={corners[1]?.factorLabel ?? ''}
            onChange={(e) => updateCorner(1, 'factorLabel', e.target.value)}
            placeholder="e.g. Religion"
            className="w-full rounded border px-2 py-1.5 text-sm mb-1"
            style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
          />
          <textarea
            value={corners[1]?.annotation ?? ''}
            onChange={(e) => updateCorner(1, 'annotation', e.target.value)}
            placeholder="Notes / evidence..."
            rows={2}
            className="w-full rounded border px-2 py-1 text-xs resize-none"
            style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
          />
        </div>

        {/* Corner 3 – bottom */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-36">
          <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
            Factor 3
          </label>
          <input
            type="text"
            value={corners[2]?.factorLabel ?? ''}
            onChange={(e) => updateCorner(2, 'factorLabel', e.target.value)}
            placeholder="e.g. Role of the individual"
            className="w-full rounded border px-2 py-1.5 text-sm mb-1"
            style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
          />
          <textarea
            value={corners[2]?.annotation ?? ''}
            onChange={(e) => updateCorner(2, 'annotation', e.target.value)}
            placeholder="Notes / evidence..."
            rows={2}
            className="w-full rounded border px-2 py-1 text-xs resize-none"
            style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
          />
        </div>
      </div>

      <p className="text-xs mt-3" style={{ color: 'rgb(var(--text-secondary))' }}>
        You can edit this plan at any time while writing. Compare each factor to the question factor in your essay.
      </p>
    </div>
  );
}

/** Create an empty plan with a given centre (question factor). */
export function createEmptyFactorPlan(centreLabel: string): FactorEssayPlan {
  return {
    centreLabel,
    corners: [
      { ...DEFAULT_CORNER },
      { ...DEFAULT_CORNER },
      { ...DEFAULT_CORNER },
    ],
  };
}
