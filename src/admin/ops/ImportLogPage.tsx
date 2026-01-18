import { useEffect, useState } from 'react';
import { FileText, Download, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export interface ImportRun {
  id: string;
  ranAt: string;
  format: 'csv' | 'json';
  rowsIn: number;
  imported: number;
  skippedDuplicates: number;
  createdSubjects: number;
  createdUnits: number;
  createdTopics: number;
  errorsCount: number;
  errors: Array<{ row: number; message: string }>;
  duplicates: Array<{ row: number; question: string }>;
}

const STORAGE_KEY = 'contentops_import_log';

export function ImportLogPage() {
  const [runs, setRuns] = useState<ImportRun[]>([]);
  const [selectedRun, setSelectedRun] = useState<ImportRun | null>(null);

  useEffect(() => {
    loadRuns();
  }, []);

  const loadRuns = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        setRuns(data);
      }
    } catch (error) {
      console.error('Failed to load import log:', error);
    }
  };

  const exportErrors = (run: ImportRun) => {
    const csv = [
      ['Row', 'Error'],
      ...run.errors.map(e => [e.row, e.message]),
    ]
      .map(row => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `import-errors-${run.id}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearLog = () => {
    if (confirm('Clear all import logs?')) {
      localStorage.removeItem(STORAGE_KEY);
      setRuns([]);
      setSelectedRun(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Import Log</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track import progress and dedupe results
          </p>
        </div>
        {runs.length > 0 && (
          <button
            onClick={clearLog}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Clear Log
          </button>
        )}
      </div>

      {runs.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center">
          <FileText size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No import runs yet</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Import logs will appear here after you import content
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Import Runs</h2>
            <div className="space-y-2">
              {runs.map(run => (
                <button
                  key={run.id}
                  onClick={() => setSelectedRun(run)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedRun?.id === run.id
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(run.ranAt).toLocaleString()}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                      {run.format}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Rows:</span>
                      <span className="ml-2 font-semibold text-gray-900 dark:text-white">
                        {run.rowsIn}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Imported:</span>
                      <span className="ml-2 font-semibold text-green-600 dark:text-green-400">
                        {run.imported}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Duplicates:</span>
                      <span className="ml-2 font-semibold text-yellow-600 dark:text-yellow-400">
                        {run.skippedDuplicates}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">Errors:</span>
                      <span className="ml-2 font-semibold text-red-600 dark:text-red-400">
                        {run.errorsCount}
                      </span>
                    </div>
                  </div>

                  {run.errorsCount === 0 && run.skippedDuplicates === 0 && (
                    <div className="flex items-center gap-2 mt-3 text-green-600 dark:text-green-400 text-sm">
                      <CheckCircle size={14} />
                      <span>Clean import</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {selectedRun && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Run Details</h2>
                {selectedRun.errorsCount > 0 && (
                  <button
                    onClick={() => exportErrors(selectedRun)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Download size={14} />
                    Export Errors
                  </button>
                )}
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Summary</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Created Subjects:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {selectedRun.createdSubjects}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Created Units:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {selectedRun.createdUnits}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Created Topics:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {selectedRun.createdTopics}
                    </span>
                  </div>
                </div>
              </div>

              {selectedRun.errors.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Errors ({selectedRun.errors.length})
                  </h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {selectedRun.errors.slice(0, 200).map((error, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg"
                      >
                        <AlertCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-red-600 dark:text-red-400 mb-1">
                            Row {error.row}
                          </div>
                          <p className="text-sm text-gray-900 dark:text-white break-words">
                            {error.message}
                          </p>
                        </div>
                      </div>
                    ))}
                    {selectedRun.errors.length > 200 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">
                        Showing first 200 errors. Export to see all.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {selectedRun.duplicates.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                    Duplicates ({selectedRun.duplicates.length})
                  </h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {selectedRun.duplicates.slice(0, 200).map((dup, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg"
                      >
                        <AlertCircle size={16} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-yellow-600 dark:text-yellow-400 mb-1">
                            Row {dup.row}
                          </div>
                          <p className="text-sm text-gray-900 dark:text-white break-words">
                            {dup.question}
                          </p>
                        </div>
                      </div>
                    ))}
                    {selectedRun.duplicates.length > 200 && (
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-2">
                        Showing first 200 duplicates
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function logImportRun(run: Omit<ImportRun, 'id' | 'ranAt'>) {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const runs: ImportRun[] = stored ? JSON.parse(stored) : [];

    const newRun: ImportRun = {
      ...run,
      id: Date.now().toString(),
      ranAt: new Date().toISOString(),
    };

    runs.unshift(newRun);

    if (runs.length > 50) {
      runs.splice(50);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(runs));
  } catch (error) {
    console.error('Failed to log import run:', error);
  }
}
