import { Attempt, Quiz, MasteryState } from '../types';

export interface DailyAggregate {
  date: string;
  dateObj: Date;
  attemptsCount: number;
  bestAccuracy: number;
  bestTime: number | null;
  masteryUpgrades: number;
  grade9SpeedCount: number;
  fullGcseAttempted: boolean;
  attempts: Attempt[];
  readinessPct: number;
}

export interface QuizRun {
  attempt: Attempt;
  quiz: Quiz;
  targetDelta: number;
  masteryChange?: { from: number; to: number };
}

export const getLondonDate = (date: Date): string => {
  return date.toLocaleDateString('en-GB', {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).split('/').reverse().join('-');
};

export const getDayBoundaries = (dateStr: string) => {
  const startOfDay = new Date(dateStr + 'T00:00:00');
  const endOfDay = new Date(dateStr + 'T23:59:59.999');
  return { startOfDay, endOfDay };
};

export const calculateReadinessForDay = (
  quizzes: Quiz[],
  attemptsUpToDay: Attempt[],
  masteryStatesSnapshot: Record<string, MasteryState>
): number => {
  if (quizzes.length === 0) return 0;

  const masteredCount = quizzes.filter(quiz => {
    const mastery = masteryStatesSnapshot[quiz.id];
    return mastery && mastery.masteryLevel >= 3;
  }).length;

  return Math.round((masteredCount / quizzes.length) * 100);
};

export const calculateDailyAggregates = (
  subjectId: string,
  quizzes: Quiz[],
  allAttempts: Attempt[],
  days: number
): DailyAggregate[] => {
  const subjectQuizzes = quizzes.filter(q => q.subjectId === subjectId);
  const subjectAttempts = allAttempts.filter(a =>
    subjectQuizzes.some(q => q.id === a.quizId)
  );

  const aggregates: DailyAggregate[] = [];
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateStr = getLondonDate(date);

    const { startOfDay, endOfDay } = getDayBoundaries(dateStr);

    const dayAttempts = subjectAttempts.filter(a => {
      const attemptDate = new Date(a.finishedAt);
      return attemptDate >= startOfDay && attemptDate <= endOfDay;
    });

    const attemptsUpToDay = subjectAttempts.filter(a => {
      const attemptDate = new Date(a.finishedAt);
      return attemptDate <= endOfDay;
    });

    const masteryStatesSnapshot: Record<string, MasteryState> = {};
    subjectQuizzes.forEach(quiz => {
      const quizAttemptsUpToDay = attemptsUpToDay.filter(a => a.quizId === quiz.id);
      if (quizAttemptsUpToDay.length > 0) {
        const bestAccuracy = Math.max(...quizAttemptsUpToDay.map(a => a.accuracyPct));
        const bestTime = Math.min(...quizAttemptsUpToDay.map(a => a.timeTakenSec));

        let masteryLevel = 0;
        if (bestAccuracy === 100 && bestTime <= quiz.grade9TargetSec) {
          masteryLevel = 4;
        } else if (bestAccuracy === 100) {
          masteryLevel = 3;
        } else if (bestAccuracy >= 85) {
          masteryLevel = 2;
        } else {
          masteryLevel = 1;
        }

        masteryStatesSnapshot[quiz.id] = {
          quizId: quiz.id,
          bestAccuracyPct: bestAccuracy,
          bestTimeSec: bestTime,
          masteryLevel: masteryLevel as 0 | 1 | 2 | 3 | 4,
          lastPlayedAt: quizAttemptsUpToDay[quizAttemptsUpToDay.length - 1].finishedAt,
        };
      }
    });

    const readinessPct = calculateReadinessForDay(
      subjectQuizzes,
      attemptsUpToDay,
      masteryStatesSnapshot
    );

    const bestAccuracy = dayAttempts.length > 0
      ? Math.max(...dayAttempts.map(a => a.accuracyPct))
      : 0;

    const bestTime = dayAttempts.length > 0
      ? Math.min(...dayAttempts.map(a => a.timeTakenSec))
      : null;

    let masteryUpgrades = 0;
    dayAttempts.forEach(attempt => {
      const quiz = subjectQuizzes.find(q => q.id === attempt.quizId);
      if (!quiz) return;

      const previousAttempts = subjectAttempts.filter(
        a => a.quizId === attempt.quizId && new Date(a.finishedAt) < new Date(attempt.finishedAt)
      );

      if (previousAttempts.length > 0) {
        const prevBestAcc = Math.max(...previousAttempts.map(a => a.accuracyPct));
        const prevBestTime = Math.min(...previousAttempts.map(a => a.timeTakenSec));

        let prevMastery = 0;
        if (prevBestAcc === 100 && prevBestTime <= quiz.grade9TargetSec) prevMastery = 4;
        else if (prevBestAcc === 100) prevMastery = 3;
        else if (prevBestAcc >= 85) prevMastery = 2;
        else prevMastery = 1;

        let newMastery = 0;
        if (attempt.accuracyPct === 100 && attempt.timeTakenSec <= quiz.grade9TargetSec) newMastery = 4;
        else if (attempt.accuracyPct === 100) newMastery = 3;
        else if (attempt.accuracyPct >= 85) newMastery = 2;
        else newMastery = 1;

        if (newMastery > prevMastery) {
          masteryUpgrades++;
        }
      } else {
        if (attempt.accuracyPct >= 85) {
          masteryUpgrades++;
        }
      }
    });

    const grade9SpeedCount = dayAttempts.filter(a => {
      const quiz = subjectQuizzes.find(q => q.id === a.quizId);
      return quiz && a.accuracyPct === 100 && a.timeTakenSec <= quiz.grade9TargetSec;
    }).length;

    const fullGcseAttempted = dayAttempts.some(a => {
      const quiz = subjectQuizzes.find(q => q.id === a.quizId);
      return quiz && quiz.scopeType === 'full';
    });

    aggregates.push({
      date: dateStr,
      dateObj: date,
      attemptsCount: dayAttempts.length,
      bestAccuracy,
      bestTime,
      masteryUpgrades,
      grade9SpeedCount,
      fullGcseAttempted,
      attempts: dayAttempts,
      readinessPct,
    });
  }

  return aggregates;
};

export const getQuizRuns = (
  dayAttempts: Attempt[],
  quizzes: Quiz[],
  allAttempts: Attempt[]
): QuizRun[] => {
  const runs: QuizRun[] = [];

  dayAttempts.forEach(attempt => {
    const quiz = quizzes.find(q => q.id === attempt.quizId);
    if (!quiz) return;

    const targetDelta = quiz.grade9TargetSec - attempt.timeTakenSec;

    const previousAttempts = allAttempts.filter(
      a => a.quizId === attempt.quizId && new Date(a.finishedAt) < new Date(attempt.finishedAt)
    );

    let masteryChange;
    if (previousAttempts.length > 0) {
      const prevBestAcc = Math.max(...previousAttempts.map(a => a.accuracyPct));
      const prevBestTime = Math.min(...previousAttempts.map(a => a.timeTakenSec));

      let prevMastery = 0;
      if (prevBestAcc === 100 && prevBestTime <= quiz.grade9TargetSec) prevMastery = 4;
      else if (prevBestAcc === 100) prevMastery = 3;
      else if (prevBestAcc >= 85) prevMastery = 2;
      else prevMastery = 1;

      let newMastery = 0;
      if (attempt.accuracyPct === 100 && attempt.timeTakenSec <= quiz.grade9TargetSec) newMastery = 4;
      else if (attempt.accuracyPct === 100) newMastery = 3;
      else if (attempt.accuracyPct >= 85) newMastery = 2;
      else newMastery = 1;

      if (newMastery > prevMastery) {
        masteryChange = { from: prevMastery, to: newMastery };
      }
    } else {
      if (attempt.accuracyPct >= 85) {
        masteryChange = { from: 0, to: attempt.accuracyPct === 100 && attempt.timeTakenSec <= quiz.grade9TargetSec ? 4 : attempt.accuracyPct === 100 ? 3 : 2 };
      }
    }

    runs.push({
      attempt,
      quiz,
      targetDelta,
      masteryChange,
    });
  });

  return runs.sort((a, b) => b.attempt.accuracyPct - a.attempt.accuracyPct || a.attempt.timeTakenSec - b.attempt.timeTakenSec);
};

export const findBestDay = (aggregates: DailyAggregate[]): DailyAggregate | null => {
  if (aggregates.length === 0) return null;

  return aggregates.reduce((best, current) => {
    const currentScore = current.grade9SpeedCount * 10 + current.masteryUpgrades * 5 + current.attemptsCount;
    const bestScore = best.grade9SpeedCount * 10 + best.masteryUpgrades * 5 + best.attemptsCount;
    return currentScore > bestScore ? current : best;
  });
};

export const findLongestStreak = (aggregates: DailyAggregate[]): number => {
  let currentStreak = 0;
  let maxStreak = 0;

  aggregates.forEach(day => {
    if (day.attemptsCount > 0) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  });

  return maxStreak;
};

export const findBiggestImprovements = (
  dayAttempts: Attempt[],
  allAttempts: Attempt[],
  quizzes: Quiz[]
): { timeImprovement: { quiz: Quiz; delta: number } | null; accuracyImprovement: { quiz: Quiz; delta: number } | null } => {
  let timeImprovement: { quiz: Quiz; delta: number } | null = null;
  let accuracyImprovement: { quiz: Quiz; delta: number } | null = null;

  dayAttempts.forEach(attempt => {
    const quiz = quizzes.find(q => q.id === attempt.quizId);
    if (!quiz) return;

    const previousAttempts = allAttempts.filter(
      a => a.quizId === attempt.quizId && new Date(a.finishedAt) < new Date(attempt.finishedAt)
    );

    if (previousAttempts.length > 0) {
      const prevBestTime = Math.min(...previousAttempts.map(a => a.timeTakenSec));
      const timeDelta = prevBestTime - attempt.timeTakenSec;

      if (timeDelta > 0 && (!timeImprovement || timeDelta > timeImprovement.delta)) {
        timeImprovement = { quiz, delta: timeDelta };
      }

      const prevBestAcc = Math.max(...previousAttempts.map(a => a.accuracyPct));
      const accDelta = attempt.accuracyPct - prevBestAcc;

      if (accDelta > 0 && (!accuracyImprovement || accDelta > accuracyImprovement.delta)) {
        accuracyImprovement = { quiz, delta: accDelta };
      }
    }
  });

  return { timeImprovement, accuracyImprovement };
};
