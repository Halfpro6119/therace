/**
 * Explain Like I'm 11 – "Explain this so an 11-year-old would get it"
 * Design Plan §3A: Feynman technique
 */
import React, { useState } from 'react';
import { MessageCircle, Lightbulb } from 'lucide-react';

export interface ExplainLikeIm11Props {
  /** The concept to explain */
  concept: string;
  /** Optional context or subject */
  context?: string;
  /** Model explanation for comparison */
  modelExplanation?: string;
  /** Callback when student submits */
  onSubmit?: (explanation: string) => void;
  /** Show model after submit */
  showModel?: boolean;
}

export function ExplainLikeIm11({
  concept,
  context,
  modelExplanation,
  onSubmit,
  showModel = true,
}: ExplainLikeIm11Props) {
  const [explanation, setExplanation] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!explanation.trim()) return;
    onSubmit?.(explanation.trim());
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
          <MessageCircle size={20} style={{ color: 'rgb(var(--accent))' }} />
          <h3 className="font-bold" style={{ color: 'rgb(var(--text))' }}>
            Explain like I'm 11
          </h3>
        </div>
        <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
          If you can't explain it simply, you don't understand it well enough. Explain so a Year 6 student would get it.
        </p>

        <div className="p-3 rounded-lg mb-4" style={{ background: 'rgb(var(--accent) / 0.1)' }}>
          <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>
            {concept}
            {context && (
              <span className="font-normal text-sm ml-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                ({context})
              </span>
            )}
          </p>
        </div>

        <label className="block text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
          Your explanation:
        </label>
        <textarea
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          placeholder="Use simple words. No jargon. Imagine explaining to a friend who hasn't studied this."
          rows={5}
          disabled={submitted}
          className="w-full px-3 py-2 rounded-lg border text-sm resize-none"
          style={{
            background: 'rgb(var(--surface-2))',
            borderColor: 'rgb(var(--border))',
            color: 'rgb(var(--text))',
          }}
        />

        {!submitted ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!explanation.trim()}
            className="mt-3 px-4 py-2 rounded-lg font-medium text-sm disabled:opacity-50"
            style={{ background: 'rgb(var(--accent))', color: 'white' }}
          >
            Submit
          </button>
        ) : (
          showModel && modelExplanation && (
            <div className="mt-4 p-3 rounded-lg flex gap-2" style={{ background: 'rgb(var(--surface-2) / 0.5)' }}>
              <Lightbulb size={18} className="flex-shrink-0 mt-0.5" style={{ color: 'rgb(var(--accent))' }} />
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--accent))' }}>
                  Model explanation:
                </p>
                <p className="text-sm" style={{ color: 'rgb(var(--text))' }}>{modelExplanation}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
