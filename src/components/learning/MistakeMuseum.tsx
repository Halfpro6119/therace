/**
 * Mistake Museum – curated "common wrong answers" with "Why students think this" and "Why it's wrong"
 * Design Plan §3A: Metacognition + misconception correction
 */
import React, { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';

export interface MistakeItem {
  /** The wrong answer many students give */
  wrongAnswer: string;
  /** Why students might think this (empathy, no blame) */
  whyStudentsThinkThis: string;
  /** Why it's incorrect / what the correct approach is */
  whyItsWrong: string;
  /** Optional: the correct answer or approach */
  correctApproach?: string;
  /** Optional: topic for filtering (e.g. "Bioenergetics", "Cell Biology") */
  topic?: string;
}

export interface MistakeMuseumProps {
  title?: string;
  items: MistakeItem[];
  /** Growth mindset framing */
  intro?: string;
  /** Initially expanded */
  defaultExpanded?: boolean;
}

export function MistakeMuseum({
  title = "Common mistakes",
  items,
  intro = "Many students choose similar answers. Understanding why helps you avoid the same trap.",
  defaultExpanded = false,
}: MistakeMuseumProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{
        background: 'rgb(var(--surface))',
        borderColor: 'rgb(var(--border))',
      }}
    >
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
        style={{ background: 'rgb(var(--surface-2) / 0.5)' }}
      >
        <div className="flex items-center gap-2">
          <AlertCircle size={20} style={{ color: 'rgb(var(--accent))' }} />
          <span className="font-bold" style={{ color: 'rgb(var(--text))' }}>
            {title}
          </span>
        </div>
        {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {expanded && (
        <div className="p-4 space-y-4">
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            {intro}
          </p>
          <div className="space-y-3">
            {items.map((item, i) => (
              <div
                key={i}
                className="rounded-lg border p-3"
                style={{
                  background: 'rgb(var(--surface-2) / 0.3)',
                  borderColor: 'rgb(var(--border))',
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full text-left flex justify-between items-center"
                >
                  <span className="font-medium text-sm" style={{ color: 'rgb(var(--text))' }}>
                    "Many students choose: {item.wrongAnswer}"
                  </span>
                  {openIndex === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {openIndex === i && (
                  <div className="mt-3 space-y-2 text-sm">
                    <p>
                      <span className="font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>Why students think this:</span>{' '}
                      <span style={{ color: 'rgb(var(--text))' }}>{item.whyStudentsThinkThis}</span>
                    </p>
                    <p>
                      <span className="font-medium" style={{ color: 'rgb(var(--accent))' }}>Why it's wrong:</span>{' '}
                      <span style={{ color: 'rgb(var(--text))' }}>{item.whyItsWrong}</span>
                    </p>
                    {item.correctApproach && (
                      <p>
                        <span className="font-medium" style={{ color: 'rgb(var(--success))' }}>Correct approach:</span>{' '}
                        <span style={{ color: 'rgb(var(--text))' }}>{item.correctApproach}</span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
