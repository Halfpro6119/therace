/**
 * Tier Normalization Utility
 * 
 * Handles parsing and normalization of tier values from various input formats:
 * - tier: "higher" | "foundation" | "H" | "F" (case-insensitive)
 * - isHigher: true/false
 * - isFoundation: true/false
 * - level: "higher" | "foundation"
 * 
 * Returns normalized value: "higher" | "foundation" | null
 */

export type TierLevel = 'higher' | 'foundation' | null;

/**
 * Normalize a tier value from various input formats
 * @param value - Raw tier value from import
 * @returns Normalized tier: 'higher' | 'foundation' | null
 */
export function normalizeTier(value: any): TierLevel {
  // Handle null/undefined
  if (value === null || value === undefined || value === '') {
    return null;
  }

  // Convert to string and lowercase for comparison
  const str = String(value).toLowerCase().trim();

  // Handle empty string
  if (str === '') {
    return null;
  }

  // Direct matches
  if (str === 'higher' || str === 'h') {
    return 'higher';
  }
  if (str === 'foundation' || str === 'f') {
    return 'foundation';
  }

  // Handle boolean-like values (for isHigher/isFoundation fields)
  if (str === 'true' || str === '1' || str === 'yes') {
    return 'higher'; // Default to higher for boolean true
  }
  if (str === 'false' || str === '0' || str === 'no') {
    return null; // Default to null for boolean false
  }

  // If we can't parse it, return null (backwards compatible)
  console.warn(`[tierNormalizer] Could not parse tier value: "${value}". Defaulting to null.`);
  return null;
}

/**
 * Extract tier from a row object that may have multiple tier-related fields
 * Checks in order: tier, isHigher, isFoundation, level
 * @param row - Import row object
 * @returns Normalized tier value
 */
export function extractTierFromRow(row: any): TierLevel {
  // Check explicit tier field first
  if (row.tier !== undefined && row.tier !== null && row.tier !== '') {
    return normalizeTier(row.tier);
  }

  // Check isHigher field
  if (row.isHigher !== undefined && row.isHigher !== null) {
    const val = String(row.isHigher).toLowerCase().trim();
    if (val === 'true' || val === '1' || val === 'yes') {
      return 'higher';
    }
  }

  // Check isFoundation field
  if (row.isFoundation !== undefined && row.isFoundation !== null) {
    const val = String(row.isFoundation).toLowerCase().trim();
    if (val === 'true' || val === '1' || val === 'yes') {
      return 'foundation';
    }
  }

  // Check level field (alias for tier)
  if (row.level !== undefined && row.level !== null && row.level !== '') {
    return normalizeTier(row.level);
  }

  // No tier found
  return null;
}

/**
 * Validate that a tier value is valid
 * @param tier - Tier value to validate
 * @returns true if valid, false otherwise
 */
export function isValidTier(tier: any): boolean {
  if (tier === null || tier === undefined) {
    return true; // null is valid (means all tiers)
  }
  const normalized = normalizeTier(tier);
  return normalized === 'higher' || normalized === 'foundation';
}

/**
 * Get human-readable tier label
 * @param tier - Tier value
 * @returns Human-readable label
 */
export function getTierLabel(tier: TierLevel): string {
  switch (tier) {
    case 'higher':
      return 'Higher Tier';
    case 'foundation':
      return 'Foundation Tier';
    case null:
      return 'All Tiers';
    default:
      return 'Unknown';
  }
}

/**
 * Get tier badge color for UI
 * @param tier - Tier value
 * @returns Color class or hex value
 */
export function getTierColor(tier: TierLevel): string {
  switch (tier) {
    case 'higher':
      return '#8b5cf6'; // Purple
    case 'foundation':
      return '#3b82f6'; // Blue
    case null:
      return '#6b7280'; // Gray
    default:
      return '#6b7280';
  }
}

/**
 * Get tier icon/badge for UI
 * @param tier - Tier value
 * @returns Icon or badge text
 */
export function getTierBadge(tier: TierLevel): string {
  switch (tier) {
    case 'higher':
      return '⬆️ H';
    case 'foundation':
      return '⬇️ F';
    case null:
      return '◆ All';
    default:
      return '?';
  }
}
