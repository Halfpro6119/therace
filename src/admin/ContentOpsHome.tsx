import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../db/client';
import { Subject, Unit, Topic, Prompt, Quiz } from '../types';
import {
  calculateSubjectHealth,
  SubjectHealthData,
  validateCoverage,
  getExpectedPromptsForQuiz,
} from './contentOpsUtils';
import {
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  FileText,
  Target,
  Database,
} from 'lucide-react';

export function ContentOpsHome() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [allUnits, setAllUnits] = useState<Unit[]>([]);
  const [allTopics, setAllTopics] = useState<Topic[]>([]);
  const [allPrompts, setAllPrompts] = useState<Prompt[]>([]);
  const [allQuizzes, setAllQuizzes] = useState<Quiz[]>([]);
  const [healthData, setHealthData] = useState<SubjectHealthData[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'good' | 'warning' | 'error'>('all');
  const [sortBy, setSortBy] = useState<'health' | 'prompts' | 'missing'>('health');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (subjects.length > 0) {
      calculateHealth();
    }
  }, [subjects, allUnits, allTopics, allPrompts, allQuizzes]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [subjectsData, promptsData] = await Promise.all([
        db.getSubjects(),
        db.getAllPrompts(),
      ]);

      setSubjects(subjectsData);
      setAllPrompts(promptsData);

      const unitsPromises = subjectsData.map(s => db.getUnits(s.id));
      const topicsPromises = subjectsData.map(s => db.getTopics(s.id));
      const quizzesPromises = subjectsData.map(s => db.getQuizzesBySubject(s.id));

      const [unitsData, topicsData, quizzesData] = await Promise.all([
        Promise.all(unitsPromises),
        Promise.all(topicsPromises),
        Promise.all(quizzesPromises),
      ]);

      setAllUnits(unitsData.flat());
      setAllTopics(topicsData.flat());
      setAllQuizzes(quizzesData.flat());
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateHealth = () => {
    const health = subjects.map(subject => {
      const units = allUnits.filter(u => u.subjectId === subject.id);
      const topics = allTopics.filter(t => t.subjectId === subject.id);
      const prompts = allPrompts.filter(p => p.subjectId === subject.id);
      const quizzes = allQuizzes.filter(q => q.subjectId === subject.id);

      return calculateSubjectHealth(subject, units, topics, prompts, quizzes);
    });

    setHealthData(health);
  };

  const globalKPIs = {
    totalSubjects: subjects.length,
    totalPrompts: allPrompts.length,
    totalQuizzes: allQuizzes.length,
    coverageHealthPct: healthData.length > 0
      ? Math.round((healthData.filter(h => h.coverageStatus === 'good').length / healthData.length) * 100)
      : 0,
    missingQuizzes: healthData.reduce((sum, h) => sum + h.missingQuizCount, 0),
    targetsSetPct: allQuizzes.length > 0
      ? Math.round((allQuizzes.filter(q => q.grade9TargetSec > 0 && q.timeLimitSec > 0).length / allQuizzes.length) * 100)
      : 0,
  };

  const filteredHealth = healthData
    .filter(h => {
      if (filterStatus === 'all') return true;
      return h.coverageStatus === filterStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'health') {
        const order = { error: 0, warning: 1, good: 2 };
        return order[a.coverageStatus] - order[b.coverageStatus];
      } else if (sortBy === 'prompts') {
        return b.promptCount - a.promptCount;
      } else {
        return b.missingQuizCount - a.missingQuizCount;
      }
    });

  const StatusIcon = ({ status }: { status: 'good' | 'warning' | 'error' }) => {
    if (status === 'good') return <CheckCircle size={18} className="text-green-500" />;
    if (status === 'warning') return <AlertTriangle size={18} className="text-yellow-500" />;
    return <AlertCircle size={18} className="text-red-500" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Content Operations</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Scale and maintain your quiz library with confidence
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/ops/import-log')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
        >
          <FileText size={18} />
          <span>Import Log</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3 mb-2">
            <Database size={20} className="text-blue-500" />
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Subjects</div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {globalKPIs.totalSubjects}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3 mb-2">
            <FileText size={20} className="text-green-500" />
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Prompts</div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {globalKPIs.totalPrompts}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp size={20} className="text-purple-500" />
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Quizzes</div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {globalKPIs.totalQuizzes}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle size={20} className="text-green-500" />
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Coverage Health</div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {globalKPIs.coverageHealthPct}%
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle size={20} className="text-red-500" />
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Missing</div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {globalKPIs.missingQuizzes}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3 mb-2">
            <Target size={20} className="text-orange-500" />
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Targets Set</div>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {globalKPIs.targetsSetPct}%
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Subject Health</h2>
          <div className="flex items-center gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="good">Good</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white"
            >
              <option value="health">Sort by Health</option>
              <option value="prompts">Sort by Prompts</option>
              <option value="missing">Sort by Missing</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 dark:border-gray-700">
              <tr className="text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                <th className="pb-3 pr-4">Subject</th>
                <th className="pb-3 px-4">Prompts</th>
                <th className="pb-3 px-4">Topics</th>
                <th className="pb-3 px-4">Units</th>
                <th className="pb-3 px-4">Required</th>
                <th className="pb-3 px-4">Existing</th>
                <th className="pb-3 px-4">Missing</th>
                <th className="pb-3 px-4">Coverage</th>
                <th className="pb-3 px-4">Targets</th>
                <th className="pb-3 pl-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredHealth.map((health) => (
                <tr
                  key={health.subject.id}
                  className="text-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="py-4 pr-4">
                    <button
                      onClick={() => navigate(`/admin/ops/subjects/${health.subject.id}`)}
                      className="font-medium text-red-600 dark:text-red-400 hover:underline text-left"
                    >
                      {health.subject.name}
                    </button>
                  </td>
                  <td className="py-4 px-4">{health.promptCount}</td>
                  <td className="py-4 px-4">{health.topicCount}</td>
                  <td className="py-4 px-4">{health.unitCount}</td>
                  <td className="py-4 px-4">{health.requiredQuizCount}</td>
                  <td className="py-4 px-4">{health.existingQuizCount}</td>
                  <td className="py-4 px-4">
                    <span className={health.missingQuizCount > 0 ? 'text-red-600 dark:text-red-400 font-semibold' : ''}>
                      {health.missingQuizCount}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <StatusIcon status={health.coverageStatus} />
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <StatusIcon status={health.targetStatus} />
                    </div>
                  </td>
                  <td className="py-4 pl-4">
                    <button
                      onClick={() => navigate(`/admin/ops/subjects/${health.subject.id}`)}
                      className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-medium transition-colors"
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredHealth.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No subjects match the current filter
          </div>
        )}
      </div>
    </div>
  );
}
