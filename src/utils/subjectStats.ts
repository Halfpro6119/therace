import { Subject, Quiz, Topic, MasteryState, Attempt } from '../types';

export interface SubjectStats {
  subjectId: string;
  grade9ReadinessPct: number;
  totalQuizzes: number;
  unseenCount: number;
  learningCount: number;
  secureCount: number;
  masteredCount: number;
  grade9SpeedCount: number;
  weakestTopic: { topicId: string; topicName: string; avgMastery: number } | null;
  totalAttempts: number;
  totalTimeMinutes: number;
  xpEarned: number;
}

export interface TopicStats {
  topicId: string;
  topicName: string;
  quizCount: number;
  avgMastery: number;
  masteredCount: number;
  grade9SpeedCount: number;
  fastestTime: number | null;
}

export interface UnitStats {
  unitId: string;
  unitName: string;
  readinessPct: number;
  totalQuizzes: number;
  masteredCount: number;
  weakestTopic: { topicId: string; topicName: string } | null;
}

export interface QuizImprovement {
  quizId: string;
  quizTitle: string;
  improvementType: 'time' | 'accuracy';
  before: number;
  after: number;
  delta: number;
}

export const calculateSubjectStats = (
  subjectId: string,
  quizzes: Quiz[],
  masteryStates: Record<string, MasteryState>,
  attempts: Attempt[]
): SubjectStats => {
  const subjectQuizzes = quizzes.filter(q => q.subjectId === subjectId);
  const subjectAttempts = attempts.filter(a =>
    subjectQuizzes.some(q => q.id === a.quizId)
  );

  const distribution = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
  };

  subjectQuizzes.forEach(quiz => {
    const mastery = masteryStates[quiz.id];
    if (mastery) {
      distribution[mastery.masteryLevel]++;
    } else {
      distribution[0]++;
    }
  });

  const totalQuizzes = subjectQuizzes.length || 1;
  const masteredCount = distribution[3] + distribution[4];
  const grade9ReadinessPct = Math.round((masteredCount / totalQuizzes) * 100);

  const totalTimeMinutes = Math.round(
    subjectAttempts.reduce((sum, a) => sum + a.timeTakenSec, 0) / 60
  );

  const xpEarned = subjectAttempts.length * 50;

  return {
    subjectId,
    grade9ReadinessPct,
    totalQuizzes: subjectQuizzes.length,
    unseenCount: distribution[0],
    learningCount: distribution[1],
    secureCount: distribution[2],
    masteredCount: distribution[3],
    grade9SpeedCount: distribution[4],
    weakestTopic: null,
    totalAttempts: subjectAttempts.length,
    totalTimeMinutes,
    xpEarned,
  };
};

export const calculateTopicStats = (
  topics: Topic[],
  quizzes: Quiz[],
  masteryStates: Record<string, MasteryState>,
  attempts: Attempt[]
): TopicStats[] => {
  return topics.map(topic => {
    const topicQuizzes = quizzes.filter(q => q.topicId === topic.id);
    const topicAttempts = attempts.filter(a =>
      topicQuizzes.some(q => q.id === a.quizId)
    );

    let totalMastery = 0;
    let masteredCount = 0;
    let grade9SpeedCount = 0;

    topicQuizzes.forEach(quiz => {
      const mastery = masteryStates[quiz.id];
      if (mastery) {
        totalMastery += mastery.masteryLevel;
        if (mastery.masteryLevel >= 3) masteredCount++;
        if (mastery.masteryLevel === 4) grade9SpeedCount++;
      }
    });

    const avgMastery = topicQuizzes.length > 0 ? totalMastery / topicQuizzes.length : 0;

    const fastestTime = topicAttempts.length > 0
      ? Math.min(...topicAttempts.map(a => a.timeTakenSec))
      : null;

    return {
      topicId: topic.id,
      topicName: topic.name,
      quizCount: topicQuizzes.length,
      avgMastery,
      masteredCount,
      grade9SpeedCount,
      fastestTime,
    };
  });
};

export const calculateUnitStats = (
  units: any[],
  topics: Topic[],
  quizzes: Quiz[],
  masteryStates: Record<string, MasteryState>
): UnitStats[] => {
  return units.map(unit => {
    const unitTopics = topics.filter(t => t.unitId === unit.id);
    const unitQuizzes = quizzes.filter(q => q.unitId === unit.id);

    let masteredCount = 0;
    unitQuizzes.forEach(quiz => {
      const mastery = masteryStates[quiz.id];
      if (mastery && mastery.masteryLevel >= 3) {
        masteredCount++;
      }
    });

    const totalQuizzes = unitQuizzes.length || 1;
    const readinessPct = Math.round((masteredCount / totalQuizzes) * 100);

    const topicStats = calculateTopicStats(unitTopics, quizzes, masteryStates, []);
    const weakestTopic = topicStats.length > 0
      ? topicStats.reduce((min, t) => (t.avgMastery < min.avgMastery ? t : min))
      : null;

    return {
      unitId: unit.id,
      unitName: unit.name,
      readinessPct,
      totalQuizzes: unitQuizzes.length,
      masteredCount,
      weakestTopic: weakestTopic
        ? { topicId: weakestTopic.topicId, topicName: weakestTopic.topicName }
        : null,
    };
  });
};

export const findMostImproved = (
  quizzes: Quiz[],
  attempts: Attempt[]
): QuizImprovement[] => {
  const improvements: QuizImprovement[] = [];

  quizzes.forEach(quiz => {
    const quizAttempts = attempts
      .filter(a => a.quizId === quiz.id)
      .sort((a, b) => new Date(a.finishedAt).getTime() - new Date(b.finishedAt).getTime());

    if (quizAttempts.length >= 2) {
      const first = quizAttempts[0];
      const last = quizAttempts[quizAttempts.length - 1];

      const timeDelta = first.timeTakenSec - last.timeTakenSec;
      if (timeDelta > 10) {
        improvements.push({
          quizId: quiz.id,
          quizTitle: quiz.title,
          improvementType: 'time',
          before: first.timeTakenSec,
          after: last.timeTakenSec,
          delta: timeDelta,
        });
      }

      const accuracyDelta = last.accuracyPct - first.accuracyPct;
      if (accuracyDelta > 5) {
        improvements.push({
          quizId: quiz.id,
          quizTitle: quiz.title,
          improvementType: 'accuracy',
          before: first.accuracyPct,
          after: last.accuracyPct,
          delta: accuracyDelta,
        });
      }
    }
  });

  return improvements.sort((a, b) => b.delta - a.delta);
};

export const getRecommendedQuiz = (
  quizzes: Quiz[],
  masteryStates: Record<string, MasteryState>
): { quiz: Quiz; reason: string } | null => {
  const unseenQuizzes = quizzes.filter(q => !masteryStates[q.id]);
  if (unseenQuizzes.length > 0) {
    return {
      quiz: unseenQuizzes[0],
      reason: 'Unseen',
    };
  }

  const learningQuizzes = quizzes.filter(
    q => masteryStates[q.id]?.masteryLevel === 1
  );
  if (learningQuizzes.length > 0) {
    return {
      quiz: learningQuizzes[0],
      reason: 'Needs practice',
    };
  }

  const needsSpeedQuizzes = quizzes.filter(q => {
    const mastery = masteryStates[q.id];
    return mastery && mastery.masteryLevel === 2;
  });
  if (needsSpeedQuizzes.length > 0) {
    return {
      quiz: needsSpeedQuizzes[0],
      reason: 'Needs speed',
    };
  }

  return quizzes.length > 0 ? { quiz: quizzes[0], reason: 'Keep practicing' } : null;
};

/** Next Action system — Design Plan §3B.2: single smart recommendation for Home hero */
export interface NextAction {
  action: 'fixit' | 'streak' | 'continue' | 'weakest' | 'unseen' | 'speed' | 'sprint';
  label: string;
  href: string;
  reason: string;
  urgency: 'high' | 'medium' | 'low';
}

export function getNextAction(
  quizzes: Quiz[],
  masteryStates: Record<string, MasteryState>,
  recentMissedPromptIds: string[],
  lastAttempt: { quizId: string; finishedAt: number } | null,
  streakActiveToday: boolean,
  streakCurrentDays: number
): NextAction | null {
  if (quizzes.length === 0) return null;

  // 1. Has missed questions from recent attempts → Fix-It Drill
  if (recentMissedPromptIds.length > 0) {
    return {
      action: 'fixit',
      label: 'Fix Your Mistakes',
      href: '/quiz/daily-challenge-1?mode=fixit',
      reason: `${recentMissedPromptIds.length} questions to review`,
      urgency: 'high',
    };
  }

  // 2. Streak at risk (no activity today) → Save streak
  if (streakCurrentDays > 0 && !streakActiveToday) {
    const rec = getRecommendedQuiz(quizzes, masteryStates);
    return {
      action: 'streak',
      label: 'Save Your Streak',
      href: rec ? `/quiz/${rec.quiz.id}` : '/quiz/daily-challenge-1',
      reason: `${streakCurrentDays}-day streak — one quiz to save it`,
      urgency: 'high',
    };
  }

  // 3. Has last attempt (resumable / continue) → Continue last quiz
  if (lastAttempt) {
    const lastQuiz = quizzes.find(q => q.id === lastAttempt.quizId);
    if (lastQuiz) {
      return {
        action: 'continue',
        label: `Continue ${lastQuiz.title}`,
        href: `/quiz/${lastQuiz.id}`,
        reason: 'Pick up where you left off',
        urgency: 'medium',
      };
    }
  }

  // 4–6. Use getRecommendedQuiz for weakest / unseen / speed
  const rec = getRecommendedQuiz(quizzes, masteryStates);
  if (rec) {
    if (rec.reason === 'Unseen') {
      return {
        action: 'unseen',
        label: `Try ${rec.quiz.title}`,
        href: `/quiz/${rec.quiz.id}`,
        reason: 'New quiz to explore',
        urgency: 'medium',
      };
    }
    if (rec.reason === 'Needs practice') {
      return {
        action: 'weakest',
        label: `Strengthen ${rec.quiz.title}`,
        href: `/quiz/${rec.quiz.id}`,
        reason: 'Build mastery on this topic',
        urgency: 'medium',
      };
    }
    if (rec.reason === 'Needs speed') {
      return {
        action: 'speed',
        label: `Beat Your Time: ${rec.quiz.title}`,
        href: `/quiz/${rec.quiz.id}`,
        reason: 'You know it — now get faster',
        urgency: 'medium',
      };
    }
    return {
      action: 'sprint',
      label: `Practice ${rec.quiz.title}`,
      href: `/quiz/${rec.quiz.id}`,
      reason: rec.reason,
      urgency: 'low',
    };
  }

  // 7. Default → Today's Sprint
  return {
    action: 'sprint',
    label: "Start Today's Sprint",
    href: '/quiz/daily-challenge-1',
    reason: 'Daily challenge',
    urgency: 'low',
  };
}
