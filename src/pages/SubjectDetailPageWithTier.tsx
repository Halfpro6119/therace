import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../db/client';
import { Subject, Unit, Topic, Quiz, TierFilter } from '../types';
import { countTopicPromptsByTier } from '../admin/tierFilterService';
import { getTierLabel, getTierColor } from '../admin/tierNormalizer';
import { getGcseScopeForSubject, getTierOptionsForSubject } from '../config/gcseScope';
import { ChevronDown, ChevronUp, BookMarked, Play } from 'lucide-react';

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
  const [topicUnitQuizzes, setTopicUnitQuizzes] = useState<Quiz[]>([]);
  const [tierFilter, setTierFilter] = useState<TierFilter>('all');
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);
  const [expandedTopicUnitQuizzes, setExpandedTopicUnitQuizzes] = useState(false);
  const [tierDistributions, setTierDistributions] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [subjectId]);

  const loadData = async () => {
    if (!subjectId) return;

    try {
      setLoading(true);
      const [subjectData, unitsData, topicsData, quizzesData] = await Promise.all([
        db.getSubject(subjectId),
        db.getUnits(subjectId),
        db.getTopics(subjectId),
        db.getQuizzesBySubject(subjectId),
      ]);

      setSubject(subjectData ?? null);
      setUnits(unitsData);
      setTopics(topicsData);
      setTopicUnitQuizzes(
        quizzesData.filter(q => q.scopeType === 'topic' || q.scopeType === 'unit')
      );

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

  const getFilteredTopics = (unitId: string) => {
    const unitTopics = topics.filter(t => t.unitId === unitId);
    
    if (tierFilter === 'all') {
      return unitTopics;
    }

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

  const handleStartQuiz = async (topic: Topic) => {
    try {
      // Get existing quizzes for this topic
      let quizzes = await db.getQuizzesByTopic(topic.id);
      
      // If no quiz exists, create one on-the-fly
      if (quizzes.length === 0) {
        const prompts = await db.getPromptsByTopic(topic.id);
        
        if (prompts.length === 0) {
          alert('No questions available for this topic');
          return;
        }

        // Filter prompts by tier if tier filter is set
        let filteredPrompts = prompts;
        if (tierFilter === 'higher') {
          filteredPrompts = prompts.filter(p => p.tier === 'higher');
        } else if (tierFilter === 'foundation') {
          filteredPrompts = prompts.filter(p => p.tier === 'foundation');
        }

        if (filteredPrompts.length === 0) {
          alert(`No ${tierFilter === 'all' ? '' : tierFilter + ' '}questions available for this topic`);
          return;
        }

        // Calculate time limits (60 seconds per question default)
        const timeLimitSec = filteredPrompts.length * 60;
        const grade9TargetSec = filteredPrompts.length * 45;

        // Create quiz
        const quiz = await db.createQuiz({
          subjectId: topic.subjectId,
          scopeType: 'topic',
          topicId: topic.id,
          unitId: topic.unitId,
          title: `${topic.name} Quick Fire`,
          description: `Master ${topic.name} with rapid recall questions`,
          timeLimitSec,
          grade9TargetSec,
          promptIds: filteredPrompts.map(p => p.id),
        });

        quizzes = [quiz];
      }
      
      // Use the first quiz
      const quiz = quizzes[0];
      
      // Navigate to quiz player with tier filter as URL param
      navigate(`/quiz/${quiz.id}?tier=${tierFilter}`);
    } catch (error) {
      console.error('Failed to start quiz:', error);
      alert('Failed to start quiz');
    }
  };

  const handleStartTopicUnitQuiz = (quiz: Quiz) => {
    navigate(`/quiz/${quiz.id}?tier=${tierFilter}`);
  };

  if (loading) {
    return <div className="p-6 text-center" style={{ color: 'rgb(var(--text-secondary))' }}>Loading subject...</div>;
  }

  if (!subject) {
    return <div className="p-6 text-center" style={{ color: 'rgb(var(--text-secondary))' }}>Subject not found</div>;
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

      {/* Topic & Unit Quizzes (golden curriculum spec) */}
      {topicUnitQuizzes.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
          <button
            onClick={() => setExpandedTopicUnitQuizzes(!expandedTopicUnitQuizzes)}
            className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors rounded-xl"
          >
            {expandedTopicUnitQuizzes ? (
              <ChevronUp className="w-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <ChevronDown className="w-5 text-gray-600 dark:text-gray-400" />
            )}
            <BookMarked className="w-5 text-amber-500" />
            <div className="flex-1 text-left">
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Topic & Unit Quizzes
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {topicUnitQuizzes.length} curriculum-aligned quiz{topicUnitQuizzes.length !== 1 ? 'zes' : ''}
              </p>
            </div>
          </button>
          {expandedTopicUnitQuizzes && (
            <div className="p-4 pt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {topicUnitQuizzes.map(quiz => (
                <button
                  key={quiz.id}
                  onClick={() => handleStartTopicUnitQuiz(quiz)}
                  className="flex items-center justify-between gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg border border-gray-200 dark:border-gray-600 text-left transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {quiz.title}
                  </span>
                  <Play size={16} className="flex-shrink-0 text-amber-600 dark:text-amber-400" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tier Filter – only for subjects that have tiers in GCSE scope */}
      {(() => {
        const scope = getGcseScopeForSubject(subject.name);
        const tierOptions = scope ? getTierOptionsForSubject(scope) : [];
        if (tierOptions.length === 0) return null;
        const filterOptions: TierFilter[] = ['all', ...tierOptions];
        return (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Filter by Tier
            </label>
            <div className="flex gap-3">
              {filterOptions.map(tier => (
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
        );
      })()}

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
                  <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
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

                            {/* Tier Distribution */}
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
