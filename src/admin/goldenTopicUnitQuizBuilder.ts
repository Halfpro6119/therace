/**
 * Golden Topic/Unit Quiz Builder
 *
 * Creates and syncs topic and unit quizzes from the golden maths spec
 * (goldenMathsTopicUnitSpec.ts). Resolves prompts by meta.goldenId and
 * builds quizzes with the correct promptIds.
 *
 * Only applies to Maths subject (golden questions).
 */

import { db } from '../db/client';
import { Prompt, Quiz } from '../types';
import { GOLDEN_TOPIC_SPECS, GOLDEN_UNIT_SPECS } from '../config/goldenMathsTopicUnitSpec';

const SEC_PER_QUESTION = 60;
const GRADE9_SEC_PER_QUESTION = 45;

export interface GoldenQuizSyncProgress {
  phase: 'topic' | 'unit';
  currentItem: string;
  processed: number;
  total: number;
}

export interface GoldenQuizSyncResult {
  topicsCreated: number;
  topicsUpdated: number;
  topicsSkipped: number;
  unitsCreated: number;
  unitsUpdated: number;
  unitsSkipped: number;
  errors: string[];
}

/**
 * Find existing golden topic quiz by subject and golden key.
 */
async function findGoldenTopicQuiz(subjectId: string, goldenTopicKey: string): Promise<Quiz | undefined> {
  const quizzes = await db.getQuizzesBySubject(subjectId);
  return quizzes.find(
    (q) =>
      q.scopeType === 'topic' &&
      (q.settings as Record<string, unknown> | undefined)?.goldenTopicKey === goldenTopicKey
  );
}

/**
 * Find existing golden unit quiz by subject and golden key.
 */
async function findGoldenUnitQuiz(subjectId: string, goldenUnitKey: string): Promise<Quiz | undefined> {
  const quizzes = await db.getQuizzesBySubject(subjectId);
  return quizzes.find(
    (q) =>
      q.scopeType === 'unit' &&
      (q.settings as Record<string, unknown> | undefined)?.goldenUnitKey === goldenUnitKey
  );
}

/**
 * Sync all golden topic quizzes for a Maths subject.
 */
export async function syncGoldenTopicQuizzes(
  subjectId: string,
  onProgress?: (p: GoldenQuizSyncProgress) => void
): Promise<{ created: number; updated: number; skipped: number; errors: string[] }> {
  const result = { created: 0, updated: 0, skipped: 0, errors: [] as string[] };
  const total = GOLDEN_TOPIC_SPECS.length;

  for (let i = 0; i < GOLDEN_TOPIC_SPECS.length; i++) {
    const spec = GOLDEN_TOPIC_SPECS[i];
    if (onProgress) {
      onProgress({
        phase: 'topic',
        currentItem: `Topic: ${spec.name}`,
        processed: i,
        total,
      });
    }

    try {
      const prompts = await db.getPromptsByGoldenIds(subjectId, spec.questionIds);
      if (prompts.length === 0) {
        result.skipped++;
        continue;
      }

      const promptIds = preserveOrder(spec.questionIds, prompts);
      const timeLimitSec = promptIds.length * SEC_PER_QUESTION;
      const grade9TargetSec = promptIds.length * GRADE9_SEC_PER_QUESTION;
      const title = `${spec.name} — Topic Quiz`;
      const description = `Revise ${spec.name} (${spec.tier} Paper ${spec.paper})`;

      const existing = await findGoldenTopicQuiz(subjectId, spec.key);
      const settings = { goldenTopicKey: spec.key, tier: spec.tier, paper: spec.paper };

      if (existing) {
        await db.updateQuiz(existing.id, {
          title,
          description,
          promptIds,
          timeLimitSec,
          grade9TargetSec,
          settings: { ...(existing.settings as object || {}), ...settings },
        });
        result.updated++;
      } else {
        await db.createQuiz({
          subjectId,
          scopeType: 'topic',
          title,
          description,
          timeLimitSec,
          grade9TargetSec,
          promptIds,
          settings,
        });
        result.created++;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      result.errors.push(`Topic ${spec.key}: ${msg}`);
    }
  }

  return result;
}

/**
 * Sync all golden unit quizzes for a Maths subject.
 */
export async function syncGoldenUnitQuizzes(
  subjectId: string,
  onProgress?: (p: GoldenQuizSyncProgress) => void
): Promise<{ created: number; updated: number; skipped: number; errors: string[] }> {
  const result = { created: 0, updated: 0, skipped: 0, errors: [] as string[] };
  const total = GOLDEN_UNIT_SPECS.length;

  for (let i = 0; i < GOLDEN_UNIT_SPECS.length; i++) {
    const spec = GOLDEN_UNIT_SPECS[i];
    if (onProgress) {
      onProgress({
        phase: 'unit',
        currentItem: `Unit: ${spec.name}`,
        processed: i,
        total,
      });
    }

    try {
      const prompts = await db.getPromptsByGoldenIds(subjectId, spec.questionIds);
      if (prompts.length === 0) {
        result.skipped++;
        continue;
      }

      const promptIds = preserveOrder(spec.questionIds, prompts);
      const timeLimitSec = promptIds.length * SEC_PER_QUESTION;
      const grade9TargetSec = promptIds.length * GRADE9_SEC_PER_QUESTION;
      const title = `${spec.name} — Unit Quiz`;
      const description = `Focused drill on ${spec.name}`;

      const existing = await findGoldenUnitQuiz(subjectId, spec.key);
      const settings = { goldenUnitKey: spec.key, topicKey: spec.topicKey };

      if (existing) {
        await db.updateQuiz(existing.id, {
          title,
          description,
          promptIds,
          timeLimitSec,
          grade9TargetSec,
          settings: { ...(existing.settings as object || {}), ...settings },
        });
        result.updated++;
      } else {
        await db.createQuiz({
          subjectId,
          scopeType: 'unit',
          title,
          description,
          timeLimitSec,
          grade9TargetSec,
          promptIds,
          settings,
        });
        result.created++;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      result.errors.push(`Unit ${spec.key}: ${msg}`);
    }
  }

  return result;
}

/**
 * Preserve question order from spec when mapping prompts to promptIds.
 */
function preserveOrder(questionIds: string[], prompts: Prompt[]): string[] {
  const byGoldenId = new Map<string, Prompt>();
  for (const p of prompts) {
    const gid = (p.meta as Record<string, unknown> | undefined)?.goldenId as string | undefined;
    if (gid) byGoldenId.set(gid, p);
  }
  const ids: string[] = [];
  for (const qid of questionIds) {
    const prompt = byGoldenId.get(qid);
    if (prompt) ids.push(prompt.id);
  }
  return ids;
}

/**
 * Sync both topic and unit quizzes. Only for Maths.
 */
export async function syncGoldenTopicUnitQuizzes(
  subjectId: string,
  onProgress?: (p: GoldenQuizSyncProgress) => void
): Promise<GoldenQuizSyncResult> {
  const subject = await db.getSubject(subjectId);
  if (!subject) {
    throw new Error(`Subject not found: ${subjectId}`);
  }
  if (subject.name !== 'Maths') {
    throw new Error(`Golden topic/unit quizzes only apply to Maths. Subject "${subject.name}" is not supported.`);
  }

  const topicResult = await syncGoldenTopicQuizzes(subjectId, onProgress);
  const unitResult = await syncGoldenUnitQuizzes(subjectId, onProgress);

  return {
    topicsCreated: topicResult.created,
    topicsUpdated: topicResult.updated,
    topicsSkipped: topicResult.skipped,
    unitsCreated: unitResult.created,
    unitsUpdated: unitResult.updated,
    unitsSkipped: unitResult.skipped,
    errors: [...topicResult.errors, ...unitResult.errors],
  };
}
