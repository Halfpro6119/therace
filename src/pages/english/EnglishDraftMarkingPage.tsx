import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Pencil, Check, X } from 'lucide-react';
import { storage } from '../../utils/storage';
import { SelfMarkAnnotator } from '../../components/english/SelfMarkAnnotator';
import type { SelfMarkAnnotations } from '../../types/englishCampus';

const defaultAnnotations: SelfMarkAnnotations = { spans: [], ticks: [], notes: [] };

export function EnglishDraftMarkingPage() {
  const { draftId } = useParams<{ draftId: string }>();
  const navigate = useNavigate();
  const draft = draftId ? storage.getEnglishDraftById(draftId) : null;

  const [isEditing, setIsEditing] = useState(false);
  const [editableAnnotations, setEditableAnnotations] = useState<SelfMarkAnnotations>(() =>
    draft?.result?.selfMarkAnnotations
      ? {
          spans: (draft.result.selfMarkAnnotations.spans ?? []).map(s => ({ ...s })),
          ticks: (draft.result.selfMarkAnnotations.ticks ?? []).map(t => ({ ...t })),
          notes: (draft.result.selfMarkAnnotations.notes ?? []).map(n => ({ ...n })),
        }
      : defaultAnnotations
  );

  if (!draftId || !draft) {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <p style={{ color: 'rgb(var(--text-secondary))' }}>Draft not found.</p>
        <button
          type="button"
          onClick={() => navigate('/english-campus/language/drafts')}
          className="mt-4 btn-primary"
        >
          Back to My drafts
        </button>
      </div>
    );
  }

  const annotations = isEditing
    ? editableAnnotations
    : (draft.result?.selfMarkAnnotations ?? defaultAnnotations);
  const hasAnnotations =
    annotations.spans.length > 0 || annotations.ticks.length > 0 || annotations.notes.length > 0;

  const handleStartEditing = () => {
    const current = draft.result?.selfMarkAnnotations ?? defaultAnnotations;
    setEditableAnnotations({
      spans: (current.spans ?? []).map(s => ({ ...s })),
      ticks: (current.ticks ?? []).map(t => ({ ...t })),
      notes: (current.notes ?? []).map(n => ({ ...n })),
    });
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    setIsEditing(false);
    const current = draft.result?.selfMarkAnnotations ?? defaultAnnotations;
    setEditableAnnotations({
      spans: (current.spans ?? []).map(s => ({ ...s })),
      ticks: (current.ticks ?? []).map(t => ({ ...t })),
      notes: (current.notes ?? []).map(n => ({ ...n })),
    });
  };

  const handleSaveEditing = () => {
    if (!draft.result) return;
    const updated = storage.getEnglishDraftById(draftId);
    if (!updated) return;
    const newResult = {
      ...updated.result!,
      selfMarkAnnotations: {
        spans: editableAnnotations.spans.map(s => ({ ...s })),
        ticks: editableAnnotations.ticks.map(t => ({ ...t })),
        notes: editableAnnotations.notes.map(n => ({ ...n })),
      },
    };
    storage.saveEnglishDraft({ ...updated, result: newResult, updatedAt: new Date().toISOString() });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 flex-wrap">
        <button
          type="button"
          onClick={() => navigate('/english-campus/language/drafts')}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Back"
        >
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            {isEditing ? 'Edit marking' : 'View marking'}
          </h1>
          <p className="text-sm truncate" style={{ color: 'rgb(var(--text-secondary))' }}>
            {draft.taskTitle}
          </p>
        </div>
        {draft.result?.isSelfMark && !isEditing && (
          <button
            type="button"
            onClick={handleStartEditing}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium"
            style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text))' }}
          >
            <Pencil size={16} />
            Edit marking
          </button>
        )}
        {isEditing && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCancelEditing}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium btn-ghost"
            >
              <X size={16} />
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSaveEditing}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium btn-primary"
            >
              <Check size={16} />
              Save changes
            </button>
          </div>
        )}
      </div>

      {draft.result && (
        <div
          className="rounded-xl border p-4"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <h2 className="font-bold mb-2 text-sm" style={{ color: 'rgb(var(--text))' }}>
            Result
          </h2>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            {draft.result.bandLevel}
            {draft.result.marks != null && ` (${draft.result.marks}/${draft.result.maxMarks ?? 40})`}
            {draft.result.isSelfMark && ' · Self-mark'}
          </p>
          {draft.result.targets?.length > 0 && (
            <p className="text-xs mt-1" style={{ color: 'rgb(var(--muted))' }}>
              Targets: {draft.result.targets.join('; ')}
            </p>
          )}
        </div>
      )}

      <div
        className="rounded-xl border p-4"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <h2 className="font-bold mb-2 text-sm" style={{ color: 'rgb(var(--text))' }}>
          {hasAnnotations ? 'Marked draft' : 'Draft'}
          {isEditing && ' (editing)'}
        </h2>
        <SelfMarkAnnotator
          content={draft.content}
          annotations={annotations}
          onChange={setEditableAnnotations}
          readOnly={!isEditing}
        />
      </div>
    </div>
  );
}
