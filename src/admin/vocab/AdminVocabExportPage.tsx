import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import { vocabApi } from '../../utils/vocab';
import type { VocabSet } from '../../types/vocab';

export function AdminVocabExportPage() {
  const [sets, setSets] = useState<VocabSet[]>([]);
  const [selectedSetId, setSelectedSetId] = useState('');
  const [exportJson, setExportJson] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    vocabApi.getSets().then(setSets);
  }, []);

  const doExport = async () => {
    if (!selectedSetId) return;
    setLoading(true);
    setExportJson(null);
    try {
      const [set, words] = await Promise.all([
        vocabApi.getSet(selectedSetId),
        vocabApi.getWordsBySetId(selectedSetId),
      ]);
      if (!set) return;
      const payload = {
        set: {
          name: set.name,
          mode: set.mode,
          theme_tag: set.theme_tag,
          tier: set.tier,
        },
        words: words.map(w => ({
          word: w.word,
          definition: w.definition,
          synonyms: w.synonyms,
          antonyms: w.antonyms,
          connotation: w.connotation,
          word_class: w.word_class,
          example_sentence: w.example_sentence,
          common_misspellings: w.common_misspellings,
          difficulty: w.difficulty,
          tags: w.tags,
        })),
      };
      setExportJson(JSON.stringify(payload, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vocab JSON Export</h1>
        <Link to="/admin/vocab/sets" className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium">
          Back to Sets
        </Link>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={selectedSetId}
          onChange={e => setSelectedSetId(e.target.value)}
          className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="">Select a set</option>
          {sets.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
        <button
          type="button"
          onClick={doExport}
          disabled={loading || !selectedSetId}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white font-medium disabled:opacity-50"
        >
          <Download size={18} />
          {loading ? 'Exporting…' : 'Export'}
        </button>
      </div>

      {exportJson && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
          <pre className="p-4 text-sm overflow-auto max-h-[60vh] whitespace-pre-wrap font-mono text-gray-900 dark:text-white">
            {exportJson}
          </pre>
          <p className="p-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
            Copy the JSON above or use it for import elsewhere.
          </p>
        </div>
      )}
    </div>
  );
}
