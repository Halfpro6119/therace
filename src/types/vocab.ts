/**
 * Vocab Lab – types for sets, words, attempts, mastery, fix-it queue
 */

export type VocabSetMode = 'language_p1' | 'language_p2' | 'literature' | 'general';
export type VocabTier = 'core' | 'stretch';
export type VocabConnotation = 'positive' | 'negative' | 'neutral';
export type VocabWordClass = 'noun' | 'verb' | 'adj' | 'adv' | 'other';
export type VocabAttemptMode = 'spell' | 'definition' | 'synonym' | 'context';

export interface VocabSet {
  id: string;
  name: string;
  mode: VocabSetMode;
  theme_tag: string;
  tier: VocabTier;
  created_at: string;
}

export interface VocabWord {
  id: string;
  set_id: string;
  word: string;
  pronunciation: string | null;
  definition: string;
  synonyms: string[];
  antonyms: string[];
  connotation: VocabConnotation;
  word_class: VocabWordClass;
  example_sentence: string;
  common_misspellings: string[];
  difficulty: number;
  tags: string[];
  created_at: string;
}

export interface VocabAttempt {
  id: string;
  user_id: string;
  word_id: string;
  mode: VocabAttemptMode;
  prompt_variant: string;
  user_input: string;
  is_correct: boolean;
  levenshtein_distance: number | null;
  time_ms: number;
  created_at: string;
}

export interface VocabMastery {
  user_id: string;
  word_id: string;
  mastery: number;
  streak: number;
  last_seen: string | null;
  next_due: string | null;
  ease: number;
  lapses: number;
}

export interface VocabFixItEntry {
  user_id: string;
  word_id: string;
  added_at: string;
}

/** Result of grading a spell attempt */
export interface SpellGradeResult {
  isCorrect: boolean;
  nearMiss: boolean;
  normalizedInput: string;
  normalizedTarget: string;
  levenshteinDistance: number;
}

/** Session config for quiz player */
export interface VocabSessionConfig {
  setIds: string[];
  length: 10 | 20 | 40 | 'mastery_sprint';
  mode: VocabAttemptMode;
  isFixIt?: boolean;
}

/** One item in a session (word + optional mastery) */
export interface VocabSessionItem {
  word: VocabWord;
  mastery: VocabMastery | null;
}

/** Result for one question in a session */
export interface VocabQuestionResult {
  wordId: string;
  word: string;
  isCorrect: boolean;
  nearMiss: boolean;
  userInput: string;
  timeMs: number;
  masteryDelta: number;
  addedToFixIt: boolean;
}

/** Full session result for results page */
export interface VocabSessionResult {
  sessionId: string;
  startedAt: string;
  completedAt: string;
  config: VocabSessionConfig;
  totalQuestions: number;
  correct: number;
  nearMisses: number;
  maxStreak: number;
  masteryGained: number;
  results: VocabQuestionResult[];
  fixItAdditions: string[];
  masteredWordIds: string[];
}
