/**
 * Enhanced Prompts Page with Paper Assignment
 * 
 * Features:
 * - View and manage prompts
 * - Assign paper to individual prompts
 * - Bulk assign multiple prompts to a paper
 * - Filter by paper
 */

import { useEffect, useState } from 'react';
import { db, supabase } from '../db/client';
import { Prompt, Subject, Unit, Topic, Paper } from '../types';
import { FileText, Edit2, Trash2, Search, Filter, X, Plus, CheckSquare, Square } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { useConfirm } from '../contexts/ConfirmContext';
import { PaperSelector } from './components/PaperSelector';

export function PromptsPageEnhanced() {
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [loading, setLoading] = useState(true);
  const [prompts, setPrompts] = useState<Prompt[]>([]);;
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('');
  const [filterPaper, setFilterPaper] = useState<string>('');
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [selectedPrompts, setSelectedPrompts] = useState<Set<string>>(new Set());
  const [bulkPaperAssignment, setBulkPaperAssignment] = useState<string>('');
  const [bulkAssigning, setBulkAssigning] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [subjectsData, promptsData] = await Promise.all([
        db.getSubjects(),
        db.getAllPrompts(),
      ]);

      setSubjects(subjectsData);
      setPrompts(promptsData);

      const unitsPromises = subjectsData.map(s => db.getUnits(s.id));
      const topicsPromises = subjectsData.map(s => db.getTopics(s.id));
      const [unitsData, topicsData] = await Promise.all([
        Promise.all(unitsPromises),
        Promise.all(topicsPromises),
      ]);

      setUnits(unitsData.flat());
      setTopics(topicsData.flat());
    } catch (error) {
      console.error('Failed to load data:', error);
      showToast('error', 'Failed to load prompts');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadPapersForSubject = async (subjectId: string) => {
    try {
      const papersData = await db.listPapersBySubject(subjectId);
      setPapers(papersData);
    } catch (error) {
      console.error('Failed to load papers:', error);
      showToast('error', 'Failed to load papers');
    }
  };

  const handleEditPrompt = (prompt: Prompt) => {
    setEditingPrompt(prompt);
    handleLoadPapersForSubject(prompt.subjectId);
  };

  const handleSavePrompt = async () => {
    if (!editingPrompt) return;

    const filteredAnswers = editingPrompt.answers.filter(a => a.trim());
    if (filteredAnswers.length === 0) {
      showToast('error', 'At least one answer is required');
      return;
    }

    try {
      await db.updatePrompt(editingPrompt.id, {
        ...editingPrompt,
        answers: filteredAnswers,
      });
      showToast('success', 'Prompt updated successfully');
      setEditingPrompt(null);
      await loadData();
    } catch (error) {
      console.error('Failed to update prompt:', error);
      showToast('error', 'Failed to update prompt');
    }
  };

  const handleDeletePrompt = async (prompt: Prompt) => {
    if (!await confirm(`Delete prompt: "${prompt.question}"?`)) return;

    try {
      await db.deletePrompt(prompt.id);
      showToast('success', 'Prompt deleted successfully');
      await loadData();
    } catch (error) {
      console.error('Failed to delete prompt:', error);
      showToast('error', 'Failed to delete prompt');
    }
  };

  const handleAssignPaperToPrompt = async (prompt: Prompt, paperId: string | null) => {
    try {
      await db.updatePrompt(prompt.id, { paperId });
      showToast('success', 'Paper assignment updated');
      await loadData();
    } catch (error) {
      console.error('Failed to assign paper:', error);
      showToast('error', 'Failed to assign paper');
    }
  };

  const handleTogglePromptSelection = (promptId: string) => {
    const newSelected = new Set(selectedPrompts);
    if (newSelected.has(promptId)) {
      newSelected.delete(promptId);
    } else {
      newSelected.add(promptId);
    }
    setSelectedPrompts(newSelected);
  };

  const handleBulkAssignPaper = async () => {
    if (selectedPrompts.size === 0) {
      showToast('error', 'Please select at least one prompt');
      return;
    }

    if (!bulkPaperAssignment) {
      showToast('error', 'Please select a paper');
      return;
    }

    if (!await confirm(`Assign ${selectedPrompts.size} prompt${selectedPrompts.size !== 1 ? 's' : ''} to this paper?`)) return;

    try {
      setBulkAssigning(true);
      await db.assignPromptsToPaper(Array.from(selectedPrompts), bulkPaperAssignment);
      showToast('success', `Assigned ${selectedPrompts.size} prompt${selectedPrompts.size !== 1 ? 's' : ''} to paper`);
      setSelectedPrompts(new Set());
      setBulkPaperAssignment('');
      await loadData();
    } catch (error) {
      console.error('Failed to assign prompts:', error);
      showToast('error', 'Failed to assign prompts');
    } finally {
      setBulkAssigning(false);
    }
  };

  const filteredPrompts = prompts.filter(p => {
    const matchesSearch = p.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = !filterSubject || p.subjectId === filterSubject;
    const matchesType = !filterType || p.type === filterType;
    const matchesPaper = !filterPaper || p.paperId === filterPaper;
    return matchesSearch && matchesSubject && matchesType && matchesPaper;
  });

  if (loading) {
    return <div className="p-8 text-center">Loading prompts...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Prompts Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage prompts and assign papers</p>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Subject
          </label>
          <select
            value={filterSubject}
            onChange={(e) => {
              setFilterSubject(e.target.value);
              if (e.target.value) {
                handleLoadPapersForSubject(e.target.value);
              }
            }}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Subjects</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Type
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Types</option>
            <option value="short">Short Answer</option>
            <option value="mcq">Multiple Choice</option>
            <option value="fill">Fill in Blank</option>
            <option value="match">Match</option>
            <option value="label">Label</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Paper
          </label>
          <select
            value={filterPaper}
            onChange={(e) => setFilterPaper(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Papers</option>
            <option value="">Unassigned</option>
            {papers.map(p => (
              <option key={p.id} value={p.id}>Paper {p.paperNumber}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedPrompts.size > 0 && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
              {selectedPrompts.size} prompt{selectedPrompts.size !== 1 ? 's' : ''} selected
            </span>
            <div className="flex gap-2">
              <select
                value={bulkPaperAssignment}
                onChange={(e) => setBulkPaperAssignment(e.target.value)}
                className="px-4 py-2 border border-blue-300 dark:border-blue-700 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="">Select paper...</option>
                {papers.map(p => (
                  <option key={p.id} value={p.id}>Paper {p.paperNumber}</option>
                ))}
              </select>
              <button
                onClick={handleBulkAssignPaper}
                disabled={!bulkPaperAssignment || bulkAssigning}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium text-sm"
              >
                {bulkAssigning ? 'Assigning...' : 'Assign to Paper'}
              </button>
              <button
                onClick={() => setSelectedPrompts(new Set())}
                className="px-4 py-2 border border-blue-300 dark:border-blue-700 text-blue-900 dark:text-blue-300 rounded-lg font-medium text-sm hover:bg-blue-100 dark:hover:bg-blue-900/30"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prompts List */}
      <div className="space-y-3">
        {filteredPrompts.map(prompt => {
          const subject = subjects.find(s => s.id === prompt.subjectId);
          const unit = units.find(u => u.id === prompt.unitId);
          const topic = topics.find(t => t.id === prompt.topicId);
          const paper = papers.find(p => p.id === prompt.paperId);

          return (
            <div
              key={prompt.id}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-gray-300 dark:hover:border-gray-600 transition"
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => handleTogglePromptSelection(prompt.id)}
                  className="mt-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {selectedPrompts.has(prompt.id) ? (
                    <CheckSquare size={20} className="text-blue-600" />
                  ) : (
                    <Square size={20} />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white break-words">
                    {prompt.question.substring(0, 150)}
                    {prompt.question.length > 150 ? '...' : ''}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                      {prompt.type}
                    </span>
                    {subject && (
                      <span className="inline-block px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded">
                        {subject.name}
                      </span>
                    )}
                    {unit && (
                      <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded">
                        {unit.name}
                      </span>
                    )}
                    {topic && (
                      <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded">
                        {topic.name}
                      </span>
                    )}
                    {paper && (
                      <span className="inline-block px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs rounded font-medium">
                        Paper {paper.paperNumber}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleEditPrompt(prompt)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDeletePrompt(prompt)}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Paper Assignment for Individual Prompt */}
              <div className="mt-3 ml-10 pt-3 border-t border-gray-200 dark:border-gray-700">
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Assign to Paper
                </label>
                <select
                  value={prompt.paperId || ''}
                  onChange={(e) => handleAssignPaperToPrompt(prompt, e.target.value || null)}
                  className="w-full px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">None</option>
                  {papers.map(p => (
                    <option key={p.id} value={p.id}>Paper {p.paperNumber}: {p.name}</option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editingPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Prompt</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Question
                </label>
                <textarea
                  value={editingPrompt.question}
                  onChange={(e) => setEditingPrompt({ ...editingPrompt, question: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Answers
                </label>
                <div className="space-y-2">
                  {editingPrompt.answers.map((answer, idx) => (
                    <input
                      key={idx}
                      type="text"
                      value={answer}
                      onChange={(e) => {
                        const newAnswers = [...editingPrompt.answers];
                        newAnswers[idx] = e.target.value;
                        setEditingPrompt({ ...editingPrompt, answers: newAnswers });
                      }}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder={`Answer ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Paper Assignment
                </label>
                <select
                  value={editingPrompt.paperId || ''}
                  onChange={(e) => setEditingPrompt({ ...editingPrompt, paperId: e.target.value || undefined })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">None</option>
                  {papers.map(p => (
                    <option key={p.id} value={p.id}>Paper {p.paperNumber}: {p.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setEditingPrompt(null)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePrompt}
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
