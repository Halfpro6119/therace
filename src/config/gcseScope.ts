/**
 * GCSE Scope – hard-coded subjects and papers
 *
 * Single source of truth for:
 * - Which subjects exist
 * - Papers per subject (number, name, calculator default)
 * - Tier rules (Foundation / Higher vs single-tier)
 *
 * Questions, quizzes, filters, mastery, and imports all sit on these rails.
 * Tier is question-level; this config defines which subjects have tiers.
 */

export type GcseCategory = 'Maths' | 'Science' | 'English' | 'Humanities' | 'Languages' | 'Social';

export type TierMode = 'foundation_higher' | 'higher_only' | 'single';

export interface GcsePaperDef {
  paperNumber: number; // 1–3 typical; 4 for languages; 5–6 for Combined Science
  name: string;
  calculatorAllowedDefault: boolean;
}

export interface GcseSubjectDef {
  /** Stable key for lookups (e.g. tier rules, sync). */
  slug: string;
  /** Display name (must match what you use in DB when syncing). */
  name: string;
  category: GcseCategory;
  /** foundation_higher | higher_only | single */
  tierMode: TierMode;
  examBoard: string;
  description: string;
  icon: string;
  themeColor: string;
  papers: GcsePaperDef[];
}

/** Ordered list of all GCSE subjects in scope. */
export const GCSE_SCOPE_SUBJECTS: GcseSubjectDef[] = [
  // —— Maths ——
  {
    slug: 'maths',
    name: 'Maths',
    category: 'Maths',
    tierMode: 'foundation_higher',
    examBoard: 'Edexcel',
    description: 'GCSE Mathematics',
    icon: '📐',
    themeColor: '#3B82F6',
    papers: [
      { paperNumber: 1, name: 'Paper 1 (Non-Calculator)', calculatorAllowedDefault: false },
      { paperNumber: 2, name: 'Paper 2 (Calculator)', calculatorAllowedDefault: true },
      { paperNumber: 3, name: 'Paper 3 (Calculator)', calculatorAllowedDefault: true },
    ],
  },
  {
    slug: 'further-maths',
    name: 'Further Maths',
    category: 'Maths',
    tierMode: 'higher_only',
    examBoard: 'AQA',
    description: 'Level 2 Certificate in Further Mathematics (AQA 8365)',
    icon: '📐',
    themeColor: '#6366F1',
    papers: [
      { paperNumber: 1, name: 'Paper 1 (Non-Calculator)', calculatorAllowedDefault: false },
      { paperNumber: 2, name: 'Paper 2 (Calculator)', calculatorAllowedDefault: true },
    ],
  },
  {
    slug: 'statistics',
    name: 'Statistics',
    category: 'Maths',
    tierMode: 'single',
    examBoard: 'AQA',
    description: 'GCSE Statistics (AQA 8382)',
    icon: '📊',
    themeColor: '#0EA5E9',
    papers: [
      { paperNumber: 1, name: 'Paper 1 (Data, representation, probability)', calculatorAllowedDefault: true },
      { paperNumber: 2, name: 'Paper 2 (Correlation, time series, distributions)', calculatorAllowedDefault: true },
    ],
  },
  // —— Sciences ——
  {
    slug: 'biology',
    name: 'Biology',
    category: 'Science',
    tierMode: 'foundation_higher',
    examBoard: 'AQA',
    description: 'GCSE Biology',
    icon: '🧬',
    themeColor: '#22C55E',
    papers: [
      { paperNumber: 1, name: 'Paper 1 (Cell biology, organisation, infection)', calculatorAllowedDefault: true },
      { paperNumber: 2, name: 'Paper 2 (Homeostasis, inheritance, ecology)', calculatorAllowedDefault: true },
    ],
  },
  {
    slug: 'chemistry',
    name: 'Chemistry',
    category: 'Science',
    tierMode: 'foundation_higher',
    examBoard: 'AQA',
    description: 'GCSE Chemistry',
    icon: '⚗️',
    themeColor: '#EAB308',
    papers: [
      { paperNumber: 1, name: 'Paper 1 (Atomic structure, bonding, quantitative)', calculatorAllowedDefault: true },
      { paperNumber: 2, name: 'Paper 2 (Rates, equilibrium, organic, atmosphere)', calculatorAllowedDefault: true },
    ],
  },
  {
    slug: 'physics',
    name: 'Physics',
    category: 'Science',
    tierMode: 'foundation_higher',
    examBoard: 'AQA',
    description: 'GCSE Physics',
    icon: '⚡',
    themeColor: '#EF4444',
    papers: [
      { paperNumber: 1, name: 'Paper 1 (Energy, electricity, particle model)', calculatorAllowedDefault: true },
      { paperNumber: 2, name: 'Paper 2 (Forces, waves, magnetism, space)', calculatorAllowedDefault: true },
    ],
  },
  {
    slug: 'combined-science',
    name: 'Combined Science',
    category: 'Science',
    tierMode: 'foundation_higher',
    examBoard: 'AQA',
    description: 'GCSE Combined Science (Trilogy) – separate from triple science',
    icon: '🧪',
    themeColor: '#8B5CF6',
    papers: [
      { paperNumber: 1, name: 'Biology Paper 1', calculatorAllowedDefault: true },
      { paperNumber: 2, name: 'Biology Paper 2', calculatorAllowedDefault: true },
      { paperNumber: 3, name: 'Chemistry Paper 1', calculatorAllowedDefault: true },
      { paperNumber: 4, name: 'Chemistry Paper 2', calculatorAllowedDefault: true },
      { paperNumber: 5, name: 'Physics Paper 1', calculatorAllowedDefault: true },
      { paperNumber: 6, name: 'Physics Paper 2', calculatorAllowedDefault: true },
    ],
  },
  // —— English ——
  {
    slug: 'english-language',
    name: 'English Language',
    category: 'English',
    tierMode: 'single',
    examBoard: 'AQA',
    description: 'GCSE English Language',
    icon: '🗣️',
    themeColor: '#0EA5E9',
    papers: [
      { paperNumber: 1, name: 'Paper 1 (Fiction reading & creative writing)', calculatorAllowedDefault: false },
      { paperNumber: 2, name: 'Paper 2 (Non-fiction reading & transactional writing)', calculatorAllowedDefault: false },
    ],
  },
  {
    slug: 'english-literature',
    name: 'English Literature',
    category: 'English',
    tierMode: 'single',
    examBoard: 'AQA',
    description: 'GCSE English Literature',
    icon: '📚',
    themeColor: '#EC4899',
    papers: [
      { paperNumber: 1, name: 'Paper 1 (Shakespeare + 19th-century novel)', calculatorAllowedDefault: false },
      { paperNumber: 2, name: 'Paper 2 (Modern texts + poetry)', calculatorAllowedDefault: false },
    ],
  },
  // —— Humanities ——
  {
    slug: 'geography',
    name: 'Geography',
    category: 'Humanities',
    tierMode: 'single',
    examBoard: 'AQA',
    description: 'GCSE Geography',
    icon: '🌍',
    themeColor: '#10B981',
    papers: [
      { paperNumber: 1, name: 'Paper 1 (Physical geography)', calculatorAllowedDefault: false },
      { paperNumber: 2, name: 'Paper 2 (Human geography)', calculatorAllowedDefault: false },
      { paperNumber: 3, name: 'Paper 3 (Fieldwork & skills)', calculatorAllowedDefault: false },
    ],
  },
  {
    slug: 'history',
    name: 'History',
    category: 'Humanities',
    tierMode: 'single',
    examBoard: 'AQA',
    description: 'GCSE History',
    icon: '🏛️',
    themeColor: '#F59E0B',
    papers: [
      { paperNumber: 1, name: 'Paper 1 (Period study)', calculatorAllowedDefault: false },
      { paperNumber: 2, name: 'Paper 2 (Wider world depth study)', calculatorAllowedDefault: false },
      { paperNumber: 3, name: 'Paper 3 (Modern depth study / source analysis)', calculatorAllowedDefault: false },
    ],
  },
  {
    slug: 'religious-studies',
    name: 'Religious Studies',
    category: 'Humanities',
    tierMode: 'single',
    examBoard: 'AQA',
    description: 'GCSE Religious Studies',
    icon: '📿',
    themeColor: '#84CC16',
    papers: [
      { paperNumber: 1, name: 'Paper 1', calculatorAllowedDefault: false },
      { paperNumber: 2, name: 'Paper 2', calculatorAllowedDefault: false },
    ],
  },
  // —— Social / Optional ——
  {
    slug: 'computer-science',
    name: 'Computer Science',
    category: 'Social',
    tierMode: 'single',
    examBoard: 'AQA',
    description: 'GCSE Computer Science (AQA 8525)',
    icon: '🧠',
    themeColor: '#06B6D4',
    papers: [
      { paperNumber: 1, name: 'Paper 1 (Computational thinking & algorithms)', calculatorAllowedDefault: false },
      { paperNumber: 2, name: 'Paper 2 (Programming & data representation)', calculatorAllowedDefault: false },
    ],
  },
  {
    slug: 'business-studies',
    name: 'Business Studies',
    category: 'Social',
    tierMode: 'single',
    examBoard: 'Edexcel',
    description: 'GCSE Business Studies',
    icon: '💼',
    themeColor: '#14B8A6',
    papers: [
      { paperNumber: 1, name: 'Paper 1 (Influences of operations & marketing)', calculatorAllowedDefault: true },
      { paperNumber: 2, name: 'Paper 2 (Finance, HR, global business)', calculatorAllowedDefault: true },
    ],
  },
  {
    slug: 'psychology',
    name: 'Psychology',
    category: 'Social',
    tierMode: 'single',
    examBoard: 'AQA',
    description: 'GCSE Psychology',
    icon: '🧠',
    themeColor: '#F97316',
    papers: [
      { paperNumber: 1, name: 'Paper 1 (Cognition, behaviour, research methods)', calculatorAllowedDefault: false },
      { paperNumber: 2, name: 'Paper 2 (Social influence, biology, methods)', calculatorAllowedDefault: false },
    ],
  },
  {
    slug: 'health-and-social-studies',
    name: 'Health and Social Studies',
    category: 'Social',
    tierMode: 'single',
    examBoard: 'Edexcel',
    description: 'GCSE Health & Social Care (Edexcel 2HS01/02)',
    icon: '🧑‍🤝‍🧑',
    themeColor: '#64748B',
    papers: [
      { paperNumber: 1, name: 'Paper 1 (Families, education)', calculatorAllowedDefault: false },
      { paperNumber: 2, name: 'Paper 2 (Crime, stratification)', calculatorAllowedDefault: false },
    ],
  },
  // —— Languages ——
  {
    slug: 'french',
    name: 'French',
    category: 'Languages',
    tierMode: 'foundation_higher',
    examBoard: 'AQA',
    description: 'GCSE French',
    icon: '🇫🇷',
    themeColor: '#2563EB',
    papers: [
      { paperNumber: 1, name: 'Paper 1 (Listening)', calculatorAllowedDefault: false },
      { paperNumber: 2, name: 'Paper 2 (Speaking)', calculatorAllowedDefault: false },
      { paperNumber: 3, name: 'Paper 3 (Reading)', calculatorAllowedDefault: false },
      { paperNumber: 4, name: 'Paper 4 (Writing)', calculatorAllowedDefault: false },
    ],
  },
  {
    slug: 'spanish',
    name: 'Spanish',
    category: 'Languages',
    tierMode: 'foundation_higher',
    examBoard: 'AQA',
    description: 'GCSE Spanish',
    icon: '🇪🇸',
    themeColor: '#FACC15',
    papers: [
      { paperNumber: 1, name: 'Paper 1 (Listening)', calculatorAllowedDefault: false },
      { paperNumber: 2, name: 'Paper 2 (Speaking)', calculatorAllowedDefault: false },
      { paperNumber: 3, name: 'Paper 3 (Reading)', calculatorAllowedDefault: false },
      { paperNumber: 4, name: 'Paper 4 (Writing)', calculatorAllowedDefault: false },
    ],
  },
];

// —— Lookups by slug ——
const scopeBySlug = new Map(GCSE_SCOPE_SUBJECTS.map((s) => [s.slug, s]));
const scopeByName = new Map(GCSE_SCOPE_SUBJECTS.map((s) => [s.name.toLowerCase(), s]));

/** Get GCSE scope definition by stable slug (e.g. "maths", "combined-science"). */
export function getGcseScopeBySlug(slug: string): GcseSubjectDef | undefined {
  return scopeBySlug.get(slug);
}

/** Get GCSE scope definition by display name (case-insensitive). Use after syncing so DB name matches. */
export function getGcseScopeByName(name: string): GcseSubjectDef | undefined {
  return scopeByName.get(name.trim().toLowerCase());
}

/** Get scope for a subject (by id) using current DB subject name. Pass subject.name. */
export function getGcseScopeForSubject(subjectName: string): GcseSubjectDef | undefined {
  return getGcseScopeByName(subjectName);
}

// —— Tier rules ——

/** Whether this subject has Foundation and Higher tiers. */
export function subjectHasTiers(scope: GcseSubjectDef): boolean {
  return scope.tierMode === 'foundation_higher' || scope.tierMode === 'higher_only';
}

/** Whether Foundation tier exists for this subject. */
export function subjectHasFoundationTier(scope: GcseSubjectDef): boolean {
  return scope.tierMode === 'foundation_higher';
}

/** Whether Higher tier exists for this subject. */
export function subjectHasHigherTier(scope: GcseSubjectDef): boolean {
  return scope.tierMode === 'foundation_higher' || scope.tierMode === 'higher_only';
}

/** Tier options for UI: [] for single-tier, ['foundation','higher'] or ['higher'] otherwise. */
export function getTierOptionsForSubject(scope: GcseSubjectDef): ('foundation' | 'higher')[] {
  if (scope.tierMode === 'single') return [];
  if (scope.tierMode === 'higher_only') return ['higher'];
  return ['foundation', 'higher'];
}

/** All slugs in GCSE scope (for sync/validation). */
export function getAllGcseSlugs(): string[] {
  return GCSE_SCOPE_SUBJECTS.map((s) => s.slug);
}
