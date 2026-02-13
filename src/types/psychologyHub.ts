/**
 * Psychology Hub – AQA GCSE Psychology 8182
 * Paper 1: Memory, Perception, Development, Research methods
 * Paper 2: Social influence, Language thought & communication, Brain & neuropsychology, Psychological problems
 */

// ============================================================================
// GCSE 8182 – All topics compulsory (no options)
// ============================================================================

export interface PsychologyOptionSelection {
  /** GCSE has no options; kept for storage compatibility */
  confirmed?: boolean;
}

/** Topic IDs: GCSE 8182 Paper 1 & Paper 2 */
export type PsychologyTopicId =
  | 'memory'
  | 'perception'
  | 'development'
  | 'research-methods'
  | 'social-influence'
  | 'language-thought-communication'
  | 'brain-neuropsychology'
  | 'psychological-problems';

export interface PsychologyTopicMeta {
  id: PsychologyTopicId;
  title: string;
  paper: 1 | 2;
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
// ISSUES AND DEBATES (GCSE: simplified)
// ============================================================================

export type IssuesDebatesId = 'nature-nurture' | 'ethics' | 'applications';

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
