/**
 * MFL Listening Lab – Audio tasks (transcript-based practice until audio available)
 */
import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Headphones, Eye, EyeOff } from 'lucide-react';
import { LANGUAGES, THEMES } from '../../config/languagesHubData';
import { LAB_HERO_GRADIENT } from '../../config/hubTheme';
import { getListeningTasks } from '../../config/mflListeningData';
import type { LanguageId } from '../../config/languagesHubData';
import type { MflListeningTask } from '../../types/mflLab';

export function LanguagesHubListeningPage() {
  const navigate = useNavigate();
  const { languageId } = useParams<{ languageId: string }>();
  const lang = languageId as LanguageId;
  const language = LANGUAGES.find((l) => l.id === lang);

  const [tierFilter, setTierFilter] = useState<'all' | 'foundation' | 'higher'>('all');
  const [selectedTask, setSelectedTask] = useState<MflListeningTask | null>(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);

  const tasks = useMemo(() => {
    if (!lang || (lang !== 'french' && lang !== 'spanish')) return [];
    return getListeningTasks(lang, tierFilter === 'all' ? undefined : tierFilter);
  }, [lang, tierFilter]);

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

  if (selectedTask) {
    const theme = THEMES.find((t) => t.id === selectedTask.themeId);
    const correctCount = selectedTask.questions.filter(
      (q) => answers[q.id]?.toLowerCase().trim() && q.correctAnswer.toLowerCase().includes(answers[q.id].toLowerCase().trim())
    ).length;

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          type="button"
          onClick={() => { setSelectedTask(null); setAnswers({}); setShowFeedback(false); setShowTranscript(false); }}
          className="flex items-center gap-2 text-sm font-medium"
          style={{ color: 'rgb(var(--text-secondary))' }}
        >
          <ChevronLeft size={18} />
          Back to tasks
        </button>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 border"
          style={{ background: `linear-gradient(135deg, ${language.color}20 0%, transparent 100%)`, borderColor: 'rgb(var(--border))' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Headphones size={24} style={{ color: language.color }} />
            <div>
              <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Listening task</h1>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                {theme?.title} • {selectedTask.tier}
              </p>
            </div>
          </div>
          <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
            Read the transcript below and answer the questions. (Audio can be added when available.)
          </p>

          <button
            type="button"
            onClick={() => setShowTranscript(!showTranscript)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
            style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text))' }}
          >
            {showTranscript ? <EyeOff size={16} /> : <Eye size={16} />}
            {showTranscript ? 'Hide' : 'Show'} transcript
          </button>

          {showTranscript && (
            <div className="mt-4 p-4 rounded-xl" style={{ background: 'rgb(var(--surface-2))' }}>
              <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>Transcript ({language.name})</p>
              <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>{selectedTask.transcript}</p>
              {selectedTask.transcriptEn && (
                <>
                  <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>Translation</p>
                  <p className="text-sm italic" style={{ color: 'rgb(var(--text-secondary))' }}>{selectedTask.transcriptEn}</p>
                </>
              )}
            </div>
          )}
        </motion.section>

        <section className="space-y-4">
          {selectedTask.questions.map((q) => (
            <div key={q.id} className="rounded-xl p-4 border" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
              <p className="font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>{q.question}</p>
              <input
                type="text"
                value={answers[q.id] ?? ''}
                onChange={(e) => setAnswers((a) => ({ ...a, [q.id]: e.target.value }))}
                disabled={showFeedback}
                placeholder="Your answer..."
                className="w-full rounded-lg border px-4 py-2 text-sm"
                style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
              />
              {showFeedback && (
                <p className="text-sm mt-2" style={{ color: 'rgb(var(--success))' }}>
                  ✓ Model answer: {q.correctAnswer}
                </p>
              )}
            </div>
          ))}
        </section>

        {!showFeedback ? (
          <button
            type="button"
            onClick={() => setShowFeedback(true)}
            className="w-full py-3 rounded-xl font-semibold text-white"
            style={{ background: language.color }}
          >
            Check answers
          </button>
        ) : (
          <div className="rounded-xl p-4" style={{ background: 'rgb(var(--success))15', border: '1px solid rgb(var(--success))30' }}>
            <p className="font-medium" style={{ color: 'rgb(var(--success))' }}>
              You matched {correctCount} out of {selectedTask.questions.length} model answers.
            </p>
            <p className="text-sm mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>
              Answers may vary – compare with the model answers above.
            </p>
          </div>
        )}
      </div>
    );
  }

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
          <Headphones size={28} className="inline mr-2" />
          Listening Lab
        </h1>
        <p className="text-white/90 text-sm sm:text-base">
          Read transcripts and answer questions – Foundation & Higher
        </p>
      </motion.section>

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

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>Tasks</h2>
        {tasks.map((task, index) => {
          const theme = THEMES.find((t) => t.id === task.themeId);
          return (
            <motion.button
              key={task.id}
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => setSelectedTask(task)}
              className="w-full rounded-xl p-5 text-left border shadow-sm hover:shadow-md transition-all"
              style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold mb-1" style={{ color: 'rgb(var(--text))' }}>
                    {theme?.title} • {task.tier}
                  </h3>
                  <p className="text-sm line-clamp-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {task.transcript.slice(0, 80)}...
                  </p>
                </div>
                <span className="text-sm font-medium" style={{ color: language.color }}>
                  {task.questions.length} questions
                </span>
              </div>
            </motion.button>
          );
        })}
      </section>
    </div>
  );
}
