import { useState, useEffect } from 'react';
import { db } from '../db/client';
import { SubjectCard } from '../components/SubjectCard';
import { storage } from '../utils/storage';
import { MasteryLevel, Subject, Quiz } from '../types';
import { BookOpen } from 'lucide-react';

export function SubjectsPage() {
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
        Promise.all((await db.getSubjects()).map(s => db.getQuizzesBySubject(s.id))).then(results => results.flat())
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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-500/10 rounded-xl">
          <BookOpen size={32} className="text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Your Subjects
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Choose a subject to start practicing
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map(subject => {
          const stats = getSubjectStats(subject.id);
          return (
            <SubjectCard
              key={subject.id}
              subject={subject}
              {...stats}
            />
          );
        })}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          Quick Tips
        </h2>
        <ul className="space-y-2 text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <span className="text-blue-500 font-bold">•</span>
            <span>Start with topics you find challenging to build confidence</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-green-500 font-bold">•</span>
            <span>Practice daily to maintain your streak and improve retention</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 font-bold">•</span>
            <span>Aim for Grade 9 Speed mastery to prove exam readiness</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
