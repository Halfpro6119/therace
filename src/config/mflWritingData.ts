/**
 * MFL Writing Lab – French & Spanish (AQA 8658/8698)
 */
import type { MflWritingTask } from '../types/mflLab';
import type { LanguageId } from './languagesHubData';

const FRENCH_WRITING: MflWritingTask[] = [
  {
    id: 'fr-w1',
    type: 'photo',
    themeId: 'identity',
    tier: 'foundation',
    prompt: 'Décris la photo. Écris quatre phrases.',
    bullets: ['Qui est sur la photo?', 'Où sont-ils?', 'Qu\'est-ce qu\'ils font?', 'Ton opinion'],
    modelAnswers: {
      grade4: 'Sur la photo il y a une famille. Ils sont à la plage. Ils jouent au volleyball. J\'aime la plage.',
      grade6: 'Sur la photo on voit une famille à la plage. Ils jouent au volleyball ensemble. Il fait beau. À mon avis, c\'est une journée parfaite.',
      grade8: 'Cette photo montre une famille qui passe du temps à la plage. Ils jouent au volleyball, ce qui semble amusant. Le temps est ensoleillé. Je pense que c\'est une excellente façon de passer les vacances en famille.',
    },
  },
  {
    id: 'fr-w2',
    type: '40word',
    themeId: 'identity',
    tier: 'foundation',
    prompt: 'Écris environ 40 mots en français. Tu dois inclure:',
    bullets: ['Ce que tu aimes faire le weekend', 'Avec qui tu le fais', 'Pourquoi tu aimes ça', 'Ce que tu vas faire le weekend prochain'],
    modelAnswers: {
      grade4: 'Le weekend j\'aime jouer au football avec mes amis. C\'est amusant. J\'aime le sport. Le weekend prochain je vais aller au cinéma.',
      grade6: 'Le weekend j\'adore jouer au football avec mes amis au parc. C\'est super parce que nous nous amusons beaucoup. Le weekend prochain je vais aller au cinéma voir un film.',
      grade8: 'Le weekend, j\'aime jouer au football avec mes amis au parc. C\'est génial car nous nous amusons et faisons de l\'exercice. Le weekend prochain, je vais au cinéma voir un film d\'action.',
    },
  },
  {
    id: 'fr-w3',
    type: '90word',
    themeId: 'local-national-global',
    tier: 'foundation',
    prompt: 'Écris environ 90 mots en français. Tu dois inclure:',
    bullets: ['Ta ville ou ton quartier – ce qu\'il y a', 'Ce que tu aimes faire dans ta ville', 'Un voyage que tu as fait récemment', 'Où tu voudrais aller à l\'avenir et pourquoi'],
    modelAnswers: {
      grade6: 'Ma ville est petite mais jolie. Il y a une bibliothèque, une piscine et des magasins. J\'aime aller au centre-ville avec mes amis. L\'été dernier j\'ai voyagé en Espagne. C\'était super! À l\'avenir je voudrais aller au Japon car j\'aime la culture.',
      grade8: 'Ma ville est petite mais agréable. Il y a une bibliothèque, une piscine, un stade et beaucoup de magasins. J\'aime me promener au centre-ville et aller au café avec mes amis. L\'été dernier j\'ai voyagé en Espagne avec ma famille. Nous avons visité Barcelone. À l\'avenir je voudrais aller au Japon car la culture m\'intéresse beaucoup.',
    },
  },
  {
    id: 'fr-w4',
    type: '90word',
    themeId: 'future',
    tier: 'foundation',
    prompt: 'Écris environ 90 mots en français. Tu dois inclure:',
    bullets: ['Ton collège – ce que tu aimes et ce que tu n\'aimes pas', 'Tes matières préférées', 'Tes projets pour après le collège', 'Le métier que tu voudrais faire'],
    modelAnswers: {
      grade6: 'Mon collège est grand. J\'aime les cours de français et de sport. Je n\'aime pas les maths. Après le collège je vais au lycée. Je voudrais étudier les langues. Plus tard je voudrais être professeur.',
      grade8: 'Mon collège est assez grand et moderne. J\'aime les cours de français et d\'EPS car les professeurs sont sympas. Par contre, je n\'aime pas trop les maths. Après le collège je vais au lycée pour étudier les langues. Plus tard je voudrais être professeur de français.',
    },
  },
  {
    id: 'fr-w5',
    type: '150word',
    themeId: 'local-national-global',
    tier: 'higher',
    prompt: 'Écris environ 150 mots en français. Tu dois inclure:',
    bullets: ['Les problèmes environnementaux qui t\'inquiètent', 'Ce que tu fais pour protéger l\'environnement', 'Ce que les jeunes peuvent faire pour aider', 'Ton opinion sur l\'avenir de la planète'],
    modelAnswers: {
      grade8: 'Le réchauffement climatique et la pollution m\'inquiètent beaucoup. Je recycle, j\'utilise les transports en commun et j\'évite le plastique. Les jeunes peuvent faire du volontariat, participer à des manifestations et sensibiliser les autres. Je suis optimiste mais nous devons agir maintenant.',
      grade9: 'Les problèmes environnementaux comme le réchauffement climatique, la pollution plastique et la déforestation m\'inquiètent énormément. Personnellement, je recycle rigoureusement, j\'utilise les transports en commun et je réduis ma consommation. Les jeunes peuvent faire du volontariat, participer à des manifestations pour le climat et sensibiliser leur entourage. Bien que la situation soit grave, je reste optimiste car je vois de plus en plus de jeunes s\'engager. Nous devons agir maintenant pour protéger notre planète.',
    },
  },
];

const SPANISH_WRITING: MflWritingTask[] = [
  {
    id: 'es-w1',
    type: 'photo',
    themeId: 'identity',
    tier: 'foundation',
    prompt: 'Describe la foto. Escribe cuatro frases.',
    bullets: ['¿Quién hay en la foto?', '¿Dónde están?', '¿Qué hacen?', 'Tu opinión'],
    modelAnswers: {
      grade4: 'En la foto hay una familia. Están en la playa. Juegan al voleibol. Me gusta la playa.',
      grade6: 'En la foto veo una familia en la playa. Juegan al voleibol juntos. Hace buen tiempo. En mi opinión, es un día perfecto.',
      grade8: 'Esta foto muestra una familia pasando tiempo en la playa. Juegan al voleibol, lo que parece divertido. El tiempo está soleado. Creo que es una forma excelente de pasar las vacaciones en familia.',
    },
  },
  {
    id: 'es-w2',
    type: '40word',
    themeId: 'identity',
    tier: 'foundation',
    prompt: 'Escribe aproximadamente 40 palabras en español. Debes incluir:',
    bullets: ['Lo que te gusta hacer los fines de semana', 'Con quién lo haces', 'Por qué te gusta', 'Qué vas a hacer el próximo fin de semana'],
    modelAnswers: {
      grade4: 'Los fines de semana me gusta jugar al fútbol con mis amigos. Es divertido. Me gusta el deporte. El próximo fin de semana voy al cine.',
      grade6: 'Los fines de semana me encanta jugar al fútbol con mis amigos en el parque. Es genial porque nos divertimos mucho. El próximo fin de semana voy al cine a ver una película.',
      grade8: 'Los fines de semana me gusta jugar al fútbol con mis amigos en el parque. Es genial porque nos divertimos y hacemos ejercicio. El próximo fin de semana voy al cine a ver una película de acción.',
    },
  },
  {
    id: 'es-w3',
    type: '90word',
    themeId: 'local-national-global',
    tier: 'foundation',
    prompt: 'Escribe aproximadamente 90 palabras en español. Debes incluir:',
    bullets: ['Tu ciudad o barrio – qué hay', 'Qué te gusta hacer en tu ciudad', 'Un viaje que hiciste recientemente', 'Dónde te gustaría ir en el futuro y por qué'],
    modelAnswers: {
      grade6: 'Mi ciudad es pequeña pero bonita. Hay una biblioteca, una piscina y tiendas. Me gusta ir al centro con mis amigos. El verano pasado viajé a España. ¡Fue genial! En el futuro me gustaría ir a Japón porque me gusta la cultura.',
      grade8: 'Mi ciudad es pequeña pero agradable. Hay una biblioteca, una piscina, un estadio y muchas tiendas. Me gusta pasear por el centro e ir al café con mis amigos. El verano pasado viajé a España con mi familia. Visitamos Barcelona. En el futuro me gustaría ir a Japón porque la cultura me interesa mucho.',
    },
  },
  {
    id: 'es-w4',
    type: '90word',
    themeId: 'future',
    tier: 'foundation',
    prompt: 'Escribe aproximadamente 90 palabras en español. Debes incluir:',
    bullets: ['Tu instituto – lo que te gusta y lo que no', 'Tus asignaturas favoritas', 'Tus planes después del instituto', 'El trabajo que te gustaría hacer'],
    modelAnswers: {
      grade6: 'Mi instituto es grande. Me gustan las clases de español y de deporte. No me gustan las matemáticas. Después del instituto voy al bachillerato. Quiero estudiar idiomas. Más tarde me gustaría ser profesor.',
      grade8: 'Mi instituto es bastante grande y moderno. Me gustan las clases de español y de educación física porque los profesores son simpáticos. En cambio, no me gustan mucho las matemáticas. Después del instituto voy al bachillerato para estudiar idiomas. Más tarde me gustaría ser profesor de español.',
    },
  },
  {
    id: 'es-w5',
    type: '150word',
    themeId: 'local-national-global',
    tier: 'higher',
    prompt: 'Escribe aproximadamente 150 palabras en español. Debes incluir:',
    bullets: ['Los problemas medioambientales que te preocupan', 'Lo que haces para proteger el medio ambiente', 'Lo que los jóvenes pueden hacer para ayudar', 'Tu opinión sobre el futuro del planeta'],
    modelAnswers: {
      grade8: 'El calentamiento global y la contaminación me preocupan mucho. Reciclo, uso el transporte público y evito el plástico. Los jóvenes pueden hacer voluntariado, participar en manifestaciones y sensibilizar a los demás. Soy optimista pero debemos actuar ahora.',
      grade9: 'Los problemas medioambientales como el calentamiento global, la contaminación por plásticos y la deforestación me preocupan enormemente. Personalmente, reciclo rigurosamente, uso el transporte público y reduzco mi consumo. Los jóvenes pueden hacer voluntariado, participar en manifestaciones por el clima y sensibilizar a su entorno. Aunque la situación es grave, sigo siendo optimista porque veo a más jóvenes comprometerse. Debemos actuar ahora para proteger nuestro planeta.',
    },
  },
];

export function getWritingTasks(lang: LanguageId, tier?: 'foundation' | 'higher'): MflWritingTask[] {
  const list = lang === 'french' ? FRENCH_WRITING : SPANISH_WRITING;
  if (tier) return list.filter((t) => t.tier === tier);
  return list;
}

export function getWritingTaskById(lang: LanguageId, id: string): MflWritingTask | undefined {
  return getWritingTasks(lang).find((t) => t.id === id);
}
