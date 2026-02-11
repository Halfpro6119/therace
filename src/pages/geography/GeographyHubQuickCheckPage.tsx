import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getGeographySectionsForSelection, getQuickChecksForSections } from '../../config/geographyHubData';

const ACCENT = '#0D9488';

export function GeographyHubQuickCheckPage() {
  const navigate = useNavigate();
  const selection = storage.getGeographyOptionSelection();
  const sections = selection ? getGeographySectionsForSelection(selection) : [];
  const sectionIds = sections.map((s) => s.id);
  const allItems = getQuickChecksForSections(sectionIds);
  const [sectionFilter, setSectionFilter] = useState('');
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ correct: boolean; text: string } | null>(null);

  const items = sectionFilter ? allItems.filter((i) => i.sectionId === sectionFilter) : allItems;
  const item = items[index];

  const check = () => {
    if (!item) return;
    const correct = Array.isArray(item.correctAnswer)
      ? item.correctAnswer.some((a) => answer.trim().toLowerCase() === String(a).toLowerCase())
      : answer.trim().toLowerCase() === String(item.correctAnswer).toLowerCase();
    setFeedback({
      correct,
      text: correct ? (item.feedback?.correct ?? 'Correct!') : (item.feedback?.incorrect ?? 'Not quite.'),
    });
  };

  const next = () => {
    setAnswer('');
    setFeedback(null);
    setIndex((i) => (i >= items.length - 1 ? 0 : i + 1));
  };

  useEffect(() => {
    if (sectionIds.length > 0 && !sectionIds.includes(sectionFilter)) {
      setSectionFilter(sectionIds[0]);
      setIndex(0);
      setFeedback(null);
    }
  }, [sectionIds.join(','), sectionFilter]);

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/geography-hub/option-select')} className="text-sm font-medium" style={{ color: ACCENT }}>Select options</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button type="button" onClick={() => navigate('/geography-hub')} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
        <ChevronLeft size={18} /> Back to Geography Hub
      </button>
      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Quick check</h1>

      <select value={sectionFilter} onChange={(e) => { setSectionFilter(e.target.value); setIndex(0); setFeedback(null); }} className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}>
        {sections.map((s) => (
          <option key={s.id} value={s.id}>{s.title}</option>
        ))}
      </select>

      {items.length === 0 ? (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No quick check items for this section yet.</p>
      ) : item ? (
        <div className="rounded-2xl border p-6" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}>
          <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>{index + 1} of {items.length}</p>
          <p className="font-medium mb-4" style={{ color: 'rgb(var(--text))' }}>{item.question}</p>
          {item.type === 'multipleChoice' && item.options && (
            <div className="space-y-2">
              {item.options.map((opt) => (
                <button key={opt} type="button" onClick={() => setAnswer(opt)} className="w-full text-left rounded-lg border px-4 py-2 text-sm" style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}>{opt}</button>
              ))}
            </div>
          )}
          {(item.type === 'shortAnswer' || item.type === 'trueFalse') && (
            <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Your answer" className="w-full rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }} />
          )}
          {item.type === 'trueFalse' && (
            <div className="flex gap-2 mt-2">
              <button type="button" onClick={() => setAnswer('true')} className="px-4 py-2 rounded-lg border text-sm" style={{ borderColor: 'rgb(var(--border))' }}>True</button>
              <button type="button" onClick={() => setAnswer('false')} className="px-4 py-2 rounded-lg border text-sm" style={{ borderColor: 'rgb(var(--border))' }}>False</button>
            </div>
          )}
          {!feedback && <button type="button" onClick={check} className="mt-4 px-4 py-2 rounded-xl font-medium text-white" style={{ background: ACCENT }}>Check</button>}
          {feedback && (
            <div className="mt-4">
              <p className={feedback.correct ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}>{feedback.text}</p>
              <button type="button" onClick={next} className="mt-2 text-sm font-medium" style={{ color: ACCENT }}>Next</button>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
