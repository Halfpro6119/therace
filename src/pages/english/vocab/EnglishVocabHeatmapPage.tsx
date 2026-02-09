import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { vocabApi, getCurrentUserId } from '../../../utils/vocab';
import type { VocabSet, VocabMastery } from '../../../types/vocab';

function band(mastery: number): string {
  if (mastery <= 20) return 'rgb(239 68 68)';
  if (mastery <= 40) return 'rgb(249 115 22)';
  if (mastery <= 60) return 'rgb(234 179 8)';
  if (mastery <= 80) return 'rgb(34 197 94)';
  return 'rgb(22 163 74)';
}

export function EnglishVocabHeatmapPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<'theme' | 'set'>('theme');
  const [sets, setSets] = useState<VocabSet[]>([]);
  const [mastery, setMastery] = useState<VocabMastery[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const uid = await getCurrentUserId();
      setUserId(uid ?? null);
      try {
        const [setsData, masteryData] = uid
          ? await Promise.all([vocabApi.getSets(), vocabApi.getMasteryForUserAllWords(uid)])
          : [await vocabApi.getSets(), []];
        if (cancelled) return;
        setSets(setsData);
        setMastery(masteryData);
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const [bySet, setBySet] = useState<{ set: VocabSet; avg: number }[]>([]);
  const [byTheme, setByTheme] = useState<{ theme: string; avg: number }[]>([]);

  useEffect(() => {
    if (sets.length === 0) {
      setBySet([]);
      setByTheme([]);
      return;
    }
    const masteryByWord = new Map(mastery.map(m => [m.word_id, m.mastery]));
    let cancelled = false;
    (async () => {
      const setAvgs: { set: VocabSet; avg: number }[] = [];
      const themeSums = new Map<string, { sum: number; n: number }>();
      for (const s of sets) {
        const words = await vocabApi.getWordsBySetId(s.id);
        if (cancelled) return;
        let sum = 0, n = 0;
        for (const w of words) {
          const m = masteryByWord.get(w.id);
          if (m != null) { sum += m; n++; }
        }
        const avg = n ? Math.round(sum / n) : 0;
        setAvgs.push({ set: s, avg });
        const t = s.theme_tag;
        if (!themeSums.has(t)) themeSums.set(t, { sum: 0, n: 0 });
        themeSums.get(t)!.sum += sum;
        themeSums.get(t)!.n += n;
      }
      if (!cancelled) setBySet(setAvgs);
      const themeArr = Array.from(themeSums.entries()).map(([theme, v]) => ({
        theme,
        avg: v.n ? Math.round(v.sum / v.n) : 0,
      }));
      if (!cancelled) setByTheme(themeArr);
    })();
    return () => { cancelled = true; };
  }, [sets, mastery]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/english-campus/vocab')}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
        >
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
        </button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'rgb(var(--text))' }}>Heatmap</h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            Mastery by theme and set
          </p>
        </div>
      </div>

      {!userId && (
        <p className="text-sm" style={{ color: 'rgb(var(--muted))' }}>
          Sign in to see your mastery heatmap.
        </p>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500" />
        </div>
      ) : (
        <>
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              onClick={() => setView('theme')}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{
                background: view === 'theme' ? 'rgb(var(--accent))' : 'rgb(var(--surface-2))',
                color: view === 'theme' ? 'white' : 'rgb(var(--text))',
              }}
            >
              By theme
            </button>
            <button
              type="button"
              onClick={() => setView('set')}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{
                background: view === 'set' ? 'rgb(var(--accent))' : 'rgb(var(--surface-2))',
                color: view === 'set' ? 'white' : 'rgb(var(--text))',
              }}
            >
              By set
            </button>
          </div>

          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border p-4"
            style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
          >
            {view === 'theme' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {byTheme.map(({ theme, avg }) => (
                  <button
                    key={theme}
                    type="button"
                    onClick={() => navigate(`/english-campus/vocab/sets?theme=${encodeURIComponent(theme)}`)}
                    className="rounded-lg p-3 text-left text-sm font-medium transition"
                    style={{
                      background: band(avg),
                      color: avg <= 40 ? 'white' : 'rgba(0,0,0,0.8)',
                    }}
                  >
                    {theme}
                    <span className="block text-xs opacity-90">{avg}%</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {bySet.map(({ set: s, avg }) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => navigate(`/english-campus/vocab/set/${s.id}`)}
                    className="w-full rounded-lg p-3 flex items-center justify-between text-left"
                    style={{
                      background: band(avg) + '22',
                      borderLeft: `4px solid ${band(avg)}`,
                      color: 'rgb(var(--text))',
                    }}
                  >
                    <span className="font-medium">{s.name}</span>
                    <span className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{avg}%</span>
                  </button>
                ))}
              </div>
            )}
          </motion.section>

          <p className="text-xs" style={{ color: 'rgb(var(--muted))' }}>
            0–20% red, 21–40% orange, 41–60% yellow, 61–80% green, 81–100% dark green
          </p>
        </>
      )}
    </div>
  );
}