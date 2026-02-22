import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, BookHeart, Lightbulb, BookOpen, GitCompare, Target, FileText, PenLine, Scale, Map, FileQuestion, GraduationCap, ChevronRight } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getOptionsForSelection } from '../../config/religiousStudiesHubData';

import { LAB_HERO_GRADIENT, LAB_ACCENT } from '../../config/hubTheme';

export function ReligiousStudiesHubHomePage() {
  const navigate = useNavigate();
  const selection = storage.getRSOptionSelection();
  const options = selection ? getOptionsForSelection(selection) : null;

  const TEST_MODES = [
    { id: 'short-answer', title: 'Topic test', description: '1-, 2-, 4- and 5-mark questions', icon: FileQuestion, path: '/religious-studies-hub/short-answer-lab', color: '#8B5CF6' },
    { id: 'full-exam', title: 'Full exam practice', description: '12-mark evaluation questions', icon: GraduationCap, path: '/religious-studies-hub/extended-writing-lab', color: '#10B981' },
  ];
  const REVISE_MODES = [
    { id: 'flashcards', title: 'Flashcards', description: 'Scripture & key terms', icon: BookOpen, path: '/religious-studies-hub/flashcards', color: '#0EA5E9' },
    { id: 'quick-check', title: 'Quick check', description: 'Micro-assessments', icon: Target, path: '/religious-studies-hub/quick-check', color: '#F59E0B' },
  ];
  const modes = [
    { id: 'belief-lab', title: 'Belief Lab', description: 'Core beliefs and teachings', icon: Lightbulb, path: '/religious-studies-hub/belief-lab' },
    { id: 'flashcards', title: 'Scripture & key terms', description: 'Flashcards for terms and scripture', icon: BookOpen, path: '/religious-studies-hub/flashcards' },
    { id: 'contrasting-views', title: 'Contrasting views', description: 'Explain two contrasting beliefs', icon: GitCompare, path: '/religious-studies-hub/contrasting-views' },
    { id: 'quick-check', title: 'Quick check', description: 'Micro-assessments', icon: Target, path: '/religious-studies-hub/quick-check' },
    { id: 'short-answer', title: 'Short answer lab', description: '1-, 2-, 4- and 5-mark questions', icon: FileText, path: '/religious-studies-hub/short-answer-lab' },
    { id: 'extended-writing', title: 'Extended writing', description: '12-mark evaluation questions', icon: PenLine, path: '/religious-studies-hub/extended-writing-lab' },
    { id: 'philosophical', title: 'Philosophical arguments', description: 'Theme C: Design, First Cause, evil', icon: Scale, path: '/religious-studies-hub/philosophical-arguments' },
    { id: 'textual', title: 'Textual studies', description: "St Mark's Gospel (Themes G & H)", icon: BookOpen, path: '/religious-studies-hub/textual-studies' },
    { id: 'revision-map', title: 'Revision map', description: 'Your options and progress', icon: Map, path: '/religious-studies-hub/revision-map' },
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
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Religious Studies Hub</h1>
        <p className="text-white/90 text-sm sm:text-base">
          AQA GCSE Religious Studies A 8062 – Beliefs, themes & exam-style questions
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
            Select two religions (Christianity and Catholic Christianity cannot be combined) and four themes (or two themes + textual studies).
          </p>
          <button
            type="button"
            onClick={() => navigate('/religious-studies-hub/option-select')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white"
            style={{ background: LAB_ACCENT }}
          >
            <BookHeart size={18} />
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
            <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
              <strong>Component 1:</strong> {options?.religion1.title} & {options?.religion2.title}
            </p>
            <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
              <strong>Component 2:</strong> {options?.themes.map((t) => t.title).join(', ')}
            </p>
            <button
              type="button"
              onClick={() => navigate('/religious-studies-hub/option-select')}
              className="mt-3 text-sm font-medium"
              style={{ color: LAB_ACCENT }}
            >
              Change options
            </button>
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
        </>
      )}
    </div>
  );
}
