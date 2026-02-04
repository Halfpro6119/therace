/**
 * Canonical type-driven internal question model.
 *
 * IMPORTANT:
 * - This is the internal model used for rendering + grading.
 * - We normalize raw Prompt rows into this shape.
 * - It must be safe against malformed data (never crash).
 */

/** Core + Maths-specific. numeric/multiNumeric/expression/etc. may normalize to short in pipeline. */
export type QuestionType =
  | 'short'
  | 'mcq'
  | 'fill'
  | 'match'
  | 'label'
  | 'numeric'
  | 'multiNumeric'
  | 'expression'
  | 'tableFill'
  | 'orderSteps'
  | 'graphPlot'
  | 'graphRead'
  | 'geometryConstruct'
  | 'proofShort'
  | 'dragMatch'
  | 'matrixInput'
  | 'vectorDiagram'
  | 'functionMachine'

export interface NormalizedQuestion {
  id: string
  subject_id: string
  unit_id?: string
  topic_id?: string
  paper_id?: string
  tier?: 'higher' | 'foundation' | null

  type: QuestionType
  question: string

  // Always present, always strings, always trimmed
  answersAccepted: string[]

  // Always >= 1
  marks: number

  explanation: string
  hint: string

  calculatorAllowed: boolean | null
  drawingRecommended: boolean

  meta: {
    questionData: Record<string, any>
    diagram?: Record<string, any>
  }
}

// ----------------
// User responses
// ----------------

export type UserResponse =
  | { type: 'short'; text: string }
  | { type: 'mcq'; selectedKey: string }
  | { type: 'fill'; blanks: string[] }
  | { type: 'match'; mapping: Record<string, string> } // leftId -> rightId
  | { type: 'label'; placements: Record<string, string> } // targetId -> labelId
  | { type: 'numeric'; text: string } // same as short; use numericTolerance in questionData
  | { type: 'multiNumeric'; values: string[] } // one string per field (e.g. "3", "-4")
  | { type: 'expression'; text: string }
  | { type: 'tableFill'; cells: string[][] }
  | { type: 'orderSteps'; order: string[] } // step ids in order
  | { type: 'graphPlot'; value: unknown } // coordinates or equation
  | { type: 'graphRead'; text: string }
  | { type: 'geometryConstruct'; value: unknown }
  | { type: 'proofShort'; text: string }
  | { type: 'dragMatch'; mapping: Record<string, string> }
  | { type: 'matrixInput'; matrix: number[][] } // 2D array of matrix entries
  | { type: 'vectorDiagram'; vectors: Array<{ x: number; y: number }> } // vector coordinates
  | { type: 'functionMachine'; text: string } // function expression or composition result

export interface GradeResult {
  isCorrect: boolean
  marksAwarded: number
  maxMarks: number
  feedback: {
    summary: string
    correctAnswer: string
    mistakeTags: string[]
  }
  normalizedUserAnswer: any
}
