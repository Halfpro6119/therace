/**
 * JSON Normalizer for Question Import
 * 
 * Handles multiple JSON formats and schema variants with strict normalization
 * and defensive parsing to prevent crashes.
 */

export interface NormalizedQuestion {
  prompt: string;
  answersAccepted: string[];
  fullSolution: string;
  hint: string;
  marks: number;
  calculatorAllowed: boolean;
  drawingRecommended: boolean;
  diagram?: {
    mode: 'auto' | 'template' | 'asset';
    templateId?: string;
    placement?: 'above' | 'inline' | 'below' | 'side';
    caption?: string;
    alt?: string;
    params?: Record<string, any>;
  };
}

export interface ValidationResult {
  errors: string[];
  warnings: string[];
}

/**
 * Parse JSON input supporting multiple formats:
 * - Single question object
 * - Array of question objects
 * - Wrapped payload: { "questions": [...] }
 */
export function parseQuestionsJson(input: string): NormalizedQuestion[] {
  if (!input || typeof input !== 'string') {
    throw new Error('Input must be a non-empty string');
  }

  let parsed: any;
  try {
    parsed = JSON.parse(input.trim());
  } catch (e) {
    throw new Error(`Invalid JSON: ${e instanceof Error ? e.message : 'Unknown error'}`);
  }

  // Handle wrapped payload
  if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
    if (parsed.questions && Array.isArray(parsed.questions)) {
      parsed = parsed.questions;
    } else if (parsed.prompts && Array.isArray(parsed.prompts)) {
      parsed = parsed.prompts;
    } else if (parsed.data && Array.isArray(parsed.data)) {
      parsed = parsed.data;
    } else if (Object.keys(parsed).length > 0 && !parsed.prompt && !parsed.question) {
      // Single object that's not a question - try to extract array
      const values = Object.values(parsed);
      if (Array.isArray(values[0])) {
        parsed = values[0];
      } else {
        parsed = [parsed];
      }
    } else {
      // Single question object
      parsed = [parsed];
    }
  }

  // Ensure array
  if (!Array.isArray(parsed)) {
    parsed = [parsed];
  }

  // Normalize each question
  return parsed
    .filter((item: any) => item && typeof item === 'object')
    .map((item: any) => normalizeQuestion(item));
}

/**
 * Normalize a single question object
 * Handles both schema variants and missing fields
 */
export function normalizeQuestion(raw: any): NormalizedQuestion {
  if (!raw || typeof raw !== 'object') {
    return createDefaultQuestion();
  }

  // Extract prompt (try multiple field names)
  const prompt = extractString(raw.prompt || raw.question || raw.text || '').trim();

  // Extract answers (handle both string and array formats)
  const answersAccepted = normalizeAnswerList(raw.answers || raw.answer);

  // Extract solution/explanation
  const fullSolution = extractString(
    raw.fullSolution || raw.solution || raw.explanation || ''
  ).trim();

  // Extract hint
  const hint = extractString(raw.hint || '').trim();

  // Extract marks
  const marks = extractNumber(raw.marks || raw.mark || 1, 1);

  // Extract calculator allowed
  const calculatorAllowed = extractBoolean(raw.calculatorAllowed || raw.calculator_allowed);

  // Extract drawing recommended
  const drawingRecommended = extractBoolean(raw.drawingRecommended || raw.drawing_recommended);

  // Extract diagram metadata
  const diagram = normalizeDiagram(raw);

  return {
    prompt,
    answersAccepted,
    fullSolution,
    hint,
    marks,
    calculatorAllowed,
    drawingRecommended,
    ...(diagram && { diagram }),
  };
}

/**
 * Normalize answer list from various formats
 * Handles: array, pipe-delimited string, single string
 */
export function normalizeAnswerList(rawAnswerField: unknown): string[] {
  if (!rawAnswerField) {
    return [];
  }

  // If array, stringify each element
  if (Array.isArray(rawAnswerField)) {
    return rawAnswerField
      .map((item: any) => extractString(item).trim())
      .filter((s: string) => s.length > 0);
  }

  // If string, try pipe-delimited first
  if (typeof rawAnswerField === 'string') {
    const trimmed = rawAnswerField.trim();
    if (trimmed.includes('|')) {
      return trimmed
        .split('|')
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 0);
    }
    // Single answer
    return trimmed.length > 0 ? [trimmed] : [];
  }

  // If number, convert to string
  if (typeof rawAnswerField === 'number') {
    return [String(rawAnswerField)];
  }

  return [];
}

/**
 * Normalize diagram metadata
 * Handles both object format and flat fields
 */
function normalizeDiagram(raw: any): NormalizedQuestion['diagram'] | undefined {
  // Check for diagram object
  if (raw.diagram && typeof raw.diagram === 'object') {
    const diagram = raw.diagram;
    const mode = extractString(diagram.mode || 'auto') as any;
    
    if (!['auto', 'template', 'asset'].includes(mode)) {
      return undefined;
    }

    return {
      mode,
      templateId: extractString(diagram.templateId || diagram.template_id),
      placement: extractString(diagram.placement || 'inline') as any,
      caption: extractString(diagram.caption || ''),
      alt: extractString(diagram.alt || ''),
      params: parseDiagramParams(diagram.params),
    };
  }

  // Check for flat diagram fields
  const diagramMode = extractString(raw.diagramMode || raw.diagram_mode);
  if (diagramMode && ['auto', 'template', 'asset'].includes(diagramMode)) {
    return {
      mode: diagramMode as any,
      templateId: extractString(raw.diagramTemplateId || raw.diagram_template_id),
      placement: extractString(raw.diagramPlacement || raw.diagram_placement || 'inline') as any,
      caption: extractString(raw.diagramCaption || raw.diagram_caption || ''),
      alt: extractString(raw.diagramAlt || raw.diagram_alt || ''),
      params: parseDiagramParams(raw.diagramParams || raw.diagram_params),
    };
  }

  return undefined;
}

/**
 * Parse diagram params safely
 */
function parseDiagramParams(raw: any): Record<string, any> | undefined {
  if (!raw) return undefined;

  // If already object, return as-is
  if (typeof raw === 'object' && !Array.isArray(raw)) {
    return raw;
  }

  // If string, try to parse as JSON
  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw);
      if (typeof parsed === 'object') {
        return parsed;
      }
    } catch {
      // Silently fail - invalid params
    }
  }

  return undefined;
}

/**
 * Validate a normalized question
 */
export function validateQuestion(normalized: NormalizedQuestion): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check required fields
  if (!normalized.prompt || normalized.prompt.length === 0) {
    errors.push('Prompt/question is required');
  }

  if (!normalized.answersAccepted || normalized.answersAccepted.length === 0) {
    errors.push('At least one answer is required');
  }

  // Warnings for optional fields
  if (!normalized.fullSolution || normalized.fullSolution.length === 0) {
    warnings.push('No solution/explanation provided');
  }

  if (normalized.marks < 1) {
    warnings.push('Marks should be at least 1');
  }

  // Validate diagram if present
  if (normalized.diagram) {
    if (!normalized.diagram.templateId && normalized.diagram.mode === 'auto') {
      warnings.push('Diagram mode is auto but no templateId provided');
    }
  }

  return { errors, warnings };
}

/**
 * Helper: Extract string safely
 */
function extractString(value: any): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (value === null || value === undefined) return '';
  return String(value);
}

/**
 * Helper: Extract number safely
 */
function extractNumber(value: any, defaultValue: number = 0): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = parseInt(value, 10);
    return isNaN(parsed) ? defaultValue : parsed;
  }
  return defaultValue;
}

/**
 * Helper: Extract boolean safely
 */
function extractBoolean(value: any): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const normalized = value.toLowerCase().trim();
    return ['true', '1', 'yes', 'y', 'on'].includes(normalized);
  }
  if (typeof value === 'number') return value !== 0;
  return false;
}

/**
 * Create a default question with safe values
 */
function createDefaultQuestion(): NormalizedQuestion {
  return {
    prompt: '',
    answersAccepted: [],
    fullSolution: '',
    hint: '',
    marks: 1,
    calculatorAllowed: false,
    drawingRecommended: false,
  };
}

/**
 * Convert normalized question to database format
 */
export function normalizedToDbFormat(normalized: NormalizedQuestion): any {
  return {
    prompt: normalized.prompt,
    answer: normalized.answersAccepted.join('|'), // Pipe-delimited for DB
    answers: normalized.answersAccepted, // Also store as array
    fullSolution: normalized.fullSolution,
    hint: normalized.hint,
    marks: normalized.marks,
    calculatorAllowed: normalized.calculatorAllowed,
    drawingRecommended: normalized.drawingRecommended,
    ...(normalized.diagram && {
      diagramMode: normalized.diagram.mode,
      diagramTemplateId: normalized.diagram.templateId,
      diagramPlacement: normalized.diagram.placement,
      diagramCaption: normalized.diagram.caption,
      diagramAlt: normalized.diagram.alt,
      diagramParamsJson: normalized.diagram.params ? JSON.stringify(normalized.diagram.params) : undefined,
    }),
  };
}
