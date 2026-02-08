import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Library } from 'lucide-react';
import { getTextLiteratureTasksByText } from '../../config/goldenEnglishQuestionBank';
import { LITERATURE_GUIDEPOST_TASK_IDS } from '../../config/englishLiteratureGuidePostData';

const TEXT_LABELS: Record<string, string> = {
  Macbeth: 'Macbeth',
  AChristmasCarol: 'A Christmas Carol',
  JekyllHyde: 'Jekyll & Hyde',
  AnInspectorCalls: 'An Inspector Calls',
};

export function EnglishLiteratureTextsPage() {
  const navigate = useNavigate();
  const byText = getTextLiteratureTasksByText();
  const hasGuidePost = (id: string) => LITERATURE_GUIDEPOST_TASK_IDS.includes(id);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
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
            Set texts
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            Macbeth, A Christmas Carol, Jekyll & Hyde, An Inspector Calls – extract & whole-text questions
          </p>
        </div>
      </div>

      {Object.entries(byText).map(([textCode, tasks]) => {
        if (tasks.length === 0) return null;
        const label = TEXT_LABELS[textCode] ?? textCode;
        return (
          <section key={textCode}>
            <h2 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
              <Library size={20} style={{ color: '#10B981' }} />
              {label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tasks.map(task => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => navigate(`/english-campus/literature/task/${task.id}`)}
                  className="rounded-xl border p-4 text-left hover:shadow-md transition"
                  style={{
                    background: 'rgb(var(--surface))',
                    borderColor: 'rgb(var(--border))',
                  }}
                >
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
                </button>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
