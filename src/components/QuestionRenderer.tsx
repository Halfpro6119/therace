/**
 * QUESTION RENDERER
 * 
 * Renders different question types with appropriate UI components.
 * Handles all question type rendering in one place for consistency.
 */

import { useState, useCallback } from 'react';
import { Prompt } from '../types';
import { MCQQuestionData, FillQuestionData, MatchQuestionData, LabelQuestionData } from '../types/questionTypes';

interface QuestionRendererProps {
  prompt: Prompt;
  currentInput: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  showFeedback: boolean;
  feedbackMessage?: string;
  isCorrect?: boolean;
}

/**
 * Render SHORT ANSWER question
 */
function renderShortAnswer(props: QuestionRendererProps) {
  return (
    <div className="space-y-4">
      <input
        type="text"
        value={props.currentInput}
        onChange={(e) => props.onInputChange(e.target.value)}
        placeholder="Type your answer..."
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        disabled={props.isSubmitting}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !props.isSubmitting) {
            props.onSubmit();
          }
        }}
      />
      {props.showFeedback && (
        <div className={`p-3 rounded-lg ${props.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {props.feedbackMessage}
        </div>
      )}
    </div>
  );
}

/**
 * Render MCQ question
 */
function renderMCQ(props: QuestionRendererProps) {
  const mcqData = (props.prompt.meta?.questionData || {}) as MCQQuestionData;
  const choices = mcqData.choices || [];

  return (
    <div className="space-y-3">
      {choices.map((choice) => (
        <button
          key={choice.key}
          onClick={() => props.onInputChange(choice.key)}
          disabled={props.isSubmitting}
          className={`w-full p-4 text-left border-2 rounded-lg transition-all ${
            props.currentInput === choice.key
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          } disabled:opacity-50`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              props.currentInput === choice.key ? 'border-blue-500 bg-blue-500' : 'border-gray-400'
            }`}>
              {props.currentInput === choice.key && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
            <span className="font-medium">{choice.key}.</span>
            <span>{choice.text}</span>
          </div>
        </button>
      ))}
      {props.showFeedback && (
        <div className={`p-3 rounded-lg ${props.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {props.feedbackMessage}
        </div>
      )}
    </div>
  );
}

/**
 * Render FILL IN THE BLANKS question
 */
function renderFill(props: QuestionRendererProps) {
  const fillData = (props.prompt.meta?.questionData || {}) as FillQuestionData;
  const blanks = fillData.blanks || 1;
  const answers = Array.isArray(props.currentInput) ? props.currentInput : [props.currentInput];

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {Array.from({ length: blanks }).map((_, idx) => (
          <div key={idx}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blank {idx + 1}
            </label>
            <input
              type="text"
              value={answers[idx] || ''}
              onChange={(e) => {
                const newAnswers = [...answers];
                newAnswers[idx] = e.target.value;
                props.onInputChange(newAnswers);
              }}
              placeholder={`Answer for blank ${idx + 1}`}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              disabled={props.isSubmitting}
            />
          </div>
        ))}
      </div>
      {props.showFeedback && (
        <div className={`p-3 rounded-lg ${props.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {props.feedbackMessage}
        </div>
      )}
    </div>
  );
}

/**
 * Render MATCHING question
 */
function renderMatch(props: QuestionRendererProps) {
  const matchData = (props.prompt.meta?.questionData || {}) as MatchQuestionData;
  const leftItems = matchData.leftItems || [];
  const rightItems = matchData.rightItems || [];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-semibold mb-3 text-gray-700">Left Column</h4>
          <div className="space-y-2">
            {leftItems.map((item) => (
              <div key={item.id} className="p-3 bg-gray-100 rounded-lg">
                {item.text}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-gray-700">Right Column</h4>
          <div className="space-y-2">
            {rightItems.map((item) => (
              <div key={item.id} className="p-3 bg-gray-100 rounded-lg">
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600">
        Matching interface will be implemented with dropdown selectors for each left item.
      </p>
      {props.showFeedback && (
        <div className={`p-3 rounded-lg ${props.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {props.feedbackMessage}
        </div>
      )}
    </div>
  );
}

/**
 * Render LABEL question
 */
function renderLabel(props: QuestionRendererProps) {
  const labelData = (props.prompt.meta?.questionData || {}) as LabelQuestionData;
  const labels = labelData.labels || [];
  const targets = labelData.targets || [];

  return (
    <div className="space-y-4">
      <div className="bg-gray-100 p-6 rounded-lg min-h-64 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Diagram placeholder</p>
          <p className="text-sm text-gray-500">
            {targets.length} target(s) to label with {labels.length} label(s)
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">Available Labels:</p>
        <div className="flex flex-wrap gap-2">
          {labels.map((label) => (
            <span key={label.id} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {label.text}
            </span>
          ))}
        </div>
      </div>
      {props.showFeedback && (
        <div className={`p-3 rounded-lg ${props.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {props.feedbackMessage}
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
        <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg">
          Unknown question type: {prompt.type}
        </div>
      );
  }
}
