/**
 * MFL Translation Lab – EN→TL and TL→EN
 */
import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Languages, ArrowRight, ArrowLeft } from 'lucide-react';
import { LANGUAGES, THEMES } from '../../config/languagesHubData';
import { LAB_HERO_GRADIENT } from '../../config/hubTheme';
import { getTranslationTasks } from '../../config/mflTranslationData';
import type { LanguageId } from '../../config/languagesHubData';
import type { MflTranslationTask } from '../../types/mflLab';

export function LanguagesHubTranslationPage() {
  const navigate = useNavigate();
  const { languageId } = useParams<{ languageId: string }>();
  const lang = languageId as LanguageId;
  const language = LANGUAGES.find((l) => l.id === lang);

  const [direction, setDirection] = useState<'en-to-tl' | 'tl-to-en'>('en-to-tl');
  const [tierFilter, setTierFilter] = useState<'all' | 'foundation' | 'higher'>('all');
  const [tasks, setTasks] = useState<MflTranslationTask[]>([]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [showModel, setShowModel] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const allTasks = useMemo(() => {
    if (!lang || (lang !== 'french' && lang !== 'spanish')) return [];
    return getTranslationTasks(lang, direction, tierFilter === 'all' ? undefined : tierFilter);
  }, [lang, direction, tierFilter]);

  const startSession = () => {
    setTasks([...allTasks].sort(() => Math.random() - 0.5).slice(0, 10));
    setIndex(0);
    setInput('');
    setShowModel(false);
    setCorrectCount(0);
  };

  const currentTask = tasks[index];

  const checkAnswer = () => {
    if (!currentTask || showModel) return;
    const normalized = (s: string) => s.toLowerCase().trim().replace(/\s+/g, ' ');
    const inputNorm = normalized(input);
    const modelNorm = normalized(currentTask.modelTranslation);
    const isClose = inputNorm.length > 0 && (modelNorm.includes(inputNorm) || inputNorm.includes(modelNorm) || inputNorm === modelNorm);
    if (isClose) setCorrectCount((c) => c + 1);
    setShowModel(true);
  };

  const next = () => {
    if (index + 1 >= tasks.length) return;
    setIndex((i) => i + 1);
    setInput('');
    setShowModel(false);
  };

  if (!language || !['french', 'spanish'].includes(lang || '')) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p style={{ color: 'rgb(var(--text))' }}>Invalid language.</p>
        <button type="button" onClick={() => navigate('/languages-hub')} className="mt-4 text-sm font-medium" style={{ color: 'rgb(var(--primary))' }}>
          Back to Languages
        </button>
      </div>
    );
  }

  if (tasks.length === 0 && allTasks.length > 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 sm:p-8 border shadow-sm"
          style={{
            background: LAB_HERO_GRADIENT,
            borderColor: 'transparent',
          }}
        >
          <button
            type="button"
            onClick={() => navigate(`/languages-hub/${lang}`)}
            className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
          >
            <ChevronLeft size={18} />
            Back to {language.name}
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            <Languages size={28} className="inline mr-2" />
            Translation Lab
          </h1>
          <p className="text-white/90 text-sm sm:text-base">
            EN↔{language.name} – sentence and passage
          </p>
        </motion.section>

        <section className="rounded-xl border p-4" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <h2 className="font-bold mb-3" style={{ color: 'rgb(var(--text))' }}>Direction</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setDirection('en-to-tl')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
              style={{ background: direction === 'en-to-tl' ? language.color : 'rgb(var(--surface-2))', color: direction === 'en-to-tl' ? 'white' : 'rgb(var(--text))' }}
            >
              <ArrowRight size={16} />
              English → {language.name}
            </button>
            <button
              type="button"
              onClick={() => setDirection('tl-to-en')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
              style={{ background: direction === 'tl-to-en' ? language.color : 'rgb(var(--surface-2))', color: direction === 'tl-to-en' ? 'white' : 'rgb(var(--text))' }}
            >
              <ArrowLeft size={16} />
              {language.name} → English
            </button>
          </div>
        </section>

        <section className="rounded-xl border p-4" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <h2 className="font-bold mb-3" style={{ color: 'rgb(var(--text))' }}>Tier</h2>
          <div className="flex gap-2">
            {(['all', 'foundation', 'higher'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTierFilter(t)}
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{ background: tierFilter === t ? language.color : 'rgb(var(--surface-2))', color: tierFilter === t ? 'white' : 'rgb(var(--text))' }}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </section>

        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          {allTasks.length} tasks ready
        </p>
        <button
          type="button"
          onClick={startSession}
          disabled={allTasks.length === 0}
          className="px-6 py-3 rounded-xl font-semibold text-white"
          style={{ background: allTasks.length ? language.color : 'rgb(var(--muted))' }}
        >
          Start (10 tasks)
        </button>
      </div>
    );
  }

  if (tasks.length > 0 && !currentTask) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold" style={{ color: 'rgb(var(--text))' }}>Done!</h1>
        <p style={{ color: 'rgb(var(--text))' }}>
          You completed {tasks.length} translations. Approximate matches: {correctCount}.
        </p>
        <button
          type="button"
          onClick={() => setTasks([])}
          className="px-6 py-3 rounded-xl font-semibold text-white"
          style={{ background: language.color }}
        >
          Practice again
        </button>
        <button
          type="button"
          onClick={() => navigate(`/languages-hub/${lang}`)}
          className="block mt-2 px-6 py-2 rounded-lg border"
          style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
        >
          Back to {language.name}
        </button>
      </div>
    );
  }

  if (!currentTask) return null;

  const theme = THEMES.find((t) => t.id === currentTask.themeId);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          {index + 1} / {tasks.length}
        </span>
        <span style={{ color: 'rgb(var(--success))' }}>✓ {correctCount}</span>
      </div>

      <motion.div
        key={currentTask.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border p-6"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
          {theme?.title} • {currentTask.tier}
        </p>
        <p className="text-lg font-medium mb-4" style={{ color: 'rgb(var(--text))' }}>
          {currentTask.direction === 'en-to-tl' ? 'Translate into ' + language.name : 'Translate into English'}
        </p>
        <p className="text-xl mb-4" style={{ color: 'rgb(var(--text))' }}>{currentTask.source}</p>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (showModel ? next() : checkAnswer())}
          disabled={showModel}
          placeholder={currentTask.direction === 'en-to-tl' ? `Type in ${language.name}...` : 'Type in English...'}
          className="w-full rounded-xl border px-4 py-3 text-lg mb-4"
          style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
        />
        {showModel && (
          <p className="text-sm p-3 rounded-lg mb-4" style={{ background: 'rgb(var(--success))15', color: 'rgb(var(--success))' }}>
            Model: {currentTask.modelTranslation}
          </p>
        )}
      </motion.div>

      <div className="flex gap-2">
        {!showModel ? (
          <button
            type="button"
            onClick={checkAnswer}
            disabled={!input.trim()}
            className="flex-1 py-3 rounded-xl font-semibold text-white"
            style={{ background: input.trim() ? language.color : 'rgb(var(--muted))' }}
          >
            Check
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            className="flex-1 py-3 rounded-xl font-semibold text-white"
            style={{ background: language.color }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
