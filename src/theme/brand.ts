export const brand = {
  name: 'Grade9 Sprint',
  tagline: 'Sprint to Grade 9',

  typography: {
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", "Helvetica Neue", Arial, sans-serif',
      mono: 'ui-monospace, "SF Mono", "Cascadia Code", "Source Code Pro", Menlo, Monaco, "Courier New", monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 900,
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
    letterSpacing: {
      tight: '-0.02em',
      normal: '0',
      wide: '0.02em',
    },
  },

  spacing: {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
  },

  radius: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    full: '9999px',
  },

  shadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    glow: '0 0 20px rgb(99 102 241 / 0.3)',
    glowLg: '0 0 40px rgb(99 102 241 / 0.4)',
  },

  colors: {
    dark: {
      bg: '9 9 11',
      surface: '24 24 27',
      surface2: '39 39 42',
      surfaceElevated: '39 39 42',
      text: '250 250 250',
      textSecondary: '212 212 216',
      muted: '161 161 170',
      border: '63 63 70',
      borderLight: '52 52 56',

      accent: '129 140 248',
      accentHover: '165 180 252',
      accent2: '167 139 250',
      accentGlow: '99 102 241',

      success: '34 197 94',
      successLight: '74 222 128',
      warning: '251 146 60',
      warningLight: '251 191 36',
      danger: '239 68 68',
      dangerLight: '248 113 113',

      elite: '192 132 252',
      elitePink: '244 114 182',
    },
  },

  gradients: {
    primary: 'linear-gradient(135deg, rgb(99 102 241) 0%, rgb(139 92 246) 100%)',
    success: 'linear-gradient(135deg, rgb(34 197 94) 0%, rgb(59 130 246) 100%)',
    elite: 'linear-gradient(135deg, rgb(79 70 229) 0%, rgb(168 85 247) 50%, rgb(236 72 153) 100%)',
    subtle: 'linear-gradient(135deg, rgb(99 102 241 / 0.05) 0%, rgb(139 92 246 / 0.05) 100%)',
    hero: 'radial-gradient(circle at top center, rgb(99 102 241 / 0.1) 0%, transparent 70%)',
    boss: 'radial-gradient(circle at center, rgb(168 85 247 / 0.15) 0%, transparent 70%)',
  },

  motion: {
    duration: {
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
      slower: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  },

  icons: {
    size: {
      xs: 14,
      sm: 16,
      base: 20,
      lg: 24,
      xl: 32,
      '2xl': 40,
    },
    strokeWidth: 2,
  },

  mastery: {
    levels: {
      0: { name: 'Untouched', color: '148 163 184' },
      1: { name: 'Learning', color: '251 146 60' },
      2: { name: 'Practiced', color: '59 130 246' },
      3: { name: 'Mastered', color: '34 197 94' },
      4: { name: 'Grade 9 Speed', gradient: true },
    },
  },
} as const;

export type Brand = typeof brand;
