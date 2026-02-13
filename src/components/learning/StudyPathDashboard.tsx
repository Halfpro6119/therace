/**
 * Smart Study Path Dashboard – Spaced Review Queue, Interleave Roulette, exam countdown
 * Design Plan §1: Adaptive pacing, time-to-exam, weak topics
 */
import React from 'react';
import { useStudyPath } from '../../contexts/StudyPathContext';
import { SpacedReviewQueue } from './SpacedReviewQueue';
import { InterleaveRoulette } from './InterleaveRoulette';
import { Calendar, Target } from 'lucide-react';

export function StudyPathDashboard() {
  const studyPath = useStudyPath();
  if (!studyPath) return null;

  const { daysUntilExam, suggestedDailyMinutes, weakTopics, spacedDueToday } = studyPath;

  return (
    <div className="space-y-4">
      {(daysUntilExam != null || weakTopics.length > 0 || spacedDueToday.length > 0) && (
        <div className="rounded-xl border p-4" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <h2 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
            <Target size={18} style={{ color: 'rgb(var(--accent))' }} />
            Your study path
          </h2>
          {daysUntilExam != null && daysUntilExam > 0 && (
            <div className="flex items-center gap-2 mb-3 p-3 rounded-lg" style={{ background: 'rgb(var(--surface-2) / 0.5)' }}>
              <Calendar size={18} style={{ color: 'rgb(var(--accent))' }} />
              <span style={{ color: 'rgb(var(--text))' }}>
                <strong>{daysUntilExam}</strong> days until exam · ~{suggestedDailyMinutes} min/day suggested
              </span>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {spacedDueToday.length > 0 && (
              <SpacedReviewQueue maxShow={3} />
            )}
            {weakTopics.length > 0 && (
              <InterleaveRoulette />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
