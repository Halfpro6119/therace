/**
 * English Campus – types for Language, Literature, Vocab Lab
 * Aligned with ENGLISH_CAMPUS_SPEC.md
 */

export type EnglishPaper = 1 | 2;

export type LanguageTaskType =
  | 'description'
  | 'narrative'
  | 'speech'
  | 'article'
  | 'letter'
  | 'leaflet'
  | 'report';

export interface EnglishLanguageTask {
  id: string;
  paper: EnglishPaper;
  type: LanguageTaskType;
  title: string;
  prompt: string;
  stimulus?: string;
  timeRecommendationMins: number;
  markSchemeSummary: string;
  audiencePurpose?: string;
}

export interface EnglishWritingDraft {
  id: string;
  taskId: string;
  taskTitle: string;
  paper: EnglishPaper;
  content: string;
  wordCount: number;
  createdAt: string;
  updatedAt: string;
  /** Self-mark or AI mark result when submitted */
  result?: EnglishMarkResult;
  /** Checklist ticks when submitted */
  checklistTicks?: string[];
}

export interface EnglishMarkResult {
  bandLevel: string;
  marks?: number;
  maxMarks?: number;
  aoBreakdown?: { ao: string; level: string; comment?: string }[];
  strengths: string[];
  targets: string[];
  rewriteSuggestions?: string[];
  isSelfMark: boolean;
  reflectedAt?: string;
}

export interface EnglishWritingStreak {
  currentStreakDays: number;
  bestStreakDays: number;
  lastActiveDate: string;
}

export interface EnglishTargets {
  targets: string[];
  updatedAt: string;
}

export interface EnglishContinueState {
  type: 'language' | 'literature' | 'vocab';
  taskId?: string;
  draftId?: string;
  label: string;
  updatedAt: string;
}

/** Checklist item id and label for Top Band coverage */
export interface EnglishChecklistItem {
  id: string;
  label: string;
  ao?: string;
}
