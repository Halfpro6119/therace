/**
 * Languages Hub – Vocabulary mode
 * Spell from meaning, meaning from word, use in sentence (Design Plan §16)
 */
import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Zap, BookOpen, PenLine } from 'lucide-react';
import { motion } from 'framer-motion';
import { LANGUAGES, THEMES, getMflVocab, type LanguageId, type ThemeId, type MflVocabItem } from '../../config/languagesHubData';

type VocabMode = 'spell' | 'meaning' | 'sentence';

export function LanguagesHubVocabularyPage() {
  const navigate = useNavigate();
  const { languageId } = useParams<{ languageId: string }>();
  const lang = languageId as LanguageId;
  const language = LANGUAGES.find(l => l.id === lang);

  const [themeFilter, setThemeFilter] = useState<ThemeId | 'all'>('all');
  const [tierFilter, setTierFilter] = useState<'all' | 'foundation' | 'higher'>('all');
  const [mode, setMode] = useState<VocabMode>('spell');
  const [phase, setPhase] = useState<'config' | 'active' | 'done'>('config');
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const vocab = useMemo(() => {
    if (!lang || lang !== 'french' && lang !== 'spanish') return [];
    let items = getMflVocab(lang, themeFilter === 'all' ? undefined : themeFilter, tierFilter === 'all' ? undefined : tierFilter);
    return [...items].sort(() => Math.random() - 0.5).slice(0, 15);
  }, [lang, themeFilter, tierFilter]);

  const currentItem = vocab[index];

  const startSession = () => {
    if (vocab.length === 0) return;
    setPhase('active');
    setIndex(0);
    setInput('');
    setFeedback(null);
    setCorrectCount(0);
  };

  const submit = () => {
    if (!currentItem || feedback !== null) return;
    const raw = input.trim().toLowerCase();
    let isCorrect = false;
    if (mode === 'spell') {
      const target = currentItem.word.toLowerCase().replace(/[àâäéèêëïîôùûüç]/g, (c) => {
        const map: Record<string, string> = { à: 'a', â: 'a', ä: 'a', é: 'e', è: 'e', ê: 'e', ë: 'e', ï: 'i', î: 'i', ô: 'o', ù: 'u', û: 'u', ü: 'u', ç: 'c' };
        return map[c] ?? c;
      });
      isCorrect = raw === currentItem.word.toLowerCase() || raw.replace(/[àâäéèêëïîôùûüç]/g, '') === target.replace(/[àâäéèêëïîôùûüç]/g, '');
    } else if (mode === 'meaning') {
      isCorrect = raw === currentItem.meaning.toLowerCase();
    } else {
      isCorrect = raw.includes(currentItem.word.toLowerCase()) && raw.length >= 8;
    }
    setFeedback(isCorrect ? 'correct' : 'wrong');
    if (isCorrect) setCorrectCount(c => c + 1);
  };

  const next = () => {
    if (index + 1 >= vocab.length) {
      setPhase('done');
      return;
    }
    setIndex(i => i + 1);
    setInput('');
    setFeedback(null);
  };

  if (!language || !['french', 'spanish'].includes(lang || '')) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <button onClick={() => navigate('/languages-hub')} className="text-blue-600">← Back</button>
        <p className="mt-4">Invalid language.</p>
      </div>
    );
  }

  if (phase === 'config') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <button onClick={() => navigate(`/languages-hub/${lang}`)} className="flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
          <ChevronLeft size={20} /> Back
        </button>
        <h1 className="text-2xl font-bold" style={{ color: 'rgb(var(--text))' }}>
          {language.flag} Vocabulary – {language.name}
        </h1>
        <section className="rounded-xl border p-4" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <h2 className="font-bold mb-3" style={{ color: 'rgb(var(--text))' }}>Theme</h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setThemeFilter('all')}
              className="px-3 py-1.5 rounded-lg text-sm font-medium"
              style={{ background: themeFilter === 'all' ? language.color : 'rgb(var(--surface-2))', color: themeFilter === 'all' ? 'white' : 'rgb(var(--text))' }}
            >
              All
            </button>
            {THEMES.map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => setThemeFilter(t.id)}
                className="px-3 py-1.5 rounded-lg text-sm font-medium"
                style={{ background: themeFilter === t.id ? language.color : 'rgb(var(--surface-2))', color: themeFilter === t.id ? 'white' : 'rgb(var(--text))' }}
              >
                {t.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </section>
        <section className="rounded-xl border p-4" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <h2 className="font-bold mb-3" style={{ color: 'rgb(var(--text))' }}>Tier</h2>
          <div className="flex gap-2">
            {(['all', 'foundation', 'higher'] as const).map(t => (
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
        <section className="rounded-xl border p-4" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <h2 className="font-bold mb-3" style={{ color: 'rgb(var(--text))' }}>Mode</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'spell' as const, label: 'Spell from meaning', icon: Zap },
              { id: 'meaning' as const, label: 'Meaning from word', icon: BookOpen },
              { id: 'sentence' as const, label: 'Use in sentence', icon: PenLine },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setMode(id)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                style={{ background: mode === id ? language.color : 'rgb(var(--surface-2))', color: mode === id ? 'white' : 'rgb(var(--text))' }}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </section>
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          {vocab.length} words ready
        </p>
        <button
          type="button"
          onClick={startSession}
          disabled={vocab.length === 0}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
          style={{ background: vocab.length ? language.color : 'rgb(var(--muted))' }}
        >
          <Zap size={20} />
          Start
        </button>
      </div>
    );
  }

  if (phase === 'done') {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold" style={{ color: 'rgb(var(--text))' }}>Done!</h1>
        <p style={{ color: 'rgb(var(--text))' }}>
          You got {correctCount} out of {vocab.length} correct.
        </p>
        <button
          type="button"
          onClick={() => { setPhase('config'); setIndex(0); }}
          className="px-6 py-3 rounded-xl font-semibold text-white"
          style={{ background: language.color }}
        >
          Practice again
        </button>
        <button
          type="button"
          onClick={() => navigate(`/languages-hub/${lang}`)}
          className="block px-6 py-2 rounded-lg border"
          style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
        >
          Back to {language.name}
        </button>
      </div>
    );
  }

  if (!currentItem) return null;

  return (
    <div className="max-w-2xl mx-auto min-h-[70vh] flex flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          {index + 1} / {vocab.length}
        </span>
        <span style={{ color: 'rgb(var(--success))' }}>✓ {correctCount}</span>
      </div>
      <motion.div
        key={currentItem.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border p-6 mb-6"
        style={{
          background: 'rgb(var(--surface))',
          borderColor: feedback === 'wrong' ? 'rgb(var(--danger))' : 'rgb(var(--border))',
        }}
      >
        {mode === 'spell' && (
          <>
            <p className="text-sm mb-1" style={{ color: 'rgb(var(--muted))' }}>Meaning</p>
            <p className="text-xl font-medium" style={{ color: 'rgb(var(--text))' }}>{currentItem.meaning}</p>
          </>
        )}
        {mode === 'meaning' && (
          <>
            <p className="text-sm mb-1" style={{ color: 'rgb(var(--muted))' }}>Word</p>
            <p className="text-2xl font-bold" style={{ color: 'rgb(var(--text))' }}>{currentItem.word}</p>
          </>
        )}
        {mode === 'sentence' && (
          <>
            <p className="text-sm mb-1" style={{ color: 'rgb(var(--muted))' }}>Use in a sentence</p>
            <p className="text-2xl font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>{currentItem.word}</p>
            <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{currentItem.meaning}</p>
          </>
        )}
      </motion.div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && (feedback ? next() : submit())}
        placeholder={
          mode === 'spell' ? 'Type the word...' :
          mode === 'meaning' ? 'Type the meaning...' :
          'Write a sentence...'
        }
        disabled={!!feedback}
        autoFocus
        className="w-full rounded-xl border px-4 py-3 text-lg mb-4"
        style={{
          background: 'rgb(var(--surface-2))',
          borderColor: 'rgb(var(--border))',
          color: 'rgb(var(--text))',
        }}
      />
      {feedback && (
        <p className="text-sm mb-4" style={{ color: feedback === 'correct' ? 'rgb(var(--success))' : 'rgb(var(--danger))' }}>
          {feedback === 'correct' ? 'Correct!' : `Correct: ${mode === 'spell' ? currentItem.word : mode === 'meaning' ? currentItem.meaning : currentItem.word}`}
        </p>
      )}
      <div className="flex gap-2">
        {!feedback ? (
          <button
            type="button"
            onClick={submit}
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
