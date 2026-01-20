/**
 * Enhanced Prompts Page with Paper Support
 * 
 * Features:
 * - Filter prompts by paper
 * - Assign prompts to papers
 * - View calculator settings per prompt
 * - Edit prompt paper assignment
 */

import { useEffect, useState } from 'react';
import { db, supabase } from '../db/client';
import { Prompt, Subject, Unit, Topic, Paper, Diagram } from '../types';
import { FileText, Edit2, Trash2, Search } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { useConfirm } from '../contexts/ConfirmContext';

export function PromptsPageEnhanced() {
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [loading, setLoading] = useState(true);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [units, setUnits] = useState<Unit[]>([])
  const [topics, setTopics] = useState<Topic[]>([]);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState<string>('');
  const [filterPaper, setFilterPaper] = useState<string>(''); // NEW: Filter by paper
  const [filterType, setFilterType] = useState<string>('');
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [editingPaperId, setEditingPaperId] = useState<string | null>(null); // NEW: Paper assignment

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (filterSubject) {
      loadPapersForSubject();
    }
  }, [filterSubject]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [subjectsData, promptsData, diagramsRes] = await Promise.all([
        db.getSubjects(),
        db.getAllPrompts(),
        supabase.from('diagrams').select('*').order('title')
      ]);

      setSubjects(subjectsData);
      setPrompts(promptsData);

      if (diagramsRes.data) {
        setDiagrams(diagramsRes.data.map(d => ({
          ...d,
          tags: d.tags || [],
          canvasData: d.canvas_data || { elements: [] },
          svgData: d.svg_data,
          pngUrl: d.png_url,
          subjectId: d.subject_id,
          diagramType: d.diagram_type,
          storageMode: d.storage_mode,
          createdAt: d.created_at,
          updatedAt: d.updated_at
        })));
      }

      const unitsPromises = subjectsData.map(s => db.getUnits(s.id));
      const topicsPromises = subjectsData.map(s => db.getTopics(s.id));
      const [unitsData, topicsData] = await Promise.all([
        Promise.all(unitsPromises),
        Promise.all(topicsPromises),
      ]);

      setUnits(unitsData.flat());
      setTopics(topicsData.flat());

      // Load papers for first subject if available
      if (subjectsData.length > 0) {
        setFilterSubject(subjectsData[0].id);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
      showToast('error', 'Failed to load prompts');
    } finally {
      setLoading(false);
    }
  };

  const loadPapersForSubject = async () => {
    if (!filterSubject) return;
    try {
      const data = await db.listPapersBySubject(filterSubject);
      setPapers(data);
    } catch (error) {
      console.error('Failed to load papers:', error);
    }
  };

  const handleDelete = async (prompt: Prompt) => {
    if (!await confirm({ title: 'Delete Prompt', message: `Delete prompt: "${prompt.question}"?` })) return;

    try {
      await db.deletePrompt(prompt.id);
      showToast('success', 'Prompt deleted successfully');
      await loadData();
    } catch (error) {
      console.error('Failed to delete prompt:', error);
      showToast('error', 'Failed to delete prompt');
    }
  };

  const handleSave = async () => {
    if (!editingPrompt) return;

    const filteredAnswers = editingPrompt.answers.filter(a => a.trim());
    if (filteredAnswers.length === 0) {
      showToast('error', 'At least one answer is required');
      return;
    }

    try {
      await db.updatePrompt(editingPrompt.id, {
        ...editingPrompt,
        answers: filteredAnswers
      });
      showToast('success', 'Prompt updated successfully');
      setEditingPrompt(null);
      await loadData();
    } catch (error) {
      console.error('Failed to update prompt:', error);
      showToast('error', 'Failed to update prompt');
    }
  };

  const handleAssignPaper = async (promptId: string, paperId: string | null) => {
    try {
      // Update prompt with paper_id
      const { error } = await supabase
        .from('prompts')
        .update({ paper_id: paperId })
        .eq('id', promptId);

      if (error) throw error;
      showToast('success', 'Paper assignment updated');
      setEditingPaperId(null);
      await loadData();
    } catch (error) {
      console.error('Failed to assign paper:', error);
      showToast('error', 'Failed to assign paper');
    }
  };

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = !searchQuery ||
      prompt.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.explanation?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = !filterSubject || prompt.subjectId === filterSubject;
    const matchesPaper = !filterPaper || prompt.paperId === filterPaper; // NEW: Filter by paper
    const matchesType = !filterType || prompt.type === filterType;
    return matchesSearch && matchesSubject && matchesPaper && matchesType;
  });

  const getSubjectName = (id: string) => subjects.find(s => s.id === id)?.name || 'Unknown';
  const getUnitName = (id: string) => units.find(u => u.id === id)?.name || 'Unknown';
  const getTopicName = (id: string) => topics.find(t => t.id === id)?.name || 'Unknown';
  const getPaperName = (id: string | undefined) => {
    if (!id) return 'Unassigned';
    const paper = papers.find(p => p.id === id);
    return paper ? `Paper ${paper.paperNumber}` : 'Unknown';
  };

  // Determine effective calculator allowed setting
  const getEffectiveCalculatorAllowed = (prompt: Prompt): boolean => {
    // If prompt has explicit override, use it
    if (prompt.calculatorAllowed !== undefined) {
      return prompt.calculatorAllowed;
    }
    // If prompt has paper assignment, use paper's default
    if (prompt.paperId) {
      const paper = papers.find(p => p.id === prompt.paperId);
      if (paper) {
        return paper.calculatorAllowedDefault;
      }
    }
    // Fallback to false (safe default)
    return false;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Prompts</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage quiz questions and prompts ({filteredPrompts.length} total)
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search prompts..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">All Subjects</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          {/* NEW: Paper Filter */}
          <select
            value={filterPaper}
            onChange={(e) => setFilterPaper(e.target.value)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">All Papers</option>
            {papers.map(p => (
              <option key={p.id} value={p.id}>Paper {p.paperNumber}</option>
            ))}
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">All Types</option>
            <option value="short">Short Answer</option>
            <option value="mcq">Multiple Choice</option>
            <option value="fill">Fill in Blank</option>
            <option value="match">Matching</option>
            <option value="label">Labeling</option>
          </select>
        </div>
      </div>

      {/* Prompts Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {filteredPrompts.length === 0 ? (
          <div className="p-8 text-center">
            <FileText size={32} className="mx-auto text-gray-400 mb-2" />
            <p className="text-gray-600 dark:text-gray-400">No prompts found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Question</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Subject</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Paper</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Calculator</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Type</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900 dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredPrompts.map(prompt => (
                  <tr key={prompt.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 max-w-xs truncate">
                      {prompt.question}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {getSubjectName(prompt.subjectId)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {editingPaperId === prompt.id ? (
                        <select
                          value={prompt.paperId || ''}
                          onChange={(e) => handleAssignPaper(prompt.id, e.target.value || null)}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white text-xs"
                        >
                          <option value="">Unassigned</option>
                          {papers.map(p => (
                            <option key={p.id} value={p.id}>Paper {p.paperNumber}</option>
                          ))}
                        </select>
                      ) : (
                        <span
                          onClick={() => setEditingPaperId(prompt.id)}
                          className="cursor-pointer px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-medium hover:bg-blue-200 dark:hover:bg-blue-800"
                        >
                          {getPaperName(prompt.paperId)}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        getEffectiveCalculatorAllowed(prompt)
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}>
                        {getEffectiveCalculatorAllowed(prompt) ? 'Allowed' : 'Not Allowed'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {prompt.type}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingPrompt(prompt)}
                          className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors text-gray-600 dark:text-gray-400"
                          title="Edit prompt"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(prompt)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors text-red-600 dark:text-red-400"
                          title="Delete prompt"
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
