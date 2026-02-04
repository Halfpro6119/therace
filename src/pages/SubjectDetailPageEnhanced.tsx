/**
 * Enhanced Subject Detail Page with Paper Master Quizzes
 * 
 * Adds paper master quiz selection alongside existing quiz types
 * No design changes - uses existing QuizTile component
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Target, Clock, Award, BookOpen } from 'lucide-react';
import { db } from '../db/client';
import { QuizTile } from '../components/QuizTile';
import { HeatmapGrid } from '../components/HeatmapGrid';
import { storage } from '../utils/storage';
import { MasteryLevel, Subject, Quiz, Topic, Paper } from '../types';

type PaperFilter = 'all' | 1 | 2 | 3;
type TabType = 'topics' | 'units' | 'papers' | 'full' | 'heatmap';

export function SubjectDetailPageEnhanced() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('topics');
  const [paperFilter, setPaperFilter] = useState<PaperFilter>('all');
  const [subject, setSubject] = useState<Subject | null>(null);
  const [subjectQuizzes, setSubjectQuizzes] = useState<Quiz[]>([]);
  const [paperMasterQuizzes, setPaperMasterQuizzes] = useState<Quiz[]>([]);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [subjectTopics, setSubjectTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [subjectId]);

  const loadData = async () => {
    if (!subjectId) return;

    try {
      const [subjectData, quizzesData, topicsData, papersData, paperMasterQuizzesData] = await Promise.all([
        db.getSubject(subjectId),
        db.getQuizzesBySubject(subjectId),
        db.getTopics(subjectId),
        db.listPapersBySubject(subjectId),
        db.getPaperMasterQuizzesForSubject(subjectId),
      ]);
      
      setSubject(subjectData || null);
      setSubjectQuizzes(quizzesData);
      setSubjectTopics(topicsData);
      setPapers(papersData);
      setPaperMasterQuizzes(paperMasterQuizzesData);
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
    ...(paperMasterQuizzes.length > 0 ? [{ id: 'papers' as TabType, label: 'Papers', count: paperMasterQuizzes.length }] : []),
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

      {/* Subject Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="text-5xl">{subject.icon}</div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{subject.name}</h1>
            <p className="text-gray-600 dark:text-gray-400">{subject.examBoard}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <Target size={18} className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Readiness</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.readinessPercent}%</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <Award size={18} className="text-green-600 dark:text-green-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Mastered</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.masteredCount}/{stats.totalQuizzes}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={18} className="text-orange-600 dark:text-orange-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Time</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalTimeMinutes}m</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={18} className="text-purple-600 dark:text-purple-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">Quizzes</span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalQuizzes}</div>
          </div>
        </div>
      </div>

      
      {/* Paper Filter */}
      {papers.length > 0 && (
        <div className="flex justify-end">
          <div className="inline-flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setPaperFilter('all')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                paperFilter === 'all'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              All Papers
            </button>
            {papers.sort((a, b) => a.paperNumber - b.paperNumber).map(paper => (
              <button
                key={paper.id}
                onClick={() => setPaperFilter(paper.paperNumber as PaperFilter)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  paperFilter === paper.paperNumber
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Paper {paper.paperNumber}
              </button>
            ))}
          </div>
        </div>
      )}

{/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-8 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.label} {tab.count > 0 && <span className="text-sm">({tab.count})</span>}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'topics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topicQuizzes.map(quiz => (
              <QuizTile key={quiz.id} quiz={quiz} paperFilter={paperFilter} />
            ))}
          </div>
        )}

        {activeTab === 'units' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {unitQuizzes.map(quiz => (
              <QuizTile key={quiz.id} quiz={quiz} paperFilter={paperFilter} />
            ))}
          </div>
        )}

        {activeTab === 'papers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paperMasterQuizzes.map(quiz => {
              const paper = papers.find(p => p.id === quiz.paperId);
              return (
                <div key={quiz.id} className="relative">
                  <QuizTile quiz={quiz} />
                  {paper && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded">
                      Paper {paper.paperNumber}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'full' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {fullQuizzes.map(quiz => (
              <QuizTile key={quiz.id} quiz={quiz} paperFilter={paperFilter} />
            ))}
          </div>
        )}

        {activeTab === 'heatmap' && (
          <HeatmapGrid topics={subjectTopics} quizzes={subjectQuizzes} />
        )}
      </div>
    </div>
  );
}
