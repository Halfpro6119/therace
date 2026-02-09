import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { ChevronLeft, Wrench, RotateCcw, Zap, BookOpen, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import type { VocabSessionResult } from '../../../types/vocab';

export function EnglishVocabResultsPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const result = (location.state as { result?: VocabSessionResult } | null)?.result;

  if (!result) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p style={{ color: 'rgb(var(--text-secondary))' }}>No session result found.</p>
        <button
          type="button"
          onClick={() => navigate('/english-campus/vocab')}
          className="mt-4 px-4 py-2 rounded-lg font-medium"
          style={{ background: 'rgb(var(--accent))', color: 'white' }}
        >
          Back to Vocab Lab
        </button>
      </div>
    );
  }

  const accuracy = result.totalQuestions > 0
    ? Math.round((result.correct / result.totalQuestions) * 100)
    : 0;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
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
            Session complete
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            {result.correct}/{result.totalQuestions} correct · {accuracy}%
          </p>
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border p-4"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <h2 className="font-bold mb-3" style={{ color: 'rgb(var(--text))' }}>Summary</h2>
        <ul className="space-y-1 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          <li>Accuracy: {accuracy}%</li>
          <li>Best streak: {result.maxStreak}</li>
          <li>Mastery gained: +{result.masteryGained}</li>
          {result.nearMisses > 0 && <li>Near misses: {result.nearMisses}</li>}
        </ul>
      </motion.section>

      {result.fixItAdditions.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-xl border p-4"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <h2 className="font-bold mb-2 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
            <Wrench size={18} />
            Added to Fix-It ({result.fixItAdditions.length})
          </h2>
          <p className="text-sm mb-3" style={{ color: 'rgb(var(--text-secondary))' }}>
            {result.fixItAdditions.join(', ')}
          </p>
          <button
            type="button"
            onClick={() => navigate('/english-campus/vocab/session?mode=fixit')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
            style={{ background: 'rgb(var(--accent))', color: 'white' }}
          >
            Fix mistakes now
          </button>
        </motion.section>
      )}

      {result.results.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="rounded-xl border p-4"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <h2 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
            <BookOpen size={18} />
            Words in this session
          </h2>
          <ul className="flex flex-wrap gap-2">
            {result.results.map((r, i) => (
              <li key={`${r.wordId}-${i}`}>
                <Link
                  to={`/english-campus/vocab/word/${r.wordId}`}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-sm border transition"
                  style={{
                    borderColor: r.isCorrect ? 'rgb(var(--success))' : 'rgb(var(--border))',
                    background: r.isCorrect ? 'rgba(var(--success), 0.08)' : 'rgb(var(--surface-2))',
                    color: 'rgb(var(--text))',
                  }}
                >
                  {r.word}
                  <ExternalLink size={12} style={{ color: 'rgb(var(--muted))' }} />
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs mt-2" style={{ color: 'rgb(var(--muted))' }}>
            Click a word to see its detail and attempt timeline.
          </p>
        </motion.section>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => navigate('/english-campus/vocab/session?mode=fixit')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium"
          style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
        >
          <Wrench size={18} />
          Fix-It Mode
        </button>
        {result.config.setIds.length > 0 && (
          <button
            type="button"
            onClick={() => navigate('/english-campus/vocab/session', { state: { setIds: result.config.setIds, length: result.config.length || 10, mode: 'spell', weakOnly: true } })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium"
            style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
          >
            <Zap size={18} />
            Replay weak words
          </button>
        )}
        {result.config.setIds.length > 0 && (
          <button
            type="button"
            onClick={() => navigate('/english-campus/vocab/session', { state: { setIds: result.config.setIds, length: result.config.length || 10, mode: 'spell' } })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium"
            style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
          >
            <Zap size={18} />
            Next due words
          </button>
        )}
        <button
          type="button"
          onClick={() => navigate('/english-campus/vocab')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
          style={{ background: 'rgb(var(--accent))', color: 'white' }}
        >
          <RotateCcw size={18} />
          Back to Vocab Lab
        </button>
      </div>
    </div>
  );
}
