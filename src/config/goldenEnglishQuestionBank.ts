/**
 * English Campus – Golden Question Bank
 *
 * Exam-realistic, LLM-implementable, expandable backbone for Language / Literature / Vocab.
 * Each task can have its own mark scheme, checklist, and models.
 * Aligned with ENGLISH_CAMPUS_SPEC.md and the full question list spec.
 */

import type {
  EnglishLanguageReadingTask,
  GoldenEnglishWritingTask,
  EnglishLiteraturePoetrySeenSingle,
  EnglishLiteraturePoetrySeenComparison,
  EnglishLiteratureUnseenPoetry,
  EnglishLiteratureTextTask,
  EnglishVocabTask,
  LiteratureTaskInfo,
  LiteratureTaskType,
} from '../types/englishCampus';

// ---------------------------------------------------------------------------
// 🗣️ ENGLISH LANGUAGE MODE
// ---------------------------------------------------------------------------

// ---------- LANGUAGE PAPER 1 — SECTION A: Reading (Short Analysis) ----------

export const LANGUAGE_PAPER_1_READING: EnglishLanguageReadingTask[] = [
  {
    id: 'L1-A01',
    paper: 1,
    type: 'analysisShort',
    prompt: 'Explain how the writer creates tension in this extract.',
    focus: 'language + structure',
    markSchemeSummary: 'AO2: Analyse language and structure. Reward clear analysis of methods and effects.',
  },
  {
    id: 'L1-A02',
    paper: 1,
    type: 'analysisShort',
    prompt: 'How does the writer describe the setting to interest the reader?',
    focus: 'imagery, sensory language',
    markSchemeSummary: 'AO2: Analyse language. Reward comment on imagery, sensory detail, effect on reader.',
  },
  {
    id: 'L1-A03',
    paper: 1,
    type: 'analysisShort',
    prompt: 'How does the writer structure the opening of the text?',
    focus: 'openings, shifts, withholding information',
    markSchemeSummary: 'AO2: Analyse structure. Reward comment on order, pace, shifts, withholding.',
  },
  {
    id: 'L1-A04',
    paper: 1,
    type: 'evaluation',
    prompt: 'To what extent do you agree that the writer makes the character seem dangerous?',
    focus: 'evaluation + evidence',
    markSchemeSummary: 'AO4: Evaluate. Reward supported judgement and use of evidence.',
  },
];

// ---------- LANGUAGE PAPER 1 — SECTION B: Creative Writing ----------

export const LANGUAGE_PAPER_1_WRITING: GoldenEnglishWritingTask[] = [
  {
    id: 'L1-W01',
    paper: 1,
    type: 'description',
    title: 'Write a description suggested by this image.',
    prompt: 'Write a description suggested by this image.',
    form: 'Description',
    stimulusType: 'image',
    imageUrl: '/images/english/Beautiful%20Lagoon.jpg',
    timeRecommendationMins: 45,
    marks: 40,
    markSchemeSummary: 'AO5: Content and organisation (24 marks). AO6: Technical accuracy (16 marks). Sensory detail, structure, ambitious vocabulary.',
    planningHint: 'Note 3–4 striking details from the image; plan a clear shift (e.g. zoom in/out, time, focus).',
  },
  {
    id: 'L1-W02',
    paper: 1,
    type: 'narrative',
    title: 'Write a story that begins with: "The door was already open."',
    prompt: 'Write a story that begins with: "The door was already open."',
    form: 'Narrative',
    stimulusType: 'openingLine',
    stimulus: 'Opening line: "The door was already open."',
    timeRecommendationMins: 45,
    marks: 40,
    markSchemeSummary: 'AO5/AO6. Engage reader; clear structure; varied sentences; coherent narrative.',
    planningHint: 'Decide who the narrator is, what they find beyond the door, and one clear shift or twist.',
  },
  {
    id: 'L1-W03',
    paper: 1,
    type: 'description',
    title: 'Describe a place as it changes over time.',
    prompt: 'Describe a place as it changes over time.',
    form: 'Description',
    stimulusType: 'scenario',
    timeRecommendationMins: 45,
    marks: 40,
    markSchemeSummary: 'AO5/AO6. Structural shift through time; sensory detail; atmosphere.',
    planningHint: 'Choose a place and 2–3 time points (e.g. dawn, midday, dusk) to show change.',
  },
  {
    id: 'L1-W04',
    paper: 1,
    type: 'narrative',
    title: 'Write a story where a character faces an unexpected problem.',
    prompt: 'Write a story where a character faces an unexpected problem.',
    form: 'Narrative',
    stimulusType: 'scenario',
    timeRecommendationMins: 45,
    marks: 40,
    markSchemeSummary: 'AO5/AO6. Clear problem; character response; structure and pace.',
    planningHint: 'Establish normality first, then introduce the unexpected problem and its consequences.',
  },
  {
    id: 'L1-W05',
    paper: 1,
    type: 'description',
    title: 'Describe a time when everything felt silent.',
    prompt: 'Describe a time when everything felt silent.',
    form: 'Description',
    stimulusType: 'scenario',
    timeRecommendationMins: 45,
    marks: 40,
    markSchemeSummary: 'AO5/AO6. Contrast sound/silence; sensory detail; mood and atmosphere.',
    planningHint: 'Use contrast (what is usually heard vs the silence) and internal sensation.',
  },
];

// ---------- LANGUAGE PAPER 2 — SECTION A: Comparison & Analysis ----------

export const LANGUAGE_PAPER_2_READING: EnglishLanguageReadingTask[] = [
  {
    id: 'L2-A01',
    paper: 2,
    type: 'analysisShort',
    prompt: "What impressions do you get of the writer's viewpoint in Source A?",
    focus: 'viewpoint, perspective, attitude',
    markSchemeSummary: 'AO1: Read and understand. AO3: Compare. Reward inference about writer viewpoint.',
  },
  {
    id: 'L2-A02',
    paper: 2,
    type: 'analysisShort',
    prompt: 'How does the writer use language to influence the reader in Source B?',
    focus: 'language, persuasion, effect',
    markSchemeSummary: 'AO2: Analyse language. Reward methods and effects on reader.',
  },
  {
    id: 'L2-A03',
    paper: 2,
    type: 'comparison',
    prompt: 'Compare how the writers present similar ideas in Source A and Source B.',
    focus: 'comparison, methods, ideas',
    markSchemeSummary: 'AO3: Compare writers’ ideas and perspectives. Reward sustained comparison.',
  },
  {
    id: 'L2-A04',
    paper: 2,
    type: 'evaluation',
    prompt: 'To what extent do you agree that both writers present the topic positively?',
    focus: 'evaluation, comparison, evidence',
    markSchemeSummary: 'AO4: Evaluate. Reward supported judgement across both sources.',
  },
];

// ---------- LANGUAGE PAPER 2 — SECTION B: Transactional Writing ----------

export const LANGUAGE_PAPER_2_WRITING: GoldenEnglishWritingTask[] = [
  {
    id: 'L2-W01',
    paper: 2,
    type: 'speech',
    title: 'Write a speech arguing for or against school uniforms.',
    prompt: 'Write a speech arguing for or against school uniforms.',
    form: 'Speech',
    audiencePurpose: 'Students; to argue and persuade.',
    timeRecommendationMins: 45,
    marks: 40,
    markSchemeSummary: 'AO5/AO6. Clear viewpoint, rhetorical devices, structure, appropriate tone for audience.',
    planningHint: 'Decide for/against; plan 2–3 main reasons; opening that hooks; conclusion that reinforces.',
  },
  {
    id: 'L2-W02',
    paper: 2,
    type: 'article',
    title: 'Write an article for a website about the importance of protecting the environment.',
    prompt: 'Write an article for a website about the importance of protecting the environment.',
    form: 'Article',
    audiencePurpose: 'Website readers; to inform and persuade.',
    timeRecommendationMins: 45,
    marks: 40,
    markSchemeSummary: 'AO5/AO6. Engaging headline and tone; clear argument; range of ideas.',
    planningHint: 'Headline + 2–3 key points (e.g. wildlife, climate, future); call to action.',
  },
  {
    id: 'L2-W03',
    paper: 2,
    type: 'letter',
    title: 'Write a letter to your local council about a problem in your area.',
    prompt: 'Write a letter to your local council about a problem in your area.',
    form: 'Formal letter',
    audiencePurpose: 'Local council; to inform and persuade.',
    timeRecommendationMins: 45,
    marks: 40,
    markSchemeSummary: 'AO5/AO6. Formal register, clear problem and solutions, paragraphing.',
    planningHint: 'Address, date, formal greeting; state problem; evidence; suggested actions; formal close.',
  },
  {
    id: 'L2-W04',
    paper: 2,
    type: 'leaflet',
    title: 'Write a leaflet giving advice to teenagers about online safety.',
    prompt: 'Write a leaflet giving advice to teenagers about online safety.',
    form: 'Leaflet',
    audiencePurpose: 'Teenagers; to advise and inform.',
    timeRecommendationMins: 45,
    marks: 40,
    markSchemeSummary: 'AO5/AO6. Clear sections/headings, accessible language, practical advice.',
    planningHint: 'Catchy title; 3–4 sections (e.g. privacy, strangers, sharing, who to tell).',
  },
  {
    id: 'L2-W05',
    paper: 2,
    type: 'report',
    title: 'Write a report for your headteacher about improving school facilities.',
    prompt: 'Write a report for your headteacher about improving school facilities.',
    form: 'Report',
    audiencePurpose: 'Headteacher; to inform and recommend.',
    timeRecommendationMins: 45,
    marks: 40,
    markSchemeSummary: 'AO5/AO6. Formal tone, clear structure, evidence/reasons, recommendations.',
    planningHint: 'Title; introduction; current situation; proposed improvements; conclusion.',
  },
];

// ---------------------------------------------------------------------------
// 📚 ENGLISH LITERATURE MODE
// ---------------------------------------------------------------------------

// ---------- POETRY — SEEN (ANTHOLOGY): Single Poem ----------

export const LITERATURE_POETRY_SEEN_SINGLE: EnglishLiteraturePoetrySeenSingle[] = [
  { id: 'P-S01', poem: 'Ozymandias', prompt: 'How does the poet present power in Ozymandias?', focus: 'power', markSchemeSummary: 'AO2: Analyse language, form, structure. AO1: Respond to theme.' },
  { id: 'P-S03', poem: 'Kamikaze', prompt: 'How does the poet present memory in Kamikaze?', focus: 'memory', markSchemeSummary: 'AO2/AO1. Language and structure; memory and perspective.' },
];

// ---------- POETRY — SEEN: Comparison ----------

export const LITERATURE_POETRY_SEEN_COMPARISON: EnglishLiteraturePoetrySeenComparison[] = [
  { id: 'P-C02', poemA: 'Exposure', poemB: 'Bayonet Charge', prompt: 'Compare how conflict is presented in Exposure and Bayonet Charge.', focus: 'conflict', markSchemeSummary: 'AO3/AO2. Sustained comparison of writers’ ideas and methods.' },
  { id: 'P-C03', poemA: 'Checking Out Me History', poemB: 'Kamikaze', prompt: 'Compare how identity is explored in Checking Out Me History and Kamikaze.', focus: 'identity', markSchemeSummary: 'AO3/AO2. Identity and perspective across both poems.' },
];

// ---------- UNSEEN POETRY ----------

export const LITERATURE_UNSEEN_POETRY: EnglishLiteratureUnseenPoetry[] = [
  { id: 'UP-02', type: 'analysis', prompt: 'How does the poet use language and structure to create a sense of tension?', focus: 'language and structure, tension', markSchemeSummary: 'AO2. Methods and effects.' },
  { id: 'UP-C02', type: 'comparison', prompt: 'Compare how imagery is used in both poems.', focus: 'imagery', markSchemeSummary: 'AO3/AO2. Comparison of use of imagery.' },
];

// ---------- LITERATURE TEXTS (Novels & Plays) ----------

export const LITERATURE_TEXT_MACBETH: EnglishLiteratureTextTask[] = [
  { id: 'M-03', text: 'Macbeth', prompt: 'How does Shakespeare present guilt in the play as a whole?', focus: 'guilt', scope: 'whole', markSchemeSummary: 'AO1/AO2/AO3. Thematic response; methods and context.' },
];

export const LITERATURE_TEXT_CHRISTMAS_CAROL: EnglishLiteratureTextTask[] = [
  { id: 'ACC-01', text: 'AChristmasCarol', prompt: 'How does Dickens present Scrooge as selfish in this extract?', focus: 'Scrooge, selfishness', scope: 'extract', markSchemeSummary: 'AO1/AO2.' },
  { id: 'ACC-02', text: 'AChristmasCarol', prompt: 'How does Dickens present the theme of redemption?', focus: 'redemption', scope: 'whole', markSchemeSummary: 'AO1/AO2/AO3.' },
  { id: 'ACC-03', text: 'AChristmasCarol', prompt: 'How does Dickens use the character of the Cratchits to convey his message?', focus: 'Cratchits, message', scope: 'whole', markSchemeSummary: 'AO1/AO2/AO3.' },
];

export const LITERATURE_TEXT_JEKYLL_HYDE: EnglishLiteratureTextTask[] = [
  { id: 'JH-01', text: 'JekyllHyde', prompt: 'How does Stevenson present Hyde as frightening?', focus: 'Hyde, fear', scope: 'both', markSchemeSummary: 'AO1/AO2.' },
  { id: 'JH-02', text: 'JekyllHyde', prompt: 'How does Stevenson explore duality through Jekyll?', focus: 'duality, Jekyll', scope: 'whole', markSchemeSummary: 'AO1/AO2/AO3.' },
];

export const LITERATURE_TEXT_INSPECTOR_CALLS: EnglishLiteratureTextTask[] = [
  { id: 'AIC-01', text: 'AnInspectorCalls', prompt: 'How does Priestley present responsibility in the play?', focus: 'responsibility', scope: 'whole', markSchemeSummary: 'AO1/AO2/AO3.' },
  { id: 'AIC-02', text: 'AnInspectorCalls', prompt: 'How does Priestley use the Inspector to convey his ideas?', focus: 'Inspector, ideas', scope: 'whole', markSchemeSummary: 'AO1/AO2/AO3.' },
];

/** All literature text tasks by text code */
export const LITERATURE_TEXT_TASKS: Record<string, EnglishLiteratureTextTask[]> = {
  Macbeth: LITERATURE_TEXT_MACBETH,
  AChristmasCarol: LITERATURE_TEXT_CHRISTMAS_CAROL,
  JekyllHyde: LITERATURE_TEXT_JEKYLL_HYDE,
  AnInspectorCalls: LITERATURE_TEXT_INSPECTOR_CALLS,
};

// ---------------------------------------------------------------------------
// 🔤 VOCAB LAB
// ---------------------------------------------------------------------------

export const VOCAB_TASKS: EnglishVocabTask[] = [
  { id: 'V-01', type: 'spellFromDefinition', prompt: 'Spell the word meaning: showing intense anger.', stimulus: 'showing intense anger', expectedAnswer: 'furious' },
  { id: 'V-02', type: 'spellFromDefinition', prompt: 'Spell the word meaning: a feeling of deep regret.', stimulus: 'a feeling of deep regret', expectedAnswer: 'remorse' },
  { id: 'V-03', type: 'meaningFromWord', prompt: 'What does melancholy mean?', stimulus: 'melancholy', expectedAnswer: 'sad, gloomy, sorrowful' },
  { id: 'V-04', type: 'upgradeWord', prompt: 'Replace "sad" with a more ambitious word.', stimulus: 'sad', expectedAnswer: 'melancholy, despondent, sorrowful, forlorn' },
  { id: 'V-05', type: 'upgradeWord', prompt: 'Replace "said" with a verb showing anger.', stimulus: 'said', expectedAnswer: 'snapped, snarled, barked, hissed' },
  { id: 'V-06', type: 'useInContext', prompt: 'Write a sentence using the word "reluctant" accurately.', stimulus: 'reluctant', expectedAnswer: '' },
];

// ---------------------------------------------------------------------------
// HELPERS & AGGREGATES
// ---------------------------------------------------------------------------

/** All Language Paper 1 & 2 writing tasks (for workspace; compatible with EnglishLanguageTask) */
export const ALL_LANGUAGE_WRITING_TASKS: GoldenEnglishWritingTask[] = [
  ...LANGUAGE_PAPER_1_WRITING,
  ...LANGUAGE_PAPER_2_WRITING,
];

/** All Language reading tasks */
export const ALL_LANGUAGE_READING_TASKS: EnglishLanguageReadingTask[] = [
  ...LANGUAGE_PAPER_1_READING,
  ...LANGUAGE_PAPER_2_READING,
];

export function getLanguageWritingTaskById(id: string): GoldenEnglishWritingTask | undefined {
  return ALL_LANGUAGE_WRITING_TASKS.find(t => t.id === id);
}

export function getLanguageWritingTasksByPaper(paper: 1 | 2): GoldenEnglishWritingTask[] {
  return paper === 1 ? LANGUAGE_PAPER_1_WRITING : LANGUAGE_PAPER_2_WRITING;
}

export function getLanguageReadingTaskById(id: string): EnglishLanguageReadingTask | undefined {
  return ALL_LANGUAGE_READING_TASKS.find(t => t.id === id);
}

export function getLiteratureTextTasksByText(text: string): EnglishLiteratureTextTask[] {
  return LITERATURE_TEXT_TASKS[text] ?? [];
}

export function getLiteratureTextTaskById(id: string): EnglishLiteratureTextTask | undefined {
  for (const arr of Object.values(LITERATURE_TEXT_TASKS)) {
    const found = arr.find(t => t.id === id);
    if (found) return found;
  }
  return undefined;
}

export function getVocabTaskById(id: string): EnglishVocabTask | undefined {
  return VOCAB_TASKS.find(t => t.id === id);
}

// ---------------------------------------------------------------------------
// LITERATURE TASK RESOLVER (unified for workspace)
// ---------------------------------------------------------------------------

const LIT_TIME_MINS = 45;

function toLiteratureTaskInfo(
  id: string,
  title: string,
  prompt: string,
  taskType: LiteratureTaskType,
  subtitle?: string
): LiteratureTaskInfo {
  return {
    id,
    title,
    prompt,
    timeRecommendationMins: LIT_TIME_MINS,
    taskType,
    subtitle,
  };
}

/** Get a single literature task by id (any pillar). Returns unified LiteratureTaskInfo for workspace. */
export function getLiteratureTaskById(id: string): LiteratureTaskInfo | undefined {
  const seenSingle = LITERATURE_POETRY_SEEN_SINGLE.find(t => t.id === id);
  if (seenSingle)
    return toLiteratureTaskInfo(
      seenSingle.id,
      seenSingle.prompt,
      seenSingle.prompt,
      'seen-single',
      seenSingle.poem
    );

  const seenComp = LITERATURE_POETRY_SEEN_COMPARISON.find(t => t.id === id);
  if (seenComp)
    return toLiteratureTaskInfo(
      seenComp.id,
      seenComp.prompt,
      seenComp.prompt,
      'seen-comparison',
      `${seenComp.poemA} & ${seenComp.poemB}`
    );

  const unseen = LITERATURE_UNSEEN_POETRY.find(t => t.id === id);
  if (unseen)
    return toLiteratureTaskInfo(
      unseen.id,
      unseen.prompt,
      unseen.prompt,
      unseen.type === 'analysis' ? 'unseen-analysis' : 'unseen-comparison',
      unseen.type === 'analysis' ? 'Unseen poem' : 'Unseen comparison'
    );

  for (const arr of Object.values(LITERATURE_TEXT_TASKS)) {
    const textTask = arr.find(t => t.id === id);
    if (textTask)
      return toLiteratureTaskInfo(
        textTask.id,
        textTask.prompt,
        textTask.prompt,
        'text',
        textTask.text
      );
  }
  return undefined;
}

/** Seen poetry tasks (single + comparison) for Poetry Diary / Compare. */
export function getSeenPoetryLiteratureTasks(): LiteratureTaskInfo[] {
  const out: LiteratureTaskInfo[] = [];
  for (const t of LITERATURE_POETRY_SEEN_SINGLE) {
    const info = getLiteratureTaskById(t.id);
    if (info) out.push(info);
  }
  for (const t of LITERATURE_POETRY_SEEN_COMPARISON) {
    const info = getLiteratureTaskById(t.id);
    if (info) out.push(info);
  }
  return out;
}

/** Unseen poetry tasks (analysis + comparison). */
export function getUnseenPoetryLiteratureTasks(): LiteratureTaskInfo[] {
  return LITERATURE_UNSEEN_POETRY.map(t => getLiteratureTaskById(t.id)).filter(
    (x): x is LiteratureTaskInfo => x != null
  );
}

/** All text tasks grouped by text code (Macbeth, etc.). */
export function getTextLiteratureTasksByText(): Record<string, LiteratureTaskInfo[]> {
  const record: Record<string, LiteratureTaskInfo[]> = {};
  for (const [textCode, tasks] of Object.entries(LITERATURE_TEXT_TASKS)) {
    record[textCode] = tasks
      .map(t => getLiteratureTaskById(t.id))
      .filter((x): x is LiteratureTaskInfo => x != null);
  }
  return record;
}
