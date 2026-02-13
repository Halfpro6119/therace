/**
 * MFL Lab types – Grammar, Listening, Reading, Writing, Speaking, Translation
 */
import type { LanguageId, ThemeId } from '../config/languagesHubData';

export interface MflGrammarConcept {
  id: string;
  title: string;
  tense?: string;
  coreIdea: string;
  conjugation?: Array<{ pronoun: string; form: string }>;
  examples: string[];
  commonMistake?: string;
  correctForm?: string;
}

export interface MflListeningQuestion {
  id: string;
  type: 'mc' | 'short' | 'gap';
  question: string;
  options?: string[];
  correctAnswer: string;
}

export interface MflListeningTask {
  id: string;
  themeId: ThemeId;
  tier: 'foundation' | 'higher';
  transcript: string;
  transcriptEn?: string;
  questions: MflListeningQuestion[];
}

export interface MflReadingQuestion {
  id: string;
  type: 'mc' | 'short' | 'gap' | 'find';
  question: string;
  options?: string[];
  correctAnswer: string;
}

export interface MflReadingTask {
  id: string;
  themeId: ThemeId;
  tier: 'foundation' | 'higher';
  text: string;
  questions: MflReadingQuestion[];
}

export type MflWritingType = 'photo' | '40word' | '90word' | '150word';

export interface MflWritingTask {
  id: string;
  type: MflWritingType;
  themeId: ThemeId;
  tier: 'foundation' | 'higher';
  prompt: string;
  bullets: string[];
  imageUrl?: string;
  modelAnswers?: Record<string, string>;
}

export interface MflRolePlayPrompt {
  id: string;
  themeId: ThemeId;
  scenario: string;
  prompts: string[];
  modelResponses: string[];
}

export interface MflPhotoCard {
  id: string;
  themeId: ThemeId;
  tier: 'foundation' | 'higher';
  imageUrl?: string;
  questions: string[];
  modelAnswers: string[];
}

export type MflTranslationDirection = 'en-to-tl' | 'tl-to-en';

export interface MflTranslationTask {
  id: string;
  direction: MflTranslationDirection;
  themeId: ThemeId;
  tier: 'foundation' | 'higher';
  source: string;
  modelTranslation: string;
}
