/**
 * MFL Writing Lab – Photo, 40-word, 90-word, 150-word tasks
 */
import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, PenLine, FileText, CheckSquare } from 'lucide-react';
import { LANGUAGES, THEMES } from '../../config/languagesHubData';
import { getWritingTasks } from '../../config/mflWritingData';
import type { LanguageId } from '../../config/languagesHubData';
import type { MflWritingTask } from '../../types/mflLab';

const WRITING_CHECKLIST = [
  { id: 'c1', label: 'Correct tense(s)' },
  { id: 'c2', label: 'Opinion + reason' },
  { id: 'c3', label: 'Connective(s)' },
  { id: 'c4', label: 'All bullets covered' },
];

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function LanguagesHubWritingPage() {
  const navigate = useNavigate();
  const { languageId } = useParams<{ languageId: string }>();
  const lang = languageId as LanguageId;
  const language = LANGUAGES.find((l) => l.id === lang);

  const [tierFilter, setTierFilter] = useState<'all' | 'foundation' | 'higher'>('all');
  const [selectedTask, setSelectedTask] = useState<MflWritingTask | null>(null);
  const [content, setContent] = useState('');
  const [checklistTicks, setChecklistTicks] = useState<Record<string, boolean>>({});
  const [showModels, setShowModels] = useState(false);
  const [modelGrade, setModelGrade] = useState<'grade4' | 'grade6' | 'grade8' | 'grade9'>('grade6');

  const tasks = useMemo(() => {
    if (!lang || (lang !== 'french' && lang !== 'spanish')) return [];
    return getWritingTasks(lang, tierFilter === 'all' ? undefined : tierFilter);
  }, [lang, tierFilter]);

  const wordCount = countWords(content);
  const targetWords = selectedTask?.type === 'photo' ? 4 : selectedTask?.type === '40word' ? 40 : selectedTask?.type === '90word' ? 90 : 150;

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
    const modelAnswer = selectedTask.modelAnswers?.[modelGrade];

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <button
          type="button"
          onClick={() => { setSelectedTask(null); setContent(''); setChecklistTicks({}); setShowModels(false); }}
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
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <h2 className="text-lg font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
            {selectedTask.type === 'photo' ? 'Photo description' : selectedTask.type === '40word' ? '40-word task' : selectedTask.type === '90word' ? '90-word task' : '150-word task'}
          </h2>
          <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
            {theme?.title} • {selectedTask.tier}
          </p>
          <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>{selectedTask.prompt}</p>
          <ul className="list-disc list-inside space-y-1 mb-4" style={{ color: 'rgb(var(--text))' }}>
            {selectedTask.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-medium" style={{ color: wordCount >= targetWords ? 'rgb(var(--success))' : 'rgb(var(--text-secondary))' }}>
              {wordCount} / {targetWords} words
            </span>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-bold mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>Checklist</h3>
            <div className="flex flex-wrap gap-2">
              {WRITING_CHECKLIST.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setChecklistTicks((t) => ({ ...t, [c.id]: !t[c.id] }))}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm"
                  style={{
                    background: checklistTicks[c.id] ? 'rgb(var(--success))20' : 'rgb(var(--surface-2))',
                    color: checklistTicks[c.id] ? 'rgb(var(--success))' : 'rgb(var(--text))',
                    border: `1px solid ${checklistTicks[c.id] ? 'rgb(var(--success))' : 'rgb(var(--border))'}`,
                  }}
                >
                  <CheckSquare size={16} />
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your answer here..."
            rows={selectedTask.type === '150word' ? 10 : 6}
            className="w-full rounded-xl border px-4 py-3 text-base resize-y"
            style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
          />
        </motion.section>

        <section className="rounded-xl border p-4" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <button
            type="button"
            onClick={() => setShowModels(!showModels)}
            className="flex items-center gap-2 text-sm font-medium mb-2"
            style={{ color: language.color }}
          >
            <FileText size={16} />
            {showModels ? 'Hide' : 'Show'} model answers
          </button>
          {showModels && (
            <div className="space-y-4">
              <div className="flex gap-2">
                {(['grade4', 'grade6', 'grade8', 'grade9'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setModelGrade(g)}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium"
                    style={{
                      background: modelGrade === g ? language.color : 'rgb(var(--surface-2))',
                      color: modelGrade === g ? 'white' : 'rgb(var(--text))',
                    }}
                  >
                    {g.replace('grade', 'Grade ')}
                  </button>
                ))}
              </div>
              {modelAnswer && (
                <div className="p-4 rounded-xl" style={{ background: 'rgb(var(--surface-2))' }}>
                  <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>Model answer ({modelGrade.replace('grade', 'Grade ')})</p>
                  <p className="text-sm italic whitespace-pre-wrap" style={{ color: 'rgb(var(--text))' }}>{modelAnswer}</p>
                </div>
              )}
            </div>
          )}
        </section>
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
          background: `linear-gradient(135deg, ${language.color} 0%, ${language.color}99 50%, ${language.color}66 100%)`,
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
          <PenLine size={28} className="inline mr-2" />
          Writing Lab
        </h1>
        <p className="text-white/90 text-sm sm:text-base">
          Photo, 40-word, 90-word, 150-word tasks
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
                    {task.type === 'photo' ? 'Photo' : task.type === '40word' ? '40-word' : task.type === '90word' ? '90-word' : '150-word'} • {theme?.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {task.tier}
                  </p>
                </div>
                <span className="text-sm font-medium" style={{ color: language.color }}>
                  Start
                </span>
              </div>
            </motion.button>
          );
        })}
      </section>
    </div>
  );
}
