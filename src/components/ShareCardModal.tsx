import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Copy } from 'lucide-react';
import { useRef } from 'react';
import { MasteryChip } from './MasteryChip';
import { MasteryLevel } from '../types';

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    quizTitle: string;
    subjectName: string;
    accuracy: number;
    time: number;
    masteryLevel: MasteryLevel;
    streak: number;
    level: number;
  };
}

export function ShareCardModal({ isOpen, onClose, data }: ShareCardModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopy = () => {
    const text = `🎯 Grade9 Sprint

${data.quizTitle}
📊 ${data.accuracy}% • ⏱️ ${formatTime(data.time)}
🔥 ${data.streak} day streak • ⚡ Level ${data.level}

Sprint to Grade 9!`;

    navigator.clipboard.writeText(text);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ background: 'rgba(0, 0, 0, 0.8)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card p-6 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
                  Share Your Run
                </h3>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-opacity-10 transition-colors"
                  style={{ color: 'rgb(var(--text))' }}
                >
                  <X size={20} />
                </button>
              </div>

              <div
                ref={cardRef}
                className="relative overflow-hidden rounded-2xl p-8 mb-4"
                style={{ background: 'var(--gradient-elite)' }}
              >
                <div className="absolute top-4 right-4">
                  <div className="text-white/80 text-xs font-semibold">GRADE9 SPRINT</div>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="text-white/70 text-sm mb-1">{data.subjectName}</div>
                    <h4 className="text-2xl font-bold text-white mb-3">{data.quizTitle}</h4>
                    <MasteryChip level={data.masteryLevel} size="md" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-white/70 text-xs mb-1">Accuracy</div>
                      <div className="text-3xl font-bold text-white stat-number">
                        {data.accuracy}%
                      </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-white/70 text-xs mb-1">Time</div>
                      <div className="text-3xl font-bold text-white stat-number">
                        {formatTime(data.time)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/20">
                    <div>
                      <div className="text-white/70 text-xs">Streak</div>
                      <div className="text-xl font-bold text-white">{data.streak} days</div>
                    </div>
                    <div>
                      <div className="text-white/70 text-xs">Level</div>
                      <div className="text-xl font-bold text-white">{data.level}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  className="btn-secondary flex-1 flex items-center justify-center gap-2"
                >
                  <Copy size={18} />
                  <span>Copy Stats</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
