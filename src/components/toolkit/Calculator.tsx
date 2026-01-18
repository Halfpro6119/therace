import { useState } from 'react';
import { ArrowUpToLine, Delete } from 'lucide-react';

interface CalculatorProps {
  inputRef: React.RefObject<HTMLInputElement>;
}

export function Calculator({ inputRef }: CalculatorProps) {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [lastResult, setLastResult] = useState<number | null>(null);

  const handleNumber = (num: string) => {
    if (display === '0' || display === 'Error') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperator = (op: string) => {
    if (display === 'Error') {
      setDisplay('0');
      setExpression('');
      return;
    }

    setExpression(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
    setLastResult(null);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleEquals = () => {
    try {
      const fullExpression = expression + display;
      const sanitized = fullExpression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**')
        .replace(/π/g, Math.PI.toString());

      const result = eval(sanitized);
      setDisplay(result.toString());
      setExpression('');
      setLastResult(result);
    } catch (error) {
      setDisplay('Error');
      setExpression('');
    }
  };

  const handleFunction = (fn: string) => {
    try {
      const num = parseFloat(display);
      let result: number;

      switch (fn) {
        case '√':
          result = Math.sqrt(num);
          break;
        case 'x²':
          result = num * num;
          break;
        case '±':
          result = -num;
          break;
        case '%':
          result = num / 100;
          break;
        case 'π':
          result = Math.PI;
          break;
        default:
          return;
      }

      setDisplay(result.toString());
      setLastResult(result);
    } catch (error) {
      setDisplay('Error');
    }
  };

  const handlePower = () => {
    setExpression(display + ' ^ ');
    setDisplay('0');
  };

  const insertResult = () => {
    const input = inputRef.current;
    if (!input || display === 'Error') return;

    // Use the insertTextAtCursor function attached to the input by QuizPlayerPage
    const insertTextAtCursor = (input as any).insertTextAtCursor;
    if (typeof insertTextAtCursor === 'function') {
      insertTextAtCursor(display);
    } else {
      console.error('insertTextAtCursor function not found on input element');
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-full">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-green-700 dark:text-green-400">Calculator Allowed</span>
        </div>
      </div>

      <div className="calc-display">
        {expression && (
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            {expression}
          </div>
        )}
        <div className="text-3xl font-bold">{display}</div>
      </div>

      {lastResult !== null && display !== 'Error' && (
        <button
          onClick={insertResult}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
        >
          <ArrowUpToLine className="w-4 h-4" />
          Insert Result into Answer
        </button>
      )}

      <div className="grid grid-cols-4 gap-2">
        <button onClick={handleClear} className="calc-btn-clear">C</button>
        <button onClick={handleBackspace} className="calc-btn-function">
          <Delete className="w-5 h-5 mx-auto" />
        </button>
        <button onClick={() => handleFunction('%')} className="calc-btn-function">%</button>
        <button onClick={() => handleOperator('÷')} className="calc-btn-operator">÷</button>

        <button onClick={() => handleNumber('7')} className="calc-btn">7</button>
        <button onClick={() => handleNumber('8')} className="calc-btn">8</button>
        <button onClick={() => handleNumber('9')} className="calc-btn">9</button>
        <button onClick={() => handleOperator('×')} className="calc-btn-operator">×</button>

        <button onClick={() => handleNumber('4')} className="calc-btn">4</button>
        <button onClick={() => handleNumber('5')} className="calc-btn">5</button>
        <button onClick={() => handleNumber('6')} className="calc-btn">6</button>
        <button onClick={() => handleOperator('-')} className="calc-btn-operator">−</button>

        <button onClick={() => handleNumber('1')} className="calc-btn">1</button>
        <button onClick={() => handleNumber('2')} className="calc-btn">2</button>
        <button onClick={() => handleNumber('3')} className="calc-btn">3</button>
        <button onClick={() => handleOperator('+')} className="calc-btn-operator">+</button>

        <button onClick={() => handleFunction('±')} className="calc-btn-function">±</button>
        <button onClick={() => handleNumber('0')} className="calc-btn">0</button>
        <button onClick={handleDecimal} className="calc-btn">.</button>
        <button onClick={handleEquals} className="calc-btn-equals">=</button>
      </div>

      <div className="grid grid-cols-4 gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
        <button onClick={() => handleFunction('√')} className="calc-btn-function">√</button>
        <button onClick={() => handleFunction('x²')} className="calc-btn-function">x²</button>
        <button onClick={handlePower} className="calc-btn-function">x^y</button>
        <button onClick={() => handleFunction('π')} className="calc-btn-function">π</button>
      </div>
    </div>
  );
}
