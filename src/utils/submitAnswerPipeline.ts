/**
 * CENTRALIZED SUBMIT ANSWER PIPELINE
 * 
 * This is the single source of truth for all answer submission logic.
 * All question types (short, mcq, fill, match, label) use this pipeline.
 * 
 * Flow:
 * 1. Validate minimal response present
 * 2. Grade deterministically using question engine
 * 3. Update UI state (feedback, marks, explanation)
 * 4. Persist attempt to Supabase with error handling
 * 5. Update mastery/streak in state + DB
 * 6. Return result object for caller to handle navigation
 */

import { Prompt } from '../types'
import { gradeFromRenderer } from '../components/QuestionRenderer'
import { supabase } from '../db/client'
import { storage, calculateMasteryLevel } from '../utils/storage'
import { Attempt } from '../types'

export interface SubmitAnswerResult {
  isCorrect: boolean
  marksAwarded: number
  maxMarks: number
  correctAnswerDisplay: string
  feedbackSummary: string
  explanation: string
  normalizedUserAnswer: string
  attemptId?: string
  error?: string
}

/**
 * Main submit pipeline - called by all question types
 * 
 * @param prompt - The question being answered
 * @param userAnswer - The user's answer (string, array, or object depending on type)
 * @param quizId - The quiz ID for persistence
 * @param quizStartTime - When the quiz started (for attempt tracking)
 * @returns Result object with grading info and persistence status
 */
export async function submitAnswer(
  prompt: Prompt,
  userAnswer: any,
  quizId: string,
  quizStartTime: number
): Promise<SubmitAnswerResult> {
  console.log('[submitAnswer] Starting submission pipeline', {
    promptId: prompt.id,
    promptType: prompt.type,
    userAnswer,
  })

  try {
    // ========================================================================
    // STEP 1: VALIDATE MINIMAL RESPONSE PRESENT
    // ========================================================================
    if (!validateMinimalResponse(userAnswer, prompt.type)) {
      console.warn('[submitAnswer] Validation failed: empty response')
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
    console.log('[submitAnswer] Grading answer...')
    const gradeResult = gradeFromRenderer(prompt, userAnswer)
    console.log('[submitAnswer] Grade result:', gradeResult)

    // ========================================================================
    // STEP 3: NORMALIZE USER ANSWER FOR DISPLAY
    // ========================================================================
    const normalizedUserAnswer = normalizeAnswerForDisplay(userAnswer, prompt.type)

    // ========================================================================
    // STEP 4: PERSIST ATTEMPT TO SUPABASE
    // ========================================================================
    let attemptId: string | undefined
    try {
      console.log('[submitAnswer] Persisting attempt to Supabase...')
      const attempt: Attempt = {
        id: `${quizId}-${quizStartTime}-${prompt.id}`,
        quizId,
        promptId: prompt.id,
        userAnswer: normalizedUserAnswer,
        isCorrect: gradeResult.isCorrect,
        marksAwarded: gradeResult.marksAwarded,
        maxMarks: gradeResult.maxMarks,
        timestamp: Date.now(),
        attemptNumber: 1, // TODO: increment if retrying
      }

      // Save to Supabase (non-blocking - don't fail if this fails)
      const { error: supabaseError } = await supabase
        .from('attempts')
        .insert([attempt])
        .select()

      if (supabaseError) {
        console.error('[submitAnswer] Supabase error (non-blocking):', supabaseError)
        // Don't fail the submission - just log the error
      } else {
        attemptId = attempt.id
        console.log('[submitAnswer] Attempt persisted successfully')
      }
    } catch (error) {
      console.error('[submitAnswer] Error persisting attempt:', error)
      // Non-blocking - continue even if persistence fails
    }

    // ========================================================================
    // STEP 5: UPDATE MASTERY/STREAK IN LOCAL STORAGE
    // ========================================================================
    try {
      console.log('[submitAnswer] Updating mastery/streak...')
      if (gradeResult.isCorrect) {
        // Update mastery for this prompt
        const currentMastery = storage.getMasteryByPromptId(prompt.id) || 0
        const newMastery = Math.min(currentMastery + 1, 5) // Cap at 5
        storage.setMasteryByPromptId(prompt.id, newMastery)
        console.log('[submitAnswer] Mastery updated:', { promptId: prompt.id, newMastery })
      }
    } catch (error) {
      console.error('[submitAnswer] Error updating mastery:', error)
    }

    // ========================================================================
    // STEP 6: RETURN RESULT FOR CALLER
    // ========================================================================
    const result: SubmitAnswerResult = {
      isCorrect: gradeResult.isCorrect,
      marksAwarded: gradeResult.marksAwarded,
      maxMarks: gradeResult.maxMarks,
      correctAnswerDisplay: gradeResult.feedback.correctAnswer || '',
      feedbackSummary: gradeResult.feedback.summary || '',
      explanation: prompt.explanation || '',
      normalizedUserAnswer,
      attemptId,
    }

    console.log('[submitAnswer] Submission complete:', result)
    return result
  } catch (error) {
    console.error('[submitAnswer] Unexpected error:', error)
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
 * Validate that user provided a minimal response
 */
function validateMinimalResponse(value: any, type: string): boolean {
  switch (type) {
    case 'short':
      return typeof value === 'string' && value.trim().length > 0

    case 'mcq':
      return typeof value === 'string' && value.trim().length > 0

    case 'fill':
      if (!Array.isArray(value)) return false
      return value.some((v: any) => typeof v === 'string' && v.trim().length > 0)

    case 'match':
      if (!value || typeof value !== 'object') return false
      return Object.values(value).some((v: any) => typeof v === 'string' && v.trim().length > 0)

    case 'label':
      if (!value || typeof value !== 'object') return false
      return Object.values(value).some((v: any) => typeof v === 'string' && v.trim().length > 0)

    default:
      return false
  }
}

/**
 * Normalize answer for display/storage
 */
function normalizeAnswerForDisplay(value: any, type: string): string {
  switch (type) {
    case 'short':
      return typeof value === 'string' ? value.trim() : ''

    case 'mcq':
      return typeof value === 'string' ? value.trim() : ''

    case 'fill':
      if (Array.isArray(value)) {
        return value.map((v: any) => (typeof v === 'string' ? v.trim() : '')).join(' | ')
      }
      return ''

    case 'match':
      if (value && typeof value === 'object') {
        return Object.entries(value)
          .map(([k, v]: [string, any]) => `${k}→${typeof v === 'string' ? v.trim() : ''}`)
          .join('; ')
      }
      return ''

    case 'label':
      if (value && typeof value === 'object') {
        return Object.entries(value)
          .map(([k, v]: [string, any]) => `${k}:${typeof v === 'string' ? v.trim() : ''}`)
          .join('; ')
      }
      return ''

    default:
      return ''
  }
}
