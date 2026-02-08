/**
 * Examiner-pack content for all 8 English Language Section A reading tasks.
 * Checklist, mark scheme, step-by-step method, and Grade 4/6/8/9 model answers.
 * Calibrated to 12–15 minute responses (8 or 12 marks).
 */

import type { EnglishExaminerPackTask } from '../types/englishCampus';

function pack(
  checklistItems: EnglishExaminerPackTask['checklistItems'],
  markSchemeDetail: string,
  stepByStepMethod: string,
  modelAnswers: EnglishExaminerPackTask['modelAnswers']
): EnglishExaminerPackTask {
  return { checklistItems, markSchemeDetail, stepByStepMethod, modelAnswers };
}

// ----- L1-A01: Explain how the writer creates tension -----
const L1_A01: EnglishExaminerPackTask = pack(
  [
    { id: 'L1-A01-1', label: 'I focus clearly on how tension is created', ao: 'AO2' },
    { id: 'L1-A01-2', label: 'I identify specific language choices that create tension', ao: 'AO2' },
    { id: 'L1-A01-3', label: 'I analyse structural features such as pace or sentence length', ao: 'AO2' },
    { id: 'L1-A01-4', label: 'I use short, relevant quotations or references', ao: 'AO2' },
    { id: 'L1-A01-5', label: 'I explain the effect of methods on the reader', ao: 'AO2' },
    { id: 'L1-A01-6', label: 'I link methods directly to tension, not general mood', ao: 'AO2' },
    { id: 'L1-A01-7', label: 'I avoid retelling the extract', ao: 'AO2' },
    { id: 'L1-A01-8', label: 'I write clearly and precisely', ao: 'AO2' },
  ],
  'AO2 (8 marks): Top-band responses analyse both language and structure with clear focus on tension, selecting precise references and explaining effects. Weak answers describe events, list techniques, or make vague comments about mood. Weak: narrative summary, technique spotting, unclear effects.',
  'Step 1 (2 min): Identify where tension is strongest. Step 2 (3 min): Pick 2–3 language/structure methods. Step 3 (8 min): Write 1–2 analytical paragraphs. Step 4 (2 min): Check focus on tension.',
  {
    grade4: "The writer creates tension by using language that suggests something bad might happen. Words that describe silence or waiting make the reader feel uneasy. The structure also helps because short sentences make moments feel sudden and tense. This keeps the reader interested.",
    grade6: "Tension is created through careful language choices and structure. The writer uses words that suggest uncertainty, making the reader expect danger. Short sentences increase the pace, which builds tension. These methods work together to keep the reader anxious.",
    grade8: "The writer creates tension by combining restrained language with controlled structure. Descriptions that suggest silence or hesitation create anticipation. Structurally, short sentences and abrupt paragraph breaks increase pace and reflect rising tension, keeping the reader alert.",
    grade9: "The writer creates tension by withholding information and controlling pace. Language associated with stillness and uncertainty forces the reader to anticipate what might happen next. Structurally, sudden short sentences disrupt the flow, mirroring rising anxiety. An alternative reading is that the tension is psychological rather than physical, rooted in fear of the unknown.",
  }
);

// ----- L1-A02: How does the writer describe the setting to interest the reader? -----
const L1_A02: EnglishExaminerPackTask = pack(
  [
    { id: 'L1-A02-1', label: 'I focus on how the setting is made interesting', ao: 'AO2' },
    { id: 'L1-A02-2', label: 'I identify sensory or descriptive language', ao: 'AO2' },
    { id: 'L1-A02-3', label: 'I explain the effect of imagery', ao: 'AO2' },
    { id: 'L1-A02-4', label: 'I select short references to the text', ao: 'AO2' },
    { id: 'L1-A02-5', label: 'I link description to reader engagement', ao: 'AO2' },
    { id: 'L1-A02-6', label: 'I avoid simply listing features of the setting', ao: 'AO2' },
    { id: 'L1-A02-7', label: 'I analyse rather than describe', ao: 'AO2' },
    { id: 'L1-A02-8', label: 'I write clearly and concisely', ao: 'AO2' },
  ],
  'AO2 (8 marks): Top-band answers analyse how imagery and sensory language engage the reader. Weak answers describe the setting without analysis. Weak: listing details, vague effects, no focus on interest.',
  'Step 1 (2 min): Identify key setting details. Step 2 (3 min): Choose 2 language features. Step 3 (8 min): Write analysis. Step 4 (2 min): Check links to reader interest.',
  {
    grade4: "The writer describes the setting using descriptive language to make it interesting. Details about what can be seen and heard help the reader imagine the place. This makes the setting feel real.",
    grade6: "The setting is made interesting through sensory language. The writer describes sights and sounds, which helps the reader picture the place clearly. This makes the setting engaging and memorable.",
    grade8: "The writer uses vivid imagery to make the setting engaging. Sensory details allow the reader to visualise and experience the place. This description creates atmosphere and draws the reader into the text.",
    grade9: "The writer describes the setting in a way that actively engages the reader. Carefully chosen imagery appeals to the senses, creating a vivid atmosphere. This not only establishes place but also shapes the reader's emotional response, making the setting integral to the text's impact.",
  }
);

// ----- L1-A03: How does the writer structure the opening of the text? -----
const L1_A03: EnglishExaminerPackTask = pack(
  [
    { id: 'L1-A03-1', label: 'I focus on the opening of the text only', ao: 'AO2' },
    { id: 'L1-A03-2', label: 'I identify how information is revealed', ao: 'AO2' },
    { id: 'L1-A03-3', label: 'I analyse shifts in focus or perspective', ao: 'AO2' },
    { id: 'L1-A03-4', label: 'I comment on pace or sentence structure', ao: 'AO2' },
    { id: 'L1-A03-5', label: 'I explain how structure engages the reader', ao: 'AO2' },
    { id: 'L1-A03-6', label: 'I avoid language analysis', ao: 'AO2' },
    { id: 'L1-A03-7', label: 'I avoid retelling the plot', ao: 'AO2' },
    { id: 'L1-A03-8', label: 'I write clearly and accurately', ao: 'AO2' },
  ],
  'AO2 (8 marks): Top-band responses analyse structural choices such as openings, shifts and pace. Weak answers analyse language or summarise events. Weak: language focus, narrative summary.',
  'Step 1 (2 min): Identify opening focus. Step 2 (3 min): Spot shifts or withholding. Step 3 (8 min): Write analysis. Step 4 (2 min): Check structure focus.',
  {
    grade4: "The writer structures the opening to introduce the situation slowly. Information is revealed bit by bit, which keeps the reader interested. This makes the opening engaging.",
    grade6: "The opening is structured to hook the reader by withholding information. The writer introduces the scene before revealing details, creating curiosity and interest.",
    grade8: "The writer structures the opening to gradually draw the reader in. Information is delayed, and shifts in focus create curiosity. This controlled structure encourages the reader to keep reading.",
    grade9: "The writer structures the opening carefully by controlling the release of information. Initial ambiguity creates curiosity, while subtle shifts in focus guide the reader deeper into the narrative. This structural choice establishes intrigue and sets expectations for the rest of the text.",
  }
);

// ----- L1-A04: To what extent do you agree that the writer makes the character seem dangerous? -----
const L1_A04: EnglishExaminerPackTask = pack(
  [
    { id: 'L1-A04-1', label: 'I clearly state my level of agreement', ao: 'AO4' },
    { id: 'L1-A04-2', label: 'I evaluate how dangerous the character appears', ao: 'AO4' },
    { id: 'L1-A04-3', label: 'I use evidence to support my judgement', ao: 'AO4' },
    { id: 'L1-A04-4', label: 'I explain the effect on the reader', ao: 'AO4' },
    { id: 'L1-A04-5', label: 'I consider alternative viewpoints', ao: 'AO4' },
    { id: 'L1-A04-6', label: 'I avoid summarising the character', ao: 'AO4' },
    { id: 'L1-A04-7', label: 'I stay focused on evaluation', ao: 'AO4' },
    { id: 'L1-A04-8', label: 'I write persuasively and clearly', ao: 'AO4' },
  ],
  'AO4 (12 marks): Top-band answers offer a clear judgement, supported by evaluation of evidence and effects. Weak answers describe rather than evaluate. Weak: summary, no judgement, limited evidence.',
  'Step 1 (2 min): Decide agreement. Step 2 (3 min): Select evidence. Step 3 (8 min): Write evaluative response. Step 4 (2 min): Check judgement clarity.',
  {
    grade4: "I agree that the writer makes the character seem dangerous. The character behaves in a threatening way, which makes the reader feel uneasy. This suggests danger.",
    grade6: "I mostly agree that the character is presented as dangerous. The writer describes actions and behaviour that suggest unpredictability, making the reader cautious.",
    grade8: "I strongly agree that the writer makes the character seem dangerous. The character's behaviour and the reactions of others create a sense of threat, encouraging the reader to view them with suspicion.",
    grade9: "I largely agree that the writer presents the character as dangerous. The combination of threatening behaviour and tense description positions the reader to feel wary. However, moments of ambiguity suggest the danger may be exaggerated by perspective, adding complexity to the portrayal.",
  }
);

// ----- L2-A01: What impressions do you get of the writer's viewpoint in Source A? -----
const L2_A01: EnglishExaminerPackTask = pack(
  [
    { id: 'L2-A01-1', label: "I identify the writer's viewpoint clearly", ao: 'AO1' },
    { id: 'L2-A01-2', label: 'I infer attitudes and opinions', ao: 'AO1' },
    { id: 'L2-A01-3', label: 'I support impressions with evidence', ao: 'AO1' },
    { id: 'L2-A01-4', label: 'I explain how the viewpoint is communicated', ao: 'AO3' },
    { id: 'L2-A01-5', label: 'I avoid analysing language techniques', ao: 'AO1' },
    { id: 'L2-A01-6', label: 'I avoid summarising content', ao: 'AO1' },
    { id: 'L2-A01-7', label: 'I stay focused on Source A only', ao: 'AO1' },
    { id: 'L2-A01-8', label: 'I write clearly and logically', ao: 'AO1' },
  ],
  'AO1/AO3 (8 marks): Top-band answers infer clear viewpoints and support them with evidence. Weak answers summarise content. Weak: paraphrase, no inference.',
  'Step 1 (2 min): Identify viewpoint. Step 2 (3 min): Choose evidence. Step 3 (8 min): Write response. Step 4 (2 min): Check focus.',
  {
    grade4: "The writer's viewpoint in Source A seems positive. They describe the topic in a way that suggests approval, which gives a good impression.",
    grade6: "In Source A, the writer appears supportive of the topic. Their comments suggest they believe it is beneficial, which influences the reader's view.",
    grade8: "The writer's viewpoint in Source A is clearly favourable. Through explanation and emphasis on benefits, the writer encourages the reader to share this positive attitude.",
    grade9: "The writer presents a largely positive viewpoint in Source A, positioning the topic as worthwhile and beneficial. This perspective is communicated through selective emphasis, encouraging reader agreement. However, the lack of challenge suggests a deliberately one-sided stance.",
  }
);

// ----- L2-A02: How does the writer use language to influence the reader in Source B? -----
const L2_A02: EnglishExaminerPackTask = pack(
  [
    { id: 'L2-A02-1', label: 'I focus on how language influences the reader', ao: 'AO2' },
    { id: 'L2-A02-2', label: 'I identify persuasive language choices', ao: 'AO2' },
    { id: 'L2-A02-3', label: 'I explain the effect of language', ao: 'AO2' },
    { id: 'L2-A02-4', label: 'I use short references to Source B', ao: 'AO2' },
    { id: 'L2-A02-5', label: 'I avoid discussing Source A', ao: 'AO2' },
    { id: 'L2-A02-6', label: 'I avoid summarising content', ao: 'AO2' },
    { id: 'L2-A02-7', label: 'I analyse rather than describe', ao: 'AO2' },
    { id: 'L2-A02-8', label: 'I write clearly and accurately', ao: 'AO2' },
  ],
  'AO2 (8 marks): Top-band answers analyse how language shapes reader response. Weak answers describe content. Weak: technique spotting, summary.',
  'Step 1 (2 min): Identify writer\'s aim. Step 2 (3 min): Pick language choices. Step 3 (8 min): Write analysis. Step 4 (2 min): Check effect.',
  {
    grade4: "The writer uses language to influence the reader by making the topic sound important. This encourages the reader to agree.",
    grade6: "The writer uses persuasive language to influence the reader. Words that emphasise importance make the reader feel involved.",
    grade8: "The writer uses persuasive language to influence the reader's opinion. Emphatic word choices encourage agreement and create a sense of urgency.",
    grade9: "The writer carefully selects persuasive language to shape the reader's response. Emphasis and assertive phrasing position the reader to accept the viewpoint. Alternatively, this forceful tone may prompt scepticism in critical readers.",
  }
);

// ----- L2-A03: Compare how the writers present similar ideas in Source A and Source B -----
const L2_A03: EnglishExaminerPackTask = pack(
  [
    { id: 'L2-A03-1', label: 'I compare both writers throughout', ao: 'AO3' },
    { id: 'L2-A03-2', label: 'I identify a shared idea', ao: 'AO3' },
    { id: 'L2-A03-3', label: 'I use evidence from both sources', ao: 'AO3' },
    { id: 'L2-A03-4', label: 'I explain similarities and differences', ao: 'AO3' },
    { id: 'L2-A03-5', label: 'I avoid analysing language techniques', ao: 'AO3' },
    { id: 'L2-A03-6', label: 'I avoid writing about sources separately', ao: 'AO3' },
    { id: 'L2-A03-7', label: 'I stay focused on ideas', ao: 'AO3' },
    { id: 'L2-A03-8', label: 'I use comparative language', ao: 'AO3' },
  ],
  'AO3 (12 marks): Top-band responses compare viewpoints clearly with evidence from both sources. Weak answers write about each source separately. Weak: separate summaries, no comparison.',
  'Step 1 (2 min): Identify shared idea. Step 2 (3 min): Pick evidence. Step 3 (8 min): Write comparison. Step 4 (2 min): Check balance.',
  {
    grade4: "Both writers present similar ideas about the topic. They both show it is important, although they do this in different ways.",
    grade6: "Both writers present the topic positively, but Source A is more informative, while Source B is more persuasive.",
    grade8: "Both writers present similar ideas, but with different intentions. Source A explains the idea calmly, while Source B tries to convince the reader more strongly.",
    grade9: "Both writers present similar ideas, but their approaches differ. Source A adopts a measured tone to inform, while Source B uses a more forceful style to persuade. This contrast highlights how purpose shapes presentation.",
  }
);

// ----- L2-A04: To what extent do you agree that both writers present the topic positively? -----
const L2_A04: EnglishExaminerPackTask = pack(
  [
    { id: 'L2-A04-1', label: 'I clearly state my level of agreement', ao: 'AO4' },
    { id: 'L2-A04-2', label: "I evaluate both writers' viewpoints", ao: 'AO4' },
    { id: 'L2-A04-3', label: 'I support judgement with evidence', ao: 'AO4' },
    { id: 'L2-A04-4', label: "I compare the writers' approaches", ao: 'AO4' },
    { id: 'L2-A04-5', label: 'I consider nuance or limitations', ao: 'AO4' },
    { id: 'L2-A04-6', label: 'I avoid summarising sources', ao: 'AO4' },
    { id: 'L2-A04-7', label: 'I maintain evaluative tone', ao: 'AO4' },
    { id: 'L2-A04-8', label: 'I write clearly and persuasively', ao: 'AO4' },
  ],
  'AO4 (12 marks): Top-band responses evaluate both sources with clear judgement and comparison. Weak answers describe viewpoints without evaluation. Weak: summary, no judgement.',
  'Step 1 (2 min): Decide agreement. Step 2 (3 min): Select evidence. Step 3 (8 min): Write evaluation. Step 4 (2 min): Check judgement clarity.',
  {
    grade4: "I agree that both writers present the topic positively. They both describe it in a good way, which makes the reader think it is beneficial.",
    grade6: "I mostly agree that both writers present the topic positively. However, Source B is more persuasive, while Source A is more balanced.",
    grade8: "I agree to a large extent that both writers present the topic positively. Source A informs the reader calmly, while Source B strongly encourages agreement.",
    grade9: "I largely agree that both writers present the topic positively, though in different ways. Source A's measured tone builds trust, while Source B's persuasive style seeks to influence. However, Source B's intensity may reduce credibility for some readers.",
  }
);

// ----- Export -----
const READING_PACK_BY_TASK_ID: Record<string, EnglishExaminerPackTask> = {
  'L1-A01': L1_A01,
  'L1-A02': L1_A02,
  'L1-A03': L1_A03,
  'L1-A04': L1_A04,
  'L2-A01': L2_A01,
  'L2-A02': L2_A02,
  'L2-A03': L2_A03,
  'L2-A04': L2_A04,
};

export function getReadingPackForTask(taskId: string): EnglishExaminerPackTask | undefined {
  return READING_PACK_BY_TASK_ID[taskId];
}

/** Task IDs that have full examiner pack content for Section A reading. */
export const LANGUAGE_READING_PACK_TASK_IDS: string[] = Object.keys(READING_PACK_BY_TASK_ID);
