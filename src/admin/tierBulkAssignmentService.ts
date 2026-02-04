/**
 * Tier Bulk Assignment Service
 * 
 * Handles bulk tier assignment for:
 * - All prompts in a topic
 * - All prompts in a unit
 * - Multiple prompts by ID
 */

import { TierLevel } from '../types';
import { supabase } from '../db/client';

export interface BulkAssignmentResult {
  success: boolean;
  updatedCount: number;
  errors: string[];
}

/**
 * Assign tier to all prompts in a topic
 * @param topicId - Topic ID
 * @param tier - Tier to assign ('higher', 'foundation', or null)
 * @param onlyNullTiers - If true, only update prompts with tier = null
 * @returns Result with count of updated prompts
 */
export async function assignTierToTopicPrompts(
  topicId: string,
  tier: TierLevel,
  onlyNullTiers: boolean = false
): Promise<BulkAssignmentResult> {
  try {
    let query = supabase
      .from('prompts')
      .update({ tier })
      .eq('topic_id', topicId);

    // Optionally only update null tiers
    if (onlyNullTiers) {
      query = query.is('tier', null);
    }

    const { error, count } = await query;

    if (error) {
      return {
        success: false,
        updatedCount: 0,
        errors: [error.message],
      };
    }

    return {
      success: true,
      updatedCount: count || 0,
      errors: [],
    };
  } catch (error: any) {
    return {
      success: false,
      updatedCount: 0,
      errors: [error?.message || 'Unknown error'],
    };
  }
}

/**
 * Assign tier to all prompts in a unit
 * @param unitId - Unit ID
 * @param tier - Tier to assign
 * @param onlyNullTiers - If true, only update prompts with tier = null
 * @returns Result with count of updated prompts
 */
export async function assignTierToUnitPrompts(
  unitId: string,
  tier: TierLevel,
  onlyNullTiers: boolean = false
): Promise<BulkAssignmentResult> {
  try {
    let query = supabase
      .from('prompts')
      .update({ tier })
      .eq('unit_id', unitId);

    if (onlyNullTiers) {
      query = query.is('tier', null);
    }

    const { error, count } = await query;

    if (error) {
      return {
        success: false,
        updatedCount: 0,
        errors: [error.message],
      };
    }

    return {
      success: true,
      updatedCount: count || 0,
      errors: [],
    };
  } catch (error: any) {
    return {
      success: false,
      updatedCount: 0,
      errors: [error?.message || 'Unknown error'],
    };
  }
}

/**
 * Assign tier to multiple prompts by ID
 * @param promptIds - Array of prompt IDs
 * @param tier - Tier to assign
 * @returns Result with count of updated prompts
 */
export async function assignTierToPrompts(
  promptIds: string[],
  tier: TierLevel
): Promise<BulkAssignmentResult> {
  if (promptIds.length === 0) {
    return {
      success: true,
      updatedCount: 0,
      errors: [],
    };
  }

  try {
    const { error, count } = await supabase
      .from('prompts')
      .update({ tier })
      .in('id', promptIds);

    if (error) {
      return {
        success: false,
        updatedCount: 0,
        errors: [error.message],
      };
    }

    return {
      success: true,
      updatedCount: count || 0,
      errors: [],
    };
  } catch (error: any) {
    return {
      success: false,
      updatedCount: 0,
      errors: [error?.message || 'Unknown error'],
    };
  }
}

/**
 * Clear tier (set to null) for all prompts in a topic
 * @param topicId - Topic ID
 * @returns Result with count of updated prompts
 */
export async function clearTierForTopicPrompts(topicId: string): Promise<BulkAssignmentResult> {
  return assignTierToTopicPrompts(topicId, null);
}

/**
 * Clear tier (set to null) for all prompts in a unit
 * @param unitId - Unit ID
 * @returns Result with count of updated prompts
 */
export async function clearTierForUnitPrompts(unitId: string): Promise<BulkAssignmentResult> {
  return assignTierToUnitPrompts(unitId, null);
}

/**
 * Get tier distribution for a topic
 * @param topicId - Topic ID
 * @returns Distribution of tiers
 */
export async function getTopicTierDistribution(topicId: string): Promise<{
  total: number;
  higher: number;
  foundation: number;
  unassigned: number;
}> {
  try {
    const { data, error } = await supabase
      .from('prompts')
      .select('tier')
      .eq('topic_id', topicId);

    if (error) throw error;

    const distribution = {
      total: data?.length || 0,
      higher: (data as { tier: TierLevel | null }[] | null)?.filter((p: { tier: TierLevel | null }) => p.tier === 'higher').length || 0,
      foundation: (data as { tier: TierLevel | null }[] | null)?.filter((p: { tier: TierLevel | null }) => p.tier === 'foundation').length || 0,
      unassigned: (data as { tier: TierLevel | null }[] | null)?.filter((p: { tier: TierLevel | null }) => p.tier === null).length || 0,
    };

    return distribution;
  } catch (error) {
    console.error('Error getting topic tier distribution:', error);
    return { total: 0, higher: 0, foundation: 0, unassigned: 0 };
  }
}

/**
 * Get tier distribution for a unit
 * @param unitId - Unit ID
 * @returns Distribution of tiers
 */
export async function getUnitTierDistribution(unitId: string): Promise<{
  total: number;
  higher: number;
  foundation: number;
  unassigned: number;
}> {
  try {
    const { data, error } = await supabase
      .from('prompts')
      .select('tier')
      .eq('unit_id', unitId);

    if (error) throw error;

    const distribution = {
      total: data?.length || 0,
      higher: (data as { tier: TierLevel | null }[] | null)?.filter((p: { tier: TierLevel | null }) => p.tier === 'higher').length || 0,
      foundation: (data as { tier: TierLevel | null }[] | null)?.filter((p: { tier: TierLevel | null }) => p.tier === 'foundation').length || 0,
      unassigned: (data as { tier: TierLevel | null }[] | null)?.filter((p: { tier: TierLevel | null }) => p.tier === null).length || 0,
    };

    return distribution;
  } catch (error) {
    console.error('Error getting unit tier distribution:', error);
    return { total: 0, higher: 0, foundation: 0, unassigned: 0 };
  }
}
