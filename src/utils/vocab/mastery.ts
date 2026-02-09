/**
 * Vocab Lab – mastery delta and scheduling (deterministic, no LLM)
 */

const FAST_MS = 6000;
const MEDIUM_MS = 12000;

/** Mastery delta for correct: +12 fast (<=6s), +8 medium (<=12s), +5 slow. Wrong: -10 (min 0). Near miss: +2 (still incorrect). */
export function getMasteryDelta(
  isCorrect: boolean,
  nearMiss: boolean,
  timeMs: number
): number {
  if (!isCorrect) {
    if (nearMiss) return 2;
    return -10;
  }
  if (timeMs <= FAST_MS) return 12;
  if (timeMs <= MEDIUM_MS) return 8;
  return 5;
}

/** Streak delta: +1 if correct, 0 and lapses+1 if wrong (handled in RPC). */
export function getStreakDelta(isCorrect: boolean): number {
  return isCorrect ? 1 : -999; // caller will set streak to 0 on wrong; we just need "decrement"
}

/**
 * Next due and ease for scheduling.
 * Correct: intervalMinutes = round(max(10, (mastery/10 + 1) * ease * 60)); next_due = now + interval; ease = min(3, ease + 0.05).
 * Wrong: next_due = now + 10 min; ease = max(1.7, ease - 0.15).
 */
export function getNextDueAndEase(
  isCorrect: boolean,
  currentMastery: number,
  currentEase: number
): { nextDue: Date; ease: number } {
  const now = new Date();
  if (!isCorrect) {
    const nextDue = new Date(now.getTime() + 10 * 60 * 1000);
    const ease = Math.max(1.7, currentEase - 0.15);
    return { nextDue, ease };
  }
  const intervalMinutes = Math.round(
    Math.max(10, ((currentMastery / 10) + 1) * currentEase * 60)
  );
  const nextDue = new Date(now.getTime() + intervalMinutes * 60 * 1000);
  const ease = Math.min(3.0, currentEase + 0.05);
  return { nextDue, ease };
}

/** Should this attempt add the word to the fix-it queue? Wrong or near-miss. */
export function shouldAddToFixIt(isCorrect: boolean, nearMiss: boolean): boolean {
  return !isCorrect || nearMiss;
}
