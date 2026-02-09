import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { vocabApi } from '../../utils/vocab';
import type { VocabSet, VocabWord, VocabConnotation, VocabWordClass } from '../../types/vocab';

const CONNOTATIONS: VocabConnotation[] = ['positive', 'negative', 'neutral'];
const WORD_CLASSES: VocabWordClass[] = ['noun', 'verb', 'adj', 'adv', 'other'];

export function AdminVocabWordsPage() {
  const [searchParams] = useSearchParams();
  const setIdParam = searchParams.get('setId');

  const [sets, setSets] = useState<VocabSet[]>([]);
  const [words, setWords] = useState<VocabWord[]>([]);
  const [selectedSetId, setSelectedSetId] = useState<string>(setIdParam || '');
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<VocabWord | null>(null);
  const [creating, setCreating] = useState(false);
  const [preview, setPreview] = useState<VocabWord | null>(null);
  const [form, setForm] = useState({
    word: '', pronunciation: '', definition: '', synonyms: '', antonyms: '',
    connotation: 'neutral' as VocabConnotation, word_class: 'noun' as VocabWordClass,
    example_sentence: '', common_misspellings: '', difficulty: 3, tags: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (setIdParam) setSelectedSetId(setIdParam);
  }, [setIdParam]);

  const loadSets = async () => {
    try {
      const data = await vocabApi.getSets();
      setSets(data);
      if (data.length && !selectedSetId) setSelectedSetId(data[0].id);
    } catch (e) {
      setError(String(e));
    }
  };

  const loadWords = async () => {
    if (!selectedSetId) { setWords([]); setLoading(false); return; }
    setLoading(true);
    try {
      const data = await vocabApi.getWordsBySetId(selectedSetId);
      setWords(data);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadSets(); }, []);
  useEffect(() => { loadWords(); }, [selectedSetId]);

  const parseList = (s: string) => s.split(/[,;]/).map(x => x.trim()).filter(Boolean);
  const saveCreate = async () => {
    if (!selectedSetId || !form.word.trim() || !form.definition.trim() || !form.example_sentence.trim()) return;
    setError(null);
    try {
      await vocabApi.createWord({
        set_id: selectedSetId,
        word: form.word,
        pronunciation: form.pronunciation || null,
        definition: form.definition,
        synonyms: parseList(form.synonyms),
        antonyms: parseList(form.antonyms),
        connotation: form.connotation,
        word_class: form.word_class,
        example_sentence: form.example_sentence,
        common_misspellings: parseList(form.common_misspellings),
        difficulty: form.difficulty,
        tags: parseList(form.tags),
      });
      setCreating(false);
      setForm({ word: '', pronunciation: '', definition: '', synonyms: '', antonyms: '', connotation: 'neutral', word_class: 'noun', example_sentence: '', common_misspellings: '', difficulty: 3, tags: '' });
      loadWords();
    } catch (e) {
      setError(String(e));
    }
  };

  const saveEdit = async () => {
    if (!editing) return;
    setError(null);
    try {
      await vocabApi.updateWord(editing.id, {
        word: form.word,
        pronunciation: form.pronunciation || null,
        definition: form.definition,
        synonyms: parseList(form.synonyms),
        antonyms: parseList(form.antonyms),
        connotation: form.connotation,
        word_class: form.word_class,
        example_sentence: form.example_sentence,
        common_misspellings: parseList(form.common_misspellings),
        difficulty: form.difficulty,
        tags: parseList(form.tags),
      });
      setEditing(null);
      loadWords();
    } catch (e) {
      setError(String(e));
    }
  };

  const deleteWord = async (id: string) => {
    if (!confirm('Delete this word?')) return;
    setError(null);
    try {
      await vocabApi.deleteWord(id);
      loadWords();
    } catch (e) {
      setError(String(e));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vocab Words</h1>
        <div className="flex gap-2">
          <Link to="/admin/vocab/sets" className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium">
            Sets
          </Link>
          <select
            value={selectedSetId}
            onChange={e => setSelectedSetId(e.target.value)}
            className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Select set</option>
            {sets.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => {
              setCreating(true);
              setForm({ word: '', pronunciation: '', definition: '', synonyms: '', antonyms: '', connotation: 'neutral', word_class: 'noun', example_sentence: '', common_misspellings: '', difficulty: 3, tags: '' });
            }}
            disabled={!selectedSetId}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium flex items-center gap-2 disabled:opacity-50"
          >
            <Plus size={18} /> New word
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-sm">{error}</div>
      )}

      {(creating || editing) && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800 space-y-3">
          <h3 className="font-semibold text-gray-900 dark:text-white">{editing ? 'Edit word' : 'New word'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input value={form.word} onChange={e => setForm(f => ({ ...f, word: e.target.value }))} placeholder="Word" className="rounded-lg border px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            <input value={form.pronunciation} onChange={e => setForm(f => ({ ...f, pronunciation: e.target.value }))} placeholder="Pronunciation" className="rounded-lg border px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            <textarea value={form.definition} onChange={e => setForm(f => ({ ...f, definition: e.target.value }))} placeholder="Definition" rows={2} className="rounded-lg border px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:col-span-2" />
            <input value={form.synonyms} onChange={e => setForm(f => ({ ...f, synonyms: e.target.value }))} placeholder="Synonyms (comma-separated)" className="rounded-lg border px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            <input value={form.antonyms} onChange={e => setForm(f => ({ ...f, antonyms: e.target.value }))} placeholder="Antonyms (comma-separated)" className="rounded-lg border px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            <select value={form.connotation} onChange={e => setForm(f => ({ ...f, connotation: e.target.value as VocabConnotation }))} className="rounded-lg border px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              {CONNOTATIONS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={form.word_class} onChange={e => setForm(f => ({ ...f, word_class: e.target.value as VocabWordClass }))} className="rounded-lg border px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              {WORD_CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <textarea value={form.example_sentence} onChange={e => setForm(f => ({ ...f, example_sentence: e.target.value }))} placeholder="Example sentence" rows={2} className="rounded-lg border px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white sm:col-span-2" />
            <input value={form.common_misspellings} onChange={e => setForm(f => ({ ...f, common_misspellings: e.target.value }))} placeholder="Common misspellings (comma)" className="rounded-lg border px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            <input type="number" min={1} max={5} value={form.difficulty} onChange={e => setForm(f => ({ ...f, difficulty: parseInt(e.target.value, 10) || 3 }))} className="rounded-lg border px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
            <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="Tags (comma)" className="rounded-lg border px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={editing ? saveEdit : saveCreate} className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium">Save</button>
            <button type="button" onClick={() => { setEditing(null); setCreating(false); }} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">Cancel</button>
          </div>
        </div>
      )}

      {preview && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Preview: {preview.word}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">{preview.definition}</p>
          <p className="text-sm italic text-gray-500 dark:text-gray-400 mt-1">&quot;{preview.example_sentence}&quot;</p>
          <button type="button" onClick={() => setPreview(null)} className="mt-2 text-sm text-red-600">Close</button>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500" /></div>
      ) : (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">Word</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">Definition</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">Class</th>
                <th className="w-32" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {words.map(w => (
                <tr key={w.id}>
                  <td className="px-4 py-3 text-gray-900 dark:text-white font-medium">{w.word}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300 text-sm max-w-xs truncate">{w.definition}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{w.word_class}</td>
                  <td className="px-4 py-3 flex gap-1">
                    <button type="button" onClick={() => setPreview(w)} className="p-1.5 rounded text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"><Eye size={16} /></button>
                    <button type="button" onClick={() => { setEditing(w); setForm({ word: w.word, pronunciation: w.pronunciation || '', definition: w.definition, synonyms: w.synonyms.join(', '), antonyms: w.antonyms.join(', '), connotation: w.connotation, word_class: w.word_class, example_sentence: w.example_sentence, common_misspellings: w.common_misspellings.join(', '), difficulty: w.difficulty, tags: w.tags.join(', ') }); }} className="p-1.5 rounded text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"><Pencil size={16} /></button>
                    <button type="button" onClick={() => deleteWord(w.id)} className="p-1.5 rounded text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {words.length === 0 && selectedSetId && (
            <p className="p-6 text-center text-gray-500 dark:text-gray-400">No words in this set.</p>
          )}
        </div>
      )}
    </div>
  );
}
