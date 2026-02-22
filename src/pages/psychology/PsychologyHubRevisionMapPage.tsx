import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getPsychologyTopicsForSelection, getConceptsForTopic, getQuickChecksForTopic } from '../../config/psychologyHubData';

import { LAB_LAB_ACCENT } from '../../config/hubTheme';

export function PsychologyHubRevisionMapPage() {
  const navigate = useNavigate();
  const topics = getPsychologyTopicsForSelection();
  const progress = storage.getPsychologyTopicProgress();

  if (!selection) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <p className="mb-4" style={{ color: 'rgb(var(--text))' }}>Please select your options first.</p>
        <button type="button" onClick={() => navigate('/psychology-hub/option-select')} className="text-sm font-medium" style={{ color: LAB_ACCENT }}>Select options</button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <button type="button" onClick={() => navigate('/psychology-hub')} className="flex items-center gap-2 text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
        <ChevronLeft size={18} /> Back to Psychology Hub
      </button>
      <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>Revision map</h1>

      <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
        Your topics and suggested order: Concept Lab → Key studies → Quick check → Study evaluator → Question lab.
      </p>

      <div className="space-y-6">
        {topics.map((topic) => {
          const p = progress[topic.id];
          const conceptCount = getConceptsForTopic(topic.id).length;
          const quickCheckCount = getQuickChecksForTopic(topic.id).length;
          return (
            <div key={topic.id} className="rounded-2xl border p-5" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface))' }}>
              <h2 className="font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>{topic.title}</h2>
              <p className="text-xs mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>Paper {topic.paper}</p>
              <div className="flex flex-wrap gap-2 text-sm">
                {conceptCount > 0 && <span className="px-2 py-1 rounded" style={{ background: `${LAB_ACCENT}20`, color: LAB_ACCENT }}>{conceptCount} concepts</span>}
                {quickCheckCount > 0 && <span className="px-2 py-1 rounded" style={{ background: `${LAB_ACCENT}20`, color: LAB_ACCENT }}>{quickCheckCount} quick checks</span>}
                {p?.quickCheckPassed && <span className="text-green-600 dark:text-green-400">Quick check ✓</span>}
              </div>
              <div className="flex gap-2 mt-3">
                <button type="button" onClick={() => navigate('/psychology-hub/concept-lab')} className="text-xs font-medium" style={{ color: LAB_ACCENT }}>Concept Lab</button>
                <button type="button" onClick={() => navigate('/psychology-hub/key-studies')} className="text-xs font-medium" style={{ color: LAB_ACCENT }}>Key studies</button>
                <button type="button" onClick={() => navigate('/psychology-hub/quick-check')} className="text-xs font-medium" style={{ color: LAB_ACCENT }}>Quick check</button>
                <button type="button" onClick={() => navigate('/psychology-hub/question-lab')} className="text-xs font-medium" style={{ color: LAB_ACCENT }}>Question lab</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
