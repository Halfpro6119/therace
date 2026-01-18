import { Quiz, Prompt } from '../../types';
import { validateCoverage, getExpectedPromptsForQuiz } from '../contentOpsUtils';
import { X, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

interface CoverageAuditDrawerProps {
  quiz: Quiz;
  prompts: Prompt[];
  onClose: () => void;
  onSync: () => void;
}

export function CoverageAuditDrawer({
  quiz,
  prompts,
  onClose,
  onSync,
}: CoverageAuditDrawerProps) {
  const expectedIds = getExpectedPromptsForQuiz(quiz, prompts);
  const validation = validateCoverage(quiz, expectedIds, prompts);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-end">
      <div className="bg-white dark:bg-gray-800 w-full max-w-2xl h-full overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Coverage Audit</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{quiz.title}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-4">
              {validation.isValid ? (
                <CheckCircle size={24} className="text-green-500" />
              ) : (
                <AlertCircle size={24} className="text-yellow-500" />
              )}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {validation.isValid ? 'Coverage is Valid' : 'Coverage Mismatch Detected'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {validation.isValid
                    ? 'This quiz correctly includes all prompts in its scope'
                    : 'This quiz has missing or extra prompts'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">Expected Prompts:</span>
                <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                  {validation.expectedPromptIds.length}
                </span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">Actual Prompts:</span>
                <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                  {validation.actualPromptIds.length}
                </span>
              </div>
              {validation.missingPrompts.length > 0 && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Missing:</span>
                  <span className="ml-2 font-semibold text-red-600 dark:text-red-400">
                    {validation.missingPrompts.length}
                  </span>
                </div>
              )}
              {validation.extraPrompts.length > 0 && (
                <div>
                  <span className="text-gray-600 dark:text-gray-400">Extra:</span>
                  <span className="ml-2 font-semibold text-yellow-600 dark:text-yellow-400">
                    {validation.extraPrompts.length}
                  </span>
                </div>
              )}
            </div>

            {!validation.isValid && (
              <button
                onClick={onSync}
                className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
              >
                <RefreshCw size={16} />
                Sync Coverage Now
              </button>
            )}
          </div>

          {validation.missingPrompts.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Missing Prompts ({validation.missingPrompts.length})
              </h3>
              <div className="space-y-3">
                {validation.missingPrompts.map((prompt) => (
                  <div
                    key={prompt.id}
                    className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle size={18} className="text-red-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-red-600 dark:text-red-400 mb-1 uppercase">
                          {prompt.type}
                        </div>
                        <p className="text-sm text-gray-900 dark:text-white break-words">
                          {prompt.question}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {validation.extraPrompts.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Extra Prompts ({validation.extraPrompts.length})
              </h3>
              <div className="space-y-3">
                {validation.extraPrompts.map((prompt) => (
                  <div
                    key={prompt.id}
                    className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle size={18} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-yellow-600 dark:text-yellow-400 mb-1 uppercase">
                          {prompt.type}
                        </div>
                        <p className="text-sm text-gray-900 dark:text-white break-words">
                          {prompt.question}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {validation.isValid && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
              <CheckCircle size={48} className="text-green-500 mx-auto mb-3" />
              <p className="text-gray-900 dark:text-white font-medium">
                All prompts are correctly included
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
