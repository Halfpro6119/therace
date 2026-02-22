import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { storage } from '../../utils/storage';

import { LAB_ACCENT } from '../../config/hubTheme';

/** GCSE 8182: All 8 topics are compulsory. This page confirms and redirects. */
export function PsychologyHubOptionSelectPage() {
  const navigate = useNavigate();

  useEffect(() => {
    storage.setPsychologyOptionSelection({ confirmed: true });
  }, []);

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <section className="rounded-2xl p-6 border shadow-sm" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <button
          type="button"
          onClick={() => navigate('/psychology-hub')}
          className="flex items-center gap-2 text-sm font-medium mb-4"
          style={{ color: 'rgb(var(--text-secondary))' }}
        >
          <ChevronLeft size={18} />
          Back to Psychology Hub
        </button>
        <h1 className="text-xl font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
          GCSE Psychology 8182
        </h1>
        <p className="text-sm mb-6" style={{ color: 'rgb(var(--text-secondary))' }}>
          All 8 topics are compulsory for AQA GCSE Psychology. Paper 1: Memory, Perception, Development, Research methods. Paper 2: Social influence, Language thought & communication, Brain & neuropsychology, Psychological problems.
        </p>

        <button
          type="button"
          onClick={() => navigate('/psychology-hub')}
          className="w-full py-3 rounded-xl font-semibold text-white"
          style={{ background: LAB_ACCENT }}
        >
          Continue to Psychology Hub
        </button>
      </section>
    </div>
  );
}
