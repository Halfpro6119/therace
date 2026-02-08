import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, BookOpen, BookMarked, Flame, Target, ChevronRight, ChevronLeft } from 'lucide-react';
import { storage } from '../../utils/storage';

const PILLARS = [
  {
    id: 'language',
    title: 'Language Mode',
    description: 'GCSE English Language Paper 1 & Paper 2 – creative and transactional writing',
    path: '/english-campus/language',
    icon: MessageSquare,
    color: '#0EA5E9',
  },
  {
    id: 'literature',
    title: 'Literature Mode',
    description: 'Poetry (Seen + Unseen) and set texts – analysis, comparison, quotation lab',
    path: '/english-campus/literature',
    icon: BookOpen,
    color: '#EC4899',
  },
  {
    id: 'vocab',
    title: 'Vocab Lab',
    description: 'High-level vocabulary, spelling, and usage by theme',
    path: '/english-campus/vocab',
    icon: BookMarked,
    color: '#8B5CF6',
  },
] as const;

export function EnglishCampusHomePage() {
  const navigate = useNavigate();
  const writingStreak = storage.getEnglishWritingStreak();
  const lastScore = storage.getEnglishLastScore();
  const targets = storage.getEnglishTargets();
  const continueState = storage.getEnglishContinue();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #0EA5E9 0%, #EC4899 50%, #8B5CF6 100%)',
          borderColor: 'transparent',
        }}
      >
        <button
          type="button"
          onClick={() => navigate('/subjects')}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Subjects
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">English Campus</h1>
        <p className="text-white/90 text-sm sm:text-base">
          Task → Plan → Write → Mark → Improve → Track Progress
        </p>
      </motion.section>

      {/* Quick stats strip */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        <div
          className="rounded-xl p-4 flex items-center gap-3 border"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <div className="p-2 rounded-lg bg-amber-500/20">
            <Flame size={20} className="text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Writing streak</p>
            <p className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
              {writingStreak.currentStreakDays} day{writingStreak.currentStreakDays !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <div
          className="rounded-xl p-4 flex items-center gap-3 border"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <div className="p-2 rounded-lg bg-emerald-500/20">
            <Target size={20} className="text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Last score</p>
            <p className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
              {lastScore ? `${lastScore.bandLevel}${lastScore.marks != null ? ` (${lastScore.marks}/${lastScore.maxMarks ?? 40})` : ''}` : '—'}
            </p>
          </div>
        </div>
        <div
          className="rounded-xl p-4 border sm:col-span-1"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Current targets</p>
          <ul className="text-sm space-y-0.5" style={{ color: 'rgb(var(--text-secondary))' }}>
            {targets.targets.length > 0
              ? targets.targets.slice(0, 2).map((t, i) => <li key={i}>• {t}</li>)
              : <li>No targets set yet – complete a task and get feedback to set targets.</li>}
          </ul>
        </div>
      </motion.section>

      {continueState && (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <button
            type="button"
            onClick={() => {
              if (continueState.type === 'language' && continueState.taskId)
                navigate(`/english-campus/language/task/${continueState.taskId}`);
              else if (continueState.type === 'language') navigate('/english-campus/language');
              else if (continueState.type === 'literature' && continueState.taskId)
                navigate(`/english-campus/literature/task/${continueState.taskId}`, {
                  state: continueState.draftId ? { reopenDraftId: continueState.draftId } : undefined,
                });
              else if (continueState.type === 'literature') navigate('/english-campus/literature');
              else navigate('/english-campus/vocab');
            }}
            className="w-full rounded-xl p-4 flex items-center justify-between border transition hover:opacity-90"
            style={{
              background: 'var(--gradient-primary)',
              borderColor: 'transparent',
              color: 'white',
            }}
          >
            <span className="font-semibold">Continue where you left off</span>
            <span className="text-sm opacity-90">{continueState.label}</span>
            <ChevronRight size={20} />
          </button>
        </motion.section>
      )}

      {/* Big mode cards */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
          Choose a mode
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PILLARS.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.button
                key={pillar.id}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                onClick={() => navigate(pillar.path)}
                className="rounded-2xl p-6 text-left border shadow-sm hover:shadow-md transition-all flex flex-col"
                style={{
                  background: 'rgb(var(--surface))',
                  borderColor: 'rgb(var(--border))',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${pillar.color}20` }}
                >
                  <Icon size={24} style={{ color: pillar.color }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
                  {pillar.title}
                </h3>
                <p className="text-sm flex-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {pillar.description}
                </p>
                <div className="mt-4 flex items-center gap-1 font-semibold text-sm" style={{ color: pillar.color }}>
                  <span>Open</span>
                  <ChevronRight size={16} />
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
