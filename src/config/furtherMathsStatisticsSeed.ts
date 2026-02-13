/**
 * Seed placeholder prompts for Further Maths and Statistics.
 * Creates minimal prompts with meta.goldenId so hub topic/unit quizzes can run.
 * Replace with real content via import or question creator.
 */

import { db } from '../db/client';
import {
  FURTHER_MATHS_TOPIC_SPECS,
  FURTHER_MATHS_UNIT_SPECS,
} from './furtherMathsTopicUnitSpec';
import {
  STATISTICS_TOPIC_SPECS,
  STATISTICS_UNIT_SPECS,
} from './statisticsTopicUnitSpec';

const GOLDEN_UNIT_NAME = 'Golden questions';

export interface FurtherMathsStatsSeedResult {
  furtherMaths: { created: number; errors: string[] };
  statistics: { created: number; errors: string[] };
}

export async function seedFurtherMathsAndStatistics(): Promise<FurtherMathsStatsSeedResult> {
  const result: FurtherMathsStatsSeedResult = {
    furtherMaths: { created: 0, errors: [] },
    statistics: { created: 0, errors: [] },
  };

  const subjects = await db.getSubjects();
  const furtherMaths = subjects.find((s) => s.name.toLowerCase() === 'further maths');
  const statistics = subjects.find((s) => s.name.toLowerCase() === 'statistics');

  if (!furtherMaths) {
    result.furtherMaths.errors.push('Further Maths subject not found. Run GCSE scope sync first.');
  }
  if (!statistics) {
    result.statistics.errors.push('Statistics subject not found. Run GCSE scope sync first.');
  }
  if (!furtherMaths || !statistics) return result;

  // —— Further Maths ——
  const fmPapers = await db.listPapersBySubject(furtherMaths.id);
  const fmUnits = await db.getUnits(furtherMaths.id);
  let fmGoldenUnit = fmUnits.find((u) => u.name === GOLDEN_UNIT_NAME);
  if (!fmGoldenUnit) {
    fmGoldenUnit = await db.createUnit({
      subjectId: furtherMaths.id,
      name: GOLDEN_UNIT_NAME,
      orderIndex: fmUnits.length,
      description: 'Golden Further Maths questions',
    });
  }

  let fmTopics = await db.getTopicsByUnit(fmGoldenUnit.id);
  const fmTopicMap = new Map<string, string>();
  for (const spec of FURTHER_MATHS_TOPIC_SPECS) {
    const key = `paper-${spec.paper}`;
    if (!fmTopicMap.has(key)) {
      const paper = fmPapers.find((p) => p.paperNumber === spec.paper);
      if (!paper) continue;
      let topic = fmTopics.find((t) => t.name === `Paper ${spec.paper}`);
      if (!topic) {
        topic = await db.createTopic({
          subjectId: furtherMaths.id,
          unitId: fmGoldenUnit!.id,
          name: `Paper ${spec.paper}`,
          orderIndex: fmTopics.length,
          description: `Further Maths Paper ${spec.paper}`,
        });
        fmTopics = await db.getTopicsByUnit(fmGoldenUnit!.id);
      }
      fmTopicMap.set(key, topic.id);
    }
  }

  const existingFmPrompts = await db.getPromptsBySubject(furtherMaths.id);
  const existingFmByGoldenId = new Map<string, boolean>();
  for (const p of existingFmPrompts) {
    const gid = (p.meta as Record<string, unknown> | undefined)?.goldenId as string | undefined;
    if (gid) existingFmByGoldenId.set(gid, true);
  }

  const fmSpecsWithPaper = [
    ...FURTHER_MATHS_TOPIC_SPECS.map((s) => ({ ...s, paper: s.paper })),
    ...FURTHER_MATHS_UNIT_SPECS.map((u) => {
      const topic = FURTHER_MATHS_TOPIC_SPECS.find((t) => t.key === u.topicKey);
      return { ...u, paper: topic?.paper ?? 1 };
    }),
  ];
  const fmAllIds = new Set<string>();
  for (const spec of fmSpecsWithPaper) {
    for (const qid of spec.questionIds) fmAllIds.add(qid);
  }
  for (const qid of fmAllIds) {
    if (existingFmByGoldenId.has(qid)) continue;
    const match = fmSpecsWithPaper.find((s) => s.questionIds.includes(qid));
    if (!match) continue;
    const paper = fmPapers.find((p) => p.paperNumber === match.paper);
    if (!paper) continue;
    const topicId = fmTopicMap.get(`paper-${match.paper}`);
    if (!topicId) continue;
    try {
      await db.createPrompt({
        subjectId: furtherMaths.id,
        unitId: fmGoldenUnit!.id,
        paperId: paper.id,
        topicId,
        question: `[Placeholder FM] ${match.name} – ${qid}. Replace with real question.`,
        type: 'numeric',
        answers: ['0'],
        marks: 1,
        tier: 'higher',
        calculatorAllowed: match.paper === 2,
        meta: { goldenId: qid },
      });
      result.furtherMaths.created++;
      existingFmByGoldenId.set(qid, true);
    } catch (e) {
      result.furtherMaths.errors.push(`${qid}: ${String(e)}`);
    }
  }

  // —— Statistics ——
  const stPapers = await db.listPapersBySubject(statistics.id);
  const stUnits = await db.getUnits(statistics.id);
  let stGoldenUnit = stUnits.find((u) => u.name === GOLDEN_UNIT_NAME);
  if (!stGoldenUnit) {
    stGoldenUnit = await db.createUnit({
      subjectId: statistics.id,
      name: GOLDEN_UNIT_NAME,
      orderIndex: stUnits.length,
      description: 'Golden Statistics questions',
    });
  }

  let stTopics = await db.getTopicsByUnit(stGoldenUnit.id);
  const stTopicMap = new Map<string, string>();
  for (const spec of STATISTICS_TOPIC_SPECS) {
    const key = `paper-${spec.paper}`;
    if (!stTopicMap.has(key)) {
      const paper = stPapers.find((p) => p.paperNumber === spec.paper);
      if (!paper) continue;
      let topic = stTopics.find((t) => t.name === `Paper ${spec.paper}`);
      if (!topic) {
        topic = await db.createTopic({
          subjectId: statistics.id,
          unitId: stGoldenUnit!.id,
          name: `Paper ${spec.paper}`,
          orderIndex: stTopics.length,
          description: `Statistics Paper ${spec.paper}`,
        });
        stTopics = await db.getTopicsByUnit(stGoldenUnit!.id);
      }
      stTopicMap.set(key, topic.id);
    }
  }

  const existingStPrompts = await db.getPromptsBySubject(statistics.id);
  const existingStByGoldenId = new Map<string, boolean>();
  for (const p of existingStPrompts) {
    const gid = (p.meta as Record<string, unknown> | undefined)?.goldenId as string | undefined;
    if (gid) existingStByGoldenId.set(gid, true);
  }

  const stSpecsWithPaper = [
    ...STATISTICS_TOPIC_SPECS.map((s) => ({ ...s, paper: s.paper })),
    ...STATISTICS_UNIT_SPECS.map((u) => {
      const topic = STATISTICS_TOPIC_SPECS.find((t) => t.key === u.topicKey);
      return { ...u, paper: topic?.paper ?? 1 };
    }),
  ];
  const stAllIds = new Set<string>();
  for (const spec of stSpecsWithPaper) {
    for (const qid of spec.questionIds) stAllIds.add(qid);
  }
  for (const qid of stAllIds) {
    if (existingStByGoldenId.has(qid)) continue;
    const match = stSpecsWithPaper.find((s) => s.questionIds.includes(qid));
    if (!match) continue;
    const paper = stPapers.find((p) => p.paperNumber === match.paper);
    if (!paper) continue;
    const topicId = stTopicMap.get(`paper-${match.paper}`);
    if (!topicId) continue;
    try {
      await db.createPrompt({
        subjectId: statistics.id,
        unitId: stGoldenUnit!.id,
        paperId: paper.id,
        topicId,
        question: `[Placeholder Stats] ${match.name} – ${qid}. Replace with real question.`,
        type: 'numeric',
        answers: ['0'],
        marks: 1,
        tier: null,
        calculatorAllowed: true,
        meta: { goldenId: qid },
      });
      result.statistics.created++;
      existingStByGoldenId.set(qid, true);
    } catch (e) {
      result.statistics.errors.push(`${qid}: ${String(e)}`);
    }
  }

  return result;
}
