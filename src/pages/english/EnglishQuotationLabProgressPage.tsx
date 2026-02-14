import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, BarChart3, Thermometer, AlertCircle, MessageSquare } from 'lucide-react';
import type { QuotationLabSourceId } from '../../types/englishCampus';
import {
  getQuotationLabQuotesBySource,
  getQuotationLabSourceLabel,
  QUOTATION_LAB_SOURCE_IDS,
} from '../../config/quotationLabData';
import { storage } from '../../utils/storage';

function familiarityLevel(count: number): { label: string; color: string; pct: number } {
  if (count >= 3) return { label: 'Fluent', color: '#10B981', pct: 100 };
  if (count >= 2) return { label: 'Secure', color: '#0EA5E9', pct: 66 };
  if (count >= 1) return { label: 'Learning', color: '#F59E0B', pct: 33 };
  return { label: 'New', color: 'rgb(var(--muted))', pct: 0 };
}

/** Examiner-style grade ceiling feedback based on AO balance */
function getExaminerGradeCeiling(aoBalance: { AO1: number; AO2: number; AO3: number }): string[] {
  const ao1 = aoBalance.AO1 ?? 0.4;
  const ao2 = aoBalance.AO2 ?? 0.4;
  const ao3 = aoBalance.AO3 ?? 0.2;

  const messages: string[] = [];

  if (ao3 < 0.15) {
    messages.push('AO3 underused → Grade 8 ceiling. Weave context naturally.');
  }
  if (ao2 < 0.25) {
    messages.push('This analysis identifies method but lacks purpose. Link technique to effect.');
  }
  if (ao1 < 0.25) {
    messages.push('AO1 weak. Strengthen argument and evidence selection.');
  }
  if (ao3 >= 0.2 && ao2 >= 0.35 && ao1 >= 0.35) {
    messages.push('Strong AO1 & AO2. Good AO3 integration.');
  }
  if (ao3 >= 0.25) {
    messages.push('Context is relevant and integrated.');
  }
  if (ao2 >= 0.4 && ao3 < 0.2) {
    messages.push('Strong AO1 & AO2. AO3 underused → Grade 8 ceiling.');
  }

  return messages;
}

export function EnglishQuotationLabProgressPage() {
  const navigate = useNavigate();
  const { sourceId } = useParams<{ sourceId: string }>();
  const validSource = sourceId && QUOTATION_LAB_SOURCE_IDS.includes(sourceId as QuotationLabSourceId)
    ? (sourceId as QuotationLabSourceId)
    : 'Macbeth';
  const quotes = getQuotationLabQuotesBySource(validSource);
  const label = getQuotationLabSourceLabel(validSource);
  const progress = storage.getQuotationLabProgressBySource(validSource);

  const quoteFamiliarity = progress?.quoteFamiliarity ?? {};
  const aoBalance = progress?.aoBalance ?? { AO1: 0.4, AO2: 0.4, AO3: 0.2 };
  const gradeCeiling = progress?.gradeCeilingIndicator;
  const weakThemes = progress?.weakThemes ?? [];

  const heatmapData = useMemo(() => {
    return quotes.map(q => {
      const count = quoteFamiliarity[q.id] ?? 0;
      const level = familiarityLevel(count);
      const confidence = storage.getQuoteConfidence(validSource, q.id);
      return { quote: q, count, confidence, ...level };
    });
  }, [quotes, quoteFamiliarity, validSource]);

  /** Theme confidence: aggregate familiarity by theme */
  const themeConfidenceMap = useMemo(() => {
    const map: Record<string, { total: number; familiar: number }> = {};
    for (const q of quotes) {
      for (const theme of q.themes) {
        if (!map[theme]) map[theme] = { total: 0, familiar: 0 };
        map[theme].total += 1;
        const count = quoteFamiliarity[q.id] ?? 0;
        if (count >= 2) map[theme].familiar += 1;
      }
    }
    return Object.entries(map).map(([theme, { total, familiar }]) => ({
      theme,
      pct: total > 0 ? Math.round((familiar / total) * 100) : 0,
    })).sort((a, b) => b.pct - a.pct);
  }, [quotes, quoteFamiliarity]);

  const examinerFeedback = useMemo(
    () => getExaminerGradeCeiling(aoBalance),
    [aoBalance]
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
          <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            Progress — {label}
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            Quote familiarity, theme confidence, AO balance, grade ceiling
          </p>
        </div>
      </div>

      {/* Source switcher — switch between texts */}
      <div className="flex flex-wrap gap-2">
        {QUOTATION_LAB_SOURCE_IDS.map(sid => {
          const isActive = validSource === sid;
          return (
            <button
              key={sid}
              type="button"
              onClick={() => navigate(`/english-campus/literature/quotation-lab/progress/${sid}`)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                isActive ? 'ring-2' : ''
              }`}
              style={{
                background: isActive ? 'var(--gradient-primary)' : 'rgb(var(--surface-2))',
                color: isActive ? 'white' : 'rgb(var(--text-secondary))',
                borderColor: isActive ? 'transparent' : 'rgb(var(--border))',
              }}
            >
              {getQuotationLabSourceLabel(sid)}
            </button>
          );
        })}
      </div>

      <section className="rounded-xl border p-5" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <h2 className="font-semibold flex items-center gap-2 mb-3" style={{ color: 'rgb(var(--text))' }}>
          <Thermometer size={18} />
          Per quote
        </h2>
        <p className="text-xs mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
          Green = confidently used · Amber = partial · Red = avoided or misused
        </p>
        <div className="space-y-2">
          {heatmapData.map(({ quote: q, count, confidence, label: levelLabel, color, pct }) => {
            const isWeak = weakThemes.some(t => q.themes.some(th => th.toLowerCase().includes(t.toLowerCase())));
            const status = count >= 2 && !isWeak ? 'ok' : count >= 1 ? 'progress' : 'weak';
            const confColor = confidence === 'green' ? '#10B981' : confidence === 'amber' ? '#F59E0B' : '#EF4444';
            return (
              <div key={q.id} className="flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ background: confColor }}
                  title={confidence === 'green' ? 'Confidently used' : confidence === 'amber' ? 'Partial understanding' : 'Avoided or misused'}
                  aria-hidden
                />
                <div
                  className="w-20 h-5 rounded flex-shrink-0 overflow-hidden"
                  style={{ background: 'rgb(var(--surface-2))' }}
                >
                  <div
                    className="h-full rounded transition-all"
                    style={{ width: `${pct}%`, background: color }}
                  />
                </div>
                <span className="text-sm truncate flex-1 italic" style={{ color: 'rgb(var(--text))' }}>
                  "{q.quote}"
                </span>
              </div>
            );
          })}
        </div>
        {heatmapData.length === 0 && (
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No quotes for this source. Use Quote Lab to see progress.</p>
        )}
      </section>

      {themeConfidenceMap.length > 0 && (
        <section className="rounded-xl border p-5" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <h2 className="font-semibold flex items-center gap-2 mb-3" style={{ color: 'rgb(var(--text))' }}>
            <BarChart3 size={18} />
            Per theme
          </h2>
          <p className="text-xs mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
            Green = flexible · Amber = narrow use · Red = avoided
          </p>
          <div className="flex flex-wrap gap-2">
            {themeConfidenceMap.map(({ theme, pct }) => {
              const heat = pct >= 66 ? 'green' : pct >= 33 ? 'amber' : 'red';
              return (
                <div
                  key={theme}
                  className="px-3 py-1.5 rounded-lg text-sm flex items-center gap-2"
                  style={{
                    background: heat === 'green' ? 'rgba(16, 185, 129, 0.2)' : heat === 'amber' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.15)',
                    color: heat === 'green' ? '#059669' : heat === 'amber' ? '#D97706' : '#DC2626',
                  }}
                >
                  <span>{theme}</span>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <section className="rounded-xl border p-5" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <h2 className="font-semibold flex items-center gap-2 mb-3" style={{ color: 'rgb(var(--text))' }}>
          <BarChart3 size={18} />
          AO balance tracker
        </h2>
        <p className="text-xs mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
          Top-band answers balance AO1 (response & evidence), AO2 (methods), and AO3 (context).
        </p>
        <div className="flex gap-4">
          {(['AO1', 'AO2', 'AO3'] as const).map(ao => (
            <div key={ao} className="flex-1">
              <p className="text-xs font-medium mb-1" style={{ color: 'rgb(var(--muted))' }}>{ao}</p>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgb(var(--surface-2))' }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${Math.round((aoBalance[ao] ?? 0) * 100)}%`, background: ao === 'AO1' ? '#8B5CF6' : ao === 'AO2' ? '#0EA5E9' : '#10B981' }}
                />
              </div>
              <p className="text-xs mt-0.5" style={{ color: 'rgb(var(--text-secondary))' }}>{Math.round((aoBalance[ao] ?? 0) * 100)}%</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border p-5" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <h2 className="font-semibold flex items-center gap-2 mb-3" style={{ color: 'rgb(var(--text))' }}>
          <MessageSquare size={18} />
          Grade ceiling indicator
        </h2>
        <p className="text-xs mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
          Motivational, not punitive. Shows what’s holding you back and how to reach the next grade.
        </p>
        <div className="space-y-2">
          {(gradeCeiling || examinerFeedback.length > 0) && (
            <div className="flex items-start gap-2 p-3 rounded-lg" style={{ background: 'rgba(245, 158, 11, 0.12)' }}>
              <AlertCircle size={18} style={{ color: '#F59E0B' }} className="flex-shrink-0 mt-0.5" />
              <p className="text-sm" style={{ color: 'rgb(var(--text))' }}>
                {gradeCeiling
                  ? (gradeCeiling.toLowerCase().startsWith("you're") ? gradeCeiling : `You're currently writing at Grade 7 because ${gradeCeiling}`)
                  : examinerFeedback.some(m => m.includes('Grade 8') || m.includes('underused'))
                    ? "You're currently writing at Grade 7 because AO2 lacks judgement."
                    : examinerFeedback[0] ?? 'Do more drills to see your grade ceiling here.'}
              </p>
            </div>
          )}
          {examinerFeedback.map((msg, i) => (
            <div
              key={i}
              className="flex items-start gap-2 p-3 rounded-lg text-sm"
              style={{
                background: msg.includes('Grade 8') || msg.includes('underused') ? 'rgba(245, 158, 11, 0.1)' : 'rgb(var(--surface-2))',
                color: 'rgb(var(--text))',
              }}
            >
              {msg.includes('Strong') || msg.includes('Good') ? (
                <span className="text-emerald-600 dark:text-emerald-400">✔</span>
              ) : (
                <AlertCircle size={16} style={{ color: '#F59E0B' }} className="flex-shrink-0 mt-0.5" />
              )}
              <span>{msg}</span>
            </div>
          ))}
          {weakThemes.length > 0 && (
            <p className="text-sm pt-2" style={{ color: 'rgb(var(--text-secondary))' }}>
              <span className="font-medium" style={{ color: 'rgb(var(--text))' }}>Themes to strengthen:</span>{' '}
              {weakThemes.join(', ')}
            </p>
          )}
        </div>
        {!progress && examinerFeedback.length <= 1 && (
          <p className="text-sm text-center py-4" style={{ color: 'rgb(var(--muted))' }}>
            Do more Quote Lab and Drills to see your grade ceiling here.
          </p>
        )}
      </section>
    </div>
  );
}
