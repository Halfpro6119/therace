/**
 * Enhanced Units Page with Paper Assignment
 * 
 * Features:
 * - View and manage units
 * - Assign papers to units
 * - Bulk assign all prompts in a unit to a paper
 * - View linked papers
 */

import { useEffect, useState } from 'react';
import { db, supabase } from '../db/client';
import { Unit, Subject, Paper } from '../types';
import { Edit2, Trash2, Search, Plus, Link2, Unlink2, AlertCircle } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { useConfirm } from '../contexts/ConfirmContext';

interface UnitWithPapers extends Unit {
  linkedPapers?: Paper[];
}

export function UnitsPageEnhanced() {
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [loading, setLoading] = useState(true);
  const [units, setUnits] = useState<UnitWithPapers[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState<string>('');
  const [editingUnit, setEditingUnit] = useState<UnitWithPapers | null>(null);
  const [selectedPaperForBulk, setSelectedPaperForBulk] = useState<string>('');
  const [onlyUnassigned, setOnlyUnassigned] = useState(false);
  const [bulkAssigning, setBulkAssigning] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const subjectsData = await db.getSubjects();
      setSubjects(subjectsData);

      const unitsPromises = subjectsData.map(s => db.getUnits(s.id));
      const unitsData = await Promise.all(unitsPromises);
      
      const unitsWithPapers = await Promise.all(
        unitsData.flat().map(async (u) => {
          const linkedPapers = await db.getPapersForUnit(u.id);
          return {
            ...u,
            linkedPapers,
          };
        })
      );
      
      setUnits(unitsWithPapers);
    } catch (error) {
      console.error('Failed to load data:', error);
      showToast('error', 'Failed to load units');
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

  const handleEditUnit = (unit: UnitWithPapers) => {
    setEditingUnit(unit);
    handleLoadPapersForSubject(unit.subjectId);
  };

  const handleSaveUnit = async () => {
    if (!editingUnit) return;

    try {
      await db.updateUnit(editingUnit.id, {
        name: editingUnit.name,
        description: editingUnit.description,
      });
      showToast('success', 'Unit updated successfully');
      setEditingUnit(null);
      await loadData();
    } catch (error) {
      console.error('Failed to update unit:', error);
      showToast('error', 'Failed to update unit');
    }
  };

  const handleDeleteUnit = async (unit: Unit) => {
    if (!await confirm(`Delete unit: "${unit.name}"?`)) return;

    try {
      await db.deleteUnit(unit.id);
      showToast('success', 'Unit deleted successfully');
      await loadData();
    } catch (error) {
      console.error('Failed to delete unit:', error);
      showToast('error', 'Failed to delete unit');
    }
  };

  const handleBulkAssignToPaper = async (unit: UnitWithPapers) => {
    if (!selectedPaperForBulk) {
      showToast('error', 'Please select a paper');
      return;
    }

    const message = onlyUnassigned 
      ? `Assign all unassigned prompts in "${unit.name}" to this paper?`
      : `Assign all prompts in "${unit.name}" to this paper?`;

    if (!await confirm(message)) return;

    try {
      setBulkAssigning(true);
      const count = await db.assignUnitPromptsToPaper(unit.id, selectedPaperForBulk, onlyUnassigned);
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

  const handleLinkPaper = async (unit: UnitWithPapers, paperId: string) => {
    try {
      await db.linkUnitToPaper(unit.id, paperId);
      showToast('success', 'Paper linked to unit');
      await loadData();
    } catch (error) {
      console.error('Failed to link paper:', error);
      showToast('error', 'Failed to link paper');
    }
  };

  const handleUnlinkPaper = async (unit: UnitWithPapers, paperId: string) => {
    if (!await confirm('Unlink this paper from the unit?')) return;

    try {
      await db.unlinkUnitFromPaper(unit.id, paperId);
      showToast('success', 'Paper unlinked from unit');
      await loadData();
    } catch (error) {
      console.error('Failed to unlink paper:', error);
      showToast('error', 'Failed to unlink paper');
    }
  };

  const filteredUnits = units.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         u.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = !filterSubject || u.subjectId === filterSubject;
    return matchesSearch && matchesSubject;
  });

  if (loading) {
    return <div className="p-8 text-center">Loading units...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Units Management</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage units and assign papers</p>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search units..."
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
      </div>

      {/* Units List */}
      <div className="space-y-4">
        {filteredUnits.map(unit => (
          <div key={unit.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{unit.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{unit.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditUnit(unit)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-400"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDeleteUnit(unit)}
                  className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg text-red-600 dark:text-red-400"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            {/* Linked Papers */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Linked Papers ({unit.linkedPapers?.length || 0})
              </label>
              <div className="flex flex-wrap gap-2">
                {unit.linkedPapers && unit.linkedPapers.length > 0 ? (
                  unit.linkedPapers.map(paper => (
                    <div
                      key={paper.id}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-900 dark:text-green-300 rounded-full text-sm"
                    >
                      <span>Paper {paper.paperNumber}</span>
                      <button
                        onClick={() => handleUnlinkPaper(unit, paper.id)}
                        className="hover:text-green-600 dark:hover:text-green-200"
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
            <div className="space-y-2">
              <div className="flex gap-2">
                <select
                  value={selectedPaperForBulk}
                  onChange={(e) => setSelectedPaperForBulk(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                >
                  <option value="">Select paper to assign prompts...</option>
                  {papers.map(p => (
                    <option key={p.id} value={p.id}>
                      Paper {p.paperNumber}: {p.name}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleBulkAssignToPaper(unit)}
                  disabled={!selectedPaperForBulk || bulkAssigning}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium text-sm"
                >
                  {bulkAssigning ? 'Assigning...' : 'Assign'}
                </button>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={onlyUnassigned}
                  onChange={(e) => setOnlyUnassigned(e.target.checked)}
                  className="rounded"
                />
                <span className="text-gray-600 dark:text-gray-400">Only assign unassigned prompts</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingUnit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Edit Unit</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={editingUnit.name}
                  onChange={(e) => setEditingUnit({ ...editingUnit, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={editingUnit.description}
                  onChange={(e) => setEditingUnit({ ...editingUnit, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setEditingUnit(null)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUnit}
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
