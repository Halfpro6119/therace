/**
 * Modal to edit a prompt in admin view with Save draft / Cancel / Push live.
 */

import { useState } from 'react';
import { X, Save, Upload, Trash2 } from 'lucide-react';
import type { Prompt } from '../../types';

interface AdminPromptEditModalProps {
  prompt: Prompt;
  onClose: () => void;
  onSaveDraft: (payload: Partial<Prompt>) => Promise<void>;
  onCancelDraft: () => Promise<void>;
  onPushLive: (payload: Partial<Prompt>) => Promise<void>;
  hasExistingDraft: boolean;
}

export function AdminPromptEditModal({
  prompt,
  onClose,
  onSaveDraft,
  onCancelDraft,
  onPushLive,
  hasExistingDraft,
}: AdminPromptEditModalProps) {
  const [form, setForm] = useState<Partial<Prompt>>({
    question: prompt.question,
    answers: prompt.answers ?? [],
    hint: prompt.hint,
    explanation: prompt.explanation,
    marks: prompt.marks,
    timeAllowanceSec: prompt.timeAllowanceSec,
    type: prompt.type,
  });
  const [saving, setSaving] = useState(false);

  const handleSaveDraft = async () => {
    const filteredAnswers = (form.answers ?? []).filter((a) => a.trim());
    if (filteredAnswers.length === 0) return;
    setSaving(true);
    try {
      await onSaveDraft({ ...form, answers: filteredAnswers });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const handlePushLive = async () => {
    const filteredAnswers = (form.answers ?? []).filter((a) => a.trim());
    if (filteredAnswers.length === 0) return;
    setSaving(true);
    try {
      await onPushLive({ ...form, answers: filteredAnswers });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  const handleCancelDraft = async () => {
    setSaving(true);
    try {
      await onCancelDraft();
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Edit question (admin)</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Question</label>
            <textarea
              value={form.question ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Answers (one per line)</label>
            <div className="space-y-2">
              {(form.answers ?? []).map((answer, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={answer}
                  onChange={(e) => {
                    const newAnswers = [...(form.answers ?? [])];
                    newAnswers[idx] = e.target.value;
                    setForm((f) => ({ ...f, answers: newAnswers }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder={`Answer ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hint</label>
            <input
              type="text"
              value={form.hint ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, hint: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Explanation</label>
            <textarea
              value={form.explanation ?? ''}
              onChange={(e) => setForm((f) => ({ ...f, explanation: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Marks</label>
              <input
                type="number"
                min={1}
                value={form.marks ?? ''}
                onChange={(e) =>
                  setForm((f) => ({ ...f, marks: e.target.value ? parseInt(e.target.value, 10) : undefined }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time (sec)</label>
              <input
                type="number"
                min={0}
                value={form.timeAllowanceSec ?? ''}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    timeAllowanceSec: e.target.value ? parseInt(e.target.value, 10) : undefined,
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex flex-wrap gap-2 justify-end bg-white dark:bg-gray-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Close
          </button>
          {hasExistingDraft && (
            <button
              type="button"
              onClick={handleCancelDraft}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 border border-amber-500/50 rounded-lg text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 disabled:opacity-50"
            >
              <Trash2 size={16} />
              Discard draft
            </button>
          )}
          <button
            type="button"
            onClick={handleSaveDraft}
            disabled={saving || (form.answers ?? []).filter((a) => a.trim()).length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium disabled:opacity-50"
          >
            <Save size={16} />
            Save draft
          </button>
          <button
            type="button"
            onClick={handlePushLive}
            disabled={saving || (form.answers ?? []).filter((a) => a.trim()).length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:opacity-50"
          >
            <Upload size={16} />
            Push live
          </button>
        </div>
      </div>
    </div>
  );
}
