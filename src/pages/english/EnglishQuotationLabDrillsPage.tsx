import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Lightbulb, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuotationLabSourceId } from '../../types/englishCampus';
import type {
  QuotationDrillItem,
  QuotationDrillExplain,
  QuotationDrillFinishAnalysis,
  QuotationDrillUpgrade,
  QuotationDrillBestFit,
  QuotationDrillLinkTwo,
  QuotationDrillWhichAO,
  QuotationDrillEliminateWeak,
  QuotationDrillContextWeave,
  QuotationDrillMisuseDetection,
} from '../../types/englishCampus';
import {
  getQuotationLabDrillsBySource,
  getQuotationLabQuoteById,
  getQuotationLabSourceLabel,
  QUOTATION_LAB_SOURCE_IDS,
} from '../../config/quotationLabData';
import { MISUSE_REASON_OPTIONS } from '../../config/quotationLabDrillGenerator';

function isExplain(d: QuotationDrillItem): d is QuotationDrillExplain {
  return d.type === 'explainQuote';
}
function isFinishAnalysis(d: QuotationDrillItem): d is QuotationDrillFinishAnalysis {
  return d.type === 'finishAnalysis';
}
function isUpgrade(d: QuotationDrillItem): d is QuotationDrillUpgrade {
  return d.type === 'upgradeAnalysis';
}
function isBestFit(d: QuotationDrillItem): d is QuotationDrillBestFit {
  return d.type === 'whichQuoteFitsBest';
}
function isLinkTwo(d: QuotationDrillItem): d is QuotationDrillLinkTwo {
  return d.type === 'linkTwoQuotes';
}
function isWhichAO(d: QuotationDrillItem): d is QuotationDrillWhichAO {
  return d.type === 'whichAO';
}
function isEliminateWeak(d: QuotationDrillItem): d is QuotationDrillEliminateWeak {
  return d.type === 'eliminateWeakQuote';
}
function isContextWeave(d: QuotationDrillItem): d is QuotationDrillContextWeave {
  return d.type === 'contextWeave';
}
function isMisuseDetection(d: QuotationDrillItem): d is QuotationDrillMisuseDetection {
  return d.type === 'misuseDetection';
}

const DRILL_TYPE_LABELS: Record<QuotationDrillItem['type'], string> = {
  explainQuote: 'One-Sentence Analysis (AO2)',
  finishAnalysis: 'Finish the analysis',
  upgradeAnalysis: 'Grade Upgrade',
  whichQuoteFitsBest: 'Quote Selection (AO1)',
  linkTwoQuotes: 'Link Two Quotes',
  whichAO: 'Which AO is this?',
  eliminateWeakQuote: 'Misuse Detection (which to keep)',
  contextWeave: 'Context Weave (AO3)',
  misuseDetection: 'Misuse Detection',
};

const DRILL_TYPE_AO: Record<QuotationDrillItem['type'], string> = {
  explainQuote: 'AO2',
  finishAnalysis: 'AO2',
  upgradeAnalysis: 'AO2',
  whichQuoteFitsBest: 'AO1',
  linkTwoQuotes: 'AO1/AO2',
  whichAO: 'AO1/AO2/AO3',
  eliminateWeakQuote: 'AO1',
  contextWeave: 'AO3',
  misuseDetection: 'AO1',
};

/** Approximate time per drill type in minutes */
const DRILL_TIME_EST: Record<QuotationDrillItem['type'], string> = {
  explainQuote: '~1 min',
  finishAnalysis: '~2 min',
  upgradeAnalysis: '~2 min',
  whichQuoteFitsBest: '~2 min',
  linkTwoQuotes: '~3 min',
  whichAO: '~1 min',
  eliminateWeakQuote: '~2 min',
  contextWeave: '~1 min',
  misuseDetection: '~2 min',
};

function getFocusTheme(drill: QuotationDrillItem): string {
  if (isExplain(drill)) return drill.themePrompt.replace(/^In one sentence.*?presents /i, '').replace(/\.$/, '') || 'Theme';
  if (isBestFit(drill)) return drill.question.split(/support the idea that /i)[1]?.split(/ is/)[0]?.trim() || 'Focus';
  if (isEliminateWeak(drill)) return drill.question.split(/present |How does /i)[1]?.split(/[?.]/)[0]?.trim() || 'Focus';
  if (isLinkTwo(drill)) return 'Development';
  if (isContextWeave(drill)) return 'AO3';
  if (isMisuseDetection(drill)) return 'Examiner';
  if (isUpgrade(drill) || isFinishAnalysis(drill)) return 'Analysis';
  if (isWhichAO(drill)) return 'AO';
  return 'Focus';
}

export function EnglishQuotationLabDrillsPage() {
  const navigate = useNavigate();
  const { sourceId } = useParams<{ sourceId: string }>();
  const validSource = sourceId && QUOTATION_LAB_SOURCE_IDS.includes(sourceId as QuotationLabSourceId)
    ? (sourceId as QuotationLabSourceId)
    : 'Macbeth';
  const drills = getQuotationLabDrillsBySource(validSource);
  const label = getQuotationLabSourceLabel(validSource);
  const [index, setIndex] = useState(0);
  const [showWhy, setShowWhy] = useState(false);
  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(null);
  const [answer, setAnswer] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);

  const drill = drills[index];
  const total = drills.length;

  const updateAnswer = (val: string) => {
    setAnswer(val);
    setWordCount(val.trim().split(/\s+/).filter(Boolean).length);
  };

  if (!drill) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => navigate('/english-campus/literature/quotation-lab')} className="p-2 rounded-lg hover:bg-black/5">
            <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
          </button>
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Drills — {label}</h1>
            <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No drills for this source yet.</p>
          </div>
        </div>
        <button type="button" onClick={() => navigate('/english-campus/literature/quotation-lab')} className="btn-ghost">Back to Quotation Lab</button>
      </div>
    );
  }

  const resetState = () => {
    setShowWhy(false);
    setSelectedQuoteId(null);
    setAnswer('');
    setWordCount(0);
    setSelectedReasons([]);
  };

  const toggleReason = (reasonId: string) => {
    setSelectedReasons(prev => prev.includes(reasonId) ? prev.filter(r => r !== reasonId) : [...prev, reasonId]);
  };

  const maxWords = isExplain(drill) && drill.maxWords ? drill.maxWords : undefined;

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
            Drills — {label}
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            {index + 1} of {total}
          </p>
        </div>
      </div>

      {/* Drill header: type, focus, time */}
      <div
        className="rounded-xl border px-4 py-3 flex flex-wrap items-center gap-3"
        style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))' }}
      >
        <span className="font-semibold text-sm" style={{ color: 'rgb(var(--text))' }}>
          Drill: {DRILL_TYPE_LABELS[drill.type]} ({DRILL_TYPE_AO[drill.type]})
        </span>
        <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgb(var(--surface))', color: 'rgb(var(--text-secondary))' }}>
          Focus: {getFocusTheme(drill)}
        </span>
        <span className="text-xs" style={{ color: 'rgb(var(--muted))' }}>
          Time: {DRILL_TIME_EST[drill.type]}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={drill.id}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -8 }}
          className="rounded-xl border p-5 space-y-4"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          {/* Drill Type B: One-Sentence Analysis — word counter, "Judgement required" badge */}
          {isExplain(drill) && (
            <>
              <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{drill.themePrompt}</p>
              {(() => {
                const quote = getQuotationLabQuoteById(drill.quoteId);
                return quote ? (
                  <blockquote className="pl-4 border-l-2 italic mt-2" style={{ borderColor: '#8B5CF6', color: 'rgb(var(--text))' }}>
                    "{quote.quote}"
                  </blockquote>
                ) : null;
              })()}
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium mt-2"
                style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#D97706' }}
              >
                Judgement required
              </span>
              <div className="pt-2">
                <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                  Your one-sentence explanation
                  {maxWords && (
                    <span className={wordCount > maxWords ? ' text-amber-600' : ''} style={{ marginLeft: 8 }}>
                      {wordCount}/{maxWords} words
                    </span>
                  )}
                </label>
                <textarea
                  value={answer}
                  onChange={e => updateAnswer(e.target.value)}
                  placeholder="Type your sentence..."
                  rows={2}
                  className="w-full rounded-lg border p-3 text-sm resize-none"
                  style={{
                    background: 'rgb(var(--surface-2))',
                    borderColor: maxWords && wordCount > maxWords ? '#F59E0B' : 'rgb(var(--border))',
                    color: 'rgb(var(--text))',
                  }}
                />
              </div>
              <p className="text-xs" style={{ color: 'rgb(var(--muted))' }}>{drill.gradingNote}</p>
            </>
          )}

          {/* Drill 2: Finish the Analysis */}
          {isFinishAnalysis(drill) && (
            <>
              <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{DRILL_TYPE_LABELS.finishAnalysis}</p>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>Complete the sentence:</p>
              {(() => {
                const quote = getQuotationLabQuoteById(drill.quoteId);
                return (
                  <div className="space-y-2">
                    <blockquote className="pl-4 border-l-2 italic text-sm" style={{ borderColor: '#8B5CF6', color: 'rgb(var(--text))' }}>
                      "{quote?.quote ?? drill.quoteId}"
                    </blockquote>
                    <p className="font-medium text-sm" style={{ color: 'rgb(var(--text))' }}>{drill.starter}</p>
                  </div>
                );
              })()}
              <div className="pt-2">
                <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>Your completion</label>
                <textarea
                  value={answer}
                  onChange={e => updateAnswer(e.target.value)}
                  placeholder="Add method, precision, judgement..."
                  rows={3}
                  className="w-full rounded-lg border p-3 text-sm resize-none"
                  style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                />
              </div>
              <p className="text-xs" style={{ color: 'rgb(var(--muted))' }}>{drill.rewardNote}</p>
            </>
          )}

          {/* Drill Type C: Grade Upgrade — vertical ladder 4 → 6 → 8 → 9 */}
          {isUpgrade(drill) && (
            <>
              <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>Upgrade the same idea through the grades.</p>
              <div className="flex items-center gap-2 py-2" aria-label="Grade progression">
                {[4, 6, 8, 9].map((g, i) => (
                  <span
                    key={g}
                    className="flex-1 text-center py-1.5 rounded text-xs font-semibold"
                    style={{
                      background: i === 0 ? 'rgb(var(--surface-2))' : 'rgb(var(--surface-2))',
                      color: g === 9 ? '#7C3AED' : 'rgb(var(--text-secondary))',
                    }}
                  >
                    Grade {g}
                  </span>
                ))}
              </div>
              <p className="text-sm mt-2" style={{ color: 'rgb(var(--text-secondary))' }}>Weak response (Grade 4):</p>
              <p className="italic text-sm py-2" style={{ color: 'rgb(var(--text))' }}>"{drill.weakResponse}"</p>
              <p className="text-xs" style={{ color: 'rgb(var(--muted))' }}>Upgrade focus: {drill.upgradeFocus}</p>
              {(() => {
                const quote = getQuotationLabQuoteById(drill.quoteId);
                return quote ? (
                  <blockquote className="pl-4 border-l-2 italic text-sm mt-2" style={{ borderColor: '#8B5CF6', color: 'rgb(var(--text))' }}>
                    "{quote.quote}"
                  </blockquote>
                ) : null;
              })()}
              <div className="pt-2">
                <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                  Your upgraded analysis (unlock Grade 6 → 8 → 9)
                </label>
                <textarea
                  value={answer}
                  onChange={e => updateAnswer(e.target.value)}
                  placeholder="Add method, judgement, avoid retelling..."
                  rows={4}
                  className="w-full rounded-lg border p-3 text-sm resize-none"
                  style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                />
              </div>
            </>
          )}

          {/* Drill Type A: Quote Selection — tap to select, confirm to check */}
          {isBestFit(drill) && (
            <>
              <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>Which quote best supports the idea?</p>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{drill.question}</p>
              <div className="space-y-2 pt-2" role="group" aria-label="Quote options">
                {drill.quoteOptionIds.map(quoteId => {
                  const q = getQuotationLabQuoteById(quoteId);
                  const isBest = quoteId === drill.bestQuoteId;
                  const isSelected = selectedQuoteId === quoteId;
                  return (
                    <button
                      key={quoteId}
                      type="button"
                      onClick={() => setSelectedQuoteId(quoteId)}
                      className="w-full rounded-lg border p-3 text-left text-sm transition"
                      style={{
                        borderColor: showWhy && isBest ? '#10B981' : isSelected ? 'rgb(var(--accent))' : 'rgb(var(--border))',
                        background: showWhy && isBest ? 'rgba(16, 185, 129, 0.1)' : isSelected ? 'rgba(var(--accent), 0.08)' : 'rgb(var(--surface-2))',
                      }}
                    >
                      <span className="italic" style={{ color: 'rgb(var(--text))' }}>"{q?.quote ?? quoteId}"</span>
                      {showWhy && isBest && (
                        <p className="mt-2 text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
                          <strong>Why best:</strong> {drill.whyBest}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
              {selectedQuoteId && !showWhy && (
                <div className="pt-2">
                  <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                    Justification (20 words max)
                  </label>
                  <input
                    type="text"
                    value={answer}
                    onChange={e => updateAnswer(e.target.value)}
                    placeholder="e.g. This quote directly addresses guilt with strong method..."
                    className="w-full rounded-lg border p-3 text-sm"
                    style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                  />
                  <p className="text-xs mt-1" style={{ color: 'rgb(var(--muted))' }}>
                    {answer.trim().split(/\s+/).filter(Boolean).length}/20 words
                  </p>
                </div>
              )}
              {!showWhy ? (
                <button
                  type="button"
                  onClick={() => setShowWhy(true)}
                  className="mt-3 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                  style={{ background: 'rgb(var(--accent))', color: 'white' }}
                >
                  Confirm
                </button>
              ) : null}
            </>
          )}

          {/* Drill Type D: Link Two Quotes — show development, not listing */}
          {isLinkTwo(drill) && (
            <>
              <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>Link these to show development.</p>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{drill.linkPrompt}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[drill.quoteIdA, drill.quoteIdB].map(quoteId => {
                  const q = getQuotationLabQuoteById(quoteId);
                  return (
                    <div key={quoteId} className="rounded-lg border p-3 text-sm" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface-2))' }}>
                      {q?.location && <span className="text-xs" style={{ color: 'rgb(var(--muted))' }}>{q.location}</span>}
                      <p className="italic mt-1" style={{ color: 'rgb(var(--text))' }}>"{q?.quote ?? quoteId}"</p>
                    </div>
                  );
                })}
              </div>
              <div className="pt-2">
                <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>Your link (how do they show change?)</label>
                <textarea
                  value={answer}
                  onChange={e => updateAnswer(e.target.value)}
                  placeholder="Write 2–4 sentences linking the two quotes..."
                  rows={4}
                  className="w-full rounded-lg border p-3 text-sm resize-none"
                  style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                />
              </div>
              <p className="text-xs" style={{ color: 'rgb(var(--muted))' }}>{drill.rewardNote}</p>
            </>
          )}

          {/* Drill: Which AO Is This? */}
          {isWhichAO(drill) && (
            <>
              <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{DRILL_TYPE_LABELS.whichAO}</p>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>Label AO1 / AO2 / AO3 and explain why.</p>
              {(() => {
                const quote = getQuotationLabQuoteById(drill.quoteId);
                return (
                  <div className="space-y-2">
                    <blockquote className="pl-4 border-l-2 italic text-sm" style={{ borderColor: '#8B5CF6', color: 'rgb(var(--text))' }}>
                      "{quote?.quote ?? drill.quoteId}"
                    </blockquote>
                    <p className="text-sm" style={{ color: 'rgb(var(--text))' }}>Sample: <em>"{drill.sampleAnalysis}"</em></p>
                  </div>
                );
              })()}
              <div className="pt-2 space-y-2">
                <p className="text-xs font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>Which AO? (AO1 = response, AO2 = method, AO3 = context)</p>
                <div className="flex gap-2">
                  {(['AO1', 'AO2', 'AO3'] as const).map(ao => (
                    <button
                      key={ao}
                      type="button"
                      onClick={() => setAnswer(answer.startsWith(ao) ? answer : ao + ' ')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        answer === ao ? 'ring-2' : ''
                      }`}
                      style={{
                        background: answer === ao ? 'rgba(var(--accent), 0.15)' : 'rgb(var(--surface-2))',
                        color: 'rgb(var(--text))',
                        borderColor: answer === ao ? 'rgb(var(--accent))' : 'transparent',
                      }}
                    >
                      {ao}
                    </button>
                  ))}
                </div>
                <label className="block text-xs font-medium mt-2" style={{ color: 'rgb(var(--text-secondary))' }}>Explain why</label>
                <textarea
                  value={answer}
                  onChange={e => updateAnswer(e.target.value)}
                  placeholder="AO2 because it focuses on method and effect..."
                  rows={2}
                  className="w-full rounded-lg border p-3 text-sm resize-none"
                  style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                />
              </div>
              {showWhy && (
                <div className="rounded-lg p-3 flex items-start gap-2" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <BookOpen size={18} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <p className="text-sm" style={{ color: 'rgb(var(--text))' }}>
                    <strong>Correct: {drill.correctAO}</strong> — {drill.whyCorrect}
                  </p>
                </div>
              )}
              {!showWhy && (
                <button
                  type="button"
                  onClick={() => setShowWhy(true)}
                  className="flex items-center gap-2 text-sm font-medium"
                  style={{ color: 'rgb(var(--accent))' }}
                >
                  <Lightbulb size={16} />
                  Show correct AO and why
                </button>
              )}
            </>
          )}

          {/* Drill Type E: Misuse Detection — which to keep; builds examiner thinking */}
          {isEliminateWeak(drill) && (
            <>
              <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{DRILL_TYPE_LABELS.eliminateWeakQuote}</p>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{drill.question}</p>
              <p className="text-xs" style={{ color: 'rgb(var(--muted))' }}>Select the ONE quote to KEEP. Others may be weak due to: no judgement, over-quoting, no focus.</p>
              <div className="space-y-2 pt-2">
                {drill.quoteOptionIds.map(quoteId => {
                  const q = getQuotationLabQuoteById(quoteId);
                  const isBest = quoteId === drill.bestQuoteId;
                  const isSelected = selectedQuoteId === quoteId;
                  return (
                    <button
                      key={quoteId}
                      type="button"
                      onClick={() => setSelectedQuoteId(quoteId)}
                      className="w-full rounded-lg border p-3 text-left text-sm transition"
                      style={{
                        borderColor: showWhy && isBest ? '#10B981' : isSelected ? 'rgb(var(--accent))' : 'rgb(var(--border))',
                        background: showWhy && isBest ? 'rgba(16, 185, 129, 0.1)' : isSelected ? 'rgba(var(--accent), 0.08)' : 'rgb(var(--surface-2))',
                      }}
                    >
                      <span className="italic" style={{ color: 'rgb(var(--text))' }}>"{q?.quote ?? quoteId}"</span>
                      {showWhy && isBest && (
                        <p className="mt-2 text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
                          <strong>Why keep this one:</strong> {drill.whyOthersWeak}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
              {!showWhy ? (
                <button
                  type="button"
                  onClick={() => setShowWhy(true)}
                  className="mt-3 flex items-center gap-2 text-sm font-medium"
                  style={{ color: 'rgb(var(--accent))' }}
                >
                  <Lightbulb size={16} />
                  Show which to keep and why others are weak
                </button>
              ) : null}
            </>
          )}

          {/* Drill: Context Weave (AO3) — add one contextual idea, not bolted on */}
          {isContextWeave(drill) && (
            <>
              <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{drill.prompt}</p>
              {(() => {
                const quote = getQuotationLabQuoteById(drill.quoteId);
                return quote ? (
                  <blockquote className="pl-4 border-l-2 italic mt-2" style={{ borderColor: '#8B5CF6', color: 'rgb(var(--text))' }}>
                    "{quote.quote}"
                  </blockquote>
                ) : null;
              })()}
              <div className="pt-2">
                <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                  Your contextual idea ({wordCount}/{drill.maxWords} words)
                </label>
                <textarea
                  value={answer}
                  onChange={e => updateAnswer(e.target.value)}
                  placeholder="Weave in one contextual idea that deepens the analysis..."
                  rows={2}
                  className="w-full rounded-lg border p-3 text-sm resize-none"
                  style={{
                    background: 'rgb(var(--surface-2))',
                    borderColor: wordCount > drill.maxWords ? '#F59E0B' : 'rgb(var(--border))',
                    color: 'rgb(var(--text))',
                  }}
                />
              </div>
              {drill.rewardNote && (
                <p className="text-xs mt-2" style={{ color: 'rgb(var(--muted))' }}>{drill.rewardNote}</p>
              )}
            </>
          )}

          {/* Drill: Misuse Detection — weak student sentence, multi-select reasons */}
          {isMisuseDetection(drill) && (
            <>
              <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{drill.prompt}</p>
              {(() => {
                const quote = getQuotationLabQuoteById(drill.quoteId);
                return quote ? (
                  <blockquote className="pl-4 border-l-2 italic text-sm mt-2" style={{ borderColor: '#8B5CF6', color: 'rgb(var(--text))' }}>
                    "{quote.quote}"
                  </blockquote>
                ) : null;
              })()}
              <p className="text-sm mt-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                Weak use: <em>"{drill.studentText}"</em>
              </p>
              <p className="text-xs mt-2" style={{ color: 'rgb(var(--muted))' }}>Select all that apply:</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {drill.reasonOptionIds.map(reasonId => {
                  const opt = MISUSE_REASON_OPTIONS.find(o => o.id === reasonId);
                  const label = opt?.label ?? reasonId;
                  const isSelected = selectedReasons.includes(reasonId);
                  const isCorrect = drill.correctReasonIds.includes(reasonId);
                  const showResult = showWhy;
                  return (
                    <button
                      key={reasonId}
                      type="button"
                      onClick={() => !showResult && toggleReason(reasonId)}
                      disabled={showResult}
                      className="px-3 py-2 rounded-lg text-sm font-medium transition"
                      style={{
                        background: showResult && isCorrect ? 'rgba(16, 185, 129, 0.2)' : isSelected ? 'rgba(var(--accent), 0.15)' : 'rgb(var(--surface-2))',
                        color: showResult && isCorrect ? '#059669' : 'rgb(var(--text))',
                        borderColor: showResult && isCorrect ? '#10B981' : isSelected ? 'rgb(var(--accent))' : 'rgb(var(--border))',
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              {!showWhy ? (
                <button
                  type="button"
                  onClick={() => setShowWhy(true)}
                  className="mt-3 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                  style={{ background: 'rgb(var(--accent))', color: 'white' }}
                >
                  Confirm
                </button>
              ) : (
                <div className="mt-3 rounded-lg p-3 flex items-start gap-2" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                  <BookOpen size={18} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                  <p className="text-sm" style={{ color: 'rgb(var(--text))' }}>{drill.whyWeak}</p>
                </div>
              )}
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => { setIndex(i => Math.max(0, i - 1)); resetState(); }}
          disabled={index === 0}
          className="flex items-center gap-1 text-sm font-medium disabled:opacity-50"
          style={{ color: 'rgb(var(--text))' }}
        >
          <ChevronLeft size={18} /> Previous
        </button>
        <span className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{index + 1} / {total}</span>
        <button
          type="button"
          onClick={() => { setIndex(i => Math.min(total - 1, i + 1)); resetState(); }}
          disabled={index === total - 1}
          className="flex items-center gap-1 text-sm font-medium disabled:opacity-50"
          style={{ color: 'rgb(var(--text))' }}
        >
          Next <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
