import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, Layers } from 'lucide-react';
import { getTopicsBySubject } from '../../config/scienceLabData';
import { storage } from '../../utils/storage';
import type { ScienceSubject, SciencePaper, ScienceTier } from '../../types/scienceLab';

export function ScienceLabTopicsPage() {
  const navigate = useNavigate();
  const { subject, paper, tier } = useParams<{ subject: string; paper: string; tier: string }>();

  const subjectId = subject?.toLowerCase() as ScienceSubject | undefined;
  const paperNum = paper ? parseInt(paper) as SciencePaper : 1;
  const tierValue = tier ? tier.charAt(0).toUpperCase() + tier.slice(1) as ScienceTier : 'Higher';

  if (!subjectId || !['biology', 'chemistry', 'physics'].includes(subject.toLowerCase())) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p>Invalid subject. Please select Biology, Chemistry, or Physics.</p>
        <button type="button" onClick={() => navigate('/science-lab')}>Go Back</button>
      </div>
    );
  }

  const normalizedSubject: ScienceSubject = subjectId.charAt(0).toUpperCase() + subjectId.slice(1) as ScienceSubject;
  const topics = getTopicsBySubject(normalizedSubject);
  const subjectTitle = normalizedSubject;

  const getTopicProgress = (topic: string) => {
    const m = storage.getTopicMasteryByKey(normalizedSubject, paperNum, tierValue, topic);
    return { mastery: m?.flashcardMastery || 0, unlocked: m?.quizUnlocked || false };
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #10B981 0%, #3B82F6 50%, #8B5CF6 100%)',
          borderColor: 'transparent',
        }}
      >
        <button
          type="button"
          onClick={() => navigate(`/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}`)}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Lab Modes
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Topic Map — {subjectTitle}</h1>
        <p className="text-white/90 text-sm sm:text-base">
          Browse by topic or work on all topics. Paper {paperNum} • {tierValue}
        </p>
      </motion.section>

      {/* Work on all topics */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <button
          type="button"
          onClick={() => navigate(`/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}`)}
          className="w-full rounded-xl p-6 text-left border shadow-sm hover:shadow-md transition-all flex items-center justify-between"
          style={{
            background: 'rgb(var(--surface))',
            borderColor: 'rgb(var(--border))',
          }}
        >
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-green-500 to-blue-500">
              <Layers size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold mb-1" style={{ color: 'rgb(var(--text))' }}>
                Work on All Topics
              </h2>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                Access all lab modes without filtering by topic
              </p>
            </div>
          </div>
          <ChevronRight size={24} style={{ color: 'rgb(var(--text-secondary))' }} />
        </button>
      </motion.section>

      {/* Topic list */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
          <BookOpen size={20} style={{ color: '#0EA5E9' }} />
          Browse by Topic
        </h2>
        <div className="space-y-3">
          {topics.map((topic, index) => {
            const progress = getTopicProgress(topic);
            return (
              <motion.button
                key={topic}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.03 }}
                onClick={() => {
                  const base = `/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}`;
                  navigate(`${base}?topic=${encodeURIComponent(topic)}`);
                }}
                className="w-full rounded-xl p-5 text-left border shadow-sm hover:shadow-md transition-all"
                style={{
                  background: 'rgb(var(--surface))',
                  borderColor: 'rgb(var(--border))',
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold mb-1" style={{ color: 'rgb(var(--text))' }}>
                      {topic}
                    </h3>
                    <div className="flex items-center gap-3 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                      <span>{progress.mastery}% flashcard mastery</span>
                      {progress.unlocked && (
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-green-500/20 text-green-700 dark:text-green-400">
                          Quiz unlocked
                        </span>
                      )}
                    </div>
                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 max-w-[200px]">
                      <div
                        className="h-1.5 rounded-full transition-all bg-blue-500"
                        style={{ width: `${Math.min(progress.mastery, 100)}%` }}
                      />
                    </div>
                  </div>
                  <ChevronRight size={20} style={{ color: 'rgb(var(--text-secondary))' }} />
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
