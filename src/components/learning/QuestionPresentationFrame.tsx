/**
 * Question Presentation Framework – consistent exam-style layout across all subjects
 * Design Plan §2: question number, marks, command word, stimulus above line, answer below
 * Dual coding built-in: text + image side-by-side; labels on diagram
 */
import React from 'react';

export interface CommandWord {
  word: string;
  definition: string;
  example?: string;
}

const COMMAND_WORDS: Record<string, CommandWord> = {
  describe: { word: 'Describe', definition: 'Give a detailed account', example: 'Describe the process of photosynthesis.' },
  explain: { word: 'Explain', definition: 'Give reasons or causes', example: 'Explain why the rate increases.' },
  evaluate: { word: 'Evaluate', definition: 'Judge the strength of arguments; give a conclusion', example: 'Evaluate the effectiveness of...' },
  assess: { word: 'Assess', definition: 'Weigh up; judge the importance', example: 'Assess the impact of...' },
  compare: { word: 'Compare', definition: 'Identify similarities and differences', example: 'Compare X and Y.' },
  contrast: { word: 'Contrast', definition: 'Identify differences', example: 'Contrast the two methods.' },
  suggest: { word: 'Suggest', definition: 'Propose an idea (may be tentative)', example: 'Suggest one reason...' },
  calculate: { word: 'Calculate', definition: 'Work out a numerical answer', example: 'Calculate the gradient.' },
  state: { word: 'State', definition: 'Give a brief answer', example: 'State the equation.' },
  identify: { word: 'Identify', definition: 'Name or pick out', example: 'Identify the dependent variable.' },
  outline: { word: 'Outline', definition: 'Give main points briefly', example: 'Outline the stages.' },
  discuss: { word: 'Discuss', definition: 'Present different views; reach a conclusion', example: 'Discuss whether...' },
  to_what_extent: { word: 'To what extent', definition: 'Judge how far something is true', example: 'To what extent do you agree?' },
};

export interface QuestionPresentationFrameProps {
  /** Question number (e.g. 1, 2a, 3) */
  questionNumber: string | number;
  /** Marks available */
  marks: number;
  /** Command word(s) to highlight – e.g. "Evaluate", "Explain" */
  commandWord?: string;
  /** Stimulus: text, diagram, or both (rendered above the line) */
  stimulus?: React.ReactNode;
  /** Optional diagram (shown side-by-side with text when both present) */
  diagram?: React.ReactNode;
  /** Answer area (input, textarea, etc.) */
  children: React.ReactNode;
  /** Optional hint for "I'm stuck" */
  hint?: string;
  /** Callback when "I'm stuck" is clicked */
  onStuck?: () => void;
  /** Show mark allocation prominently */
  showMarks?: boolean;
  /** Accessibility: font size class */
  fontSize?: 'base' | 'lg';
  /** High contrast mode */
  highContrast?: boolean;
}

export function QuestionPresentationFrame({
  questionNumber,
  marks,
  commandWord,
  stimulus,
  diagram,
  children,
  hint,
  onStuck,
  showMarks = true,
  fontSize = 'base',
  highContrast = false,
}: QuestionPresentationFrameProps) {
  const cmd = commandWord ? COMMAND_WORDS[commandWord.toLowerCase().replace(/\s+/g, '_')] ?? { word: commandWord, definition: '' } : null;

  return (
    <div
      className={`rounded-xl border overflow-hidden ${fontSize === 'lg' ? 'text-lg' : ''}`}
      style={{
        background: highContrast ? 'rgb(var(--surface))' : 'rgb(var(--surface))',
        borderColor: 'rgb(var(--border))',
      }}
    >
      {/* Header: question number + marks */}
      <div className="flex justify-between items-center px-4 py-3 border-b" style={{ borderColor: 'rgb(var(--border))' }}>
        <span className="font-bold" style={{ color: 'rgb(var(--text))' }}>
          Question {questionNumber}
        </span>
        {showMarks && (
          <span className="text-sm font-medium px-2 py-0.5 rounded" style={{ background: 'rgb(var(--accent) / 0.15)', color: 'rgb(var(--accent))' }}>
            {marks} mark{marks !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Stimulus: text + diagram (dual coding: side-by-side when both) */}
      {(stimulus || diagram) && (
        <div className={`p-4 ${stimulus && diagram ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : ''}`} style={{ background: 'rgb(var(--surface-2) / 0.5)' }}>
          {stimulus && (
            <div className="prose prose-sm max-w-none" style={{ color: 'rgb(var(--text))' }}>
              {stimulus}
            </div>
          )}
          {diagram && (
            <div className="flex items-center justify-center min-h-[120px]">
              {diagram}
            </div>
          )}
        </div>
      )}

      {/* Command word hint (hover/tap) */}
      {cmd && (
        <div className="px-4 py-2 border-b flex items-center gap-2" style={{ borderColor: 'rgb(var(--border))' }}>
          <span className="font-medium" style={{ color: 'rgb(var(--accent))' }}>{cmd.word}</span>
          <span className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>— {cmd.definition}</span>
        </div>
      )}

      {/* Answer area */}
      <div className="p-4">
        {children}
      </div>

      {/* I'm stuck */}
      {onStuck && (
        <div className="px-4 pb-4">
          <button
            type="button"
            onClick={onStuck}
            className="text-sm font-medium hover:underline"
            style={{ color: 'rgb(var(--text-secondary))' }}
          >
            I'm stuck
          </button>
          {hint && (
            <p className="mt-1 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              {hint}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
