import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getHistoryOptionsForSelection, getQuestionLabItemsForOption } from '../../config/historyHubData';
import { FactorEssayPlanningTriangle, createEmptyFactorPlan } from '../../components/FactorEssayPlanningTriangle';
import type { FactorEssayPlan } from '../../types/historyHub';

const ACCENT = '#B45309';

export function HistoryHubQuestionLabPage() {
  const navigate = useNavigate();
  const selection = storage.getHistoryOptionSelection();
  const options = selection ? getHistoryOptionsForSelection(selection) : [];
  const [optionKey, setOptionKey] = useState(options[0]?.optionKey ?? '');
  const [partId, setPartId] = useState('');
  const [itemIndex, setItemIndex] = useState(0);
  const [essayDraft, setEssayDraft] = useState('');
  const [plan, setPlan] = useState<FactorEssayPlan | null>(null);
  const [saveFeedback, setSaveFeedback] = useState(false);

  const items = getQuestionLabItemsForOption(optionKey, partId || undefined);
  const item = items[itemIndex];
  const isFactorEssay = item?.questionType === 'factorEssay' || (item?.questionType === 'essay' && item?.questionFactor);

  useEffect(() => {
    if (!item) return;
    if (isFactorEssay && item.questionFactor) {
      const saved = storage.getHistoryFactorEssayDraft(item.id);
      if (saved) {
        setPlan(saved.plan);
        setEssayDraft(saved.essayDraft);
      } else {
        setPlan(createEmptyFactorPlan(item.questionFactor));
        setEssayDraft('');
      }
    } else {
      setPlan(null);
      const saved = storage.getHubWritingDraft(`history-question-lab:${item.id}`);
      setEssayDraft(saved);
    }
  }, [item?.id, item?.questionFactor, isFactorEssay]);

  const saveFactorDraft = () => {
    if (!item || !plan || !isFactorEssay) return;
    storage.setHistoryFactorEssayDraft({
      questionId: item.id,
      optionKey,
      partId: item.partId,
      plan,
      essayDraft,
      updatedAt: Date.now(),
    });
  };

  const saveNonFactorDraft = () => {
    if (!item || isFactorEssay) return;
    storage.setHubWritingDraft(`history-question-lab:${item.id}`, essayDraft);
  };

  useEffect(() => {
    if (isFactorEssay && plan) {
      const t = setTimeout(saveFactorDraft, 500);
      return () => clearTimeout(t);
    }
  }, [plan, essayDraft, isFactorEssay, item?.id, optionKey, item?.partId]);

  useEffect(() => {
    if (!isFactorEssay && item) {
      const t = setTimeout(saveNonFactorDraft, 500);
      return () => clearTimeout(t);
    }
  }, [essayDraft, isFactorEssay, item?.id]);

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/history-hub/option-select')} className="text-sm font-medium" style={{ color: ACCENT }}>Select options</button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button type="button" onClick={() => navigate('/history-hub')} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
        <ChevronLeft size={18} /> Back to History Hub
      </button>
      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Question lab</h1>

      <div className="flex flex-wrap gap-2">
        <select value={optionKey} onChange={(e) => { setOptionKey(e.target.value); setPartId(''); setItemIndex(0); }} className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}>
          {options.map((o) => <option key={o.optionKey} value={o.optionKey}>{o.title}</option>)}
        </select>
        {options.find((o) => o.optionKey === optionKey)?.parts.length ? (
          <select value={partId} onChange={(e) => { setPartId(e.target.value); setItemIndex(0); }} className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}>
            <option value="">All parts</option>
            {options.find((o) => o.optionKey === optionKey)?.parts.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
        ) : null}
      </div>

      {items.length === 0 ? (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No questions for this option yet.</p>
      ) : item ? (
        <div className="flex flex-col lg:flex-row gap-6">
          {isFactorEssay && item.questionFactor && plan && (
            <div className="lg:w-80 shrink-0">
              <FactorEssayPlanningTriangle
                centreLabel={item.questionFactor}
                plan={plan}
                onChange={setPlan}
                collapsible
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="rounded-2xl border p-6 mb-4" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}>
              <p className="text-xs mb-2" style={{ color: ACCENT }}>{item.questionType}</p>
              <p className="font-medium mb-4" style={{ color: 'rgb(var(--text))' }}>{item.question}</p>
              <p className="text-xs mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>{item.markSchemeSummary}</p>
              {(item.questionType === 'essay' || item.questionType === 'factorEssay' || item.questionType === 'account') ? (
                <textarea
                  value={essayDraft}
                  onChange={(e) => setEssayDraft(e.target.value)}
                  onBlur={() => {
                    if (isFactorEssay && plan) saveFactorDraft();
                    else if (!isFactorEssay) saveNonFactorDraft();
                  }}
                  placeholder="Write your answer..."
                  rows={12}
                  className="w-full rounded-lg border px-3 py-2 text-sm resize-y"
                  style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
                />
              ) : (
                <textarea
                  value={essayDraft}
                  onChange={(e) => setEssayDraft(e.target.value)}
                  onBlur={() => !isFactorEssay && saveNonFactorDraft()}
                  placeholder="Your answer..."
                  rows={4}
                  className="w-full rounded-lg border px-3 py-2 text-sm resize-y"
                  style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }}
                />
              )}
              <div className="mt-3 flex gap-3 items-center">
                <button
                  type="button"
                  onClick={() => {
                    if (isFactorEssay && plan) saveFactorDraft();
                    else saveNonFactorDraft();
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
              <details className="rounded-xl border p-4" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}>
                <summary className="cursor-pointer font-medium" style={{ color: 'rgb(var(--text))' }}>Model answer</summary>
                <p className="mt-2 text-sm whitespace-pre-wrap" style={{ color: 'rgb(var(--text-secondary))' }}>{item.modelAnswer}</p>
              </details>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
