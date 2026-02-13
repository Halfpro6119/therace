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
  // Phase 8 expansion – toward 20 each direction
  { id: 'fr-t15', direction: 'en-to-tl', themeId: 'identity', tier: 'foundation', source: 'I am tired because I went to bed late.', modelTranslation: 'Je suis fatigué parce que je me suis couché tard.' },
  { id: 'fr-t16', direction: 'en-to-tl', themeId: 'identity', tier: 'foundation', source: 'My sister likes reading books and listening to music.', modelTranslation: 'Ma sœur aime lire des livres et écouter de la musique.' },
  { id: 'fr-t17', direction: 'en-to-tl', themeId: 'local-national-global', tier: 'foundation', source: 'Last year we went on holiday to the mountains.', modelTranslation: 'L\'année dernière nous sommes partis en vacances à la montagne.' },
  { id: 'fr-t18', direction: 'en-to-tl', themeId: 'future', tier: 'foundation', source: 'I have to do my homework before dinner.', modelTranslation: 'Je dois faire mes devoirs avant le dîner.' },
  { id: 'fr-t19', direction: 'en-to-tl', themeId: 'identity', tier: 'foundation', source: 'We always eat breakfast at seven o\'clock.', modelTranslation: 'Nous mangeons toujours le petit-déjeuner à sept heures.' },
  { id: 'fr-t20', direction: 'en-to-tl', themeId: 'local-national-global', tier: 'foundation', source: 'The library is near the town hall.', modelTranslation: 'La bibliothèque est près de la mairie.' },
  { id: 'fr-t21', direction: 'tl-to-en', themeId: 'identity', tier: 'foundation', source: 'Je préfère le sport au cinéma.', modelTranslation: 'I prefer sport to the cinema.' },
  { id: 'fr-t22', direction: 'tl-to-en', themeId: 'identity', tier: 'foundation', source: 'Nous avons mangé une pizza hier soir.', modelTranslation: 'We ate a pizza yesterday evening.' },
  { id: 'fr-t23', direction: 'tl-to-en', themeId: 'local-national-global', tier: 'foundation', source: 'Il y a beaucoup de magasins dans le centre-ville.', modelTranslation: 'There are lots of shops in the town centre.' },
  { id: 'fr-t24', direction: 'tl-to-en', themeId: 'future', tier: 'foundation', source: 'Je vais passer mon examen la semaine prochaine.', modelTranslation: 'I am going to take my exam next week.' },
  { id: 'fr-t25', direction: 'tl-to-en', themeId: 'identity', tier: 'foundation', source: 'Mon ami adore jouer aux jeux vidéo.', modelTranslation: 'My friend loves playing video games.' },
  { id: 'fr-t26', direction: 'tl-to-en', themeId: 'local-national-global', tier: 'foundation', source: 'Le train part à neuf heures.', modelTranslation: 'The train leaves at nine o\'clock.' },
  { id: 'fr-t27', direction: 'en-to-tl', themeId: 'identity', tier: 'foundation', source: 'She is wearing a blue dress.', modelTranslation: 'Elle porte une robe bleue.' },
  { id: 'fr-t28', direction: 'en-to-tl', themeId: 'future', tier: 'foundation', source: 'My teacher is very kind and helpful.', modelTranslation: 'Mon professeur est très gentil et serviable.' },
  { id: 'fr-t29', direction: 'en-to-tl', themeId: 'local-national-global', tier: 'foundation', source: 'We need to protect the environment.', modelTranslation: 'Nous devons protéger l\'environnement.' },
  { id: 'fr-t30', direction: 'en-to-tl', themeId: 'identity', tier: 'higher', source: 'Social media can be useful but also dangerous.', modelTranslation: 'Les réseaux sociaux peuvent être utiles mais aussi dangereux.' },
  { id: 'fr-t31', direction: 'tl-to-en', themeId: 'identity', tier: 'foundation', source: 'C\'est mon anniversaire demain.', modelTranslation: 'It is my birthday tomorrow.' },
  { id: 'fr-t32', direction: 'tl-to-en', themeId: 'future', tier: 'foundation', source: 'J\'ai réussi mon examen de français.', modelTranslation: 'I passed my French exam.' },
  { id: 'fr-t33', direction: 'tl-to-en', themeId: 'local-national-global', tier: 'foundation', source: 'La pollution est un problème grave.', modelTranslation: 'Pollution is a serious problem.' },
  { id: 'fr-t34', direction: 'tl-to-en', themeId: 'identity', tier: 'higher', source: 'À mon avis, le volontariat est très important.', modelTranslation: 'In my opinion, volunteering is very important.' },
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
  // Phase 8 expansion – toward 20 each direction
  { id: 'es-t15', direction: 'en-to-tl', themeId: 'identity', tier: 'foundation', source: 'I am tired because I went to bed late.', modelTranslation: 'Estoy cansado porque me acosté tarde.' },
  { id: 'es-t16', direction: 'en-to-tl', themeId: 'identity', tier: 'foundation', source: 'My sister likes reading books and listening to music.', modelTranslation: 'A mi hermana le gusta leer libros y escuchar música.' },
  { id: 'es-t17', direction: 'en-to-tl', themeId: 'local-national-global', tier: 'foundation', source: 'Last year we went on holiday to the mountains.', modelTranslation: 'El año pasado fuimos de vacaciones a la montaña.' },
  { id: 'es-t18', direction: 'en-to-tl', themeId: 'future', tier: 'foundation', source: 'I have to do my homework before dinner.', modelTranslation: 'Tengo que hacer los deberes antes de la cena.' },
  { id: 'es-t19', direction: 'en-to-tl', themeId: 'identity', tier: 'foundation', source: 'We always eat breakfast at seven o\'clock.', modelTranslation: 'Siempre desayunamos a las siete.' },
  { id: 'es-t20', direction: 'en-to-tl', themeId: 'local-national-global', tier: 'foundation', source: 'The library is near the town hall.', modelTranslation: 'La biblioteca está cerca del ayuntamiento.' },
  { id: 'es-t21', direction: 'tl-to-en', themeId: 'identity', tier: 'foundation', source: 'Prefiero el deporte al cine.', modelTranslation: 'I prefer sport to the cinema.' },
  { id: 'es-t22', direction: 'tl-to-en', themeId: 'identity', tier: 'foundation', source: 'Comimos una pizza ayer por la noche.', modelTranslation: 'We ate a pizza yesterday evening.' },
  { id: 'es-t23', direction: 'tl-to-en', themeId: 'local-national-global', tier: 'foundation', source: 'Hay muchas tiendas en el centro.', modelTranslation: 'There are lots of shops in the town centre.' },
  { id: 'es-t24', direction: 'tl-to-en', themeId: 'future', tier: 'foundation', source: 'Voy a hacer mi examen la semana que viene.', modelTranslation: 'I am going to take my exam next week.' },
  { id: 'es-t25', direction: 'tl-to-en', themeId: 'identity', tier: 'foundation', source: 'A mi amigo le encanta jugar a los videojuegos.', modelTranslation: 'My friend loves playing video games.' },
  { id: 'es-t26', direction: 'tl-to-en', themeId: 'local-national-global', tier: 'foundation', source: 'El tren sale a las nueve.', modelTranslation: 'The train leaves at nine o\'clock.' },
  { id: 'es-t27', direction: 'en-to-tl', themeId: 'identity', tier: 'foundation', source: 'She is wearing a blue dress.', modelTranslation: 'Ella lleva un vestido azul.' },
  { id: 'es-t28', direction: 'en-to-tl', themeId: 'future', tier: 'foundation', source: 'My teacher is very kind and helpful.', modelTranslation: 'Mi profesor es muy amable y servicial.' },
  { id: 'es-t29', direction: 'en-to-tl', themeId: 'local-national-global', tier: 'foundation', source: 'We need to protect the environment.', modelTranslation: 'Necesitamos proteger el medio ambiente.' },
  { id: 'es-t30', direction: 'en-to-tl', themeId: 'identity', tier: 'higher', source: 'Social media can be useful but also dangerous.', modelTranslation: 'Las redes sociales pueden ser útiles pero también peligrosas.' },
  { id: 'es-t31', direction: 'tl-to-en', themeId: 'identity', tier: 'foundation', source: 'Mañana es mi cumpleaños.', modelTranslation: 'It is my birthday tomorrow.' },
  { id: 'es-t32', direction: 'tl-to-en', themeId: 'future', tier: 'foundation', source: 'Aprobé mi examen de español.', modelTranslation: 'I passed my Spanish exam.' },
  { id: 'es-t33', direction: 'tl-to-en', themeId: 'local-national-global', tier: 'foundation', source: 'La contaminación es un problema grave.', modelTranslation: 'Pollution is a serious problem.' },
  { id: 'es-t34', direction: 'tl-to-en', themeId: 'identity', tier: 'higher', source: 'En mi opinión, el voluntariado es muy importante.', modelTranslation: 'In my opinion, volunteering is very important.' },
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
