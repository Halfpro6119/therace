/**
 * Enhanced Topics Page with Paper Assignment
 * 
 * Features:
 * - View and manage topics
 * - Assign papers to topics
 * - Bulk assign all prompts in a topic to a paper
 * - View linked papers
 */

import { useEffect, useState } from 'react';
import { db, supabase } from '../db/client';
import { Topic, Subject, Unit, Paper } from '../types';
import { Edit2, Trash2, Search, Plus, Link2, Unlink2, AlertCircle } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { useConfirm } from '../contexts/ConfirmContext';
import { PaperSelector } from './components/PaperSelector';

interface TopicWithPapers extends Topic {
  linkedPapers?: Paper[];
}

export function TopicsPageEnhanced() {
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState<TopicWithPapers[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState<string>('');
  const [filterUnit, setFilterUnit] = useState<string>('');
  const [editingTopic, setEditingTopic] = useState<TopicWithPapers | null>(null);
  const [selectedPaperForBulk, setSelectedPaperForBulk] = useState<string>('');
  const [bulkAssigning, setBulkAssigning] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [subjectsData, topicsData] = await Promise.all([
        db.getSubjects(),
        supabase.from('topics').select('*').order('order_index'),
      ]);

      setSubjects(subjectsData);

      if (topicsData.data) {
        const topicsWithPapers = await Promise.all(
          topicsData.data.map(async (t) => {
            const linkedPapers = await db.getPapersForTopic(t.id);
            return {
              id: t.id,
              subjectId: t.subject_id,
              unitId: t.unit_id,
              name: t.name,
              orderIndex: t.order_index,
              description: t.description,
              linkedPapers,
            };
          })
        );
        setTopics(topicsWithPapers);
      }

      const unitsPromises = subjectsData.map(s => db.getUnits(s.id));
      const unitsData = await Promise.all(unitsPromises);
      setUnits(unitsData.flat());
    } catch (error) {
      console.error('Failed to load data:', error);
      showToast('error', 'Failed to load topics');
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

  const handleEditTopic = (topic: TopicWithPapers) => {
    setEditingTopic(topic);
    handleLoadPapersForSubject(topic.subjectId);
  };

  const handleSaveTopic = async () => {
    if (!editingTopic) return;

    try {
      await db.updateTopic(editingTopic.id, {
        name: editingTopic.name,
        description: editingTopic.description,
      });
      showToast('success', 'Topic updated successfully');
      setEditingTopic(null);
      await loadData();
    } catch (error) {
      console.error('Failed to update topic:', error);
      showToast('error', 'Failed to update topic');
    }
  };

  const handleDeleteTopic = async (topic: Topic) => {
    if (!await confirm({ title: 'Confirm', message: `Delete topic: "${topic.name}"?` })) return;

    try {
      await db.deleteTopic(topic.id);
      showToast('success', 'Topic deleted successfully');
      await loadData();
    } catch (error) {
      console.error('Failed to delete topic:', error);
      showToast('error', 'Failed to delete topic');
    }
  };

  const handleBulkAssignToPaper = async (topic: TopicWithPapers) => {
    if (!selectedPaperForBulk) {
      showToast('error', 'Please select a paper');
      return;
    }

    if (!await confirm({ title: 'Confirm', message: `Assign all prompts in "${topic.name}" to this paper?` })) return;

    try {
      setBulkAssigning(true);
      const count = await db.assignTopicPromptsToPaper(topic.id, selectedPaperForBulk);
      showToast('success', `Assigned ${count} prompt${count !== 1 ? 's' : ''} to paper`);
      setSelectedPaperForBulk('');
      await loadData();
    } catch (error) {
      console.error('Failed to assign prompts:', error);
      showToast('error', 'Failed to assign prompts');
    } finally {
      setBulkAssigning(false);
    }
  };

  const handleLinkPaper = async (topic: TopicWithPapers, paperId: string) => {
    try {
      await db.linkTopicToPaper(topic.id, paperId);
      showToast('success', 'Paper linked to topic');
      await loadData();
    } catch (error) {
      console.error('Failed to link paper:', error);
      showToast('error', 'Failed to link paper');
    }
  };

  const handleUnlinkPaper = async (topic: TopicWithPapers, paperId: string) => {
    if (!await confirm({ title: 'Confirm', message: 'Unlink this paper from the topic?' })) return;

    try {
      await db.unlinkTopicFromPaper(topic.id, paperId);
      showToast('success', 'Paper unlinked from topic');
      await loadData();
    } catch (error) {
      console.error('Failed to unlink paper:', error);
      showToast('error', 'Failed to unlink paper');
    }
  };

  const filteredTopics = topics.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = !filterSubject || t.subjectId === filterSubject;
    const matchesUnit = !filterUnit || t.unitId === filterUnit;
    return matchesSearch && matchesSubject && matchesUnit;
  });

  if (loading) {
    return <div className="p-8 text-center">Loading topics...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Topics Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage topics and assign papers</p>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search topics..."
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
            onChange={(e) => setFilterSubject(e.target.value)}
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
            Unit
          </label>
          <select
            value={filterUnit}
            onChange={(e) => setFilterUnit(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Units</option>
            {units.map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        {filteredTopics.map(topic => (
          <div key={topic.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{topic.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{topic.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditTopic(topic)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDeleteTopic(topic)}
                  className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Linked Papers */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Linked Papers ({topic.linkedPapers?.length || 0})
              </label>
              <div className="flex flex-wrap gap-2">
                {topic.linkedPapers && topic.linkedPapers.length > 0 ? (
                  topic.linkedPapers.map(paper => (
                    <div
                      key={paper.id}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-300 rounded-full text-sm"
                    >
                      <span>Paper {paper.paperNumber}</span>
                      <button
                        onClick={() => handleUnlinkPaper(topic, paper.id)}
                        className="hover:text-blue-600 dark:hover:text-blue-200"
                      >
                        <Unlink2 size={14} />
                      </button>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-500 dark:text-gray-400 text-sm">No papers linked</span>
                )}
              </div>
            </div>

            {/* Bulk Assignment */}
            <div className="flex gap-2">
              <select
                value={selectedPaperForBulk}
                onChange={(e) => setSelectedPaperForBulk(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
              >
                <option value="">Select paper to assign all prompts...</option>
                {papers.map(p => (
                  <option key={p.id} value={p.id}>
                    Paper {p.paperNumber}: {p.name}
                  </option>
                ))}
              </select>
              <button
                onClick={() => handleBulkAssignToPaper(topic)}
                disabled={!selectedPaperForBulk || bulkAssigning}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium text-sm"
              >
                {bulkAssigning ? 'Assigning...' : 'Assign All'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingTopic && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Topic</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editingTopic.name}
                  onChange={(e) => setEditingTopic({ ...editingTopic, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={editingTopic.description}
                  onChange={(e) => setEditingTopic({ ...editingTopic, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setEditingTopic(null)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTopic}
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
