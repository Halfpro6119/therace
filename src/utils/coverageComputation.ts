/**
 * Coverage Computation Utilities
 * 
 * Functions to compute coverage metrics for topics, units, and papers
 * based on question types and prompt counts.
 */

import {
  TopicCoverage,
  UnitCoverage,
  PaperCoverage,
  MissingQuestionType,
  SubjectCoverageSummary,
  CoverageSettings,
  QuestionType,
  Paper,
} from '../types/coverage';
import { Topic, Unit, Prompt } from '../types';

/**
 * Compute coverage for a single topic
 * 
 * @param topic - The topic to compute coverage for
 * @param unit - The parent unit
 * @param questionTypes - All question types for this topic
 * @param prompts - All prompts in the system
 * @param settings - Coverage settings (thresholds)
 * @returns TopicCoverage metrics
 */
export function computeTopicCoverage(
  topic: Topic,
  unit: Unit,
  questionTypes: QuestionType[],
  prompts: Prompt[],
  settings: CoverageSettings
): TopicCoverage {
  // Filter question types for this topic
  const topicQuestionTypes = questionTypes.filter(qt => qt.topicId === topic.id);
  
  // Count prompts per question type
  const promptsByType = new Map<string, number>();
  topicQuestionTypes.forEach(qt => {
    const count = prompts.filter(p => p.meta?.questionTypeId === qt.id || p.meta?.typeId === qt.typeId).length;
    promptsByType.set(qt.id, count);
  });

  // Count populated types (those with >= minimum prompts)
  const populatedTypes = Array.from(promptsByType.values()).filter(
    count => count >= settings.minPromptsPerQuestionType
  ).length;

  // Total prompts in this topic
  const totalPrompts = Array.from(promptsByType.values()).reduce((a, b) => a + b, 0);

  // Identify missing types
  const missingTypes: MissingQuestionType[] = topicQuestionTypes
    .filter(qt => (promptsByType.get(qt.id) || 0) < settings.minPromptsPerQuestionType)
    .map(qt => ({
      questionTypeId: qt.id,
      typeId: qt.typeId,
      title: qt.title,
      unitId: unit.id,
      unitName: unit.name,
      topicId: topic.id,
      topicName: topic.name,
      paperId: qt.paperId,
      paperNumber: undefined, // Will be populated if needed
      currentPromptsCount: promptsByType.get(qt.id) || 0,
      requiredPromptsCount: settings.minPromptsPerQuestionType,
      deficit: settings.minPromptsPerQuestionType - (promptsByType.get(qt.id) || 0),
    }));

  // Calculate coverage percentage
  const coveragePercentage = topicQuestionTypes.length > 0
    ? (populatedTypes / topicQuestionTypes.length) * 100
    : 0;

  // Determine status
  let status: 'ok' | 'warning' | 'missing' = 'ok';
  if (coveragePercentage < 50) status = 'missing';
  else if (coveragePercentage < 80) status = 'warning';

  return {
    topicId: topic.id,
    topicName: topic.name,
    unitId: unit.id,
    unitName: unit.name,
    requiredQuestionTypesCount: topicQuestionTypes.length,
    populatedQuestionTypesCount: populatedTypes,
    promptsCount: totalPrompts,
    coveragePercentage,
    status,
    missingTypes,
  };
}

/**
 * Compute coverage for a single unit
 * 
 * @param unit - The unit to compute coverage for
 * @param topics - All topics in this unit
 * @param questionTypes - All question types
 * @param prompts - All prompts
 * @param settings - Coverage settings
 * @returns UnitCoverage metrics
 */
export function computeUnitCoverage(
  unit: Unit,
  topics: Topic[],
  questionTypes: QuestionType[],
  prompts: Prompt[],
  settings: CoverageSettings
): UnitCoverage {
  // Compute coverage for each topic
  const topicCoverages = topics.map(topic =>
    computeTopicCoverage(topic, unit, questionTypes, prompts, settings)
  );

  // Calculate aggregates
  const topicsCoveredCount = topicCoverages.filter(tc => tc.status === 'ok').length;
  const averageCoveragePercentage = topicCoverages.length > 0
    ? topicCoverages.reduce((sum, tc) => sum + tc.coveragePercentage, 0) / topicCoverages.length
    : 0;

  const totalPrompts = topicCoverages.reduce((sum, tc) => sum + tc.promptsCount, 0);

  // Determine status
  let status: 'ok' | 'warning' | 'missing' = 'ok';
  if (averageCoveragePercentage < 50) status = 'missing';
  else if (averageCoveragePercentage < 80) status = 'warning';

  return {
    unitId: unit.id,
    unitName: unit.name,
    topicsCount: topics.length,
    topicsCoveredCount,
    averageCoveragePercentage,
    promptsCount: totalPrompts,
    status,
    topics: topicCoverages,
  };
}

/**
 * Compute coverage for a single paper
 * 
 * @param paper - The paper to compute coverage for
 * @param units - All units for this subject
 * @param topics - All topics for this subject
 * @param questionTypes - All question types
 * @param prompts - All prompts
 * @param settings - Coverage settings
 * @returns PaperCoverage metrics
 */
export function computePaperCoverage(
  paper: Paper,
  units: Unit[],
  topics: Topic[],
  questionTypes: QuestionType[],
  prompts: Prompt[],
  settings: CoverageSettings
): PaperCoverage {
  // Filter question types for this paper
  const paperQuestionTypes = questionTypes.filter(qt => !qt.paperId || qt.paperId === paper.id);
  
  // Filter topics and units that have question types for this paper
  const relevantTopics = topics.filter(t =>
    paperQuestionTypes.some(qt => qt.topicId === t.id)
  );
  
  const relevantUnits = units.filter(u =>
    relevantTopics.some(t => t.unitId === u.id)
  );

  // Compute coverage for each relevant unit
  const unitCoverages = relevantUnits.map(unit => {
    const unitTopics = relevantTopics.filter(t => t.unitId === unit.id);
    return computeUnitCoverage(unit, unitTopics, paperQuestionTypes, prompts, settings);
  });

  // Calculate aggregates
  const unitsCoveredCount = unitCoverages.filter(uc => uc.status === 'ok').length;
  const averageCoveragePercentage = unitCoverages.length > 0
    ? unitCoverages.reduce((sum, uc) => sum + uc.averageCoveragePercentage, 0) / unitCoverages.length
    : 0;

  const totalPrompts = unitCoverages.reduce((sum, uc) => sum + uc.promptsCount, 0);

  // Determine status
  let status: 'ok' | 'warning' | 'missing' = 'ok';
  if (averageCoveragePercentage < 50) status = 'missing';
  else if (averageCoveragePercentage < 80) status = 'warning';

  return {
    paperId: paper.id,
    paperNumber: paper.paperNumber,
    paperName: paper.name,
    unitsCount: relevantUnits.length,
    unitsCoveredCount,
    averageCoveragePercentage,
    promptsCount: totalPrompts,
    status,
    units: unitCoverages,
  };
}

/**
 * List all missing question types across a subject
 * 
 * @param papers - All papers
 * @param units - All units
 * @param topics - All topics
 * @param questionTypes - All question types
 * @param prompts - All prompts
 * @param settings - Coverage settings
 * @returns Array of missing question types
 */
export function listMissingQuestionTypes(
  papers: Paper[],
  units: Unit[],
  topics: Topic[],
  questionTypes: QuestionType[],
  prompts: Prompt[],
  settings: CoverageSettings
): MissingQuestionType[] {
  const missing: MissingQuestionType[] = [];

  papers.forEach(paper => {
    const paperCoverage = computePaperCoverage(paper, units, topics, questionTypes, prompts, settings);
    paperCoverage.units.forEach(unitCov => {
      unitCov.topics.forEach(topicCov => {
        missing.push(...topicCov.missingTypes);
      });
    });
  });

  return missing;
}

/**
 * Compute overall subject coverage summary
 * 
 * @param subjectId - Subject ID
 * @param subjectName - Subject name
 * @param papers - All papers
 * @param units - All units
 * @param topics - All topics
 * @param questionTypes - All question types
 * @param prompts - All prompts
 * @param settings - Coverage settings
 * @returns SubjectCoverageSummary
 */
export function computeSubjectCoverageSummary(
  subjectId: string,
  subjectName: string,
  papers: Paper[],
  units: Unit[],
  topics: Topic[],
  questionTypes: QuestionType[],
  prompts: Prompt[],
  settings: CoverageSettings
): SubjectCoverageSummary {
  // Compute coverage for each paper
  const paperCoverages = papers.map(paper =>
    computePaperCoverage(paper, units, topics, questionTypes, prompts, settings)
  );

  // Count missing question types
  const missingTypes = listMissingQuestionTypes(papers, units, topics, questionTypes, prompts, settings);

  // Calculate totals
  const totalPrompts = prompts.filter(p => p.subjectId === subjectId).length;

  return {
    subjectId,
    subjectName,
    papersCount: papers.length,
    unitsCount: units.length,
    topicsCount: topics.length,
    questionTypesCount: questionTypes.length,
    totalPromptsCount: totalPrompts,
    missingQuestionTypesCount: missingTypes.length,
    papers: paperCoverages,
    settings,
  };
}

/**
 * Check if taxonomy is missing (no question types defined)
 */
export function isTaxonomyMissing(questionTypes: QuestionType[]): boolean {
  return questionTypes.length === 0;
}
