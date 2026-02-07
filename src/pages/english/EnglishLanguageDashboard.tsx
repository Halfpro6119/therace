import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, FileText, History, Grid3X3, Play } from 'lucide-react';
import { getLanguageTasksByPaper, getLanguageTaskById } from '../../config/englishLanguageTasks';
import { storage } from '../../utils/storage';
import { motion } from 'framer-motion';

export function EnglishLanguageDashboard() {
  const navigate = useNavigate();
  const [paper, setPaper] = useState<1 | 2>(1);
  const [showTaskList, setShowTaskList] = useState(false);
  const drafts = storage.getEnglishDrafts();
  const tasks = getLanguageTasksByPaper(paper);

  const handleStartTask = (taskId: string) => {
    storage.setEnglishContinue({
      type: 'language',
      taskId,
      label: getLanguageTaskById(taskId)?.title ?? 'Writing task',
      updatedAt: new Date().toISOString(),
    });
    navigate(`/english-campus/language/task/${taskId}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/english-campus')}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Back to English Campus"
        >
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
        </button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            Language Mode
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            Paper 1 (Creative) & Paper 2 (Transactional)
          </p>
        </div>
      </div>

      {/* Paper toggle */}
      <div
        className="rounded-xl p-4 border flex flex-wrap gap-3"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <span className="text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
          Paper:
        </span>
        <div className="flex rounded-lg overflow-hidden border" style={{ borderColor: 'rgb(var(--border))' }}>
          <button
            type="button"
            onClick={() => setPaper(1)}
            className={`px-4 py-2 text-sm font-semibold ${paper === 1 ? 'text-white' : ''}`}
            style={
              paper === 1
                ? { background: 'var(--gradient-primary)' }
                : { background: 'rgb(var(--surface-2))', color: 'rgb(var(--text))' }
            }
          >
            Paper 1
          </button>
          <button
            type="button"
            onClick={() => setPaper(2)}
            className={`px-4 py-2 text-sm font-semibold ${paper === 2 ? 'text-white' : ''}`}
            style={
              paper === 2
                ? { background: 'var(--gradient-primary)' }
                : { background: 'rgb(var(--surface-2))', color: 'rgb(var(--text))' }
            }
          >
            Paper 2
          </button>
        </div>
        <p className="text-xs w-full" style={{ color: 'rgb(var(--muted))' }}>
          {paper === 1 ? 'Creative: description & narrative' : 'Transactional: speech, article, letter, leaflet, report'}
        </p>
      </div>

      {/* Start a task */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border overflow-hidden"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <button
          type="button"
          onClick={() => setShowTaskList(!showTaskList)}
          className="w-full p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-sky-500/20">
              <FileText size={20} className="text-sky-600 dark:text-sky-400" />
            </div>
            <div className="text-left">
              <h2 className="font-bold" style={{ color: 'rgb(var(--text))' }}>
                Start a task
              </h2>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                Choose from the task bank (Paper {paper})
              </p>
            </div>
          </div>
          <span className="text-sm font-medium" style={{ color: 'rgb(var(--accent))' }}>
            {showTaskList ? 'Hide' : 'Show'} tasks
          </span>
        </button>
        {showTaskList && (
          <div className="border-t px-4 pb-4" style={{ borderColor: 'rgb(var(--border))' }}>
            <ul className="space-y-2 pt-3">
              {tasks.map(task => (
                <li key={task.id}>
                  <button
                    type="button"
                    onClick={() => handleStartTask(task.id)}
                    className="w-full flex items-center justify-between gap-4 rounded-lg p-3 hover:bg-black/5 dark:hover:bg-white/5 text-left"
                  >
                    <div>
                      <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>
                        {task.title}
                      </p>
                      <p className="text-xs capitalize" style={{ color: 'rgb(var(--muted))' }}>
                        {task.type} • {task.timeRecommendationMins} mins
                      </p>
                    </div>
                    <Play size={18} style={{ color: 'rgb(var(--accent))' }} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.section>

      {/* My drafts */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-xl border overflow-hidden"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <button
          type="button"
          onClick={() => navigate('/english-campus/language/drafts')}
          className="w-full p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20">
              <History size={20} className="text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="text-left">
              <h2 className="font-bold" style={{ color: 'rgb(var(--text))' }}>
                My drafts
              </h2>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                {drafts.length} draft{drafts.length !== 1 ? 's' : ''} – history & improvements
              </p>
            </div>
          </div>
          <span className="text-sm font-medium" style={{ color: 'rgb(var(--accent))' }}>
            View
          </span>
        </button>
      </motion.section>

      {/* Skills heatmap placeholder */}
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl border p-4"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-violet-500/20">
            <Grid3X3 size={20} className="text-violet-600 dark:text-violet-400" />
          </div>
          <h2 className="font-bold" style={{ color: 'rgb(var(--text))' }}>
            Skills heatmap
          </h2>
        </div>
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          AO5/AO6 coverage and technique strengths will appear here as you complete and mark more tasks.
        </p>
        <div className="mt-3 flex gap-2 flex-wrap">
          {['AO5 Content', 'AO5 Structure', 'AO6 SPaG', 'Vocabulary'].map((label, i) => (
            <span
              key={label}
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{
                background: `rgb(var(--surface-2))`,
                color: 'rgb(var(--text-secondary))',
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
