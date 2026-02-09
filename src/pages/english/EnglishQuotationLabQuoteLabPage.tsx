import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Filter, Brain, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import type { QuotationLabQuote, QuotationLabSourceId } from '../../types/englishCampus';
import {
  getQuotationLabQuotesBySource,
  getQuotationLabSourceLabel,
  QUOTATION_LAB_SOURCE_IDS,
} from '../../config/quotationLabData';

type DifficultyFilter = 'core' | 'stretch' | 'all';

function filterQuotes(quotes: QuotationLabQuote[], difficulty: DifficultyFilter): QuotationLabQuote[] {
  if (difficulty === 'all') return quotes;
  if (difficulty === 'core') return quotes.filter(q => (q.difficulty ?? 'core') === 'core');
  return quotes.filter(q => q.difficulty === 'extension');
}

export function EnglishQuotationLabQuoteLabPage() {
  const navigate = useNavigate();
  const { sourceId } = useParams<{ sourceId: string }>();
  const validSource = sourceId && QUOTATION_LAB_SOURCE_IDS.includes(sourceId as QuotationLabSourceId)
    ? (sourceId as QuotationLabSourceId)
    : 'Macbeth';

  const allQuotes = getQuotationLabQuotesBySource(validSource);
  const label = getQuotationLabSourceLabel(validSource);

  const [difficulty, setDifficulty] = useState<DifficultyFilter>('all');
  const [showFilter, setShowFilter] = useState(false);

  const quotes = useMemo(
    () => filterQuotes(allQuotes, difficulty),
    [allQuotes, difficulty]
  );

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
            Select a quote to see meaning, method, and when to use it.
          </p>
        </div>
      </div>

      {/* Top bar: toggle Core | Stretch | All, filter icon */}
      <div className="flex items-center gap-3 flex-wrap">
        <div
          className="inline-flex p-1 rounded-lg"
          style={{ background: 'rgb(var(--surface-2))' }}
          role="group"
          aria-label="Filter by difficulty"
        >
          {(['core', 'stretch', 'all'] as const).map(key => (
            <button
              key={key}
              type="button"
              onClick={() => setDifficulty(key)}
              className="px-3 py-1.5 rounded-md text-sm font-medium capitalize transition"
              style={{
                background: difficulty === key ? 'rgb(var(--surface))' : 'transparent',
                color: difficulty === key ? 'rgb(var(--text))' : 'rgb(var(--text-secondary))',
                boxShadow: difficulty === key ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
              }}
            >
              {key === 'stretch' ? 'Stretch' : key === 'all' ? 'All' : 'Core'}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setShowFilter(f => !f)}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Filter by theme"
          title="Filter by theme"
        >
          <Filter size={20} style={{ color: 'rgb(var(--text-secondary))' }} />
        </button>
      </div>

      {/* Quote cards — minimalist, click to earn depth */}
      <div className="space-y-3">
        {quotes.map((q, index) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02 }}
            className="group rounded-xl border p-4 transition cursor-pointer"
            style={{
              background: 'rgb(var(--surface))',
              borderColor: 'rgb(var(--border))',
            }}
            onClick={() => navigate(`/english-campus/literature/quotation-lab/quote-lab/${validSource}/quote/${q.id}`)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate(`/english-campus/literature/quotation-lab/quote-lab/${validSource}/quote/${q.id}`);
              }
            }}
            role="button"
            tabIndex={0}
          >
            <p className="font-medium text-sm italic" style={{ color: 'rgb(var(--text))' }}>
              "{q.quote}"
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
              <span>{label}</span>
              {q.location && <span>· {q.location}</span>}
              <span className="opacity-80">Themes: {q.themes.map(t => t).join(' · ')}</span>
              <span
                className="px-1.5 py-0.5 rounded capitalize"
                style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--muted))' }}
              >
                {(q.difficulty ?? 'core')}
              </span>
            </div>
            {/* Hover / tap feedback: Grade 9 hint or misuse warning */}
            <div className="mt-2 flex items-center gap-2 text-xs opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
              {q.grade9Insight || q.bestUsedFor?.length ? (
                <span className="flex items-center gap-1" style={{ color: '#059669' }}>
                  <Brain size={14} />
                  Used well in Grade 9 answers
                </span>
              ) : null}
              {q.commonMisuse && (
                <span className="flex items-center gap-1" style={{ color: '#D97706' }}>
                  <AlertTriangle size={14} />
                  Often misused by students
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {quotes.length === 0 && (
        <p className="text-sm text-center py-8" style={{ color: 'rgb(var(--text-secondary))' }}>
          {difficulty === 'all' ? 'No quotes for this text yet.' : `No ${difficulty} quotes. Try "All".`}
        </p>
      )}
    </div>
  );
}
