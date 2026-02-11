import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getShortAnswersForSelection } from '../../config/religiousStudiesHubData';

const ACCENT = '#7C3AED';

export function ReligiousStudiesHubShortAnswerPage() {
  const navigate = useNavigate();
  const selection = storage.getRSOptionSelection();
  const items = selection ? getShortAnswersForSelection(selection) : [];
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [showModel, setShowModel] = useState(false);

  const item = items[index];

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/religious-studies-hub/option-select')} className="text-sm font-medium" style={{ color: ACCENT }}>Select options</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button type="button" onClick={() => navigate('/religious-studies-hub')} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
        <ChevronLeft size={18} /> Back to Religious Studies Hub
      </button>
      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Short answer lab (1, 2, 4, 5 marks)</h1>

      {items.length === 0 ? (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No short answer questions for your selection yet.</p>
      ) : item ? (
        <div className="rounded-2xl border p-6" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}>
          <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>{index + 1} of {items.length} • {item.marks} mark{item.marks > 1 ? 's' : ''}</p>
          <p className="font-medium mb-4" style={{ color: 'rgb(var(--text))' }}>{item.question}</p>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your answer..."
            rows={4}
            className="w-full rounded-lg border px-3 py-2 text-sm"
            style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
          />
          <button type="button" onClick={() => setShowModel(!showModel)} className="mt-4 text-sm font-medium" style={{ color: ACCENT }}>{showModel ? 'Hide' : 'Show'} model answer</button>
          {showModel && (
            <div className="mt-4 rounded-lg p-4" style={{ background: `${ACCENT}10`, borderLeft: `4px solid ${ACCENT}` }}>
              <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>Model answer</p>
              <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>{item.modelAnswer}</p>
              {item.markScheme && <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>Mark scheme: {item.markScheme}</p>}
            </div>
          )}
          <div className="flex justify-between mt-6">
            <button type="button" onClick={() => { setIndex((i) => (i === 0 ? items.length - 1 : i - 1)); setAnswer(''); setShowModel(false); }} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronLeft size={20} /></button>
            <button type="button" onClick={() => { setIndex((i) => (i === items.length - 1 ? 0 : i + 1)); setAnswer(''); setShowModel(false); }} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronRight size={20} /></button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
