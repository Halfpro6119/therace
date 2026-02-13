import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getPsychologyTopicsForSelection, getFlashcardItemsForTopic } from '../../config/psychologyHubData';
import type { PsychologyKeyStudy, PsychologyKeyTerm, PsychologyConfidenceLevel } from '../../types/psychologyHub';

const ACCENT = '#9333EA';

export function PsychologyHubKeyStudiesPage() {
  const navigate = useNavigate();
  const topics = getPsychologyTopicsForSelection();
  const [topicId, setTopicId] = useState(topics[0]?.id ?? '');
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const items = getFlashcardItemsForTopic(topicId);
  const current = items[index];

  useEffect(() => {
    setFlipped(false);
  }, [index, topicId]);

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/psychology-hub/option-select')} className="text-sm font-medium" style={{ color: ACCENT }}>Select options</button>
      </div>
    );
  }

  const handleConfidence = (level: PsychologyConfidenceLevel) => {
    if (current) {
      const itemId = current.type === 'study' ? (current.item as PsychologyKeyStudy).id : (current.item as PsychologyKeyTerm).id;
      storage.updatePsychologyFlashcardMastery(itemId, topicId, current.type, level);
    }
    if (index < items.length - 1) setIndex(index + 1);
    else setIndex(0);
    setFlipped(false);
  };

  const frontContent = current ? (current.type === 'study'
    ? (current.item as PsychologyKeyStudy).researcher
    : (current.item as PsychologyKeyTerm).term) : '';
  const backContent = current ? (current.type === 'study'
    ? `${(current.item as PsychologyKeyStudy).aim}\n\nProcedure: ${(current.item as PsychologyKeyStudy).procedure}\n\nFindings: ${(current.item as PsychologyKeyStudy).findings}`
    : (current.item as PsychologyKeyTerm).definition) : '';

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button type="button" onClick={() => navigate('/psychology-hub')} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
        <ChevronLeft size={18} /> Back to Psychology Hub
      </button>
      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Key studies & terms</h1>

      <select value={topicId} onChange={(e) => { setTopicId(e.target.value); setIndex(0); }} className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}>
        {topics.map((t) => (
          <option key={t.id} value={t.id}>{t.title}</option>
        ))}
      </select>

      {items.length === 0 ? (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No key studies or terms for this topic yet.</p>
      ) : current ? (
        <>
          <div className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>{index + 1} of {items.length}</div>
          <button
            type="button"
            onClick={() => setFlipped((f) => !f)}
            className="w-full rounded-2xl border-2 p-8 text-left min-h-[200px] flex flex-col justify-center"
            style={{ borderColor: ACCENT, background: `${ACCENT}08` }}
          >
            {!flipped ? (
              <p className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>{frontContent}</p>
            ) : (
              <pre className="text-sm whitespace-pre-wrap font-sans" style={{ color: 'rgb(var(--text))' }}>{backContent}</pre>
            )}
            <p className="text-xs mt-2" style={{ color: 'rgb(var(--text-secondary))' }}>Tap to flip</p>
          </button>
          {flipped && (
            <div className="flex gap-2">
              {(['again', 'hard', 'good', 'easy'] as PsychologyConfidenceLevel[]).map((level) => (
                <button key={level} type="button" onClick={() => handleConfidence(level)} className="flex-1 py-2 rounded-lg text-sm font-medium capitalize border" style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}>{level}</button>
              ))}
            </div>
          )}
          <div className="flex justify-between">
            <button type="button" onClick={() => setIndex((i) => (i === 0 ? items.length - 1 : i - 1))} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronLeft size={20} /></button>
            <button type="button" onClick={() => setIndex((i) => (i === items.length - 1 ? 0 : i + 1))} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronRight size={20} /></button>
          </div>
        </>
      ) : null}
    </div>
  );
}
