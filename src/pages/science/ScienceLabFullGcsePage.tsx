/**
 * Full GCSE Test — Paper-by-paper mastery flow
 * Shows list of papers with locked/available/passed states.
 * User must pass each paper (70% threshold) to unlock the next.
 */
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ChevronLeft,
  GraduationCap,
  Lock,
  CheckCircle,
  ArrowRight,
  Trophy,
  FileQuestion,
} from 'lucide-react';
import { getGcseScopeForSubject } from '../../config/gcseScope';
import { getFullGcsePaperTestItems } from '../../config/scienceLabFlashcards';
import { storage } from '../../utils/storage';
import type { ScienceSubject, SciencePaper, ScienceTier } from '../../types/scienceLab';

const PAPERS: SciencePaper[] = [1, 2];

export function ScienceLabFullGcsePage() {
  const navigate = useNavigate();
  const { subject, paper, tier } = useParams<{ subject: string; paper: string; tier: string }>();

  const subjectId = subject?.toLowerCase() as ScienceSubject | undefined;
  const paperNum = paper ? (parseInt(paper) as SciencePaper) : 1;
  const tierValue = tier ? (tier.charAt(0).toUpperCase() + tier.slice(1) as ScienceTier) : 'Higher';

  if (!subjectId || !['biology', 'chemistry', 'physics'].includes(subject.toLowerCase())) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p>Invalid subject. Please select Biology, Chemistry, or Physics.</p>
        <button type="button" onClick={() => navigate('/science-lab')}>
          Go Back
        </button>
      </div>
    );
  }

  const normalizedSubject: ScienceSubject = subjectId.charAt(0).toUpperCase() + subjectId.slice(1) as ScienceSubject;
  const base = `/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}`;

  const scope = getGcseScopeForSubject(normalizedSubject);
  const paperDefs = scope?.papers ?? PAPERS.map((p) => ({ paperNumber: p, name: `Paper ${p}` }));

  const progress = storage.getSubjectFullGcseProgress(normalizedSubject, tierValue, PAPERS);

  const getPaperStatus = (p: SciencePaper) => {
    const passed = storage.isPaperPassed(normalizedSubject, p, tierValue);
    const prevPapers = PAPERS.filter((n) => n < p);
    const prevAllPassed = prevPapers.every((prev) => storage.isPaperPassed(normalizedSubject, prev, tierValue));
    const available = p === 1 || prevAllPassed;
    const items = getFullGcsePaperTestItems(normalizedSubject, p, tierValue);
    const totalMarks = items.reduce((s, i) => s + (i.type === 'question' ? (i.data.marks ?? 1) : 1), 0);
    return { passed, available, totalMarks, paperName: paperDefs.find((d) => d.paperNumber === p)?.name ?? `Paper ${p}` };
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)',
          borderColor: 'transparent',
        }}
      >
        <button
          type="button"
          onClick={() => navigate(base)}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Lab Modes
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <GraduationCap size={32} />
          Full GCSE Test — {normalizedSubject}
        </h1>
        <p className="text-white/90 text-sm sm:text-base mb-4">
          Pass each paper (70% of marks) to unlock the next. Master all papers to achieve subject mastery.
        </p>
        {/* Progress indicator: Paper 1 ✓ | Paper 2 (current) | Paper 3 🔒 */}
        <div className="flex items-center gap-2 flex-wrap mt-4">
          {PAPERS.map((p, i) => {
            const { passed, available } = getPaperStatus(p);
            const isCurrent = available && !passed;
            return (
              <span key={p} className="flex items-center gap-1.5 text-sm text-white/90">
                {i > 0 && <span className="text-white/50">|</span>}
                <span>Paper {p}</span>
                {passed ? <CheckCircle size={16} className="text-emerald-200" /> : isCurrent ? <span className="text-amber-200">(current)</span> : <Lock size={14} className="text-white/60" />}
              </span>
            );
          })}
        </div>
        {progress.allPassed && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="flex items-center gap-3 p-4 rounded-xl bg-white/25 text-white mt-4 border border-white/30 shadow-lg"
          >
            <Trophy size={32} className="flex-shrink-0 text-amber-200" />
            <div>
              <p className="font-bold text-lg">Subject mastery achieved!</p>
              <p className="text-sm text-white/90">All papers passed. You&apos;ve shown clear understanding of {normalizedSubject}.</p>
            </div>
          </motion.div>
        )}
      </motion.section>

      {/* Paper list */}
      <div className="space-y-4">
        {PAPERS.map((p, idx) => {
          const { passed, available, totalMarks, paperName } = getPaperStatus(p);
          const estMinutes = Math.ceil(totalMarks);

          return (
            <motion.div
              key={p}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="rounded-xl border overflow-hidden"
              style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
            >
              <button
                type="button"
                onClick={() => available && navigate(`${base}/full-gcse/test/${p}`)}
                disabled={!available}
                className={`w-full p-6 text-left flex items-center justify-between gap-4 transition ${
                  available ? 'hover:shadow-md cursor-pointer' : 'cursor-not-allowed opacity-75'
                }`}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${
                      passed
                        ? 'bg-green-500/20 text-green-600 dark:text-green-400'
                        : available
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500'
                    }`}
                  >
                    {passed ? (
                      <CheckCircle size={28} />
                    ) : available ? (
                      <FileQuestion size={28} />
                    ) : (
                      <Lock size={28} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
                      {paperName}
                    </h2>
                    <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {totalMarks} marks • ~{estMinutes} min • {passed ? 'Passed ✓' : available ? 'Start test' : 'Complete previous paper first'}
                    </p>
                  </div>
                </div>
                {available && (
                  <ArrowRight size={24} style={{ color: 'rgb(var(--text-secondary))' }} className="flex-shrink-0" />
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      <p className="text-sm text-center" style={{ color: 'rgb(var(--text-secondary))' }}>
        Each paper is a mini GCSE exam: Section A (recall) → Section B (3 mark) → Section C (4–6 mark extended).
      </p>
    </div>
  );
}
