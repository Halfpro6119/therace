/**
 * Admin page to delete all Maths Gold Questions before re-importing
 */

import { useState } from 'react';
import { Trash2, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { useConfirm } from '../contexts/ConfirmContext';
import { deleteGoldQuestions } from './deleteGoldQuestions';

export function DeleteGoldQuestionsPage() {
  const { success, error: showError } = useToast();
  const { confirm } = useConfirm();
  const [deleting, setDeleting] = useState(false);
  const [result, setResult] = useState<{ deleted: number; errors: string[] } | null>(null);

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: 'Delete Gold Questions',
      message: 'This will delete all 59 Maths Gold Questions (F01-F27, H01-H32). This action cannot be undone. Are you sure?',
    });

    if (!confirmed) return;

    setDeleting(true);
    setResult(null);

    try {
      const deleteResult = await deleteGoldQuestions();
      setResult(deleteResult);

      if (deleteResult.errors.length > 0) {
        showError(`Deleted ${deleteResult.deleted} questions, but ${deleteResult.errors.length} errors occurred`);
      } else {
        success(`Successfully deleted ${deleteResult.deleted} gold questions`);
      }
    } catch (error) {
      showError(`Failed to delete gold questions: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Delete Maths Gold Questions
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Delete all imported Maths Gold Questions (F01-F27, H01-H32) before re-importing with diagrams.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Warning
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This will permanently delete all 59 Maths Gold Questions from the database. Make sure you have the JSON file ready to re-import.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>Foundation questions: F01-F27 (27 questions)</li>
              <li>Higher questions: H01-H32 (32 questions)</li>
              <li>Total: 59 questions</li>
            </ul>
          </div>
        </div>
      </div>

      <button
        onClick={handleDelete}
        disabled={deleting}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
      >
        {deleting ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Deleting...
          </>
        ) : (
          <>
            <Trash2 className="w-5 h-5" />
            Delete All Gold Questions
          </>
        )}
      </button>

      {result && (
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              {result.errors.length === 0 ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <AlertCircle className="w-6 h-6 text-yellow-500" />
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Delete Results
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Deleted: <strong>{result.deleted}</strong> questions
              </p>
              {result.errors.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">
                    Errors ({result.errors.length}):
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {result.errors.map((error, idx) => (
                      <li key={idx}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-sm text-blue-700 dark:text-blue-300">
          <strong>Next steps:</strong> After deleting, go to the JSON Import page and re-import the questions from{' '}
          <code className="bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 rounded">MATHS_GOLD_QUESTIONS.json</code>.
          The diagrams will now be stored correctly.
        </p>
      </div>
    </div>
  );
}
