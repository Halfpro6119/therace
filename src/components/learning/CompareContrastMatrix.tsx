/**
 * Compare & Contrast Matrix – Two concepts side-by-side; "What's the same? What's different?" — drag statements
 * Design Plan §3A: Elaboration + discrimination
 */
import React, { useState } from 'react';
import { Columns, Check } from 'lucide-react';

export type MatrixColumn = 'same' | 'conceptA' | 'conceptB';

export interface CompareStatement {
  id: string;
  text: string;
  /** Correct column for this statement */
  correctColumn: MatrixColumn;
}

export interface CompareContrastMatrixProps {
  conceptA: string;
  conceptB: string;
  statements: CompareStatement[];
  /** Callback when complete */
  onComplete?: (placements: Record<string, MatrixColumn>) => void;
}

export function CompareContrastMatrix({
  conceptA,
  conceptB,
  statements,
  onComplete,
}: CompareContrastMatrixProps) {
  const [placements, setPlacements] = useState<Record<string, MatrixColumn>>({});
  const [submitted, setSubmitted] = useState(false);

  const allPlaced = statements.every((s) => placements[s.id]);
  const correctCount = statements.filter((s) => placements[s.id] === s.correctColumn).length;

  const handleDrop = (statementId: string, column: MatrixColumn) => {
    setPlacements((p) => ({ ...p, [statementId]: column }));
  };

  const handleRemove = (statementId: string) => {
    setPlacements((p) => {
      const next = { ...p };
      delete next[statementId];
      return next;
    });
  };

  const handleSubmit = () => {
    if (!allPlaced) return;
    onComplete?.(placements);
    setSubmitted(true);
  };

  const unplaced = statements.filter((s) => !placements[s.id]);
  const columnItems = (col: MatrixColumn) => statements.filter((s) => placements[s.id] === col);

  const DropZone = ({ column, label }: { column: MatrixColumn; label: string }) => (
    <div
      className="min-h-[80px] p-3 rounded-lg border-2 border-dashed"
      style={{
        borderColor: 'rgb(var(--border))',
        background: 'rgb(var(--surface-2) / 0.3)',
      }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('statementId');
        if (id) handleDrop(id, column);
      }}
    >
      <p className="text-xs font-bold mb-2 uppercase" style={{ color: 'rgb(var(--text-secondary))' }}>
        {label}
      </p>
      <div className="space-y-1">
        {columnItems(column).map((s) => (
          <span
            key={s.id}
            className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs cursor-move"
            style={{
              background: submitted
                ? s.correctColumn === column
                  ? 'rgb(var(--success) / 0.2)'
                  : 'rgb(var(--error) / 0.2)'
                : 'rgb(var(--accent) / 0.15)',
              color: submitted
                ? s.correctColumn === column
                  ? 'rgb(var(--success))'
                  : 'rgb(var(--error))'
                : 'rgb(var(--text))',
            }}
            draggable={!submitted}
            onDragStart={(e) => e.dataTransfer.setData('statementId', s.id)}
          >
            {s.text}
            {!submitted && (
              <button
                type="button"
                onClick={() => handleRemove(s.id)}
                className="ml-1 hover:opacity-70"
                aria-label="Remove"
              >
                ×
              </button>
            )}
          </span>
        ))}
      </div>
    </div>
  );

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
          <Columns size={20} style={{ color: 'rgb(var(--accent))' }} />
          <h3 className="font-bold" style={{ color: 'rgb(var(--text))' }}>
            Compare & Contrast
          </h3>
        </div>
        <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
          Drag each statement to the correct column: Same (both), {conceptA} only, or {conceptB} only.
        </p>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <DropZone column="same" label="Same (both)" />
          <DropZone column="conceptA" label={conceptA} />
          <DropZone column="conceptB" label={conceptB} />
        </div>

        <div className="mb-4">
          <p className="text-xs font-medium mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
            Statements to place:
          </p>
          <div className="flex flex-wrap gap-2">
            {unplaced.map((s) => (
              <span
                key={s.id}
                className="px-3 py-2 rounded-lg text-sm cursor-move"
                style={{
                  background: 'rgb(var(--surface-2))',
                  borderColor: 'rgb(var(--border))',
                  color: 'rgb(var(--text))',
                  border: '1px solid',
                }}
                draggable={!submitted}
                onDragStart={(e) => e.dataTransfer.setData('statementId', s.id)}
              >
                {s.text}
              </span>
            ))}
          </div>
        </div>

        {!submitted ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!allPlaced}
            className="px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 disabled:opacity-50"
            style={{ background: 'rgb(var(--accent))', color: 'white' }}
          >
            <Check size={16} />
            Check
          </button>
        ) : (
          <p className="text-sm font-medium" style={{ color: 'rgb(var(--accent))' }}>
            {correctCount} / {statements.length} correct
          </p>
        )}
      </div>
    </div>
  );
}
