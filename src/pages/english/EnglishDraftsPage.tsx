import { useNavigate } from 'react-router-dom';
import { ChevronLeft, FileText, GitCompare, Highlighter } from 'lucide-react';
import { storage } from '../../utils/storage';

export function EnglishDraftsPage() {
  const navigate = useNavigate();
  const drafts = storage.getEnglishDrafts();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/english-campus/language')}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Back"
        >
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
        </button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            My drafts
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            History and improvements – compare versions
          </p>
        </div>
      </div>

      {drafts.length === 0 ? (
        <div
          className="rounded-xl border p-8 text-center"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <FileText size={48} className="mx-auto mb-4 opacity-50" style={{ color: 'rgb(var(--muted))' }} />
          <p className="font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
            No drafts yet
          </p>
          <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
            Start a writing task in Language Mode to create your first draft.
          </p>
          <button type="button" onClick={() => navigate('/english-campus/language')} className="btn-primary">
            Go to Language dashboard
          </button>
        </div>
      ) : (
        <ul className="space-y-3">
          {drafts.map(draft => (
            <li
              key={draft.id}
              className="rounded-xl border p-4 flex flex-wrap items-center justify-between gap-4"
              style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
            >
              <div className="min-w-0">
                <h3 className="font-bold truncate" style={{ color: 'rgb(var(--text))' }}>
                  {draft.taskTitle}
                </h3>
                <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                  Paper {draft.paper} · {draft.wordCount} words · {new Date(draft.updatedAt).toLocaleDateString()}
                </p>
                {draft.result && (
                  <p className="text-xs mt-1" style={{ color: 'rgb(var(--muted))' }}>
                    {draft.result.bandLevel}
                    {draft.result.marks != null && ` (${draft.result.marks}/${draft.result.maxMarks ?? 40})`}
                    {draft.result.isSelfMark ? ' · Self-mark' : ' · AI feedback'}
                  </p>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() =>
                    navigate('/english-campus/language/task/' + draft.taskId, {
                      state: { reopenDraftId: draft.id },
                    })
                  }
                  className="btn-ghost text-sm flex items-center gap-1"
                >
                  <FileText size={16} />
                  Open
                </button>
                {draft.result?.isSelfMark && (
                  <button
                    type="button"
                    onClick={() => navigate(`/english-campus/language/draft/${draft.id}/marking`)}
                    className="btn-ghost text-sm flex items-center gap-1"
                  >
                    <Highlighter size={16} />
                    View marking
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => navigate('/english-campus/language/compare', { state: { draftId: draft.id } })}
                  className="btn-ghost text-sm flex items-center gap-1"
                >
                  <GitCompare size={16} />
                  Compare
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
