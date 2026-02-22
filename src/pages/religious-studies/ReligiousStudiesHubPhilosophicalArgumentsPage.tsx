import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getPhilosophicalArgumentsForThemeC } from '../../config/religiousStudiesHubData';

import { LAB_LAB_ACCENT } from '../../config/hubTheme';

export function ReligiousStudiesHubPhilosophicalArgumentsPage() {
  const navigate = useNavigate();
  const selection = storage.getRSOptionSelection();
  const arguments_ = selection ? getPhilosophicalArgumentsForThemeC(selection) : [];
  const [index, setIndex] = useState(0);
  const [tab, setTab] = useState<'description' | 'strengths' | 'weaknesses'>('description');

  const arg = arguments_[index];

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/religious-studies-hub/option-select')} className="text-sm font-medium" style={{ color: LAB_ACCENT }}>Select options</button>
      </div>
    );
  }

  if (!selection.themes.includes('C')) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Philosophical arguments are part of Theme C. Add Theme C to your options to access this content.</p>
        <button type="button" onClick={() => navigate('/religious-studies-hub/option-select')} className="text-sm font-medium" style={{ color: LAB_ACCENT }}>Change options</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button type="button" onClick={() => navigate('/religious-studies-hub')} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
        <ChevronLeft size={18} /> Back to Religious Studies Hub
      </button>
      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Philosophical arguments (Theme C)</h1>

      {arguments_.length === 0 ? (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No philosophical arguments yet.</p>
      ) : arg ? (
        <div className="rounded-2xl border p-6" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}>
          <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>{index + 1} of {arguments_.length}</p>
          <h2 className="text-lg font-bold mb-4" style={{ color: 'rgb(var(--text))' }}>{arg.title}</h2>
          <div className="flex gap-2 mb-4">
            <button type="button" onClick={() => setTab('description')} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === 'description' ? 'text-white' : ''}`} style={tab === 'description' ? { background: LAB_ACCENT } : { borderColor: 'rgb(var(--border))', border: '1px solid' }}>Overview</button>
            <button type="button" onClick={() => setTab('strengths')} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === 'strengths' ? 'text-white' : ''}`} style={tab === 'strengths' ? { background: LAB_ACCENT } : { borderColor: 'rgb(var(--border))', border: '1px solid' }}>Strengths</button>
            <button type="button" onClick={() => setTab('weaknesses')} className={`px-4 py-2 rounded-lg text-sm font-medium ${tab === 'weaknesses' ? 'text-white' : ''}`} style={tab === 'weaknesses' ? { background: LAB_ACCENT } : { borderColor: 'rgb(var(--border))', border: '1px solid' }}>Weaknesses</button>
          </div>
          {tab === 'description' && (
            <div>
              <p className="text-sm mb-4" style={{ color: 'rgb(var(--text))' }}>{arg.description}</p>
              {arg.premises && (
                <ul className="list-disc list-inside text-sm space-y-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {arg.premises.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              )}
            </div>
          )}
          {tab === 'strengths' && (
            <ul className="list-disc list-inside text-sm space-y-1" style={{ color: 'rgb(var(--text-secondary))' }}>
              {arg.strengths.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          )}
          {tab === 'weaknesses' && (
            <ul className="list-disc list-inside text-sm space-y-1" style={{ color: 'rgb(var(--text-secondary))' }}>
              {arg.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          )}
          <div className="flex justify-between mt-6">
            <button type="button" onClick={() => setIndex((i) => (i === 0 ? arguments_.length - 1 : i - 1))} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronLeft size={20} /></button>
            <button type="button" onClick={() => setIndex((i) => (i === arguments_.length - 1 ? 0 : i + 1))} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronRight size={20} /></button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
