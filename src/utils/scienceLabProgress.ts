/**
 * Science Lab progress summary for Home/Profile.
 * Aggregates topic test completion and full GCSE paper passes.
 */
import { storage } from './storage';
import { getTopicsByPaperAndTier } from '../config/scienceLabFlashcards';
import type { ScienceSubject } from '../types/scienceLab';

export type ScienceLabSubjectProgress = {
  subject: ScienceSubject;
  topicTestsCompleted: number;
  topicTestsTotal: number;
  fullGcsePassed: boolean;
  /** Approx % for display — topic tests done / total, or 100 if full GCSE passed */
  progressPercent: number;
};

export type ScienceLabProgressSummary = {
  subjects: ScienceLabSubjectProgress[];
  /** Has any activity in Science Lab */
  hasProgress: boolean;
  /** Suggested next action href */
  continueHref: string | null;
};

const TRIPLE_SUBJECTS: ScienceSubject[] = ['Biology', 'Chemistry', 'Physics'];

export function getScienceLabProgressSummary(): ScienceLabProgressSummary {
  const subjects: ScienceLabSubjectProgress[] = TRIPLE_SUBJECTS.map((subject) => {
    const topics = getTopicsByPaperAndTier(subject, 1, 'Higher');
    const topicTestsTotal = topics.length;
    let topicTestsCompleted = 0;
    topics.forEach((topic) => {
      const m = storage.getTopicMasteryByKey(subject, 1, 'Higher', topic);
      if (m?.topicTestCompleted) topicTestsCompleted++;
    });
    const fullGcsePassed = storage.getSubjectFullGcseProgress(subject, 'Higher', [1, 2]).allPassed;
    const progressPercent = fullGcsePassed
      ? 100
      : topicTestsTotal > 0
        ? Math.round((topicTestsCompleted / topicTestsTotal) * 100)
        : 0;

    return {
      subject,
      topicTestsCompleted,
      topicTestsTotal,
      fullGcsePassed,
      progressPercent,
    };
  });

  const hasProgress = subjects.some(
    (s) => s.topicTestsCompleted > 0 || s.fullGcsePassed
  );

  // Suggested continue: first subject with incomplete topic tests, or first without full GCSE passed
  let continueHref: string | null = null;
  const firstIncomplete = subjects.find((s) => s.topicTestsCompleted < s.topicTestsTotal && s.topicTestsTotal > 0);
  if (firstIncomplete) {
    continueHref = `/science-lab/${firstIncomplete.subject.toLowerCase()}/1/higher/topics`;
  } else {
    const notFullGcse = subjects.find((s) => !s.fullGcsePassed);
    if (notFullGcse) {
      continueHref = `/science-lab/${notFullGcse.subject.toLowerCase()}/1/higher/full-gcse`;
    }
  }

  return {
    subjects,
    hasProgress,
    continueHref,
  };
}
