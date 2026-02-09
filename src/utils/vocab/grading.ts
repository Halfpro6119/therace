/**
 * Vocab Lab – spell grading: normalize, compare, Levenshtein, near-miss
 */

import type { SpellGradeResult } from '../../types/vocab';

/** Normalize for comparison: trim, collapse spaces, lowercase. Preserve original for display elsewhere. */
export function normalizeSpellInput(raw: string): string {
  return raw
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase();
}

/** Levenshtein distance between two strings */
export function levenshteinDistance(a: string, b: string): number {
  const lenA = a.length;
  const lenB = b.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= lenA; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= lenB; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= lenA; i++) {
    for (let j = 1; j <= lenB; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[lenA][lenB];
}

/** Near-miss: wrong but distance <= 2 and word length >= 6 */
export function isNearMiss(distance: number, targetLength: number): boolean {
  return distance <= 2 && targetLength >= 6;
}

/**
 * Grade a spell attempt. Returns result with isCorrect, nearMiss, and Levenshtein distance.
 */
export function gradeSpellAttempt(userInput: string, targetWord: string): SpellGradeResult {
  const normalizedInput = normalizeSpellInput(userInput);
  const normalizedTarget = normalizeSpellInput(targetWord);

  const isCorrect = normalizedInput === normalizedTarget;
  const distance = isCorrect ? 0 : levenshteinDistance(normalizedInput, normalizedTarget);
  const nearMiss = !isCorrect && isNearMiss(distance, normalizedTarget.length);

  return {
    isCorrect,
    nearMiss,
    normalizedInput,
    normalizedTarget,
    levenshteinDistance: distance,
  };
}
