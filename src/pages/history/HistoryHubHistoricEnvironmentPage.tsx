import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getHistoryOptionsForSelection, getHistoricEnvironmentSitesForOption } from '../../config/historyHubData';

const ACCENT = '#B45309';

export function HistoryHubHistoricEnvironmentPage() {
  const navigate = useNavigate();
  const selection = storage.getHistoryOptionSelection();
  const options = selection ? getHistoryOptionsForSelection(selection) : [];
  const britishOption = options.find((o) => o.section === 'britishDepth');
  const sites = britishOption ? getHistoricEnvironmentSitesForOption(britishOption.optionKey) : [];

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
        The historic environment question (Q4) is based on a specified site that AQA publishes three years in advance. Sites for 2026–2028 are included below. Check{' '}
        <a href="https://www.aqa.org.uk/subjects/history/gcse/history-8145" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: ACCENT }}>aqa.org.uk/history</a> for updates.
      </p>
      {sites.length > 0 ? (
        <div className="space-y-4">
          {sites.map((site) => (
            <div key={site.id} className="rounded-xl border p-4" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}>
              <h3 className="font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>{site.title}</h3>
              <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>{site.description}</p>
              {site.location && <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>Location: {site.location}</p>}
              {site.function && <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>Function: {site.function}</p>}
              {site.sampleEssayPrompt && (
                <p className="text-sm mt-2 font-medium" style={{ color: 'rgb(var(--text))' }}>Practice: {site.sampleEssayPrompt}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          Historic environment applies to British depth options. Select a British depth study to see sites.
        </p>
      )}
    </div>
  );
}
