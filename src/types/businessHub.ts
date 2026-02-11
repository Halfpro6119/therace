/**
 * Business Hub – types for AQA GCSE Business 8132
 * Units 3.1–3.6, concepts, glossary, quick checks, case studies, calculations, evaluation.
 */

export type BusinessUnitId = '3.1' | '3.2' | '3.3' | '3.4' | '3.5' | '3.6';
export type BusinessPaper = 1 | 2;

export interface BusinessTopic {
  id: string;
  unitId: BusinessUnitId;
  title: string;
  specRef: string; // e.g. "3.1.1"
}

export interface BusinessUnit {
  id: BusinessUnitId;
  title: string;
  shortTitle: string;
  paper1: boolean;
  paper2: boolean;
  topics: BusinessTopic[];
}

export interface BusinessConcept {
  id: string;
  unitId: BusinessUnitId;
  topicId: string;
  title: string;
  coreIdea: string;
  visualModel?: {
    type: 'diagram' | 'flow' | 'list';
    description: string;
  };
  commonMisconception: string;
  changeScenarios: Array<{ prompt: string; explanation: string }>;
}

export interface BusinessTerm {
  id: string;
  unitId: BusinessUnitId;
  topicId?: string;
  term: string;
  definition: string;
  inContext?: string;
}

export type QuickCheckType = 'multipleChoice' | 'trueFalse' | 'dragOrder' | 'shortAnswer';

export interface BusinessQuickCheck {
  id: string;
  unitId: BusinessUnitId;
  topicId: string;
  type: QuickCheckType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  feedback: { correct: string; incorrect: string; ideaReference: string };
  relatedTermIds?: string[];
}

export interface CaseStudyQuestion {
  id: string;
  question: string;
  marks: number;
  type: 'define' | 'explain' | 'calculate' | 'analyse' | 'evaluate';
  markScheme: Array<{ idea: string; marks: number }>;
  modelAnswer: string;
  acceptableAnswers?: string[];
}

export interface BusinessCaseStudy {
  id: string;
  unitIds: BusinessUnitId[];
  paper: BusinessPaper;
  title: string;
  scenario: string;
  data?: string; // table/chart description or raw text
  questions: CaseStudyQuestion[];
}

export type CalculationType =
  | 'revenueCostProfit'
  | 'unitCost'
  | 'cashFlow'
  | 'averageRateOfReturn'
  | 'breakEvenInterpret'
  | 'grossProfitMargin'
  | 'netProfitMargin';

export interface CalculationTask {
  id: string;
  unitId: BusinessUnitId;
  type: CalculationType;
  scenario: string;
  inputs: Record<string, number>;
  expected: Record<string, number>;
  formulaHint?: string;
  interpretationQuestion: string;
  interpretationAnswer: string;
}

export interface EvaluationPrompt {
  id: string;
  unitId: BusinessUnitId;
  topicId: string;
  question: string;
  modelAnswer: string;
  breakdown: Array<{ type: 'idea' | 'application' | 'evaluation'; text: string }>;
}

/** Progress: per unit/topic for gating */
export interface BusinessTopicProgress {
  unitId: BusinessUnitId;
  topicId: string;
  flashcardMasteryPercent: number;
  quickCheckPassed: boolean;
  caseStudyCompleted: boolean;
  calculationsCompleted: boolean;
  evaluationCompleted: boolean;
  lastUpdated: string;
}

/** Flashcard mastery (confidence / spaced repetition) */
export type BusinessConfidenceLevel = 1 | 2 | 3;

export interface BusinessFlashcardMastery {
  termId: string;
  confidenceLevel: BusinessConfidenceLevel;
  timesViewed: number;
  timesConfident: number;
  lastViewed: string;
  masteryPercent: number;
}
