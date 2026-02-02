/**
 * Paper Quiz Builder Page
 * 
 * Tools section for creating and managing quizzes per paper
 * Features:
 * - Create quiz for specific paper with all related prompts
 * - View all paper quizzes
 * - Edit quiz settings
 * - Preview prompts that will be included
 * - Bulk create quizzes for all papers in a subject
 */

import { useEffect, useState } from 'react';
import { db, supabase } from '../db/client';
import { Subject, Paper, Quiz, Prompt } from '../types';
import { Plus, Sync, Edit2, Trash2, Eye, BookOpen, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { useConfirm } from '../contexts/ConfirmContext';

interface PaperQuizWithStats extends Quiz {
  promptCount?: number;
  paper?: Paper;
  prompts?: Prompt[];
}

export function PaperQuizBuilderPage() {
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [papers, setPapers] = useState<Paper[]>([]);
  const [quizzes, setQuizzes] = useState<PaperQuizWithStats[]>([]);
  const [creating, setCreating] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<PaperQuizWithStats | null>(null);
  const [previewingQuiz, setPreviewingQuiz] = useState<PaperQuizWithStats | null>(null);

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
      
      // Get prompt counts and details for each quiz
      const quizzesWithStats = await Promise.all(
        quizzesData.map(async (quiz) => {
          const prompts = await db.getPromptsForPaperMasterQuiz(quiz.paperId!);
          const paper = papersData.find(p => p.id === quiz.paperId);
          return {
            ...quiz,
            promptCount: prompts.length,
            paper,
            prompts,
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

  const handleCreateQuizForPaper = async (paper: Paper) => {
    try {
      setCreating(true);
      const title = `Paper ${paper.paperNumber} Master Quiz`;
      const description = `All questions from ${paper.name}`;
      
      await db.upsertPaperMasterQuiz(
        selectedSubject,
        paper.id,
        title,
        description,
        {
          paperNumber: paper.paperNumber,
          calculatorAllowed: paper.calculatorAllowedDefault,
        }
      );
      
      showToast('success', `Quiz created for Paper ${paper.paperNumber}`);
      await loadData();
    } catch (error) {
      console.error('Failed to create quiz:', error);
      showToast('error', 'Failed to create quiz');
    } finally {
      setCreating(false);
    }
  };

  const handleSyncAllPapers = async () => {
    if (!await confirm({ title: 'Confirm', message: 'Create/sync quizzes for all papers in this subject?' })) return;

    try {
      setSyncing(true);
      const count = await db.syncPaperMasterQuizzesForSubject(selectedSubject);
      showToast('success', `Synced ${count} paper quiz${count !== 1 ? 'zes' : ''}`);
      await loadData();
    } catch (error) {
      console.error('Failed to sync quizzes:', error);
      showToast('error', 'Failed to sync quizzes');
    } finally {
      setSyncing(false);
    }
  };

  const handleDeleteQuiz = async (quiz: PaperQuizWithStats) => {
    if (!await confirm({ title: 'Confirm', message: `Delete quiz: "${quiz.title}"?` })) return;

    try {
      const { error } = await supabase
        .from('quizzes')
        .delete()
        .eq('id', quiz.id);

      if (error) throw error;
      showToast('success', 'Quiz deleted successfully');
      await loadData();
    } catch (error) {
      console.error('Failed to delete quiz:', error);
      showToast('error', 'Failed to delete quiz');
    }
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

  const papersWithoutQuizzes = papers.filter(
    p => !quizzes.find(q => q.paperId === p.id)
  );

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Paper Quiz Builder</h1>
        <p className="text-gray-600 dark:text-gray-400">Create and manage quizzes for each paper</p>
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

      {/* Action Buttons */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={handleSyncAllPapers}
          disabled={syncing || !selectedSubject}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium flex items-center gap-2"
        >
          <Sync size={18} className={syncing ? 'animate-spin' : ''} />
          {syncing ? 'Syncing...' : 'Sync All Papers'}
        </button>
      </div>

      {/* Existing Quizzes */}
      {quizzes.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Existing Paper Quizzes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map(quiz => (
              <div
                key={quiz.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {quiz.paper && `Paper ${quiz.paper.paperNumber}`}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{quiz.title}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setPreviewingQuiz(quiz)}
                      className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded-lg text-blue-600 dark:text-blue-400"
                      title="Preview prompts"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => setEditingQuiz(quiz)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteQuiz(quiz)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
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
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    quiz.paper.calculatorAllowedDefault
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                  }`}>
                    {quiz.paper.calculatorAllowedDefault ? '🧮 Calculator Allowed' : '🚫 No Calculator'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Quizzes for Missing Papers */}
      {papersWithoutQuizzes.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Create Quizzes for Papers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {papersWithoutQuizzes.map(paper => (
              <div
                key={paper.id}
                className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Paper {paper.paperNumber}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{paper.name}</p>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  No quiz created yet. Click below to create a quiz with all prompts for this paper.
                </p>

                <button
                  onClick={() => handleCreateQuizForPaper(paper)}
                  disabled={creating}
                  className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium flex items-center justify-center gap-2"
                >
                  <Plus size={18} />
                  {creating ? 'Creating...' : 'Create Quiz'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {quizzes.length === 0 && papersWithoutQuizzes.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No papers found for this subject</p>
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

      {/* Preview Modal */}
      {previewingQuiz && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {previewingQuiz.title} - Prompts Preview
              </h2>
              <button
                onClick={() => setPreviewingQuiz(null)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                Total: {previewingQuiz.prompts?.length || 0} prompts
              </p>
            </div>

            <div className="space-y-3">
              {previewingQuiz.prompts && previewingQuiz.prompts.length > 0 ? (
                previewingQuiz.prompts.map((prompt, idx) => (
                  <div key={prompt.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-bold text-gray-500 dark:text-gray-400 mt-1">
                        {idx + 1}.
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {prompt.question.substring(0, 100)}
                          {prompt.question.length > 100 ? '...' : ''}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <span className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded">
                            {prompt.type}
                          </span>
                          <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded">
                            {prompt.answers.length} answers
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-center py-4">No prompts found</p>
              )}
            </div>

            <button
              onClick={() => setPreviewingQuiz(null)}
              className="w-full mt-6 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
