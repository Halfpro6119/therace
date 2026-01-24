import { useEffect, useState } from 'react';
import { db, supabase } from '../db/client';
import { Prompt, Subject, Unit, Topic, Diagram, DiagramMetadata, Paper, TierLevel, TierFilter } from '../types';
import { FileText, Edit2, Trash2, Search, Filter, X, Plus } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { useConfirm } from '../contexts/ConfirmContext';
import { DiagramParamsEditor } from './DiagramParamsEditor';
import { PaperSelector } from './components/PaperSelector';
import { normalizeTier, getTierLabel, getTierBadge, getTierColor } from './tierNormalizer';
import { assignTierToPrompts } from './tierBulkAssignmentService';

/**
 * Enhanced PromptsPage with Tier System support
 * Allows per-prompt tier assignment (higher, foundation, or null)
 * Supports bulk tier assignment and filtering
 */
export function PromptsPageWithTier() {
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
  const [filterType, setFilterType] = useState<string>('');
  const [filterPaper, setFilterPaper] = useState<string>('');
  const [filterTier, setFilterTier] = useState<TierFilter>('all'); // NEW: Tier filter
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);
  const [selectedPrompts, setSelectedPrompts] = useState<Set<string>>(new Set()); // NEW: For bulk operations
  const [showBulkTierModal, setShowBulkTierModal] = useState(false); // NEW: Bulk tier assignment modal

  useEffect(() => {
    loadData();
  }, []);

  /**
   * Load all data from database
   */
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
      const papersPromises = subjectsData.map(s => db.listPapersBySubject(s.id));
      const [unitsData, topicsData, papersData] = await Promise.all([
        Promise.all(unitsPromises),
        Promise.all(topicsPromises),
        Promise.all(papersPromises),
      ]);

      setUnits(unitsData.flat());
      setTopics(topicsData.flat());
      setPapers(papersData.flat());
    } catch (error) {
      console.error('Failed to load data:', error);
      showToast('error', 'Failed to load prompts');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete a prompt
   */
  const handleDelete = async (prompt: Prompt) => {
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

  /**
   * Save prompt changes including tier
   */
  const handleSave = async () => {
    if (!editingPrompt) return;

    const filteredAnswers = editingPrompt.answers.filter(a => a.trim());
    if (filteredAnswers.length === 0) {
      showToast('error', 'At least one answer is required');
      return;
    }

    try {
      // Normalize tier before saving
      const normalizedTier = editingPrompt.tier ? normalizeTier(editingPrompt.tier) : null;
      
      await db.updatePrompt(editingPrompt.id, {
        ...editingPrompt,
        answers: filteredAnswers,
        tier: normalizedTier // NEW: Save tier
      });
      showToast('success', 'Prompt updated successfully');
      setEditingPrompt(null);
      await loadData();
    } catch (error) {
      console.error('Failed to save prompt:', error);
      showToast('error', 'Failed to save prompt');
    }
  };

  /**
   * Bulk assign tier to selected prompts
   */
  const handleBulkAssignTier = async (tier: TierLevel) => {
    if (selectedPrompts.size === 0) {
      showToast('error', 'No prompts selected');
      return;
    }

    try {
      const result = await assignTierToPrompts(Array.from(selectedPrompts), tier);
      if (result.success) {
        showToast('success', `Updated ${result.updatedCount} prompts with tier: ${getTierLabel(tier)}`);
        setSelectedPrompts(new Set());
        setShowBulkTierModal(false);
        await loadData();
      } else {
        showToast('error', `Failed to update prompts: ${result.errors.join(', ')}`);
      }
    } catch (error) {
      console.error('Failed to bulk assign tier:', error);
      showToast('error', 'Failed to bulk assign tier');
    }
  };

  /**
   * Filter prompts based on search, subject, type, paper, and tier
   */
  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.question.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = !filterSubject || prompt.subjectId === filterSubject;
    const matchesType = !filterType || prompt.type === filterType;
    const matchesPaper = !filterPaper || prompt.paperId === filterPaper;
    
    // NEW: Filter by tier
    let matchesTier = true;
    if (filterTier === 'higher') {
      matchesTier = prompt.tier === 'higher';
    } else if (filterTier === 'foundation') {
      matchesTier = prompt.tier === 'foundation';
    }
    // If filterTier === 'all', include all (null and explicit tiers)

    return matchesSearch && matchesSubject && matchesType && matchesPaper && matchesTier;
  });

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading prompts...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Prompts</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {filteredPrompts.length} of {prompts.length} prompts
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 space-y-4">
        <div className="flex gap-4 flex-wrap">
          {/* Search */}
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search prompts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Subject Filter */}
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

          {/* Type Filter */}
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

          {/* Paper Filter */}
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

          {/* NEW: Tier Filter */}
          <select
            value={filterTier}
            onChange={(e) => setFilterTier(e.target.value as TierFilter)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="all">All Tiers</option>
            <option value="higher">Higher Tier</option>
            <option value="foundation">Foundation Tier</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedPrompts.size > 0 && (
          <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <span className="text-sm font-medium text-blue-900 dark:text-blue-200">
              {selectedPrompts.size} prompt{selectedPrompts.size !== 1 ? 's' : ''} selected
            </span>
            <button
              onClick={() => setShowBulkTierModal(true)}
              className="ml-auto px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Set Tier...
            </button>
            <button
              onClick={() => setSelectedPrompts(new Set())}
              className="px-3 py-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-white rounded-lg text-sm font-medium transition-colors"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* Prompts List */}
      <div className="space-y-3">
        {filteredPrompts.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No prompts found
          </div>
        ) : (
          filteredPrompts.map(prompt => {
            const subject = subjects.find(s => s.id === prompt.subjectId);
            const paper = papers.find(p => p.id === prompt.paperId);
            
            return (
              <div
                key={prompt.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Checkbox for bulk selection */}
                  <input
                    type="checkbox"
                    checked={selectedPrompts.has(prompt.id)}
                    onChange={(e) => {
                      const newSelected = new Set(selectedPrompts);
                      if (e.target.checked) {
                        newSelected.add(prompt.id);
                      } else {
                        newSelected.delete(prompt.id);
                      }
                      setSelectedPrompts(newSelected);
                    }}
                    className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-2 focus:ring-blue-500 mt-1"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                        {subject?.name}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                        {prompt.type}
                      </span>
                      {paper && (
                        <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded">
                          Paper {paper.paperNumber}
                        </span>
                      )}
                      {/* NEW: Tier Badge */}
                      {prompt.tier && (
                        <span
                          className="text-xs px-2 py-1 rounded font-medium"
                          style={{
                            backgroundColor: getTierColor(prompt.tier) + '20',
                            color: getTierColor(prompt.tier)
                          }}
                        >
                          {getTierBadge(prompt.tier)}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-900 dark:text-white font-medium truncate">
                      {prompt.question}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingPrompt(prompt)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      title="Edit prompt"
                    >
                      <Edit2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(prompt)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                      title="Delete prompt"
                    >
                      <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Edit Modal */}
      {editingPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Prompt</h2>
              <button
                onClick={() => setEditingPrompt(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Question */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Question
                </label>
                <textarea
                  value={editingPrompt.question}
                  onChange={(e) => setEditingPrompt({ ...editingPrompt, question: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type
                </label>
                <select
                  value={editingPrompt.type}
                  onChange={(e) => setEditingPrompt({ ...editingPrompt, type: e.target.value as any })}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="short">Short Answer</option>
                  <option value="mcq">Multiple Choice</option>
                  <option value="fill">Fill in Blank</option>
                  <option value="match">Matching</option>
                  <option value="label">Labeling</option>
                </select>
              </div>

              {/* Paper */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Paper (optional)
                </label>
                <select
                  value={editingPrompt.paperId || ''}
                  onChange={(e) => setEditingPrompt({
                    ...editingPrompt,
                    paperId: e.target.value ? e.target.value : undefined
                  })}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">None</option>
                  {papers
                    .filter(p => p.subjectId === editingPrompt.subjectId)
                    .sort((a, b) => a.paperNumber - b.paperNumber)
                    .map((paper) => (
                      <option key={paper.id} value={paper.id}>
                        Paper {paper.paperNumber}: {paper.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* NEW: Tier Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tier (optional)
                </label>
                <select
                  value={editingPrompt.tier || ''}
                  onChange={(e) => setEditingPrompt({
                    ...editingPrompt,
                    tier: e.target.value ? (normalizeTier(e.target.value) as TierLevel) : null
                  })}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">All Tiers</option>
                  <option value="higher">Higher Tier</option>
                  <option value="foundation">Foundation Tier</option>
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Assign this prompt to a specific tier (Higher or Foundation) for GCSE difficulty segregation.
                </p>
              </div>
              {/* Marks */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Marks (optional)
                </label>
                <input
                  type="number"
                  min="1"
                  value={editingPrompt.marks || 1}
                  onChange={(e) => setEditingPrompt({ ...editingPrompt, marks: parseInt(e.target.value) || 1 })}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>


              {/* Answers */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Correct Answers
                </label>
                <div className="space-y-2">
                  {editingPrompt.answers.map((answer, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={answer}
                        onChange={(e) => {
                          const newAnswers = [...editingPrompt.answers];
                          newAnswers[index] = e.target.value;
                          setEditingPrompt({
                            ...editingPrompt,
                            answers: newAnswers
                          });
                        }}
                        className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder={`Answer ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newAnswers = editingPrompt.answers.filter((_, i) => i !== index);
                          setEditingPrompt({
                            ...editingPrompt,
                            answers: newAnswers.length > 0 ? newAnswers : ['']
                          });
                        }}
                        className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setEditingPrompt({
                        ...editingPrompt,
                        answers: [...editingPrompt.answers, '']
                      });
                    }}
                    className="w-full px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Answer
                  </button>
                </div>
              </div>

              {/* Hint */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hint (optional)
                </label>
                <textarea
                  value={editingPrompt.hint || ''}
                  onChange={(e) => setEditingPrompt({ ...editingPrompt, hint: e.target.value || undefined })}
                  rows={2}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Explanation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Explanation
                </label>
                <textarea
                  value={editingPrompt.explanation || ''}
                  onChange={(e) => setEditingPrompt({ ...editingPrompt, explanation: e.target.value || undefined })}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Save/Cancel */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingPrompt(null)}
                  className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Tier Assignment Modal */}
      {showBulkTierModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Set Tier for {selectedPrompts.size} Prompt{selectedPrompts.size !== 1 ? 's' : ''}
              </h2>
            </div>

            <div className="p-6 space-y-3">
              <button
                onClick={() => handleBulkAssignTier('higher')}
                className="w-full px-4 py-3 bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg font-medium transition-colors"
              >
                ⬆️ Higher Tier
              </button>
              <button
                onClick={() => handleBulkAssignTier('foundation')}
                className="w-full px-4 py-3 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg font-medium transition-colors"
              >
                ⬇️ Foundation Tier
              </button>
              <button
                onClick={() => handleBulkAssignTier(null)}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
              >
                ◆ Clear Tier (All Tiers)
              </button>
              <button
                onClick={() => setShowBulkTierModal(false)}
                className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
