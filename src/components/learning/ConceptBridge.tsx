/**
 * Concept Bridge – "Link these two concepts" — drag and explain the connection
 * Design Plan §3A: Elaboration + synthesis
 */
import React, { useState } from 'react';
import { Link2, Check } from 'lucide-react';

export interface ConceptBridgeProps {
  /** First concept to link */
  conceptA: string;
  /** Second concept to link */
  conceptB: string;
  /** Optional: suggested connection for feedback */
  modelConnection?: string;
  /** Callback when student submits their explanation */
  onSubmit?: (explanation: string) => void;
  /** Show feedback after submit */
  showFeedback?: boolean;
}

export function ConceptBridge({
  conceptA,
  conceptB,
  modelConnection,
  onSubmit,
  showFeedback = true,
}: ConceptBridgeProps) {
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
          <Link2 size={20} style={{ color: 'rgb(var(--accent))' }} />
          <h3 className="font-bold" style={{ color: 'rgb(var(--text))' }}>
            Concept Bridge
          </h3>
        </div>
        <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
          How do these two ideas connect? Drag the concepts together in your mind, then explain the link.
        </p>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span
            className="px-4 py-2 rounded-lg font-medium"
            style={{ background: 'rgb(var(--accent) / 0.15)', color: 'rgb(var(--accent))' }}
          >
            {conceptA}
          </span>
          <span className="text-lg" style={{ color: 'rgb(var(--text-secondary))' }}>↔</span>
          <span
            className="px-4 py-2 rounded-lg font-medium"
            style={{ background: 'rgb(var(--accent) / 0.15)', color: 'rgb(var(--accent))' }}
          >
            {conceptB}
          </span>
        </div>

        <label className="block text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
          Your explanation of the connection:
        </label>
        <textarea
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          placeholder="e.g. Both involve... / X leads to Y because... / They differ in that..."
          rows={4}
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
            className="mt-3 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 disabled:opacity-50"
            style={{ background: 'rgb(var(--accent))', color: 'white' }}
          >
            <Check size={16} />
            Submit connection
          </button>
        ) : (
          showFeedback && modelConnection && (
            <div className="mt-4 p-3 rounded-lg" style={{ background: 'rgb(var(--surface-2) / 0.5)' }}>
              <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--accent))' }}>
                Model connection:
              </p>
              <p className="text-sm" style={{ color: 'rgb(var(--text))' }}>{modelConnection}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
