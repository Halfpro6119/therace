/**
 * Science Lab – types for Biology, Chemistry, Physics (GCSE)
 * Aligned with THE GOLDEN PROMPT — SCIENCE LAB (GCSE)
 */

export type ScienceSubject = 'Biology' | 'Chemistry' | 'Physics';

export type SciencePaper = 1 | 2;

export type ScienceTier = 'Foundation' | 'Higher';

export type QuestionType = 'shortAnswer' | 'calculation' | 'explanation' | 'practical' | 'graph' | 'mixed';

export type LabMode = 'flashcard' | 'quickCheck' | 'methodMark' | 'topicTest' | 'fullGcseTest' | 'question' | 'practical' | 'equation' | 'misconception' | 'fixIt';

export type FlashcardType = 'concept' | 'processChain' | 'equation' | 'practical' | 'graph' | 'misconception';

export type ConfidenceLevel = 1 | 2 | 3; // 1 = not confident, 2 = somewhat confident, 3 = confident

export type QuickCheckType = 'multipleChoice' | 'dragOrder' | 'trueFalse' | 'whichCorrect';

/**
 * Core concept with visual model and misconception warnings
 */
export interface ScienceConcept {
  id: string;
  subject: ScienceSubject;
  topic: string;
  /** Core idea in 1-2 sentences, no waffle */
  coreIdea: string;
  /** Optional custom flashcard question (one per concept for variety) */
  flashcardPrompt?: string;
  /** Visual model: diagram, flow, graph description */
  visualModel: {
    type: 'diagram' | 'flow' | 'graph' | 'particle' | 'energy' | 'foodChain' | 'cell';
    description: string;
    /** Optional diagram metadata reference */
    diagramId?: string;
  };
  /** Common misconception warning */
  commonMisconception: string;
  /** "If this changes, what happens?" scenarios */
  changeScenarios: Array<{
    prompt: string;
    explanation: string;
    /** Optional diagram for scenario */
    visual?: { diagramId?: string; description?: string };
  }>;
}

/**
 * Question metadata standard (from Golden Prompt)
 */
export interface ScienceQuestion {
  id: string;
  subject: ScienceSubject;
  paper: SciencePaper;
  tier: ScienceTier;
  topic: string;
  type: QuestionType;
  /** Question text */
  question: string;
  marks: number;
  calculatorAllowed: boolean;
  /** Required equation(s) */
  equations?: string[];
  /** Diagram metadata reference */
  diagram?: string;
  /** Common mistakes mapped */
  commonMistakes: string[];
  /** Correct answer(s) */
  correctAnswer: string | string[];
  /** Feedback explaining why */
  feedback: {
    correct: string;
    incorrect: string;
    /** Reference to the idea, not just the answer */
    ideaReference: string;
  };
  /** True if suitable for Combined Science (shorter, synoptic style) */
  combinedScience?: boolean;
}

/** A single mark point in a method mark breakdown */
export interface MethodMarkPoint {
  id: string;
  description: string;
  marks: number;
  /** Optional keywords for auto-grading; if absent, derived from description */
  keywords?: string[];
}

/**
 * Method Mark breakdown for 4-6 mark questions
 */
export interface MethodMarkBreakdown {
  questionId: string;
  /** Idea marks (conceptual understanding) */
  ideaMarks: MethodMarkPoint[];
  /** Method marks (working/process) */
  methodMarks: MethodMarkPoint[];
  /** Precision marks (units, significant figures, terminology) */
  precisionMarks: MethodMarkPoint[];
  /** What examiners punish */
  commonPenalties: string[];
}

/**
 * Required practical
 */
export interface SciencePractical {
  id: string;
  subject: ScienceSubject;
  title: string;
  purpose: string;
  /** Independent variable */
  independentVariable: string;
  /** Dependent variable */
  dependentVariable: string;
  /** Controlled variables */
  controlledVariables: string[];
  /** Method steps (ordered) */
  methodSteps: string[];
  /** Risk assessment */
  risks: Array<{
    hazard: string;
    risk: string;
    control: string;
  }>;
  /** Expected data table structure */
  dataTable: {
    headers: string[];
    exampleRow?: string[];
  };
  /** Graph expectations */
  graphExpectations?: {
    xAxis: string;
    yAxis: string;
    type: 'line' | 'bar' | 'scatter';
    expectedTrend?: string;
  };
  /** Evaluation questions */
  evaluationQuestions: Array<{
    question: string;
    expectedPoints: string[];
  }>;
  /** Optional diagram for equipment/setup */
  visual?: { diagramId?: string; description?: string };
  /** Equipment needed – for setup understanding and exam-style questions */
  equipment?: string[];
  /** Key setup steps before the main method – e.g. calibrating, preparing solutions */
  setupSteps?: string[];
}

/** Category of practical quiz question (setup, variables, method, risks, evaluation) */
export type PracticalQuizCategory = 'setup' | 'variables' | 'method' | 'risks' | 'evaluation';

/** Quiz question type for practicals */
export type PracticalQuizQuestionType = 'multipleChoice' | 'dragOrder' | 'multiSelect';

/**
 * Quiz question for testing understanding of a required practical
 * Used in Practical Lab "Test your understanding" section
 */
export interface PracticalQuizQuestion {
  id: string;
  /** Which practical this question belongs to */
  practicalId: string;
  category: PracticalQuizCategory;
  type: PracticalQuizQuestionType;
  question: string;
  options?: string[];
  /** For multipleChoice: correct option string; for dragOrder: correct ordered array; for multiSelect: array of correct options (mark points) */
  correctAnswer: string | string[];
  feedback: {
    correct: string;
    incorrect: string;
  };
  /** Max marks for this question (default 1; use 6 for 6-mark style multiSelect) */
  marks?: number;
}

/**
 * Equation with symbols, units, and rearranging practice
 */
export interface ScienceEquation {
  id: string;
  subject: ScienceSubject;
  topic: string;
  /** Equation in standard form (e.g., "E = mcΔT") */
  equation: string;
  /** Symbols explained */
  symbols: Array<{
    symbol: string;
    name: string;
    unit: string;
    description: string;
  }>;
  /** Common unit mistakes */
  unitTraps: Array<{
    wrongUnit: string;
    correctUnit: string;
    explanation: string;
  }>;
  /** Rearranging practice prompts */
  rearrangingPrompts: Array<{
    prompt: string;
    correctRearrangement: string;
  }>;
}

/**
 * Misconception to identify and correct
 */
export interface ScienceMisconception {
  id: string;
  subject: ScienceSubject;
  topic: string;
  /** The wrong idea */
  misconception: string;
  /** Correct understanding */
  correctUnderstanding: string;
  /** Why it's wrong */
  whyWrong: string;
  /** Example of the misconception in action */
  example?: string;
  /** Optional diagram showing wrong vs right */
  diagramId?: string;
}

/**
 * Mastery tracking per concept, equation, practical, question type
 */
export interface ScienceLabMastery {
  subject: ScienceSubject;
  /** conceptId -> mastery level (0-5) */
  conceptMastery: Record<string, number>;
  /** equationId -> mastery level (0-5) */
  equationMastery: Record<string, number>;
  /** practicalId -> mastery level (0-5) */
  practicalMastery: Record<string, number>;
  /** questionType -> mastery level (0-5) */
  questionTypeMastery: Record<QuestionType, number>;
  /** topic -> mastery level (0-5) */
  topicMastery: Record<string, number>;
  lastUpdated: string;
}

/**
 * Science Lab Flashcard - teaches one idea only
 */
export interface ScienceFlashcard {
  id: string;
  subject: ScienceSubject;
  paper: SciencePaper;
  tier: ScienceTier;
  topic: string;
  type: FlashcardType;
  /** Front of card - the prompt/question */
  front: {
    prompt: string;
    /** Optional visual aid */
    visual?: {
      type: 'diagram' | 'graph' | 'icon' | 'equation';
      description: string;
      diagramId?: string;
    };
  };
  /** Back of card - the explanation */
  back: {
    explanation: string; // 2-4 lines max
    /** Key vocabulary highlighted */
    keyTerms: string[];
    /** Common misconception warning */
    misconceptionWarning?: string;
    /** Optional micro-example */
    example?: string;
    /** Optional diagram on back */
    visual?: { diagramId?: string; description?: string };
  };
  /** Related concept/question IDs for linking */
  relatedConceptId?: string;
  relatedQuestionId?: string;
  relatedPracticalId?: string;
}

/**
 * Quick Check - micro-assessment before quiz unlocks
 */
export interface ScienceQuickCheck {
  id: string;
  subject: ScienceSubject;
  paper: SciencePaper;
  tier: ScienceTier;
  topic: string;
  type: QuickCheckType;
  question: string;
  /** For multiple choice */
  options?: string[];
  correctAnswer: string | string[]; // For drag-order, this is the correct sequence
  /** Feedback explaining why */
  feedback: {
    correct: string;
    incorrect: string;
    ideaReference: string;
  };
  /** Related flashcard IDs */
  relatedFlashcardIds: string[];
}

/**
 * Flashcard mastery tracking
 */
export interface FlashcardMastery {
  flashcardId: string;
  /** Confidence level (1-3) */
  confidenceLevel: ConfidenceLevel;
  /** Times viewed */
  timesViewed: number;
  /** Times rated confidently (3) */
  timesConfident: number;
  /** Last viewed timestamp */
  lastViewed: string;
  /** Next review date (spaced repetition) */
  nextReviewDate: string;
  /** Mastery level (0-100%) */
  masteryPercent: number;
}

/**
 * Topic mastery for gating quiz access
 */
export interface TopicMastery {
  subject: ScienceSubject;
  paper: SciencePaper;
  tier: ScienceTier;
  topic: string;
  /** Flashcard mastery percentage (0-100) */
  flashcardMastery: number;
  /** Quick check passed */
  quickCheckPassed: boolean;
  /** Quiz unlocked */
  quizUnlocked: boolean;
  /** Topic test completed (mini GCSE quiz for this unit) */
  topicTestCompleted?: boolean;
  /** Topic test score as percentage (0-100) from last attempt */
  topicTestScore?: number;
  /** Last topic test attempt timestamp */
  topicTestLastAttempt?: string;
  /** Bigger test (3–6 mark) completed in Learn Mode */
  biggerTestCompleted?: boolean;
  /** Bigger test score as percentage (0-100) from last attempt */
  biggerTestScore?: number;
  /** Last updated */
  lastUpdated: string;
}

/**
 * Topic test item – either a Quick Check (recall) or exam-style Question
 */
export type TopicTestItem =
  | { type: 'quickCheck'; data: ScienceQuickCheck }
  | { type: 'question'; data: ScienceQuestion };

/**
 * Progress tracking for a lab session
 */
export interface ScienceLabSession {
  id: string;
  subject: ScienceSubject;
  paper: SciencePaper;
  tier: ScienceTier;
  mode: LabMode;
  startedAt: string;
  completedAt?: string;
  /** Questions attempted */
  questionsAttempted: string[];
  /** Questions correct */
  questionsCorrect: string[];
  /** Concepts viewed */
  conceptsViewed: string[];
  /** Equations practiced */
  equationsPracticed: string[];
  /** Practicals completed */
  practicalsCompleted: string[];
  /** Misconceptions corrected */
  misconceptionsCorrected: string[];
  /** Flashcards studied */
  flashcardsStudied: string[];
  /** Quick checks completed */
  quickChecksCompleted: string[];
}
