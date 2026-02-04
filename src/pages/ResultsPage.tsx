import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Trophy, Clock, Target, RefreshCw, Wrench, CheckCircle, XCircle, TrendingUp, Share2, Zap, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { db } from '../db/client';
import { storage } from '../utils/storage';
import { MasteryChip } from '../components/MasteryChip';
import { Grade9Achievement } from '../components/Grade9Achievement';
import { ShareCardModal } from '../components/ShareCardModal';
import { LevelUpModal } from '../components/LevelUpModal';
import { XPPopup } from '../components/XPPopup';
import { cosmeticsStorage } from '../utils/cosmetics';
import { soundSystem } from '../utils/sounds';
import { Quiz, Prompt, Subject } from '../types';

export function ResultsPage() {
  const { attemptId } = useParams<{ attemptId: string }>();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [missedPrompts, setMissedPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(true);
  const [showGrade9Achievement, setShowGrade9Achievement] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);
  const [showXPPopup, setShowXPPopup] = useState(false);
  const [previousAttempt, setPreviousAttempt] = useState<any>(null);

  const attempt = storage.getAttemptById(attemptId!);
  const profile = storage.getProfile();
  const streak = storage.getStreak();

  useEffect(() => {
    loadData();
    checkAchievements();
  }, [attemptId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && quiz && !showGrade9Achievement && !showLevelUp && !showShareModal) {
        navigate(`/quiz/${quiz.id}`);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quiz, navigate, showGrade9Achievement, showLevelUp, showShareModal]);

  const loadData = async () => {
    if (!attempt) {
      setLoading(false);
      return;
    }

    try {
      const quizData = await db.getQuiz(attempt.quizId);
      if (quizData) {
        setQuiz(quizData);
        const missedPromptsData = await db.getPromptsByIds(attempt.missedPromptIds);
        setMissedPrompts(missedPromptsData);

        const subjectData = await db.getSubject(quizData.subjectId);
        setSubject(subjectData ?? null);

        const allAttempts = storage.getAttemptsByQuizId(quizData.id);
        if (allAttempts.length > 1) {
          const previousIdx = allAttempts.findIndex(a => a.id === attemptId) - 1;
          if (previousIdx >= 0) {
            setPreviousAttempt(allAttempts[previousIdx]);
          }
        }
      }
    } catch (error) {
      console.error('Failed to load results:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkAchievements = () => {
    if (!attempt || !quiz) return;

    const masteryState = storage.getMasteryState(attempt.quizId);
    const profile = storage.getProfile();
    const prevLevel = Math.floor((profile.xpTotal - (attempt.correctPromptIds.length * 5)) / 100);
    const newLvl = profile.level;

    if (newLvl > prevLevel) {
      setNewLevel(newLvl);
      setTimeout(() => {
        setShowLevelUp(true);
      }, 1500);
      soundSystem.playLevelUp();
    }

    if (masteryState?.masteryLevel === 4) {
      const totalCount = attempt.correctPromptIds.length + attempt.missedPromptIds.length;
      const isPerfect = attempt.correctPromptIds.length === totalCount;
      const beatsTarget = attempt.timeTakenSec <= quiz.grade9TargetSec;

      if (isPerfect && beatsTarget) {
        setTimeout(() => {
          setShowGrade9Achievement(true);
        }, 500);
      }
    }

    setShowXPPopup(true);
    setTimeout(() => setShowXPPopup(false), 2500);
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
        <div style={{ color: 'rgb(var(--text-secondary))' }}>Loading results...</div>
      </div>
    );
  }

  if (!attempt) return <div>Attempt not found</div>;
  if (!quiz || !subject) return <div>Quiz not found</div>;

  const masteryState = storage.getMasteryState(quiz.id);
  const totalCount = attempt.correctPromptIds.length + attempt.missedPromptIds.length;
  const accuracy = totalCount > 0 ? attempt.correctPromptIds.length / totalCount : 0;
  const accuracyPercent = Math.round(accuracy * 100);
  const timeTaken = attempt.timeTakenSec;
  const grade9Target = quiz.grade9TargetSec;
  const beatsTarget = timeTaken <= grade9Target;
  const xpGained = attempt.correctPromptIds.length * 5;

  const isNewPB = masteryState?.bestTimeSec === timeTaken || masteryState?.bestAccuracyPct === accuracyPercent;

  const timeDelta = previousAttempt ? timeTaken - previousAttempt.timeTakenSec : 0;
  const accuracyDelta = previousAttempt ? accuracyPercent - Math.round(previousAttempt.accuracyPct) : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDelta = (delta: number, isTime: boolean = false) => {
    if (delta === 0) return null;
    const sign = delta > 0 ? '+' : '';
    if (isTime) {
      return `${sign}${delta}s`;
    }
    return `${sign}${delta}%`;
  };

  const getUnlockedCosmetics = () => {
    const unlocks: string[] = [];

    if (newLevel === 5) {
      unlocks.push('Teal Accent Theme');
      unlocks.push('Glass Card Style');
    } else if (newLevel === 10) {
      unlocks.push('Crimson Accent Theme');
      unlocks.push('Steel Card Style');
    } else if (newLevel === 15) {
      unlocks.push('Minimal Card Style');
    }

    return unlocks;
  };

  const handleRetry = () => {
    navigate(`/quiz/${quiz.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      {showXPPopup && <XPPopup xp={xpGained} type="quiz" position="center" />}

      {showGrade9Achievement && (
        <Grade9Achievement
          quizTitle={quiz.title}
          time={timeTaken}
          isNewPB={masteryState?.bestTimeSec === timeTaken}
          onClose={() => setShowGrade9Achievement(false)}
          onShare={() => {
            setShowGrade9Achievement(false);
            setShowShareModal(true);
          }}
        />
      )}

      {showLevelUp && (
        <LevelUpModal
          level={newLevel}
          unlocks={getUnlockedCosmetics()}
          onClose={() => setShowLevelUp(false)}
        />
      )}

      <ShareCardModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        data={{
          quizTitle: quiz.title,
          subjectName: subject.name,
          accuracy: accuracyPercent,
          time: timeTaken,
          masteryLevel: masteryState?.masteryLevel || 0,
          streak: streak.currentStreakDays,
          level: profile.level
        }}
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="card-elevated p-8 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: beatsTarget
              ? 'linear-gradient(135deg, rgb(var(--success)), rgb(var(--accent)))'
              : 'var(--gradient-primary)',
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
                {accuracyPercent === 100 ? 'Perfect Run!' : beatsTarget ? 'Elite Finish!' : 'Run Complete!'}
              </h1>
              <p className="text-lg" style={{ color: 'rgb(var(--text-secondary))' }}>
                {quiz.title}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {isNewPB && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', delay: 0.3 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold"
                >
                  <Award size={20} />
                  <span>NEW PB!</span>
                </motion.div>
              )}
              {masteryState && <MasteryChip level={masteryState.masteryLevel} size="lg" />}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="card p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Trophy size={18} style={{ color: 'rgb(var(--accent))' }} />
                <span className="text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>Accuracy</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold stat-number" style={{ color: 'rgb(var(--text))' }}>
                  {accuracyPercent}%
                </p>
                {accuracyDelta !== 0 && (
                  <span className={`text-sm font-semibold ${accuracyDelta > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatDelta(accuracyDelta)}
                  </span>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="card p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={18} style={{ color: 'rgb(var(--success))' }} />
                <span className="text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>Correct</span>
              </div>
              <p className="text-3xl font-bold stat-number" style={{ color: 'rgb(var(--text))' }}>
                {attempt.correctPromptIds.length}/{totalCount}
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="card p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock size={18} style={{ color: 'rgb(var(--text-secondary))' }} />
                <span className="text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>Time</span>
              </div>
              <div className="flex items-baseline gap-2">
                <p className={`text-3xl font-bold font-mono stat-number ${beatsTarget ? 'text-green-600' : ''}`} style={{ color: beatsTarget ? 'rgb(var(--success))' : 'rgb(var(--text))' }}>
                  {formatTime(timeTaken)}
                </p>
                {timeDelta !== 0 && (
                  <span className={`text-sm font-semibold ${timeDelta < 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatDelta(timeDelta, true)}
                  </span>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="card p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Target size={18} style={{ color: 'rgb(var(--warning))' }} />
                <span className="text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>Target</span>
              </div>
              <p className="text-3xl font-bold font-mono stat-number" style={{ color: beatsTarget ? 'rgb(var(--success))' : 'rgb(var(--text))' }}>
                {formatTime(grade9Target)}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <motion.button
          onClick={handleRetry}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary py-5 text-lg font-bold flex items-center justify-center gap-3 shadow-lg"
        >
          <RefreshCw size={22} />
          <span>RUN IT BACK</span>
        </motion.button>

        {missedPrompts.length > 0 && (
          <motion.button
            onClick={() => navigate(`/quiz/${quiz.id}?mode=fixit`)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="btn-secondary py-5 flex items-center justify-center gap-3 font-semibold"
          >
            <Wrench size={20} />
            <span>Fix-It Drill</span>
          </motion.button>
        )}

        <motion.button
          onClick={() => setShowShareModal(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-secondary py-5 flex items-center justify-center gap-3 font-semibold"
        >
          <Share2 size={20} />
          <span>Share</span>
        </motion.button>
      </motion.div>

      {masteryState && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="p-2 rounded-lg"
              style={{ background: 'rgb(var(--accent) / 0.1)' }}
            >
              <TrendingUp size={24} style={{ color: 'rgb(var(--accent))' }} />
            </div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>
                Personal Best
              </h2>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                Your records for this quiz
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="card p-4">
              <p className="text-sm mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                Best Accuracy
              </p>
              <p className="text-2xl font-bold stat-number" style={{ color: 'rgb(var(--text))' }}>
                {Math.round(masteryState.bestAccuracyPct)}%
                {accuracyPercent === Math.round(masteryState.bestAccuracyPct) && (
                  <span className="text-xs ml-2 text-gradient-elite">PB!</span>
                )}
              </p>
            </div>
            <div className="card p-4">
              <p className="text-sm mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                Best Time
              </p>
              <p className="text-2xl font-bold font-mono stat-number" style={{ color: 'rgb(var(--text))' }}>
                {formatTime(masteryState.bestTimeSec)}
                {timeTaken === masteryState.bestTimeSec && (
                  <span className="text-xs ml-2 text-gradient-elite">PB!</span>
                )}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {missedPrompts.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="card p-6"
          style={{ borderColor: 'rgb(var(--danger) / 0.3)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="p-2 rounded-lg"
              style={{ background: 'rgb(var(--danger) / 0.1)' }}
            >
              <XCircle size={24} style={{ color: 'rgb(var(--danger))' }} />
            </div>
            <div>
              <h2 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>
                Missed Answers ({missedPrompts.length})
              </h2>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                Review these to improve your next run
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {missedPrompts.map(prompt => (
              <div
                key={prompt.id}
                className="card p-4"
                style={{
                  background: 'rgb(var(--danger) / 0.05)',
                  borderColor: 'rgb(var(--danger) / 0.2)'
                }}
              >
                <p className="font-semibold mb-2" style={{ color: 'rgb(var(--text))' }}>
                  {prompt.question}
                </p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {prompt.answers.map((answer, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-sm font-medium"
                      style={{
                        background: 'rgb(var(--success) / 0.1)',
                        color: 'rgb(var(--success))',
                        border: '1px solid rgb(var(--success) / 0.2)'
                      }}
                    >
                      {answer}
                    </span>
                  ))}
                </div>
                {prompt.explanation && (
                  <p className="text-sm mt-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                    <span className="font-medium">Explanation:</span> {prompt.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="flex flex-col items-center gap-4 pt-4">
        <button
          onClick={() => navigate('/')}
          className="btn-ghost px-8 py-3"
        >
          Back to Home
        </button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center gap-2 text-sm"
          style={{ color: 'rgb(var(--muted))' }}
        >
          <span>Press</span>
          <kbd className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 font-mono font-semibold" style={{ color: 'rgb(var(--text))' }}>
            Enter
          </kbd>
          <span>to retry instantly</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
