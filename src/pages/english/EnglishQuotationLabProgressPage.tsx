import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, BarChart3, Thermometer, AlertCircle, MessageSquare } from 'lucide-react';
import type { QuotationLabSourceId } from '../../types/englishCampus';
import {
  getQuotationLabQuotesBySource,
  getQuotationLabSourceLabel,
} from '../../config/quotationLabData';
import { storage } from '../../utils/storage';

const SOURCE_IDS: QuotationLabSourceId[] = ['Macbeth', 'Ozymandias', 'London', 'Exposure'];

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
  const validSource = sourceId && SOURCE_IDS.includes(sourceId as QuotationLabSourceId)
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
      return { quote: q, count, ...level };
    });
  }, [quotes, quoteFamiliarity]);

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
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            Progress — {label}
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            Quote familiarity heatmap, theme confidence, AO balance, grade ceiling
          </p>
        </div>
      </div>

      <section className="rounded-xl border p-5" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <h2 className="font-semibold flex items-center gap-2 mb-3" style={{ color: 'rgb(var(--text))' }}>
          <Thermometer size={18} />
          Quote familiarity heatmap
        </h2>
        <p className="text-xs mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
          Practice quotes in the Quote Lab and Drills to build familiarity. More practice = higher heat.
        </p>
        <div className="space-y-2">
          {heatmapData.map(({ quote: q, count, label: levelLabel, color, pct }) => (
            <div key={q.id} className="flex items-center gap-3">
              <div
                className="w-24 h-6 rounded flex-shrink-0 overflow-hidden"
                style={{ background: 'rgb(var(--surface-2))' }}
              >
                <div
                  className="h-full rounded transition-all"
                  style={{ width: `${pct}%`, background: color }}
                />
              </div>
              <span className="text-xs w-14 flex-shrink-0" style={{ color: 'rgb(var(--muted))' }}>
                {levelLabel}
              </span>
              <span className="text-sm truncate flex-1 italic" style={{ color: 'rgb(var(--text))' }}>
                "{q.quote}"
              </span>
            </div>
          ))}
        </div>
        {heatmapData.length === 0 && (
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No quotes for this source. Complete Quote Lab to see heatmap.</p>
        )}
      </section>

      {themeConfidenceMap.length > 0 && (
        <section className="rounded-xl border p-5" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <h2 className="font-semibold flex items-center gap-2 mb-3" style={{ color: 'rgb(var(--text))' }}>
            <BarChart3 size={18} />
            Theme confidence
          </h2>
          <p className="text-xs mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
            % of quotes per theme you've practiced enough to feel secure.
          </p>
          <div className="flex flex-wrap gap-2">
            {themeConfidenceMap.map(({ theme, pct }) => (
              <div
                key={theme}
                className="px-3 py-1.5 rounded-lg text-sm flex items-center gap-2"
                style={{
                  background: pct >= 66 ? 'rgba(16, 185, 129, 0.15)' : pct >= 33 ? 'rgba(14, 165, 233, 0.15)' : 'rgb(var(--surface-2))',
                  color: pct >= 66 ? '#10B981' : pct >= 33 ? '#0EA5E9' : 'rgb(var(--text-secondary))',
                }}
              >
                <span>{theme}</span>
                <span className="text-xs font-medium">{pct}%</span>
              </div>
            ))}
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
          Examiner intelligence
        </h2>
        <p className="text-xs mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
          Examiner-style feedback based on your AO balance and progress.
        </p>
        <div className="space-y-2">
          {gradeCeiling && (
            <div className="flex items-start gap-2 p-3 rounded-lg" style={{ background: 'rgba(245, 158, 11, 0.15)' }}>
              <AlertCircle size={18} style={{ color: '#F59E0B' }} className="flex-shrink-0 mt-0.5" />
              <p className="text-sm" style={{ color: 'rgb(var(--text))' }}>{gradeCeiling}</p>
            </div>
          )}
          {examinerFeedback.map((msg, i) => (
            <div
              key={i}
              className="flex items-start gap-2 p-3 rounded-lg text-sm"
              style={{
                background: msg.includes('Grade 8') || msg.includes('underused') ? 'rgba(245, 158, 11, 0.12)' : 'rgb(var(--surface-2))',
                color: 'rgb(var(--text))',
              }}
            >
              {msg.includes('Strong') || msg.includes('Good') ? (
                <span className="text-emerald-600 dark:text-emerald-400">✓</span>
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
            Do more Quote Lab and Drills to see personalised examiner feedback and grade ceiling here.
          </p>
        )}
      </section>
    </div>
  );
}
