/**
 * MFL Listening Lab – French & Spanish (AQA 8658/8698)
 * Audio URLs can be added when audio files are available; for now we use transcript-only practice.
 */
import type { MflListeningTask } from '../types/mflLab';
import type { LanguageId } from './languagesHubData';

const FRENCH_LISTENING: MflListeningTask[] = [
  {
    id: 'fr-l1',
    themeId: 'identity',
    tier: 'foundation',
    transcript: 'Bonjour! Je m\'appelle Marie. J\'ai quinze ans et j\'habite à Paris avec ma famille. J\'ai un frère et une sœur. Mon frère s\'appelle Pierre et ma sœur s\'appelle Sophie. J\'aime la musique et le sport. Le weekend, je joue au tennis avec mes amis.',
    transcriptEn: 'Hello! My name is Marie. I am fifteen and I live in Paris with my family. I have a brother and a sister. My brother is called Pierre and my sister is called Sophie. I like music and sport. At the weekend, I play tennis with my friends.',
    questions: [
      { id: 'q1', type: 'short', question: 'How old is Marie?', correctAnswer: '15 / fifteen / quinze' },
      { id: 'q2', type: 'short', question: 'Where does Marie live?', correctAnswer: 'Paris' },
      { id: 'q3', type: 'short', question: 'What is her brother\'s name?', correctAnswer: 'Pierre' },
      { id: 'q4', type: 'short', question: 'What does Marie do at the weekend?', correctAnswer: 'plays tennis / joue au tennis' },
    ],
  },
  {
    id: 'fr-l2',
    themeId: 'identity',
    tier: 'foundation',
    transcript: 'J\'adore les nouvelles technologies. J\'utilise mon portable tous les jours pour envoyer des messages à mes amis. J\'aime aussi regarder des vidéos en ligne. Mais mes parents disent que je passe trop de temps sur mon téléphone!',
    transcriptEn: 'I love new technology. I use my mobile every day to send messages to my friends. I also like watching videos online. But my parents say I spend too much time on my phone!',
    questions: [
      { id: 'q1', type: 'short', question: 'What does the speaker use every day?', correctAnswer: 'mobile / portable / phone' },
      { id: 'q2', type: 'short', question: 'What does the speaker send to friends?', correctAnswer: 'messages' },
      { id: 'q3', type: 'short', question: 'What do the parents say?', correctAnswer: 'too much time on phone / trop de temps' },
    ],
  },
  {
    id: 'fr-l3',
    themeId: 'local-national-global',
    tier: 'foundation',
    transcript: 'Ma ville est petite mais jolie. Il y a une bibliothèque, une piscine et un stade. Le samedi, je vais au centre-ville avec mes amis. Nous prenons le bus. Il y a beaucoup de magasins et de cafés.',
    transcriptEn: 'My town is small but pretty. There is a library, a swimming pool and a stadium. On Saturday, I go to the town centre with my friends. We take the bus. There are lots of shops and cafés.',
    questions: [
      { id: 'q1', type: 'short', question: 'How does the speaker describe the town?', correctAnswer: 'small but pretty / petite mais jolie' },
      { id: 'q2', type: 'short', question: 'What facilities are mentioned?', correctAnswer: 'library, pool, stadium / bibliothèque, piscine, stade' },
      { id: 'q3', type: 'short', question: 'How do they get to the town centre?', correctAnswer: 'bus' },
    ],
  },
  {
    id: 'fr-l4',
    themeId: 'future',
    tier: 'foundation',
    transcript: 'L\'année prochaine, je vais au lycée. Je veux étudier les langues et les sciences. Plus tard, je voudrais être médecin. C\'est mon rêve depuis que j\'étais petit.',
    transcriptEn: 'Next year, I am going to sixth form. I want to study languages and sciences. Later, I would like to be a doctor. It has been my dream since I was little.',
    questions: [
      { id: 'q1', type: 'short', question: 'Where is the speaker going next year?', correctAnswer: 'lycée / sixth form' },
      { id: 'q2', type: 'short', question: 'What does the speaker want to study?', correctAnswer: 'languages and sciences' },
      { id: 'q3', type: 'short', question: 'What job does the speaker want?', correctAnswer: 'doctor / médecin' },
    ],
  },
  {
    id: 'fr-l5',
    themeId: 'local-national-global',
    tier: 'higher',
    transcript: 'Le réchauffement climatique est un problème grave. Dans mon pays, nous essayons de recycler plus et d\'utiliser les transports en commun. Je pense que tout le monde doit faire des efforts pour protéger l\'environnement.',
    transcriptEn: 'Global warming is a serious problem. In my country, we try to recycle more and use public transport. I think everyone must make an effort to protect the environment.',
    questions: [
      { id: 'q1', type: 'short', question: 'What problem is mentioned?', correctAnswer: 'global warming / réchauffement climatique' },
      { id: 'q2', type: 'short', question: 'What do they try to do?', correctAnswer: 'recycle more, use public transport' },
      { id: 'q3', type: 'short', question: 'What does the speaker think everyone must do?', correctAnswer: 'make an effort / protect environment' },
    ],
  },
  {
    id: 'fr-l6',
    themeId: 'identity',
    tier: 'foundation',
    transcript: 'J\'aime beaucoup Noël. C\'est ma fête préférée. Nous décorons le sapin et mangeons ensemble. Je reçois des cadeaux de ma famille. L\'année dernière j\'ai eu un vélo.',
    transcriptEn: 'I really like Christmas. It\'s my favourite celebration. We decorate the tree and eat together. I receive presents from my family. Last year I got a bike.',
    questions: [
      { id: 'q1', type: 'short', question: 'What is the speaker\'s favourite celebration?', correctAnswer: 'Christmas / Noël' },
      { id: 'q2', type: 'short', question: 'What do they do together?', correctAnswer: 'decorate tree, eat / décorer, manger' },
      { id: 'q3', type: 'short', question: 'What did the speaker receive last year?', correctAnswer: 'bike / vélo' },
    ],
  },
  {
    id: 'fr-l7',
    themeId: 'future',
    tier: 'foundation',
    transcript: 'Je vais passer mon examen de français la semaine prochaine. Je révise tous les soirs. Mon professeur dit que je fais des progrès. J\'espère avoir une bonne note.',
    transcriptEn: 'I am going to take my French exam next week. I revise every evening. My teacher says I am making progress. I hope to get a good grade.',
    questions: [
      { id: 'q1', type: 'short', question: 'When is the exam?', correctAnswer: 'next week / semaine prochaine' },
      { id: 'q2', type: 'short', question: 'When does the speaker revise?', correctAnswer: 'every evening / tous les soirs' },
      { id: 'q3', type: 'short', question: 'What does the teacher say?', correctAnswer: 'making progress / fait des progrès' },
    ],
  },
  {
    id: 'fr-l8',
    themeId: 'local-national-global',
    tier: 'foundation',
    transcript: 'L\'été dernier nous avons voyagé en Italie. Nous avons visité Rome et Florence. Les monuments sont magnifiques. La nourriture était délicieuse. Je voudrais y retourner.',
    transcriptEn: 'Last summer we travelled to Italy. We visited Rome and Florence. The monuments are magnificent. The food was delicious. I would like to go back.',
    questions: [
      { id: 'q1', type: 'short', question: 'Where did they travel?', correctAnswer: 'Italy / Italie' },
      { id: 'q2', type: 'short', question: 'Which cities did they visit?', correctAnswer: 'Rome and Florence' },
      { id: 'q3', type: 'short', question: 'What does the speaker want to do?', correctAnswer: 'go back / retourner' },
    ],
  },
];

const SPANISH_LISTENING: MflListeningTask[] = [
  {
    id: 'es-l1',
    themeId: 'identity',
    tier: 'foundation',
    transcript: '¡Hola! Me llamo Carlos. Tengo catorce años y vivo en Madrid con mi familia. Tengo dos hermanos. Me gusta el fútbol y la música. Los fines de semana juego al fútbol con mis amigos en el parque.',
    transcriptEn: 'Hi! My name is Carlos. I am fourteen and I live in Madrid with my family. I have two brothers. I like football and music. At the weekend I play football with my friends in the park.',
    questions: [
      { id: 'q1', type: 'short', question: 'How old is Carlos?', correctAnswer: '14 / fourteen / catorce' },
      { id: 'q2', type: 'short', question: 'Where does Carlos live?', correctAnswer: 'Madrid' },
      { id: 'q3', type: 'short', question: 'How many brothers does he have?', correctAnswer: 'two / dos' },
      { id: 'q4', type: 'short', question: 'What does he do at the weekend?', correctAnswer: 'plays football / juega al fútbol' },
    ],
  },
  {
    id: 'es-l2',
    themeId: 'identity',
    tier: 'foundation',
    transcript: 'Uso las redes sociales todos los días. Envío mensajes a mis amigos y veo videos. Pero mi madre dice que paso demasiado tiempo con el móvil. Tiene razón, pero es difícil dejar de usarlo!',
    transcriptEn: 'I use social media every day. I send messages to my friends and watch videos. But my mother says I spend too much time on my mobile. She is right, but it is difficult to stop using it!',
    questions: [
      { id: 'q1', type: 'short', question: 'What does the speaker use every day?', correctAnswer: 'social media / redes sociales' },
      { id: 'q2', type: 'short', question: 'What does the mother say?', correctAnswer: 'too much time on mobile' },
    ],
  },
  {
    id: 'es-l3',
    themeId: 'local-national-global',
    tier: 'foundation',
    transcript: 'Mi ciudad es grande y moderna. Hay muchos edificios altos, tiendas y restaurantes. En el centro hay una plaza muy bonita. Me gusta pasear por la ciudad los domingos.',
    transcriptEn: 'My city is big and modern. There are many tall buildings, shops and restaurants. In the centre there is a very pretty square. I like walking around the city on Sundays.',
    questions: [
      { id: 'q1', type: 'short', question: 'How is the city described?', correctAnswer: 'big and modern / grande y moderna' },
      { id: 'q2', type: 'short', question: 'What is in the centre?', correctAnswer: 'pretty square / plaza bonita' },
      { id: 'q3', type: 'short', question: 'When does the speaker like walking?', correctAnswer: 'Sundays / domingos' },
    ],
  },
  {
    id: 'es-l4',
    themeId: 'future',
    tier: 'foundation',
    transcript: 'El año que viene voy al instituto. Quiero estudiar ciencias y matemáticas. En el futuro me gustaría ser ingeniero. Es mi sueño desde hace muchos años.',
    transcriptEn: 'Next year I am going to secondary school. I want to study sciences and maths. In the future I would like to be an engineer. It has been my dream for many years.',
    questions: [
      { id: 'q1', type: 'short', question: 'Where is the speaker going next year?', correctAnswer: 'instituto / secondary school' },
      { id: 'q2', type: 'short', question: 'What does the speaker want to study?', correctAnswer: 'sciences and maths' },
      { id: 'q3', type: 'short', question: 'What job does the speaker want?', correctAnswer: 'engineer / ingeniero' },
    ],
  },
  {
    id: 'es-l5',
    themeId: 'local-national-global',
    tier: 'higher',
    transcript: 'El calentamiento global es un problema muy serio. En mi opinión, todos debemos reciclar más y usar el transporte público. También es importante reducir el consumo de plástico.',
    transcriptEn: 'Global warming is a very serious problem. In my opinion, we all must recycle more and use public transport. It is also important to reduce plastic consumption.',
    questions: [
      { id: 'q1', type: 'short', question: 'What problem is mentioned?', correctAnswer: 'global warming / calentamiento global' },
      { id: 'q2', type: 'short', question: 'What should we do?', correctAnswer: 'recycle more, use public transport' },
      { id: 'q3', type: 'short', question: 'What else is important?', correctAnswer: 'reduce plastic consumption' },
    ],
  },
  {
    id: 'es-l6',
    themeId: 'identity',
    tier: 'foundation',
    transcript: 'Me encanta la Navidad. Es mi fiesta favorita. Decoramos el árbol y comemos juntos. Recibo regalos de mi familia. El año pasado recibí una bicicleta.',
    transcriptEn: 'I love Christmas. It\'s my favourite celebration. We decorate the tree and eat together. I receive presents from my family. Last year I got a bike.',
    questions: [
      { id: 'q1', type: 'short', question: 'What is the speaker\'s favourite celebration?', correctAnswer: 'Christmas / Navidad' },
      { id: 'q2', type: 'short', question: 'What do they do together?', correctAnswer: 'decorate tree, eat' },
      { id: 'q3', type: 'short', question: 'What did the speaker receive last year?', correctAnswer: 'bike / bicicleta' },
    ],
  },
  {
    id: 'es-l7',
    themeId: 'future',
    tier: 'foundation',
    transcript: 'Voy a hacer mi examen de español la semana que viene. Repaso todas las noches. Mi profesor dice que hago progresos. Espero sacar una buena nota.',
    transcriptEn: 'I am going to take my Spanish exam next week. I revise every evening. My teacher says I am making progress. I hope to get a good grade.',
    questions: [
      { id: 'q1', type: 'short', question: 'When is the exam?', correctAnswer: 'next week' },
      { id: 'q2', type: 'short', question: 'When does the speaker revise?', correctAnswer: 'every evening / todas las noches' },
      { id: 'q3', type: 'short', question: 'What does the teacher say?', correctAnswer: 'making progress / hace progresos' },
    ],
  },
  {
    id: 'es-l8',
    themeId: 'local-national-global',
    tier: 'foundation',
    transcript: 'El verano pasado viajamos a Italia. Visitamos Roma y Florencia. Los monumentos son magníficos. La comida estaba deliciosa. Me gustaría volver.',
    transcriptEn: 'Last summer we travelled to Italy. We visited Rome and Florence. The monuments are magnificent. The food was delicious. I would like to go back.',
    questions: [
      { id: 'q1', type: 'short', question: 'Where did they travel?', correctAnswer: 'Italy / Italia' },
      { id: 'q2', type: 'short', question: 'Which cities did they visit?', correctAnswer: 'Rome and Florence' },
      { id: 'q3', type: 'short', question: 'What does the speaker want to do?', correctAnswer: 'go back / volver' },
    ],
  },
];

export function getListeningTasks(lang: LanguageId, tier?: 'foundation' | 'higher'): MflListeningTask[] {
  const list = lang === 'french' ? FRENCH_LISTENING : SPANISH_LISTENING;
  if (tier) return list.filter((t) => t.tier === tier);
  return list;
}

export function getListeningTaskById(lang: LanguageId, id: string): MflListeningTask | undefined {
  return getListeningTasks(lang).find((t) => t.id === id);
}
