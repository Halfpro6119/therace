/**
 * Psychology Hub – AQA A-level Psychology 7182
 * Option IDs, topics, concepts, key studies, quick check, study evaluator, issues & debates, question lab.
 */

// ============================================================================
// OPTION IDS (Paper 3: Option 1, Option 2, Option 3)
// ============================================================================

export type Option1Id = 'relationships' | 'gender' | 'cognition-development';
export type Option2Id = 'schizophrenia' | 'eating-behaviour' | 'stress';
export type Option3Id = 'aggression' | 'forensic' | 'addiction';

export interface PsychologyOptionSelection {
  option1: Option1Id;
  option2: Option2Id;
  option3: Option3Id;
}

/** Topic IDs: compulsory (Paper 1, Paper 2, Paper 3 Issues) + optional (Paper 3 options) */
export type PsychologyTopicId =
  | 'social-influence'
  | 'memory'
  | 'attachment'
  | 'clinical'
  | 'approaches'
  | 'biopsychology'
  | 'research-methods'
  | 'issues-debates'
  | Option1Id
  | Option2Id
  | Option3Id;

export interface PsychologyTopicMeta {
  id: PsychologyTopicId;
  title: string;
  paper: 1 | 2 | 3;
  isCompulsory: boolean;
}

// ============================================================================
// CONCEPT LAB
// ============================================================================

export interface PsychologyConceptCard {
  id: string;
  topicId: PsychologyTopicId;
  title: string;
  coreIdea: string;
  keyStudies?: string;
  misconception?: string;
  evaluationHook?: string;
}

// ============================================================================
// KEY STUDIES & TERMS (FLASHCARDS)
// ============================================================================

export interface PsychologyKeyStudy {
  id: string;
  topicId: PsychologyTopicId;
  researcher: string;
  aim: string;
  procedure: string;
  findings: string;
  conclusion?: string;
}

export interface PsychologyKeyTerm {
  id: string;
  topicId: PsychologyTopicId;
  term: string;
  definition: string;
  inContext?: string;
}

export type PsychologyConfidenceLevel = 'again' | 'hard' | 'good' | 'easy';

// ============================================================================
// QUICK CHECK
// ============================================================================

export type PsychologyQuickCheckType = 'multipleChoice' | 'trueFalse' | 'shortAnswer' | 'whichTwo';

export interface PsychologyQuickCheckItem {
  id: string;
  topicId: PsychologyTopicId;
  type: PsychologyQuickCheckType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  feedback?: { correct: string; incorrect: string };
}

// ============================================================================
// STUDY EVALUATOR (AO3)
// ============================================================================

export interface PsychologyStudyEvaluatorPrompt {
  id: string;
  topicId: PsychologyTopicId;
  prompt: string;
  modelAnswer: string;
}

// ============================================================================
// ISSUES AND DEBATES
// ============================================================================

export type IssuesDebatesId = 'gender-culture' | 'freewill-determinism' | 'nature-nurture' | 'holism-reductionism' | 'idiographic-nomothetic' | 'social-sensitivity';

export interface PsychologyIssuesDebatesPrompt {
  id: string;
  issueId: IssuesDebatesId;
  prompt: string;
  modelAnswer: string;
  applyToTopicIds: PsychologyTopicId[];
}

// ============================================================================
// RESEARCH METHODS
// ============================================================================

export type ResearchMethodsTaskType = 'design' | 'method' | 'data' | 'inferential';

export interface PsychologyResearchMethodsTask {
  id: string;
  type: ResearchMethodsTaskType;
  scenario: string;
  question: string;
  expectedAnswer: string;
  topicId?: PsychologyTopicId;
}

// ============================================================================
// QUESTION LAB
// ============================================================================

export type PsychologyQuestionType = 'short' | 'outline' | 'discuss' | 'extended';

export interface PsychologyQuestionLabItem {
  id: string;
  topicId: PsychologyTopicId;
  questionType: PsychologyQuestionType;
  question: string;
  markSchemeSummary: string;
  modelAnswer?: string;
}

// ============================================================================
// PROGRESS (storage)
// ============================================================================

export interface PsychologyTopicProgress {
  topicId: PsychologyTopicId;
  quickCheckPassed: boolean;
  quickCheckScore?: number;
  studyEvaluatorCompleted: boolean;
  questionLabCompleted: boolean;
}

export interface PsychologyFlashcardMastery {
  itemId: string;
  topicId: PsychologyTopicId;
  itemType: 'study' | 'term';
  confidence: PsychologyConfidenceLevel;
  lastSeen: number;
}
