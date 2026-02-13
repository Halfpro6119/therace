import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getPsychologyTopicsForSelection, getConceptsForTopic } from '../../config/psychologyHubData';
import { ConceptLabSuperpowersSection } from '../../components/learning';

const ACCENT = '#9333EA';

export function PsychologyHubConceptLabPage() {
  const navigate = useNavigate();
  const selection = storage.getPsychologyOptionSelection();
  const topics = getPsychologyTopicsForSelection();
  const [topicId, setTopicId] = useState(topics[0]?.id ?? '');
  const [index, setIndex] = useState(0);

  const concepts = getConceptsForTopic(topicId);
  const card = concepts[index];

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/psychology-hub/option-select')} className="text-sm font-medium" style={{ color: ACCENT }}>Select options</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <button type="button" onClick={() => navigate('/psychology-hub')} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
        <ChevronLeft size={18} /> Back to Psychology Hub
      </button>
      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Concept Lab</h1>

      <div className="flex flex-wrap gap-2">
        <select value={topicId} onChange={(e) => { setTopicId(e.target.value); setIndex(0); }} className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}>
          {topics.map((t) => (
            <option key={t.id} value={t.id}>{t.title}</option>
          ))}
        </select>
      </div>

      {concepts.length === 0 ? (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No concepts for this topic yet.</p>
      ) : card ? (
        <div className="rounded-2xl border p-6" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}>
          <p className="text-xs mb-2" style={{ color: ACCENT }}>{card.title}</p>
          <p className="font-medium mb-4" style={{ color: 'rgb(var(--text))' }}>{card.coreIdea}</p>
          {card.keyStudies && (
            <div className="rounded-lg p-3 text-sm mb-3 border" style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text-secondary))' }}>
              <strong>Key studies:</strong> {card.keyStudies}
            </div>
          )}
          {card.misconception && (
            <p className="text-sm mb-3" style={{ color: 'rgb(var(--text-secondary))' }}>
              <strong>Common misconception:</strong> {card.misconception}
            </p>
          )}
          {card.evaluationHook && (
            <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              <strong>Evaluate:</strong> {card.evaluationHook}
            </p>
          )}
          <div className="mt-6 pt-6 border-t" style={{ borderColor: 'rgb(var(--border))' }}>
            <ConceptLabSuperpowersSection
              subjectId="psychology"
              conceptId={card.id}
              conceptTitle={card.title}
              coreIdea={card.coreIdea}
              context="Psychology"
            />
          </div>
          <div className="flex justify-between mt-6">
            <button type="button" onClick={() => setIndex((i) => (i === 0 ? concepts.length - 1 : i - 1))} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronLeft size={20} /></button>
            <span className="text-sm self-center" style={{ color: 'rgb(var(--text-secondary))' }}>{index + 1} of {concepts.length}</span>
            <button type="button" onClick={() => setIndex((i) => (i >= concepts.length - 1 ? 0 : i + 1))} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronRight size={20} /></button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
