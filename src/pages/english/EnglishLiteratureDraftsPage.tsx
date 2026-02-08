import { useNavigate } from 'react-router-dom';
import { ChevronLeft, FileText, CheckCircle } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getLiteratureTaskById } from '../../config/goldenEnglishQuestionBank';

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return iso;
  }
}

export function EnglishLiteratureDraftsPage() {
  const navigate = useNavigate();
  const drafts = storage.getEnglishLiteratureDrafts();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/english-campus/literature')}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Back to Literature"
        >
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
        </button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            My Literature drafts
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            Continue or review your Literature responses
          </p>
        </div>
      </div>

      {drafts.length === 0 ? (
        <div
          className="rounded-xl border p-8 text-center"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <FileText size={48} className="mx-auto mb-3 opacity-50" style={{ color: 'rgb(var(--text))' }} />
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            Start a Literature task (Seen Poetry, Unseen Poetry, or Texts) to create your first draft.
          </p>
          <button
            type="button"
            onClick={() => navigate('/english-campus/literature')}
            className="mt-4 btn-primary"
          >
            Go to Literature
          </button>
        </div>
      ) : (
        <ul className="space-y-3">
          {drafts.map(draft => {
            const task = getLiteratureTaskById(draft.taskId);
            const hasResult = !!draft.result;
            return (
              <li
                key={draft.id}
                className="rounded-xl border p-4 flex flex-wrap items-center gap-4"
                style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold truncate" style={{ color: 'rgb(var(--text))' }}>
                    {draft.taskTitle}
                  </h3>
                  <p className="text-sm mt-0.5" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {task?.subtitle && `${task.subtitle} · `}
                    {draft.wordCount} words · {formatDate(draft.updatedAt)}
                    {hasResult && draft.result && (
                      <span className="ml-2 inline-flex items-center gap-1">
                        <CheckCircle size={14} className="text-emerald-500" />
                        {draft.result.bandLevel}
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/english-campus/literature/task/${draft.taskId}`, {
                        state: { reopenDraftId: draft.id },
                      })
                    }
                    className="btn-ghost text-sm"
                  >
                    {hasResult ? 'View / Improve' : 'Continue'}
                  </button>
                  {hasResult && (
                    <button
                      type="button"
                      onClick={() =>
                        navigate('/english-campus/literature/result', {
                          state: { draftId: draft.id, taskId: draft.taskId, fromLiterature: true },
                        })
                      }
                      className="btn-ghost text-sm"
                    >
                      View feedback
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
