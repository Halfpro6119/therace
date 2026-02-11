import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { storage } from '../../utils/storage';
import { GEOGRAPHY_ISSUE_SCENARIOS_LIST } from '../../config/geographyHubData';

const ACCENT = '#0D9488';

export function GeographyHubIssueLabPage() {
  const navigate = useNavigate();
  const selection = storage.getGeographyOptionSelection();
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showMarkScheme, setShowMarkScheme] = useState(false);

  const scenarios = GEOGRAPHY_ISSUE_SCENARIOS_LIST;
  const scenario = scenarios[scenarioIndex];
  const question = scenario?.questions[questionIndex];

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
      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Issue lab</h1>
      <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
        Paper 3 – Practise synoptic evaluation: interpret resources, consider stakeholders, evaluate options, justify decisions.
      </p>

      {scenarios.length === 0 ? (
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>No issue scenarios yet.</p>
      ) : scenario ? (
        <div className="rounded-2xl border p-6 space-y-4" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>Scenario {scenarioIndex + 1} of {scenarios.length}</p>
          <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>{scenario.title}</h2>
          <div>
            <p className="text-xs font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>Resources</p>
            <ul className="list-disc list-inside text-sm" style={{ color: 'rgb(var(--text))' }}>
              {scenario.resources.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
          <div className="border-t pt-4" style={{ borderColor: 'rgb(var(--border))' }}>
            <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>Question {questionIndex + 1} of {scenario.questions.length}</p>
            <p className="font-medium mb-3" style={{ color: 'rgb(var(--text))' }}>{question?.question}</p>
            <button type="button" onClick={() => setShowMarkScheme((s) => !s)} className="text-sm font-medium" style={{ color: ACCENT }}>
              {showMarkScheme ? 'Hide' : 'Show'} mark scheme
            </button>
            {showMarkScheme && question && (
              <div className="mt-2 rounded-lg p-3" style={{ background: `${ACCENT}15` }}>
                <p className="text-sm" style={{ color: 'rgb(var(--text))' }}>{question.markScheme}</p>
              </div>
            )}
          </div>
          <div className="flex justify-between pt-4">
            <button type="button" onClick={() => { setQuestionIndex((q) => (q === 0 ? scenario.questions.length - 1 : q - 1)); setShowMarkScheme(false); }} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronLeft size={20} /></button>
            <button type="button" onClick={() => { setQuestionIndex((q) => (q >= scenario.questions.length - 1 ? 0 : q + 1)); setShowMarkScheme(false); }} className="p-2 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}><ChevronRight size={20} /></button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
