import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, TrendingDown, Target, ArrowRight } from 'lucide-react';
import { db } from '../db/client';
import { Subject, Quiz } from '../types';
import { storage } from '../utils/storage';
import { calculateSubjectStats, SubjectStats } from '../utils/subjectStats';
import { Skeleton } from '../components/ui/Skeleton';

export function SubjectBreakdownHub() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [subjectStats, setSubjectStats] = useState<Record<string, SubjectStats>>({});
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<'readiness-desc' | 'readiness-asc' | 'weakest'>('weakest');

  const masteryStates = storage.getAllMasteryStates();
  const attempts = storage.getAttempts();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [subjectsData, quizzesData] = await Promise.all([
        db.getSubjects(),
        Promise.all(
          (await db.getSubjects()).map(s => db.getQuizzesBySubject(s.id))
        ).then(results => results.flat()),
      ]);

      setSubjects(subjectsData);
      setQuizzes(quizzesData);

      const stats: Record<string, SubjectStats> = {};
      subjectsData.forEach(subject => {
        stats[subject.id] = calculateSubjectStats(
          subject.id,
          quizzesData,
          masteryStates,
          attempts
        );
      });

      setSubjectStats(stats);
    } catch (error) {
      console.error('Error loading subject breakdown:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSortedSubjects = () => {
    const sorted = [...subjects];

    switch (sortBy) {
      case 'readiness-desc':
        return sorted.sort(
          (a, b) =>
            (subjectStats[b.id]?.grade9ReadinessPct || 0) -
            (subjectStats[a.id]?.grade9ReadinessPct || 0)
        );
      case 'readiness-asc':
        return sorted.sort(
          (a, b) =>
            (subjectStats[a.id]?.grade9ReadinessPct || 0) -
            (subjectStats[b.id]?.grade9ReadinessPct || 0)
        );
      case 'weakest':
        return sorted.sort(
          (a, b) =>
            (subjectStats[a.id]?.grade9ReadinessPct || 0) -
            (subjectStats[b.id]?.grade9ReadinessPct || 0)
        );
      default:
        return sorted;
    }
  };

  const sortedSubjects = getSortedSubjects();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <Skeleton className="h-32 mb-8" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  if (subjects.length === 0) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-20 px-6 rounded-3xl" style={{ background: 'rgb(var(--surface))' }}>
          <div className="flex items-center justify-center mb-6">
            <div className="p-4 rounded-2xl" style={{ background: 'rgba(var(--accent), 0.1)' }}>
              <BarChart3 size={48} style={{ color: 'rgb(var(--accent))' }} />
            </div>
          </div>
          <h2 className="text-2xl font-black mb-3" style={{ color: 'rgb(var(--text))' }}>
            No subjects available
          </h2>
          <p className="text-lg font-semibold mb-6" style={{ color: 'rgb(var(--text-secondary))' }}>
            Contact your administrator to add subjects
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl font-black mb-3" style={{ color: 'rgb(var(--text))' }}>
          Subject Breakdown
        </h1>
        <p className="text-lg font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
          See your strongest and weakest areas
        </p>
      </div>

      <div className="flex items-center gap-4 p-4 rounded-2xl" style={{ background: 'rgb(var(--surface))' }}>
        <span className="text-sm font-bold" style={{ color: 'rgb(var(--text-secondary))' }}>
          Sort by:
        </span>
        <div className="flex gap-2">
          {[
            { value: 'weakest' as const, label: 'Weakest First', icon: TrendingDown },
            { value: 'readiness-asc' as const, label: 'Readiness (Low)', icon: Target },
            { value: 'readiness-desc' as const, label: 'Readiness (High)', icon: TrendingUp },
          ].map(option => {
            const Icon = option.icon;
            return (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all"
                style={{
                  background:
                    sortBy === option.value ? 'var(--gradient-primary)' : 'rgb(var(--surface-2))',
                  color: sortBy === option.value ? 'white' : 'rgb(var(--text))',
                }}
              >
                <Icon size={16} />
                <span>{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedSubjects.map((subject, idx) => {
          const stats = subjectStats[subject.id];

          return (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => navigate(`/profile/subjects/${subject.id}`)}
              className="rounded-3xl p-6 cursor-pointer transition-all hover:scale-105"
              style={{ background: 'rgb(var(--surface))' }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                    style={{ background: `${subject.themeColor}20` }}
                  >
                    {subject.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-black" style={{ color: 'rgb(var(--text))' }}>
                      {subject.name}
                    </h3>
                    <p className="text-xs font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {subject.examBoard}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold" style={{ color: 'rgb(var(--text-secondary))' }}>
                    Grade 9 Readiness
                  </span>
                  <span className="text-2xl font-black text-gradient">
                    {stats?.grade9ReadinessPct || 0}%
                  </span>
                </div>

                <div className="h-3 rounded-full overflow-hidden flex" style={{ background: 'rgb(var(--surface-2))' }}>
                  {[0, 1, 2, 3, 4].map(level => {
                    const count =
                      level === 0
                        ? stats?.unseenCount || 0
                        : level === 1
                        ? stats?.learningCount || 0
                        : level === 2
                        ? stats?.secureCount || 0
                        : level === 3
                        ? stats?.masteredCount || 0
                        : stats?.grade9SpeedCount || 0;

                    const total = stats?.totalQuizzes || 1;
                    const width = (count / total) * 100;

                    const colors = [
                      'rgb(150, 150, 150)',
                      'rgb(251, 146, 60)',
                      'rgb(250, 204, 21)',
                      'rgb(34, 197, 94)',
                      'rgb(var(--accent))',
                    ];

                    if (width === 0) return null;

                    return (
                      <div
                        key={level}
                        className="h-full"
                        style={{ width: `${width}%`, background: colors[level] }}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-2xl font-black mb-1" style={{ color: 'rgb(var(--text))' }}>
                    {stats?.masteredCount || 0}
                  </p>
                  <p className="text-xs font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                    Mastered
                  </p>
                </div>
                <div>
                  <p className="text-2xl font-black mb-1" style={{ color: 'rgb(var(--text))' }}>
                    {stats?.grade9SpeedCount || 0}
                  </p>
                  <p className="text-xs font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                    Grade 9 Speed
                  </p>
                </div>
              </div>

              <button
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-all hover:scale-105"
                style={{ background: 'var(--gradient-primary)', color: 'white' }}
              >
                <span>View Breakdown</span>
                <ArrowRight size={18} />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
