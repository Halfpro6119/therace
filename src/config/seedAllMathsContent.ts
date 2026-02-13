/**
 * Orchestrates full maths content seeding on app startup.
 * Runs: GCSE scope sync → diagram templates → golden questions → topic/unit quizzes → Further Maths & Statistics.
 * All operations are idempotent; safe to run on every load.
 */

import { db } from '../db/client';
import { syncGcseScopeToDb } from './gcseScopeSync';
import { seedDiagramTemplates } from '../admin/seedDiagramTemplates';
import { seedGoldenQuestionsForSubject } from './goldenQuestionSeed';
import { syncGoldenTopicUnitQuizzes } from '../admin/goldenTopicUnitQuizBuilder';
import { seedFurtherMathsAndStatistics } from './furtherMathsStatisticsSeed';

export interface SeedAllMathsResult {
  scope: { subjectsCreated: number; papersCreated: number; errors: string[] };
  diagrams: { success: boolean; count?: number; error?: string };
  golden: { created: number; updated: number; skipped: number; errors: string[] };
  topicUnitQuizzes: { topicsCreated: number; unitsCreated: number; errors: string[] };
  furtherMathsStats: { furtherMaths: number; statistics: number; errors: string[] };
}

/**
 * Seed all maths content: scope, diagrams, golden questions, topic/unit quizzes, Further Maths & Statistics.
 * Call on app startup; runs asynchronously and does not block the UI.
 */
export async function seedAllMathsContent(): Promise<SeedAllMathsResult> {
  const result: SeedAllMathsResult = {
    scope: { subjectsCreated: 0, papersCreated: 0, errors: [] },
    diagrams: { success: false },
    golden: { created: 0, updated: 0, skipped: 0, errors: [] },
    topicUnitQuizzes: { topicsCreated: 0, unitsCreated: 0, errors: [] },
    furtherMathsStats: { furtherMaths: 0, statistics: 0, errors: [] },
  };

  try {
    // 1. Sync GCSE scope (subjects + papers) — required for golden questions
    const scopeResult = await syncGcseScopeToDb();
    result.scope = {
      subjectsCreated: scopeResult.subjectsCreated,
      papersCreated: scopeResult.papersCreated,
      errors: scopeResult.errors,
    };

    // 2. Seed diagram templates (needed for golden questions with diagrams)
    const diagramResult = await seedDiagramTemplates();
    result.diagrams = diagramResult.success
      ? { success: true, count: diagramResult.count }
      : { success: false, error: diagramResult.error };

    // 3. Seed golden maths questions
    const mathsSubject = (await db.getSubjects()).find((s) => s.name.toLowerCase() === 'maths');
    if (mathsSubject) {
      const goldenResult = await seedGoldenQuestionsForSubject(mathsSubject.id, 'all');
      result.golden = {
        created: goldenResult.created,
        updated: goldenResult.updated,
        skipped: goldenResult.skipped,
        errors: goldenResult.errors,
      };

      // 4. Sync golden topic & unit quizzes (Maths only)
      const quizResult = await syncGoldenTopicUnitQuizzes(mathsSubject.id, undefined);
      result.topicUnitQuizzes = {
        topicsCreated: quizResult.topicsCreated + quizResult.topicsUpdated,
        unitsCreated: quizResult.unitsCreated + quizResult.unitsUpdated,
        errors: quizResult.errors,
      };
    } else {
      result.golden.errors.push('Maths subject not found after scope sync');
    }

    // 5. Seed Further Maths & Statistics placeholders
    const fmStatsResult = await seedFurtherMathsAndStatistics();
    result.furtherMathsStats = {
      furtherMaths: fmStatsResult.furtherMaths.created,
      statistics: fmStatsResult.statistics.created,
      errors: [...fmStatsResult.furtherMaths.errors, ...fmStatsResult.statistics.errors],
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    result.scope.errors.push(`Seed orchestration failed: ${message}`);
  }

  return result;
}
