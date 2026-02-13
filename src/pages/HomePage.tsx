import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Zap, Target, TrendingUp, Flame, AlertCircle, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { db } from '../db/client';
import { SubjectCard } from '../components/SubjectCard';
import { ProgressBar } from '../components/ProgressBar';
import { storage } from '../utils/storage';
import { MasteryLevel, Subject, Quiz } from '../types';
import { SkeletonCard, SkeletonSubjectCard } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { getNextAction } from '../utils/subjectStats';

export function HomePage() {
  const navigate = useNavigate();
  const streak = storage.getStreak();
  const attempts = storage.getAttempts();
  const masteryStates = storage.getMasteryStates();
  const profile = storage.getProfile();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setError(null);
      const [subjectsData, quizzesData] = await Promise.all([
        db.getSubjects(),
        Promise.all((await db.getSubjects()).map(s => db.getQuizzesBySubject(s.id))).then(results => results.flat())
      ]);
      setSubjects(subjectsData);
      setQuizzes(quizzesData);
    } catch (error) {
      console.error('Failed to load data:', error);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const lastAttempt = attempts.length > 0 ? attempts[attempts.length - 1] : null;
  const lastQuiz = lastAttempt ? quizzes.find(q => q.id === lastAttempt.quizId) : null;

  const getRecentMisses = () => {
    const recentAttempts = attempts.slice(-5);
    const missedPromptIds = recentAttempts.flatMap(a => a.missedPromptIds);
    return missedPromptIds.slice(0, 10);
  };

  const today = new Date().toDateString();
  const streakActiveToday = streak.lastActiveDate === today;

  const nextAction = getNextAction(
    quizzes,
    masteryStates,
    getRecentMisses(),
    lastAttempt ? { quizId: lastAttempt.quizId, finishedAt: lastAttempt.finishedAt } : null,
    streakActiveToday,
    streak.currentStreakDays
  );

  const calculateOverallReadiness = () => {
    const totalQuizzes = quizzes.length;
    if (totalQuizzes === 0) return 0;

    let totalMastery = 0;
    quizzes.forEach(quiz => {
      const state = masteryStates[quiz.id];
      const level = state?.masteryLevel ?? 0;
      totalMastery += (level / 4) * 100;
    });

    return Math.round(totalMastery / totalQuizzes);
  };

  const getSubjectStats = (subjectId: string) => {
    const subjectQuizzes = quizzes.filter(q => q.subjectId === subjectId);
    let totalMastery = 0;
    let masteredCount = 0;

    subjectQuizzes.forEach(quiz => {
      const state = masteryStates[quiz.id];
      const level: MasteryLevel = state?.masteryLevel ?? 0;
      totalMastery += (level / 4) * 100;
      if (level >= 3) masteredCount++;
    });

    return {
      readinessPercent: Math.round(totalMastery / subjectQuizzes.length) || 0,
      masteredCount,
      totalQuizzes: subjectQuizzes.length,
    };
  };

  const overallReadiness = calculateOverallReadiness();
  const hasMisses = getRecentMisses().length > 0;

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-8">
        <SkeletonCard />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <SkeletonCard />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonSubjectCard />
          <SkeletonSubjectCard />
          <SkeletonSubjectCard />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto">
        <EmptyState
          icon={AlertCircle}
          title="Unable to load dashboard"
          description={error}
          action={{
            label: 'Try Again',
            onClick: loadData
          }}
        />
      </div>
    );
  }

  if (subjects.length === 0) {
    return (
      <div className="max-w-7xl mx-auto">
        <EmptyState
          icon={BookOpen}
          title="No subjects available"
          description="There are no subjects configured yet. Please check back later or contact your administrator."
          action={{
            label: 'Refresh',
            onClick: loadData
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl shadow-xl p-6 sm:p-8 md:p-12"
        style={{
          background: 'var(--gradient-primary)',
        }}
      >
        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 md:mb-4 tracking-tight">
              Sprint to Grade 9
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8">
              Master topics through speed + accuracy.
            </p>
          </motion.div>

          <div className="flex flex-wrap items-center gap-3">
          <motion.button
            onClick={() => nextAction && navigate(nextAction.href)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-base sm:text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
            style={{ color: 'rgb(var(--accent))' }}
          >
            <Zap size={24} />
            <span>{nextAction?.label ?? "Start Today's Sprint"}</span>
          </motion.button>
          <motion.button
            onClick={() => navigate('/subjects')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-white/20 text-white text-sm sm:text-base font-semibold rounded-xl border-2 border-white/40 hover:bg-white/30 transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
          >
            <BookOpen size={20} />
            <span>Explore subjects</span>
          </motion.button>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-48 sm:w-64 md:w-80 lg:w-96 h-48 sm:h-64 md:h-80 lg:h-96 max-w-[min(40vw,28rem)] max-h-[min(40vw,28rem)] bg-white/10 rounded-full -mr-24 sm:-mr-32 md:-mr-40 -mt-24 sm:-mt-32 md:-mt-40" />
        <div className="absolute bottom-0 left-0 w-36 sm:w-48 md:w-56 h-36 sm:h-48 md:h-56 max-w-[min(35vw,22rem)] max-h-[min(35vw,22rem)] bg-white/10 rounded-full -ml-20 sm:-ml-24 md:-ml-28 -mb-20 sm:-mb-24 md:-mb-28" />
      </motion.section>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {lastQuiz && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card-hover p-6 cursor-pointer"
            onClick={() => navigate(`/quiz/${lastQuiz.id}`)}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="p-2 rounded-lg"
                style={{ background: 'rgb(var(--accent) / 0.1)' }}
              >
                <TrendingUp size={20} style={{ color: 'rgb(var(--accent))' }} />
              </div>
              <h3 className="font-bold" style={{ color: 'rgb(var(--text))' }}>
                Continue
              </h3>
            </div>
            <p className="text-sm mb-2 line-clamp-2" style={{ color: 'rgb(var(--text-secondary))' }}>
              {lastQuiz.title}
            </p>
            <p className="text-xs" style={{ color: 'rgb(var(--muted))' }}>
              Last played {new Date(lastAttempt!.finishedAt).toLocaleDateString()}
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="card p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="p-2 rounded-lg"
              style={{ background: 'rgb(var(--warning) / 0.1)' }}
            >
              <Flame size={20} style={{ color: 'rgb(var(--warning))' }} />
            </div>
            <h3 className="font-bold" style={{ color: 'rgb(var(--text))' }}>
              Streak
            </h3>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold stat-number" style={{ color: 'rgb(var(--text))' }}>
              {streak.currentStreakDays}
            </span>
            <span className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              days
            </span>
          </div>
          <p className="text-xs" style={{ color: 'rgb(var(--muted))' }}>
            Best: {streak.bestStreakDays} days
          </p>
        </motion.div>

        {hasMisses && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card-hover p-6 cursor-pointer"
            style={{ background: 'var(--gradient-success)' }}
            onClick={() => navigate('/quiz/daily-challenge-1?mode=fixit')}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <AlertCircle size={20} className="text-white" />
              </div>
              <h3 className="font-bold text-white">Fix-It Drill</h3>
            </div>
            <p className="text-sm text-white/90 mb-2">
              Practice recent mistakes
            </p>
            <p className="text-xs text-white/75">
              {getRecentMisses().length} items to review
            </p>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="card p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className="p-2 rounded-lg"
            style={{ background: 'rgb(var(--success) / 0.1)' }}
          >
            <Target size={24} style={{ color: 'rgb(var(--success))' }} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>
              Grade 9 Readiness
            </h3>
            <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              Overall mastery across all subjects
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold stat-number" style={{ color: 'rgb(var(--success))' }}>
              {overallReadiness}%
            </div>
            <p className="text-xs" style={{ color: 'rgb(var(--muted))' }}>
              Level {profile.level}
            </p>
          </div>
        </div>
        <ProgressBar
          value={overallReadiness}
          max={100}
          size="lg"
          variant="success"
          showPercentage={false}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            Your Subjects
          </h2>
          <button
            onClick={() => navigate('/subjects')}
            className="btn-ghost text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] rounded-lg"
          >
            View All
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject, index) => {
            const stats = getSubjectStats(subject.id);
            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                <SubjectCard subject={subject} {...stats} />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
