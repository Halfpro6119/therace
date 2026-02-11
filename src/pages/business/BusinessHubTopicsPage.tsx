import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, BookOpen, Target, Lightbulb } from 'lucide-react';
import { getUnitById } from '../../config/businessHubData';
import { storage } from '../../utils/storage';
import type { BusinessUnitId } from '../../types/businessHub';

const HERO_GRADIENT = 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)';

export function BusinessHubTopicsPage() {
  const navigate = useNavigate();
  const { unitId } = useParams<{ unitId: string }>();
  const unit = unitId ? getUnitById(unitId as BusinessUnitId) : undefined;

  if (!unit) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p style={{ color: 'rgb(var(--text))' }}>Unit not found.</p>
        <button
          type="button"
          onClick={() => navigate('/business-hub')}
          className="mt-4 text-sm font-medium"
          style={{ color: 'rgb(var(--primary))' }}
        >
          Back to Business Hub
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{ background: HERO_GRADIENT, borderColor: 'transparent' }}
      >
        <button
          type="button"
          onClick={() => navigate(`/business-hub/unit/${unit.id}`)}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Unit {unit.id}
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Topics – Unit {unit.id}</h1>
        <p className="text-white/90 text-sm sm:text-base">
          {unit.title}
        </p>
      </motion.section>

      <section className="space-y-3">
        {unit.topics.map((topic, index) => {
          const progress = storage.getBusinessTopicProgressByKey(unit.id, topic.id);
          const flashcardPct = progress?.flashcardMasteryPercent ?? 0;
          const quickCheckPassed = progress?.quickCheckPassed ?? false;
          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="rounded-xl p-4 border flex flex-wrap items-center justify-between gap-3"
              style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
            >
              <div className="min-w-0">
                <h3 className="font-bold" style={{ color: 'rgb(var(--text))' }}>{topic.specRef} {topic.title}</h3>
                <p className="text-sm mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                  Glossary: {flashcardPct}% · Quick check: {quickCheckPassed ? 'Passed' : 'Not yet'}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate(`/business-hub/unit/${unit.id}/concept`)}
                  className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-400 hover:bg-amber-500/30"
                >
                  <Lightbulb size={16} />
                  Start
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/business-hub/unit/${unit.id}/flashcard`)}
                  className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border hover:bg-black/5 dark:hover:bg-white/5"
                  style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                >
                  <BookOpen size={16} />
                  Glossary
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/business-hub/unit/${unit.id}/quick-check`)}
                  className="flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-lg border hover:bg-black/5 dark:hover:bg-white/5"
                  style={{ borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
                >
                  <Target size={16} />
                  Quick Check
                </button>
              </div>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
}
