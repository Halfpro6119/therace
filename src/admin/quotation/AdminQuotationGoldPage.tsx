import { useState, useMemo, useEffect } from 'react';
import { Star, Plus, X, Save } from 'lucide-react';
import type { QuotationLabSourceId, QuotationLabQuote } from '../../types/englishCampus';
import {
  QUOTATION_LAB_SOURCE_IDS,
  getQuotationLabQuotesBySource,
  getQuotationLabSourceLabel,
  GOLD_QUOTE_IDS,
  isGoldQuote,
} from '../../config/quotationLabData';

export function AdminQuotationGoldPage() {
  const [selectedSource, setSelectedSource] = useState<QuotationLabSourceId>('Macbeth');
  const [localGoldIds, setLocalGoldIds] = useState<Set<string>>(new Set(GOLD_QUOTE_IDS['Macbeth'] ?? []));
  const [saved, setSaved] = useState(false);

  const allQuotes = getQuotationLabQuotesBySource(selectedSource);
  const currentGoldIds = GOLD_QUOTE_IDS[selectedSource] ?? [];

  // Initialize local state when source changes
  useEffect(() => {
    const newGoldIds = GOLD_QUOTE_IDS[selectedSource] ?? [];
    setLocalGoldIds(new Set(newGoldIds));
    setSaved(false);
  }, [selectedSource]);

  const toggleGold = (quoteId: string) => {
    setLocalGoldIds(prev => {
      const next = new Set(prev);
      if (next.has(quoteId)) {
        next.delete(quoteId);
      } else {
        next.add(quoteId);
      }
      return next;
    });
    setSaved(false);
  };

  const saveGoldQuotes = () => {
    // Note: In a real implementation, this would update the GOLD_QUOTE_IDS config
    // For now, we'll show a message that this requires code changes
    const goldArray = Array.from(localGoldIds);
    console.log(`Gold quotes for ${selectedSource}:`, goldArray);
    alert(`Gold quotes updated for ${getQuotationLabSourceLabel(selectedSource)}.\n\nIn production, update GOLD_QUOTE_IDS in quotationLabData.ts:\n\n${selectedSource}: [${goldArray.map(id => `'${id}'`).join(', ')}]`);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const goldQuotes = useMemo(() => {
    return allQuotes.filter(q => localGoldIds.has(q.id));
  }, [allQuotes, localGoldIds]);

  const nonGoldQuotes = useMemo(() => {
    return allQuotes.filter(q => !localGoldIds.has(q.id));
  }, [allQuotes, localGoldIds]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gold Quote Management</h1>
        <button
          type="button"
          onClick={saveGoldQuotes}
          disabled={saved}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
            saved
              ? 'bg-green-500 text-white'
              : 'bg-red-500 text-white hover:bg-red-600'
          }`}
        >
          <Save size={18} />
          {saved ? 'Saved!' : 'Save Gold Quotes'}
        </button>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>Gold Quotes</strong> are shown first in drills and Exam Mode. Target: <strong>8–12 per text</strong>.
          These should be anchor quotes (high-value, flexible, ≤8 words, 2+ themes).
        </p>
      </div>

      {/* Source selector */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Source:</label>
        <select
          value={selectedSource}
          onChange={e => {
            const newSource = e.target.value as QuotationLabSourceId;
            setSelectedSource(newSource);
            setLocalGoldIds(new Set(GOLD_QUOTE_IDS[newSource] ?? []));
            setSaved(false);
          }}
          className="px-3 py-2 rounded-lg border bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        >
          {QUOTATION_LAB_SOURCE_IDS.map(id => (
            <option key={id} value={id}>
              {getQuotationLabSourceLabel(id)}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {localGoldIds.size} / {allQuotes.length} quotes selected ({localGoldIds.size >= 8 && localGoldIds.size <= 12 ? '✓' : '⚠'} target: 8–12)
        </span>
      </div>

      {/* Gold quotes */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Star size={20} className="text-yellow-500 fill-current" />
            Gold Quotes ({goldQuotes.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {goldQuotes.map(quote => (
              <div
                key={quote.id}
                className="rounded-lg border-2 border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 p-4 flex items-start justify-between"
              >
                <div className="flex-1">
                  <p className="text-sm italic text-gray-900 dark:text-white">"{quote.quote}"</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {quote.location ?? '—'} · {quote.themes.join(', ')}
                  </p>
                  {quote.qualityTier && (
                    <span
                      className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium ${
                        quote.qualityTier === 'anchor'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}
                    >
                      {quote.qualityTier}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => toggleGold(quote.id)}
                  className="ml-2 p-1 rounded hover:bg-yellow-200 dark:hover:bg-yellow-800"
                  title="Remove from gold"
                >
                  <X size={18} className="text-yellow-700 dark:text-yellow-300" />
                </button>
              </div>
            ))}
            {goldQuotes.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 col-span-2">
                No gold quotes selected. Add quotes from the list below.
              </p>
            )}
          </div>
        </div>

        {/* Non-gold quotes */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">All Quotes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {nonGoldQuotes.map(quote => (
              <div
                key={quote.id}
                className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 flex items-start justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                <div className="flex-1">
                  <p className="text-sm italic text-gray-900 dark:text-white">"{quote.quote}"</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {quote.location ?? '—'} · {quote.themes.join(', ')}
                  </p>
                  {quote.qualityTier && (
                    <span
                      className={`inline-block mt-2 px-2 py-0.5 rounded text-xs font-medium ${
                        quote.qualityTier === 'anchor'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : quote.qualityTier === 'support'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {quote.qualityTier}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => toggleGold(quote.id)}
                  className="ml-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                  title="Add to gold"
                >
                  <Star size={18} className="text-gray-400 hover:text-yellow-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
