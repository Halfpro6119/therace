import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { vocabApi } from '../../../utils/vocab';
import type { VocabSet, VocabWord } from '../../../types/vocab';

const LENGTHS = [10, 20, 40] as const;
type Length = 10 | 20 | 40;

export function EnglishVocabSetDetailPage() {
  const { setId } = useParams<{ setId: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sprint = searchParams.get('sprint') === '1';

  const [set, setSet] = useState<VocabSet | null>(null);
  const [words, setWords] = useState<VocabWord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLength, setSelectedLength] = useState<Length | 'mastery_sprint'>(sprint ? 'mastery_sprint' : 10);

  useEffect(() => {
    if (!setId) return;
    let cancelled = false;
    (async () => {
      try {
        const [setData, wordsData] = await Promise.all([
          vocabApi.getSet(setId),
          vocabApi.getWordsBySetId(setId),
        ]);
        if (cancelled) return;
        setSet(setData ?? null);
        setWords(wordsData);
        if (!setData) setError('Set not found');
      } catch (e) {
        if (!cancelled) setError('Failed to load set');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [setId]);

  const startSession = () => {
    if (!setId) return;
    navigate('/english-campus/vocab/session', {
      state: {
        setIds: [setId],
        length: selectedLength,
        mode: 'spell' as const,
      },
    });
  };

  if (loading || error) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <button
          type="button"
          onClick={() => navigate('/english-campus/vocab/sets')}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 flex items-center gap-2"
        >
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
          Back
        </button>
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500" />
          </div>
        )}
        {error && (
          <p className="text-center py-8" style={{ color: 'rgb(var(--danger))' }}>{error}</p>
        )}
      </div>
    );
  }

  if (!set) return null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/english-campus/vocab/sets')}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Back"
        >
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
        </button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            {set.name}
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            {set.theme_tag} · {set.tier} · {words.length} words
          </p>
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border p-4"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <h2 className="font-bold mb-3" style={{ color: 'rgb(var(--text))' }}>
          Session length
        </h2>
        <div className="flex flex-wrap gap-2">
          {LENGTHS.map(n => (
            <button
              key={n}
              type="button"
              onClick={() => setSelectedLength(n)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition"
              style={{
                background: selectedLength === n ? 'rgb(var(--accent))' : 'rgb(var(--surface-2))',
                color: selectedLength === n ? 'white' : 'rgb(var(--text))',
              }}
            >
              {n} words
            </button>
          ))}
          <button
            type="button"
            onClick={() => setSelectedLength('mastery_sprint')}
            className="px-4 py-2 rounded-lg text-sm font-medium transition"
            style={{
              background: selectedLength === 'mastery_sprint' ? 'rgb(var(--accent))' : 'rgb(var(--surface-2))',
              color: selectedLength === 'mastery_sprint' ? 'white' : 'rgb(var(--text))',
            }}
          >
            Mastery Sprint (5 in a row or 25)
          </button>
        </div>
      </motion.section>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={startSession}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white"
          style={{ background: 'rgb(var(--accent))' }}
        >
          <Play size={20} />
          Start session
        </button>
      </div>
    </div>
  );
}
