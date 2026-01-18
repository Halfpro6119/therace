import { Quiz, Prompt } from '../../types';
import { QuizRequirement } from '../contentOpsUtils';
import { CheckCircle, XCircle, AlertTriangle, Eye, RefreshCw, Target, Plus } from 'lucide-react';

interface RequiredQuizzesChecklistProps {
  requirements: QuizRequirement[];
  prompts: Prompt[];
  onViewQuiz: (quiz: Quiz) => void;
  onSyncCoverage: (quiz: Quiz) => void;
  onEditTargets: (quiz: Quiz) => void;
  onCreateQuiz: () => void;
}

export function RequiredQuizzesChecklist({
  requirements,
  prompts,
  onViewQuiz,
  onSyncCoverage,
  onEditTargets,
  onCreateQuiz,
}: RequiredQuizzesChecklistProps) {
  const fullReq = requirements.filter(r => r.type === 'full');
  const unitReqs = requirements.filter(r => r.type === 'unit');
  const topicReqs = requirements.filter(r => r.type === 'topic');

  const StatusBadge = ({ status }: { status: 'valid' | 'invalid' | 'missing' }) => {
    if (status === 'valid') {
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-xs font-medium">
          <CheckCircle size={14} />
          Valid
        </span>
      );
    }
    if (status === 'invalid') {
      return (
        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-lg text-xs font-medium">
          <AlertTriangle size={14} />
          Invalid
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1.5 px-2.5 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-xs font-medium">
        <XCircle size={14} />
        Missing
      </span>
    );
  };

  const QuizRow = ({ req }: { req: QuizRequirement }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h4 className="font-medium text-gray-900 dark:text-white">{req.name}</h4>
          <StatusBadge status={req.coverageStatus || 'missing'} />
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {req.quiz ? (
            <>
              Expected: {req.expectedPromptCount} | Actual: {req.quiz.promptIds.length}
              {req.quiz.grade9TargetSec > 0 ? (
                <span className="ml-3">Target: {req.quiz.grade9TargetSec}s</span>
              ) : (
                <span className="ml-3 text-yellow-600 dark:text-yellow-400">No target set</span>
              )}
            </>
          ) : (
            <>Expected: {req.expectedPromptCount} prompts</>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {req.quiz ? (
          <>
            <button
              onClick={() => onViewQuiz(req.quiz!)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-medium transition-colors"
            >
              <Eye size={14} />
              View
            </button>
            {req.coverageStatus === 'invalid' && (
              <button
                onClick={() => onSyncCoverage(req.quiz!)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-medium transition-colors"
              >
                <RefreshCw size={14} />
                Sync
              </button>
            )}
            <button
              onClick={() => onEditTargets(req.quiz!)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-medium transition-colors"
            >
              <Target size={14} />
              Targets
            </button>
          </>
        ) : (
          <button
            onClick={onCreateQuiz}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-medium transition-colors"
          >
            <Plus size={14} />
            Create
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Required Quizzes</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Full GCSE Quiz
          </h3>
          <div className="space-y-2">
            {fullReq.map(req => (
              <QuizRow key={req.id} req={req} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Unit Quizzes ({unitReqs.filter(r => r.quiz).length}/{unitReqs.length})
          </h3>
          <div className="space-y-2">
            {unitReqs.map(req => (
              <QuizRow key={req.id} req={req} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Topic Quizzes ({topicReqs.filter(r => r.quiz).length}/{topicReqs.length})
          </h3>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {topicReqs.map(req => (
              <QuizRow key={req.id} req={req} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
