/**
 * Paper Selector Component
 * 
 * Reusable dropdown for selecting a paper
 * Used in Prompts, Topics, Units, and Papers tabs
 */

import { useState } from 'react';
import { Paper } from '../../types';
import { ChevronDown } from 'lucide-react';

interface PaperSelectorProps {
  papers: Paper[];
  selectedPaperId: string | null;
  onSelect: (paperId: string | null) => void;
  disabled?: boolean;
  label?: string;
  showNone?: boolean;
}

export function PaperSelector({
  papers,
  selectedPaperId,
  onSelect,
  disabled = false,
  label = 'Paper',
  showNone = true,
}: PaperSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedPaper = papers.find(p => p.id === selectedPaperId);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-between"
      >
        <span>
          {selectedPaper ? `Paper ${selectedPaper.paperNumber}: ${selectedPaper.name}` : 'Select a paper...'}
        </span>
        <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg z-10">
          {showNone && (
            <button
              onClick={() => {
                onSelect(null);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-600"
            >
              None
            </button>
          )}
          
          {papers.map(paper => (
            <button
              key={paper.id}
              onClick={() => {
                onSelect(paper.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-white ${
                selectedPaperId === paper.id ? 'bg-red-50 dark:bg-red-900/20' : ''
              }`}
            >
              <div className="font-medium">Paper {paper.paperNumber}: {paper.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Calculator: {paper.calculatorAllowedDefault ? 'Allowed' : 'Not allowed'}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
