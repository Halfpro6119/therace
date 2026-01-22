/**
 * Tier import helpers for CSV + JSON import.
 *
 * Requirements:
 * - Accept per-row fields: tier, isHigher, isFoundation, level
 * - Accept tier as: higher/foundation or H/F (case-insensitive)
 * - Defensive parsing: never call toLowerCase on undefined
 * - Invalid tier => warn and return null
 */

export type TierValue = 'higher' | 'foundation' | null;

export function normalizeTierValue(input: unknown): TierValue {
  if (input === null || input === undefined) return null;
  const s = String(input).trim();
  if (!s) return null;
  const v = s.toLowerCase();

  if (v === 'higher' || v === 'h') return 'higher';
  if (v === 'foundation' || v === 'f') return 'foundation';

  // Anything else is invalid
  console.warn('[tierImport] Invalid tier value:', input);
  return null;
}

function normalizeBoolean(input: unknown): boolean {
  if (input === true) return true;
  if (input === false) return false;
  if (input === null || input === undefined) return false;
  const v = String(input).trim().toLowerCase();
  return ['true', '1', 'yes', 'y', 'on'].includes(v);
}

/**
 * Extracts tier from a row-like object.
 * Order:
 * 1) tier
 * 2) level
 * 3) isHigher
 * 4) isFoundation
 */
export function extractTierFromAnyRow(row: any): TierValue {
  if (!row || typeof row !== 'object') return null;

  const t = normalizeTierValue(row.tier);
  if (t) return t;

  const l = normalizeTierValue(row.level);
  if (l) return l;

  if (normalizeBoolean(row.isHigher)) return 'higher';
  if (normalizeBoolean(row.isFoundation)) return 'foundation';

  return null;
}
