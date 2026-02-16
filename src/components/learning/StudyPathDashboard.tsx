/**
 * Smart Study Path Dashboard – Spaced Review Queue, Interleave Roulette, exam countdown
 * Design Plan §1: Adaptive pacing, time-to-exam, weak topics
 * Per FULL_SITE_AUDIT: Study Path points to Science Lab when exam date set
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudyPath } from '../../contexts/StudyPathContext';
import { SpacedReviewQueue } from './SpacedReviewQueue';
import { InterleaveRoulette } from './InterleaveRoulette';
import { getScienceLabProgressSummary } from '../../utils/scienceLabProgress';
import { Calendar, Target, FlaskConical, ArrowRight } from 'lucide-react';

export function StudyPathDashboard() {
  const navigate = useNavigate();
  const studyPath = useStudyPath();
  const scienceLabProgress = getScienceLabProgressSummary();
  if (!studyPath) return null;

  const { daysUntilExam, suggestedDailyMinutes, weakTopics, spacedDueToday } = studyPath;
  const showScienceLabSuggestion = daysUntilExam != null && daysUntilExam > 0 && scienceLabProgress.hasProgress && scienceLabProgress.continueHref;

  return (
    <div className="space-y-4">
      {(daysUntilExam != null || weakTopics.length > 0 || spacedDueToday.length > 0 || showScienceLabSuggestion) && (
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
          {showScienceLabSuggestion && (
            <button
              type="button"
              onClick={() => navigate(scienceLabProgress.continueHref!)}
              className="w-full flex items-center justify-between gap-3 p-3 rounded-lg mb-3 transition hover:opacity-95 text-left"
              style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(59, 130, 246, 0.08) 50%, rgba(139, 92, 246, 0.08) 100%)', border: '1px solid rgb(var(--border))' }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <FlaskConical size={20} style={{ color: '#10B981' }} className="flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-semibold truncate" style={{ color: 'rgb(var(--text))' }}>
                    Past-paper practice — Science Lab
                  </p>
                  <p className="text-sm truncate" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {scienceLabProgress.subjects.map((s) => `${s.subject} ${s.topicTestsCompleted}/${s.topicTestsTotal}${s.fullGcsePassed ? ' ✓' : ''}`).join(' · ')}
                  </p>
                </div>
              </div>
              <ArrowRight size={18} className="flex-shrink-0" style={{ color: 'rgb(var(--accent))' }} />
            </button>
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
