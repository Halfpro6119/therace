import { Quiz, Prompt } from '../types';
import { db } from '../db/client';

export interface CoverageValidation {
  isValid: boolean;
  expectedCount: number;
  actualCount: number;
  missingPromptIds: string[];
  extraPromptIds: string[];
  missingPrompts?: Prompt[];
  extraPrompts?: Prompt[];
}

export type CoverageStatus = 'complete' | 'missing' | 'extras' | 'both';

export function getCoverageStatus(validation: CoverageValidation): CoverageStatus {
  if (validation.isValid) return 'complete';
  if (validation.missingPromptIds.length > 0 && validation.extraPromptIds.length > 0) return 'both';
  if (validation.missingPromptIds.length > 0) return 'missing';
  return 'extras';
}

export async function validateQuizCoverage(quiz: Quiz): Promise<CoverageValidation> {
  let expectedPromptIds: string[] = [];

  if (quiz.scopeType === 'topic' && quiz.topicId) {
    const prompts = await db.getPromptsByTopic(quiz.topicId);
    expectedPromptIds = prompts.map((p: Prompt) => p.id);
  } else if (quiz.scopeType === 'unit' && quiz.unitId) {
    const topics = await db.getTopicsByUnit(quiz.unitId);
    const allPrompts: Prompt[] = [];
    for (const topic of topics) {
      const prompts = await db.getPromptsByTopic(topic.id);
      allPrompts.push(...prompts);
    }
    expectedPromptIds = allPrompts.map((p: Prompt) => p.id);
  } else if (quiz.scopeType === 'full' && quiz.subjectId) {
    const prompts = await db.getPromptsBySubject(quiz.subjectId);
    expectedPromptIds = prompts.map((p: Prompt) => p.id);
  }

  const actualPromptIds = quiz.promptIds;
  const expectedSet = new Set(expectedPromptIds);
  const actualSet = new Set(actualPromptIds);

  const missingPromptIds = expectedPromptIds.filter(id => !actualSet.has(id));
  const extraPromptIds = actualPromptIds.filter(id => !expectedSet.has(id));

  return {
    isValid: missingPromptIds.length === 0 && extraPromptIds.length === 0,
    expectedCount: expectedPromptIds.length,
    actualCount: actualPromptIds.length,
    missingPromptIds,
    extraPromptIds,
  };
}

export async function validateQuizCoverageWithDetails(quiz: Quiz): Promise<CoverageValidation> {
  const validation = await validateQuizCoverage(quiz);

  if (!validation.isValid) {
    const allPromptIds = [...validation.missingPromptIds, ...validation.extraPromptIds];
    if (allPromptIds.length > 0) {
      const allPrompts = await db.getPromptsByIds(allPromptIds);
      validation.missingPrompts = allPrompts.filter((p: Prompt) => validation.missingPromptIds.includes(p.id));
      validation.extraPrompts = allPrompts.filter((p: Prompt) => validation.extraPromptIds.includes(p.id));
    }
  }

  return validation;
}

export async function syncQuizPromptCoverage(quiz: Quiz): Promise<string[]> {
  let expectedPromptIds: string[] = [];

  if (quiz.scopeType === 'topic' && quiz.topicId) {
    const prompts = await db.getPromptsByTopic(quiz.topicId);
    expectedPromptIds = prompts.map((p: Prompt) => p.id);
  } else if (quiz.scopeType === 'unit' && quiz.unitId) {
    const topics = await db.getTopicsByUnit(quiz.unitId);
    const allPrompts: Prompt[] = [];
    for (const topic of topics) {
      const prompts = await db.getPromptsByTopic(topic.id);
      allPrompts.push(...prompts);
    }
    expectedPromptIds = allPrompts.map((p: Prompt) => p.id);
  } else if (quiz.scopeType === 'full' && quiz.subjectId) {
    const prompts = await db.getPromptsBySubject(quiz.subjectId);
    expectedPromptIds = prompts.map((p: Prompt) => p.id);
  }

  return expectedPromptIds;
}

export interface SubjectCoverageReport {
  subjectId: string;
  subjectName: string;
  totalPrompts: number;
  fullQuizzes: QuizCoverageReport[];
  unitQuizzes: QuizCoverageReport[];
  topicQuizzes: QuizCoverageReport[];
}

export interface QuizCoverageReport {
  quiz: Quiz;
  validation: CoverageValidation;
  status: CoverageStatus;
}

export async function generateSubjectCoverageReport(subjectId: string): Promise<SubjectCoverageReport> {
  const subject = await db.getSubject(subjectId);
  const quizzes = await db.getQuizzesBySubject(subjectId);
  const prompts = await db.getPromptsBySubject(subjectId);

  const totalPrompts = prompts.length;

  const fullQuizzes: QuizCoverageReport[] = [];
  const unitQuizzes: QuizCoverageReport[] = [];
  const topicQuizzes: QuizCoverageReport[] = [];

  for (const quiz of quizzes) {
    const validation = await validateQuizCoverage(quiz);
    const report: QuizCoverageReport = {
      quiz,
      validation,
      status: getCoverageStatus(validation),
    };

    if (quiz.scopeType === 'full') fullQuizzes.push(report);
    else if (quiz.scopeType === 'unit') unitQuizzes.push(report);
    else if (quiz.scopeType === 'topic') topicQuizzes.push(report);
  }

  return {
    subjectId,
    subjectName: subject?.name || 'Unknown',
    totalPrompts,
    fullQuizzes,
    unitQuizzes,
    topicQuizzes,
  };
}

export async function syncAllQuizzesInSubject(subjectId: string): Promise<number> {
  const quizzes = await db.getQuizzesBySubject(subjectId);

  let syncedCount = 0;

  for (const quiz of quizzes) {
    const newPromptIds = await syncQuizPromptCoverage(quiz);
    await db.updateQuiz(quiz.id, { promptIds: newPromptIds });
    syncedCount++;
  }

  return syncedCount;
}
