import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp } from 'lucide-react';
import { db } from '../db/client';
import { storage } from '../utils/storage';
import { PlaylistCard } from '../components/PlaylistCard';
import { QuizRow } from '../components/QuizRow';
import { Quiz, Playlist, MasteryLevel } from '../types';

export function DiscoverPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [featuredPlaylists, setFeaturedPlaylists] = useState<Playlist[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [playlists, subjects] = await Promise.all([
        db.getFeaturedPlaylists(),
        db.getSubjects()
      ]);

      setFeaturedPlaylists(playlists);

      const allQuizzes: Quiz[] = [];
      for (const subject of subjects) {
        const subjectQuizzes = await db.getQuizzesBySubject(subject.id);
        allQuizzes.push(...subjectQuizzes);
      }
      setQuizzes(allQuizzes);
    } catch (error) {
      console.error('Failed to load discovery data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPlaylistStats = (playlist: Playlist) => {
    return {
      quizCount: 6,
      estimatedMinutes: 30
    };
  };

  const getUnseenQuizzes = (): Quiz[] => {
    return quizzes.filter(quiz => {
      const mastery = storage.getMasteryState(quiz.id);
      return !mastery || mastery.masteryLevel === 0;
    }).slice(0, 12);
  };

  const getWeakSpotQuizzes = (): Quiz[] => {
    const quizzesWithMastery = quizzes.map(quiz => ({
      quiz,
      mastery: storage.getMasteryState(quiz.id)
    })).filter(item => item.mastery && item.mastery.masteryLevel > 0 && item.mastery.masteryLevel < 3);

    quizzesWithMastery.sort((a, b) => {
      const masteryDiff = (a.mastery?.masteryLevel || 0) - (b.mastery?.masteryLevel || 0);
      if (masteryDiff !== 0) return masteryDiff;
      return (a.mastery?.bestAccuracyPct || 0) - (b.mastery?.bestAccuracyPct || 0);
    });

    return quizzesWithMastery.slice(0, 12).map(item => item.quiz);
  };

  const getInProgressQuizzes = (): Quiz[] => {
    const quizzesWithMastery = quizzes.map(quiz => ({
      quiz,
      mastery: storage.getMasteryState(quiz.id)
    })).filter(item => item.mastery && item.mastery.masteryLevel > 0 && item.mastery.masteryLevel < 4);

    quizzesWithMastery.sort((a, b) => {
      const timeA = new Date(a.mastery?.lastPlayedAt || 0).getTime();
      const timeB = new Date(b.mastery?.lastPlayedAt || 0).getTime();
      return timeB - timeA;
    });

    return quizzesWithMastery.slice(0, 12).map(item => item.quiz);
  };

  const getGrade9SpeedTargets = (): Quiz[] => {
    const quizzesWithMastery = quizzes.map(quiz => ({
      quiz,
      mastery: storage.getMasteryState(quiz.id)
    })).filter(item => {
      const mastery = item.mastery;
      return mastery && mastery.bestAccuracyPct === 100 && mastery.bestTimeSec > item.quiz.grade9TargetSec;
    });

    return quizzesWithMastery.slice(0, 12).map(item => item.quiz);
  };

  const getBossBattles = (): Quiz[] => {
    return quizzes.filter(quiz => quiz.scopeType === 'full').slice(0, 12);
  };

  const getTrendingQuizzes = (): Quiz[] => {
    const quizzesWithAttempts = quizzes.map(quiz => {
      const attempts = storage.getAttempts().filter(a => a.quizId === quiz.id);
      return { quiz, attemptCount: attempts.length };
    });

    quizzesWithAttempts.sort((a, b) => b.attemptCount - a.attemptCount);
    return quizzesWithAttempts.slice(0, 12).map(item => item.quiz);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
        <div style={{ color: 'rgb(var(--text-secondary))' }}>Loading discovery...</div>
      </div>
    );
  }

  const unseenQuizzes = getUnseenQuizzes();
  const weakSpotQuizzes = getWeakSpotQuizzes();
  const inProgressQuizzes = getInProgressQuizzes();
  const grade9Targets = getGrade9SpeedTargets();
  const bossBattles = getBossBattles();
  const trendingQuizzes = getTrendingQuizzes();

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles size={32} style={{ color: 'rgb(var(--accent))' }} />
          <h1 className="text-4xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            Discover
          </h1>
        </div>
        <p className="text-lg" style={{ color: 'rgb(var(--text-secondary))' }}>
          Curated runs and personalized recommendations
        </p>
      </motion.div>

      {featuredPlaylists.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp size={24} style={{ color: 'rgb(var(--accent))' }} />
            <h2 className="text-2xl font-bold" style={{ color: 'rgb(var(--text))' }}>
              Today's Curated Runs
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {featuredPlaylists.slice(0, 3).map(playlist => {
              const stats = getPlaylistStats(playlist);
              return (
                <PlaylistCard
                  key={playlist.id}
                  playlist={playlist}
                  quizCount={stats.quizCount}
                  estimatedMinutes={stats.estimatedMinutes}
                  onClick={() => navigate(`/playlists/${playlist.id}`)}
                  variant="featured"
                />
              );
            })}
          </div>
        </motion.section>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-8"
      >
        {weakSpotQuizzes.length > 0 && (
          <QuizRow
            title="Because You're Weak Here"
            quizzes={weakSpotQuizzes}
            onQuizClick={(quiz) => navigate(`/quiz/${quiz.id}`)}
          />
        )}

        {unseenQuizzes.length > 0 && (
          <QuizRow
            title="Unseen Quizzes"
            quizzes={unseenQuizzes}
            onQuizClick={(quiz) => navigate(`/quiz/${quiz.id}`)}
          />
        )}

        {inProgressQuizzes.length > 0 && (
          <QuizRow
            title="Finish What You Started"
            quizzes={inProgressQuizzes}
            onQuizClick={(quiz) => navigate(`/quiz/${quiz.id}`)}
          />
        )}

        {grade9Targets.length > 0 && (
          <QuizRow
            title="Grade 9 Speed Targets"
            quizzes={grade9Targets}
            onQuizClick={(quiz) => navigate(`/quiz/${quiz.id}`)}
          />
        )}

        {bossBattles.length > 0 && (
          <QuizRow
            title="Boss Battles"
            quizzes={bossBattles}
            onQuizClick={(quiz) => navigate(`/quiz/${quiz.id}`)}
          />
        )}

        {trendingQuizzes.length > 0 && (
          <QuizRow
            title="Trending This Week"
            quizzes={trendingQuizzes}
            onQuizClick={(quiz) => navigate(`/quiz/${quiz.id}`)}
          />
        )}
      </motion.div>

      {unseenQuizzes.length === 0 && weakSpotQuizzes.length === 0 && inProgressQuizzes.length === 0 && (
        <div className="card p-12 text-center">
          <p className="text-lg" style={{ color: 'rgb(var(--text-secondary))' }}>
            Start taking quizzes to get personalized recommendations
          </p>
          <button
            onClick={() => navigate('/subjects')}
            className="btn-primary mt-4"
          >
            Browse Subjects
          </button>
        </div>
      )}
    </div>
  );
}
