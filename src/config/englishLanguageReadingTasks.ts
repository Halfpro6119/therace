/**
 * English Language Section A (Reading) – task bank
 * Paper 1 & Paper 2 reading analysis, comparison, evaluation.
 * Sourced from golden English question bank.
 */

import type { EnglishLanguageReadingTask } from '../types/englishCampus';
import {
  ALL_LANGUAGE_READING_TASKS,
  getLanguageReadingTaskById as getGoldenById,
} from './goldenEnglishQuestionBank';

/** All Language reading tasks (Section A). */
export const ENGLISH_LANGUAGE_READING_TASKS: EnglishLanguageReadingTask[] = ALL_LANGUAGE_READING_TASKS;

export function getLanguageReadingTasksByPaper(paper: 1 | 2): EnglishLanguageReadingTask[] {
  return ALL_LANGUAGE_READING_TASKS.filter(t => t.paper === paper);
}

export function getLanguageReadingTaskById(id: string): EnglishLanguageReadingTask | undefined {
  return getGoldenById(id);
}

/** Check if a task ID is a Section A reading task. */
export function isLanguageReadingTaskId(taskId: string): boolean {
  return /^L[12]-A\d+$/.test(taskId);
}

/** Section A reading tasks: 12 marks for evaluation/comparison (L1-A04, L2-A03, L2-A04), 8 for the rest. */
const READING_12_MARKS_IDS = new Set(['L1-A04', 'L2-A03', 'L2-A04']);

export function getReadingTaskMaxMarks(taskId: string): number {
  return READING_12_MARKS_IDS.has(taskId) ? 12 : 8;
}
