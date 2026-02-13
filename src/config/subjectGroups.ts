/**
 * Subject layout for Subjects page – grouped into hubs, chosen subjects, and languages.
 * Names match DB subject names (from gcseScope / gcseScopeSync).
 */

export interface SubjectHub {
  id: string;
  title: string;
  subtitle: string;
  /** Subject names to show in this hub (matched against DB subject.name) */
  subjectNames: string[];
  /** Lucide icon name for hub styling */
  icon: 'BookOpen' | 'Calculator' | 'FlaskConical' | 'Briefcase' | 'Landmark' | 'Globe' | 'BookHeart' | 'Heart' | 'Cpu' | 'Brain' | 'Languages';
  /** Accent hex for tint (e.g. #0EA5E9 for English, #3B82F6 for Maths, #22C55E for Science) */
  accentColor: string;
  /** Path to dedicated hub page */
  hubPath: string;
}

/** Triple Science subjects shown above the separator; Combined Science below. */
export const FEATURED_HUBS: SubjectHub[] = [
  {
    id: 'english',
    title: 'English Campus',
    subtitle: 'English Language & Literature',
    subjectNames: ['English Language', 'English Literature'],
    icon: 'BookOpen',
    accentColor: '#0EA5E9',
    hubPath: '/english-campus',
  },
  {
    id: 'maths',
    title: 'Maths Mastery',
    subtitle: 'Maths, Further Maths & Statistics',
    subjectNames: ['Maths', 'Further Maths', 'Statistics'],
    icon: 'Calculator',
    accentColor: '#6366F1',
    hubPath: '/maths-mastery',
  },
  {
    id: 'science',
    title: 'Science Lab',
    subtitle: 'Biology, Chemistry, Physics & Combined Science',
    subjectNames: [
      'Biology',
      'Chemistry',
      'Physics',
      'Combined Science',
    ],
    icon: 'FlaskConical',
    accentColor: '#22C55E',
    hubPath: '/science-lab',
  },
  {
    id: 'business',
    title: 'Business Hub',
    subtitle: 'AQA GCSE Business 8132 – Concepts, case studies & finance',
    subjectNames: ['Business Studies'],
    icon: 'Briefcase',
    accentColor: '#F59E0B',
    hubPath: '/business-hub',
  },
  {
    id: 'history',
    title: 'History Hub',
    subtitle: 'AQA GCSE History 8145 – Timeline, sources, interpretations & essays',
    subjectNames: ['History'],
    icon: 'Landmark',
    accentColor: '#B45309',
    hubPath: '/history-hub',
  },
  {
    id: 'geography',
    title: 'Geography Hub',
    subtitle: 'AQA GCSE Geography 8035 – Physical, human & geographical skills',
    subjectNames: ['Geography'],
    icon: 'Globe',
    accentColor: '#0D9488',
    hubPath: '/geography-hub',
  },
  {
    id: 'religious-studies',
    title: 'Religious Studies Hub',
    subtitle: 'AQA GCSE Religious Studies A 8062 – Beliefs, themes & exam practice',
    subjectNames: ['Religious Studies'],
    icon: 'BookHeart',
    accentColor: '#7C3AED',
    hubPath: '/religious-studies-hub',
  },
  {
    id: 'psychology',
    title: 'Psychology Hub',
    subtitle: 'AQA GCSE Psychology 8182 – Memory, perception, development, social influence & exam practice',
    subjectNames: ['Psychology'],
    icon: 'Brain',
    accentColor: '#9333EA',
    hubPath: '/psychology-hub',
  },
  {
    id: 'health',
    title: 'Health Hub',
    subtitle: 'Edexcel GCSE Health & Social Care – Concepts, case studies & care values',
    subjectNames: ['Health and Social Studies'],
    icon: 'Heart',
    accentColor: '#DC2626',
    hubPath: '/health-hub',
  },
  {
    id: 'compute',
    title: 'Compute Lab',
    subtitle: 'AQA GCSE Computer Science 8525 – Algorithms, programming, theory & SQL',
    subjectNames: ['Computer Science'],
    icon: 'Cpu',
    accentColor: '#0891B2',
    hubPath: '/compute-lab',
  },
  {
    id: 'languages',
    title: 'Languages Hub',
    subtitle: 'French & Spanish – AQA GCSE 8658 / 8698',
    subjectNames: ['French', 'Spanish'],
    icon: 'Languages',
    accentColor: '#2563EB',
    hubPath: '/languages-hub',
  },
];

/** Order for chosen subjects section. (Geography, Computer Science have dedicated hubs.) */
export const CHOSEN_SUBJECT_NAMES: string[] = [
  'Health and Social Studies',
];

/** Languages section. */
export const LANGUAGE_NAMES: string[] = ['French', 'Spanish'];

/** All subject names used in featured hubs (for exclusion from chosen/languages). */
export const FEATURED_SUBJECT_NAMES = new Set(
  FEATURED_HUBS.flatMap((h) => h.subjectNames)
);

/** Subject names in Science Lab that are Triple Science (vs Combined). */
export const TRIPLE_SCIENCE_NAMES = new Set(['Biology', 'Chemistry', 'Physics']);
