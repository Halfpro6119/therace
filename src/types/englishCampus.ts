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
  /** URL or path to image shown below the question (e.g. for description tasks). */
  imageUrl?: string;
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

/** Self-mark annotation: highlight or underline a text range */
export interface SelfMarkSpan {
  start: number;
  end: number;
  type: 'highlight' | 'underline';
}

/** Green tick at a position in the text (e.g. after a phrase) */
export interface SelfMarkTick {
  position: number;
}

/** Green pen note: feedback anchored at a position */
export interface SelfMarkNote {
  position: number;
  text: string;
}

export interface SelfMarkAnnotations {
  spans: SelfMarkSpan[];
  ticks: SelfMarkTick[];
  notes: SelfMarkNote[];
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
  /** Annotations from self-mark suite (highlights, underlines, ticks, notes) */
  selfMarkAnnotations?: SelfMarkAnnotations;
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

/** Examiner-pack content for a single Language writing task (from ENGLISH_EXAMINER_PACK_TASKS_1_2.md) */
export interface EnglishExaminerPackTask {
  /** Task-specific top-band checklist (used in workspace instead of generic when present). */
  checklistItems: EnglishChecklistItem[];
  /** Full mark scheme text (AO5/AO6, bands, what examiners reward). */
  markSchemeDetail: string;
  /** Step-by-step writing method (plan → write → upgrade). */
  stepByStepMethod: string;
  /** Model answers by grade (full-length, exam-realistic). */
  modelAnswers: {
    grade4: string;
    grade6: string;
    grade8: string;
    grade9: string;
  };
}

// ---- Golden Question Bank types (exam-realistic, LLM-implementable, expandable) ----

/** Language Paper 1/2 Section A: short analysis / comparison reading tasks */
export type LanguageReadingTaskType = 'analysisShort' | 'comparison' | 'evaluation';

export interface EnglishLanguageReadingTask {
  id: string;
  paper: EnglishPaper;
  type: LanguageReadingTaskType;
  prompt: string;
  focus: string;
  /** e.g. "language + structure", "imagery, sensory language" */
  markSchemeSummary?: string;
}

/** Writing task in golden bank: same as EnglishLanguageTask but with optional checklist/model refs */
export interface GoldenEnglishWritingTask extends EnglishLanguageTask {
  /** Form label for display (e.g. Description, Narrative, Speech). */
  form?: string;
  /** Optional task-specific checklist id (else use default). */
  checklistId?: string;
  /** Marks for this task (e.g. 40). */
  marks?: number;
  /** Stimulus type: image, opening line, scenario, etc. */
  stimulusType?: 'image' | 'openingLine' | 'scenario' | 'none';
  /** Optional planning box hint. */
  planningHint?: string;
}

/** Literature: seen poetry (anthology) – single poem question */
export interface EnglishLiteraturePoetrySeenSingle {
  id: string;
  poem: string;
  prompt: string;
  focus: string;
  markSchemeSummary?: string;
}

/** Literature: seen poetry – comparison (two poems) */
export interface EnglishLiteraturePoetrySeenComparison {
  id: string;
  poemA: string;
  poemB: string;
  prompt: string;
  focus: string;
  markSchemeSummary?: string;
}

/** Literature: unseen poetry – analysis or comparison */
export type UnseenPoetryTaskType = 'analysis' | 'comparison';

export interface EnglishLiteratureUnseenPoetry {
  id: string;
  type: UnseenPoetryTaskType;
  prompt: string;
  focus: string;
  markSchemeSummary?: string;
}

/** Literature: set text (novel/play) – character/theme/extract question */
export type LiteratureTextCode = 'Macbeth' | 'AChristmasCarol' | 'JekyllHyde' | 'AnInspectorCalls';

export interface EnglishLiteratureTextTask {
  id: string;
  text: LiteratureTextCode;
  prompt: string;
  focus: string;
  /** Extract-only vs whole-text vs both */
  scope?: 'extract' | 'whole' | 'both';
  markSchemeSummary?: string;
}

/** Vocab Lab question types */
export type VocabTaskType = 'spellFromDefinition' | 'meaningFromWord' | 'upgradeWord' | 'useInContext';

export interface EnglishVocabTask {
  id: string;
  type: VocabTaskType;
  prompt: string;
  /** For spellFromDefinition: the definition. For meaningFromWord: the word. For upgradeWord: word to replace. */
  stimulus: string;
  /** Expected answer(s) or hint for marking. */
  expectedAnswer?: string | string[];
}
