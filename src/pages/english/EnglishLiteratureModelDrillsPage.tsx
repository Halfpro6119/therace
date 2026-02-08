import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Lightbulb, Quote, FileEdit, ArrowUp, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getLiteratureTaskById } from '../../config/goldenEnglishQuestionBank';
import {
  getModelDrillsByTask,
  hasModelDrills,
  getQuotationLabSourceForTask,
} from '../../config/literatureModelDrillsData';
import { storage } from '../../utils/storage';
import type {
  ModelDrillItem,
  ModelDrillQuoteExtraction,
  ModelDrillParagraphSkeleton,
  ModelDrillGradeUpgrade,
  ModelDrillAOMapping,
} from '../../types/englishCampus';

function isQuoteExtraction(d: ModelDrillItem): d is ModelDrillQuoteExtraction {
  return d.type === 'quoteExtraction';
}
function isParagraphSkeleton(d: ModelDrillItem): d is ModelDrillParagraphSkeleton {
  return d.type === 'paragraphSkeleton';
}
function isGradeUpgrade(d: ModelDrillItem): d is ModelDrillGradeUpgrade {
  return d.type === 'gradeUpgrade';
}
function isAOMapping(d: ModelDrillItem): d is ModelDrillAOMapping {
  return d.type === 'aoMapping';
}

const DRILL_TYPE_LABELS: Record<ModelDrillItem['type'], string> = {
  quoteExtraction: 'Quote extraction',
  paragraphSkeleton: 'Paragraph skeleton',
  gradeUpgrade: 'Grade upgrade',
  aoMapping: 'AO mapping',
};

const DRILL_TYPE_ICONS: Record<ModelDrillItem['type'], typeof Quote> = {
  quoteExtraction: Quote,
  paragraphSkeleton: FileEdit,
  gradeUpgrade: ArrowUp,
  aoMapping: BookOpen,
};

export function EnglishLiteratureModelDrillsPage() {
  const navigate = useNavigate();
  const { taskId } = useParams<{ taskId: string }>();
  const task = taskId ? getLiteratureTaskById(taskId) : null;
  const drills = taskId ? getModelDrillsByTask(taskId) : [];
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answer, setAnswer] = useState('');
  const [aoLabels, setAoLabels] = useState<Record<number, 'AO1' | 'AO2' | 'AO3' | null>>({});

  const drill = drills[index];
  const completions = taskId ? storage.getModelDrillCompletions(taskId) : {};
  const completedCount = Object.values(completions).filter(Boolean).length;
  const quotationLabSource = taskId ? getQuotationLabSourceForTask(taskId) : null;
  const total = drills.length;

  if (!taskId || !task) {
    return (
      <div className="max-w-3xl mx-auto py-8">
        <p className="text-center" style={{ color: 'rgb(var(--text-secondary))' }}>Task not found.</p>
        <button type="button" onClick={() => navigate('/english-campus/literature')} className="mt-4 mx-auto block btn-primary">
          Back to Literature
        </button>
      </div>
    );
  }

  if (!hasModelDrills(taskId)) {
    return (
      <div className="max-w-3xl mx-auto py-8 space-y-4">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => navigate(`/english-campus/literature/task/${taskId}`)} className="p-2 rounded-lg hover:bg-black/5">
            <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
          </button>
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Drills from this model</h1>
            <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{task.title}</p>
          </div>
        </div>
        <div className="rounded-xl border p-6 text-center" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            No model-derived drills for this task yet. Study the Grade 8/9 model answers, then return to write.
          </p>
          <button
            type="button"
            onClick={() => navigate(`/english-campus/literature/task/${taskId}`)}
            className="mt-4 btn-primary"
          >
            Back to workspace
          </button>
        </div>
      </div>
    );
  }

  const resetState = () => {
    setShowAnswer(false);
    setAnswer('');
    setAoLabels({});
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate(`/english-campus/literature/task/${taskId}`)}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Back"
        >
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            Drills from this model
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            {task.title} · Study → Drill → Write
          </p>
        </div>
      </div>

      <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
        These drills are pulled from the Grade 8/9 model answers. Complete them, then return to the workspace to write your own paragraph.
      </p>

      {/* Model-anchored progress signal */}
      {completedCount > 0 && (
        <div className="rounded-xl border p-3" style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' }}>
          <p className="text-sm font-medium" style={{ color: 'rgb(var(--text))' }}>
            You can now replicate {Math.round((completedCount / total) * 100)}% of Grade 9 patterns from this model
          </p>
          <p className="text-xs mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>
            {completedCount} of {total} drills completed
          </p>
        </div>
      )}

      {quotationLabSource && (
        <p className="text-xs" style={{ color: 'rgb(var(--muted))' }}>
          Also practise quotes for this text in{' '}
          <button
            type="button"
            onClick={() => navigate(`/english-campus/literature/quotation-lab/quote-lab/${quotationLabSource}`)}
            className="underline"
            style={{ color: 'rgb(var(--accent))' }}
          >
            Quotation Lab — {quotationLabSource}
          </button>
        </p>
      )}

      <AnimatePresence mode="wait">
        {drill && (
          <motion.div
            key={drill.id}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            className="rounded-xl border p-5 space-y-4"
            style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
          >
            <div className="flex items-center gap-2">
              {(() => {
                const Icon = DRILL_TYPE_ICONS[drill.type];
                return <Icon size={20} style={{ color: '#8B5CF6' }} />;
              })()}
              <span className="font-medium text-sm" style={{ color: 'rgb(var(--muted))' }}>
                {DRILL_TYPE_LABELS[drill.type]} · Grade {drill.grade}
              </span>
            </div>

            {/* Quote Extraction */}
            {isQuoteExtraction(drill) && (
              <>
                <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>{drill.prompt}</p>
                <div className="rounded-lg border p-4 text-sm" style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))' }}>
                  <p style={{ color: 'rgb(var(--text-secondary))' }}>{drill.paragraphText}</p>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>Your shortest quote</label>
                  <input
                    type="text"
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    placeholder='e.g. "king of kings"'
                    className="w-full rounded-lg border p-3 text-sm"
                    style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                  />
                </div>
                {showAnswer && (
                  <div className="rounded-lg p-3 flex items-start gap-2" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                    <Lightbulb size={18} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm" style={{ color: 'rgb(var(--text))' }}>Best: "{drill.bestQuote}"</p>
                      <p className="text-sm mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>{drill.whyBest}</p>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Paragraph Skeleton */}
            {isParagraphSkeleton(drill) && (
              <>
                <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>Fill in the blanks to rebuild the Grade {drill.grade} paragraph.</p>
                <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{drill.skeleton}</p>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>Your completed paragraph</label>
                  <textarea
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    placeholder="Fill in the blanks..."
                    rows={4}
                    className="w-full rounded-lg border p-3 text-sm resize-none"
                    style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                  />
                </div>
                {showAnswer && (
                  <div className="rounded-lg border p-3 text-sm" style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))' }}>
                    <p className="font-medium mb-1" style={{ color: 'rgb(var(--text))' }}>Model paragraph:</p>
                    <p style={{ color: 'rgb(var(--text-secondary))' }}>{drill.fullParagraph}</p>
                  </div>
                )}
              </>
            )}

            {/* Grade Upgrade */}
            {isGradeUpgrade(drill) && (
              <>
                <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>
                  Upgrade this Grade {drill.fromGrade} paragraph so it would be marked in the top band.
                </p>
                <div className="rounded-lg border p-4 text-sm" style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))' }}>
                  <p className="italic" style={{ color: 'rgb(var(--text-secondary))' }}>{drill.weakParagraph}</p>
                </div>
                <div className="rounded-lg p-3" style={{ background: 'rgba(245, 158, 11, 0.1)' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: 'rgb(var(--text))' }}>Rubric — add:</p>
                  <ul className="text-sm space-y-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {drill.rubric.map((r, i) => (
                      <li key={i}>• {r}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>Your upgraded paragraph</label>
                  <textarea
                    value={answer}
                    onChange={e => setAnswer(e.target.value)}
                    placeholder="Add conceptual shift, judgement, context..."
                    rows={5}
                    className="w-full rounded-lg border p-3 text-sm resize-none"
                    style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                  />
                </div>
                {showAnswer && (
                  <div className="rounded-lg border p-3 text-sm" style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: '#10B981' }}>
                    <p className="font-medium mb-1" style={{ color: 'rgb(var(--text))' }}>Grade 9 model:</p>
                    <p style={{ color: 'rgb(var(--text-secondary))' }}>{drill.targetParagraph}</p>
                  </div>
                )}
              </>
            )}

            {/* AO Mapping */}
            {isAOMapping(drill) && (
              <>
                <p className="font-medium" style={{ color: 'rgb(var(--text))' }}>Label each sentence AO1 / AO2 / AO3. Which AO is weakest?</p>
                <div className="space-y-2">
                  {drill.sentences.map((s, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-lg border p-3" style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))' }}>
                      <p className="flex-1 text-sm" style={{ color: 'rgb(var(--text))' }}>{s}</p>
                      <div className="flex gap-1">
                        {(['AO1', 'AO2', 'AO3'] as const).map(ao => (
                          <button
                            key={ao}
                            type="button"
                            onClick={() => setAoLabels(prev => ({ ...prev, [i]: aoLabels[i] === ao ? null : ao }))}
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              aoLabels[i] === ao ? 'ring-1' : ''
                            }`}
                            style={{
                              background: aoLabels[i] === ao ? 'rgba(var(--accent), 0.2)' : 'rgb(var(--surface))',
                              color: 'rgb(var(--text))',
                            }}
                          >
                            {ao}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {showAnswer && (
                  <div className="rounded-lg p-3 flex items-start gap-2" style={{ background: 'rgba(16, 185, 129, 0.1)' }}>
                    <Lightbulb size={18} style={{ color: '#10B981' }} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm" style={{ color: 'rgb(var(--text))' }}>
                        Correct: {drill.sentences.map((_, i) => drill.correctAO[i]).join(' / ')}
                      </p>
                      <p className="text-sm mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                        Weakest: {drill.weakestAO} — {drill.whyWeakest}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}

            {!showAnswer ? (
              <button
                type="button"
                onClick={() => {
                  setShowAnswer(true);
                  if (drill && taskId) storage.setModelDrillCompleted(taskId, drill.id);
                }}
                className="flex items-center gap-2 text-sm font-medium"
                style={{ color: 'rgb(var(--accent))' }}
              >
                <Lightbulb size={16} />
                Show answer / model
              </button>
            ) : drill && taskId && (
              <p className="text-xs" style={{ color: 'rgb(var(--muted))' }}>
                ✓ Marked complete — you can now replicate this pattern
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => { setIndex(i => Math.max(0, i - 1)); resetState(); }}
          disabled={index === 0}
          className="flex items-center gap-1 text-sm font-medium disabled:opacity-50"
          style={{ color: 'rgb(var(--text))' }}
        >
          <ChevronLeft size={18} /> Previous
        </button>
        <span className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{index + 1} / {total}</span>
        <button
          type="button"
          onClick={() => { setIndex(i => Math.min(total - 1, i + 1)); resetState(); }}
          disabled={index === total - 1}
          className="flex items-center gap-1 text-sm font-medium disabled:opacity-50"
          style={{ color: 'rgb(var(--text))' }}
        >
          Next <ChevronRight size={18} />
        </button>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          type="button"
          onClick={() => navigate(`/english-campus/literature/task/${taskId}`)}
          className="btn-primary"
        >
          Back to workspace — write your paragraph
        </button>
      </div>
    </div>
  );
}
