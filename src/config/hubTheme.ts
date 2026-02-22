/**
 * Centralized theme for all hubs (Science Lab style).
 * Excludes Maths and English – they keep their own themes.
 */

/** Hero gradient – used on all hub home pages, unit pages, and flashcard headers */
export const LAB_HERO_GRADIENT = 'linear-gradient(135deg, #10B981 0%, #3B82F6 50%, #8B5CF6 100%)';

/** Page background gradient – used during flashcard and lab sessions */
export const LAB_PAGE_BG = 'linear-gradient(180deg, rgb(var(--bg)) 0%, rgb(var(--surface-2)) 100%)';

/** Confidence level labels – Science Lab style (Again, Learning, Got it) */
export const LAB_CONFIDENCE_LABELS = {
  1: 'Again',
  2: 'Learning',
  3: 'Got it',
} as const;

/** Confidence button colors for levels 1, 2, 3 */
export const LAB_CONFIDENCE_STYLES = {
  1: {
    background: 'linear-gradient(180deg, #dc2626 0%, #b91c1c 100%)',
    boxShadow: '0 2px 8px rgba(220, 38, 38, 0.25)',
  },
  2: {
    background: 'linear-gradient(180deg, #d97706 0%, #b45309 100%)',
    boxShadow: '0 2px 8px rgba(217, 119, 6, 0.25)',
  },
  3: {
    background: 'linear-gradient(180deg, #059669 0%, #047857 100%)',
    boxShadow: '0 2px 8px rgba(5, 150, 105, 0.3)',
  },
} as const;

/** Accent color for flashcard card left border */
export const LAB_CARD_ACCENT = '#0EA5E9';

/** Primary accent for hub UI – buttons, icons, links (Science Lab blue from gradient) */
export const LAB_ACCENT = '#3B82F6';

/** Active state for filter/tab buttons */
export const LAB_FILTER_ACTIVE = 'linear-gradient(135deg, #10B981 0%, #3B82F6 100%)';
