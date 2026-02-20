/**
 * Lists all content drafts (prompts and diagrams) for admin view.
 * Shows drafts (publish or discard) and published change history (revert to previous version).
 */

import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Image, Upload, RotateCcw, Loader2, History } from 'lucide-react';
import { useAdminView } from '../../contexts/AdminViewContext';
import { useConfirm } from '../../contexts/ConfirmContext';

type PublishHistoryEntry = { id: string; entityType: 'prompt' | 'diagram'; entityId: string; publishedAt: string; previewText: string | null };

function formatDraftDate(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  if (sameDay) {
    return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  }
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function AdminViewDraftsPage() {
  const ctx = useAdminView();
  const { confirm } = useConfirm();
  const [pushing, setPushing] = useState<string | null>(null);
  const [revertingDraft, setRevertingDraft] = useState<string | null>(null);
  const [publishHistory, setPublishHistory] = useState<PublishHistoryEntry[]>([]);
  const [revertingPublishId, setRevertingPublishId] = useState<string | null>(null);

  const loadHistory = useCallback(async () => {
    if (!ctx) return;
    const list = await ctx.getPublishHistory(100);
    setPublishHistory(list);
  }, [ctx]);

  useEffect(() => {
    ctx?.refreshDraftEntries();
  }, [ctx]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  if (!ctx) {
    return (
      <div className="p-8">
        <p className="text-gray-500">Not in admin view.</p>
      </div>
    );
  }

  const handlePushLive = async (entityType: 'prompt' | 'diagram', entityId: string, preview?: string) => {
    const ok = await confirm({
      title: 'Publish this change?',
      message: preview
        ? `"${preview.slice(0, 60)}${preview.length > 60 ? '…' : ''}" will replace the published version.`
        : `This draft will replace the published ${entityType}.`,
      confirmLabel: 'Publish',
      cancelLabel: 'Cancel',
    });
    if (!ok) return;
    setPushing(`${entityType}:${entityId}`);
    try {
      await ctx.pushDraftLive(entityType, entityId);
      await ctx.refreshDraftEntries();
      await loadHistory();
    } finally {
      setPushing(null);
    }
  };

  const handleDiscardDraft = async (entityType: 'prompt' | 'diagram', entityId: string) => {
    const ok = await confirm({
      title: 'Discard this draft?',
      message: 'This will delete the draft. The published version will stay as-is.',
      confirmLabel: 'Discard draft',
      cancelLabel: 'Cancel',
      destructive: true,
    });
    if (!ok) return;
    setRevertingDraft(`${entityType}:${entityId}`);
    try {
      await ctx.cancelDraft(entityType, entityId);
      await ctx.refreshDraftEntries();
    } finally {
      setRevertingDraft(null);
    }
  };

  const handleRevertPublish = async (historyId: string) => {
    const ok = await confirm({
      title: 'Revert this published change?',
      message: 'The live content will be restored to the version before you published. This cannot be undone.',
      confirmLabel: 'Revert',
      cancelLabel: 'Cancel',
      destructive: true,
    });
    if (!ok) return;
    setRevertingPublishId(historyId);
    try {
      await ctx.revertPublish(historyId);
      await loadHistory();
    } finally {
      setRevertingPublishId(null);
    }
  };

  const entries = ctx.draftEntries;

  return (
    <div className="max-w-2xl mx-auto p-6 pt-20">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your draft changes</h1>
        <Link
          to="/subjects"
          className="text-sm text-amber-600 dark:text-amber-400 hover:underline"
        >
          ← Back to subjects
        </Link>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
        Unpublished edits. Publish to update the live content, or revert to keep the published version and delete the draft.
      </p>
      {entries.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No drafts. Edit a question or diagram in admin view to save a draft.</p>
      ) : (
        <ul className="space-y-3">
          {entries.map((e) => {
            const key = `${e.entityType}:${e.entityId}`;
            const isPushing = pushing === key;
            const isRevertingDraft = revertingDraft === key;
            const busy = isPushing || isRevertingDraft;
            const Icon = e.entityType === 'prompt' ? FileText : Image;
            return (
              <li
                key={key}
                className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <Icon size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-white capitalize text-sm">{e.entityType}</span>
                      <span className="text-gray-400 dark:text-gray-500 text-xs">{formatDraftDate(e.updatedAt)}</span>
                    </div>
                    {e.preview ? (
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2">{e.preview}</p>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 truncate">{e.entityId}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => handlePushLive(e.entityType, e.entityId, e.preview)}
                    disabled={busy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium disabled:opacity-50"
                    title="Publish this draft to live content"
                  >
                    {isPushing ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                    Publish
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDiscardDraft(e.entityType, e.entityId)}
                    disabled={busy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 hover:text-red-700 text-sm font-medium disabled:opacity-50"
                    title="Delete draft and keep published version"
                  >
                    {isRevertingDraft ? <Loader2 size={14} className="animate-spin" /> : <RotateCcw size={14} />}
                    Discard draft
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Published change history – revert to previous version */}
      <section className="mt-12">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
          <History size={20} className="text-amber-500" />
          Published changes
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          Changes you have already published. Revert to restore the previous version of the content.
        </p>
        {publishHistory.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No published changes yet. When you publish a draft, it will appear here so you can revert if needed.</p>
        ) : (
          <ul className="space-y-3">
            {publishHistory.map((h) => {
              const Icon = h.entityType === 'prompt' ? FileText : Image;
              const busy = revertingPublishId === h.id;
              return (
                <li
                  key={h.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <Icon size={20} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium text-gray-900 dark:text-white capitalize text-sm">{h.entityType}</span>
                        <span className="text-gray-400 dark:text-gray-500 text-xs">{formatDraftDate(h.publishedAt)}</span>
                      </div>
                      {h.previewText ? (
                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2">{h.previewText}</p>
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 truncate">{h.entityId}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={() => handleRevertPublish(h.id)}
                      disabled={busy}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 hover:text-red-700 text-sm font-medium disabled:opacity-50"
                      title="Restore content to the version before this publish"
                    >
                      {busy ? <Loader2 size={14} className="animate-spin" /> : <RotateCcw size={14} />}
                      Revert
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
