import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import type { QuotationLabThemeId } from '../../types/englishCampus';
import {
  getQuotationLabThemeLabel,
  getQuotationLabQuotesByTheme,
  getQuotationLabSourceLabel,
  QUOTATION_LAB_THEME_IDS,
} from '../../config/quotationLabData';

export function EnglishQuotationLabThemePage() {
  const navigate = useNavigate();
  const { themeId } = useParams<{ themeId: string }>();
  const validTheme = themeId && QUOTATION_LAB_THEME_IDS.includes(themeId as QuotationLabThemeId)
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
        <div className="flex-1 min-w-0">
          <nav className="text-xs mb-1" style={{ color: 'rgb(var(--muted))' }}>
            Quotation Lab → {label}
          </nav>
          <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            {label}
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            {quotes.length} quotes · click to earn depth
          </p>
        </div>
      </div>

      {quotes.length > 0 ? (
        <div className="space-y-3">
          {quotes.map(q => (
            <button
              key={q.id}
              type="button"
              onClick={() => navigate(`/english-campus/literature/quotation-lab/quote-lab/${q.sourceId}/quote/${q.id}`)}
              className="w-full rounded-xl border p-4 text-left group transition"
              style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
            >
              <p className="font-medium text-sm italic" style={{ color: 'rgb(var(--text))' }}>"{q.quote}"</p>
              <div className="flex flex-wrap items-center gap-2 mt-2 text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
                <span>{getQuotationLabSourceLabel(q.sourceId)}</span>
                {q.location && <span>· {q.location}</span>}
                <span className="opacity-80">Themes: {q.themes.join(' · ')}</span>
                <span className="px-1.5 py-0.5 rounded capitalize" style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--muted))' }}>
                  {(q.difficulty ?? 'core')}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                {q.grade9Insight || (q.bestUsedFor?.length ?? 0) > 0 ? (
                  <span style={{ color: '#059669' }}>Used well in Grade 9 answers</span>
                ) : null}
                {q.commonMisuse && (
                  <span style={{ color: '#D97706' }}>Often misused by students</span>
                )}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 space-y-3">
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            No quotes for {label} yet. Try one of these themes:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {QUOTATION_LAB_THEME_IDS.filter(t => getQuotationLabQuotesByTheme(t as QuotationLabThemeId).length > 0)
              .slice(0, 4)
              .map(t => (
                <button
                  key={t}
                  type="button"
                  onClick={() => navigate(`/english-campus/literature/quotation-lab/theme/${t}`)}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium"
                  style={{ background: 'rgba(37, 99, 235, 0.15)', color: '#2563EB' }}
                >
                  {getQuotationLabThemeLabel(t as QuotationLabThemeId)}
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
