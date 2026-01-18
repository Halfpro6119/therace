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
