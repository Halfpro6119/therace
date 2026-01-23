/**
 * QUESTION CREATOR FORM
 * 
 * Dynamic form for creating questions with type-specific inputs.
 * Shows different fields based on selected question type.
 */

import { useState } from 'react';
import { QuestionType, MCQChoice, MatchItem, LabelBank, LabelTarget } from '../../../types/questionTypes';
import { Plus, Trash2, Eye } from 'lucide-react';

interface QuestionCreatorFormProps {
  onSave: (questionData: any) => void;
  isLoading?: boolean;
}

export function QuestionCreatorForm({ onSave, isLoading = false }: QuestionCreatorFormProps) {
  // Base fields
  const [type, setType] = useState<QuestionType>('short');
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState<string[]>(['']);
  const [hint, setHint] = useState('');
  const [explanation, setExplanation] = useState('');
  const [tier, setTier] = useState<'higher' | 'foundation' | null>(null);
  const [calculatorAllowed, setCalculatorAllowed] = useState(false);

  // MCQ specific
  const [mcqChoices, setMcqChoices] = useState<MCQChoice[]>([
    { key: 'A', text: '' },
    { key: 'B', text: '' },
    { key: 'C', text: '' },
    { key: 'D', text: '' },
  ]);
  const [mcqCorrectKey, setMcqCorrectKey] = useState('A');

  // FILL specific
  const [fillBlanks, setFillBlanks] = useState(1);

  // MATCH specific
  const [matchLeft, setMatchLeft] = useState<MatchItem[]>([
    { id: '1', text: '' },
    { id: '2', text: '' },
  ]);
  const [matchRight, setMatchRight] = useState<MatchItem[]>([
    { id: 'A', text: '' },
    { id: 'B', text: '' },
  ]);

  // LABEL specific
  const [labelLabels, setLabelLabels] = useState<LabelBank[]>([
    { id: 'L1', text: '' },
  ]);
  const [labelTargets, setLabelTargets] = useState<LabelTarget[]>([
    { id: 'T1', x: 50, y: 50 },
  ]);

  // Preview
  const [showPreview, setShowPreview] = useState(false);

  const handleSave = () => {
    // Validate base fields
    if (!question.trim()) {
      alert('Question text is required');
      return;
    }

    // Build question data based on type
    let questionData: any = {
      type,
      question,
      hint,
      explanation,
      tier,
      calculatorAllowed,
    };

    // Type-specific validation and data
    switch (type) {
      case 'short':
        if (answers.filter(a => a.trim()).length === 0) {
          alert('At least one answer is required');
          return;
        }
        questionData.answers = answers.filter(a => a.trim());
        break;

      case 'mcq':
        const validChoices = mcqChoices.filter(c => c.text.trim());
        if (validChoices.length < 2) {
          alert('At least 2 choices are required');
          return;
        }
        questionData.mcqChoices = validChoices;
        questionData.mcqCorrectKey = mcqCorrectKey;
        questionData.answers = [mcqCorrectKey];
        break;

      case 'fill':
        if (fillBlanks < 1) {
          alert('Number of blanks must be at least 1');
          return;
        }
        questionData.fillBlanks = fillBlanks;
        questionData.answers = Array(fillBlanks).fill('');
        break;

      case 'match':
        const validLeft = matchLeft.filter(m => m.text.trim());
        const validRight = matchRight.filter(m => m.text.trim());
        if (validLeft.length === 0 || validRight.length === 0) {
          alert('Both left and right columns need at least one item');
          return;
        }
        questionData.matchLeft = validLeft;
        questionData.matchRight = validRight;
        questionData.answers = ['1A,2B']; // Placeholder
        break;

      case 'label':
        const validLabels = labelLabels.filter(l => l.text.trim());
        const validTargets = labelTargets.filter(t => t.id && (t.x !== undefined && t.y !== undefined));
        if (validLabels.length === 0 || validTargets.length === 0) {
          alert('Both labels and targets are required');
          return;
        }
        questionData.labelLabels = validLabels;
        questionData.labelTargets = validTargets;
        questionData.answers = ['{}'];
        break;
    }

    onSave(questionData);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg border border-gray-200">
      {/* Type Selector */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Question Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as QuestionType)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="short">📝 Short Answer</option>
          <option value="mcq">⭕ Multiple Choice</option>
          <option value="fill">✏️ Fill in the Blanks</option>
          <option value="match">🔗 Matching</option>
          <option value="label">🏷️ Labeling</option>
        </select>
      </div>

      {/* Base Fields */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Question Text *
        </label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter the question..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-24"
        />
      </div>

      {/* Type-Specific Fields */}
      {type === 'short' && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Accepted Answers
          </label>
          <div className="space-y-2">
            {answers.map((answer, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[idx] = e.target.value;
                    setAnswers(newAnswers);
                  }}
                  placeholder={`Answer ${idx + 1}`}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                {answers.length > 1 && (
                  <button
                    onClick={() => setAnswers(answers.filter((_, i) => i !== idx))}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() => setAnswers([...answers, ''])}
              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <Plus size={18} /> Add Answer
            </button>
          </div>
        </div>
      )}

      {type === 'mcq' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Choices
            </label>
            <div className="space-y-2">
              {mcqChoices.map((choice, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <span className="font-semibold text-gray-600 w-8">{choice.key}.</span>
                  <input
                    type="text"
                    value={choice.text}
                    onChange={(e) => {
                      const newChoices = [...mcqChoices];
                      newChoices[idx].text = e.target.value;
                      setMcqChoices(newChoices);
                    }}
                    placeholder={`Choice ${choice.key}`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  {mcqChoices.length > 2 && (
                    <button
                      onClick={() => setMcqChoices(mcqChoices.filter((_, i) => i !== idx))}
                      className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Correct Answer
            </label>
            <select
              value={mcqCorrectKey}
              onChange={(e) => setMcqCorrectKey(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            >
              {mcqChoices.map((choice) => (
                <option key={choice.key} value={choice.key}>
                  {choice.key}. {choice.text}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {type === 'fill' && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Blanks
          </label>
          <input
            type="number"
            min="1"
            value={fillBlanks}
            onChange={(e) => setFillBlanks(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
          <p className="text-sm text-gray-600 mt-2">
            Question should contain {fillBlanks} blank(s) marked with underscores or similar
          </p>
        </div>
      )}

      {type === 'match' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Left Column Items
            </label>
            <div className="space-y-2">
              {matchLeft.map((item, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={item.text}
                  onChange={(e) => {
                    const newLeft = [...matchLeft];
                    newLeft[idx].text = e.target.value;
                    setMatchLeft(newLeft);
                  }}
                  placeholder={`Item ${idx + 1}`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              ))}
              <button
                onClick={() => setMatchLeft([...matchLeft, { id: String(matchLeft.length + 1), text: '' }])}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg w-full"
              >
                <Plus size={18} /> Add Item
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Right Column Items
            </label>
            <div className="space-y-2">
              {matchRight.map((item, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={item.text}
                  onChange={(e) => {
                    const newRight = [...matchRight];
                    newRight[idx].text = e.target.value;
                    setMatchRight(newRight);
                  }}
                  placeholder={`Item ${String.fromCharCode(65 + idx)}`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              ))}
              <button
                onClick={() => setMatchRight([...matchRight, { id: String.fromCharCode(65 + matchRight.length), text: '' }])}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg w-full"
              >
                <Plus size={18} /> Add Item
              </button>
            </div>
          </div>
        </div>
      )}

      {type === 'label' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Labels
            </label>
            <div className="space-y-2">
              {labelLabels.map((label, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={label.text}
                  onChange={(e) => {
                    const newLabels = [...labelLabels];
                    newLabels[idx].text = e.target.value;
                    setLabelLabels(newLabels);
                  }}
                  placeholder={`Label ${idx + 1}`}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              ))}
              <button
                onClick={() => setLabelLabels([...labelLabels, { id: `L${labelLabels.length + 1}`, text: '' }])}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg w-full"
              >
                <Plus size={18} /> Add Label
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Target Positions
            </label>
            <p className="text-sm text-gray-600 mb-2">
              Define where labels should be placed (0-100 for x and y coordinates)
            </p>
            <div className="space-y-2">
              {labelTargets.map((target, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={target.x}
                    onChange={(e) => {
                      const newTargets = [...labelTargets];
                      newTargets[idx].x = parseInt(e.target.value) || 0;
                      setLabelTargets(newTargets);
                    }}
                    placeholder="X"
                    className="w-16 px-2 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={target.y}
                    onChange={(e) => {
                      const newTargets = [...labelTargets];
                      newTargets[idx].y = parseInt(e.target.value) || 0;
                      setLabelTargets(newTargets);
                    }}
                    placeholder="Y"
                    className="w-16 px-2 py-2 border border-gray-300 rounded-lg"
                  />
                  <span className="text-sm text-gray-600">Target {idx + 1}</span>
                </div>
              ))}
              <button
                onClick={() => setLabelTargets([...labelTargets, { id: `T${labelTargets.length + 1}`, x: 50, y: 50 }])}
                className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg w-full"
              >
                <Plus size={18} /> Add Target
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Common Optional Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Hint (Optional)
          </label>
          <input
            type="text"
            value={hint}
            onChange={(e) => setHint(e.target.value)}
            placeholder="Helpful hint..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Tier
          </label>
          <select
            value={tier || ''}
            onChange={(e) => setTier((e.target.value as any) || null)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">All Tiers</option>
            <option value="higher">Higher Tier</option>
            <option value="foundation">Foundation Tier</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Explanation (Optional)
        </label>
        <textarea
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          placeholder="Detailed explanation of the answer..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg min-h-20"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="calculator"
          checked={calculatorAllowed}
          onChange={(e) => setCalculatorAllowed(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="calculator" className="text-sm text-gray-700">
          Calculator Allowed
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <button
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <Eye size={18} />
          {showPreview ? 'Hide' : 'Show'} Preview
        </button>

        <button
          onClick={handleSave}
          disabled={isLoading}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save Question'}
        </button>
      </div>

      {/* Preview Panel */}
      {showPreview && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-gray-700 mb-3">Preview</h3>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="font-semibold text-gray-800 mb-4">{question || '(Question text)'}</p>
            <p className="text-sm text-gray-600">
              Type: <span className="font-semibold">{type}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
