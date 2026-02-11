import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown, ChevronRight } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getHistoryOptionsForSelection, getTimelineEventsForOption } from '../../config/historyHubData';
import { getHistoryOptionKey } from '../../types/historyHub';

const ACCENT = '#B45309';

export function HistoryHubTimelinePage() {
  const navigate = useNavigate();
  const selection = storage.getHistoryOptionSelection();
  const options = useMemo(() => selection ? getHistoryOptionsForSelection(selection) : [], [selection]);

  const [selectedOptionKey, setSelectedOptionKey] = useState<string>(options[0]?.optionKey ?? '');
  const [selectedPartId, setSelectedPartId] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const events = useMemo(() => {
    if (!selectedOptionKey) return [];
    return getTimelineEventsForOption(selectedOptionKey, selectedPartId || undefined);
  }, [selectedOptionKey, selectedPartId]);

  const currentOption = options.find((o) => o.optionKey === selectedOptionKey);
  const parts = currentOption?.parts ?? [];

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/history-hub/option-select')} className="text-sm font-medium" style={{ color: ACCENT }}>
          Select options
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button
        type="button"
        onClick={() => navigate('/history-hub')}
        className="flex items-center gap-2 text-sm font-medium"
        style={{ color: 'rgb(var(--text-secondary))' }}
      >
        <ChevronLeft size={18} />
        Back to History Hub
      </button>

      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>
        Timeline & narrative
      </h1>

      <div className="flex flex-wrap gap-2">
        <select
          value={selectedOptionKey}
          onChange={(e) => { setSelectedOptionKey(e.target.value); setSelectedPartId(''); }}
          className="rounded-lg border px-3 py-2 text-sm"
          style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
        >
          {options.map((opt) => (
            <option key={opt.optionKey} value={opt.optionKey}>{opt.title}</option>
          ))}
        </select>
        {parts.length > 0 && (
          <select
            value={selectedPartId}
            onChange={(e) => setSelectedPartId(e.target.value)}
            className="rounded-lg border px-3 py-2 text-sm"
            style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
          >
            <option value="">All parts</option>
            {parts.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        )}
      </div>

      <div className="space-y-3">
        {events.map((ev) => (
          <div
            key={ev.id}
            className="rounded-xl border overflow-hidden"
            style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}
          >
            <button
              type="button"
              onClick={() => setExpandedId(expandedId === ev.id ? null : ev.id)}
              className="w-full flex items-center gap-3 p-4 text-left"
            >
              <span className="font-mono text-sm font-bold shrink-0" style={{ color: ACCENT }}>{ev.date}</span>
              <span className="font-medium flex-1" style={{ color: 'rgb(var(--text))' }}>{ev.title}</span>
              {expandedId === ev.id ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
            {expandedId === ev.id && (
              <div className="px-4 pb-4 pt-0 text-sm border-t" style={{ color: 'rgb(var(--text-secondary))', borderColor: 'rgb(var(--border))' }}>
                {ev.description}
              </div>
            )}
          </div>
        ))}
      </div>
      {events.length === 0 && (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          No timeline events for this option yet. More content is being added.
        </p>
      )}
    </div>
  );
}
