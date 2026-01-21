import { useState, useEffect } from 'react';
import { db } from '../db/client';
import { createTopicQuizzes, createUnitQuizzes, createPaperQuizzes, createSinglePaperQuiz, createFullGCSEQuiz } from './quizBuilder';
import { seedDiagramTemplates } from './seedDiagramTemplates';
import { Wrench, Zap, Database, CheckCircle, Layout, BookOpen } from 'lucide-react';
import { Subject, Paper } from '../types';

export function ToolsPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('');
  const [papers, setPapers] = useState<Paper[]>([]);
  const [selectedPaperNumber, setSelectedPaperNumber] = useState<1 | 2 | 3>(1);



  const formatError = (err: any): string => {
    if (!err) return 'Unknown error';
    if (typeof err === 'string') return err;
    if (err instanceof Error) return err.message;
    if (typeof err.message === 'string') return err.message;
    try {
      return JSON.stringify(err);
    } catch {
      return String(err);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, []);

  const loadSubjects = async () => {
    try {
      const data = await db.getSubjects();
      setSubjects(data);
      if (data.length > 0) {
        setSelectedSubjectId(data[0].id);
      }
    } catch (error) {
      console.error('Failed to load subjects:', error);
    }
  };

  const loadPapersForSubject = async (subjectId: string) => {
    try {
      const data = await db.listPapersBySubject(subjectId);
      setPapers(data);
      // Prefer Paper 1 if present, otherwise first available
      const p1 = data.find(p => p.paperNumber === 1);
      if (p1) setSelectedPaperNumber(1);
      else if (data.length > 0) setSelectedPaperNumber(data[0].paperNumber);
    } catch (error) {
      console.error('Failed to load papers:', error);
      setPapers([]);
    }
  };

  useEffect(() => {
    if (selectedSubjectId) {
      loadPapersForSubject(selectedSubjectId);
    } else {
      setPapers([]);
    }
  }, [selectedSubjectId]);


  const handleBatchQuizCreation = async (type: 'topic' | 'unit' | 'paper' | 'full') => {
    if (!selectedSubjectId) {
      setResult('Error: Please select a subject');
      return;
    }

    setLoading(true);
    setResult('');

    try {
      let totalCreated = 0;

      if (type === 'topic') {
        const quizzes = await createTopicQuizzes(selectedSubjectId);
        totalCreated += quizzes.length;
      } else if (type === 'unit') {
        const quizzes = await createUnitQuizzes(selectedSubjectId);
        totalCreated += quizzes.length;
      } else if (type === 'paper') {
        const quizzes = await createPaperQuizzes(selectedSubjectId);
        totalCreated += quizzes.length;
      } else if (type === 'full') {
        await createFullGCSEQuiz(selectedSubjectId);
        totalCreated += 1;
      }

      const selectedSubject = subjects.find(s => s.id === selectedSubjectId);
      setResult(`Successfully created ${totalCreated} ${type} quiz${totalCreated !== 1 ? 'zes' : ''} for ${selectedSubject?.name}`);
    } catch (error) {
      console.error(error);
      setResult(`Error: ${formatError(error)}`);
    } finally {
      setLoading(false);
    }
  };



  const handleSinglePaperQuizCreation = async () => {
    if (!selectedSubjectId) {
      setResult('Error: Please select a subject');
      return;
    }

    const num = selectedPaperNumber;
    if (![1, 2, 3].includes(num)) {
      setResult('Error: Invalid paper number. Please select Paper 1, 2, or 3.');
      return;
    }

    setLoading(true);
    setResult('');

    try {
      const quiz = await createSinglePaperQuiz(selectedSubjectId, num as 1 | 2 | 3);
      const selectedSubject = subjects.find(s => s.id === selectedSubjectId);

      if (!quiz) {
        setResult(`Error: No prompts found for Paper ${num} in ${selectedSubject?.name}. Ensure prompts are assigned to that paper.`);
      } else {
        setResult(`Successfully created Paper ${num} quiz for ${selectedSubject?.name}`);
      }
    } catch (error) {
      console.error(error);
      setResult(`Error: ${formatError(error)}`);
    } finally {
      setLoading(false);
    }
  };


  const handleSeedDiagramTemplates = async () => {
    setLoading(true);
    setResult('');

    try {
      const result = await seedDiagramTemplates();
      if (result.success) {
        setResult(`Successfully seeded ${result.count} diagram templates`);
      } else {
        setResult(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error(error);
      setResult(`Error: ${formatError(error)}`);
    } finally {
      setLoading(false);
    }
  };

  const tools = [
    {
      id: 'topic-quizzes',
      title: 'Create Topic Quizzes',
      description: 'Generate a quiz for each topic with all its prompts',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      action: () => handleBatchQuizCreation('topic'),
    },
    {
      id: 'unit-quizzes',
      title: 'Create Unit Quizzes',
      description: 'Generate a quiz for each unit combining all topic prompts',
      icon: Database,
      color: 'from-green-500 to-emerald-500',
      action: () => handleBatchQuizCreation('unit'),
    },
    {
      id: 'paper-quizzes',
      title: 'Create Paper Quizzes',
      description: 'Generate a quiz for each paper (1, 2, 3) with all its prompts',
      icon: BookOpen,
      color: 'from-indigo-500 to-blue-500',
      action: () => handleBatchQuizCreation('paper'),
    },
    {
      id: 'full-quizzes',
      title: 'Create Full GCSE Quizzes',
      description: 'Generate one comprehensive quiz per subject with all prompts',
      icon: CheckCircle,
      color: 'from-purple-500 to-pink-500',
      action: () => handleBatchQuizCreation('full'),
    },
    {
      id: 'single-paper-quiz',
      title: 'Create Quiz for One Paper',
      description: 'Generate a quiz containing prompts from a single paper (choose 1, 2, or 3)',
      icon: BookOpen,
      color: 'from-indigo-500 to-blue-500',
      action: handleSinglePaperQuizCreation,
    },

    {
      id: 'seed-diagram-templates',
      title: 'Seed Diagram Templates',
      description: 'Load starter diagram templates for maths (circle theorems, parallel lines, graphs)',
      icon: Layout,
      color: 'from-orange-500 to-red-500',
      action: handleSeedDiagramTemplates,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Batch Tools</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Automated tools for batch operations
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Select Subject
        </label>
        <select
          value={selectedSubjectId}
          onChange={(e) => setSelectedSubjectId(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          {subjects.length === 0 ? (
            <option value="">No subjects available</option>
          ) : (
            subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name} ({subject.examBoard})
              </option>
            ))
          )}
        </select>
        {subjects.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Please create subjects first before using batch tools
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`bg-gradient-to-br ${tool.color} p-6 text-white`}>
                <Icon size={32} className="mb-3" />
                <h3 className="text-xl font-bold mb-2">{tool.title}</h3>
                <p className="text-white/90 text-sm">{tool.description}</p>
              </div>

              <div className="p-6">
                {tool.id === 'single-paper-quiz' && (
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Select Paper
                    </label>
                    <select
                      value={selectedPaperNumber}
                      onChange={(e) => setSelectedPaperNumber(parseInt(e.target.value, 10) as 1 | 2 | 3)}
                      disabled={loading || !selectedSubjectId || papers.length === 0}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      {papers.length === 0 ? (
                        <option value="1">No papers available</option>
                      ) : (
                        papers
                          .slice()
                          .sort((a, b) => a.paperNumber - b.paperNumber)
                          .map((p) => (
                            <option key={p.id} value={p.paperNumber}>
                              Paper {p.paperNumber} — {p.name}{p.calculatorAllowedDefault ? ' (Calculator)' : ' (Non-calculator)'}
                            </option>
                          ))
                      )}
                    </select>
                  </div>
                )}

                <button
                  onClick={tool.action}
                  disabled={loading || !selectedSubjectId}
                  className="w-full px-4 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-xl font-semibold transition-colors"
                >
                  {loading ? 'Processing...' : 'Run Tool'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {result && (
        <div className={`bg-white dark:bg-gray-800 rounded-2xl border p-6 ${
          result.startsWith('Error')
            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
            : 'border-green-500 bg-green-50 dark:bg-green-900/20'
        }`}>
          <h3 className={`text-lg font-bold mb-2 ${
            result.startsWith('Error') ? 'text-red-900 dark:text-red-400' : 'text-green-900 dark:text-green-400'
          }`}>
            {result.startsWith('Error') ? 'Error' : 'Success'}
          </h3>
          <p className={result.startsWith('Error') ? 'text-red-700 dark:text-red-300' : 'text-green-700 dark:text-green-300'}>
            {result}
          </p>
        </div>
      )}

      <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-start gap-4">
          <Wrench size={32} className="flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold mb-2">How Batch Tools Work</h3>
            <ul className="space-y-2 text-white/90">
              <li>• <strong>Topic Quizzes:</strong> Creates one quiz per topic (for the selected subject) with all prompts in that topic</li>
              <li>• <strong>Unit Quizzes:</strong> Creates one quiz per unit (for the selected subject) combining all prompts from all topics in that unit</li>
              <li>• <strong>Full GCSE Quiz:</strong> Creates one comprehensive quiz for the selected subject with ALL prompts</li>
              <li>• Time limits are auto-calculated: 30 seconds per prompt (15 for Grade 9 target)</li>
              <li>• These tools will skip topics/units with no prompts</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}