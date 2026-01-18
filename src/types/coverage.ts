/**
 * Content Coverage Types
 * Tracks GCSE paper structure and content completeness
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
  paperNumber?: 1 | 2 | 3;
  unitId: string;
  topicId: string;
  typeId: string; // e.g., "p1_geo_circle_semi_circle"
  title: string;
  difficultyMin?: number;
  difficultyMax?: number;
  marksMin?: number;
  marksMax?: number;
  defaultCalculatorAllowed: boolean;
  diagramTemplateId?: string;
  tags?: string[];
  createdAt: string;
}

export interface CoverageThresholds {
  minPromptsPerQuestionType: number;
  minPromptsPerTopic: number;
  minPromptsPerUnit: number;
}

export interface TopicCoverage {
  topicId: string;
  topicName: string;
  unitId: string;
  unitName: string;
  totalPrompts: number;
  requiredQuestionTypes: number;
  populatedQuestionTypes: number;
  coveragePercent: number;
  status: 'ok' | 'warning' | 'missing';
  missingTypes: MissingQuestionType[];
}

export interface UnitCoverage {
  unitId: string;
  unitName: string;
  paperId?: string;
  paperNumber?: 1 | 2 | 3;
  totalPrompts: number;
  topicCount: number;
  coveredTopics: number;
  coveragePercent: number;
  status: 'ok' | 'warning' | 'missing';
  topics: TopicCoverage[];
}

export interface PaperCoverage {
  paperId: string;
  paperNumber: 1 | 2 | 3;
  paperName: string;
  subjectId: string;
  totalPrompts: number;
  unitCount: number;
  coveredUnits: number;
  coveragePercent: number;
  status: 'ok' | 'warning' | 'missing';
  units: UnitCoverage[];
  missingQuestionTypesCount: number;
  missingTopicsCount: number;
}

export interface MissingQuestionType {
  questionTypeId: string;
  typeId: string;
  title: string;
  unitName: string;
  topicName: string;
  currentPrompts: number;
  requiredPrompts: number;
  deficit: number;
}

export interface CoverageStats {
  paper1Coverage: number;
  paper2Coverage: number;
  paper3Coverage: number;
  totalMissingTopics: number;
  totalMissingQuestionTypes: number;
  lastUpdated: string;
}
