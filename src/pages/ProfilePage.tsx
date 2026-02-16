import { useNavigate } from 'react-router-dom';
import { BarChart3, ArrowRight, FlaskConical } from 'lucide-react';
import { storage } from '../utils/storage';
import { getScienceLabProgressSummary } from '../utils/scienceLabProgress';
import { ProfileHeaderCard } from '../components/profile/ProfileHeaderCard';
import { StreakWidget } from '../components/profile/StreakWidget';
import { MasteryProgressCard } from '../components/profile/MasteryProgressCard';
import { BadgeGrid } from '../components/profile/BadgeGrid';
import { PersonalBestsCard } from '../components/profile/PersonalBestsCard';
import { SettingsCard } from '../components/profile/SettingsCard';

export function ProfilePage() {
  const navigate = useNavigate();
  const profile = storage.getProfile();
  const streak = storage.getStreak();
  const attempts = storage.getAttempts();
  const masteryStates = storage.getAllMasteryStates();

  const calculateGrade9Readiness = () => {
    const states = Object.values(masteryStates);
    if (states.length === 0) return 0;

    const masteredCount = states.filter(s => s.masteryLevel >= 3).length;
    return Math.round((masteredCount / states.length) * 100);
  };

  const dbReadinessPct = calculateGrade9Readiness();
  const scienceLabProgress = getScienceLabProgressSummary();
  const scienceLabReadinessPct =
    scienceLabProgress.subjects.length > 0
      ? Math.round(
          scienceLabProgress.subjects.reduce((sum, s) => sum + s.progressPercent, 0) /
            scienceLabProgress.subjects.length
        )
      : 0;
  const grade9ReadinessPct =
    dbReadinessPct > 0 && scienceLabReadinessPct > 0
      ? Math.round((dbReadinessPct + scienceLabReadinessPct) / 2)
      : dbReadinessPct > 0
        ? dbReadinessPct
        : scienceLabReadinessPct;
  const grade9ReadinessLabel =
    dbReadinessPct > 0 && scienceLabReadinessPct > 0
      ? 'Grade 9 Readiness (quizzes + past papers)'
      : scienceLabReadinessPct > 0
        ? 'Grade 9 Readiness (past papers)'
        : 'Grade 9 Readiness';

  const handleViewHeatmap = () => {
    navigate('/subjects');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
      <ProfileHeaderCard
        profile={profile}
        streak={streak}
        grade9ReadinessPct={grade9ReadinessPct}
        grade9ReadinessLabel={grade9ReadinessLabel}
      />

      {scienceLabProgress.hasProgress && (
        <button
          type="button"
          onClick={() => scienceLabProgress.continueHref && navigate(scienceLabProgress.continueHref)}
          className="w-full rounded-2xl sm:rounded-3xl p-4 sm:p-6 border transition-all hover:shadow-md active:scale-[0.99] min-h-[72px] text-left"
          style={{
            background: 'rgb(var(--surface))',
            borderColor: 'rgb(var(--border))',
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="p-3 sm:p-4 rounded-xl flex-shrink-0" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
                <FlaskConical size={24} className="sm:w-8 sm:h-8" style={{ color: '#10B981' }} />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-bold mb-0.5" style={{ color: 'rgb(var(--text))' }}>
                  Science Lab — Past-paper progress
                </h2>
                <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {scienceLabProgress.subjects
                    .map((s) => `${s.subject} ${s.topicTestsCompleted}/${s.topicTestsTotal}${s.fullGcsePassed ? ' ✓' : ''}`)
                    .join(' · ')}
                </p>
              </div>
            </div>
            {scienceLabProgress.continueHref && (
              <span className="flex items-center gap-1 font-semibold shrink-0" style={{ color: 'rgb(var(--accent))' }}>
                Continue
                <ArrowRight size={20} />
              </span>
            )}
          </div>
        </button>
      )}

      <button
        onClick={() => navigate('/profile/subjects')}
        className="w-full rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 transition-all hover:scale-[1.01] sm:hover:scale-[1.02] active:scale-[0.99] min-h-[72px]"
        style={{ background: 'rgb(var(--surface))' }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl flex-shrink-0" style={{ background: 'rgba(var(--accent), 0.1)' }}>
              <BarChart3 size={24} className="sm:w-8 sm:h-8" style={{ color: 'rgb(var(--accent))' }} />
            </div>
            <div className="text-left min-w-0">
              <h2 className="text-lg sm:text-xl md:text-2xl font-black mb-0.5 sm:mb-1 truncate" style={{ color: 'rgb(var(--text))' }}>
                Subject Breakdown
              </h2>
              <p className="text-sm sm:text-base font-semibold truncate" style={{ color: 'rgb(var(--text-secondary))' }}>
                View detailed analytics
              </p>
            </div>
          </div>
          <ArrowRight size={24} className="sm:w-8 sm:h-8 flex-shrink-0" style={{ color: 'rgb(var(--accent))' }} />
        </div>
      </button>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <StreakWidget streak={streak} attempts={attempts} />

        <div className="space-y-4 sm:space-y-6">
          <MasteryProgressCard
            masteryStates={masteryStates}
            profile={profile}
            onViewHeatmap={handleViewHeatmap}
          />
        </div>
      </div>

      <PersonalBestsCard attempts={attempts} />

      <BadgeGrid profile={profile} streak={streak} attempts={attempts} />

      <SettingsCard />
    </div>
  );
}
