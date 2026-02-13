/**
 * MFL Speaking Prep – French & Spanish (AQA 8658/8698)
 * Role-play, photo card, conversation prompts
 */
import type { MflRolePlayPrompt, MflPhotoCard } from '../types/mflLab';
import type { LanguageId } from './languagesHubData';

const FRENCH_ROLE_PLAYS: MflRolePlayPrompt[] = [
  {
    id: 'fr-rp1',
    themeId: 'identity',
    scenario: 'You are in a café. Order a drink and a snack.',
    prompts: ['Say what you want to drink', 'Ask how much it costs', 'Say you will pay by card'],
    modelResponses: ['Je voudrais un coca et un croissant, s\'il vous plaît.', 'C\'est combien?', 'Je paie par carte.'],
  },
  {
    id: 'fr-rp2',
    themeId: 'local-national-global',
    scenario: 'You are at the train station. Buy a ticket.',
    prompts: ['Say where you want to go', 'Ask what time the next train leaves', 'Ask for a return ticket'],
    modelResponses: ['Je voudrais aller à Lyon.', 'À quelle heure part le prochain train?', 'Je voudrais un aller-retour.'],
  },
  {
    id: 'fr-rp3',
    themeId: 'future',
    scenario: 'You are at a job interview for a part-time job.',
    prompts: ['Say why you want the job', 'Say when you can work', 'Ask about the salary'],
    modelResponses: ['Je veux ce travail pour gagner de l\'argent et avoir de l\'expérience.', 'Je peux travailler le weekend.', 'Quel est le salaire?'],
  },
  {
    id: 'fr-rp4',
    themeId: 'identity',
    scenario: 'You are at a friend\'s house. Discuss plans for the weekend.',
    prompts: ['Suggest an activity', 'Say what you don\'t want to do', 'Agree on a time to meet'],
    modelResponses: ['On pourrait aller au cinéma.', 'Je ne veux pas rester à la maison.', 'On se retrouve à deux heures?'],
  },
  {
    id: 'fr-rp5',
    themeId: 'local-national-global',
    scenario: 'You are in a shop. You want to buy a present.',
    prompts: ['Say what you are looking for', 'Ask the price', 'Say it\'s too expensive'],
    modelResponses: ['Je cherche un cadeau pour ma sœur.', 'C\'est combien?', 'C\'est trop cher.'],
  },
];

const SPANISH_ROLE_PLAYS: MflRolePlayPrompt[] = [
  {
    id: 'es-rp1',
    themeId: 'identity',
    scenario: 'You are in a café. Order a drink and a snack.',
    prompts: ['Say what you want to drink', 'Ask how much it costs', 'Say you will pay by card'],
    modelResponses: ['Quisiera un refresco y un croissant, por favor.', '¿Cuánto cuesta?', 'Pago con tarjeta.'],
  },
  {
    id: 'es-rp2',
    themeId: 'local-national-global',
    scenario: 'You are at the train station. Buy a ticket.',
    prompts: ['Say where you want to go', 'Ask what time the next train leaves', 'Ask for a return ticket'],
    modelResponses: ['Quiero ir a Madrid.', '¿A qué hora sale el próximo tren?', 'Quisiera un billete de ida y vuelta.'],
  },
  {
    id: 'es-rp3',
    themeId: 'future',
    scenario: 'You are at a job interview for a part-time job.',
    prompts: ['Say why you want the job', 'Say when you can work', 'Ask about the salary'],
    modelResponses: ['Quiero este trabajo para ganar dinero y tener experiencia.', 'Puedo trabajar los fines de semana.', '¿Cuál es el salario?'],
  },
  {
    id: 'es-rp4',
    themeId: 'identity',
    scenario: 'You are at a friend\'s house. Discuss plans for the weekend.',
    prompts: ['Suggest an activity', 'Say what you don\'t want to do', 'Agree on a time to meet'],
    modelResponses: ['Podríamos ir al cine.', 'No quiero quedarme en casa.', '¿Quedamos a las dos?'],
  },
  {
    id: 'es-rp5',
    themeId: 'local-national-global',
    scenario: 'You are in a shop. You want to buy a present.',
    prompts: ['Say what you are looking for', 'Ask the price', 'Say it\'s too expensive'],
    modelResponses: ['Busco un regalo para mi hermana.', '¿Cuánto cuesta?', 'Es demasiado caro.'],
  },
];

const FRENCH_PHOTO_CARDS: MflPhotoCard[] = [
  {
    id: 'fr-pc1',
    themeId: 'identity',
    tier: 'foundation',
    questions: ['Qu\'est-ce qu\'il y a sur la photo?', 'Où sont les personnes?', 'Qu\'est-ce qu\'elles font?', 'Qu\'est-ce que tu aimes faire avec tes amis?'],
    modelAnswers: ['Sur la photo il y a des amis qui mangent ensemble.', 'Ils sont au restaurant.', 'Ils mangent et parlent.', 'J\'aime aller au cinéma avec mes amis.'],
  },
  {
    id: 'fr-pc2',
    themeId: 'local-national-global',
    tier: 'foundation',
    questions: ['Décris la photo.', 'Qu\'est-ce que tu vois?', 'Où est-ce que c\'est?', 'Tu aimes voyager? Pourquoi?'],
    modelAnswers: ['Sur la photo je vois une plage avec des gens.', 'Il y a du sable, la mer et des parasols.', 'C\'est probablement en vacances à la mer.', 'Oui, j\'adore voyager car j\'aime découvrir de nouveaux endroits.'],
  },
  {
    id: 'fr-pc3',
    themeId: 'future',
    tier: 'foundation',
    questions: ['Qu\'est-ce qui se passe sur la photo?', 'Où sont les élèves?', 'Qu\'est-ce qu\'ils font?', 'Tu aimes ton collège?'],
    modelAnswers: ['Les élèves sont en cours.', 'Ils sont dans une salle de classe.', 'Ils écoutent le professeur et prennent des notes.', 'Oui, j\'aime mon collège car les professeurs sont sympas.'],
  },
];

const SPANISH_PHOTO_CARDS: MflPhotoCard[] = [
  {
    id: 'es-pc1',
    themeId: 'identity',
    tier: 'foundation',
    questions: ['¿Qué hay en la foto?', '¿Dónde están las personas?', '¿Qué hacen?', '¿Qué te gusta hacer con tus amigos?'],
    modelAnswers: ['En la foto hay amigos comiendo juntos.', 'Están en el restaurante.', 'Comen y hablan.', 'Me gusta ir al cine con mis amigos.'],
  },
  {
    id: 'es-pc2',
    themeId: 'local-national-global',
    tier: 'foundation',
    questions: ['Describe la foto.', '¿Qué ves?', '¿Dónde es?', '¿Te gusta viajar? ¿Por qué?'],
    modelAnswers: ['En la foto veo una playa con gente.', 'Hay arena, el mar y sombrillas.', 'Probablemente está de vacaciones en la playa.', 'Sí, me encanta viajar porque me gusta descubrir lugares nuevos.'],
  },
  {
    id: 'es-pc3',
    themeId: 'future',
    tier: 'foundation',
    questions: ['¿Qué pasa en la foto?', '¿Dónde están los alumnos?', '¿Qué hacen?', '¿Te gusta tu instituto?'],
    modelAnswers: ['Los alumnos están en clase.', 'Están en un aula.', 'Escuchan al profesor y toman apuntes.', 'Sí, me gusta mi instituto porque los profesores son simpáticos.'],
  },
];

export function getRolePlayPrompts(lang: LanguageId): MflRolePlayPrompt[] {
  return lang === 'french' ? FRENCH_ROLE_PLAYS : SPANISH_ROLE_PLAYS;
}

export function getPhotoCards(lang: LanguageId, tier?: 'foundation' | 'higher'): MflPhotoCard[] {
  const list = lang === 'french' ? FRENCH_PHOTO_CARDS : SPANISH_PHOTO_CARDS;
  if (tier) return list.filter((c) => c.tier === tier);
  return list;
}
