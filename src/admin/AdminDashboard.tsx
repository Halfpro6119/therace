import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../db/client';
import { BookOpen, Layers, Tag, FileText, Database, Upload, Wrench, TrendingUp, BarChart3 } from 'lucide-react';

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
    { label: 'Content Coverage', description: 'Track coverage across papers and topics', icon: BarChart3, link: '/admin/coverage', color: 'indigo' },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const colorMap: Record<string, string> = {
              indigo: 'hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800',
              blue: 'hover:bg-blue-50 dark:hover:bg-blue-900/20 border-blue-200 dark:border-blue-800',
              purple: 'hover:bg-purple-50 dark:hover:bg-purple-900/20 border-purple-200 dark:border-purple-800',
              green: 'hover:bg-green-50 dark:hover:bg-green-900/20 border-green-200 dark:border-green-800',
            };
            return (
              <Link
                key={action.label}
                to={action.link}
                className={`block p-4 rounded-lg border transition-colors ${colorMap[action.color]}`}
              >
                <div className="flex items-start gap-3">
                  <Icon size={24} className="text-gray-600 dark:text-gray-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{action.label}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{action.description}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
