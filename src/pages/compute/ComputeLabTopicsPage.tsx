/**
 * Compute Lab Topics Page – Science Lab structure.
 * Hero with filters → Full unit test → Work on All (dropdown) → Browse by Topic.
 */
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Layers,
  FileQuestion,
  Lightbulb,
  Target,
  GitBranch,
  Calculator,
  CircleDot,
  Database,
} from 'lucide-react';
import { getUnitById } from '../../config/computeLabData';
import { storage } from '../../utils/storage';
import { LAB_HERO_GRADIENT, LAB_ACCENT } from '../../config/hubTheme';
import type { ComputeUnitId } from '../../types/computeLab';

const WORK_ON_ALL_MODES = [
  { id: 'concept', title: 'Concept Lab', description: 'Core ideas, misconceptions & change scenarios', icon: Lightbulb, color: '#0EA5E9', path: 'concept' },
  { id: 'flashcard', title: 'Glossary / Flashcards', description: 'Learn key terms and definitions', icon: BookOpen, color: '#0EA5E9', path: 'flashcard' },
  { id: 'quick-check', title: 'Quick Check', description: 'MCQ, T/F, drag order – micro-assessments', icon: Target, color: '#0891B2', path: 'quick-check' },
  { id: 'algorithm-lab', title: 'Algorithm Lab', description: 'Trace tables & algorithm practice', icon: GitBranch, color: '#8B5CF6', path: 'algorithm-lab' },
  { id: 'calculation-lab', title: 'Calculation Lab', description: 'Binary, bitmap, sound, compression', icon: Calculator, color: '#10B981', path: 'calculation-lab' },
  { id: 'logic-lab', title: 'Logic Lab', description: 'Truth tables & Boolean expressions', icon: CircleDot, color: '#F59E0B', path: 'logic-lab' },
  { id: 'sql-lab', title: 'SQL Lab', description: 'SELECT, INSERT, UPDATE, DELETE', icon: Database, color: '#EC4899', path: 'sql-lab' },
  { id: 'question-lab', title: 'Question Lab', description: 'Exam-style questions', icon: FileQuestion, color: '#6366F1', path: 'question-lab' },
];

export function ComputeLabTopicsPage() {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId: string }>();
  const [workOnAllOpen, setWorkOnAllOpen] = useState(false);
  const workOnAllRef = useRef<HTMLDivElement>(null);

  const unit = unitId ? getUnitById(unitId as ComputeUnitId) : undefined;
  const topicIds = unit ? unit.topics.map((t) => t.id) : [];
  const algorithmLabUnlocked = unit ? storage.isComputeAlgorithmLabUnlocked(unit.id, topicIds) : false;

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

  if (!unit) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p style={{ color: 'rgb(var(--text))' }}>Unit not found.</p>
        <button type="button" onClick={() => navigate('/compute-lab')} className="mt-4 text-sm font-medium" style={{ color: LAB_ACCENT }}>
          Back to Compute Lab
        </button>
      </div>
    );
  }

  const base = `/compute-lab/unit/${unit.id}`;
  const isLocked = (modeId: string) => {
    if (modeId === 'algorithm-lab') return !algorithmLabUnlocked;
    return false;
  };

  const showPaperFilter = unit.paper1 || unit.paper2;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero – like Science Lab Topics */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{ background: LAB_HERO_GRADIENT, borderColor: 'transparent' }}
      >
        <button
          type="button"
          onClick={() => navigate('/compute-lab')}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Compute Lab
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Topic Map — Unit {unit.id}</h1>
        <p className="text-white/90 text-sm sm:text-base mb-4">
          {unit.title}. Browse by topic or jump straight into a past-paper-style test.
        </p>
        {showPaperFilter && (
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm text-white/80">
              {unit.paper1 && unit.paper2 ? 'Paper 1 & 2' : unit.paper1 ? 'Paper 1' : 'Paper 2'}
            </span>
          </div>
        )}
      </motion.section>

      {/* Full unit test – first */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
        <button
          type="button"
          onClick={() => navigate(`${base}/quick-check`)}
          className="w-full rounded-xl p-6 text-left border shadow-sm hover:shadow-md transition-all flex items-center justify-between"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500">
              <FileQuestion size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold mb-1" style={{ color: 'rgb(var(--text))' }}>
                Full unit test
              </h2>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                Quick Check per topic, then Algorithm Lab, Question Lab
              </p>
            </div>
          </div>
          <ChevronRight size={24} style={{ color: 'rgb(var(--text-secondary))' }} />
        </button>
      </motion.section>

      {/* Work on All Topics – dropdown */}
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="relative">
        <div ref={workOnAllRef} className="relative">
          <button
            type="button"
            onClick={() => setWorkOnAllOpen((o) => !o)}
            className="w-full rounded-xl p-6 text-left border shadow-sm hover:shadow-md transition-all flex items-center justify-between"
            style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
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
                  Choose a learning mode – concept, glossary, quick check, algorithm lab, and more
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
              {WORK_ON_ALL_MODES.filter((m) => {
                if (m.id === 'algorithm-lab') return ['3.1', '3.2'].includes(unit.id);
                if (m.id === 'calculation-lab') return unit.id === '3.3';
                if (m.id === 'logic-lab') return unit.id === '3.4';
                if (m.id === 'sql-lab') return unit.id === '3.7';
                return true;
              }).map((mode) => {
                const Icon = mode.icon;
                const locked = isLocked(mode.id);
                return (
                  <button
                    key={mode.id}
                    type="button"
                    disabled={locked}
                    onClick={() => {
                      if (!locked) {
                        navigate(`${base}/${mode.path}`);
                        setWorkOnAllOpen(false);
                      }
                    }}
                    className={`w-full px-5 py-4 flex items-center gap-4 text-left transition ${locked ? 'opacity-60 cursor-not-allowed' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                    style={{ color: 'rgb(var(--text))' }}
                  >
                    <div className="p-2.5 rounded-lg flex-shrink-0" style={{ background: `${mode.color}20` }}>
                      <Icon size={20} style={{ color: mode.color }} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-sm">{mode.title}{locked ? ' (Locked)' : ''}</p>
                      <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>{mode.description}</p>
                    </div>
                    {!locked && <ChevronRight size={18} className="flex-shrink-0 opacity-50" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </motion.section>

      {/* Browse by Topic */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
          <BookOpen size={20} style={{ color: '#0EA5E9' }} />
          Browse by Topic
        </h2>
        <div className="space-y-3">
          {unit.topics.map((topic, index) => {
            const progress = storage.getComputeTopicProgressByKey(unit.id, topic.id);
            const flashcardPct = progress?.flashcardMasteryPercent ?? 0;
            const quickCheckPassed = progress?.quickCheckPassed ?? false;
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.03 }}
                className="rounded-xl p-5 border shadow-sm"
                style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold mb-1" style={{ color: 'rgb(var(--text))' }}>
                      {topic.specRef} {topic.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm flex-wrap" style={{ color: 'rgb(var(--text-secondary))' }}>
                      <span>{flashcardPct}% glossary mastery</span>
                      {quickCheckPassed && (
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-green-500/20 text-green-700 dark:text-green-400">
                          Quick Check passed
                        </span>
                      )}
                    </div>
                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 max-w-[200px]">
                      <div
                        className="h-1.5 rounded-full transition-all bg-blue-500"
                        style={{ width: `${Math.min(flashcardPct, 100)}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => navigate(`${base}/concept`)}
                      className="px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition"
                      style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                    >
                      <Lightbulb size={14} />
                      Learn
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(`${base}/flashcard`)}
                      className="px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 border transition"
                      style={{
                        background: flashcardPct < 80 ? 'rgba(14, 165, 233, 0.15)' : 'rgb(var(--surface-2))',
                        borderColor: flashcardPct < 80 ? 'rgb(14, 165, 233)' : 'rgb(var(--border))',
                        color: flashcardPct < 80 ? 'rgb(14, 165, 233)' : 'rgb(var(--text))',
                      }}
                    >
                      <BookOpen size={14} />
                      Glossary
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(`${base}/quick-check`)}
                      className="px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
                      style={{ background: '#8B5CF6', color: 'white' }}
                    >
                      <Target size={16} />
                      Quick Check
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
