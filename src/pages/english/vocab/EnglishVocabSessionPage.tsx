import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { Zap, SkipForward, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { vocabApi, getCurrentUserId } from '../../../utils/vocab';
import { selectSessionWords, applySessionLength } from '../../../utils/vocab/session';
import type { VocabSessionConfig, VocabSessionItem, VocabSessionResult, VocabQuestionResult } from '../../../types/vocab';
import type { VocabWord } from '../../../types/vocab';
import { soundSystem } from '../../../utils/sounds';

const WORD_CLASS_LABELS: Record<string, string> = {
  noun: 'n.',
  verb: 'v.',
  adj: 'adj.',
  adv: 'adv.',
  other: 'other',
};

export function EnglishVocabSessionPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const state = location.state as { setIds?: string[]; length?: 10 | 20 | 40 | 'mastery_sprint'; mode?: import('../../../types/vocab').VocabAttemptMode; isFixIt?: boolean; weakOnly?: boolean } | null;
  const isFixIt = searchParams.get('mode') === 'fixit' || state?.isFixIt;
  const sprint = searchParams.get('sprint') === '1';
  const weakOnly = state?.weakOnly ?? false;

  const [phase, setPhase] = useState<'loading' | 'ready' | 'active' | 'ended'>('loading');
  const [userId, setUserId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [items, setItems] = useState<VocabSessionItem[]>([]);
  const [config, setConfig] = useState<VocabSessionConfig | null>(null);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'near' | 'wrong' | null>(null);
  const [streak, setStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [masteryGained, setMasteryGained] = useState(0);
  const [results, setResults] = useState<VocabQuestionResult[]>([]);
  const [fixItAdditions, setFixItAdditions] = useState<string[]>([]);
  const [startedAt, setStartedAt] = useState<string | null>(null);
  const [questionStartMs, setQuestionStartMs] = useState(0);
  const [paused, setPaused] = useState(false);
  const [selectedDefinitionId, setSelectedDefinitionId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentItem = items[index];
  const total = items.length;

  const loadSession = useCallback(async () => {
    const uid = await getCurrentUserId();
    setUserId(uid);

    if (isFixIt && uid) {
      const queue = await vocabApi.getFixItQueue(uid);
      if (queue.length === 0) {
        setPhase('ended');
        return;
      }
      const words: VocabWord[] = [];
      for (const e of queue) {
        const w = await vocabApi.getWord(e.word_id);
        if (w) words.push(w);
      }
      const fixItItems: VocabSessionItem[] = words.map(w => ({ word: w, mastery: null }));
      setItems(fixItItems);
      setConfig({
        setIds: [],
        length: fixItItems.length as 10,
        mode: 'spell',
        isFixIt: true,
      });
      setPhase('ready');
      return;
    }

    const setIds = state?.setIds ?? [];
    const length = state?.length ?? (sprint ? 'mastery_sprint' : 10);
    const mode = state?.mode ?? 'spell';
    if (setIds.length === 0) {
      setPhase('ready');
      setItems([]);
      setConfig(null);
      return;
    }

    const [words, masteryList] = uid
      ? await Promise.all([
          vocabApi.getWordsBySetIds(setIds),
          vocabApi.getMasteryForUserAllWords(uid),
        ])
      : [await vocabApi.getWordsBySetIds(setIds), []];
    const masteryMap = new Map(masteryList.map(m => [m.word_id, m]));
    const limit = length === 'mastery_sprint' ? 25 : length;
    const selected = selectSessionWords(words, masteryMap, Math.min(limit, words.length), new Date(), weakOnly);
    const applied = applySessionLength(selected, length);
    setItems(applied);
    setConfig({
      setIds,
      length,
      mode,
      weakOnly: weakOnly || undefined,
    });
    setPhase('ready');
  }, [isFixIt, sprint, weakOnly, state?.setIds, state?.length, state?.mode]);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  const startSession = () => {
    if (items.length === 0) return;
    setSessionId(crypto.randomUUID());
    setStartedAt(new Date().toISOString());
    setQuestionStartMs(Date.now());
    setPhase('active');
    setIndex(0);
    setInput('');
    setFeedback(null);
    setStreak(0);
    setCorrectCount(0);
    setMasteryGained(0);
    setResults([]);
    setFixItAdditions([]);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const submit = useCallback(async () => {
    if (!currentItem || feedback !== null || !config) return;
    const word = currentItem.word;
    const mode = config.mode;
    let raw = input.trim();
    if (mode === 'definition') raw = selectedDefinitionId ?? '';
    if (!raw && mode !== 'definition') return;
    if (mode === 'definition' && !selectedDefinitionId) return;

    const timeMs = Date.now() - questionStartMs;
    let isCorrect = false;
    let nearMiss = false;
    let delta = 0;
    let addedToFixIt = false;

    if (mode === 'spell') {
      if (userId) {
        try {
          const res = await vocabApi.submitSpellAttempt(userId, word, raw, timeMs);
          isCorrect = res.isCorrect;
          nearMiss = res.nearMiss;
          delta = res.masteryDelta;
          addedToFixIt = res.addedToFixIt;
          if (config?.isFixIt && isCorrect) {
            await vocabApi.removeFromFixItAndBoost(userId, word.id);
          }
        } catch (e) {
          console.error(e);
        }
      } else {
        const { gradeSpellAttempt } = await import('../../../utils/vocab/grading');
        const g = gradeSpellAttempt(raw, word.word);
        isCorrect = g.isCorrect;
        nearMiss = g.nearMiss;
        delta = isCorrect ? 8 : (nearMiss ? 2 : -10);
        addedToFixIt = !isCorrect || nearMiss;
      }
    } else if (mode === 'definition') {
      isCorrect = raw === word.definition;
      delta = isCorrect ? 8 : -10;
      addedToFixIt = !isCorrect;
    } else if (mode === 'use_in_sentence') {
      const lower = raw.toLowerCase();
      const wordLower = word.word.toLowerCase();
      isCorrect = lower.includes(wordLower) && raw.length >= 10;
      delta = isCorrect ? 8 : -5;
      addedToFixIt = false;
    } else if (mode === 'upgrade') {
      const userWord = raw.toLowerCase().trim();
      const synonyms = word.synonyms.map(s => s.toLowerCase());
      isCorrect = synonyms.some(s => s === userWord) || userWord === word.word;
      delta = isCorrect ? 8 : -5;
      addedToFixIt = false;
    }

    setFeedback(isCorrect ? 'correct' : (nearMiss ? 'near' : 'wrong'));
    setResults(prev => [...prev, {
      wordId: word.id,
      word: word.word,
      isCorrect,
      nearMiss,
      userInput: raw,
      timeMs,
      masteryDelta: delta,
      addedToFixIt,
    }]);
    if (isCorrect) {
      setCorrectCount(c => c + 1);
      setStreak(s => s + 1);
      setMasteryGained(m => m + delta);
      if (soundSystem?.playCorrect) soundSystem.playCorrect();
    } else {
      setStreak(0);
      setMasteryGained(m => m + delta);
      if (addedToFixIt) setFixItAdditions(f => [...f, word.word]);
      if (soundSystem?.playWrong) soundSystem.playWrong();
    }

    const nextIndex = index + 1;
    const shouldEndSprint = config.length === 'mastery_sprint' && isCorrect && streak + 1 >= 5;
    const reachedEnd = nextIndex >= total;

    if (shouldEndSprint || reachedEnd) {
      const finalResults = [...results, {
        wordId: word.id,
        word: word.word,
        isCorrect,
        nearMiss,
        userInput: raw,
        timeMs,
        masteryDelta: delta,
        addedToFixIt,
      }];
      let maxStreak = 0, s = 0;
      for (const r of finalResults) {
        if (r.isCorrect) { s++; maxStreak = Math.max(maxStreak, s); } else s = 0;
      }
      setTimeout(() => {
        const result: VocabSessionResult = {
          sessionId: sessionId!,
          startedAt: startedAt!,
          completedAt: new Date().toISOString(),
          config: config!,
          totalQuestions: total,
          correct: finalResults.filter(r => r.isCorrect).length,
          nearMisses: finalResults.filter(r => r.nearMiss).length,
          maxStreak,
          masteryGained: masteryGained + delta,
          results: finalResults,
          fixItAdditions: [...fixItAdditions, ...(addedToFixIt ? [word.word] : [])],
          masteredWordIds: [],
        };
        navigate(`/english-campus/vocab/results/${sessionId}`, { state: { result }, replace: true });
      }, 1500);
      return;
    }

    setTimeout(() => {
    setIndex(nextIndex);
    setInput('');
    setSelectedDefinitionId(null);
    setFeedback(null);
    setQuestionStartMs(Date.now());
    setTimeout(() => inputRef.current?.focus(), 50);
  }, 1500);
  }, [currentItem, input, selectedDefinitionId, feedback, config, index, total, userId, sessionId, startedAt, streak, correctCount, masteryGained, results, fixItAdditions, questionStartMs]);

  const skipWord = useCallback(() => {
    if (!currentItem || feedback !== null || !config) return;
    const word = currentItem.word;
    setResults(prev => [...prev, {
      wordId: word.id,
      word: word.word,
      isCorrect: false,
      nearMiss: false,
      userInput: '(skipped)',
      timeMs: Date.now() - questionStartMs,
      masteryDelta: 0,
      addedToFixIt: false,
    }]);
    setStreak(0);
    const nextIndex = index + 1;
    const reachedEnd = nextIndex >= total;
    if (reachedEnd) {
      const finalResults = [...results, { wordId: word.id, word: word.word, isCorrect: false, nearMiss: false, userInput: '(skipped)', timeMs: Date.now() - questionStartMs, masteryDelta: 0, addedToFixIt: false }];
      let maxStreak = 0, s = 0;
      for (const r of finalResults) {
        if (r.isCorrect) { s++; maxStreak = Math.max(maxStreak, s); } else s = 0;
      }
      const result: VocabSessionResult = {
        sessionId: sessionId!,
        startedAt: startedAt!,
        completedAt: new Date().toISOString(),
        config: config!,
        totalQuestions: total,
        correct: correctCount,
        nearMisses: finalResults.filter(r => r.nearMiss).length,
        maxStreak,
        masteryGained,
        results: finalResults,
        fixItAdditions,
        masteredWordIds: [],
      };
      navigate(`/english-campus/vocab/results/${sessionId}`, { state: { result }, replace: true });
      return;
    }
    setIndex(nextIndex);
    setInput('');
    setSelectedDefinitionId(null);
    setQuestionStartMs(Date.now());
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [currentItem, feedback, config, index, total, results, correctCount, masteryGained, fixItAdditions, sessionId, startedAt, questionStartMs, navigate]);

  const giveUp = useCallback(() => {
    if (!config) return;
    const finalResults = results;
    let maxStreak = 0, s = 0;
    for (const r of finalResults) {
      if (r.isCorrect) { s++; maxStreak = Math.max(maxStreak, s); } else s = 0;
    }
    const result: VocabSessionResult = {
      sessionId: sessionId!,
      startedAt: startedAt!,
      completedAt: new Date().toISOString(),
      config: config!,
      totalQuestions: total,
      correct: correctCount,
      nearMisses: finalResults.filter(r => r.nearMiss).length,
      maxStreak,
      masteryGained,
      results: finalResults,
      fixItAdditions,
      masteredWordIds: [],
    };
    navigate(`/english-campus/vocab/results/${sessionId}`, { state: { result }, replace: true });
  }, [config, results, correctCount, masteryGained, fixItAdditions, sessionId, startedAt, total, navigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase !== 'active') return;
      if (e.key === 'Escape') {
        setPaused(true);
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        submit();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, submit]);

  if (phase === 'loading') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (phase === 'ready') {
    if (items.length === 0) {
      return (
        <div className="max-w-2xl mx-auto space-y-6 p-6">
          <p style={{ color: 'rgb(var(--text-secondary))' }}>
            {isFixIt ? 'No words in your Fix-It queue.' : 'Select a set from the library to start.'}
          </p>
          <button
            type="button"
            onClick={() => navigate('/english-campus/vocab')}
            className="px-4 py-2 rounded-lg font-medium"
            style={{ background: 'rgb(var(--accent))', color: 'white' }}
          >
            Back to Vocab Lab
          </button>
        </div>
      );
    }
    return (
      <div className="max-w-2xl mx-auto space-y-6 p-6">
        <p style={{ color: 'rgb(var(--text))' }}>
          {items.length} word{items.length !== 1 ? 's' : ''} ready.
          {config?.length === 'mastery_sprint' && ' End after 5 correct in a row or 25 questions.'}
        </p>
        <button
          type="button"
          onClick={startSession}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
          style={{ background: 'rgb(var(--accent))' }}
        >
          <Zap size={20} />
          Start
        </button>
      </div>
    );
  }

  if (phase === 'active' && currentItem) {
    const word = currentItem.word;
    const mode = config?.mode ?? 'spell';
    const oneLetterHint = mode === 'spell' && word.word.length >= 6 && feedback === 'near'
      ? word.word[0].toLowerCase()
      : '';

    // Definition mode: generate options (correct + 3 distractors from other words)
    const definitionOptions = mode === 'definition' ? (() => {
      const others = items.filter((_, i) => i !== index).map(it => it.word.definition);
      const shuffled = [...others].sort(() => Math.random() - 0.5);
      const distractors = shuffled.filter(d => d !== word.definition).slice(0, 3);
      const opts = [word.definition, ...distractors].slice(0, 4);
      return [...new Set(opts)].sort(() => Math.random() - 0.5);
    })() : [];

    return (
      <div className="max-w-2xl mx-auto min-h-[70vh] flex flex-col p-4">
        {paused && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="rounded-xl border p-6 max-w-sm w-full" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
              <p className="font-bold mb-4" style={{ color: 'rgb(var(--text))' }}>Paused</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => { setPaused(false); inputRef.current?.focus(); }}
                  className="flex-1 py-2 rounded-lg font-medium"
                  style={{ background: 'rgb(var(--accent))', color: 'white' }}
                >
                  Continue
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/english-campus/vocab')}
                  className="flex-1 py-2 rounded-lg font-medium border"
                  style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                >
                  Exit
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <span className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            {index + 1} / {total}
          </span>
          <div className="flex items-center gap-4 text-sm">
            <span style={{ color: 'rgb(var(--text-secondary))' }}>Streak: {streak}</span>
            <span style={{ color: 'rgb(var(--text-secondary))' }}>✓ {correctCount}</span>
            <span style={{ color: 'rgb(var(--success))' }}>+{masteryGained}</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            key={word.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: feedback === 'correct' ? 1.02 : 1,
              x: feedback === 'near' ? [0, -4, 4, -4, 4, 0] : 0,
              boxShadow: feedback === 'wrong' ? '0 0 0 2px rgb(239 68 68)' : 'none',
            }}
            transition={{ duration: feedback ? 0.4 : 0.2 }}
            className="rounded-xl border p-6 mb-6"
            style={{
              background: 'rgb(var(--surface))',
              borderColor: feedback === 'wrong' ? 'rgb(var(--danger))' : feedback === 'near' ? '#F59E0B' : 'rgb(var(--border))',
            }}
          >
            {mode === 'spell' && (
              <>
                <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--muted))' }}>
                  Definition
                </p>
                <p className="text-lg font-medium mb-3" style={{ color: 'rgb(var(--text))' }}>
                  {word.definition}
                </p>
              </>
            )}
            {mode === 'definition' && (
              <>
                <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--muted))' }}>
                  What does this word mean?
                </p>
                <p className="text-2xl font-bold mb-4" style={{ color: 'rgb(var(--text))' }}>
                  {word.word}
                </p>
              </>
            )}
            {mode === 'use_in_sentence' && (
              <>
                <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--muted))' }}>
                  Use this word in a sentence
                </p>
                <p className="text-2xl font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
                  {word.word}
                </p>
                <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {word.definition}
                </p>
              </>
            )}
            {mode === 'upgrade' && (
              <>
                <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--muted))' }}>
                  Suggest a better or more sophisticated word
                </p>
                <p className="text-lg font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
                  {word.word}
                </p>
                <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                  Alternatives: {word.synonyms.length ? word.synonyms.join(', ') : word.definition}
                </p>
              </>
            )}
            <span
              className="inline-block px-2 py-0.5 rounded text-xs font-medium mt-2"
              style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text-secondary))' }}
            >
              {WORD_CLASS_LABELS[word.word_class] ?? word.word_class}
            </span>
          </motion.div>

          {mode === 'definition' ? (
            <div className="space-y-2 mb-4">
              {definitionOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => !feedback && setSelectedDefinitionId(opt)}
                  disabled={!!feedback}
                  className="w-full text-left rounded-xl border px-4 py-3"
                  style={{
                    borderColor: selectedDefinitionId === opt
                      ? (feedback ? (opt === word.definition ? 'rgb(var(--success))' : 'rgb(var(--danger))') : 'rgb(var(--accent))')
                      : 'rgb(var(--border))',
                    background: selectedDefinitionId === opt ? 'rgb(var(--accent) / 0.1)' : 'rgb(var(--surface-2))',
                    color: 'rgb(var(--text))',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), submit())}
                placeholder={
                  mode === 'spell' ? 'Type the word...' :
                  mode === 'use_in_sentence' ? 'Write a sentence using this word...' :
                  'Type a better word...'
                }
                disabled={!!feedback}
                autoComplete="off"
                className={`w-full rounded-xl border px-4 py-3 ${mode === 'use_in_sentence' ? 'min-h-[80px]' : 'text-lg'}`}
                style={{
                  borderColor: feedback ? (feedback === 'correct' ? 'rgb(var(--success))' : feedback === 'near' ? '#F59E0B' : 'rgb(var(--danger))') : 'rgb(var(--border))',
                  background: 'rgb(var(--surface-2))',
                  color: 'rgb(var(--text))',
                }}
              />
              {feedback === 'wrong' && mode === 'spell' && (
                <p className="text-sm" style={{ color: 'rgb(var(--danger))' }}>
                  Correct: <strong>{word.word}</strong>
                  {fixItAdditions.includes(word.word) && ' · Added to Fix-It'}
                  {word.common_misspellings?.length > 0 && (
                    <span className="block mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                      Common mistake: many students spell it as &quot;{word.common_misspellings[0]}&quot;
                    </span>
                  )}
                </p>
              )}
              {feedback === 'wrong' && mode === 'definition' && (
                <p className="text-sm" style={{ color: 'rgb(var(--danger))' }}>
                  Correct: <strong>{word.definition}</strong>
                </p>
              )}
              {feedback === 'wrong' && mode === 'upgrade' && word.synonyms.length > 0 && (
                <p className="text-sm" style={{ color: 'rgb(var(--danger))' }}>
                  Good alternatives: {word.synonyms.join(', ')}
                </p>
              )}
              {feedback === 'wrong' && mode === 'use_in_sentence' && (
                <p className="text-sm" style={{ color: 'rgb(var(--danger))' }}>
                  Example: {word.example_sentence || word.definition}
                </p>
              )}
              {feedback === 'near' && oneLetterHint && (
                <p className="text-sm" style={{ color: '#F59E0B' }}>
                  Starts with &quot;{oneLetterHint}&quot;
                </p>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={submit}
            disabled={
              !!feedback ||
              (mode === 'definition' ? !selectedDefinitionId : !input.trim())
            }
            className="flex-1 py-3 rounded-xl font-semibold"
            style={{
              background: (mode === 'definition' ? selectedDefinitionId : input.trim()) && !feedback ? 'rgb(var(--accent))' : 'rgb(var(--surface-2))',
              color: (mode === 'definition' ? selectedDefinitionId : input.trim()) && !feedback ? 'white' : 'rgb(var(--muted))',
            }}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={skipWord}
            disabled={!!feedback}
            className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium border"
            style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text-secondary))' }}
          >
            <SkipForward size={18} />
            Skip
          </button>
          <button
            type="button"
            onClick={giveUp}
            className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium border"
            style={{ borderColor: 'rgb(var(--danger))', color: 'rgb(var(--danger))' }}
          >
            <RotateCcw size={18} />
            Give up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500 mx-auto" />
    </div>
  );
}
