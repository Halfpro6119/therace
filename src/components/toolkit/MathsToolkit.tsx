import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard, PenTool, Calculator as CalcIcon } from 'lucide-react';
import { MathsKeyboard } from './MathsKeyboard';
import { DrawingCanvas } from './DrawingCanvas';
import { Calculator } from './Calculator';

type Tab = 'keyboard' | 'draw' | 'calculator';

interface MathsToolkitProps {
  isOpen: boolean;
  onClose: () => void;
  calculatorAllowed: boolean;
  attemptId: string;
  inputRef: React.RefObject<HTMLInputElement>;
  /** When set, switch to this tab when opened (e.g. when user clicks keyboard button) */
  openWithTab?: Tab | null;
  /** Called after openWithTab has been applied, so parent can clear it */
  onOpenWithTabHandled?: () => void;
}

export function MathsToolkit({ isOpen, onClose, calculatorAllowed, attemptId, inputRef, openWithTab, onOpenWithTabHandled }: MathsToolkitProps) {
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    const saved = localStorage.getItem('mathsToolkit_lastTab');
    return (saved as Tab) || 'keyboard';
  });

  useEffect(() => {
    localStorage.setItem('mathsToolkit_lastTab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (isOpen && activeTab === 'calculator' && !calculatorAllowed) {
      setActiveTab('keyboard');
    }
  }, [isOpen, calculatorAllowed, activeTab]);

  useEffect(() => {
    if (isOpen && openWithTab) {
      setActiveTab(openWithTab);
      onOpenWithTabHandled?.();
    }
  }, [isOpen, openWithTab, onOpenWithTabHandled]);

  // Automatically switch to calculator tab when it becomes available (if previously saved as calculator)
  useEffect(() => {
    const savedTab = localStorage.getItem('mathsToolkit_lastTab');
    if (isOpen && calculatorAllowed && savedTab === 'calculator' && activeTab !== 'calculator') {
      setActiveTab('calculator');
    }
  }, [isOpen, calculatorAllowed, activeTab]);

  const tabs = [
    { id: 'keyboard' as Tab, label: 'Keyboard', icon: Keyboard, enabled: true },
    { id: 'draw' as Tab, label: 'Draw', icon: PenTool, enabled: true },
    { id: 'calculator' as Tab, label: 'Calculator', icon: CalcIcon, enabled: calculatorAllowed }
  ];

  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl z-50 max-h-[80vh] flex flex-col"
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
                  Maths Toolkit
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
                {tabs.filter(tab => tab.enabled).map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-hidden">
                {activeTab === 'keyboard' && <MathsKeyboard inputRef={inputRef} />}
                {activeTab === 'draw' && <DrawingCanvas attemptId={attemptId} />}
                {activeTab === 'calculator' && calculatorAllowed && <Calculator inputRef={inputRef} />}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="fixed right-0 top-0 bottom-0 w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col border-l border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
              Maths Toolkit
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {tabs.filter(tab => tab.enabled).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-hidden">
            {activeTab === 'keyboard' && <MathsKeyboard inputRef={inputRef} />}
            {activeTab === 'draw' && <DrawingCanvas attemptId={attemptId} />}
            {activeTab === 'calculator' && calculatorAllowed && <Calculator inputRef={inputRef} />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
