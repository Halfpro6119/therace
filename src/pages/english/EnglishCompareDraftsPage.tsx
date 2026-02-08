import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Highlighter, Pencil, FileText, Check, X } from 'lucide-react';
import { storage } from '../../utils/storage';
import { SelfMarkAnnotator } from '../../components/english/SelfMarkAnnotator';
import type { EnglishWritingDraft, SelfMarkAnnotations } from '../../types/englishCampus';

const defaultAnnotations: SelfMarkAnnotations = { spans: [], ticks: [], notes: [] };

function copyAnnotations(a: SelfMarkAnnotations): SelfMarkAnnotations {
  return {
    spans: (a.spans ?? []).map(s => ({ ...s })),
    ticks: (a.ticks ?? []).map(t => ({ ...t })),
    notes: (a.notes ?? []).map(n => ({ ...n })),
  };
}

function ComparePanel({
  draft,
  showMarking,
  onToggleMarking,
  onEditMarking,
  isEditing,
  editingAnnotations,
  onEditingAnnotationsChange,
  onSaveEdit,
  onCancelEdit,
}: {
  draft: EnglishWritingDraft;
  showMarking: boolean;
  onToggleMarking: () => void;
  onEditMarking: () => void;
  isEditing: boolean;
  editingAnnotations: SelfMarkAnnotations | null;
  onEditingAnnotationsChange: (a: SelfMarkAnnotations) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
}) {
  const isSelfMarked = draft.result?.isSelfMark === true;
  const annotations = draft.result?.selfMarkAnnotations ?? defaultAnnotations;
  const hasAnnotations =
    annotations.spans.length > 0 || annotations.ticks.length > 0 || annotations.notes.length > 0;
  const showMarkedContent = isSelfMarked && showMarking && hasAnnotations && !isEditing;
  const displayAnnotations = isEditing && editingAnnotations ? editingAnnotations : annotations;

  return (
    <div
      className="rounded-xl border p-4"
      style={{
        background: 'rgb(var(--surface))',
        borderColor: isEditing ? 'rgb(var(--accent))' : 'rgb(var(--border))',
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
        <h3 className="font-bold text-sm" style={{ color: 'rgb(var(--text))' }}>
          {draft.taskTitle}
          {isEditing && (
            <span className="ml-2 text-xs font-normal" style={{ color: 'rgb(var(--muted))' }}>
              (editing)
            </span>
          )}
        </h3>
        {!isEditing && (
          <div className="flex items-center gap-1">
            {isSelfMarked && (
              <>
                <button
                  type="button"
                  onClick={onToggleMarking}
                  className="shrink-0 flex items-center gap-1 text-xs font-medium px-2 py-1 rounded"
                  style={{ color: 'rgb(var(--accent))', background: 'rgb(var(--surface-2))' }}
                >
                  {showMarkedContent ? (
                    <>
                      <FileText size={14} />
                      Plain text
                    </>
                  ) : (
                    <>
                      <Highlighter size={14} />
                      View marking
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onEditMarking}
                  className="shrink-0 flex items-center gap-1 text-xs font-medium px-2 py-1 rounded"
                  style={{ color: 'rgb(var(--accent))', background: 'rgb(var(--surface-2))' }}
                >
                  <Pencil size={14} />
                  Edit marking
                </button>
              </>
            )}
            {!isSelfMarked && (
              <button
                type="button"
                onClick={onEditMarking}
                className="shrink-0 flex items-center gap-1 text-xs font-medium px-2 py-1 rounded"
                style={{ color: 'rgb(var(--accent))', background: 'rgb(var(--surface-2))' }}
              >
                <Highlighter size={14} />
                Add marking
              </button>
            )}
          </div>
        )}
        {isEditing && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={onCancelEdit}
              className="shrink-0 flex items-center gap-1 text-xs font-medium px-2 py-1 rounded btn-ghost"
            >
              <X size={14} />
              Cancel
            </button>
            <button
              type="button"
              onClick={onSaveEdit}
              className="shrink-0 flex items-center gap-1 text-xs font-medium px-2 py-1 rounded btn-primary"
            >
              <Check size={14} />
              Save
            </button>
          </div>
        )}
      </div>
      <p className="text-xs mb-2" style={{ color: 'rgb(var(--muted))' }}>
        {new Date(draft.updatedAt).toLocaleString()} · {draft.wordCount} words
      </p>
      {isEditing && editingAnnotations ? (
        <div className="min-h-[280px] max-h-[60vh] overflow-y-auto">
          <SelfMarkAnnotator
            content={draft.content}
            annotations={editingAnnotations}
            onChange={onEditingAnnotationsChange}
            readOnly={false}
          />
        </div>
      ) : showMarkedContent ? (
        <div className="min-h-[280px] max-h-[60vh] overflow-y-auto">
          <SelfMarkAnnotator
            content={draft.content}
            annotations={displayAnnotations}
            onChange={() => {}}
            readOnly
          />
        </div>
      ) : (
        <div
          className="text-sm whitespace-pre-wrap min-h-[280px] max-h-[60vh] overflow-y-auto"
          style={{ color: 'rgb(var(--text-secondary))' }}
        >
          {draft.content || '(No content)'}
        </div>
      )}
    </div>
  );
}

function draftLabel(draft: EnglishWritingDraft): string {
  const date = new Date(draft.updatedAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${draft.taskTitle} · ${date} · ${draft.wordCount} words`;
}

export function EnglishCompareDraftsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { draftId?: string } | undefined;
  const initialDraftId = state?.draftId ?? null;

  const drafts = useMemo(() => storage.getEnglishDrafts(), []);
  const [leftId, setLeftId] = useState<string | ''>(initialDraftId ?? '');
  const [rightId, setRightId] = useState<string | ''>('');
  const [leftShowMarking, setLeftShowMarking] = useState(true);
  const [rightShowMarking, setRightShowMarking] = useState(true);
  const [editingDraftId, setEditingDraftId] = useState<string | null>(null);
  const [editingAnnotations, setEditingAnnotations] = useState<SelfMarkAnnotations | null>(null);

  const leftDraft = leftId ? storage.getEnglishDraftById(leftId) : null;
  const rightDraft = rightId ? storage.getEnglishDraftById(rightId) : null;
  const canCompare = leftDraft && rightDraft && leftId !== rightId;

  const startEditing = (draft: EnglishWritingDraft) => {
    setEditingDraftId(draft.id);
    setEditingAnnotations(copyAnnotations(draft.result?.selfMarkAnnotations ?? defaultAnnotations));
  };

  const saveEditing = () => {
    if (!editingDraftId || !editingAnnotations) return;
    const draft = storage.getEnglishDraftById(editingDraftId);
    if (!draft) return;
    const result = draft.result
      ? { ...draft.result, selfMarkAnnotations: copyAnnotations(editingAnnotations) }
      : {
          bandLevel: 'Not set',
          isSelfMark: true,
          strengths: [] as string[],
          targets: [] as string[],
          selfMarkAnnotations: copyAnnotations(editingAnnotations),
        };
    storage.saveEnglishDraft({
      ...draft,
      result,
      updatedAt: new Date().toISOString(),
    });
    setEditingDraftId(null);
    setEditingAnnotations(null);
  };

  const cancelEditing = () => {
    setEditingDraftId(null);
    setEditingAnnotations(null);
  };

  useEffect(() => {
    if (editingDraftId && editingDraftId !== leftId && editingDraftId !== rightId) {
      setEditingDraftId(null);
      setEditingAnnotations(null);
    }
  }, [editingDraftId, leftId, rightId]);

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/english-campus/language/drafts')}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Back"
        >
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
        </button>
        <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>
          Compare drafts
        </h1>
      </div>

      {drafts.length < 2 ? (
        <div
          className="rounded-xl border p-6 text-center"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
            You need at least two drafts to compare. Save more snapshots from a writing task, or complete different tasks, then come back.
          </p>
          <button type="button" onClick={() => navigate('/english-campus/language/drafts')} className="btn-primary">
            Go to My drafts
          </button>
        </div>
      ) : (
        <>
          <div
            className="rounded-xl border p-4 flex flex-wrap items-end gap-4"
            style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
          >
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                First draft
              </label>
              <select
                value={leftId}
                onChange={e => setLeftId(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2"
                style={{
                  background: 'rgb(var(--surface-2))',
                  borderColor: 'rgb(var(--border))',
                  color: 'rgb(var(--text))',
                }}
              >
                <option value="">— Select a draft —</option>
                {drafts.map(d => (
                  <option key={d.id} value={d.id}>
                    {draftLabel(d)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                Second draft (to compare with)
              </label>
              <select
                value={rightId}
                onChange={e => setRightId(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2"
                style={{
                  background: 'rgb(var(--surface-2))',
                  borderColor: 'rgb(var(--border))',
                  color: 'rgb(var(--text))',
                }}
              >
                <option value="">— Select a draft —</option>
                {drafts.map(d => (
                  <option key={d.id} value={d.id} disabled={d.id === leftId}>
                    {d.id === leftId ? `${draftLabel(d)} (same as first)` : draftLabel(d)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {leftId && rightId && leftId === rightId && (
            <p className="text-sm" style={{ color: 'rgb(var(--muted))' }}>
              Choose two different drafts to compare them side by side.
            </p>
          )}

          {canCompare && leftDraft && rightDraft && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ComparePanel
                draft={leftDraft}
                showMarking={leftShowMarking}
                onToggleMarking={() => setLeftShowMarking(v => !v)}
                onEditMarking={() => startEditing(leftDraft)}
                isEditing={editingDraftId === leftDraft.id}
                editingAnnotations={editingDraftId === leftDraft.id ? editingAnnotations : null}
                onEditingAnnotationsChange={setEditingAnnotations}
                onSaveEdit={saveEditing}
                onCancelEdit={cancelEditing}
              />
              <ComparePanel
                draft={rightDraft}
                showMarking={rightShowMarking}
                onToggleMarking={() => setRightShowMarking(v => !v)}
                onEditMarking={() => startEditing(rightDraft)}
                isEditing={editingDraftId === rightDraft.id}
                editingAnnotations={editingDraftId === rightDraft.id ? editingAnnotations : null}
                onEditingAnnotationsChange={setEditingAnnotations}
                onSaveEdit={saveEditing}
                onCancelEdit={cancelEditing}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
