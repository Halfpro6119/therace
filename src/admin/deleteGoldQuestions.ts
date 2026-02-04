/**
 * Utility script to delete all Maths Gold Questions (F01-F27, H01-H32)
 * Run this before re-importing to ensure clean state
 */

import { supabase } from '../db/client';

const GOLD_QUESTION_IDS = [
  'F01', 'F02', 'F03', 'F04', 'F05', 'F06', 'F07', 'F08',
  'F09', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16',
  'F17', 'F18', 'F19', 'F20', 'F21', 'F22', 'F23', 'F24',
  'F25', 'F26', 'F27',
  'H01', 'H02', 'H03', 'H04', 'H05', 'H06', 'H07', 'H08',
  'H09', 'H10', 'H11', 'H12', 'H13', 'H14', 'H15', 'H16',
  'H17', 'H18', 'H19', 'H20', 'H21', 'H22', 'H23', 'H24',
  'H25', 'H26', 'H27', 'H28', 'H29', 'H30', 'H31', 'H32',
];

export async function deleteGoldQuestions(): Promise<{
  deleted: number;
  errors: string[];
}> {
  const result = {
    deleted: 0,
    errors: [] as string[],
  };

  try {
    // Get all prompts with gold question IDs in meta
    const { data: prompts, error: fetchError } = await supabase
      .from('prompts')
      .select('id, meta')
      .not('meta', 'is', null);

    if (fetchError) {
      throw fetchError;
    }

    if (!prompts || prompts.length === 0) {
      console.log('No prompts with meta found');
      return result;
    }

    // Find prompts with gold question IDs
    const goldPromptIds: string[] = [];
    for (const prompt of prompts) {
      const meta = prompt.meta as any;
      if (meta?.goldQuestionId && GOLD_QUESTION_IDS.includes(meta.goldQuestionId)) {
        goldPromptIds.push(prompt.id);
      }
    }

    if (goldPromptIds.length === 0) {
      console.log('No gold questions found to delete');
      return result;
    }

    console.log(`Found ${goldPromptIds.length} gold questions to delete`);

    // Delete in batches to avoid overwhelming the database
    const batchSize = 50;
    for (let i = 0; i < goldPromptIds.length; i += batchSize) {
      const batch = goldPromptIds.slice(i, i + batchSize);
      const { error: deleteError } = await supabase
        .from('prompts')
        .delete()
        .in('id', batch);

      if (deleteError) {
        result.errors.push(`Batch ${i / batchSize + 1}: ${deleteError.message}`);
        console.error(`Error deleting batch ${i / batchSize + 1}:`, deleteError);
      } else {
        result.deleted += batch.length;
        console.log(`Deleted batch ${i / batchSize + 1}: ${batch.length} prompts`);
      }
    }

    return result;
  } catch (error) {
    result.errors.push(error instanceof Error ? error.message : 'Unknown error');
    return result;
  }
}
