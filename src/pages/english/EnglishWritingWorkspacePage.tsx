import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, CheckSquare, FileText, BookOpen, PanelRightOpen, Highlighter } from 'lucide-react';
import { getLanguageTaskById } from '../../config/englishLanguageTasks';
import { storage } from '../../utils/storage';
import type { EnglishWritingDraft, EnglishChecklistItem } from '../../types/englishCampus';

const QUICK_CHECKLIST: EnglishChecklistItem[] = [
  { id: 'c1', label: 'Clear opening / hook', ao: 'AO5' },
  { id: 'c2', label: 'Paragraphs used purposefully', ao: 'AO5' },
  { id: 'c3', label: 'Varied sentence types', ao: 'AO6' },
  { id: 'c4', label: 'Ambitious vocabulary', ao: 'AO6' },
  { id: 'c5', label: 'Structural shift(s) where appropriate', ao: 'AO5' },
  { id: 'c6', label: 'Accurate spelling', ao: 'AO6' },
  { id: 'c7', label: 'Correct punctuation', ao: 'AO6' },
  { id: 'c8', label: 'Audience & purpose clear', ao: 'AO5' },
];

function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function countParagraphs(text: string): number {
  return text
    .trim()
    .split(/\n\n+/)
    .filter(p => p.trim().length > 0).length || (text.trim() ? 1 : 0);
}

export function EnglishWritingWorkspacePage() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const task = taskId ? getLanguageTaskById(taskId) : null;

  const [content, setContent] = useState('');
  const [startTime] = useState(() => Date.now());
  const [elapsedSec, setElapsedSec] = useState(0);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showMarkScheme, setShowMarkScheme] = useState(false);
  const [showModels, setShowModels] = useState(false);
  const [checklistTicks, setChecklistTicks] = useState<Record<string, boolean>>({});
  const [draftId, setDraftId] = useState<string | null>(null);
  const [saveFeedback, setSaveFeedback] = useState(false);

  const location = useLocation();
  const reopenDraftId = (location.state as { reopenDraftId?: string } | undefined)?.reopenDraftId;

  useEffect(() => {
    if (!task) return;
    const existing = reopenDraftId
      ? storage.getEnglishDraftById(reopenDraftId)
      : storage.getEnglishDrafts().find(d => d.taskId === task.id && !d.result);
    if (existing) {
      setContent(existing.content);
      setDraftId(existing.id);
      if (existing.checklistTicks) {
        const ticks: Record<string, boolean> = {};
        existing.checklistTicks.forEach(id => (ticks[id] = true));
        setChecklistTicks(ticks);
      }
    }
  }, [task?.id, reopenDraftId]);

  useEffect(() => {
    const t = setInterval(() => setElapsedSec(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(t);
  }, [startTime]);

  const wordCount = countWords(content);
  const paragraphCount = countParagraphs(content);
  const tickCount = Object.values(checklistTicks).filter(Boolean).length;
  const coveragePct = Math.round((tickCount / QUICK_CHECKLIST.length) * 100);

  /** Update current draft in place (used by auto-save and submit). */
  const saveDraft = useCallback(() => {
    if (!task) return;
    const id = draftId ?? `draft-${task.id}-${Date.now()}`;
    const draft: EnglishWritingDraft = {
      id,
      taskId: task.id,
      taskTitle: task.title,
      paper: task.paper,
      content,
      wordCount,
      createdAt: draftId ? storage.getEnglishDraftById(draftId)?.createdAt ?? new Date().toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      checklistTicks: Object.entries(checklistTicks)
        .filter(([, v]) => v)
        .map(([k]) => k),
    };
    storage.saveEnglishDraft(draft);
    setDraftId(id);
  }, [task, content, wordCount, checklistTicks, draftId]);

  /** Create a new draft snapshot (keeps previous drafts in history). Used by manual "Save draft" only. */
  const saveDraftAsNewSnapshot = useCallback(() => {
    if (!task) return;
    const newId = `draft-${task.id}-${Date.now()}`;
    const draft: EnglishWritingDraft = {
      id: newId,
      taskId: task.id,
      taskTitle: task.title,
      paper: task.paper,
      content,
      wordCount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      checklistTicks: Object.entries(checklistTicks)
        .filter(([, v]) => v)
        .map(([k]) => k),
    };
    storage.saveEnglishDraft(draft);
    setDraftId(newId);
  }, [task, content, wordCount, checklistTicks]);

  useEffect(() => {
    const interval = setInterval(saveDraft, 30000);
    return () => clearInterval(interval);
  }, [saveDraft]);

  const handleSubmit = () => {
    saveDraft();
    storage.updateEnglishWritingStreak();
    navigate('/english-campus/language/result', { state: { draftId: draftId ?? 'new', taskId: task?.id, content, checklistTicks } });
  };

  if (!task) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <p className="text-center" style={{ color: 'rgb(var(--text-secondary))' }}>
          Task not found.
        </p>
        <button
          type="button"
          onClick={() => navigate('/english-campus/language')}
          className="mt-4 mx-auto block btn-primary"
        >
          Back to Language
        </button>
      </div>
    );
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const currentDraft = draftId ? storage.getEnglishDraftById(draftId) : null;
  const showViewMarking = currentDraft?.result?.isSelfMark === true;

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="button"
          onClick={() => navigate('/english-campus/language')}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Back"
        >
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold truncate" style={{ color: 'rgb(var(--text))' }}>
            {task.title}
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            Paper {task.paper} • {task.type} • {task.timeRecommendationMins} mins recommended
          </p>
        </div>
        {showViewMarking && draftId && (
          <button
            type="button"
            onClick={() => navigate(`/english-campus/language/draft/${draftId}/marking`)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium"
            style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text))' }}
          >
            <Highlighter size={16} />
            View marking
          </button>
        )}
      </div>

      {/* Task prompt */}
      <div
        className="rounded-xl border p-4"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <p className="font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
          {task.prompt}
        </p>
        {task.stimulus && (
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            {task.stimulus}
          </p>
        )}
        {task.audiencePurpose && (
          <p className="text-xs mt-2" style={{ color: 'rgb(var(--muted))' }}>
            Audience & purpose: {task.audiencePurpose}
          </p>
        )}
      </div>

      {/* Toolbar: word count, timer, buttons */}
      <div
        className="rounded-xl border px-4 py-3 flex flex-wrap items-center gap-4"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <span className="text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
          {wordCount} words · {paragraphCount} paragraph{paragraphCount !== 1 ? 's' : ''}
        </span>
        <span className="text-sm font-mono" style={{ color: 'rgb(var(--text))' }}>
          Timer: {formatTime(elapsedSec)}
        </span>
        <div className="flex gap-2 ml-auto">
          <button
            type="button"
            onClick={() => setShowChecklist(!showChecklist)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${showChecklist ? 'text-white' : ''}`}
            style={showChecklist ? { background: 'var(--gradient-primary)' } : { background: 'rgb(var(--surface-2))', color: 'rgb(var(--text))' }}
          >
            <CheckSquare size={16} />
            Top Band Checklist {tickCount > 0 && `(${coveragePct}%)`}
          </button>
          <button
            type="button"
            onClick={() => setShowMarkScheme(!showMarkScheme)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium"
            style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text))' }}
          >
            <BookOpen size={16} />
            Mark scheme
          </button>
          <button
            type="button"
            onClick={() => setShowModels(!showModels)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium"
            style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text))' }}
          >
            <FileText size={16} />
            Model answers
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main editor */}
        <div className="flex-1 min-w-0">
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="Start writing here…"
            className="w-full min-h-[320px] rounded-xl border p-4 text-base resize-y focus:outline-none focus:ring-2"
            style={{
              background: 'rgb(var(--surface))',
              borderColor: 'rgb(var(--border))',
              color: 'rgb(var(--text))',
            }}
          />
          <div className="mt-4 flex gap-3 items-center">
            <button
              type="button"
              onClick={() => {
                saveDraftAsNewSnapshot();
                setSaveFeedback(true);
                setTimeout(() => setSaveFeedback(false), 2000);
              }}
              className="btn-ghost text-sm"
            >
              {saveFeedback ? 'Saved!' : 'Save draft'}
            </button>
            {saveFeedback && (
              <span className="text-sm" style={{ color: 'rgb(var(--muted))' }}>
                New snapshot saved – previous drafts kept in My drafts
              </span>
            )}
            <button
              type="button"
              onClick={handleSubmit}
              className="btn-primary"
            >
              Submit for marking
            </button>
          </div>
        </div>

        {/* Side panel: checklist / mark scheme / models */}
        {(showChecklist || showMarkScheme || showModels) && (
          <div
            className="lg:w-80 rounded-xl border p-4 shrink-0"
            style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
          >
            {showChecklist && (
              <div className="mb-4">
                <h3 className="font-bold mb-2 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
                  <PanelRightOpen size={18} />
                  Top Band Coverage: {coveragePct}%
                </h3>
                <ul className="space-y-2">
                  {QUICK_CHECKLIST.map(item => (
                    <li key={item.id} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setChecklistTicks(prev => ({ ...prev, [item.id]: !prev[item.id] }))
                        }
                        className="w-5 h-5 rounded border flex items-center justify-center text-sm"
                        style={{
                          borderColor: 'rgb(var(--border))',
                          background: checklistTicks[item.id] ? 'rgb(var(--accent))' : 'transparent',
                          color: checklistTicks[item.id] ? 'white' : 'rgb(var(--text))',
                        }}
                      >
                        {checklistTicks[item.id] ? '✓' : ''}
                      </button>
                      <span className="text-sm" style={{ color: 'rgb(var(--text))' }}>
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {showMarkScheme && (
              <div className="mb-4">
                <h3 className="font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
                  Mark scheme
                </h3>
                <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {task.markSchemeSummary}
                </p>
              </div>
            )}
            {showModels && (
              <div>
                <h3 className="font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
                  Model answers
                </h3>
                <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                  Grade 4, 6, 8 and 9 model answers for this task will appear here. Add them via the task bank in a future update.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
