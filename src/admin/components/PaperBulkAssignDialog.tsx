/**
 * Paper Bulk Assign Dialog Component
 * 
 * Dialog for bulk assigning prompts to a paper
 * Used in Topics and Units tabs
 */

import { useState } from 'react';
import { Paper } from '../../types';
import { X, Loader } from 'lucide-react';

interface PaperBulkAssignDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAssign: (paperId: string, onlyUnassigned: boolean) => Promise<number>;
  papers: Paper[];
  title: string;
  description: string;
}

export function PaperBulkAssignDialog({
  isOpen,
  onClose,
  onAssign,
  papers,
  title,
  description,
}: PaperBulkAssignDialogProps) {
  const [selectedPaperId, setSelectedPaperId] = useState<string>('');
  const [onlyUnassigned, setOnlyUnassigned] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const handleAssign = async () => {
    if (!selectedPaperId) return;

    setIsLoading(true);
    try {
      const count = await onAssign(selectedPaperId, onlyUnassigned);
      setResult(count);
      setTimeout(() => {
        onClose();
        setSelectedPaperId('');
        setOnlyUnassigned(true);
        setResult(null);
      }, 1500);
    } catch (error) {
      console.error('Failed to assign paper:', error);
      alert('Failed to assign paper. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{description}</p>

        {result !== null ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
            <p className="text-green-800 dark:text-green-200 font-medium">
              ✅ Successfully assigned {result} question{result !== 1 ? 's' : ''}
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Paper
                </label>
                <select
                  value={selectedPaperId}
                  onChange={(e) => setSelectedPaperId(e.target.value)}
                  className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">Choose a paper...</option>
                  {papers.map(paper => (
                    <option key={paper.id} value={paper.id}>
                      Paper {paper.paperNumber}: {paper.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="onlyUnassigned"
                  checked={onlyUnassigned}
                  onChange={(e) => setOnlyUnassigned(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
                />
                <label htmlFor="onlyUnassigned" className="text-sm text-gray-700 dark:text-gray-300">
                  Only assign unassigned questions
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                disabled={!selectedPaperId || isLoading}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                {isLoading && <Loader size={18} className="animate-spin" />}
                Assign
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
