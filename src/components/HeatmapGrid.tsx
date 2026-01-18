import { Topic, Quiz, MasteryLevel } from '../types';
import { storage } from '../utils/storage';
import { useNavigate } from 'react-router-dom';

interface HeatmapGridProps {
  topics: Topic[];
  quizzes: Quiz[];
}

const masteryColors: Record<MasteryLevel, string> = {
  0: 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600',
  1: 'bg-orange-300 dark:bg-orange-900 hover:bg-orange-400 dark:hover:bg-orange-800',
  2: 'bg-yellow-300 dark:bg-yellow-900 hover:bg-yellow-400 dark:hover:bg-yellow-800',
  3: 'bg-green-400 dark:bg-green-900 hover:bg-green-500 dark:hover:bg-green-800',
  4: 'bg-purple-400 dark:bg-purple-900 hover:bg-purple-500 dark:hover:bg-purple-800',
};

export function HeatmapGrid({ topics, quizzes }: HeatmapGridProps) {
  const navigate = useNavigate();

  const getTopicMastery = (topicId: string): MasteryLevel => {
    const topicQuizzes = quizzes.filter(q => q.topicId === topicId);
    if (topicQuizzes.length === 0) return 0;

    const levels = topicQuizzes.map(q => {
      const state = storage.getMasteryState(q.id);
      return state?.masteryLevel ?? 0;
    });

    const sum = levels.reduce((acc: number, l: number) => acc + l, 0);
    const avgLevel = sum / levels.length;
    return Math.round(avgLevel) as MasteryLevel;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {topics.map(topic => {
        const masteryLevel = getTopicMastery(topic.id);
        const colorClass = masteryColors[masteryLevel];

        return (
          <button
            key={topic.id}
            onClick={() => {
              const topicQuiz = quizzes.find(q => q.topicId === topic.id);
              if (topicQuiz) navigate(`/quiz/${topicQuiz.id}`);
            }}
            className={`group relative aspect-square rounded-xl ${colorClass} transition-all duration-200 p-4 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md`}
          >
            <span className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2">
              {topic.name}
            </span>
            <span className="text-xs text-gray-700 dark:text-gray-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Level {masteryLevel}
            </span>
          </button>
        );
      })}
    </div>
  );
}
