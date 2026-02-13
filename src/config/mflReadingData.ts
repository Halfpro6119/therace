/**
 * MFL Reading Lab – French & Spanish (AQA 8658/8698)
 */
import type { MflReadingTask } from '../types/mflLab';
import type { LanguageId } from './languagesHubData';

const FRENCH_READING: MflReadingTask[] = [
  {
    id: 'fr-r1',
    themeId: 'identity',
    tier: 'foundation',
    text: 'Je m\'appelle Luc. J\'habite à Lyon avec ma famille. J\'ai un chien qui s\'appelle Max. Le weekend, j\'aime faire du vélo et regarder des films. Mon film préféré est un film d\'action. J\'adore aussi la pizza et le chocolat!',
    questions: [
      { id: 'q1', type: 'short', question: 'What is the boy\'s name?', correctAnswer: 'Luc' },
      { id: 'q2', type: 'short', question: 'Where does he live?', correctAnswer: 'Lyon' },
      { id: 'q3', type: 'short', question: 'What is his dog called?', correctAnswer: 'Max' },
      { id: 'q4', type: 'short', question: 'What does he like to do at the weekend?', correctAnswer: 'cycling, watching films / vélo, films' },
    ],
  },
  {
    id: 'fr-r2',
    themeId: 'identity',
    tier: 'foundation',
    text: 'Hier, j\'ai utilisé mon ordinateur pour faire mes devoirs. Ensuite, j\'ai envoyé un email à mon professeur. Le soir, j\'ai regardé une série à la télévision. C\'était très amusant!',
    questions: [
      { id: 'q1', type: 'short', question: 'When did this happen?', correctAnswer: 'yesterday / hier' },
      { id: 'q2', type: 'short', question: 'What did the person use the computer for?', correctAnswer: 'homework / devoirs' },
      { id: 'q3', type: 'short', question: 'Who did they send an email to?', correctAnswer: 'teacher / professeur' },
    ],
  },
  {
    id: 'fr-r3',
    themeId: 'local-national-global',
    tier: 'foundation',
    text: 'Ma ville a une gare, un supermarché et une piscine. Il y a aussi un cinéma au centre-ville. En été, je vais à la plage avec ma famille. Nous prenons le train. Le voyage dure deux heures.',
    questions: [
      { id: 'q1', type: 'short', question: 'What facilities does the town have?', correctAnswer: 'station, supermarket, pool, cinema' },
      { id: 'q2', type: 'short', question: 'When does the person go to the beach?', correctAnswer: 'summer / été' },
      { id: 'q3', type: 'short', question: 'How long does the journey take?', correctAnswer: 'two hours / deux heures' },
    ],
  },
  {
    id: 'fr-r4',
    themeId: 'future',
    tier: 'foundation',
    text: 'L\'année prochaine je vais au lycée. Je vais étudier les langues et l\'histoire. Plus tard, je voudrais être avocat. Mon père est avocat et il aime son travail.',
    questions: [
      { id: 'q1', type: 'short', question: 'Where is the person going next year?', correctAnswer: 'lycée / sixth form' },
      { id: 'q2', type: 'short', question: 'What will they study?', correctAnswer: 'languages and history' },
      { id: 'q3', type: 'short', question: 'What job do they want?', correctAnswer: 'lawyer / avocat' },
    ],
  },
  {
    id: 'fr-r5',
    themeId: 'local-national-global',
    tier: 'higher',
    text: 'Le réchauffement climatique affecte notre planète. Il est important de recycler, d\'utiliser les transports en commun et de réduire notre consommation d\'énergie. Beaucoup de jeunes font du volontariat pour protéger l\'environnement.',
    questions: [
      { id: 'q1', type: 'short', question: 'What affects our planet?', correctAnswer: 'global warming / réchauffement climatique' },
      { id: 'q2', type: 'short', question: 'What should we do?', correctAnswer: 'recycle, use public transport, reduce energy' },
      { id: 'q3', type: 'short', question: 'What do many young people do?', correctAnswer: 'volunteering / volontariat' },
    ],
  },
];

const SPANISH_READING: MflReadingTask[] = [
  {
    id: 'es-r1',
    themeId: 'identity',
    tier: 'foundation',
    text: 'Me llamo Ana. Vivo en Barcelona con mi familia. Tengo un gato que se llama Luna. Los fines de semana me gusta nadar y leer libros. Mi libro favorito es una novela de aventuras. ¡También me encanta la paella!',
    questions: [
      { id: 'q1', type: 'short', question: 'What is the girl\'s name?', correctAnswer: 'Ana' },
      { id: 'q2', type: 'short', question: 'Where does she live?', correctAnswer: 'Barcelona' },
      { id: 'q3', type: 'short', question: 'What is her cat called?', correctAnswer: 'Luna' },
      { id: 'q4', type: 'short', question: 'What does she like to do at the weekend?', correctAnswer: 'swim, read / nadar, leer' },
    ],
  },
  {
    id: 'es-r2',
    themeId: 'identity',
    tier: 'foundation',
    text: 'Ayer usé mi móvil para hablar con mis amigos. Después, descargué una aplicación nueva. Por la noche, vi una película en Netflix. ¡Fue muy divertida!',
    questions: [
      { id: 'q1', type: 'short', question: 'When did this happen?', correctAnswer: 'yesterday / ayer' },
      { id: 'q2', type: 'short', question: 'What did the person use the mobile for?', correctAnswer: 'talk to friends / hablar con amigos' },
      { id: 'q3', type: 'short', question: 'What did they watch in the evening?', correctAnswer: 'film / película' },
    ],
  },
  {
    id: 'es-r3',
    themeId: 'local-national-global',
    tier: 'foundation',
    text: 'Mi ciudad tiene una estación de tren, un supermercado y una biblioteca. También hay un estadio de fútbol. En verano voy a la playa con mis amigos. Viajamos en autobús. El viaje dura una hora.',
    questions: [
      { id: 'q1', type: 'short', question: 'What facilities does the city have?', correctAnswer: 'station, supermarket, library, stadium' },
      { id: 'q2', type: 'short', question: 'When does the person go to the beach?', correctAnswer: 'summer / verano' },
      { id: 'q3', type: 'short', question: 'How long does the journey take?', correctAnswer: 'one hour / una hora' },
    ],
  },
  {
    id: 'es-r4',
    themeId: 'future',
    tier: 'foundation',
    text: 'El año que viene voy al instituto. Voy a estudiar ciencias y matemáticas. En el futuro me gustaría ser médico. Mi madre es médica y le encanta su trabajo.',
    questions: [
      { id: 'q1', type: 'short', question: 'Where is the person going next year?', correctAnswer: 'instituto / secondary school' },
      { id: 'q2', type: 'short', question: 'What will they study?', correctAnswer: 'sciences and maths' },
      { id: 'q3', type: 'short', question: 'What job do they want?', correctAnswer: 'doctor / médico' },
    ],
  },
  {
    id: 'es-r5',
    themeId: 'local-national-global',
    tier: 'higher',
    text: 'El calentamiento global afecta a nuestro planeta. Es importante reciclar, usar el transporte público y reducir nuestro consumo de energía. Muchos jóvenes hacen voluntariado para proteger el medio ambiente.',
    questions: [
      { id: 'q1', type: 'short', question: 'What affects our planet?', correctAnswer: 'global warming / calentamiento global' },
      { id: 'q2', type: 'short', question: 'What should we do?', correctAnswer: 'recycle, use public transport, reduce energy' },
      { id: 'q3', type: 'short', question: 'What do many young people do?', correctAnswer: 'volunteering / voluntariado' },
    ],
  },
];

export function getReadingTasks(lang: LanguageId, tier?: 'foundation' | 'higher'): MflReadingTask[] {
  const list = lang === 'french' ? FRENCH_READING : SPANISH_READING;
  if (tier) return list.filter((t) => t.tier === tier);
  return list;
}

export function getReadingTaskById(lang: LanguageId, id: string): MflReadingTask | undefined {
  return getReadingTasks(lang).find((t) => t.id === id);
}
