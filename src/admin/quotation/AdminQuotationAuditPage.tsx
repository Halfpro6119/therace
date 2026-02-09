import { useState, useMemo } from 'react';
import { BarChart3, TrendingUp, TrendingDown, AlertTriangle, Star, Filter } from 'lucide-react';
import type { QuotationLabSourceId, QuotationLabQuote, QuoteConfidenceLevel } from '../../types/englishCampus';
import {
  QUOTATION_LAB_SOURCE_IDS,
  getQuotationLabQuotesBySource,
  getQuotationLabSourceLabel,
  GOLD_QUOTE_IDS,
  isGoldQuote,
  validateQuoteForQuality,
  classifyQuoteTier,
} from '../../config/quotationLabData';
import { storage } from '../../utils/storage';

interface QuoteStats {
  quote: QuotationLabQuote;
  familiarity: number;
  misuseCount: number;
  confidence: QuoteConfidenceLevel;
  isGold: boolean;
  qualityTier: string;
  validationErrors: string[];
}

export function AdminQuotationAuditPage() {
  const [selectedSource, setSelectedSource] = useState<QuotationLabSourceId>('Macbeth');
  const [filterTier, setFilterTier] = useState<'all' | 'anchor' | 'support' | 'archived'>('all');
  const [filterGold, setFilterGold] = useState<'all' | 'gold' | 'non-gold'>('all');

  const allQuotes = getQuotationLabQuotesBySource(selectedSource);
  const progress = storage.getQuotationLabProgressBySource(selectedSource);

  const quoteStats = useMemo((): QuoteStats[] => {
    return allQuotes.map(quote => {
      const familiarity = progress?.quoteFamiliarity?.[quote.id] ?? 0;
      const misuseCount = progress?.quoteMisuseCount?.[quote.id] ?? 0;
      const confidence = storage.getQuoteConfidence(selectedSource, quote.id);
      const validation = validateQuoteForQuality(quote);
      const tier = quote.qualityTier ?? classifyQuoteTier(quote);

      return {
        quote,
        familiarity,
        misuseCount,
        confidence,
        isGold: isGoldQuote(selectedSource, quote.id),
        qualityTier: tier,
        validationErrors: validation.errors,
      };
    });
  }, [allQuotes, progress, selectedSource]);

  const filteredStats = useMemo(() => {
    return quoteStats.filter(stat => {
      if (filterTier !== 'all' && stat.qualityTier !== filterTier) return false;
      if (filterGold === 'gold' && !stat.isGold) return false;
      if (filterGold === 'non-gold' && stat.isGold) return false;
      return true;
    });
  }, [quoteStats, filterTier, filterGold]);

  const summary = useMemo(() => {
    const total = quoteStats.length;
    const gold = quoteStats.filter(s => s.isGold).length;
    const anchor = quoteStats.filter(s => s.qualityTier === 'anchor').length;
    const support = quoteStats.filter(s => s.qualityTier === 'support').length;
    const archived = quoteStats.filter(s => s.qualityTier === 'archived').length;
    const avgFamiliarity = total > 0 ? quoteStats.reduce((sum, s) => sum + s.familiarity, 0) / total : 0;
    const totalMisuse = quoteStats.reduce((sum, s) => sum + s.misuseCount, 0);
    const highMisuse = quoteStats.filter(s => s.misuseCount >= 2).length;
    const lowConfidence = quoteStats.filter(s => s.confidence === 'red').length;

    return {
      total,
      gold,
      anchor,
      support,
      archived,
      avgFamiliarity: avgFamiliarity.toFixed(1),
      totalMisuse,
      highMisuse,
      lowConfidence,
    };
  }, [quoteStats]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quotation Lab Audit</h1>
      </div>

      {/* Source selector */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Source:</label>
        <select
          value={selectedSource}
          onChange={e => setSelectedSource(e.target.value as QuotationLabSourceId)}
          className="px-3 py-2 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          {QUOTATION_LAB_SOURCE_IDS.map(id => (
            <option key={id} value={id}>
              {getQuotationLabSourceLabel(id)}
            </option>
          ))}
        </select>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="rounded-lg border p-4 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <BarChart3 size={18} />
            Total Quotes
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{summary.total}</p>
        </div>
        <div className="rounded-lg border p-4 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Star size={18} className="text-yellow-500" />
            Gold Quotes
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{summary.gold}</p>
        </div>
        <div className="rounded-lg border p-4 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <TrendingUp size={18} className="text-green-500" />
            Avg Familiarity
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{summary.avgFamiliarity}</p>
        </div>
        <div className="rounded-lg border p-4 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <AlertTriangle size={18} className="text-red-500" />
            High Misuse
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{summary.highMisuse}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter:</span>
        </div>
        <div className="flex gap-2">
          {(['all', 'anchor', 'support', 'archived'] as const).map(tier => (
            <button
              key={tier}
              type="button"
              onClick={() => setFilterTier(tier)}
              className={`px-3 py-1 rounded-lg text-sm font-medium capitalize ${
                filterTier === tier
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {(['all', 'gold', 'non-gold'] as const).map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => setFilterGold(opt)}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                filterGold === opt
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {opt === 'non-gold' ? 'Non-Gold' : opt === 'all' ? 'All' : 'Gold'}
            </button>
          ))}
        </div>
      </div>

      {/* Quote table */}
      <div className="rounded-lg border overflow-hidden bg-white dark:bg-gray-800">
        <table className="w-full">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Quote</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Tier</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Gold</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Familiarity</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Misuse</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Confidence</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 dark:text-gray-300">Issues</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredStats.map(stat => (
              <tr key={stat.quote.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-4 py-3">
                  <div className="max-w-md">
                    <p className="text-sm italic text-gray-900 dark:text-white">"{stat.quote.quote}"</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.quote.location ?? '—'}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                      stat.qualityTier === 'anchor'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : stat.qualityTier === 'support'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {stat.qualityTier}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {stat.isGold ? (
                    <Star size={16} className="text-yellow-500 fill-current" />
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-full rounded-full bg-blue-500"
                        style={{ width: `${Math.min(100, (stat.familiarity / 3) * 100)}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{stat.familiarity}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-sm font-medium ${
                      stat.misuseCount >= 2
                        ? 'text-red-600 dark:text-red-400'
                        : stat.misuseCount === 1
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    {stat.misuseCount}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      stat.confidence === 'green'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : stat.confidence === 'amber'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {stat.confidence}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {stat.validationErrors.length > 0 ? (
                    <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                      <AlertTriangle size={14} />
                      <span className="text-xs">{stat.validationErrors.length}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredStats.length === 0 && (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">
            No quotes match the filters.
          </div>
        )}
      </div>

      {/* Quality breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-lg border p-4 bg-white dark:bg-gray-800">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quality Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Anchor</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{summary.anchor}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Support</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{summary.support}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Archived</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{summary.archived}</span>
            </div>
          </div>
        </div>
        <div className="rounded-lg border p-4 bg-white dark:bg-gray-800">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Usage Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Misuse</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{summary.totalMisuse}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">High Misuse (≥2)</span>
              <span className="text-sm font-medium text-red-600 dark:text-red-400">{summary.highMisuse}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Low Confidence</span>
              <span className="text-sm font-medium text-red-600 dark:text-red-400">{summary.lowConfidence}</span>
            </div>
          </div>
        </div>
        <div className="rounded-lg border p-4 bg-white dark:bg-gray-800">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recommendations</h3>
          <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
            {summary.gold < 8 && (
              <p>• Add more gold quotes (target: 8–12 per text)</p>
            )}
            {summary.highMisuse > 0 && (
              <p>• Review quotes with high misuse rates</p>
            )}
            {summary.archived > 0 && (
              <p>• Archived quotes are hidden from students</p>
            )}
            {summary.lowConfidence > summary.total * 0.3 && (
              <p>• Many quotes have low confidence — consider improving quality</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
