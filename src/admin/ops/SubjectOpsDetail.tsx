import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../db/client';
import { Subject, Unit, Topic, Prompt, Quiz } from '../../types';
import {
  validateCoverage,
  getExpectedPromptsForQuiz,
  QuizRequirement,
  generateQuizTitle,
} from '../contentOpsUtils';
import { SubjectSummary } from './SubjectSummary';
import { HierarchyMatrix } from './HierarchyMatrix';
import { RequiredQuizzesChecklist } from './RequiredQuizzesChecklist';
import { CoverageAuditDrawer } from './CoverageAuditDrawer';
import { TargetTimeEditor } from './TargetTimeEditor';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';
import { useConfirm } from '../../contexts/ConfirmContext';

export function SubjectOpsDetail() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { confirm } = useConfirm();

  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState<Subject | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [showCoverageDrawer, setShowCoverageDrawer] = useState(false);
  const [showTargetEditor, setShowTargetEditor] = useState(false);

  useEffect(() => {
    if (subjectId) {
      loadData();
    }
  }, [subjectId]);

  const loadData = async () => {
    if (!subjectId) return;

    try {
      setLoading(true);
      const [subjectData, unitsData, topicsData, promptsData, quizzesData] = await Promise.all([
        db.getSubject(subjectId),
        db.getUnits(subjectId),
        db.getTopics(subjectId),
        db.getPromptsBySubject(subjectId),
        db.getQuizzesBySubject(subjectId),
      ]);

      setSubject(subjectData || null);
      setUnits(unitsData);
      setTopics(topicsData);
      setPrompts(promptsData);
      setQuizzes(quizzesData);
    } catch (error) {
      console.error('Failed to load subject data:', error);
      showToast('error', 'Failed to load subject data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateMissingQuizzes = async () => {
    if (!subject || !await confirm({ title: 'Confirm', message: 'Create missing quizzes for all topics, units, and full subject?' })) {
      return;
    }

    try {
      const created = { topic: 0, unit: 0, full: 0 };

      const fullQuizExists = quizzes.some(q => q.scopeType === 'full');
      if (!fullQuizExists) {
        const fullPromptIds = prompts.map(p => p.id);
        await db.createQuiz({
          subjectId: subject.id,
          scopeType: 'full',
          topicId: null,
          unitId: null,
          title: generateQuizTitle('full', subject.name),
          description: `Complete GCSE ${subject.name} coverage`,
          timeLimitSec: fullPromptIds.length * 20,
          grade9TargetSec: fullPromptIds.length * 15,
          promptIds: fullPromptIds,
        });
        created.full = 1;
      }

      for (const unit of units) {
        const unitQuizExists = quizzes.some(q => q.unitId === unit.id && q.scopeType === 'unit');
        if (!unitQuizExists) {
          const unitPrompts = prompts.filter(p => p.unitId === unit.id);
          await db.createQuiz({
            subjectId: subject.id,
            scopeType: 'unit',
            topicId: null,
            unitId: unit.id,
            title: generateQuizTitle('unit', unit.name),
            description: `Complete ${unit.name} unit coverage`,
            timeLimitSec: unitPrompts.length * 20,
            grade9TargetSec: unitPrompts.length * 15,
            promptIds: unitPrompts.map(p => p.id),
          });
          created.unit++;
        }
      }

      for (const topic of topics) {
        const topicQuizExists = quizzes.some(q => q.topicId === topic.id && q.scopeType === 'topic');
        if (!topicQuizExists) {
          const topicPrompts = prompts.filter(p => p.topicId === topic.id);
          await db.createQuiz({
            subjectId: subject.id,
            scopeType: 'topic',
            topicId: topic.id,
            unitId: topic.unitId,
            title: generateQuizTitle('topic', topic.name),
            description: `Complete ${topic.name} topic coverage`,
            timeLimitSec: topicPrompts.length * 20,
            grade9TargetSec: topicPrompts.length * 15,
            promptIds: topicPrompts.map(p => p.id),
          });
          created.topic++;
        }
      }

      showToast(
        `Created ${created.topic} topic, ${created.unit} unit, and ${created.full} full quiz(zes)`,
        'success'
      );
      await loadData();
    } catch (error) {
      console.error('Failed to create quizzes:', error);
      showToast('error', 'Failed to create quizzes');
    }
  };

  const handleFixAllCoverage = async () => {
    if (!subject || !await confirm({ title: 'Confirm', message: 'Sync all quiz coverage to match their scope hierarchy?' })) {
      return;
    }

    try {
      let fixed = 0;

      for (const quiz of quizzes) {
        const expectedIds = getExpectedPromptsForQuiz(quiz, prompts);
        const validation = validateCoverage(quiz, expectedIds, prompts);

        if (!validation.isValid) {
          await db.updateQuiz(quiz.id, { promptIds: expectedIds });
          fixed++;
        }
      }

      showToast(`Fixed coverage for ${fixed} quiz(zes)`, 'success');
      await loadData();
    } catch (error) {
      console.error('Failed to fix coverage:', error);
      showToast('error', 'Failed to fix coverage');
    }
  };

  const handleSyncQuizCoverage = async (quiz: Quiz) => {
    try {
      const expectedIds = getExpectedPromptsForQuiz(quiz, prompts);
      await db.updateQuiz(quiz.id, { promptIds: expectedIds });
      showToast('success', 'Coverage synced successfully');
      await loadData();
    } catch (error) {
      console.error('Failed to sync coverage:', error);
      showToast('error', 'Failed to sync coverage');
    }
  };

  const requirements: QuizRequirement[] = [
    {
      type: 'full',
      id: subject?.id || '',
      name: subject?.name || '',
      expectedPromptCount: prompts.length,
      quiz: quizzes.find(q => q.scopeType === 'full'),
    },
    ...units.map(unit => ({
      type: 'unit' as const,
      id: unit.id,
      name: unit.name,
      expectedPromptCount: prompts.filter(p => p.unitId === unit.id).length,
      quiz: quizzes.find(q => q.unitId === unit.id && q.scopeType === 'unit'),
    })),
    ...topics.map(topic => ({
      type: 'topic' as const,
      id: topic.id,
      name: topic.name,
      expectedPromptCount: prompts.filter(p => p.topicId === topic.id).length,
      quiz: quizzes.find(q => q.topicId === topic.id && q.scopeType === 'topic'),
    })),
  ];

  requirements.forEach(req => {
    if (req.quiz) {
      const expectedIds = getExpectedPromptsForQuiz(req.quiz, prompts);
      const validation = validateCoverage(req.quiz, expectedIds, prompts);
      req.coverageStatus = validation.isValid ? 'valid' : 'invalid';
    } else {
      req.coverageStatus = 'missing';
    }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400">Subject not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/admin/ops')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {subject.name} Operations
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Content coverage and target tuning control room
          </p>
        </div>
      </div>

      <SubjectSummary
        subject={subject}
        units={units}
        topics={topics}
        prompts={prompts}
        quizzes={quizzes}
        onCreateMissing={handleCreateMissingQuizzes}
        onFixAllCoverage={handleFixAllCoverage}
        onBatchSetTargets={() => setShowTargetEditor(true)}
      />

      <HierarchyMatrix
        units={units}
        topics={topics}
        prompts={prompts}
        quizzes={quizzes}
        subjectPromptCount={prompts.length}
      />

      <RequiredQuizzesChecklist
        requirements={requirements}
        prompts={prompts}
        onViewQuiz={(quiz) => {
          setSelectedQuiz(quiz);
          setShowCoverageDrawer(true);
        }}
        onSyncCoverage={handleSyncQuizCoverage}
        onEditTargets={(quiz) => {
          setSelectedQuiz(quiz);
          setShowTargetEditor(true);
        }}
        onCreateQuiz={handleCreateMissingQuizzes}
      />

      {showCoverageDrawer && selectedQuiz && (
        <CoverageAuditDrawer
          quiz={selectedQuiz}
          prompts={prompts}
          onClose={() => {
            setShowCoverageDrawer(false);
            setSelectedQuiz(null);
          }}
          onSync={async () => {
            if (selectedQuiz) {
              await handleSyncQuizCoverage(selectedQuiz);
              setShowCoverageDrawer(false);
              setSelectedQuiz(null);
            }
          }}
        />
      )}

      {showTargetEditor && (
        <TargetTimeEditor
          quiz={selectedQuiz}
          quizzes={selectedQuiz ? [selectedQuiz] : quizzes}
          onClose={() => {
            setShowTargetEditor(false);
            setSelectedQuiz(null);
          }}
          onSave={async () => {
            await loadData();
            setShowTargetEditor(false);
            setSelectedQuiz(null);
            showToast('success', 'Targets updated successfully');
          }}
        />
      )}
    </div>
  );
}
