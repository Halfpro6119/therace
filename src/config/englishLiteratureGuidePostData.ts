/**
 * Literature GuidePost content from docs/ENGLISH_LITERATURE_GUIDEPOST.md
 * Examiner-faithful mark schemes, Grade 9 checklists, step-by-step methods, model answers (4/6/8/9).
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

// ----- Chunk 1: Seen Poetry Comparison — P-C01 Ozymandias & London (power) -----
const P_C01: EnglishExaminerPackTask = pack(
  [
    { id: 'P-C01-1', label: 'I define what power means in this question', ao: 'AO1' },
    { id: 'P-C01-2', label: 'I compare poems throughout, not separately', ao: 'AO1' },
    { id: 'P-C01-3', label: 'Each paragraph has a clear comparative idea', ao: 'AO1' },
    { id: 'P-C01-4', label: 'I use short, precise quotations', ao: 'AO1' },
    { id: 'P-C01-5', label: 'Quotes are embedded into sentences', ao: 'AO1' },
    { id: 'P-C01-6', label: 'I analyse why the poet chose them', ao: 'AO1' },
    { id: 'P-C01-7', label: 'I analyse language AND structure', ao: 'AO2' },
    { id: 'P-C01-8', label: 'I comment on form where relevant', ao: 'AO2' },
    { id: 'P-C01-9', label: 'I link methods directly to power', ao: 'AO2' },
    { id: 'P-C01-10', label: 'Context explains meaning, not just background', ao: 'AO3' },
    { id: 'P-C01-11', label: 'Context is integrated smoothly', ao: 'AO3' },
    { id: 'P-C01-12', label: 'I explore different types of power', ao: 'AO1' },
    { id: 'P-C01-13', label: 'I include alternative interpretations', ao: 'AO1' },
    { id: 'P-C01-14', label: 'I write with a critical voice, not a formula', ao: 'AO1' },
  ],
  `AO1 (12 marks): Response & Evidence — Maintain focus on the question; compare poems continuously; short, embedded quotations; quotations drive argument.
AO2 (12 marks): Language, Form & Structure — Analyse methods with purpose; link techniques to power; comment on structure and form; terminology naturally.
AO3 (6 marks): Context — Woven in, not bolted on; linked to meaning; selective.

Weak: separate poem paragraphs; long quotations; listing techniques; context paragraphs.`,
  `Step 1 (2 min): Define power = political authority; control over others; power vs powerlessness; temporary vs lasting.
Step 2 (5 min): Choose 3 comparison ideas — e.g. illusion vs reality of power; power and control over people; power over time.
Step 3 (5 min): Plan each paragraph: point comparing both; quote A + quote B; method; context link; judgement.
Step 4 (30 min): Introduction (argument); 3 comparative paragraphs; short conclusion.
Step 5 (5 min): Tighten quotations; add one alternative interpretation; improve topic sentences.`,
  {
    grade4: `Both poems show power, but in different ways. In Ozymandias, the ruler thinks he is powerful, but his statue is ruined. The line "king of kings" shows that Ozymandias believed he was very powerful. However, the desert around the statue shows that his power did not last.

In London, power is shown through control over people. The phrase "mind-forged manacles" suggests that people are trapped by rules and government. This shows that power is used to control ordinary people.

Both poems show that power can be negative. Ozymandias had too much pride, and the government in London causes suffering.`,
    grade6: `Both poems explore power, but they present it in different ways. In Ozymandias, Shelley shows that power is temporary. The ruined statue suggests that the ruler's power has faded, even though he once believed it was permanent. The phrase "colossal wreck" highlights this contrast.

In London, Blake presents power as something that controls people's lives. The metaphor "mind-forged manacles" suggests that people are trapped mentally by authority. This shows power as oppressive rather than impressive.

Shelley criticises individual rulers, while Blake criticises institutions. Both poets suggest that power often causes harm rather than good.`,
    grade8: `Both Shelley and Blake explore power as something that is damaging, but they focus on different forms of it. In Ozymandias, Shelley presents power as an illusion. Although the ruler claims to be the "king of kings", the broken statue surrounded by desert shows that his authority has been destroyed by time. The contrast between the proud inscription and the "colossal wreck" emphasises the fragility of human power.

In contrast, Blake's London presents power as active and oppressive. The metaphor "mind-forged manacles" suggests that authority controls not only people's actions but also their thoughts. Unlike Ozymandias' power, which has faded, the power in London is ongoing and harmful.

Both poets are critical of power, but Shelley suggests it is ultimately self-defeating, while Blake presents it as something that continues to damage society.`,
    grade9: `Shelley and Blake both present power as corrupting, but they differ in how and where that power operates. In Ozymandias, Shelley exposes the illusion of absolute power. The ruler's arrogant command, "Look on my works, ye Mighty, and despair!", is undermined by the image of the statue's remains, a "colossal wreck" surrounded by "lone and level sands". This contrast suggests that political power is temporary and ultimately meaningless when faced with time.

Blake, however, presents power as immediate and inescapable. In London, authority is embedded within society itself. The metaphor "mind-forged manacles" implies psychological control, suggesting that people are complicit in their own oppression. Unlike Ozymandias, whose power has collapsed, the institutions Blake criticises continue to function.

Context strengthens these ideas. Shelley's Romantic beliefs led him to criticise tyranny and celebrate the power of nature, while Blake attacked the political and religious systems of industrial London. Both poets present power negatively, but Shelley views it as self-destructive, whereas Blake presents it as a persistent force that must be challenged.`,
  }
);

// ----- Chunk 2: Seen Poetry Single — P-S02 Exposure (conflict) -----
const P_S02: EnglishExaminerPackTask = pack(
  [
    { id: 'P-S02-1', label: 'I define conflict as more than fighting', ao: 'AO1' },
    { id: 'P-S02-2', label: 'I show internal and external conflict', ao: 'AO1' },
    { id: 'P-S02-3', label: 'I maintain focus on the question throughout', ao: 'AO1' },
    { id: 'P-S02-4', label: 'Quotations are short and embedded', ao: 'AO1' },
    { id: 'P-S02-5', label: 'Evidence is selected for impact', ao: 'AO1' },
    { id: 'P-S02-6', label: 'I analyse why Owen chose specific words', ao: 'AO1' },
    { id: 'P-S02-7', label: 'I analyse imagery and repetition', ao: 'AO2' },
    { id: 'P-S02-8', label: 'I comment on structure (cyclical, stanza endings)', ao: 'AO2' },
    { id: 'P-S02-9', label: 'I explore sound (sibilance, half rhyme)', ao: 'AO2' },
    { id: 'P-S02-10', label: 'Context explains Owen\'s message', ao: 'AO3' },
    { id: 'P-S02-11', label: 'Context is integrated naturally', ao: 'AO3' },
    { id: 'P-S02-12', label: 'I include alternative interpretations', ao: 'AO1' },
    { id: 'P-S02-13', label: 'I write with a critical, confident voice', ao: 'AO1' },
  ],
  `AO1 (12 marks): Argument & Evidence — Focus on "conflict"; conflict as psychological AND physical; precise short quotations; conceptual argument.
AO2 (12 marks): Language, Form & Structure — Imagery, repetition, structure, sound; methods reinforce conflict; cyclical structure, stanza endings; terminology naturally.
AO3 (6 marks): Context — Selective and purposeful; linked to meaning; explains poet's message about war.

Weak: retelling events; conflict as just "war"; listing techniques; context bolted on.`,
  `Step 1 (2 min): Define conflict = physical suffering; mental torment; conflict with nature; conflict with leadership/purpose of war.
Step 2 (5 min): Choose 3–4 paragraph ideas — e.g. conflict with nature; psychological conflict and waiting; futility of war; cyclical suffering.
Step 3 (5 min): Plan each paragraph: point about conflict; quotation; method; effect; context link; judgement.
Step 4 (30 min): Introduction (argument); 3–4 analytical paragraphs; short conclusion.
Step 5 (5 min): Tighten quotations; add one alternative reading; improve topic sentences.`,
  {
    grade4: `In Exposure, Owen presents conflict as being difficult and painful for the soldiers. They are not only fighting the enemy but also the weather. The line "merciless iced east winds that knive us" shows how the cold is attacking them.

The soldiers also suffer mentally. They are forced to wait and this causes fear and boredom. The repetition of "but nothing happens" shows how frustrating this is.

Owen wrote during World War One, so he wanted to show how hard life was for soldiers. The poem suggests that war is not heroic.`,
    grade6: `Owen presents conflict in Exposure as something that is constant and exhausting. Rather than fighting enemy soldiers, the men are battling the weather. The phrase "merciless iced east winds that knive us" personifies the weather, making nature seem like an enemy.

There is also psychological conflict. The repetition of "but nothing happens" highlights the soldiers' frustration and fear as they wait. This shows that waiting is as damaging as fighting.

Owen experienced trench warfare himself, which helps explain why he presents war as pointless and cruel rather than heroic.`,
    grade8: `In Exposure, Owen presents conflict as a continuous struggle that affects soldiers both physically and mentally. The primary conflict is not with the enemy, but with nature itself. The personification in "merciless iced east winds that knive us" presents the weather as violent and aggressive, suggesting that it is a more immediate threat than opposing soldiers.

Psychological conflict is also central to the poem. The repeated line "but nothing happens" reflects the soldiers' frustration and helplessness as they wait. This repetition mirrors the endless cycle of suffering and creates a sense of futility.

Owen's experience as a soldier during World War One influences this portrayal. He challenges the idea of war as heroic, instead presenting it as a source of pointless suffering and emotional damage.`,
    grade9: `In Exposure, Owen presents conflict as an overwhelming and inescapable force that extends far beyond traditional ideas of battle. The soldiers' primary conflict is not with an enemy army, but with the natural world. The personification in "merciless iced east winds that knive us" transforms the weather into a violent attacker, suggesting that nature itself has become a weapon of war.

Alongside this physical conflict, Owen explores deep psychological suffering. The repeated refrain "but nothing happens" captures the soldiers' growing sense of futility. This cyclical repetition reflects the endless waiting and emotional paralysis experienced in the trenches, where anticipation becomes a form of torture.

Structure reinforces this conflict. The poem's regular stanza pattern and use of half-rhyme create a sense of unease and incompleteness, mirroring the soldiers' unresolved suffering. Contextually, Owen's first-hand experience of trench warfare allows him to expose the reality of war, challenging romanticised views and highlighting its destructive impact on the human mind.

Ultimately, Exposure suggests that the greatest conflict in war is not between nations, but between human endurance and the relentless forces that seek to break it.`,
  }
);

// ----- Chunk 3: Unseen Q1 — UP-01 (loneliness) -----
const UP_01: EnglishExaminerPackTask = pack(
  [
    { id: 'UP-01-1', label: 'I define what loneliness means in this poem', ao: 'AO1' },
    { id: 'UP-01-2', label: 'I explore emotional complexity (not one-note sadness)', ao: 'AO1' },
    { id: 'UP-01-3', label: 'I include an alternative interpretation', ao: 'AO1' },
    { id: 'UP-01-4', label: 'Quotations are short and embedded', ao: 'AO1' },
    { id: 'UP-01-5', label: 'Evidence is analysed, not described', ao: 'AO1' },
    { id: 'UP-01-6', label: 'I analyse imagery and symbolism', ao: 'AO2' },
    { id: 'UP-01-7', label: 'I comment on structural shifts', ao: 'AO2' },
    { id: 'UP-01-8', label: 'I explore sound or rhythm if relevant', ao: 'AO2' },
    { id: 'UP-01-9', label: 'I use tentative language ("suggests", "implies")', ao: 'AO1' },
    { id: 'UP-01-10', label: 'I make critical judgements', ao: 'AO1' },
  ],
  `AO1 (12 marks): Understanding & Response — Clear conceptual interpretation; tightly focused on the emotion; short, precise quotations; ideas developed logically.
AO2 (12 marks): Language, Form & Structure — Analyse imagery, symbolism, sound, structure; link techniques to loneliness; shifts in tone or perspective; terminology naturally.

Weak: paraphrasing; retelling; technique spotting; ignoring structure.`,
  `Step 1 (2 min): First read — emotion only. What does the speaker feel? When does it change?
Step 2 (5 min): Second read — circle 2 images; 1 structural shift; 1 sound feature.
Step 3 (5 min): Choose 3 paragraph focuses — e.g. physical isolation; emotional detachment; ending insight or shift.
Step 4 (30 min): Introduction (interpretation); 3 analytical paragraphs; short conclusion.`,
  {
    grade4: `The poet presents loneliness as feeling isolated. The speaker seems to be alone and separate from others. Words like "empty" suggest that nothing is around them.

The poem also shows that loneliness is quiet. There is not much movement or noise, which makes the speaker feel forgotten.

Overall, the poem presents loneliness as something sad and uncomfortable.`,
    grade6: `The poet presents loneliness as a feeling of isolation and distance from others. The speaker describes being alone, which creates a sense of emptiness. The imagery used suggests that the speaker feels cut off.

There is also emotional loneliness. Even when the speaker thinks about others, they still feel disconnected. This shows that loneliness is not just about being physically alone.

The poem suggests that loneliness can slowly affect how a person sees the world.`,
    grade8: `The poet presents loneliness as a deep emotional state rather than simple physical isolation. Imagery describing empty or quiet surroundings reflects the speaker's inner feelings, suggesting that loneliness affects both the mind and the environment.

The structure of the poem reinforces this idea. As the poem progresses, the speaker becomes more withdrawn, showing how loneliness intensifies over time. The lack of interaction emphasises emotional distance.

The poem suggests that loneliness is not temporary, but something that slowly shapes a person's identity.`,
    grade9: `The poet presents loneliness as an all-encompassing emotional condition that shapes the speaker's perception of the world. Rather than simply describing physical isolation, the poem suggests that loneliness alters how the speaker experiences their surroundings. Images of emptiness and stillness imply that the absence of connection has drained meaning from ordinary life.

Structurally, the poem moves from observation to introspection. As the speaker turns inward, the tone becomes more subdued, suggesting that loneliness is internalised rather than resisted. This shift reflects how prolonged isolation can lead to emotional withdrawal.

An alternative interpretation is that the speaker chooses solitude, suggesting loneliness may offer a form of protection. However, the overall effect remains unsettling, implying that even chosen isolation carries an emotional cost.`,
  }
);

// ----- Chunk 3: Unseen Q2 — UP-C01 (compare loneliness) -----
const UP_C01: EnglishExaminerPackTask = pack(
  [
    { id: 'UP-C01-1', label: 'Both poems addressed in every paragraph', ao: 'AO1' },
    { id: 'UP-C01-2', label: 'Similarities AND differences explored', ao: 'AO1' },
    { id: 'UP-C01-3', label: 'Comparative connectives used ("whereas", "similarly")', ao: 'AO1' },
    { id: 'UP-C01-4', label: 'Judgement made about which is more powerful', ao: 'AO1' },
  ],
  `Same AOs as Unseen Q1. Comparison must be continuous; less context required; focus on methods and effects.`,
  `1. Identify shared theme (loneliness).
2. Identify one key difference in presentation.
3. Build paragraphs around ideas, not poems.
4. End with a judgement.`,
  {
    grade4: `Both poems show loneliness. In both, the speakers feel alone. The first poem focuses on being physically isolated, while the second shows emotional loneliness.

The language in both poems creates a sad mood. This makes the reader feel sympathy for the speakers.`,
    grade6: `Both poems present loneliness, but in different ways. In the first poem, loneliness comes from being physically alone. In the second poem, loneliness is emotional and comes from feeling disconnected.

The poets use imagery to show emptiness. However, the second poem suggests loneliness is more intense because it affects thoughts and feelings.`,
    grade8: `Both poets explore loneliness as an emotional experience, but they present it differently. In the first poem, loneliness is shown through physical isolation and still surroundings. In contrast, the second poem focuses on inner thoughts, suggesting emotional distance even when others exist.

Structurally, the first poem remains static, reinforcing isolation, while the second includes a shift, suggesting a deeper emotional struggle.`,
    grade9: `Both poems present loneliness as an emotional state, yet they differ in how deeply it is internalised. In the first poem, loneliness is reflected through physical isolation and empty surroundings, suggesting separation from the external world. In contrast, the second poem presents loneliness as internal, existing even in the presence of others.

The use of structure reinforces this difference. The first poem remains largely static, mirroring emotional stasis, whereas the second includes a shift towards introspection, implying that loneliness intensifies over time.

Overall, the second poem presents loneliness as more damaging, as it suggests that emotional isolation cannot be resolved simply by changing one's surroundings.`,
  }
);

// ----- Chunk 4: Macbeth — M-01 Ambition (extract + whole) -----
const M_01: EnglishExaminerPackTask = pack(
  [
    { id: 'M-01-1', label: 'I define ambition clearly', ao: 'AO1' },
    { id: 'M-01-2', label: 'I track how ambition changes', ao: 'AO1' },
    { id: 'M-01-3', label: 'I make a judgement about ambition', ao: 'AO1' },
    { id: 'M-01-4', label: 'Quotes are short and embedded', ao: 'AO1' },
    { id: 'M-01-5', label: 'I use evidence beyond the extract', ao: 'AO1' },
    { id: 'M-01-6', label: 'I select quotes for meaning, not memory', ao: 'AO1' },
    { id: 'M-01-7', label: 'I analyse imagery (blood, darkness, disease)', ao: 'AO2' },
    { id: 'M-01-8', label: 'I analyse soliloquies', ao: 'AO2' },
    { id: 'M-01-9', label: 'I comment on structure and turning points', ao: 'AO2' },
    { id: 'M-01-10', label: 'Context explains Shakespeare\'s message', ao: 'AO3' },
    { id: 'M-01-11', label: 'Context is linked directly to ambition', ao: 'AO3' },
    { id: 'M-01-12', label: 'I explore ambition as both positive and destructive', ao: 'AO1' },
    { id: 'M-01-13', label: 'I consider alternative interpretations', ao: 'AO1' },
  ],
  `AO1 (12 marks): Response & Evidence — Tight focus on ambition; extract as springboard; refer to multiple points; precise quotations.
AO2 (12 marks): Language, Form & Structure — Imagery, symbolism, soliloquies; track development of ambition; dramatic methods; terminology naturally.
AO3 (6 marks): Context — Link ambition to Jacobean beliefs; kingship vs tyranny; context woven in.

Weak: retelling plot; ignoring extract; technique spotting; context paragraphs.`,
  `Step 1 (2 min): Define ambition = desire for power; disruption of natural order; moral corruption; fate vs choice.
Step 2 (5 min): Plan 3–4 paragraph ideas — e.g. ambition ignited by witches; ambition and moral conflict; ambition becoming tyrannical; consequences.
Step 3: Use the extract properly — analyse extract first; then link to moments before and after; show development.
Step 4 (30 min): Introduction (argument); 3–4 analytical paragraphs; brief conclusion.`,
  {
    grade4: `In Macbeth, ambition is shown as dangerous. In the extract, Macbeth is thinking about becoming king, which shows he wants power. He is unsure, which shows ambition causes conflict.

Later in the play, Macbeth kills Duncan because of his ambition. This shows that ambition can make people do bad things. Lady Macbeth also encourages his ambition.

Shakespeare shows that ambition can lead to destruction.`,
    grade6: `Shakespeare presents ambition as something that leads to moral conflict and violence. In the extract, Macbeth is tempted by the idea of power, but he feels guilty. This shows ambition makes him uncomfortable.

Later, Macbeth's ambition leads him to kill Duncan. His ambition grows stronger as the play continues, and he becomes more violent.

Shakespeare suggests that ambition can be dangerous if it is not controlled.`,
    grade8: `Shakespeare presents ambition as a powerful force that corrupts Macbeth over time. In the extract, Macbeth is already tempted by the idea of kingship, showing that ambition has taken hold. His hesitation reveals inner conflict, suggesting that ambition clashes with his moral values.

As the play progresses, Macbeth's ambition grows. After killing Duncan, he becomes increasingly ruthless, ordering Banquo's murder and later attacking Macduff's family. This development shows how ambition evolves from desire into tyranny.

Shakespeare uses this to warn against unchecked ambition, particularly in a society that valued loyalty to the king.`,
    grade9: `Shakespeare presents ambition in Macbeth as a destructive force that erodes moral integrity and disrupts the natural order. In the extract, Macbeth's ambition is already active, fuelled by the witches' prophecies. His internal conflict reveals that ambition is not imposed upon him but awakened from within.

As the play develops, ambition transforms Macbeth from a respected nobleman into a tyrant. His increasing reliance on violence, particularly the murder of Banquo and Macduff's family, demonstrates how ambition replaces conscience. Shakespeare's use of soliloquies allows the audience to witness this moral deterioration in real time.

Contextually, Jacobean audiences feared ambition that challenged the divine right of kings. By presenting Macbeth's ambition as self-destructive, Shakespeare reinforces the idea that the pursuit of power beyond one's rightful place leads to chaos and suffering.

Ultimately, Macbeth suggests that ambition, when unchecked by morality, consumes both the individual and the society around them.`,
  }
);

// ----- Chunk 4: Macbeth — M-02 Lady Macbeth (powerful character) -----
const M_02: EnglishExaminerPackTask = pack(
  [
    { id: 'M-02-1', label: 'I track Lady Macbeth\'s rise and fall', ao: 'AO1' },
    { id: 'M-02-2', label: 'I explore gender expectations', ao: 'AO3' },
    { id: 'M-02-3', label: 'I analyse language and imagery', ao: 'AO2' },
    { id: 'M-02-4', label: 'I show development across the play', ao: 'AO1' },
    { id: 'M-02-5', label: 'Quotes are short and embedded', ao: 'AO1' },
    { id: 'M-02-6', label: 'I make a judgement about her power', ao: 'AO1' },
  ],
  `AO1: Response & Evidence — Track Lady Macbeth's rise and fall; precise quotations.
AO2: Language, Form & Structure — Analyse language and imagery; dramatic methods.
AO3: Context — Gender expectations; Jacobean views.

Top-band: track rise and fall; explore gender expectations; analyse language + imagery; show development.`,
  `Step 1: Identify key scenes (e.g. "unsex me"; persuasion of Macbeth; banquet; sleepwalking).
Step 2: Plan paragraphs — initial power (language, manipulation); challenge to gender; decline (guilt, isolation).
Step 3: Write — introduction; 3–4 analytical paragraphs; conclusion with judgement.`,
  {
    grade4: `Lady Macbeth is powerful because she influences Macbeth. She tells him to kill Duncan and uses strong language. This shows she is in control.

Later, she becomes weaker and feels guilty. This shows her power does not last.`,
    grade6: `Lady Macbeth is presented as powerful because she manipulates Macbeth. She questions his masculinity to control him. This shows she is dominant.

However, her power fades later in the play. She becomes guilty and is no longer in control. Shakespeare shows that power gained unnaturally does not last.`,
    grade8: `Lady Macbeth is initially presented as powerful and dominant. Her use of imperatives and insults allows her to control Macbeth's actions. This challenges traditional gender roles.

As the play progresses, her power weakens. Guilt overwhelms her, and she becomes isolated. Shakespeare uses this to show the psychological cost of power.`,
    grade9: `Shakespeare initially presents Lady Macbeth as a powerful and subversive figure who challenges Jacobean gender expectations. Her commanding language and emotional manipulation allow her to dominate Macbeth, particularly by equating ambition with masculinity.

However, this power is temporary. As guilt consumes her, she loses control, while Macbeth grows increasingly independent and violent. Shakespeare ultimately suggests that power achieved through manipulation and moral transgression is unsustainable.`,
  }
);

const GUIDE_POST_BY_TASK_ID: Record<string, EnglishExaminerPackTask> = {
  'P-C01': P_C01,
  'P-S02': P_S02,
  'UP-01': UP_01,
  'UP-C01': UP_C01,
  'M-01': M_01,
  'M-02': M_02,
};

export function getGuidePostForLiteratureTask(taskId: string): EnglishExaminerPackTask | undefined {
  return GUIDE_POST_BY_TASK_ID[taskId];
}

/** Task IDs that have full GuidePost content (mark scheme, checklist, method, models). */
export const LITERATURE_GUIDEPOST_TASK_IDS: string[] = Object.keys(GUIDE_POST_BY_TASK_ID);
