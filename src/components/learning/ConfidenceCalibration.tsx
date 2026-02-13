/**
 * Confidence Calibration – "How sure are you?" before answer; "Were you right?" after
 * Design Plan §3A: Metacognition – builds awareness of what you know vs don't know
 */
import React from 'react';

export interface ConfidenceCalibrationProps {
  /** 1–5 scale: 1 = guessing, 5 = certain */
  value: number | null;
  onChange: (value: number) => void;
  /** After answering: were they right? */
  wasCorrect?: boolean | null;
  /** Show post-answer calibration feedback */
  showFeedback?: boolean;
}

const LABELS = ['Guessing', 'Unsure', 'Somewhat sure', 'Fairly confident', 'Certain'];

export function ConfidenceCalibration({
  value,
  onChange,
  wasCorrect = null,
  showFeedback = false,
}: ConfidenceCalibrationProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium" style={{ color: 'rgb(var(--text))' }}>
        How sure are you?
      </p>
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium transition"
            style={{
              background: value === n ? 'rgb(var(--accent))' : 'rgb(var(--surface-2))',
              color: value === n ? 'white' : 'rgb(var(--text))',
            }}
          >
            {n}
          </button>
        ))}
      </div>
      {value != null && (
        <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
          {LABELS[value - 1]}
        </p>
      )}
      {showFeedback && wasCorrect !== null && value != null && (
        <div
          className="mt-2 p-2 rounded-lg text-sm"
          style={{
            background: wasCorrect ? 'rgb(var(--success) / 0.15)' : 'rgb(var(--danger) / 0.15)',
            color: wasCorrect ? 'rgb(var(--success))' : 'rgb(var(--danger))',
          }}
        >
          {wasCorrect
            ? `You said ${value} — and you were right! Your confidence matched your knowledge.`
            : `You said ${value} — but the answer was different. This helps you calibrate: next time you're at ${value}, you might want to double-check.`}
        </div>
      )}
    </div>
  );
}
