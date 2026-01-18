export interface CosmeticPreferences {
  accentStyle: 'indigo' | 'teal' | 'crimson';
  cardStyle: 'default' | 'glass' | 'steel' | 'minimal';
}

const DEFAULT_PREFS: CosmeticPreferences = {
  accentStyle: 'indigo',
  cardStyle: 'default'
};

const STORAGE_KEY = 'grade9-cosmetics';

export const cosmeticsStorage = {
  getPreferences(): CosmeticPreferences {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_PREFS, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Failed to load cosmetics:', error);
    }
    return DEFAULT_PREFS;
  },

  setPreferences(prefs: Partial<CosmeticPreferences>): void {
    try {
      const current = this.getPreferences();
      const updated = { ...current, ...prefs };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save cosmetics:', error);
    }
  },

  getUnlockedCosmetics(level: number): {
    accentStyles: string[];
    cardStyles: string[];
  } {
    const unlocked = {
      accentStyles: ['indigo'],
      cardStyles: ['default']
    };

    if (level >= 5) {
      unlocked.accentStyles.push('teal');
      unlocked.cardStyles.push('glass');
    }

    if (level >= 10) {
      unlocked.accentStyles.push('crimson');
      unlocked.cardStyles.push('steel');
    }

    if (level >= 15) {
      unlocked.cardStyles.push('minimal');
    }

    return unlocked;
  },

  applyAccentStyle(style: CosmeticPreferences['accentStyle']): void {
    const root = document.documentElement;

    const accents = {
      indigo: {
        accent: '99 102 241',
        accentHover: '79 70 229',
        accentLight: '165 180 252',
      },
      teal: {
        accent: '20 184 166',
        accentHover: '13 148 136',
        accentLight: '94 234 212',
      },
      crimson: {
        accent: '225 29 72',
        accentHover: '190 18 60',
        accentLight: '251 113 133',
      }
    };

    const colors = accents[style];
    root.style.setProperty('--accent', colors.accent);
    root.style.setProperty('--accent-hover', colors.accentHover);
    root.style.setProperty('--accent-light', colors.accentLight);
  }
};
