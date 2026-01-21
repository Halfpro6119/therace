import { useEffect, useState } from 'react';
import { db } from '../db/client';
import { Subject, Unit, Topic, TierLevel } from '../types';
import { Edit2, Trash2, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { useConfirm } from '../contexts/ConfirmContext';
import { assignTierToUnitPrompts, getUnitTierDistribution } from './tierBulkAssignmentService';
import { getTierLabel, getTierBadge, getTierColor } from './tierNormalizer';

/**
 * Enhanced UnitsPage with Tier System support
 * Allows bulk tier assignment to all prompts in a unit
 * Shows tier distribution for each unit
 */
export function UnitsPageWithTier() {
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [tierDistributions, setTierDistributions] = useState<Record<string, any>>({}); // NEW: Tier distribution
  const [showTierModal, setShowTierModal] = useState<string | null>(null); // NEW: Tier assignment modal
  const [onlyNullTiers, setOnlyNullTiers] = useState(false); // NEW: Only apply to unassigned prompts

  useEffect(() => {
    loadData();
  }, []);

  /**
   * Load all data from database
   */
  const loadData = async () => {
    try {
      setLoading(true);
      const [subjectsData, unitsData, topicsData] = await Promise.all([
        db.getSubjects(),
        db.getAllUnits(),
        db.getAllTopics()
      ]);

      setSubjects(subjectsData);
      setUnits(unitsData);
      setTopics(topicsData);

      // NEW: Load tier distributions for all units
      const distributions: Record<string, any> = {};
      for (const unit of unitsData) {
        distributions[unit.id] = await getUnitTierDistribution(unit.id);
      }
      setTierDistributions(distributions);
    } catch (error) {
      console.error('Failed to load data:', error);
      showToast('error', 'Failed to load units');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Delete a unit
   */
  const handleDelete = async (unit: Unit) => {
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

  /**
   * Save unit changes
   */
  const handleSave = async () => {
    if (!editingUnit) return;

    if (!editingUnit.name.trim()) {
      showToast('error', 'Unit name is required');
      return;
    }

    try {
      await db.updateUnit(editingUnit.id, editingUnit);
      showToast('success', 'Unit updated successfully');
      setEditingUnit(null);
      await loadData();
    } catch (error) {
      console.error('Failed to save unit:', error);
      showToast('error', 'Failed to save unit');
    }
  };

  /**
   * NEW: Bulk assign tier to all prompts in a unit
   */
  const handleBulkAssignTier = async (unitId: string, tier: TierLevel) => {
    try {
      const result = await assignTierToUnitPrompts(unitId, tier, onlyNullTiers);
      if (result.success) {
        showToast('success', `Updated ${result.updatedCount} prompts with tier: ${getTierLabel(tier)}`);
        setShowTierModal(null);
        setOnlyNullTiers(false);
        await loadData();
      } else {
        showToast('error', `Failed to update prompts: ${result.errors.join(', ')}`);
      }
    } catch (error) {
      console.error('Failed to bulk assign tier:', error);
      showToast('error', 'Failed to bulk assign tier');
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading units...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Units</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {units.length} units
        </div>
      </div>

      {/* Subjects and Units */}
      <div className="space-y-4">
        {subjects.map(subject => {
          const subjectUnits = units.filter(u => u.subjectId === subject.id);
          if (subjectUnits.length === 0) return null;

          const isExpanded = expandedSubject === subject.id;

          return (
            <div key={subject.id} className="space-y-3">
              {/* Subject Header */}
              <button
                onClick={() => setExpandedSubject(isExpanded ? null : subject.id)}
                className="w-full flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
                <div className="flex-1 text-left">
                  <h2 className="font-semibold text-gray-900 dark:text-white">
                    {subject.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {subjectUnits.length} unit{subjectUnits.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </button>

              {/* Units List */}
              {isExpanded && (
                <div className="ml-4 space-y-3">
                  {subjectUnits.map(unit => {
                    const distribution = tierDistributions[unit.id];
                    const unitTopics = topics.filter(t => t.unitId === unit.id);

                    return (
                      <div
                        key={unit.id}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                              {unit.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                              {unitTopics.length} topic{unitTopics.length !== 1 ? 's' : ''}
                            </p>

                            {/* NEW: Tier Distribution */}
                            {distribution && (
                              <div className="flex items-center gap-3 text-xs">
                                <span className="text-gray-600 dark:text-gray-400">
                                  {distribution.total} prompt{distribution.total !== 1 ? 's' : ''}:
                                </span>
                                {distribution.higher > 0 && (
                                  <span
                                    className="px-2 py-1 rounded font-medium"
                                    style={{
                                      backgroundColor: getTierColor('higher') + '20',
                                      color: getTierColor('higher')
                                    }}
                                  >
                                    {distribution.higher} Higher
                                  </span>
                                )}
                                {distribution.foundation > 0 && (
                                  <span
                                    className="px-2 py-1 rounded font-medium"
                                    style={{
                                      backgroundColor: getTierColor('foundation') + '20',
                                      color: getTierColor('foundation')
                                    }}
                                  >
                                    {distribution.foundation} Foundation
                                  </span>
                                )}
                                {distribution.unassigned > 0 && (
                                  <span className="px-2 py-1 rounded font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                    {distribution.unassigned} Unassigned
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="flex gap-2">
                            {/* NEW: Bulk Tier Assignment Button */}
                            <button
                              onClick={() => setShowTierModal(unit.id)}
                              className="px-3 py-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium transition-colors"
                              title="Assign tier to all prompts in this unit"
                            >
                              Set Tier
                            </button>

                            <button
                              onClick={() => setEditingUnit(unit)}
                              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                              title="Edit unit"
                            >
                              <Edit2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                            <button
                              onClick={() => handleDelete(unit)}
                              className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                              title="Delete unit"
                            >
                              <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editingUnit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Edit Unit</h2>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Unit Name
                </label>
                <input
                  type="text"
                  value={editingUnit.name}
                  onChange={(e) => setEditingUnit({ ...editingUnit, name: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={editingUnit.description}
                  onChange={(e) => setEditingUnit({ ...editingUnit, description: e.target.value })}
                  rows={3}
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
                  onClick={() => setEditingUnit(null)}
                  className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NEW: Bulk Tier Assignment Modal */}
      {showTierModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Assign Tier to Unit Prompts
              </h2>
            </div>

            <div className="p-6 space-y-4">
              {/* Toggle: Only apply to unassigned */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyNullTiers}
                  onChange={(e) => setOnlyNullTiers(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Only apply to prompts with tier not yet assigned
                </span>
              </label>

              {/* Tier Options */}
              <div className="space-y-3 pt-4">
                <button
                  onClick={() => handleBulkAssignTier(showTierModal, 'higher')}
                  className="w-full px-4 py-3 bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-lg font-medium transition-colors"
                >
                  ⬆️ Higher Tier
                </button>
                <button
                  onClick={() => handleBulkAssignTier(showTierModal, 'foundation')}
                  className="w-full px-4 py-3 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-lg font-medium transition-colors"
                >
                  ⬇️ Foundation Tier
                </button>
                <button
                  onClick={() => handleBulkAssignTier(showTierModal, null)}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
                >
                  ◆ Clear Tier (All Tiers)
                </button>
              </div>

              <button
                onClick={() => {
                  setShowTierModal(null);
                  setOnlyNullTiers(false);
                }}
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
