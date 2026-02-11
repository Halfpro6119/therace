/**
 * Geography Hub – AQA GCSE Geography 8035
 * Option IDs, concepts, key terms, quick check, skills, issue lab, fieldwork, question lab.
 */

// ============================================================================
// OPTION IDS
// ============================================================================

export type LivingWorldId = 'desert' | 'cold';
export type PhysicalLandscapeId = 'coastal' | 'river' | 'glacial';
export type ResourceId = 'food' | 'water' | 'energy';

export interface GeographyOptionSelection {
  livingWorld: LivingWorldId;
  physicalLandscapes: [PhysicalLandscapeId, PhysicalLandscapeId];
  resource: ResourceId;
}

/** Section ID for content filtering (maps to spec sections) */
export type GeographySectionId =
  | 'physical-natural-hazards'
  | 'physical-ecosystems'
  | 'physical-rainforests'
  | 'physical-desert'
  | 'physical-cold'
  | 'physical-uk-overview'
  | 'physical-coastal'
  | 'physical-river'
  | 'physical-glacial'
  | 'human-urban'
  | 'human-economic'
  | 'human-resource-overview'
  | 'human-food'
  | 'human-water'
  | 'human-energy'
  | 'app-issue-evaluation'
  | 'app-fieldwork';

export interface GeographySectionMeta {
  id: GeographySectionId;
  title: string;
  paper: 1 | 2 | 3;
  /** Whether this section is mandatory (vs chosen by option) */
  mandatory: boolean;
}

// ============================================================================
// CONCEPT LAB
// ============================================================================

export interface GeographyConcept {
  id: string;
  sectionId: GeographySectionId;
  title: string;
  coreIdea: string;
  changeScenario?: string;
  misconception?: string;
}

// ============================================================================
// KEY TERMS / FLASHCARDS
// ============================================================================

export interface GeographyKeyTerm {
  id: string;
  sectionId: GeographySectionId;
  term: string;
  definition: string;
  inContext?: string;
}

export type GeographyConfidenceLevel = 'again' | 'hard' | 'good' | 'easy';

// ============================================================================
// QUICK CHECK
// ============================================================================

export type GeographyQuickCheckType = 'multipleChoice' | 'trueFalse' | 'shortAnswer' | 'whichTwo';

export interface GeographyQuickCheckItem {
  id: string;
  sectionId: GeographySectionId;
  type: GeographyQuickCheckType;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  feedback?: { correct: string; incorrect: string };
}

// ============================================================================
// SKILLS LAB
// ============================================================================

export type GeographySkillType = 'map' | 'graph' | 'numerical' | 'statistical';

export interface GeographySkillsTask {
  id: string;
  skillType: GeographySkillType;
  sectionId?: GeographySectionId;
  title: string;
  prompt: string;
  expected?: string;
}

// ============================================================================
// ISSUE LAB (Paper 3)
// ============================================================================

export interface GeographyIssueScenario {
  id: string;
  title: string;
  resources: string[];
  questions: { question: string; markScheme: string }[];
  sectionIds: GeographySectionId[];
}

// ============================================================================
// FIELDWORK LAB
// ============================================================================

export interface GeographyFieldworkTask {
  id: string;
  type: 'unfamiliar' | 'own';
  enquiryStrand: string;
  question: string;
  data?: string;
  markScheme: string;
}

// ============================================================================
// QUESTION LAB
// ============================================================================

export type GeographyQuestionType = 'describe' | 'explain' | 'assess' | 'evaluate' | 'caseStudy';

export interface GeographyQuestionLabItem {
  id: string;
  sectionId: GeographySectionId;
  questionType: GeographyQuestionType;
  question: string;
  markSchemeSummary: string;
  modelAnswer?: string;
}

// ============================================================================
// PROGRESS (storage)
// ============================================================================

export interface GeographySectionProgress {
  sectionId: GeographySectionId;
  conceptViewed: boolean;
  quickCheckPassed: boolean;
  quickCheckScore?: number;
  skillsCompleted: boolean;
  questionLabCompleted: boolean;
}

export interface GeographyFlashcardMastery {
  termId: string;
  sectionId: GeographySectionId;
  confidence: GeographyConfidenceLevel;
  lastSeen: number;
}
