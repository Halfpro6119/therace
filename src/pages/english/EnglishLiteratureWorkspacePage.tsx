import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, CheckSquare, FileText, BookOpen, ListOrdered, Zap, Quote } from 'lucide-react';
import { getLiteratureTaskById } from '../../config/goldenEnglishQuestionBank';
import { getGuidePostForLiteratureTask } from '../../config/englishLiteratureGuidePostData';
import { hasModelDrills } from '../../config/literatureModelDrillsData';
import { getStrategicQuotesForTask, hasStrategicQuotesForTask } from '../../config/quotationLabData';
import { storage } from '../../utils/storage';
import type { EnglishLiteratureDraft, EnglishChecklistItem } from '../../types/englishCampus';

const MODEL_GRADES = ['grade4', 'grade6', 'grade8', 'grade9'] as const;
type ModelGradeKey = (typeof MODEL_GRADES)[number];

const DEFAULT_CHECKLIST: EnglishChecklistItem[] = [
  { id: 'lit-1', label: 'I focus on the question throughout', ao: 'AO1' },
  { id: 'lit-2', label: 'I use short, embedded quotations', ao: 'AO1' },
  { id: 'lit-3', label: 'I analyse methods (language/structure)', ao: 'AO2' },
  { id: 'lit-4', label: 'I link techniques to the theme/focus', ao: 'AO2' },
  { id: 'lit-5', label: 'I include context where relevant', ao: 'AO3' },
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

export function EnglishLiteratureWorkspacePage() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const task = taskId ? getLiteratureTaskById(taskId) : null;
  const guidePost = taskId ? getGuidePostForLiteratureTask(taskId) : undefined;

  const [content, setContent] = useState('');
  const [startTime] = useState(() => Date.now());
  const [elapsedSec, setElapsedSec] = useState(0);
  const [showChecklist, setShowChecklist] = useState(false);
  const [showMarkScheme, setShowMarkScheme] = useState(false);
  const [showModels, setShowModels] = useState(false);
  const [checklistTicks, setChecklistTicks] = useState<Record<string, boolean>>({});
  const [draftId, setDraftId] = useState<string | null>(null);
  const [saveFeedback, setSaveFeedback] = useState(false);
  const [modelGrade, setModelGrade] = useState<ModelGradeKey>('grade6');
  const [showMethod, setShowMethod] = useState(true);

  const reopenDraftId = (location.state as { reopenDraftId?: string } | undefined)?.reopenDraftId;

  const checklist = useMemo(
    () => guidePost?.checklistItems ?? DEFAULT_CHECKLIST,
    [guidePost]
  );

  useEffect(() => {
    if (!task) return;
    const existing = reopenDraftId
      ? storage.getEnglishLiteratureDraftById(reopenDraftId)
      : storage.getEnglishLiteratureDrafts().find(d => d.taskId === task.id && !d.result);
    if (existing) {
      setContent(existing.content);
      setDraftId(existing.id);
      if (existing.checklistTicks && checklist.length) {
        const validIds = new Set(checklist.map(c => c.id));
        const ticks: Record<string, boolean> = {};
        existing.checklistTicks.filter(id => validIds.has(id)).forEach(id => (ticks[id] = true));
        setChecklistTicks(ticks);
      }
    }
  }, [task?.id, reopenDraftId, checklist.length]);

  useEffect(() => {
    const t = setInterval(() => setElapsedSec(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(t);
  }, [startTime]);

  const wordCount = countWords(content);
  const paragraphCount = countParagraphs(content);
  const tickCount = Object.values(checklistTicks).filter(Boolean).length;
  const coveragePct = checklist.length ? Math.round((tickCount / checklist.length) * 100) : 0;

  const saveDraft = useCallback(() => {
    if (!task) return;
    const id = draftId ?? `lit-draft-${task.id}-${Date.now()}`;
    const draft: EnglishLiteratureDraft = {
      id,
      taskId: task.id,
      taskTitle: task.title,
      taskType: task.taskType,
      content,
      wordCount,
      createdAt: draftId ? storage.getEnglishLiteratureDraftById(draftId)?.createdAt ?? new Date().toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      checklistTicks: Object.entries(checklistTicks)
        .filter(([, v]) => v)
        .map(([k]) => k),
    };
    storage.saveEnglishLiteratureDraft(draft);
    setDraftId(id);
  }, [task, content, wordCount, checklistTicks, draftId]);

  const saveDraftAsNewSnapshot = useCallback(() => {
    if (!task) return;
    const newId = `lit-draft-${task.id}-${Date.now()}`;
    const draft: EnglishLiteratureDraft = {
      id: newId,
      taskId: task.id,
      taskTitle: task.title,
      taskType: task.taskType,
      content,
      wordCount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      checklistTicks: Object.entries(checklistTicks)
        .filter(([, v]) => v)
        .map(([k]) => k),
    };
    storage.saveEnglishLiteratureDraft(draft);
    setDraftId(newId);
  }, [task, content, wordCount, checklistTicks]);

  useEffect(() => {
    const interval = setInterval(saveDraft, 30000);
    return () => clearInterval(interval);
  }, [saveDraft]);

  const handleSubmit = () => {
    saveDraft();
    storage.updateEnglishWritingStreak();
    navigate('/english-campus/literature/result', {
      state: { draftId: draftId ?? 'new', taskId: task?.id, content, checklistTicks, fromLiterature: true },
    });
  };

  if (!task) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <p className="text-center" style={{ color: 'rgb(var(--text-secondary))' }}>
          Task not found.
        </p>
        <button
          type="button"
          onClick={() => navigate('/english-campus/literature')}
          className="mt-4 mx-auto block btn-primary"
        >
          Back to Literature
        </button>
      </div>
    );
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="button"
          onClick={() => navigate('/english-campus/literature')}
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
            {task.subtitle && `${task.subtitle} · `}
            {task.timeRecommendationMins} mins recommended
          </p>
        </div>
      </div>

      <div
        className="rounded-xl border p-4"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <p className="font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
          {task.prompt}
        </p>
      </div>

      {/* Exam mode: 2–3 strategic quote reminders (no full list) */}
      {taskId && hasStrategicQuotesForTask(taskId) && (() => {
        const hints = getStrategicQuotesForTask(taskId).slice(0, 3);
        if (hints.length === 0) return null;
        return (
          <div
            className="rounded-lg border px-3 py-2 flex flex-wrap items-center gap-2"
            style={{ background: 'rgba(139, 92, 246, 0.08)', borderColor: 'rgba(139, 92, 246, 0.3)' }}
          >
            <Quote size={14} style={{ color: '#8B5CF6' }} />
            <span className="text-xs font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>Quote reminders:</span>
            {hints.map(q => (
              <span key={q.id} className="text-xs italic" style={{ color: 'rgb(var(--text))' }}>
                "{q.quote.length > 40 ? q.quote.slice(0, 40) + '…' : q.quote}"
              </span>
            ))}
          </div>
        );
      })()}

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
            Grade 9 Checklist {tickCount > 0 && `(${coveragePct}%)`}
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
          {taskId && hasModelDrills(taskId) && (
            <button
              type="button"
              onClick={() => navigate(`/english-campus/literature/task/${taskId}/model-drills`)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium"
              style={{ background: 'var(--gradient-primary)', color: 'white' }}
            >
              <Zap size={16} />
              Drills from this model
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
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
                New snapshot saved – see My drafts
              </span>
            )}
            <button type="button" onClick={handleSubmit} className="btn-primary">
              Submit for marking
            </button>
          </div>
        </div>

        {(showChecklist || showMarkScheme || showModels) && (
          <div
            className="lg:w-[22rem] max-h-[calc(100vh-12rem)] overflow-y-auto rounded-xl border p-4 shrink-0"
            style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
          >
            {showChecklist && (
              <div className="mb-4">
                <h3 className="font-bold mb-2 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
                  Grade 9 Coverage: {coveragePct}%
                </h3>
                <ul className="space-y-2">
                  {checklist.map(item => (
                    <li key={item.id} className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setChecklistTicks(prev => ({ ...prev, [item.id]: !prev[item.id] }))
                        }
                        className="w-5 h-5 rounded border flex items-center justify-center text-sm shrink-0"
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
                <p className="text-sm whitespace-pre-line" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {guidePost?.markSchemeDetail ?? 'AO1: Response & evidence. AO2: Language, form & structure. AO3: Context.'}
                </p>
                {guidePost?.stepByStepMethod && (
                  <div className="mt-3 pt-3 border-t" style={{ borderColor: 'rgb(var(--border))' }}>
                    <button
                      type="button"
                      onClick={() => setShowMethod(!showMethod)}
                      className="flex items-center gap-2 text-sm font-semibold mb-2"
                      style={{ color: 'rgb(var(--text))' }}
                    >
                      <ListOrdered size={16} />
                      Step-by-step method {showMethod ? '▼' : '▶'}
                    </button>
                    {showMethod && (
                      <p className="text-sm whitespace-pre-line" style={{ color: 'rgb(var(--text-secondary))' }}>
                        {guidePost.stepByStepMethod}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
            {showModels && (
              <div>
                <h3 className="font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
                  Model answers
                </h3>
                {guidePost?.modelAnswers ? (
                  <>
                    {taskId && hasModelDrills(taskId) && (
                      <p className="text-xs mb-2" style={{ color: 'rgb(var(--muted))' }}>
                        Study → Drills from this model → Write
                      </p>
                    )}
                    <div className="flex gap-1 mb-2 flex-wrap">
                      {MODEL_GRADES.map(g => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setModelGrade(g)}
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{
                            background: modelGrade === g ? 'rgb(var(--accent))' : 'rgb(var(--surface-2))',
                            color: modelGrade === g ? 'white' : 'rgb(var(--text))',
                          }}
                        >
                          Grade {g.replace('grade', '')}
                        </button>
                      ))}
                    </div>
                    <div
                      className="text-sm whitespace-pre-line rounded border p-3 max-h-64 overflow-y-auto"
                      style={{ color: 'rgb(var(--text-secondary))', borderColor: 'rgb(var(--border))' }}
                    >
                      {guidePost.modelAnswers[modelGrade]}
                    </div>
                  </>
                ) : (
                  <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                    Grade 4, 6, 8 and 9 model answers for this task will appear here when available.
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
