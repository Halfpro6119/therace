import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, Clock, Trophy, Compass } from 'lucide-react';
import { db } from '../db/client';
import { storage } from '../utils/storage';
import { QuizTile } from '../components/QuizTile';
import { Quiz } from '../types';
import { SkeletonQuizTile } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';

type TabType = 'saved' | 'recent' | 'completed';

export function LibraryPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('saved');
  const [savedQuizzes, setSavedQuizzes] = useState<Quiz[]>([]);
  const [recentQuizzes, setRecentQuizzes] = useState<Quiz[]>([]);
  const [completedQuizzes, setCompletedQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedIds = storage.getSavedQuizzes();
      const attempts = storage.getAttempts();

      const recentQuizIds = [...new Set(
        attempts
          .sort((a, b) => new Date(b.finishedAt).getTime() - new Date(a.finishedAt).getTime())
          .slice(0, 20)
          .map(a => a.quizId)
      )];

      const completedIds = Object.keys(storage.getAllMasteryStates()).filter(quizId => {
        const mastery = storage.getMasteryState(quizId);
        return mastery && mastery.masteryLevel >= 3;
      });

      const [subjects] = await Promise.all([db.getSubjects()]);

      const allQuizzes: Quiz[] = [];
      for (const subject of subjects) {
        const quizzes = await db.getQuizzesBySubject(subject.id);
        allQuizzes.push(...quizzes);
      }

      const savedQuizzesData = allQuizzes.filter(q => savedIds.includes(q.id));
      const recentQuizzesData = recentQuizIds
        .map(id => allQuizzes.find(q => q.id === id))
        .filter(Boolean) as Quiz[];
      const completedQuizzesData = allQuizzes.filter(q => completedIds.includes(q.id));

      setSavedQuizzes(savedQuizzesData);
      setRecentQuizzes(recentQuizzesData);
      setCompletedQuizzes(completedQuizzesData);
    } catch (error) {
      console.error('Failed to load library:', error);
    } finally {
      setLoading(false);
    }
  };

  const tabs: { id: TabType; label: string; icon: any; count: number }[] = [
    { id: 'saved', label: 'Saved', icon: Bookmark, count: savedQuizzes.length },
    { id: 'recent', label: 'Recent', icon: Clock, count: recentQuizzes.length },
    { id: 'completed', label: 'Completed', icon: Trophy, count: completedQuizzes.length },
  ];

  const getActiveQuizzes = () => {
    switch (activeTab) {
      case 'saved': return savedQuizzes;
      case 'recent': return recentQuizzes;
      case 'completed': return completedQuizzes;
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <div className="h-10 w-48 bg-gray-200 rounded-lg animate-pulse mb-2" />
          <div className="h-6 w-64 bg-gray-200 rounded-lg animate-pulse" />
        </div>
        <div className="card p-2">
          <div className="flex gap-2">
            <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse" />
            <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse" />
            <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SkeletonQuizTile />
          <SkeletonQuizTile />
          <SkeletonQuizTile />
          <SkeletonQuizTile />
          <SkeletonQuizTile />
          <SkeletonQuizTile />
        </div>
      </div>
    );
  }

  const activeQuizzes = getActiveQuizzes();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
          Library
        </h1>
        <p className="text-base sm:text-lg" style={{ color: 'rgb(var(--text-secondary))' }}>
          Your saved and recent quizzes
        </p>
      </motion.div>

      <div className="card p-2">
        <div className="flex flex-col sm:flex-row gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  isActive ? '' : 'hover:bg-gray-50'
                }`}
                style={{
                  background: isActive ? 'rgb(var(--accent))' : 'transparent',
                  color: isActive ? 'white' : 'rgb(var(--text-secondary))'
                }}
              >
                <Icon size={18} />
                <span>{tab.label}</span>
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-bold"
                  style={{
                    background: isActive ? 'rgba(255,255,255,0.2)' : 'rgb(var(--muted) / 0.3)',
                    color: isActive ? 'white' : 'rgb(var(--text-secondary))'
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {activeQuizzes.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {activeQuizzes.map((quiz, index) => (
            <motion.div
              key={quiz.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <QuizTile
                quiz={quiz}
                onClick={() => navigate(`/quiz/${quiz.id}`)}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <EmptyState
          icon={activeTab === 'saved' ? Bookmark : activeTab === 'recent' ? Clock : Trophy}
          title={
            activeTab === 'saved'
              ? 'No saved quizzes yet'
              : activeTab === 'recent'
              ? 'No recent activity'
              : 'No completed quizzes yet'
          }
          description={
            activeTab === 'saved'
              ? 'Save quizzes to practice them later. Browse the discover page to find quizzes to save.'
              : activeTab === 'recent'
              ? 'Your recently played quizzes will appear here. Start a quiz to see it in this list.'
              : 'Complete quizzes to see them here. Master quizzes by achieving high scores consistently.'
          }
          action={{
            label: activeTab === 'completed' ? 'Browse Subjects' : 'Discover Quizzes',
            onClick: () => navigate(activeTab === 'completed' ? '/subjects' : '/discover')
          }}
        />
      )}
    </div>
  );
}
