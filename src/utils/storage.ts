import { Attempt, MasteryState, StreakState, UserProfile } from '../types';
import type {
  EnglishWritingDraft,
  EnglishWritingStreak,
  EnglishTargets,
  EnglishContinueState,
} from '../types/englishCampus';

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
