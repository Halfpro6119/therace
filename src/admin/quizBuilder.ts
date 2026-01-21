import { Quiz, Prompt } from '../types';
import { db } from '../db/client';

export interface QuizTemplate {
  title: string;
  description: string;
  scopeType: 'topic' | 'unit' | 'full';
  topicId?: string;
  unitId?: string;
  promptIds: string[];
  timeLimitSec: number;
  grade9TargetSec: number;
}

export function calculateTimeLimits(promptCount: number): { timeLimit: number; grade9Target: number } {
  const baseTimePerPrompt = 30;
  const grade9TimePerPrompt = 15;

  return {
    timeLimit: promptCount * baseTimePerPrompt,
    grade9Target: promptCount * grade9TimePerPrompt,
  };
}

export interface QuizProgress {
  type: 'topic' | 'unit' | 'paper' | 'full';
  currentItem: string;
  processed: number;
  total: number;
}

export async function createTopicQuizzes(
  subjectId: string,
  onProgress?: (progress: QuizProgress) => void
): Promise<Quiz[]> {
  const topics = await db.getTopics(subjectId);
  const createdQuizzes: Quiz[] = [];
  let processed = 0;

  for (const topic of topics) {
    const prompts = await db.getPromptsByTopic(topic.id);

    if (prompts.length === 0) {
      processed++;
      continue;
    }

    if (onProgress) {
      onProgress({
        type: 'topic',
        currentItem: `Creating topic quiz: ${topic.name}`,
        processed,
        total: topics.length,
      });
    }

    const { timeLimit, grade9Target } = calculateTimeLimits(prompts.length);

    const quiz = await db.createQuiz({
      subjectId,
      scopeType: 'topic',
      topicId: topic.id,
      unitId: topic.unitId,
      title: `${topic.name} Quick Fire`,
      description: `Master ${topic.name} with rapid recall questions`,
      timeLimitSec: timeLimit,
      grade9TargetSec: grade9Target,
      promptIds: prompts.map(p => p.id),
    });

    createdQuizzes.push(quiz);
    processed++;
  }

  return createdQuizzes;
}

export async function createUnitQuizzes(
  subjectId: string,
  onProgress?: (progress: QuizProgress) => void
): Promise<Quiz[]> {
  const units = await db.getUnits(subjectId);
  const topics = await db.getTopics(subjectId);
  const createdQuizzes: Quiz[] = [];
  let processed = 0;

  for (const unit of units) {
    const unitTopics = topics.filter(t => t.unitId === unit.id);
    const allPrompts: Prompt[] = [];

    for (const topic of unitTopics) {
      const prompts = await db.getPromptsByTopic(topic.id);
      allPrompts.push(...prompts);
    }

    if (allPrompts.length === 0) {
      processed++;
      continue;
    }

    if (onProgress) {
      onProgress({
        type: 'unit',
        currentItem: `Creating unit quiz: ${unit.name}`,
        processed,
        total: units.length,
      });
    }

    const { timeLimit, grade9Target } = calculateTimeLimits(allPrompts.length);

    const quiz = await db.createQuiz({
      subjectId,
      scopeType: 'unit',
      unitId: unit.id,
      title: `${unit.name} Unit Test`,
      description: `Comprehensive test covering all ${unit.name} topics`,
      timeLimitSec: timeLimit,
      grade9TargetSec: grade9Target,
      promptIds: allPrompts.map(p => p.id),
    });

    createdQuizzes.push(quiz);
    processed++;
  }

  return createdQuizzes;
}

export async function createPaperQuizzes(
  subjectId: string,
  onProgress?: (progress: QuizProgress) => void
): Promise<Quiz[]> {
  const papers = await db.listPapersBySubject(subjectId);
  const createdQuizzes: Quiz[] = [];
  let processed = 0;

  for (const paper of papers) {
    const prompts = await db.getPromptsForPaperMasterQuiz(paper.id);

    if (prompts.length === 0) {
      continue;
    }

    if (onProgress) {
      onProgress({
        type: 'paper',
        currentItem: `Creating quiz for Paper ${paper.paperNumber}: ${paper.name}`,
        processed,
        total: papers.length,
      });
    }

    const { timeLimit, grade9Target } = calculateTimeLimits(prompts.length);

    const quiz = await db.upsertPaperMasterQuiz(
      subjectId,
      paper.id,
      `Paper ${paper.paperNumber} Master Quiz`,
      `All questions from ${paper.name}`,
      {
        paperNumber: paper.paperNumber,
        calculatorAllowed: paper.calculatorAllowedDefault,
      }
    );

    createdQuizzes.push(quiz);
    processed++;
  }

  return createdQuizzes;
}


export async function createSinglePaperQuiz(
  subjectId: string,
  paperNumber: 1 | 2 | 3,
  onProgress?: (progress: QuizProgress) => void
): Promise<Quiz | null> {
  const paper = await db.getPaperByNumber(subjectId, paperNumber);
  if (!paper) return null;

  const prompts = await db.getPromptsForPaperMasterQuiz(paper.id);
  if (prompts.length === 0) return null;

  if (onProgress) {
    onProgress({
      type: 'paper',
      currentItem: `Creating quiz for Paper ${paper.paperNumber}: ${paper.name}`,
      processed: 0,
      total: 1,
    });
  }

  // Deterministic: upsert a paper master quiz entity
  const quiz = await db.upsertPaperMasterQuiz(
    subjectId,
    paper.id,
    `Paper ${paper.paperNumber} Master Quiz`,
    `All questions from ${paper.name}`,
    {
      paperNumber: paper.paperNumber,
      calculatorAllowed: paper.calculatorAllowedDefault,
    }
  );

  return quiz;
}

export async function createFullGCSEQuiz(
  subjectId: string,
  onProgress?: (progress: QuizProgress) => void
): Promise<Quiz | null> {
  const subject = await db.getSubject(subjectId);
  const allPrompts = await db.getPromptsBySubject(subjectId);

  if (allPrompts.length === 0) {
    return null;
  }

  if (onProgress) {
    onProgress({
      type: 'full',
      currentItem: `Creating full GCSE quiz: ${subject?.name}`,
      processed: 0,
      total: 1,
    });
  }

  const { timeLimit, grade9Target } = calculateTimeLimits(allPrompts.length);

  const quiz = await db.createQuiz({
    subjectId,
    scopeType: 'full',
    title: `${subject?.name} Full GCSE Challenge`,
    description: `Complete ${subject?.name} assessment covering all topics`,
    timeLimitSec: timeLimit,
    grade9TargetSec: grade9Target,
    promptIds: allPrompts.map(p => p.id),
  });

  return quiz;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}