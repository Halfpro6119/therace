/**
 * Feedback Architecture – growth mindset framing, never punitive
 * Design Plan §3: "Let's see what went wrong" / "Mistakes are how we learn"
 */
import React from 'react';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

export type FeedbackType = 'correct' | 'incorrect' | 'partial';

export interface FeedbackMessageProps {
  type: FeedbackType;
  /** Brief reason (e.g. "The formula is F = ma") */
  reason?: string;
  /** Optional: "Why is that right?" / "Why did that go wrong?" expandable */
  elaborative?: string;
  /** Show growth mindset framing */
  growthMindset?: boolean;
}

const FRAMING = {
  correct: {
    short: "That's right!",
    growth: "You're building your brain.",
    icon: CheckCircle2,
    color: 'rgb(var(--success))',
  },
  incorrect: {
    short: "Let's see what went wrong",
    growth: "Mistakes are how we learn — that's how you know it's working.",
    icon: XCircle,
    color: 'rgb(var(--danger))',
  },
  partial: {
    short: "You're on the right track",
    growth: "A few tweaks and you'll have it.",
    icon: HelpCircle,
    color: 'rgb(var(--accent))',
  },
};

export function FeedbackMessage({
  type,
  reason,
  elaborative,
  growthMindset = true,
}: FeedbackMessageProps) {
  const [showElaborative, setShowElaborative] = React.useState(false);
  const f = FRAMING[type];
  const Icon = f.icon;

  return (
    <div
      className="rounded-xl border p-4"
      style={{
        background: `${f.color}15`,
        borderColor: `${f.color}40`,
      }}
    >
      <div className="flex items-start gap-3">
        <Icon size={24} style={{ color: f.color, flexShrink: 0 }} />
        <div className="min-w-0 flex-1">
          <p className="font-bold" style={{ color: f.color }}>
            {f.short}
          </p>
          {growthMindset && (
            <p className="text-sm mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>
              {f.growth}
            </p>
          )}
          {reason && (
            <p className="mt-2 text-sm" style={{ color: 'rgb(var(--text))' }}>
              {reason}
            </p>
          )}
          {elaborative && (
            <>
              <button
                type="button"
                onClick={() => setShowElaborative(!showElaborative)}
                className="mt-2 text-sm font-medium hover:underline"
                style={{ color: 'rgb(var(--accent))' }}
              >
                {showElaborative ? 'Hide' : 'Why?'}
              </button>
              {showElaborative && (
                <p className="mt-2 text-sm p-2 rounded" style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text))' }}>
                  {elaborative}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
