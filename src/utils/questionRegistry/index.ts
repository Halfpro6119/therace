/**
 * QUESTION REGISTRY INITIALIZATION
 * 
 * Registers all question type handlers on module load.
 * This ensures all types are available throughout the app.
 */

import { questionRegistry } from './registry';
import {
  shortAnswerHandler,
  mcqHandler,
  fillHandler,
  matchHandler,
  labelHandler,
  allHandlers,
} from './handlers';

// ============================================================================
// REGISTER ALL HANDLERS
// ============================================================================

/**
 * Initialize the question type registry with all handlers
 * Call this once on app startup
 */
export function initializeQuestionRegistry(): void {
  allHandlers.forEach(handler => {
    questionRegistry.register(handler);
  });
  
  console.log(`✓ Question registry initialized with ${allHandlers.length} types`);
}

// ============================================================================
// EXPORTS
// ============================================================================

export { questionRegistry };
export type { QuestionTypeHandler } from './registry';
export {
  shortAnswerHandler,
  mcqHandler,
  fillHandler,
  matchHandler,
  labelHandler,
};
