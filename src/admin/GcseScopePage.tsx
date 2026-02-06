/**
 * Admin page for the hard-coded GCSE scope.
 * Shows the canonical list of subjects and papers, "Sync to database", and "Seed golden questions".
 */

import { useState, useEffect } from 'react';
import { db } from '../db/client';
import { GCSE_SCOPE_SUBJECTS, getTierOptionsForSubject } from '../config/gcseScope';
import { syncGcseScopeToDb } from '../config/gcseScopeSync';
import { seedGoldenQuestionsForSubject, type GoldenSeedPaperFilter } from '../config/goldenQuestionSeed';
import { useToast } from '../contexts/ToastContext';
import { FileText, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import type { Subject } from '../types';

export function GcseScopePage() {
  const { showToast } = useToast();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [paperFilter, setPaperFilter] = useState<GoldenSeedPaperFilter>('all');
  const [syncing, setSyncing] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [lastResult, setLastResult] = useState<{
    subjectsCreated: number;
    subjectsSkipped: number;
    papersCreated: number;
    papersSkipped: number;
    errors: string[];
  } | null>(null);
  const [seedResult, setSeedResult] = useState<{
    created: number;
    skipped: number;
    errors: string[];
  } | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    setLoadError(null);
    db.getSubjects()
      .then((list) => {
        setSubjects(Array.isArray(list) ? list : []);
      })
      .catch((err) => {
        const message = err instanceof Error ? err.message : String(err);
        setLoadError(message);
        setSubjects([]);
      });
  }, []);

  useEffect(() => {
    const list = Array.isArray(subjects) ? subjects : [];
    if (list.length > 0 && !selectedSubjectId) {
      const maths = list.find(s => s.name.toLowerCase() === 'maths');
      setSelectedSubjectId(maths?.id ?? list[0].id);
    }
  }, [subjects, selectedSubjectId]);

  const handleSync = async () => {
    setSyncing(true);
    setLastResult(null);
    try {
      const result = await syncGcseScopeToDb();
      setLastResult(result);
      if (result.errors.length > 0) {
        showToast('error', `Sync completed with ${result.errors.length} error(s)`);
      } else {
        showToast('success', `Synced: ${result.subjectsCreated} subjects, ${result.papersCreated} papers created`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      showToast('error', message);
      setLastResult({ subjectsCreated: 0, subjectsSkipped: 0, papersCreated: 0, papersSkipped: 0, errors: [message] });
    } finally {
      setSyncing(false);
    }
  };

  const handleSeedGolden = async () => {
    if (!selectedSubjectId) {
      showToast('error', 'Select a subject');
      return;
    }
    setSeeding(true);
    setSeedResult(null);
    try {
      const result = await seedGoldenQuestionsForSubject(selectedSubjectId, paperFilter);
      setSeedResult(result);
      if (result.errors.length > 0 && result.created === 0 && result.skipped === 0) {
        showToast('error', result.errors[0] ?? 'Seed failed');
      } else {
        showToast('success', `Golden seed: ${result.created} created, ${result.skipped} skipped`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      showToast('error', message);
      setSeedResult({ created: 0, skipped: 0, errors: [message] });
    } finally {
      setSeeding(false);
    }
  };

  const subjectList = Array.isArray(subjects) ? subjects : [];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">GCSE Scope</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Hard-coded subjects and papers. Sync this scope into the database so quizzes, filters, and imports sit on solid rails.
        </p>
      </div>

      {loadError && (
        <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-center gap-2 text-amber-800 dark:text-amber-200">
          <AlertCircle size={20} />
          <span>Could not load subjects from database: {loadError}</span>
        </div>
      )}

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <button
          onClick={handleSync}
          disabled={syncing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-medium"
        >
          <RefreshCw size={18} className={syncing ? 'animate-spin' : ''} />
          {syncing ? 'Syncing…' : 'Sync scope to database'}
        </button>
        {lastResult && (
          <div className="flex items-center gap-4 text-sm">
            <span className="text-green-600 dark:text-green-400">
              +{lastResult.subjectsCreated} subjects, +{lastResult.papersCreated} papers
            </span>
            {(lastResult.subjectsSkipped > 0 || lastResult.papersSkipped > 0) && (
              <span className="text-gray-500">
                {lastResult.subjectsSkipped} subjects, {lastResult.papersSkipped} papers already present
              </span>
            )}
            {lastResult.errors.length > 0 && (
              <span className="text-red-600 dark:text-red-400">{lastResult.errors.length} error(s)</span>
            )}
          </div>
        )}
      </div>

      {lastResult?.errors && lastResult.errors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex items-center gap-2 text-red-800 dark:text-red-200 font-medium mb-2">
            <AlertCircle size={18} /> Errors
          </div>
          <ul className="list-disc list-inside text-sm text-red-700 dark:text-red-300 space-y-1">
            {lastResult.errors.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Seed golden questions */}
      <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Seed golden questions</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Create prompts from the hard-coded golden list (e.g. Maths F1-01–F3-08, H1-01–H3-10). Subject and paper determine which questions are seeded. Run scope sync first so papers exist.
        </p>
        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white min-w-[180px]"
            >
              {subjectList.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Paper</label>
            <select
              value={paperFilter}
              onChange={(e) => {
                const v = e.target.value;
                setPaperFilter(v === 'all' ? 'all' : (Number(v) as 1 | 2 | 3));
              }}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All papers</option>
              <option value={1}>Paper 1</option>
              <option value={2}>Paper 2</option>
              <option value={3}>Paper 3</option>
            </select>
          </div>
          <button
            onClick={handleSeedGolden}
            disabled={seeding || subjectList.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white rounded-lg font-medium"
          >
            <Sparkles size={18} className={seeding ? 'animate-pulse' : ''} />
            {seeding ? 'Seeding…' : 'Seed golden questions'}
          </button>
        </div>
        {seedResult && (
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
            <span className="text-green-600 dark:text-green-400">{seedResult.created} created</span>
            <span className="text-gray-500">{seedResult.skipped} skipped (already exist)</span>
            {seedResult.errors.length > 0 && (
              <span className="text-red-600 dark:text-red-400">{seedResult.errors.length} error(s)</span>
            )}
          </div>
        )}
        {seedResult?.errors && seedResult.errors.length > 0 && (
          <ul className="mt-2 list-disc list-inside text-sm text-red-700 dark:text-red-300">
            {seedResult.errors.slice(0, 10).map((e, i) => (
              <li key={i}>{e}</li>
            ))}
            {seedResult.errors.length > 10 && (
              <li>… and {seedResult.errors.length - 10} more</li>
            )}
          </ul>
        )}
      </div>

      <div className="space-y-6">
        {GCSE_SCOPE_SUBJECTS.map((subject) => {
          const tierOptions = getTierOptionsForSubject(subject);
          return (
            <div
              key={subject.slug}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex flex-wrap items-center gap-3">
                <span className="text-2xl" aria-hidden>{subject.icon}</span>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{subject.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {subject.category} · {subject.examBoard}
                    {tierOptions.length > 0 && (
                      <span className="ml-2">
                        · Tiers: {tierOptions.join(', ')}
                      </span>
                    )}
                  </p>
                </div>
              </div>
              <div className="px-4 py-3 flex flex-wrap gap-2">
                {subject.papers.map((p) => (
                  <span
                    key={p.paperNumber}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-700 text-sm text-gray-800 dark:text-gray-200"
                  >
                    <FileText size={14} />
                    Paper {p.paperNumber}: {p.name}
                    {p.calculatorAllowedDefault && (
                      <span className="text-xs text-gray-500">(calc)</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
