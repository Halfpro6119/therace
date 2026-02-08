/**
 * Literature GuidePost content — all 14 tasks
 * Examiner-faithful mark schemes, Grade 9 checklists, step-by-step methods, model answers (4/6/8/9).
 * Source: docs/ENGLISH_LITERATURE_GUIDEPOST.md
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
    grade4: `Shelley presents power in Ozymandias as something that does not last. The ruler believes he is powerful, calling himself "king of kings", which shows his pride. However, the statue is broken, showing his power has faded.

The desert around the statue shows how time has defeated him. Even though Ozymandias was once powerful, nothing remains of his rule.

Shelley shows that power can be temporary and meaningless.`,
    grade6: `Shelley presents power as fragile and temporary. Ozymandias believes he is powerful, shown through the phrase "king of kings", which suggests dominance. However, the ruined statue shows this power has not lasted.

The image of the "colossal wreck" contrasts with Ozymandias' arrogance. This suggests that time is more powerful than human rulers.

Shelley criticises power that is based on pride rather than respect.`,
    grade8: `Shelley presents power in Ozymandias as an illusion. Although Ozymandias claims absolute authority, the broken statue suggests that his power has been destroyed. The contrast between "king of kings" and "colossal wreck" highlights the gap between belief and reality.

The sonnet form traditionally celebrates love, but Shelley subverts it to criticise political power. The vast desert emphasises how time erases human achievement.

As a Romantic poet, Shelley challenges tyrannical power and suggests that nature ultimately overpowers human ambition.`,
    grade9: `Shelley presents power as both arrogant and ultimately meaningless. Ozymandias' command to "look on my works" suggests confidence in his authority, yet this is undercut by the image of a "colossal wreck". The juxtaposition exposes power as an illusion sustained by pride.

Structurally, the framed narrative distances Ozymandias from the reader, reinforcing how his power has faded into history. The surrounding desert symbolises time's dominance over political authority.

From a Romantic perspective, Shelley criticises tyranny and celebrates the enduring power of nature. An alternative interpretation is that Ozymandias' power survives only as a warning, suggesting that even failed power leaves a legacy.`,
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
    grade4: `In Kamikaze, memory is shown as something that affects how the pilot is treated. The family remembers what he did, and this changes how they behave towards him.

The children remember how he "came back", but they no longer talk to him. This shows memory can be painful.

The poet shows memory as something that causes sadness.`,
    grade6: `Garland presents memory as something that controls how the pilot is judged. Although he returns alive, the memory of his decision causes him to be treated as if he were dead.

The natural imagery shows positive memories of life, such as the fish and the sea. These memories contrast with the shame he later experiences.

Memory becomes a way of punishing the pilot.`,
    grade8: `Garland presents memory as powerful and damaging. The pilot's memories of nature and childhood interrupt his mission, suggesting that memory reconnects him with life. Images of fish and the sea create a sense of beauty and belonging.

However, collective memory becomes cruel. The family remember his return as dishonour, and this shared memory leads to silence and rejection. Structurally, the shift in voice reflects emotional distance.

Garland suggests memory can preserve humanity but also enforce shame.`,
    grade9: `Garland presents memory as both life-affirming and destructive. The pilot's memories of nature interrupt his mission, suggesting that memory reconnects him with personal identity. The vivid natural imagery contrasts sharply with the rigid expectations of honour.

However, collective memory becomes a tool of punishment. The family's silence suggests that remembering his survival is worse than forgetting him entirely. Structurally, the fragmented narrative mirrors how memory is filtered and reshaped.

Contextually, Japanese cultural attitudes to shame intensify this punishment. An alternative interpretation is that memory preserves moral integrity, even if society rejects it.`,
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
    grade4: `Both poems show conflict in war. In Exposure, the soldiers fight the cold, while in Bayonet Charge the soldier fights the enemy.

In Exposure, the weather is dangerous. In Bayonet Charge, the soldier runs through gunfire. Both poems show war as frightening.

The poets show conflict as negative.`,
    grade6: `Both poems present conflict as dangerous, but in different ways. In Exposure, conflict comes from the weather, shown through the cold winds. In Bayonet Charge, conflict is immediate and violent as the soldier runs forward.

Exposure focuses on waiting, while Bayonet Charge focuses on movement. Both poets show war as unpleasant and frightening.`,
    grade8: `Both poems present conflict as overwhelming, but through contrasting experiences. Exposure shows prolonged conflict against nature, where soldiers suffer through cold and waiting. Bayonet Charge presents sudden conflict through rapid movement and fear.

Structurally, Exposure is repetitive, reflecting endless suffering, while Bayonet Charge uses fast pace to show panic. Both poets criticise war by focusing on individual suffering.`,
    grade9: `Both poems present conflict as destructive, but in contrasting forms. In Exposure, conflict is prolonged and impersonal, as soldiers battle the cold rather than an enemy. Nature becomes the dominant force, draining morale over time.

In contrast, Bayonet Charge presents conflict as immediate and chaotic. The rapid pace mirrors panic, suggesting instinct replaces ideology. Contextually, Owen exposes the futility of trench warfare, while Hughes highlights the primal fear beneath patriotic language.

Both poets ultimately strip war of glory, but Exposure emphasises endurance, while Bayonet Charge exposes instinctive terror.`,
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
    grade4: `Both poems explore identity. In Checking Out Me History, the speaker wants to learn about his past. In Kamikaze, the pilot's identity changes after he returns.

Both show identity is affected by society.`,
    grade6: `Both poems explore identity, but differently. Checking Out Me History shows identity being controlled through education, while Kamikaze shows identity being judged by society.

Both poets show identity as something shaped by others.`,
    grade8: `Both poems explore identity as something shaped by power. Checking Out Me History shows the speaker reclaiming identity through learning. Kamikaze shows identity being destroyed through shame.

Structurally, Agard's voice is assertive, while Garland's narrative is distant. Both highlight how identity is influenced by culture.`,
    grade9: `Both poems explore identity as something imposed and contested. In Checking Out Me History, Agard challenges the erasure of cultural identity through education, reclaiming voice and history.

In contrast, Kamikaze shows identity being controlled by collective judgement. The pilot's identity shifts from hero to outcast. Contextually, both poets expose how institutions enforce identity, but Agard offers resistance, while Garland presents silence and loss.`,
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
    grade4: `The poet creates tension by using words that suggest danger and uncertainty. Some of the language makes the reader feel uneasy.

The structure also helps create tension. The poem builds slowly, which makes the reader wonder what will happen next.

Overall, tension is created through the poet's choices.`,
    grade6: `The poet uses language to create tension by choosing words that suggest uncertainty. Descriptions of stillness and quiet make the reader expect something to happen.

The structure of the poem also builds tension. Short lines increase pace, making the poem feel more urgent.

The poet uses these methods to keep the reader engaged and uneasy.`,
    grade8: `The poet creates tension through controlled language and structure. Words suggesting hesitation and restraint create a sense of anticipation, making the reader feel that something is about to change.

Structurally, enjambment causes lines to run on, delaying meaning and increasing suspense. As the poem progresses, tension builds through shifts in pace and tone.

The poet uses these methods to keep the reader alert and unsettled.`,
    grade9: `The poet creates tension by carefully controlling both language and structure. Lexical choices associated with stillness and restraint suggest suppressed action, creating unease through what is left unsaid.

Structurally, enjambment disrupts natural pauses, forcing the reader forward and delaying resolution. This manipulation of pace mirrors the emotional uncertainty within the poem.

An alternative interpretation is that the tension is internal rather than external, reflecting psychological conflict rather than immediate threat. In both cases, the poet sustains tension by withholding clarity.`,
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
    grade4: `Both poems use imagery to help the reader imagine what is happening. In the first poem, imagery creates a clear picture.

In the second poem, imagery also helps the reader understand the situation. Both poets use imagery to express ideas.`,
    grade6: `Both poems use imagery to convey meaning, but in different ways. The first poem uses imagery to create atmosphere, while the second uses imagery to show emotion.

The imagery in both poems helps the reader understand the poet's message.`,
    grade8: `Both poets use imagery to develop meaning, but their purposes differ. In the first poem, imagery creates a sense of place and mood, shaping how the reader interprets events.

In contrast, the second poem uses imagery to reflect inner feelings. Comparing the two highlights how imagery can be external or internal in focus.`,
    grade9: `Both poems rely on imagery to convey meaning, yet they use it to different effects. In the first poem, imagery shapes the external world, influencing how events are perceived. In the second, imagery reflects internal emotion, blurring the line between setting and feeling.

This contrast suggests that imagery can either ground meaning in physical experience or elevate it into psychological space. Overall, both poets demonstrate imagery as a central tool for shaping interpretation.`,
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
    grade4: `Guilt is shown as something that troubles characters. Macbeth feels guilty after killing Duncan, shown when he cannot sleep. Lady Macbeth also becomes guilty later.

This shows guilt affects people's minds. Shakespeare presents guilt as punishment.`,
    grade6: `Shakespeare presents guilt as a powerful psychological force. Macbeth feels guilt immediately, shown through disturbed sleep and fear. Lady Macbeth initially hides guilt but later suffers.

Guilt shows that wrongdoing has consequences. Shakespeare suggests guilt cannot be avoided.`,
    grade8: `Guilt is presented as corrosive and inescapable. Macbeth's immediate disturbance shows guilt taking hold, while Lady Macbeth's repression later collapses. Imagery of blood suggests guilt cannot be washed away.

Structurally, guilt intensifies, mirroring moral decay. Shakespeare links guilt to disorder.`,
    grade9: `Shakespeare presents guilt as an internal punishment that enforces moral order. Macbeth's early agitation reveals conscience at work, while Lady Macbeth's attempted suppression culminates in psychological collapse. Blood imagery recurs, symbolising indelible guilt.

Structurally, soliloquies chart guilt's evolution from fear to numbness. Contextually, guilt aligns with Jacobean beliefs about sin and divine justice. Alternatively, Macbeth's later numbness suggests guilt mutates into moral desensitisation rather than disappearance.`,
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
    grade4: `Dickens shows Scrooge as selfish by describing him as cold and uncaring. He does not help others and thinks only of money.

This shows Scrooge is not kind. Dickens wants readers to dislike him.`,
    grade6: `Dickens presents Scrooge as selfish through negative description. He is shown as cold and isolated, suggesting he cares more about money than people.

The language makes readers view Scrooge negatively.`,
    grade8: `In the extract, Dickens presents Scrooge as emotionally and socially selfish. Descriptions of coldness reflect his lack of compassion. Narrative voice exaggerates this to criticise him.

Dickens uses this to expose moral failure in Victorian society.`,
    grade9: `Dickens presents Scrooge's selfishness as corrosive. Cold imagery aligns emotional barrenness with social isolation. The narrator's critical tone encourages moral judgement.

Contextually, Dickens condemns selfishness amid Victorian poverty. Alternatively, exaggeration invites transformation, positioning selfishness as a flaw to be corrected.`,
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
    grade4: `Dickens shows redemption by changing Scrooge. He starts selfish but becomes kind.`,
    grade6: `Redemption is shown through Scrooge's change after meeting the Spirits. He learns to care for others.`,
    grade8: `Dickens presents redemption as moral awakening. The Spirits guide Scrooge through reflection and consequence, reshaping behaviour.`,
    grade9: `Dickens frames redemption as active moral responsibility. Scrooge's transformation is earned through confrontation with past, present and future. Christian symbolism underpins this journey, suggesting redemption is available through compassion and action. Alternatively, the staged journey implies redemption requires external intervention.`,
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
    grade4: `The Cratchits show kindness despite poverty. Dickens uses them to show family matters.`,
    grade6: `Dickens uses the Cratchits to show generosity and warmth, contrasting Scrooge.`,
    grade8: `The Cratchits embody moral wealth. Dickens contrasts material poverty with emotional richness to criticise society.`,
    grade9: `Dickens uses the Cratchits as a moral counterpoint to capitalist selfishness. Their warmth under hardship exposes the failure of a society that neglects its vulnerable. Contextually, Dickens urges social responsibility. Alternatively, idealisation risks simplifying poverty, yet strengthens the moral message.`,
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
    grade4: `Stevenson presents Hyde as frightening through his violent actions. People are scared of him even without knowing why.

This shows Hyde is dangerous.`,
    grade6: `Hyde is frightening because of his violence and strange appearance. Stevenson suggests there is something wrong with him, which unsettles others.

This creates fear throughout the novel.`,
    grade8: `Stevenson presents Hyde as frightening through ambiguity and violence. His physical description is unclear, suggesting moral corruption. Hyde's actions shock others, spreading fear.

Victorian readers would fear what Hyde represents.`,
    grade9: `Stevenson presents Hyde as frightening not only through violence but through uncertainty. Descriptions of his appearance resist clarity, implying moral deformity rather than physical abnormality. This ambiguity unsettles both characters and readers.

Contextually, Hyde reflects Victorian anxieties about degeneration and repressed desires. Alternatively, Hyde's fearfulness lies in recognition — he embodies impulses society refuses to acknowledge.`,
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
    grade4: `Stevenson shows duality by having Jekyll and Hyde as two sides of one person.`,
    grade6: `Jekyll represents respectability, while Hyde represents evil. Stevenson shows that people have two sides.`,
    grade8: `Duality is shown through Jekyll's attempt to separate good and evil. Hyde becomes stronger, showing imbalance.`,
    grade9: `Stevenson explores duality as internal conflict. Jekyll's desire to separate morality from desire results in loss of control. Structurally, the delayed revelation mirrors repression. Contextually, this reflects Victorian anxiety about respectability. Alternatively, Stevenson suggests duality cannot be divided without consequence.`,
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
    grade4: `Priestley shows responsibility by making characters admit their actions.`,
    grade6: `Responsibility is shown through the Inspector questioning characters. Younger characters accept responsibility more.`,
    grade8: `Priestley presents responsibility as moral duty. The Inspector exposes how actions affect others.`,
    grade9: `Priestley presents responsibility as collective moral duty. Through dramatic structure, characters confront consequences. Contextually, this supports socialist ideology. Alternatively, the cyclical ending suggests responsibility is repeatedly ignored.`,
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
    grade4: `The Inspector teaches characters a lesson.`,
    grade6: `The Inspector challenges the Birlings and teaches responsibility.`,
    grade8: `The Inspector represents Priestley's views. His language forces reflection.`,
    grade9: `Priestley uses the Inspector as a moral catalyst. His authority disrupts capitalist complacency. Dramatically, he controls pacing and revelation. Contextually, he embodies socialist ideals. Alternatively, his ambiguity suggests ideas transcend individual authority.`,
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
