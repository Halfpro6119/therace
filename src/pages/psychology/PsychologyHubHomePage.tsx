import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Brain, Lightbulb, BookOpen, Target, Search, Scale, FileQuestion, FlaskConical, Map, GraduationCap, ChevronRight } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getPsychologyTopicsForSelection } from '../../config/psychologyHubData';
import { LAB_HERO_GRADIENT, LAB_ACCENT } from '../../config/hubTheme';

export function PsychologyHubHomePage() {
  const navigate = useNavigate();
  const selection = storage.getPsychologyOptionSelection();
  const topics = getPsychologyTopicsForSelection();

  const TEST_MODES = [
    { id: 'topic-test', title: 'Topic test', description: 'Past-paper-style questions per topic', icon: FileQuestion, path: '/psychology-hub/question-lab', color: '#8B5CF6' },
    { id: 'full-exam', title: 'Full exam practice', description: 'Short answer & extended writing', icon: GraduationCap, path: '/psychology-hub/question-lab', color: '#10B981' },
  ];
  const REVISE_MODES = [
    { id: 'flashcards', title: 'Flashcards', description: 'Key studies & terminology', icon: BookOpen, path: '/psychology-hub/key-studies', color: '#0EA5E9' },
    { id: 'quick-check', title: 'Quick check', description: 'Micro-assessments', icon: Target, path: '/psychology-hub/quick-check', color: '#F59E0B' },
  ];
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
          background: LAB_HERO_GRADIENT,
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
          AQA GCSE Psychology 8182 – Memory, perception, development, social influence & exam practice
        </p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 border shadow-sm"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <h2 className="text-lg font-bold mb-3" style={{ color: 'rgb(var(--text))' }}>
          Your topics (GCSE 8182)
        </h2>
        <p className="text-sm mb-3" style={{ color: 'rgb(var(--text-secondary))' }}>
          Paper 1: Memory, Perception, Development, Research methods. Paper 2: Social influence, Language thought & communication, Brain & neuropsychology, Psychological problems.
        </p>
        {!selection?.confirmed && (
          <button
            type="button"
            onClick={() => navigate('/psychology-hub/option-select')}
            className="text-sm font-medium"
            style={{ color: LAB_ACCENT }}
          >
            View spec details
          </button>
        )}
      </motion.section>

      {/* Test yourself */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
          <FileQuestion size={20} style={{ color: '#8B5CF6' }} />
          Test yourself
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {TEST_MODES.map((m, i) => (
            <motion.button key={m.id} type="button" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
              onClick={() => navigate(m.path)} className="rounded-2xl p-5 text-left border shadow-sm hover:shadow-md transition-all flex items-center justify-between"
              style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${m.color}20` }}>
                  <m.icon size={20} style={{ color: m.color }} />
                </div>
                <div>
                  <h3 className="font-bold mb-0.5" style={{ color: 'rgb(var(--text))' }}>{m.title}</h3>
                  <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{m.description}</p>
                </div>
              </div>
              <ChevronRight size={20} style={{ color: 'rgb(var(--text-secondary))' }} />
            </motion.button>
          ))}
        </div>
      </section>

      {/* Revise */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
          <BookOpen size={20} style={{ color: '#0EA5E9' }} />
          Revise to improve your score
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {REVISE_MODES.map((m, i) => (
            <motion.button key={m.id} type="button" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.03 }}
              onClick={() => navigate(m.path)} className="rounded-2xl p-5 text-left border shadow-sm hover:shadow-md transition-all flex items-center justify-between"
              style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${m.color}20` }}>
                  <m.icon size={20} style={{ color: m.color }} />
                </div>
                <div>
                  <h3 className="font-bold mb-0.5" style={{ color: 'rgb(var(--text))' }}>{m.title}</h3>
                  <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{m.description}</p>
                </div>
              </div>
              <ChevronRight size={20} style={{ color: 'rgb(var(--text-secondary))' }} />
            </motion.button>
          ))}
        </div>
      </section>

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
                    <div className="p-3 rounded-xl" style={{ background: `${LAB_ACCENT}20` }}>
                      <mode.icon size={24} style={{ color: LAB_ACCENT }} />
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
                  <ChevronRight size={20} style={{ color: 'rgb(var(--text-secondary))' }} />
                </motion.button>
              ))}
            </div>
          </section>
    </div>
  );
}
