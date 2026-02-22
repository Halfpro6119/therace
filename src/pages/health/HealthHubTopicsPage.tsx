/**
 * Health Hub Topics Page – Science Lab structure.
 * Hero → Full unit test → Work on All (dropdown) → Browse by Topic.
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
  FileText,
  Search,
  PenLine,
  MessageSquare,
} from 'lucide-react';
import { getUnitById } from '../../config/healthHubData';
import { storage } from '../../utils/storage';
import { LAB_HERO_GRADIENT, LAB_ACCENT } from '../../config/hubTheme';
import type { HealthUnitId } from '../../types/healthHub';

const WORK_ON_ALL_MODES = [
  { id: 'concept', title: 'Concept Lab', description: 'Core ideas, misconceptions & apply scenarios', icon: Lightbulb, color: '#0EA5E9', path: 'concept' },
  { id: 'flashcard', title: 'Glossary / Flashcards', description: 'Learn key terms and definitions', icon: BookOpen, color: '#0EA5E9', path: 'flashcard' },
  { id: 'quick-check', title: 'Quick Check', description: 'Micro-assessments before case studies', icon: Target, color: '#F59E0B', path: 'quick-check' },
  { id: 'case-study', title: 'Case Study Lab', description: 'Apply knowledge to scenarios', icon: FileText, color: '#EC4899', path: 'case-study' },
  { id: 'investigation', title: 'Investigation Lab', description: 'Plan investigations (Unit 2 & 3)', icon: Search, color: '#8B5CF6', units: ['2', '3'] },
  { id: 'care-values', title: 'Care Values Practice', description: 'Identify and apply care values', icon: MessageSquare, color: '#10B981' },
  { id: 'question-lab', title: 'Question Lab', description: 'Describe, explain, analyse, evaluate', icon: PenLine, color: '#6366F1', path: 'question-lab' },
];

export function HealthHubTopicsPage() {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId: string }>();
  const [workOnAllOpen, setWorkOnAllOpen] = useState(false);
  const workOnAllRef = useRef<HTMLDivElement>(null);

  const unit = unitId ? getUnitById(unitId as HealthUnitId) : undefined;
  const caseStudyUnlocked = unit ? storage.isHealthCaseStudyUnlocked(unit.id, unit.topics.map((t) => t.id)) : false;

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
        <button type="button" onClick={() => navigate('/health-hub')} className="mt-4 text-sm font-medium" style={{ color: LAB_ACCENT }}>
          Back to Health Hub
        </button>
      </div>
    );
  }

  const base = `/health-hub/unit/${unit.id}`;
  const isLocked = (modeId: string) => modeId === 'case-study' && !caseStudyUnlocked;

  const handleWorkOnAll = (mode: (typeof WORK_ON_ALL_MODES)[number]) => {
    if (mode.id === 'care-values') navigate('/health-hub/care-values');
    else if (mode.path) navigate(`${base}/${mode.path}`);
  };

  const modesForUnit = WORK_ON_ALL_MODES.filter((m) => {
    if ('units' in m && m.units) return m.units.includes(unit.id);
    return m.id !== 'investigation' || ['2', '3'].includes(unit.id);
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{ background: LAB_HERO_GRADIENT, borderColor: 'transparent' }}
      >
        <button
          type="button"
          onClick={() => navigate('/health-hub')}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Health Hub
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Topic Map — Unit {unit.id}</h1>
        <p className="text-white/90 text-sm sm:text-base mb-4">
          {unit.title}. Browse by topic or jump straight into a past-paper-style test.
        </p>
      </motion.section>

      {/* Full unit test */}
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
                Quick Check per topic, then Case Study & Question Lab
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
                  Choose a learning mode – concept, glossary, quick check, case study, and more
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
              {modesForUnit.map((mode) => {
                const Icon = mode.icon;
                const locked = isLocked(mode.id);
                return (
                  <button
                    key={mode.id}
                    type="button"
                    disabled={locked}
                    onClick={() => {
                      if (!locked) {
                        handleWorkOnAll(mode);
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
            const progress = storage.getHealthTopicProgressByKey(unit.id, topic.id);
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
