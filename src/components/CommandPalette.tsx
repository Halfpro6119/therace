import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Home, Compass, BookOpen, User, Trophy, Library, X } from 'lucide-react';
import { db } from '../db/client';
import { Subject, Quiz } from '../types';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: any;
  action: () => void;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [allQuizzes, setAllQuizzes] = useState<Quiz[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        const subjectsData = await db.getSubjects();
        setSubjects(subjectsData);

        const quizzes: Quiz[] = [];
        for (const subject of subjectsData) {
          const subjectQuizzes = await db.getQuizzesBySubject(subject.id);
          quizzes.push(...subjectQuizzes);
        }
        setAllQuizzes(quizzes);
      } catch (error) {
        console.error('Failed to load command palette data:', error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setQuery('');
        setSelectedIndex(0);
      }

      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setQuery('');
        setSelectedIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const navigationItems: CommandItem[] = [
    {
      id: 'home',
      label: 'Home',
      description: 'Return to dashboard',
      icon: Home,
      action: () => {
        navigate('/');
        setIsOpen(false);
      }
    },
    {
      id: 'discover',
      label: 'Discover',
      description: 'Browse playlists and featured content',
      icon: Compass,
      action: () => {
        navigate('/discover');
        setIsOpen(false);
      }
    },
    {
      id: 'subjects',
      label: 'Subjects',
      description: 'Browse all subjects',
      icon: BookOpen,
      action: () => {
        navigate('/subjects');
        setIsOpen(false);
      }
    },
    {
      id: 'library',
      label: 'Library',
      description: 'View saved quizzes',
      icon: Library,
      action: () => {
        navigate('/library');
        setIsOpen(false);
      }
    },
    {
      id: 'profile',
      label: 'Profile',
      description: 'View your stats and achievements',
      icon: User,
      action: () => {
        navigate('/profile');
        setIsOpen(false);
      }
    },
    {
      id: 'leaderboard',
      label: 'Leaderboard',
      description: 'See top performers',
      icon: Trophy,
      action: () => {
        navigate('/leaderboard');
        setIsOpen(false);
      }
    },
  ];

  const subjectItems: CommandItem[] = subjects.map(subject => ({
    id: `subject-${subject.id}`,
    label: subject.name,
    description: `Open ${subject.name} subject`,
    icon: BookOpen,
    action: () => {
      navigate(`/subjects/${subject.id}`);
      setIsOpen(false);
    }
  }));

  const quizItems: CommandItem[] = allQuizzes.map(quiz => ({
    id: `quiz-${quiz.id}`,
    label: quiz.title,
    description: quiz.description,
    icon: BookOpen,
    action: () => {
      navigate(`/quiz/${quiz.id}`);
      setIsOpen(false);
    }
  }));

  const filteredItems = useMemo(() => {
    if (!query) {
      return [...navigationItems, ...subjectItems.slice(0, 3)];
    }

    const searchQuery = query.toLowerCase();
    const allItems = [...navigationItems, ...subjectItems, ...quizItems];

    return allItems.filter(item =>
      item.label.toLowerCase().includes(searchQuery) ||
      item.description?.toLowerCase().includes(searchQuery)
    ).slice(0, 8);
  }, [query, navigationItems, subjectItems, quizItems]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, filteredItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      filteredItems[selectedIndex].action();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1400]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />

        <div className="absolute inset-0 flex items-start justify-center pt-[20vh] px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 p-4 border-b">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for pages, subjects, or quizzes..."
                className="flex-1 bg-transparent outline-none text-lg"
                autoFocus
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close"
              >
                <X size={18} className="text-gray-400" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No results found for "{query}"
                </div>
              ) : (
                <div className="p-2">
                  {filteredItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={item.action}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`
                          w-full flex items-center gap-3 p-3 rounded-xl text-left
                          transition-colors
                          ${index === selectedIndex ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}
                        `}
                      >
                        <div className={`p-2 rounded-lg ${index === selectedIndex ? 'bg-blue-100' : 'bg-gray-100'}`}>
                          <Icon size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold truncate">{item.label}</div>
                          {item.description && (
                            <div className="text-sm text-gray-500 truncate">{item.description}</div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between p-3 border-t bg-gray-50 text-xs text-gray-500">
              <div className="flex gap-4">
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white border rounded">↑↓</kbd>
                  <span>Navigate</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white border rounded">Enter</kbd>
                  <span>Select</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-2 py-1 bg-white border rounded">Esc</kbd>
                  <span>Close</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-white border rounded">⌘K</kbd>
                <span>or</span>
                <kbd className="px-2 py-1 bg-white border rounded">Ctrl+K</kbd>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
