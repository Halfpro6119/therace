/**
 * QUESTION TYPE SYSTEM — FULL SPEC
 *
 * Single source of truth for all question types: metadata shapes, validation rules,
 * and UI behaviour. Extensible: add new types here when new GCSE question forms appear.
 *
 * GLOBAL BEHAVIOUR (ALL TYPES):
 * - After Submit: immediate feedback, marks awarded, explanation shown, inputs lock, "Continue" appears.
 * - Accessibility: keyboard + touch, screen reader labels, high-contrast diagrams.
 */

// ============================================================================
// METADATA INTERFACES (per type)
// ============================================================================

/** 1. numeric — Single numerical answer. Exact or tolerance-based. */
export interface NumericMeta {
  answer: number;
  tolerance?: number;
  units?: string;
  rounding?: 'none' | 'dp' | 'sf';
  roundingValue?: number;
}

/** 2. numericWithTolerance — Same as numeric with tolerance required. */
export type NumericWithToleranceMeta = NumericMeta;

/** 3. multiNumeric — Multiple numeric answers (e.g. x=2, y=-3). Partial marks. */
export interface MultiNumericMeta {
  fields: Array<{ label: string; answer: number; tolerance?: number }>;
}

/** 4. expression — Algebraic equivalence. Accepted forms. */
export interface ExpressionMeta {
  acceptedForms: string[];
}

/** 5. fill — Fill-the-gap. Case-insensitive or numeric per blank. */
export interface FillSpecMeta {
  blanks: Array<{ answer: string; tolerance?: number }>;
}

/** 6. tableFill — Grid/table. Cell-by-cell, partial marks. */
export interface TableFillMeta {
  rows: Array<Record<string, number | string>>;
}

/** 7. mcq — Single correct option. options + correct key. */
export interface MCQSpecMeta {
  options: Record<string, string>;
  correct: string;
}

/** 8. match — Match two lists. Order-independent, partial marks. */
export interface MatchSpecMeta {
  pairs: Array<{ left: string; right: string }>;
}

/** 9. dragMatch — Visual match (same data as match + UI hints). */
export type DragMatchMeta = MatchSpecMeta;

/** 10. label — Label diagram hotspots. */
export interface LabelSpecMeta {
  labels: string[];
  targets: string[];
}

/** 11. graphPlot — Plot points or line. */
export interface GraphPlotMeta {
  requiredPoints?: Array<{ x: number; y: number }>;
  /** or line equation for validation */
  equation?: string;
}

/** 12. graphRead — Read values from graph. */
export interface GraphReadMeta {
  question?: string;
  answer: number;
  tolerance?: number;
}

/** 13. inequalityPlot — Interval on number line. */
export interface InequalityPlotMeta {
  interval: string;
}

/** 14. orderSteps — Reorder working steps. */
export interface OrderStepsMeta {
  correctOrder: string[];
}

/** 15. proofShort — Keyword presence / logical sequence. */
export interface ProofShortMeta {
  requiredPhrases: string[];
}

/** 16. geometryConstruct — Extracted values checked numerically. */
export interface GeometryConstructMeta {
  requiredAngles?: number[];
  requiredLines?: string[];
}

/** 17. matrixInput — Matrix entries. */
export interface MatrixInputMeta {
  answer: number[][];
}

/** 18. vectorDiagram — Vector geometry. */
export interface VectorDiagramMeta {
  vectors: Array<{ from: [number, number]; to: [number, number] }>;
}

// ============================================================================
// TYPE DEFINITION (id, display name, description, UI/validation notes)
// ============================================================================

export interface QuestionTypeSpecEntry {
  id: QuestionTypeId;
  displayName: string;
  description: string;
  /** UI: input style, optional unit, calculator, etc. */
  uiNotes: string;
  /** Validation: exact, tolerance, partial marks, etc. */
  validationNotes: string;
}

export type QuestionTypeId =
  | 'numeric'
  | 'numericWithTolerance'
  | 'multiNumeric'
  | 'expression'
  | 'fill'
  | 'tableFill'
  | 'mcq'
  | 'match'
  | 'dragMatch'
  | 'label'
  | 'graphPlot'
  | 'graphRead'
  | 'inequalityPlot'
  | 'orderSteps'
  | 'proofShort'
  | 'geometryConstruct'
  | 'matrixInput'
  | 'vectorDiagram';

/** Full spec for all question types. Extensible: add new entries here. */
export const QUESTION_TYPE_SPEC: Record<QuestionTypeId, QuestionTypeSpecEntry> = {
  numeric: {
    id: 'numeric',
    displayName: 'Numeric',
    description: 'Single numerical answer.',
    uiNotes: 'One numeric input, optional unit label, calculator if calculatorAllowed.',
    validationNotes: 'Exact match OR tolerance-based; trim whitespace, ignore formatting.',
  },
  numericWithTolerance: {
    id: 'numericWithTolerance',
    displayName: 'Numeric (with tolerance)',
    description: 'Numerical answer where rounding/measurement error is acceptable.',
    uiNotes: 'Numeric input; show tolerance note subtly (e.g. ±0.1 accepted).',
    validationNotes: '|userAnswer - correct| ≤ tolerance.',
  },
  multiNumeric: {
    id: 'multiNumeric',
    displayName: 'Multi-numeric',
    description: 'Multiple numeric answers (e.g. simultaneous equations, coordinates).',
    uiNotes: 'Multiple labeled input boxes (e.g. x = [ ], y = [ ]).',
    validationNotes: 'Each field validated independently; partial marks allowed.',
  },
  expression: {
    id: 'expression',
    displayName: 'Expression',
    description: 'Algebraic expressions (simplification, factorisation).',
    uiNotes: 'Text input styled for maths; optional maths keyboard.',
    validationNotes: 'Algebraic equivalence; order-independent terms. Requires expression parser/CAS-lite.',
  },
  fill: {
    id: 'fill',
    displayName: 'Fill in the gap',
    description: 'Fill-the-gap questions.',
    uiNotes: 'Sentence with inline blanks. Case-insensitive or numeric per blank.',
    validationNotes: 'Case-insensitive string or numeric match per blank.',
  },
  tableFill: {
    id: 'tableFill',
    displayName: 'Table fill',
    description: 'Complete tables (function tables, frequency tables).',
    uiNotes: 'Grid/table with editable cells; headers locked.',
    validationNotes: 'Cell-by-cell checking; partial marks.',
  },
  mcq: {
    id: 'mcq',
    displayName: 'Multiple choice',
    description: 'Single correct option.',
    uiNotes: 'List of options (A–D); click to select.',
    validationNotes: 'Selected key matches correct key.',
  },
  match: {
    id: 'match',
    displayName: 'Match',
    description: 'Match items from two lists.',
    uiNotes: 'Two columns; dropdown or drag-connect.',
    validationNotes: 'Order-independent mapping; partial marks.',
  },
  dragMatch: {
    id: 'dragMatch',
    displayName: 'Drag match',
    description: 'Visual version of match (more engaging).',
    uiNotes: 'Draggable cards snapped into targets.',
    validationNotes: 'Snap correctness; partial marks.',
  },
  label: {
    id: 'label',
    displayName: 'Label',
    description: 'Label parts of a diagram.',
    uiNotes: 'Diagram canvas; drag labels onto hotspots.',
    validationNotes: 'Label → hotspot mapping; partial marks.',
  },
  graphPlot: {
    id: 'graphPlot',
    displayName: 'Graph plot',
    description: 'Student plots points or draws a line/curve.',
    uiNotes: 'Interactive coordinate grid; click to add points; snap-to-grid option.',
    validationNotes: 'Check plotted points OR line equation.',
  },
  graphRead: {
    id: 'graphRead',
    displayName: 'Graph read',
    description: 'Read values from a graph.',
    uiNotes: 'Static graph diagram; input boxes.',
    validationNotes: 'Numeric/tolerance-based.',
  },
  inequalityPlot: {
    id: 'inequalityPlot',
    displayName: 'Inequality plot',
    description: 'Plot inequalities on a number line.',
    uiNotes: 'Number line; click + drag interval; open/closed endpoints.',
    validationNotes: 'Interval comparison.',
  },
  orderSteps: {
    id: 'orderSteps',
    displayName: 'Order steps',
    description: 'Reorder working steps logically.',
    uiNotes: 'Shuffled step cards; drag to reorder.',
    validationNotes: 'Exact order or acceptable variants.',
  },
  proofShort: {
    id: 'proofShort',
    displayName: 'Proof (short)',
    description: 'Structured mathematical proof.',
    uiNotes: 'Sentence stems + blanks; limited free text.',
    validationNotes: 'Keyword presence; logical sequence.',
  },
  geometryConstruct: {
    id: 'geometryConstruct',
    displayName: 'Geometry construct',
    description: 'Construct or mark geometry visually.',
    uiNotes: 'Drawing canvas; angle markers; measurement tools.',
    validationNotes: 'Extracted values checked numerically.',
  },
  matrixInput: {
    id: 'matrixInput',
    displayName: 'Matrix input',
    description: 'Matrix arithmetic.',
    uiNotes: 'Grid-style matrix input.',
    validationNotes: 'Cell-by-cell checking.',
  },
  vectorDiagram: {
    id: 'vectorDiagram',
    displayName: 'Vector diagram',
    description: 'Vector geometry.',
    uiNotes: 'Coordinate grid; drag arrows.',
    validationNotes: 'Vector magnitude/direction.',
  },
};

/** All type ids in display order. */
export const QUESTION_TYPE_IDS: QuestionTypeId[] = [
  'numeric',
  'numericWithTolerance',
  'multiNumeric',
  'expression',
  'fill',
  'tableFill',
  'mcq',
  'match',
  'dragMatch',
  'label',
  'graphPlot',
  'graphRead',
  'inequalityPlot',
  'orderSteps',
  'proofShort',
  'geometryConstruct',
  'matrixInput',
  'vectorDiagram',
];

/**
 * Question types the app is required to support (existing + required additions).
 * Use this list for validation, imports, and feature flags.
 */
export const SUPPORTED_QUESTION_TYPES: QuestionTypeId[] = [
  'numeric',
  'numericWithTolerance',
  'multiNumeric',
  'expression',
  'fill',
  'tableFill',
  'match',
  'dragMatch',
  'label',
  'orderSteps',
  'graphPlot',
  'graphRead',
  'inequalityPlot',
  'proofShort',
  'geometryConstruct',
];

export function isSupportedQuestionType(id: string): id is QuestionTypeId {
  return (SUPPORTED_QUESTION_TYPES as string[]).includes(id);
}

/** Types that use a single numeric input (for shared UI). */
export const NUMERIC_LIKE_TYPES: QuestionTypeId[] = ['numeric', 'numericWithTolerance'];

/** Types that support partial marks. */
export const PARTIAL_MARKS_TYPES: QuestionTypeId[] = [
  'multiNumeric',
  'fill',
  'tableFill',
  'match',
  'dragMatch',
  'label',
];
