/**
 * Tier Filter Service
 * 
 * Handles filtering prompts and quizzes by tier level
 * Works alongside existing paper filtering
 */

import { TierFilter, TierLevel } from '../types';
// IMPORTANT: `db` is an app-level wrapper (methods), not the Supabase client.
// This service needs the raw Supabase query builder for `.from()`.
import { supabase } from '../db/client';

/**
 * Build WHERE clause for tier filtering
 * @param tierFilter - Tier filter: 'all' | 'higher' | 'foundation'
 * @returns SQL WHERE clause fragment
 */
export function buildTierWhereClause(tierFilter: TierFilter): string {
  switch (tierFilter) {
    case 'higher':
      return "tier = 'higher'";
    case 'foundation':
      return "tier = 'foundation'";
    case 'all':
    default:
      // Include both null and explicit tiers (backwards compatible)
      return "(tier IS NULL OR tier IN ('higher', 'foundation'))";
  }
}

/**
 * Filter prompts by tier
 * @param prompts - Array of prompts
 * @param tierFilter - Tier filter
 * @returns Filtered prompts
 */
export function filterPromptsByTier(prompts: any[], tierFilter: TierFilter): any[] {
  if (tierFilter === 'all') {
    return prompts; // Include all (null and explicit tiers)
  }

  return prompts.filter(p => {
    if (tierFilter === 'higher') {
      return p.tier === 'higher';
    }
    if (tierFilter === 'foundation') {
      return p.tier === 'foundation';
    }
    return true;
  });
}

/**
 * Get prompts for a topic with tier filtering
 * @param topicId - Topic ID
 * @param tierFilter - Tier filter
 * @returns Promise of filtered prompts
 */
export async function getTopicPromptsWithTierFilter(
  topicId: string,
  tierFilter: TierFilter
): Promise<any[]> {
  try {
    let query = supabase
      .from('prompts')
      .select('*')
      .eq('topic_id', topicId);

    // Apply tier filter
    if (tierFilter === 'higher') {
      query = query.eq('tier', 'higher');
    } else if (tierFilter === 'foundation') {
      query = query.eq('tier', 'foundation');
    }
    // If 'all', no additional filter needed (includes null)

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching topic prompts with tier filter:', error);
    return [];
  }
}

/**
 * Get prompts for a unit with tier filtering
 * @param unitId - Unit ID
 * @param tierFilter - Tier filter
 * @returns Promise of filtered prompts
 */
export async function getUnitPromptsWithTierFilter(
  unitId: string,
  tierFilter: TierFilter
): Promise<any[]> {
  try {
    let query = supabase
      .from('prompts')
      .select('*')
      .eq('unit_id', unitId);

    // Apply tier filter
    if (tierFilter === 'higher') {
      query = query.eq('tier', 'higher');
    } else if (tierFilter === 'foundation') {
      query = query.eq('tier', 'foundation');
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching unit prompts with tier filter:', error);
    return [];
  }
}

/**
 * Get prompts for a paper with tier filtering
 * @param paperId - Paper ID
 * @param tierFilter - Tier filter
 * @returns Promise of filtered prompts
 */
export async function getPaperPromptsWithTierFilter(
  paperId: string,
  tierFilter: TierFilter
): Promise<any[]> {
  try {
    let query = supabase
      .from('prompts')
      .select('*')
      .eq('paper_id', paperId);

    // Apply tier filter
    if (tierFilter === 'higher') {
      query = query.eq('tier', 'higher');
    } else if (tierFilter === 'foundation') {
      query = query.eq('tier', 'foundation');
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching paper prompts with tier filter:', error);
    return [];
  }
}

/**
 * Get prompts for a subject with tier filtering
 * @param subjectId - Subject ID
 * @param tierFilter - Tier filter
 * @returns Promise of filtered prompts
 */
export async function getSubjectPromptsWithTierFilter(
  subjectId: string,
  tierFilter: TierFilter
): Promise<any[]> {
  try {
    let query = supabase
      .from('prompts')
      .select('*')
      .eq('subject_id', subjectId);

    // Apply tier filter
    if (tierFilter === 'higher') {
      query = query.eq('tier', 'higher');
    } else if (tierFilter === 'foundation') {
      query = query.eq('tier', 'foundation');
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching subject prompts with tier filter:', error);
    return [];
  }
}

/**
 * Get prompts with combined paper + tier filtering
 * @param subjectId - Subject ID
 * @param paperFilter - Paper filter: 'all' | 1 | 2 | 3
 * @param tierFilter - Tier filter: 'all' | 'higher' | 'foundation'
 * @returns Promise of filtered prompts
 */
export async function getPromptsWithPaperAndTierFilter(
  subjectId: string,
  paperFilter: 'all' | 1 | 2 | 3,
  tierFilter: TierFilter
): Promise<any[]> {
  try {
    let query = supabase
      .from('prompts')
      .select('*')
      .eq('subject_id', subjectId);

    // Apply paper filter
    if (paperFilter !== 'all') {
      query = query.eq('paper_id', paperFilter);
    }

    // Apply tier filter
    if (tierFilter === 'higher') {
      query = query.eq('tier', 'higher');
    } else if (tierFilter === 'foundation') {
      query = query.eq('tier', 'foundation');
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching prompts with paper and tier filter:', error);
    return [];
  }
}

/**
 * Count prompts by tier for a topic
 * @param topicId - Topic ID
 * @returns Promise of tier counts
 */
export async function countTopicPromptsByTier(topicId: string): Promise<{
  all: number;
  higher: number;
  foundation: number;
}> {
  try {
    const { data, error } = await supabase
      .from('prompts')
      .select('tier', { count: 'exact' })
      .eq('topic_id', topicId);

    if (error) throw error;

    const counts = {
      all: data?.length || 0,
      higher: data?.filter(p => p.tier === 'higher').length || 0,
      foundation: data?.filter(p => p.tier === 'foundation').length || 0,
    };

    return counts;
  } catch (error) {
    console.error('Error counting topic prompts by tier:', error);
    return { all: 0, higher: 0, foundation: 0 };
  }
}

/**
 * Count prompts by tier for a unit
 * @param unitId - Unit ID
 * @returns Promise of tier counts
 */
export async function countUnitPromptsByTier(unitId: string): Promise<{
  all: number;
  higher: number;
  foundation: number;
}> {
  try {
    const { data, error } = await supabase
      .from('prompts')
      .select('tier', { count: 'exact' })
      .eq('unit_id', unitId);

    if (error) throw error;

    const counts = {
      all: data?.length || 0,
      higher: data?.filter(p => p.tier === 'higher').length || 0,
      foundation: data?.filter(p => p.tier === 'foundation').length || 0,
    };

    return counts;
  } catch (error) {
    console.error('Error counting unit prompts by tier:', error);
    return { all: 0, higher: 0, foundation: 0 };
  }
}
