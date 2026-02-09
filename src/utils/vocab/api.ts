/**
 * Vocab Lab – Supabase queries and submit RPC
 */

import { supabase } from '../../db/client';
import type { VocabSet, VocabWord, VocabMastery, VocabFixItEntry, VocabAttempt } from '../../types/vocab';
import { getMasteryDelta, getStreakDelta, shouldAddToFixIt } from './mastery';
import { gradeSpellAttempt } from './grading';

/** Get current Supabase auth user id, or null if not signed in */
export async function getCurrentUserId(): Promise<string | null> {
  const { data: { user } } = await supabase.auth.getUser();
  return user?.id ?? null;
}

function mapSet(row: any): VocabSet {
  return {
    id: row.id,
    name: row.name,
    mode: row.mode,
    theme_tag: row.theme_tag,
    tier: row.tier,
    created_at: row.created_at,
  };
}

function mapWord(row: any): VocabWord {
  return {
    id: row.id,
    set_id: row.set_id,
    word: row.word,
    pronunciation: row.pronunciation ?? null,
    definition: row.definition,
    synonyms: Array.isArray(row.synonyms) ? row.synonyms : [],
    antonyms: Array.isArray(row.antonyms) ? row.antonyms : [],
    connotation: row.connotation,
    word_class: row.word_class,
    example_sentence: row.example_sentence,
    common_misspellings: Array.isArray(row.common_misspellings) ? row.common_misspellings : [],
    difficulty: row.difficulty ?? 3,
    tags: Array.isArray(row.tags) ? row.tags : [],
    created_at: row.created_at,
  };
}

function mapMastery(row: any): VocabMastery {
  return {
    user_id: row.user_id,
    word_id: row.word_id,
    mastery: row.mastery ?? 0,
    streak: row.streak ?? 0,
    last_seen: row.last_seen ?? null,
    next_due: row.next_due ?? null,
    ease: row.ease ?? 2.5,
    lapses: row.lapses ?? 0,
  };
}

export const vocabApi = {
  async getSets(): Promise<VocabSet[]> {
    const { data, error } = await supabase
      .from('vocab_sets')
      .select('*')
      .order('name');
    if (error) throw error;
    return (data || []).map(mapSet);
  },

  async getSet(id: string): Promise<VocabSet | null> {
    const { data, error } = await supabase
      .from('vocab_sets')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data ? mapSet(data) : null;
  },

  async getWordsBySetId(setId: string): Promise<VocabWord[]> {
    const { data, error } = await supabase
      .from('vocab_words')
      .select('*')
      .eq('set_id', setId)
      .order('word');
    if (error) throw error;
    return (data || []).map(mapWord);
  },

  async getWordsBySetIds(setIds: string[]): Promise<VocabWord[]> {
    if (setIds.length === 0) return [];
    const { data, error } = await supabase
      .from('vocab_words')
      .select('*')
      .in('set_id', setIds)
      .order('word');
    if (error) throw error;
    return (data || []).map(mapWord);
  },

  async getWord(id: string): Promise<VocabWord | null> {
    const { data, error } = await supabase
      .from('vocab_words')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data ? mapWord(data) : null;
  },

  async getMasteryForUser(userId: string, wordIds: string[]): Promise<Map<string, VocabMastery>> {
    if (wordIds.length === 0) return new Map();
    const { data, error } = await supabase
      .from('vocab_mastery')
      .select('*')
      .eq('user_id', userId)
      .in('word_id', wordIds);
    if (error) throw error;
    const map = new Map<string, VocabMastery>();
    for (const row of data || []) {
      map.set(row.word_id, mapMastery(row));
    }
    return map;
  },

  async getMasteryForUserAllWords(userId: string): Promise<VocabMastery[]> {
    const { data, error } = await supabase
      .from('vocab_mastery')
      .select('*')
      .eq('user_id', userId);
    if (error) throw error;
    return (data || []).map(mapMastery);
  },

  async getFixItQueue(userId: string): Promise<VocabFixItEntry[]> {
    const { data, error } = await supabase
      .from('vocab_fixit_queue')
      .select('*')
      .eq('user_id', userId)
      .order('added_at', { ascending: true });
    if (error) throw error;
    return (data || []).map((row: any) => ({
      user_id: row.user_id,
      word_id: row.word_id,
      added_at: row.added_at,
    }));
  },

  async getAttemptsByWord(userId: string, wordId: string, limit = 20): Promise<VocabAttempt[]> {
    const { data, error } = await supabase
      .from('vocab_attempts')
      .select('*')
      .eq('user_id', userId)
      .eq('word_id', wordId)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return (data || []).map((row: any) => ({
      id: row.id,
      user_id: row.user_id,
      word_id: row.word_id,
      mode: row.mode,
      prompt_variant: row.prompt_variant,
      user_input: row.user_input,
      is_correct: row.is_correct,
      levenshtein_distance: row.levenshtein_distance,
      time_ms: row.time_ms,
      created_at: row.created_at,
    }));
  },

  /**
   * Submit a spell attempt: grade, compute mastery delta/scheduling, call RPC.
   * Returns attempt id and result summary.
   */
  async submitSpellAttempt(
    userId: string,
    word: VocabWord,
    userInput: string,
    timeMs: number
  ): Promise<{
    attemptId: string;
    isCorrect: boolean;
    nearMiss: boolean;
    masteryDelta: number;
    addedToFixIt: boolean;
  }> {
    const grade = gradeSpellAttempt(userInput, word.word);
    const masteryDelta = getMasteryDelta(grade.isCorrect, grade.nearMiss, timeMs);
    const streakDelta = getStreakDelta(grade.isCorrect);
    const addToFixIt = shouldAddToFixIt(grade.isCorrect, grade.nearMiss);

    const { data, error } = await supabase.rpc('submit_vocab_attempt', {
      p_word_id: word.id,
      p_mode: 'spell',
      p_prompt_variant: '',
      p_user_input: userInput,
      p_is_correct: grade.isCorrect,
      p_levenshtein_distance: grade.levenshteinDistance,
      p_time_ms: timeMs,
      p_mastery_delta: masteryDelta,
      p_streak_delta: grade.isCorrect ? 1 : -999,
      p_add_to_fixit: addToFixIt,
    });

    if (error) throw error;
    return {
      attemptId: data as string,
      isCorrect: grade.isCorrect,
      nearMiss: grade.nearMiss,
      masteryDelta,
      addedToFixIt: addToFixIt,
    };
  },

  /**
   * Remove word from fix-it queue and apply small mastery boost (+6). Call after Fix-It pass.
   */
  async removeFromFixItAndBoost(userId: string, wordId: string): Promise<void> {
    const { error: delErr } = await supabase
      .from('vocab_fixit_queue')
      .delete()
      .eq('user_id', userId)
      .eq('word_id', wordId);
    if (delErr) throw delErr;

    const { data: existing } = await supabase
      .from('vocab_mastery')
      .select('*')
      .eq('user_id', userId)
      .eq('word_id', wordId)
      .maybeSingle();
    const row = existing as any;
    const newMastery = Math.min(100, (row?.mastery ?? 0) + 6);
    await supabase.from('vocab_mastery').upsert(
      {
        user_id: userId,
        word_id: wordId,
        mastery: newMastery,
        streak: row?.streak ?? 0,
        last_seen: new Date().toISOString(),
        next_due: row?.next_due ?? null,
        ease: row?.ease ?? 2.5,
        lapses: row?.lapses ?? 0,
      },
      { onConflict: 'user_id,word_id' }
    );
  },
};
