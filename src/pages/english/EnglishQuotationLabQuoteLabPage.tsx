import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronDown, ChevronUp, Quote, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuotationLabQuote, QuotationLabSourceId } from '../../types/englishCampus';
import {
  getQuotationLabQuotesBySource,
  getQuotationLabSourceLabel,
  getFlexibleDeploymentPromptsBySource,
  getQuotationLabQuoteById,
  QUOTATION_LAB_SOURCE_IDS,
} from '../../config/quotationLabData';
import { storage } from '../../utils/storage';

type LabMode = 'understand' | 'flexible';

export function EnglishQuotationLabQuoteLabPage() {
  const navigate = useNavigate();
  const { sourceId } = useParams<{ sourceId: string }>();
  const validSource = sourceId && QUOTATION_LAB_SOURCE_IDS.includes(sourceId as QuotationLabSourceId)
    ? (sourceId as QuotationLabSourceId)
    : 'Macbeth';
  const quotes = getQuotationLabQuotesBySource(validSource);
  const label = getQuotationLabSourceLabel(validSource);
  const flexPrompts = getFlexibleDeploymentPromptsBySource(validSource);
  const [labMode, setLabMode] = useState<LabMode>('understand');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [expandedPanel, setExpandedPanel] = useState<'meaning' | 'method' | 'examiners' | 'grade9' | null>(null);

  const handleExpand = (qId: string) => {
    setExpandedId(prev => {
      const next = prev === qId ? null : qId;
      if (next === qId) {
        storage.incrementQuotationFamiliarity(validSource, qId);
        setExpandedPanel('meaning');
      } else {
        setExpandedPanel(null);
      }
      return next;
    });
  };

  const togglePanel = (panel: 'meaning' | 'method' | 'examiners' | 'grade9') => {
    setExpandedPanel(prev => (prev === panel ? null : panel));
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
        <div className="flex-1">
          <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            Quote Lab — {label}
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            Mode 1: Understand · Mode 4: Flexible Deployment
          </p>
        </div>
      </div>

      {/* Mode toggle */}
      <div className="flex gap-2 p-1 rounded-lg" style={{ background: 'rgb(var(--surface-2))' }}>
        <button
          type="button"
          onClick={() => setLabMode('understand')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
            labMode === 'understand' ? '' : 'opacity-70'
          }`}
          style={{
            background: labMode === 'understand' ? 'rgb(var(--surface))' : 'transparent',
            color: 'rgb(var(--text))',
            boxShadow: labMode === 'understand' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
          }}
        >
          <Quote size={18} />
          Understand the Quote
        </button>
        <button
          type="button"
          onClick={() => setLabMode('flexible')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
            labMode === 'flexible' ? '' : 'opacity-70'
          }`}
          style={{
            background: labMode === 'flexible' ? 'rgb(var(--surface))' : 'transparent',
            color: 'rgb(var(--text))',
            boxShadow: labMode === 'flexible' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
          }}
        >
          <Zap size={18} />
          Flexible Deployment (Grade 9)
        </button>
      </div>

      {/* Mode 1: Understand the Quote — 3 expandable panels */}
      {labMode === 'understand' && (
        <div className="space-y-3">
          {quotes.map((q: QuotationLabQuote, index: number) => {
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
                      <div className="p-4 pt-2 space-y-2">
                        {/* Panel 1: What It Means */}
                        <Panel title="What It Means" isOpen={expandedPanel === 'meaning'} onToggle={() => togglePanel('meaning')}>
                          <p style={{ color: 'rgb(var(--text-secondary))' }}>{q.meaning}</p>
                        </Panel>
                        {/* Panel 2: How It Works */}
                        <Panel title="How It Works" isOpen={expandedPanel === 'method'} onToggle={() => togglePanel('method')}>
                          <p style={{ color: 'rgb(var(--text-secondary))' }}>{q.methods?.join(', ') ?? q.method}</p>
                          <p className="mt-2 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                            Method → purpose: {q.method} — links directly to AO2.
                          </p>
                          {q.commonMisuse && (
                            <p className="mt-2 text-xs italic" style={{ color: 'rgb(var(--muted))' }}>
                              Avoid: {q.commonMisuse}
                            </p>
                          )}
                        </Panel>
                        {/* Panel 3: Why Examiners Love It */}
                        <Panel title="Why Examiners Love It" isOpen={expandedPanel === 'examiners'} onToggle={() => togglePanel('examiners')}>
                          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{q.contextHook}</p>
                          {q.bestUsedFor && q.bestUsedFor.length > 0 && (
                            <p className="mt-2 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                              When it earns top marks: {q.bestUsedFor.join(', ')}
                            </p>
                          )}
                        </Panel>
                        {/* Panel 4: Grade 9 Angle */}
                        <Panel title="Grade 9 Angle" isOpen={expandedPanel === 'grade9'} onToggle={() => togglePanel('grade9')}>
                          {(q.grade9Insight ?? q.deploymentTip) ? (
                            <p style={{ color: 'rgb(var(--text-secondary))' }}>{q.grade9Insight ?? q.deploymentTip}</p>
                          ) : (
                            <p className="text-sm italic" style={{ color: 'rgb(var(--muted))' }}>Conceptual or alternative reading — extend your analysis.</p>
                          )}
                        </Panel>
                        {q.difficulty && (
                          <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--muted))' }}>
                            {q.difficulty}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Mode 4: Flexible Deployment — argue TWO ideas with one quote */}
      {labMode === 'flexible' && (
        <div className="space-y-4">
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            Use one quote to argue <strong style={{ color: 'rgb(var(--text))' }}>TWO</strong> different ideas. This is Grade 9 behaviour.
          </p>
          {flexPrompts.length > 0 ? (
            flexPrompts.map(p => {
              const quote = getQuotationLabQuoteById(p.quoteId);
              return (
                <div
                  key={p.id}
                  className="rounded-xl border p-4"
                  style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
                >
                  <p className="italic text-sm mb-3" style={{ color: 'rgb(var(--text))' }}>"{quote?.quote}"</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-lg p-3" style={{ background: 'rgb(var(--surface-2))' }}>
                      <p className="text-xs font-semibold mb-1" style={{ color: 'rgb(var(--muted))' }}>Idea A</p>
                      <p style={{ color: 'rgb(var(--text))' }}>{p.ideaA}</p>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: 'rgb(var(--surface-2))' }}>
                      <p className="text-xs font-semibold mb-1" style={{ color: 'rgb(var(--muted))' }}>Idea B</p>
                      <p style={{ color: 'rgb(var(--text))' }}>{p.ideaB}</p>
                    </div>
                  </div>
                  <p className="text-xs mt-3 italic" style={{ color: 'rgb(var(--text-secondary))' }}>
                    Examiner note: {p.examinerNote}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-center py-8" style={{ color: 'rgb(var(--text-secondary))' }}>
              No Flexible Deployment prompts for {label} yet.
            </p>
          )}
        </div>
      )}

      {labMode === 'understand' && quotes.length === 0 && (
        <p className="text-sm text-center py-8" style={{ color: 'rgb(var(--text-secondary))' }}>
          No quotes for this source yet. Start with Macbeth.
        </p>
      )}
    </div>
  );
}

function Panel({
  title,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg overflow-hidden" style={{ background: 'rgb(var(--surface-2))' }}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-black/5 dark:hover:bg-white/5"
      >
        <span className="font-semibold text-sm" style={{ color: 'rgb(var(--text))' }}>{title}</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pt-0 text-sm">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
