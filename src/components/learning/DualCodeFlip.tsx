/**
 * Dual-Code Flip – Tap to flip: see diagram → "What do you see?" → type; see text → "Draw this"
 * Design Plan §3A: Dual coding + retrieval
 */
import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

export type DualCodeMode = 'diagram_first' | 'text_first';

export interface DualCodeFlipProps {
  /** Visual/diagram content */
  diagram: React.ReactNode;
  /** Text/verbal content */
  text: React.ReactNode;
  /** Prompt when showing diagram (retrieval) */
  diagramPrompt?: string;
  /** Prompt when showing text (draw/sketch) */
  textPrompt?: string;
  /** Initial side to show */
  initialMode?: DualCodeMode;
  /** Callback when user submits retrieval (diagram → type) */
  onRetrievalSubmit?: (answer: string) => void;
  /** Callback when user submits draw (text → sketch) – optional, may just be reflective */
  onDrawComplete?: () => void;
  /** Show input for retrieval mode */
  showRetrievalInput?: boolean;
}

export function DualCodeFlip({
  diagram,
  text,
  diagramPrompt = "What do you see? Describe it in words.",
  textPrompt = "Sketch or annotate this in your own way.",
  initialMode = 'diagram_first',
  onRetrievalSubmit,
  onDrawComplete,
  showRetrievalInput = true,
}: DualCodeFlipProps) {
  const [flipped, setFlipped] = useState(false);
  const [retrievalInput, setRetrievalInput] = useState('');
  const [showDiagram, setShowDiagram] = useState(initialMode === 'diagram_first');

  const handleFlip = () => {
    setFlipped(!flipped);
    setShowDiagram(!showDiagram);
  };

  const handleRetrievalSubmit = () => {
    if (retrievalInput.trim() && onRetrievalSubmit) {
      onRetrievalSubmit(retrievalInput.trim());
      setRetrievalInput('');
    }
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
        <div className="aspect-video flex items-center justify-center rounded-lg mb-4" style={{ background: 'rgb(var(--surface-2) / 0.5)' }}>
          {showDiagram ? diagram : text}
        </div>
        <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
          {showDiagram ? diagramPrompt : textPrompt}
        </p>
        {showDiagram && showRetrievalInput && (
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={retrievalInput}
              onChange={(e) => setRetrievalInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleRetrievalSubmit()}
              placeholder="Type your answer..."
              className="flex-1 px-3 py-2 rounded-lg border text-sm"
              style={{
                background: 'rgb(var(--surface-2))',
                borderColor: 'rgb(var(--border))',
                color: 'rgb(var(--text))',
              }}
            />
            <button
              type="button"
              onClick={handleRetrievalSubmit}
              className="px-4 py-2 rounded-lg font-medium text-sm"
              style={{ background: 'rgb(var(--accent))', color: 'white' }}
            >
              Check
            </button>
          </div>
        )}
        {!showDiagram && onDrawComplete && (
          <button
            type="button"
            onClick={onDrawComplete}
            className="px-4 py-2 rounded-lg font-medium text-sm"
            style={{ background: 'rgb(var(--accent))', color: 'white' }}
          >
            Done
          </button>
        )}
        <button
          type="button"
          onClick={handleFlip}
          className="flex items-center gap-2 text-sm font-medium mt-2"
          style={{ color: 'rgb(var(--text-secondary))' }}
        >
          <RotateCcw size={14} />
          Flip to {showDiagram ? 'text' : 'diagram'}
        </button>
      </div>
    </div>
  );
}
