/**
 * QUESTION TYPE SYSTEM - Future-proof, extensible question type definitions
 * 
 * This system allows adding new question types without database schema changes.
 * All type-specific data is stored in meta.questionData as JSONB.
 */

// ============================================================================
// BASE TYPES
// ============================================================================

/** Core types + full spec types (see questionTypeSpec.ts). Extensible: add new type here when adding a new GCSE form. */
export type QuestionType =
  | 'short'
  | 'mcq'
  | 'fill'
  | 'match'
  | 'label'
  | 'numeric'
  | 'numericWithTolerance'
  | 'multiNumeric'
  | 'expression'
  | 'tableFill'
  | 'orderSteps'
  | 'graphPlot'
  | 'graphRead'
  | 'inequalityPlot'
  | 'geometryConstruct'
  | 'proofShort'
  | 'dragMatch'
  | 'matrixInput'
  | 'vectorDiagram'
  | 'functionMachine';

/**
 * Type-specific metadata stored in prompt.meta.questionData
 * Each type has its own schema (see also questionTypeSpec.ts for full spec).
 */
export type QuestionData =
  | ShortQuestionData
  | MCQQuestionData
  | FillQuestionData
  | MatchQuestionData
  | LabelQuestionData
  | NumericQuestionData
  | MultiNumericQuestionData;

// ---- Numeric (spec 1 & 2) ----
export interface NumericQuestionData {
  answer?: number;
  tolerance?: number;
  units?: string;
  rounding?: 'none' | 'dp' | 'sf';
  roundingValue?: number;
  numericTolerance?: number; // alias for tolerance
}

// ---- Multi-numeric (spec 3) ----
export interface MultiNumericField {
  label: string;
  answer: number;
  tolerance?: number;
}
export interface MultiNumericQuestionData {
  fields: MultiNumericField[];
}

// ============================================================================
// SHORT ANSWER TYPE
// ============================================================================

export interface ShortQuestionData {
  // Optional: case sensitivity for answer matching
  caseSensitive?: boolean;
  // Optional: trim whitespace before comparison
  trim?: boolean;
  // Optional: numeric tolerance for numeric answers (e.g., 0.01)
  numericTolerance?: number;
}

// ============================================================================
// MULTIPLE CHOICE TYPE
// ============================================================================

export interface MCQChoice {
  key: string; // 'A', 'B', 'C', 'D', etc.
  text: string; // Choice text
}

export interface MCQQuestionData {
  // REQUIRED: Array of choices with keys
  choices: MCQChoice[];
  // Optional: allow multiple correct answers
  multiSelect?: boolean;
  // Optional: randomize choice order
  randomizeOrder?: boolean;
}

// ============================================================================
// FILL IN THE BLANKS TYPE
// ============================================================================

export interface FillQuestionData {
  // Number of blanks in the question
  blanks: number;
  // Optional: accepted answer sets (array of arrays for multiple blanks)
  // Example: [["CO2", "carbon dioxide"], ["gas", "compound"]]
  acceptedSets?: string[][];
  // Optional: case sensitivity
  caseSensitive?: boolean;
  // Optional: trim whitespace
  trim?: boolean;
}

// ============================================================================
// MATCHING TYPE
// ============================================================================

export interface MatchItem {
  id: string; // Unique identifier
  text: string; // Display text
}

export interface MatchQuestionData {
  // REQUIRED: Left column items
  leftItems: MatchItem[];
  // REQUIRED: Right column items
  rightItems: MatchItem[];
  // Optional: allow multiple matches per item
  allowMultiple?: boolean;
  // Optional: randomize right column order
  randomizeRight?: boolean;
}

// ============================================================================
// LABEL/DIAGRAM TYPE
// ============================================================================

export interface LabelTarget {
  id: string; // Target identifier
  x: number; // X coordinate (0-100 for percentage-based)
  y: number; // Y coordinate (0-100 for percentage-based)
  prompt?: string; // Optional: what to label at this position
}

export interface LabelBank {
  id: string; // Label identifier
  text: string; // Label text
}

export interface LabelQuestionData {
  // REQUIRED: Labels to place
  labels: LabelBank[];
  // REQUIRED: Target positions on diagram
  targets: LabelTarget[];
  // Optional: diagram template/custom reference
  diagramId?: string;
  diagramTemplate?: string;
  // Optional: allow drag-and-drop vs dropdown
  dragAndDrop?: boolean;
  // Optional: diagram metadata
  diagramMetadata?: {
    width?: number;
    height?: number;
    imageUrl?: string;
    svgData?: string;
  };
}

// ============================================================================
// VALIDATION & RUNTIME TYPES
// ============================================================================

/**
 * User's answer submission for any question type
 */
export interface QuestionAnswer {
  type: QuestionType;
  value: any; // Type-specific answer value
  // Examples:
  // short: "answer text"
  // mcq: "A" or ["A", "B"]
  // fill: ["answer1", "answer2"]
  // match: "1A,2C,3B,4D"
  // label: {T1: "L1", T2: "L2"}
}

/**
 * Validation result for answer checking
 */
export interface ValidationResult {
  isCorrect: boolean;
  feedback?: string;
  correctAnswer?: string;
  explanation?: string;
}

/**
 * Schema for runtime validation of question data
 */
export interface QuestionTypeSchema {
  type: QuestionType;
  validate: (data: any) => { valid: boolean; errors: string[] };
  getRequiredFields: () => string[];
  getOptionalFields: () => string[];
}

// ============================================================================
// IMPORT/EXPORT TYPES
// ============================================================================

/**
 * Enhanced import row supporting type-specific fields
 */
export interface EnhancedImportRow {
  // Base fields
  subject: string;
  unit: string;
  topic: string;
  type: QuestionType;
  question: string;
  answers: string | string[]; // Can be comma-separated or array

  // Type-specific fields
  // MCQ
  choiceA?: string;
  choiceB?: string;
  choiceC?: string;
  choiceD?: string;
  choiceE?: string;
  choiceF?: string;
  correctChoice?: string;

  // FILL
  blanksCount?: number;
  acceptedAnswers?: string; // JSON or comma-separated

  // MATCH
  matchLeftJson?: string; // JSON array of {id, text}
  matchRightJson?: string; // JSON array of {id, text}
  matchPairs?: string; // "1A,2B,3C" format

  // LABEL
  labelBankJson?: string; // JSON array of {id, text}
  labelTargetsJson?: string; // JSON array of {id, x, y}
  diagramId?: string;

  // Common optional fields
  hint?: string;
  explanation?: string;
  tier?: 'higher' | 'foundation' | null;
  calculatorAllowed?: boolean;
  paperId?: string;

  // Metadata as JSON string
  metaJson?: string;
}

// ============================================================================
// ADMIN UI TYPES
// ============================================================================

/**
 * Form state for question creator
 */
export interface QuestionFormState {
  type: QuestionType;
  question: string;
  answers: string[];
  hint?: string;
  explanation?: string;
  tier?: 'higher' | 'foundation' | null;
  calculatorAllowed?: boolean;

  // Type-specific form data
  mcqChoices?: MCQChoice[];
  mcqMultiSelect?: boolean;

  fillBlanks?: number;
  fillAcceptedSets?: string[][];

  matchLeft?: MatchItem[];
  matchRight?: MatchItem[];

  labelLabels?: LabelBank[];
  labelTargets?: LabelTarget[];
  labelDiagramId?: string;
}

/**
 * Live preview data for admin
 */
export interface QuestionPreview {
  type: QuestionType;
  question: string;
  typeSpecificData: QuestionData;
  answers: string[];
  hint?: string;
  explanation?: string;
}
