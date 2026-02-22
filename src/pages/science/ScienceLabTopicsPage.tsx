import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Layers, FileQuestion, ClipboardList, Target, FlaskConical, Calculator, AlertTriangle } from 'lucide-react';
import { getTopicsByPaperAndTier, getDueFlashcardCount } from '../../config/scienceLabFlashcards';
import { storage } from '../../utils/storage';
import type { ScienceSubject, SciencePaper, ScienceTier } from '../../types/scienceLab';

const WORK_ON_ALL_MODES = [
  { id: 'flashcard', title: 'Flashcards', description: 'Build recall across all topics', icon: BookOpen, color: '#0EA5E9', path: 'flashcard' },
  { id: 'quickCheck', title: 'Quick checks', description: 'MCQ, T/F, drag order – fast practice', icon: Target, color: '#F59E0B', path: 'quick-check' },
  { id: 'methodMark', title: 'Bigger tests (4–6 mark)', description: 'Extended questions with method marks', icon: ClipboardList, color: '#8B5CF6', path: 'methodMark' },
  { id: 'practical', title: 'Practical Lab', description: 'Required practicals – variables, method', icon: FlaskConical, color: '#10B981', path: 'practical' },
  { id: 'equation', title: 'Equation Lab', description: 'Equations, units, rearranging', icon: Calculator, color: '#8B5CF6', path: 'equation' },
  { id: 'misconception', title: 'Misconception Lab', description: 'Identify and correct classic wrong ideas', icon: AlertTriangle, color: '#EF4444', path: 'misconception' },
] as const;

export function ScienceLabTopicsPage() {
  const navigate = useNavigate();
  const [workOnAllOpen, setWorkOnAllOpen] = useState(false);
  const workOnAllRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!workOnAllOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (workOnAllRef.current && !workOnAllRef.current.contains(e.target as Node)) {
        setWorkOnAllOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [workOnAllOpen]);
  const { subject, paper: paperParam, tier: tierParam } = useParams<{ subject: string; paper: string; tier: string }>();

  const subjectId = subject?.toLowerCase() as ScienceSubject | undefined;
  const paperNum = paperParam ? (parseInt(paperParam) as SciencePaper) || 1 : 1;
  const tierValue = tierParam ? (tierParam.charAt(0).toUpperCase() + tierParam.slice(1) as ScienceTier) : 'Higher';

  const handlePaperChange = (p: SciencePaper) => {
    navigate(`/science-lab/${subject?.toLowerCase()}/${p}/${tierValue.toLowerCase()}/topics`);
  };
  const handleTierChange = (t: ScienceTier) => {
    navigate(`/science-lab/${subject?.toLowerCase()}/${paperNum}/${t.toLowerCase()}/topics`);
  };

  if (!subjectId || !['biology', 'chemistry', 'physics'].includes(subject.toLowerCase())) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p>Invalid subject. Please select Biology, Chemistry, or Physics.</p>
        <button type="button" onClick={() => navigate('/science-lab')}>Go Back</button>
      </div>
    );
  }

  const normalizedSubject: ScienceSubject = subjectId.charAt(0).toUpperCase() + subjectId.slice(1) as ScienceSubject;
  const topics = getTopicsByPaperAndTier(normalizedSubject, paperNum, tierValue);
  const subjectTitle = normalizedSubject;

  const base = `/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}`;

  const mastery = storage.getFlashcardMastery();
  const getTopicProgress = (topic: string) => {
    const m = storage.getTopicMasteryByKey(normalizedSubject, paperNum, tierValue, topic);
    const dueCount = getDueFlashcardCount(normalizedSubject, paperNum, tierValue, topic, mastery);
    return {
      mastery: m?.flashcardMastery || 0,
      unlocked: m?.quizUnlocked || false,
      topicTestCompleted: m?.topicTestCompleted || false,
      topicTestScore: m?.topicTestScore,
      dueCount,
    };
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 50%, #8B5CF6 100%)',
          borderColor: 'transparent',
        }}
      >
        <button
          type="button"
          onClick={() => navigate('/science-lab')}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Science Lab
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Topic Map — {subjectTitle}</h1>
        <p className="text-white/90 text-sm sm:text-base mb-4">
          Aiming for Grade 9. Browse by topic or jump straight into a past-paper-style test.
        </p>
        <div className="flex flex-wrap items-center gap-4" onClick={(e) => e.stopPropagation()}>
          <div>
            <label className="block text-xs font-medium text-white/80 mb-1.5">Paper</label>
            <div className="flex gap-2">
              {([1, 2] as SciencePaper[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handlePaperChange(p)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    paperNum === p ? 'bg-white text-gray-800' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  Paper {p}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-white/80 mb-1.5">Tier</label>
            <div className="flex gap-2">
              {(['Foundation', 'Higher'] as ScienceTier[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => handleTierChange(t)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    tierValue === t ? 'bg-white text-gray-800' : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Full GCSE test – all topics */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
      >
        <button
          type="button"
          onClick={() => navigate(`/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}/full-gcse`)}
          className="w-full rounded-xl p-6 text-left border shadow-sm hover:shadow-md transition-all flex items-center justify-between"
          style={{
            background: 'rgb(var(--surface))',
            borderColor: 'rgb(var(--border))',
          }}
        >
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500">
              <FileQuestion size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold mb-1" style={{ color: 'rgb(var(--text))' }}>
                Full GCSE test
              </h2>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                Test the entire subject – all topics for this paper and tier
              </p>
            </div>
          </div>
          <ChevronRight size={24} style={{ color: 'rgb(var(--text-secondary))' }} />
        </button>
      </motion.section>

      {/* Work on all topics – dropdown menu */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <div ref={workOnAllRef} className="relative">
        <button
          type="button"
          onClick={() => setWorkOnAllOpen((o) => !o)}
          className="w-full rounded-xl p-6 text-left border shadow-sm hover:shadow-md transition-all flex items-center justify-between"
          style={{
            background: 'rgb(var(--surface))',
            borderColor: 'rgb(var(--border))',
          }}
        >
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-green-500 to-blue-500">
              <Layers size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold mb-1" style={{ color: 'rgb(var(--text))' }}>
                Work on All Topics
              </h2>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                Choose a learning mode – flashcards, quick checks, practicals, and more
              </p>
            </div>
          </div>
          <ChevronDown
            size={24}
            className={`flex-shrink-0 transition-transform ${workOnAllOpen ? 'rotate-180' : ''}`}
            style={{ color: 'rgb(var(--text-secondary))' }}
          />
        </button>
        {workOnAllOpen && (
          <div
            className="absolute left-0 right-0 top-full mt-1 rounded-xl border shadow-lg overflow-hidden z-10"
            style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
          >
            {WORK_ON_ALL_MODES.map((mode) => {
              const Icon = mode.icon;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => {
                    navigate(`${base}/${mode.path}`);
                    setWorkOnAllOpen(false);
                  }}
                  className="w-full px-5 py-4 flex items-center gap-4 text-left hover:bg-black/5 dark:hover:bg-white/5 transition"
                  style={{ color: 'rgb(var(--text))' }}
                >
                  <div
                    className="p-2.5 rounded-lg flex-shrink-0"
                    style={{ background: `${mode.color}20` }}
                  >
                    <Icon size={20} style={{ color: mode.color }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{mode.title}</p>
                    <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {mode.description}
                    </p>
                  </div>
                  <ChevronRight size={18} className="ml-auto flex-shrink-0 opacity-50" />
                </button>
              );
            })}
          </div>
        )}
        </div>
      </motion.section>

      {/* Topic list */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
          <BookOpen size={20} style={{ color: '#0EA5E9' }} />
          Browse by Topic
        </h2>
        <div className="space-y-3">
          {topics.map((topic, index) => {
            const progress = getTopicProgress(topic);
            return (
              <motion.div
                key={topic}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.03 }}
                className="rounded-xl p-5 border shadow-sm"
                style={{
                  background: 'rgb(var(--surface))',
                  borderColor: 'rgb(var(--border))',
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold mb-1" style={{ color: 'rgb(var(--text))' }}>
                      {topic}
                    </h3>
                    <div className="flex items-center gap-3 text-sm flex-wrap" style={{ color: 'rgb(var(--text-secondary))' }}>
                      <span>{progress.mastery}% flashcard mastery</span>
                      {progress.dueCount > 0 && (
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-500/20 text-amber-700 dark:text-amber-400">
                          {progress.dueCount} card{progress.dueCount !== 1 ? 's' : ''} due
                        </span>
                      )}
                      {progress.unlocked && (
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-green-500/20 text-green-700 dark:text-green-400">
                          Quiz unlocked
                        </span>
                      )}
                      {progress.topicTestCompleted && progress.topicTestScore != null && (
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-purple-500/20 text-purple-700 dark:text-purple-400">
                          Topic test: {progress.topicTestScore}%
                        </span>
                      )}
                    </div>
                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 max-w-[200px]">
                      <div
                        className="h-1.5 rounded-full transition-all bg-blue-500"
                        style={{ width: `${Math.min(progress.mastery, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`${base}/flashcard?topic=${encodeURIComponent(topic)}`);
                      }}
                      className="px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition hover:opacity-90 border"
                      style={{
                        background: progress.dueCount > 0 ? 'rgba(14, 165, 233, 0.15)' : 'rgb(var(--surface-2))',
                        borderColor: progress.dueCount > 0 ? 'rgb(14, 165, 233)' : 'rgb(var(--border))',
                        color: progress.dueCount > 0 ? 'rgb(14, 165, 233)' : 'rgb(var(--text))',
                      }}
                      title="Learn (flashcards)"
                    >
                      <BookOpen size={14} />
                      Learn
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`${base}/methodMark?topic=${encodeURIComponent(topic)}`);
                      }}
                      className="px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition hover:opacity-90 border"
                      style={{
                        background: 'rgb(var(--surface-2))',
                        borderColor: 'rgb(var(--border))',
                        color: 'rgb(var(--text))',
                      }}
                      title="Bigger tests (4–6 mark)"
                    >
                      <ClipboardList size={14} />
                      Bigger tests
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`${base}/topic-test?topic=${encodeURIComponent(topic)}`);
                      }}
                      className="px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition hover:opacity-90"
                      style={{ background: '#8B5CF6', color: 'white' }}
                    >
                      <FileQuestion size={16} />
                      Topic test
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
