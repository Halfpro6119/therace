import { Unit, Topic, Prompt, Quiz } from '../../types';
import { CheckCircle, XCircle } from 'lucide-react';

interface HierarchyMatrixProps {
  units: Unit[];
  topics: Topic[];
  prompts: Prompt[];
  quizzes: Quiz[];
  subjectPromptCount: number;
}

export function HierarchyMatrix({
  units,
  topics,
  prompts,
  quizzes,
  subjectPromptCount,
}: HierarchyMatrixProps) {
  const fullQuizExists = quizzes.some(q => q.scopeType === 'full');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Hierarchy Matrix</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                <div className="flex items-center justify-between">
                  <span>Full GCSE</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-normal text-gray-600 dark:text-gray-400">
                      {subjectPromptCount} prompts
                    </span>
                    {fullQuizExists ? (
                      <CheckCircle size={16} className="text-green-500" />
                    ) : (
                      <XCircle size={16} className="text-red-500" />
                    )}
                  </div>
                </div>
              </th>
              {units.map(unit => {
                const unitTopics = topics.filter(t => t.unitId === unit.id);
                return (
                  <th
                    key={unit.id}
                    colSpan={unitTopics.length || 1}
                    className="border border-gray-300 dark:border-gray-600 bg-blue-50 dark:bg-blue-900/20 px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white"
                  >
                    {unit.name}
                  </th>
                );
              })}
            </tr>
            <tr>
              <th className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 px-4 py-2 text-left text-xs font-medium text-gray-600 dark:text-gray-400">
                Unit Level
              </th>
              {units.map(unit => {
                const unitTopics = topics.filter(t => t.unitId === unit.id);
                const unitPrompts = prompts.filter(p => p.unitId === unit.id);
                const unitQuizExists = quizzes.some(q => q.unitId === unit.id && q.scopeType === 'unit');

                return (
                  <td
                    key={unit.id}
                    colSpan={unitTopics.length || 1}
                    className="border border-gray-300 dark:border-gray-600 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 text-center"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {unitPrompts.length} prompts
                      </span>
                      {unitQuizExists ? (
                        <CheckCircle size={14} className="text-green-500" />
                      ) : (
                        <XCircle size={14} className="text-red-500" />
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 px-4 py-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                Topics
              </td>
              {units.map(unit => {
                const unitTopics = topics.filter(t => t.unitId === unit.id);

                if (unitTopics.length === 0) {
                  return (
                    <td
                      key={unit.id}
                      className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-xs text-gray-500 dark:text-gray-400"
                    >
                      No topics
                    </td>
                  );
                }

                return unitTopics.map(topic => {
                  const topicPrompts = prompts.filter(p => p.topicId === topic.id);
                  const topicQuizExists = quizzes.some(q => q.topicId === topic.id && q.scopeType === 'topic');

                  return (
                    <td
                      key={topic.id}
                      className="border border-gray-300 dark:border-gray-600 px-4 py-3 text-center"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {topic.name}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {topicPrompts.length} prompts
                        </div>
                        {topicQuizExists ? (
                          <CheckCircle size={16} className="text-green-500" />
                        ) : (
                          <XCircle size={16} className="text-red-500" />
                        )}
                      </div>
                    </td>
                  );
                });
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <CheckCircle size={14} className="text-green-500" />
          <span>Quiz exists</span>
        </div>
        <div className="flex items-center gap-2">
          <XCircle size={14} className="text-red-500" />
          <span>Quiz missing</span>
        </div>
      </div>
    </div>
  );
}
