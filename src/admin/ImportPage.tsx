import { useState, useEffect } from 'react';
import { Upload, FileJson, FileText, CheckCircle, AlertCircle, Loader, Database, BookOpen, Layers, FolderTree } from 'lucide-react';
import { db } from '../db/client';
import { Paper, Subject } from '../types';
import {
  parseCSV,
  parseImportJsonPrompts,
  validateImportRows,
  detectDuplicates,
  importPrompts,
  ImportPromptRow,
  ValidationError,
  ImportProgress,
} from './importUtils';
import {
  createTopicQuizzes,
  createUnitQuizzes,
  createFullGCSEQuiz,
  QuizProgress,
} from './quizBuilder';
import { logImportRun } from './ops/ImportLogPage';
import { extractTierFromAnyRow, normalizeTierValue, TierValue } from "./tierImport";

type Step = 'input' | 'preview' | 'importing' | 'complete';

interface ImportProgressState {
  phase: 'prompts' | 'topic-quizzes' | 'unit-quizzes' | 'full-quizzes';
  currentItem: string;
  promptsProcessed: number;
  promptsTotal: number;
  quizzesProcessed: number;
  quizzesTotal: number;
  createdSubjects: string[];
  createdUnits: string[];
  createdTopics: string[];
  importedPrompts: number;
  skippedPrompts: number;
}

export function ImportPage() {
  const [step, setStep] = useState<Step>('input');
  const [inputType, setInputType] = useState<'json' | 'csv'>('csv');
  const [inputText, setInputText] = useState('');
  const [rows, setRows] = useState<ImportPromptRow[]>([]);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [duplicates, setDuplicates] = useState<Map<string, number[]>>(new Map());
  const [skipDuplicates, setSkipDuplicates] = useState(true);
  const [enableCalculators, setEnableCalculators] = useState(false);
  const [metaOverwriteMode, setMetaOverwriteMode] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [defaultPaperNumber, setDefaultPaperNumber] = useState<number | undefined>(undefined);
  const [defaultTier, setDefaultTier] = useState<TierValue>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [createQuizzes, setCreateQuizzes] = useState(false);
  const [quizTypes, setQuizTypes] = useState({ topic: true, unit: true, full: false });
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);
  

  useEffect(() => {
    (async () => {
      try {
        const subs = await db.getSubjects();
        setSubjects(subs);
        if (subs.length > 0) {
          setSelectedSubjectId(subs[0].id);
          const ps = await db.listPapersBySubject(subs[0].id);
          setPapers(ps);
        }
      } catch (e) {
        // ignore; import still works
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!selectedSubjectId) return;
      try {
        const ps = await db.listPapersBySubject(selectedSubjectId);
        setPapers(ps);
      } catch {
        setPapers([]);
      }
    })();
  }, [selectedSubjectId]);
const [progress, setProgress] = useState<ImportProgressState>({
    phase: 'prompts',
    currentItem: '',
    promptsProcessed: 0,
    promptsTotal: 0,
    quizzesProcessed: 0,
    quizzesTotal: 0,
    createdSubjects: [],
    createdUnits: [],
    createdTopics: [],
    importedPrompts: 0,
    skippedPrompts: 0,
  });

  const handleParse = () => {
    try {
      let parsed: ImportPromptRow[] = [];

      if (inputType === 'json') {
        parsed = parseImportJsonPrompts(inputText);
        parsed = parsed.map(r => ({ ...r, tier: r.tier ?? null }));
      } else {
        parsed = parseCSV(inputText);
      }

      // Apply default tier if provided (do not override per-row tier)
      if (defaultTier) {
        parsed = parsed.map(r => ({ ...r, tier: (r as any).tier ?? defaultTier }));
      }

      // Normalize tier values and warn on invalid (do not crash)
      parsed = parsed.map((r: any) => {
        const extracted = extractTierFromAnyRow(r);
        const finalTier = extracted ?? r.tier ?? null;
        return { ...r, tier: finalTier };
      });

      

      const validationErrors = validateImportRows(parsed);
      const dupes = detectDuplicates(parsed);

      setRows(parsed);
      setErrors(validationErrors);
      setDuplicates(dupes);
      setStep('preview');
    } catch (error) {
      alert(`Parse error: ${error}`);
    }
  };

  const handleImport = async () => {
    setImporting(true);
    setStep('importing');

    try {
      setProgress({
        phase: 'prompts',
        currentItem: 'Starting import...',
        promptsProcessed: 0,
        promptsTotal: rows.length,
        quizzesProcessed: 0,
        quizzesTotal: 0,
        createdSubjects: [],
        createdUnits: [],
        createdTopics: [],
        importedPrompts: 0,
        skippedPrompts: 0,
      }, defaultPaperNumber);

      const result = await importPrompts(rows, skipDuplicates, enableCalculators, metaOverwriteMode, (importProgress: ImportProgress) => {
        setProgress(prev => ({
          ...prev,
          phase: 'prompts',
          currentItem: importProgress.currentItem,
          promptsProcessed: importProgress.processed,
          promptsTotal: importProgress.total,
          createdSubjects: importProgress.createdSubjects,
          createdUnits: importProgress.createdUnits,
          createdTopics: importProgress.createdTopics,
          importedPrompts: importProgress.importedPrompts,
          skippedPrompts: importProgress.skippedPrompts,
        }));
      }, defaultPaperNumber);

      if (createQuizzes && result.imported > 0 && result.affectedSubjectIds.length > 0) {
        const { db } = await import('../db/client');

        for (const subjectId of result.affectedSubjectIds) {
          const subject = await db.getSubject(subjectId);
          if (!subject) continue;

          if (quizTypes.topic) {
            setProgress(prev => ({ ...prev, phase: 'topic-quizzes', currentItem: `Creating topic quizzes for ${subject.name}...` }));
            await createTopicQuizzes(subject.id, (quizProgress: QuizProgress) => {
              setProgress(prev => ({
                ...prev,
                phase: 'topic-quizzes',
                currentItem: quizProgress.currentItem,
                quizzesProcessed: quizProgress.processed,
                quizzesTotal: quizProgress.total,
              }));
            }, defaultPaperNumber);
          }
          if (quizTypes.unit) {
            setProgress(prev => ({ ...prev, phase: 'unit-quizzes', currentItem: `Creating unit quizzes for ${subject.name}...` }));
            await createUnitQuizzes(subject.id, (quizProgress: QuizProgress) => {
              setProgress(prev => ({
                ...prev,
                phase: 'unit-quizzes',
                currentItem: quizProgress.currentItem,
                quizzesProcessed: quizProgress.processed,
                quizzesTotal: quizProgress.total,
              }));
            }, defaultPaperNumber);
          }
          if (quizTypes.full) {
            setProgress(prev => ({ ...prev, phase: 'full-quizzes', currentItem: `Creating full quiz for ${subject.name}...` }));
            await createFullGCSEQuiz(subject.id, (quizProgress: QuizProgress) => {
              setProgress(prev => ({
                ...prev,
                phase: 'full-quizzes',
                currentItem: quizProgress.currentItem,
                quizzesProcessed: quizProgress.processed,
                quizzesTotal: quizProgress.total,
              }));
            }, defaultPaperNumber);
          }
        }
      }

      logImportRun({
        format: inputType,
        rowsIn: rows.length,
        imported: result.imported,
        skippedDuplicates: result.skipped,
        createdSubjects: result.createdSubjects || 0,
        createdUnits: result.createdUnits || 0,
        createdTopics: result.createdTopics || 0,
        errorsCount: errors.length,
        errors: errors.map(e => ({ row: e.row, message: e.message })),
        duplicates: Array.from(duplicates.entries()).flatMap(([question, rows]) =>
          rows.map(row => ({ row, question }))
        ),
      }, defaultPaperNumber);

      setImportResult(result);
      setStep('complete');
    } catch (error) {
      alert(`Import error: ${error}`);
    } finally {
      setImporting(false);
    }
  };

  const handleReset = () => {
    setStep('input');
    setInputText('');
    setRows([]);
    setErrors([]);
    setDuplicates(new Map());
    setImportResult(null);
  };

  if (step === 'input') {
    return (
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Bulk Import Prompts
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Import multiple prompts at once using JSON or CSV format
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setInputType('csv')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                inputType === 'csv'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <FileText size={20} />
              <span>CSV Format</span>
            </button>
            <button
              onClick={() => setInputType('json')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                inputType === 'json'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              <FileJson size={20} />
              <span>JSON Format</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject (for paper dropdown)
              </label>
              <select
                value={selectedSubjectId}
                onChange={(e) => { setSelectedSubjectId(e.target.value); setDefaultPaperNumber(undefined); }}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Default Paper (optional)
              </label>
              <select
                value={defaultPaperNumber ?? ''}
                onChange={(e) => setDefaultPaperNumber(e.target.value ? parseInt(e.target.value, 10) : undefined)}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">No default paper</option>
                {papers.sort((a,b) => a.paperNumber - b.paperNumber).map(p => (
                  <option key={p.id} value={p.paperNumber}>Paper {p.paperNumber}: {p.name}</option>
                ))}
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Per-row overrides: paper_id or paper_number columns/fields.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Default Tier (optional)
              </label>
              <select
                value={defaultTier ?? ""}
                onChange={(e) => setDefaultTier(normalizeTierValue(e.target.value))}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All/None (no default tier)</option>
                <option value="higher">Higher Tier</option>
                <option value="foundation">Foundation Tier</option>
              </select>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Per-row overrides: tier/level/isHigher/isFoundation fields.
              </p>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {inputType === 'csv' ? 'Paste CSV Data' : 'Paste JSON Array'}
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                inputType === 'csv'
                  ? 'subject,examBoard,unit,topic,type,question,answers,hint,explanation,calculatorAllowed,drawingRecommended\nMaths,Edexcel Higher,Number,Fractions,short,What is 1/2 + 1/4?,3/4|0.75,,Convert to common denominator,true,false'
                  : '[{"subject":"Maths","examBoard":"Edexcel Higher","unit":"Number","topic":"Fractions","type":"short","question":"What is 1/2 + 1/4?","answers":["3/4","0.75"],"explanation":"Convert to common denominator","calculatorAllowed":true}]'
              }
              className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleParse}
            disabled={!inputText}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
          >
            <Upload size={20} />
            <span>Parse & Preview</span>
          </button>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Format Requirements
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Required fields: subject, examBoard, unit, topic, type, question, answers</li>
            <li>• Optional fields: hint, explanation, calculatorAllowed, drawingRecommended</li>
            <li>• CSV answers: use pipe delimiter (e.g., "answer1|answer2")</li>
            <li>• JSON answers: array of strings</li>
            <li>• Valid types: short, mcq, fill, match, label</li>
            <li>• Boolean fields: true/false, 1/0, yes/no, y/n (case-insensitive)</li>
          </ul>
        </div>
      </div>
    );
  }

  if (step === 'preview') {
    const duplicateRows = new Set(Array.from(duplicates.values()).flat());
    const calculatorAllowedCount = rows.filter(r => r.calculatorAllowed).length;
    const drawingRecommendedCount = rows.filter(r => r.drawingRecommended).length;

    return (
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Preview Import
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {rows.length} rows parsed
            </p>
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
          >
            Back
          </button>
        </div>

        {errors.length > 0 && (
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle size={20} className="text-red-600 dark:text-red-400" />
              <h3 className="font-semibold text-red-900 dark:text-red-100">
                {errors.length} Validation Errors
              </h3>
            </div>
            <div className="max-h-40 overflow-y-auto space-y-1">
              {errors.slice(0, 20).map((error, i) => (
                <p key={i} className="text-sm text-red-800 dark:text-red-200">
                  Row {error.row}, {error.field}: {error.message}
                </p>
              ))}
              {errors.length > 20 && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  ... and {errors.length - 20} more errors
                </p>
              )}
            </div>
          </div>
        )}

        {duplicates.size > 0 && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle size={20} className="text-yellow-600 dark:text-yellow-400" />
              <h3 className="font-semibold text-yellow-900 dark:text-yellow-100">
                {duplicateRows.size} Duplicate Rows Detected
              </h3>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-yellow-800 dark:text-yellow-200">
                <input
                  type="checkbox"
                  checked={skipDuplicates}
                  onChange={(e) => setSkipDuplicates(e.target.checked)}
                  className="rounded"
                />
                <span>Skip duplicate prompts</span>
              </label>
              {!skipDuplicates && (
                <label className="flex items-center gap-2 text-sm text-yellow-800 dark:text-yellow-200 ml-6">
                  <input
                    type="checkbox"
                    checked={metaOverwriteMode}
                    onChange={(e) => setMetaOverwriteMode(e.target.checked)}
                    className="rounded"
                  />
                  <span>Force overwrite meta from CSV (even if blank)</span>
                </label>
              )}
            </div>
          </div>
        )}

        {(calculatorAllowedCount > 0 || drawingRecommendedCount > 0) && (
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
              Meta Fields Summary
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-green-800 dark:text-green-200">Calculator allowed prompts: </span>
                <span className="font-bold text-green-900 dark:text-green-100">{calculatorAllowedCount}</span>
              </div>
              <div>
                <span className="text-green-800 dark:text-green-200">Drawing recommended prompts: </span>
                <span className="font-bold text-green-900 dark:text-green-100">{drawingRecommendedCount}</span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
            Import Options
          </h3>
          <label className="flex items-start gap-3 text-sm text-blue-800 dark:text-blue-200">
            <input
              type="checkbox"
              checked={enableCalculators}
              onChange={(e) => setEnableCalculators(e.target.checked)}
              className="rounded mt-0.5"
            />
            <div>
              <div className="font-medium">Enable calculators for all Maths prompts</div>
              <div className="text-xs text-blue-600 dark:text-blue-300 mt-1">
                Automatically mark all Maths subject prompts as calculator-allowed
              </div>
            </div>
          </label>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            First 10 Rows Preview
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-2 font-semibold text-gray-900 dark:text-white">Subject</th>
                  <th className="text-left p-2 font-semibold text-gray-900 dark:text-white">Unit</th>
                  <th className="text-left p-2 font-semibold text-gray-900 dark:text-white">Topic</th>
                  <th className="text-left p-2 font-semibold text-gray-900 dark:text-white">Question</th>
                  <th className="text-left p-2 font-semibold text-gray-900 dark:text-white">Answers</th>
                  <th className="text-left p-2 font-semibold text-gray-900 dark:text-white">Calculator</th>
                  <th className="text-left p-2 font-semibold text-gray-900 dark:text-white">Drawing</th>
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 10).map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-gray-100 dark:border-gray-700 ${
                      duplicateRows.has(i) ? 'bg-yellow-50 dark:bg-yellow-900/10' : ''
                    }`}
                  >
                    <td className="p-2 text-gray-700 dark:text-gray-300">{row.subject}</td>
                    <td className="p-2 text-gray-700 dark:text-gray-300">{row.unit}</td>
                    <td className="p-2 text-gray-700 dark:text-gray-300">{row.topic}</td>
                    <td className="p-2 text-gray-700 dark:text-gray-300">{row.question.slice(0, 50)}...</td>
                    <td className="p-2 text-gray-700 dark:text-gray-300">{row.answers.join(', ')}</td>
                    <td className="p-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        row.calculatorAllowed
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        {row.calculatorAllowed ? 'Allowed' : 'Not allowed'}
                      </span>
                    </td>
                    <td className="p-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        row.drawingRecommended
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        {row.drawingRecommended ? 'Recommended' : 'Not recommended'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
            Batch Quiz Creation (Optional)
          </h3>
          <label className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={createQuizzes}
              onChange={(e) => setCreateQuizzes(e.target.checked)}
              className="rounded"
            />
            <span className="text-gray-700 dark:text-gray-300">
              Auto-create quizzes after import
            </span>
          </label>

          {createQuizzes && (
            <div className="space-y-2 ml-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={quizTypes.topic}
                  onChange={(e) => setQuizTypes({ ...quizTypes, topic: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Create topic quizzes (1 per topic)
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={quizTypes.unit}
                  onChange={(e) => setQuizTypes({ ...quizTypes, unit: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Create unit quizzes (1 per unit)
                </span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={quizTypes.full}
                  onChange={(e) => setQuizTypes({ ...quizTypes, full: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Create full GCSE quiz (1 per subject)
                </span>
              </label>
            </div>
          )}
        </div>

        <button
          onClick={handleImport}
          disabled={errors.length > 0 || importing}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
        >
          <CheckCircle size={20} />
          <span>Confirm Import</span>
        </button>
      </div>
    );
  }

  if (step === 'importing') {
    const promptProgress = progress.promptsTotal > 0 ? (progress.promptsProcessed / progress.promptsTotal) * 100 : 0;
    const quizProgress = progress.quizzesTotal > 0 ? (progress.quizzesProcessed / progress.quizzesTotal) * 100 : 0;

    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <Loader size={32} className="animate-spin text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {progress.phase === 'prompts' && 'Importing Prompts...'}
              {progress.phase === 'topic-quizzes' && 'Creating Topic Quizzes...'}
              {progress.phase === 'unit-quizzes' && 'Creating Unit Quizzes...'}
              {progress.phase === 'full-quizzes' && 'Creating Full Quizzes...'}
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>Prompts</span>
                <span>{progress.promptsProcessed} / {progress.promptsTotal}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${promptProgress}%` }}
                />
              </div>
            </div>

            {progress.phase !== 'prompts' && (
              <div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Quizzes</span>
                  <span>{progress.quizzesProcessed} / {progress.quizzesTotal}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all duration-300"
                    style={{ width: `${quizProgress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                {progress.currentItem}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <Database size={16} />
                    <span>Imported</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {progress.importedPrompts}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                    <AlertCircle size={16} />
                    <span>Skipped</span>
                  </div>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {progress.skippedPrompts}
                  </p>
                </div>
              </div>
            </div>

            {(progress.createdSubjects.length > 0 || progress.createdUnits.length > 0 || progress.createdTopics.length > 0) && (
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 space-y-3">
                {progress.createdSubjects.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-blue-800 dark:text-blue-200 mb-1">
                      <BookOpen size={16} />
                      <span className="font-semibold">Created Subjects ({progress.createdSubjects.length})</span>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300 ml-6">
                      {progress.createdSubjects.join(', ')}
                    </p>
                  </div>
                )}

                {progress.createdUnits.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-blue-800 dark:text-blue-200 mb-1">
                      <Layers size={16} />
                      <span className="font-semibold">Created Units ({progress.createdUnits.length})</span>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300 ml-6">
                      {progress.createdUnits.join(', ')}
                    </p>
                  </div>
                )}

                {progress.createdTopics.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-blue-800 dark:text-blue-200 mb-1">
                      <FolderTree size={16} />
                      <span className="font-semibold">Created Topics ({progress.createdTopics.length})</span>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300 ml-6">
                      {progress.createdTopics.slice(0, 10).join(', ')}
                      {progress.createdTopics.length > 10 && ` ... and ${progress.createdTopics.length - 10} more`}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'complete' && importResult) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-800">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
            <h2 className="text-2xl font-bold text-green-900 dark:text-green-100">
              Import Complete!
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-green-800 dark:text-green-200 font-semibold">Imported</p>
              <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                {importResult.imported}
              </p>
            </div>
            {importResult.updated > 0 && (
              <div>
                <p className="text-green-800 dark:text-green-200 font-semibold">Updated</p>
                <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                  {importResult.updated}
                </p>
              </div>
            )}
            <div>
              <p className="text-green-800 dark:text-green-200 font-semibold">Skipped</p>
              <p className="text-3xl font-bold text-green-900 dark:text-green-100">
                {importResult.skipped}
              </p>
            </div>
          </div>

          {importResult.createdSubjects.length > 0 && (
            <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">
                Created Subjects: {importResult.createdSubjects.length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {importResult.createdSubjects.join(', ')}
              </p>
            </div>
          )}

          {importResult.createdUnits.length > 0 && (
            <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">
                Created Units: {importResult.createdUnits.length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {importResult.createdUnits.join(', ')}
              </p>
            </div>
          )}

          {importResult.createdTopics.length > 0 && (
            <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">
                Created Topics: {importResult.createdTopics.length}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {importResult.createdTopics.join(', ')}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={handleReset}
          className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
        >
          Import More
        </button>
      </div>
    );
  }

  return null;
}
