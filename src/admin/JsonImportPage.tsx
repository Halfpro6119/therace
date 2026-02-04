/**
 * JSON Import Page
 * 
 * Improved admin interface for importing questions via JSON
 * Supports multiple formats with strict validation and preview
 * Integrates with database for actual import
 * NOW SUPPORTS FULL METADATA INCLUDING DIAGRAMS
 */

import { useState, useEffect } from 'react';
import {
  resolvePaperAssignment,
  calculatePaperStats,
  formatPaperAssignment,
  PaperAssignmentResult,
  ImportPaperStats,
} from './paperAssignmentUtils';
import { Upload, AlertCircle, CheckCircle, AlertTriangle, Loader, Copy, Check } from 'lucide-react';
import {
  parseQuestionsJson,
  validateQuestion,
  type NormalizedQuestion,
  type ValidationResult,
} from './jsonNormalizer';
import { useToast } from '../contexts/ToastContext';
import { useConfirm } from '../contexts/ConfirmContext';
import { db, supabase } from '../db/client';
import { Subject, Paper } from '../types';

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

export function JsonImportPage() {
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  
  const [step, setStep] = useState<Step>('input');
  const [inputText, setInputText] = useState('');
  const [previews, setPreviews] = useState<QuestionPreview[]>([]);
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [paperStats, setPaperStats] = useState<ImportPaperStats | null>(null);
  // Removed unused: importOnlyValid, setImportOnlyValid
  const [copied, setCopied] = useState(false);

  // NEW: Paper assignment support
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedPaper, setSelectedPaper] = useState<string>('');

  // NEW: Paper assignment support

  const handleDetect = () => {
    try {
      const normalized = parseQuestionsJson(inputText);
      
      if (normalized.length === 0) {
        showToast('info', 'No valid questions detected in JSON');
        return;
      }
      
      // Calculate paper assignments for preview
      const paperAssignments = normalized.map(q => 
        resolvePaperAssignment(q, papers, selectedSubject, selectedPaper)
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
      showToast('success', `Detected ${previews.length} question${previews.length !== 1 ? 's' : ''}`);
    } catch (error) {
      showToast('error', `Parse error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

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

  useEffect(() => {
    loadSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      loadPapersForSubject();
    }
  }, [selectedSubject]);



  useEffect(() => {
    loadSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      loadPapersForSubject();
    }
  }, [selectedSubject]);



  const handleImport = async (onlyValid: boolean) => {
    const toImport = onlyValid
      ? previews.filter(p => p.validation.errors.length === 0)
      : previews;

    if (toImport.length === 0) {
      showToast('info', 'No questions to import');
      return;
    }

    const confirmed = await confirm({
      title: "Import Questions",
      message: `Import ${toImport.length} question${toImport.length !== 1 ? "s" : ""}?`
    });

    if (!confirmed) return;

    setImporting(true);
    setStep('importing');

    const result: ImportResult = {
      imported: 0,
      skipped: 0,
      errors: [],
    };

    try {
      // Get default subject for imported questions
      const subjects = await db.getSubjects();
      let importSubject = subjects.find(s => s.name === 'Imported Questions');
      
      if (!importSubject) {
        importSubject = await db.createSubject({
          name: 'Imported Questions',
          examBoard: 'General',
          description: 'Questions imported via JSON',
          icon: '📝',
          themeColor: 'from-blue-500 to-blue-600',
        });
      }

      // Get or create default unit
      const units = await db.getUnits(importSubject.id);
      let importUnit = units.find(u => u.name === 'General');
      
      if (!importUnit) {
        importUnit = await db.createUnit({
          subjectId: importSubject.id,
          name: 'General',
          orderIndex: 1,
          description: 'General imported questions',
        });
      }

      // Get or create default topic
      const topics = await db.getTopics(importSubject.id);
      let importTopic = topics.find(t => t.name === 'Imported');
      
      if (!importTopic) {
        importTopic = await db.createTopic({
          subjectId: importSubject.id,
          unitId: importUnit.id,
          name: 'Imported',
          orderIndex: 1,
          description: 'Imported questions',
        });
      }

      // Import each question
      
      for (let i = 0; i < toImport.length; i++) {
        const preview = toImport[i];
        try {
          const normalized = preview.normalized;
          
          // Get the original type from the normalized question (jsonNormalizer preserves it)
          const originalType = normalized.type;
          
          // Types that normalize to 'short' for rendering (per normalizeQuestion.ts)
          const TYPES_NORMALIZE_TO_SHORT = new Set([
            'numeric', 'multinumeric', 'expression', 'tablefill', 'ordersteps',
            'graphplot', 'graphread', 'geometryconstruct', 'proofshort', 'dragmatch',
            'matrixinput', 'vectordiagram', 'functionmachine'
          ]);
          
          // Determine the type to store in database
          // If the type normalizes to 'short', store 'short' but preserve originalType in meta
          const shouldNormalize = originalType && TYPES_NORMALIZE_TO_SHORT.has(originalType.toLowerCase());
          const dbType = shouldNormalize ? 'short' : (originalType || 'short');
          
          // Build metadata object for prompts.meta field
          // Merge existing meta from the normalized question, preserving questionData and other fields
          const existingMeta = normalized.meta && typeof normalized.meta === 'object' ? normalized.meta : {};
          const meta: any = {
            ...existingMeta,
            calculatorAllowed: normalized.calculatorAllowed,
            drawingRecommended: normalized.drawingRecommended,
          };

          // Preserve original type in meta if it's different from the DB type
          // This allows future handlers to identify the original question type
          if (originalType && originalType !== dbType) {
            meta.originalType = originalType;
          }

          // Build diagram metadata object
          let diagramMetadata: any = null;
          if (normalized.diagram && normalized.diagram.templateId) {
            diagramMetadata = {
              mode: normalized.diagram.mode,
              templateId: normalized.diagram.templateId,
              placement: normalized.diagram.placement,
              caption: normalized.diagram.caption,
              alt: normalized.diagram.alt,
              ...(normalized.diagram.params && { params: normalized.diagram.params }),
            };
          }

          console.log('Importing question with meta:', JSON.stringify(meta, null, 2));
          console.log('Importing question with diagram_metadata:', JSON.stringify(diagramMetadata, null, 2));

          // Create the prompt with metadata
          const insertData: any = {
            subject_id: importSubject.id,
            unit_id: importUnit.id,
            topic_id: importTopic.id,
            type: dbType,
            question: normalized.prompt,
            answers: normalized.answersAccepted,
            hint: normalized.hint,
            explanation: normalized.fullSolution,
            meta: meta,
          };

          // Resolve and add paper assignment
          const paperAssignment = resolvePaperAssignment(
            normalized,
            papers,
            importSubject.id,
            selectedPaper
          );
          if (paperAssignment.paperId) {
            insertData.paper_id = paperAssignment.paperId;
          }

          // NEW: Add paper assignment if selected
          if (selectedPaper) {
            insertData.paper_id = selectedPaper;
          }

          // NEW: Add paper assignment if selected
          if (selectedPaper) {
            insertData.paper_id = selectedPaper;
          }

          // NEW: Add paper assignment if selected
          if (selectedPaper) {
            insertData.paper_id = selectedPaper;
          }

          // Only include diagram_metadata if it exists
          if (diagramMetadata) {
            insertData.diagram_metadata = diagramMetadata;
          }

          const { data: createdPrompt, error: createError } = await supabase
            .from('prompts')
            .insert(insertData)
            .select()
            .single();

          if (createError) {
            throw new Error(`Database error: ${createError.message}`);
          }

          console.log('Question created successfully:', createdPrompt.id);
          result.imported++;
        } catch (error) {
          console.error('Error importing question:', error);
          result.errors.push({
            index: preview.index,
            message: error instanceof Error ? error.message : 'Unknown error',
          });
        }
      }

      result.skipped = previews.length - toImport.length;
      setImportResult(result);
      setStep('complete');
      showToast('success', `Imported ${result.imported} question${result.imported !== 1 ? 's' : ''}`);
    } catch (error) {
      console.error('Fatal import error:', error);
      showToast('error', `Import error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setStep('preview');
    } finally {
      setImporting(false);
    }
  };

  const validCount = previews.filter(p => p.validation.errors.length === 0).length;
  const warningCount = previews.filter(p => p.validation.warnings.length > 0).length;
  const errorCount = previews.filter(p => p.validation.errors.length > 0).length;

  const exampleJson = JSON.stringify([
    {
      prompt: "What is 2 + 2?",
      answers: ["4"],
      fullSolution: "2 + 2 = 4",
      hint: "Count on your fingers",
      marks: 1,
      calculatorAllowed: false,
      drawingRecommended: false
    },
    {
      prompt: "What is the angle in a semicircle?",
      answers: ["90", "90 degrees"],
      fullSolution: "An angle inscribed in a semicircle is always a right angle (90 degrees)",
      hint: "The angle subtended by a diameter at the circumference",
      marks: 1,
      calculatorAllowed: false,
      drawingRecommended: true,
      diagram: {
        mode: "template",
        templateId: "angleInSemicircle",
        placement: "above",
        caption: "Angle in Semicircle",
        alt: "Diagram showing angle in semicircle"
      }
    }
  ], null, 2);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">JSON Question Import</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Import questions from JSON with full metadata support including diagrams, hints, solutions, and more.
        </p>
      </div>

      {step === 'input' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">Paste JSON</label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Paste JSON here. Examples:\n[{"prompt": "Q1?", "answers": ["A1", "A2"]}, ...]\n{"prompt": "Q1?", "answers": ["A1", "A2"]}\n{"questions": [{"prompt": "Q1?", "answers": ["A1", "A2"]}, ...]}`}
              className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 font-mono text-sm"
            />
          </div>

          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold">Example JSON:</p>
              <button
                onClick={() => {
                  setInputText(exampleJson);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex items-center gap-1 px-3 py-1 text-xs bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Use Example
                  </>
                )}
              </button>
            </div>
            <pre className="text-xs overflow-x-auto text-gray-700 dark:text-gray-300">
              {exampleJson}
            </pre>
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
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Import Settings
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Assign to Paper (Optional)
              </label>
              <select
                value={selectedPaper}
                onChange={(e) => setSelectedPaper(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">No Paper Assignment</option>
                {papers.map(p => (
                  <option key={p.id} value={p.id}>Paper {p.paperNumber}: {p.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {paperStats && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-4 mb-6">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-3">
              Paper Assignment Summary
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-blue-700 dark:text-blue-300">Assigned to Paper</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{paperStats.assignedToPaper}</p>
              </div>
              <div>
                <p className="text-blue-700 dark:text-blue-300">Unassigned</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{paperStats.unassigned}</p>
              </div>
            </div>
            {Object.entries(paperStats.byPaper).map(([paperNum, count]) => 
              count > 0 && (
                <div key={paperNum} className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                  Paper {paperNum}: {count} question{count !== 1 ? 's' : ''}
                </div>
              )
            )}
            {paperStats.warnings.length > 0 && (
              <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800">
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 mb-2">Warnings:</p>
                <ul className="text-xs text-amber-700 dark:text-amber-300 space-y-1">
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

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Import Settings
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Assign to Paper (Optional)
              </label>
              <select
                value={selectedPaper}
                onChange={(e) => setSelectedPaper(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">No Paper Assignment</option>
                {papers.map(p => (
                  <option key={p.id} value={p.id}>Paper {p.paperNumber}: {p.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {paperStats && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-4 mb-6">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-3">
              Paper Assignment Summary
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-blue-700 dark:text-blue-300">Assigned to Paper</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{paperStats.assignedToPaper}</p>
              </div>
              <div>
                <p className="text-blue-700 dark:text-blue-300">Unassigned</p>
                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{paperStats.unassigned}</p>
              </div>
            </div>
            {Object.entries(paperStats.byPaper).map(([paperNum, count]) => 
              count > 0 && (
                <div key={paperNum} className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                  Paper {paperNum}: {count} question{count !== 1 ? 's' : ''}
                </div>
              )
            )}
            {paperStats.warnings.length > 0 && (
              <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-800">
                <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 mb-2">Warnings:</p>
                <ul className="text-xs text-amber-700 dark:text-amber-300 space-y-1">
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

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Import Settings
          </h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Assign to Paper (Optional)
              </label>
              <select
                value={selectedPaper}
                onChange={(e) => setSelectedPaper(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">No Paper Assignment</option>
                {papers.map(p => (
                  <option key={p.id} value={p.id}>Paper {p.paperNumber}: {p.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

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
                        {preview.normalized.diagram && ' • Has diagram'}
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

      {step === 'importing' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <Loader className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-lg font-semibold">Importing questions...</p>
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

          {importResult.errors.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900 rounded-lg">
              <p className="text-sm font-semibold text-red-700 dark:text-red-300 mb-2">
                Errors ({importResult.errors.length}):
              </p>
              <div className="space-y-1">
                {importResult.errors.map((err, i) => (
                  <p key={i} className="text-xs text-red-600 dark:text-red-400">
                    Q{err.index + 1}: {err.message}
                  </p>
                ))}
              </div>
            </div>
          )}

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
