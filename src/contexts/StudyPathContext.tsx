/**
 * Smart Study Path – student preferences, gap analysis, spaced review, adaptive pacing
 * Part of the Grade 9 Design Plan: onboarding, option choices, time-to-exam, weak topics
 */
import React, { createContext, useContext, useCallback, useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export type StudyPathSubject = string;
export type StudyPathOption = Record<string, string[]>; // e.g. { geography: ['coastal', 'river'], history: ['norman'] }

export interface StudyPathState {
  /** Exam date (ISO string) for countdown and pacing */
  examDate: string | null;
  /** Subjects the student is studying */
  subjects: StudyPathSubject[];
  /** Option choices per subject (Geography landscapes, History options, RS religions, etc.) */
  options: StudyPathOption;
  /** Weak topic IDs (from diagnostics / quick checks) – used for Interleave Roulette */
  weakTopics: string[];
  /** Items due for spaced review today (concept/question IDs) */
  spacedDueToday: string[];
  /** Last diagnostic date per subject */
  lastDiagnostic: Record<string, string>;
  /** Daily target minutes per subject */
  dailyMinutes: Record<string, number>;
}

const DEFAULT_STATE: StudyPathState = {
  examDate: null,
  subjects: [],
  options: {},
  weakTopics: [],
  spacedDueToday: [],
  lastDiagnostic: {},
  dailyMinutes: {},
};

const STORAGE_KEY = 'therace_study_path';

function loadState(): StudyPathState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<StudyPathState>;
      return { ...DEFAULT_STATE, ...parsed };
    }
  } catch (_) {}
  return { ...DEFAULT_STATE };
}

function saveState(state: StudyPathState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (_) {}
}

interface StudyPathContextValue extends StudyPathState {
  setExamDate: (date: string | null) => void;
  setSubjects: (subjects: StudyPathSubject[]) => void;
  setOptions: (options: StudyPathOption) => void;
  addWeakTopic: (topicId: string) => void;
  removeWeakTopic: (topicId: string) => void;
  setWeakTopics: (topics: string[]) => void;
  addSpacedDue: (id: string) => void;
  removeSpacedDue: (id: string) => void;
  setLastDiagnostic: (subject: string, date: string) => void;
  setDailyMinutes: (subject: string, minutes: number) => void;
  /** Days until exam */
  daysUntilExam: number | null;
  /** Suggested daily minutes based on time-to-exam (total across subjects) */
  suggestedDailyMinutes: number;
  /** Pick a random weak topic for Interleave Roulette */
  pickRandomWeakTopic: () => string | null;
}

const StudyPathContext = createContext<StudyPathContextValue | null>(null);

export function StudyPathProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StudyPathState>(loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const setExamDate = useCallback((examDate: string | null) => {
    setState(s => ({ ...s, examDate }));
  }, []);

  const setSubjects = useCallback((subjects: StudyPathSubject[]) => {
    setState(s => ({ ...s, subjects }));
  }, []);

  const setOptions = useCallback((options: StudyPathOption) => {
    setState(s => ({ ...s, options }));
  }, []);

  const addWeakTopic = useCallback((topicId: string) => {
    setState(s => ({
      ...s,
      weakTopics: s.weakTopics.includes(topicId) ? s.weakTopics : [...s.weakTopics, topicId],
    }));
  }, []);

  const removeWeakTopic = useCallback((topicId: string) => {
    setState(s => ({ ...s, weakTopics: s.weakTopics.filter(t => t !== topicId) }));
  }, []);

  const setWeakTopics = useCallback((topics: string[]) => {
    setState(s => ({ ...s, weakTopics: topics }));
  }, []);

  const addSpacedDue = useCallback((id: string) => {
    setState(s => ({
      ...s,
      spacedDueToday: s.spacedDueToday.includes(id) ? s.spacedDueToday : [...s.spacedDueToday, id],
    }));
  }, []);

  const removeSpacedDue = useCallback((id: string) => {
    setState(s => ({ ...s, spacedDueToday: s.spacedDueToday.filter(x => x !== id) }));
  }, []);

  const setLastDiagnostic = useCallback((subject: string, date: string) => {
    setState(s => ({ ...s, lastDiagnostic: { ...s.lastDiagnostic, [subject]: date } }));
  }, []);

  const setDailyMinutes = useCallback((subject: string, minutes: number) => {
    setState(s => ({ ...s, dailyMinutes: { ...s.dailyMinutes, [subject]: minutes } }));
  }, []);

  const daysUntilExam = state.examDate
    ? Math.max(0, Math.ceil((new Date(state.examDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null;

  const suggestedDailyMinutes = state.examDate && daysUntilExam != null && daysUntilExam > 0
    ? Math.min(120, Math.max(20, Math.ceil(600 / daysUntilExam)))
    : 45;

  const pickRandomWeakTopic = useCallback(() => {
    if (state.weakTopics.length === 0) return null;
    return state.weakTopics[Math.floor(Math.random() * state.weakTopics.length)];
  }, [state.weakTopics]);

  const value: StudyPathContextValue = {
    ...state,
    setExamDate,
    setSubjects,
    setOptions,
    addWeakTopic,
    removeWeakTopic,
    setWeakTopics,
    addSpacedDue,
    removeSpacedDue,
    setLastDiagnostic,
    setDailyMinutes,
    daysUntilExam,
    suggestedDailyMinutes,
    pickRandomWeakTopic,
  };

  return (
    <StudyPathContext.Provider value={value}>
      {children}
    </StudyPathContext.Provider>
  );
}

export function useStudyPath() {
  const ctx = useContext(StudyPathContext);
  return ctx;
}
