/**
 * Papers Management Page
 * 
 * Admin interface for managing GCSE papers (Paper 1, 2, 3) per subject
 * Features:
 * - List papers for a subject
 * - Create new papers
 * - Edit existing papers
 * - Delete papers
 * - View question count per paper
 * - Set calculator defaults per paper
 */

import { useEffect, useState } from 'react';
import { db } from '../db/client';
import { Paper, Subject } from '../types';
import { Plus, Edit2, Trash2, Save, X, AlertCircle } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { useConfirm } from '../contexts/ConfirmContext';

export function PapersPage() {
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  
  const [loading, setLoading] = useState(true);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [editingPaper, setEditingPaper] = useState<Paper | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [questionCounts, setQuestionCounts] = useState<Record<string, number>>({});
  const [formData, setFormData] = useState({
    paperNumber: 1 as 1 | 2 | 3,
    name: '',
    calculatorAllowedDefault: false,
  });

  useEffect(() => {
    loadSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      loadPapers();
    }
  }, [selectedSubject]);

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

  const loadPapers = async () => {
    if (!selectedSubject) return;
    
    try {
      setLoading(true);
      const data = await db.listPapersBySubject(selectedSubject);
      setPapers(data);

      // Load question counts for each paper
      const counts: Record<string, number> = {};
      for (const paper of data) {
        counts[paper.id] = await db.getQuestionCountForPaper(paper.id);
      }
      setQuestionCounts(counts);
    } catch (error) {
      console.error('Failed to load papers:', error);
      showToast('error', 'Failed to load papers');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setFormData({
      paperNumber: 1,
      name: '',
      calculatorAllowedDefault: false,
    });
    setEditingPaper(null);
    setIsCreating(true);
  };

  const handleEdit = (paper: Paper) => {
    setFormData({
      paperNumber: paper.paperNumber,
      name: paper.name,
      calculatorAllowedDefault: paper.calculatorAllowedDefault,
    });
    setEditingPaper(paper);
    setIsCreating(false);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      showToast('error', 'Paper name is required');
      return;
    }

    try {
      if (editingPaper) {
        // Update existing paper
        await db.updatePaper(editingPaper.id, {
          name: formData.name,
          calculatorAllowedDefault: formData.calculatorAllowedDefault,
        });
        showToast('success', 'Paper updated successfully');
      } else {
        // Create new paper
        // Check if paper number already exists
        const existing = await db.getPaperByNumber(selectedSubject, formData.paperNumber);
        if (existing) {
          showToast('error', 'Paper number already exists for this subject');
          return;
        }

        await db.upsertPaper(
          selectedSubject,
          formData.paperNumber,
          formData.name,
          formData.calculatorAllowedDefault
        );
        showToast('success', 'Paper created successfully');
      }

      setEditingPaper(null);
      setIsCreating(false);
      await loadPapers();
    } catch (error) {
      console.error('Failed to save paper:', error);
      showToast('error', 'Failed to save paper');
    }
  };

  const handleDelete = async (paper: Paper) => {
    if (!await confirm({ title: 'Delete Paper', message: `Delete Paper ${paper.paperNumber}: "${paper.name}"?` })) return;

    try {
      await db.deletePaper(paper.id);
      showToast('success', 'Paper deleted successfully');
      await loadPapers();
    } catch (error) {
      console.error('Failed to delete paper:', error);
      showToast('error', 'Failed to delete paper');
    }
  };

  const handleCancel = () => {
    setEditingPaper(null);
    setIsCreating(false);
  };

  if (loading && papers.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Papers Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage GCSE papers (Paper 1, 2, 3) and their settings
        </p>
      </div>

      {/* Subject Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select Subject
        </label>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          {subjects.map(subject => (
            <option key={subject.id} value={subject.id}>
              {subject.name}
            </option>
          ))}
        </select>
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingPaper) && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {editingPaper ? `Edit Paper ${editingPaper.paperNumber}` : 'Create New Paper'}
          </h2>

          <div className="space-y-4">
            {/* Paper Number */}
            {!editingPaper && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Paper Number
                </label>
                <select
                  value={formData.paperNumber}
                  onChange={(e) => setFormData({ ...formData, paperNumber: parseInt(e.target.value) as 1 | 2 | 3 })}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value={1}>Paper 1</option>
                  <option value={2}>Paper 2</option>
                  <option value={3}>Paper 3</option>
                </select>
              </div>
            )}

            {/* Paper Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Paper Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Written Exam - Foundation Tier"
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Calculator Allowed */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="calculator"
                checked={formData.calculatorAllowedDefault}
                onChange={(e) => setFormData({ ...formData, calculatorAllowedDefault: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
              />
              <label htmlFor="calculator" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Calculator Allowed by Default
              </label>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
              >
                <Save size={18} />
                Save Paper
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg font-medium transition-colors"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Papers List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Papers for {subjects.find(s => s.id === selectedSubject)?.name || 'Selected Subject'}
          </h2>
          {!isCreating && !editingPaper && (
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors"
            >
              <Plus size={18} />
              New Paper
            </button>
          )}
        </div>

        {papers.length === 0 ? (
          <div className="p-8 text-center">
            <AlertCircle size={32} className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600 dark:text-gray-400">No papers created yet for this subject</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Paper</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Calculator</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Questions</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Created</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {papers.map(paper => (
                  <tr key={paper.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                      Paper {paper.paperNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {paper.name}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        paper.calculatorAllowedDefault
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}>
                        {paper.calculatorAllowedDefault ? 'Allowed' : 'Not Allowed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {questionCounts[paper.id] || 0}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(paper.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(paper)}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors text-gray-600 dark:text-gray-400"
                          title="Edit paper"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(paper)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors text-red-600 dark:text-red-400"
                          title="Delete paper"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
