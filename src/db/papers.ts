import { supabase } from './client';
import type { Paper, CreatePaperInput, UpdatePaperInput, PaperWithQuestionCount } from '../types/papers';

export const papersDb = {
  // Get all papers for a subject
  async getPapersBySubject(subjectId: string): Promise<Paper[]> {
    const { data, error } = await supabase
      .from('papers')
      .select('*')
      .eq('subject_id', subjectId)
      .order('paper_number', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // Get a single paper by ID
  async getPaperById(id: string): Promise<Paper | null> {
    const { data, error } = await supabase
      .from('papers')
      .select('*')
      .eq('id', id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  },

  // Get paper by subject and paper number
  async getPaperByNumber(subjectId: string, paperNumber: number): Promise<Paper | null> {
    const { data, error } = await supabase
      .from('papers')
      .select('*')
      .eq('subject_id', subjectId)
      .eq('paper_number', paperNumber)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  },

  // Create a new paper
  async createPaper(input: CreatePaperInput): Promise<Paper> {
    const { data, error } = await supabase
      .from('papers')
      .insert([{
        subject_id: input.subjectId,
        paper_number: input.paperNumber,
        name: input.name,
        calculator_allowed_default: input.calculatorAllowedDefault ?? false,
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update a paper
  async updatePaper(id: string, input: UpdatePaperInput): Promise<Paper> {
    const { data, error } = await supabase
      .from('papers')
      .update(input)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete a paper
  async deletePaper(id: string): Promise<void> {
    const { error } = await supabase
      .from('papers')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Get papers with question counts
  async getPapersWithCounts(subjectId: string): Promise<PaperWithQuestionCount[]> {
    const { data: papers, error: papersError } = await supabase
      .from('papers')
      .select('*')
      .eq('subject_id', subjectId)
      .order('paper_number', { ascending: true });

    if (papersError) throw papersError;

    // Get question counts for each paper
    const papersWithCounts = await Promise.all(
      (papers || []).map(async (paper) => {
        const { count, error: countError } = await supabase
          .from('prompts')
          .select('*', { count: 'exact', head: true })
          .eq('paper_id', paper.id);

        if (countError) throw countError;
        return {
          ...paper,
          questionCount: count || 0,
        };
      })
    );

    return papersWithCounts;
  },

  // Assign prompts to a paper
  async assignPromptsToPaper(promptIds: string[], paperId: string): Promise<void> {
    const { error } = await supabase
      .from('prompts')
      .update({ paper_id: paperId })
      .in('id', promptIds);

    if (error) throw error;
  },

  // Get prompts by paper
  async getPromptsByPaper(paperId: string): Promise<any[]> {
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('paper_id', paperId);

    if (error) throw error;
    return data || [];
  },
};
