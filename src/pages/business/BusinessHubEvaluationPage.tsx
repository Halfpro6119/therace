import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { getUnitById, getEvaluationPromptsByUnit } from '../../config/businessHubData';
import { storage } from '../../utils/storage';
import type { BusinessUnitId } from '../../types/businessHub';

import { LAB_HERO_GRADIENT, LAB_ACCENT } from '../../config/hubTheme';

export function BusinessHubEvaluationPage() {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId: string }>();
  const [promptIndex, setPromptIndex] = useState(0);
  const [showModel, setShowModel] = useState(false);
  const [benefit, setBenefit] = useState('');
  const [drawback, setDrawback] = useState('');
  const [conclusion, setConclusion] = useState('');

  const unit = unitId ? getUnitById(unitId as BusinessUnitId) : undefined;
  const prompts = unit ? getEvaluationPromptsByUnit(unit.id) : [];
  const prompt = prompts[promptIndex];

  if (!unit) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p style={{ color: 'rgb(var(--text))' }}>Unit not found.</p>
        <button type="button" onClick={() => navigate('/business-hub')} className="mt-4 text-sm font-medium" style={{ color: 'rgb(var(--primary))' }}>Back to Business Hub</button>
      </div>
    );
  }

  const handleBack = () => navigate(`/business-hub/unit/${unit.id}/topics`);
  const handleNext = () => {
    setShowModel(false);
    setBenefit('');
    setDrawback('');
    setConclusion('');
    if (promptIndex < prompts.length - 1) setPromptIndex(promptIndex + 1);
    else {
      storage.markUnitEvaluationCompleted(unit.id, unit.topics.map((t) => t.id));
      navigate(`/business-hub/unit/${unit.id}/topics`);
    }
  };
  const handlePrev = () => {
    setShowModel(false);
    setBenefit('');
    setDrawback('');
    setConclusion('');
    if (promptIndex > 0) setPromptIndex(promptIndex - 1);
  };

  if (!prompt) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 sm:p-8 border shadow-sm"
          style={{ background: LAB_HERO_GRADIENT, borderColor: 'transparent' }}
        >
          <button type="button" onClick={handleBack} className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4">
            <ChevronLeft size={18} /> Back to Unit {unit.id}
          </button>
          <h1 className="text-2xl font-bold text-white mb-2">Evaluation Builder</h1>
          <p className="text-white/90 text-sm">Practise assess & evaluate questions</p>
        </motion.section>
        <div className="rounded-xl p-6 border text-center" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>No evaluation prompts for this unit yet. Try another unit or mode.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button type="button" onClick={() => navigate('/business-hub')} className="text-sm font-medium px-4 py-2 rounded-lg" style={{ background: `${LAB_ACCENT}20`, color: LAB_ACCENT }}>All units</button>
            <button type="button" onClick={handleBack} className="text-sm font-medium px-4 py-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}>Back to Unit {unit.id}</button>
          </div>
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
        style={{ background: LAB_HERO_GRADIENT, borderColor: 'transparent' }}
      >
        <button type="button" onClick={handleBack} className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4">
          <ChevronLeft size={18} /> Back to Unit {unit.id}
        </button>
        <h1 className="text-2xl font-bold text-white mb-2">Evaluation Builder</h1>
        <p className="text-white/90 text-sm">Practise assess & evaluate questions</p>
      </motion.section>

      <div className="rounded-xl p-6 border space-y-6" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>Prompt {promptIndex + 1} of {prompts.length}</p>
        <p className="text-lg font-medium" style={{ color: 'rgb(var(--text))' }}>{prompt.question}</p>
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          Plan your answer: one benefit, one drawback, then a conclusion.
        </p>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium mb-1 block" style={{ color: 'rgb(var(--text))' }}>One benefit</span>
            <textarea
              value={benefit}
              onChange={(e) => setBenefit(e.target.value)}
              placeholder="e.g. Lower set-up costs, full control..."
              rows={2}
              className="w-full px-3 py-2 rounded-lg border text-sm resize-y"
              style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium mb-1 block" style={{ color: 'rgb(var(--text))' }}>One drawback</span>
            <textarea
              value={drawback}
              onChange={(e) => setDrawback(e.target.value)}
              placeholder="e.g. Unlimited liability, harder to raise finance..."
              rows={2}
              className="w-full px-3 py-2 rounded-lg border text-sm resize-y"
              style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium mb-1 block" style={{ color: 'rgb(var(--text))' }}>Conclusion</span>
            <textarea
              value={conclusion}
              onChange={(e) => setConclusion(e.target.value)}
              placeholder="e.g. For a small start-up with low risk, sole trader may be suitable..."
              rows={2}
              className="w-full px-3 py-2 rounded-lg border text-sm resize-y"
              style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
            />
          </label>
        </div>

        {!showModel ? (
          <button
            type="button"
            onClick={() => setShowModel(true)}
            className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold text-white"
            style={{ background: LAB_ACCENT }}
          >
            <MessageSquare size={18} /> Show model answer
          </button>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg p-4 border space-y-4"
              style={{ background: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgb(var(--border))' }}
            >
              <p className="text-sm font-medium" style={{ color: 'rgb(var(--text))' }}>Model answer</p>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{prompt.modelAnswer}</p>
              {prompt.breakdown?.length > 0 && (
                <div>
                  <p className="text-xs font-medium mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>Breakdown (idea / application / evaluation)</p>
                  <ul className="space-y-1 text-sm">
                    {prompt.breakdown.map((b, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="font-medium shrink-0" style={{ color: 'rgb(var(--text))' }}>{b.type}:</span>
                        <span style={{ color: 'rgb(var(--text-secondary))' }}>{b.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={promptIndex === 0}
            className="flex items-center gap-1 px-4 py-2 rounded-lg border disabled:opacity-50"
            style={{ borderColor: 'rgb(var(--border))' }}
          >
            <ChevronLeft size={18} /> Previous
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-1 px-6 py-2 rounded-lg font-semibold text-white"
            style={{ background: LAB_ACCENT }}
          >
            {promptIndex < prompts.length - 1 ? 'Next prompt' : 'Back to Unit'}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
