import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getQuickChecksForSelection } from '../../config/religiousStudiesHubData';

const ACCENT = '#7C3AED';

export function ReligiousStudiesHubQuickCheckPage() {
  const navigate = useNavigate();
  const selection = storage.getRSOptionSelection();
  const items = selection ? getQuickChecksForSelection(selection) : [];
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<string | string[]>('');
  const [feedback, setFeedback] = useState<{ correct: boolean; text: string } | null>(null);

  const item = items[index];

  const check = () => {
    if (!item) return;
    const correct = Array.isArray(item.correctAnswer)
      ? (() => {
          const ans = Array.isArray(answer) ? answer.filter(Boolean) : (typeof answer === 'string' && answer.includes(',') ? answer.split(',').map((s) => s.trim()).filter(Boolean) : (answer ? [String(answer)] : []));
          const correctSet = new Set(item.correctAnswer.map((a) => String(a).toLowerCase()));
          return ans.length === correctSet.size && ans.every((a) => correctSet.has(String(a).toLowerCase()));
        })()
      : (typeof answer === 'string' ? answer : '').trim().toLowerCase() === String(item.correctAnswer).toLowerCase();
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

  const toggleWhichTwo = (opt: string) => {
    const current = Array.isArray(answer) ? answer : (answer ? [answer] : []);
    const has = current.includes(opt);
    if (has) setAnswer(current.filter((o) => o !== opt));
    else if (current.length < 2) setAnswer([...current, opt]);
  };

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
      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Quick check</h1>

      {items.length === 0 ? (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No quick check items for your selection yet.</p>
      ) : item ? (
        <div className="rounded-2xl border p-6" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}>
          <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>{index + 1} of {items.length}</p>
          <p className="font-medium mb-4" style={{ color: 'rgb(var(--text))' }}>{item.question}</p>
          {item.type === 'multipleChoice' && item.options && (
            <div className="space-y-2">
              {item.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setAnswer(opt)}
                  className={`w-full text-left rounded-lg border px-4 py-2 text-sm transition ${answer === opt ? 'ring-2 ring-violet-500' : ''}`}
                  style={{ borderColor: answer === opt ? ACCENT : 'rgb(var(--border))', color: 'rgb(var(--text))', ...(answer === opt ? { borderWidth: 2 } : {}) }}
                >
                  {opt}{answer === opt ? ' ✓' : ''}
                </button>
              ))}
            </div>
          )}
          {(item.type === 'shortAnswer' || item.type === 'trueFalse') && (
            <input type="text" value={typeof answer === 'string' ? answer : ''} onChange={(e) => setAnswer(e.target.value)} placeholder="Your answer" className="w-full rounded-lg border px-3 py-2 text-sm" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))', color: 'rgb(var(--text))' }} />
          )}
          {item.type === 'trueFalse' && (
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => setAnswer('true')}
                className={`px-4 py-2 rounded-lg border text-sm transition ${answer === 'true' ? 'ring-2 ring-violet-500' : ''}`}
                style={{ borderColor: answer === 'true' ? ACCENT : 'rgb(var(--border))', ...(answer === 'true' ? { borderWidth: 2 } : {}) }}
              >
                True{answer === 'true' ? ' ✓' : ''}
              </button>
              <button
                type="button"
                onClick={() => setAnswer('false')}
                className={`px-4 py-2 rounded-lg border text-sm transition ${answer === 'false' ? 'ring-2 ring-violet-500' : ''}`}
                style={{ borderColor: answer === 'false' ? ACCENT : 'rgb(var(--border))', ...(answer === 'false' ? { borderWidth: 2 } : {}) }}
              >
                False{answer === 'false' ? ' ✓' : ''}
              </button>
            </div>
          )}
          {item.type === 'whichTwo' && item.options && (
            <div className="space-y-2">
              <p className="text-xs mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>Select exactly two:</p>
              {item.options.map((opt) => {
                const selected = Array.isArray(answer) ? answer.includes(opt) : answer === opt;
                return (
                  <button key={opt} type="button" onClick={() => toggleWhichTwo(opt)} className={`w-full text-left rounded-lg border px-4 py-2 text-sm ${selected ? 'ring-2' : ''}`} style={{ borderColor: selected ? '#7C3AED' : 'rgb(var(--border))', color: 'rgb(var(--text))', ...(selected ? { borderWidth: '2px' } : {}) }}>{opt}{selected ? ' ✓' : ''}</button>
                );
              })}
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
