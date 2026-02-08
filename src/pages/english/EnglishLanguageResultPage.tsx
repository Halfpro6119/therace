import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, CheckCircle, Sparkles, FileText } from 'lucide-react';
import { getLanguageTaskById } from '../../config/englishLanguageTasks';
import { storage } from '../../utils/storage';
import { SelfMarkAnnotator } from '../../components/english/SelfMarkAnnotator';
import type { EnglishMarkResult, SelfMarkAnnotations } from '../../types/englishCampus';

const BANDS = ['Level 1 (1–5)', 'Level 2 (6–10)', 'Level 3 (11–15)', 'Level 4 (16–20)', 'Level 5 (21–24)'];

export function EnglishLanguageResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { draftId?: string; taskId?: string; content?: string; checklistTicks?: Record<string, boolean> } | undefined;
  const draftId = state?.draftId;
  const taskId = state?.taskId ?? storage.getEnglishDraftById(state?.draftId ?? '')?.taskId;
  const existingDraft = draftId && draftId !== 'new' ? storage.getEnglishDraftById(draftId) : null;
  const content = state?.content ?? existingDraft?.content ?? '';
  const task = taskId ? getLanguageTaskById(taskId) : existingDraft ? getLanguageTaskById(existingDraft.taskId) : null;

  const [mode, setMode] = useState<'choose' | 'self' | 'ai'>('choose');
  const [selfBand, setSelfBand] = useState('');
  const [reflection, setReflection] = useState('');
  const [selfMarkAnnotations, setSelfMarkAnnotations] = useState<SelfMarkAnnotations>({ spans: [], ticks: [], notes: [] });
  const [saved, setSaved] = useState(false);
  const [lastAIResult, setLastAIResult] = useState<EnglishMarkResult | null>(null);
  const [savedDraftId, setSavedDraftId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSelfMarkSave = () => {
    setSaveError(null);
    if (!task) {
      setSaveError('Task not found. Go back and open a task from the Language dashboard.');
      return;
    }
    if (!selfBand) {
      setSaveError('Please choose a band first (e.g. Level 4).');
      return;
    }
    try {
    const annotationsToSave: SelfMarkAnnotations = {
      spans: selfMarkAnnotations.spans.map(s => ({ ...s })),
      ticks: selfMarkAnnotations.ticks.map(t => ({ ...t })),
      notes: selfMarkAnnotations.notes.map(n => ({ ...n })),
    };
    const result: EnglishMarkResult = {
      bandLevel: selfBand,
      marks: undefined,
      maxMarks: 40,
      strengths: [],
      targets: reflection?.trim() ? [reflection.trim()] : [],
      isSelfMark: true,
      reflectedAt: new Date().toISOString(),
      selfMarkAnnotations:
        annotationsToSave.spans.length > 0 || annotationsToSave.ticks.length > 0 || annotationsToSave.notes.length > 0
          ? annotationsToSave
          : undefined,
    };
    const drafts = storage.getEnglishDrafts();
    let draft = draftId && draftId !== 'new'
      ? drafts.find(d => d.id === draftId)
      : drafts.find(d => d.taskId === task.id && !d.result);
    if (!draft) {
      draft = {
        id: `draft-${task.id}-${Date.now()}`,
        taskId: task.id,
        taskTitle: task.title,
        paper: task.paper,
        content,
        wordCount: content.trim().split(/\s+/).filter(Boolean).length,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
    storage.saveEnglishDraft({ ...draft, result, updatedAt: new Date().toISOString() });
    setSavedDraftId(draft.id);
    storage.setEnglishLastScore({ bandLevel: selfBand });
    const targetsState = storage.getEnglishTargets();
    const existingTargets = Array.isArray(targetsState?.targets) ? targetsState.targets : [];
    const reflectionTrimmed = reflection?.trim();
    if (reflectionTrimmed) {
      storage.setEnglishTargets([...existingTargets.filter((t: string) => t !== reflectionTrimmed), reflectionTrimmed].slice(0, 3));
    }
    storage.setEnglishContinue({
      type: 'language',
      taskId: task.id,
      label: task.title,
      updatedAt: new Date().toISOString(),
    });
    setSaved(true);
    } catch (e) {
      setSaveError(e instanceof Error ? e.message : 'Something went wrong. Try again.');
    }
  };

  const handleAISimulate = () => {
    if (!task) return;
    const result: EnglishMarkResult = {
      bandLevel: 'Level 4 (16–20)',
      marks: 18,
      maxMarks: 40,
      aoBreakdown: [
        { ao: 'AO5', level: 'Level 4', comment: 'Clear structure; some ambitious vocabulary' },
        { ao: 'AO6', level: 'Level 3', comment: 'Generally accurate; a few punctuation errors' },
      ],
      strengths: ['Clear paragraphing', 'Engaging opening', 'Good range of vocabulary'],
      targets: ['Embed quotations where relevant', 'Use more structural shifts', 'Check apostrophes'],
      rewriteSuggestions: [
        'Upgrade your opening sentence to a single-word or short fragment for impact.',
        'Add one clear structural shift (e.g. time jump or focus shift) in the middle.',
      ],
      isSelfMark: false,
    };
    const drafts = storage.getEnglishDrafts();
    const draft = draftId && draftId !== 'new'
      ? drafts.find(d => d.id === draftId)
      : drafts.find(d => d.taskId === task.id && !d.result);
    if (draft) {
      storage.saveEnglishDraft({ ...draft, result, updatedAt: new Date().toISOString() });
      setSavedDraftId(draft.id);
    }
    storage.setEnglishLastScore({ bandLevel: result.bandLevel, marks: result.marks, maxMarks: result.maxMarks });
    storage.setEnglishTargets({ targets: result.targets, updatedAt: new Date().toISOString() });
    storage.setEnglishContinue({
      type: 'language',
      taskId: task.id,
      label: task.title,
      updatedAt: new Date().toISOString(),
    });
    setLastAIResult(result);
    setSaved(true);
  };

  if (!task) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <p style={{ color: 'rgb(var(--text-secondary))' }}>No task in state. Start a task from the Language dashboard.</p>
        <button type="button" onClick={() => navigate('/english-campus/language')} className="mt-4 btn-primary">
          Back to Language
        </button>
      </div>
    );
  }

  if (saved) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="rounded-xl border p-6 text-center" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
          <CheckCircle size={48} className="mx-auto text-emerald-500 mb-4" />
          <h2 className="text-xl font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
            Feedback saved
          </h2>
          <p className="text-sm mb-6" style={{ color: 'rgb(var(--text-secondary))' }}>
            Your targets have been updated. Use them in your next task.
          </p>
          {savedDraftId && (() => {
            const savedDraft = storage.getEnglishDraftById(savedDraftId);
            const ann = savedDraft?.result?.selfMarkAnnotations;
            if (!savedDraft || !ann || (ann.spans.length === 0 && ann.ticks.length === 0 && ann.notes.length === 0)) return null;
            return (
              <div className="rounded-lg border p-4 mb-6 text-left max-w-2xl mx-auto" style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))' }}>
                <h3 className="font-bold mb-2 text-sm" style={{ color: 'rgb(var(--text))' }}>Your marked draft</h3>
                <SelfMarkAnnotator content={savedDraft.content} annotations={ann} readOnly />
              </div>
            );
          })()}
          {lastAIResult && !lastAIResult.isSelfMark && (
            <div className="rounded-lg border p-4 mb-6 text-left" style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))' }}>
              <h3 className="font-bold mb-2 text-sm" style={{ color: 'rgb(var(--text))' }}>AI feedback summary</h3>
              <p className="text-sm mb-2" style={{ color: 'rgb(var(--text))' }}>
                {lastAIResult.bandLevel}
                {lastAIResult.marks != null && ` (${lastAIResult.marks}/${lastAIResult.maxMarks})`}
              </p>
              {lastAIResult.strengths?.length > 0 && (
                <p className="text-xs mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                  Strengths: {lastAIResult.strengths.join('; ')}
                </p>
              )}
              {lastAIResult.targets?.length > 0 && (
                <p className="text-xs" style={{ color: 'rgb(var(--text-secondary))' }}>
                  Targets: {lastAIResult.targets.join('; ')}
                </p>
              )}
            </div>
          )}
          <div className="flex gap-3 justify-center flex-wrap">
            {task && savedDraftId && (
              <button
                type="button"
                onClick={() =>
                  navigate(`/english-campus/language/task/${task.id}`, {
                    state: { reopenDraftId: savedDraftId },
                  })
                }
                className="btn-primary flex items-center gap-2"
              >
                <FileText size={18} />
                Improve this draft
              </button>
            )}
            <button type="button" onClick={() => navigate('/english-campus/language')} className="btn-primary">
              Back to Language dashboard
            </button>
            <button type="button" onClick={() => navigate('/english-campus')} className="btn-ghost">
              English Campus home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'choose') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5">
            <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
          </button>
          <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            How would you like to mark?
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setMode('self')}
            className="rounded-xl border p-6 text-left hover:shadow-md transition"
            style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
          >
            <CheckCircle size={32} className="mb-3 text-sky-500" />
            <h3 className="font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
              Self-mark
            </h3>
            <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              Choose your band/level and write a short reflection on what you did well and what you’ll improve.
            </p>
          </button>
          <button
            type="button"
            onClick={() => handleAISimulate()}
            className="rounded-xl border p-6 text-left hover:shadow-md transition"
            style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
          >
            <Sparkles size={32} className="mb-3 text-violet-500" />
            <h3 className="font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
              AI examiner (simulated)
            </h3>
            <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              Get band estimate, AO breakdown, strengths, targets and rewrite suggestions. (Demo: sample feedback.)
            </p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button type="button" onClick={() => setMode('choose')} className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5">
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
        </button>
        <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>
          Self-mark: {task.title}
        </h1>
      </div>

      <div className="rounded-xl border p-4" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <h2 className="font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
          Mark your draft
        </h2>
        <p className="text-sm mb-3" style={{ color: 'rgb(var(--text-secondary))' }}>
          Select text to highlight or underline, add green ticks for good moments, and add pen-style notes for feedback.
        </p>
        <SelfMarkAnnotator
          content={content}
          annotations={selfMarkAnnotations}
          onChange={setSelfMarkAnnotations}
        />
      </div>

      <div className="rounded-xl border p-4" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <label className="block font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
          Choose your band (AO5 Content & Organisation, 24 marks)
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
      <div className="rounded-xl border p-4" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
        <label className="block font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
          What I did well / What I’ll improve
        </label>
        <textarea
          value={reflection}
          onChange={e => setReflection(e.target.value)}
          placeholder="e.g. Good opening; I’ll work on embedding quotations and using more structural shifts."
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
          style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
          role="alert"
        >
          {saveError}
        </div>
      )}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleSelfMarkSave}
          className="btn-primary"
        >
          Save reflection & targets
        </button>
        <button type="button" onClick={() => setMode('choose')} className="btn-ghost">
          Back
        </button>
      </div>
    </div>
  );
}
