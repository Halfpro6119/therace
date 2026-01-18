/**
 * Coverage Types - Data structures for tracking content coverage
 * across papers, units, topics, and question types
 */

export interface Paper {
  id: string;
  subjectId: string;
  paperNumber: 1 | 2 | 3;
  name: string;
  calculatorAllowedDefault: boolean;
  createdAt: string;
}

export interface QuestionType {
  id: string;
  subjectId: string;
  paperId?: string;
  unitId?: string;
  topicId?: string;
  typeId: string; // e.g., "p1_geo_circle_semi_circle"
  title: string;
  difficultyMin: number;
  difficultyMax: number;
  marksMin: number;
  marksMax: number;
  calculatorAllowed?: boolean;
  diagramTemplateId?: string;
  tags: string[];
  createdAt: string;
}

export interface CoverageSettings {
  id: string;
  subjectId: string;
  minPromptsPerQuestionType: number;
  minPromptsPerTopic: number;
  minPromptsPerUnit: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * Topic Coverage - Metrics for a single topic
 */
export interface TopicCoverage {
  topicId: string;
  topicName: string;
  unitId: string;
  unitName: string;
  requiredQuestionTypesCount: number;
  populatedQuestionTypesCount: number;
  promptsCount: number;
  coveragePercentage: number;
  status: 'ok' | 'warning' | 'missing';
  missingTypes: MissingQuestionType[];
}

/**
 * Unit Coverage - Aggregated metrics for a unit
 */
export interface UnitCoverage {
  unitId: string;
  unitName: string;
  topicsCount: number;
  topicsCoveredCount: number;
  averageCoveragePercentage: number;
  promptsCount: number;
  status: 'ok' | 'warning' | 'missing';
  topics: TopicCoverage[];
}

/**
 * Paper Coverage - Aggregated metrics for a paper
 */
export interface PaperCoverage {
  paperId: string;
  paperNumber: 1 | 2 | 3;
  paperName: string;
  unitsCount: number;
  unitsCoveredCount: number;
  averageCoveragePercentage: number;
  promptsCount: number;
  status: 'ok' | 'warning' | 'missing';
  units: UnitCoverage[];
}

/**
 * Missing Question Type - Details about a missing or under-populated question type
 */
export interface MissingQuestionType {
  questionTypeId: string;
  typeId: string;
  title: string;
  unitId: string;
  unitName: string;
  topicId: string;
  topicName: string;
  paperId?: string;
  paperNumber?: 1 | 2 | 3;
  currentPromptsCount: number;
  requiredPromptsCount: number;
  deficit: number;
}

/**
 * Subject Coverage Summary - Overall coverage for a subject
 */
export interface SubjectCoverageSummary {
  subjectId: string;
  subjectName: string;
  papersCount: number;
  unitsCount: number;
  topicsCount: number;
  questionTypesCount: number;
  totalPromptsCount: number;
  missingQuestionTypesCount: number;
  papers: PaperCoverage[];
  settings: CoverageSettings;
}

/**
 * Coverage Computation Result - Detailed breakdown with warnings
 */
export interface CoverageComputationResult {
  summary: SubjectCoverageSummary;
  warnings: string[];
  taxonomyMissing: boolean;
}
