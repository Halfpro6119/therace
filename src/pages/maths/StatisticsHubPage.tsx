import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Play, FileQuestion, BookOpen } from 'lucide-react';
import { db } from '../../db/client';
import { Subject, Paper, Prompt } from '../../types';
import {
  STATISTICS_TOPIC_SPECS,
  getStatisticsUnitsByTopic,
  type StatisticsTopicSpec,
  type StatisticsUnitSpec,
} from '../../config/statisticsTopicUnitSpec';

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

export function StatisticsHubPage() {
  const navigate = useNavigate();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [paperPrompts, setPaperPrompts] = useState<Record<string, Prompt[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [mode, setMode] = useState<'full' | 'topic' | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<StatisticsTopicSpec | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<StatisticsUnitSpec | null>(null);
  const [starting, setStarting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const subjects = await db.getSubjects();
      const stats = subjects.find((s) => s.name.toLowerCase() === 'statistics');
      if (!stats) {
        setError('Statistics subject not found. Run GCSE scope sync.');
        return;
      }
      setSubject(stats);
      const papersData = await db.listPapersBySubject(stats.id);
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
  const promptsAll = promptsForPaper;

  const topicsByPaper = new Map<number, StatisticsTopicSpec[]>();
  for (const t of STATISTICS_TOPIC_SPECS) {
    const list = topicsByPaper.get(t.paper) ?? [];
    list.push(t);
    topicsByPaper.set(t.paper, list);
  }
  const sortedPapers = [...papers].sort((a, b) => a.paperNumber - b.paperNumber);

  const canStartFull = mode === 'full' && promptsAll.length > 0;
  const canStartTopic = mode === 'topic' && selectedTopic != null && selectedUnit == null;
  const canStartUnit = mode === 'topic' && selectedUnit != null;

  const handleStartFullPaper = async () => {
    if (!subject || !selectedPaper || promptsAll.length === 0) return;
    setStarting(true);
    try {
      const timeLimitSec = promptsAll.length * 60;
      const grade9TargetSec = promptsAll.length * 45;
      const quiz = await db.createQuiz({
        subjectId: subject.id,
        scopeType: 'full',
        title: `Statistics Paper ${selectedPaper.paperNumber} Quiz`,
        description: `Full paper – ${selectedPaper.name}`,
        timeLimitSec,
        grade9TargetSec,
        promptIds: promptsAll.map((p) => p.id),
      });
      navigate(`/quiz/${quiz.id}`);
    } catch (e) {
      console.error(e);
      alert('Failed to start quiz');
    } finally {
      setStarting(false);
    }
  };

  const handleStartTopicQuiz = async () => {
    if (!subject || !selectedTopic) return;
    setStarting(true);
    try {
      const prompts = await db.getPromptsByGoldenIds(subject.id, selectedTopic.questionIds);
      const promptIds = promptIdsForGoldenTopic(selectedTopic.questionIds, prompts);
      if (promptIds.length === 0) {
        alert('No questions found for this topic. Seed Statistics content from Admin → Tools.');
        setStarting(false);
        return;
      }
      const quiz = await db.createQuiz({
        subjectId: subject.id,
        scopeType: 'topic',
        title: `${selectedTopic.name} (Statistics)`,
        description: `Topic practice – ${selectedTopic.name}`,
        timeLimitSec: promptIds.length * 60,
        grade9TargetSec: promptIds.length * 45,
        promptIds,
        quizType: 'topic',
      });
      navigate(`/quiz/${quiz.id}`);
    } catch (e) {
      console.error(e);
      alert('Failed to start quiz');
    } finally {
      setStarting(false);
    }
  };

  const handleStartUnitQuiz = async () => {
    if (!subject || !selectedUnit) return;
    setStarting(true);
    try {
      const prompts = await db.getPromptsByGoldenIds(subject.id, selectedUnit.questionIds);
      const promptIds = promptIdsForGoldenTopic(selectedUnit.questionIds, prompts);
      if (promptIds.length === 0) {
        alert('No questions found for this unit. Seed Statistics content from Admin → Tools.');
        setStarting(false);
        return;
      }
      const quiz = await db.createQuiz({
        subjectId: subject.id,
        scopeType: 'unit',
        title: `${selectedUnit.name} (Statistics)`,
        description: `Unit practice – ${selectedUnit.name}`,
        timeLimitSec: promptIds.length * 60,
        grade9TargetSec: promptIds.length * 45,
        promptIds,
        quizType: 'unit',
      });
      navigate(`/quiz/${quiz.id}`);
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
          GCSE Statistics
        </h1>
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          AQA GCSE Statistics (8382). Data collection, representation, probability, correlation, time series, distributions.
        </p>
      </motion.section>

      {/* Step 1: Paper */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
        <h2 className="text-sm font-semibold" style={{ color: 'rgb(var(--text))' }}>
          1. Paper
        </h2>
        <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
          We recommend starting with Paper 1.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sortedPapers.map((paper) => {
            const count = (paperPrompts[paper.id] ?? []).length;
            const isSelected = selectedPaper?.id === paper.id;
            return (
              <button
                key={paper.id}
                type="button"
                onClick={() => {
                  setSelectedPaper(paper);
                  setMode(null);
                  setSelectedTopic(null);
                  setSelectedUnit(null);
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
                  {count} question{count !== 1 ? 's' : ''}
                </span>
              </button>
            );
          })}
        </div>
      </motion.section>

      {selectedPaper && (
        <>
          {/* Step 2: Mode */}
          <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <h2 className="text-sm font-semibold" style={{ color: 'rgb(var(--text))' }}>
              2. Quiz type
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setMode('full');
                  setSelectedTopic(null);
                  setSelectedUnit(null);
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
                    All {promptsAll.length} questions from this paper
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
                    e.g. Data representation, Probability, Correlation
                  </span>
                </div>
              </button>
            </div>
          </motion.section>

          {mode === 'topic' && (
            <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <h2 className="text-sm font-semibold" style={{ color: 'rgb(var(--text))' }}>
                3. Choose a topic
              </h2>
              <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
                Covers AQA 8382 specification. Aligned with GCSE Statistics.
              </p>
              <div className="space-y-6">
                {sortedPapers.map((paper) => {
                  const paperTopics = topicsByPaper.get(paper.paperNumber) ?? [];
                  if (paperTopics.length === 0) return null;
                  return (
                    <div key={paper.id} className="space-y-2">
                      <h3
                        className="text-xs font-semibold uppercase tracking-wide"
                        style={{ color: 'rgb(var(--text-secondary))' }}
                      >
                        {paper.name}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {paperTopics.map((spec) => {
                          const isSelected = selectedTopic?.key === spec.key;
                          return (
                            <button
                              key={spec.key}
                              type="button"
                              onClick={() => {
                                setSelectedTopic(spec);
                                setSelectedUnit(null);
                              }}
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
                                {spec.questionIds.length} q
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              {selectedTopic && (
                <div className="space-y-2 pt-2 border-t" style={{ borderColor: 'rgb(var(--border))' }}>
                  <p className="text-xs font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
                    Or practice a unit (short focused drill):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {getStatisticsUnitsByTopic(selectedTopic.key).map((unit) => {
                      const isUnitSelected = selectedUnit?.key === unit.key;
                      return (
                        <button
                          key={unit.key}
                          type="button"
                          onClick={() => setSelectedUnit(isUnitSelected ? null : unit)}
                          className="rounded-lg px-3 py-2 text-left border-2 transition-all text-sm"
                          style={{
                            background: isUnitSelected ? 'rgb(var(--surface-2))' : 'rgb(var(--surface))',
                            borderColor: isUnitSelected ? 'rgb(var(--primary))' : 'rgb(var(--border))',
                            color: 'rgb(var(--text))',
                          }}
                        >
                          {unit.name} ({unit.questionIds.length} q)
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.section>
          )}

          {(canStartFull || canStartTopic || canStartUnit) && (
            <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="pt-2">
              {mode === 'full' && (
                <button
                  type="button"
                  disabled={starting}
                  onClick={handleStartFullPaper}
                  className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 text-white transition-opacity disabled:opacity-60"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <Play size={20} />
                  {starting ? 'Starting…' : `Start full paper quiz (${promptsAll.length} questions)`}
                </button>
              )}
              {mode === 'topic' && selectedTopic && !selectedUnit && (
                <button
                  type="button"
                  disabled={starting}
                  onClick={handleStartTopicQuiz}
                  className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 text-white transition-opacity disabled:opacity-60"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <Play size={20} />
                  {starting ? 'Starting…' : `Start ${selectedTopic.name} quiz (${selectedTopic.questionIds.length} questions)`}
                </button>
              )}
              {mode === 'topic' && selectedUnit && (
                <button
                  type="button"
                  disabled={starting}
                  onClick={handleStartUnitQuiz}
                  className="w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 text-white transition-opacity disabled:opacity-60"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <Play size={20} />
                  {starting ? 'Starting…' : `Start unit: ${selectedUnit.name} (${selectedUnit.questionIds.length} questions)`}
                </button>
              )}
            </motion.section>
          )}
        </>
      )}
    </div>
  );
}
