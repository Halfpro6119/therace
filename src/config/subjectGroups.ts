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
  icon: 'BookOpen' | 'Calculator' | 'FlaskConical';
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
];

/** Order for chosen subjects section. */
export const CHOSEN_SUBJECT_NAMES: string[] = [
  'Business Studies',
  'Computer Science',
  'Geography',
  'History',
  'Health and Social Studies',
  'Psychology',
  'Religious Studies',
];

/** Languages section. */
export const LANGUAGE_NAMES: string[] = ['French', 'Spanish'];

/** All subject names used in featured hubs (for exclusion from chosen/languages). */
export const FEATURED_SUBJECT_NAMES = new Set(
  FEATURED_HUBS.flatMap((h) => h.subjectNames)
);

/** Subject names in Science Lab that are Triple Science (vs Combined). */
export const TRIPLE_SCIENCE_NAMES = new Set(['Biology', 'Chemistry', 'Physics']);
