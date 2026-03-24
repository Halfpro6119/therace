import { useState, useEffect } from 'react';
import { db } from '../db/client';
import {
  type SubjectHub,
  FEATURED_HUBS,
  BIG_3_HUB_IDS,
  HUMANITIES_HUB_IDS,
  LANGUAGES_HUB_IDS,
  TOP_2_HUB_IDS,
} from '../config/subjectGroups';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAdminView } from '../contexts/AdminViewContext';
import type { LucideIcon } from 'lucide-react';
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

function findHubsByIds(ids: string[]) {
  const map = new Map(FEATURED_HUBS.map((hub) => [hub.id, hub]));
  return ids
    .map((id) => map.get(id))
    .filter((hub): hub is (typeof FEATURED_HUBS)[number] => hub != null);
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

function HubSectionTitle({
  icon: Icon,
  title,
  variants,
}: {
  icon: LucideIcon;
  title: string;
  variants: typeof item;
}) {
  return (
    <motion.div
      className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-6 text-center"
      variants={variants}
    >
      <div
        className="p-2 rounded-xl inline-flex"
        style={{ background: 'rgb(var(--accent) / 0.1)' }}
      >
        <Icon size={22} className="sm:w-6 sm:h-6 shrink-0" style={{ color: 'rgb(var(--accent))' }} />
      </div>
      <h2
        className="text-xl sm:text-2xl font-bold tracking-tight"
        style={{ color: 'rgb(var(--text))' }}
      >
        {title}
      </h2>
    </motion.div>
  );
}

function HubCard({
  hub,
  navigate,
  variants,
}: {
  hub: SubjectHub;
  navigate: ReturnType<typeof useNavigate>;
  variants: typeof item;
}) {
  const HubIcon = HUB_ICONS[hub.icon];
  return (
    <motion.div
      variants={variants}
      className="w-full sm:max-w-[min(100%,22rem)] rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:shadow-xl hover:-translate-y-1 border-2 group"
      style={{
        background: `linear-gradient(165deg, ${hub.accentColor}12 0%, rgb(var(--surface)) 45%, rgb(var(--surface)) 100%)`,
        borderColor: `${hub.accentColor}35`,
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div
        className="flex flex-col items-center text-center pb-4 mb-4"
        style={{ borderBottom: '1px solid rgb(var(--border))' }}
      >
        <div
          className="p-3 sm:p-3.5 rounded-2xl mb-3"
          style={{ background: `${hub.accentColor}18` }}
        >
          <HubIcon size={28} className="sm:w-8 sm:h-8" style={{ color: hub.accentColor }} />
        </div>
        <h3
          className="text-lg sm:text-xl font-bold leading-snug mb-2 px-1"
          style={{ color: 'rgb(var(--text))' }}
        >
          {hub.title}
        </h3>
        <p
          className="text-xs sm:text-sm leading-relaxed line-clamp-3 px-1 max-w-[20rem] mx-auto"
          style={{ color: 'rgb(var(--text-secondary))' }}
        >
          {hub.subtitle}
        </p>
      </div>
      <button
        type="button"
        onClick={() => navigate(hub.hubPath)}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm text-white transition-all hover:opacity-95 active:scale-[0.98] min-h-[48px] group-hover:shadow-md"
        style={{
          background: hub.accentColor,
          boxShadow: `0 4px 14px ${hub.accentColor}45`,
        }}
      >
        <span>Enter hub</span>
        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
      </button>
    </motion.div>
  );
}

export function SubjectsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const adminView = useAdminView();
  // #region agent log
  if (typeof fetch !== 'undefined') fetch('http://127.0.0.1:7506/ingest/9f782f9d-eb99-41f5-9f25-693070ac1ca4',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'8a1f20'},body:JSON.stringify({sessionId:'8a1f20',location:'SubjectsPage.tsx:render',message:'SubjectsPage render',data:{pathname:location.pathname,hasAdminView:!!adminView,basePath:adminView?.basePath},timestamp:Date.now(),hypothesisId:'H_pathname'})}).catch(()=>{});
  // #endregion
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await db.getSubjects();
      } catch (error) {
        console.error('Failed to load subjects:', error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <SkeletonSubjectsPage />;
  }

  const top2Hubs = findHubsByIds(TOP_2_HUB_IDS);
  const big3Hubs = findHubsByIds(BIG_3_HUB_IDS);
  const humanitiesHubs = findHubsByIds(HUMANITIES_HUB_IDS);
  const languagesHubs = findHubsByIds(LANGUAGES_HUB_IDS);
  const usedHubIds = new Set([
    ...TOP_2_HUB_IDS,
    ...BIG_3_HUB_IDS,
    ...HUMANITIES_HUB_IDS,
    ...LANGUAGES_HUB_IDS,
  ]);
  const otherHubs = FEATURED_HUBS.filter((hub) => !usedHubIds.has(hub.id));
  const scienceLabProgress = getScienceLabProgressSummary();
  // #region agent log
  if (typeof fetch !== 'undefined') fetch('http://127.0.0.1:7506/ingest/9f782f9d-eb99-41f5-9f25-693070ac1ca4',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'8a1f20'},body:JSON.stringify({sessionId:'8a1f20',location:'SubjectsPage.tsx:mainContent',message:'SubjectsPage main content render',data:{pathname:location.pathname,loading:false,hubsCount:FEATURED_HUBS.length},timestamp:Date.now(),hypothesisId:'H_hubs'})}).catch(()=>{});
  // #endregion

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 md:space-y-14"
      initial="hidden"
      animate="show"
      variants={container}
    >
      {/* Page header */}
      <motion.header
        className="flex flex-col items-center text-center max-w-2xl mx-auto pt-2 sm:pt-4"
        variants={item}
      >
        <div
          className="p-3 sm:p-4 rounded-2xl mb-4 sm:mb-5"
          style={{ background: 'rgb(var(--accent) / 0.12)' }}
        >
          <BookOpen size={32} className="sm:w-10 sm:h-10" style={{ color: 'rgb(var(--accent))' }} />
        </div>
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
          style={{ color: 'rgb(var(--text))' }}
        >
          Your Subjects
        </h1>
        <p
          className="mt-2 sm:mt-3 text-sm sm:text-base max-w-md mx-auto leading-relaxed"
          style={{ color: 'rgb(var(--text-secondary))' }}
        >
          Choose a subject hub to start practicing
        </p>
      </motion.header>

      <motion.div variants={item} className="max-w-3xl mx-auto w-full">
        <StudyPathDashboard />
      </motion.div>

      {/* Continue Science Lab — past-paper practice */}
      {scienceLabProgress.hasProgress && scienceLabProgress.continueHref && (
        <motion.section variants={item} className="max-w-2xl mx-auto w-full">
          <button
            type="button"
            onClick={() => navigate(scienceLabProgress.continueHref!)}
            className="w-full rounded-2xl p-6 sm:p-7 border-2 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 flex flex-col items-center text-center gap-4"
            style={{
              background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 50%, #8B5CF6 100%)',
              borderColor: 'transparent',
            }}
          >
            <div className="p-3 rounded-2xl bg-white/20">
              <Target size={28} className="text-white" />
            </div>
            <div className="min-w-0 w-full">
              <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
                Continue Science Lab
              </h2>
              <p className="text-sm text-white/90 leading-relaxed">
                {scienceLabProgress.subjects
                  .map((s) => `${s.subject} ${s.topicTestsCompleted}/${s.topicTestsTotal}${s.fullGcsePassed ? ' ✓' : ''}`)
                  .join(' · ')}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 font-semibold text-white px-4 py-2 rounded-xl bg-white/15">
              Continue
              <ArrowRight size={20} />
            </span>
          </button>
        </motion.section>
      )}

      {/* Hub priority sections — centered rows */}
      {top2Hubs.length > 0 && (
        <motion.section className="max-w-6xl mx-auto w-full" variants={container}>
          <HubSectionTitle icon={BookMarked} title="Top 2" variants={item} />
          <motion.div
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
            variants={container}
          >
            {top2Hubs.map((hub) => (
              <HubCard key={hub.id} hub={hub} navigate={navigate} variants={item} />
            ))}
          </motion.div>
        </motion.section>
      )}

      {big3Hubs.length > 0 && (
        <motion.section className="max-w-6xl mx-auto w-full" variants={container}>
          <HubSectionTitle icon={FlaskConical} title="The Big 3" variants={item} />
          <motion.div
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
            variants={container}
          >
            {big3Hubs.map((hub) => (
              <HubCard key={hub.id} hub={hub} navigate={navigate} variants={item} />
            ))}
          </motion.div>
        </motion.section>
      )}

      {humanitiesHubs.length > 0 && (
        <motion.section className="max-w-6xl mx-auto w-full" variants={container}>
          <HubSectionTitle icon={Landmark} title="Humanities" variants={item} />
          <motion.div
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
            variants={container}
          >
            {humanitiesHubs.map((hub) => (
              <HubCard key={hub.id} hub={hub} navigate={navigate} variants={item} />
            ))}
          </motion.div>
        </motion.section>
      )}

      {languagesHubs.length > 0 && (
        <motion.section className="max-w-6xl mx-auto w-full" variants={container}>
          <HubSectionTitle icon={Languages} title="Languages" variants={item} />
          <motion.div
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
            variants={container}
          >
            {languagesHubs.map((hub) => (
              <HubCard key={hub.id} hub={hub} navigate={navigate} variants={item} />
            ))}
          </motion.div>
        </motion.section>
      )}

      {otherHubs.length > 0 && (
        <motion.section className="max-w-6xl mx-auto w-full" variants={container}>
          <HubSectionTitle icon={BookOpen} title="Other Hubs" variants={item} />
          <motion.div
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
            variants={container}
          >
            {otherHubs.map((hub) => (
              <HubCard key={hub.id} hub={hub} navigate={navigate} variants={item} />
            ))}
          </motion.div>
        </motion.section>
      )}

      {/* Quick Tips card */}
      <motion.div
        variants={item}
        className="max-w-2xl mx-auto w-full rounded-2xl p-6 sm:p-8 text-center border"
        style={{
          background: 'rgb(var(--surface))',
          borderColor: 'rgb(var(--border))',
          boxShadow: 'var(--shadow-sm)',
          borderTopWidth: '3px',
          borderTopColor: 'rgb(var(--accent))',
        }}
      >
        <div className="flex flex-col items-center gap-3 mb-5 sm:mb-6">
          <div
            className="p-2.5 rounded-xl"
            style={{ background: 'rgb(var(--accent) / 0.1)' }}
          >
            <Lightbulb size={22} className="sm:w-6 sm:h-6" style={{ color: 'rgb(var(--accent))' }} />
          </div>
          <h2
            className="text-xl sm:text-2xl font-bold tracking-tight"
            style={{ color: 'rgb(var(--text))' }}
          >
            Quick Tips
          </h2>
        </div>
        <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base max-w-md mx-auto leading-relaxed" style={{ color: 'rgb(var(--text-secondary))' }}>
          <li className="text-center">
            <span className="text-blue-500 font-bold mr-1.5">•</span>
            Start with topics you find challenging to build confidence
          </li>
          <li className="text-center">
            <span className="text-green-500 font-bold mr-1.5">•</span>
            Practice daily to maintain your streak and improve retention
          </li>
          <li className="text-center">
            <span className="text-purple-500 font-bold mr-1.5">•</span>
            Aim for Grade 9 Speed mastery to prove exam readiness
          </li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
