import { useState } from 'react';
import { db } from '../db/client';
import { useToast } from '../contexts/ToastContext';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { normalizeTier, getTierLabel } from './tierNormalizer';
import { extractTierFromRawRow, applyDefaultTier, validateTierInRow } from './importUtils_tier';
import { TierLevel, TierFilter } from '../types';

/**
 * Enhanced JSON Import Page with Tier System support
 * Supports per-item tier assignment and default tier for import
 */
export function JsonImportPageWithTier() {
  const { showToast } = useToast();
  const [jsonInput, setJsonInput] = useState('');
  const [defaultTier, setDefaultTier] = useState<TierLevel>(null); // NEW: Default tier for import
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);

  /**
   * Parse and validate JSON import data
   */
  const handleImport = async () => {
    if (!jsonInput.trim()) {
      showToast('error', 'Please paste JSON data');
      return;
    }

    try {
      setImporting(true);
      const data = JSON.parse(jsonInput);

      if (!data.prompts || !Array.isArray(data.prompts)) {
        showToast('error', 'JSON must contain a "prompts" array');
        return;
      }

      // NEW: Extract default tier from import data if provided
      const importDefaultTier = data.defaultTier ? normalizeTier(data.defaultTier) : defaultTier;

      const results = {
        total: data.prompts.length,
        successful: 0,
        failed: 0,
        errors: [] as any[],
        tierStats: {
          higher: 0,
          foundation: 0,
          unassigned: 0
        }
      };

      // Process each prompt
      for (let i = 0; i < data.prompts.length; i++) {
        const row = data.prompts[i];

        try {
          // Validate required fields
          if (!row.subject || !row.unit || !row.topic || !row.question || !row.answers) {
            results.failed++;
            results.errors.push({
              row: i + 1,
              error: 'Missing required fields: subject, unit, topic, question, answers'
            });
            continue;
          }

          // NEW: Extract and normalize tier from row
          let tier = extractTierFromRawRow(row);
          
          // NEW: Apply default tier if not specified
          if (tier === null && importDefaultTier !== null) {
            tier = importDefaultTier;
          }

          // NEW: Validate tier
          const tierError = validateTierInRow({ ...row, tier }, i + 1);
          if (tierError) {
            results.failed++;
            results.errors.push({
              row: i + 1,
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
            examBoard: row.examBoard || 'GCSE',
            unitName: row.unit,
            topicName: row.topic,
            type: row.type || 'short',
            question: row.question,
            answers: Array.isArray(row.answers) ? row.answers : [row.answers],
            hint: row.hint,
            explanation: row.explanation,
            tier: tier, // NEW: Include tier
            paperId: row.paperId,
            paperNumber: row.paperNumber,
            meta: {
              calculatorAllowed: row.calculatorAllowed || false,
              drawingRecommended: row.drawingRecommended || false
            }
          };

          // Import prompt
          await db.importPrompt(prompt);
          results.successful++;
        } catch (error: any) {
          results.failed++;
          results.errors.push({
            row: i + 1,
            error: error.message
          });
        }
      }

      setImportResult(results);
      
      if (results.failed === 0) {
        showToast('success', `Successfully imported ${results.successful} prompts`);
        setJsonInput('');
      } else {
        showToast('warning', `Imported ${results.successful} prompts, ${results.failed} failed`);
      }
    } catch (error: any) {
      showToast('error', `Invalid JSON: ${error.message}`);
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          JSON Import
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Import prompts from JSON format with optional tier assignment
        </p>
      </div>

      {/* Default Tier Option (NEW) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Import Settings
        </h2>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Default Tier (applied if not specified per prompt)
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
            If a prompt specifies its own tier, it will override this default.
          </p>
        </div>
      </div>

      {/* JSON Input */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          JSON Data
        </h2>

        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder={`{
  "defaultTier": "higher",
  "prompts": [
    {
      "subject": "Maths",
      "examBoard": "GCSE",
      "unit": "Unit 1",
      "topic": "Algebra",
      "type": "short",
      "question": "What is 2+2?",
      "answers": ["4"],
      "tier": "higher"
    }
  ]
}`}
          rows={15}
          className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Supported Tier Fields:</h3>
          <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
            <li>• <code className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">tier: "higher" | "foundation" | "H" | "F"</code></li>
            <li>• <code className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">isHigher: true/false</code></li>
            <li>• <code className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">isFoundation: true/false</code></li>
            <li>• <code className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">level: "higher" | "foundation"</code></li>
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
