import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getPsychologyTopicsForSelection, getQuestionLabForTopic } from '../../config/psychologyHubData';

const ACCENT = '#9333EA';

function getPsychologyDraftKey(topicId: string, itemId: string): string {
  return `psychology:${topicId}:${itemId}`;
}

export function PsychologyHubQuestionLabPage() {
  const navigate = useNavigate();
  const topics = getPsychologyTopicsForSelection();
  const [topicId, setTopicId] = useState(topics[0]?.id ?? '');
  const [index, setIndex] = useState(0);
  const [showModel, setShowModel] = useState(false);
  const [content, setContent] = useState('');
  const [saveFeedback, setSaveFeedback] = useState(false);

  const items = getQuestionLabForTopic(topicId);
  const item = items[index];

  useEffect(() => {
    if (item) {
      const key = getPsychologyDraftKey(item.topicId, item.id);
      setContent(storage.getHubWritingDraft(key));
    } else {
      setContent('');
    }
  }, [item?.id, item?.topicId, index]);

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
      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Question lab</h1>

      <select value={topicId} onChange={(e) => { setTopicId(e.target.value); setIndex(0); setShowModel(false); }} className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}>
        {topics.map((t) => (
          <option key={t.id} value={t.id}>{t.title}</option>
        ))}
      </select>

      {items.length === 0 ? (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No question lab items for this topic yet.</p>
      ) : item ? (
        <div className="rounded-2xl border p-6 space-y-4" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}>
          <p className="text-xs mb-2" style={{ color: ACCENT }}>{item.questionType}</p>
          <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>{index + 1} of {items.length}</p>
          <p className="font-medium mb-4" style={{ color: 'rgb(var(--text))' }}>{item.question}</p>
          <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}><strong>Mark scheme:</strong> {item.markSchemeSummary}</p>

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>Your answer</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your answer here…"
              className="w-full min-h-[160px] rounded-xl border p-4 text-base resize-y focus:outline-none focus:ring-2"
              style={{
                background: 'rgb(var(--surface-2))',
                borderColor: 'rgb(var(--border))',
                color: 'rgb(var(--text))',
              }}
            />
            <div className="mt-3 flex gap-3 items-center">
              <button
                type="button"
                onClick={() => {
                  const key = getPsychologyDraftKey(item.topicId, item.id);
                  storage.setHubWritingDraft(key, content);
                  setSaveFeedback(true);
                  setTimeout(() => setSaveFeedback(false), 2000);
                }}
                className="text-sm font-medium"
                style={{ color: ACCENT }}
              >
                {saveFeedback ? 'Saved!' : 'Save draft'}
              </button>
              {saveFeedback && (
                <span className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                  Draft saved – your answer will be here when you return
                </span>
              )}
            </div>
          </div>

          {item.modelAnswer && (
            <>
              {!showModel ? (
                <button type="button" onClick={() => setShowModel(true)} className="text-sm font-medium" style={{ color: ACCENT }}>Show model answer</button>
              ) : (
                <div className="rounded-lg p-4 text-sm border" style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text-secondary))' }}>
                  {item.modelAnswer}
                </div>
              )}
            </>
          )}
          <div className="flex justify-between mt-6">
            <button type="button" onClick={() => { setIndex((i) => (i === 0 ? items.length - 1 : i - 1)); setShowModel(false); }} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronLeft size={20} /></button>
            <button type="button" onClick={() => { setIndex((i) => (i >= items.length - 1 ? 0 : i + 1)); setShowModel(false); }} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronRight size={20} /></button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
