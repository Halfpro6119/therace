import { Subject, Unit, Topic, Prompt, Quiz } from '../types';

export interface SubjectHealthData {
  subject: Subject;
  promptCount: number;
  topicCount: number;
  unitCount: number;
  requiredQuizCount: number;
  existingQuizCount: number;
  missingQuizCount: number;
  coverageStatus: 'good' | 'warning' | 'error';
  targetStatus: 'good' | 'warning' | 'error';
}

export interface CoverageValidation {
  quizId: string;
  expectedPromptIds: string[];
  actualPromptIds: string[];
  isValid: boolean;
  missingPrompts: Prompt[];
  extraPrompts: Prompt[];
}

export interface QuizRequirement {
  type: 'full' | 'unit' | 'topic';
  id: string;
  name: string;
  expectedPromptCount: number;
  quiz?: Quiz;
  coverageStatus?: 'valid' | 'invalid' | 'missing';
}

export function calculateRequiredQuizCount(topicCount: number, unitCount: number): number {
  return topicCount + unitCount + 1;
}

export function validateCoverage(
  quiz: Quiz,
  expectedPromptIds: string[],
  allPrompts: Prompt[]
): CoverageValidation {
  const actualIds = new Set(quiz.promptIds);
  const expectedIds = new Set(expectedPromptIds);

  const missingIds = expectedPromptIds.filter(id => !actualIds.has(id));
  const extraIds = quiz.promptIds.filter(id => !expectedIds.has(id));

  const promptMap = new Map(allPrompts.map(p => [p.id, p]));

  return {
    quizId: quiz.id,
    expectedPromptIds,
    actualPromptIds: quiz.promptIds,
    isValid: missingIds.length === 0 && extraIds.length === 0,
    missingPrompts: missingIds.map(id => promptMap.get(id)).filter(Boolean) as Prompt[],
    extraPrompts: extraIds.map(id => promptMap.get(id)).filter(Boolean) as Prompt[],
  };
}

export function getExpectedPromptsForQuiz(
  quiz: Quiz,
  prompts: Prompt[]
): string[] {
  if (quiz.scopeType === 'topic' && quiz.topicId) {
    return prompts.filter(p => p.topicId === quiz.topicId).map(p => p.id);
  } else if (quiz.scopeType === 'unit' && quiz.unitId) {
    return prompts.filter(p => p.unitId === quiz.unitId).map(p => p.id);
  } else if (quiz.scopeType === 'full') {
    return prompts.filter(p => p.subjectId === quiz.subjectId).map(p => p.id);
  }
  return [];
}

export function calculateTargetRatio(quiz: Quiz): number {
  const promptCount = quiz.promptIds.length;
  if (promptCount === 0) return 0;
  return quiz.grade9TargetSec / promptCount;
}

export function isTargetReasonable(quiz: Quiz): boolean {
  const ratio = calculateTargetRatio(quiz);
  return ratio >= 5 && ratio <= 60;
}

export function generateQuizTitle(
  scopeType: 'full' | 'unit' | 'topic',
  name: string
): string {
  if (scopeType === 'full') return `${name} — Full GCSE Sprint`;
  if (scopeType === 'unit') return `${name} — Unit Sprint`;
  return `${name} — Topic Sprint`;
}

export function calculateSubjectHealth(
  subject: Subject,
  units: Unit[],
  topics: Topic[],
  prompts: Prompt[],
  quizzes: Quiz[]
): SubjectHealthData {
  const topicCount = topics.length;
  const unitCount = units.length;
  const promptCount = prompts.filter(p => p.subjectId === subject.id).length;
  const requiredQuizCount = calculateRequiredQuizCount(topicCount, unitCount);
  const existingQuizCount = quizzes.filter(q => q.subjectId === subject.id).length;
  const missingQuizCount = Math.max(0, requiredQuizCount - existingQuizCount);

  const fullQuizExists = quizzes.some(q => q.subjectId === subject.id && q.scopeType === 'full');
  const unitQuizCoverage = units.filter(u =>
    quizzes.some(q => q.unitId === u.id && q.scopeType === 'unit')
  ).length;
  const topicQuizCoverage = topics.filter(t =>
    quizzes.some(q => q.topicId === t.id && q.scopeType === 'topic')
  ).length;

  let coverageStatus: 'good' | 'warning' | 'error' = 'good';
  if (!fullQuizExists || unitQuizCoverage < unitCount || topicQuizCoverage < topicCount) {
    coverageStatus = missingQuizCount > unitCount ? 'error' : 'warning';
  }

  const quizzesWithTargets = quizzes.filter(q =>
    q.subjectId === subject.id && q.grade9TargetSec > 0 && q.timeLimitSec > 0
  ).length;
  const targetPct = existingQuizCount > 0 ? (quizzesWithTargets / existingQuizCount) : 0;

  let targetStatus: 'good' | 'warning' | 'error' = 'good';
  if (targetPct < 0.5) targetStatus = 'error';
  else if (targetPct < 1) targetStatus = 'warning';

  return {
    subject,
    promptCount,
    topicCount,
    unitCount,
    requiredQuizCount,
    existingQuizCount,
    missingQuizCount,
    coverageStatus,
    targetStatus,
  };
}

export interface TargetPreset {
  name: string;
  topicSecondsPerQuestion: number;
  unitSecondsPerQuestion: number;
  fullSecondsPerQuestion: number;
  timeLimitMultiplier: number;
}

export const TARGET_PRESETS: TargetPreset[] = [
  {
    name: 'Conservative',
    topicSecondsPerQuestion: 30,
    unitSecondsPerQuestion: 25,
    fullSecondsPerQuestion: 20,
    timeLimitMultiplier: 1.8,
  },
  {
    name: 'Standard',
    topicSecondsPerQuestion: 20,
    unitSecondsPerQuestion: 18,
    fullSecondsPerQuestion: 15,
    timeLimitMultiplier: 1.5,
  },
  {
    name: 'Hard',
    topicSecondsPerQuestion: 15,
    unitSecondsPerQuestion: 12,
    fullSecondsPerQuestion: 10,
    timeLimitMultiplier: 1.3,
  },
];

export function applyTargetPreset(
  quiz: Quiz,
  preset: TargetPreset
): { grade9TargetSec: number; timeLimitSec: number } {
  const promptCount = quiz.promptIds.length;
  let secondsPerQuestion = preset.fullSecondsPerQuestion;

  if (quiz.scopeType === 'topic') {
    secondsPerQuestion = preset.topicSecondsPerQuestion;
  } else if (quiz.scopeType === 'unit') {
    secondsPerQuestion = preset.unitSecondsPerQuestion;
  }

  const grade9TargetSec = Math.round(promptCount * secondsPerQuestion);
  const timeLimitSec = Math.round(grade9TargetSec * preset.timeLimitMultiplier);

  return { grade9TargetSec, timeLimitSec };
}
