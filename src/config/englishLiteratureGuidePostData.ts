/**
 * Literature GuidePost content — all 15 tasks
 * Examiner-faithful mark schemes, Grade 9 checklists, step-by-step methods, model answers (4/6/8/9).
 * Model answers: 45-minute exam-style responses with sustained argument, developed paragraphs, embedded quotations.
 * Source: docs/ENGLISH_LITERATURE_GUIDEPOST.md, docs/LITERATURE_GUIDEPOST_MODEL_ANSWERS.md
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

// ----- P-S01: Ozymandias — How does the poet present power? -----
const P_S01: EnglishExaminerPackTask = pack(
  [
    { id: 'P-S01-1', label: 'I define what power means in this poem before analysing it.', ao: 'AO1' },
    { id: 'P-S01-2', label: 'I keep my focus on power throughout every paragraph.', ao: 'AO1' },
    { id: 'P-S01-3', label: 'I use short, embedded quotations to support my ideas.', ao: 'AO1' },
    { id: 'P-S01-4', label: 'I analyse how language choices reveal attitudes to power.', ao: 'AO2' },
    { id: 'P-S01-5', label: "I analyse how structure reinforces the poem's message about power.", ao: 'AO2' },
    { id: 'P-S01-6', label: 'I comment on the sonnet form and its effect.', ao: 'AO2' },
    { id: 'P-S01-7', label: 'I explain how imagery presents power as temporary.', ao: 'AO2' },
    { id: 'P-S01-8', label: 'I weave Romantic context naturally into my analysis.', ao: 'AO3' },
    { id: 'P-S01-9', label: "I link power to Shelley's criticism of tyranny.", ao: 'AO3' },
    { id: 'P-S01-10', label: 'I explore power as an illusion rather than a reality.', ao: 'AO1' },
    { id: "P-S01-11", label: "I include an alternative interpretation of Ozymandias' power.", ao: 'AO1' },
    { id: 'P-S01-12', label: 'I write with a critical, confident voice.', ao: 'AO1' },
  ],
  `AO1 (12): Top-band responses sustain a clear argument about power as temporary and illusory, selecting short, precise quotations and maintaining focus throughout. Weak responses retell the poem or describe power without analysis.

AO2 (12): Top-band answers analyse language, imagery, structure and form with clear purpose, linking methods directly to the presentation of power. Weak answers list techniques or ignore structure and form.

AO3 (6): Context is woven in naturally, showing Shelley's Romantic beliefs and criticism of tyranny. Weak responses bolt on context or include irrelevant historical facts.

Weak: narrative summary, long quotations, technique spotting, bolted-on context, unclear focus.`,
  `Step 1 (2 min): Define power (political authority, pride, legacy).
Step 2 (5 min): Select three ideas (illusion of power, power vs time, arrogance).
Step 3 (5 min): Choose one quotation per idea.
Step 4 (30 min): Write three analytical paragraphs plus introduction.
Step 5 (5 min): Upgrade by tightening quotations and adding alternative interpretation.`,
  {
    grade4: `Power in Ozymandias is presented as something that does not last. The ruler Ozymandias believes he is very powerful, calling himself the "king of kings", which shows he thinks he is greater than all others. This makes him seem proud and arrogant.

However, the statue is described as broken and ruined. This shows that even though Ozymandias once had power, it has been destroyed over time. The desert around the statue is empty, suggesting that nothing remains of his empire.

The poet shows that power can fade and that time is stronger than people.`,
    grade6: `In Ozymandias, Shelley presents power as temporary and unreliable. Ozymandias presents himself as extremely powerful, calling himself the "king of kings". This title suggests absolute authority and pride, showing that he believes his power will last forever.

However, this belief is contradicted by the ruined statue. The description of the "colossal wreck" shows that his power has collapsed. The empty desert surrounding the statue emphasises how time has erased his achievements.

Shelley suggests that power based on pride and control does not last and will eventually be destroyed.`,
    grade8: `Shelley presents power in Ozymandias as an illusion that is destroyed by time. Ozymandias' command to "look on my works" suggests confidence and arrogance, as he believes his power is unquestionable. The grand language reflects how rulers attempt to present themselves as permanent and superior.

However, this idea is undermined by the ruined statue. The image of a "colossal wreck" creates a sharp contrast between Ozymandias' belief in his power and the reality of his downfall. The vast, empty desert surrounding the statue reinforces the idea that time and nature outlast human authority.

As a Romantic poet, Shelley criticises tyrannical power and suggests that rulers who seek control and legacy will ultimately be forgotten.`,
    grade9: `In Ozymandias, Shelley presents power as arrogant, self-deceiving and ultimately insignificant when measured against time. Ozymandias' declaration, "king of kings", reflects absolute confidence in his authority and suggests a desire to dominate both people and history. This language exposes power as performative — something proclaimed rather than earned.

However, Shelley systematically dismantles this illusion. The statue's "shattered visage" and the description of a "colossal wreck" undermine the ruler's claims, revealing the emptiness behind his authority. Structurally, the framed narrative distances the reader from Ozymandias, reinforcing how his power has faded into obscurity.

Contextually, Shelley's Romantic beliefs emphasised the supremacy of nature over human ambition. Power is therefore presented not as enduring, but as something that collapses under its own arrogance. An alternative interpretation is that Ozymandias' power survives only as a warning, suggesting that failed authority still leaves a moral legacy.`,
  }
);

// ----- P-S03: Kamikaze — How does the poet present memory? -----
const P_S03: EnglishExaminerPackTask = pack(
  [
    { id: 'P-S03-1', label: 'I define what memory represents in the poem before analysing it.', ao: 'AO1' },
    { id: 'P-S03-2', label: 'I maintain focus on memory throughout every paragraph.', ao: 'AO1' },
    { id: 'P-S03-3', label: 'I use short, embedded quotations to support my ideas.', ao: 'AO1' },
    { id: 'P-S03-4', label: 'I analyse how natural imagery shapes memories.', ao: 'AO2' },
    { id: 'P-S03-5', label: 'I analyse how structure reflects fragmented memory.', ao: 'AO2' },
    { id: 'P-S03-6', label: 'I explore the shift in narrative voice.', ao: 'AO2' },
    { id: 'P-S03-7', label: 'I link memory to identity and guilt.', ao: 'AO1' },
    { id: 'P-S03-8', label: 'I weave cultural and historical context naturally.', ao: 'AO3' },
    { id: 'P-S03-9', label: 'I explain how memory becomes a form of punishment.', ao: 'AO1' },
    { id: 'P-S03-10', label: 'I explore memory as unreliable or selective.', ao: 'AO1' },
    { id: 'P-S03-11', label: 'I include an alternative interpretation of memory.', ao: 'AO1' },
    { id: 'P-S03-12', label: 'I write with a critical, evaluative voice.', ao: 'AO1' },
  ],
  `AO1 (12): Top-band responses sustain a clear argument about memory as emotional, selective and punishing, using precise quotations and remaining focused. Weak responses retell events or describe memory without analysis.

AO2 (12): Top-band answers analyse imagery, structure and narrative voice with purpose, linking methods directly to memory. Weak answers list techniques or ignore structural shifts.

AO3 (6): Context is woven in naturally, explaining Japanese cultural expectations and shame. Weak responses bolt on context or rely on general historical detail.

Weak: narrative summary, long quotations, technique spotting, bolted-on context, unclear focus.`,
  `Step 1 (2 min): Define memory (personal, collective, emotional).
Step 2 (5 min): Select three ideas (memory vs reality, memory as guilt, memory as punishment).
Step 3 (5 min): Choose one quotation per idea.
Step 4 (30 min): Write three analytical paragraphs plus introduction.
Step 5 (5 min): Upgrade by adding alternative interpretation and tightening analysis.`,
  {
    grade4: `In Kamikaze, memory is shown as something that affects how people are treated. The pilot is remembered for turning back from his mission, and this changes how his family behaves towards him.

Although he returns alive, the family acts as if he is dead. This shows that memory can be painful and can lead to sadness.

The poet presents memory as something that causes suffering.`,
    grade6: `Garland presents memory as powerful and controlling in Kamikaze. The pilot's decision to turn back becomes the most important memory associated with him. This memory causes his family to reject him, treating him as if he no longer exists.

Positive memories of nature, such as the sea and fish, contrast with the negative memories created by his return. These memories show the conflict between personal experience and social judgement.

Garland suggests that memory can shape identity and lead to punishment.`,
    grade8: `In Kamikaze, Garland presents memory as both life-affirming and destructive. The pilot's memories of the natural world interrupt his mission, reconnecting him with beauty and life. These memories are vivid and sensory, suggesting their emotional importance.

However, the memory of his return becomes a source of shame. His family remember his survival as dishonour, and this collective memory leads to silence and rejection. Structurally, the shift from natural imagery to emotional distance reflects how memory changes meaning over time.

Garland suggests that memory can preserve humanity but also enforce cruel social expectations.`,
    grade9: `Garland presents memory in Kamikaze as a force that both saves and condemns. The pilot's memories of the sea and childhood interrupt his mission, suggesting that memory reconnects him with personal identity and moral instinct. The natural imagery contrasts sharply with the rigid ideology of honour.

However, memory also becomes a form of punishment. The family's silence shows that the pilot is remembered not as a survivor but as a failure. Structurally, the fragmented narrative reflects how memory is filtered and reshaped by perspective.

Contextually, cultural expectations surrounding honour intensify this rejection. An alternative interpretation is that memory preserves moral truth, even if society chooses to punish those who act upon it.`,
  }
);

// ----- P-C02: Exposure & Bayonet Charge — Compare conflict -----
const P_C02: EnglishExaminerPackTask = pack(
  [
    { id: 'P-C02-1', label: 'I define conflict clearly before comparing the poems.', ao: 'AO1' },
    { id: 'P-C02-2', label: 'I compare both poems in every paragraph.', ao: 'AO1' },
    { id: 'P-C02-3', label: 'I use short embedded quotations from both poems.', ao: 'AO1' },
    { id: 'P-C02-4', label: 'I analyse how language presents physical conflict.', ao: 'AO2' },
    { id: 'P-C02-5', label: 'I analyse how structure reflects psychological conflict.', ao: 'AO2' },
    { id: 'P-C02-6', label: 'I compare the role of nature in conflict.', ao: 'AO2' },
    { id: 'P-C02-7', label: 'I explore pace and movement in both poems.', ao: 'AO2' },
    { id: 'P-C02-8', label: 'I weave contextual understanding naturally.', ao: 'AO3' },
    { id: 'P-C02-9', label: 'I explain how both poets criticise war.', ao: 'AO3' },
    { id: 'P-C02-10', label: 'I explore different types of conflict.', ao: 'AO1' },
    { id: 'P-C02-11', label: 'I include evaluative comparison.', ao: 'AO1' },
    { id: 'P-C02-12', label: 'I write with a critical comparative voice.', ao: 'AO1' },
  ],
  `AO1 (12): Top-band responses compare continuously, sustaining a clear argument about conflict and selecting precise quotations. Weak responses write about poems separately.

AO2 (12): Top-band answers analyse language and structure comparatively, linking methods directly to conflict. Weak answers list techniques or ignore structure.

AO3 (6): Context is woven in, showing poets' attitudes to war. Weak responses bolt on historical detail.

Weak: poem-by-poem structure, narrative retelling, technique spotting, vague comparison.`,
  `Step 1 (2 min): Define conflict (physical, psychological).
Step 2 (5 min): Select three shared ideas.
Step 3 (5 min): Choose one quotation per poem per idea.
Step 4 (30 min): Write three comparative paragraphs.
Step 5 (5 min): Upgrade by sharpening comparison.`,
  {
    grade4: `Both Exposure and Bayonet Charge present conflict as frightening and unpleasant. In Exposure, the soldiers face conflict through the cold weather. The wind and snow make their situation dangerous, showing that nature is an enemy.

In Bayonet Charge, conflict is shown through action. The soldier runs forward while bullets fly around him, creating fear and panic. This shows how dangerous war is.

Both poems show that conflict causes suffering and fear for soldiers.`,
    grade6: `Both poems present conflict as overwhelming, but in different ways. In Exposure, conflict is mainly against nature. The soldiers suffer from cold and exhaustion, suggesting that the environment is more powerful than the enemy.

In contrast, Bayonet Charge presents conflict as immediate and violent. The soldier is suddenly thrown into action, and the fast pace reflects panic and confusion. Unlike Exposure, there is no waiting.

Both poets show conflict as frightening and destructive, challenging romantic ideas about war.`,
    grade8: `Both Exposure and Bayonet Charge present conflict as destructive, but they focus on different experiences of war. In Exposure, conflict is prolonged and impersonal. The soldiers battle the cold rather than an enemy, and the repeated suffering suggests hopelessness and endurance.

In Bayonet Charge, conflict is sudden and chaotic. The rapid movement and violent imagery reflect the soldier's panic and instinctive fear. While Exposure focuses on waiting and mental exhaustion, Bayonet Charge captures the shock of immediate combat.

Together, the poems present conflict as dehumanising and traumatic, stripping war of any sense of glory.`,
    grade9: `Both poems present conflict as destructive, but they explore different dimensions of wartime suffering. In Exposure, Owen presents conflict as prolonged and impersonal, with soldiers battling the cold rather than a visible enemy. Nature becomes the dominant force, slowly draining hope and morale, which suggests the futility of trench warfare.

In contrast, Bayonet Charge presents conflict as immediate and instinctive. The soldier's sudden movement through the battlefield reflects panic rather than purpose, exposing the gap between patriotic ideals and lived experience. The rapid pace mirrors the collapse of rational thought under pressure.

Contextually, Owen exposes the reality of trench warfare, while Hughes highlights the primal fear beneath heroic narratives. Both poets ultimately present conflict as stripping soldiers of control, but while Exposure emphasises endurance, Bayonet Charge exposes sudden terror.`,
  }
);

// ----- P-C03: Checking Out Me History & Kamikaze — Compare identity -----
const P_C03: EnglishExaminerPackTask = pack(
  [
    { id: 'P-C03-1', label: 'I define identity before comparing the poems.', ao: 'AO1' },
    { id: 'P-C03-2', label: 'I compare both poems in every paragraph.', ao: 'AO1' },
    { id: 'P-C03-3', label: 'I use short embedded quotations from both poems.', ao: 'AO1' },
    { id: 'P-C03-4', label: 'I analyse how voice conveys identity.', ao: 'AO2' },
    { id: 'P-C03-5', label: 'I analyse how structure reflects identity.', ao: 'AO2' },
    { id: 'P-C03-6', label: 'I compare use of contrast.', ao: 'AO2' },
    { id: 'P-C03-7', label: 'I explore identity as imposed vs chosen.', ao: 'AO1' },
    { id: 'P-C03-8', label: 'I weave cultural context naturally.', ao: 'AO3' },
    { id: 'P-C03-9', label: 'I link identity to power and control.', ao: 'AO3' },
    { id: 'P-C03-10', label: 'I include evaluative comparison.', ao: 'AO1' },
    { id: 'P-C03-11', label: 'I include alternative interpretations.', ao: 'AO1' },
    { id: 'P-C03-12', label: 'I write with a confident critical voice.', ao: 'AO1' },
  ],
  `AO1 (12): Top-band responses compare identity conceptually, sustaining focus and using precise quotations. Weak responses describe identity without analysis.

AO2 (12): Top-band answers analyse voice, structure and contrast with purpose. Weak answers list techniques.

AO3 (6): Context is woven in, explaining cultural identity and oppression. Weak responses bolt on context.

Weak: poem-by-poem responses, narrative summary, vague comparison.`,
  `Step 1 (2 min): Define identity (personal, cultural).
Step 2 (5 min): Select three comparison ideas.
Step 3 (5 min): Choose quotations.
Step 4 (30 min): Write comparative paragraphs.
Step 5 (5 min): Upgrade with judgement.`,
  {
    grade4: `Both poems explore identity and how it is affected by society. In Checking Out Me History, the speaker wants to learn about his past and who he really is.

In Kamikaze, the pilot's identity changes after he returns from his mission. His family treat him differently, which affects how he is seen.

Both poems show that identity can be controlled by others.`,
    grade6: `Both poems explore identity as something shaped by outside forces. In Checking Out Me History, the speaker feels his identity has been hidden by the education system, which teaches him only part of history.

In Kamikaze, the pilot's identity is judged by his community. Although he survives, he is remembered as a failure. Both poems show that identity is affected by social expectations.

The poets suggest that identity is not always chosen freely.`,
    grade8: `Both poems explore identity as something shaped by power and culture. In Checking Out Me History, Agard shows identity being controlled through education. The speaker challenges this by reclaiming his history and voice, which strengthens his sense of self.

In contrast, Kamikaze presents identity as something imposed by society. The pilot's identity shifts from hero to outcast because of cultural expectations around honour. Structurally, Agard's confident voice contrasts with Garland's distant narration, reflecting resistance versus silence.

Both poets show identity as deeply connected to social control.`,
    grade9: `Both poems explore identity as something imposed and contested within systems of power. In Checking Out Me History, Agard exposes how institutional education erases cultural identity, limiting self-understanding. By reclaiming historical figures, the speaker actively reconstructs his identity and challenges authority.

In Kamikaze, identity is shaped by collective judgement rather than personal truth. The pilot's survival redefines him as dishonourable, and silence becomes a tool of control. Structurally, Garland's detached narration reflects how identity is stripped away through social rejection.

Contextually, both poets critique systems that define individuals by ideology. However, while Agard presents identity as reclaimable through resistance, Garland presents identity as fragile, shaped by memory and communal values rather than individual choice.`,
  }
);

// ----- UP-02: Unseen single — tension -----
const UP_02: EnglishExaminerPackTask = pack(
  [
    { id: 'UP-02-1', label: 'I establish a clear interpretation of tension before analysing.', ao: 'AO1' },
    { id: 'UP-02-2', label: 'I keep the focus on tension throughout my response.', ao: 'AO1' },
    { id: 'UP-02-3', label: 'I select short, embedded quotations that create tension.', ao: 'AO1' },
    { id: 'UP-02-4', label: 'I analyse how word choices create unease or anticipation.', ao: 'AO2' },
    { id: 'UP-02-5', label: 'I analyse imagery linked directly to tension.', ao: 'AO2' },
    { id: 'UP-02-6', label: 'I explore how sentence length or enjambment builds tension.', ao: 'AO2' },
    { id: 'UP-02-7', label: 'I analyse how structure controls pace.', ao: 'AO2' },
    { id: 'UP-02-8', label: 'I identify shifts in tone or perspective.', ao: 'AO2' },
    { id: 'UP-02-9', label: 'I show how tension develops across the poem.', ao: 'AO1' },
    { id: 'UP-02-10', label: 'I avoid narrative retelling.', ao: 'AO1' },
    { id: 'UP-02-11', label: 'I include an alternative interpretation of the tension.', ao: 'AO1' },
    { id: 'UP-02-12', label: 'I write with a confident, analytical voice.', ao: 'AO1' },
  ],
  `AO1 (12): Top-band responses offer a clear, sustained interpretation of tension and select precise quotations to support it. Weak responses paraphrase the poem or describe events without analysis.

AO2 (12): Top-band answers analyse language and structure with purpose, linking methods directly to the creation of tension. Weak answers list techniques or ignore structure.

AO3 is not assessed in unseen poetry.

Weak: narrative summary, vague comments on mood, technique spotting, lack of structural analysis.`,
  `Step 1 (2 min): Define tension (anticipation, threat, uncertainty).
Step 2 (5 min): Identify where tension begins, builds, and peaks.
Step 3 (5 min): Select 3 quotations (early, middle, end).
Step 4 (30 min): Write introduction + 3 analytical paragraphs.
Step 5 (5 min): Upgrade by tightening focus and adding alternative reading.`,
  {
    grade4: `The poet creates tension by using language that makes the situation feel uncertain. Some words suggest quietness and waiting, which makes the reader feel that something might happen.

The structure also helps to create tension. Short lines make the poem feel sharp and uncomfortable, while longer sentences slow the pace. This makes the reader feel uneasy.

Overall, tension is created through the poet's language and the way the poem is organised.`,
    grade6: `The poet creates tension by choosing language that suggests uncertainty and unease. Descriptions of stillness and silence create the feeling that something is about to happen, which keeps the reader alert.

Structurally, enjambment is used to carry ideas across lines, delaying meaning and increasing suspense. The pace of the poem changes, which reflects growing tension.

Together, the poet's language and structure make the poem feel uncomfortable and tense.`,
    grade8: `The poet uses both language and structure to gradually build tension. Language linked to restraint and hesitation creates anticipation, suggesting that action is being delayed. This makes the reader aware of what is not happening as much as what is.

Structurally, enjambment disrupts natural pauses, forcing the reader forward without resolution. The poem's pacing shifts as tension increases, creating a sense of instability.

By controlling when information is revealed, the poet sustains tension and keeps the reader uncertain throughout.`,
    grade9: `The poet creates tension by carefully manipulating what is revealed and what is withheld. Language associated with stillness and control suggests suppressed action, creating unease through anticipation rather than explicit threat. This restraint forces the reader to imagine what might happen next.

Structurally, enjambment delays meaning and disrupts closure, preventing the reader from settling into a comfortable rhythm. Changes in pace reflect rising emotional pressure, while moments of pause intensify suspense.

An alternative interpretation is that the tension is internal rather than external, reflecting psychological conflict rather than immediate danger. In both readings, tension is sustained through uncertainty and controlled revelation.`,
  }
);

// ----- UP-C02: Unseen comparison — imagery -----
const UP_C02: EnglishExaminerPackTask = pack(
  [
    { id: 'UP-C02-1', label: 'I compare both poems in every paragraph.', ao: 'AO1' },
    { id: 'UP-C02-2', label: 'I define the role of imagery before analysing.', ao: 'AO1' },
    { id: 'UP-C02-3', label: 'I select short quotations from both poems.', ao: 'AO1' },
    { id: 'UP-C02-4', label: 'I analyse how imagery shapes meaning in poem one.', ao: 'AO2' },
    { id: 'UP-C02-5', label: 'I analyse how imagery shapes meaning in poem two.', ao: 'AO2' },
    { id: 'UP-C02-6', label: 'I compare the effects of imagery directly.', ao: 'AO2' },
    { id: 'UP-C02-7', label: 'I explore similarities and differences in imagery.', ao: 'AO1' },
    { id: 'UP-C02-8', label: 'I analyse imagery rather than describing it.', ao: 'AO2' },
    { id: 'UP-C02-9', label: 'I maintain focus on imagery throughout.', ao: 'AO1' },
    { id: 'UP-C02-10', label: 'I use comparative connectives accurately.', ao: 'AO1' },
    { id: 'UP-C02-11', label: 'I include evaluative comparison.', ao: 'AO1' },
    { id: 'UP-C02-12', label: 'I write with a confident comparative voice.', ao: 'AO1' },
  ],
  `AO1 (12): Top-band responses compare imagery continuously, sustaining a clear argument. Weak responses discuss poems separately.

AO2 (12): Top-band answers analyse imagery with precision, linking images directly to meaning. Weak answers describe images without analysis.

AO3 is not assessed in unseen poetry.

Weak: poem-by-poem structure, narrative description, vague comparison.`,
  `Step 1 (2 min): Identify the dominant imagery in each poem.
Step 2 (5 min): Decide one key similarity and one difference.
Step 3 (5 min): Select one quotation per poem per idea.
Step 4 (30 min): Write comparative paragraphs.
Step 5 (5 min): Upgrade by sharpening evaluative language.`,
  {
    grade4: `Both poems use imagery to help the reader imagine what is happening. In the first poem, imagery creates a clear picture of the setting.

In the second poem, imagery is also important and helps show how the speaker feels. Both poets use imagery to help communicate their ideas.`,
    grade6: `Both poems use imagery to express ideas, but in different ways. In the first poem, imagery is used to describe the environment, helping the reader visualise the scene.

In the second poem, imagery focuses more on feelings and emotions. Comparing the two shows that imagery can be used for different purposes.`,
    grade8: `Both poets use imagery to shape meaning, but their focus differs. In the first poem, imagery establishes atmosphere and setting, grounding the poem in a physical place. This helps the reader understand the situation.

In contrast, the second poem uses imagery to reflect inner emotions rather than surroundings. The images suggest feelings rather than places, making the poem more psychological in tone.

Comparing the poems shows how imagery can either externalise experience or reveal internal states.`,
    grade9: `Both poets rely on imagery as a central method for shaping meaning, yet they deploy it for different effects. In the first poem, imagery constructs the external world, influencing how the reader interprets events and tension through physical description.

In the second poem, imagery functions symbolically, reflecting emotional or psychological states rather than literal setting. This contrast highlights how imagery can either anchor meaning in lived experience or elevate it into abstract reflection.

The comparison shows that while imagery is fundamental in both poems, its purpose shifts depending on whether the poet prioritises environment or inner conflict.`,
  }
);

// ----- M-01: Macbeth — ambition (extract) -----
const M_01: EnglishExaminerPackTask = pack(
  [
    { id: 'M-01-1', label: 'I focus tightly on the extract only.', ao: 'AO1' },
    { id: 'M-01-2', label: "I define ambition clearly in relation to the extract.", ao: 'AO1' },
    { id: 'M-01-3', label: 'I use short, embedded quotations from the extract.', ao: 'AO1' },
    { id: 'M-01-4', label: 'I analyse language that reveals ambition (e.g. metaphor, imagery).', ao: 'AO2' },
    { id: 'M-01-5', label: 'I analyse dramatic methods (soliloquy, aside, contrast).', ao: 'AO2' },
    { id: 'M-01-6', label: 'I link methods directly to how ambition is presented.', ao: 'AO2' },
    { id: 'M-01-7', label: 'I avoid drifting into the rest of the play.', ao: 'AO1' },
    { id: 'M-01-8', label: 'I weave Jacobean context naturally (e.g. divine order, ambition as sin).', ao: 'AO3' },
    { id: 'M-01-9', label: 'I include evaluative judgement.', ao: 'AO1' },
    { id: 'M-01-10', label: 'I write with a clear analytical voice.', ao: 'AO1' },
  ],
  `AO1 (12): Top-band responses focus tightly on the extract, selecting precise quotations that show ambition. Weak responses retell plot or drift to whole play.

AO2 (12): Top-band answers analyse language and dramatic methods (soliloquy, imagery, metaphor) with purpose. Weak answers list techniques without effect.

AO3 (6): Context woven (e.g. ambition as threat to order). Weak context bolted on.

Weak: whole-play summary, long quotes, technique spotting, unclear focus.`,
  `Step 1 (2 min): Define ambition (desire for power, moral conflict).
Step 2 (5 min): Identify 3 moments in the extract that show ambition.
Step 3 (5 min): Select short quotes for each.
Step 4 (30 min): Write 3 analytical paragraphs focused on the extract.
Step 5 (5 min): Tighten focus; ensure no whole-play drift.`,
  {
    grade4: `Shakespeare presents Macbeth's ambition in the extract by showing that he wants to be king. He thinks about killing Duncan, which shows his ambition is strong.

His words show he is tempted. This makes the audience see how ambition can lead to bad choices.`,
    grade6: `In the extract, Shakespeare presents Macbeth's ambition as powerful and dangerous. Macbeth's soliloquy reveals his inner conflict between ambition and conscience. Imagery of vaulting ambition suggests ambition can lead to a fall.

Shakespeare shows ambition as a temptation that challenges moral boundaries.`,
    grade8: `Shakespeare presents Macbeth's ambition in the extract as both compelling and morally destructive. The metaphor of "vaulting ambition" suggests ambition overreaches and will bring downfall. Soliloquy allows the audience to see Macbeth's awareness of the consequences, which makes his later choice more tragic.

Contextually, ambition that threatens the natural order was deeply troubling to a Jacobean audience. Shakespeare presents ambition as a force that corrupts judgement.`,
    grade9: `Shakespeare presents Macbeth's ambition in the extract as self-aware and morally fraught. The metaphor of "vaulting ambition" captures ambition as an overreach that "o'erleaps itself" — Macbeth recognises his desire will destroy him yet is drawn to it. Soliloquy exposes the tension between conscience and ambition, making his fall tragic rather than simply villainous.

Contextually, Jacobean beliefs about divine order and the sin of regicide deepen the extract's stakes. Alternatively, Shakespeare may suggest ambition is not merely personal but catalysed by external forces (witches, Lady Macbeth), complicating simple moral judgement.`,
  }
);

// ----- M-03: Macbeth — guilt (whole play) -----
const M_03: EnglishExaminerPackTask = pack(
  [
    { id: 'M-03-1', label: 'I define guilt as a psychological and moral force.', ao: 'AO1' },
    { id: 'M-03-2', label: 'I sustain focus on guilt across the whole play.', ao: 'AO1' },
    { id: 'M-03-3', label: 'I select short, embedded quotations across acts.', ao: 'AO1' },
    { id: 'M-03-4', label: 'I analyse imagery linked to guilt (blood, darkness).', ao: 'AO2' },
    { id: 'M-03-5', label: 'I analyse soliloquies as windows into guilt.', ao: 'AO2' },
    { id: 'M-03-6', label: 'I track structural development of guilt.', ao: 'AO2' },
    { id: 'M-03-7', label: "I compare Macbeth's and Lady Macbeth's guilt.", ao: 'AO1' },
    { id: 'M-03-8', label: 'I weave Jacobean beliefs naturally.', ao: 'AO3' },
    { id: 'M-03-9', label: 'I link guilt to kingship and disorder.', ao: 'AO3' },
    { id: 'M-03-10', label: 'I avoid narrative retelling.', ao: 'AO1' },
    { id: 'M-03-11', label: 'I include an alternative interpretation of guilt.', ao: 'AO1' },
    { id: 'M-03-12', label: 'I write with a critical, evaluative voice.', ao: 'AO1' },
  ],
  `AO1 (12): Top-band responses sustain a conceptual argument about guilt, using precise quotations across the play. Weak responses retell plot or focus on isolated moments.

AO2 (12): Top-band answers analyse imagery, soliloquy and structure with purpose, linking methods directly to guilt. Weak answers list techniques or ignore development.

AO3 (6): Context is woven in (sin, divine order). Weak responses bolt on context.

Weak: summary, long quotes, technique spotting, unclear focus.`,
  `Step 1 (2 min): Define guilt (psychological torment, moral consequence).
Step 2 (5 min): Choose 3 ideas (immediate guilt, repression, collapse).
Step 3 (5 min): Select quotes across acts.
Step 4 (30 min): Write 3 analytical paragraphs + intro.
Step 5 (5 min): Add alternative reading; tighten links.`,
  {
    grade4: `Shakespeare presents guilt as something that affects characters' minds. After killing Duncan, Macbeth feels guilty and cannot sleep. This shows that his actions trouble him.

Lady Macbeth also feels guilty later in the play. She starts off strong but later becomes weak and upset. This shows guilt can change people.

Shakespeare shows that guilt is a punishment for bad actions.`,
    grade6: `Shakespeare presents guilt as a powerful force that causes suffering. Macbeth feels guilt immediately after killing Duncan, shown by his fear and inability to sleep. His guilt makes him paranoid and uneasy.

Lady Macbeth tries to ignore guilt at first, but it eventually overwhelms her. She becomes disturbed and unable to cope. This shows guilt cannot be avoided.

Shakespeare suggests guilt is a natural response to wrongdoing.`,
    grade8: `Shakespeare presents guilt as corrosive and inescapable. Macbeth's guilt appears immediately after Duncan's murder, disrupting his peace and sense of control. Imagery of blood suggests guilt cannot be washed away.

In contrast, Lady Macbeth initially suppresses guilt, believing it can be ignored. However, her mental collapse later in the play shows that guilt resurfaces with greater force. Structurally, guilt intensifies as the play progresses, reflecting moral decay.

Shakespeare links guilt to disorder, suggesting it is a consequence of disrupting the natural order.`,
    grade9: `Shakespeare presents guilt as an internal punishment that enforces moral order. Macbeth's immediate disturbance after Duncan's murder reveals a functioning conscience, with guilt manifesting through fear, paranoia and hallucination. Blood imagery symbolises guilt as permanent and inescapable.

Lady Macbeth's guilt develops differently. She initially represses conscience, equating guilt with weakness, but this suppression leads to psychological collapse. Structurally, Shakespeare contrasts Macbeth's early guilt with later emotional numbness, suggesting guilt mutates into moral desensitisation rather than disappearing.

Contextually, guilt aligns with Jacobean beliefs about sin and divine justice. Alternatively, Shakespeare may suggest guilt is not enough to prevent tyranny, as Macbeth continues despite recognising his crimes.`,
  }
);

// ----- ACC-01: A Christmas Carol — Scrooge selfish (extract) -----
const ACC_01: EnglishExaminerPackTask = pack(
  [
    { id: 'ACC-01-1', label: 'I focus tightly on selfishness in the extract.', ao: 'AO1' },
    { id: 'ACC-01-2', label: 'I use short, embedded quotations from the extract.', ao: 'AO1' },
    { id: 'ACC-01-3', label: 'I analyse language revealing selfish attitudes.', ao: 'AO2' },
    { id: 'ACC-01-4', label: 'I analyse narrative voice and description.', ao: 'AO2' },
    { id: 'ACC-01-5', label: 'I link methods directly to selfishness.', ao: 'AO2' },
    { id: 'ACC-01-6', label: 'I avoid whole-text drift.', ao: 'AO1' },
    { id: 'ACC-01-7', label: 'I weave social context naturally.', ao: 'AO3' },
    { id: 'ACC-01-8', label: "I consider Dickens' moral purpose.", ao: 'AO3' },
    { id: 'ACC-01-9', label: 'I include evaluative judgement.', ao: 'AO1' },
    { id: 'ACC-01-10', label: 'I write with a clear analytical voice.', ao: 'AO1' },
  ],
  `AO1 (12): Top-band responses focus tightly on the extract, selecting precise quotations. Weak responses drift into summary.

AO2 (12): Top-band answers analyse language and narration with purpose. Weak answers list techniques.

AO3 (6): Context woven (Victorian poverty). Weak context bolted on.

Weak: generalisation, long quotes, extract neglect.`,
  `Step 1 (2 min): Define selfishness (emotional, financial).
Step 2 (5 min): Identify 3 extract moments.
Step 3 (5 min): Select quotes.
Step 4 (30 min): Write focused paragraphs.
Step 5 (5 min): Tighten focus.`,
  {
    grade4: `Dickens presents Scrooge as selfish by showing that he only cares about money. He is described as cold and uncaring, which reflects his attitude towards others.

He does not want to help people in need. This makes him seem unkind.

Dickens wants readers to dislike Scrooge at this point.`,
    grade6: `In the extract, Dickens presents Scrooge as selfish through negative description. Scrooge is shown as cold and isolated, suggesting he values money over people.

The narrator's tone encourages the reader to judge Scrooge. His selfishness is shown through his lack of empathy.

Dickens presents Scrooge as a moral failure.`,
    grade8: `Dickens presents Scrooge's selfishness as both emotional and social. Cold imagery reflects his lack of compassion and isolation from others. The narrator exaggerates these qualities to emphasise moral emptiness.

Scrooge's selfishness contrasts with the needs of those around him, exposing social injustice. Dickens uses this extract to criticise attitudes that prioritise wealth over humanity.`,
    grade9: `Dickens presents Scrooge's selfishness as corrosive and socially damaging. Cold imagery reflects emotional barrenness, while the narrator's critical tone invites moral judgement. Scrooge's isolation suggests selfishness leads to disconnection from society.

Contextually, Dickens condemns selfishness amid Victorian poverty. Alternatively, the exaggeration of Scrooge's flaws prepares the reader for transformation, framing selfishness as a curable moral failing rather than permanent evil.`,
  }
);

// ----- ACC-02: A Christmas Carol — redemption (whole) -----
const ACC_02: EnglishExaminerPackTask = pack(
  [
    { id: 'ACC-02-1', label: 'I define redemption clearly.', ao: 'AO1' },
    { id: 'ACC-02-2', label: 'I track redemption across the novella.', ao: 'AO1' },
    { id: 'ACC-02-3', label: 'I use short quotations across stages.', ao: 'AO1' },
    { id: 'ACC-02-4', label: 'I analyse symbolism of the Spirits.', ao: 'AO2' },
    { id: 'ACC-02-5', label: 'I analyse structural journey.', ao: 'AO2' },
    { id: 'ACC-02-6', label: 'I link methods to redemption.', ao: 'AO2' },
    { id: 'ACC-02-7', label: 'I weave Christian context.', ao: 'AO3' },
    { id: 'ACC-02-8', label: "I evaluate Dickens' message.", ao: 'AO1' },
    { id: 'ACC-02-9', label: 'I include alternative interpretation.', ao: 'AO1' },
  ],
  `AO1 (12): Top-band responses sustain argument about redemption, using precise quotations across stages. Weak responses retell plot.
AO2 (12): Top-band answers analyse symbolism, structure and journey with purpose. Weak answers list techniques.
AO3 (6): Christian context woven. Weak context bolted on.
Weak: summary, long quotes, unclear focus.`,
  `Step 1 (2 min): Define redemption (moral change, second chance).
Step 2 (5 min): Plan stages (past, present, future).
Step 3 (5 min): Select quotes across novella.
Step 4 (30 min): Write analytical paragraphs.
Step 5 (5 min): Add alternative reading.`,
  {
    grade4: `Dickens presents redemption by showing Scrooge change. He starts off selfish but becomes kind.

This shows people can improve.`,
    grade6: `Redemption is shown through Scrooge's journey. The Spirits help him see his mistakes, and he learns to care about others.

Dickens shows redemption is possible.`,
    grade8: `Dickens presents redemption as a moral journey. The Spirits guide Scrooge through reflection on past, present and future, forcing him to confront consequences.

Redemption is shown as earned through understanding and change.`,
    grade9: `Dickens presents redemption as active moral responsibility. Scrooge's transformation occurs through confrontation with suffering and consequence. The structured visits mirror spiritual rebirth, reinforcing Christian ideas of repentance.

Contextually, Dickens suggests social reform begins with individual change. Alternatively, the reliance on supernatural intervention implies redemption requires guidance rather than self-realisation alone.`,
  }
);

// ----- ACC-03: A Christmas Carol — Cratchits -----
const ACC_03: EnglishExaminerPackTask = pack(
  [
    { id: 'ACC-03-1', label: "I define Dickens' message clearly.", ao: 'AO1' },
    { id: 'ACC-03-2', label: "I focus on the Cratchits' role.", ao: 'AO1' },
    { id: 'ACC-03-3', label: 'I select precise quotations.', ao: 'AO1' },
    { id: 'ACC-03-4', label: 'I analyse contrast with Scrooge.', ao: 'AO2' },
    { id: 'ACC-03-5', label: 'I analyse narrative tone.', ao: 'AO2' },
    { id: 'ACC-03-6', label: 'I link methods to message.', ao: 'AO2' },
    { id: 'ACC-03-7', label: 'I weave social context.', ao: 'AO3' },
    { id: 'ACC-03-8', label: 'I include evaluative judgement.', ao: 'AO1' },
  ],
  `AO1 (12): Top-band responses sustain focus on Cratchits' role in conveying message. Weak drift into general plot.
AO2 (12): Top-band analyse contrast and tone with purpose. Weak list techniques.
AO3 (6): Social context woven. Weak bolted on.
Weak: generalisation, long quotes, unclear focus.`,
  `Step 1 (2 min): Define Dickens' message (charity, community, family).
Step 2 (5 min): Identify Cratchit scenes and contrast with Scrooge.
Step 3 (5 min): Select quotes.
Step 4 (30 min): Write analytical paragraphs.
Step 5 (5 min): Add judgement.`,
  {
    grade4: `The Cratchits show kindness despite being poor. They care for each other.

Dickens uses them to show family is important.`,
    grade6: `Dickens uses the Cratchits to show happiness does not depend on money. They contrast with Scrooge.

This shows Dickens' message about generosity.`,
    grade8: `The Cratchits represent moral wealth. Their warmth contrasts with Scrooge's isolation, highlighting emotional richness over material success.

Dickens uses them to criticise social inequality.`,
    grade9: `Dickens uses the Cratchits as a moral counterpoint to capitalist selfishness. Their generosity under hardship exposes the failure of a society that neglects its vulnerable. Contextually, Dickens urges social responsibility. Alternatively, their idealisation strengthens the emotional impact of his message.`,
  }
);

// ----- JH-01: Jekyll and Hyde — Hyde frightening -----
const JH_01: EnglishExaminerPackTask = pack(
  [
    { id: 'JH-01-1', label: 'I define what makes Hyde frightening before analysing.', ao: 'AO1' },
    { id: 'JH-01-2', label: 'I sustain focus on fear throughout the response.', ao: 'AO1' },
    { id: 'JH-01-3', label: 'I select short, embedded quotations.', ao: 'AO1' },
    { id: 'JH-01-4', label: 'I analyse language that suggests animalism or evil.', ao: 'AO2' },
    { id: 'JH-01-5', label: 'I analyse narrative perspective and uncertainty.', ao: 'AO2' },
    { id: 'JH-01-6', label: "I explore Hyde's physical description symbolically.", ao: 'AO2' },
    { id: 'JH-01-7', label: "I track Hyde's impact on others.", ao: 'AO1' },
    { id: 'JH-01-8', label: 'I weave Victorian fears naturally.', ao: 'AO3' },
    { id: 'JH-01-9', label: 'I link Hyde to repression and degeneration.', ao: 'AO3' },
    { id: 'JH-01-10', label: 'I include an alternative interpretation.', ao: 'AO1' },
    { id: 'JH-01-11', label: 'I avoid narrative retelling.', ao: 'AO1' },
    { id: 'JH-01-12', label: 'I write with a critical voice.', ao: 'AO1' },
  ],
  `AO1 (12): Top-band responses sustain a clear argument about fear, selecting precise quotations and linking Hyde's behaviour and effect on others. Weak responses retell events.

AO2 (12): Top-band answers analyse language, symbolism and narrative uncertainty with purpose. Weak answers list techniques or ignore narrative voice.

AO3 (6): Context is woven in (Victorian fears of degeneration and repression). Weak responses bolt on context.

Weak: summary, long quotes, vague fear, technique spotting.`,
  `Step 1 (2 min): Define fear (physical, moral, psychological).
Step 2 (5 min): Select 3 ideas (appearance, behaviour, effect).
Step 3 (5 min): Choose short quotations.
Step 4 (30 min): Write analytical paragraphs.
Step 5 (5 min): Add alternative interpretation.`,
  {
    grade4: `Stevenson presents Hyde as frightening through the way he is described and how others react to him. Hyde is shown as violent and strange—characters feel fear when they see him or hear about him. The writer uses words that suggest something is wrong with Hyde, which makes the reader feel uneasy.

When people in the novel describe Hyde, they struggle to say exactly what he looks like, but they know he is dangerous. This makes him seem more frightening because the reader cannot picture him clearly. Stevenson shows that Hyde is a threat to others and that his presence creates fear.`,
    grade6: `Stevenson presents Hyde as frightening through a combination of unclear description and violent behaviour. Hyde's appearance is deliberately vague—witnesses struggle to describe him, which suggests he represents something beyond normal human form. This ambiguity makes him unsettling.

His actions are clearly violent and cruel, which creates fear. The way other characters react—with instinctive disgust or terror—reinforces the idea that Hyde is evil. Stevenson uses narrative perspective so that we see Hyde through the eyes of those who fear him, which makes the reader share that fear.`,
    grade8: `Stevenson presents Hyde as frightening through ambiguity and suggestion rather than graphic detail. Hyde's appearance is never fully fixed; witnesses describe something wrong or disturbing but cannot say exactly what. This refusal to clarify creates fear through uncertainty—the reader's imagination fills the gap.

Violence and moral corruption are linked: Hyde embodies the evil that emerges when respectability is stripped away. Structurally, Stevenson delays and fragments our view of Hyde, so that each encounter builds unease. Contextually, Victorian fears about degeneration and hidden desire make Hyde a figure of genuine terror.`,
    grade9: `Stevenson presents Hyde as frightening because he embodies moral degeneration that cannot be fully seen or named. The deliberate vagueness of Hyde's description—witnesses recoil but struggle to explain why—creates fear through uncertainty. He represents what society represses: violence, desire, the unacceptable self.

Contextually, Victorian anxieties about respectability, evolution and the unconscious make Hyde a powerful symbol. Stevenson's narrative structure keeps Hyde partially hidden, so that the reader shares the characters' inability to pin him down. Alternatively, Hyde is frightening precisely because he is the part of human nature that civilisation tries to deny—once acknowledged, he cannot be controlled.`,
  }
);

// ----- JH-02: Jekyll and Hyde — duality -----
const JH_02: EnglishExaminerPackTask = pack(
  [
    { id: 'JH-02-1', label: 'I define duality clearly.', ao: 'AO1' },
    { id: 'JH-02-2', label: "I track duality through Jekyll's development.", ao: 'AO1' },
    { id: 'JH-02-3', label: 'I use short quotations.', ao: 'AO1' },
    { id: 'JH-02-4', label: 'I analyse symbolism of Jekyll/Hyde.', ao: 'AO2' },
    { id: 'JH-02-5', label: 'I analyse narrative structure.', ao: 'AO2' },
    { id: 'JH-02-6', label: 'I link methods to duality.', ao: 'AO2' },
    { id: 'JH-02-7', label: 'I weave scientific context naturally.', ao: 'AO3' },
    { id: 'JH-02-8', label: 'I link duality to repression.', ao: 'AO3' },
    { id: 'JH-02-9', label: 'I include evaluative judgement.', ao: 'AO1' },
  ],
  `AO1 (12): Top-band sustain argument about duality across the novel. Weak retell plot.
AO2 (12): Top-band analyse symbolism and structure with purpose. Weak list techniques.
AO3 (6): Scientific/Victorian context woven. Weak bolted on.
Weak: summary, long quotes, unclear focus.`,
  `Step 1 (2 min): Define duality (good/evil, public/private).
Step 2 (5 min): Plan development of Jekyll/Hyde split.
Step 3 (5 min): Select quotes.
Step 4 (30 min): Write analytical paragraphs.
Step 5 (5 min): Add judgement.`,
  {
    grade4: `Stevenson explores duality through the character of Jekyll, who has two sides: a good, respectable side and a bad side that he tries to hide. Jekyll creates Hyde so that he can do bad things without people knowing it is him. This shows that people can have different sides to their character.

The problem is that Hyde becomes stronger and harder to control. Jekyll realises that he cannot keep the two sides separate forever. Stevenson uses this to show that trying to hide part of yourself can lead to trouble. The novel is about the struggle between good and bad inside one person.`,
    grade6: `Stevenson explores duality by showing how Jekyll tries to separate his good and bad sides through science. Jekyll wants to hide his darker impulses in Hyde, but the experiment goes wrong. Hyde gradually becomes stronger, and Jekyll loses control over when he transforms.

The structure of the novel supports this idea: we learn about Hyde and Jekyll in fragments, which mirrors the split in Jekyll's identity. Stevenson suggests that dividing yourself in this way is dangerous. The duality is not just between two characters but within one person who cannot hold both sides together.`,
    grade8: `Stevenson explores duality as the central theme of the novel. Jekyll's attempt to separate good and evil into two bodies leads to disaster: Hyde grows in power while Jekyll weakens. The duality is not simply good versus evil but the impossibility of dividing human nature without destruction.

Structurally, the delayed revelation of Jekyll and Hyde's connection mirrors the theme—the truth is repressed until it can no longer be contained. Symbolism (the potion, the door, the mirror) reinforces the idea of the divided self. Contextually, Victorian anxieties about respectability and repression make Jekyll's experiment a warning: duality cannot be safely managed.`,
    grade9: `Stevenson explores duality as an internal conflict that cannot be resolved by separation. Jekyll's attempt to isolate his moral self from his desires leads to loss of control: Hyde is not a separate person but the part of Jekyll that has been denied and therefore grows monstrous. Structurally, the delayed revelation of their identity mirrors repression—the truth is hidden until it erupts.

Contextually, the novel reflects Victorian anxieties about respectability, science and the unconscious. The duality of Jekyll and Hyde suggests that human nature cannot be divided without destruction. Alternatively, Stevenson may be suggesting that society's demand for a single, respectable self creates the very split it fears—duality is the cost of repression.`,
  }
);

// ----- AIC-01: An Inspector Calls — responsibility -----
const AIC_01: EnglishExaminerPackTask = pack(
  [
    { id: 'AIC-01-1', label: 'I define responsibility clearly.', ao: 'AO1' },
    { id: 'AIC-01-2', label: 'I sustain focus on responsibility throughout.', ao: 'AO1' },
    { id: 'AIC-01-3', label: 'I use short, embedded quotations.', ao: 'AO1' },
    { id: 'AIC-01-4', label: 'I analyse dramatic methods.', ao: 'AO2' },
    { id: 'AIC-01-5', label: 'I analyse character contrasts.', ao: 'AO2' },
    { id: 'AIC-01-6', label: 'I link structure to responsibility.', ao: 'AO2' },
    { id: 'AIC-01-7', label: 'I weave socialist context.', ao: 'AO3' },
    { id: 'AIC-01-8', label: "I evaluate Priestley's message.", ao: 'AO1' },
  ],
  `AO1 (12): Top-band sustain argument about responsibility across the play. Weak retell plot.
AO2 (12): Top-band analyse dramatic methods and character contrast with purpose. Weak list techniques.
AO3 (6): Socialist context woven. Weak bolted on.
Weak: summary, long quotes, unclear focus.`,
  `Step 1 (2 min): Define responsibility (individual, collective).
Step 2 (5 min): Plan character contrasts (young/old, accepting/rejecting).
Step 3 (5 min): Select quotes.
Step 4 (30 min): Write analytical paragraphs.
Step 5 (5 min): Add judgement.`,
  {
    grade4: `Priestley shows responsibility by making characters face up to their actions. The Inspector arrives and questions each character about their part in Eva Smith's life. Some characters, like Mr Birling, refuse to accept responsibility and blame others. Others, like Sheila and Eric, begin to understand that their actions had consequences.

The younger characters are more willing to accept responsibility, while the older ones try to protect themselves. Priestley shows that responsibility means admitting what you have done and being willing to change. By the end, the audience can see who has learned this lesson and who has not.`,
    grade6: `Priestley presents responsibility through the Inspector's investigation and the way each character responds. The Inspector forces the Birlings and Gerald to confront their role in Eva Smith's suffering. Responsibility is shown as something that connects everyone—each character's actions contributed to her fate.

Priestley contrasts those who accept responsibility (Sheila, Eric) with those who reject it (Mr and Mrs Birling). The dramatic structure—one character exposed after another—shows how responsibility cannot be avoided when it is fairly examined. The Inspector speaks for the idea that we are all responsible for each other.`,
    grade8: `Priestley presents responsibility as a moral and collective duty. The Inspector's questioning exposes how each character's selfishness or indifference contributed to Eva Smith's destruction. Responsibility is not just personal but social: the play argues that we are "responsible for each other".

Dramatic methods reinforce this. The Inspector's authority and the structure of the play—each character's secret revealed in turn—create a moral reckoning. Priestley contrasts the older generation's refusal to accept responsibility with the younger characters' willingness to change. Contextually, this supports a socialist message about collective care.`,
    grade9: `Priestley presents responsibility as collective moral duty, central to his political message. The Inspector functions as a catalyst, forcing each character to confront their role in Eva Smith's fate. Responsibility is not individual guilt alone but the idea that "we are members of one body"—society fails when people refuse to care for each other.

Dramatic structure exposes consequence: the revelation of each character's involvement builds a picture of collective responsibility. Contextually, Priestley's socialist beliefs shape the play's argument. Alternatively, the cyclical structure—the return of the Inspector's threat—suggests that society resists responsibility and may never learn.`,
  }
);

// ----- AIC-02: An Inspector Calls — Inspector -----
const AIC_02: EnglishExaminerPackTask = pack(
  [
    { id: 'AIC-02-1', label: "I define Priestley's ideas clearly.", ao: 'AO1' },
    { id: 'AIC-02-2', label: "I focus on the Inspector's role.", ao: 'AO1' },
    { id: 'AIC-02-3', label: 'I use short quotations.', ao: 'AO1' },
    { id: 'AIC-02-4', label: "I analyse the Inspector's language.", ao: 'AO2' },
    { id: 'AIC-02-5', label: 'I analyse dramatic function.', ao: 'AO2' },
    { id: 'AIC-02-6', label: 'I link methods to ideas.', ao: 'AO2' },
    { id: 'AIC-02-7', label: 'I weave political context.', ao: 'AO3' },
    { id: 'AIC-02-8', label: 'I include evaluative judgement.', ao: 'AO1' },
  ],
  `AO1 (12): Top-band sustain focus on Inspector's role in conveying ideas. Weak drift into general plot.
AO2 (12): Top-band analyse language and dramatic function with purpose. Weak list techniques.
AO3 (6): Political context woven. Weak bolted on.
Weak: summary, long quotes, unclear focus.`,
  `Step 1 (2 min): Define Priestley's ideas (collective responsibility, socialism).
Step 2 (5 min): Plan Inspector's function (catalyst, authority, revelation).
Step 3 (5 min): Select quotes.
Step 4 (30 min): Write analytical paragraphs.
Step 5 (5 min): Add judgement.`,
  {
    grade4: `Priestley uses the Inspector to teach the characters and the audience a lesson. The Inspector questions each character and makes them admit what they did to Eva Smith. He does not let them hide or make excuses. Through the Inspector, Priestley shows that actions have consequences and that people should take responsibility for how they treat others.

The Inspector is serious and confident, which makes the characters listen to him. He leaves them with the idea that they are all connected and responsible for each other. Priestley uses him to convey the message that society should be fairer and more caring.`,
    grade6: `Priestley uses the Inspector to challenge the characters and convey his ideas about responsibility. The Inspector's questioning forces each character to face their role in Eva Smith's suffering. He is not a normal policeman—he seems to know everything already and speaks with moral authority. Through him, Priestley argues that we are "responsible for each other".

The Inspector's language is direct and often prophetic. He leaves before the characters can dismiss him, so his message lingers. Priestley uses the Inspector to show that moral truth cannot be avoided, even when the powerful try to ignore it.`,
    grade8: `Priestley uses the Inspector as the main vehicle for his ideas. The Inspector's dramatic function is to expose the consequences of selfishness and to argue for collective responsibility. His authority—he controls the stage, the timing of revelations, and the final warning—forces the characters and the audience to reflect.

His language is carefully chosen: he speaks in terms of "we" and "us", reinforcing the socialist message. The Inspector does not simply solve a crime; he delivers a moral and political argument. Contextually, he embodies Priestley's belief that society must change and that the individual is part of a collective.`,
    grade9: `Priestley uses the Inspector as a moral catalyst who disrupts the Birlings' capitalist complacency. The Inspector's authority is not legal but moral: he already knows the truth and forces the characters to confront it. His function is to convey Priestley's socialist ideals—collective responsibility, the failure of individualism, the need for change.

Contextually, the Inspector embodies the voice of conscience and social justice. His ambiguity—who is he? could he be real?—suggests that the ideas he represents transcend any single character. Alternatively, his supernatural overtones imply that moral truth will always return to demand accountability, whether society accepts it or not.`,
  }
);

// ----- Export -----
const GUIDE_POST_BY_TASK_ID: Record<string, EnglishExaminerPackTask> = {
  'P-S01': P_S01,
  'P-S03': P_S03,
  'P-C02': P_C02,
  'P-C03': P_C03,
  'UP-02': UP_02,
  'UP-C02': UP_C02,
  'M-01': M_01,
  'M-03': M_03,
  'ACC-01': ACC_01,
  'ACC-02': ACC_02,
  'ACC-03': ACC_03,
  'JH-01': JH_01,
  'JH-02': JH_02,
  'AIC-01': AIC_01,
  'AIC-02': AIC_02,
};

export function getGuidePostForLiteratureTask(taskId: string): EnglishExaminerPackTask | undefined {
  return GUIDE_POST_BY_TASK_ID[taskId];
}

/** Task IDs that have full GuidePost content (mark scheme, checklist, method, models). */
export const LITERATURE_GUIDEPOST_TASK_IDS: string[] = Object.keys(GUIDE_POST_BY_TASK_ID);
