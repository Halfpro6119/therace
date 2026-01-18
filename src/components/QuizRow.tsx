import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { QuizTile } from './QuizTile';
import { Quiz } from '../types';

interface QuizRowProps {
  title: string;
  quizzes: Quiz[];
  onQuizClick: (quiz: Quiz) => void;
}

export function QuizRow({ title, quizzes, onQuizClick }: QuizRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 400;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  if (quizzes.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold" style={{ color: 'rgb(var(--text))' }}>
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-lg hover:bg-opacity-10 transition-colors"
            style={{ color: 'rgb(var(--text))' }}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-lg hover:bg-opacity-10 transition-colors"
            style={{ color: 'rgb(var(--text))' }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="snap-start flex-shrink-0" style={{ width: '280px' }}>
            <QuizTile quiz={quiz} onClick={() => onQuizClick(quiz)} />
          </div>
        ))}
      </div>
    </div>
  );
}
