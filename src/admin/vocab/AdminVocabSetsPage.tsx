import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { vocabApi } from '../../utils/vocab';
import type { VocabSet, VocabSetMode, VocabTier } from '../../types/vocab';

const MODES: VocabSetMode[] = ['language_p1', 'language_p2', 'literature', 'general'];
const TIERS: VocabTier[] = ['core', 'stretch'];

export function AdminVocabSetsPage() {
  const [sets, setSets] = useState<VocabSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<VocabSet | null>(null);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: '', mode: 'literature' as VocabSetMode, theme_tag: '', tier: 'core' as VocabTier });
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const data = await vocabApi.getSets();
      setSets(data);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const saveCreate = async () => {
    if (!form.name.trim() || !form.theme_tag.trim()) return;
    setError(null);
    try {
      await vocabApi.createSet(form);
      setCreating(false);
      setForm({ name: '', mode: 'literature', theme_tag: '', tier: 'core' });
      load();
    } catch (e) {
      setError(String(e));
    }
  };

  const saveEdit = async () => {
    if (!editing || !form.name.trim() || !form.theme_tag.trim()) return;
    setError(null);
    try {
      await vocabApi.updateSet(editing.id, form);
      setEditing(null);
      load();
    } catch (e) {
      setError(String(e));
    }
  };

  const deleteSet = async (id: string) => {
    if (!confirm('Delete this set and all its words?')) return;
    setError(null);
    try {
      await vocabApi.deleteSet(id);
      load();
    } catch (e) {
      setError(String(e));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vocab Sets</h1>
        <div className="flex gap-2">
          <Link
            to="/admin/vocab/words"
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium"
          >
            Words
          </Link>
          <Link
            to="/admin/vocab/import"
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium"
          >
            Import
          </Link>
          <Link
            to="/admin/vocab/export"
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium"
          >
            Export
          </Link>
          <button
            type="button"
            onClick={() => { setCreating(true); setForm({ name: '', mode: 'literature', theme_tag: '', tier: 'core' }); }}
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium flex items-center gap-2"
          >
            <Plus size={18} /> New set
          </button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 text-sm">
          {error}
        </div>
      )}

      {creating && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">New set</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <input
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Name"
              className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              value={form.theme_tag}
              onChange={e => setForm(f => ({ ...f, theme_tag: e.target.value }))}
              placeholder="Theme tag"
              className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <select
              value={form.mode}
              onChange={e => setForm(f => ({ ...f, mode: e.target.value as VocabSetMode }))}
              className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {MODES.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <select
              value={form.tier}
              onChange={e => setForm(f => ({ ...f, tier: e.target.value as VocabTier }))}
              className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {TIERS.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={saveCreate} className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium">
              Create
            </button>
            <button type="button" onClick={() => setCreating(false)} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
              Cancel
            </button>
          </div>
        </div>
      )}

      {editing && (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
          <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Edit set</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <input
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Name"
              className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              value={form.theme_tag}
              onChange={e => setForm(f => ({ ...f, theme_tag: e.target.value }))}
              placeholder="Theme tag"
              className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <select
              value={form.mode}
              onChange={e => setForm(f => ({ ...f, mode: e.target.value as VocabSetMode }))}
              className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {MODES.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
            <select
              value={form.tier}
              onChange={e => setForm(f => ({ ...f, tier: e.target.value as VocabTier }))}
              className="rounded-lg border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {TIERS.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={saveEdit} className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium">
              Save
            </button>
            <button type="button" onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
              Cancel
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500" />
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">Name</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">Mode</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">Theme</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">Tier</th>
                <th className="w-24" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sets.map(s => (
                <tr key={s.id}>
                  <td className="px-4 py-3 text-gray-900 dark:text-white">{s.name}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{s.mode}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{s.theme_tag}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{s.tier}</td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => { setEditing(s); setForm({ name: s.name, mode: s.mode, theme_tag: s.theme_tag, tier: s.tier }); }}
                      className="p-1.5 rounded text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteSet(s.id)}
                      className="p-1.5 rounded text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <Trash2 size={16} />
                    </button>
                    <Link
                      to={`/admin/vocab/words?setId=${s.id}`}
                      className="p-1.5 rounded text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 inline-block"
                    >
                      Words
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
