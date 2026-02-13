/**
 * Memory Palace – For lists: "Place each in a room" — drag to room; recall later
 * Design Plan §3A: Method of loci + dual coding
 */
import React, { useState } from 'react';
import { Home, RotateCcw } from 'lucide-react';

export interface MemoryPalaceItem {
  id: string;
  label: string;
  /** Optional hint for placement */
  hint?: string;
}

export interface MemoryPalaceRoom {
  id: string;
  name: string;
  /** Optional emoji or icon for visual anchor */
  icon?: string;
}

export interface MemoryPalaceProps {
  title?: string;
  items: MemoryPalaceItem[];
  rooms: MemoryPalaceRoom[];
  /** Callback when all items placed */
  onComplete?: (placements: Record<string, string>) => void;
  /** Show recall mode after placement */
  enableRecall?: boolean;
}

export function MemoryPalace({
  title = "Memory Palace",
  items,
  rooms,
  onComplete,
  enableRecall = true,
}: MemoryPalaceProps) {
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<'place' | 'recall'>('place');
  const [recallAnswers, setRecallAnswers] = useState<Record<string, string>>({});

  const allPlaced = items.every((item) => placements[item.id]);
  const roomItems = (roomId: string) => items.filter((i) => placements[i.id] === roomId);

  const handleDrop = (itemId: string, roomId: string) => {
    setPlacements((p) => ({ ...p, [itemId]: roomId }));
  };

  const handleRemove = (itemId: string) => {
    setPlacements((p) => {
      const next = { ...p };
      delete next[itemId];
      return next;
    });
  };

  const handleCompletePlacement = () => {
    if (!allPlaced) return;
    onComplete?.(placements);
    if (enableRecall) setPhase('recall');
  };

  const unplacedItems = items.filter((i) => !placements[i.id]);

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
          <Home size={20} style={{ color: 'rgb(var(--accent))' }} />
          <h3 className="font-bold" style={{ color: 'rgb(var(--text))' }}>
            {title}
          </h3>
        </div>
        <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
          {phase === 'place'
            ? "Place each item in a room. Later you'll recall by imagining the room."
            : "What did you place in each room? Type from memory."}
        </p>

        {phase === 'place' ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="min-h-[100px] p-3 rounded-lg border-2 border-dashed"
                  style={{
                    borderColor: 'rgb(var(--border))',
                    background: 'rgb(var(--surface-2) / 0.3)',
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const id = e.dataTransfer.getData('itemId');
                    if (id) handleDrop(id, room.id);
                  }}
                >
                  <div className="font-medium text-sm mb-2 flex items-center gap-1" style={{ color: 'rgb(var(--text))' }}>
                    {room.icon && <span>{room.icon}</span>}
                    {room.name}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {roomItems(room.id).map((item) => (
                      <span
                        key={item.id}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium cursor-move"
                        style={{
                          background: 'rgb(var(--accent) / 0.2)',
                          color: 'rgb(var(--accent))',
                        }}
                        draggable
                        onDragStart={(e) => e.dataTransfer.setData('itemId', item.id)}
                      >
                        {item.label}
                        <button
                          type="button"
                          onClick={() => handleRemove(item.id)}
                          className="ml-1 hover:opacity-70"
                          aria-label="Remove"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <p className="text-xs font-medium mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                Items to place:
              </p>
              <div className="flex flex-wrap gap-2">
                {unplacedItems.map((item) => (
                  <span
                    key={item.id}
                    className="px-3 py-2 rounded-lg text-sm font-medium cursor-move"
                    style={{
                      background: 'rgb(var(--surface-2))',
                      borderColor: 'rgb(var(--border))',
                      color: 'rgb(var(--text))',
                      border: '1px solid',
                    }}
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData('itemId', item.id)}
                  >
                    {item.label}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleCompletePlacement}
              disabled={!allPlaced}
              className="px-4 py-2 rounded-lg font-medium text-sm disabled:opacity-50"
              style={{ background: 'rgb(var(--accent))', color: 'white' }}
            >
              Done placing — test recall
            </button>
          </>
        ) : (
          <div className="space-y-3">
            {rooms.map((room) => {
              const correct = roomItems(room.id).map((i) => i.label);
              const answer = recallAnswers[room.id] ?? '';
              const correctStr = correct.join(', ');
              const isCorrect = answer.toLowerCase().replace(/\s+/g, ' ').trim() === correctStr.toLowerCase().replace(/\s+/g, ' ').trim();
              return (
                <div key={room.id} className="p-3 rounded-lg" style={{ background: 'rgb(var(--surface-2) / 0.5)' }}>
                  <label className="block text-sm font-medium mb-1" style={{ color: 'rgb(var(--text))' }}>
                    {room.icon} {room.name} — what did you place here?
                  </label>
                  <input
                    type="text"
                    value={answer}
                    onChange={(e) => setRecallAnswers((r) => ({ ...r, [room.id]: e.target.value }))}
                    placeholder="Type from memory..."
                    className="w-full px-3 py-2 rounded border text-sm"
                    style={{
                      background: 'rgb(var(--surface))',
                      borderColor: 'rgb(var(--border))',
                      color: 'rgb(var(--text))',
                    }}
                  />
                  {answer && (
                    <p className="mt-1 text-xs" style={{ color: isCorrect ? 'rgb(var(--success))' : 'rgb(var(--text-secondary))' }}>
                      {isCorrect ? '✓ Correct!' : `Model: ${correctStr}`}
                    </p>
                  )}
                </div>
              );
            })}
            <button
              type="button"
              onClick={() => setPhase('place')}
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: 'rgb(var(--text-secondary))' }}
            >
              <RotateCcw size={14} />
              Place again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
