/**
 * History Hub – AQA GCSE History 8145
 * Option IDs, timeline, key terms, concept cards, quick check, source/interpretation, question lab, historic environment.
 */

// ============================================================================
// OPTION IDS (Paper 1 Section A, Paper 1 Section B, Paper 2 Section A, Paper 2 Section B)
// ============================================================================

export type PeriodStudyId = 'AA' | 'AB' | 'AC' | 'AD';
export type WiderWorldDepthId = 'BA' | 'BB' | 'BC' | 'BD' | 'BE';
export type ThematicStudyId = 'AA' | 'BB' | 'AC'; // AA Health, BB Power, AC Migration (Paper 2)
export type BritishDepthId = 'BA' | 'BB' | 'BC' | 'BD';

export interface HistoryOptionSelection {
  periodStudy: PeriodStudyId;
  widerWorldDepth: WiderWorldDepthId;
  thematic: ThematicStudyId;
  britishDepth: BritishDepthId;
}

export type HistoryOptionId = PeriodStudyId | WiderWorldDepthId | ThematicStudyId | BritishDepthId;

/** Composite key for content: section + '_' + AQA id (e.g. period_AB, thematic_AA) so the same id can refer to different options. */
export type HistoryOptionKey = string;

export interface HistoryPart {
  id: string;
  optionKey: string;
  title: string;
  order: number;
}

export interface HistoryOptionMeta {
  optionKey: HistoryOptionKey;
  id: string; // AQA-style id (AA, AB, ...) for selection
  title: string;
  paper: 1 | 2;
  section: 'period' | 'widerWorldDepth' | 'thematic' | 'britishDepth';
  parts: HistoryPart[];
}

export function getHistoryOptionKey(
  section: HistoryOptionMeta['section'],
  id: string
): HistoryOptionKey {
  return `${section}_${id}`;
}

// ============================================================================
// TIMELINE
// ============================================================================

export interface TimelineEvent {
  id: string;
  optionKey: string;
  partId: string;
  date: string;
  title: string;
  description: string;
  order: number;
}

// ============================================================================
// KEY TERMS / FLASHCARDS
// ============================================================================

export interface HistoryKeyTerm {
  id: string;
  optionKey: string;
  partId: string;
  term: string;
  definition: string;
  dateOrContext?: string;
  inContext?: string;
}

export type HistoryConfidenceLevel = 'again' | 'hard' | 'good' | 'easy';

// ============================================================================
// CONCEPT CARDS (second-order)
// ============================================================================

export type HistoryConceptType = 'cause' | 'consequence' | 'change' | 'continuity' | 'significance' | 'similarity' | 'difference';

export interface HistoryConceptCard {
  id: string;
  optionKey: string;
  partId: string;
  prompt: string;
  conceptType: HistoryConceptType;
  modelAnswer: string;
}

// ============================================================================
// QUICK CHECK
// ============================================================================

export type HistoryQuickCheckType = 'multipleChoice' | 'trueFalse' | 'shortAnswer' | 'dragOrder' | 'whichTwo';

export interface HistoryQuickCheckItem {
  id: string;
  optionKey: string;
  partId: string;
  type: HistoryQuickCheckType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  feedback?: { correct: string; incorrect: string };
}

// ============================================================================
// SOURCE LAB (AO3)
// ============================================================================

export interface HistorySource {
  id: string;
  type: 'written' | 'visual';
  content: string;
  provenance?: string;
}

export interface HistorySourceSet {
  id: string;
  optionKey: string;
  partId: string;
  sources: HistorySource[];
  question: string;
  markSchemeSummary: string;
}

// ============================================================================
// INTERPRETATION LAB (AO4)
// ============================================================================

export interface HistoryInterpretation {
  id: string;
  text: string;
  ascription: string;
}

export interface HistoryInterpretationSet {
  id: string;
  optionKey: string;
  partId: string;
  interpretations: HistoryInterpretation[];
  questionHowDiffer?: string;
  questionWhyDiffer?: string;
  questionHowConvincing?: string;
  questionHowFarAgree?: string;
  markSchemeSummary: string;
}

// ============================================================================
// QUESTION LAB (describe, explain, account, essay)
// ============================================================================

export type HistoryQuestionType = 'describe' | 'explain' | 'account' | 'essay' | 'factorEssay';

export interface HistoryQuestionLabItem {
  id: string;
  optionKey: string;
  partId: string;
  questionType: HistoryQuestionType;
  question: string;
  /** For factor essays: the factor given in the question (e.g. "War", "Science and technology") */
  questionFactor?: string;
  markSchemeSummary: string;
  modelAnswer?: string;
}

// ============================================================================
// FACTOR ESSAY PLANNING TRIANGLE
// ============================================================================

export interface FactorEssayCorner {
  factorLabel: string;
  annotation: string;
}

export interface FactorEssayPlan {
  questionFactorId?: string;
  centreLabel: string;
  corners: [FactorEssayCorner, FactorEssayCorner, FactorEssayCorner];
}

// ============================================================================
// HISTORIC ENVIRONMENT (British depth)
// ============================================================================

export interface HistoricEnvironmentSite {
  id: string;
  optionKey: string;
  title: string;
  description: string;
  location?: string;
  function?: string;
  structure?: string;
  people?: string;
  design?: string;
  linksToParts: string[];
  sampleEssayPrompt?: string;
}

// ============================================================================
// PROGRESS (storage)
// ============================================================================

export interface HistoryPartProgress {
  optionKey: string;
  partId: string;
  timelineViewed: boolean;
  quickCheckPassed: boolean;
  quickCheckScore?: number;
  sourceLabCompleted: boolean;
  interpretationLabCompleted: boolean;
  questionLabCompleted: boolean;
}

export interface HistoryFlashcardMastery {
  termId: string;
  optionKey: string;
  partId: string;
  confidence: HistoryConfidenceLevel;
  lastSeen: number;
}

export interface HistoryFactorEssayDraft {
  questionId: string;
  optionKey: string;
  partId: string;
  plan: FactorEssayPlan;
  essayDraft: string;
  updatedAt: number;
}
