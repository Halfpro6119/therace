/**
 * English Language task bank – Paper 1 (Creative) & Paper 2 (Transactional)
 * Sourced from golden English question bank (exam-realistic, expandable backbone).
 */

import type { EnglishLanguageTask } from '../types/englishCampus';
import {
  getLanguageWritingTasksByPaper as getGoldenByPaper,
  getLanguageWritingTaskById as getGoldenById,
  ALL_LANGUAGE_WRITING_TASKS,
} from './goldenEnglishQuestionBank';

/** All Language writing tasks (golden bank). Golden tasks extend EnglishLanguageTask. */
export const ENGLISH_LANGUAGE_TASKS: EnglishLanguageTask[] = ALL_LANGUAGE_WRITING_TASKS;

export function getLanguageTasksByPaper(paper: 1 | 2): EnglishLanguageTask[] {
  return getGoldenByPaper(paper);
}

export function getLanguageTaskById(id: string): EnglishLanguageTask | undefined {
  return getGoldenById(id);
}
