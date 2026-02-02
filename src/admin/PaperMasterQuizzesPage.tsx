/**
 * Paper Master Quizzes Management Page
 * 
 * Features:
 * - View all paper master quizzes for a subject
 * - Create/sync paper master quizzes
 * - Enable/disable paper master quizzes
 * - Configure quiz settings
 * - View prompt count for each paper
 */

import { useEffect, useState } from 'react';
import { db, supabase } from '../db/client';
import { Subject, Paper, Quiz } from '../types';
import { Plus, Sync, Toggle2, Edit2, Trash2, BookOpen, AlertCircle } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { useConfirm } from '../contexts/ConfirmContext';

interface PaperMasterQuizWithStats extends Quiz {
  promptCount?: number;
  paper?: Paper;
}

export function PaperMasterQuizzesPage() {
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [papers, setPapers] = useState<Paper[]>([]);
  const [quizzes, setQuizzes] = useState<PaperMasterQuizWithStats[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<PaperMasterQuizWithStats | null>(null);

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      const data = await db.getSubjects();
      setSubjects(data);
      if (data.length > 0) {
        setSelectedSubject(data[0].id);
      }
    } catch (error) {
      console.error('Failed to load subjects:', error);
      showToast('error', 'Failed to load subjects');
    }
  };

  useEffect(() => {
    if (selectedSubject) {
      loadData();
    }
  }, [selectedSubject]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load papers
      const papersData = await db.listPapersBySubject(selectedSubject);
      setPapers(papersData);

      // Load paper master quizzes
      const quizzesData = await db.getPaperMasterQuizzesForSubject(selectedSubject);
      
      // Get prompt counts for each paper
      const quizzesWithStats = await Promise.all(
        quizzesData.map(async (quiz) => {
          const prompts = await db.getPromptsForPaperMasterQuiz(quiz.paperId!);
          const paper = papersData.find(p => p.id === quiz.paperId);
          return {
            ...quiz,
            promptCount: prompts.length,
            paper,
          };
        })
      );

      setQuizzes(quizzesWithStats);
    } catch (error) {
      console.error('Failed to load data:', error);
      showToast('error', 'Failed to load quizzes');
    } finally {
      setLoading(false);
    }
  };

  const handleSyncPaperMasterQuizzes = async () => {
    if (!await confirm({ title: 'Confirm', message: 'Create/sync paper master quizzes for all papers in this subject?' })) return;

    try {
      setSyncing(true);
      const count = await db.syncPaperMasterQuizzesForSubject(selectedSubject);
      showToast('success', `Synced ${count} paper master quiz${count !== 1 ? 'zes' : ''}`);
      await loadData();
    } catch (error) {
      console.error('Failed to sync quizzes:', error);
      showToast('error', 'Failed to sync quizzes');
    } finally {
      setSyncing(false);
    }
  };

  const handleToggleActive = async (quiz: PaperMasterQuizWithStats) => {
    try {
      await db.togglePaperMasterQuizActive(quiz.id, !quiz.isActive);
      showToast('success', `Quiz ${quiz.isActive ? 'disabled' : 'enabled'}`);
      await loadData();
    } catch (error) {
      console.error('Failed to toggle quiz:', error);
      showToast('error', 'Failed to toggle quiz');
    }
  };

  const handleEditQuiz = (quiz: PaperMasterQuizWithStats) => {
    setEditingQuiz(quiz);
  };

  const handleSaveQuiz = async () => {
    if (!editingQuiz) return;

    try {
      const { error } = await supabase
        .from('quizzes')
        .update({
          title: editingQuiz.title,
          description: editingQuiz.description,
          settings: editingQuiz.settings,
        })
        .eq('id', editingQuiz.id);

      if (error) throw error;
      showToast('success', 'Quiz updated successfully');
      setEditingQuiz(null);
      await loadData();
    } catch (error) {
      console.error('Failed to save quiz:', error);
      showToast('error', 'Failed to save quiz');
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Paper Master Quizzes</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage master quizzes for each paper</p>
      </div>

      {/* Subject Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Subject
        </label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="">Select a subject...</option>
          {subjects.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* Sync Button */}
      <div className="mb-6">
        <button
          onClick={handleSyncPaperMasterQuizzes}
          disabled={syncing || !selectedSubject}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium flex items-center gap-2"
        >
          <Sync size={18} className={syncing ? 'animate-spin' : ''} />
          {syncing ? 'Syncing...' : 'Create/Sync Paper Master Quizzes'}
        </button>
      </div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map(quiz => (
          <div
            key={quiz.id}
            className={`rounded-lg border p-6 transition ${
              quiz.isActive
                ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                : 'bg-gray-50 dark:bg-gray-900 border-gray-300 dark:border-gray-600 opacity-60'
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {quiz.paper && `Paper ${quiz.paper.paperNumber}`}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{quiz.title}</p>
              </div>
              <button
                onClick={() => handleToggleActive(quiz)}
                className={`p-2 rounded-lg transition ${
                  quiz.isActive
                    ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}
              >
                <Toggle2 size={18} />
              </button>
            </div>

            {/* Stats */}
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
                  {quiz.promptCount || 0} questions
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {quiz.description}
            </p>

            {/* Calculator Badge */}
            {quiz.paper && (
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  quiz.paper.calculatorAllowedDefault
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                }`}>
                  {quiz.paper.calculatorAllowedDefault ? '🧮 Calculator Allowed' : '🚫 No Calculator'}
                </span>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => handleEditQuiz(quiz)}
                className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium text-sm flex items-center justify-center gap-1"
              >
                <Edit2 size={14} />
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {quizzes.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No paper master quizzes yet</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Click "Create/Sync Paper Master Quizzes" to get started</p>
        </div>
      )}

      {/* Edit Modal */}
      {editingQuiz && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Quiz</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editingQuiz.title}
                  onChange={(e) => setEditingQuiz({ ...editingQuiz, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={editingQuiz.description}
                  onChange={(e) => setEditingQuiz({ ...editingQuiz, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setEditingQuiz(null)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveQuiz}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
