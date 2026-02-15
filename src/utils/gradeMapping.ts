/**
 * Maps marks percentage to GCSE grade equivalent.
 * Used in topic tests and full GCSE paper tests for grade visibility.
 * Boundaries: 70% = Grade 4, 80% = Grade 7, 90% = Grade 9.
 */
export function marksPercentToGrade(percent: number): {
  grade: number | null;
  label: string;
  color: string;
} {
  if (percent >= 90) {
    return { grade: 9, label: 'Grade 9', color: 'rgb(16 185 129)' };
  }
  if (percent >= 80) {
    return { grade: 7, label: 'Grade 7', color: 'rgb(34 197 94)' };
  }
  if (percent >= 70) {
    return { grade: 4, label: 'Grade 4', color: 'rgb(34 197 94)' };
  }
  if (percent >= 50) {
    return { grade: null, label: 'Below pass', color: 'rgb(251 146 60)' };
  }
  return { grade: null, label: 'Keep practicing', color: 'rgb(239 68 68)' };
}
