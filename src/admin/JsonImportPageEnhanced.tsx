/**
 * Enhanced JSON Import Page with Paper Assignment
 * 
 * Features:
 * - Import questions from JSON
 * - Assign default paper to all imported questions
 * - Support per-question paper assignment via paper_id or paper_number
 * - Preview paper assignments before import
 * - Show import statistics including paper assignments
 */

import { useState, useEffect } from 'react';
import {
  resolvePaperAssignment,
  calculatePaperStats,
  formatPaperAssignment,
  PaperAssignmentResult,
  ImportPaperStats,
} from './paperAssignmentUtils';
import { Upload, AlertCircle, CheckCircle, Loader, Copy, Check } from 'lucide-react';
import {
  parseQuestionsJson,
  validateQuestion,
  type NormalizedQuestion,
  type ValidationResult,
} from './jsonNormalizer';
import { useToast } from '../contexts/ToastContext';
import { useConfirm } from '../contexts/ConfirmContext';
import { db, supabase } from '../db/client';
import { Subject, Paper, PromptType } from '../types';

type Step = 'input' | 'preview' | 'importing' | 'complete';

interface QuestionPreview {
  index: number;
  prompt: string;
  answerCount: number;
  validation: ValidationResult;
  normalized: NormalizedQuestion;
  paperAssignment?: PaperAssignmentResult;
}

interface ImportResult {
  imported: number;
  skipped: number;
  errors: Array<{ index: number; message: string }>;
  paperStats?: ImportPaperStats;
}

export function JsonImportPageEnhanced() {
  const { success, error: showError, info } = useToast();
  const { confirm } = useConfirm();
  
  const [step, setStep] = useState<Step>('input');
  const [inputText, setInputText] = useState('');
  const [previews, setPreviews] = useState<QuestionPreview[]>([]);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [paperStats, setPaperStats] = useState<ImportPaperStats | null>(null);
  const [importOnlyValid, setImportOnlyValid] = useState(true);
  const [copied, setCopied] = useState(false);

  // Paper assignment support
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedDefaultPaper, setSelectedDefaultPaper] = useState<string>('');

  useEffect(() => {
    loadSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      loadPapersForSubject();
    }
  }, [selectedSubject]);

  const loadSubjects = async () => {
    try {
      const data = await db.getSubjects();
      setSubjects(data);
      if (data.length > 0) {
        setSelectedSubject(data[0].id);
      }
    } catch (error) {
      console.error('Failed to load subjects:', error);
    }
  };

  const loadPapersForSubject = async () => {
    if (!selectedSubject) return;
    try {
      const data = await db.listPapersBySubject(selectedSubject);
      setPapers(data);
    } catch (error) {
      console.error('Failed to load papers:', error);
    }
  };

  const handleDetect = () => {
    try {
      const normalized = parseQuestionsJson(inputText);
      
      if (normalized.length === 0) {
        info('No valid questions detected in JSON');
        return;
      }
      
      // Calculate paper assignments for preview
      const paperAssignments = normalized.map(q => 
        resolvePaperAssignment(q, papers, selectedSubject, selectedDefaultPaper || null)
      );

      const previews: QuestionPreview[] = normalized.map((q, index) => ({
        index,
        prompt: q.prompt.substring(0, 100) + (q.prompt.length > 100 ? '...' : ''),
        answerCount: q.answersAccepted.length,
        validation: validateQuestion(q),
        normalized: q,
        paperAssignment: paperAssignments[index],
      }));

      setPreviews(previews);
      
      // Calculate and display paper stats
      const stats = calculatePaperStats(paperAssignments, papers);
      setPaperStats(stats);
      
      setStep('preview');
      success(`Detected ${previews.length} question${previews.length !== 1 ? 's' : ''}`);
    } catch (error) {
      showError(`Parse error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleImport = async () => {
    if (!await confirm({ title: 'Confirm', message: `Import ${previews.length} question${previews.length !== 1 ? 's' : ''}?` })) return;

    try {
      setStep('importing');
      setImporting(true);

      const result: ImportResult = {
        imported: 0,
        skipped: 0,
        errors: [],
      };

      for (let i = 0; i < previews.length; i++) {
        const preview = previews[i];
        const validation = preview.validation;

        if (!importOnlyValid || validation.isValid) {
          try {
            // Resolve paper assignment
            const paperAssignment = resolvePaperAssignment(
              preview.normalized,
              papers,
              selectedSubject,
              selectedDefaultPaper || null
            );

            // Prepare meta - diagrams will be stored separately in diagram_metadata
            // Include diagram in meta temporarily so importPrompt can extract it
            const metaWithDiagram = preview.normalized.diagram 
              ? { ...(preview.normalized.meta || {}), diagram: preview.normalized.diagram }
              : preview.normalized.meta;

            // If unit/topic names are provided instead of IDs, use importPrompt to resolve them.
            // When user has selected a subject, always use its name/examBoard so we target that
            // subject and never create a duplicate.
            if (preview.normalized.unitName || preview.normalized.topicName) {
              const subject = subjects.find(s => s.id === selectedSubject);
              await db.importPrompt({
                subjectName: subject?.name ?? preview.normalized.subjectName ?? 'Maths',
                examBoard: subject?.examBoard ?? preview.normalized.examBoard ?? 'Edexcel',
                unitName: preview.normalized.unitName || '',
                topicName: preview.normalized.topicName || '',
                type: (preview.normalized.type as PromptType) ?? 'short',
                question: preview.normalized.prompt,
                answers: preview.normalized.answersAccepted,
                hint: preview.normalized.hint,
                explanation: preview.normalized.explanation ?? preview.normalized.fullSolution ?? undefined,
                paperId: paperAssignment.paperId ?? undefined,
                paperNumber: paperAssignment.paperNumber ?? undefined,
                tier: preview.normalized.tier ?? null,
                marks: preview.normalized.marks,
                timeAllowanceSec: preview.normalized.timeAllowanceSec,
                meta: metaWithDiagram,
              });
            } else {
              // Use IDs directly - extract diagram for separate storage
              const meta = preview.normalized.meta || {};
              const diagramMetadata = preview.normalized.diagram;
              const metaWithoutDiagram = { ...meta };
              if ((metaWithoutDiagram as any).diagram) {
                delete (metaWithoutDiagram as any).diagram;
              }

              await db.createPrompt({
                subjectId: selectedSubject,
                unitId: preview.normalized.unitId ?? '',
                topicId: preview.normalized.topicId ?? '',
                type: (preview.normalized.type as PromptType) ?? 'short',
                question: preview.normalized.prompt,
                answers: preview.normalized.answersAccepted,
                hint: preview.normalized.hint,
                explanation: preview.normalized.explanation ?? preview.normalized.fullSolution ?? undefined,
                paperId: paperAssignment.paperId ?? undefined,
                calculatorAllowed: preview.normalized.calculatorAllowed,
                tier: preview.normalized.tier ?? null,
                marks: preview.normalized.marks,
                timeAllowanceSec: preview.normalized.timeAllowanceSec,
                meta: Object.keys(metaWithoutDiagram).length > 0 ? metaWithoutDiagram : undefined,
                diagram_metadata: diagramMetadata,
              } as any);
            }

            result.imported++;
          } catch (error) {
            result.errors.push({
              index: i,
              message: `Failed to import: ${error instanceof Error ? error.message : 'Unknown error'}`,
            });
          }
        } else {
          result.skipped++;
        }
      }

      // Calculate final paper stats
      const finalAssignments = previews.map(p => p.paperAssignment || { paperId: null, paperNumber: null, paperName: null, warning: null });
      result.paperStats = calculatePaperStats(finalAssignments, papers);

      setImportResult(result);
      setStep('complete');
      success(`Imported ${result.imported} question${result.imported !== 1 ? 's' : ''}`);
    } catch (error) {
      showError(`Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setStep('preview');
    } finally {
      setImporting(false);
    }
  };

  const handleReset = () => {
    setStep('input');
    setInputText('');
    setPreviews([]);
    setImportResult(null);
    setPaperStats(null);
    setSelectedDefaultPaper('');
  };

  const handleCopyStats = () => {
    if (!importResult) return;
    const text = `Import Results:
- Imported: ${importResult.imported}
- Skipped: ${importResult.skipped}
- Errors: ${importResult.errors.length}
${importResult.paperStats ? `
Paper Assignment Stats:
- Total: ${importResult.paperStats.totalImported}
- Assigned: ${importResult.paperStats.assignedToPaper}
- Unassigned: ${importResult.paperStats.unassigned}
${Object.entries(importResult.paperStats.byPaper).map(([num, count]) => `- Paper ${num}: ${count}`).join('\n')}
` : ''}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">JSON Import</h1>
        <p className="text-gray-600 dark:text-gray-400">Import questions from JSON with paper assignment</p>
      </div>

      {step === 'input' && (
        <div className="space-y-6">
          {/* Subject Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select a subject...</option>
              {subjects.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>

          {/* Default Paper Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Default Paper (Optional)
            </label>
            <select
              value={selectedDefaultPaper}
              onChange={(e) => setSelectedDefaultPaper(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">None - Use per-question assignment</option>
              {papers.map(p => (
                <option key={p.id} value={p.id}>
                  Paper {p.paperNumber}: {p.name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              If set, questions without explicit paper_id/paper_number will be assigned to this paper
            </p>
          </div>

          {/* JSON Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              JSON Input
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder='Paste JSON here. Supports paper_id (UUID) or paper_number (1/2/3) fields...'
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
              rows={12}
            />
          </div>

          {/* Options */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={importOnlyValid}
              onChange={(e) => setImportOnlyValid(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Import only valid questions</span>
          </label>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleDetect}
              disabled={!inputText.trim() || !selectedSubject}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium flex items-center justify-center gap-2"
            >
              <Upload size={18} />
              Detect & Preview
            </button>
          </div>
        </div>
      )}

      {step === 'preview' && (
        <div className="space-y-6">
          {/* Paper Stats */}
          {paperStats && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">Paper Assignment Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-300">{paperStats.totalImported}</div>
                  <div className="text-sm text-blue-700 dark:text-blue-400">Total Questions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">{paperStats.assignedToPaper}</div>
                  <div className="text-sm text-green-700 dark:text-green-400">Assigned to Paper</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{paperStats.unassigned}</div>
                  <div className="text-sm text-orange-700 dark:text-orange-400">Unassigned</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">{paperStats.warnings.length}</div>
                  <div className="text-sm text-red-700 dark:text-red-400">Warnings</div>
                </div>
              </div>

              {Object.entries(paperStats.byPaper).length > 0 && (
                <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
                  <div className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">By Paper:</div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(paperStats.byPaper).map(([num, count]) => (
                      <span key={num} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-300 rounded text-sm">
                        Paper {num}: {count}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {paperStats.warnings.length > 0 && (
                <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
                  <div className="text-sm font-medium text-orange-900 dark:text-orange-300 mb-2">Warnings:</div>
                  <ul className="text-sm text-orange-800 dark:text-orange-400 space-y-1">
                    {paperStats.warnings.slice(0, 5).map((w, i) => (
                      <li key={i}>• {w}</li>
                    ))}
                    {paperStats.warnings.length > 5 && (
                      <li>• ... and {paperStats.warnings.length - 5} more</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Preview List */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Preview ({previews.length} questions)</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {previews.map((preview, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border ${
                    preview.validation.isValid
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                      : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {preview.validation.isValid ? (
                      <CheckCircle size={18} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle size={18} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white break-words">{preview.prompt}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                          {preview.answerCount} answers
                        </span>
                        {preview.paperAssignment && (
                          <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                            preview.paperAssignment.paperId
                              ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                          }`}>
                            {formatPaperAssignment(preview.paperAssignment)}
                          </span>
                        )}
                      </div>
                      {!preview.validation.isValid && preview.validation.errors.length > 0 && (
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                          {preview.validation.errors[0]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Back
            </button>
            <button
              onClick={handleImport}
              disabled={importing}
              className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium flex items-center justify-center gap-2"
            >
              {importing ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <CheckCircle size={18} />
                  Import All
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {step === 'complete' && importResult && (
        <div className="space-y-6">
          {/* Results Summary */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <CheckCircle size={24} className="text-green-600 dark:text-green-400 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">Import Complete</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-green-900 dark:text-green-300">{importResult.imported}</div>
                    <div className="text-sm text-green-700 dark:text-green-400">Imported</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{importResult.skipped}</div>
                    <div className="text-sm text-orange-700 dark:text-orange-400">Skipped</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600 dark:text-red-400">{importResult.errors.length}</div>
                    <div className="text-sm text-red-700 dark:text-red-400">Errors</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Paper Stats */}
          {importResult.paperStats && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3">Paper Assignment Results</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-300">{importResult.paperStats.assignedToPaper}</div>
                  <div className="text-sm text-blue-700 dark:text-blue-400">Assigned to Paper</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{importResult.paperStats.unassigned}</div>
                  <div className="text-sm text-orange-700 dark:text-orange-400">Unassigned</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">{importResult.paperStats.warnings.length}</div>
                  <div className="text-sm text-red-700 dark:text-red-400">Warnings</div>
                </div>
              </div>

              {Object.entries(importResult.paperStats.byPaper).length > 0 && (
                <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
                  <div className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">Distribution by Paper:</div>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(importResult.paperStats.byPaper).map(([num, count]) => (
                      <span key={num} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-300 rounded text-sm">
                        Paper {num}: {count}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Errors */}
          {importResult.errors.length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 dark:text-red-300 mb-2">Errors ({importResult.errors.length})</h3>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {importResult.errors.map((err, idx) => (
                  <p key={idx} className="text-sm text-red-700 dark:text-red-400">
                    Row {err.index}: {err.message}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleCopyStats}
              className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check size={18} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={18} />
                  Copy Stats
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              Import More
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
