/**
 * CENTRALIZED SUBMIT ANSWER PIPELINE
 *
 * This is the single source of truth for all answer submission logic.
 * All question types (short, mcq, fill, match, label) use this pipeline.
 *
 * Flow:
 * 1. Validate minimal response present
 * 2. Grade deterministically using question engine
 * 3. Update mastery in local storage (when correct)
 * 4. Return result object for caller to handle navigation
 *
 * Persistence: Per-question answers are not persisted. Full quiz attempts
 * are saved to localStorage in QuizPlayerPage.endQuiz() when the quiz completes.
 */

const DEBUG = typeof import.meta !== 'undefined' && import.meta.env?.DEV;

import { Prompt, UserAnswer } from '../types'
import { gradeFromRenderer } from '../components/QuestionRenderer'
import { storage } from '../utils/storage'

export interface SubmitAnswerResult {
  isCorrect: boolean
  marksAwarded: number
  maxMarks: number
  correctAnswerDisplay: string
  feedbackSummary: string
  explanation: string
  normalizedUserAnswer: string
  error?: string
}

/**
 * Main submit pipeline - called by all question types
 * 
 * @param prompt - The question being answered
 * @param userAnswer - The user's answer (UserAnswer: string for short/mcq, string[] for fill, Record for match/label)
 * @param quizId - The quiz ID for persistence
 * @param quizStartTime - When the quiz started (for attempt tracking)
 * @returns Result object with grading info and persistence status
 */
export async function submitAnswer(
  prompt: Prompt,
  userAnswer: UserAnswer,
  quizId: string,
  quizStartTime: number
): Promise<SubmitAnswerResult> {
  try {
    // ========================================================================
    // STEP 1: VALIDATE MINIMAL RESPONSE PRESENT
    // ========================================================================
    if (!validateMinimalResponse(userAnswer, prompt.type)) {
      if (DEBUG) console.warn('[submitAnswer] Validation failed: empty response');
      return {
        isCorrect: false,
        marksAwarded: 0,
        maxMarks: prompt.marks || 1,
        correctAnswerDisplay: '',
        feedbackSummary: 'Please provide an answer before submitting',
        explanation: '',
        normalizedUserAnswer: '',
        error: 'EMPTY_RESPONSE',
      }
    }

    // ========================================================================
    // STEP 2: GRADE DETERMINISTICALLY
    // ========================================================================
    const gradeResult = gradeFromRenderer(prompt, userAnswer)

    // ========================================================================
    // STEP 3: NORMALIZE USER ANSWER FOR DISPLAY
    // ========================================================================
    const normalizedUserAnswer = normalizeAnswerForDisplay(userAnswer, prompt.type)

    // ========================================================================
    // STEP 4: UPDATE MASTERY IN LOCAL STORAGE (when correct)
    // ========================================================================
    if (gradeResult.isCorrect) {
      try {
        const currentMastery = storage.getMasteryByPromptId(prompt.id) || 0
        const newMastery = Math.min(currentMastery + 1, 5) // Cap at 5
        storage.setMasteryByPromptId(prompt.id, newMastery)
      } catch (error) {
        if (DEBUG) console.error('[submitAnswer] Error updating mastery:', error);
      }
    }

    // ========================================================================
    // STEP 5: RETURN RESULT FOR CALLER
    // ========================================================================
    const result: SubmitAnswerResult = {
      isCorrect: gradeResult.isCorrect,
      marksAwarded: gradeResult.marksAwarded,
      maxMarks: gradeResult.maxMarks,
      correctAnswerDisplay: gradeResult.feedback.correctAnswer || '',
      feedbackSummary: gradeResult.feedback.summary || '',
      explanation: prompt.explanation || '',
      normalizedUserAnswer,
    }
    return result
  } catch (error) {
    if (DEBUG) console.error('[submitAnswer] Unexpected error:', error);
    return {
      isCorrect: false,
      marksAwarded: 0,
      maxMarks: prompt.marks || 1,
      correctAnswerDisplay: '',
      feedbackSummary: 'An error occurred while checking your answer',
      explanation: '',
      normalizedUserAnswer: '',
      error: 'UNEXPECTED_ERROR',
    }
  }
}

/**
 * Validate that user provided a minimal response.
 * Exported for use in UI (e.g. disabling Submit when answer is empty).
 */
export function hasMinimalResponse(value: unknown, type: string): boolean {
  return validateMinimalResponse(value, type);
}

function validateMinimalResponse(value: unknown, type: string): boolean {
  switch (type) {
    case 'short':
      return typeof value === 'string' && value.trim().length > 0

    case 'mcq':
      return typeof value === 'string' && value.trim().length > 0

    case 'fill':
      if (!Array.isArray(value)) return false
      return value.some((v: unknown) => typeof v === 'string' && (v as string).trim().length > 0)

    case 'match':
      if (!value || typeof value !== 'object') return false
      return Object.values(value).some((v: unknown) => typeof v === 'string' && (v as string).trim().length > 0)

    case 'label':
      if (!value || typeof value !== 'object') return false
      return Object.values(value).some((v: unknown) => typeof v === 'string' && (v as string).trim().length > 0)

    default:
      return false
  }
}

/**
 * Normalize answer for display/storage
 */
function normalizeAnswerForDisplay(value: unknown, type: string): string {
  switch (type) {
    case 'short':
      return typeof value === 'string' ? value.trim() : ''

    case 'mcq':
      return typeof value === 'string' ? value.trim() : ''

    case 'fill':
      if (Array.isArray(value)) {
        return value.map((v: unknown) => (typeof v === 'string' ? v.trim() : '')).join(' | ')
      }
      return ''

    case 'match':
      if (value && typeof value === 'object') {
        return Object.entries(value)
          .map(([k, v]) => `${k}→${typeof v === 'string' ? (v as string).trim() : ''}`)
          .join('; ')
      }
      return ''

    case 'label':
      if (value && typeof value === 'object') {
        return Object.entries(value)
          .map(([k, v]) => `${k}:${typeof v === 'string' ? (v as string).trim() : ''}`)
          .join('; ')
      }
      return ''

    default:
      return ''
  }
}
