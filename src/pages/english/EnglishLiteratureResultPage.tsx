import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import { getLiteratureTaskById } from '../../config/goldenEnglishQuestionBank';
import { storage } from '../../utils/storage';

const BANDS = ['Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9'];

export function EnglishLiteratureResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as {
    draftId?: string;
    taskId?: string;
    content?: string;
    checklistTicks?: Record<string, boolean>;
    fromLiterature?: boolean;
  } | undefined;
  const draftId = state?.draftId;
  const taskId = state?.taskId ?? storage.getEnglishLiteratureDraftById(state?.draftId ?? '')?.taskId;
  const existingDraft = draftId && draftId !== 'new' ? storage.getEnglishLiteratureDraftById(draftId) : null;
  const content = state?.content ?? existingDraft?.content ?? '';
  const task = taskId ? getLiteratureTaskById(taskId) : existingDraft ? getLiteratureTaskById(existingDraft.taskId) : null;

  const [selfBand, setSelfBand] = useState('');
  const [reflection, setReflection] = useState('');
  const [saved, setSaved] = useState(false);
  const [savedDraftId, setSavedDraftId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSelfMarkSave = () => {
    setSaveError(null);
    if (!task) {
      setSaveError('Task not found. Go back and open a task from Literature.');
      return;
    }
    if (!selfBand) {
      setSaveError('Please choose a grade first (e.g. Grade 6).');
      return;
    }
    try {
      const result = {
        bandLevel: selfBand,
        marks: undefined,
        maxMarks: 30,
        strengths: [],
        targets: reflection?.trim() ? [reflection.trim()] : [],
        isSelfMark: true as const,
        reflectedAt: new Date().toISOString(),
      };
      const drafts = storage.getEnglishLiteratureDrafts();
      let draft =
        draftId && draftId !== 'new'
          ? drafts.find(d => d.id === draftId)
          : drafts.find(d => d.taskId === task.id && !d.result);
      if (!draft) {
        draft = {
          id: `lit-draft-${task.id}-${Date.now()}`,
          taskId: task.id,
          taskTitle: task.title,
          taskType: task.taskType,
          content,
          wordCount: content.trim().split(/\s+/).filter(Boolean).length,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }
      storage.saveEnglishLiteratureDraft({
        ...draft,
        result,
        updatedAt: new Date().toISOString(),
      });
      setSavedDraftId(draft.id);
      storage.setEnglishLastScore({ bandLevel: selfBand });
      const targetsState = storage.getEnglishTargets();
      const existingTargets = Array.isArray(targetsState?.targets) ? targetsState.targets : [];
      const reflectionTrimmed = reflection?.trim();
      if (reflectionTrimmed) {
        storage.setEnglishTargets([
          ...existingTargets.filter((t: string) => t !== reflectionTrimmed),
          reflectionTrimmed,
        ].slice(0, 3));
      }
      storage.setEnglishContinue({
        type: 'literature',
        taskId: task.id,
        draftId: draft.id,
        label: task.title,
        updatedAt: new Date().toISOString(),
      });
      setSaved(true);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'Something went wrong. Try again.');
    }
  };

  if (!task) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <p style={{ color: 'rgb(var(--text-secondary))' }}>
          No task in state. Start a task from Literature.
        </p>
        <button
          type="button"
          onClick={() => navigate('/english-campus/literature')}
          className="mt-4 btn-primary"
        >
          Back to Literature
        </button>
      </div>
    );
  }

  if (saved) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div
          className="rounded-xl border p-6 text-center"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <CheckCircle size={48} className="mx-auto text-emerald-500 mb-4" />
          <h2 className="text-xl font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
            Feedback saved
          </h2>
          <p className="text-sm mb-6" style={{ color: 'rgb(var(--text-secondary))' }}>
            Your targets have been updated. Use them in your next task.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            {savedDraftId && (
              <button
                type="button"
                onClick={() =>
                  navigate(`/english-campus/literature/task/${task.id}`, {
                    state: { reopenDraftId: savedDraftId },
                  })
                }
                className="btn-primary"
              >
                Improve this draft
              </button>
            )}
            <button
              type="button"
              onClick={() => navigate('/english-campus/literature')}
              className="btn-primary"
            >
              Back to Literature
            </button>
            <button type="button" onClick={() => navigate('/english-campus')} className="btn-ghost">
              English Campus home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Back"
        >
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
        </button>
        <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>
          Self-mark: {task.title}
        </h1>
      </div>

      <div
        className="rounded-xl border p-4"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <h2 className="font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
          Your response
        </h2>
        <div
          className="text-sm whitespace-pre-wrap rounded-lg border p-4 max-h-64 overflow-y-auto"
          style={{ color: 'rgb(var(--text-secondary))', borderColor: 'rgb(var(--border))' }}
        >
          {content || '(No content)'}
        </div>
      </div>

      <div
        className="rounded-xl border p-4"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <label className="block font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
          Choose your grade
        </label>
        <div className="flex flex-wrap gap-2">
          {BANDS.map(band => (
            <button
              key={band}
              type="button"
              onClick={() => setSelfBand(band)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${selfBand === band ? 'text-white' : ''}`}
              style={
                selfBand === band
                  ? { background: 'var(--gradient-primary)' }
                  : { background: 'rgb(var(--surface-2))', color: 'rgb(var(--text))' }
              }
            >
              {band}
            </button>
          ))}
        </div>
      </div>

      <div
        className="rounded-xl border p-4"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <label className="block font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
          What I did well / What I'll improve
        </label>
        <textarea
          value={reflection}
          onChange={e => setReflection(e.target.value)}
          placeholder="e.g. Good comparative point in para 2; I'll work on embedding quotations and linking to context."
          className="w-full min-h-[100px] rounded-lg border p-3 text-sm focus:outline-none focus:ring-2"
          style={{
            background: 'rgb(var(--bg))',
            borderColor: 'rgb(var(--border))',
            color: 'rgb(var(--text))',
          }}
        />
      </div>

      {saveError && (
        <div
          className="rounded-lg border px-4 py-3 text-sm"
          style={{
            background: 'rgb(var(--surface-2))',
            borderColor: 'rgb(var(--border))',
            color: 'rgb(var(--text))',
          }}
          role="alert"
        >
          {saveError}
        </div>
      )}

      <div className="flex gap-3">
        <button type="button" onClick={handleSelfMarkSave} className="btn-primary">
          Save reflection & targets
        </button>
        <button type="button" onClick={() => navigate('/english-campus/literature')} className="btn-ghost">
          Back to Literature
        </button>
      </div>
    </div>
  );
}
