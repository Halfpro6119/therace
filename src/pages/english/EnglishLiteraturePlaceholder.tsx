import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const TITLES: Record<string, string> = {
  poetry: 'Poetry Diary (Seen)',
  compare: 'Compare tasks',
  unseen: 'Unseen poetry',
  texts: 'Texts library',
  'quotation-lab': 'Quotation Lab',
};

export function EnglishLiteraturePlaceholder() {
  const navigate = useNavigate();
  const { section } = useParams<{ section: string }>();
  const title = (section && TITLES[section]) || 'Literature';

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/english-campus/literature')}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Back"
        >
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
        </button>
        <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>
          {title}
        </h1>
      </div>
      <div
        className="rounded-xl border p-8 text-center"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
          This section is part of the English Campus Literature mode. Content and tasks can be added via the task bank and admin.
        </p>
        <button type="button" onClick={() => navigate('/english-campus/literature')} className="btn-primary">
          Back to Literature
        </button>
      </div>
    </div>
  );
}
