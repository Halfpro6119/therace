/**
 * Retrieval Before Relearn – "Before we show you, what do you remember?"
 * Design Plan §3A: Retrieval practice — even if wrong, primes the brain
 */
import React, { useState } from 'react';
import { Brain, Eye, RotateCcw } from 'lucide-react';

export interface RetrievalBeforeRelearnProps {
  /** Prompt for retrieval (e.g. "What do you remember about photosynthesis?") */
  prompt: string;
  /** Optional hint to guide recall */
  hint?: string;
  /** The content to reveal after retrieval attempt */
  content: React.ReactNode;
  /** Callback when student attempts retrieval (before reveal) */
  onRetrievalAttempt?: (answer: string) => void;
  /** Callback when student reveals content */
  onReveal?: () => void;
}

export function RetrievalBeforeRelearn({
  prompt,
  hint,
  content,
  onRetrievalAttempt,
  onReveal,
}: RetrievalBeforeRelearnProps) {
  const [retrieval, setRetrieval] = useState('');
  const [revealed, setRevealed] = useState(false);

  const handleAttempt = () => {
    if (retrieval.trim()) {
      onRetrievalAttempt?.(retrieval.trim());
    }
    setRevealed(true);
    onReveal?.();
  };

  const handleReset = () => {
    setRetrieval('');
    setRevealed(false);
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
          <Brain size={20} style={{ color: 'rgb(var(--accent))' }} />
          <h3 className="font-bold" style={{ color: 'rgb(var(--text))' }}>
            Retrieval before relearn
          </h3>
        </div>
        <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
          Before we show you, try to recall. Even a wrong attempt strengthens memory.
        </p>

        <p className="font-medium mb-3" style={{ color: 'rgb(var(--text))' }}>
          {prompt}
        </p>
        {hint && (
          <p className="text-xs mb-3" style={{ color: 'rgb(var(--text-secondary))' }}>
            Hint: {hint}
          </p>
        )}

        {!revealed ? (
          <>
            <textarea
              value={retrieval}
              onChange={(e) => setRetrieval(e.target.value)}
              placeholder="Type what you remember — it's OK if it's incomplete or wrong!"
              rows={4}
              className="w-full px-3 py-2 rounded-lg border text-sm resize-none mb-4"
              style={{
                background: 'rgb(var(--surface-2))',
                borderColor: 'rgb(var(--border))',
                color: 'rgb(var(--text))',
              }}
            />
            <button
              type="button"
              onClick={handleAttempt}
              className="px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2"
              style={{ background: 'rgb(var(--accent))', color: 'white' }}
            >
              <Eye size={16} />
              I've tried — show me
            </button>
          </>
        ) : (
          <>
            {retrieval.trim() && (
              <div className="mb-4 p-3 rounded-lg" style={{ background: 'rgb(var(--surface-2) / 0.5)' }}>
                <p className="text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                  Your recall:
                </p>
                <p className="text-sm" style={{ color: 'rgb(var(--text))' }}>{retrieval}</p>
              </div>
            )}
            <div className="p-4 rounded-lg border mb-4" style={{ background: 'rgb(var(--surface-2) / 0.3)', borderColor: 'rgb(var(--border))' }}>
              {content}
            </div>
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: 'rgb(var(--text-secondary))' }}
            >
              <RotateCcw size={14} />
              Try again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
