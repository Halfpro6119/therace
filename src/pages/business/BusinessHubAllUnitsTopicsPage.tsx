/**
 * Business Hub – Work on All Units
 * Topic map across every unit. Full subject test, Work on All modes, Browse by Topic.
 */
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
} from 'lucide-react';
import { getUnitsByPaper } from '../../config/businessHubData';
import { storage } from '../../utils/storage';
import { LAB_HERO_GRADIENT, LAB_ACCENT } from '../../config/hubTheme';
import type { BusinessPaper, BusinessUnitId } from '../../types/businessHub';

const ALL_UNITS_MODES = [
  { id: 'concept', title: 'Concept Lab', description: 'Core ideas, misconceptions & change scenarios', icon: Lightbulb, color: '#0EA5E9', path: 'concept' },
  { id: 'flashcard', title: 'Glossary / Flashcards', description: 'Learn key terms from every unit', icon: BookOpen, color: '#0EA5E9', path: 'flashcard' },
  { id: 'quick-check', title: 'Quick Check', description: 'Micro-assessments across all units', icon: Target, color: '#F59E0B', path: 'quick-check' },
];

export function BusinessHubAllUnitsTopicsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const paperParam = searchParams.get('paper') || 'all';
  const paperFromUrl: BusinessPaper | 'all' = paperParam === '1' ? 1 : paperParam === '2' ? 2 : 'all';
  const [paperFilter, setPaperFilter] = useState<BusinessPaper | 'all'>(paperFromUrl);

  const handlePaperChange = (p: BusinessPaper | 'all') => {
    setPaperFilter(p);
    setSearchParams(p !== 'all' ? { paper: String(p) } : {});
  };
  const [workOnAllOpen, setWorkOnAllOpen] = useState(false);
  const workOnAllRef = useRef<HTMLDivElement>(null);

  const units = getUnitsByPaper(paperFilter);
  const totalTopics = units.reduce((acc, u) => acc + u.topics.length, 0);

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

  const base = '/business-hub/all-units';
  const paperQuery = paperFilter !== 'all' ? `?paper=${paperFilter}` : '';

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
          onClick={() => navigate('/business-hub')}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Business Hub
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Topic Map — All Units</h1>
        <p className="text-white/90 text-sm sm:text-base mb-4">
          Work across every unit. Full subject test, flashcards, quick checks, or browse by topic.
        </p>
        <div className="flex flex-wrap items-center gap-4" onClick={(e) => e.stopPropagation()}>
          <div>
            <label className="block text-xs font-medium text-white/80 mb-1.5">Paper</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handlePaperChange('all')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  paperFilter === 'all' ? 'bg-white text-gray-800' : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => handlePaperChange(1)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  paperFilter === 1 ? 'bg-white text-gray-800' : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Paper 1
              </button>
              <button
                type="button"
                onClick={() => handlePaperChange(2)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  paperFilter === 2 ? 'bg-white text-gray-800' : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Paper 2
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Full subject test */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
      >
        <button
          type="button"
          onClick={() => navigate(`${base}/quick-check${paperQuery}`)}
          className="w-full rounded-xl p-6 text-left border shadow-sm hover:shadow-md transition-all flex items-center justify-between"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500">
              <FileQuestion size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold mb-1" style={{ color: 'rgb(var(--text))' }}>
                Full subject test
              </h2>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                Quick Check across all {totalTopics} topics
              </p>
            </div>
          </div>
          <ChevronRight size={24} style={{ color: 'rgb(var(--text-secondary))' }} />
        </button>
      </motion.section>

      {/* Work on All Topics – dropdown */}
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
                  Concept Lab, Glossary, Quick Check across every unit
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
              {ALL_UNITS_MODES.map((mode) => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => {
                      navigate(`${base}/${mode.path}${paperQuery}`);
                      setWorkOnAllOpen(false);
                    }}
                    className="w-full px-5 py-4 flex items-center gap-4 text-left transition hover:bg-black/5 dark:hover:bg-white/5"
                    style={{ color: 'rgb(var(--text))' }}
                  >
                    <div className="p-2.5 rounded-lg flex-shrink-0" style={{ background: `${mode.color}20` }}>
                      <Icon size={20} style={{ color: mode.color }} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-sm">{mode.title}</p>
                      <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
                        {mode.description}
                      </p>
                    </div>
                    <ChevronRight size={18} className="flex-shrink-0 opacity-50" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </motion.section>

      {/* Browse by Topic – grouped by unit */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
          <BookOpen size={20} style={{ color: '#0EA5E9' }} />
          Browse by Unit
        </h2>
        <div className="space-y-6">
          {units.map((unit, unitIndex) => (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + unitIndex * 0.03 }}
            >
              <h3 className="text-base font-bold mb-3 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
                Unit {unit.id} – {unit.shortTitle}
              </h3>
              <div className="space-y-3">
                {unit.topics.map((topic, topicIndex) => {
                  const progress = storage.getBusinessTopicProgressByKey(unit.id as BusinessUnitId, topic.id);
                  const flashcardPct = progress?.flashcardMasteryPercent ?? 0;
                  const quickCheckPassed = progress?.quickCheckPassed ?? false;
                  const unitBase = `/business-hub/unit/${unit.id}`;
                  return (
                    <motion.div
                      key={topic.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18 + unitIndex * 0.03 + topicIndex * 0.02 }}
                      className="rounded-xl p-5 border shadow-sm"
                      style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-base font-bold mb-1" style={{ color: 'rgb(var(--text))' }}>
                            {topic.specRef} {topic.title}
                          </h4>
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
                            onClick={() => navigate(`${unitBase}/concept`)}
                            className="px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition hover:opacity-90 border"
                            style={{
                              background: 'rgb(var(--surface-2))',
                              borderColor: 'rgb(var(--border))',
                              color: 'rgb(var(--text))',
                            }}
                          >
                            <Lightbulb size={14} />
                            Learn
                          </button>
                          <button
                            type="button"
                            onClick={() => navigate(`${unitBase}/flashcard`)}
                            className="px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition hover:opacity-90 border"
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
                            onClick={() => navigate(`${unitBase}/quick-check`)}
                            className="px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition hover:opacity-90"
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
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
