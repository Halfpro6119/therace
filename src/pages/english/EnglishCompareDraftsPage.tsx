import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { storage } from '../../utils/storage';

export function EnglishCompareDraftsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { draftId?: string } | undefined;
  const draftId = state?.draftId;
  const draft = draftId ? storage.getEnglishDraftById(draftId) : null;

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/english-campus/language/drafts')}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Back"
        >
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
        </button>
        <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>
          Compare drafts
        </h1>
      </div>
      {!draft ? (
        <div className="rounded-xl border p-6 text-center" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
            Select a draft from My drafts and click Compare to see it here. Side-by-side comparison with a previous version will be available when you have multiple drafts for the same task.
          </p>
          <button type="button" onClick={() => navigate('/english-campus/language/drafts')} className="btn-primary">
            Go to My drafts
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border p-4" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
            <h3 className="font-bold mb-2 text-sm" style={{ color: 'rgb(var(--text))' }}>
              Draft · {new Date(draft.updatedAt).toLocaleString()}
            </h3>
            <div className="text-sm whitespace-pre-wrap min-h-[200px]" style={{ color: 'rgb(var(--text-secondary))' }}>
              {draft.content || '(No content)'}
            </div>
          </div>
          <div className="rounded-xl border p-4" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
            <h3 className="font-bold mb-2 text-sm" style={{ color: 'rgb(var(--text))' }}>
              Previous version
            </h3>
            <p className="text-sm" style={{ color: 'rgb(var(--muted))' }}>
              When you use &quot;Rewrite mode&quot; after feedback, a new draft is created. You can compare this draft with the previous one here once that flow is in place.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
