import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Lightbulb, FileQuestion, Target, FlaskConical, Calculator, AlertTriangle, ChevronRight } from 'lucide-react';
import type { ScienceSubject, SciencePaper, ScienceTier, LabMode } from '../../types/scienceLab';

const LAB_MODES: Array<{
  id: LabMode;
  title: string;
  description: string;
  icon: typeof Lightbulb;
  color: string;
  order: number; // For ordering: flashcards first, then quick check, then quiz
}> = [
  {
    id: 'flashcard',
    title: 'Flashcard Mode',
    description: 'Learn it first – understand processes, not memorize facts. Required before quizzes.',
    icon: Lightbulb,
    color: '#0EA5E9',
    order: 1,
  },
  {
    id: 'quickCheck',
    title: 'Quick Check',
    description: 'Do you actually understand? Micro-assessments before quizzes unlock.',
    icon: Target,
    color: '#F59E0B',
    order: 2,
  },
  {
    id: 'question',
    title: 'Question Lab',
    description: 'Exam-faithful questions covering every spec point – unlocks after flashcards mastered',
    icon: FileQuestion,
    color: '#EC4899',
    order: 3,
  },
  {
    id: 'concept',
    title: 'Concept Lab',
    description: 'Understanding first – visual models, misconceptions, "if this changes" scenarios',
    icon: Lightbulb,
    color: '#0EA5E9',
    order: 4,
  },
  {
    id: 'methodMark',
    title: 'Method Mark Trainer',
    description: 'Train for 4–6 mark questions – idea marks, method marks, precision marks',
    icon: Target,
    color: '#F59E0B',
    order: 5,
  },
  {
    id: 'practical',
    title: 'Practical Lab',
    description: 'Required practicals – variables, method, risk assessment, evaluation',
    icon: FlaskConical,
    color: '#10B981',
    order: 6,
  },
  {
    id: 'equation',
    title: 'Equation Lab',
    description: 'Equations with units enforcement, rearranging practice, "spot the wrong unit" traps',
    icon: Calculator,
    color: '#8B5CF6',
    order: 7,
  },
  {
    id: 'misconception',
    title: 'Misconception Lab',
    description: 'Identify and correct classic wrong ideas – Grade 9 feature',
    icon: AlertTriangle,
    color: '#EF4444',
    order: 8,
  },
];

export function ScienceLabModePage() {
  const navigate = useNavigate();
  const { subject } = useParams<{ subject: string }>();
  const [selectedPaper, setSelectedPaper] = useState<SciencePaper>(1);
  const [selectedTier, setSelectedTier] = useState<ScienceTier>('Higher');

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

  const handleEnterLab = (mode: LabMode) => {
    // Map mode IDs to route paths
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
    navigate(`/science-lab/${subject.toLowerCase()}/${selectedPaper}/${selectedTier.toLowerCase()}/${routeMap[mode]}`);
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
        <p className="text-white/90 text-sm sm:text-base">
          Choose your paper, tier, and lab mode
        </p>
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
      </motion.section>

      {/* Lab Modes */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
          Choose a Lab Mode
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LAB_MODES.sort((a, b) => a.order - b.order).map((mode, index) => {
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
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${mode.color}20` }}
                >
                  <Icon size={24} style={{ color: mode.color }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
                  {mode.title}
                </h3>
                <p className="text-sm flex-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {mode.description}
                </p>
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
