import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, GitBranch } from 'lucide-react';
import { getUnitById, getTraceTasksByUnit } from '../../config/computeLabData';
import { storage } from '../../utils/storage';
import type { ComputeUnitId } from '../../types/computeLab';

const HERO_GRADIENT = 'linear-gradient(135deg, #0891B2 0%, #0E7490 50%, #155E75 100%)';

export function ComputeLabAlgorithmLabPage() {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId: string }>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const unit = unitId ? getUnitById(unitId as ComputeUnitId) : undefined;
  const tasks = unit ? getTraceTasksByUnit(unit.id) : [];
  const current = tasks[currentIndex];

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

  const handleComplete = () => {
    if (!current) return;
    const topicIds = unit.topics.map((t) => t.id);
    topicIds.forEach((topicId) => {
      const existing = storage.getComputeTopicProgressByKey(unit.id, topicId);
      storage.updateComputeTopicProgress({
        unitId: unit.id,
        topicId,
        flashcardMasteryPercent: existing?.flashcardMasteryPercent ?? 0,
        quickCheckPassed: existing?.quickCheckPassed ?? false,
        algorithmLabCompleted: true,
        calculationLabCompleted: existing?.calculationLabCompleted ?? false,
        logicLabCompleted: existing?.logicLabCompleted ?? false,
        sqlLabCompleted: existing?.sqlLabCompleted ?? false,
        questionLabCompleted: existing?.questionLabCompleted ?? false,
        lastUpdated: new Date().toISOString(),
      });
    });
  };

  if (tasks.length === 0) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 sm:p-8 border shadow-sm"
          style={{ background: HERO_GRADIENT, borderColor: 'transparent' }}
        >
          <button type="button" onClick={() => navigate(`/compute-lab/unit/${unit.id}`)} className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4">
            <ChevronLeft size={18} /> Back to Unit {unit.id}
          </button>
          <h1 className="text-2xl font-bold text-white mb-2">Algorithm Lab</h1>
          <p className="text-white/90 text-sm">No trace table tasks for this unit yet.</p>
        </motion.section>
        <div className="rounded-xl p-6 border text-center" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <button type="button" onClick={() => navigate(`/compute-lab/unit/${unit.id}`)} className="text-sm font-medium px-4 py-2 rounded-lg bg-cyan-500/20 text-cyan-700 dark:text-cyan-400">
            Back to Unit {unit.id}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{ background: HERO_GRADIENT, borderColor: 'transparent' }}
      >
        <button type="button" onClick={() => navigate(`/compute-lab/unit/${unit.id}`)} className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4">
          <ChevronLeft size={18} /> Back to Unit {unit.id}
        </button>
        <h1 className="text-2xl font-bold text-white mb-2">Algorithm Lab</h1>
        <p className="text-white/90 text-sm mb-2">Task {currentIndex + 1} of {tasks.length}</p>
        <div className="h-2 rounded-full bg-white/30 overflow-hidden">
          <motion.div className="h-full bg-white rounded-full" initial={{ width: 0 }} animate={{ width: `${((currentIndex + 1) / tasks.length) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>
      </motion.section>

      <div className="rounded-xl p-6 border space-y-6" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>{current!.title}</h2>
        <div>
          <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>Input values:</p>
          <pre className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-mono overflow-x-auto" style={{ color: 'rgb(var(--text))' }}>
            {JSON.stringify(current!.inputValues, null, 2)}
          </pre>
        </div>
        <div>
          <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>Pseudo-code:</p>
          <pre className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-mono whitespace-pre-wrap" style={{ color: 'rgb(var(--text))' }}>
            {current!.pseudoCode}
          </pre>
        </div>
        <div>
          <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>Expected output:</p>
          <p className="font-mono" style={{ color: 'rgb(var(--text))' }}>{current!.expectedOutput}</p>
        </div>
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          Trace through the algorithm step by step. Create a trace table with columns: {current!.traceColumns.join(', ')}. Work out the final output.
        </p>
        <button
          type="button"
          onClick={handleComplete}
          className="px-6 py-2 rounded-lg font-semibold bg-cyan-500 text-white"
        >
          Mark as complete
        </button>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
          className="flex items-center gap-1 px-4 py-2 rounded-lg border disabled:opacity-50"
          style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
        >
          <ChevronLeft size={18} /> Previous
        </button>
        <button
          type="button"
          onClick={() => setCurrentIndex((i) => Math.min(tasks.length - 1, i + 1))}
          disabled={currentIndex === tasks.length - 1}
          className="flex items-center gap-1 px-4 py-2 rounded-lg border disabled:opacity-50"
          style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
        >
          Next <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
