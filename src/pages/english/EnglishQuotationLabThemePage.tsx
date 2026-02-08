import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import type { QuotationLabThemeId } from '../../types/englishCampus';
import {
  getQuotationLabThemeLabel,
  getQuotationLabQuotesByTheme,
  getQuotationLabSourceLabel,
} from '../../config/quotationLabData';

const THEME_IDS: QuotationLabThemeId[] = ['power', 'guilt', 'identity', 'responsibility'];

export function EnglishQuotationLabThemePage() {
  const navigate = useNavigate();
  const { themeId } = useParams<{ themeId: string }>();
  const validTheme = themeId && THEME_IDS.includes(themeId as QuotationLabThemeId)
    ? (themeId as QuotationLabThemeId)
    : 'power';
  const quotes = getQuotationLabQuotesByTheme(validTheme);
  const label = getQuotationLabThemeLabel(validTheme);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/english-campus/literature/quotation-lab')}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Back"
        >
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
        </button>
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            Quotation Lab — {label}
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            {quotes.length} quotes for this theme across texts
          </p>
        </div>
      </div>

      {quotes.length > 0 ? (
        <div className="space-y-3">
          {quotes.map(q => (
            <div
              key={q.id}
              className="rounded-xl border p-4"
              style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
            >
              <p className="italic text-sm mb-2" style={{ color: 'rgb(var(--text))' }}>"{q.quote}"</p>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text-secondary))' }}>
                  {getQuotationLabSourceLabel(q.sourceId)}
                </span>
                {q.location && <span className="text-xs" style={{ color: 'rgb(var(--muted))' }}>{q.location}</span>}
                <button
                  type="button"
                  onClick={() => navigate(`/english-campus/literature/quotation-lab/quote-lab/${q.sourceId}`)}
                  className="text-xs font-medium"
                  style={{ color: 'rgb(var(--accent))' }}
                >
                  Open full Quote Lab →
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-center py-8" style={{ color: 'rgb(var(--text-secondary))' }}>
          No quotes for {label} yet. Try Power or Guilt.
        </p>
      )}
    </div>
  );
}
