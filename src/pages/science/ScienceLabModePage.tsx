import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Lightbulb, FileQuestion, Target, FlaskConical, Calculator, AlertTriangle, ChevronRight, BookOpen, Zap } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getQuestionsByFilters } from '../../config/scienceLabData';
import type { ScienceSubject, SciencePaper, ScienceTier, LabMode } from '../../types/scienceLab';

const LAB_MODES: Array<{
  id: LabMode;
  title: string;
  description: string;
  icon: typeof Lightbulb;
  color: string;
  order: number;
  group: 'learn' | 'practise';
}> = [
  { id: 'concept', title: 'Concept Lab', description: 'Understanding first – visual models, misconceptions, "if this changes" scenarios', icon: Lightbulb, color: '#0EA5E9', order: 1, group: 'learn' },
  { id: 'flashcard', title: 'Flashcard Mode', description: 'Learn it first – understand processes, not memorize facts. Required before quizzes.', icon: BookOpen, color: '#0EA5E9', order: 2, group: 'learn' },
  { id: 'quickCheck', title: 'Quick Check', description: 'Do you actually understand? Micro-assessments before quizzes unlock.', icon: Target, color: '#F59E0B', order: 3, group: 'learn' },
  { id: 'question', title: 'Question Lab', description: 'Exam-faithful questions – unlocks after flashcards mastered and quick checks passed.', icon: FileQuestion, color: '#EC4899', order: 4, group: 'learn' },
  { id: 'methodMark', title: 'Method Mark Trainer', description: 'Train for 4–6 mark questions – idea marks, method marks, precision marks', icon: Target, color: '#F59E0B', order: 5, group: 'practise' },
  { id: 'practical', title: 'Practical Lab', description: 'Required practicals – variables, method, risk assessment, evaluation', icon: FlaskConical, color: '#10B981', order: 6, group: 'practise' },
  { id: 'equation', title: 'Equation Lab', description: 'Equations with units enforcement, rearranging practice, "spot the wrong unit" traps', icon: Calculator, color: '#8B5CF6', order: 7, group: 'practise' },
  { id: 'misconception', title: 'Misconception Lab', description: 'Identify and correct classic wrong ideas – Grade 9 feature', icon: AlertTriangle, color: '#EF4444', order: 8, group: 'practise' },
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
        <button onClick={() => navigate('/science-lab/subjects')}>Go Back</button>
      </div>
    );
  }

  const normalizedSubject: ScienceSubject = subjectId.charAt(0).toUpperCase() + subjectId.slice(1) as ScienceSubject;
  const [searchParams] = useSearchParams();
  const topicFilter = searchParams.get('topic') ?? undefined;

  // Recommended next step based on mastery
  const recommendedStep = useMemo(() => {
    const questions = getQuestionsByFilters(normalizedSubject, selectedPaper, selectedTier);
    const topics = new Set(questions.map(q => q.topic));
    let hasUnlockedTopic = false;
    topics.forEach(topic => {
      const m = storage.getTopicMasteryByKey(normalizedSubject, selectedPaper, selectedTier, topic);
      if (m?.quizUnlocked) hasUnlockedTopic = true;
    });
    if (hasUnlockedTopic) return { mode: 'question' as LabMode, label: 'Practice exam questions' };
    const anyMastery = Array.from(topics).some(topic => {
      const m = storage.getTopicMasteryByKey(normalizedSubject, selectedPaper, selectedTier, topic);
      return (m?.flashcardMastery || 0) > 0;
    });
    if (anyMastery) return { mode: 'quickCheck' as LabMode, label: 'Complete Quick Check to unlock quizzes' };
    return { mode: 'concept' as LabMode, label: 'Start with Concept Lab' };
  }, [normalizedSubject, selectedPaper, selectedTier]);

  const handleEnterLab = (mode: LabMode) => {
    const routeMap: Record<LabMode, string> = {
      flashcard: 'flashcard',
      quickCheck: 'quick-check',
      question: 'question',
      concept: 'concept',
      methodMark: 'methodMark',
      practical: 'practical',
      equation: 'equation',
      misconception: 'misconception',
      fixIt: 'fix-it',
    };
    const base = `/science-lab/${subject?.toLowerCase()}/${selectedPaper}/${selectedTier.toLowerCase()}/${routeMap[mode]}`;
    const query = topicFilter ? `?topic=${encodeURIComponent(topicFilter)}` : '';
    navigate(base + query);
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
          onClick={() => navigate('/science-lab/subjects')}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Subjects
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{subjectTitle} Lab</h1>
        <p className="text-white/90 text-sm sm:text-base mb-4">
          Choose your paper, tier, and lab mode
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
            onClick={() => navigate(`/science-lab/${subject?.toLowerCase()}/${selectedPaper}/${selectedTier.toLowerCase()}/topics`)}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition"
            style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text))' }}
          >
            <BookOpen size={18} />
            Browse by topic
          </button>
        </div>
      </motion.section>

      {/* Lab Modes - Learn (core path) */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
          <BookOpen size={20} style={{ color: '#0EA5E9' }} />
          Learn — Core Path
        </h2>
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          Follow this order: Concept → Flashcard → Quick Check → Question Lab
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LAB_MODES.filter(m => m.group === 'learn').sort((a, b) => a.order - b.order).map((mode, index) => {
            const Icon = mode.icon;
            return (
              <motion.button
                key={mode.id}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                onClick={() => handleEnterLab(mode.id)}
                className="rounded-2xl p-6 text-left border shadow-sm hover:shadow-md transition-all flex flex-col"
                style={{
                  background: 'rgb(var(--surface))',
                  borderColor: 'rgb(var(--border))',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: `${mode.color}30`, color: mode.color }}>Step {mode.order}</span>
                </div>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${mode.color}20` }}>
                  <Icon size={24} style={{ color: mode.color }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>{mode.title}</h3>
                <p className="text-sm flex-1" style={{ color: 'rgb(var(--text-secondary))' }}>{mode.description}</p>
                <div className="mt-4 flex items-center gap-1 font-semibold text-sm" style={{ color: mode.color }}>
                  <span>Enter Lab</span>
                  <ChevronRight size={16} />
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Lab Modes - Practise (support) */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
          <Zap size={20} style={{ color: '#F59E0B' }} />
          Practise — Strengthen Weak Areas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LAB_MODES.filter(m => m.group === 'practise').sort((a, b) => a.order - b.order).map((mode, index) => {
            const Icon = mode.icon;
            return (
              <motion.button
                key={mode.id}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                onClick={() => handleEnterLab(mode.id)}
                className="rounded-2xl p-6 text-left border shadow-sm hover:shadow-md transition-all flex flex-col"
                style={{
                  background: 'rgb(var(--surface))',
                  borderColor: 'rgb(var(--border))',
                }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${mode.color}20` }}>
                  <Icon size={24} style={{ color: mode.color }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>{mode.title}</h3>
                <p className="text-sm flex-1" style={{ color: 'rgb(var(--text-secondary))' }}>{mode.description}</p>
                <div className="mt-4 flex items-center gap-1 font-semibold text-sm" style={{ color: mode.color }}>
                  <span>Enter Lab</span>
                  <ChevronRight size={16} />
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
