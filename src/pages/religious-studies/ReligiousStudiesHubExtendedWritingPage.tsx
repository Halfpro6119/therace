import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getExtendedWritingForSelection } from '../../config/religiousStudiesHubData';

import { LAB_LAB_ACCENT } from '../../config/hubTheme';

export function ReligiousStudiesHubExtendedWritingPage() {
  const navigate = useNavigate();
  const selection = storage.getRSOptionSelection();
  const prompts = selection ? getExtendedWritingForSelection(selection) : [];
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [plan, setPlan] = useState('');
  const [showModel, setShowModel] = useState(false);

  const prompt = prompts[index];

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/religious-studies-hub/option-select')} className="text-sm font-medium" style={{ color: LAB_ACCENT }}>Select options</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button type="button" onClick={() => navigate('/religious-studies-hub')} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
        <ChevronLeft size={18} /> Back to Religious Studies Hub
      </button>
      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Extended writing (12 marks)</h1>

      {prompts.length === 0 ? (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No extended writing prompts for your selection yet.</p>
      ) : prompt ? (
        <div className="rounded-2xl border p-6" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}>
          <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>{index + 1} of {prompts.length} • 12 marks (+ up to 3 SPaG)</p>
          <p className="font-bold text-lg mb-2" style={{ color: 'rgb(var(--text))' }}>&quot;{prompt.statement}&quot;</p>
          <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>Evaluate this statement. In your answer you should refer to {prompt.religionsToRefer?.join(' and ') ?? 'religious and non-religious views'}.</p>
          {prompt.guidance && <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>{prompt.guidance}</p>}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>Plan (optional)</label>
            <textarea value={plan} onChange={(e) => setPlan(e.target.value)} placeholder="One view... Another view... Evaluation... Conclusion" rows={3} className="w-full rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }} />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>Your answer (aim for 200+ words)</label>
            <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Write your evaluation..." rows={8} className="w-full rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }} />
          </div>
          <p className="text-xs mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>Remember: SPaG marks (up to 3) are awarded for spelling, punctuation and grammar in 12-mark questions.</p>
          <button type="button" onClick={() => setShowModel(!showModel)} className="text-sm font-medium" style={{ color: LAB_ACCENT }}>{showModel ? 'Hide' : 'Show'} model answer</button>
          {showModel && prompt.modelAnswer && (
            <div className="mt-4 rounded-lg p-4" style={{ background: `${LAB_ACCENT}10`, borderLeft: `4px solid ${LAB_ACCENT}` }}>
              <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>Model answer</p>
              <p className="text-sm whitespace-pre-wrap" style={{ color: 'rgb(var(--text-secondary))' }}>{prompt.modelAnswer}</p>
            </div>
          )}
          <div className="flex justify-between mt-6">
            <button type="button" onClick={() => { setIndex((i) => (i === 0 ? prompts.length - 1 : i - 1)); setAnswer(''); setPlan(''); setShowModel(false); }} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronLeft size={20} /></button>
            <button type="button" onClick={() => { setIndex((i) => (i === prompts.length - 1 ? 0 : i + 1)); setAnswer(''); setPlan(''); setShowModel(false); }} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronRight size={20} /></button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
