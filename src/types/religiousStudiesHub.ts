/**
 * Religious Studies Hub – AQA GCSE Religious Studies A 8062
 * Religions, themes, beliefs, flashcards, contrasting views, quick check, short answer, extended writing.
 */

// ============================================================================
// OPTION IDS
// ============================================================================

export type ReligionId =
  | 'buddhism'
  | 'christianity'
  | 'catholic-christianity'
  | 'hinduism'
  | 'islam'
  | 'judaism'
  | 'sikhism';

export type ThemeId =
  | 'A' | 'B' | 'C' | 'D' | 'E' | 'F'  // Thematic (A–F)
  | 'G' | 'H';                           // Textual (St Mark's Gospel)

export interface ReligiousStudiesOptionSelection {
  religion1: ReligionId;
  religion2: ReligionId;
  /** Four themes (A–F) for non-textual route, or two themes + textual studies */
  themes: ThemeId[];
  /** If true, user studies Themes G and H (St Mark's Gospel) instead of 4 themes */
  textualRoute: boolean;
}

export interface ReligionMeta {
  id: ReligionId;
  title: string;
  subtitle?: string;
}

export interface ThemeMeta {
  id: ThemeId;
  title: string;
  subtitle?: string;
}

// ============================================================================
// BELIEF LAB
// ============================================================================

export interface BeliefConcept {
  id: string;
  religionId?: ReligionId;
  themeId?: ThemeId;
  title: string;
  coreIdea: string;
  commonMisconception?: string;
  influence?: string;
  scriptureRef?: string;
}

// ============================================================================
// FLASHCARDS / SCRIPTURE & KEY TERMS
// ============================================================================

export interface ScriptureCard {
  id: string;
  religionId?: ReligionId;
  themeId?: ThemeId;
  term: string;
  definition: string;
  scriptureRef?: string;
  inContext?: string;
}

export type RSConfidenceLevel = 'again' | 'hard' | 'good' | 'easy';

// ============================================================================
// CONTRASTING VIEWS
// ============================================================================

export interface ContrastingView {
  id: string;
  themeId?: ThemeId;
  religionId?: ReligionId;
  issue: string;
  views: { religion: string; view: string; scripture?: string }[];
  modelAnswer?: string;
}

// ============================================================================
// QUICK CHECK
// ============================================================================

export type RSQuickCheckType = 'multipleChoice' | 'trueFalse' | 'shortAnswer' | 'whichTwo';

export interface RSQuickCheckItem {
  id: string;
  religionId?: ReligionId;
  themeId?: ThemeId;
  type: RSQuickCheckType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  feedback?: { correct: string; incorrect: string };
}

// ============================================================================
// SHORT ANSWER (1, 2, 4, 5 marks)
// ============================================================================

export type ShortAnswerMarkType = 1 | 2 | 4 | 5;

export interface ShortAnswerItem {
  id: string;
  religionId?: ReligionId;
  themeId?: ThemeId;
  marks: ShortAnswerMarkType;
  question: string;
  modelAnswer: string;
  markScheme?: string;
}

// ============================================================================
// EXTENDED WRITING (12 marks)
// ============================================================================

export interface ExtendedWritingPrompt {
  id: string;
  religionId?: ReligionId;
  themeId?: ThemeId;
  statement: string;
  guidance?: string;
  modelAnswer?: string;
  religionsToRefer?: string[];
}

// ============================================================================
// PHILOSOPHICAL ARGUMENTS (Theme C)
// ============================================================================

export interface PhilosophicalArgument {
  id: string;
  title: string;
  description: string;
  premises?: string[];
  strengths: string[];
  weaknesses: string[];
}

// ============================================================================
// TEXTUAL STUDIES (Themes G, H)
// ============================================================================

export interface TextualPassage {
  id: string;
  themeId: 'G' | 'H';
  passageRef: string;
  passageText: string;
  title: string;
  significance?: string;
  questions?: string[];
}

// ============================================================================
// PROGRESS
// ============================================================================

export interface RSPartProgress {
  religionId?: ReligionId;
  themeId?: ThemeId;
  beliefLabViewed: boolean;
  quickCheckPassed: boolean;
  shortAnswerCompleted: boolean;
  extendedWritingCompleted: boolean;
}

export interface RSFlashcardMastery {
  cardId: string;
  religionId?: ReligionId;
  themeId?: ThemeId;
  confidence: RSConfidenceLevel;
  lastSeen: number;
}
