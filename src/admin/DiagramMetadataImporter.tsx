/**
 * Diagram Metadata Bulk Importer
 * 
 * Allows bulk creation and updating of diagrams from CSV or JSON files.
 * Validates metadata and provides detailed import reports.
 */

import { useState } from 'react';
import { Upload, AlertCircle, FileText } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import {
  createDiagramFromMetadata,
  createDiagramsBatch,
  type DiagramCreationSpec,
  type DiagramCreationResult
} from '../diagrams/metadata';
import { supabase } from '../db/client';
import type { Subject } from '../types';

interface ImportRow {
  title: string;
  templateId?: string;
  mode?: 'auto' | 'template' | 'asset';
  placement?: 'above' | 'inline' | 'below' | 'side';
  caption?: string;
  alt?: string;
  subjectId?: string;
  tags?: string;
  params?: Record<string, any>;
}

interface ImportResult {
  total: number;
  successful: number;
  failed: number;
  results: DiagramCreationResult[];
}

export function DiagramMetadataImporter() {
  const { success, error: showError, info } = useToast();
  const [loading, setLoading] = useState(false);
  const [importing, setImporting] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [importData, setImportData] = useState<ImportRow[]>([]);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);

  const loadSubjects = async () => {
    try {
      const { data, error } = await supabase.from('subjects').select('*').order('name');
      if (error) throw error;
      setSubjects(data || []);
    } catch (error) {
      showError('Failed to load subjects');
    }
  };

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    try {
      const text = await file.text();
      let data: ImportRow[] = [];

      if (file.name.endsWith('.json')) {
        data = JSON.parse(text);
      } else if (file.name.endsWith('.csv')) {
        data = parseCSV(text);
      } else {
        showError('Unsupported file format. Use JSON or CSV.');
        return;
      }

      setImportData(data);
      await loadSubjects();
      success(`Loaded ${data.length} rows`);
    } catch (error) {
      showError('Error parsing file');
    } finally {
      setLoading(false);
    }
  };

  const parseCSV = (text: string): ImportRow[] => {
    const lines = text.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const rows: ImportRow[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      const row: Record<string, unknown> = { title: '' };

      headers.forEach((header, index) => {
        const value = values[index];
        if (header === 'title') {
          row.title = value ?? '';
        } else if (value) {
          if (header === 'tags') {
            row.tags = value;
          } else if (header === 'params') {
            try {
              row.params = JSON.parse(value);
            } catch {
              row.params = {};
            }
          } else {
            (row as any)[header] = value;
          }
        }
      });

      if (row.title) {
        rows.push(row as unknown as ImportRow);
      }
    }

    return rows;
  };

  const handleImport = async () => {
    if (importData.length === 0) {
      showError('No data to import');
      return;
    }

    setImporting(true);
    try {
      const specs: DiagramCreationSpec[] = importData.map(row => ({
        title: row.title,
        metadata: {
          mode: row.mode || 'auto',
          templateId: row.templateId,
          placement: row.placement || 'inline',
          caption: row.caption,
          alt: row.alt,
          params: row.params
        },
        subjectId: row.subjectId,
        tags: row.tags ? row.tags.split(';').map(t => t.trim()) : []
      }));

      const results = await createDiagramsBatch(specs);
      const successful = results.filter(r => r.success).length;
      const failed = results.filter(r => !r.success).length;

      setImportResult({
        total: results.length,
        successful,
        failed,
        results
      });

      if (failed === 0) {
        success(`Import complete: ${successful} successful, ${failed} failed`);
      } else {
        info(`Import complete: ${successful} successful, ${failed} failed`);
      }
    } catch (error) {
      showError('Import failed');
    } finally {
      setImporting(false);
    }
  };

  const downloadTemplate = () => {
    const template = [
      ['title', 'templateId', 'mode', 'placement', 'caption', 'alt', 'subjectId', 'tags'],
      [
        'Right Triangle Example',
        'math.trig.right_triangle.v1',
        'auto',
        'inline',
        'A right triangle with labeled sides',
        'Right triangle diagram',
        '',
        'trigonometry;triangles'
      ]
    ];

    const csv = template.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagram-metadata-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Bulk Import Diagrams</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Import diagram metadata from CSV or JSON files
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 mb-8">
        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-semibold mb-2">Upload CSV or JSON file</p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Drag and drop or click to select
          </p>
          <label className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors">
            Choose File
            <input
              type="file"
              accept=".csv,.json"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
              className="hidden"
              disabled={loading}
            />
          </label>
          <button
            onClick={downloadTemplate}
            className="ml-4 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Download Template
          </button>
        </div>
      </div>

      {/* Preview Section */}
      {importData.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 mb-8">
          <h2 className="text-xl font-bold mb-4">Preview ({importData.length} rows)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 px-4">Title</th>
                  <th className="text-left py-2 px-4">Template</th>
                  <th className="text-left py-2 px-4">Mode</th>
                  <th className="text-left py-2 px-4">Placement</th>
                </tr>
              </thead>
              <tbody>
                {importData.slice(0, 5).map((row, idx) => (
                  <tr key={idx} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-2 px-4">{row.title}</td>
                    <td className="py-2 px-4 text-xs text-gray-500">{row.templateId || '-'}</td>
                    <td className="py-2 px-4 text-xs">{row.mode || 'auto'}</td>
                    <td className="py-2 px-4 text-xs">{row.placement || 'inline'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {importData.length > 5 && (
              <p className="text-sm text-gray-500 mt-2">
                ... and {importData.length - 5} more rows
              </p>
            )}
          </div>

          <button
            onClick={handleImport}
            disabled={importing}
            className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
          >
            {importing ? 'Importing...' : 'Start Import'}
          </button>
        </div>
      )}

      {/* Results Section */}
      {importResult && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
          <h2 className="text-xl font-bold mb-4">Import Results</h2>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
              <p className="text-2xl font-bold">{importResult.total}</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Successful</p>
              <p className="text-2xl font-bold text-green-600">{importResult.successful}</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900 p-4 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">Failed</p>
              <p className="text-2xl font-bold text-red-600">{importResult.failed}</p>
            </div>
          </div>

          {/* Failed Items */}
          {importResult.failed > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                Failed Items
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {importResult.results
                  .filter(r => !r.success)
                  .map((result, idx) => (
                    <div key={idx} className="bg-red-50 dark:bg-red-900 p-3 rounded text-sm">
                      <p className="font-semibold text-red-700 dark:text-red-300">
                        {result.errors[0]}
                      </p>
                      {result.warnings.length > 0 && (
                        <p className="text-red-600 dark:text-red-400 text-xs mt-1">
                          {result.warnings.join('; ')}
                        </p>
                      )}
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
