import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../db/client';
import { BookOpen, Layers, Tag, FileText, Database, Upload, Wrench, TrendingUp } from 'lucide-react';

interface Stats {
  subjects: number;
  units: number;
  topics: number;
  prompts: number;
  quizzes: number;
}

export function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    subjects: 0,
    units: 0,
    topics: 0,
    prompts: 0,
    quizzes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [subjects, allUnits, allTopics, allPrompts, allQuizzes] = await Promise.all([
        db.getSubjects(),
        Promise.all((await db.getSubjects()).map(s => db.getUnits(s.id))).then(arr => arr.flat()),
        Promise.all((await db.getSubjects()).map(s => db.getTopics(s.id))).then(arr => arr.flat()),
        Promise.all((await db.getSubjects()).map(s => db.getPromptsBySubject(s.id))).then(arr => arr.flat()),
        Promise.all((await db.getSubjects()).map(s => db.getQuizzesBySubject(s.id))).then(arr => arr.flat()),
      ]);

      setStats({
        subjects: subjects.length,
        units: allUnits.length,
        topics: allTopics.length,
        prompts: allPrompts.length,
        quizzes: allQuizzes.length,
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Subjects', value: stats.subjects, icon: BookOpen, color: 'from-blue-500 to-cyan-500', link: '/admin/subjects' },
    { label: 'Units', value: stats.units, icon: Layers, color: 'from-green-500 to-emerald-500', link: '/admin/units' },
    { label: 'Topics', value: stats.topics, icon: Tag, color: 'from-purple-500 to-pink-500', link: '/admin/topics' },
    { label: 'Prompts', value: stats.prompts, icon: FileText, color: 'from-orange-500 to-red-500', link: '/admin/prompts' },
    { label: 'Quizzes', value: stats.quizzes, icon: Database, color: 'from-yellow-500 to-orange-500', link: '/admin/quizzes' },
  ];

  const quickActions = [
    { label: 'Bulk Import', description: 'Import prompts from CSV or JSON', icon: Upload, link: '/admin/import', color: 'blue' },
    { label: 'Batch Tools', description: 'Deduplicate and create quizzes', icon: Wrench, link: '/admin/tools', color: 'purple' },
    { label: 'Create Quiz', description: 'Build a new quiz manually', icon: Database, link: '/admin/quizzes', color: 'green' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your Grade9 Sprint content
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.label}
              to={card.link}
              className="group"
            >
              <div className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}>
                <div className="flex items-center justify-between mb-4">
                  <Icon size={32} />
                  <TrendingUp size={20} className="opacity-60" />
                </div>
                <p className="text-white/80 text-sm font-medium mb-1">{card.label}</p>
                <p className="text-4xl font-bold">{card.value}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const colorClasses = {
              blue: 'bg-blue-500 hover:bg-blue-600',
              purple: 'bg-purple-500 hover:bg-purple-600',
              green: 'bg-green-500 hover:bg-green-600',
            }[action.color];

            return (
              <Link
                key={action.label}
                to={action.link}
                className="block group"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all shadow-sm hover:shadow-md">
                  <div className={`w-12 h-12 ${colorClasses} rounded-xl flex items-center justify-center mb-4 transition-colors`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {action.label}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {action.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl p-6 text-white shadow-xl">
        <h3 className="text-xl font-bold mb-2">Getting Started</h3>
        <p className="text-white/90 mb-4">
          Start by importing your first batch of prompts, or create content manually through the navigation menu.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/import"
            className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg font-medium transition-colors"
          >
            Go to Import
          </Link>
          <Link
            to="/admin/subjects"
            className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg font-medium transition-colors"
          >
            Manage Subjects
          </Link>
        </div>
      </div>
    </div>
  );
}
