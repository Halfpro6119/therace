/**
 * Worked Example Fade – First 2 steps shown, rest blank; student completes
 * Design Plan §3A: Worked examples + completion effect
 */
import React, { useState } from 'react';
import { ListOrdered, Check } from 'lucide-react';

export interface WorkedStep {
  id: string;
  /** Content shown (or blank for student to fill) */
  content: string;
  /** If true, this step is given; if false, student fills */
  given: boolean;
  /** Model answer when not given */
  modelAnswer?: string;
}

export interface WorkedExampleFadeProps {
  title?: string;
  /** Problem statement */
  problem: string;
  /** Steps: first N given, rest for student */
  steps: WorkedStep[];
  /** Callback when student completes */
  onComplete?: (answers: Record<string, string>) => void;
}

export function WorkedExampleFade({
  title = "Worked Example",
  problem,
  steps,
  onComplete,
}: WorkedExampleFadeProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const blankSteps = steps.filter((s) => !s.given);
  const allFilled = blankSteps.every((s) => (answers[s.id] ?? '').trim().length > 0);

  const handleSubmit = () => {
    if (!allFilled) return;
    onComplete?.(answers);
    setSubmitted(true);
  };

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{
        background: 'rgb(var(--surface))',
        borderColor: 'rgb(var(--border))',
      }}
    >
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <ListOrdered size={20} style={{ color: 'rgb(var(--accent))' }} />
          <h3 className="font-bold" style={{ color: 'rgb(var(--text))' }}>
            {title}
          </h3>
        </div>
        <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
          The first steps are shown. Complete the rest — what would the next step be?
        </p>

        <div className="p-3 rounded-lg mb-4" style={{ background: 'rgb(var(--surface-2) / 0.5)' }}>
          <p className="font-medium text-sm" style={{ color: 'rgb(var(--text))' }}>{problem}</p>
        </div>

        <ol className="space-y-3 list-decimal list-inside">
          {steps.map((step, idx) => (
            <li key={step.id} className="flex gap-2 items-start">
              <span className="font-medium text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                {idx + 1}.
              </span>
              {step.given ? (
                <span className="text-sm" style={{ color: 'rgb(var(--text))' }}>{step.content}</span>
              ) : (
                <div className="flex-1">
                  <input
                    type="text"
                    value={answers[step.id] ?? ''}
                    onChange={(e) => setAnswers((a) => ({ ...a, [step.id]: e.target.value }))}
                    placeholder="Your next step..."
                    disabled={submitted}
                    className="w-full px-3 py-2 rounded border text-sm"
                    style={{
                      background: 'rgb(var(--surface-2))',
                      borderColor: 'rgb(var(--border))',
                      color: 'rgb(var(--text))',
                    }}
                  />
                  {submitted && step.modelAnswer && (
                    <p className="mt-1 text-xs" style={{ color: 'rgb(var(--accent))' }}>
                      Model: {step.modelAnswer}
                    </p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ol>

        {!submitted && (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allFilled}
            className="mt-4 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 disabled:opacity-50"
            style={{ background: 'rgb(var(--accent))', color: 'white' }}
          >
            <Check size={16} />
            Check
          </button>
        )}
      </div>
    </div>
  );
}
