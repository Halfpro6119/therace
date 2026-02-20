/**
 * Admin subject toolkit: list all prompts for a hub and edit each via AdminPromptEditModal.
 * Rendered at /admin-view/[hubPath] (e.g. /admin-view/maths-mastery).
 */

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, FileText, Loader2 } from 'lucide-react';
import type { Prompt } from '../../types';
import type { SubjectHub } from '../../config/subjectGroups';
import { db } from '../../db/client';
import { useAdminView } from '../../contexts/AdminViewContext';
import { AdminPromptEditModal } from '../../components/admin-view/AdminPromptEditModal';

const PREVIEW_LEN = 80;

interface AdminSubjectToolkitPageProps {
  hub: SubjectHub;
}

export function AdminSubjectToolkitPage({ hub }: AdminSubjectToolkitPageProps) {
  const adminView = useAdminView();
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [loadingPrompt, setLoadingPrompt] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const subjects = await db.getSubjects();
        const nameSet = new Set(hub.subjectNames.map((n) => n.toLowerCase()));
        const subjectIds = subjects
          .filter((s) => nameSet.has(s.name.toLowerCase()))
          .map((s) => s.id);
        if (subjectIds.length === 0) {
          if (!cancelled) setPrompts([]);
          return;
        }
        const perSubject = await Promise.all(
          subjectIds.map((id) => db.getPromptsBySubject(id))
        );
        const merged = perSubject.flat();
        if (!cancelled) setPrompts(merged);
      } catch (e) {
        console.error('Failed to load prompts for hub', hub.id, e);
        if (!cancelled) setPrompts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [hub.id, hub.subjectNames]);

  const openEdit = async (prompt: Prompt) => {
    if (!adminView) return;
    setLoadingPrompt(true);
    try {
      const effective = await adminView.getEffectivePrompt(prompt.id);
      setEditingPrompt(effective ?? prompt);
    } finally {
      setLoadingPrompt(false);
    }
  };

  const handleCloseModal = () => {
    setEditingPrompt(null);
  };

  if (!adminView) {
    return (
      <div className="max-w-4xl mx-auto p-6 pt-20">
        <p className="text-gray-500">Not in admin view.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pt-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {hub.title} – Question toolkit
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {hub.subtitle}
          </p>
        </div>
        <Link
          to="/admin-view/subjects"
          className="text-sm text-amber-600 dark:text-amber-400 hover:underline"
        >
          ← Back to subjects
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 py-8">
          <Loader2 size={20} className="animate-spin" />
          <span>Loading questions…</span>
        </div>
      ) : prompts.length === 0 ? (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 text-center text-gray-500 dark:text-gray-400">
          <FileText size={40} className="mx-auto mb-3 opacity-50" />
          <p>No questions found for this hub.</p>
          <p className="text-sm mt-1">
            Add content via the main admin panel, then return here to edit.
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {prompts.map((prompt) => {
            const preview =
              prompt.question.replace(/\s+/g, ' ').slice(0, PREVIEW_LEN) +
              (prompt.question.length > PREVIEW_LEN ? '…' : '');
            return (
              <li
                key={prompt.id}
                className="flex items-center gap-3 p-4 rounded-xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white truncate">
                    {preview}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <span>{prompt.type}</span>
                    <span>{prompt.marks ?? 0} marks</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => openEdit(prompt)}
                  disabled={loadingPrompt}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 hover:bg-amber-500/30 font-medium text-sm disabled:opacity-50"
                  title="Edit question"
                >
                  {loadingPrompt && editingPrompt?.id === prompt.id ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Edit2 size={16} />
                  )}
                  Edit
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {editingPrompt && (
        <AdminPromptEditModal
          prompt={editingPrompt}
          onClose={handleCloseModal}
          hasExistingDraft={adminView.draftEntries.some(
            (e) =>
              e.entityType === 'prompt' && e.entityId === editingPrompt.id
          )}
          onSaveDraft={async (payload) => {
            await adminView.saveDraft('prompt', editingPrompt.id, {
              ...editingPrompt,
              ...payload,
            });
            const next = await adminView.getEffectivePrompt(editingPrompt.id);
            if (next) setEditingPrompt(next);
            handleCloseModal();
          }}
          onCancelDraft={async () => {
            await adminView.cancelDraft('prompt', editingPrompt.id);
            handleCloseModal();
          }}
          onPushLive={async (payload) => {
            await adminView.saveDraft('prompt', editingPrompt.id, {
              ...editingPrompt,
              ...payload,
            });
            await adminView.pushDraftLive('prompt', editingPrompt.id);
            handleCloseModal();
          }}
        />
      )}
    </div>
  );
}
