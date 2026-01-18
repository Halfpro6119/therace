import { useState } from 'react';
import { BadgeCard } from './BadgeCard';
import { UserProfile, StreakState, Attempt } from '../../types';

interface BadgeGridProps {
  profile: UserProfile;
  streak: StreakState;
  attempts: Attempt[];
}

export function BadgeGrid({ profile, streak, attempts }: BadgeGridProps) {
  const [activeTab, setActiveTab] = useState<'badges' | 'trophies'>('badges');

  const badges = [
    {
      id: 'first-quiz',
      name: 'First Steps',
      description: 'Complete your first quiz',
      earned: attempts.length > 0,
      rarity: 'common' as const,
      progress: attempts.length > 0 ? 1 : 0,
      progressMax: 1,
    },
    {
      id: 'first-mastered',
      name: 'Mastery Achieved',
      description: 'Master your first quiz',
      earned: profile.badges.includes('First Mastered'),
      rarity: 'rare' as const,
      progress: profile.masteredCount,
      progressMax: 1,
    },
    {
      id: 'grade9-speed',
      name: 'Grade 9 Speed',
      description: 'Achieve Grade 9 speed on any quiz',
      earned: profile.badges.includes('Grade 9 Speed'),
      rarity: 'epic' as const,
      progress: profile.grade9SpeedCount,
      progressMax: 1,
    },
    {
      id: '7-day-streak',
      name: '7 Day Warrior',
      description: 'Maintain a 7-day streak',
      earned: streak.bestStreakDays >= 7,
      rarity: 'epic' as const,
      progress: Math.min(streak.currentStreakDays, 7),
      progressMax: 7,
    },
    {
      id: '10-quizzes',
      name: 'Quiz Master',
      description: 'Complete 10 quizzes',
      earned: profile.totalQuizzes >= 10,
      rarity: 'rare' as const,
      progress: Math.min(profile.totalQuizzes, 10),
      progressMax: 10,
    },
    {
      id: '100-percent',
      name: 'Perfect Score',
      description: 'Get 100% on any quiz',
      earned: attempts.some(
        a =>
          a.accuracyPct === 100 &&
          a.correctPromptIds &&
          a.correctPromptIds.length > 0
      ),
      rarity: 'legendary' as const,
    },
  ];

  const earnedBadges = badges.filter(b => b.earned);
  const lockedBadges = badges.filter(b => !b.earned);

  return (
    <div className="rounded-3xl p-8" style={{ background: 'rgb(var(--surface))' }}>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black mb-2" style={{ color: 'rgb(var(--text))' }}>
            Achievements
          </h2>
          <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
            {earnedBadges.length} of {badges.length} unlocked
          </p>
        </div>

        <div className="flex gap-2 p-1 rounded-xl" style={{ background: 'rgb(var(--surface-2))' }}>
          <button
            onClick={() => setActiveTab('badges')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all`}
            style={{
              background: activeTab === 'badges' ? 'var(--gradient-primary)' : 'transparent',
              color: activeTab === 'badges' ? 'white' : 'rgb(var(--text))',
            }}
          >
            Badges
          </button>
          <button
            onClick={() => setActiveTab('trophies')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all`}
            style={{
              background: activeTab === 'trophies' ? 'var(--gradient-primary)' : 'transparent',
              color: activeTab === 'trophies' ? 'white' : 'rgb(var(--text))',
            }}
          >
            Trophies
          </button>
        </div>
      </div>

      {activeTab === 'badges' && (
        <div className="space-y-6">
          {earnedBadges.length > 0 && (
            <div>
              <h3 className="text-sm font-bold mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
                EARNED
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {earnedBadges.map(badge => (
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
              </div>
            </div>
          )}

          {lockedBadges.length > 0 && (
            <div>
              <h3 className="text-sm font-bold mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
                LOCKED
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lockedBadges.map(badge => (
                  <BadgeCard key={badge.id} badge={badge} />
                ))}
              </div>
            </div>
          )}

          {earnedBadges.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg font-semibold mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                No badges earned yet
              </p>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                Complete quizzes to unlock your first badge
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'trophies' && (
        <div className="text-center py-12">
          <p className="text-lg font-semibold mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
            Trophies coming soon
          </p>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            Complete subject milestones to earn trophies
          </p>
        </div>
      )}
    </div>
  );
}
