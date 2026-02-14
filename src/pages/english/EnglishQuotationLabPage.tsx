import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Library, BookOpen, Tag, Zap, CheckCircle, RefreshCw, AlertTriangle, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  QUOTATION_LAB_TEXT_SOURCE_IDS,
  QUOTATION_LAB_SOURCE_IDS,
  QUOTATION_LAB_THEME_IDS,
  CLUSTER_SOURCES,
  getQuotationLabSourceLabel,
  getQuotationLabQuotesBySource,
  getQuotationLabDrillsBySource,
  getQuotationLabClusterLabel,
  getQuotationLabThemeLabel,
  getQuotationLabQuotesByTheme,
} from '../../config/quotationLabData';
import type { QuotationLabSourceId, QuotationLabClusterId, QuotationLabThemeId } from '../../types/englishCampus';
import { storage } from '../../utils/storage';

/** Progress signals under each tile: no percentages, just counts/signals */
function useProgressSignals() {
  return useMemo(() => {
    const allProgress = storage.getQuotationLabProgress();
    let mastered = 0;
    let inProgress = 0;
    const weakThemeSet = new Set<string>();
    for (const sourceId of QUOTATION_LAB_SOURCE_IDS) {
      const prog = allProgress[sourceId as QuotationLabSourceId];
      if (!prog) continue;
      const fam = prog.quoteFamiliarity ?? {};
      for (const count of Object.values(fam)) {
        if (count >= 3) mastered += 1;
        else if (count >= 1) inProgress += 1;
      }
      (prog.weakThemes ?? []).forEach((t: string) => weakThemeSet.add(t));
    }
    return { mastered, inProgress, weakCount: weakThemeSet.size };
  }, []);
}

const TILE_BY_TEXT = {
  id: 'by-text',
  title: 'By Text',
  color: '#DC2626',
  bgLight: 'rgba(220, 38, 38, 0.12)',
  items: QUOTATION_LAB_TEXT_SOURCE_IDS,
  getLabel: (id: string) => getQuotationLabSourceLabel(id as QuotationLabSourceId),
  getPath: (id: string) => `/english-campus/literature/quotation-lab/quote-lab/${id}`,
  hasContent: (id: string) => getQuotationLabQuotesBySource(id as QuotationLabSourceId).length > 0,
};

const TILE_POETRY = {
  id: 'poetry',
  title: 'By Poetry Cluster',
  color: '#7C3AED',
  bgLight: 'rgba(124, 58, 237, 0.12)',
  clusters: true,
  getPath: (id: string) => `/english-campus/literature/quotation-lab/quote-lab/${id}`,
  hasContent: (id: string) => getQuotationLabQuotesBySource(id as QuotationLabSourceId).length > 0,
};

const TILE_THEME = {
  id: 'by-theme',
  title: 'By Theme',
  color: '#2563EB',
  bgLight: 'rgba(37, 99, 235, 0.12)',
  themeIds: QUOTATION_LAB_THEME_IDS,
  getLabel: (id: string) => getQuotationLabThemeLabel(id as QuotationLabThemeId),
  getPath: (id: string) => `/english-campus/literature/quotation-lab/theme/${id}`,
  getCount: (id: string) => getQuotationLabQuotesByTheme(id as QuotationLabThemeId).length,
};

const TILE_DRILL = {
  id: 'drill-mode',
  title: 'Drill Mode',
  color: '#059669',
  bgLight: 'rgba(5, 150, 105, 0.12)',
  subtitle: 'Randomised drills based on your weak areas',
  getPath: (sourceId: string) => `/english-campus/literature/quotation-lab/drills/${sourceId}`,
  hasDrills: (id: string) => getQuotationLabDrillsBySource(id as QuotationLabSourceId).length > 0,
  getDrillCount: (id: string) => getQuotationLabDrillsBySource(id as QuotationLabSourceId).length,
};

export function EnglishQuotationLabPage() {
  const navigate = useNavigate();
  const { mastered, inProgress, weakCount } = useProgressSignals();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/english-campus/literature')}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
            aria-label="Back"
          >
            <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
          </button>
          <div>
          <h1 className="text-2xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            Quotation Lab
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            Fewer quotes, used better — train selection not recall
          </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate(`/english-campus/literature/quotation-lab/progress/${QUOTATION_LAB_TEXT_SOURCE_IDS[0]}`)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition hover:opacity-90"
          style={{ background: 'var(--gradient-primary)', color: 'white' }}
        >
          <BarChart3 size={18} />
          My progress
        </button>
      </div>

      {/* Progress summary bar — consolidated, shown once */}
      {(mastered > 0 || inProgress > 0 || weakCount > 0) && (
        <div
          className="flex flex-wrap items-center gap-4 px-4 py-3 rounded-xl border"
          style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))' }}
        >
          <span className="flex items-center gap-1.5 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            <CheckCircle size={16} style={{ color: '#059669' }} /> {mastered} mastered
          </span>
          <span className="flex items-center gap-1.5 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            <RefreshCw size={16} style={{ color: '#2563EB' }} /> {inProgress} in progress
          </span>
          {weakCount > 0 && (
            <span className="flex items-center gap-1.5 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              <AlertTriangle size={16} style={{ color: '#D97706' }} /> {weakCount} weak themes
            </span>
          )}
        </div>
      )}

      {/* 3-column grid: 4 entry tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* By Text */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border overflow-hidden"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <div
            className="px-4 py-3 border-b"
            style={{ borderColor: 'rgb(var(--border))', background: TILE_BY_TEXT.bgLight }}
          >
            <h2 className="font-bold flex items-center gap-2" style={{ color: TILE_BY_TEXT.color }}>
              <Library size={20} />
              {TILE_BY_TEXT.title}
            </h2>
          </div>
          <div className="p-4 space-y-2">
            {TILE_BY_TEXT.items.map((sourceId: string) => {
              const label = TILE_BY_TEXT.getLabel(sourceId);
              const hasContent = TILE_BY_TEXT.hasContent(sourceId);
              return (
                <button
                  key={sourceId}
                  type="button"
                  disabled={!hasContent}
                  onClick={() => navigate(TILE_BY_TEXT.getPath(sourceId))}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium disabled:opacity-50 hover:opacity-90 transition"
                  style={{
                    background: hasContent ? 'rgb(var(--surface-2))' : 'transparent',
                    color: 'rgb(var(--text))',
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </motion.section>

        {/* By Poetry Cluster */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-xl border overflow-hidden"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <div
            className="px-4 py-3 border-b"
            style={{ borderColor: 'rgb(var(--border))', background: TILE_POETRY.bgLight }}
          >
            <h2 className="font-bold flex items-center gap-2" style={{ color: TILE_POETRY.color }}>
              <BookOpen size={20} />
              {TILE_POETRY.title}
            </h2>
          </div>
          <div className="p-4 space-y-2">
            {(Object.keys(CLUSTER_SOURCES) as QuotationLabClusterId[]).map(clusterId => {
              const label = getQuotationLabClusterLabel(clusterId);
              const sources = CLUSTER_SOURCES[clusterId];
              return (
                <div key={clusterId}>
                  <p className="text-xs font-medium mb-1.5" style={{ color: 'rgb(var(--muted))' }}>
                    {label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sources.map((sourceId: string) => {
                      const hasContent = TILE_POETRY.hasContent(sourceId);
                      const sourceLabel = getQuotationLabSourceLabel(sourceId as QuotationLabSourceId);
                      return (
                        <button
                          key={sourceId}
                          type="button"
                          disabled={!hasContent}
                          onClick={() => navigate(TILE_POETRY.getPath(sourceId))}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium disabled:opacity-50"
                          style={{
                            background: hasContent ? TILE_POETRY.bgLight : 'transparent',
                            color: TILE_POETRY.color,
                          }}
                        >
                          {sourceLabel}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* By Theme */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="rounded-xl border overflow-hidden"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <div
            className="px-4 py-3 border-b"
            style={{ borderColor: 'rgb(var(--border))', background: TILE_THEME.bgLight }}
          >
            <h2 className="font-bold flex items-center gap-2" style={{ color: TILE_THEME.color }}>
              <Tag size={20} />
              {TILE_THEME.title}
            </h2>
          </div>
          <div className="p-4 flex flex-wrap gap-2">
            {TILE_THEME.themeIds.map((themeId: string) => {
              const label = TILE_THEME.getLabel(themeId);
              const count = TILE_THEME.getCount(themeId);
              return (
                <button
                  key={themeId}
                  type="button"
                  onClick={() => navigate(TILE_THEME.getPath(themeId))}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium hover:opacity-90"
                  style={{
                    background: count > 0 ? TILE_THEME.bgLight : 'rgb(var(--surface-2))',
                    color: TILE_THEME.color,
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </motion.section>

        {/* Drill Mode — spans full width on 3-col so add as 4th or wrap; spec says 4 tiles, so 2x2 on large or 4th row */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border overflow-hidden sm:col-span-2 lg:col-span-1"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <div
            className="px-4 py-3 border-b"
            style={{ borderColor: 'rgb(var(--border))', background: TILE_DRILL.bgLight }}
          >
            <h2 className="font-bold flex items-center gap-2" style={{ color: TILE_DRILL.color }}>
              <Zap size={20} />
              {TILE_DRILL.title}
            </h2>
            {TILE_DRILL.subtitle && (
              <p className="text-xs mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                {TILE_DRILL.subtitle}
              </p>
            )}
          </div>
          <div className="p-4 flex flex-wrap gap-2">
            {QUOTATION_LAB_SOURCE_IDS.map((sourceId: string) => {
              const hasDrills = TILE_DRILL.hasDrills(sourceId);
              const drillCount = TILE_DRILL.getDrillCount?.(sourceId) ?? 0;
              const label = getQuotationLabSourceLabel(sourceId as QuotationLabSourceId);
              return (
                <button
                  key={sourceId}
                  type="button"
                  disabled={!hasDrills}
                  onClick={() => navigate(TILE_DRILL.getPath(sourceId))}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium disabled:opacity-50"
                  style={{
                    background: hasDrills ? TILE_DRILL.bgLight : 'rgb(var(--surface-2))',
                    color: hasDrills ? TILE_DRILL.color : 'rgb(var(--muted))',
                  }}
                >
                  {label}
                  {hasDrills && drillCount > 0 && (
                    <span className="ml-1 opacity-80">({drillCount})</span>
                  )}
                </button>
              );
            })}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
