import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, FlaskConical, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { getPracticalsBySubject } from '../../config/scienceLabData';
import type { ScienceSubject } from '../../types/scienceLab';

export function ScienceLabPracticalLabPage() {
  const navigate = useNavigate();
  const { subject, paper, tier } = useParams<{ subject: string; paper: string; tier: string }>();
  const [selectedPracticalId, setSelectedPracticalId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<'overview' | 'method' | 'risks' | 'data' | 'evaluation'>('overview');

  const subjectId = subject?.toLowerCase() as ScienceSubject | undefined;
  if (!subjectId || !['biology', 'chemistry', 'physics'].includes(subject.toLowerCase())) {
    return <div>Invalid subject</div>;
  }

  const normalizedSubject: ScienceSubject = subjectId.charAt(0).toUpperCase() + subjectId.slice(1) as ScienceSubject;
  const practicals = getPracticalsBySubject(normalizedSubject);
  const selectedPractical = practicals.find(p => p.id === selectedPracticalId);

  const handleBack = () => {
    navigate(`/science-lab/${subject.toLowerCase()}`);
  };

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
          Required practicals – variables, method, risk assessment, evaluation
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
              {(['overview', 'method', 'risks', 'data', 'evaluation'] as const).map((step) => (
                <button
                  key={step}
                  type="button"
                  onClick={() => setCurrentStep(step)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition ${
                    currentStep === step
                      ? 'text-white'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                  style={{
                    background: currentStep === step
                      ? 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
                      : 'rgb(var(--surface-2))',
                  }}
                >
                  {step.charAt(0).toUpperCase() + step.slice(1)}
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
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}
