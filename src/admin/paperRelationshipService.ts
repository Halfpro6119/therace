/**
 * Paper Relationship Service
 * 
 * Manages relationships between papers and units/topics
 * Enables bulk assignment and filtering
 */

import { supabase } from '../db/client';
import { Paper, Unit, Topic, Prompt } from '../types';

/**
 * Get papers linked to a unit
 */
export async function getUnitPapers(unitId: string): Promise<Paper[]> {
  const { data, error } = await supabase
    .from('unit_papers')
    .select('paper_id, papers(*)')
    .eq('unit_id', unitId);

  if (error) throw error;
  return (data || []).map(row => ({
    id: row.papers.id,
    subjectId: row.papers.subject_id,
    paperNumber: row.papers.paper_number,
    name: row.papers.name,
    calculatorAllowedDefault: row.papers.calculator_allowed_default,
    createdAt: row.papers.created_at,
  }));
}

/**
 * Get papers linked to a topic
 */
export async function getTopicPapers(topicId: string): Promise<Paper[]> {
  const { data, error } = await supabase
    .from('topic_papers')
    .select('paper_id, papers(*)')
    .eq('topic_id', topicId);

  if (error) throw error;
  return (data || []).map(row => ({
    id: row.papers.id,
    subjectId: row.papers.subject_id,
    paperNumber: row.papers.paper_number,
    name: row.papers.name,
    calculatorAllowedDefault: row.papers.calculator_allowed_default,
    createdAt: row.papers.created_at,
  }));
}

/**
 * Link a unit to a paper
 */
export async function linkUnitToPaper(unitId: string, paperId: string): Promise<void> {
  const { error } = await supabase
    .from('unit_papers')
    .insert({ unit_id: unitId, paper_id: paperId });

  // Ignore duplicate key errors
  if (error && !error.message.includes('duplicate')) throw error;
}

/**
 * Link a topic to a paper
 */
export async function linkTopicToPaper(topicId: string, paperId: string): Promise<void> {
  const { error } = await supabase
    .from('topic_papers')
    .insert({ topic_id: topicId, paper_id: paperId });

  // Ignore duplicate key errors
  if (error && !error.message.includes('duplicate')) throw error;
}

/**
 * Unlink a unit from a paper
 */
export async function unlinkUnitFromPaper(unitId: string, paperId: string): Promise<void> {
  const { error } = await supabase
    .from('unit_papers')
    .delete()
    .eq('unit_id', unitId)
    .eq('paper_id', paperId);

  if (error) throw error;
}

/**
 * Unlink a topic from a paper
 */
export async function unlinkTopicFromPaper(topicId: string, paperId: string): Promise<void> {
  const { error } = await supabase
    .from('topic_papers')
    .delete()
    .eq('topic_id', topicId)
    .eq('paper_id', paperId);

  if (error) throw error;
}

/**
 * Assign all prompts in a unit to a paper
 */
export async function assignUnitPromptsToPaper(unitId: string, paperId: string): Promise<number> {
  const { data, error } = await supabase
    .from('prompts')
    .update({ paper_id: paperId })
    .eq('unit_id', unitId)
    .select('id');

  if (error) throw error;

  // Also link the unit to the paper
  await linkUnitToPaper(unitId, paperId);

  return (data || []).length;
}

/**
 * Assign all prompts in a topic to a paper
 */
export async function assignTopicPromptsToPaper(topicId: string, paperId: string): Promise<number> {
  const { data, error } = await supabase
    .from('prompts')
    .update({ paper_id: paperId })
    .eq('topic_id', topicId)
    .select('id');

  if (error) throw error;

  // Also link the topic to the paper
  await linkTopicToPaper(topicId, paperId);

  return (data || []).length;
}

/**
 * Assign only unassigned prompts in a unit to a paper
 */
export async function assignUnassignedUnitPromptsToPaper(unitId: string, paperId: string): Promise<number> {
  const { data, error } = await supabase
    .from('prompts')
    .update({ paper_id: paperId })
    .eq('unit_id', unitId)
    .is('paper_id', null)
    .select('id');

  if (error) throw error;

  // Also link the unit to the paper
  await linkUnitToPaper(unitId, paperId);

  return (data || []).length;
}

/**
 * Get prompts assigned to a paper
 */
export async function getPromptsForPaper(paperId: string): Promise<any[]> {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('paper_id', paperId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get units linked to a paper
 */
export async function getPaperUnits(paperId: string): Promise<Unit[]> {
  const { data, error } = await supabase
    .from('unit_papers')
    .select('unit_id, units(*)')
    .eq('paper_id', paperId);

  if (error) throw error;
  return (data || []).map(row => ({
    id: row.units.id,
    subjectId: row.units.subject_id,
    name: row.units.name,
    orderIndex: row.units.order_index,
    description: row.units.description,
  }));
}

/**
 * Get topics linked to a paper
 */
export async function getPaperTopics(paperId: string): Promise<Topic[]> {
  const { data, error } = await supabase
    .from('topic_papers')
    .select('topic_id, topics(*)')
    .eq('paper_id', paperId);

  if (error) throw error;
  return (data || []).map(row => ({
    id: row.topics.id,
    subjectId: row.topics.subject_id,
    unitId: row.topics.unit_id,
    name: row.topics.name,
    orderIndex: row.topics.order_index,
    description: row.topics.description,
  }));
}

/**
 * Get count of prompts assigned to a paper
 */
export async function getPromptCountForPaper(paperId: string): Promise<number> {
  const { count, error } = await supabase
    .from('prompts')
    .select('*', { count: 'exact', head: true })
    .eq('paper_id', paperId);

  if (error) throw error;
  return count || 0;
}

/**
 * Get count of prompts in a unit assigned to a paper
 */
export async function getUnitPromptCountForPaper(unitId: string, paperId: string): Promise<number> {
  const { count, error } = await supabase
    .from('prompts')
    .select('*', { count: 'exact', head: true })
    .eq('unit_id', unitId)
    .eq('paper_id', paperId);

  if (error) throw error;
  return count || 0;
}

/**
 * Get count of prompts in a topic assigned to a paper
 */
export async function getTopicPromptCountForPaper(topicId: string, paperId: string): Promise<number> {
  const { count, error } = await supabase
    .from('prompts')
    .select('*', { count: 'exact', head: true })
    .eq('topic_id', topicId)
    .eq('paper_id', paperId);

  if (error) throw error;
  return count || 0;
}
