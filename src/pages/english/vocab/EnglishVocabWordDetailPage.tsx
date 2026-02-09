import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { vocabApi, getCurrentUserId } from '../../../utils/vocab';
import type { VocabWord, VocabMastery, VocabAttempt } from '../../../types/vocab';

const WORD_CLASS_LABELS: Record<string, string> = {
  noun: 'noun',
  verb: 'verb',
  adj: 'adjective',
  adv: 'adverb',
  other: 'other',
};

export function EnglishVocabWordDetailPage() {
  const { wordId } = useParams<{ wordId: string }>();
  const navigate = useNavigate();
  const [word, setWord] = useState<VocabWord | null>(null);
  const [mastery, setMastery] = useState<VocabMastery | null>(null);
  const [attempts, setAttempts] = useState<VocabAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!wordId) return;
    let cancelled = false;
    (async () => {
      const uid = await getCurrentUserId();
      setUserId(uid ?? null);
      try {
        const [w, attemptsData] = await Promise.all([
          vocabApi.getWord(wordId),
          uid ? vocabApi.getAttemptsByWord(uid, wordId) : Promise.resolve([]),
        ]);
        if (cancelled) return;
        setWord(w ?? null);
        setAttempts(attemptsData);
        if (uid && w) {
          const mList = await vocabApi.getMasteryForUser(uid, [w.id]);
          if (!cancelled) setMastery(mList.get(w.id) ?? null);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [wordId]);

  if (loading || !word) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        {!loading && !word && <p style={{ color: 'rgb(var(--text-secondary))' }}>Word not found.</p>}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500" />
          </div>
        )}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-4 flex items-center gap-2 text-sm"
          style={{ color: 'rgb(var(--accent))' }}
        >
          <ChevronLeft size={18} /> Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
        >
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
        </button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            {word.word}
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            {WORD_CLASS_LABELS[word.word_class] ?? word.word_class} · {word.connotation}
          </p>
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border p-4"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <p className="font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>{word.definition}</p>
        {word.example_sentence && (
          <p className="text-sm italic" style={{ color: 'rgb(var(--text-secondary))' }}>
            &quot;{word.example_sentence}&quot;
          </p>
        )}
        {word.synonyms.length > 0 && (
          <p className="text-sm mt-2" style={{ color: 'rgb(var(--muted))' }}>
            Synonyms: {word.synonyms.join(', ')}
          </p>
        )}
        {word.antonyms.length > 0 && (
          <p className="text-sm" style={{ color: 'rgb(var(--muted))' }}>
            Antonyms: {word.antonyms.join(', ')}
          </p>
        )}
      </motion.section>

      {userId && mastery && (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-xl border p-4"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <h2 className="font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>Progress</h2>
          <ul className="text-sm space-y-1" style={{ color: 'rgb(var(--text-secondary))' }}>
            <li>Mastery: {mastery.mastery}%</li>
            <li>Streak: {mastery.streak}</li>
            <li>Next due: {mastery.next_due ? new Date(mastery.next_due).toLocaleString() : '—'}</li>
          </ul>
        </motion.section>
      )}

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="rounded-xl border p-4"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <h2 className="font-bold mb-3" style={{ color: 'rgb(var(--text))' }}>
          Attempt timeline (last 20)
        </h2>
        {attempts.length === 0 ? (
          <p className="text-sm" style={{ color: 'rgb(var(--muted))' }}>No attempts yet.</p>
        ) : (
          <ul className="space-y-2">
            {attempts.map(a => (
              <li
                key={a.id}
                className="flex items-center gap-3 text-sm py-1"
                style={{ color: 'rgb(var(--text-secondary))' }}
              >
                {a.is_correct ? (
                  <Check size={16} style={{ color: 'rgb(var(--success))' }} />
                ) : (
                  <X size={16} style={{ color: 'rgb(var(--danger))' }} />
                )}
                <span>{a.user_input || '—'}</span>
                <span className="text-xs" style={{ color: 'rgb(var(--muted))' }}>
                  {a.time_ms}ms
                </span>
                <span className="text-xs" style={{ color: 'rgb(var(--muted))' }}>
                  {new Date(a.created_at).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </motion.section>
    </div>
  );
}
