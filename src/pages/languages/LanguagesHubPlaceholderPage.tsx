/**
 * Placeholder for language modes (Vocabulary, Grammar, etc.)
 * Full implementation: vocab integration, grammar drills, listening/reading tasks, etc.
 */
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Target } from 'lucide-react';
import { LANGUAGES } from '../../config/languagesHubData';

const MODE_LABELS: Record<string, string> = {
  vocabulary: 'Vocabulary',
  grammar: 'Grammar',
  listening: 'Listening',
  reading: 'Reading',
  writing: 'Writing',
  speaking: 'Speaking prep',
  translation: 'Translation',
};

export function LanguagesHubPlaceholderPage() {
  const navigate = useNavigate();
  const { languageId, modeId } = useParams<{ languageId: string; modeId: string }>();
  const language = LANGUAGES.find((l) => l.id === languageId);
  const modeLabel = modeId ? MODE_LABELS[modeId] ?? modeId : '';

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <section className="rounded-2xl p-6 border shadow-sm" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <button
          type="button"
          onClick={() => navigate(`/languages-hub/${languageId}`)}
          className="flex items-center gap-2 text-sm font-medium mb-4"
          style={{ color: 'rgb(var(--text-secondary))' }}
        >
          <ChevronLeft size={18} />
          Back to {language?.name ?? 'Language'}
        </button>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl" style={{ background: `${language?.color ?? '#2563EB'}20` }}>
            <Target size={24} style={{ color: language?.color ?? '#2563EB' }} />
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>
              {modeLabel}
            </h1>
            <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              {language?.name} – Coming soon
            </p>
          </div>
        </div>
        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
          Full content for {modeLabel} is in development. Target: 1,200+ words (Foundation) / 1,700+ (Higher), grammar concepts, listening/reading/writing tasks per AQA spec.
        </p>
      </section>
    </div>
  );
}
