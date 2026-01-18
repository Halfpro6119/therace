import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlayCircle, Clock, Trophy, CheckCircle, ArrowLeft } from 'lucide-react';
import { db } from '../db/client';
import { storage } from '../utils/storage';
import { QuizTile } from '../components/QuizTile';
import { Playlist, Quiz } from '../types';

export function PlaylistDetailPage() {
  const { playlistId } = useParams<{ playlistId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    loadData();
  }, [playlistId]);

  const loadData = async () => {
    if (!playlistId) return;

    try {
      const [playlistData, quizzesData] = await Promise.all([
        db.getPlaylist(playlistId),
        db.getPlaylistQuizzes(playlistId)
      ]);

      setPlaylist(playlistData || null);
      setQuizzes(quizzesData);
    } catch (error) {
      console.error('Failed to load playlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCompletedCount = () => {
    return quizzes.filter(quiz => {
      const mastery = storage.getMasteryState(quiz.id);
      return mastery && mastery.masteryLevel >= 3;
    }).length;
  };

  const getEstimatedTime = () => {
    return quizzes.reduce((total, quiz) => total + Math.ceil(quiz.timeLimitSec / 60), 0);
  };

  const getFirstIncompleteQuiz = (): Quiz | null => {
    for (const quiz of quizzes) {
      const mastery = storage.getMasteryState(quiz.id);
      if (!mastery || mastery.masteryLevel < 3) {
        return quiz;
      }
    }
    return null;
  };

  const handleStartRun = () => {
    const firstQuiz = getFirstIncompleteQuiz();
    if (firstQuiz) {
      navigate(`/quiz/${firstQuiz.id}?playlist=${playlistId}`);
    } else if (quizzes.length > 0) {
      navigate(`/quiz/${quizzes[0].id}?playlist=${playlistId}`);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
        <div style={{ color: 'rgb(var(--text-secondary))' }}>Loading playlist...</div>
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="max-w-7xl mx-auto text-center py-12">
        <p style={{ color: 'rgb(var(--text-secondary))' }}>Playlist not found</p>
      </div>
    );
  }

  const completedCount = getCompletedCount();
  const estimatedTime = getEstimatedTime();
  const firstIncomplete = getFirstIncompleteQuiz();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm mb-4"
        style={{ color: 'rgb(var(--text-secondary))' }}
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-elevated p-8"
        style={{ background: 'var(--gradient-primary)' }}
      >
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            {playlist.themeTag && (
              <div className="mb-3">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 text-white">
                  {playlist.themeTag}
                </span>
              </div>
            )}
            <h1 className="text-3xl font-bold text-white mb-2">{playlist.title}</h1>
            {playlist.description && (
              <p className="text-white/90">{playlist.description}</p>
            )}
          </div>
          <div className="flex-shrink-0">
            <PlayCircle size={64} className="text-white/50" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Trophy size={18} className="text-white" />
              <span className="text-sm text-white/80">Quizzes</span>
            </div>
            <p className="text-2xl font-bold text-white stat-number">{quizzes.length}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Clock size={18} className="text-white" />
              <span className="text-sm text-white/80">Time</span>
            </div>
            <p className="text-2xl font-bold text-white stat-number">{estimatedTime}m</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle size={18} className="text-white" />
              <span className="text-sm text-white/80">Done</span>
            </div>
            <p className="text-2xl font-bold text-white stat-number">
              {completedCount}/{quizzes.length}
            </p>
          </div>
        </div>

        <button
          onClick={handleStartRun}
          className="w-full bg-white text-lg font-bold py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
          style={{ color: 'rgb(var(--accent))' }}
        >
          <PlayCircle size={24} />
          <span>{firstIncomplete ? 'Start Run' : 'Replay Run'}</span>
        </button>
      </motion.div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>
          Quizzes in this run
        </h2>
        {quizzes.map((quiz, index) => (
          <motion.div
            key={quiz.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <QuizTile
              quiz={quiz}
              onClick={() => navigate(`/quiz/${quiz.id}?playlist=${playlistId}`)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
