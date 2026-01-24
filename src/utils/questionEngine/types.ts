/**
 * Canonical type-driven internal question model.
 *
 * IMPORTANT:
 * - This is the internal model used for rendering + grading.
 * - We normalize raw Prompt rows into this shape.
 * - It must be safe against malformed data (never crash).
 */

export type QuestionType = 'short' | 'mcq' | 'fill' | 'match' | 'label'

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
