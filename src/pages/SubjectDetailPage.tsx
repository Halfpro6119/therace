import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Clock, Award } from 'lucide-react';
import { db } from '../db/client';
import { QuizTile } from '../components/QuizTile';
import { HeatmapGrid } from '../components/HeatmapGrid';
import { storage } from '../utils/storage';
import { MasteryLevel, Subject, Quiz, Topic } from '../types';

type TabType = 'topics' | 'units' | 'full' | 'heatmap';

export function SubjectDetailPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('topics');
  const [subject, setSubject] = useState<Subject | null>(null);
  const [subjectQuizzes, setSubjectQuizzes] = useState<Quiz[]>([]);
  const [subjectTopics, setSubjectTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [subjectId]);

  const loadData = async () => {
    if (!subjectId) return;

    try {
      const [subjectData, quizzesData, topicsData] = await Promise.all([
        db.getSubject(subjectId),
        db.getQuizzesBySubject(subjectId),
        db.getTopics(subjectId)
      ]);
      setSubject(subjectData || null);
      setSubjectQuizzes(quizzesData);
      setSubjectTopics(topicsData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!subject) return <div>Subject not found</div>;
  const topicQuizzes = subjectQuizzes.filter(q => q.scopeType === 'topic').sort((a, b) => a.title.localeCompare(b.title));
  const unitQuizzes = subjectQuizzes.filter(q => q.scopeType === 'unit').sort((a, b) => a.title.localeCompare(b.title));
  const fullQuizzes = subjectQuizzes.filter(q => q.scopeType === 'full').sort((a, b) => a.title.localeCompare(b.title));

  const masteryStates = storage.getMasteryStates();
  const attempts = storage.getAttempts();

  const getSubjectStats = () => {
    let totalMastery = 0;
    let masteredCount = 0;
    let totalTime = 0;

    subjectQuizzes.forEach(quiz => {
      const state = masteryStates[quiz.id];
      const level: MasteryLevel = state?.masteryLevel ?? 0;
      totalMastery += (level / 4) * 100;
      if (level >= 3) masteredCount++;

      const quizAttempts = attempts.filter(a => a.quizId === quiz.id);
      quizAttempts.forEach(a => totalTime += a.timeTakenSec);
    });

    return {
      readinessPercent: Math.round(totalMastery / subjectQuizzes.length) || 0,
      masteredCount,
      totalQuizzes: subjectQuizzes.length,
      totalTimeMinutes: Math.round(totalTime / 60),
    };
  };

  const stats = getSubjectStats();

  const tabs: { id: TabType; label: string; count: number }[] = [
    { id: 'topics', label: 'Topics', count: topicQuizzes.length },
    { id: 'units', label: 'Units', count: unitQuizzes.length },
    { id: 'full', label: 'Full GCSE', count: fullQuizzes.length },
    { id: 'heatmap', label: 'Heatmap', count: 0 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <button
        onClick={() => navigate('/subjects')}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Subjects</span>
      </button>

      <div className={`bg-gradient-to-br ${subject.themeColor} rounded-2xl p-8 text-white shadow-xl`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{subject.name}</h1>
            <p className="text-white/90 text-lg">{subject.examBoard}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target size={20} />
              <span className="text-sm font-medium">Readiness</span>
            </div>
            <p className="text-3xl font-bold">{stats.readinessPercent}%</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award size={20} />
              <span className="text-sm font-medium">Mastered</span>
            </div>
            <p className="text-3xl font-bold">{stats.masteredCount}/{stats.totalQuizzes}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={20} />
              <span className="text-sm font-medium">Time Spent</span>
            </div>
            <p className="text-3xl font-bold">{stats.totalTimeMinutes}m</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award size={20} />
              <span className="text-sm font-medium">Topics</span>
            </div>
            <p className="text-3xl font-bold">{subjectTopics.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'topics' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Topic Quizzes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {topicQuizzes.map(quiz => (
                  <QuizTile key={quiz.id} quiz={quiz} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'units' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Unit Tests
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {unitQuizzes.map(quiz => (
                  <QuizTile key={quiz.id} quiz={quiz} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'full' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Full GCSE Quizzes
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Test your complete mastery with comprehensive quizzes covering all units
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fullQuizzes.map(quiz => (
                  <QuizTile key={quiz.id} quiz={quiz} />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'heatmap' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Mastery Heatmap
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Visualize your progress across all topics. Darker colors indicate higher mastery.
              </p>
              <HeatmapGrid topics={subjectTopics} quizzes={topicQuizzes} />

              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Legend</h3>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-gray-300 dark:bg-gray-700" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Unseen (0)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-orange-300 dark:bg-orange-900" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Learning (1)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-yellow-300 dark:bg-yellow-900" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Secure (2)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-400 dark:bg-green-900" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Mastered (3)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-purple-400 dark:bg-purple-900" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Grade 9 (4)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
