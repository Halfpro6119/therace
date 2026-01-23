/**
 * QUESTION TYPE REGISTRY
 * 
 * Extensible registry pattern for question types.
 * Allows adding new types without modifying core code.
 * 
 * Each type has:
 * - schema: validation rules
 * - adminForm: UI component for creation
 * - renderer: quiz player component
 * - validator: answer validation logic
 */

import { QuestionType, QuestionData, ValidationResult, QuestionAnswer } from '../../types/questionTypes';
import { Prompt } from '../../types';

// ============================================================================
// REGISTRY INTERFACE
// ============================================================================

export interface QuestionTypeHandler {
  type: QuestionType;
  
  // Validation
  validate: (data: QuestionData) => { valid: boolean; errors: string[] };
  getRequiredFields: () => string[];
  getOptionalFields: () => string[];
  
  // Answer validation
  validateAnswer: (prompt: Prompt, userAnswer: QuestionAnswer) => ValidationResult;
  
  // Normalization (for imports)
  normalize: (data: any) => QuestionData | null;
  
  // Metadata
  displayName: string;
  description: string;
  icon: string;
}

// ============================================================================
// REGISTRY IMPLEMENTATION
// ============================================================================

class QuestionTypeRegistry {
  private handlers: Map<QuestionType, QuestionTypeHandler> = new Map();

  /**
   * Register a new question type handler
   */
  register(handler: QuestionTypeHandler): void {
    if (this.handlers.has(handler.type)) {
      console.warn(`Question type '${handler.type}' already registered, overwriting`);
    }
    this.handlers.set(handler.type, handler);
  }

  /**
   * Get handler for a question type
   */
  getHandler(type: QuestionType): QuestionTypeHandler | null {
    return this.handlers.get(type) || null;
  }

  /**
   * Get all registered types
   */
  getAllTypes(): QuestionType[] {
    return Array.from(this.handlers.keys());
  }

  /**
   * Check if type is registered
   */
  isRegistered(type: QuestionType): boolean {
    return this.handlers.has(type);
  }

  /**
   * Validate question data
   */
  validate(type: QuestionType, data: QuestionData): { valid: boolean; errors: string[] } {
    const handler = this.getHandler(type);
    if (!handler) {
      return { valid: false, errors: [`Unknown question type: ${type}`] };
    }
    return handler.validate(data);
  }

  /**
   * Validate user answer
   */
  validateAnswer(prompt: Prompt, userAnswer: QuestionAnswer): ValidationResult {
    const handler = this.getHandler(prompt.type as QuestionType);
    if (!handler) {
      return {
        isCorrect: false,
        feedback: `Unknown question type: ${prompt.type}`,
      };
    }
    return handler.validateAnswer(prompt, userAnswer);
  }

  /**
   * Normalize imported data
   */
  normalize(type: QuestionType, data: any): QuestionData | null {
    const handler = this.getHandler(type);
    if (!handler) {
      console.warn(`Cannot normalize unknown type: ${type}`);
      return null;
    }
    return handler.normalize(data);
  }
}

// ============================================================================
// SINGLETON INSTANCE
// ============================================================================

export const questionRegistry = new QuestionTypeRegistry();

// ============================================================================
// EXPORT FOR TESTING
// ============================================================================

export { QuestionTypeRegistry };
