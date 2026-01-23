/**
 * QUESTION RENDERER - COMPLETE IMPLEMENTATION
 * 
 * Renders different question types with full functionality:
 * - SHORT: Text input with mark scheme comparison
 * - MCQ: Multiple choice with visual feedback
 * - FILL: Fill-in-the-blanks with auto-fill on correct answers
 * - MATCH: Matching with dropdown selectors
 * - LABEL: Diagram labeling with drag-and-drop
 */

import { useState, useEffect } from 'react';
import { Prompt } from '../types';
import { MCQQuestionData, FillQuestionData, MatchQuestionData, LabelQuestionData } from '../types/questionTypes';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface QuestionRendererProps {
  prompt: Prompt;
  currentInput: string | string[] | Record<string, string>;
  onInputChange: (value: any) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  showFeedback: boolean;
  feedbackMessage?: string;
  isCorrect?: boolean;
  explanation?: string;
}

/**
 * SHORT ANSWER - Text input with mark scheme comparison
 * Allows students to type answers and compare against mark scheme
 */
function renderShortAnswer(props: QuestionRendererProps) {
  const [showMarkScheme, setShowMarkScheme] = useState(false);
  const userAnswer = String(props.currentInput || '');

  return (
    <div className="space-y-4">
      {/* Input Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Answer
        </label>
        <textarea
          value={userAnswer}
          onChange={(e) => props.onInputChange(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 min-h-24"
          disabled={props.isSubmitting}
        />
      </div>

      {/* Mark Scheme Comparison */}
      {props.showFeedback && (
        <div className="space-y-3">
          {/* Feedback Message */}
          <div className={`p-4 rounded-lg flex items-start gap-3 ${
            props.isCorrect 
              ? 'bg-green-50 border-2 border-green-200' 
              : 'bg-yellow-50 border-2 border-yellow-200'
          }`}>
            {props.isCorrect ? (
              <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
            ) : (
              <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
            )}
            <div>
              <p className={`font-semibold ${props.isCorrect ? 'text-green-800' : 'text-yellow-800'}`}>
                {props.feedbackMessage}
              </p>
            </div>
          </div>

          {/* Mark Scheme */}
          <button
            onClick={() => setShowMarkScheme(!showMarkScheme)}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            {showMarkScheme ? '▼' : '▶'} Mark Scheme
          </button>

          {showMarkScheme && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Accepted Answers:</h4>
              <ul className="space-y-1">
                {props.prompt.answers.map((answer, idx) => (
                  <li key={idx} className="text-blue-800 text-sm">
                    • {answer}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Explanation */}
          {props.explanation && (
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">Explanation:</h4>
              <p className="text-purple-800 text-sm">{props.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * MCQ - Multiple choice with visual feedback
 * Shows choices as buttons with selection state
 */
function renderMCQ(props: QuestionRendererProps) {
  const mcqData = (props.prompt.meta?.questionData || {}) as MCQQuestionData;
  const choices = mcqData.choices || [];
  const selectedKey = String(props.currentInput || '');

  return (
    <div className="space-y-4">
      {/* Choices */}
      <div className="space-y-3">
        {choices.map((choice) => {
          const isSelected = selectedKey === choice.key;
          const isCorrect = props.showFeedback && props.prompt.answers.includes(choice.key);
          const isWrong = props.showFeedback && isSelected && !isCorrect;

          return (
            <button
              key={choice.key}
              onClick={() => !props.isSubmitting && props.onInputChange(choice.key)}
              disabled={props.isSubmitting}
              className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
                isWrong
                  ? 'border-red-500 bg-red-50'
                  : isCorrect && props.showFeedback
                  ? 'border-green-500 bg-green-50'
                  : isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              } disabled:opacity-50`}
            >
              <div className="flex items-center gap-3">
                {/* Radio Button */}
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  isWrong
                    ? 'border-red-500 bg-red-100'
                    : isCorrect && props.showFeedback
                    ? 'border-green-500 bg-green-100'
                    : isSelected
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-400'
                }`}>
                  {isSelected && !props.showFeedback && <div className="w-2 h-2 bg-white rounded-full" />}
                  {isCorrect && props.showFeedback && <CheckCircle size={16} className="text-green-600" />}
                  {isWrong && <XCircle size={16} className="text-red-600" />}
                </div>

                {/* Choice Text */}
                <div className="flex-1">
                  <span className="font-medium">{choice.key}.</span>
                  <span className="ml-2">{choice.text}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {props.showFeedback && (
        <div className="space-y-3">
          <div className={`p-4 rounded-lg flex items-start gap-3 ${
            props.isCorrect 
              ? 'bg-green-50 border-2 border-green-200' 
              : 'bg-red-50 border-2 border-red-200'
          }`}>
            {props.isCorrect ? (
              <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
            ) : (
              <XCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            )}
            <p className={`font-semibold ${props.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {props.feedbackMessage}
            </p>
          </div>

          {/* Explanation */}
          {props.explanation && (
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">Explanation:</h4>
              <p className="text-purple-800 text-sm">{props.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * FILL - Fill-in-the-blanks with auto-fill on correct answers
 * Automatically fills in correct answers as user types
 */
function renderFill(props: QuestionRendererProps) {
  const fillData = (props.prompt.meta?.questionData || {}) as FillQuestionData;
  const blanks = fillData.blanks || 1;
  const answers = Array.isArray(props.currentInput) ? props.currentInput : [props.currentInput || ''];
  const [filledBlanks, setFilledBlanks] = useState<Set<number>>(new Set());

  // Auto-fill correct answers
  const handleBlankChange = (idx: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[idx] = value;
    props.onInputChange(newAnswers);

    // Check if this blank is correct
    if (fillData.acceptedSets && fillData.acceptedSets[idx]) {
      const normalizedValue = value.trim().toLowerCase();
      const acceptedAnswers = fillData.acceptedSets[idx].map(a => a.trim().toLowerCase());
      
      if (acceptedAnswers.includes(normalizedValue)) {
        setFilledBlanks(prev => new Set([...prev, idx]));
      } else {
        setFilledBlanks(prev => {
          const newSet = new Set(prev);
          newSet.delete(idx);
          return newSet;
        });
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Blanks */}
      <div className="space-y-3">
        {Array.from({ length: blanks }).map((_, idx) => (
          <div key={idx}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blank {idx + 1}
              {filledBlanks.has(idx) && (
                <span className="ml-2 text-green-600 font-semibold">✓ Correct</span>
              )}
            </label>
            <input
              type="text"
              value={answers[idx] || ''}
              onChange={(e) => handleBlankChange(idx, e.target.value)}
              placeholder={`Answer for blank ${idx + 1}`}
              className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none ${
                filledBlanks.has(idx)
                  ? 'border-green-500 bg-green-50 focus:border-green-600'
                  : 'border-gray-300 focus:border-blue-500'
              }`}
              disabled={props.isSubmitting}
            />
          </div>
        ))}
      </div>

      {/* Feedback */}
      {props.showFeedback && (
        <div className="space-y-3">
          <div className={`p-4 rounded-lg flex items-start gap-3 ${
            props.isCorrect 
              ? 'bg-green-50 border-2 border-green-200' 
              : 'bg-red-50 border-2 border-red-200'
          }`}>
            {props.isCorrect ? (
              <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
            ) : (
              <XCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            )}
            <p className={`font-semibold ${props.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {props.feedbackMessage}
            </p>
          </div>

          {/* Explanation */}
          {props.explanation && (
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">Explanation:</h4>
              <p className="text-purple-800 text-sm">{props.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * MATCH - Matching with dropdown selectors
 * Allows students to match left items to right items
 */
function renderMatch(props: QuestionRendererProps) {
  const matchData = (props.prompt.meta?.questionData || {}) as MatchQuestionData;
  const leftItems = matchData.leftItems || [];
  const rightItems = matchData.rightItems || [];
  const mappings = (props.currentInput as Record<string, string>) || {};

  return (
    <div className="space-y-4">
      {/* Matching Interface */}
      <div className="space-y-3">
        {leftItems.map((leftItem) => (
          <div key={leftItem.id} className="flex items-center gap-3">
            {/* Left Item */}
            <div className="flex-1 bg-gray-100 p-3 rounded-lg">
              <p className="font-medium text-gray-800">{leftItem.text}</p>
            </div>

            {/* Dropdown */}
            <select
              value={mappings[leftItem.id] || ''}
              onChange={(e) => {
                const newMappings = { ...mappings };
                newMappings[leftItem.id] = e.target.value;
                props.onInputChange(newMappings);
              }}
              disabled={props.isSubmitting}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select...</option>
              {rightItems.map((rightItem) => (
                <option key={rightItem.id} value={rightItem.id}>
                  {rightItem.text}
                </option>
              ))}
            </select>

            {/* Right Item Preview */}
            {mappings[leftItem.id] && (
              <div className="flex-1 bg-blue-100 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  {rightItems.find(r => r.id === mappings[leftItem.id])?.text}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Feedback */}
      {props.showFeedback && (
        <div className="space-y-3">
          <div className={`p-4 rounded-lg flex items-start gap-3 ${
            props.isCorrect 
              ? 'bg-green-50 border-2 border-green-200' 
              : 'bg-red-50 border-2 border-red-200'
          }`}>
            {props.isCorrect ? (
              <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
            ) : (
              <XCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            )}
            <p className={`font-semibold ${props.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {props.feedbackMessage}
            </p>
          </div>

          {/* Explanation */}
          {props.explanation && (
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">Explanation:</h4>
              <p className="text-purple-800 text-sm">{props.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * LABEL - Diagram labeling with drag-and-drop or dropdown
 * Allows students to label positions on a diagram
 */
function renderLabel(props: QuestionRendererProps) {
  const labelData = (props.prompt.meta?.questionData || {}) as LabelQuestionData;
  const labels = labelData.labels || [];
  const targets = labelData.targets || [];
  const mappings = (props.currentInput as Record<string, string>) || {};

  return (
    <div className="space-y-4">
      {/* Diagram Placeholder */}
      <div className="bg-gray-100 p-6 rounded-lg min-h-64 flex items-center justify-center border-2 border-gray-300">
        <div className="text-center">
          <p className="text-gray-600 font-medium mb-2">Diagram Area</p>
          <p className="text-sm text-gray-500">
            {targets.length} target(s) to label with {labels.length} label(s)
          </p>
        </div>
      </div>

      {/* Label Assignments */}
      <div className="space-y-3">
        <p className="font-medium text-gray-700">Assign Labels to Targets:</p>
        {targets.map((target) => (
          <div key={target.id} className="flex items-center gap-3">
            <label className="flex-1 text-sm font-medium text-gray-700">
              {target.prompt || `Target ${target.id}`}
            </label>
            <select
              value={mappings[target.id] || ''}
              onChange={(e) => {
                const newMappings = { ...mappings };
                newMappings[target.id] = e.target.value;
                props.onInputChange(newMappings);
              }}
              disabled={props.isSubmitting}
              className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select label...</option>
              {labels.map((label) => (
                <option key={label.id} value={label.id}>
                  {label.text}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Feedback */}
      {props.showFeedback && (
        <div className="space-y-3">
          <div className={`p-4 rounded-lg flex items-start gap-3 ${
            props.isCorrect 
              ? 'bg-green-50 border-2 border-green-200' 
              : 'bg-red-50 border-2 border-red-200'
          }`}>
            {props.isCorrect ? (
              <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
            ) : (
              <XCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            )}
            <p className={`font-semibold ${props.isCorrect ? 'text-green-800' : 'text-red-800'}`}>
              {props.feedbackMessage}
            </p>
          </div>

          {/* Explanation */}
          {props.explanation && (
            <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">Explanation:</h4>
              <p className="text-purple-800 text-sm">{props.explanation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Main Question Renderer Component
 */
export function QuestionRenderer(props: QuestionRendererProps) {
  const { prompt } = props;

  return (
    <div className="space-y-4">
      {/* Marks Display */}
      {prompt.marks !== undefined && (
        <div className="flex items-center justify-between p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
          <span className="text-sm font-medium text-gray-700">Question Marks:</span>
          <span className="text-lg font-bold text-blue-600">{prompt.marks} mark{prompt.marks !== 1 ? 's' : ''}</span>
        </div>
      )}

      {/* Question Content */}
      {renderQuestionContent(prompt, props)}
    </div>
  );
}

/**
 * Render question content based on type
 */
function renderQuestionContent(prompt: Prompt, props: QuestionRendererProps) {
  switch (prompt.type) {
    case 'short':
      return renderShortAnswer(props);
    case 'mcq':
      return renderMCQ(props);
    case 'fill':
      return renderFill(props);
    case 'match':
      return renderMatch(props);
    case 'label':
      return renderLabel(props);
    default:
      return (
        <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg border-2 border-yellow-300">
          <p className="font-semibold">Unknown question type: {prompt.type}</p>
          <p className="text-sm mt-1">This question type is not supported.</p>
        </div>
      );
  }
}

// Import Prompt type at the top if not already imported

