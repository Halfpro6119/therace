import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronDown, ChevronUp, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuotationLabSourceId } from '../../types/englishCampus';
import {
  getQuotationLabQuotesBySource,
  getQuotationLabSourceLabel,
} from '../../config/quotationLabData';
import { storage } from '../../utils/storage';

const SOURCE_IDS: QuotationLabSourceId[] = ['Macbeth', 'Ozymandias', 'London', 'Exposure'];

export function EnglishQuotationLabQuoteLabPage() {
  const navigate = useNavigate();
  const { sourceId } = useParams<{ sourceId: string }>();
  const validSource = sourceId && SOURCE_IDS.includes(sourceId as QuotationLabSourceId)
    ? (sourceId as QuotationLabSourceId)
    : 'Macbeth';
  const quotes = getQuotationLabQuotesBySource(validSource);
  const label = getQuotationLabSourceLabel(validSource);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleExpand = (qId: string) => {
    setExpandedId(prev => {
      const next = prev === qId ? null : qId;
      if (next === qId) storage.incrementQuotationFamiliarity(validSource, qId);
      return next;
    });
  };

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
            Quote Lab — {label}
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            Core meaning, method, context, deployment
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {quotes.map((q, index) => {
          const isExpanded = expandedId === q.id;
          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="rounded-xl border overflow-hidden"
              style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
            >
              <button
                type="button"
                onClick={() => handleExpand(q.id)}
                className="w-full flex items-start gap-3 p-4 text-left hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'rgba(245, 158, 11, 0.2)' }}
                >
                  <Quote size={20} style={{ color: '#F59E0B' }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm italic" style={{ color: 'rgb(var(--text))' }}>
                    "{q.quote}"
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {q.themes.map(t => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-xs"
                        style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text-secondary))' }}
                      >
                        {t}
                      </span>
                    ))}
                    {q.location && (
                      <span className="text-xs" style={{ color: 'rgb(var(--muted))' }}>
                        {q.location}
                      </span>
                    )}
                  </div>
                </div>
                {isExpanded ? <ChevronUp size={20} style={{ color: 'rgb(var(--text-secondary))' }} /> : <ChevronDown size={20} style={{ color: 'rgb(var(--text-secondary))' }} />}
              </button>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t overflow-hidden"
                    style={{ borderColor: 'rgb(var(--border))' }}
                  >
                    <div className="p-4 pt-2 space-y-4 text-sm">
                      <div>
                        <span className="font-semibold" style={{ color: 'rgb(var(--text))' }}>Method: </span>
                        <span style={{ color: 'rgb(var(--text-secondary))' }}>{q.method}</span>
                      </div>
                      <div>
                        <span className="font-semibold" style={{ color: 'rgb(var(--text))' }}>Meaning: </span>
                        <span style={{ color: 'rgb(var(--text-secondary))' }}>{q.meaning}</span>
                      </div>
                      <div>
                        <span className="font-semibold" style={{ color: 'rgb(var(--text))' }}>Context: </span>
                        <span style={{ color: 'rgb(var(--text-secondary))' }}>{q.contextHook}</span>
                      </div>
                      <div
                        className="rounded-lg p-3"
                        style={{ background: 'rgba(245, 158, 11, 0.12)', borderLeft: '3px solid #F59E0B' }}
                      >
                        <span className="font-semibold" style={{ color: 'rgb(var(--text))' }}>Grade 9 deployment: </span>
                        <span style={{ color: 'rgb(var(--text-secondary))' }}>{q.deploymentTip}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {quotes.length === 0 && (
        <p className="text-sm text-center py-8" style={{ color: 'rgb(var(--text-secondary))' }}>
          No quotes for this source yet. Start with Macbeth.
        </p>
      )}
    </div>
  );
}
