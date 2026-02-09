import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, BookMarked, Library, Flame, Wrench, Zap, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { vocabApi, getCurrentUserId } from '../../../utils/vocab';
import type { VocabSet } from '../../../types/vocab';

const MODE_LABELS: Record<string, string> = {
  language_p1: 'Language P1',
  language_p2: 'Language P2',
  literature: 'Literature',
  general: 'General',
};

export function EnglishVocabLabHomePage() {
  const navigate = useNavigate();
  const [sets, setSets] = useState<VocabSet[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [stats, setStats] = useState({
    masteredCount: 0,
    weakCount: 0,
    fixItCount: 0,
    currentStreak: 0,
    weakestTheme: null as string | null,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const uid = await getCurrentUserId();
      if (cancelled) return;
      setUserId(uid ?? null);
      try {
        const allSets = await vocabApi.getSets();
        if (cancelled) return;
        setSets(allSets);
        if (uid) {
          const [mastery, fixit] = await Promise.all([
            vocabApi.getMasteryForUserAllWords(uid),
            vocabApi.getFixItQueue(uid),
          ]);
          if (cancelled) return;
          const masteredCount = mastery.filter(m => m.mastery >= 80).length;
          const weakCount = mastery.filter(m => m.mastery > 0 && m.mastery < 60).length;
          const themeMastery = new Map<string, number[]>();
          for (const s of allSets) {
            const wordIds = (await vocabApi.getWordsBySetId(s.id)).map(w => w.id);
            const avg = wordIds.length
              ? mastery.filter(m => wordIds.includes(m.word_id)).reduce((s, m) => s + m.mastery, 0) / wordIds.length
              : 0;
            if (!themeMastery.has(s.theme_tag)) themeMastery.set(s.theme_tag, []);
            themeMastery.get(s.theme_tag)!.push(avg);
          }
          let weakestTheme: string | null = null;
          let minAvg = 101;
          themeMastery.forEach((avgs, theme) => {
            const avg = avgs.reduce((a, b) => a + b, 0) / avgs.length;
            if (avg < minAvg) {
              minAvg = avg;
              weakestTheme = theme;
            }
          });
          setStats({
            masteredCount,
            weakCount,
            fixItCount: fixit.length,
            currentStreak: mastery.reduce((max, m) => Math.max(max, m.streak), 0),
            weakestTheme,
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const langSets = sets.filter(s => s.mode === 'language_p1' || s.mode === 'language_p2');
  const litSets = sets.filter(s => s.mode === 'literature');

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/english-campus')}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Back"
        >
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
        </button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            Vocab Lab
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            High-level vocabulary, spelling, and usage
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Language Mode Vocab */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border overflow-hidden"
            style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
          >
            <button
              type="button"
              onClick={() => navigate('/english-campus/vocab/sets?mode=language_p1')}
              className="w-full text-left"
            >
              <div
                className="px-4 py-3 border-b flex items-center justify-between"
                style={{ borderColor: 'rgb(var(--border))', background: 'rgba(14, 165, 233, 0.12)' }}
              >
                <h2 className="font-bold flex items-center gap-2" style={{ color: '#0EA5E9' }}>
                  <BookMarked size={20} />
                  Language Mode Vocab
                </h2>
                <ChevronRight size={20} style={{ color: '#0EA5E9' }} />
              </div>
              <div className="p-4">
                <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {langSets.length} set{langSets.length !== 1 ? 's' : ''}
                </p>
                <p className="text-xs" style={{ color: 'rgb(var(--muted))' }}>
                  Streak: {stats.currentStreak} · Mastered: {stats.masteredCount}
                </p>
              </div>
            </button>
          </motion.section>

          {/* Literature Vocab */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-xl border overflow-hidden"
            style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
          >
            <button
              type="button"
              onClick={() => navigate('/english-campus/vocab/sets?mode=literature')}
              className="w-full text-left"
            >
              <div
                className="px-4 py-3 border-b flex items-center justify-between"
                style={{ borderColor: 'rgb(var(--border))', background: 'rgba(236, 72, 153, 0.12)' }}
              >
                <h2 className="font-bold flex items-center gap-2" style={{ color: '#EC4899' }}>
                  <Library size={20} />
                  Literature Vocab
                </h2>
                <ChevronRight size={20} style={{ color: '#EC4899' }} />
              </div>
              <div className="p-4">
                <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {litSets.length} set{litSets.length !== 1 ? 's' : ''}
                </p>
                <p className="text-xs" style={{ color: 'rgb(var(--muted))' }}>
                  Mastered: {stats.masteredCount}
                </p>
              </div>
            </button>
          </motion.section>

          {/* My Weak Words */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="rounded-xl border overflow-hidden"
            style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
          >
            <button
              type="button"
              onClick={() => navigate('/english-campus/vocab/sets?weak=1')}
              className="w-full text-left"
            >
              <div
                className="px-4 py-3 border-b flex items-center justify-between"
                style={{ borderColor: 'rgb(var(--border))', background: 'rgba(245, 158, 11, 0.12)' }}
              >
                <h2 className="font-bold flex items-center gap-2" style={{ color: '#F59E0B' }}>
                  <Zap size={20} />
                  My Weak Words
                </h2>
                <ChevronRight size={20} style={{ color: '#F59E0B' }} />
              </div>
              <div className="p-4">
                <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {stats.weakCount} word{stats.weakCount !== 1 ? 's' : ''} below 60%
                </p>
                {stats.weakestTheme && (
                  <p className="text-xs" style={{ color: 'rgb(var(--muted))' }}>
                    Weakest theme: {stats.weakestTheme}
                  </p>
                )}
              </div>
            </button>
          </motion.section>

          {/* Fix-It Mode */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-xl border overflow-hidden"
            style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
          >
            <button
              type="button"
              onClick={() => navigate('/english-campus/vocab/session?mode=fixit')}
              className="w-full text-left"
              disabled={stats.fixItCount === 0}
            >
              <div
                className="px-4 py-3 border-b flex items-center justify-between"
                style={{ borderColor: 'rgb(var(--border))', background: 'rgba(239, 68, 68, 0.12)' }}
              >
                <h2 className="font-bold flex items-center gap-2" style={{ color: '#EF4444' }}>
                  <Wrench size={20} />
                  Fix-It Mode
                </h2>
                <ChevronRight size={20} style={{ color: '#EF4444' }} />
              </div>
              <div className="p-4">
                <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {stats.fixItCount} word{stats.fixItCount !== 1 ? 's' : ''} in queue
                </p>
              </div>
            </button>
          </motion.section>

          {/* Sets Library */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="rounded-xl border overflow-hidden"
            style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
          >
            <button
              type="button"
              onClick={() => navigate('/english-campus/vocab/sets')}
              className="w-full text-left"
            >
              <div
                className="px-4 py-3 border-b flex items-center justify-between"
                style={{ borderColor: 'rgb(var(--border))', background: 'rgba(139, 92, 246, 0.12)' }}
              >
                <h2 className="font-bold flex items-center gap-2" style={{ color: '#8B5CF6' }}>
                  <Library size={20} />
                  Sets Library
                </h2>
                <ChevronRight size={20} style={{ color: '#8B5CF6' }} />
              </div>
              <div className="p-4">
                <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {sets.length} set{sets.length !== 1 ? 's' : ''} · Browse by theme & tier
                </p>
              </div>
            </button>
          </motion.section>

          {/* Streak Sprint */}
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="rounded-xl border overflow-hidden"
            style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
          >
            <button
              type="button"
              onClick={() => navigate('/english-campus/vocab/session?sprint=1')}
              className="w-full text-left"
            >
              <div
                className="px-4 py-3 border-b flex items-center justify-between"
                style={{ borderColor: 'rgb(var(--border))', background: 'rgba(16, 185, 129, 0.12)' }}
              >
                <h2 className="font-bold flex items-center gap-2" style={{ color: '#10B981' }}>
                  <Flame size={20} />
                  Streak Sprint
                </h2>
                <ChevronRight size={20} style={{ color: '#10B981' }} />
              </div>
              <div className="p-4">
                <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                  5 correct in a row or 25 questions
                </p>
                <p className="text-xs mt-1" style={{ color: 'rgb(var(--muted))' }}>
                  Current streak: {stats.currentStreak}
                </p>
              </div>
            </button>
          </motion.section>
        </div>
      )}

      {!userId && !loading && (
        <p className="text-sm text-center" style={{ color: 'rgb(var(--muted))' }}>
          Sign in to save progress and track mastery.
        </p>
      )}
    </div>
  );
}
