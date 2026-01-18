import { Trophy, Flame, TrendingUp } from 'lucide-react';
import { mockLeaderboard } from '../db/mockData';

export function LeaderboardPage() {
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-yellow-500 to-orange-500';
    if (rank === 2) return 'from-gray-400 to-gray-500';
    if (rank === 3) return 'from-amber-600 to-amber-700';
    return 'from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-yellow-500/10 rounded-xl">
          <Trophy size={32} className="text-yellow-600 dark:text-yellow-400" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Leaderboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            See how you rank among your friends
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockLeaderboard.slice(0, 3).map(entry => (
          <div
            key={entry.id}
            className={`bg-gradient-to-br ${getRankColor(entry.rank)} rounded-2xl p-6 text-white shadow-xl transform ${
              entry.rank === 1 ? 'md:scale-105' : ''
            }`}
          >
            <div className="text-center">
              <div className="text-5xl mb-2">{entry.avatar}</div>
              <div className="text-4xl mb-2">{getRankIcon(entry.rank)}</div>
              <p className="font-bold text-lg mb-1">{entry.name}</p>
              <p className="text-2xl font-bold mb-3">{entry.weeklyXP} XP</p>
              <div className="flex items-center justify-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Flame size={16} />
                  <span>{entry.streak}</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp size={16} />
                  <span>{entry.readinessPercent}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
          <h2 className="font-bold text-gray-900 dark:text-white">Full Rankings</h2>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {mockLeaderboard.map(entry => {
            const isYou = entry.name === 'You';

            return (
              <div
                key={entry.id}
                className={`p-4 flex items-center gap-4 transition-colors ${
                  isYou
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getRankColor(entry.rank)} flex items-center justify-center text-white font-bold shadow-sm`}>
                  {typeof getRankIcon(entry.rank) === 'string' ? (
                    <span className="text-2xl">{getRankIcon(entry.rank)}</span>
                  ) : (
                    <span className="text-lg">{entry.rank}</span>
                  )}
                </div>

                <div className="text-4xl">{entry.avatar}</div>

                <div className="flex-1">
                  <p className={`font-bold ${isYou ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                    {entry.name}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Trophy size={14} />
                      <span>{entry.weeklyXP} XP</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Flame size={14} />
                      <span>{entry.streak} day streak</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Readiness</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {entry.readinessPercent}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl">
        <h3 className="text-xl font-bold mb-2">Compete with Friends</h3>
        <p className="text-white/90 mb-4">
          Stay motivated by comparing your progress with others. Complete more quizzes to climb the leaderboard!
        </p>
        <div className="flex flex-wrap gap-3">
          <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
            <p className="text-sm font-medium">Updates weekly</p>
          </div>
          <div className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
            <p className="text-sm font-medium">Based on XP earned</p>
          </div>
        </div>
      </div>
    </div>
  );
}
