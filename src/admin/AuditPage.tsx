import { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, XCircle, RefreshCw, ChevronDown, ChevronRight } from 'lucide-react';
import { db } from '../db/client';
import { Subject } from '../types';
import {
  generateSubjectCoverageReport,
  syncAllQuizzesInSubject,
  SubjectCoverageReport,
  CoverageStatus,
} from './quizValidation';

export function AuditPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [reports, setReports] = useState<Map<string, SubjectCoverageReport>>(new Map());
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set());
  const [syncing, setSyncing] = useState<string | null>(null);

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    const subs = await db.getSubjects();
    setSubjects(subs);
  };

  const loadReport = async (subjectId: string) => {
    const report = await generateSubjectCoverageReport(subjectId);
    setReports(prev => new Map(prev).set(subjectId, report));
    setExpandedSubjects(prev => new Set(prev).add(subjectId));
  };

  const syncSubject = async (subjectId: string) => {
    setSyncing(subjectId);
    try {
      await syncAllQuizzesInSubject(subjectId);
      await loadReport(subjectId);
      alert('Successfully synced all quizzes in subject!');
    } catch (error) {
      alert('Failed to sync quizzes: ' + error);
    } finally {
      setSyncing(null);
    }
  };

  const toggleSubject = (subjectId: string) => {
    if (expandedSubjects.has(subjectId)) {
      setExpandedSubjects(prev => {
        const next = new Set(prev);
        next.delete(subjectId);
        return next;
      });
    } else {
      loadReport(subjectId);
    }
  };

  const getStatusIcon = (status: CoverageStatus) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="text-green-600" size={18} />;
      case 'missing':
        return <AlertTriangle className="text-yellow-600" size={18} />;
      case 'extras':
        return <AlertTriangle className="text-orange-600" size={18} />;
      case 'both':
        return <XCircle className="text-red-600" size={18} />;
    }
  };

  const getStatusText = (status: CoverageStatus, validation: any) => {
    switch (status) {
      case 'complete':
        return '✅ Complete';
      case 'missing':
        return `⚠ Missing ${validation.missingPromptIds.length}`;
      case 'extras':
        return `⚠ Has ${validation.extraPromptIds.length} extras`;
      case 'both':
        return `❌ Missing ${validation.missingPromptIds.length}, ${validation.extraPromptIds.length} extras`;
    }
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Coverage Audit</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Verify and fix quiz prompt coverage across all subjects. Each quiz must contain exactly the prompts defined by its scope.
        </p>
      </div>

      <div className="space-y-4">
        {subjects.map(subject => {
          const report = reports.get(subject.id);
          const isExpanded = expandedSubjects.has(subject.id);
          const isSyncing = syncing === subject.id;

          return (
            <div key={subject.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => toggleSubject(subject.id)}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  >
                    {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                  </button>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{subject.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{subject.examBoard}</p>
                  </div>
                </div>

                {report && (
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {report.totalPrompts} total prompts
                    </div>
                    <button
                      onClick={() => syncSubject(subject.id)}
                      disabled={isSyncing}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                    >
                      <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
                      {isSyncing ? 'Syncing...' : 'Fix All'}
                    </button>
                  </div>
                )}
              </div>

              {isExpanded && report && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900/50 space-y-6">
                  {report.fullQuizzes.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Full GCSE Quizzes</h4>
                      <div className="space-y-2">
                        {report.fullQuizzes.map(({ quiz, validation, status }) => (
                          <div
                            key={quiz.id}
                            className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700"
                          >
                            <div className="flex items-center gap-3">
                              {getStatusIcon(status)}
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">{quiz.title}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {validation.actualCount} / {validation.expectedCount} prompts
                                </div>
                              </div>
                            </div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {getStatusText(status, validation)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {report.unitQuizzes.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Unit Quizzes</h4>
                      <div className="space-y-2">
                        {report.unitQuizzes.map(({ quiz, validation, status }) => (
                          <div
                            key={quiz.id}
                            className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700"
                          >
                            <div className="flex items-center gap-3">
                              {getStatusIcon(status)}
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">{quiz.title}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {validation.actualCount} / {validation.expectedCount} prompts
                                </div>
                              </div>
                            </div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {getStatusText(status, validation)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {report.topicQuizzes.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Topic Quizzes</h4>
                      <div className="space-y-2">
                        {report.topicQuizzes.map(({ quiz, validation, status }) => (
                          <div
                            key={quiz.id}
                            className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700"
                          >
                            <div className="flex items-center gap-3">
                              {getStatusIcon(status)}
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">{quiz.title}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  {validation.actualCount} / {validation.expectedCount} prompts
                                </div>
                              </div>
                            </div>
                            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {getStatusText(status, validation)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
