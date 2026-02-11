import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Lightbulb, BookOpen, Target, GitBranch, Calculator, CircleDot, Database, FileQuestion } from 'lucide-react';
import { getUnitById } from '../../config/computeLabData';
import { storage } from '../../utils/storage';
import type { ComputeUnitId } from '../../types/computeLab';

const MODE_ICONS = { concept: Lightbulb, flashcard: BookOpen, 'quick-check': Target, 'algorithm-lab': GitBranch, 'calculation-lab': Calculator, 'logic-lab': CircleDot, 'sql-lab': Database, 'question-lab': FileQuestion };

export function ComputeLabTopicsPage() {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId: string }>();
  const unit = unitId ? getUnitById(unitId as ComputeUnitId) : undefined;

  if (!unit) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p style={{ color: 'rgb(var(--text))' }}>Unit not found.</p>
        <button type="button" onClick={() => navigate('/compute-lab')} className="mt-4 text-sm font-medium" style={{ color: 'rgb(var(--primary))' }}>
          Back to Compute Lab
        </button>
      </div>
    );
  }

  const algorithmLabUnlocked = storage.isComputeAlgorithmLabUnlocked(unit.id, unit.topics.map((t) => t.id));

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 border shadow-sm"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <button
          type="button"
          onClick={() => navigate(`/compute-lab/unit/${unit.id}`)}
          className="flex items-center gap-2 text-sm font-medium mb-4"
          style={{ color: 'rgb(var(--text-secondary))' }}
        >
          <ChevronLeft size={18} />
          Back to Unit {unit.id}
        </button>
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
          Unit {unit.id} – {unit.title}
        </h1>
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          {unit.topics.length} topics. Access modes below.
        </p>
      </motion.section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>Topics & modes</h2>
        <div className="space-y-4">
          {unit.topics.map((topic) => {
            const progress = storage.getComputeTopicProgressByKey(unit.id, topic.id);
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl p-4 border"
                style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
              >
                <h3 className="font-bold mb-3" style={{ color: 'rgb(var(--text))' }}>
                  {topic.specRef} {topic.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(['concept', 'flashcard', 'quick-check'] as const).map((mode) => {
                    const Icon = MODE_ICONS[mode];
                    return (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => navigate(`/compute-lab/unit/${unit.id}/${mode}`)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition hover:bg-cyan-500/10"
                        style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                      >
                        <Icon size={16} className="text-cyan-500" />
                        {mode === 'concept' ? 'Concept' : mode === 'flashcard' ? 'Flashcard' : 'Quick Check'}
                      </button>
                    );
                  })}
                  {algorithmLabUnlocked && ['3.1', '3.2'].includes(unit.id) && (
                    <button
                      type="button"
                      onClick={() => navigate(`/compute-lab/unit/${unit.id}/algorithm-lab`)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition hover:bg-cyan-500/10"
                      style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                    >
                      <GitBranch size={16} className="text-cyan-500" />
                      Algorithm
                    </button>
                  )}
                  {['3.3'].includes(unit.id) && (
                    <button
                      type="button"
                      onClick={() => navigate(`/compute-lab/unit/${unit.id}/calculation-lab`)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition hover:bg-cyan-500/10"
                      style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                    >
                      <Calculator size={16} className="text-cyan-500" />
                      Calculation
                    </button>
                  )}
                  {['3.4'].includes(unit.id) && (
                    <button
                      type="button"
                      onClick={() => navigate(`/compute-lab/unit/${unit.id}/logic-lab`)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition hover:bg-cyan-500/10"
                      style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                    >
                      <CircleDot size={16} className="text-cyan-500" />
                      Logic
                    </button>
                  )}
                  {['3.7'].includes(unit.id) && (
                    <button
                      type="button"
                      onClick={() => navigate(`/compute-lab/unit/${unit.id}/sql-lab`)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition hover:bg-cyan-500/10"
                      style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                    >
                      <Database size={16} className="text-cyan-500" />
                      SQL
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => navigate(`/compute-lab/unit/${unit.id}/question-lab`)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium border transition hover:bg-cyan-500/10"
                    style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                  >
                    <FileQuestion size={16} className="text-cyan-500" />
                    Questions
                  </button>
                </div>
                {progress && (progress.quickCheckPassed || progress.flashcardMasteryPercent > 0) && (
                  <p className="mt-2 text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
                    Quick Check: {progress.quickCheckPassed ? '✓' : '—'} | Flashcard: {progress.flashcardMasteryPercent}%
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
