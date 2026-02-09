import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, Search, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { vocabApi, getCurrentUserId } from '../../../utils/vocab';
import type { VocabSet, VocabSetMode, VocabTier } from '../../../types/vocab';

const MODE_OPTIONS: { value: VocabSetMode | ''; label: string }[] = [
  { value: '', label: 'All' },
  { value: 'language_p1', label: 'Lang P1' },
  { value: 'language_p2', label: 'Lang P2' },
  { value: 'literature', label: 'Literature' },
  { value: 'general', label: 'General' },
];

const TIER_OPTIONS: { value: VocabTier | ''; label: string }[] = [
  { value: '', label: 'All' },
  { value: 'core', label: 'Core' },
  { value: 'stretch', label: 'Stretch' },
];

export function EnglishVocabSetsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const modeParam = searchParams.get('mode') as VocabSetMode | null;
  const sprintParam = searchParams.get('sprint') === '1';

  const [sets, setSets] = useState<VocabSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<VocabSetMode | ''>(modeParam || '');
  const [theme, setTheme] = useState('');
  const [tier, setTier] = useState<VocabTier | ''>('');
  const [difficultyMin, setDifficultyMin] = useState(1);
  const [difficultyMax, setDifficultyMax] = useState(5);
  const [search, setSearch] = useState('');
  const [masteryBySet, setMasteryBySet] = useState<Map<string, number>>(new Map());
  const [wordCountBySet, setWordCountBySet] = useState<Map<string, number>>(new Map());

  useEffect(() => {
    if (modeParam) setMode(modeParam);
  }, [modeParam]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const allSets = await vocabApi.getSets();
        if (cancelled) return;
        setSets(allSets);
        const uid = await getCurrentUserId();
        if (!uid) return;
        const counts = new Map<string, number>();
        const masterySums = new Map<string, { sum: number; n: number }>();
        for (const s of allSets) {
          const words = await vocabApi.getWordsBySetId(s.id);
          if (cancelled) return;
          counts.set(s.id, words.length);
          if (words.length === 0) continue;
          const mastery = await vocabApi.getMasteryForUser(uid, words.map(w => w.id));
          if (cancelled) return;
          let sum = 0, n = 0;
          mastery.forEach(m => {
            sum += m.mastery;
            n += 1;
          });
          masterySums.set(s.id, { sum, n });
        }
        setWordCountBySet(counts);
        const avgBySet = new Map<string, number>();
        masterySums.forEach((v, id) => {
          avgBySet.set(id, v.n ? Math.round(v.sum / v.n) : 0);
        });
        setMasteryBySet(avgBySet);
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const themes = Array.from(new Set(sets.map(s => s.theme_tag))).sort();
  const filtered = sets.filter(s => {
    if (mode && s.mode !== mode) return false;
    if (theme && s.theme_tag !== theme) return false;
    if (tier && s.tier !== tier) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!s.name.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/english-campus/vocab')}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Back"
        >
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
        </button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            Set Library
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            Filter and choose a set to practise
          </p>
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border p-4"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
              Mode
            </label>
            <select
              value={mode}
              onChange={e => setMode(e.target.value as VocabSetMode | '')}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface-2))', color: 'rgb(var(--text))' }}
            >
              {MODE_OPTIONS.map(o => (
                <option key={o.value || 'all'} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
              Theme
            </label>
            <select
              value={theme}
              onChange={e => setTheme(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface-2))', color: 'rgb(var(--text))' }}
            >
              <option value="">All</option>
              {themes.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
              Tier
            </label>
            <select
              value={tier}
              onChange={e => setTier(e.target.value as VocabTier | '')}
              className="w-full rounded-lg border px-3 py-2 text-sm"
              style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface-2))', color: 'rgb(var(--text))' }}
            >
              {TIER_OPTIONS.map(o => (
                <option key={o.value || 'all'} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
              Search set name
            </label>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgb(var(--muted))' }} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-lg border pl-9 pr-3 py-2 text-sm"
                style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface-2))', color: 'rgb(var(--text))' }}
              />
            </div>
          </div>
        </div>
        <p className="text-xs" style={{ color: 'rgb(var(--muted))' }}>
          Difficulty filter (1–5) applies when starting a session from a set.
        </p>
      </motion.section>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500" />
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <p className="text-center py-8" style={{ color: 'rgb(var(--text-secondary))' }}>
              No sets match your filters. Try changing mode or theme.
            </p>
          ) : (
            filtered.map((set, i) => {
              const wordCount = wordCountBySet.get(set.id) ?? 0;
              const masteryPct = masteryBySet.get(set.id) ?? 0;
              return (
                <motion.div
                  key={set.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.02 }}
                  className="rounded-xl border p-4 flex items-center justify-between"
                  style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
                >
                  <div>
                    <h3 className="font-bold" style={{ color: 'rgb(var(--text))' }}>{set.name}</h3>
                    <p className="text-sm mt-0.5" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {set.theme_tag} · {set.tier} · {set.mode.replace('_', ' ')}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'rgb(var(--muted))' }}>
                      {wordCount} words · Mastery: {masteryPct}%
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate(`/english-campus/vocab/set/${set.id}${sprintParam ? '?sprint=1' : ''}`)}
                    className="p-2 rounded-lg flex items-center gap-1 font-medium text-sm"
                    style={{ background: 'rgb(var(--accent))', color: 'white' }}
                  >
                    {sprintParam ? 'Streak Sprint' : 'Open'}
                    <ChevronRight size={18} />
                  </button>
                </motion.div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
