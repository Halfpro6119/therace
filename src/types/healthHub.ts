/**
 * Health Hub – types for Edexcel GCSE Health and Social Care
 * Units 1–4, concepts, glossary, life stages, quick checks, case studies, investigations, care values, question lab.
 */

export type HealthAward = 'single' | 'double';
export type HealthUnitId = '1' | '2' | '3' | '4';

export interface HealthTopic {
  id: string;
  unitId: HealthUnitId;
  title: string;
  specRef: string;
}

export interface HealthUnit {
  id: HealthUnitId;
  title: string;
  shortTitle: string;
  /** Single award = 1–2; Double = 1–4 */
  singleAward: boolean;
  doubleAward: boolean;
  topics: HealthTopic[];
}

export interface HealthConcept {
  id: string;
  unitId: HealthUnitId;
  topicId: string;
  title: string;
  coreIdea: string;
  visualModel?: {
    type: 'list' | 'flow' | 'diagram';
    description: string;
  };
  commonMisconception: string;
  applyScenario?: string;
}

export interface HealthTerm {
  id: string;
  unitId: HealthUnitId;
  topicId?: string;
  term: string;
  definition: string;
  inContext?: string;
  examTip?: boolean;
}

export interface LifeStage {
  id: string;
  name: string;
  ageRange: string;
  order: number;
  physical: string[];
  intellectual: string[];
  emotional: string[];
  social: string[];
}

export type QuickCheckType = 'multipleChoice' | 'trueFalse' | 'shortAnswer';

export interface HealthQuickCheck {
  id: string;
  unitId: HealthUnitId;
  topicId: string;
  type: QuickCheckType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  feedback: { correct: string; incorrect: string };
}

export interface CaseStudyQuestion {
  id: string;
  question: string;
  marks: number;
  type: 'define' | 'describe' | 'explain' | 'analyse' | 'evaluate';
  markScheme: Array<{ idea: string; marks: number }>;
  modelAnswer: string;
}

export interface HealthCaseStudy {
  id: string;
  unitId: HealthUnitId;
  title: string;
  scenario: string;
  clientGroup: string;
  setting: string;
  questions: CaseStudyQuestion[];
}

export interface InvestigationScaffold {
  id: string;
  unitId: HealthUnitId;
  title: string;
  aim: string;
  scenario: string;
  steps: Array<{ prompt: string; hint?: string }>;
  modelConclusion: string;
}

export interface CareValueScenario {
  id: string;
  scenario: string;
  careValues: string[];
  correctAnswer: string;
  modelAnswer: string;
  breach?: string;
}

export type QuestionLabType = 'describe' | 'explain' | 'analyse' | 'evaluate';

export interface QuestionLabItem {
  id: string;
  unitId: HealthUnitId;
  topicId: string;
  type: QuestionLabType;
  question: string;
  modelAnswer: string;
  markScheme: Array<{ idea: string; marks: number }>;
}

export interface HealthTopicProgress {
  unitId: HealthUnitId;
  topicId: string;
  flashcardMasteryPercent: number;
  quickCheckPassed: boolean;
  caseStudyCompleted: boolean;
  investigationCompleted: boolean;
  questionLabCompleted: boolean;
  lastUpdated: string;
}

export type HealthConfidenceLevel = 1 | 2 | 3;

export interface HealthFlashcardMastery {
  termId: string;
  confidenceLevel: HealthConfidenceLevel;
  timesViewed: number;
  timesConfident: number;
  lastViewed: string;
  masteryPercent: number;
}
