import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { db } from '../../db/client';
import { SubjectCard } from '../../components/SubjectCard';
import { storage } from '../../utils/storage';
import { MasteryLevel, Subject, Quiz } from '../../types';
import { FEATURED_HUBS, TRIPLE_SCIENCE_NAMES } from '../../config/subjectGroups';

const hubConfig = FEATURED_HUBS.find((h) => h.id === 'science')!;

function findByNames(subjects: Subject[], names: string[]): Subject[] {
  const map = new Map(subjects.map((s) => [s.name.toLowerCase(), s]));
  return names
    .map((n) => map.get(n.toLowerCase()))
    .filter((s): s is Subject => s != null);
}

export function ScienceLabHomePage() {
  const navigate = useNavigate();
  const masteryStates = storage.getMasteryStates();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [subjectsData, quizzesData] = await Promise.all([
        db.getSubjects(),
        Promise.all((await db.getSubjects()).map((s) => db.getQuizzesBySubject(s.id))).then((results) => results.flat()),
      ]);
      setSubjects(subjectsData);
      setQuizzes(quizzesData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSubjectStats = (subjectId: string) => {
    const subjectQuizzes = quizzes.filter((q) => q.subjectId === subjectId);
    let totalMastery = 0;
    let masteredCount = 0;
    subjectQuizzes.forEach((quiz) => {
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

  const hubSubjects = findByNames(subjects, hubConfig.subjectNames);
  const tripleScience = hubSubjects.filter((s) => TRIPLE_SCIENCE_NAMES.has(s.name));
  const combinedScience = hubSubjects.filter((s) => s.name === 'Combined Science');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{
          background: `linear-gradient(135deg, ${hubConfig.accentColor} 0%, ${hubConfig.accentColor}CC 100%)`,
          borderColor: 'transparent',
        }}
      >
        <button
          type="button"
          onClick={() => navigate('/subjects')}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Subjects
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Science Lab</h1>
        <p className="text-white/90 text-sm sm:text-base">
          Biology, Chemistry, Physics & Combined Science – Triple vs Combined
        </p>
      </motion.section>

      <section className="space-y-6">
        {loading ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-48 rounded-2xl animate-pulse"
                  style={{ background: 'rgb(var(--surface-2))' }}
                />
              ))}
            </div>
          </div>
        ) : hubSubjects.length > 0 ? (
          <>
            {tripleScience.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-4" style={{ color: 'rgb(var(--text))' }}>
                  Triple Science
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {tripleScience.map((subject, index) => {
                    const stats = getSubjectStats(subject.id);
                    return (
                      <motion.div
                        key={subject.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.05 }}
                      >
                        <SubjectCard subject={subject} {...stats} />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
            {combinedScience.length > 0 && (
              <div>
                <div className="flex items-center gap-3 py-2 mb-4">
                  <span
                    className="flex-1 border-t"
                    style={{ borderColor: 'rgb(var(--border))' }}
                  />
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                    style={{
                      background: `${hubConfig.accentColor}15`,
                      color: hubConfig.accentColor,
                    }}
                  >
                    Triple vs Combined
                  </span>
                  <span
                    className="flex-1 border-t"
                    style={{ borderColor: 'rgb(var(--border))' }}
                  />
                </div>
                <h2 className="text-lg font-bold mb-4" style={{ color: 'rgb(var(--text))' }}>
                  Combined Science
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {combinedScience.map((subject, index) => {
                    const stats = getSubjectStats(subject.id);
                    return (
                      <motion.div
                        key={subject.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.05 }}
                      >
                        <SubjectCard subject={subject} {...stats} />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            No science subjects available yet. Check back later.
          </p>
        )}
      </section>
    </div>
  );
}
