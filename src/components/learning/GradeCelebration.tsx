/**
 * Short celebration for grade milestones (Grade 7, Grade 9, Grade 9 ready).
 * Used on Science Lab topic test and paper test completion.
 */
import { motion } from 'framer-motion';
import { Trophy, Sparkles } from 'lucide-react';

export type GradeCelebrationVariant = 'grade7' | 'grade9' | 'grade9ready';

interface GradeCelebrationProps {
  variant: GradeCelebrationVariant;
  /** Optional short label e.g. "Grade 9 equivalent" */
  label?: string;
}

const VARIANTS: Record<
  GradeCelebrationVariant,
  { title: string; color: string; gradient: string }
> = {
  grade7: {
    title: 'Grade 7!',
    color: 'rgb(34 197 94)',
    gradient: 'linear-gradient(135deg, #22C55E 0%, #059669 100%)',
  },
  grade9: {
    title: 'Grade 9!',
    color: 'rgb(16 185 129)',
    gradient: 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
  },
  grade9ready: {
    title: 'Grade 9 ready!',
    color: 'rgb(16 185 129)',
    gradient: 'linear-gradient(135deg, #10B981 0%, #8B5CF6 100%)',
  },
};

export function GradeCelebration({ variant, label }: GradeCelebrationProps) {
  const { title, gradient } = VARIANTS[variant];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="inline-flex flex-col items-center gap-2 my-4 px-6 py-4 rounded-2xl"
      style={{
        background: `${gradient}`,
        boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)',
      }}
    >
      <motion.div
        animate={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex items-center justify-center gap-2"
      >
        <Sparkles size={28} className="text-white" />
        <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
          {title}
        </span>
        <Trophy size={28} className="text-white" />
      </motion.div>
      {label && (
        <p className="text-sm font-semibold text-white/90">{label}</p>
      )}
    </motion.div>
  );
}
