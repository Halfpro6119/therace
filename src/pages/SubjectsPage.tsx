import { useState, useEffect } from 'react';
import { db } from '../db/client';
import { SubjectCard } from '../components/SubjectCard';
import { storage } from '../utils/storage';
import { MasteryLevel, Subject, Quiz } from '../types';
import {
  FEATURED_HUBS,
  CHOSEN_SUBJECT_NAMES,
  LANGUAGE_NAMES,
} from '../config/subjectGroups';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Calculator, FlaskConical, Briefcase, Landmark, Globe, BookHeart, Heart, Cpu, Brain, Lightbulb, BookMarked, Languages, ArrowRight, Target } from 'lucide-react';
import { StudyPathDashboard } from '../components/learning/StudyPathDashboard';
import { getScienceLabProgressSummary } from '../utils/scienceLabProgress';
import { motion } from 'framer-motion';
import { SkeletonSubjectsPage } from '../components/ui/Skeleton';

const HUB_ICONS = {
  BookOpen,
  Calculator,
  FlaskConical,
  Briefcase,
  Landmark,
  Globe,
  BookHeart,
  Heart,
  Cpu,
  Brain,
  Languages,
};

function findByNames(subjects: Subject[], names: string[]): Subject[] {
  const map = new Map(subjects.map((s) => [s.name.toLowerCase(), s]));
  return names
    .map((n) => map.get(n.toLowerCase()))
    .filter((s): s is Subject => s != null);
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

export function SubjectsPage() {
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
    return <SkeletonSubjectsPage />;
  }

  const chosenSubjects = findByNames(subjects, CHOSEN_SUBJECT_NAMES);
  const languageSubjects = findByNames(subjects, LANGUAGE_NAMES);
  const scienceLabProgress = getScienceLabProgressSummary();

  return (
    <motion.div
      className="max-w-7xl mx-auto space-y-6 sm:space-y-8 md:space-y-12"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {/* Page header */}
      <motion.div
        className="flex items-center gap-3 sm:gap-4"
        variants={item}
      >
        <div
          className="p-2.5 sm:p-3 rounded-xl flex-shrink-0"
          style={{ background: 'rgb(var(--accent) / 0.1)' }}
        >
          <BookOpen size={24} className="sm:w-8 sm:h-8" style={{ color: 'rgb(var(--accent))' }} />
        </div>
        <div className="min-w-0">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight"
            style={{ color: 'rgb(var(--text))' }}
          >
            Your Subjects
          </h1>
          <p
            className="mt-0.5 sm:mt-1 text-sm sm:text-base"
            style={{ color: 'rgb(var(--text-secondary))' }}
          >
            Choose a subject to start practicing
          </p>
        </div>
      </motion.div>

      <motion.div variants={item}>
        <StudyPathDashboard />
      </motion.div>

      {/* Continue Science Lab — past-paper practice */}
      {scienceLabProgress.hasProgress && scienceLabProgress.continueHref && (
        <motion.section variants={item}>
          <button
            type="button"
            onClick={() => navigate(scienceLabProgress.continueHref!)}
            className="w-full rounded-2xl p-5 sm:p-6 text-left border-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            style={{
              background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 50%, #8B5CF6 100%)',
              borderColor: 'transparent',
            }}
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="p-3 rounded-xl bg-white/20 flex-shrink-0">
                <Target size={28} className="text-white" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
                  Continue Science Lab
                </h2>
                <p className="text-sm text-white/90">
                  {scienceLabProgress.subjects
                    .map((s) => `${s.subject} ${s.topicTestsCompleted}/${s.topicTestsTotal}${s.fullGcsePassed ? ' ✓' : ''}`)
                    .join(' · ')}
                </p>
              </div>
            </div>
            <span className="flex items-center gap-2 font-semibold text-white shrink-0">
              Continue
              <ArrowRight size={20} />
            </span>
          </button>
        </motion.section>
      )}

      {/* Top: 3 featured hub cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        variants={container}
      >
        {FEATURED_HUBS.map((hub) => {
          const HubIcon = HUB_ICONS[hub.icon];
          return (
            <motion.div
              key={hub.id}
              variants={item}
              className="rounded-2xl p-4 sm:p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 border-2"
              style={{
                background: `linear-gradient(180deg, ${hub.accentColor}08 0%, rgb(var(--surface)) 40%)`,
                borderColor: `${hub.accentColor}30`,
              }}
            >
              <div
                className="flex items-center gap-3 mb-3 sm:mb-4 pb-3"
                style={{ borderBottom: '1px solid rgb(var(--border))' }}
              >
                <div
                  className="p-2 sm:p-2.5 rounded-xl flex-shrink-0"
                  style={{ background: `${hub.accentColor}15` }}
                >
                  <HubIcon size={22} className="sm:w-6 sm:h-6" style={{ color: hub.accentColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h2
                    className="text-base sm:text-lg font-bold truncate"
                    style={{ color: 'rgb(var(--text))' }}
                  >
                    {hub.title}
                  </h2>
                  <p
                    className="text-xs sm:text-sm truncate"
                    style={{ color: 'rgb(var(--text-secondary))' }}
                  >
                    {hub.subtitle}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate(hub.hubPath)}
                className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-90 active:scale-[0.98] min-h-[44px]"
                style={{
                  background: hub.accentColor,
                  boxShadow: `0 2px 8px ${hub.accentColor}40`,
                }}
              >
                <span>Enter hub</span>
                <ArrowRight size={16} />
              </button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Middle: Chosen subjects */}
      {chosenSubjects.length > 0 && (
        <motion.section variants={container}>
          <motion.div
            className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4"
            variants={item}
          >
            <BookMarked size={20} className="sm:w-[22px] sm:h-[22px]" style={{ color: 'rgb(var(--accent))' }} />
            <h2
              className="text-lg sm:text-xl font-bold"
              style={{ color: 'rgb(var(--text))' }}
            >
              Chosen Subjects
            </h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            variants={container}
          >
            {chosenSubjects.map((subject) => {
              const stats = getSubjectStats(subject.id);
              return (
                <motion.div key={subject.id} variants={item}>
                  <SubjectCard subject={subject} {...stats} />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>
      )}

      {/* Bottom: Languages */}
      {languageSubjects.length > 0 && (
        <motion.section variants={container}>
          <motion.div
            className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4"
            variants={item}
          >
            <Languages size={20} className="sm:w-[22px] sm:h-[22px]" style={{ color: 'rgb(var(--accent))' }} />
            <h2
              className="text-lg sm:text-xl font-bold"
              style={{ color: 'rgb(var(--text))' }}
            >
              Languages
            </h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
            variants={container}
          >
            {languageSubjects.map((subject) => {
              const stats = getSubjectStats(subject.id);
              return (
                <motion.div key={subject.id} variants={item}>
                  <SubjectCard subject={subject} {...stats} />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>
      )}

      {/* Quick Tips card */}
      <motion.div
        variants={item}
        className="rounded-2xl p-4 sm:p-6 border-l-4"
        style={{
          background: 'rgb(var(--surface))',
          borderColor: 'rgb(var(--accent))',
          borderLeftWidth: '4px',
          borderTop: '1px solid rgb(var(--border))',
          borderRight: '1px solid rgb(var(--border))',
          borderBottom: '1px solid rgb(var(--border))',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <div
            className="p-1.5 sm:p-2 rounded-lg"
            style={{ background: 'rgb(var(--accent) / 0.1)' }}
          >
            <Lightbulb size={18} className="sm:w-5 sm:h-5" style={{ color: 'rgb(var(--accent))' }} />
          </div>
          <h2
            className="text-lg sm:text-xl font-bold"
            style={{ color: 'rgb(var(--text))' }}
          >
            Quick Tips
          </h2>
        </div>
        <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base" style={{ color: 'rgb(var(--text-secondary))' }}>
          <li className="flex items-start gap-2 sm:gap-3">
            <span className="text-blue-500 font-bold shrink-0">•</span>
            <span>Start with topics you find challenging to build confidence</span>
          </li>
          <li className="flex items-start gap-2 sm:gap-3">
            <span className="text-green-500 font-bold shrink-0">•</span>
            <span>Practice daily to maintain your streak and improve retention</span>
          </li>
          <li className="flex items-start gap-2 sm:gap-3">
            <span className="text-purple-500 font-bold shrink-0">•</span>
            <span>Aim for Grade 9 Speed mastery to prove exam readiness</span>
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
