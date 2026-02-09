import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Upload, FileJson } from 'lucide-react';
import { vocabApi } from '../../utils/vocab';
import type { VocabSetMode, VocabTier, VocabConnotation, VocabWordClass } from '../../types/vocab';

interface ImportSet {
  name: string;
  mode: VocabSetMode;
  theme_tag: string;
  tier: VocabTier;
}

interface ImportWord {
  word: string;
  definition: string;
  synonyms?: string[];
  antonyms?: string[];
  connotation: VocabConnotation;
  word_class: VocabWordClass;
  example_sentence: string;
  difficulty?: number;
  tags?: string[];
  common_misspellings?: string[];
}

interface ImportPayload {
  set: ImportSet;
  words: ImportWord[];
}

const REQUIRED_WORD = ['word', 'definition', 'connotation', 'word_class', 'example_sentence'];

export function AdminVocabImportPage() {
  const [raw, setRaw] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [result, setResult] = useState<{ created: number; updated: number; errors: string[] } | null>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.name.endsWith('.json') && !file.type.includes('json')) return;
    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      if (typeof text === 'string') setRaw(text);
    };
    reader.readAsText(file);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const onFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  }, [handleFile]);

  const validate = (payload: unknown): { ok: true; data: ImportPayload } | { ok: false; errors: string[] } => {
    const errors: string[] = [];
    if (!payload || typeof payload !== 'object') {
      return { ok: false, errors: ['Invalid JSON or not an object'] };
    }
    const p = payload as Record<string, unknown>;
    if (!p.set || typeof p.set !== 'object') errors.push('Missing or invalid "set"');
    const set = p.set as Record<string, unknown>;
    if (set && typeof set === 'object') {
      if (!set.name || typeof set.name !== 'string') errors.push('set.name is required (string)');
      if (!set.mode || typeof set.mode !== 'string') errors.push('set.mode is required (string)');
      if (!set.theme_tag || typeof set.theme_tag !== 'string') errors.push('set.theme_tag is required (string)');
      if (!set.tier || typeof set.tier !== 'string') errors.push('set.tier is required (string)');
    }
    if (!Array.isArray(p.words)) errors.push('"words" must be an array');
    const words = (p.words || []) as Record<string, unknown>[];
    words.forEach((w, i) => {
      for (const key of REQUIRED_WORD) {
        if (w[key] === undefined || w[key] === null || (typeof w[key] === 'string' && (w[key] as string).trim() === ''))
          errors.push(`words[${i}].${key} is required`);
      }
      if (w.connotation && !['positive', 'negative', 'neutral'].includes(String(w.connotation)))
        errors.push(`words[${i}].connotation must be positive, negative, or neutral`);
      if (w.word_class && !['noun', 'verb', 'adj', 'adv', 'other'].includes(String(w.word_class)))
        errors.push(`words[${i}].word_class must be noun, verb, adj, adv, or other`);
    });
    if (errors.length) return { ok: false, errors };
    return { ok: true, data: payload as ImportPayload };
  };

  const runImport = async () => {
    let payload: unknown;
    try {
      payload = JSON.parse(raw);
    } catch {
      setResult({ created: 0, updated: 0, errors: ['Invalid JSON'] });
      return;
    }
    const v = validate(payload);
    if (!v.ok) {
      setResult({ created: 0, updated: 0, errors: v.errors });
      return;
    }
    setLoading(true);
    setResult(null);
    const errors: string[] = [];
    let wordsCreated = 0, wordsUpdated = 0;
    try {
      const { set: setPayload, words: wordsPayload } = v.data;
      const allSets = await vocabApi.getSets();
      let setId = allSets.find(s => s.name === setPayload.name && s.mode === setPayload.mode && s.tier === setPayload.tier)?.id;
      if (!setId) {
        const newSet = await vocabApi.createSet({
          name: setPayload.name,
          mode: setPayload.mode,
          theme_tag: setPayload.theme_tag,
          tier: setPayload.tier,
        });
        setId = newSet.id;
      }
      const existingWords = await vocabApi.getWordsBySetId(setId);
      const existingByWord = new Map(existingWords.map(w => [w.word.toLowerCase(), w]));
      for (let i = 0; i < wordsPayload.length; i++) {
        const w = wordsPayload[i];
        try {
          const wordLower = w.word.trim().toLowerCase();
          const existing = existingByWord.get(wordLower);
          const payload = {
            set_id: setId!,
            word: w.word.trim(),
            definition: w.definition.trim(),
            synonyms: Array.isArray(w.synonyms) ? w.synonyms : [],
            antonyms: Array.isArray(w.antonyms) ? w.antonyms : [],
            connotation: w.connotation,
            word_class: w.word_class,
            example_sentence: w.example_sentence.trim(),
            common_misspellings: Array.isArray(w.common_misspellings) ? w.common_misspellings : [],
            difficulty: Math.min(5, Math.max(1, w.difficulty ?? 3)),
            tags: Array.isArray(w.tags) ? w.tags : [],
          };
          if (existing) {
            await vocabApi.updateWord(existing.id, payload);
            wordsUpdated++;
          } else {
            await vocabApi.createWord(payload);
            wordsCreated++;
            existingByWord.set(wordLower, { id: '', ...payload, set_id: setId!, created_at: '' } as any);
          }
        } catch (e) {
          errors.push(`words[${i}] (${w.word}): ${String(e)}`);
        }
      }
      setResult({ created: wordsCreated, updated: wordsUpdated, errors });
    } catch (e) {
      setResult({ created: 0, updated: 0, errors: [String(e)] });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vocab JSON Import</h1>
        <Link to="/admin/vocab/sets" className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium">
          Back to Sets
        </Link>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Paste or upload JSON with shape: <code className="bg-gray-100 dark:bg-gray-700 px-1 rounded">{"{ set: { name, mode, theme_tag, tier }, words: [ { word, definition, synonyms, antonyms, connotation, word_class, example_sentence, difficulty?, tags?, common_misspellings? } ] }"}</code>
      </p>

      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={`rounded-xl border-2 border-dashed overflow-hidden transition-colors ${dragOver ? 'border-red-500 bg-red-50 dark:bg-red-900/20 dark:border-red-500' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'}`}
      >
        <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center gap-2 bg-gray-50 dark:bg-gray-700/50">
          <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm font-medium cursor-pointer hover:bg-red-600">
            <FileJson size={16} />
            Choose JSON file
            <input type="file" accept=".json,application/json" onChange={onFileInputChange} className="hidden" />
          </label>
          <span className="text-xs text-gray-500 dark:text-gray-400">or drag and drop a .json file here</span>
        </div>
        <textarea
          value={raw}
          onChange={e => setRaw(e.target.value)}
          placeholder='{"set": {"name": "Rhetoric", "mode": "language_p2", "theme_tag": "Rhetoric", "tier": "core"}, "words": [...]}'
          rows={14}
          className="w-full p-4 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-0 focus:ring-0 resize-y"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={runImport}
          disabled={loading || !raw.trim()}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white font-medium disabled:opacity-50"
        >
          <Upload size={18} />
          {loading ? 'Importing…' : 'Import'}
        </button>
      </div>

      {result && (
        <div className={`rounded-xl border p-4 ${result.errors.length ? 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800' : 'border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-800'}`}>
          <p className="font-medium text-gray-900 dark:text-white">
            Created: {result.created} · Updated: {result.updated}
          </p>
          {result.errors.length > 0 && (
            <ul className="mt-2 text-sm text-red-700 dark:text-red-300 list-disc list-inside">
              {result.errors.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
