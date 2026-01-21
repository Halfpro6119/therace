/**
 * Tier-aware import utilities
 * Extends importUtils.ts with tier support
 */

import { extractTierFromRow, normalizeTier, TierLevel } from './tierNormalizer';

export interface ImportPromptRowWithTier {
  subject: string;
  examBoard: string;
  unit: string;
  topic: string;
  type: 'short' | 'mcq' | 'fill' | 'match' | 'label';
  question: string;
  answers: string[];
  hint?: string;
  explanation?: string;
  calculatorAllowed?: boolean;
  drawingRecommended?: boolean;
  diagramMode?: 'auto' | 'template' | 'asset';
  diagramTemplateId?: string;
  diagramPlacement?: 'above' | 'below' | 'inline' | 'side';
  diagramCaption?: string;
  diagramAlt?: string;
  diagramParamsJson?: string;
  // Paper assignment (optional)
  paperId?: string;
  paperNumber?: number;
  // Tier assignment (NEW)
  tier?: TierLevel;
}

/**
 * Extract tier from raw row data (handles multiple field names)
 * Supports: tier, isHigher, isFoundation, level
 */
export function extractTierFromRawRow(rawRow: any): TierLevel {
  return extractTierFromRow(rawRow);
}

/**
 * Apply default tier to a row if not already set
 * @param row - Import row
 * @param defaultTier - Default tier to apply if row.tier is null
 * @returns Row with tier applied
 */
export function applyDefaultTier(row: ImportPromptRowWithTier, defaultTier: TierLevel): ImportPromptRowWithTier {
  if (row.tier === null || row.tier === undefined) {
    return { ...row, tier: defaultTier };
  }
  return row;
}

/**
 * Validate tier value in import row
 * @param row - Import row
 * @param rowNum - Row number for error reporting
 * @returns Error message if invalid, null if valid
 */
export function validateTierInRow(row: ImportPromptRowWithTier, rowNum: number): string | null {
  if (row.tier === null || row.tier === undefined) {
    return null; // null is valid (means all tiers)
  }
  
  if (row.tier !== 'higher' && row.tier !== 'foundation') {
    return `Invalid tier value: "${row.tier}". Must be "higher", "foundation", or empty.`;
  }
  
  return null;
}
