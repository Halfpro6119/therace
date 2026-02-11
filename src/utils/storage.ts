import { Attempt, MasteryState, StreakState, UserProfile } from '../types';
import type {
  EnglishWritingDraft,
  EnglishWritingStreak,
  EnglishTargets,
  EnglishContinueState,
  EnglishLiteratureDraft,
  QuotationLabProgress,
  QuotationLabSourceId,
  QuoteConfidenceLevel,
} from '../types/englishCampus';
import type {
  ScienceLabMastery,
  ScienceLabSession,
  ScienceSubject,
  FlashcardMastery,
  TopicMastery,
  ConfidenceLevel,
} from '../types/scienceLab';
import type {
  BusinessTopicProgress,
  BusinessFlashcardMastery,
  BusinessUnitId,
  BusinessConfidenceLevel,
} from '../types/businessHub';
import type {
  HistoryOptionSelection,
  HistoryPartProgress,
  HistoryFlashcardMastery,
  HistoryConfidenceLevel,
  HistoryFactorEssayDraft,
} from '../types/historyHub';
import type {
  ReligiousStudiesOptionSelection,
  RSFlashcardMastery,
  RSConfidenceLevel,
} from '../types/religiousStudiesHub';
import type {
  GeographyOptionSelection,
  GeographySectionProgress,
  GeographyFlashcardMastery,
  GeographyConfidenceLevel,
} from '../types/geographyHub';

const STORAGE_KEYS = {
  ATTEMPTS: 'grade9sprint_attempts',
  MASTERY: 'grade9sprint_mastery',
  MASTERY_BY_PROMPT: 'grade9sprint_mastery_by_prompt',
  STREAK: 'grade9sprint_streak',
  PROFILE: 'grade9sprint_profile',
  THEME: 'grade9sprint_theme',
  SAVED_QUIZZES: 'grade9sprint_saved_quizzes',
  // English Campus
  ENGLISH_DRAFTS: 'grade9sprint_english_drafts',
  ENGLISH_WRITING_STREAK: 'grade9sprint_english_writing_streak',
  ENGLISH_TARGETS: 'grade9sprint_english_targets',
  ENGLISH_LAST_SCORE: 'grade9sprint_english_last_score',
  ENGLISH_CONTINUE: 'grade9sprint_english_continue',
  ENGLISH_LITERATURE_DRAFTS: 'grade9sprint_english_literature_drafts',
  ENGLISH_QUOTATION_LAB_PROGRESS: 'grade9sprint_english_quotation_lab_progress',
  ENGLISH_QUOTATION_LAB_PRIORITY_QUOTES: 'grade9sprint_english_quotation_lab_priority_quotes',
  LITERATURE_MODEL_DRILL_COMPLETED: 'grade9sprint_literature_model_drill_completed',
  // Science Lab
  SCIENCE_LAB_MASTERY: 'grade9sprint_science_lab_mastery',
  SCIENCE_LAB_SESSIONS: 'grade9sprint_science_lab_sessions',
  SCIENCE_LAB_FLASHCARD_MASTERY: 'grade9sprint_science_lab_flashcard_mastery',
  SCIENCE_LAB_TOPIC_MASTERY: 'grade9sprint_science_lab_topic_mastery',
  // Business Hub
  BUSINESS_HUB_TOPIC_PROGRESS: 'grade9sprint_business_hub_topic_progress',
  BUSINESS_HUB_FLASHCARD_MASTERY: 'grade9sprint_business_hub_flashcard_mastery',
  // History Hub
  HISTORY_HUB_OPTIONS: 'grade9sprint_history_hub_options',
  HISTORY_HUB_PART_PROGRESS: 'grade9sprint_history_hub_part_progress',
  HISTORY_HUB_FLASHCARD_MASTERY: 'grade9sprint_history_hub_flashcard_mastery',
  HISTORY_HUB_FACTOR_ESSAY_DRAFTS: 'grade9sprint_history_hub_factor_essay_drafts',
  // Religious Studies Hub
  RS_HUB_OPTIONS: 'grade9sprint_rs_hub_options',
  RS_HUB_FLASHCARD_MASTERY: 'grade9sprint_rs_hub_flashcard_mastery',
  RS_HUB_PART_PROGRESS: 'grade9sprint_rs_hub_part_progress',
  GEOGRAPHY_HUB_OPTIONS: 'grade9sprint_geography_hub_options',
  GEOGRAPHY_HUB_SECTION_PROGRESS: 'grade9sprint_geography_hub_section_progress',
  GEOGRAPHY_HUB_FLASHCARD_MASTERY: 'grade9sprint_geography_hub_flashcard_mastery',
};

/**
 * Finalize an attempt - lock it to prevent mutations
 * This ensures data integrity after quiz completion
 */
function finalizeAttempt(attempt: Attempt): Attempt {
  return Object.freeze({
    ...attempt,
    correctPromptIds: Object.freeze([...attempt.correctPromptIds]),
    missedPromptIds: Object.freeze([...attempt.missedPromptIds]),
  }) as Attempt;
}

export const storage = {
  getAttempts: (): Attempt[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
    return data ? JSON.parse(data) : [];
  },

  /**
   * Get all attempts for a specific quiz
   * Returns attempts in chronological order (oldest first)
   */
  getAttemptsByQuizId: (quizId: string): Attempt[] => {
    const attempts = storage.getAttempts();
    return attempts.filter(a => a.quizId === quizId);
  },

  saveAttempt: (attempt: Attempt): void => {
    const attempts = storage.getAttempts();
    
    // Prevent duplicate saves - check if attempt with same ID already exists
    const existingIndex = attempts.findIndex(a => a.id === attempt.id);
    if (existingIndex >= 0) {
      console.warn(`Attempt ${attempt.id} already exists, skipping duplicate save`);
      return;
    }
    
    // Finalize the attempt before saving
    const finalizedAttempt = finalizeAttempt(attempt);
    attempts.push(finalizedAttempt);
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(attempts));
  },

  getAttemptById: (id: string): Attempt | undefined => {
    const attempts = storage.getAttempts();
    return attempts.find(a => a.id === id);
  },

  getMasteryStates: (): Record<string, MasteryState> => {
    const data = localStorage.getItem(STORAGE_KEYS.MASTERY);
    return data ? JSON.parse(data) : {};
  },

  getMasteryState: (quizId: string): MasteryState | undefined => {
    const states = storage.getMasteryStates();
    return states[quizId];
  },

  updateMasteryState: (state: MasteryState): void => {
    const states = storage.getMasteryStates();
    states[state.quizId] = state;
    localStorage.setItem(STORAGE_KEYS.MASTERY, JSON.stringify(states));
  },

  getMasteryByPromptId: (promptId: string): number => {
    const data = localStorage.getItem(STORAGE_KEYS.MASTERY_BY_PROMPT);
    const map = data ? (JSON.parse(data) as Record<string, number>) : {};
    return map[promptId] ?? 0;
  },
  setMasteryByPromptId: (promptId: string, level: number): void => {
    const data = localStorage.getItem(STORAGE_KEYS.MASTERY_BY_PROMPT);
    const map = data ? (JSON.parse(data) as Record<string, number>) : {};
    map[promptId] = level;
    localStorage.setItem(STORAGE_KEYS.MASTERY_BY_PROMPT, JSON.stringify(map));
  },

  getStreak: (): StreakState => {
    const data = localStorage.getItem(STORAGE_KEYS.STREAK);
    return data ? JSON.parse(data) : {
      currentStreakDays: 0,
      lastActiveDate: '',
      bestStreakDays: 0,
    };
  },

  updateStreak: (): void => {
    const streak = storage.getStreak();
    const today = new Date().toDateString();
    const lastDate = streak.lastActiveDate ? new Date(streak.lastActiveDate).toDateString() : '';

    if (lastDate === today) {
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    if (lastDate === yesterdayStr) {
      streak.currentStreakDays += 1;
    } else if (lastDate !== today) {
      streak.currentStreakDays = 1;
    }

    streak.lastActiveDate = today;
    streak.bestStreakDays = Math.max(streak.bestStreakDays, streak.currentStreakDays);

    localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
  },

  getProfile: (): UserProfile => {
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return data ? JSON.parse(data) : {
      xpTotal: 0,
      level: 1,
      badges: [],
      totalQuizzes: 0,
      totalTimeMinutes: 0,
      masteredCount: 0,
      grade9SpeedCount: 0,
    };
  },

  updateProfile: (updates: Partial<UserProfile>): void => {
    const profile = storage.getProfile();
    const updated = { ...profile, ...updates };

    updated.level = Math.floor(updated.xpTotal / 1000) + 1;

    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
  },

  addXP: (xp: number): void => {
    const profile = storage.getProfile();
    storage.updateProfile({ xpTotal: profile.xpTotal + xp });
  },

  addBadge: (badge: string): void => {
    const profile = storage.getProfile();
    if (!profile.badges.includes(badge)) {
      profile.badges.push(badge);
      storage.updateProfile({ badges: profile.badges });
    }
  },

  getTheme: (): 'light' | 'dark' => {
    const theme = localStorage.getItem(STORAGE_KEYS.THEME);
    return (theme as 'light' | 'dark') || 'dark';
  },

  setTheme: (theme: 'light' | 'dark'): void => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  },

  getSavedQuizzes: (): string[] => {
    const data = localStorage.getItem(STORAGE_KEYS.SAVED_QUIZZES);
    return data ? JSON.parse(data) : [];
  },

  saveQuiz: (quizId: string): void => {
    const saved = storage.getSavedQuizzes();
    if (!saved.includes(quizId)) {
      saved.push(quizId);
      localStorage.setItem(STORAGE_KEYS.SAVED_QUIZZES, JSON.stringify(saved));
    }
  },

  unsaveQuiz: (quizId: string): void => {
    const saved = storage.getSavedQuizzes();
    const updated = saved.filter(id => id !== quizId);
    localStorage.setItem(STORAGE_KEYS.SAVED_QUIZZES, JSON.stringify(updated));
  },

  isQuizSaved: (quizId: string): boolean => {
    return storage.getSavedQuizzes().includes(quizId);
  },

  getAllMasteryStates: (): Record<string, MasteryState> => {
    return storage.getMasteryStates();
  },

  resetAll: (): void => {
    Object.values(STORAGE_KEYS).forEach(key => {
      if (key !== STORAGE_KEYS.THEME) {
        localStorage.removeItem(key);
      }
    });
  },

  // —— English Campus ——
  getEnglishDrafts: (): EnglishWritingDraft[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ENGLISH_DRAFTS);
    return data ? JSON.parse(data) : [];
  },
  saveEnglishDraft: (draft: EnglishWritingDraft): void => {
    const drafts = storage.getEnglishDrafts();
    const idx = drafts.findIndex(d => d.id === draft.id);
    if (idx >= 0) drafts[idx] = draft;
    else drafts.push(draft);
    drafts.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    localStorage.setItem(STORAGE_KEYS.ENGLISH_DRAFTS, JSON.stringify(drafts));
  },
  getEnglishDraftById: (id: string): EnglishWritingDraft | undefined => {
    return storage.getEnglishDrafts().find(d => d.id === id);
  },

  getEnglishWritingStreak: (): EnglishWritingStreak => {
    const data = localStorage.getItem(STORAGE_KEYS.ENGLISH_WRITING_STREAK);
    return data ? JSON.parse(data) : { currentStreakDays: 0, bestStreakDays: 0, lastActiveDate: '' };
  },
  updateEnglishWritingStreak: (): void => {
    const streak = storage.getEnglishWritingStreak();
    const today = new Date().toDateString();
    const lastDate = streak.lastActiveDate ? new Date(streak.lastActiveDate).toDateString() : '';
    if (lastDate === today) return;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    if (lastDate === yesterdayStr) {
      streak.currentStreakDays += 1;
    } else if (lastDate !== today) {
      streak.currentStreakDays = 1;
    }
    streak.lastActiveDate = today;
    streak.bestStreakDays = Math.max(streak.bestStreakDays, streak.currentStreakDays);
    localStorage.setItem(STORAGE_KEYS.ENGLISH_WRITING_STREAK, JSON.stringify(streak));
  },

  getEnglishTargets: (): EnglishTargets => {
    const data = localStorage.getItem(STORAGE_KEYS.ENGLISH_TARGETS);
    return data ? JSON.parse(data) : { targets: [], updatedAt: '' };
  },
  setEnglishTargets: (targets: string[]): void => {
    localStorage.setItem(
      STORAGE_KEYS.ENGLISH_TARGETS,
      JSON.stringify({ targets, updatedAt: new Date().toISOString() })
    );
  },

  getEnglishLastScore: (): { bandLevel: string; marks?: number; maxMarks?: number } | null => {
    const data = localStorage.getItem(STORAGE_KEYS.ENGLISH_LAST_SCORE);
    return data ? JSON.parse(data) : null;
  },
  setEnglishLastScore: (score: { bandLevel: string; marks?: number; maxMarks?: number }): void => {
    localStorage.setItem(STORAGE_KEYS.ENGLISH_LAST_SCORE, JSON.stringify(score));
  },

  getEnglishContinue: (): EnglishContinueState | null => {
    const data = localStorage.getItem(STORAGE_KEYS.ENGLISH_CONTINUE);
    return data ? JSON.parse(data) : null;
  },
  setEnglishContinue: (state: EnglishContinueState): void => {
    localStorage.setItem(STORAGE_KEYS.ENGLISH_CONTINUE, JSON.stringify(state));
  },

  // —— Literature drafts ——
  getEnglishLiteratureDrafts: (): EnglishLiteratureDraft[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ENGLISH_LITERATURE_DRAFTS);
    return data ? JSON.parse(data) : [];
  },
  saveEnglishLiteratureDraft: (draft: EnglishLiteratureDraft): void => {
    const drafts = storage.getEnglishLiteratureDrafts();
    const idx = drafts.findIndex(d => d.id === draft.id);
    if (idx >= 0) drafts[idx] = draft;
    else drafts.push(draft);
    drafts.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    localStorage.setItem(STORAGE_KEYS.ENGLISH_LITERATURE_DRAFTS, JSON.stringify(drafts));
  },
  getEnglishLiteratureDraftById: (id: string): EnglishLiteratureDraft | undefined => {
    return storage.getEnglishLiteratureDrafts().find(d => d.id === id);
  },

  // —— Quotation Lab progress (per source) ——
  getQuotationLabProgress: (): Record<QuotationLabSourceId, QuotationLabProgress> => {
    const data = localStorage.getItem(STORAGE_KEYS.ENGLISH_QUOTATION_LAB_PROGRESS);
    return data ? JSON.parse(data) : {};
  },
  getQuotationLabProgressBySource: (sourceId: QuotationLabSourceId): QuotationLabProgress | undefined => {
    return storage.getQuotationLabProgress()[sourceId];
  },
  saveQuotationLabProgress: (progress: QuotationLabProgress): void => {
    const all = storage.getQuotationLabProgress();
    all[progress.sourceId] = progress;
    localStorage.setItem(STORAGE_KEYS.ENGLISH_QUOTATION_LAB_PROGRESS, JSON.stringify(all));
  },

  /** Mark a model-derived drill as completed (taskId → drillId → true). */
  getModelDrillCompletions: (taskId: string): Record<string, boolean> => {
    const data = localStorage.getItem(STORAGE_KEYS.LITERATURE_MODEL_DRILL_COMPLETED);
    const map = data ? (JSON.parse(data) as Record<string, Record<string, boolean>>) : {};
    return map[taskId] ?? {};
  },
  setModelDrillCompleted: (taskId: string, drillId: string): void => {
    const data = localStorage.getItem(STORAGE_KEYS.LITERATURE_MODEL_DRILL_COMPLETED);
    const map = data ? (JSON.parse(data) as Record<string, Record<string, boolean>>) : {};
    if (!map[taskId]) map[taskId] = {};
    map[taskId][drillId] = true;
    localStorage.setItem(STORAGE_KEYS.LITERATURE_MODEL_DRILL_COMPLETED, JSON.stringify(map));
  },

  /** Increment familiarity for a quote (e.g. when viewed in Quote Lab or used in a drill). */
  incrementQuotationFamiliarity: (sourceId: QuotationLabSourceId, quoteId: string): void => {
    const existing = storage.getQuotationLabProgressBySource(sourceId);
    const quoteFamiliarity = { ...(existing?.quoteFamiliarity ?? {}) };
    quoteFamiliarity[quoteId] = Math.min(3, (quoteFamiliarity[quoteId] ?? 0) + 1);
    const progress: QuotationLabProgress = {
      sourceId,
      quoteFamiliarity,
      aoBalance: existing?.aoBalance ?? { AO1: 0.4, AO2: 0.4, AO3: 0.2 },
      weakThemes: existing?.weakThemes ?? [],
      lastUpdated: new Date().toISOString(),
      quoteMisuseCount: existing?.quoteMisuseCount ?? {},
      quoteConfidence: existing?.quoteConfidence ?? {},
    };
    storage.saveQuotationLabProgress(progress);
  },

  /** Record that a quote was chosen but later flagged as weak (misuse tracking for heatmap). */
  recordQuoteMisuse: (sourceId: QuotationLabSourceId, quoteId: string): void => {
    const existing = storage.getQuotationLabProgressBySource(sourceId);
    const quoteMisuseCount = { ...(existing?.quoteMisuseCount ?? {}) };
    quoteMisuseCount[quoteId] = (quoteMisuseCount[quoteId] ?? 0) + 1;
    const progress: QuotationLabProgress = {
      sourceId,
      quoteFamiliarity: existing?.quoteFamiliarity ?? {},
      aoBalance: existing?.aoBalance ?? { AO1: 0.4, AO2: 0.4, AO3: 0.2 },
      weakThemes: existing?.weakThemes ?? [],
      lastUpdated: new Date().toISOString(),
      quoteMisuseCount,
      quoteConfidence: existing?.quoteConfidence ?? {},
    };
    storage.saveQuotationLabProgress(progress);
  },

  /** Get quote confidence for heatmap: green = confident, amber = partial, red = avoided/misused. */
  getQuoteConfidence: (sourceId: QuotationLabSourceId, quoteId: string): QuoteConfidenceLevel => {
    const prog = storage.getQuotationLabProgressBySource(sourceId);
    const fam = prog?.quoteFamiliarity?.[quoteId] ?? 0;
    const misuse = prog?.quoteMisuseCount?.[quoteId] ?? 0;
    const stored = prog?.quoteConfidence?.[quoteId];
    if (stored) return stored;
    if (misuse >= 2) return 'red';
    if (fam >= 2 && misuse === 0) return 'green';
    if (fam >= 1 || misuse === 1) return 'amber';
    return 'red';
  },

  /** Priority quotes (saved by student for quick access). */
  getPriorityQuoteIds: (): string[] => {
    const data = localStorage.getItem(STORAGE_KEYS.ENGLISH_QUOTATION_LAB_PRIORITY_QUOTES);
    return data ? JSON.parse(data) : [];
  },
  togglePriorityQuote: (quoteId: string): boolean => {
    const ids = storage.getPriorityQuoteIds();
    const next = ids.includes(quoteId) ? ids.filter(id => id !== quoteId) : [...ids, quoteId];
    localStorage.setItem(STORAGE_KEYS.ENGLISH_QUOTATION_LAB_PRIORITY_QUOTES, JSON.stringify(next));
    return next.includes(quoteId);
  },
  isPriorityQuote: (quoteId: string): boolean => {
    return storage.getPriorityQuoteIds().includes(quoteId);
  },

  // —— Science Lab mastery (per subject) ——
  getScienceLabMastery: (): Record<ScienceSubject, ScienceLabMastery> => {
    const data = localStorage.getItem(STORAGE_KEYS.SCIENCE_LAB_MASTERY);
    return data ? JSON.parse(data) : {};
  },
  getScienceLabMasteryBySubject: (subject: ScienceSubject): ScienceLabMastery | undefined => {
    return storage.getScienceLabMastery()[subject];
  },
  saveScienceLabMastery: (mastery: ScienceLabMastery): void => {
    const all = storage.getScienceLabMastery();
    all[mastery.subject] = mastery;
    localStorage.setItem(STORAGE_KEYS.SCIENCE_LAB_MASTERY, JSON.stringify(all));
  },
  /** Update mastery for a concept (only increases on correct answers) */
  updateConceptMastery: (subject: ScienceSubject, conceptId: string, isCorrect: boolean): void => {
    const existing = storage.getScienceLabMasteryBySubject(subject);
    const conceptMastery = { ...(existing?.conceptMastery ?? {}) };
    if (isCorrect) {
      conceptMastery[conceptId] = Math.min(5, (conceptMastery[conceptId] ?? 0) + 1);
    }
    const mastery: ScienceLabMastery = {
      subject,
      conceptMastery,
      equationMastery: existing?.equationMastery ?? {},
      practicalMastery: existing?.practicalMastery ?? {},
      questionTypeMastery: existing?.questionTypeMastery ?? {
        shortAnswer: 0,
        calculation: 0,
        explanation: 0,
        practical: 0,
        graph: 0,
        mixed: 0,
      },
      topicMastery: existing?.topicMastery ?? {},
      lastUpdated: new Date().toISOString(),
    };
    storage.saveScienceLabMastery(mastery);
  },
  /** Update mastery for an equation */
  updateEquationMastery: (subject: ScienceSubject, equationId: string, isCorrect: boolean): void => {
    const existing = storage.getScienceLabMasteryBySubject(subject);
    const equationMastery = { ...(existing?.equationMastery ?? {}) };
    if (isCorrect) {
      equationMastery[equationId] = Math.min(5, (equationMastery[equationId] ?? 0) + 1);
    }
    const mastery: ScienceLabMastery = {
      subject,
      conceptMastery: existing?.conceptMastery ?? {},
      equationMastery,
      practicalMastery: existing?.practicalMastery ?? {},
      questionTypeMastery: existing?.questionTypeMastery ?? {
        shortAnswer: 0,
        calculation: 0,
        explanation: 0,
        practical: 0,
        graph: 0,
        mixed: 0,
      },
      topicMastery: existing?.topicMastery ?? {},
      lastUpdated: new Date().toISOString(),
    };
    storage.saveScienceLabMastery(mastery);
  },

  // —— Science Lab sessions ——
  getScienceLabSessions: (): ScienceLabSession[] => {
    const data = localStorage.getItem(STORAGE_KEYS.SCIENCE_LAB_SESSIONS);
    return data ? JSON.parse(data) : [];
  },
  saveScienceLabSession: (session: ScienceLabSession): void => {
    const sessions = storage.getScienceLabSessions();
    sessions.push(session);
    localStorage.setItem(STORAGE_KEYS.SCIENCE_LAB_SESSIONS, JSON.stringify(sessions));
  },
  getScienceLabSessionById: (id: string): ScienceLabSession | undefined => {
    return storage.getScienceLabSessions().find(s => s.id === id);
  },

  // —— Flashcard Mastery Tracking ——
  getFlashcardMastery: (): Record<string, FlashcardMastery> => {
    const data = localStorage.getItem(STORAGE_KEYS.SCIENCE_LAB_FLASHCARD_MASTERY);
    return data ? JSON.parse(data) : {};
  },
  getFlashcardMasteryById: (flashcardId: string): FlashcardMastery | undefined => {
    return storage.getFlashcardMastery()[flashcardId];
  },
  updateFlashcardMastery: (
    flashcardId: string,
    confidenceLevel: ConfidenceLevel,
    viewed: boolean = true
  ): void => {
    const all = storage.getFlashcardMastery();
    const existing = all[flashcardId] || {
      flashcardId,
      confidenceLevel: 1,
      timesViewed: 0,
      timesConfident: 0,
      lastViewed: '',
      nextReviewDate: '',
      masteryPercent: 0,
    };

    if (viewed) {
      existing.timesViewed += 1;
      existing.lastViewed = new Date().toISOString();
    }

    existing.confidenceLevel = confidenceLevel;
    if (confidenceLevel === 3) {
      existing.timesConfident += 1;
    }

    // Calculate mastery: based on confidence and consistency
    const confidenceWeight = confidenceLevel === 3 ? 0.7 : confidenceLevel === 2 ? 0.4 : 0.1;
    const consistencyWeight = Math.min(existing.timesConfident / 3, 0.3);
    existing.masteryPercent = Math.min(100, Math.round((confidenceWeight + consistencyWeight) * 100));

    // Set next review date (spaced repetition)
    const daysUntilReview = confidenceLevel === 3 ? 7 : confidenceLevel === 2 ? 3 : 1;
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + daysUntilReview);
    existing.nextReviewDate = nextReview.toISOString();

    all[flashcardId] = existing;
    localStorage.setItem(STORAGE_KEYS.SCIENCE_LAB_FLASHCARD_MASTERY, JSON.stringify(all));
  },

  // —— Topic Mastery (for gating quiz access) ——
  getTopicMastery: (): Record<string, TopicMastery> => {
    const data = localStorage.getItem(STORAGE_KEYS.SCIENCE_LAB_TOPIC_MASTERY);
    return data ? JSON.parse(data) : {};
  },
  getTopicMasteryByKey: (
    subject: ScienceSubject,
    paper: number,
    tier: string,
    topic: string
  ): TopicMastery | undefined => {
    const key = `${subject}-${paper}-${tier}-${topic}`;
    return storage.getTopicMastery()[key];
  },
  updateTopicMastery: (
    subject: ScienceSubject,
    paper: number,
    tier: string,
    topic: string,
    flashcardMastery: number,
    quickCheckPassed?: boolean
  ): void => {
    const all = storage.getTopicMastery();
    const key = `${subject}-${paper}-${tier}-${topic}`;
    const existing = all[key] || {
      subject,
      paper: paper as 1 | 2,
      tier: tier as 'Foundation' | 'Higher',
      topic,
      flashcardMastery: 0,
      quickCheckPassed: false,
      quizUnlocked: false,
      lastUpdated: new Date().toISOString(),
    };

    existing.flashcardMastery = flashcardMastery;
    if (quickCheckPassed !== undefined) {
      existing.quickCheckPassed = quickCheckPassed;
    }

    // Unlock quiz if flashcard mastery >= 70% and quick check passed
    existing.quizUnlocked = existing.flashcardMastery >= 70 && existing.quickCheckPassed;
    existing.lastUpdated = new Date().toISOString();

    all[key] = existing;
    localStorage.setItem(STORAGE_KEYS.SCIENCE_LAB_TOPIC_MASTERY, JSON.stringify(all));
  },
  calculateTopicFlashcardMastery: (
    subject: ScienceSubject,
    paper: number,
    tier: string,
    topic: string,
    flashcardIds: string[]
  ): number => {
    const mastery = storage.getFlashcardMastery();
    const topicFlashcards = flashcardIds.filter(id => {
      const cardMastery = mastery[id];
      return cardMastery;
    });

    if (topicFlashcards.length === 0) return 0;

    const totalMastery = topicFlashcards.reduce((sum, id) => {
      return sum + (mastery[id]?.masteryPercent || 0);
    }, 0);

    return Math.round(totalMastery / topicFlashcards.length);
  },

  // —— Business Hub ——
  getBusinessTopicProgress: (): Record<string, BusinessTopicProgress> => {
    const data = localStorage.getItem(STORAGE_KEYS.BUSINESS_HUB_TOPIC_PROGRESS);
    return data ? JSON.parse(data) : {};
  },
  getBusinessTopicProgressByKey: (unitId: BusinessUnitId, topicId: string): BusinessTopicProgress | undefined => {
    const key = `${unitId}-${topicId}`;
    return storage.getBusinessTopicProgress()[key];
  },
  updateBusinessTopicProgress: (progress: BusinessTopicProgress): void => {
    const all = storage.getBusinessTopicProgress();
    const key = `${progress.unitId}-${progress.topicId}`;
    progress.lastUpdated = new Date().toISOString();
    all[key] = progress;
    localStorage.setItem(STORAGE_KEYS.BUSINESS_HUB_TOPIC_PROGRESS, JSON.stringify(all));
  },
  getBusinessFlashcardMastery: (): Record<string, BusinessFlashcardMastery> => {
    const data = localStorage.getItem(STORAGE_KEYS.BUSINESS_HUB_FLASHCARD_MASTERY);
    return data ? JSON.parse(data) : {};
  },
  updateBusinessFlashcardMastery: (termId: string, confidenceLevel: BusinessConfidenceLevel): void => {
    const all = storage.getBusinessFlashcardMastery();
    const existing = all[termId] || {
      termId,
      confidenceLevel: 1 as BusinessConfidenceLevel,
      timesViewed: 0,
      timesConfident: 0,
      lastViewed: '',
      masteryPercent: 0,
    };
    existing.timesViewed += 1;
    existing.lastViewed = new Date().toISOString();
    existing.confidenceLevel = confidenceLevel;
    if (confidenceLevel === 3) existing.timesConfident += 1;
    const confidenceWeight = confidenceLevel === 3 ? 0.7 : confidenceLevel === 2 ? 0.4 : 0.1;
    const consistencyWeight = Math.min(existing.timesConfident / 3, 0.3);
    existing.masteryPercent = Math.min(100, Math.round((confidenceWeight + consistencyWeight) * 100));
    all[termId] = existing;
    localStorage.setItem(STORAGE_KEYS.BUSINESS_HUB_FLASHCARD_MASTERY, JSON.stringify(all));
  },
  calculateBusinessTopicFlashcardMastery: (unitId: BusinessUnitId, topicId: string, termIds: string[]): number => {
    const mastery = storage.getBusinessFlashcardMastery();
    if (termIds.length === 0) return 0;
    const total = termIds.reduce((sum, id) => sum + (mastery[id]?.masteryPercent ?? 0), 0);
    return Math.round(total / termIds.length);
  },

  /** Mark all topics in unit as case study completed (call when user finishes Case Study flow). */
  markUnitCaseStudyCompleted: (unitId: BusinessUnitId, topicIds: string[]): void => {
    const all = storage.getBusinessTopicProgress();
    const now = new Date().toISOString();
    topicIds.forEach((topicId) => {
      const key = `${unitId}-${topicId}`;
      const existing = all[key];
      all[key] = {
        unitId,
        topicId,
        flashcardMasteryPercent: existing?.flashcardMasteryPercent ?? 0,
        quickCheckPassed: existing?.quickCheckPassed ?? false,
        caseStudyCompleted: true,
        calculationsCompleted: existing?.calculationsCompleted ?? false,
        evaluationCompleted: existing?.evaluationCompleted ?? false,
        lastUpdated: now,
      };
    });
    localStorage.setItem(STORAGE_KEYS.BUSINESS_HUB_TOPIC_PROGRESS, JSON.stringify(all));
  },

  /** Mark all topics in unit as calculations completed (call when user finishes Calculation Lab flow). */
  markUnitCalculationsCompleted: (unitId: BusinessUnitId, topicIds: string[]): void => {
    const all = storage.getBusinessTopicProgress();
    const now = new Date().toISOString();
    topicIds.forEach((topicId) => {
      const key = `${unitId}-${topicId}`;
      const existing = all[key];
      all[key] = {
        unitId,
        topicId,
        flashcardMasteryPercent: existing?.flashcardMasteryPercent ?? 0,
        quickCheckPassed: existing?.quickCheckPassed ?? false,
        caseStudyCompleted: existing?.caseStudyCompleted ?? false,
        calculationsCompleted: true,
        evaluationCompleted: existing?.evaluationCompleted ?? false,
        lastUpdated: now,
      };
    });
    localStorage.setItem(STORAGE_KEYS.BUSINESS_HUB_TOPIC_PROGRESS, JSON.stringify(all));
  },

  /** Mark all topics in unit as evaluation completed (call when user finishes Evaluation flow). */
  markUnitEvaluationCompleted: (unitId: BusinessUnitId, topicIds: string[]): void => {
    const all = storage.getBusinessTopicProgress();
    const now = new Date().toISOString();
    topicIds.forEach((topicId) => {
      const key = `${unitId}-${topicId}`;
      const existing = all[key];
      all[key] = {
        unitId,
        topicId,
        flashcardMasteryPercent: existing?.flashcardMasteryPercent ?? 0,
        quickCheckPassed: existing?.quickCheckPassed ?? false,
        caseStudyCompleted: existing?.caseStudyCompleted ?? false,
        calculationsCompleted: existing?.calculationsCompleted ?? false,
        evaluationCompleted: true,
        lastUpdated: now,
      };
    });
    localStorage.setItem(STORAGE_KEYS.BUSINESS_HUB_TOPIC_PROGRESS, JSON.stringify(all));
  },

  /** Quick Check: count topics in unit that have passed. */
  getBusinessUnitQuickCheckSummary: (unitId: BusinessUnitId, topicIds: string[]): { passed: number; total: number } => {
    const all = storage.getBusinessTopicProgress();
    const total = topicIds.length;
    const passed = topicIds.filter((topicId) => all[`${unitId}-${topicId}`]?.quickCheckPassed).length;
    return { passed, total };
  },

  /** Case Study Lab unlocked when at least one topic in unit has quickCheckPassed. */
  isBusinessCaseStudyUnlocked: (unitId: BusinessUnitId, topicIds: string[]): boolean => {
    const { passed } = storage.getBusinessUnitQuickCheckSummary(unitId, topicIds);
    return passed > 0;
  },

  /** Calculations unlocked when at least one topic has caseStudyCompleted. */
  isBusinessCalculationsUnlocked: (unitId: BusinessUnitId, topicIds: string[]): boolean => {
    const all = storage.getBusinessTopicProgress();
    return topicIds.some((topicId) => all[`${unitId}-${topicId}`]?.caseStudyCompleted);
  },

  /** Evaluation unlocked when at least one topic has calculationsCompleted. */
  isBusinessEvaluationUnlocked: (unitId: BusinessUnitId, topicIds: string[]): boolean => {
    const all = storage.getBusinessTopicProgress();
    return topicIds.some((topicId) => all[`${unitId}-${topicId}`]?.calculationsCompleted);
  },

  // —— History Hub ——
  getHistoryOptionSelection: (): HistoryOptionSelection | null => {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY_HUB_OPTIONS);
    return data ? JSON.parse(data) : null;
  },
  setHistoryOptionSelection: (selection: HistoryOptionSelection): void => {
    localStorage.setItem(STORAGE_KEYS.HISTORY_HUB_OPTIONS, JSON.stringify(selection));
  },
  getHistoryPartProgress: (): Record<string, HistoryPartProgress> => {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY_HUB_PART_PROGRESS);
    return data ? JSON.parse(data) : {};
  },
  getHistoryPartProgressByKey: (optionKey: string, partId: string): HistoryPartProgress | undefined => {
    const key = `${optionKey}-${partId}`;
    return storage.getHistoryPartProgress()[key];
  },
  updateHistoryPartProgress: (progress: HistoryPartProgress): void => {
    const all = storage.getHistoryPartProgress();
    const key = `${progress.optionKey}-${progress.partId}`;
    all[key] = progress;
    localStorage.setItem(STORAGE_KEYS.HISTORY_HUB_PART_PROGRESS, JSON.stringify(all));
  },
  getHistoryFlashcardMastery: (): Record<string, HistoryFlashcardMastery> => {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY_HUB_FLASHCARD_MASTERY);
    return data ? JSON.parse(data) : {};
  },
  updateHistoryFlashcardMastery: (termId: string, optionKey: string, partId: string, confidence: HistoryConfidenceLevel): void => {
    const all = storage.getHistoryFlashcardMastery();
    all[termId] = { termId, optionKey, partId, confidence, lastSeen: Date.now() };
    localStorage.setItem(STORAGE_KEYS.HISTORY_HUB_FLASHCARD_MASTERY, JSON.stringify(all));
  },
  getHistoryFactorEssayDraft: (questionId: string): HistoryFactorEssayDraft | undefined => {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY_HUB_FACTOR_ESSAY_DRAFTS);
    const map: Record<string, HistoryFactorEssayDraft> = data ? JSON.parse(data) : {};
    return map[questionId];
  },
  setHistoryFactorEssayDraft: (draft: HistoryFactorEssayDraft): void => {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY_HUB_FACTOR_ESSAY_DRAFTS);
    const map: Record<string, HistoryFactorEssayDraft> = data ? JSON.parse(data) : {};
    map[draft.questionId] = { ...draft, updatedAt: Date.now() };
    localStorage.setItem(STORAGE_KEYS.HISTORY_HUB_FACTOR_ESSAY_DRAFTS, JSON.stringify(map));
  },

  // —— Religious Studies Hub ——
  getRSOptionSelection: (): ReligiousStudiesOptionSelection | null => {
    const data = localStorage.getItem(STORAGE_KEYS.RS_HUB_OPTIONS);
    return data ? JSON.parse(data) : null;
  },
  setRSOptionSelection: (selection: ReligiousStudiesOptionSelection): void => {
    localStorage.setItem(STORAGE_KEYS.RS_HUB_OPTIONS, JSON.stringify(selection));
  },
  getRSFlashcardMastery: (): Record<string, RSFlashcardMastery> => {
    const data = localStorage.getItem(STORAGE_KEYS.RS_HUB_FLASHCARD_MASTERY);
    return data ? JSON.parse(data) : {};
  },
  updateRSFlashcardMastery: (cardId: string, religionId: string | undefined, themeId: string | undefined, confidence: RSConfidenceLevel): void => {
    const all = storage.getRSFlashcardMastery();
    all[cardId] = { cardId, religionId: religionId as never, themeId: themeId as never, confidence, lastSeen: Date.now() };
    localStorage.setItem(STORAGE_KEYS.RS_HUB_FLASHCARD_MASTERY, JSON.stringify(all));
  },
  getRSPartProgress: (): Record<string, { beliefLabViewed?: boolean; quickCheckPassed?: boolean; shortAnswerCompleted?: boolean; extendedWritingCompleted?: boolean }> => {
    const data = localStorage.getItem(STORAGE_KEYS.RS_HUB_PART_PROGRESS);
    return data ? JSON.parse(data) : {};
  },
  updateRSPartProgress: (key: string, progress: Partial<{ beliefLabViewed: boolean; quickCheckPassed: boolean; shortAnswerCompleted: boolean; extendedWritingCompleted: boolean }>): void => {
    const all = storage.getRSPartProgress();
    all[key] = { ...(all[key] || {}), ...progress };
    localStorage.setItem(STORAGE_KEYS.RS_HUB_PART_PROGRESS, JSON.stringify(all));
  },

  // —— Geography Hub ——
  getGeographyOptionSelection: (): GeographyOptionSelection | null => {
    const data = localStorage.getItem(STORAGE_KEYS.GEOGRAPHY_HUB_OPTIONS);
    return data ? JSON.parse(data) : null;
  },
  setGeographyOptionSelection: (selection: GeographyOptionSelection): void => {
    localStorage.setItem(STORAGE_KEYS.GEOGRAPHY_HUB_OPTIONS, JSON.stringify(selection));
  },
  getGeographySectionProgress: (): Record<string, GeographySectionProgress> => {
    const data = localStorage.getItem(STORAGE_KEYS.GEOGRAPHY_HUB_SECTION_PROGRESS);
    return data ? JSON.parse(data) : {};
  },
  getGeographySectionProgressByKey: (sectionId: string): GeographySectionProgress | undefined => {
    return storage.getGeographySectionProgress()[sectionId];
  },
  updateGeographySectionProgress: (progress: GeographySectionProgress): void => {
    const all = storage.getGeographySectionProgress();
    all[progress.sectionId] = progress;
    localStorage.setItem(STORAGE_KEYS.GEOGRAPHY_HUB_SECTION_PROGRESS, JSON.stringify(all));
  },
  getGeographyFlashcardMastery: (): Record<string, GeographyFlashcardMastery> => {
    const data = localStorage.getItem(STORAGE_KEYS.GEOGRAPHY_HUB_FLASHCARD_MASTERY);
    return data ? JSON.parse(data) : {};
  },
  updateGeographyFlashcardMastery: (termId: string, sectionId: string, confidence: GeographyConfidenceLevel): void => {
    const all = storage.getGeographyFlashcardMastery();
    all[termId] = { termId, sectionId: sectionId as GeographyFlashcardMastery['sectionId'], confidence, lastSeen: Date.now() };
    localStorage.setItem(STORAGE_KEYS.GEOGRAPHY_HUB_FLASHCARD_MASTERY, JSON.stringify(all));
  },
};

export const calculateMasteryLevel = (
  accuracyPct: number,
  timeTakenSec: number,
  targetTimeSec: number,
  gaveUp: boolean = false
): { level: 0 | 1 | 2 | 3 | 4; label: string; color: string } => {
  if (gaveUp || accuracyPct < 85) {
    return {
      level: 1,
      label: 'Learning',
      color: 'text-orange-500',
    };
  }

  if (accuracyPct === 100) {
    if (timeTakenSec <= targetTimeSec) {
      return { level: 4, label: 'Grade 9 Speed', color: 'text-purple-500' };
    }
    return { level: 3, label: 'Mastered', color: 'text-green-500' };
  }

  return { level: 2, label: 'Secure', color: 'text-yellow-500' };
};
