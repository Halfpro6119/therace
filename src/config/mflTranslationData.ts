/**
 * MFL Translation Lab – French & Spanish (AQA 8658/8698)
 */
import type { MflTranslationTask } from '../types/mflLab';
import type { LanguageId } from './languagesHubData';

const FRENCH_TRANSLATION: MflTranslationTask[] = [
  { id: 'fr-t1', direction: 'en-to-tl', themeId: 'identity', tier: 'foundation', source: 'I like playing football with my friends.', modelTranslation: 'J\'aime jouer au football avec mes amis.' },
  { id: 'fr-t2', direction: 'en-to-tl', themeId: 'identity', tier: 'foundation', source: 'My brother is called Pierre.', modelTranslation: 'Mon frère s\'appelle Pierre.' },
  { id: 'fr-t3', direction: 'en-to-tl', themeId: 'identity', tier: 'foundation', source: 'Yesterday I watched a film.', modelTranslation: 'Hier j\'ai regardé un film.' },
  { id: 'fr-t4', direction: 'en-to-tl', themeId: 'local-national-global', tier: 'foundation', source: 'There is a library in my town.', modelTranslation: 'Il y a une bibliothèque dans ma ville.' },
  { id: 'fr-t5', direction: 'en-to-tl', themeId: 'future', tier: 'foundation', source: 'I want to study languages at university.', modelTranslation: 'Je veux étudier les langues à l\'université.' },
  { id: 'fr-t6', direction: 'tl-to-en', themeId: 'identity', tier: 'foundation', source: 'J\'adore la musique.', modelTranslation: 'I love music.' },
  { id: 'fr-t7', direction: 'tl-to-en', themeId: 'identity', tier: 'foundation', source: 'Ma sœur a quinze ans.', modelTranslation: 'My sister is fifteen.' },
  { id: 'fr-t8', direction: 'tl-to-en', themeId: 'local-national-global', tier: 'foundation', source: 'Nous avons voyagé en Espagne.', modelTranslation: 'We travelled to Spain.' },
  { id: 'fr-t9', direction: 'tl-to-en', themeId: 'future', tier: 'foundation', source: 'Je voudrais être médecin.', modelTranslation: 'I would like to be a doctor.' },
  { id: 'fr-t10', direction: 'tl-to-en', themeId: 'local-national-global', tier: 'foundation', source: 'Il fait beau aujourd\'hui.', modelTranslation: 'The weather is nice today.' },
  { id: 'fr-t11', direction: 'en-to-tl', themeId: 'local-national-global', tier: 'higher', source: 'Global warming is a serious problem that affects our planet.', modelTranslation: 'Le réchauffement climatique est un problème grave qui affecte notre planète.' },
  { id: 'fr-t12', direction: 'en-to-tl', themeId: 'future', tier: 'higher', source: 'I would like to work abroad in the future.', modelTranslation: 'Je voudrais travailler à l\'étranger dans l\'avenir.' },
  { id: 'fr-t13', direction: 'tl-to-en', themeId: 'local-national-global', tier: 'higher', source: 'Beaucoup de jeunes font du volontariat pour protéger l\'environnement.', modelTranslation: 'Many young people do volunteering to protect the environment.' },
  { id: 'fr-t14', direction: 'tl-to-en', themeId: 'future', tier: 'higher', source: 'Après le lycée, je vais étudier à l\'université.', modelTranslation: 'After sixth form, I am going to study at university.' },
];

const SPANISH_TRANSLATION: MflTranslationTask[] = [
  { id: 'es-t1', direction: 'en-to-tl', themeId: 'identity', tier: 'foundation', source: 'I like playing football with my friends.', modelTranslation: 'Me gusta jugar al fútbol con mis amigos.' },
  { id: 'es-t2', direction: 'en-to-tl', themeId: 'identity', tier: 'foundation', source: 'My brother is called Carlos.', modelTranslation: 'Mi hermano se llama Carlos.' },
  { id: 'es-t3', direction: 'en-to-tl', themeId: 'identity', tier: 'foundation', source: 'Yesterday I watched a film.', modelTranslation: 'Ayer vi una película.' },
  { id: 'es-t4', direction: 'en-to-tl', themeId: 'local-national-global', tier: 'foundation', source: 'There is a library in my town.', modelTranslation: 'Hay una biblioteca en mi ciudad.' },
  { id: 'es-t5', direction: 'en-to-tl', themeId: 'future', tier: 'foundation', source: 'I want to study languages at university.', modelTranslation: 'Quiero estudiar idiomas en la universidad.' },
  { id: 'es-t6', direction: 'tl-to-en', themeId: 'identity', tier: 'foundation', source: 'Me encanta la música.', modelTranslation: 'I love music.' },
  { id: 'es-t7', direction: 'tl-to-en', themeId: 'identity', tier: 'foundation', source: 'Mi hermana tiene catorce años.', modelTranslation: 'My sister is fourteen.' },
  { id: 'es-t8', direction: 'tl-to-en', themeId: 'local-national-global', tier: 'foundation', source: 'Viajamos a Francia.', modelTranslation: 'We travelled to France.' },
  { id: 'es-t9', direction: 'tl-to-en', themeId: 'future', tier: 'foundation', source: 'Me gustaría ser médico.', modelTranslation: 'I would like to be a doctor.' },
  { id: 'es-t10', direction: 'tl-to-en', themeId: 'local-national-global', tier: 'foundation', source: 'Hace buen tiempo hoy.', modelTranslation: 'The weather is nice today.' },
  { id: 'es-t11', direction: 'en-to-tl', themeId: 'local-national-global', tier: 'higher', source: 'Global warming is a serious problem that affects our planet.', modelTranslation: 'El calentamiento global es un problema serio que afecta a nuestro planeta.' },
  { id: 'es-t12', direction: 'en-to-tl', themeId: 'future', tier: 'higher', source: 'I would like to work abroad in the future.', modelTranslation: 'Me gustaría trabajar en el extranjero en el futuro.' },
  { id: 'es-t13', direction: 'tl-to-en', themeId: 'local-national-global', tier: 'higher', source: 'Muchos jóvenes hacen voluntariado para proteger el medio ambiente.', modelTranslation: 'Many young people do volunteering to protect the environment.' },
  { id: 'es-t14', direction: 'tl-to-en', themeId: 'future', tier: 'higher', source: 'Después del instituto, voy a estudiar en la universidad.', modelTranslation: 'After secondary school, I am going to study at university.' },
];

export function getTranslationTasks(
  lang: LanguageId,
  direction?: 'en-to-tl' | 'tl-to-en',
  tier?: 'foundation' | 'higher'
): MflTranslationTask[] {
  const list = lang === 'french' ? FRENCH_TRANSLATION : SPANISH_TRANSLATION;
  let out = list;
  if (direction) out = out.filter((t) => t.direction === direction);
  if (tier) out = out.filter((t) => t.tier === tier);
  return out;
}

export function getTranslationTaskById(lang: LanguageId, id: string): MflTranslationTask | undefined {
  return getTranslationTasks(lang).find((t) => t.id === id);
}
