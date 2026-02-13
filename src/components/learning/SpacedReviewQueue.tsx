/**
 * Spaced Review Queue – "3 items due today" – algorithm-driven retrieval
 * Design Plan §1: "You're due for [concept] — 2 min?"
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudyPath } from '../../contexts/StudyPathContext';
import { Clock, ChevronRight } from 'lucide-react';

export interface SpacedReviewItem {
  id: string;
  label: string;
  subject: string;
  hubPath: string;
  /** Optional: specific route within hub */
  routeParams?: Record<string, string>;
}

export interface SpacedReviewQueueProps {
  /** Items due today (from algorithm or StudyPathContext) */
  items?: SpacedReviewItem[];
  /** Max to show */
  maxShow?: number;
  /** Callback when item is completed */
  onComplete?: (id: string) => void;
}

export function SpacedReviewQueue({
  items = [],
  maxShow = 5,
  onComplete,
}: SpacedReviewQueueProps) {
  const studyPath = useStudyPath();
  const navigate = useNavigate();
  const dueIds = studyPath?.spacedDueToday ?? [];
  const displayItems = items.length > 0
    ? items.slice(0, maxShow)
    : dueIds.slice(0, maxShow).map(id => ({
        id,
        label: id,
        subject: 'Review',
        hubPath: '/',
      } as SpacedReviewItem));

  if (displayItems.length === 0) return null;

  return (
    <div
      className="rounded-xl border p-4"
      style={{
        background: 'rgb(var(--surface))',
        borderColor: 'rgb(var(--border))',
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Clock size={18} style={{ color: 'rgb(var(--accent))' }} />
        <span className="font-bold" style={{ color: 'rgb(var(--text))' }}>
          Due for review
        </span>
      </div>
      <p className="text-sm mb-3" style={{ color: 'rgb(var(--text-secondary))' }}>
        You're due for {displayItems.length} item{displayItems.length !== 1 ? 's' : ''} — 2 min each?
      </p>
      <div className="space-y-2">
        {displayItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              if ('hubPath' in item && item.hubPath !== '/') {
                navigate(item.hubPath);
              }
              onComplete?.(item.id);
              studyPath?.removeSpacedDue(item.id);
            }}
            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition"
            style={{ borderColor: 'rgb(var(--border))' }}
          >
            <span className="text-sm font-medium" style={{ color: 'rgb(var(--text))' }}>
              {'label' in item ? item.label : item.id}
            </span>
            <ChevronRight size={16} style={{ color: 'rgb(var(--text-secondary))' }} />
          </button>
        ))}
      </div>
    </div>
  );
}
