/**
 * QUESTION TYPE HANDLERS
 * 
 * Implementation of validation, rendering, and answer checking for each question type.
 * These handlers are registered with the QuestionTypeRegistry.
 */

import { QuestionTypeHandler } from './registry';
import {
  QuestionType,
  QuestionData,
  ShortQuestionData,
  MCQQuestionData,
  FillQuestionData,
  MatchQuestionData,
  LabelQuestionData,
  ValidationResult,
  QuestionAnswer,
} from '../../types/questionTypes';
import { Prompt } from '../../types';

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Normalize text for comparison (trim and optionally lowercase)
 */
function normalizeText(text: string, caseSensitive: boolean = false, trim: boolean = true): string {
  let normalized = text;
  if (trim) normalized = normalized.trim();
  if (!caseSensitive) normalized = normalized.toLowerCase();
  return normalized;
}

/**
 * Check if answer is numeric and within tolerance
 */
function isNumericMatch(userAnswer: string, correctAnswer: string, tolerance: number = 0): boolean {
  const userNum = parseFloat(userAnswer);
  const correctNum = parseFloat(correctAnswer);
  
  if (isNaN(userNum) || isNaN(correctNum)) return false;
  
  return Math.abs(userNum - correctNum) <= tolerance;
}

// ============================================================================
// SHORT ANSWER HANDLER
// ============================================================================

export const shortAnswerHandler: QuestionTypeHandler = {
  type: 'short',
  displayName: 'Short Answer',
  description: 'Text input with flexible answer matching',
  icon: '📝',

  validate: (data: QuestionData) => {
    // Short answer has minimal requirements - just optional settings
    const errors: string[] = [];
    const shortData = data as ShortQuestionData;
    
    if (shortData.numericTolerance !== undefined && shortData.numericTolerance < 0) {
      errors.push('Numeric tolerance must be non-negative');
    }
    
    return { valid: errors.length === 0, errors };
  },

  getRequiredFields: () => [],
  getOptionalFields: () => ['caseSensitive', 'trim', 'numericTolerance'],

  validateAnswer: (prompt: Prompt, userAnswer: QuestionAnswer): ValidationResult => {
    const shortData = (prompt.meta?.questionData || {}) as ShortQuestionData;
    const userText = String(userAnswer.value || '').trim();
    
    if (!userText) {
      return { isCorrect: false, feedback: 'Please provide an answer' };
    }

    const caseSensitive = shortData.caseSensitive ?? false;
    const trim = shortData.trim ?? true;
    const tolerance = shortData.numericTolerance ?? 0;

    // Check against each accepted answer
    for (const correctAnswer of prompt.answers) {
      // Try numeric comparison if tolerance is set
      if (tolerance > 0 && isNumericMatch(userText, correctAnswer, tolerance)) {
        return {
          isCorrect: true,
          correctAnswer,
          feedback: '✓ Correct!',
        };
      }

      // Try text comparison
      const normalizedUser = normalizeText(userText, caseSensitive, trim);
      const normalizedCorrect = normalizeText(correctAnswer, caseSensitive, trim);

      if (normalizedUser === normalizedCorrect) {
        return {
          isCorrect: true,
          correctAnswer,
          feedback: '✓ Correct!',
        };
      }
    }

    return {
      isCorrect: false,
      feedback: 'Incorrect. Try again.',
      correctAnswer: prompt.answers[0],
    };
  },

  normalize: (data: any): ShortQuestionData | null => {
    // Short answer is very flexible - just extract optional settings
    return {
      caseSensitive: data.caseSensitive ?? false,
      trim: data.trim ?? true,
      numericTolerance: data.numericTolerance,
    };
  },
};

// ============================================================================
// NUMERIC HANDLER (Maths: single number with tolerance; delegates to short)
// ============================================================================

export const numericHandler: QuestionTypeHandler = {
  type: 'numeric',
  displayName: 'Numeric',
  description: 'Single number answer with optional rounding tolerance',
  icon: '🔢',

  validate: (data: QuestionData) => shortAnswerHandler.validate(data),
  getRequiredFields: () => [],
  getOptionalFields: () => ['numericTolerance', 'caseSensitive', 'trim'],

  validateAnswer: (prompt: Prompt, userAnswer: QuestionAnswer): ValidationResult => {
    return shortAnswerHandler.validateAnswer(prompt, userAnswer);
  },

  normalize: (data: any): ShortQuestionData | null => {
    const base = shortAnswerHandler.normalize(data);
    if (!base) return null;
    return {
      ...base,
      numericTolerance: data.numericTolerance ?? 0.01,
    };
  },
};

// ============================================================================
// NUMERIC WITH TOLERANCE (spec type 2 — same as numeric, tolerance expected)
// ============================================================================

export const numericWithToleranceHandler: QuestionTypeHandler = {
  type: 'numericWithTolerance',
  displayName: 'Numeric (with tolerance)',
  description: 'Numerical answer with rounding/measurement tolerance',
  icon: '🔢',

  validate: (data: QuestionData) => numericHandler.validate(data),
  getRequiredFields: () => [],
  getOptionalFields: () => ['tolerance', 'numericTolerance', 'units', 'rounding', 'roundingValue'],

  validateAnswer: (prompt: Prompt, userAnswer: QuestionAnswer): ValidationResult => {
    return numericHandler.validateAnswer(prompt, userAnswer);
  },

  normalize: (data: any) => {
    const base = numericHandler.normalize(data);
    if (!base) return null;
    return { ...base, tolerance: data.tolerance ?? data.numericTolerance ?? 0.1 };
  },
};

// ============================================================================
// MCQ HANDLER
// ============================================================================

export const mcqHandler: QuestionTypeHandler = {
  type: 'mcq',
  displayName: 'Multiple Choice',
  description: 'Select from predefined options',
  icon: '⭕',

  validate: (data: QuestionData) => {
    const errors: string[] = [];
    const mcqData = data as MCQQuestionData;

    if (!mcqData.choices || mcqData.choices.length === 0) {
      errors.push('At least one choice is required');
    } else if (mcqData.choices.length < 2) {
      errors.push('At least two choices are required');
    }

    // Validate choice structure
    mcqData.choices?.forEach((choice, idx) => {
      if (!choice.key) errors.push(`Choice ${idx + 1}: missing key`);
      if (!choice.text) errors.push(`Choice ${idx + 1}: missing text`);
    });

    // Check for duplicate keys
    const keys = mcqData.choices?.map(c => c.key) || [];
    const uniqueKeys = new Set(keys);
    if (keys.length !== uniqueKeys.size) {
      errors.push('Duplicate choice keys found');
    }

    return { valid: errors.length === 0, errors };
  },

  getRequiredFields: () => ['choices'],
  getOptionalFields: () => ['multiSelect', 'randomizeOrder'],

  validateAnswer: (prompt: Prompt, userAnswer: QuestionAnswer): ValidationResult => {
    const mcqData = (prompt.meta?.questionData || {}) as MCQQuestionData;
    const selectedKey = String(userAnswer.value || '');

    if (!selectedKey) {
      return { isCorrect: false, feedback: 'Please select an option' };
    }

    // Check if selected key is in correct answers
    const isCorrect = prompt.answers.includes(selectedKey);

    if (isCorrect) {
      return {
        isCorrect: true,
        feedback: '✓ Correct!',
      };
    }

    // Find the correct choice text for feedback
    const correctKey = prompt.answers[0];
    const correctChoice = mcqData.choices?.find(c => c.key === correctKey);

    return {
      isCorrect: false,
      feedback: 'Incorrect. Try again.',
      correctAnswer: correctChoice?.text || correctKey,
    };
  },

  normalize: (data: any): MCQQuestionData | null => {
    // Support both structured and flat formats
    const choices = data.choices || [];
    
    // If choices is empty, try to build from choiceA, choiceB, etc.
    if (choices.length === 0 && (data.choiceA || data.choiceB || data.choiceC || data.choiceD)) {
      const keys = ['A', 'B', 'C', 'D', 'E', 'F'];
      const builtChoices = [];
      
      for (const key of keys) {
        const text = data[`choice${key}`];
        if (text) {
          builtChoices.push({ key, text });
        }
      }
      
      if (builtChoices.length > 0) {
        return {
          choices: builtChoices,
          multiSelect: data.multiSelect ?? false,
          randomizeOrder: data.randomizeOrder ?? false,
        };
      }
    }

    return {
      choices: choices.map((c: any) => ({
        key: c.key || c.id,
        text: c.text || c.label,
      })),
      multiSelect: data.multiSelect ?? false,
      randomizeOrder: data.randomizeOrder ?? false,
    };
  },
};

// ============================================================================
// FILL IN THE BLANKS HANDLER
// ============================================================================

export const fillHandler: QuestionTypeHandler = {
  type: 'fill',
  displayName: 'Fill in the Blanks',
  description: 'Complete sentences with missing words',
  icon: '✏️',

  validate: (data: QuestionData) => {
    const errors: string[] = [];
    const fillData = data as FillQuestionData;

    if (!fillData.blanks || fillData.blanks < 1) {
      errors.push('Number of blanks must be at least 1');
    }

    if (fillData.acceptedSets) {
      if (!Array.isArray(fillData.acceptedSets)) {
        errors.push('acceptedSets must be an array');
      } else if (fillData.acceptedSets.length !== fillData.blanks) {
        errors.push(`acceptedSets length (${fillData.acceptedSets.length}) must match blanks (${fillData.blanks})`);
      }
    }

    return { valid: errors.length === 0, errors };
  },

  getRequiredFields: () => ['blanks'],
  getOptionalFields: () => ['acceptedSets', 'caseSensitive', 'trim'],

  validateAnswer: (prompt: Prompt, userAnswer: QuestionAnswer): ValidationResult => {
    const fillData = (prompt.meta?.questionData || {}) as FillQuestionData;
    const userAnswers = Array.isArray(userAnswer.value) ? userAnswer.value : [userAnswer.value];

    if (userAnswers.length !== fillData.blanks) {
      return {
        isCorrect: false,
        feedback: `Please fill in all ${fillData.blanks} blank(s)`,
      };
    }

    const caseSensitive = fillData.caseSensitive ?? false;
    const trim = fillData.trim ?? true;

    // Check against accepted sets
    if (fillData.acceptedSets && fillData.acceptedSets.length === fillData.blanks) {
      let allCorrect = true;

      for (let i = 0; i < fillData.blanks; i++) {
        const userText = normalizeText(String(userAnswers[i] || ''), caseSensitive, trim);
        const acceptedAnswers = fillData.acceptedSets[i].map(a => normalizeText(a, caseSensitive, trim));

        if (!acceptedAnswers.includes(userText)) {
          allCorrect = false;
          break;
        }
      }

      if (allCorrect) {
        return { isCorrect: true, feedback: '✓ Correct!' };
      }
    }

    // Fallback: check against prompt.answers (comma-separated)
    const expectedAnswers = prompt.answers.map(a => a.split(',').map(x => x.trim()));
    let allCorrect = true;

    for (let i = 0; i < fillData.blanks; i++) {
      const userText = normalizeText(String(userAnswers[i] || ''), caseSensitive, trim);
      const acceptedAnswers = (expectedAnswers[i] || []).map(a => normalizeText(a, caseSensitive, trim));

      if (!acceptedAnswers.includes(userText)) {
        allCorrect = false;
        break;
      }
    }

    if (allCorrect) {
      return { isCorrect: true, feedback: '✓ Correct!' };
    }

    return {
      isCorrect: false,
      feedback: 'Incorrect. Try again.',
      correctAnswer: prompt.answers[0],
    };
  },

  normalize: (data: any): FillQuestionData | null => {
    return {
      blanks: data.blanks || data.blanksCount || 1,
      acceptedSets: data.acceptedSets || data.acceptedAnswers,
      caseSensitive: data.caseSensitive ?? false,
      trim: data.trim ?? true,
    };
  },
};

// ============================================================================
// MATCH HANDLER
// ============================================================================

export const matchHandler: QuestionTypeHandler = {
  type: 'match',
  displayName: 'Matching',
  description: 'Match items from two columns',
  icon: '🔗',

  validate: (data: QuestionData) => {
    const errors: string[] = [];
    const matchData = data as MatchQuestionData;

    if (!matchData.leftItems || matchData.leftItems.length === 0) {
      errors.push('At least one left item is required');
    }

    if (!matchData.rightItems || matchData.rightItems.length === 0) {
      errors.push('At least one right item is required');
    }

    // Validate structure
    matchData.leftItems?.forEach((item, idx) => {
      if (!item.id) errors.push(`Left item ${idx + 1}: missing id`);
      if (!item.text) errors.push(`Left item ${idx + 1}: missing text`);
    });

    matchData.rightItems?.forEach((item, idx) => {
      if (!item.id) errors.push(`Right item ${idx + 1}: missing id`);
      if (!item.text) errors.push(`Right item ${idx + 1}: missing text`);
    });

    return { valid: errors.length === 0, errors };
  },

  getRequiredFields: () => ['leftItems', 'rightItems'],
  getOptionalFields: () => ['allowMultiple', 'randomizeRight'],

  validateAnswer: (prompt: Prompt, userAnswer: QuestionAnswer): ValidationResult => {
    // userAnswer.value should be "1A,2C,3B,4D" format
    const userMapping = String(userAnswer.value || '');

    if (!userMapping) {
      return { isCorrect: false, feedback: 'Please complete all matches' };
    }

    // Check against correct answer (should be in same format)
    const correctMapping = prompt.answers[0];

    if (userMapping === correctMapping) {
      return { isCorrect: true, feedback: '✓ Correct!' };
    }

    return {
      isCorrect: false,
      feedback: 'Incorrect. Try again.',
      correctAnswer: correctMapping,
    };
  },

  normalize: (data: any): MatchQuestionData | null => {
    return {
      leftItems: data.leftItems || data.matchLeft || [],
      rightItems: data.rightItems || data.matchRight || [],
      allowMultiple: data.allowMultiple ?? false,
      randomizeRight: data.randomizeRight ?? false,
    };
  },
};

// ============================================================================
// LABEL HANDLER
// ============================================================================

export const labelHandler: QuestionTypeHandler = {
  type: 'label',
  displayName: 'Labeling',
  description: 'Label positions on a diagram',
  icon: '🏷️',

  validate: (data: QuestionData) => {
    const errors: string[] = [];
    const labelData = data as LabelQuestionData;

    if (!labelData.labels || labelData.labels.length === 0) {
      errors.push('At least one label is required');
    }

    if (!labelData.targets || labelData.targets.length === 0) {
      errors.push('At least one target position is required');
    }

    // Validate structure
    labelData.labels?.forEach((label, idx) => {
      if (!label.id) errors.push(`Label ${idx + 1}: missing id`);
      if (!label.text) errors.push(`Label ${idx + 1}: missing text`);
    });

    labelData.targets?.forEach((target, idx) => {
      if (!target.id) errors.push(`Target ${idx + 1}: missing id`);
      if (target.x === undefined || target.y === undefined) {
        errors.push(`Target ${idx + 1}: missing coordinates`);
      }
    });

    return { valid: errors.length === 0, errors };
  },

  getRequiredFields: () => ['labels', 'targets'],
  getOptionalFields: () => ['diagramId', 'dragAndDrop', 'diagramMetadata'],

  validateAnswer: (prompt: Prompt, userAnswer: QuestionAnswer): ValidationResult => {
    // userAnswer.value should be {T1: "L1", T2: "L2"} format
    const userMapping = userAnswer.value as Record<string, string>;

    if (!userMapping || Object.keys(userMapping).length === 0) {
      return { isCorrect: false, feedback: 'Please label all targets' };
    }

    // Parse correct answer (should be JSON string)
    let correctMapping: Record<string, string> = {};
    try {
      correctMapping = JSON.parse(prompt.answers[0]);
    } catch {
      // Fallback: try to parse as object
      correctMapping = prompt.answers[0] as any;
    }

    // Compare mappings
    const isCorrect = JSON.stringify(userMapping) === JSON.stringify(correctMapping);

    if (isCorrect) {
      return { isCorrect: true, feedback: '✓ Correct!' };
    }

    return {
      isCorrect: false,
      feedback: 'Incorrect. Try again.',
      correctAnswer: JSON.stringify(correctMapping),
    };
  },

  normalize: (data: any): LabelQuestionData | null => {
    return {
      labels: data.labels || data.labelLabels || data.labelBank || [],
      targets: data.targets || data.labelTargets || [],
      diagramId: data.diagramId,
      dragAndDrop: data.dragAndDrop ?? true,
      diagramMetadata: data.diagramMetadata,
    };
  },
};

// ============================================================================
// EXPORT ALL HANDLERS
// ============================================================================

export const allHandlers = [
  shortAnswerHandler,
  numericHandler,
  numericWithToleranceHandler,
  mcqHandler,
  fillHandler,
  matchHandler,
  labelHandler,
];
