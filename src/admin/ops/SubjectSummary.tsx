import { Subject, Unit, Topic, Prompt, Quiz } from '../../types';
import { CheckCircle, XCircle, AlertTriangle, Wrench, Target, RefreshCw } from 'lucide-react';

interface SubjectSummaryProps {
  subject: Subject;
  units: Unit[];
  topics: Topic[];
  prompts: Prompt[];
  quizzes: Quiz[];
  onCreateMissing: () => void;
  onFixAllCoverage: () => void;
  onBatchSetTargets: () => void;
}

export function SubjectSummary({
  subject,
  units,
  topics,
  prompts,
  quizzes,
  onCreateMissing,
  onFixAllCoverage,
  onBatchSetTargets,
}: SubjectSummaryProps) {
  const fullQuizExists = quizzes.some(q => q.scopeType === 'full');
  const unitQuizCount = quizzes.filter(q => q.scopeType === 'unit').length;
  const topicQuizCount = quizzes.filter(q => q.scopeType === 'topic').length;

  const ComplianceBadge = ({ exists, label }: { exists: boolean; label: string }) => (
    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      {exists ? (
        <CheckCircle size={16} className="text-green-500" />
      ) : (
        <XCircle size={16} className="text-red-500" />
      )}
      <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="text-3xl">{subject.icon}</div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{subject.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{subject.examBoard}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4">
            <div className="text-sm">
              <span className="font-semibold text-gray-900 dark:text-white">{prompts.length}</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">prompts</span>
            </div>
            <div className="text-sm">
              <span className="font-semibold text-gray-900 dark:text-white">{units.length}</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">units</span>
            </div>
            <div className="text-sm">
              <span className="font-semibold text-gray-900 dark:text-white">{topics.length}</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">topics</span>
            </div>
            <div className="text-sm">
              <span className="font-semibold text-gray-900 dark:text-white">{quizzes.length}</span>
              <span className="text-gray-600 dark:text-gray-400 ml-1">quizzes</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={onCreateMissing}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Wrench size={16} />
            <span>Create Missing</span>
          </button>
          <button
            onClick={onFixAllCoverage}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <RefreshCw size={16} />
            <span>Fix Coverage</span>
          </button>
          <button
            onClick={onBatchSetTargets}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Target size={16} />
            <span>Set Targets</span>
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Hierarchy Compliance
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <ComplianceBadge
            exists={fullQuizExists}
            label={`Full GCSE Quiz ${fullQuizExists ? 'exists' : 'missing'}`}
          />
          <ComplianceBadge
            exists={unitQuizCount === units.length}
            label={`Unit Quizzes: ${unitQuizCount}/${units.length}`}
          />
          <ComplianceBadge
            exists={topicQuizCount === topics.length}
            label={`Topic Quizzes: ${topicQuizCount}/${topics.length}`}
          />
        </div>
      </div>
    </div>
  );
}
