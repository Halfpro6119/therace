import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Play, FileQuestion, BookOpen } from 'lucide-react';
import { db } from '../../db/client';
import { Subject, Paper, Prompt, TierFilter } from '../../types';
import { getTierLabel, getTierColor } from '../../admin/tierNormalizer';
import { GOLDEN_TOPIC_SPECS, type GoldenTopicSpec } from '../../config/goldenMathsTopicUnitSpec';

/** Resolve prompt IDs in the order defined by the golden topic spec. */
function promptIdsForGoldenTopic(questionIds: string[], prompts: Prompt[]): string[] {
  const byGoldenId = new Map<string, Prompt>();
  for (const p of prompts) {
    const gid = (p.meta as Record<string, unknown> | undefined)?.goldenId as string | undefined;
    if (gid) byGoldenId.set(gid, p);
  }
  const ids: string[] = [];
  for (const qid of questionIds) {
    const prompt = byGoldenId.get(qid);
    if (prompt) ids.push(prompt.id);
  }
  return ids;
}

export function MathsHubPage() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [paperPrompts, setPaperPrompts] = useState<Record<string, Prompt[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [tier, setTier] = useState<TierFilter>('higher');
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [mode, setMode] = useState<'full' | 'topic' | null>(null);
  /** Selected curriculum topic (from golden spec) for topic practice */
  const [selectedGoldenTopic, setSelectedGoldenTopic] = useState<GoldenTopicSpec | null>(null);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const subjects = await db.getSubjects();
      const maths = subjects.find((s) => s.name.toLowerCase() === 'maths');
      if (!maths) {
        setError('Maths subject not found.');
        return;
      }
      setSubject(maths);
      const papersData = await db.listPapersBySubject(maths.id);
      setPapers(papersData);
      const promptsByPaper: Record<string, Prompt[]> = {};
      for (const paper of papersData) {
        const prompts = await db.getPromptsByPaper(paper.id);
        promptsByPaper[paper.id] = prompts;
      }
      setPaperPrompts(promptsByPaper);
    } catch (e) {
      console.error(e);
      setError('Failed to load data.');
    } finally {
      setLoading(false);
    }
  };

  const promptsForPaper = selectedPaper ? paperPrompts[selectedPaper.id] ?? [] : [];
  const promptsForTier = promptsForPaper.filter((p) => {
    if (tier === 'all') return true;
    return p.tier === tier;
  });

  /** Curriculum topics for the selected paper + tier (from golden spec). */
  const goldenTopicsForPaper =
    selectedPaper && (tier === 'higher' || tier === 'foundation')
      ? GOLDEN_TOPIC_SPECS.filter(
          (s) => s.paper === selectedPaper.paperNumber && s.tier === tier
        )
      : [];

  const canStartFull = mode === 'full' && promptsForTier.length > 0;
  const canStartTopic = mode === 'topic' && selectedGoldenTopic != null;

  const handleStartFullPaper = async () => {
    if (!subject || !selectedPaper || promptsForTier.length === 0) return;
    setStarting(true);
    try {
      const timeLimitSec = promptsForTier.length * 60;
      const grade9TargetSec = promptsForTier.length * 45;
      const quiz = await db.createQuiz({
        subjectId: subject.id,
        scopeType: 'full',
        title: `${getTierLabel(tier === 'higher' ? 'higher' : 'foundation')} Paper ${selectedPaper.paperNumber} Quiz`,
        description: `Full paper quiz – ${selectedPaper.name}`,
        timeLimitSec,
        grade9TargetSec,
        promptIds: promptsForTier.map((p) => p.id),
      });
      navigate(`/quiz/${quiz.id}?tier=${tier}`);
    } catch (e) {
      console.error(e);
      alert('Failed to start quiz');
    } finally {
      setStarting(false);
    }
  };

  const handleStartTopicQuiz = async () => {
    if (!subject || !selectedPaper || !selectedGoldenTopic) return;
    setStarting(true);
    try {
      const prompts = await db.getPromptsByGoldenIds(subject.id, selectedGoldenTopic.questionIds);
      const promptIds = promptIdsForGoldenTopic(selectedGoldenTopic.questionIds, prompts);
      if (promptIds.length === 0) {
        alert('No questions found for this topic. Ensure golden questions are seeded for this paper.');
        setStarting(false);
        return;
      }
      const timeLimitSec = promptIds.length * 60;
      const grade9TargetSec = promptIds.length * 45;
      const quiz = await db.createQuiz({
        subjectId: subject.id,
        scopeType: 'topic',
        title: `${selectedGoldenTopic.name} (${getTierLabel(tier === 'higher' ? 'higher' : 'foundation')} Paper ${selectedPaper.paperNumber})`,
        description: `Topic practice – ${selectedGoldenTopic.name}`,
        timeLimitSec,
        grade9TargetSec,
        promptIds,
        quizType: 'topic',
      });
      navigate(`/quiz/${quiz.id}?tier=${tier}`);
    } catch (e) {
      console.error(e);
      alert('Failed to start quiz');
    } finally {
      setStarting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="animate-pulse rounded-xl h-10 w-48 mb-6" style={{ background: 'rgb(var(--surface-2))' }} />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 rounded-xl animate-pulse" style={{ background: 'rgb(var(--surface-2))' }} />
          ))}
        </div>
      </div>
    );
  }

  if (error || !subject) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <button
          type="button"
          onClick={() => navigate('/maths-mastery')}
          className="flex items-center gap-2 text-sm font-medium mb-4"
          style={{ color: 'rgb(var(--text-secondary))' }}
        >
          <ChevronLeft size={18} />
          Back to Maths Mastery
        </button>
        <p className="text-red-500">{error ?? 'Subject not found'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 border shadow-sm"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <button
          type="button"
          onClick={() => navigate('/maths-mastery')}
          className="flex items-center gap-2 text-sm font-medium mb-4"
          style={{ color: 'rgb(var(--text-secondary))' }}
        >
          <ChevronLeft size={18} />
          Back to Maths Mastery
        </button>
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'rgb(var(--text))' }}>
          GCSE Maths
        </h1>
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          Choose tier, paper, then full paper quiz or a specific topic.
        </p>
      </motion.section>

      {/* Step 1: Tier */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="space-y-3"
      >
        <h2 className="text-sm font-semibold" style={{ color: 'rgb(var(--text))' }}>
          1. Tier
        </h2>
        <div className="flex gap-3">
          {(['higher', 'foundation'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTier(t)}
              className="flex-1 py-3 px-4 rounded-xl font-medium transition-colors"
              style={{
                background: tier === t ? getTierColor(t) + '22' : 'rgb(var(--surface-2))',
                color: tier === t ? getTierColor(t) : 'rgb(var(--text-secondary))',
                border: `2px solid ${tier === t ? getTierColor(t) : 'transparent'}`,
              }}
            >
              {getTierLabel(t)}
            </button>
          ))}
        </div>
      </motion.section>

      {/* Step 2: Paper */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        <h2 className="text-sm font-semibold" style={{ color: 'rgb(var(--text))' }}>
          2. Paper
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {papers.map((paper) => {
            const count = (paperPrompts[paper.id] ?? []).filter((p) => tier === 'all' || p.tier === tier).length;
            const isSelected = selectedPaper?.id === paper.id;
            return (
              <button
                key={paper.id}
                type="button"
                onClick={() => {
                  setSelectedPaper(paper);
                  setMode(null);
                  setSelectedGoldenTopic(null);
                }}
                className="rounded-xl p-4 text-left border-2 transition-all"
                style={{
                  background: isSelected ? 'rgb(var(--surface-2))' : 'rgb(var(--surface))',
                  borderColor: isSelected ? 'rgb(var(--primary))' : 'rgb(var(--border))',
                }}
              >
                <span className="font-semibold block" style={{ color: 'rgb(var(--text))' }}>
                  Paper {paper.paperNumber}
                </span>
                <span className="text-xs block mt-0.5" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {paper.name}
                </span>
                <span className="text-xs mt-1 block" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {count} question{count !== 1 ? 's' : ''} ({tier})
                </span>
              </button>
            );
          })}
        </div>
      </motion.section>

      {selectedPaper && (
        <>
          {/* Step 3: Mode */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h2 className="text-sm font-semibold" style={{ color: 'rgb(var(--text))' }}>
              3. Quiz type
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setMode('full');
                  setSelectedGoldenTopic(null);
                }}
                className="rounded-xl p-4 flex items-center gap-3 text-left border-2 transition-all"
                style={{
                  background: mode === 'full' ? 'rgb(var(--surface-2))' : 'rgb(var(--surface))',
                  borderColor: mode === 'full' ? 'rgb(var(--primary))' : 'rgb(var(--border))',
                }}
              >
                <div className="p-2 rounded-lg" style={{ background: 'rgb(var(--surface-2))' }}>
                  <FileQuestion size={20} style={{ color: 'rgb(var(--text))' }} />
                </div>
                <div>
                  <span className="font-semibold block" style={{ color: 'rgb(var(--text))' }}>
                    Full paper quiz
                  </span>
                  <span className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
                    All {promptsForTier.length} questions from this paper
                  </span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setMode('topic')}
                className="rounded-xl p-4 flex items-center gap-3 text-left border-2 transition-all"
                style={{
                  background: mode === 'topic' ? 'rgb(var(--surface-2))' : 'rgb(var(--surface))',
                  borderColor: mode === 'topic' ? 'rgb(var(--primary))' : 'rgb(var(--border))',
                }}
              >
                <div className="p-2 rounded-lg" style={{ background: 'rgb(var(--surface-2))' }}>
                  <BookOpen size={20} style={{ color: 'rgb(var(--text))' }} />
                </div>
                <div>
                  <span className="font-semibold block" style={{ color: 'rgb(var(--text))' }}>
                    Topic practice
                  </span>
                  <span className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
                    e.g. Circle Theorems, Algebra
                  </span>
                </div>
              </button>
            </div>
          </motion.section>

          {mode === 'topic' && (
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <h2 className="text-sm font-semibold" style={{ color: 'rgb(var(--text))' }}>
                4. Choose a topic
              </h2>
              {goldenTopicsForPaper.length === 0 ? (
                <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                  No topics defined for this paper and tier.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {goldenTopicsForPaper.map((spec) => {
                    const count = spec.questionIds.length;
                    const isSelected = selectedGoldenTopic?.key === spec.key;
                    return (
                      <button
                        key={spec.key}
                        type="button"
                        onClick={() => setSelectedGoldenTopic(spec)}
                        className="rounded-lg p-3 text-left border-2 transition-all flex justify-between items-center"
                        style={{
                          background: isSelected ? 'rgb(var(--surface-2))' : 'rgb(var(--surface))',
                          borderColor: isSelected ? 'rgb(var(--primary))' : 'rgb(var(--border))',
                        }}
                      >
                        <span className="font-medium truncate" style={{ color: 'rgb(var(--text))' }}>
                          {spec.name}
                        </span>
                        <span className="text-xs shrink-0 ml-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                          {count} q
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </motion.section>
          )}

          {/* Start */}
          {(canStartFull || canStartTopic) && (
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-2"
            >
              {mode === 'full' && (
                <button
                  type="button"
                  disabled={starting}
                  onClick={handleStartFullPaper}
                  className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 text-white transition-opacity disabled:opacity-60"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <Play size={20} />
                  {starting ? 'Starting…' : `Start full paper quiz (${promptsForTier.length} questions)`}
                </button>
              )}
              {mode === 'topic' && selectedGoldenTopic && (
                <button
                  type="button"
                  disabled={starting}
                  onClick={handleStartTopicQuiz}
                  className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 text-white transition-opacity disabled:opacity-60"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <Play size={20} />
                  {starting
                    ? 'Starting…'
                    : `Start ${selectedGoldenTopic.name} quiz (${selectedGoldenTopic.questionIds.length} questions)`}
                </button>
              )}
            </motion.section>
          )}
        </>
      )}
    </div>
  );
}
