import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Landmark, Clock, BookOpen, Lightbulb, Target, FileQuestion, Map, FileText } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getHistoryOptionsForSelection } from '../../config/historyHubData';

const ACCENT = '#B45309';

export function HistoryHubHomePage() {
  const navigate = useNavigate();
  const selection = storage.getHistoryOptionSelection();
  const options = selection ? getHistoryOptionsForSelection(selection) : null;

  const modes = [
    { id: 'timeline', title: 'Timeline & narrative', description: 'Key events in order', icon: Clock, path: '/history-hub/timeline' },
    { id: 'key-terms', title: 'Key terms & flashcards', description: 'Dates, people, terms', icon: BookOpen, path: '/history-hub/key-terms' },
    { id: 'concept', title: 'Concept cards', description: 'Cause, consequence, change', icon: Lightbulb, path: '/history-hub/concept-cards' },
    { id: 'quick-check', title: 'Quick check', description: 'Micro-assessments', icon: Target, path: '/history-hub/quick-check' },
    { id: 'source-lab', title: 'Source lab', description: 'How useful? Source analysis (AO3)', icon: FileText, path: '/history-hub/source-lab' },
    { id: 'interpretation', title: 'Interpretation lab', description: 'How convincing? How far agree? (AO4)', icon: FileQuestion, path: '/history-hub/interpretation-lab' },
    { id: 'question-lab', title: 'Question lab', description: 'Describe, explain, account, essay', icon: FileQuestion, path: '/history-hub/question-lab' },
    { id: 'revision-map', title: 'Revision map', description: 'Your options and progress', icon: Map, path: '/history-hub/revision-map' },
    { id: 'historic-environment', title: 'Historic environment', description: 'British depth site + context (Paper 2)', icon: Landmark, path: '/history-hub/historic-environment' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{
          background: `linear-gradient(135deg, ${ACCENT} 0%, #92400E 50%, #78350F 100%)`,
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
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">History Hub</h1>
        <p className="text-white/90 text-sm sm:text-base">
          AQA GCSE History 8145 – Timeline, key terms, sources, interpretations & exam-style questions
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
            You need to select one period study, one wider world depth study, one thematic study, and one British depth study (as per your school’s entry).
          </p>
          <button
            type="button"
            onClick={() => navigate('/history-hub/option-select')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white"
            style={{ background: ACCENT }}
          >
            <Landmark size={18} />
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
              Your options
            </h2>
            <ul className="space-y-1.5 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              {options?.map((opt) => (
                <li key={opt.optionKey}>
                  <span className="font-medium" style={{ color: 'rgb(var(--text))' }}>{opt.title}</span>
                  <span className="ml-1">(Paper {opt.paper})</span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => navigate('/history-hub/option-select')}
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
