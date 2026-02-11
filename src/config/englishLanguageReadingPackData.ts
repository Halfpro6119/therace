/**
 * Examiner-pack content for all 8 English Language Section A reading tasks.
 * Checklist, mark scheme (with grade descriptors), step-by-step method, and Grade 4/6/8/9 model answers.
 * Calibrated to 12–15 minute responses (8 or 12 marks). Model answers are paragraph-length to support student learning.
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
  `AO2 (8 marks): Analyse how the writer creates tension through language and structure.

**Grade 4:** Some relevant ideas; identifies a language or structure feature; simple effect on reader. May describe events.
**Grade 6:** Clear focus on tension; selects relevant references; explains how language and/or structure build tension.
**Grade 8:** Analytical focus; precise references; explains effects clearly; links methods to tension (not just mood).
**Grade 9:** Perceptive analysis; sustained focus on how tension is created; may offer alternative reading (e.g. psychological vs physical tension).

Weak: narrative summary, technique spotting without effect, vague comments.`,
  'Step 1 (2 min): Identify where tension is strongest in the extract. Step 2 (3 min): Pick 2–3 language or structure methods (e.g. short sentences, silence, withholding). Step 3 (10 min): Write 1–2 analytical paragraphs with short quotations. Step 4 (2 min): Check every point links to tension.',
  {
    grade4: "The writer creates tension by using language that suggests something bad might happen. Words that describe silence or waiting make the reader feel uneasy. For example, when the writer focuses on what cannot be heard, it makes the reader wonder what will happen next.\n\nThe structure also helps build tension. Short sentences make key moments feel sudden and tense. Paragraph breaks can make the reader pause and feel the suspense. Together, these choices keep the reader interested and worried about what might come.",
    grade6: "Tension is created through careful language choices and structure. The writer uses words that suggest uncertainty and danger, making the reader expect something to happen. Descriptions of silence or hesitation build anticipation because the reader is left waiting.\n\nStructurally, short sentences increase the pace at crucial moments, while longer sentences slow the reader down before something changes. These methods work together to keep the reader anxious and focused on the developing situation.",
    grade8: "The writer creates tension by combining restrained language with controlled structure. Descriptions that suggest silence, hesitation or withheld information create anticipation; the reader is positioned to expect danger without being told exactly what will happen.\n\nStructurally, short sentences and abrupt paragraph breaks increase pace at key moments and reflect rising tension. The writer may delay the release of information, so that tension builds through what is not said as much as what is. This keeps the reader alert and engaged.",
    grade9: "The writer creates tension by withholding information and controlling pace. Language associated with stillness and uncertainty forces the reader to anticipate what might happen next. The effect is deliberate: tension arises from the gap between what the reader suspects and what is revealed.\n\nStructurally, sudden short sentences disrupt the flow and mirror rising anxiety. An alternative reading is that the tension is psychological rather than physical—rooted in fear of the unknown or the character's state of mind—which deepens the reader's engagement.",
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
  `AO2 (8 marks): Analyse how the writer describes the setting to interest the reader.

**Grade 4:** Identifies descriptive or sensory language; simple comment on effect. May list details.
**Grade 6:** Clear focus on how the setting is made interesting; selects references; explains effect on reader.
**Grade 8:** Analytical; explains how imagery or sensory language engages the reader; links to atmosphere or interest.
**Grade 9:** Perceptive analysis; considers how description shapes the reader's response and makes the setting integral to the text.

Weak: listing details without analysis, vague effects, no focus on interest.`,
  'Step 1 (2 min): Identify 2–3 key setting details that stand out. Step 2 (3 min): Choose 2 language features (imagery, sensory language, contrast). Step 3 (10 min): Write 1–2 paragraphs analysing how they interest the reader. Step 4 (2 min): Check you analyse effect, not just describe.',
  {
    grade4: "The writer describes the setting using descriptive language to make it interesting. Details about what can be seen and heard help the reader imagine the place. For example, if the writer mentions colours, sounds or smells, it makes the setting feel real and easier to picture.\n\nThis matters because an interesting setting draws the reader in and makes them want to keep reading. The writer is not just listing what is there but choosing details that create a strong impression.",
    grade6: "The setting is made interesting through sensory language. The writer describes sights and sounds in a way that helps the reader picture the place clearly. Specific word choices create atmosphere and make the setting feel vivid.\n\nBy focusing on particular details rather than general description, the writer engages the reader's imagination. This makes the setting memorable and ensures it does more than simply show where the action happens.",
    grade8: "The writer uses vivid imagery to make the setting engaging. Sensory details allow the reader to visualise and almost experience the place—not just see it. The choice of imagery often creates a particular atmosphere, which draws the reader into the text and shapes their emotional response.\n\nInterest is maintained because the writer selects details that do more than describe; they suggest mood, contrast or significance. The setting becomes part of the text's effect rather than background.",
    grade9: "The writer describes the setting in a way that actively engages the reader. Carefully chosen imagery appeals to the senses and creates a vivid atmosphere. This not only establishes place but also shapes the reader's emotional response, making the setting integral to the text's impact.\n\nThe writer may use contrast, symbolism or deliberate omission to sustain interest. The setting is presented as something that works on the reader—creating unease, curiosity or immersion—rather than simply existing.",
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
  `AO2 (8 marks): Analyse how the writer has structured the opening of the text. Focus on structure only (order, pace, shifts, withholding)—not language.

**Grade 4:** Identifies one structural feature (e.g. what we learn first); simple effect. May drift into plot.
**Grade 6:** Clear focus on structure; explains how information is revealed or ordered; effect on reader.
**Grade 8:** Analytical; discusses shifts, pace or withholding; explains how structure engages the reader.
**Grade 9:** Perceptive analysis of structural choices; may consider how the opening sets up the rest of the text.

Weak: analysing language instead of structure, retelling the plot.`,
  'Step 1 (2 min): Identify what the opening focuses on first and what is delayed. Step 2 (3 min): Spot any shifts in focus, time or perspective. Step 3 (10 min): Write 1–2 paragraphs on structure only (no language analysis). Step 4 (2 min): Remove any language or plot summary.',
  {
    grade4: "The writer structures the opening to introduce the situation slowly. Information is revealed bit by bit rather than all at once, which keeps the reader interested. For example, we might learn about a place or a character before we find out what is going to happen.\n\nThis way of ordering the opening makes the reader want to continue. The structure is deliberate: the writer chooses what to show first and what to hold back.",
    grade6: "The opening is structured to hook the reader by controlling what information is revealed and when. The writer may introduce the scene or a character before revealing the main event, creating curiosity. Shifts in focus—from wide to close, or from one character to another—keep the reader engaged.\n\nPace is also important: a slow opening can build tension, while a sudden shift can surprise the reader. The structure of the opening sets up how we will experience the rest of the text.",
    grade8: "The writer structures the opening to gradually draw the reader in. Information is deliberately delayed, and shifts in focus or perspective create curiosity. The reader is positioned to ask questions rather than receive answers too quickly.\n\nThis controlled structure encourages the reader to keep reading. The opening may hold back key details so that when they are revealed, the effect is stronger. Structure here means the order and pace of revelation, not the language used.",
    grade9: "The writer structures the opening carefully by controlling the release of information. Initial ambiguity or partial revelation creates curiosity, while subtle shifts in focus guide the reader deeper into the narrative. The structural choices—what is shown first, what is withheld, where the focus moves—establish intrigue and set expectations for the rest of the text.\n\nThe opening may mirror or contrast with the text's later structure, so that the reader's experience of the whole is shaped by how the opening is built.",
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
  `AO4 (12 marks): Evaluate the extent to which you agree with the statement. Support with evidence and explain effects on the reader.

**Grade 4:** Simple agreement; some reference to the text; basic reason (e.g. character seems threatening).
**Grade 6:** Clear judgement; selects evidence; explains how the reader is encouraged to see the character as dangerous.
**Grade 8:** Sustained evaluation; well-chosen evidence; considers how methods create the impression of danger; effect on reader.
**Grade 9:** Perceptive evaluation; may consider alternative views or nuance (e.g. danger exaggerated by perspective); confident use of evidence.

Weak: describing the character without evaluating, no clear judgement, summarising plot.`,
  'Step 1 (2 min): Decide your level of agreement (strongly / largely / partly). Step 2 (4 min): Select 2–3 pieces of evidence (actions, description, others\' reactions). Step 3 (12 min): Write 2–3 evaluative paragraphs with judgement and evidence. Step 4 (2 min): Ensure every paragraph supports your judgement.',
  {
    grade4: "I agree that the writer makes the character seem dangerous. The character behaves in a threatening way—perhaps through their actions, voice or how others react to them—which makes the reader feel uneasy. The writer chooses details that suggest danger, such as physical threat or unpredictability.\n\nThis effect is deliberate: by showing us the character in this way, the writer encourages us to see them as a danger. I think the writer is successful in making the character seem dangerous.",
    grade6: "I mostly agree that the character is presented as dangerous. The writer describes actions and behaviour that suggest unpredictability or threat, making the reader cautious. The way other characters respond—fear, avoidance, tension—reinforces this impression.\n\nThe writer also uses description or pacing to build a sense of danger. Overall, the reader is positioned to view the character as a threat. There may be moments where the character seems less dangerous, but the overall effect is one of danger.",
    grade8: "I strongly agree that the writer makes the character seem dangerous. The character's behaviour and the reactions of others create a sustained sense of threat. The writer uses specific details—actions, dialogue, description—to build this impression and to control how the reader responds.\n\nEffect on the reader is important: we are encouraged to feel wary, suspicious or fearful. The writer evaluates the character through the choices they make in the text, so that our judgement is supported by evidence rather than vague feeling.",
    grade9: "I largely agree that the writer presents the character as dangerous. The combination of threatening behaviour, others' reactions and tense or suggestive description positions the reader to feel wary. The writer's methods are effective in building this impression.\n\nHowever, moments of ambiguity may suggest the danger is partly exaggerated by perspective or circumstance. This adds complexity: the character might be dangerous in some ways but not others, or the reader might question how reliable the presentation is. A top response can acknowledge this nuance while still offering a clear, supported judgement.",
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
  `AO1/AO3 (8 marks): What impressions do you get of the writer's viewpoint? Infer attitudes and opinions; support with evidence. Do not analyse language in detail.

**Grade 4:** Identifies a simple impression (e.g. positive/negative); one or two references. May paraphrase.
**Grade 6:** Clear impression of viewpoint; supports with evidence; explains how the writer communicates their attitude.
**Grade 8:** Developed inference; well-chosen evidence; explains how the writer's viewpoint is conveyed and its effect.
**Grade 9:** Perceptive inference; may consider how the writer positions the reader or what is omitted; confident use of evidence.

Weak: summarising content, paraphrasing, no inference about viewpoint.`,
  'Step 1 (2 min): Read Source A and identify the writer\'s attitude or opinion. Step 2 (3 min): Choose 2–3 short quotations that show this viewpoint. Step 3 (10 min): Write 1–2 paragraphs giving your impressions with evidence. Step 4 (2 min): Stay on Source A only; do not analyse language techniques in depth.',
  {
    grade4: "The writer's viewpoint in Source A seems positive. They describe the topic in a way that suggests approval—emphasising good points or benefits rather than problems. This gives the reader a good impression of the topic.\n\nThe writer may use words that sound encouraging or supportive. By choosing to focus on certain ideas and not others, they show the reader where they stand. Overall, the impression is that the writer is in favour of what they are writing about.",
    grade6: "In Source A, the writer appears supportive of the topic. Their comments suggest they believe it is beneficial or important. The writer selects facts, examples or emphasis that encourage the reader to share this view.\n\nWe get this impression from what the writer includes and how they present it—for example, positive language, focus on benefits, or a tone that invites agreement. The writer's viewpoint is communicated clearly enough to influence the reader.",
    grade8: "The writer's viewpoint in Source A is clearly favourable. Through explanation and emphasis on benefits, the writer encourages the reader to share this positive attitude. The writer's choices—what to include, what to stress, what tone to use—communicate a clear perspective.\n\nThe impression we get is of a writer who wants the reader to agree. The viewpoint is not neutral; it is presented in a way that shapes how we respond. This is the writer's purpose coming through.",
    grade9: "The writer presents a largely positive viewpoint in Source A, positioning the topic as worthwhile and beneficial. This perspective is communicated through selective emphasis and the way evidence is framed, encouraging reader agreement.\n\nHowever, the lack of challenge or counter-argument suggests a deliberately one-sided stance. A perceptive reader might notice what is omitted or how the writer avoids doubt. The impression is strong, but the method of creating it is also visible.",
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
  `AO2 (8 marks): Analyse how the writer uses language to influence the reader in Source B. Focus on Source B only.

**Grade 4:** Identifies that language is persuasive; one or two examples; simple effect (e.g. makes reader agree).
**Grade 6:** Clear focus on language choices; selects references; explains how they influence the reader.
**Grade 8:** Analytical; explains how specific language choices shape the reader's response; effect is clear.
**Grade 9:** Perceptive analysis; may consider how tone or emphasis positions the reader; alternative response (e.g. scepticism) possible.

Weak: describing content, technique spotting without effect, discussing Source A.`,
  'Step 1 (2 min): Identify the writer\'s aim in Source B (e.g. persuade, inform, shock). Step 2 (3 min): Pick 2–3 language choices (words, phrases, sentence types). Step 3 (10 min): Write 1–2 paragraphs analysing how they influence the reader. Step 4 (2 min): Do not refer to Source A.',
  {
    grade4: "The writer uses language to influence the reader by making the topic sound important or urgent. Words and phrases are chosen to encourage agreement—for example, strong adjectives or repeated ideas. This helps the reader feel that the writer's view is the right one.\n\nBy focusing on certain words and how they are used, we can see that the writer is trying to shape the reader's opinion. The language is not neutral; it is persuasive.",
    grade6: "The writer uses persuasive language to influence the reader. Words that emphasise importance or urgency make the reader feel involved and more likely to agree. Specific choices—such as rhetorical questions, emotive vocabulary or direct address—create a particular effect.\n\nWe can analyse how these choices work: they position the reader to accept the writer's viewpoint or to feel a certain way about the topic. The writer's aim is clear from the language they use.",
    grade8: "The writer uses persuasive language to influence the reader's opinion. Emphatic word choices, sentence structure and tone encourage agreement and can create a sense of urgency or importance. Each choice has an effect: the reader is guided towards a particular response.\n\nAnalysis should focus on how language shapes that response—not just what the writer says but how they say it. The writer's methods are deliberate and effective in influencing the reader.",
    grade9: "The writer carefully selects persuasive language to shape the reader's response. Emphasis and assertive phrasing position the reader to accept the viewpoint. The analysis can show how tone, word choice and structure work together to create influence.\n\nAlternatively, a critical reader might argue that this forceful tone could prompt scepticism or resistance. Top responses can consider how language might affect different readers in different ways.",
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
  `AO3 (12 marks): Compare how the writers present similar ideas in Source A and Source B. Use evidence from both sources throughout. Do not write about each source in separate blocks.

**Grade 4:** Identifies a shared idea; mentions both sources; simple difference (e.g. different tone or purpose).
**Grade 6:** Sustained comparison; selects evidence from both; explains similarities and differences in how the idea is presented.
**Grade 8:** Clear comparative focus; analyses how each writer presents the idea; uses comparative language (whereas, similarly, in contrast).
**Grade 9:** Perceptive comparison; may evaluate which approach is more effective or how purpose shapes presentation; confident use of evidence from both.

Weak: writing about Source A then Source B separately, no comparison, summarising.`,
  'Step 1 (2 min): Identify one or two shared ideas or attitudes in both sources. Step 2 (4 min): Pick evidence from each source that shows this. Step 3 (12 min): Write 2–3 paragraphs that compare both writers in each paragraph. Step 4 (2 min): Check you use both sources in every paragraph.',
  {
    grade4: "Both writers present similar ideas about the topic. They both show that the topic is important or worth considering, although they do this in different ways. Source A might focus more on facts or explanation, while Source B might be more emotional or persuasive.\n\nBy comparing the two, we can see that writers can present similar ideas with different methods. Each writer chooses how to get their message across. Using evidence from both sources helps show the similarity and the difference.",
    grade6: "Both writers present the topic positively, but their approaches differ. Source A may be more informative and balanced, while Source B is more persuasive and direct. We can see the same idea—for example, that the topic matters—in both, but the way it is presented is not the same.\n\nComparing them shows how purpose and audience affect presentation. One writer might want to inform, the other to convince. Evidence from both sources is needed to make this comparison clear.",
    grade8: "Both writers present similar ideas, but with different intentions and methods. Source A may explain the idea in a calm, measured way, while Source B tries to convince the reader more strongly. The shared idea is visible in both, but the presentation—tone, emphasis, structure—differs.\n\nA strong response compares throughout: 'Whereas Source A… Source B…' or 'Similarly, both writers… but…'. Each paragraph should use evidence from both sources so that the comparison is sustained and clear.",
    grade9: "Both writers present similar ideas, but their approaches differ in ways that reflect their purpose. Source A may adopt a measured tone to inform or reassure, while Source B uses a more forceful style to persuade. This contrast highlights how purpose and audience shape presentation.\n\nA top response may evaluate which approach is more effective or consider what each writer gains or loses by their choice. The comparison should be perceptive and supported by precise evidence from both sources throughout.",
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
  `AO4 (12 marks): Evaluate the extent to which you agree that both writers present the topic positively. Support with evidence from both sources; compare their approaches.

**Grade 4:** Simple agreement; refers to both sources; basic reason (e.g. both are positive).
**Grade 6:** Clear judgement; evidence from both; explains how each writer presents the topic positively (or not).
**Grade 8:** Sustained evaluation; compares both writers; considers how they create a positive impression; effect on reader.
**Grade 9:** Perceptive evaluation; may consider nuance (e.g. one writer more balanced, or intensity may backfire); confident comparison.

Weak: describing viewpoints without evaluating, no clear judgement, summarising.`,
  'Step 1 (2 min): Decide your level of agreement (strongly / largely / partly / disagree). Step 2 (4 min): Select evidence from both sources that shows how they present the topic. Step 3 (12 min): Write 2–3 evaluative paragraphs comparing both writers and supporting your judgement. Step 4 (2 min): Ensure judgement is clear and supported by both sources.',
  {
    grade4: "I agree that both writers present the topic positively. They both describe it in a way that suggests it is good or beneficial. In Source A we might see positive language or a focus on benefits; in Source B we might see the same. This makes the reader think the topic is worth supporting.\n\nBoth writers want the reader to feel favourable towards the topic. I think the statement is true for both sources, even if they do it in slightly different ways.",
    grade6: "I mostly agree that both writers present the topic positively. Source A may do this in a more balanced or informative way, while Source B is more persuasive and direct. Both, however, encourage the reader to see the topic in a positive light.\n\nEvidence from both sources supports this: we can point to tone, emphasis or the way ideas are framed. There may be small differences—one writer might acknowledge problems while the other does not—but overall the presentation is positive.",
    grade8: "I agree to a large extent that both writers present the topic positively. Source A may inform the reader calmly and build trust, while Source B strongly encourages agreement through persuasive techniques. Both create a positive impression, but their methods differ.\n\nEvaluation means judging how effective or convincing each is. We might consider whether one writer's approach is more credible or whether the other's intensity is more memorable. The key is to support our judgement with evidence from both sources.",
    grade9: "I largely agree that both writers present the topic positively, though in different ways. Source A's measured tone may build trust and seem more balanced, while Source B's persuasive style seeks to influence the reader directly. Both succeed in creating a positive view.\n\nHowever, Source B's intensity may reduce credibility for some readers—or we might argue that it makes the case more forcefully. A top response can acknowledge this nuance while still offering a clear, supported judgement about the extent of agreement.",
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
