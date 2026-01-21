import { useEffect, useState } from 'react';
import { db } from '../db/client';
import { Topic, Subject, Unit, Paper } from '../types';
import { Tag, Edit2, Trash2, Search, X } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { useConfirm } from '../contexts/ConfirmContext';
import { PaperBulkAssignDialog } from './components/PaperBulkAssignDialog';
import { assignTopicPromptsToPaper } from './paperRelationshipService';

export function TopicsPage() {
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [loading, setLoading] = useState(true);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [bulkAssignTopic, setBulkAssignTopic] = useState<Topic | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState<string>('');
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const subjectsData = await db.getSubjects();
      setSubjects(subjectsData);

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
      showToast('error', 'Failed to load topics');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (topic: Topic) => {
    if (!await confirm(`Delete topic "${topic.name}"? This will also delete all prompts in this topic.`)) return;

    try {
      await db.deleteTopic(topic.id);
      showToast('success', 'Topic deleted successfully');
      await loadData();
    } catch (error) {
      console.error('Failed to delete topic:', error);
      showToast('error', 'Failed to delete topic');
    }
  };

  const handleSave = async () => {
    if (!editingTopic) return;

    try {
      await db.updateTopic(editingTopic.id, editingTopic);
      showToast('success', 'Topic updated successfully');
      setEditingTopic(null);
      await loadData();
    } catch (error) {
      console.error('Failed to update topic:', error);
      showToast('error', 'Failed to update topic');
    }
  };

  const filteredTopics = topics.filter(topic => {
    const matchesSearch = !searchQuery ||
      topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = !filterSubject || topic.subjectId === filterSubject;
    return matchesSearch && matchesSubject;
  });

  const getSubjectName = (id: string) => subjects.find(s => s.id === id)?.name || 'Unknown';
  const getUnitName = (id: string) => units.find(u => u.id === id)?.name || 'Unknown';

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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Topics</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage topics within units ({filteredTopics.length} total)
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
                placeholder="Search topics..."
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
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
              <tr className="text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Unit</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTopics.map(topic => (
                <tr key={topic.id} className="text-sm hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900 dark:text-white">{topic.name}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {getSubjectName(topic.subjectId)}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {getUnitName(topic.unitId)}
                  </td>
                  <td className="px-4 py-3 max-w-md">
                    <div className="truncate text-gray-700 dark:text-gray-300">
                      {topic.description || '-'}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {topic.orderIndex}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingTopic(topic)}
                        className="p-1.5 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => setBulkAssignTopic(topic)}
                        className="p-1.5 hover:bg-purple-100 dark:hover:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded transition-colors"
                        title="Assign prompts to paper"
                      >
                        <Tag size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(topic)}
                        className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTopics.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No topics found
          </div>
        )}
      </div>

      {editingTopic && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl">
            <div className="border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Topic</h2>
              <button
                onClick={() => setEditingTopic(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editingTopic.name}
                  onChange={(e) => setEditingTopic({ ...editingTopic, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={editingTopic.description || ''}
                  onChange={(e) => setEditingTopic({ ...editingTopic, description: e.target.value || undefined })}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Order Index
                </label>
                <input
                  type="number"
                  value={editingTopic.orderIndex}
                  onChange={(e) => setEditingTopic({ ...editingTopic, orderIndex: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingTopic(null)}
                  className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    

      <PaperBulkAssignDialog
        isOpen={bulkAssignTopic !== null}
        onClose={() => setBulkAssignTopic(null)}
        title={bulkAssignTopic ? `Assign Topic: ${bulkAssignTopic.name} to Paper` : 'Assign Topic to Paper'}
        description={bulkAssignTopic ? `This will assign prompts in the topic "${bulkAssignTopic.name}" to the selected paper.` : ''}
        papers={bulkAssignTopic ? papers.filter(p => p.subjectId === bulkAssignTopic.subjectId).sort((a,b) => a.paperNumber - b.paperNumber) : []}
        onAssign={async (paperId, _onlyUnassigned) => {
          if (!bulkAssignTopic) return 0;
          const count = await assignTopicPromptsToPaper(bulkAssignTopic.id, paperId);
          showToast('success', `Assigned ${count} prompts`);
          await loadData();
          return count;
        }}
      />

</div>
  );
}
