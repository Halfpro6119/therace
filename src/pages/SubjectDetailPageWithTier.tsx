import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../db/client';
import { Subject, Unit, Topic, TierFilter } from '../types';
import { countTopicPromptsByTier, countUnitPromptsByTier } from '../admin/tierFilterService';
import { getTierLabel, getTierColor, getTierBadge } from '../admin/tierNormalizer';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * Enhanced SubjectDetailPage with Tier System support
 * Allows users to filter topics/units by tier
 * Shows tier distribution for each topic/unit
 */
export function SubjectDetailPageWithTier() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const [subject, setSubject] = useState<Subject | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [tierFilter, setTierFilter] = useState<TierFilter>('all'); // NEW: Tier filter
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);
  const [tierDistributions, setTierDistributions] = useState<Record<string, any>>({}); // NEW: Tier distribution
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [subjectId]);

  /**
   * Load subject data
   */
  const loadData = async () => {
    if (!subjectId) return;

    try {
      setLoading(true);
      const [subjectData, unitsData, topicsData] = await Promise.all([
        db.getSubject(subjectId),
        db.getUnits(subjectId),
        db.getTopics(subjectId)
      ]);

      setSubject(subjectData);
      setUnits(unitsData);
      setTopics(topicsData);

      // NEW: Load tier distributions for all topics
      const distributions: Record<string, any> = {};
      for (const topic of topicsData) {
        distributions[topic.id] = await countTopicPromptsByTier(topic.id);
      }
      setTierDistributions(distributions);
    } catch (error) {
      console.error('Failed to load subject:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get or create quiz for a topic with tier filter
   */
  const handleStartQuiz = async (topic: Topic) => {
    try {
      // Get prompts for this topic with tier filter
      let prompts = await db.getPromptsByTopic(topic.id);
      
      // Apply tier filter
      if (tierFilter === 'higher') {
        prompts = prompts.filter(p => p.tier === 'higher');
      } else if (tierFilter === 'foundation') {
        prompts = prompts.filter(p => p.tier === 'foundation');
      }
      
      if (prompts.length === 0) {
        alert('No prompts available for this topic and tier combination');
        return;
      }
      
      // Create or get quiz for this topic
      const quiz = await db.getOrCreateTopicQuiz(topic.id, prompts);
      if (quiz) {
        navigate(`/quiz/${quiz.id}`);
      }
    } catch (error) {
      console.error('Failed to start quiz:', error);
      alert('Failed to start quiz');
    }
  };

  /**
   * Filter topics based on tier
   */
  const getFilteredTopics = (unitId: string) => {
    const unitTopics = topics.filter(t => t.unitId === unitId);
    
    if (tierFilter === 'all') {
      return unitTopics;
    }

    // Filter by tier distribution
    return unitTopics.filter(topic => {
      const dist = tierDistributions[topic.id];
      if (!dist) return false;
      
      if (tierFilter === 'higher') {
        return dist.higher > 0;
      } else if (tierFilter === 'foundation') {
        return dist.foundation > 0;
      }
      return true;
    });
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-500">Loading subject...</div>;
  }

  if (!subject) {
    return <div className="p-6 text-center text-gray-500">Subject not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {subject.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {subject.description}
        </p>
      </div>

      {/* NEW: Tier Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Filter by Tier
        </label>
        <div className="flex gap-3">
          {(['all', 'higher', 'foundation'] as TierFilter[]).map(tier => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                tierFilter === tier
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tier === 'all' ? 'All Tiers' : getTierLabel(tier === 'higher' ? 'higher' : 'foundation')}
            </button>
          ))}
        </div>
      </div>

      {/* Units and Topics */}
      <div className="space-y-4">
        {units.map(unit => {
          const unitTopics = getFilteredTopics(unit.id);
          if (unitTopics.length === 0) return null;

          const isExpanded = expandedUnit === unit.id;

          return (
            <div key={unit.id} className="space-y-3">
              {/* Unit Header */}
              <button
                onClick={() => setExpandedUnit(isExpanded ? null : unit.id)}
                className="w-full flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )}
                <div className="flex-1 text-left">
                  <h2 className="font-semibold text-gray-900 dark:text-white">
                    {unit.name}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {unitTopics.length} topic{unitTopics.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </button>

              {/* Topics List */}
              {isExpanded && (
                <div className="ml-4 space-y-3">
                  {unitTopics.map(topic => {
                    const distribution = tierDistributions[topic.id];

                    return (
                      <div
                        key={topic.id}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                              {topic.name}
                            </h3>

                            {/* NEW: Tier Distribution */}
                            {distribution && (
                              <div className="flex items-center gap-3 text-xs mb-3">
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

                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {topic.description}
                            </p>
                          </div>

                          {/* Quiz Button */}
                          <button 
                            onClick={() => handleStartQuiz(topic)}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
                          >
                            Start Quiz
                          </button>
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
    </div>
  );
}
