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
  const state = location.state as { setIds?: string[]; length?: 10 | 20 | 40 | 'mastery_sprint'; mode?: 'spell'; isFixIt?: boolean; weakOnly?: boolean } | null;
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
      mode: 'spell',
      weakOnly: weakOnly || undefined,
    });
    setPhase('ready');
  }, [isFixIt, sprint, weakOnly, state?.setIds, state?.length]);

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
    const raw = input.trim();
    if (!raw) return;

    const timeMs = Date.now() - questionStartMs;
    const word = currentItem.word;
    let isCorrect = false;
    let nearMiss = false;
    let delta = 0;
    let addedToFixIt = false;

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
      setFeedback(null);
      setQuestionStartMs(Date.now());
      setFeedback(null);
      setTimeout(() => inputRef.current?.focus(), 50);
    }, 1500);
  }, [currentItem, input, feedback, config, index, total, userId, sessionId, startedAt, streak, correctCount, masteryGained, results, fixItAdditions, questionStartMs]);

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
    const oneLetterHint = word.word.length >= 6 && feedback === 'near'
      ? word.word[0].toLowerCase()
      : '';

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
            <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--muted))' }}>
              Definition
            </p>
            <p className="text-lg font-medium mb-3" style={{ color: 'rgb(var(--text))' }}>
              {word.definition}
            </p>
            <span
              className="inline-block px-2 py-0.5 rounded text-xs font-medium"
              style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text-secondary))' }}
            >
              {WORD_CLASS_LABELS[word.word_class] ?? word.word_class}
            </span>
          </motion.div>

          <div className="space-y-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), submit())}
              placeholder="Type the word..."
              disabled={!!feedback}
              autoComplete="off"
              className="w-full rounded-xl border px-4 py-3 text-lg"
              style={{
                borderColor: feedback ? (feedback === 'correct' ? 'rgb(var(--success))' : feedback === 'near' ? '#F59E0B' : 'rgb(var(--danger))') : 'rgb(var(--border))',
                background: 'rgb(var(--surface-2))',
                color: 'rgb(var(--text))',
              }}
            />
            {feedback === 'wrong' && (
              <p className="text-sm" style={{ color: 'rgb(var(--danger))' }}>
                Correct: <strong>{word.word}</strong>
                {fixItAdditions.includes(word.word) && ' · Added to Fix-It'}
              </p>
            )}
            {feedback === 'near' && oneLetterHint && (
              <p className="text-sm" style={{ color: '#F59E0B' }}>
                Starts with &quot;{oneLetterHint}&quot;
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={submit}
            disabled={!input.trim() || !!feedback}
            className="flex-1 py-3 rounded-xl font-semibold"
            style={{
              background: input.trim() && !feedback ? 'rgb(var(--accent))' : 'rgb(var(--surface-2))',
              color: input.trim() && !feedback ? 'white' : 'rgb(var(--muted))',
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
