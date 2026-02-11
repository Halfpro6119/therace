import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Brain, Lightbulb, BookOpen, Target, Search, Scale, FileQuestion, FlaskConical, Map } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getPsychologyTopicsForSelection } from '../../config/psychologyHubData';

const ACCENT = '#9333EA';

export function PsychologyHubHomePage() {
  const navigate = useNavigate();
  const selection = storage.getPsychologyOptionSelection();
  const topics = selection ? getPsychologyTopicsForSelection(selection) : null;

  const modes = [
    { id: 'concept', title: 'Concept Lab', description: 'Core ideas and key studies', icon: Lightbulb, path: '/psychology-hub/concept-lab' },
    { id: 'key-studies', title: 'Key studies & terms', description: 'Flashcards for researchers and terminology', icon: BookOpen, path: '/psychology-hub/key-studies' },
    { id: 'quick-check', title: 'Quick check', description: 'Micro-assessments', icon: Target, path: '/psychology-hub/quick-check' },
    { id: 'study-evaluator', title: 'Study evaluator', description: 'AO3 strengths & limitations', icon: Scale, path: '/psychology-hub/study-evaluator' },
    { id: 'issues-debates', title: 'Issues & debates', description: 'Apply nature-nurture, reductionism, etc.', icon: Search, path: '/psychology-hub/issues-debates' },
    { id: 'research-methods', title: 'Research methods', description: 'Design, data, inferential testing', icon: FlaskConical, path: '/psychology-hub/research-methods' },
    { id: 'question-lab', title: 'Question lab', description: 'Short answer & extended writing', icon: FileQuestion, path: '/psychology-hub/question-lab' },
    { id: 'revision-map', title: 'Revision map', description: 'Your topics and progress', icon: Map, path: '/psychology-hub/revision-map' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{
          background: `linear-gradient(135deg, ${ACCENT} 0%, #7C3AED 50%, #6D28D9 100%)`,
          borderColor: 'transparent',
        }}
      >
        <button
          type="button"
          onClick={() => navigate('/subjects')}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Subjects
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Psychology Hub</h1>
        <p className="text-white/90 text-sm sm:text-base">
          AQA A-level Psychology 7182 – Concepts, key studies, evaluation & exam practice
        </p>
      </motion.section>

      {!selection ? (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 border shadow-sm"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <h2 className="text-lg font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
            Choose your options
          </h2>
          <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
            For Paper 3, you need to select one topic from each option: Option 1 (Relationships, Gender, or Cognition and development), Option 2 (Schizophrenia, Eating behaviour, or Stress), and Option 3 (Aggression, Forensic Psychology, or Addiction).
          </p>
          <button
            type="button"
            onClick={() => navigate('/psychology-hub/option-select')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white"
            style={{ background: ACCENT }}
          >
            <Brain size={18} />
            Select options
          </button>
        </motion.section>
      ) : (
        <>
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6 border shadow-sm"
            style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
          >
            <h2 className="text-lg font-bold mb-3" style={{ color: 'rgb(var(--text))' }}>
              Your options (Paper 3)
            </h2>
            <ul className="space-y-1.5 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              {topics?.filter((t) => !t.isCompulsory).map((t) => (
                <li key={t.id}>
                  <span className="font-medium" style={{ color: 'rgb(var(--text))' }}>{t.title}</span>
                  <span className="ml-1">(Paper {t.paper})</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => navigate('/psychology-hub/option-select')}
              className="mt-3 text-sm font-medium"
              style={{ color: ACCENT }}
            >
              Change options
            </button>
          </motion.section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
              Learning modes
            </h2>
            <div className="grid gap-4">
              {modes.map((mode, index) => (
                <motion.button
                  key={mode.id}
                  type="button"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => navigate(mode.path)}
                  className="w-full rounded-2xl p-5 text-left border shadow-sm hover:shadow-md transition-all flex items-center justify-between"
                  style={{
                    background: 'rgb(var(--surface))',
                    borderColor: 'rgb(var(--border))',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl" style={{ background: `${ACCENT}20` }}>
                      <mode.icon size={24} style={{ color: ACCENT }} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold mb-0.5" style={{ color: 'rgb(var(--text))' }}>
                        {mode.title}
                      </h3>
                      <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                        {mode.description}
                      </p>
                    </div>
                  </div>
                  <ChevronLeft size={20} style={{ color: 'rgb(var(--text-secondary))', transform: 'rotate(180deg)' }} />
                </motion.button>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
