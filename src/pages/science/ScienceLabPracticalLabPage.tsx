import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, FlaskConical, AlertTriangle, Wrench, ClipboardCheck, Sparkles, XCircle, RotateCcw, Award } from 'lucide-react';
import { getPracticalsByFilters, getPracticalQuizQuestions } from '../../config/scienceLabData';
import type { ScienceSubject, SciencePaper, ScienceTier, PracticalQuizQuestion, SciencePractical } from '../../types/scienceLab';

type TabStep = 'overview' | 'setup' | 'method' | 'risks' | 'data' | 'evaluation' | 'test' | 'describe';
type TestPhase = 'intro' | 'active' | 'results';

/** Fisher–Yates shuffle */
function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function ScienceLabPracticalLabPage() {
  const navigate = useNavigate();
  const { subject, paper, tier } = useParams<{ subject: string; paper: string; tier: string }>();
  const [selectedPracticalId, setSelectedPracticalId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<TabStep>('overview');

  const subjectId = subject?.toLowerCase() as ScienceSubject | undefined;
  if (!subjectId || !['biology', 'chemistry', 'physics'].includes(subject.toLowerCase())) {
    return <div>Invalid subject</div>;
  }

  const normalizedSubject: ScienceSubject = subjectId.charAt(0).toUpperCase() + subjectId.slice(1) as ScienceSubject;
  const paperNum = paper ? (parseInt(paper, 10) as SciencePaper) || 1 : 1;
  const tierValue = tier ? (tier.charAt(0).toUpperCase() + tier.slice(1) as ScienceTier) : 'Higher';
  const base = `/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}`;
  const practicals = getPracticalsByFilters(normalizedSubject, paperNum, tierValue);
  const selectedPractical = practicals.find(p => p.id === selectedPracticalId);
  const quizQuestions = selectedPracticalId ? getPracticalQuizQuestions(selectedPracticalId) : [];

  // --- Real test state ---
  const [testPhase, setTestPhase] = useState<TestPhase>('intro');
  const [testQuestions, setTestQuestions] = useState<PracticalQuizQuestion[]>([]);
  const [testAnswers, setTestAnswers] = useState<Record<string, string | string[]>>({});
  const [testQuestionIndex, setTestQuestionIndex] = useState(0);
  const [testResults, setTestResults] = useState<Array<{
    question: PracticalQuizQuestion;
    correct: boolean;
    userAnswer: string | string[];
    feedback: string;
    marksAwarded?: number;
    marksOutOf?: number;
  }>>([]);

  const currentTestQuestion = testQuestions[testQuestionIndex];
  const currentUserAnswer = currentTestQuestion ? testAnswers[currentTestQuestion.id] : undefined;

  const handleBack = () => {
    navigate(base);
  };

  const startTest = () => {
    const shuffled = shuffle(quizQuestions);
    setTestQuestions(shuffled);
    const initial: Record<string, string | string[]> = {};
    shuffled.forEach(q => {
      if (q.type === 'dragOrder' && q.options?.length) {
        initial[q.id] = shuffle(q.options);
      }
    });
    setTestAnswers(initial);
    setTestQuestionIndex(0);
    setTestPhase('active');
  };

  const setAnswerForCurrent = (value: string | string[]) => {
    if (!currentTestQuestion) return;
    setTestAnswers(prev => ({ ...prev, [currentTestQuestion.id]: value }));
  };

  const goToPrevQuestion = () => {
    if (testQuestionIndex > 0) setTestQuestionIndex(i => i - 1);
  };

  const goToNextQuestion = () => {
    if (testQuestionIndex < testQuestions.length - 1) setTestQuestionIndex(i => i + 1);
  };

  const submitTest = () => {
    const results: Array<{
      question: PracticalQuizQuestion;
      correct: boolean;
      userAnswer: string | string[];
      feedback: string;
      marksAwarded?: number;
      marksOutOf?: number;
    }> = [];
    testQuestions.forEach(q => {
      const userAnswer = testAnswers[q.id];
      const correctOrder = Array.isArray(q.correctAnswer) ? q.correctAnswer : [q.correctAnswer];
      const correctStr = Array.isArray(q.correctAnswer) ? q.correctAnswer[0] : q.correctAnswer;
      const marksOutOf = q.marks ?? 1;
      let correct = false;
      let marksAwarded: number | undefined;
      if (q.type === 'multiSelect') {
        const correctSet = new Set(correctOrder as string[]);
        const userArr = Array.isArray(userAnswer) ? userAnswer : [];
        marksAwarded = userArr.filter((a: string) => correctSet.has(a)).length;
        marksAwarded = Math.min(marksAwarded, marksOutOf);
        correct = marksAwarded === marksOutOf;
      } else if (q.type === 'dragOrder') {
        correct = JSON.stringify(userAnswer ?? []) === JSON.stringify(correctOrder);
      } else {
        correct = (userAnswer === correctStr);
      }
      if (q.type === 'multiSelect') {
        results.push({
          question: q,
          correct,
          userAnswer: userAnswer ?? [],
          feedback: correct ? q.feedback.correct : q.feedback.incorrect,
          marksAwarded,
          marksOutOf,
        });
      } else {
        results.push({
          question: q,
          correct: !!correct,
          userAnswer: userAnswer ?? (q.type === 'dragOrder' ? [] : ''),
          feedback: correct ? q.feedback.correct : q.feedback.incorrect,
          marksAwarded: correct ? 1 : 0,
          marksOutOf: 1,
        });
      }
    });
    setTestResults(results);
    setTestPhase('results');
  };

  const answeredCount = testQuestions.filter(q => {
    const a = testAnswers[q.id];
    if (q.type === 'multiSelect') return Array.isArray(a) && a.length > 0;
    if (q.type === 'dragOrder') return Array.isArray(a);
    return a != null && a !== '';
  }).length;

  const retryTest = () => {
    setTestPhase('intro');
    setTestResults([]);
  };

  const [describeResponse, setDescribeResponse] = useState('');
  const [describeShowModel, setDescribeShowModel] = useState(false);

  useEffect(() => {
    setDescribeShowModel(false);
    setDescribeResponse('');
  }, [selectedPracticalId]);

  const tabs: { key: TabStep; label: string }[] = [
    { key: 'overview', label: 'Overview' },
    { key: 'setup', label: 'Setup' },
    { key: 'method', label: 'Method' },
    { key: 'risks', label: 'Risks' },
    { key: 'data', label: 'Data' },
    { key: 'evaluation', label: 'Evaluation' },
    { key: 'test', label: 'Test' },
    { key: 'describe', label: 'Describe' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
          borderColor: 'transparent',
        }}
      >
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Lab Modes
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Practical Lab</h1>
        <p className="text-white/90 text-sm sm:text-base">
          Learn required practicals – setup, method, risks, data – then test your understanding
        </p>
      </motion.section>

      {!selectedPractical ? (
        <section className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
            Select a Required Practical
          </h2>
          <div className="space-y-4">
            {practicals.map((practical, index) => (
              <motion.button
                key={practical.id}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => setSelectedPracticalId(practical.id)}
                className="w-full rounded-xl p-6 text-left border shadow-sm hover:shadow-md transition-all"
                style={{
                  background: 'rgb(var(--surface))',
                  borderColor: 'rgb(var(--border))',
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
                      {practical.title}
                    </h3>
                    <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {practical.purpose}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-500/20">
                    <FlaskConical size={24} className="text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </section>
      ) : (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <button
            type="button"
            onClick={() => {
              setSelectedPracticalId(null);
              setCurrentStep('overview');
            }}
            className="flex items-center gap-2 text-sm font-medium"
            style={{ color: 'rgb(var(--text-secondary))' }}
          >
            <ChevronLeft size={18} />
            Back to practicals
          </button>

          <div className="rounded-xl p-6 border" style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}>
            <h2 className="text-2xl font-bold mb-6" style={{ color: 'rgb(var(--text))' }}>
              {selectedPractical.title}
            </h2>

            {/* Navigation Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
              {tabs.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setCurrentStep(key)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition ${
                    currentStep === key ? 'text-white' : 'text-gray-700 dark:text-gray-300'
                  }`}
                  style={{
                    background:
                      currentStep === key
                        ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                        : 'rgb(var(--surface-2))',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="space-y-6">
              {currentStep === 'overview' && (
                <>
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: 'rgb(var(--text))' }}>
                      Purpose
                    </h3>
                    <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {selectedPractical.purpose}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: 'rgb(var(--text))' }}>
                      Variables
                    </h3>
                    <div className="space-y-2">
                      <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                        <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--text))' }}>
                          Independent Variable:
                        </p>
                        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                          {selectedPractical.independentVariable}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                        <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--text))' }}>
                          Dependent Variable:
                        </p>
                        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                          {selectedPractical.dependentVariable}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--text))' }}>
                          Controlled Variables:
                        </p>
                        <ul className="text-sm space-y-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                          {selectedPractical.controlledVariables.map((cv, idx) => (
                            <li key={idx}>• {cv}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 'setup' && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
                    <Wrench size={20} className="text-green-600 dark:text-green-400" />
                    Equipment & setup
                  </h3>
                  {selectedPractical.equipment?.length ? (
                    <>
                      <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
                        Equipment needed
                      </p>
                      <ul className="list-disc list-inside text-sm space-y-1 mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
                        {selectedPractical.equipment.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                  {selectedPractical.setupSteps?.length ? (
                    <>
                      <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
                        Setup steps (before main method)
                      </p>
                      <ol className="space-y-2">
                        {selectedPractical.setupSteps.map((step, idx) => (
                          <li key={idx} className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 text-green-700 dark:text-green-400 flex items-center justify-center text-sm font-semibold">
                              {idx + 1}
                            </span>
                            <p className="text-sm flex-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                              {step}
                            </p>
                          </li>
                        ))}
                      </ol>
                    </>
                  ) : null}
                  {!selectedPractical.equipment?.length && !selectedPractical.setupSteps?.length && (
                    <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                      No separate setup section for this practical. Use the <strong>Method</strong> tab for the full procedure from the start.
                    </p>
                  )}
                </div>
              )}

              {currentStep === 'method' && (
                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: 'rgb(var(--text))' }}>
                    Method Steps
                  </h3>
                  <ol className="space-y-2">
                    {selectedPractical.methodSteps.map((step, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-semibold">
                          {idx + 1}
                        </span>
                        <p className="text-sm flex-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                          {step}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {currentStep === 'risks' && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
                    <AlertTriangle size={20} className="text-red-600 dark:text-red-400" />
                    Risk Assessment
                  </h3>
                  <div className="space-y-3">
                    {selectedPractical.risks.map((risk, idx) => (
                      <div key={idx} className="p-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
                        <p className="text-sm font-semibold mb-1" style={{ color: 'rgb(var(--text))' }}>
                          Hazard: {risk.hazard}
                        </p>
                        <p className="text-sm mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                          Risk: {risk.risk}
                        </p>
                        <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                          Control: {risk.control}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 'data' && (
                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: 'rgb(var(--text))' }}>
                    Data Table & Graph
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
                        Expected Data Table:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr>
                              {selectedPractical.dataTable.headers.map((header, idx) => (
                                <th
                                  key={idx}
                                  className="px-4 py-2 border text-left text-sm font-semibold"
                                  style={{
                                    background: 'rgb(var(--surface-2))',
                                    borderColor: 'rgb(var(--border))',
                                    color: 'rgb(var(--text))',
                                  }}
                                >
                                  {header}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          {selectedPractical.dataTable.exampleRow && (
                            <tbody>
                              <tr>
                                {selectedPractical.dataTable.exampleRow.map((cell, idx) => (
                                  <td
                                    key={idx}
                                    className="px-4 py-2 border text-sm"
                                    style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text-secondary))' }}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            </tbody>
                          )}
                        </table>
                      </div>
                    </div>
                    {selectedPractical.graphExpectations && (
                      <div>
                        <p className="text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
                          Graph Expectations:
                        </p>
                        <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <p className="text-sm mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                            X-axis: {selectedPractical.graphExpectations.xAxis}
                          </p>
                          <p className="text-sm mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                            Y-axis: {selectedPractical.graphExpectations.yAxis}
                          </p>
                          <p className="text-sm mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                            Type: {selectedPractical.graphExpectations.type}
                          </p>
                          {selectedPractical.graphExpectations.expectedTrend && (
                            <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                              Expected trend: {selectedPractical.graphExpectations.expectedTrend}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 'evaluation' && (
                <div>
                  <h3 className="text-lg font-semibold mb-3" style={{ color: 'rgb(var(--text))' }}>
                    Evaluation Questions
                  </h3>
                  <div className="space-y-4">
                    {selectedPractical.evaluationQuestions.map((eq, idx) => (
                      <div key={idx} className="p-4 rounded-lg border" style={{ borderColor: 'rgb(var(--border))' }}>
                        <p className="text-sm font-semibold mb-2" style={{ color: 'rgb(var(--text))' }}>
                          {eq.question}
                        </p>
                        <ul className="text-sm space-y-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                          {eq.expectedPoints.map((point, pidx) => (
                            <li key={pidx}>• {point}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 'test' && (
                <div>
                  <h3 className="text-lg font-semibold mb-2 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
                    <ClipboardCheck size={20} className="text-green-600 dark:text-green-400" />
                    Practical test
                  </h3>
                  {quizQuestions.length === 0 ? (
                    <p className="text-sm py-4" style={{ color: 'rgb(var(--text-secondary))' }}>
                      No quiz questions for this practical yet. Review the Overview, Setup, and Method tabs, then try another practical that has a test.
                    </p>
                  ) : testPhase === 'intro' ? (
                    <PracticalTestIntro
                      practicalTitle={selectedPractical.title}
                      questionCount={quizQuestions.length}
                      onStart={startTest}
                    />
                  ) : testPhase === 'active' ? (
                    <PracticalTestActive
                      questions={testQuestions}
                      currentIndex={testQuestionIndex}
                      answers={testAnswers}
                      answeredCount={answeredCount}
                      onSetAnswer={setAnswerForCurrent}
                      onGoToQuestion={setTestQuestionIndex}
                      onPrev={goToPrevQuestion}
                      onNext={goToNextQuestion}
                      onSubmit={submitTest}
                    />
                  ) : (
                    <PracticalTestResults
                      results={testResults}
                      onRetry={retryTest}
                      onBackToOverview={() => setTestPhase('intro')}
                    />
                  )}
                </div>
              )}

              {currentStep === 'describe' && (
                <PracticalDescribeSection
                  practical={selectedPractical}
                  response={describeResponse}
                  onResponseChange={setDescribeResponse}
                  showModel={describeShowModel}
                  onShowModel={() => setDescribeShowModel(true)}
                />
              )}
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}

// --- Describe the practical: written response then compare with model answer ---
function PracticalDescribeSection({
  practical,
  response,
  onResponseChange,
  showModel,
  onShowModel,
}: {
  practical: SciencePractical;
  response: string;
  onResponseChange: (value: string) => void;
  showModel: boolean;
  onShowModel: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h3 className="text-lg font-semibold flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
        <ClipboardCheck size={20} className="text-green-600 dark:text-green-400" />
        Describe the practical
      </h3>
      <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
        In the exam you may be asked to describe how you would conduct this practical. Write your answer below, then compare with the model answer.
      </p>
      <p className="text-sm font-medium" style={{ color: 'rgb(var(--text))' }}>
        Describe how you would conduct: <strong>{practical.title}</strong>. Include: aim, variables (independent, dependent, controls), key method steps, and risks with controls.
      </p>
      <textarea
        value={response}
        onChange={(e) => onResponseChange(e.target.value)}
        placeholder="Type your answer here..."
        rows={8}
        className="w-full rounded-xl p-4 border text-sm resize-y min-h-[160px]"
        style={{
          background: 'rgb(var(--surface))',
          borderColor: 'rgb(var(--border))',
          color: 'rgb(var(--text))',
        }}
      />
      {!showModel ? (
        <button
          type="button"
          onClick={onShowModel}
          className="px-5 py-2.5 rounded-lg font-semibold text-sm text-white"
          style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}
        >
          Show model answer
        </button>
      ) : (
        <div className="space-y-4">
          {response.trim() && (
            <div className="rounded-xl p-4 border" style={{ borderColor: 'rgb(var(--border))', background: 'rgb(var(--surface-2))' }}>
              <p className="text-xs font-semibold mb-2 uppercase tracking-wide" style={{ color: 'rgb(var(--text-secondary))' }}>
                Your response
              </p>
              <p className="text-sm whitespace-pre-wrap" style={{ color: 'rgb(var(--text))' }}>{response.trim()}</p>
            </div>
          )}
          <div className="rounded-xl p-5 border-2 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/15">
            <p className="text-xs font-semibold mb-3 uppercase tracking-wide text-green-700 dark:text-green-400">
              Model answer (key points)
            </p>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-semibold mb-1" style={{ color: 'rgb(var(--text))' }}>Aim</p>
                <p style={{ color: 'rgb(var(--text-secondary))' }}>{practical.purpose}</p>
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: 'rgb(var(--text))' }}>Variables</p>
                <ul className="list-disc list-inside space-y-0.5" style={{ color: 'rgb(var(--text-secondary))' }}>
                  <li><strong>Independent:</strong> {practical.independentVariable}</li>
                  <li><strong>Dependent:</strong> {practical.dependentVariable}</li>
                  <li><strong>Controls:</strong> {practical.controlledVariables.join('; ')}</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: 'rgb(var(--text))' }}>Method</p>
                <ol className="list-decimal list-inside space-y-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {practical.methodSteps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
              <div>
                <p className="font-semibold mb-1" style={{ color: 'rgb(var(--text))' }}>Risks and controls</p>
                <ul className="space-y-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {practical.risks.map((r, i) => (
                    <li key={i}><strong>{r.hazard}:</strong> {r.risk} → Control: {r.control}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// --- Test intro: start screen ---
function PracticalTestIntro({
  practicalTitle,
  questionCount,
  onStart,
}: {
  practicalTitle: string;
  questionCount: number;
  onStart: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl p-6 border"
      style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))' }}
    >
      <p className="text-sm mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
        <strong style={{ color: 'rgb(var(--text))' }}>{practicalTitle}</strong>
      </p>
      <ul className="text-sm space-y-1 mb-6 list-disc list-inside" style={{ color: 'rgb(var(--text-secondary))' }}>
        <li><strong>{questionCount}</strong> questions (setup, variables, method, risks, evaluation)</li>
        <li>Answer all questions – no feedback until you submit</li>
        <li>You can move between questions with Previous / Next</li>
        <li>Submit when ready to see your score and feedback</li>
      </ul>
      <button
        type="button"
        onClick={onStart}
        className="w-full py-3 rounded-xl font-semibold text-white"
        style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}
      >
        Start test
      </button>
    </motion.div>
  );
}

// --- Test active: one question at a time, progress strip, no feedback until submit ---
function PracticalTestActive({
  questions,
  currentIndex,
  answers,
  answeredCount,
  onSetAnswer,
  onGoToQuestion,
  onPrev,
  onNext,
  onSubmit,
}: {
  questions: PracticalQuizQuestion[];
  currentIndex: number;
  answers: Record<string, string | string[]>;
  answeredCount: number;
  onSetAnswer: (value: string | string[]) => void;
  onGoToQuestion: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
}) {
  const q = questions[currentIndex];
  const userAnswer = q ? answers[q.id] : undefined;
  const isLast = currentIndex === questions.length - 1;
  const isFirst = currentIndex === 0;

  const isAnswered = (index: number) => {
    const qu = questions[index];
    const a = answers[qu.id];
    if (qu.type === 'multiSelect') return Array.isArray(a) && a.length > 0;
    if (qu.type === 'dragOrder') return Array.isArray(a);
    return a != null && a !== '';
  };

  if (!q) return null;

  const dragOrder = (q.type === 'dragOrder' && Array.isArray(userAnswer))
    ? userAnswer as string[]
    : (q.options ? [...q.options] : []);

  const setDragOrder = (order: string[]) => onSetAnswer(order);

  const multiSelectSelected = (q.type === 'multiSelect' && Array.isArray(userAnswer)) ? new Set(userAnswer as string[]) : new Set<string>();
  const toggleMultiSelect = (option: string) => {
    const next = multiSelectSelected.has(option)
      ? (userAnswer as string[]).filter((x: string) => x !== option)
      : [...(userAnswer as string[] || []), option];
    onSetAnswer(next);
  };

  return (
    <motion.div
      key={q.id}
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Question nav: mark progress and jump */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          {questions.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => onGoToQuestion(idx)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition ${
                idx === currentIndex
                  ? 'text-white'
                  : isAnswered(idx)
                    ? 'bg-green-500/30 text-green-700 dark:text-green-400 border border-green-500/50'
                    : 'border bg-transparent'
              }`}
              style={{
                background: idx === currentIndex ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)' : undefined,
                borderColor: idx === currentIndex ? 'transparent' : 'rgb(var(--border))',
                color: idx === currentIndex ? undefined : 'rgb(var(--text-secondary))',
              }}
              title={isAnswered(idx) ? `Question ${idx + 1} (answered)` : `Question ${idx + 1}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
        <span className="text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
          Answered {answeredCount} / {questions.length}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
        <span>Question {currentIndex + 1} of {questions.length}</span>
        <span className="capitalize">{q.category}{q.marks && q.marks > 1 ? ` · ${q.marks} marks` : ''}</span>
      </div>
      <div className="rounded-xl p-5 border" style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))' }}>
        <h4 className="text-base font-semibold mb-4" style={{ color: 'rgb(var(--text))' }}>
          {q.question}
        </h4>
        {q.type === 'multipleChoice' && q.options && (
          <div className="space-y-2">
            {q.options.map((option, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSetAnswer(option)}
                className={`w-full p-3 rounded-lg text-left border transition text-sm ${
                  userAnswer === option ? 'ring-2 ring-green-500/50 border-green-500' : 'hover:border-green-400'
                }`}
                style={{
                  background: 'rgb(var(--surface))',
                  color: 'rgb(var(--text))',
                  borderColor: userAnswer === option ? 'rgb(34, 197, 94)' : 'rgb(var(--border))',
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
        {q.type === 'multiSelect' && q.options && (
          <div className="space-y-2">
            <p className="text-xs mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
              Select all that would get marks (max {q.marks ?? 6}).
            </p>
            {q.options.map((option, idx) => (
              <label
                key={idx}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition text-sm ${
                  multiSelectSelected.has(option) ? 'ring-2 ring-green-500/50 border-green-500' : 'hover:border-green-400'
                }`}
                style={{
                  background: 'rgb(var(--surface))',
                  borderColor: multiSelectSelected.has(option) ? 'rgb(34, 197, 94)' : 'rgb(var(--border))',
                  color: 'rgb(var(--text))',
                }}
              >
                <input
                  type="checkbox"
                  checked={multiSelectSelected.has(option)}
                  onChange={() => toggleMultiSelect(option)}
                  className="mt-0.5 rounded border-gray-300"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        )}
        {q.type === 'dragOrder' && dragOrder.length > 0 && (
          <>
            <p className="text-xs mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>
              Drag to put in order:
            </p>
            {dragOrder.map((item, idx) => (
              <div
                key={idx}
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', idx.toString())}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const from = parseInt(e.dataTransfer.getData('text/plain'), 10);
                  if (from === idx) return;
                  const newOrder = [...dragOrder];
                  const [removed] = newOrder.splice(from, 1);
                  newOrder.splice(idx, 0, removed);
                  setDragOrder(newOrder);
                }}
                className="p-3 rounded-lg border cursor-move text-sm flex items-center gap-2"
                style={{
                  background: 'rgb(var(--surface))',
                  borderColor: 'rgb(var(--border))',
                  color: 'rgb(var(--text))',
                }}
              >
                <span className="text-xs font-semibold" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {idx + 1}.
                </span>
                {item}
              </div>
            ))}
          </>
        )}
      </div>
      <div className="flex gap-3">
        {!isFirst && (
          <button
            type="button"
            onClick={onPrev}
            className="px-4 py-2.5 rounded-lg font-medium text-sm border"
            style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))', background: 'rgb(var(--surface-2))' }}
          >
            ← Previous
          </button>
        )}
        <div className="flex-1" />
        {!isLast ? (
          <button
            type="button"
            onClick={onNext}
            className="px-5 py-2.5 rounded-lg font-semibold text-sm text-white"
            style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)' }}
          >
            Next →
          </button>
        ) : (
          <button
            type="button"
            onClick={onSubmit}
            className="px-5 py-2.5 rounded-lg font-semibold text-sm text-white"
            style={{ background: 'linear-gradient(135deg, #059669 0%, #047857 100%)' }}
          >
            Submit test
          </button>
        )}
      </div>
    </motion.div>
  );
}

// --- Test results: score + per-question feedback (with marks for 6-markers) ---
function PracticalTestResults({
  results,
  onRetry,
  onBackToOverview,
}: {
  results: Array<{
    question: PracticalQuizQuestion;
    correct: boolean;
    userAnswer: string | string[];
    feedback: string;
    marksAwarded?: number;
    marksOutOf?: number;
  }>;
  onRetry: () => void;
  onBackToOverview: () => void;
}) {
  const totalMarksAwarded = results.reduce((sum, r) => sum + (r.marksAwarded ?? (r.correct ? 1 : 0)), 0);
  const totalMarksOutOf = results.reduce((sum, r) => sum + (r.marksOutOf ?? 1), 0);
  const correctCount = results.filter(r => r.correct).length;
  const totalQuestions = results.length;
  const percent = totalMarksOutOf ? Math.round((totalMarksAwarded / totalMarksOutOf) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div
        className="rounded-xl p-6 flex flex-col sm:flex-row items-center gap-4 border"
        style={{
          background: percent >= 70 ? 'rgba(5, 150, 105, 0.12)' : percent >= 50 ? 'rgba(245, 158, 11, 0.12)' : 'rgba(220, 38, 38, 0.1)',
          borderColor: percent >= 70 ? 'rgb(5, 150, 105)' : percent >= 50 ? 'rgb(245, 158, 11)' : 'rgb(220, 38, 38)',
        }}
      >
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-gray-900 shadow-sm">
          <Award size={32} style={{ color: percent >= 70 ? '#059669' : percent >= 50 ? '#d97706' : '#dc2626' }} />
        </div>
        <div className="text-center sm:text-left">
          <h4 className="text-xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            {totalMarksAwarded} / {totalMarksOutOf} marks
          </h4>
          <p className="text-sm font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
            {correctCount} / {totalQuestions} questions fully correct · {percent}%
          </p>
          <p className="text-xs mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>
            {percent >= 70 ? 'Well done – you know this practical.' : percent >= 50 ? 'Review the wrong answers and try again.' : 'Review the practical tabs and retry the test.'}
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {results.map((r, idx) => (
          <div
            key={r.question.id}
            className={`rounded-xl p-4 border ${
              r.correct ? 'bg-green-50 dark:bg-green-900/15 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/15 border-red-200 dark:border-red-800'
            }`}
          >
            <div className="flex items-start gap-2 mb-2">
              {r.correct ? (
                <Sparkles size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold" style={{ color: 'rgb(var(--text))' }}>
                  Q{idx + 1}: {r.question.question}
                  {r.marksOutOf != null && r.marksOutOf > 1 && (
                    <span className="ml-2 text-xs font-normal" style={{ color: 'rgb(var(--text-secondary))' }}>
                      ({r.marksAwarded ?? 0}/{r.marksOutOf} marks)
                    </span>
                  )}
                </p>
                {!r.correct && (
                  <p className="text-xs mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                    Your answer: {Array.isArray(r.userAnswer) ? (r.userAnswer.length ? r.userAnswer.join('; ') : '—') : r.userAnswer}
                  </p>
                )}
                <p className="text-sm mt-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                  {r.feedback}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm border"
          style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))', background: 'rgb(var(--surface-2))' }}
        >
          <RotateCcw size={18} />
          Retry test
        </button>
        <button
          type="button"
          onClick={onBackToOverview}
          className="px-4 py-2.5 rounded-lg font-medium text-sm"
          style={{ color: 'rgb(var(--text-secondary))', background: 'rgb(var(--surface-2))' }}
        >
          Back to overview
        </button>
      </div>
    </motion.div>
  );
}