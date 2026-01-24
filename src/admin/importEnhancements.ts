import { normalizeQuestion, validateNormalizedQuestion } from '../utils/questionEngine'
/**
 * IMPORT ENHANCEMENTS
 * 
 * Enhanced import utilities supporting type-specific fields.
 * Handles both legacy and new question type formats.
 * Provides normalization and fallback handling.
 */

import { QuestionType, EnhancedImportRow } from '../types/questionTypes';
import { questionRegistry } from '../utils/questionRegistry';

// ============================================================================
// TYPE DETECTION
// ============================================================================

/**
 * Detect question type from import row
 * Falls back to 'short' if type is not specified
 */
export function detectQuestionType(row: any): QuestionType {
  const type = row.type?.toLowerCase();
  
  if (['short', 'mcq', 'fill', 'match', 'label'].includes(type)) {
    return type as QuestionType;
  }

  // Auto-detect based on available fields
  if (row.choiceA || row.choiceB || row.choiceC || row.choiceD) {
    return 'mcq';
  }
  if (row.blanksCount || row.blanks) {
    return 'fill';
  }
  if (row.matchLeftJson || row.matchLeft) {
    return 'match';
  }
  if (row.labelBankJson || row.labelBank) {
    return 'label';
  }

  // Default to short answer
  return 'short';
}

// ============================================================================
// MCQ IMPORT HANDLING
// ============================================================================

/**
 * Extract MCQ choices from import row
 * Supports both structured and flat formats
 */
export function extractMCQChoices(row: any): { choices: any[]; correctKey?: string } {
  // Try structured format first
  if (row.choices && Array.isArray(row.choices)) {
    return {
      choices: row.choices,
      correctKey: row.correctChoice || row.answers?.[0],
    };
  }

  // Try flat format (choiceA, choiceB, etc.)
  const keys = ['A', 'B', 'C', 'D', 'E', 'F'];
  const choices = [];

  for (const key of keys) {
    const text = row[`choice${key}`];
    if (text) {
      choices.push({ key, text });
    }
  }

  if (choices.length > 0) {
    return {
      choices,
      correctKey: row.correctChoice || row.answers?.[0],
    };
  }

  // Fallback: return empty
  return { choices: [] };
}

// ============================================================================
// FILL IMPORT HANDLING
// ============================================================================

/**
 * Extract fill-in-the-blanks data from import row
 */
export function extractFillData(row: any): { blanks: number; acceptedSets?: string[][] } {
  const blanks = row.blanksCount || row.blanks || 1;

  let acceptedSets: string[][] | undefined;

  // Try to parse acceptedAnswers
  if (row.acceptedAnswers) {
    try {
      if (typeof row.acceptedAnswers === 'string') {
        acceptedSets = JSON.parse(row.acceptedAnswers);
      } else if (Array.isArray(row.acceptedAnswers)) {
        acceptedSets = row.acceptedAnswers;
      }
    } catch (e) {
      console.warn('Failed to parse acceptedAnswers:', e);
    }
  }

  return { blanks, acceptedSets };
}

// ============================================================================
// MATCH IMPORT HANDLING
// ============================================================================

/**
 * Extract match data from import row
 */
export function extractMatchData(row: any): { leftItems: any[]; rightItems: any[] } {
  let leftItems: any[] = [];
  let rightItems: any[] = [];

  // Try JSON format
  if (row.matchLeftJson) {
    try {
      leftItems = JSON.parse(row.matchLeftJson);
    } catch (e) {
      console.warn('Failed to parse matchLeftJson:', e);
    }
  }

  if (row.matchRightJson) {
    try {
      rightItems = JSON.parse(row.matchRightJson);
    } catch (e) {
      console.warn('Failed to parse matchRightJson:', e);
    }
  }

  // Fallback to structured format
  if (leftItems.length === 0 && row.matchLeft) {
    leftItems = Array.isArray(row.matchLeft) ? row.matchLeft : [];
  }

  if (rightItems.length === 0 && row.matchRight) {
    rightItems = Array.isArray(row.matchRight) ? row.matchRight : [];
  }

  return { leftItems, rightItems };
}

// ============================================================================
// LABEL IMPORT HANDLING
// ============================================================================

/**
 * Extract label data from import row
 */
export function extractLabelData(row: any): { labels: any[]; targets: any[] } {
  let labels: any[] = [];
  let targets: any[] = [];

  // Try JSON format
  if (row.labelBankJson) {
    try {
      labels = JSON.parse(row.labelBankJson);
    } catch (e) {
      console.warn('Failed to parse labelBankJson:', e);
    }
  }

  if (row.labelTargetsJson) {
    try {
      targets = JSON.parse(row.labelTargetsJson);
    } catch (e) {
      console.warn('Failed to parse labelTargetsJson:', e);
    }
  }

  // Fallback to structured format
  if (labels.length === 0 && row.labelBank) {
    labels = Array.isArray(row.labelBank) ? row.labelBank : [];
  }

  if (targets.length === 0 && row.labelTargets) {
    targets = Array.isArray(row.labelTargets) ? row.labelTargets : [];
  }

  return { labels, targets };
}

// ============================================================================
// ANSWER EXTRACTION
// ============================================================================

/**
 * Extract answers from import row based on question type
 */
export function extractAnswers(row: any, type: QuestionType): string[] {
  // Base answers field
  let answers: string[] = [];

  if (row.answers) {
    if (typeof row.answers === 'string') {
      answers = row.answers.split(',').map((a: string) => a.trim());
    } else if (Array.isArray(row.answers)) {
      answers = row.answers.map((a: any) => String(a).trim());
    }
  }

  // Type-specific answer extraction
  switch (type) {
    case 'mcq':
      // For MCQ, answer should be the choice key
      if (row.correctChoice) {
        return [row.correctChoice];
      }
      if (answers.length > 0) {
        return [answers[0]];
      }
      break;

    case 'fill':
      // For fill, answers are per-blank
      // Already handled above
      break;

    case 'match':
      // For match, answer is mapping string like "1A,2B,3C"
      if (row.matchPairs) {
        return [row.matchPairs];
      }
      break;

    case 'label':
      // For label, answer is JSON mapping
      if (row.labelMapping) {
        return [row.labelMapping];
      }
      break;
  }

  return answers.length > 0 ? answers : [''];
}

// ============================================================================
// METADATA EXTRACTION
// ============================================================================

/**
 * Extract type-specific metadata from import row
 */
export function extractQuestionMetadata(row: any, type: QuestionType): any {
  const metadata: any = {};

  // Common metadata
  if (row.hint) metadata.hint = row.hint;
  if (row.explanation) metadata.explanation = row.explanation;
  if (row.tier) metadata.tier = row.tier;
  if (row.calculatorAllowed !== undefined) metadata.calculatorAllowed = row.calculatorAllowed;

  // Type-specific metadata
  switch (type) {
    case 'short':
      if (row.caseSensitive !== undefined) metadata.caseSensitive = row.caseSensitive;
      if (row.trim !== undefined) metadata.trim = row.trim;
      if (row.numericTolerance !== undefined) metadata.numericTolerance = row.numericTolerance;
      break;

    case 'mcq':
      const { choices, correctKey } = extractMCQChoices(row);
      if (choices.length > 0) {
        metadata.questionData = {
          choices,
          multiSelect: row.multiSelect ?? false,
          randomizeOrder: row.randomizeOrder ?? false,
        };
      }
      break;

    case 'fill':
      const fillData = extractFillData(row);
      metadata.questionData = {
        blanks: fillData.blanks,
        acceptedSets: fillData.acceptedSets,
        caseSensitive: row.caseSensitive ?? false,
        trim: row.trim ?? true,
      };
      break;

    case 'match':
      const matchData = extractMatchData(row);
      if (matchData.leftItems.length > 0 && matchData.rightItems.length > 0) {
        metadata.questionData = {
          leftItems: matchData.leftItems,
          rightItems: matchData.rightItems,
          allowMultiple: row.allowMultiple ?? false,
          randomizeRight: row.randomizeRight ?? false,
        };
      }
      break;

    case 'label':
      const labelData = extractLabelData(row);
      if (labelData.labels.length > 0 && labelData.targets.length > 0) {
        metadata.questionData = {
          labels: labelData.labels,
          targets: labelData.targets,
          diagramId: row.diagramId,
          dragAndDrop: row.dragAndDrop ?? true,
        };
      }
      break;
  }

  // Parse custom metadata JSON if provided
  if (row.metaJson) {
    try {
      const customMeta = JSON.parse(row.metaJson);
      Object.assign(metadata, customMeta);
    } catch (e) {
      console.warn('Failed to parse metaJson:', e);
    }
  }

  return metadata;
}

// ============================================================================
// VALIDATION & WARNINGS
// ============================================================================

/**
 * Validate import row and return warnings
 */
export function validateImportRow(row: any, type: QuestionType): string[] {
  const warnings: string[] = [];

  // Check required fields
  if (!row.question || !row.question.trim()) {
    warnings.push('Missing question text');
  }

  // Type-specific validation
  switch (type) {
    case 'mcq':
      const { choices } = extractMCQChoices(row);
      if (choices.length < 2) {
        warnings.push('MCQ requires at least 2 choices');
      }
      break;

    case 'fill':
      const fillData = extractFillData(row);
      if (fillData.blanks < 1) {
        warnings.push('Fill requires at least 1 blank');
      }
      break;

    case 'match':
      const matchData = extractMatchData(row);
      if (matchData.leftItems.length === 0 || matchData.rightItems.length === 0) {
        warnings.push('Match requires both left and right items');
      }
      break;

    case 'label':
      const labelData = extractLabelData(row);
      if (labelData.labels.length === 0 || labelData.targets.length === 0) {
        warnings.push('Label requires both labels and targets');
      }
      break;
  }

  return warnings;
}

// ============================================================================
// NORMALIZATION
// ============================================================================

/**
 * Normalize import row to standard format
 * Handles missing fields gracefully with fallbacks
 */
export function normalizeImportRow(row: any): EnhancedImportRow {
  const type = detectQuestionType(row);
  const warnings = validateImportRow(row, type);

  if (warnings.length > 0) {
    console.warn(`Import row warnings for "${row.question}":`, warnings);
  }

  return {
    subject: row.subject || '',
    unit: row.unit || '',
    topic: row.topic || '',
    type,
    question: row.question || '',
    answers: extractAnswers(row, type),
    hint: row.hint,
    explanation: row.explanation,
    tier: row.tier,
    calculatorAllowed: row.calculatorAllowed,
    paperId: row.paperId,
    metaJson: JSON.stringify(extractQuestionMetadata(row, type)),
  };
}

// ============================================================================
// EXPORT
// ============================================================================

export {
  detectQuestionType,
  extractMCQChoices,
  extractFillData,
  extractMatchData,
  extractLabelData,
  extractAnswers,
  extractQuestionMetadata,
  validateImportRow,
  normalizeImportRow,
};


// Validate a raw import row via canonical normalizer + validator
export function validateImportNormalized(rawRow: any) {
  const q = normalizeQuestion({
    id: rawRow.id || 'import',
    subjectId: rawRow.subjectId || rawRow.subject || '',
    unitId: rawRow.unitId || rawRow.unit || '',
    topicId: rawRow.topicId || rawRow.topic || '',
    paperId: rawRow.paperId || rawRow.paper_id || undefined,
    tier: rawRow.tier ?? null,
    type: rawRow.type || 'short',
    question: rawRow.question || '',
    answers: rawRow.answers || [],
    marks: rawRow.marks || rawRow.mark || 1,
    hint: rawRow.hint || '',
    explanation: rawRow.explanation || '',
    meta: rawRow.meta || { questionData: rawRow.questionData || {} },
    ...rawRow,
  })
  return { q, ...validateNormalizedQuestion(q) }
}
