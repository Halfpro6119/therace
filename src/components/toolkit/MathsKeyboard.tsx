import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface MathsKeyboardProps {
  inputRef: React.RefObject<HTMLInputElement>;
}

interface SymbolGroup {
  name: string;
  symbols: string[];
}

const symbolGroups: SymbolGroup[] = [
  {
    name: 'Basic',
    symbols: ['+', '−', '×', '÷', '=', '≠', '<', '>', '≤', '≥']
  },
  {
    name: 'Powers/Roots',
    symbols: ['²', '³', '^', '√', '∛']
  },
  {
    name: 'Fractions',
    symbols: ['/', '⁄']
  },
  {
    name: 'Algebra',
    symbols: ['x', 'y', 'a', 'b', 'n', 'π']
  },
  {
    name: 'Brackets',
    symbols: ['(', ')', '[', ']', '{', '}']
  },
  {
    name: 'Geometry',
    symbols: ['°', '∠', 'sin', 'cos', 'tan']
  },
  {
    name: 'Sets',
    symbols: ['∈', '∅', '∪', '∩']
  },
  {
    name: 'Other',
    symbols: ['±', '∞', '≈', '∝']
  }
];

const templates = [
  { label: '( )', value: '()', cursorOffset: -1 },
  { label: '√( )', value: '√()', cursorOffset: -1 },
  { label: '( )²', value: '()²', cursorOffset: -2 },
  { label: 'x^', value: 'x^', cursorOffset: 0 }
];

export function MathsKeyboard({ inputRef }: MathsKeyboardProps) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('mathsKeyboard_favorites');
    return saved ? JSON.parse(saved) : ['π', '²', '√', '×', '÷', '≠'];
  });

  useEffect(() => {
    localStorage.setItem('mathsKeyboard_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const insertAtCursor = (text: string, cursorOffset = 0) => {
    const input = inputRef.current;
    if (!input) return;

    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const currentValue = input.value;

    const newValue = currentValue.substring(0, start) + text + currentValue.substring(end);

    // Use native setter to update value and trigger React's onChange
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
    nativeInputValueSetter?.call(input, newValue);

    // Dispatch a proper input event that React will recognize
    const event = new Event('input', { bubbles: true, cancelable: true });
    input.dispatchEvent(event);

    // Set cursor position after a brief delay to ensure React has updated
    const newCursorPos = start + text.length + cursorOffset;
    setTimeout(() => {
      input.focus();
      input.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleSymbolClick = (symbol: string) => {
    insertAtCursor(symbol);
  };

  const handleTemplateClick = (template: typeof templates[0]) => {
    insertAtCursor(template.value, template.cursorOffset);
  };

  const handleBackspace = () => {
    const input = inputRef.current;
    if (!input) return;

    const start = input.selectionStart || 0;
    const end = input.selectionEnd || 0;
    const currentValue = input.value;

    let newValue = currentValue;
    let newCursorPos = start;

    if (start !== end) {
      newValue = currentValue.substring(0, start) + currentValue.substring(end);
      newCursorPos = start;
    } else if (start > 0) {
      newValue = currentValue.substring(0, start - 1) + currentValue.substring(start);
      newCursorPos = start - 1;
    }

    // Use native setter
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
    nativeInputValueSetter?.call(input, newValue);

    const event = new Event('input', { bubbles: true, cancelable: true });
    input.dispatchEvent(event);

    setTimeout(() => {
      input.focus();
      input.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  const handleClear = () => {
    const input = inputRef.current;
    if (!input) return;

    // Use native setter
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
    nativeInputValueSetter?.call(input, '');

    const event = new Event('input', { bubbles: true, cancelable: true });
    input.dispatchEvent(event);

    setTimeout(() => {
      input.focus();
    }, 0);
  };

  const toggleFavorite = (symbol: string) => {
    setFavorites(prev => {
      if (prev.includes(symbol)) {
        return prev.filter(s => s !== symbol);
      } else {
        return [...prev, symbol];
      }
    });
  };

  return (
    <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
      {favorites.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1">
            <Star className="w-3 h-3" />
            Favorites
          </h3>
          <div className="grid grid-cols-6 gap-2">
            {favorites.map(symbol => (
              <button
                key={symbol}
                onClick={() => handleSymbolClick(symbol)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  toggleFavorite(symbol);
                }}
                className="kbd-key text-lg"
                title="Right-click to remove from favorites"
              >
                {symbol}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Templates
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {templates.map(template => (
            <button
              key={template.label}
              onClick={() => handleTemplateClick(template)}
              className="kbd-key text-sm font-mono"
            >
              {template.label}
            </button>
          ))}
        </div>
      </div>

      {symbolGroups.map(group => (
        <div key={group.name} className="space-y-2">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {group.name}
          </h3>
          <div className="grid grid-cols-6 gap-2">
            {group.symbols.map(symbol => {
              const isFavorite = favorites.includes(symbol);
              return (
                <button
                  key={symbol}
                  onClick={() => handleSymbolClick(symbol)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    toggleFavorite(symbol);
                  }}
                  className={`kbd-key text-lg relative ${isFavorite ? 'ring-2 ring-yellow-400' : ''}`}
                  title="Right-click to add to favorites"
                >
                  {symbol}
                  {isFavorite && (
                    <Star className="w-3 h-3 absolute top-0.5 right-0.5 text-yellow-500 fill-yellow-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleBackspace}
          className="kbd-key-action"
        >
          ← Backspace
        </button>
        <button
          onClick={handleClear}
          className="kbd-key-action"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
