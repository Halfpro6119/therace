/**
 * Golden question seed — creates or updates prompts from the hard-coded golden lists
 * (e.g. GOLDEN_MATHS_QUESTIONS) for a given subject and optional paper filter.
 *
 * Uses a "Golden questions" unit and "Golden" topic per subject; stores
 * meta.goldenId (e.g. F01) to identify prompts. Existing prompts with the same
 * goldenId and paper are updated when the golden config changes (prompt text,
 * answers, diagramParams, etc.).
 */

import { db } from '../db/client';
import {
  GOLDEN_MATHS_QUESTIONS,
  GOLDEN_DIAGRAM_TO_TEMPLATE_ID,
  calculatorAllowedForPaper,
  getDefaultMarksForGoldenQuestion,
  getDefaultDifficultyForGoldenQuestion,
} from './goldenMathsQuestions';
import { DIAGRAM_TYPE_TO_TEMPLATE_ID, getTemplateIdForDiagramType } from '../diagrams/diagramTypeSpec';

const GOLDEN_UNIT_NAME = 'Golden questions';

function getTopicNameForTierAndPaper(tier: 'foundation' | 'higher', paper: 1 | 2 | 3): string {
  const tierLabel = tier === 'foundation' ? 'Foundation' : 'Higher';
  return `${tierLabel} Paper ${paper}`;
}

export type GoldenSeedPaperFilter = 1 | 2 | 3 | 'all';

export interface GoldenSeedResult {
  created: number;
  updated: number;
  skipped: number;
  errors: string[];
}

/**
 * Seed golden questions for a subject. Subject is identified by id (or by name "Maths").
 * paperFilter: 1 | 2 | 3 to seed only that paper, or 'all' to seed all.
 * Only Maths has a golden list implemented; other subjects return { created: 0, skipped: 0, errors: [] } with a message.
 */
export async function seedGoldenQuestionsForSubject(
  subjectIdOrName: string,
  paperFilter: GoldenSeedPaperFilter
): Promise<GoldenSeedResult> {
  const result: GoldenSeedResult = { created: 0, updated: 0, skipped: 0, errors: [] };

  const subjects = await db.getSubjects();
  const subject = subjects.find(
    s => s.id === subjectIdOrName || s.name.toLowerCase() === subjectIdOrName.toLowerCase()
  );
  if (!subject) {
    result.errors.push(`Subject not found: ${subjectIdOrName}`);
    return result;
  }

  if (subject.name !== 'Maths') {
    result.errors.push(`Golden questions only defined for Maths. Subject "${subject.name}" has no golden list yet.`);
    return result;
  }

  const questions = GOLDEN_MATHS_QUESTIONS;
  const filtered =
    paperFilter === 'all'
      ? questions
      : questions.filter(q => q.paper === paperFilter);

  const papers = await db.listPapersBySubject(subject.id);
  const units = await db.getUnits(subject.id);
  let unit = units.find(u => u.name === GOLDEN_UNIT_NAME);
  if (!unit) {
    unit = await db.createUnit({
      subjectId: subject.id,
      name: GOLDEN_UNIT_NAME,
      orderIndex: units.length,
      description: 'Golden mastery question set',
    });
  }

  let topics = await db.getTopicsByUnit(unit.id);
  const existingPrompts = await db.getPromptsBySubject(subject.id);
  const existingPromptsByKey = new Map<string, (typeof existingPrompts)[0]>();
  for (const p of existingPrompts) {
    const goldenId = (p.meta as any)?.goldenId;
    if (goldenId && p.paperId) {
      existingPromptsByKey.set(`${goldenId}:${p.paperId}`, p);
    }
  }

  // Group questions by tier and paper to create separate topics
  const questionsByTopic = new Map<string, typeof filtered>();
  for (const q of filtered) {
    const topicKey = `${q.tier}-paper-${q.paper}`;
    if (!questionsByTopic.has(topicKey)) {
      questionsByTopic.set(topicKey, []);
    }
    questionsByTopic.get(topicKey)!.push(q);
  }

  // Create or find topics for each tier+paper combination
  const topicMap = new Map<string, any>();
  let orderIndex = topics.length;
  for (const [topicKey, topicQuestions] of questionsByTopic.entries()) {
    const firstQ = topicQuestions[0];
    const topicName = getTopicNameForTierAndPaper(firstQ.tier, firstQ.paper);
    
    let topic = topics.find(t => t.name === topicName);
    if (!topic) {
      topic = await db.createTopic({
        subjectId: subject.id,
        unitId: unit.id,
        name: topicName,
        orderIndex: orderIndex++,
        description: `Golden ${firstQ.tier} tier questions for Paper ${firstQ.paper}`,
      });
      // Refresh topics list to include the new topic
      topics = await db.getTopicsByUnit(unit.id);
    }
    topicMap.set(topicKey, topic);
  }

  for (const q of filtered) {
    const paper = papers.find(p => p.paperNumber === q.paper);
    if (!paper) {
      result.errors.push(`Paper ${q.paper} not found for ${subject.name}. Run scope sync first.`);
      result.skipped++;
      continue;
    }

    const key = `${q.id}:${paper.id}`;
    const existingPrompt = existingPromptsByKey.get(key);

    const topicKey = `${q.tier}-paper-${q.paper}`;
    const topic = topicMap.get(topicKey);
    if (!topic) {
      result.errors.push(`Topic not found for ${q.tier} Paper ${q.paper}`);
      result.skipped++;
      continue;
    }

    let answers: string[] = Array.isArray(q.answers)
      ? q.answers
      : typeof q.answers === 'string'
        ? (q.answers.includes(',') ? q.answers.split(',').map(a => a.trim()) : [q.answers])
        : [String(q.answers)];
    if (answers.length === 0) answers = [''];

    const calculatorAllowed = q.calculator ?? calculatorAllowedForPaper(q.paper);

    const meta: Record<string, unknown> = {
      goldenId: q.id,
      difficulty: getDefaultDifficultyForGoldenQuestion(q),
    };
    if (q.questionData && typeof q.questionData === 'object' && Object.keys(q.questionData).length > 0) {
      meta.questionData = q.questionData;
    }

    let diagram_metadata: Record<string, unknown> | undefined;
    const diagramType = q.diagram ?? 'none';
    if (diagramType !== 'none') {
      const promptLower = q.prompt.toLowerCase();
      // Special case: angle-in-a-semicircle questions need the theorem diagram (A, B, C, O)
      const isAngleInSemicircle =
        diagramType === 'circle' &&
        (promptLower.includes('angle abc') || promptLower.includes('angle aoc') || promptLower.includes('semicircle') || promptLower.includes('points on the circumference'));
      // Special case: tangent-radius theorem (H2-62)
      const isTangentRadius =
        diagramType === 'circle' &&
        (promptLower.includes('tangent') || promptLower.includes('tangent-radius'));
      // Special case: box plot comparison questions should use comparison template
      let templateId: string | undefined;
      if (isAngleInSemicircle) {
        templateId = 'math.circle_theorems.angle_in_semicircle.v1';
      } else if (isTangentRadius) {
        templateId = 'math.circle_theorems.tangent_radius.v1';
      } else if (diagramType === 'boxPlot' && (promptLower.includes('compare') || promptLower.includes('comparison'))) {
        templateId = 'math.statistics.boxplot_comparison.v1';
      } else {
        // First try the golden mapping (short names)
        templateId = GOLDEN_DIAGRAM_TO_TEMPLATE_ID[diagramType];
        
        // If it's a short name, try to resolve to full template ID
        if (templateId && templateId in DIAGRAM_TYPE_TO_TEMPLATE_ID) {
          templateId = getTemplateIdForDiagramType(templateId as any);
        }
        
        // If still a short name or empty, try direct lookup
        if (!templateId || templateId === diagramType) {
          if (diagramType in DIAGRAM_TYPE_TO_TEMPLATE_ID) {
            templateId = getTemplateIdForDiagramType(diagramType as any);
          }
        }
      }
      
      if (templateId) {
        let params: Record<string, unknown> = {};
        // Question-specific diagram params (H2 Paper 2 per HIGHER_PAPER2_DIAGRAM_SPEC.md)
        if (q.id === 'H2-35' || q.id === 'H2-38') {
          // Pre-plotted quadratic y = x² − 6x + 5 (turning point, roots)
          params = {
            values: { a: 1, b: -6, c: 5, xMin: -2, xMax: 8, yMin: -8, yMax: 8 },
            visibility: {
              highlightTurningPoint: true,
              highlightRoots: true,
              showGrid: true,
            },
          };
        } else if (q.id === 'H2-73') {
          // Cumulative frequency curve — show median line hint
          params = {
            visibility: { showMedianLine: true, showGrid: true },
          };
        }
        // Per-prompt stored answers: merge diagramParams for dynamic diagrams/data
        if (q.diagramParams && typeof q.diagramParams === 'object') {
          const dp = q.diagramParams as Record<string, unknown>;
          if (dp.templateId && typeof dp.templateId === 'string') {
            templateId = dp.templateId;
          }
          const { templateId: _t, ...rest } = dp;
          params = { ...params, ...rest };
        }
        diagram_metadata = {
          mode: 'auto',
          templateId,
          params,
          placement: 'above', // Place diagrams above the question text for better visibility
        };
      }
    }

    try {
      if (existingPrompt) {
        await db.updatePrompt(existingPrompt.id, {
          topicId: topic.id,
          tier: q.tier,
          type: q.type,
          question: q.prompt,
          answers,
          marks: getDefaultMarksForGoldenQuestion(q),
          timeAllowanceSec: q.timeAllowanceSec ?? 60,
          hint: q.hint ?? undefined,
          explanation: q.explanation ?? undefined,
          calculatorAllowed,
          meta,
          diagram_metadata,
        } as any);
        result.updated++;
      } else {
        await db.createPrompt({
          subjectId: subject.id,
          unitId: unit.id,
          topicId: topic.id,
          paperId: paper.id,
          tier: q.tier,
          type: q.type,
          question: q.prompt,
          answers,
          marks: getDefaultMarksForGoldenQuestion(q),
          timeAllowanceSec: q.timeAllowanceSec ?? 60,
          hint: q.hint ?? undefined,
          explanation: q.explanation ?? undefined,
          calculatorAllowed,
          meta,
          diagram_metadata,
        } as any);
        result.created++;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      result.errors.push(`${q.id}: ${message}`);
    }
  }

  return result;
}
