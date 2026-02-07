/**
 * English Language task bank – Paper 1 (Creative) & Paper 2 (Transactional)
 * Database-driven in future; fixed bank for now.
 */

import type { EnglishLanguageTask } from '../types/englishCampus';

export const ENGLISH_LANGUAGE_TASKS: EnglishLanguageTask[] = [
  // Paper 1 – Creative
  {
    id: 'lang-p1-desc-1',
    paper: 1,
    type: 'description',
    title: 'Describe a busy market',
    prompt: 'Describe a busy market you have visited or imagine visiting. Focus on the sights, sounds and atmosphere.',
    stimulus: 'You might write about: stalls and produce, crowds, weather, smells, a particular moment that stands out.',
    timeRecommendationMins: 45,
    markSchemeSummary: 'AO5: Content and organisation (24 marks) – ideas, structure, paragraphing. AO6: Technical accuracy (16 marks) – spelling, punctuation, grammar.',
  },
  {
    id: 'lang-p1-narr-1',
    paper: 1,
    type: 'narrative',
    title: 'Write the opening of a story',
    prompt: 'Write the opening of a story that begins with: "The door had been locked for years."',
    timeRecommendationMins: 45,
    markSchemeSummary: 'AO5: Content and organisation (24 marks). AO6: Technical accuracy (16 marks). Engage reader; clear structure; varied sentences.',
  },
  {
    id: 'lang-p1-desc-2',
    paper: 1,
    type: 'description',
    title: 'Describe a place that feels like escape',
    prompt: 'Describe a place that feels like an escape from the everyday. Use sensory detail and atmosphere.',
    timeRecommendationMins: 45,
    markSchemeSummary: 'AO5/AO6. Reward ambitious vocabulary, structural shifts, and precise imagery.',
  },
  // Paper 2 – Transactional
  {
    id: 'lang-p2-article-1',
    paper: 2,
    type: 'article',
    title: 'Article: Is technology good for young people?',
    prompt: 'Write an article for a school magazine arguing whether technology is good for young people. You could consider social media, gaming, learning and health.',
    audiencePurpose: 'School magazine; to argue and inform.',
    timeRecommendationMins: 45,
    markSchemeSummary: 'AO5: Content and organisation – clear viewpoint, structure, appropriate tone. AO6: Technical accuracy.',
  },
  {
    id: 'lang-p2-letter-1',
    paper: 2,
    type: 'letter',
    title: 'Letter: persuading the council',
    prompt: 'Write a letter to your local council persuading them to improve facilities for teenagers in your area (e.g. youth club, sports, safe spaces).',
    audiencePurpose: 'Local council; to persuade.',
    timeRecommendationMins: 45,
    markSchemeSummary: 'AO5/AO6. Formal register, clear argument, paragraphing, persuasive techniques.',
  },
  {
    id: 'lang-p2-speech-1',
    paper: 2,
    type: 'speech',
    title: 'Speech: importance of reading',
    prompt: 'Write a speech to be given in assembly on the importance of reading for pleasure.',
    audiencePurpose: 'School assembly; to persuade and inform.',
    timeRecommendationMins: 45,
    markSchemeSummary: 'AO5/AO6. Engaging opening, rhetorical devices, clear structure, appropriate tone.',
  },
  {
    id: 'lang-p2-leaflet-1',
    paper: 2,
    type: 'leaflet',
    title: 'Leaflet: healthy lifestyle',
    prompt: 'Create a leaflet for Year 7 students promoting a healthy lifestyle. Include advice on diet, exercise and sleep.',
    audiencePurpose: 'Year 7 students; to inform and advise.',
    timeRecommendationMins: 45,
    markSchemeSummary: 'AO5/AO6. Clear sections, headings, accessible language, practical advice.',
  },
];

export function getLanguageTasksByPaper(paper: 1 | 2): EnglishLanguageTask[] {
  return ENGLISH_LANGUAGE_TASKS.filter(t => t.paper === paper);
}

export function getLanguageTaskById(id: string): EnglishLanguageTask | undefined {
  return ENGLISH_LANGUAGE_TASKS.find(t => t.id === id);
}
