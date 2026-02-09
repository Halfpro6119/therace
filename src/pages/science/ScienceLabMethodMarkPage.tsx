import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Target, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { getQuestionsByFilters } from '../../config/scienceLabData';
import type { ScienceSubject, SciencePaper, ScienceTier } from '../../types/scienceLab';

export function ScienceLabMethodMarkPage() {
  const navigate = useNavigate();
  const { subject, paper, tier } = useParams<{ subject: string; paper: string; tier: string }>();
  const [selectedMarks, setSelectedMarks] = useState<Set<string>>(new Set());
  const [showFeedback, setShowFeedback] = useState(false);

  const subjectId = subject?.toLowerCase() as ScienceSubject | undefined;
  const paperNum = paper ? parseInt(paper) as SciencePaper : 1;
  const tierValue = tier ? tier.charAt(0).toUpperCase() + tier.slice(1) as ScienceTier : 'Higher';

  if (!subjectId || !['biology', 'chemistry', 'physics'].includes(subject.toLowerCase())) {
    return <div>Invalid subject</div>;
  }

  const normalizedSubject: ScienceSubject = subjectId.charAt(0).toUpperCase() + subjectId.slice(1) as ScienceSubject;
  const questions = getQuestionsByFilters(normalizedSubject, paperNum, tierValue).filter(q => q.marks >= 4);

  const handleBack = () => {
    navigate(`/science-lab/${subject.toLowerCase()}`);
  };

  const toggleMark = (markId: string) => {
    const newSet = new Set(selectedMarks);
    if (newSet.has(markId)) {
      newSet.delete(markId);
    } else {
      newSet.add(markId);
    }
    setSelectedMarks(newSet);
  };

  // Sample method mark breakdown (in production, this would come from data)
  const sampleBreakdown = {
    ideaMarks: [
      { id: 'idea1', description: 'Identifies correct concept', marks: 1 },
      { id: 'idea2', description: 'Explains the relationship', marks: 1 },
    ],
    methodMarks: [
      { id: 'method1', description: 'Shows working/calculation', marks: 1 },
      { id: 'method2', description: 'Uses correct formula', marks: 1 },
    ],
    precisionMarks: [
      { id: 'precision1', description: 'Correct units', marks: 1 },
      { id: 'precision2', description: 'Appropriate significant figures', marks: 1 },
    ],
    commonPenalties: [
      'Missing units',
      'Incorrect formula application',
      'Vague explanation without reasoning',
    ],
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
          borderColor: 'transparent',
        }}
      >
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Lab Modes
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Method Mark Trainer</h1>
        <p className="text-white/90 text-sm sm:text-base">
          Train for 4–6 mark questions – idea marks, method marks, precision marks
        </p>
      </motion.section>

      <div className="rounded-xl p-6 border" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <h2 className="text-xl font-bold mb-6" style={{ color: 'rgb(var(--text))' }}>
          Mark Breakdown for 4–6 Mark Questions
        </h2>

        {/* Idea Marks */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
            <CheckCircle size={20} className="text-blue-600 dark:text-blue-400" />
            Idea Marks (Conceptual Understanding)
          </h3>
          <div className="space-y-2">
            {sampleBreakdown.ideaMarks.map((mark) => (
              <label
                key={mark.id}
                className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                style={{
                  background: selectedMarks.has(mark.id) ? 'rgb(var(--surface-2))' : 'transparent',
                  borderColor: 'rgb(var(--border))',
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedMarks.has(mark.id)}
                  onChange={() => toggleMark(mark.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: 'rgb(var(--text))' }}>
                    {mark.description}
                  </p>
                  <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {mark.marks} mark{mark.marks !== 1 ? 's' : ''}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Method Marks */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
            <Target size={20} className="text-purple-600 dark:text-purple-400" />
            Method Marks (Working/Process)
          </h3>
          <div className="space-y-2">
            {sampleBreakdown.methodMarks.map((mark) => (
              <label
                key={mark.id}
                className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                style={{
                  background: selectedMarks.has(mark.id) ? 'rgb(var(--surface-2))' : 'transparent',
                  borderColor: 'rgb(var(--border))',
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedMarks.has(mark.id)}
                  onChange={() => toggleMark(mark.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: 'rgb(var(--text))' }}>
                    {mark.description}
                  </p>
                  <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {mark.marks} mark{mark.marks !== 1 ? 's' : ''}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Precision Marks */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
            <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
            Precision Marks (Units, Terminology)
          </h3>
          <div className="space-y-2">
            {sampleBreakdown.precisionMarks.map((mark) => (
              <label
                key={mark.id}
                className="flex items-start gap-3 p-3 rounded-lg border cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                style={{
                  background: selectedMarks.has(mark.id) ? 'rgb(var(--surface-2))' : 'transparent',
                  borderColor: 'rgb(var(--border))',
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedMarks.has(mark.id)}
                  onChange={() => toggleMark(mark.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: 'rgb(var(--text))' }}>
                    {mark.description}
                  </p>
                  <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {mark.marks} mark{mark.marks !== 1 ? 's' : ''}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Common Penalties */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
            <AlertTriangle size={20} className="text-red-600 dark:text-red-400" />
            What Examiners Punish
          </h3>
          <div className="space-y-2">
            {sampleBreakdown.commonPenalties.map((penalty, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
              >
                <p className="text-sm" style={{ color: 'rgb(var(--text))' }}>
                  ⚠ {penalty}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t" style={{ borderColor: 'rgb(var(--border))' }}>
          <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
            Select the marks you think you would gain, then check against examiner expectations.
          </p>
          <button
            type="button"
            onClick={() => setShowFeedback(!showFeedback)}
            className="px-6 py-3 rounded-lg font-semibold text-white transition"
            style={{
              background: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
            }}
          >
            {showFeedback ? 'Hide Feedback' : 'Check Your Marks'}
          </button>
        </div>
      </div>
    </div>
  );
}
