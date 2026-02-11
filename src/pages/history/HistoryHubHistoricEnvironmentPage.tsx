import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getHistoryOptionsForSelection } from '../../config/historyHubData';

const ACCENT = '#B45309';

export function HistoryHubHistoricEnvironmentPage() {
  const navigate = useNavigate();
  const selection = storage.getHistoryOptionSelection();
  const options = selection ? getHistoryOptionsForSelection(selection) : [];
  const britishOption = options.find((o) => o.section === 'britishDepth');

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/history-hub/option-select')} className="text-sm font-medium" style={{ color: ACCENT }}>Select options</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button type="button" onClick={() => navigate('/history-hub')} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
        <ChevronLeft size={18} /> Back to History Hub
      </button>
      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Historic environment</h1>
      <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
        Your British depth study: <strong style={{ color: 'rgb(var(--text))' }}>{britishOption?.title ?? '—'}</strong>
      </p>
      <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
        The historic environment question (Q4) is based on a specified site that AQA publishes three years in advance. Check{' '}
        <a href="https://www.aqa.org.uk/subjects/history/gcse/history-8145" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: ACCENT }}>aqa.org.uk/history</a> for the current site.
      </p>
      <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
        Content for the current specified site will be added here. Use Question lab for essay practice linked to your depth study.
      </p>
    </div>
  );
}
