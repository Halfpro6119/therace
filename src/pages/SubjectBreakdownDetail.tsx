import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  Play,
  TrendingUp,
  Award,
  Zap,
  Clock,
  Target,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { db } from '../db/client';
import { Subject, Quiz, Topic, Unit } from '../types';
import { storage } from '../utils/storage';
import {
  calculateSubjectStats,
  calculateTopicStats,
  calculateUnitStats,
  findMostImproved,
  getRecommendedQuiz,
  SubjectStats,
  TopicStats,
  UnitStats,
} from '../utils/subjectStats';
import { Skeleton } from '../components/ui/Skeleton';
import { ProgressReplay } from '../components/replay/ProgressReplay';

export function SubjectBreakdownDetail() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [stats, setStats] = useState<SubjectStats | null>(null);
  const [topicStats, setTopicStats] = useState<TopicStats[]>([]);
  const [unitStats, setUnitStats] = useState<UnitStats[]>([]);
  const [loading, setLoading] = useState(true);

  const masteryStates = storage.getAllMasteryStates();
  const attempts = storage.getAttempts();

  useEffect(() => {
    if (subjectId) {
      loadData();
    }
  }, [subjectId]);

  const loadData = async () => {
    if (!subjectId) return;

    try {
      setLoading(true);
      const [subjectData, quizzesData, topicsData, unitsData] = await Promise.all([
        db.getSubject(subjectId),
        db.getQuizzesBySubject(subjectId),
        db.getTopics(subjectId),
        db.getUnits(subjectId),
      ]);

      if (!subjectData) {
        navigate('/profile/subjects');
        return;
      }

      setSubject(subjectData);
      setQuizzes(quizzesData);
      setTopics(topicsData);
      setUnits(unitsData);

      const subjectStats = calculateSubjectStats(subjectId, quizzesData, masteryStates, attempts);
      setStats(subjectStats);

      const topicStatsData = calculateTopicStats(topicsData, quizzesData, masteryStates, attempts);
      setTopicStats(topicStatsData);

      const unitStatsData = calculateUnitStats(unitsData, topicsData, quizzesData, masteryStates);
      setUnitStats(unitStatsData);
    } catch (error) {
      console.error('Error loading subject breakdown:', error);
    } finally {
      setLoading(false);
    }
  };

  const improvements = findMostImproved(quizzes, attempts);
  const recommended = getRecommendedQuiz(quizzes, masteryStates);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getMasteryColor = (avgMastery: number): string => {
    if (avgMastery >= 3.5) return 'rgb(var(--accent))';
    if (avgMastery >= 2.5) return 'rgb(34, 197, 94)';
    if (avgMastery >= 1.5) return 'rgb(250, 204, 21)';
    if (avgMastery >= 0.5) return 'rgb(251, 146, 60)';
    return 'rgb(150, 150, 150)';
  };

  const strongestTopics = [...topicStats].sort((a, b) => b.avgMastery - a.avgMastery).slice(0, 5);
  const weakestTopics = [...topicStats].sort((a, b) => a.avgMastery - b.avgMastery).slice(0, 5);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <Skeleton className="h-48" />
        <Skeleton className="h-32" />
        <Skeleton className="h-96" />
      </div>
    );
  }

  if (!subject || !stats) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <button
        onClick={() => navigate('/profile/subjects')}
        className="flex items-center gap-2 font-bold transition-all hover:scale-105"
        style={{ color: 'rgb(var(--accent))' }}
      >
        <ArrowLeft size={20} />
        <span>Back to Subjects</span>
      </button>

      <div
        className="relative overflow-hidden rounded-3xl p-8"
        style={{ background: 'rgb(var(--surface))' }}
      >
        <div
          className="absolute inset-0 opacity-5"
          style={{
            background: `radial-gradient(circle at top right, ${subject.themeColor} 0%, transparent 70%)`,
          }}
        />

        <div className="relative">
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center mb-8">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl"
              style={{ background: `${subject.themeColor}20` }}
            >
              {subject.icon}
            </div>

            <div className="flex-1">
              <h1 className="text-4xl font-black mb-2" style={{ color: 'rgb(var(--text))' }}>
                {subject.name}
              </h1>
              <p className="text-lg font-semibold mb-6" style={{ color: 'rgb(var(--text-secondary))' }}>
                {subject.examBoard} • {subject.description}
              </p>

              <div className="inline-flex items-center gap-4 px-6 py-3 rounded-2xl" style={{ background: 'rgb(var(--surface-2))' }}>
                <div className="text-center">
                  <p className="text-4xl font-black text-gradient">{stats.grade9ReadinessPct}%</p>
                  <p className="text-xs font-bold mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                    Readiness
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-2xl" style={{ background: 'rgb(var(--surface-2))' }}>
              <p className="text-3xl font-black mb-1" style={{ color: 'rgb(var(--text))' }}>
                {stats.xpEarned}
              </p>
              <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                XP Earned
              </p>
            </div>

            <div className="text-center p-4 rounded-2xl" style={{ background: 'rgb(var(--surface-2))' }}>
              <p className="text-3xl font-black mb-1" style={{ color: 'rgb(var(--text))' }}>
                {stats.totalAttempts}
              </p>
              <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                Total Attempts
              </p>
            </div>

            <div className="text-center p-4 rounded-2xl" style={{ background: 'rgb(var(--surface-2))' }}>
              <p className="text-3xl font-black mb-1" style={{ color: 'rgb(var(--text))' }}>
                {stats.totalTimeMinutes}m
              </p>
              <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                Time Spent
              </p>
            </div>

            <div className="text-center p-4 rounded-2xl" style={{ background: 'rgb(var(--surface-2))' }}>
              <p className="text-3xl font-black mb-1" style={{ color: 'rgb(var(--text))' }}>
                {stats.totalQuizzes}
              </p>
              <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                Total Quizzes
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={() => navigate(`/subjects/${subject.id}`)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
              style={{ background: 'var(--gradient-primary)', color: 'white' }}
            >
              <BookOpen size={18} />
              <span>Go to Subject Library</span>
            </button>

            {recommended && (
              <button
                onClick={() => navigate(`/quiz/${recommended.quiz.id}`)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
                style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text))' }}
              >
                <Play size={18} />
                <span>Play Recommended</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-3xl p-8" style={{ background: 'rgb(var(--surface))' }}>
        <h2 className="text-2xl font-black mb-6" style={{ color: 'rgb(var(--text))' }}>
          Mastery Overview
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Unseen', count: stats.unseenCount, color: 'rgb(150, 150, 150)' },
            { label: 'Learning', count: stats.learningCount, color: 'rgb(251, 146, 60)' },
            { label: 'Secure', count: stats.secureCount, color: 'rgb(250, 204, 21)' },
            { label: 'Mastered', count: stats.masteredCount, color: 'rgb(34, 197, 94)' },
            { label: 'Grade 9 Speed', count: stats.grade9SpeedCount, color: 'rgb(var(--accent))' },
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="p-6 rounded-2xl text-center"
              style={{ background: 'rgb(var(--surface-2))' }}
            >
              <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center">
                <div className="w-8 h-8 rounded-lg" style={{ background: item.color }} />
              </div>
              <p className="text-3xl font-black mb-2" style={{ color: 'rgb(var(--text))' }}>
                {item.count}
              </p>
              <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-3xl p-8" style={{ background: 'rgb(var(--surface))' }}>
          <h2 className="text-2xl font-black mb-6" style={{ color: 'rgb(var(--text))' }}>
            Strongest Topics
          </h2>

          {strongestTopics.length > 0 ? (
            <div className="space-y-3">
              {strongestTopics.map((topic, idx) => (
                <motion.div
                  key={topic.topicId}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl"
                  style={{ background: 'rgb(var(--surface-2))' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl font-black" style={{ color: 'rgb(var(--text-secondary))' }}>
                      #{idx + 1}
                    </div>
                    <div>
                      <p className="font-bold" style={{ color: 'rgb(var(--text))' }}>
                        {topic.topicName}
                      </p>
                      <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                        {topic.grade9SpeedCount} Grade 9 Speed
                      </p>
                    </div>
                  </div>
                  <div
                    className="px-3 py-1 rounded-lg text-sm font-bold"
                    style={{ background: `${getMasteryColor(topic.avgMastery)}20`, color: getMasteryColor(topic.avgMastery) }}
                  >
                    {topic.avgMastery.toFixed(1)}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center py-8 font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
              No data available
            </p>
          )}
        </div>

        <div className="rounded-3xl p-8" style={{ background: 'rgb(var(--surface))' }}>
          <h2 className="text-2xl font-black mb-6" style={{ color: 'rgb(var(--text))' }}>
            Weakest Topics
          </h2>

          {weakestTopics.length > 0 ? (
            <div className="space-y-3">
              {weakestTopics.map((topic, idx) => (
                <motion.div
                  key={topic.topicId}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between p-4 rounded-xl"
                  style={{ background: 'rgb(var(--surface-2))' }}
                >
                  <div className="flex-1">
                    <p className="font-bold mb-1" style={{ color: 'rgb(var(--text))' }}>
                      {topic.topicName}
                    </p>
                    <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {topic.quizCount} quizzes • {topic.masteredCount} mastered
                    </p>
                  </div>
                  <button
                    className="px-4 py-2 rounded-lg font-bold text-sm transition-all hover:scale-105"
                    style={{ background: 'rgb(var(--accent))', color: 'white' }}
                  >
                    Practice
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center py-8 font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
              No data available
            </p>
          )}
        </div>
      </div>

      {improvements.length > 0 && (
        <div className="rounded-3xl p-8" style={{ background: 'rgb(var(--surface))' }}>
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp size={32} style={{ color: 'rgb(var(--accent))' }} />
            <h2 className="text-2xl font-black" style={{ color: 'rgb(var(--text))' }}>
              Most Improved
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {improvements.slice(0, 3).map((improvement, idx) => (
              <motion.div
                key={`${improvement.quizId}-${improvement.improvementType}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl"
                style={{ background: 'rgb(var(--surface-2))' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="px-3 py-1 rounded-lg text-sm font-bold"
                    style={{ background: 'rgba(34, 197, 94, 0.1)', color: 'rgb(34, 197, 94)' }}
                  >
                    {improvement.improvementType === 'time' ? 'Faster' : 'More Accurate'}
                  </div>
                  <div className="text-2xl font-black text-gradient">
                    {improvement.improvementType === 'time'
                      ? `-${improvement.delta}s`
                      : `+${improvement.delta.toFixed(0)}%`}
                  </div>
                </div>

                <p className="font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
                  {improvement.quizTitle}
                </p>

                <div className="flex items-center justify-between text-sm font-semibold">
                  <span style={{ color: 'rgb(var(--text-secondary))' }}>Before:</span>
                  <span style={{ color: 'rgb(var(--text))' }}>
                    {improvement.improvementType === 'time'
                      ? formatTime(improvement.before)
                      : `${improvement.before.toFixed(0)}%`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span style={{ color: 'rgb(var(--text-secondary))' }}>After:</span>
                  <span style={{ color: 'rgb(var(--text))' }}>
                    {improvement.improvementType === 'time'
                      ? formatTime(improvement.after)
                      : `${improvement.after.toFixed(0)}%`}
                  </span>
                </div>

                <button
                  onClick={() => navigate(`/quiz/${improvement.quizId}`)}
                  className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-bold transition-all hover:scale-105"
                  style={{ background: 'var(--gradient-primary)', color: 'white' }}
                >
                  <span>Run Again</span>
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <ProgressReplay
        subjectId={subject.id}
        quizzes={quizzes}
        attempts={attempts}
      />

      {recommended && (
        <div className="rounded-3xl p-8" style={{ background: 'rgb(var(--surface))' }}>
          <h2 className="text-2xl font-black mb-6" style={{ color: 'rgb(var(--text))' }}>
            Recommended Next Sprint
          </h2>

          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <div className="flex-1">
              <div className="inline-block px-3 py-1 rounded-lg text-sm font-bold mb-3" style={{ background: 'rgba(var(--accent), 0.1)', color: 'rgb(var(--accent))' }}>
                {recommended.reason}
              </div>
              <h3 className="text-2xl font-black mb-2" style={{ color: 'rgb(var(--text))' }}>
                {recommended.quiz.title}
              </h3>
              <p className="font-semibold mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
                {recommended.quiz.description}
              </p>
              <div className="flex items-center gap-4 text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <Clock size={16} style={{ color: 'rgb(var(--text-secondary))' }} />
                  <span style={{ color: 'rgb(var(--text))' }}>
                    {Math.ceil(recommended.quiz.timeLimitSec / 60)} min
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Target size={16} style={{ color: 'rgb(var(--text-secondary))' }} />
                  <span style={{ color: 'rgb(var(--text))' }}>
                    {recommended.quiz.promptIds.length} questions
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate(`/quiz/${recommended.quiz.id}`)}
              className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105"
              style={{ background: 'var(--gradient-primary)', color: 'white' }}
            >
              <Play size={24} />
              <span>Start Sprint</span>
            </button>
          </div>
        </div>
      )}

      {unitStats.length > 0 && (
        <div className="rounded-3xl p-8" style={{ background: 'rgb(var(--surface))' }}>
          <h2 className="text-2xl font-black mb-6" style={{ color: 'rgb(var(--text))' }}>
            Unit Breakdown
          </h2>

          <div className="space-y-3">
            {unitStats.map((unit, idx) => (
              <motion.div
                key={unit.unitId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 rounded-2xl"
                style={{ background: 'rgb(var(--surface-2))' }}
              >
                <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-black mb-2" style={{ color: 'rgb(var(--text))' }}>
                      {unit.unitName}
                    </h3>
                    <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {unit.masteredCount} / {unit.totalQuizzes} mastered
                      {unit.weakestTopic && ` • Weakest: ${unit.weakestTopic.topicName}`}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-black text-gradient">{unit.readinessPct}%</p>
                      <p className="text-xs font-bold" style={{ color: 'rgb(var(--text-secondary))' }}>
                        Readiness
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
