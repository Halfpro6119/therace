import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, BookOpen, Layers, FileQuestion, ClipboardList, ArrowRight } from 'lucide-react';
import { getQuestionsByFilters } from '../../config/scienceLabData';
import { getTopicsByPaperAndTier, getDueFlashcardCount } from '../../config/scienceLabFlashcards';
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
  const topics = getTopicsByPaperAndTier(normalizedSubject, paperNum, tierValue);
  const subjectTitle = normalizedSubject;

  const base = `/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}`;

  const mastery = storage.getFlashcardMastery();
  const getTopicProgress = (topic: string) => {
    const m = storage.getTopicMasteryByKey(normalizedSubject, paperNum, tierValue, topic);
    const dueCount = getDueFlashcardCount(normalizedSubject, paperNum, tierValue, topic, mastery);
    return {
      mastery: m?.flashcardMastery || 0,
      unlocked: m?.quizUnlocked || false,
      topicTestCompleted: m?.topicTestCompleted || false,
      topicTestScore: m?.topicTestScore,
      dueCount,
    };
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
          Browse by topic or jump straight into a test. Paper {paperNum} • {tierValue}
        </p>
      </motion.section>

      {/* Start topic test – direct entry */}
      {(() => {
        const questions = getQuestionsByFilters(normalizedSubject, paperNum, tierValue);
        const topicsWithQuestions = [...new Set(questions.map((q) => q.topic))];
        // Past-paper first: recommend first topic without completed topic test (no flashcard unlock required)
        const firstIncomplete = topicsWithQuestions.find((topic) => {
          const m = storage.getTopicMasteryByKey(normalizedSubject, paperNum, tierValue, topic);
          return !m?.topicTestCompleted;
        });
        const recommendedTopic = firstIncomplete ?? topicsWithQuestions[0];
        if (topicsWithQuestions.length === 0) return null;
        return (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.02 }}
        >
          <button
            type="button"
            onClick={() => navigate(`${base}/topic-test${recommendedTopic ? `?topic=${encodeURIComponent(recommendedTopic)}` : ''}`)}
            className="w-full rounded-xl p-6 text-left border shadow-sm hover:shadow-md transition-all flex items-center justify-between"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
              borderColor: 'transparent',
              color: 'white',
            }}
          >
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-xl bg-white/20">
                <FileQuestion size={28} className="text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold mb-1">
                  Start topic test (past-paper style)
                </h2>
                <p className="text-sm text-white/90">
                  {recommendedTopic ? `Get an accurate grade — ${recommendedTopic}` : 'Pick a topic and test'}
                </p>
              </div>
            </div>
            <ArrowRight size={24} />
          </button>
        </motion.section>
        );
      })()}

      {/* Full GCSE test – all topics */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
      >
        <button
          type="button"
          onClick={() => navigate(`/science-lab/${subject?.toLowerCase()}/${paperNum}/${tierValue.toLowerCase()}/full-gcse`)}
          className="w-full rounded-xl p-6 text-left border shadow-sm hover:shadow-md transition-all flex items-center justify-between"
          style={{
            background: 'rgb(var(--surface))',
            borderColor: 'rgb(var(--border))',
          }}
        >
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500">
              <FileQuestion size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold mb-1" style={{ color: 'rgb(var(--text))' }}>
                Full GCSE test
              </h2>
              <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                Test the entire subject – all topics for this paper and tier
              </p>
            </div>
          </div>
          <ChevronRight size={24} style={{ color: 'rgb(var(--text-secondary))' }} />
        </button>
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
              <motion.div
                key={topic}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.03 }}
                className="rounded-xl p-5 border shadow-sm"
                style={{
                  background: 'rgb(var(--surface))',
                  borderColor: 'rgb(var(--border))',
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => navigate(`${base}?topic=${encodeURIComponent(topic)}`)}
                    className="flex-1 min-w-0 text-left"
                  >
                    <h3 className="text-base font-bold mb-1" style={{ color: 'rgb(var(--text))' }}>
                      {topic}
                    </h3>
                    <div className="flex items-center gap-3 text-sm flex-wrap" style={{ color: 'rgb(var(--text-secondary))' }}>
                      <span>{progress.mastery}% flashcard mastery</span>
                      {progress.dueCount > 0 && (
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-amber-500/20 text-amber-700 dark:text-amber-400">
                          {progress.dueCount} card{progress.dueCount !== 1 ? 's' : ''} due
                        </span>
                      )}
                      {progress.unlocked && (
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-green-500/20 text-green-700 dark:text-green-400">
                          Quiz unlocked
                        </span>
                      )}
                      {progress.topicTestCompleted && progress.topicTestScore != null && (
                        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-purple-500/20 text-purple-700 dark:text-purple-400">
                          Topic test: {progress.topicTestScore}%
                        </span>
                      )}
                    </div>
                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 max-w-[200px]">
                      <div
                        className="h-1.5 rounded-full transition-all bg-blue-500"
                        style={{ width: `${Math.min(progress.mastery, 100)}%` }}
                      />
                    </div>
                  </button>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`${base}/flashcard?topic=${encodeURIComponent(topic)}`);
                      }}
                      className="px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition hover:opacity-90 border"
                      style={{
                        background: progress.dueCount > 0 ? 'rgba(14, 165, 233, 0.15)' : 'rgb(var(--surface-2))',
                        borderColor: progress.dueCount > 0 ? 'rgb(14, 165, 233)' : 'rgb(var(--border))',
                        color: progress.dueCount > 0 ? 'rgb(14, 165, 233)' : 'rgb(var(--text))',
                      }}
                      title="Learn (flashcards)"
                    >
                      <BookOpen size={14} />
                      Learn
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`${base}/methodMark?topic=${encodeURIComponent(topic)}`);
                      }}
                      className="px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition hover:opacity-90 border"
                      style={{
                        background: 'rgb(var(--surface-2))',
                        borderColor: 'rgb(var(--border))',
                        color: 'rgb(var(--text))',
                      }}
                      title="Bigger tests (4–6 mark)"
                    >
                      <ClipboardList size={14} />
                      Bigger tests
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`${base}/topic-test?topic=${encodeURIComponent(topic)}`);
                      }}
                      className="px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition hover:opacity-90"
                      style={{ background: '#8B5CF6', color: 'white' }}
                    >
                      <FileQuestion size={16} />
                      Topic test
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
