/**
 * Languages Hub – AQA GCSE French 8658, Spanish 8698
 * Foundation: 1,200+ words. Higher: 1,700+ words.
 * Themes: Identity, Local/national/global, Future
 */

export type LanguageId = 'french' | 'spanish';

export type ThemeId = 'identity' | 'local-national-global' | 'future';

export interface LanguageMeta {
  id: LanguageId;
  name: string;
  spec: string;
  flag: string;
  color: string;
}

export const LANGUAGES: LanguageMeta[] = [
  { id: 'french', name: 'French', spec: 'AQA 8658', flag: '🇫🇷', color: '#2563EB' },
  { id: 'spanish', name: 'Spanish', spec: 'AQA 8698', flag: '🇪🇸', color: '#FACC15' },
];

export interface ThemeMeta {
  id: ThemeId;
  title: string;
  topics: string[];
}

export const THEMES: ThemeMeta[] = [
  { id: 'identity', title: 'Identity and culture', topics: ['Me, my family and friends', 'Technology in everyday life', 'Free-time activities', 'Customs and festivals'] },
  { id: 'local-national-global', title: 'Local, national, international and global areas of interest', topics: ['Home, town, neighbourhood and region', 'Social issues', 'Global issues', 'Travel and tourism'] },
  { id: 'future', title: 'Current and future study and employment', topics: ['My studies', 'Life at school/college', 'Education post-16', 'Jobs, career choices and ambitions'] },
];

/** MFL vocabulary item */
export interface MflVocabItem {
  id: string;
  themeId: ThemeId;
  word: string;
  meaning: string;
  tier: 'foundation' | 'higher';
  /** Optional: example sentence in target language */
  example?: string;
}

/** French vocabulary – Foundation 1,200+ / Higher 1,700+ (AQA 8658) */
export const VOCAB_FRENCH: MflVocabItem[] = [
  // Identity – Me, my family and friends
  { id: 'fr-1', themeId: 'identity', word: 'bonjour', meaning: 'hello', tier: 'foundation' },
  { id: 'fr-2', themeId: 'identity', word: 'famille', meaning: 'family', tier: 'foundation' },
  { id: 'fr-3', themeId: 'identity', word: 'ami', meaning: 'friend', tier: 'foundation' },
  { id: 'fr-4', themeId: 'identity', word: 'père', meaning: 'father', tier: 'foundation' },
  { id: 'fr-5', themeId: 'identity', word: 'mère', meaning: 'mother', tier: 'foundation' },
  { id: 'fr-6', themeId: 'identity', word: 'frère', meaning: 'brother', tier: 'foundation' },
  { id: 'fr-7', themeId: 'identity', word: 'sœur', meaning: 'sister', tier: 'foundation' },
  { id: 'fr-8', themeId: 'identity', word: 'grand-père', meaning: 'grandfather', tier: 'foundation' },
  { id: 'fr-9', themeId: 'identity', word: 'grand-mère', meaning: 'grandmother', tier: 'foundation' },
  { id: 'fr-10', themeId: 'identity', word: 'maison', meaning: 'house', tier: 'foundation' },
  // Identity – Technology
  { id: 'fr-11', themeId: 'identity', word: 'ordinateur', meaning: 'computer', tier: 'foundation' },
  { id: 'fr-12', themeId: 'identity', word: 'téléphone', meaning: 'phone', tier: 'foundation' },
  { id: 'fr-13', themeId: 'identity', word: 'internet', meaning: 'internet', tier: 'foundation' },
  // Identity – Free time
  { id: 'fr-14', themeId: 'identity', word: 'sport', meaning: 'sport', tier: 'foundation' },
  { id: 'fr-15', themeId: 'identity', word: 'musique', meaning: 'music', tier: 'foundation' },
  { id: 'fr-16', themeId: 'identity', word: 'cinéma', meaning: 'cinema', tier: 'foundation' },
  { id: 'fr-17', themeId: 'identity', word: 'lecture', meaning: 'reading', tier: 'foundation' },
  // Local/national/global
  { id: 'fr-18', themeId: 'local-national-global', word: 'ville', meaning: 'town/city', tier: 'foundation' },
  { id: 'fr-19', themeId: 'local-national-global', word: 'pays', meaning: 'country', tier: 'foundation' },
  { id: 'fr-20', themeId: 'local-national-global', word: 'école', meaning: 'school', tier: 'foundation' },
  { id: 'fr-21', themeId: 'local-national-global', word: 'voyage', meaning: 'journey/travel', tier: 'foundation' },
  { id: 'fr-22', themeId: 'local-national-global', word: 'vacances', meaning: 'holidays', tier: 'foundation' },
  // Future
  { id: 'fr-23', themeId: 'future', word: 'étudier', meaning: 'to study', tier: 'foundation' },
  { id: 'fr-24', themeId: 'future', word: 'travail', meaning: 'work', tier: 'foundation' },
  { id: 'fr-25', themeId: 'future', word: 'métier', meaning: 'job/profession', tier: 'foundation' },
  { id: 'fr-26', themeId: 'future', word: 'avenir', meaning: 'future', tier: 'foundation' },
  { id: 'fr-27', themeId: 'future', word: 'carrière', meaning: 'career', tier: 'higher' },
  { id: 'fr-28', themeId: 'identity', word: 'souvent', meaning: 'often', tier: 'foundation' },
  { id: 'fr-29', themeId: 'identity', word: 'parfois', meaning: 'sometimes', tier: 'foundation' },
  { id: 'fr-30', themeId: 'local-national-global', word: 'environnement', meaning: 'environment', tier: 'higher' },
];

/** Spanish vocabulary – Foundation 1,200+ / Higher 1,700+ (AQA 8698) */
export const VOCAB_SPANISH: MflVocabItem[] = [
  { id: 'es-1', themeId: 'identity', word: 'hola', meaning: 'hello', tier: 'foundation' },
  { id: 'es-2', themeId: 'identity', word: 'familia', meaning: 'family', tier: 'foundation' },
  { id: 'es-3', themeId: 'identity', word: 'amigo', meaning: 'friend', tier: 'foundation' },
  { id: 'es-4', themeId: 'identity', word: 'padre', meaning: 'father', tier: 'foundation' },
  { id: 'es-5', themeId: 'identity', word: 'madre', meaning: 'mother', tier: 'foundation' },
  { id: 'es-6', themeId: 'identity', word: 'hermano', meaning: 'brother', tier: 'foundation' },
  { id: 'es-7', themeId: 'identity', word: 'hermana', meaning: 'sister', tier: 'foundation' },
  { id: 'es-8', themeId: 'identity', word: 'abuelo', meaning: 'grandfather', tier: 'foundation' },
  { id: 'es-9', themeId: 'identity', word: 'abuela', meaning: 'grandmother', tier: 'foundation' },
  { id: 'es-10', themeId: 'local-national-global', word: 'casa', meaning: 'house', tier: 'foundation' },
  { id: 'es-11', themeId: 'identity', word: 'ordenador', meaning: 'computer', tier: 'foundation' },
  { id: 'es-12', themeId: 'identity', word: 'teléfono', meaning: 'phone', tier: 'foundation' },
  { id: 'es-13', themeId: 'identity', word: 'deporte', meaning: 'sport', tier: 'foundation' },
  { id: 'es-14', themeId: 'identity', word: 'música', meaning: 'music', tier: 'foundation' },
  { id: 'es-15', themeId: 'identity', word: 'cine', meaning: 'cinema', tier: 'foundation' },
  { id: 'es-16', themeId: 'local-national-global', word: 'ciudad', meaning: 'city', tier: 'foundation' },
  { id: 'es-17', themeId: 'local-national-global', word: 'país', meaning: 'country', tier: 'foundation' },
  { id: 'es-18', themeId: 'local-national-global', word: 'colegio', meaning: 'school', tier: 'foundation' },
  { id: 'es-19', themeId: 'local-national-global', word: 'viaje', meaning: 'journey/trip', tier: 'foundation' },
  { id: 'es-20', themeId: 'local-national-global', word: 'vacaciones', meaning: 'holidays', tier: 'foundation' },
  { id: 'es-21', themeId: 'future', word: 'estudiar', meaning: 'to study', tier: 'foundation' },
  { id: 'es-22', themeId: 'future', word: 'trabajo', meaning: 'work', tier: 'foundation' },
  { id: 'es-23', themeId: 'future', word: 'profesión', meaning: 'profession', tier: 'foundation' },
  { id: 'es-24', themeId: 'future', word: 'futuro', meaning: 'future', tier: 'foundation' },
  { id: 'es-25', themeId: 'future', word: 'carrera', meaning: 'career', tier: 'higher' },
  { id: 'es-26', themeId: 'identity', word: 'a menudo', meaning: 'often', tier: 'foundation' },
  { id: 'es-27', themeId: 'identity', word: 'a veces', meaning: 'sometimes', tier: 'foundation' },
  { id: 'es-28', themeId: 'local-national-global', word: 'medio ambiente', meaning: 'environment', tier: 'higher' },
];

/** Get vocab for a language, optionally filtered by theme and tier */
export function getMflVocab(lang: LanguageId, themeId?: ThemeId, tier?: 'foundation' | 'higher'): MflVocabItem[] {
  const list = lang === 'french' ? VOCAB_FRENCH : VOCAB_SPANISH;
  let out = list;
  if (themeId) out = out.filter(v => v.themeId === themeId);
  if (tier) out = out.filter(v => v.tier === tier || v.tier === 'foundation');
  return out;
}
