import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, FileQuestion, Target, FlaskConical, Calculator, AlertTriangle, ChevronRight, BookOpen, Zap, ClipboardList, GraduationCap } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getQuestionsByFilters, getTopicsBySubject } from '../../config/scienceLabData';
import type { ScienceSubject, SciencePaper, ScienceTier, LabMode } from '../../types/scienceLab';

/** Learn Mode now merges flashcards + quick checks + bigger tests. Path: Learn → Topic test → Full GCSE */
const LEARNING_PATH: Array<{
  id: LabMode;
  step: number;
  title: string;
  description: string;
  icon: typeof BookOpen;
  color: string;
}> = [
  { id: 'flashcard', step: 1, title: 'Learn', description: 'Flashcards with quick checks per card and bigger tests (3–6 mark) after each topic.', icon: BookOpen, color: '#0EA5E9' },
  { id: 'topicTest', step: 2, title: 'Topic test', description: 'Full test on one topic. Check your knowledge across a whole unit.', icon: FileQuestion, color: '#8B5CF6' },
  { id: 'fullGcseTest', step: 3, title: 'Full GCSE test', description: 'Test the entire subject. Exam-style across all topics.', icon: GraduationCap, color: '#10B981' },
];

/** Extra practice – not part of the main path */
const EXTRA_PRACTICE: Array<{
  id: LabMode;
  title: string;
  description: string;
  icon: typeof FlaskConical;
  color: string;
}> = [
  { id: 'quickCheck', title: 'Quick Check', description: 'Review all quick checks – MCQ, T/F, drag order', icon: Target, color: '#F59E0B' },
  { id: 'methodMark', title: 'Method Mark', description: 'Practice 4–6 mark questions with mark scheme breakdown', icon: ClipboardList, color: '#EC4899' },
  { id: 'practical', title: 'Practical Lab', description: 'Required practicals – variables, method, risk assessment', icon: FlaskConical, color: '#10B981' },
  { id: 'equation', title: 'Equation Lab', description: 'Equations, units, rearranging, "spot the wrong unit"', icon: Calculator, color: '#8B5CF6' },
  { id: 'misconception', title: 'Misconception Lab', description: 'Identify and correct classic wrong ideas', icon: AlertTriangle, color: '#EF4444' },
];

export function ScienceLabModePage() {
  const navigate = useNavigate();
  const { subject, paper: paperParam, tier: tierParam } = useParams<{ subject: string; paper?: string; tier?: string }>();
  const [selectedPaper, setSelectedPaper] = useState<SciencePaper>(
    paperParam ? (parseInt(paperParam) as SciencePaper) || 1 : 1
  );
  const [selectedTier, setSelectedTier] = useState<ScienceTier>(
    tierParam ? (tierParam.charAt(0).toUpperCase() + tierParam.slice(1)) as ScienceTier : 'Higher'
  );

  const subjectTitle = subject ? subject.charAt(0).toUpperCase() + subject.slice(1) : 'Science';
  const subjectId = subject?.toLowerCase() as ScienceSubject | undefined;

  if (!subjectId || !['biology', 'chemistry', 'physics'].includes(subject.toLowerCase())) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p>Invalid subject. Please select Biology, Chemistry, or Physics.</p>
        <button onClick={() => navigate('/science-lab')}>Go Back</button>
      </div>
    );
  }

  const normalizedSubject: ScienceSubject = subjectId.charAt(0).toUpperCase() + subjectId.slice(1) as ScienceSubject;
  const [searchParams] = useSearchParams();
  const topicFilter = searchParams.get('topic') ?? undefined;
  const base = `/science-lab/${subject?.toLowerCase()}/${selectedPaper}/${selectedTier.toLowerCase()}`;
  const query = topicFilter ? `?topic=${encodeURIComponent(topicFilter)}` : '';

  // Recommended next step: start with Learn, then suggest next step by progress
  const recommendedStep = useMemo(() => {
    const questions = getQuestionsByFilters(normalizedSubject, selectedPaper, selectedTier);
    const topics = new Set(questions.map(q => q.topic));
    let hasUnlockedTopic = false;
    let hasTopicTestNotDone = false;
    topics.forEach(topic => {
      const m = storage.getTopicMasteryByKey(normalizedSubject, selectedPaper, selectedTier, topic);
      if (m?.quizUnlocked) hasUnlockedTopic = true;
      if (m?.quizUnlocked && !m?.topicTestCompleted) hasTopicTestNotDone = true;
    });
    // Suggest topic test when quiz unlocked and at least one topic hasn't had topic test
    if (hasUnlockedTopic && hasTopicTestNotDone) {
      return { mode: 'topicTest' as LabMode, label: 'Try a topic test (master a full unit)' };
    }
    if (hasUnlockedTopic) return { mode: 'methodMark' as LabMode, label: 'Try bigger tests (Method Mark)' };
    const anyMastery = Array.from(topics).some(topic => {
      const m = storage.getTopicMasteryByKey(normalizedSubject, selectedPaper, selectedTier, topic);
      return (m?.flashcardMastery || 0) > 0;
    });
    if (anyMastery) return { mode: 'quickCheck' as LabMode, label: 'Do small tests (Quick Check)' };
    return { mode: 'flashcard' as LabMode, label: 'Start with Learn (flashcards)' };
  }, [normalizedSubject, selectedPaper, selectedTier]);

  const getRecommendedTopicForTest = () => {
    const topics = getTopicsBySubject(normalizedSubject);
    const questions = getQuestionsByFilters(normalizedSubject, selectedPaper, selectedTier);
    const topicsWithQuestions = new Set(questions.map((q) => q.topic));
    const viableTopics = topics.filter((t) => topicsWithQuestions.has(t));
    const firstIncomplete = viableTopics.find((topic) => {
      const m = storage.getTopicMasteryByKey(normalizedSubject, selectedPaper, selectedTier, topic);
      return m?.quizUnlocked && !m?.topicTestCompleted;
    });
    return firstIncomplete ?? viableTopics[0];
  };

  const handleEnterLab = (mode: LabMode) => {
    if (mode === 'topicTest') {
      const recommendedTopic = getRecommendedTopicForTest();
      if (recommendedTopic) {
        navigate(`${base}/topic-test?topic=${encodeURIComponent(recommendedTopic)}`);
      } else {
        navigate(`${base}/topic-test`);
      }
      return;
    }
    if (mode === 'fullGcseTest') {
      navigate(`${base}/full-gcse`);
      return;
    }
    const routeMap: Record<LabMode, string> = {
      flashcard: 'flashcard',
      quickCheck: 'quick-check',
      methodMark: 'methodMark',
      topicTest: 'topics',
      fullGcseTest: 'full-gcse',
      question: 'question',
      practical: 'practical',
      equation: 'equation',
      misconception: 'misconception',
      fixIt: 'fix-it',
    };
    const path = routeMap[mode];
    if (!path) return;
    navigate(`${base}/${path}${query}`);
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
          Back to Subjects
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{subjectTitle} Lab</h1>
        <p className="text-white/90 text-sm sm:text-base mb-4">
          Learn (flashcards + quick checks + bigger tests) → Topic test → Full GCSE test
        </p>
        <div className="flex items-center gap-2 p-3 rounded-lg bg-white/10">
          <Zap size={18} className="text-amber-300 flex-shrink-0" />
          <span className="text-sm text-white">
            <strong>Recommended:</strong> {recommendedStep.label}
            <button
              type="button"
              onClick={() => handleEnterLab(recommendedStep.mode)}
              className="ml-2 underline hover:no-underline font-semibold"
            >
              Start →
            </button>
          </span>
        </div>
      </motion.section>

      {/* Paper and Tier Selection */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl p-6 border"
        style={{
          background: 'rgb(var(--surface))',
          borderColor: 'rgb(var(--border))',
        }}
      >
        <h2 className="text-lg font-bold mb-4" style={{ color: 'rgb(var(--text))' }}>
          Paper & Tier Selection
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
              Paper
            </label>
            <div className="flex gap-2">
              {([1, 2] as SciencePaper[]).map((paper) => (
                <button
                  key={paper}
                  type="button"
                  onClick={() => setSelectedPaper(paper)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                    selectedPaper === paper
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                  style={{
                    background: selectedPaper === paper
                      ? 'linear-gradient(135deg, #0EA5E9 0%, #EC4899 100%)'
                      : 'rgb(var(--surface-2))',
                  }}
                >
                  Paper {paper}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
              Tier
            </label>
            <div className="flex gap-2">
              {(['Foundation', 'Higher'] as ScienceTier[]).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => setSelectedTier(tier)}
                  className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
                    selectedTier === tier
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                  style={{
                    background: selectedTier === tier
                      ? 'linear-gradient(135deg, #0EA5E9 0%, #EC4899 100%)'
                      : 'rgb(var(--surface-2))',
                  }}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button
            type="button"
            onClick={() => navigate(`${base}/topics`)}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition"
            style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text))' }}
          >
            <BookOpen size={18} />
            Browse by topic
          </button>
        </div>
      </motion.section>

      {/* Learning path – 5 steps */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
          <BookOpen size={20} style={{ color: '#0EA5E9' }} />
          Your learning path
        </h2>
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          Follow in order: Learn → Topic test → Full GCSE test
        </p>
        <div className="space-y-3">
          {LEARNING_PATH.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                onClick={() => handleEnterLab(item.id)}
                className="w-full rounded-2xl p-5 sm:p-6 text-left border shadow-sm hover:shadow-md transition-all flex items-center gap-4"
                style={{
                  background: 'rgb(var(--surface))',
                  borderColor: 'rgb(var(--border))',
                }}
              >
                <span
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                  style={{ background: item.color }}
                >
                  {item.step}
                </span>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${item.color}20` }}>
                  <Icon size={24} style={{ color: item.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold mb-0.5" style={{ color: 'rgb(var(--text))' }}>{item.title}</h3>
                  <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{item.description}</p>
                </div>
                <ChevronRight size={20} style={{ color: 'rgb(var(--text-secondary))' }} className="flex-shrink-0" />
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Extra practice */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
          <Zap size={20} style={{ color: '#F59E0B' }} />
          Extra practice
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {EXTRA_PRACTICE.map((mode, index) => {
            const Icon = mode.icon;
            return (
              <motion.button
                key={mode.id}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                onClick={() => handleEnterLab(mode.id)}
                className="rounded-xl p-5 text-left border shadow-sm hover:shadow-md transition-all flex flex-col"
                style={{
                  background: 'rgb(var(--surface))',
                  borderColor: 'rgb(var(--border))',
                }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: `${mode.color}20` }}>
                  <Icon size={20} style={{ color: mode.color }} />
                </div>
                <h3 className="font-bold text-sm mb-1" style={{ color: 'rgb(var(--text))' }}>{mode.title}</h3>
                <p className="text-xs flex-1" style={{ color: 'rgb(var(--text-secondary))' }}>{mode.description}</p>
              </motion.button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
