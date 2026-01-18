/**
 * JSON Import Page
 * 
 * Improved admin interface for importing questions via JSON
 * Supports multiple formats with strict validation and preview
 */

import { useState } from 'react';
import { Upload, AlertCircle, CheckCircle, AlertTriangle, Loader } from 'lucide-react';
import {
  parseQuestionsJson,
  validateQuestion,
  type NormalizedQuestion,
  type ValidationResult,
} from './jsonNormalizer';
import { useToast } from '../contexts/ToastContext';
import { useConfirm } from '../contexts/ConfirmContext';

type Step = 'input' | 'preview' | 'importing' | 'complete';

interface QuestionPreview {
  index: number;
  prompt: string;
  answerCount: number;
  validation: ValidationResult;
  normalized: NormalizedQuestion;
}

export function JsonImportPage() {
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  
  const [step, setStep] = useState<Step>('input');
  const [inputText, setInputText] = useState('');
  const [previews, setPreviews] = useState<QuestionPreview[]>([]);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);
  const [importOnlyValid, setImportOnlyValid] = useState(true);

  const handleDetect = () => {
    try {
      const normalized = parseQuestionsJson(inputText);
      
      const previews: QuestionPreview[] = normalized.map((q, index) => ({
        index,
        prompt: q.prompt.substring(0, 100) + (q.prompt.length > 100 ? '...' : ''),
        answerCount: q.answersAccepted.length,
        validation: validateQuestion(q),
        normalized: q,
      }));

      setPreviews(previews);
      setStep('preview');
      showToast('success', `Detected ${previews.length} questions`);
    } catch (error) {
      showToast(
        'error',
        `Parse error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  };

  const handleImport = async (onlyValid: boolean) => {
    const toImport = onlyValid
      ? previews.filter(p => p.validation.errors.length === 0)
      : previews;

    if (toImport.length === 0) {
      showToast('info', 'No questions to import');
      return;
    }

    const confirmed = await confirm(
      `Import ${toImport.length} question${toImport.length !== 1 ? 's' : ''}?`
    );

    if (!confirmed) return;

    setImporting(true);
    setStep('importing');

    try {
      // TODO: Implement actual import to database
      // For now, just simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));

      setImportResult({
        imported: toImport.length,
        skipped: previews.length - toImport.length,
        errors: [],
      });

      setStep('complete');
      showToast('success', `Imported ${toImport.length} questions`);
    } catch (error) {
      showToast(
        'error',
        `Import error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
      setStep('preview');
    } finally {
      setImporting(false);
    }
  };

  const validCount = previews.filter(p => p.validation.errors.length === 0).length;
  const warningCount = previews.filter(p => p.validation.warnings.length > 0).length;
  const errorCount = previews.filter(p => p.validation.errors.length > 0).length;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">JSON Question Import</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Import questions from JSON. Supports single objects, arrays, or wrapped payloads.
        </p>
      </div>

      {step === 'input' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Paste JSON</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Paste JSON here. Examples:
[{"prompt": "Q1?", "answers": ["A1", "A2"]}, ...]
{"prompt": "Q1?", "answers": ["A1", "A2"]}
{"questions": [{"prompt": "Q1?", "answers": ["A1", "A2"]}, ...]}`}
              className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 font-mono text-sm"
            />
          </div>

          <button
            onClick={handleDetect}
            disabled={!inputText.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Detect Questions
          </button>
        </div>
      )}

      {step === 'preview' && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Import Preview</h2>
            
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                <p className="text-2xl font-bold">{previews.length}</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Valid</p>
                <p className="text-2xl font-bold text-green-600">{validCount}</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Warnings</p>
                <p className="text-2xl font-bold text-yellow-600">{warningCount}</p>
              </div>
              <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Errors</p>
                <p className="text-2xl font-bold text-red-600">{errorCount}</p>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {previews.map((preview) => (
                <div
                  key={preview.index}
                  className={`p-3 rounded-lg border ${
                    preview.validation.errors.length > 0
                      ? 'bg-red-50 dark:bg-red-900 border-red-300 dark:border-red-700'
                      : preview.validation.warnings.length > 0
                      ? 'bg-yellow-50 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-700'
                      : 'bg-green-50 dark:bg-green-900 border-green-300 dark:border-green-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {preview.validation.errors.length > 0 ? (
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    ) : preview.validation.warnings.length > 0 ? (
                      <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-sm">Q{preview.index + 1}: {preview.prompt}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {preview.answerCount} answer{preview.answerCount !== 1 ? 's' : ''}
                      </p>
                      {preview.validation.errors.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {preview.validation.errors.map((err, i) => (
                            <p key={i} className="text-xs text-red-700 dark:text-red-300">
                              ❌ {err}
                            </p>
                          ))}
                        </div>
                      )}
                      {preview.validation.warnings.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {preview.validation.warnings.map((warn, i) => (
                            <p key={i} className="text-xs text-yellow-700 dark:text-yellow-300">
                              ⚠️ {warn}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex gap-4">
            <button
              onClick={() => setStep('input')}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Back
            </button>
            {validCount > 0 && (
              <button
                onClick={() => handleImport(true)}
                disabled={importing}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors flex items-center gap-2"
              >
                {importing && <Loader className="w-4 h-4 animate-spin" />}
                Import Valid Only ({validCount})
              </button>
            )}
            {previews.length > validCount && (
              <button
                onClick={() => handleImport(false)}
                disabled={importing}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center gap-2"
              >
                {importing && <Loader className="w-4 h-4 animate-spin" />}
                Import All ({previews.length})
              </button>
            )}
          </div>
        </div>
      )}

      {step === 'complete' && importResult && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <h2 className="text-2xl font-bold">Import Complete</h2>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Imported</p>
              <p className="text-3xl font-bold text-green-600">{importResult.imported}</p>
            </div>
            {importResult.skipped > 0 && (
              <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Skipped</p>
                <p className="text-3xl font-bold text-yellow-600">{importResult.skipped}</p>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              setStep('input');
              setInputText('');
              setPreviews([]);
              setImportResult(null);
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Import More
          </button>
        </div>
      )}
    </div>
  );
}
