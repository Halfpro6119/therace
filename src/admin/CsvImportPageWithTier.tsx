import { useState } from 'react';
import { db } from '../db/client';
import { useToast } from '../contexts/ToastContext';
import { Upload, AlertCircle } from 'lucide-react';
import { normalizeTier } from './tierNormalizer';
import { extractTierFromRawRow, validateTierInRow } from './importUtils_tier';
import { TierLevel } from '../types';

/**
 * Enhanced CSV Import Page with Tier System support
 * Supports tier column in CSV and default tier for import
 */
export function CsvImportPageWithTier() {
  const { showToast } = useToast();
  const [csvInput, setCsvInput] = useState('');
  const [defaultTier, setDefaultTier] = useState<TierLevel>(null); // NEW: Default tier for import
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);

  /**
   * Parse CSV data
   */
  const parseCSV = (text: string): any[] => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const rows: any[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      const row: any = {};

      headers.forEach((header, index) => {
        row[header] = values[index] || '';
      });

      if (row.answers && typeof row.answers === 'string') {
        row.answers = row.answers.split('|').map((a: string) => a.trim()).filter(Boolean);
      }

      rows.push(row);
    }

    return rows;
  };

  /**
   * Parse a single CSV line (handles quoted values)
   */
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }

    result.push(current.trim());
    return result;
  };

  /**
   * Handle CSV import
   */
  const handleImport = async () => {
    if (!csvInput.trim()) {
      showToast('error', 'Please paste CSV data');
      return;
    }

    try {
      setImporting(true);
      const rows = parseCSV(csvInput);

      if (rows.length === 0) {
        showToast('error', 'No data found in CSV');
        return;
      }

      const results = {
        total: rows.length,
        successful: 0,
        failed: 0,
        errors: [] as any[],
        tierStats: {
          higher: 0,
          foundation: 0,
          unassigned: 0
        }
      };

      // Process each row
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        try {
          // Validate required fields
          if (!row.subject || !row.unit || !row.topic || !row.question || !row.answers) {
            results.failed++;
            results.errors.push({
              row: i + 2, // +2 because row 1 is headers, index starts at 0
              error: 'Missing required fields: subject, unit, topic, question, answers'
            });
            continue;
          }

          // NEW: Extract and normalize tier from row
          let tier = extractTierFromRawRow(row);
          
          // NEW: Apply default tier if not specified
          if (tier === null && defaultTier !== null) {
            tier = defaultTier;
          }

          // NEW: Validate tier
          const tierError = validateTierInRow({ ...row, tier }, i + 2);
          if (tierError) {
            results.failed++;
            results.errors.push({
              row: i + 2,
              error: tierError
            });
            continue;
          }

          // Track tier statistics
          if (tier === 'higher') results.tierStats.higher++;
          else if (tier === 'foundation') results.tierStats.foundation++;
          else results.tierStats.unassigned++;

          // Create prompt object
          const prompt = {
            subjectName: row.subject,
            examBoard: row.examboard || row.exam_board || 'GCSE',
            unitName: row.unit,
            topicName: row.topic,
            type: row.type || 'short',
            question: row.question,
            answers: Array.isArray(row.answers) ? row.answers : [row.answers],
            hint: row.hint,
            explanation: row.explanation,
            tier: tier, // NEW: Include tier
            paperId: (row.paper_id || row.paperid || '').trim() || undefined,
            paperNumber: (() => {
              const v = (row.paper_number || row.papernumber || '').trim();
              const n = parseInt(v, 10);
              return !isNaN(n) ? n : undefined;
            })(),
            meta: {
              calculatorAllowed: parseBoolean(row.calculatorallowed || row.calculator_allowed),
              drawingRecommended: parseBoolean(row.drawingrecommended || row.drawing_recommended)
            }
          };

          // Import prompt (resolves subject/unit/topic by name)
          await db.importPrompt(prompt);
          results.successful++;
        } catch (error: any) {
          results.failed++;
          results.errors.push({
            row: i + 2,
            error: error.message
          });
        }
      }

      setImportResult(results);
      
      if (results.failed === 0) {
        showToast('success', `Successfully imported ${results.successful} prompts`);
        setCsvInput('');
      } else {
        showToast('success', `Imported ${results.successful} prompts, ${results.failed} failed`);
      }
    } catch (error: any) {
      showToast('error', `Import error: ${error.message}`);
    } finally {
      setImporting(false);
    }
  };

  /**
   * Parse boolean value
   */
  const parseBoolean = (value: string | undefined): boolean => {
    if (!value) return false;
    const normalized = String(value ?? '').toLowerCase().trim();
    return ['true', '1', 'yes', 'y', 'on'].includes(normalized);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          CSV Import
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Import prompts from CSV format with optional tier assignment
        </p>
      </div>

      {/* Default Tier Option (NEW) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Import Settings
        </h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Default Tier (applied if not specified per row)
          </label>
          <select
            value={defaultTier || ''}
            onChange={(e) => setDefaultTier(e.target.value ? (normalizeTier(e.target.value) as TierLevel) : null)}
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">No Default (All Tiers)</option>
            <option value="higher">Higher Tier</option>
            <option value="foundation">Foundation Tier</option>
          </select>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            If a row specifies its own tier, it will override this default.
          </p>
        </div>
      </div>

      {/* CSV Input */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          CSV Data
        </h2>

        <textarea
          value={csvInput}
          onChange={(e) => setCsvInput(e.target.value)}
          placeholder={`subject,examBoard,unit,topic,type,question,answers,tier
Maths,GCSE,Unit 1,Algebra,short,What is 2+2?,4,higher
Maths,GCSE,Unit 1,Algebra,short,What is 1+1?,2,foundation
Maths,GCSE,Unit 1,Algebra,short,What is 3+3?,6,H
Maths,GCSE,Unit 1,Algebra,short,What is 4+4?,8,F`}
          rows={15}
          className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Supported Tier Column Values:</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
            <li>• <code className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">higher</code> or <code className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">H</code></li>
            <li>• <code className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">foundation</code> or <code className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">F</code></li>
            <li>• Leave empty for unassigned (uses default tier if set)</li>
          </ul>
        </div>

        <button
          onClick={handleImport}
          disabled={importing}
          className="mt-6 w-full px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-xl font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Upload className="w-5 h-5" />
          {importing ? 'Importing...' : 'Import Prompts'}
        </button>
      </div>

      {/* Import Results */}
      {importResult && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Import Results
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {importResult.successful}
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">
                Successful
              </div>
            </div>

            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                {importResult.failed}
              </div>
              <div className="text-sm text-red-700 dark:text-red-300">
                Failed
              </div>
            </div>
          </div>

          {/* NEW: Tier Statistics */}
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-3">Tier Distribution:</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-xl font-bold text-purple-600 dark:text-purple-400">
                  {importResult.tierStats.higher}
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300">Higher Tier</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  {importResult.tierStats.foundation}
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300">Foundation Tier</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-gray-600 dark:text-gray-400">
                  {importResult.tierStats.unassigned}
                </div>
                <div className="text-xs text-blue-700 dark:text-blue-300">Unassigned</div>
              </div>
            </div>
          </div>

          {/* Errors */}
          {importResult.errors.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                Errors ({importResult.errors.length})
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {importResult.errors.map((err: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-300"
                  >
                    <strong>Row {err.row}:</strong> {err.error}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
