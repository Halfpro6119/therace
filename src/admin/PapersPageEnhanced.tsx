/**
 * Enhanced Papers Page with Relationship Management
 * 
 * Features:
 * - View all papers for a subject
 * - See prompts assigned to each paper
 * - See units and topics linked to each paper
 * - Bulk assign prompts to papers
 * - Link/unlink units and topics
 */

import { useEffect, useState } from 'react';
import { db, supabase } from '../db/client';
import { Paper, Subject, Unit, Topic, Prompt } from '../types';
import { Edit2, Trash2, Plus, Link2, Unlink2, AlertCircle, BookOpen } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { useConfirm } from '../contexts/ConfirmContext';

interface PaperWithRelations extends Paper {
  promptCount?: number;
  linkedUnits?: Unit[];
  linkedTopics?: Topic[];
  assignedPrompts?: Prompt[];
}

export function PapersPageEnhanced() {
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [loading, setLoading] = useState(true);
  const [papers, setPapers] = useState<PaperWithRelations[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [editingPaper, setEditingPaper] = useState<PaperWithRelations | null>(null);
  const [creatingPaper, setCreatingPaper] = useState<{ paperNumber: 1 | 2 | 3; name: string; calculatorAllowedDefault: boolean } | null>(null);
  const [expandedPaperId, setExpandedPaperId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const subjectsData = await db.getSubjects();
      setSubjects(subjectsData);

      if (subjectsData.length > 0) {
        setSelectedSubject(subjectsData[0].id);
      }

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
      showToast('error', 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const loadPapersForSubject = async (subjectId: string) => {
    try {
      const papersData = await db.listPapersBySubject(subjectId);
      
      const papersWithRelations = await Promise.all(
        papersData.map(async (p) => {
          const [promptCount, linkedUnits, linkedTopics, assignedPrompts] = await Promise.all([
            db.getQuestionCountForPaper(p.id),
            db.getUnitsByPaper(p.id),
            db.getTopicsByPaper(p.id),
            db.getPromptsByPaper(p.id),
          ]);

          return {
            ...p,
            promptCount,
            linkedUnits,
            linkedTopics,
            assignedPrompts,
          };
        })
      );

      setPapers(papersWithRelations);
    } catch (error) {
      console.error('Failed to load papers:', error);
      showToast('error', 'Failed to load papers');
    }
  };

  useEffect(() => {
    if (selectedSubject) {
      loadPapersForSubject(selectedSubject);
    }
  }, [selectedSubject]);

  const handleEditPaper = (paper: PaperWithRelations) => {
    setEditingPaper(paper);
  };

  const handleSavePaper = async () => {
    if (!editingPaper) return;

    try {
      await db.updatePaper(editingPaper.id, {
        name: editingPaper.name,
        calculatorAllowedDefault: editingPaper.calculatorAllowedDefault,
      });
      showToast('success', 'Paper updated successfully');
      setEditingPaper(null);
      if (selectedSubject) {
        await loadPapersForSubject(selectedSubject);
      }
    } catch (error) {
      console.error('Failed to update paper:', error);
      showToast('error', 'Failed to update paper');
    }
  };

  const handleCreatePaper = () => {
    setCreatingPaper({
      paperNumber: 1,
      name: '',
      calculatorAllowedDefault: false,
    });
  };

  const handleSaveNewPaper = async () => {
    if (!creatingPaper || !selectedSubject) return;
    if (!creatingPaper.name.trim()) {
      showToast('error', 'Paper name is required');
      return;
    }

    try {
      const existing = await db.getPaperByNumber(selectedSubject, creatingPaper.paperNumber);
      if (existing) {
        showToast('error', `Paper ${creatingPaper.paperNumber} already exists for this subject`);
        return;
      }

      await db.createPaper({
        subjectId: selectedSubject,
        paperNumber: creatingPaper.paperNumber,
        name: creatingPaper.name.trim(),
        calculatorAllowedDefault: creatingPaper.calculatorAllowedDefault,
      });
      showToast('success', 'Paper created successfully');
      setCreatingPaper(null);
      if (selectedSubject) {
        await loadPapersForSubject(selectedSubject);
      }
    } catch (error) {
      console.error('Failed to create paper:', error);
      showToast('error', 'Failed to create paper');
    }
  };

  const handleDeletePaper = async (paper: Paper) => {
    if (!await confirm({ title: 'Confirm', message: `Delete paper: "${paper.name}"?` })) return;

    try {
      await db.deletePaper(paper.id);
      showToast('success', 'Paper deleted successfully');
      if (selectedSubject) {
        await loadPapersForSubject(selectedSubject);
      }
    } catch (error) {
      console.error('Failed to delete paper:', error);
      showToast('error', 'Failed to delete paper');
    }
  };

  const handleUnlinkUnit = async (paper: PaperWithRelations, unit: Unit) => {
    if (!await confirm({ title: 'Confirm', message: `Unlink unit "${unit.name}" from this paper?` })) return;

    try {
      await db.unlinkUnitFromPaper(unit.id, paper.id);
      showToast('success', 'Unit unlinked from paper');
      if (selectedSubject) {
        await loadPapersForSubject(selectedSubject);
      }
    } catch (error) {
      console.error('Failed to unlink unit:', error);
      showToast('error', 'Failed to unlink unit');
    }
  };

  const handleUnlinkTopic = async (paper: PaperWithRelations, topic: Topic) => {
    if (!await confirm({ title: 'Confirm', message: `Unlink topic "${topic.name}" from this paper?` })) return;

    try {
      await db.unlinkTopicFromPaper(topic.id, paper.id);
      showToast('success', 'Topic unlinked from paper');
      if (selectedSubject) {
        await loadPapersForSubject(selectedSubject);
      }
    } catch (error) {
      console.error('Failed to unlink topic:', error);
      showToast('error', 'Failed to unlink topic');
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading papers...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Papers Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage papers and view relationships</p>
      </div>

      {/* Subject Selection + Add Paper */}
      <div className="mb-6 flex flex-wrap items-end gap-4">
        <div className="flex-1 min-w-0 md:min-w-[16rem]">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Subject
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Select a subject...</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
        {selectedSubject && (
          <button
            onClick={handleCreatePaper}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition"
          >
            <Plus size={18} />
            Add paper
          </button>
        )}
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {papers.map(paper => (
          <div
            key={paper.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-gray-300 dark:hover:border-gray-600 transition"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold">Paper {paper.paperNumber}</h3>
                  <p className="text-sm text-orange-100">{paper.name}</p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEditPaper(paper)}
                    className="p-2 hover:bg-orange-700 rounded-lg"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeletePaper(paper)}
                    className="p-2 hover:bg-red-600 rounded-lg"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-300">
                    {paper.promptCount || 0}
                  </div>
                  <div className="text-xs text-blue-700 dark:text-blue-400">Prompts</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                  <div className="text-2xl font-bold text-green-900 dark:text-green-300">
                    {(paper.linkedUnits?.length || 0) + (paper.linkedTopics?.length || 0)}
                  </div>
                  <div className="text-xs text-green-700 dark:text-green-400">Linked Items</div>
                </div>
              </div>

              {/* Calculator Info */}
              <div className="text-sm">
                <span className="text-gray-600 dark:text-gray-400">Calculator: </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {paper.calculatorAllowedDefault ? 'Allowed' : 'Not Allowed'}
                </span>
              </div>

              {/* Expand Button */}
              <button
                onClick={() => setExpandedPaperId(expandedPaperId === paper.id ? null : paper.id)}
                className="w-full px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
              >
                {expandedPaperId === paper.id ? 'Hide Details' : 'Show Details'}
              </button>

              {/* Expanded Details */}
              {expandedPaperId === paper.id && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                  {/* Linked Units */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Linked Units ({paper.linkedUnits?.length || 0})
                    </h4>
                    {paper.linkedUnits && paper.linkedUnits.length > 0 ? (
                      <div className="space-y-1">
                        {paper.linkedUnits.map(unit => (
                          <div
                            key={unit.id}
                            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm"
                          >
                            <span className="text-gray-900 dark:text-white">{unit.name}</span>
                            <button
                              onClick={() => handleUnlinkUnit(paper, unit)}
                              className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                            >
                              <Unlink2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 dark:text-gray-400">No units linked</p>
                    )}
                  </div>

                  {/* Linked Topics */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      Linked Topics ({paper.linkedTopics?.length || 0})
                    </h4>
                    {paper.linkedTopics && paper.linkedTopics.length > 0 ? (
                      <div className="space-y-1">
                        {paper.linkedTopics.map(topic => (
                          <div
                            key={topic.id}
                            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm"
                          >
                            <span className="text-gray-900 dark:text-white">{topic.name}</span>
                            <button
                              onClick={() => handleUnlinkTopic(paper, topic)}
                              className="text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                            >
                              <Unlink2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 dark:text-gray-400">No topics linked</p>
                    )}
                  </div>

                  {/* Sample Prompts */}
                  {paper.assignedPrompts && paper.assignedPrompts.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        Sample Prompts (showing first 3)
                      </h4>
                      <div className="space-y-1">
                        {paper.assignedPrompts.slice(0, 3).map(prompt => (
                          <div key={prompt.id} className="p-2 bg-gray-50 dark:bg-gray-700 rounded text-xs">
                            <p className="text-gray-900 dark:text-white truncate">
                              {prompt.question.substring(0, 60)}...
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {papers.length === 0 && (
        <div className="text-center py-12">
          <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-400">No papers found for this subject</p>
        </div>
      )}

      {/* Edit Modal */}
      {editingPaper && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Paper</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editingPaper.name}
                  onChange={(e) => setEditingPaper({ ...editingPaper, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editingPaper.calculatorAllowedDefault}
                  onChange={(e) => setEditingPaper({ ...editingPaper, calculatorAllowedDefault: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">Calculator allowed by default</span>
              </label>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setEditingPaper(null)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePaper}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Paper Modal */}
      {creatingPaper && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Add paper</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Paper number
                </label>
                <select
                  value={creatingPaper.paperNumber}
                  onChange={(e) => setCreatingPaper({ ...creatingPaper, paperNumber: parseInt(e.target.value) as 1 | 2 | 3 })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value={1}>Paper 1</option>
                  <option value={2}>Paper 2</option>
                  <option value={3}>Paper 3</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={creatingPaper.name}
                  onChange={(e) => setCreatingPaper({ ...creatingPaper, name: e.target.value })}
                  placeholder="e.g. Written Exam - Foundation Tier"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={creatingPaper.calculatorAllowedDefault}
                  onChange={(e) => setCreatingPaper({ ...creatingPaper, calculatorAllowedDefault: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">Calculator allowed by default</span>
              </label>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setCreatingPaper(null)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNewPaper}
                className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium"
              >
                Add paper
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
