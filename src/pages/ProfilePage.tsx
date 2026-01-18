import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, ArrowRight } from 'lucide-react';
import { storage } from '../utils/storage';
import { ProfileHeaderCard } from '../components/profile/ProfileHeaderCard';
import { StreakWidget } from '../components/profile/StreakWidget';
import { MasteryProgressCard } from '../components/profile/MasteryProgressCard';
import { BadgeGrid } from '../components/profile/BadgeGrid';
import { PersonalBestsCard } from '../components/profile/PersonalBestsCard';
import { SettingsCard } from '../components/profile/SettingsCard';

export function ProfilePage() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'light' | 'dark'>(storage.getTheme());
  const profile = storage.getProfile();
  const streak = storage.getStreak();
  const attempts = storage.getAttempts();
  const masteryStates = storage.getAllMasteryStates();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    storage.setTheme(theme);
  }, [theme]);

  const calculateGrade9Readiness = () => {
    const states = Object.values(masteryStates);
    if (states.length === 0) return 0;

    const masteredCount = states.filter(s => s.masteryLevel >= 3).length;
    return Math.round((masteredCount / states.length) * 100);
  };

  const grade9ReadinessPct = calculateGrade9Readiness();

  const handleViewHeatmap = () => {
    navigate('/subjects');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <ProfileHeaderCard
        profile={profile}
        streak={streak}
        grade9ReadinessPct={grade9ReadinessPct}
      />

      <button
        onClick={() => navigate('/profile/subjects')}
        className="w-full rounded-3xl p-8 transition-all hover:scale-[1.02]"
        style={{ background: 'rgb(var(--surface))' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl" style={{ background: 'rgba(var(--accent), 0.1)' }}>
              <BarChart3 size={32} style={{ color: 'rgb(var(--accent))' }} />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-black mb-1" style={{ color: 'rgb(var(--text))' }}>
                Subject Breakdown
              </h2>
              <p className="text-base font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                View detailed analytics for each subject
              </p>
            </div>
          </div>
          <ArrowRight size={32} style={{ color: 'rgb(var(--accent))' }} />
        </div>
      </button>

      <div className="grid lg:grid-cols-2 gap-6">
        <StreakWidget streak={streak} attempts={attempts} />

        <div className="space-y-6">
          <MasteryProgressCard
            masteryStates={masteryStates}
            profile={profile}
            onViewHeatmap={handleViewHeatmap}
          />
        </div>
      </div>

      <PersonalBestsCard attempts={attempts} />

      <BadgeGrid profile={profile} streak={streak} attempts={attempts} />

      <SettingsCard theme={theme} onThemeChange={setTheme} />
    </div>
  );
}
