import { useState, useEffect } from 'react';
import { Database, Plus, RefreshCw, Eye, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../db/client';
import { Quiz, Subject, Unit, Topic } from '../types';
import {
  validateQuizCoverage,
  validateQuizCoverageWithDetails,
  syncQuizPromptCoverage,
  getCoverageStatus,
  CoverageStatus,
} from './quizValidation';

interface QuizWithValidation {
  quiz: Quiz;
  status: CoverageStatus | 'loading';
  validation?: any;
}

export function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [quizzesWithValidation, setQuizzesWithValidation] = useState<QuizWithValidation[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [filterScope, setFilterScope] = useState<'all' | 'topic' | 'unit' | 'full'>('all');
  const [filterSubject, setFilterSubject] = useState<string>('all');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const subjectData = await db.getSubjects();
    setSubjects(subjectData);

    const allQuizzes: Quiz[] = [];
    const allUnits: Unit[] = [];
    const allTopics: Topic[] = [];

    for (const subject of subjectData) {
      const [subjectQuizzes, subjectUnits, subjectTopics] = await Promise.all([
        db.getQuizzesBySubject(subject.id),
        db.getUnits(subject.id),
        db.getTopics(subject.id),
      ]);
      allQuizzes.push(...subjectQuizzes);
      allUnits.push(...subjectUnits);
      allTopics.push(...subjectTopics);
    }

    setQuizzes(allQuizzes);
    setUnits(allUnits);
    setTopics(allTopics);

    const withValidation = allQuizzes.map((quiz: Quiz) => ({
      quiz,
      status: 'loading' as const,
    }));
    setQuizzesWithValidation(withValidation);
    setLoading(false);

    for (const item of withValidation) {
      const validation = await validateQuizCoverage(item.quiz);
      const status = getCoverageStatus(validation);
      setQuizzesWithValidation(prev =>
        prev.map(q =>
          q.quiz.id === item.quiz.id ? { ...q, status, validation } : q
        )
      );
    }
  };

  const syncQuiz = async (quizId: string) => {
    setSyncing(quizId);
    try {
      const quiz = quizzes.find(q => q.id === quizId);
      if (!quiz) return;

      const newPromptIds = await syncQuizPromptCoverage(quiz);
      await db.updateQuiz(quizId, { promptIds: newPromptIds });

      await loadData();
      alert('Quiz coverage synced successfully!');
    } catch (error) {
      alert('Failed to sync quiz: ' + error);
    } finally {
      setSyncing(null);
    }
  };

  const viewDetails = async (quizId: string) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) return;

    const validation = await validateQuizCoverageWithDetails(quiz);
    setShowDetails(quizId);

    let message = `Quiz: ${quiz.title}\n\n`;
    message += `Scope: ${quiz.scopeType}\n`;
    message += `Expected: ${validation.expectedCount} prompts\n`;
    message += `Actual: ${validation.actualCount} prompts\n\n`;

    if (validation.missingPromptIds.length > 0) {
      message += `Missing ${validation.missingPromptIds.length} prompts:\n`;
      validation.missingPrompts?.slice(0, 5).forEach((p: any) => {
        message += `- ${p.question.substring(0, 50)}...\n`;
      });
      if (validation.missingPromptIds.length > 5) {
        message += `... and ${validation.missingPromptIds.length - 5} more\n`;
      }
      message += '\n';
    }

    if (validation.extraPromptIds.length > 0) {
      message += `Extra ${validation.extraPromptIds.length} prompts:\n`;
      validation.extraPrompts?.slice(0, 5).forEach((p: any) => {
        message += `- ${p.question.substring(0, 50)}...\n`;
      });
      if (validation.extraPromptIds.length > 5) {
        message += `... and ${validation.extraPromptIds.length - 5} more\n`;
      }
    }

    alert(message);
    setShowDetails(null);
  };

  const deleteQuiz = async (quizId: string) => {
    if (!confirm({ title: 'Confirm', message: 'Are you sure you want to delete this quiz?' })) return;

    try {
      await db.deleteQuiz(quizId);
      await loadData();
    } catch (error) {
      alert('Failed to delete quiz: ' + error);
    }
  };

  const getStatusBadge = (status: CoverageStatus | 'loading', validation?: any) => {
    if (status === 'loading') return <span className="text-xs text-gray-500">Checking...</span>;

    const colors = {
      complete: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      missing: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      extras: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
      both: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    };

    const labels = {
      complete: '✅ Complete',
      missing: `⚠ Missing ${validation?.missingPromptIds.length || 0}`,
      extras: `⚠ Extras ${validation?.extraPromptIds.length || 0}`,
      both: `❌ Issues`,
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${colors[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getRelatedName = (quiz: Quiz) => {
    if (quiz.scopeType === 'topic') {
      const topic = topics.find(t => t.id === quiz.topicId);
      return topic?.name || 'Unknown Topic';
    } else if (quiz.scopeType === 'unit') {
      const unit = units.find(u => u.id === quiz.unitId);
      return unit?.name || 'Unknown Unit';
    }
    return 'Full GCSE';
  };

  const filteredQuizzes = quizzesWithValidation.filter(item => {
    if (filterScope !== 'all' && item.quiz.scopeType !== filterScope) return false;
    if (filterSubject !== 'all' && item.quiz.subjectId !== filterSubject) return false;
    return true;
  });

  const scopeOrder = { full: 0, unit: 1, topic: 2 };
  const sortedQuizzes = [...filteredQuizzes].sort((a, b) => {
    const scopeDiff = scopeOrder[a.quiz.scopeType] - scopeOrder[b.quiz.scopeType];
    if (scopeDiff !== 0) return scopeDiff;
    return a.quiz.title.localeCompare(b.quiz.title);
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quizzes</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage quiz collections and validate coverage
          </p>
        </div>
        <Link
          to="/admin/tools"
          className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors"
        >
          <Plus size={20} />
          Batch Create Quizzes
        </Link>
      </div>

      <div className="flex gap-4">
        <select
          value={filterScope}
          onChange={e => setFilterScope(e.target.value as any)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white"
        >
          <option value="all">All Scopes</option>
          <option value="full">Full GCSE</option>
          <option value="unit">Unit</option>
          <option value="topic">Topic</option>
        </select>

        <select
          value={filterSubject}
          onChange={e => setFilterSubject(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white"
        >
          <option value="all">All Subjects</option>
          {subjects.map(subject => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <RefreshCw size={48} className="mx-auto text-gray-400 animate-spin mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading quizzes...</p>
        </div>
      ) : sortedQuizzes.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center">
          <Database size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No quizzes yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Use the batch tools to automatically create quizzes from your prompts.
          </p>
          <Link
            to="/admin/tools"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors"
          >
            Go to Tools
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Quiz
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Scope
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Prompts
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sortedQuizzes.map(({ quiz, status, validation }) => {
                const subject = subjects.find(s => s.id === quiz.subjectId);
                const isSyncing = syncing === quiz.id;
                const isViewing = showDetails === quiz.id;

                return (
                  <tr key={quiz.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {quiz.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {getRelatedName(quiz)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize text-sm text-gray-700 dark:text-gray-300">
                        {quiz.scopeType}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {subject?.name || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        {validation ? (
                          <>
                            <span className={validation.isValid ? 'text-green-600' : 'text-red-600'}>
                              {quiz.promptIds.length}
                            </span>
                            {' / '}
                            {validation.expectedCount}
                          </>
                        ) : (
                          quiz.promptIds.length
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(status, validation)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => viewDetails(quiz.id)}
                          disabled={isViewing || status === 'loading'}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg disabled:opacity-50 transition-colors"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => syncQuiz(quiz.id)}
                          disabled={isSyncing || status === 'loading'}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg disabled:opacity-50 transition-colors"
                          title="Sync Coverage"
                        >
                          <RefreshCw size={16} className={isSyncing ? 'animate-spin' : ''} />
                        </button>
                        <button
                          onClick={() => deleteQuiz(quiz.id)}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          title="Delete Quiz"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          Quiz Hierarchy Rules
        </h4>
        <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>Full GCSE:</strong> Must include ALL prompts in the subject</li>
          <li>• <strong>Unit Quiz:</strong> Must include ALL prompts in that unit</li>
          <li>• <strong>Topic Quiz:</strong> Must include ALL prompts in that topic</li>
        </ul>
        <p className="mt-3 text-sm text-blue-700 dark:text-blue-300">
          Use "Sync Coverage" to automatically update a quiz's prompts to match its scope.
          Use "Coverage Audit" in the sidebar to check and fix all quizzes at once.
        </p>
      </div>
    </div>
  );
}
