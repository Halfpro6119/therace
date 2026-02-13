/**
 * Schema Builder – "Build the big picture" — drag concepts into hierarchy or flow diagram
 * Design Plan §3A: Chunking + organization
 */
import React, { useState } from 'react';
import { GitBranch, Check } from 'lucide-react';

export type SchemaLayout = 'hierarchy' | 'flow' | 'cycle';

export interface SchemaNode {
  id: string;
  label: string;
  /** For hierarchy: parent id; for flow: next id; root has no parent */
  parentId?: string;
  /** Correct position (for feedback) */
  correctPosition?: string;
}

export interface SchemaBuilderProps {
  title?: string;
  layout: SchemaLayout;
  /** Central/root concept */
  centralConcept?: string;
  /** Concepts to place */
  nodes: SchemaNode[];
  /** Slots/targets for placement (e.g. "Level 1", "Level 2", "Step 1", "Step 2") */
  slots: { id: string; label: string }[];
  /** Mapping: node id -> correct slot id */
  correctMapping: Record<string, string>;
  /** Callback when complete */
  onComplete?: (mapping: Record<string, string>) => void;
}

export function SchemaBuilder({
  title = "Schema Builder",
  layout,
  centralConcept,
  nodes,
  slots,
  correctMapping,
  onComplete,
}: SchemaBuilderProps) {
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const allPlaced = nodes.every((n) => mapping[n.id]);
  const correctCount = nodes.filter((n) => mapping[n.id] === correctMapping[n.id]).length;

  const handleDrop = (nodeId: string, slotId: string) => {
    setMapping((m) => ({ ...m, [nodeId]: slotId }));
  };

  const handleRemove = (nodeId: string) => {
    setMapping((m) => {
      const next = { ...m };
      delete next[nodeId];
      return next;
    });
  };

  const handleSubmit = () => {
    if (!allPlaced) return;
    onComplete?.(mapping);
    setSubmitted(true);
  };

  const unplaced = nodes.filter((n) => !mapping[n.id]);
  const slotItems = (slotId: string) => nodes.filter((n) => mapping[n.id] === slotId);

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
          <GitBranch size={20} style={{ color: 'rgb(var(--accent))' }} />
          <h3 className="font-bold" style={{ color: 'rgb(var(--text))' }}>
            {title}
          </h3>
        </div>
        <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
          Build the big picture. Drag each concept to its correct place in the {layout}.
        </p>

        {centralConcept && (
          <div className="text-center py-2 mb-4 px-4 rounded-lg" style={{ background: 'rgb(var(--accent) / 0.15)' }}>
            <p className="font-bold" style={{ color: 'rgb(var(--accent))' }}>{centralConcept}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="min-h-[60px] p-3 rounded-lg border-2 border-dashed"
              style={{
                borderColor: 'rgb(var(--border))',
                background: 'rgb(var(--surface-2) / 0.3)',
              }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const id = e.dataTransfer.getData('nodeId');
                if (id) handleDrop(id, slot.id);
              }}
            >
              <p className="text-xs font-bold mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                {slot.label}
              </p>
              <div className="flex flex-wrap gap-1">
                {slotItems(slot.id).map((n) => (
                  <span
                    key={n.id}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs cursor-move"
                    style={{
                      background: submitted
                        ? correctMapping[n.id] === slot.id
                          ? 'rgb(var(--success) / 0.2)'
                          : 'rgb(var(--error) / 0.2)'
                        : 'rgb(var(--accent) / 0.15)',
                      color: submitted
                        ? correctMapping[n.id] === slot.id
                          ? 'rgb(var(--success))'
                          : 'rgb(var(--error))'
                        : 'rgb(var(--text))',
                    }}
                    draggable={!submitted}
                    onDragStart={(e) => e.dataTransfer.setData('nodeId', n.id)}
                  >
                    {n.label}
                    {!submitted && (
                      <button
                        type="button"
                        onClick={() => handleRemove(n.id)}
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
          ))}
        </div>

        <div className="mb-4">
          <p className="text-xs font-medium mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
            Concepts to place:
          </p>
          <div className="flex flex-wrap gap-2">
            {unplaced.map((n) => (
              <span
                key={n.id}
                className="px-3 py-2 rounded-lg text-sm cursor-move"
                style={{
                  background: 'rgb(var(--surface-2))',
                  borderColor: 'rgb(var(--border))',
                  color: 'rgb(var(--text))',
                  border: '1px solid',
                }}
                draggable={!submitted}
                onDragStart={(e) => e.dataTransfer.setData('nodeId', n.id)}
              >
                {n.label}
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
            {correctCount} / {nodes.length} correct
          </p>
        )}
      </div>
    </div>
  );
}
