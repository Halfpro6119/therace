import { useEffect, useState } from 'react';
import { db } from '../db/client';
import { Prompt, TierFilter } from '../types';
import { getPromptsWithPaperAndTierFilter, getTopicPromptsWithTierFilter, getUnitPromptsWithTierFilter, getSubjectPromptsWithTierFilter } from './tierFilterService';
import { getTierLabel, getTierBadge, getTierColor } from './tierNormalizer';

/**
 * Enhanced QuizPlayerPage with Tier System support
 * Allows filtering quiz prompts by tier level
 * Supports combined paper + tier filtering
 */
export function QuizPlayerPageWithTier() {
  const [quizType, setQuizType] = useState<'topic' | 'unit' | 'paper' | 'subject'>('topic');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [selectedPaper, setSelectedPaper] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [tierFilter, setTierFilter] = useState<TierFilter>('all'); // NEW: Tier filter
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [loading, setLoading] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<any>(null);

  /**
   * Load prompts based on quiz type and tier filter
   */
  const loadPrompts = async () => {
    try {
      setLoading(true);
      let loadedPrompts: Prompt[] = [];

      switch (quizType) {
        case 'topic':
          if (selectedTopic) {
            loadedPrompts = await getTopicPromptsWithTierFilter(selectedTopic, tierFilter);
          }
          break;

        case 'unit':
          if (selectedUnit) {
            loadedPrompts = await getUnitPromptsWithTierFilter(selectedUnit, tierFilter);
          }
          break;

        case 'paper':
          if (selectedPaper && selectedSubject) {
            const paperNum = parseInt(selectedPaper, 10);
            if ([1, 2, 3].includes(paperNum)) {
              loadedPrompts = await getPromptsWithPaperAndTierFilter(selectedSubject, paperNum as 1 | 2 | 3, tierFilter);
            }
          }
          break;

        case 'subject':
          if (selectedSubject) {
            loadedPrompts = await getSubjectPromptsWithTierFilter(selectedSubject, tierFilter);
          }
          break;
      }

      setPrompts(loadedPrompts);
    } catch (error) {
      console.error('Failed to load prompts:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Start quiz
   */
  const startQuiz = () => {
    if (prompts.length === 0) {
      alert('No prompts available for this selection');
      return;
    }
    setQuizStarted(true);
    setCurrentPromptIndex(0);
    setAnswers({});
    setResults(null);
  };

  /**
   * Submit answer
   */
  const submitAnswer = (answer: string) => {
    const currentPrompt = prompts[currentPromptIndex];
    setAnswers({
      ...answers,
      [currentPrompt.id]: answer
    });

    if (currentPromptIndex < prompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
    } else {
      finishQuiz();
    }
  };

  /**
   * Finish quiz and calculate results
   */
  const finishQuiz = () => {
    let correct = 0;
    prompts.forEach(prompt => {
      const userAnswer = answers[prompt.id];
      if (userAnswer && prompt.answers.includes(userAnswer)) {
        correct++;
      }
    });

    const accuracy = Math.round((correct / prompts.length) * 100);
    setResults({
      correct,
      total: prompts.length,
      accuracy
    });
    setQuizStarted(false);
  };

  if (quizStarted && prompts.length > 0) {
    const currentPrompt = prompts[currentPromptIndex];
    
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        {/* Progress */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Question {currentPromptIndex + 1} of {prompts.length}
          </h2>
          <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500 transition-all"
              style={{ width: `${((currentPromptIndex + 1) / prompts.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Tier Badge */}
        {currentPrompt.tier && (
          <div
            className="px-3 py-1 rounded-full text-sm font-medium inline-block"
            style={{
              backgroundColor: getTierColor(currentPrompt.tier) + '20',
              color: getTierColor(currentPrompt.tier)
            }}
          >
            {getTierBadge(currentPrompt.tier)}
          </div>
        )}

        {/* Question */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {currentPrompt.question}
          </h3>

          {/* Answers */}
          <div className="space-y-3">
            {currentPrompt.answers.map((answer, idx) => (
              <button
                key={idx}
                onClick={() => submitAnswer(answer)}
                className="w-full p-4 text-left bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors text-gray-900 dark:text-white font-medium"
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (results) {
    return (
      <div className="max-w-2xl mx-auto p-6 space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Quiz Complete!</h2>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-4">
          <div className="text-center">
            <div className="text-5xl font-bold text-red-500 mb-2">
              {results.accuracy}%
            </div>
            <div className="text-gray-600 dark:text-gray-400">
              {results.correct} out of {results.total} correct
            </div>
          </div>

          <button
            onClick={() => {
              setQuizStarted(false);
              setResults(null);
              setCurrentPromptIndex(0);
              setAnswers({});
            }}
            className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Quiz Player</h1>

      {/* Quiz Type Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Select Quiz Type</h2>

        <div className="grid grid-cols-2 gap-3">
          {['topic', 'unit', 'paper', 'subject'].map(type => (
            <button
              key={type}
              onClick={() => {
                setQuizType(type as any);
                setPrompts([]);
              }}
              className={`p-3 rounded-lg font-medium transition-colors ${
                quizType === type
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tier Filter (NEW) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Tier Filter</h2>

        <select
          value={tierFilter}
          onChange={(e) => setTierFilter(e.target.value as TierFilter)}
          className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="all">All Tiers</option>
          <option value="higher">Higher Tier Only</option>
          <option value="foundation">Foundation Tier Only</option>
        </select>
      </div>

      {/* Quiz Configuration */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Quiz Configuration</h2>

        {/* Topic Selection */}
        {quizType === 'topic' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Topic
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => {
                setSelectedTopic(e.target.value);
                loadPrompts();
              }}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Choose a topic...</option>
              {/* Topics would be loaded from database */}
            </select>
          </div>
        )}

        {/* Unit Selection */}
        {quizType === 'unit' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Unit
            </label>
            <select
              value={selectedUnit}
              onChange={(e) => {
                setSelectedUnit(e.target.value);
                loadPrompts();
              }}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Choose a unit...</option>
              {/* Units would be loaded from database */}
            </select>
          </div>
        )}

        {/* Paper Selection */}
        {quizType === 'paper' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Subject
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Choose a subject...</option>
                {/* Subjects would be loaded from database */}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Paper
              </label>
              <select
                value={selectedPaper}
                onChange={(e) => {
                  setSelectedPaper(e.target.value);
                  loadPrompts();
                }}
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">Choose a paper...</option>
                <option value="1">Paper 1</option>
                <option value="2">Paper 2</option>
                <option value="3">Paper 3</option>
              </select>
            </div>
          </>
        )}

        {/* Subject Selection */}
        {quizType === 'subject' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                loadPrompts();
              }}
              className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Choose a subject...</option>
              {/* Subjects would be loaded from database */}
            </select>
          </div>
        )}

        {/* Prompts Info */}
        {prompts.length > 0 && (
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              {prompts.length} prompt{prompts.length !== 1 ? 's' : ''} available
              {tierFilter !== 'all' && ` (${getTierLabel(tierFilter === 'higher' ? 'higher' : 'foundation')})`}
            </p>
          </div>
        )}

        {/* Start Button */}
        <button
          onClick={startQuiz}
          disabled={prompts.length === 0 || loading}
          className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-xl font-semibold transition-colors"
        >
          {loading ? 'Loading...' : 'Start Quiz'}
        </button>
      </div>
    </div>
  );
}
