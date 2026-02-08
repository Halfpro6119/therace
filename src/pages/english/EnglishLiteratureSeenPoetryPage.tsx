import { useNavigate } from 'react-router-dom';
import { ChevronLeft, BookOpen, GitCompare } from 'lucide-react';
import { getSeenPoetryLiteratureTasks } from '../../config/goldenEnglishQuestionBank';
import { LITERATURE_GUIDEPOST_TASK_IDS } from '../../config/englishLiteratureGuidePostData';

export function EnglishLiteratureSeenPoetryPage() {
  const navigate = useNavigate();
  const tasks = getSeenPoetryLiteratureTasks();
  const hasGuidePost = (id: string) => LITERATURE_GUIDEPOST_TASK_IDS.includes(id);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/english-campus/literature')}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Back"
        >
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
        </button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            Seen Poetry (Anthology)
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            Single poem analysis and comparison – Grade 9 checklists, mark schemes & model answers
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tasks.map(task => {
          const isComparison = task.taskType === 'seen-comparison';
          const Icon = isComparison ? GitCompare : BookOpen;
          return (
            <button
              key={task.id}
              type="button"
              onClick={() => navigate(`/english-campus/literature/task/${task.id}`)}
              className="rounded-xl border p-5 text-left hover:shadow-md transition flex items-start gap-3"
              style={{
                background: 'rgb(var(--surface))',
                borderColor: 'rgb(var(--border))',
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: 'rgba(236, 72, 153, 0.2)' }}
              >
                <Icon size={20} style={{ color: '#EC4899' }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium mb-1" style={{ color: 'rgb(var(--muted))' }}>
                  {task.subtitle}
                  {hasGuidePost(task.id) && (
                    <span className="ml-1.5 px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                      GuidePost
                    </span>
                  )}
                </p>
                <h3 className="font-bold text-sm leading-snug" style={{ color: 'rgb(var(--text))' }}>
                  {task.prompt}
                </h3>
                <p className="text-xs mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {task.timeRecommendationMins} mins
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
