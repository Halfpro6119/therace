import { useState } from 'react';
import { Quiz } from '../../types';
import { db } from '../../db/client';
import { TARGET_PRESETS, applyTargetPreset, calculateTargetRatio } from '../contentOpsUtils';
import { X, AlertTriangle, CheckCircle, Zap } from 'lucide-react';

interface TargetTimeEditorProps {
  quiz: Quiz | null;
  quizzes: Quiz[];
  onClose: () => void;
  onSave: () => void;
}

export function TargetTimeEditor({ quiz, quizzes, onClose, onSave }: TargetTimeEditorProps) {
  const isBatchMode = quiz === null;
  const [selectedPreset, setSelectedPreset] = useState<string>(TARGET_PRESETS[1].name);
  const [customValues, setCustomValues] = useState<{
    [quizId: string]: { grade9TargetSec: number; timeLimitSec: number };
  }>({});
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  const handlePresetApply = () => {
    const preset = TARGET_PRESETS.find(p => p.name === selectedPreset);
    if (!preset) return;

    const newValues: typeof customValues = {};
    const quizzesToUpdate = isBatchMode ? quizzes : [quiz!];

    quizzesToUpdate.forEach(q => {
      const targets = applyTargetPreset(q, preset);
      newValues[q.id] = targets;
    });

    setCustomValues(newValues);
    setShowPreview(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const updates = Object.entries(customValues);

      for (const [quizId, values] of updates) {
        await db.updateQuiz(quizId, values);
      }

      onSave();
    } catch (error) {
      console.error('Failed to save targets:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSingleQuizUpdate = (field: 'grade9TargetSec' | 'timeLimitSec', value: number) => {
    if (!quiz) return;
    setCustomValues({
      [quiz.id]: {
        grade9TargetSec: field === 'grade9TargetSec' ? value : (customValues[quiz.id]?.grade9TargetSec || quiz.grade9TargetSec),
        timeLimitSec: field === 'timeLimitSec' ? value : (customValues[quiz.id]?.timeLimitSec || quiz.timeLimitSec),
      },
    });
  };

  const getTargetRatio = (q: Quiz) => {
    const values = customValues[q.id];
    if (values) {
      return values.grade9TargetSec / q.promptIds.length;
    }
    return calculateTargetRatio(q);
  };

  const isRatioReasonable = (ratio: number) => ratio >= 5 && ratio <= 60;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isBatchMode ? 'Batch Set Targets' : 'Edit Quiz Targets'}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {isBatchMode
                ? `Setting targets for ${quizzes.length} quizzes`
                : quiz?.title}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {isBatchMode && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Apply Preset</h3>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {TARGET_PRESETS.map(preset => (
                  <button
                    key={preset.name}
                    onClick={() => setSelectedPreset(preset.name)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedPreset === preset.name
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="font-semibold text-gray-900 dark:text-white mb-2">
                      {preset.name}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                      <div>Topic: {preset.topicSecondsPerQuestion}s/q</div>
                      <div>Unit: {preset.unitSecondsPerQuestion}s/q</div>
                      <div>Full: {preset.fullSecondsPerQuestion}s/q</div>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={handlePresetApply}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
              >
                <Zap size={18} />
                Apply Preset
              </button>
            </div>
          )}

          {!isBatchMode && quiz && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Grade 9 Target (seconds)
                </label>
                <input
                  type="number"
                  value={customValues[quiz.id]?.grade9TargetSec || quiz.grade9TargetSec}
                  onChange={(e) => handleSingleQuizUpdate('grade9TargetSec', parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time Limit (seconds)
                </label>
                <input
                  type="number"
                  value={customValues[quiz.id]?.timeLimitSec || quiz.timeLimitSec}
                  onChange={(e) => handleSingleQuizUpdate('timeLimitSec', parseInt(e.target.value))}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Target Ratio</div>
                <div className="flex items-center gap-3">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {getTargetRatio(quiz).toFixed(1)}s per question
                  </div>
                  {isRatioReasonable(getTargetRatio(quiz)) ? (
                    <CheckCircle size={20} className="text-green-500" />
                  ) : (
                    <AlertTriangle size={20} className="text-yellow-500" />
                  )}
                </div>
                {!isRatioReasonable(getTargetRatio(quiz)) && (
                  <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                    Recommended ratio: 5-60 seconds per question
                  </p>
                )}
              </div>
            </div>
          )}

          {showPreview && isBatchMode && (
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Preview Changes ({Object.keys(customValues).length} quizzes)
              </h3>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {quizzes.filter(q => customValues[q.id]).map(q => {
                  const values = customValues[q.id];
                  const ratio = values.grade9TargetSec / q.promptIds.length;
                  return (
                    <div
                      key={q.id}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 dark:text-white truncate">
                          {q.title}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {q.promptIds.length} prompts
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          Target: {values.grade9TargetSec}s | Limit: {values.timeLimitSec}s
                        </div>
                        {isRatioReasonable(ratio) ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : (
                          <AlertTriangle size={16} className="text-yellow-500" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSave}
              disabled={saving || Object.keys(customValues).length === 0}
              className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-colors"
            >
              {saving ? 'Saving...' : 'Save Targets'}
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
