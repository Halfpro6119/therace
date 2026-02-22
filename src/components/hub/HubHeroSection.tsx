/**
 * Shared hero section for all hubs – Science Lab style.
 * Uses centralized LAB_HERO_GRADIENT.
 */
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { LAB_HERO_GRADIENT } from '../../config/hubTheme';

export interface HubHeroSectionProps {
  /** Back button label or "Back to X" */
  backLabel: string;
  onBack: () => void;
  title: string;
  subtitle?: string;
  /** Optional progress bar: 0–100 */
  progressPercent?: number;
  /** Extra content below subtitle (e.g. quick links) */
  children?: React.ReactNode;
}

export function HubHeroSection({
  backLabel,
  onBack,
  title,
  subtitle,
  progressPercent,
  children,
}: HubHeroSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl p-6 sm:p-8 border shadow-sm"
      style={{
        background: LAB_HERO_GRADIENT,
        borderColor: 'transparent',
      }}
    >
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
      >
        <ChevronLeft size={18} />
        {backLabel}
      </button>
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{title}</h1>
      {subtitle && (
        <p className="text-white/90 text-sm sm:text-base mb-4">{subtitle}</p>
      )}
      {progressPercent != null && (
        <div className="h-2 rounded-full bg-white/30 overflow-hidden mb-4">
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progressPercent, 100)}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}
      {children}
    </motion.section>
  );
}
