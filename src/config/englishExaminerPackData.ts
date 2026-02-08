/**
 * Examiner-pack content for all 10 English Language writing tasks.
 * Sourced from docs/ENGLISH_EXAMINER_PACK_TASKS_1_2.md – task-specific checklists,
 * full mark schemes, step-by-step methods, and Grade 4/6/8/9 model answers.
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

// Task 1: Description suggested by image (L1-W01)
const TASK_1: EnglishExaminerPackTask = pack(
  [
    { id: 'L1-W01-1', label: 'I establish mood in the first 2 sentences', ao: 'AO5' },
    { id: 'L1-W01-2', label: 'I keep a consistent viewpoint (observer / character / camera)', ao: 'AO5' },
    { id: 'L1-W01-3', label: 'I zoom in on 2–3 small details (micro focus)', ao: 'AO5' },
    { id: 'L1-W01-4', label: 'I use precise verbs (not "went / got / saw")', ao: 'AO6' },
    { id: 'L1-W01-5', label: 'I use 2+ sensory channels (sound / touch / smell)', ao: 'AO6' },
    { id: 'L1-W01-6', label: 'I use figurative language that fits the mood', ao: 'AO6' },
    { id: 'L1-W01-7', label: 'My paragraphs change focus or time (not just "new line")', ao: 'AO5' },
    { id: 'L1-W01-8', label: 'I include a deliberate shift (calm→unease / bright→grey)', ao: 'AO5' },
    { id: 'L1-W01-9', label: 'My final line feels controlled (echoes motif / final image)', ao: 'AO5' },
    { id: 'L1-W01-10', label: 'At least 1 colon or dash used correctly', ao: 'AO6' },
    { id: 'L1-W01-11', label: 'I vary sentence lengths (short punch → longer flow)', ao: 'AO6' },
    { id: 'L1-W01-12', label: 'I proofread spellings of ambitious words', ao: 'AO6' },
  ],
  `**Grade 4:** Clear description, basic imagery, some paragraphs.
**Grade 6:** Consistent viewpoint, developed atmosphere, varied sentences.
**Grade 8:** Zooming structure, deliberate shift, crafted imagery + rhythm.
**Grade 9:** Writer's voice, layered meanings, structural artistry (contrast, motif, circular ending).

AO5 (24 marks): Content & organisation – clear purpose, shaped content, paragraphing with intent, structural control.
AO6 (16 marks): Technical accuracy – sentence control, punctuation used deliberately, vocabulary precision, spelling.`,
  `**0–5 min (Plan with a camera):** Choose 3 camera shots (wide, mid, close-up); pick a mood word; pick a motif to repeat.

**5–35 min (Write in 4 paragraphs):** 1) Hook + wide shot (mood + big picture). 2) Mid shot (details + texture). 3) Close-up (1 object symbolic). 4) Shift/ending (change or reveal; echo motif).

**35–45 min (Upgrade):** Replace 5 weak verbs; add 1 structural shift line; add one intentional punctuation moment (colon/dash).`,
  {
    grade4: `The picture shows a quiet place. The sky looks dull and everything seems empty. The buildings look old and the ground looks worn, like people used to walk there but don't anymore.

There is not much colour and it makes the place feel cold. You can imagine the air being chilly and still. Nothing is moving and it feels like time has stopped.

In the distance everything looks the same, which makes it look lonely. The image feels peaceful but also a bit sad, because there are no people and no noise.

It looks like a place that has been left behind.`,
    grade6: `The image captures a place that feels paused. A pale sky hangs over the scene, washing colour from the buildings and leaving them faint and tired-looking. The ground is marked and uneven, as if it remembers footsteps that no longer arrive.

There is a strange stillness to it. The air feels cold, and the silence is noticeable, not comforting. Even the edges of the buildings look worn, softened by time and weather.

Further back, the scene stretches away without change, which makes it feel distant and lonely. You get the sense that this place once mattered, but now it has been forgotten.

It isn't dramatic or loud. It's quiet in a way that makes you look closer.`,
    grade8: `The scene is drained of warmth. Above it, the sky sits low and colourless, pressing down on the empty space like a lid. From far away, the place seems ordinary—just buildings, ground, distance—until the silence makes it feel unnatural.

Move closer and the details begin to speak. The surfaces look scuffed and tired; edges are chipped, paint is dulled, lines are softened. The ground is not clean but not messy either—simply used, then abandoned. It feels as if the place has been waiting, patient, for people who stopped coming.

Then the mood shifts. What first looked peaceful becomes uneasy. When nothing moves, the mind invents movement. You start to imagine sounds that aren't there: a door that creaks, a step that echoes.

And the quiet remains—thick, watchful—holding its breath.`,
    grade9: `Silence isn't empty here; it has weight. It settles across the image, filling corners and cracks, making even the air seem reluctant to move. Overhead, a colourless sky hangs low, flattening the world beneath it until the buildings look less like structures and more like tired outlines.

At first glance, everything appears simple: space, distance, stillness. But the longer you stare, the more the details begin to insist on being noticed. Edges are worn smooth, surfaces dulled, the ground marked by the faint memory of use. It is a place that has not been destroyed—only neglected, which somehow feels worse. Neglect means it was left on purpose.

There is a moment where calm tilts into something sharper. In the absence of people, the scene becomes too quiet, too controlled, like a photograph that refuses to tell you what happened before it was taken. You begin to search for a clue: a sign, a shadow, a single hint of life.

Nothing arrives. The silence stays.`,
  }
);

// Task 2: Narrative "The door was already open" (L1-W02)
const TASK_2: EnglishExaminerPackTask = pack(
  [
    { id: 'L1-W02-1', label: 'The opening line creates a question / mystery', ao: 'AO5' },
    { id: 'L1-W02-2', label: 'I show emotion through action (not "I was scared")', ao: 'AO5' },
    { id: 'L1-W02-3', label: 'I include a turning point (decision / discovery / consequence)', ao: 'AO5' },
    { id: 'L1-W02-4', label: 'I control pace (slow build → quick moment → slow aftershock)', ao: 'AO5' },
    { id: 'L1-W02-5', label: 'Ending is controlled (echoes opening / reveals meaning)', ao: 'AO5' },
    { id: 'L1-W02-6', label: 'Sentence variety includes 1–2 fragments for impact', ao: 'AO6' },
    { id: 'L1-W02-7', label: 'Punctuation used for effect (colon / dash / semicolon) correctly', ao: 'AO6' },
  ],
  `Top marks come from structure, not complicated plot. A Grade 9 story is usually simple events, expertly told.

AO5: Engage reader; clear structure; turning point; ending with change or consequence.
AO6: Tense controlled; sentence variety for pace; accurate punctuation.`,
  `**0–5 min:** Choose one structure: Door → discovery → consequence; Door → memory → twist; Door → rescue → reveal.

**5–10 min:** Plan 5 beats: Approach → Threshold moment → Discovery → Turning point choice → Aftermath.

**10–40 min:** Write in 5 short scenes.

**40–45 min:** Replace 5 "said/went/got"; add 2 sensory details; add 1 line that echoes the opening.`,
  {
    grade4: `The door was already open. I stopped and looked at it because I was sure I shut it this morning. I pushed it a little and it moved easily.

Inside, my house was quiet. I called out, "Mum?" but nobody answered. I walked into the living room and everything looked normal, but I still felt worried.

I checked upstairs and my room was fine. Then I heard a small noise from the kitchen. My heart went fast and I walked slowly.

It was just the cat knocking over a cup. I laughed a bit because I had been scared for nothing, then I closed the door properly.`,
    grade6: `The door was already open, just slightly, as if someone had changed their mind halfway through leaving. I stood on the step, keys cold in my palm, trying to remember whether I had locked it.

I pushed the door and it swung wider without resistance. The hallway felt wrong—too still, too quiet. I called out, but my voice sounded small and flat, like it didn't belong in my own house.

In the kitchen, a chair was pulled away from the table. Not much, but enough to make my stomach tighten. I moved closer and noticed something else: the back door was open too.

Then a shape shifted behind the curtain. I froze.

A second later, my brother stepped out, grinning. "Relax," he said, "Mum sent me back for my bag." I breathed out, annoyed at myself, and shut the door—this time, carefully.`,
    grade8: `The door was already open. Not wide—just enough to suggest a choice had been made. I stopped, keys hovering near the lock, and listened. Nothing. No TV. No footsteps. Just the faint hum of the fridge somewhere inside.

I pushed the door. It sighed inward.

The house looked ordinary, but the ordinary details felt staged: a mug left on the side, a jacket slung over the banister, a strip of sunlight across the carpet like a warning line. I called out. My words disappeared into the quiet.

Then I noticed the photograph on the hallway table. It had been moved. Turned slightly, facing the door.

Behind me, the open door shifted with the wind and tapped softly against the frame—tap, tap, tap—like someone impatient.

I stepped forward anyway, because sometimes fear isn't loud. Sometimes it's polite. And it lets you walk straight into it.`,
    grade9: `The door was already open—only a fraction, as if the house itself were undecided about letting me in. I stood for a moment on the threshold, the key biting into my fingers, and tried to convince myself there was a simple explanation. There always is, until there isn't.

When I pushed, the door moved too easily. The hallway breathed out a cold, familiar air. Familiar, yet wrong. Silence sat in the corners like dust, undisturbed.

I noticed the small things first. The shoe mat angled slightly, as if someone had stepped in hurriedly. A single drip mark down the wall from a wet umbrella that wasn't there. A mug on the table with a tea-bag string hanging over the rim—unfinished, abandoned. My mind collected these details like evidence, building a story it didn't want to tell.

Upstairs, a floorboard creaked.

I didn't move. My body went still, not brave, just… careful. In that moment I realised what the open door really meant: someone had been here without permission, and the house—my house—had let them.

I took one step forward anyway. Because doors don't just open. People do.`,
  }
);

// Task 3: Describe a place as it changes over time (L1-W03)
const TASK_3: EnglishExaminerPackTask = pack(
  [
    { id: 'L1-W03-1', label: 'I make it clear what the place is and why it matters', ao: 'AO5' },
    { id: 'L1-W03-2', label: 'The change over time is central, not just mentioned', ao: 'AO5' },
    { id: 'L1-W03-3', label: 'I clearly separate time stages (before → during → now)', ao: 'AO5' },
    { id: 'L1-W03-4', label: 'Each paragraph has a purpose (not just length)', ao: 'AO5' },
    { id: 'L1-W03-5', label: 'I include a deliberate structural shift', ao: 'AO5' },
    { id: 'L1-W03-6', label: 'I track one motif changing (sound, colour, smell, objects)', ao: 'AO6' },
    { id: 'L1-W03-7', label: 'I use imagery that reflects time passing', ao: 'AO6' },
    { id: 'L1-W03-8', label: 'Verbs show change (eroded, faded, softened, sharpened)', ao: 'AO6' },
    { id: 'L1-W03-9', label: 'The final paragraph reflects on the change', ao: 'AO5' },
    { id: 'L1-W03-10', label: 'The ending feels controlled, not rushed', ao: 'AO5' },
    { id: 'L1-W03-11', label: 'Sentence lengths vary intentionally', ao: 'AO6' },
    { id: 'L1-W03-12', label: 'I use commas, dashes, or colons correctly; proofread', ao: 'AO6' },
  ],
  `AO5: Track change clearly; use structure to show time passing; choose details that symbolise change; end with reflective/insightful final image. Lower bands describe change; top bands make the place represent something larger (loss, decay, growth, memory).

AO6: Varied sentence structures; tense consistent; punctuation for effect; spell ambitious vocabulary accurately.`,
  `**0–5 min:** Choose one setting; three time points (Past, Middle, Present); one motif.

**5–35 min (4 paragraphs):** 1) Past – vivid, alive. 2) Early change – subtle shift. 3) Present – contrast/loss/transformation. 4) Reflection – what the change means.

**35–45 min:** Replace weak verbs; add 1 structural phrase ("Years later…", "Now…"); sharpen final sentence.`,
  {
    grade4: `The park used to be full of life. Children ran across the grass and people sat on benches talking. The trees were green and the paths were clean. It felt like a happy place where everyone wanted to be.

As time passed, things slowly changed. Fewer people visited the park and some of the paint on the benches started to peel. The grass grew uneven and litter sometimes appeared near the bins. It wasn't as lively as before.

Now the park feels quiet and empty. The swings creak in the wind and the paths are cracked. The trees are still there, but they don't look as bright. It feels like people have forgotten about it.

The park has changed from a busy place to a lonely one.`,
    grade6: `Years ago, the park was always busy. Laughter echoed across the grass and the air smelled fresh, especially in the summer. Benches were painted bright green and the paths were smooth from constant use. It felt welcoming, like a place meant to be shared.

Slowly, the energy faded. Fewer voices filled the space and the paint on the benches began to flake away. Weeds pushed through cracks in the paths and rubbish sometimes gathered near the gate. The park still existed, but it no longer felt important.

Now, the park is mostly silent. The swings sway without anyone pushing them, and the grass is dull and patchy. The benches are cold and chipped, and the only sounds come from the wind moving through the trees.

Time has changed the park quietly, leaving behind a place that remembers being used.`,
    grade8: `The park was once loud with life. Children shouted across the grass, dogs pulled at their leads, and benches were never empty for long. Bright paint reflected sunlight, and the paths were worn smooth by constant movement. It was a place that felt alive because people filled it.

Over time, the noise thinned out. The laughter became occasional instead of constant. Paint began to peel from the benches, and the grass grew longer, untamed. Small signs of neglect crept in quietly, almost unnoticed at first.

Now, silence dominates the space. The swings move only when the wind touches them, and the paths are cracked and uneven. The trees still stand, but their shade feels heavier, more tired. The park exists, but it no longer invites.

Time didn't destroy the park—it simply stopped paying attention to it.`,
    grade9: `Once, the park belonged to people. It echoed with footsteps and laughter, the grass flattened beneath constant movement. Benches gleamed with fresh paint, warm in the sun, and the air carried the mixed smells of cut grass and food wrappers. Everything felt temporary in the best way—always changing, always used.

Then the change began quietly. Voices arrived less often. The paint dulled, chipped by weather and time, and weeds began to claim the edges of the paths. The park wasn't abandoned, just slowly overlooked. Neglect settled in gently, without announcement.

Now, the park feels suspended. Swings creak without purpose, benches sit cold and splintered, and the paths fracture underfoot. Even the trees seem heavier, their shadows darker, stretching across empty ground. The place still stands, but its role has shifted—from centre of activity to reminder of absence.

Time didn't rush this change. It waited, patient, until no one was watching.`,
  }
);

// Task 4: Story where character faces unexpected problem (L1-W04)
const TASK_4: EnglishExaminerPackTask = pack(
  [
    { id: 'L1-W04-1', label: 'The problem arrives unexpectedly', ao: 'AO5' },
    { id: 'L1-W04-2', label: 'The character reacts realistically', ao: 'AO5' },
    { id: 'L1-W04-3', label: 'There is a clear turning point', ao: 'AO5' },
    { id: 'L1-W04-4', label: 'Pace changes at the key moment', ao: 'AO5' },
    { id: 'L1-W04-5', label: 'Ending shows impact or reflection', ao: 'AO5' },
    { id: 'L1-W04-6', label: 'Short sentences used for tension', ao: 'AO6' },
  ],
  `AO5: Simple but effective plot; show character through reaction, not explanation; clear turning point; end with change or consequence.

AO6: Tense controlled; sentence variety for pace; accurate punctuation.`,
  `Choose one problem only (e.g. lost phone, missed train, injury, locked out, sudden realisation).

**Story shape:** 1) Normal situation. 2) Problem appears. 3) Immediate reaction. 4) Decision/action. 5) Aftermath.`,
  {
    grade4: `I was walking home from school when the problem happened. I reached into my pocket and realised my phone wasn't there. At first I thought I had dropped it, so I turned around quickly.

I walked back along the road, looking at the ground. People passed me and I felt nervous. My phone had everything on it and I didn't know what to do.

After a few minutes, I saw it near the bus stop. Someone had placed it on the bench. I felt relieved and picked it up straight away.

I walked home carefully after that, checking my pockets again and again.`,
    grade6: `Everything was normal until I reached the corner near my house. I reached into my pocket to check the time, and my phone was gone. My stomach tightened instantly.

I retraced my steps, scanning the pavement as I walked. Cars passed and people moved around me, but I felt alone. My phone wasn't just a phone—it held messages, photos, reminders of everything important.

Just as panic began to settle, I spotted it resting on a bench near the bus stop. Someone must have found it and left it there. Relief rushed through me, leaving me embarrassed at how quickly I had panicked.

I put the phone safely away and continued home, more aware than before.`,
    grade8: `The problem arrived without warning. One moment I was scrolling through messages as I walked; the next, my pocket was empty. I stopped abruptly, heart racing, and checked again—slowly this time. Nothing.

The street suddenly felt louder. Every passing car sounded impatient, every stranger suspicious. I turned back, eyes fixed on the pavement, replaying the last ten minutes in my head. Had it fallen? Had someone picked it up?

Near the bus stop, I saw it. My phone lay face down on the bench, exactly where I must have left it. Relief hit first, followed closely by frustration at myself.

As I picked it up, I realised how easily things can slip away when you stop paying attention—even for a moment.`,
    grade9: `The problem didn't announce itself. It crept in quietly, unnoticed, until it was impossible to ignore. I reached into my pocket out of habit—and found nothing.

I stopped walking. Around me, the street continued as if nothing had changed. Cars moved, people talked, life carried on. But inside my head, everything stalled. My phone was gone. With it went messages I hadn't replied to, photos I hadn't backed up, pieces of my routine I relied on without thinking.

I turned back, scanning the ground, my mind replaying the journey like faulty footage. Each step felt heavier than the last. Panic hovered just beneath the surface, waiting.

Then I saw it—resting on a bench, face down, unharmed. Relief flooded through me so suddenly it almost hurt. I picked it up carefully, as if it might disappear again.

Walking home, I didn't check my screen. I didn't need to. The problem had passed, but it had left something behind: the uncomfortable realisation of how fragile normal can be.`,
  }
);

// Task 5: Describe a time when everything felt silent (L1-W05)
const TASK_5: EnglishExaminerPackTask = pack(
  [
    { id: 'L1-W05-1', label: 'Silence described creatively (metaphor/personification)', ao: 'AO5' },
    { id: 'L1-W05-2', label: 'Mood is clear and sustained', ao: 'AO5' },
    { id: 'L1-W05-3', label: 'Emotional impact is implied, not explained', ao: 'AO5' },
    { id: 'L1-W05-4', label: 'Opening establishes silence immediately', ao: 'AO5' },
    { id: 'L1-W05-5', label: 'Paragraphs slow the pace deliberately', ao: 'AO5' },
    { id: 'L1-W05-6', label: 'One clear shift (sound remembered / silence broken / deepens)', ao: 'AO5' },
    { id: 'L1-W05-7', label: 'Verbs show stillness or restraint', ao: 'AO6' },
    { id: 'L1-W05-8', label: 'Sensory detail beyond sound (touch, light, air)', ao: 'AO6' },
    { id: 'L1-W05-9', label: 'Imagery fits the mood (no random similes)', ao: 'AO6' },
    { id: 'L1-W05-10', label: 'Ending reflects on silence; final line deliberate', ao: 'AO5' },
    { id: 'L1-W05-11', label: 'Sentence lengths vary for effect', ao: 'AO6' },
    { id: 'L1-W05-12', label: 'At least one advanced punctuation; spelling checked', ao: 'AO6' },
  ],
  `AO5: Treat silence as a presence, not just "no sound"; controlled pacing; shape paragraphs to build intensity or reflection; end with meaningful insight. Weak: listing "no noise", repeating "silent", no emotional significance.

AO6: Confident sentence length control; accurate punctuation for rhythm; ambitious but controlled vocabulary.`,
  `**0–5 min:** Choose why it is silent (fear, shock, calm, grief, anticipation); where (room, street, hospital, field, exam hall); one sound that is missing.

**5–35 min (4 paragraphs):** 1) Immediate silence (drop reader in). 2) Physical details (what silence feels like). 3) Emotional response/memory. 4) Reflection or subtle change.

**35–45 min:** Remove filler words; replace 5 weak verbs; tighten final sentence.`,
  {
    grade4: `Everything felt silent when I woke up early one morning. The house was quiet and no one else was awake. I could not hear the TV or people talking.

The rooms felt bigger than usual. I walked downstairs slowly and the floorboards creaked under my feet. Even small sounds seemed loud because everything else was so quiet.

Outside, the street was empty. There were no cars and no people walking past. The air felt cold and still.

It was a strange silence that made me feel calm but also a little uncomfortable.`,
    grade6: `The silence arrived suddenly, filling the room as soon as I opened my eyes. There was no sound of voices or movement, just a quiet that felt heavier than usual.

The house seemed different in the silence. Every small noise stood out—the creak of the stairs, the soft hum of the fridge. Even my breathing sounded too loud, as if it didn't belong.

Outside, the street was empty. No cars passed and no doors opened. The world felt paused, like everything was waiting for something to happen.

The silence didn't last long, but while it did, it made everything feel unfamiliar.`,
    grade8: `Silence settled in the room before I did. It pressed against the walls, thick and unfamiliar, making the space feel larger and emptier than it should have been. Nothing moved. Nothing spoke.

I noticed details I would usually ignore: the faint glow of light through the curtains, the slow rise and fall of my own breathing. Each sound I made felt intrusive, like I was disturbing something fragile.

Outside, the world matched the stillness. The street lay empty, stripped of its usual noise. No engines, no footsteps—only the quiet stretching on.

In that moment, the silence felt powerful. It demanded attention, forcing me to sit with my thoughts instead of escaping them.`,
    grade9: `Silence didn't arrive suddenly—it was already there, waiting. It filled the space so completely that it felt deliberate, as though the world had agreed to stop at the same moment. No voices. No movement. Just stillness.

The room felt altered by it. Light slipped quietly through the curtains, settling on furniture that suddenly seemed unfamiliar. Even my breathing felt out of place, too sharp against the quiet. I became aware of myself in a way that noise usually prevents.

Outside, the silence continued. The street lay empty, stripped of its usual rhythm. Without sound, time felt stretched, fragile, as if it could break if disturbed.

When noise eventually returned, it felt intrusive. The silence had said something important, and breaking it felt like an interruption.`,
  }
);

// Task 6: Speech for/against school uniforms (L2-W01)
const TASK_6: EnglishExaminerPackTask = pack(
  [
    { id: 'L2-W01-1', label: 'Clear stance in opening paragraph', ao: 'AO5' },
    { id: 'L2-W01-2', label: 'Direct address ("we", "you")', ao: 'AO5' },
    { id: 'L2-W01-3', label: 'Tone suits a speech (not an essay)', ao: 'AO5' },
    { id: 'L2-W01-4', label: 'Rhetorical questions used deliberately', ao: 'AO5' },
    { id: 'L2-W01-5', label: 'Emotive language where appropriate', ao: 'AO5' },
    { id: 'L2-W01-6', label: 'Counter-argument acknowledged and challenged', ao: 'AO5' },
    { id: 'L2-W01-7', label: 'Clear opening, development, conclusion', ao: 'AO5' },
    { id: 'L2-W01-8', label: 'One paragraph per main argument', ao: 'AO5' },
    { id: 'L2-W01-9', label: 'Ending reinforces viewpoint', ao: 'AO5' },
    { id: 'L2-W01-10', label: 'Sentence variety; accurate commas and full stops', ao: 'AO6' },
    { id: 'L2-W01-11', label: 'Ambitious but appropriate vocabulary', ao: 'AO6' },
  ],
  `AO5 (24 marks): Establish clear viewpoint immediately; address audience directly; use persuasive techniques naturally; build argument logically; strong, memorable conclusion.

AO6 (16 marks): Controlled formal tone; varied sentence structures; accurate punctuation (especially for rhetoric).`,
  `**0–5 min:** Decide stance; choose 3 arguments; prepare 1 counter-argument.

**5–35 min:** Opening (stance + hook) → Argument 1 → Argument 2 → Counter-argument → Conclusion (call to action).

**35–45 min:** Add rhetorical questions; strengthen verbs; tighten conclusion.`,
  {
    grade4: `I believe school uniforms are a good idea. They make everyone look the same and stop people being judged on clothes.

Uniforms also make it easier to get ready for school in the morning. Students do not have to worry about what to wear.

Some people say uniforms stop students expressing themselves, but I think school is for learning, not fashion.

In conclusion, school uniforms help students focus and feel equal.`,
    grade6: `I believe school uniforms should be worn by all students. Uniforms help create equality and prevent students from being judged by what they wear.

When everyone wears the same clothes, there is less pressure to keep up with fashion trends. This allows students to focus on learning instead of appearance.

Some people argue that uniforms limit individuality. However, students can still express themselves through their personality, behaviour and achievements.

Overall, school uniforms support a positive learning environment and should remain part of school life.`,
    grade8: `Good morning everyone. Today, I want to explain why school uniforms are beneficial for students and schools alike. Uniforms are not about control—they are about fairness.

By wearing the same clothes, students are less likely to feel judged or excluded. Uniforms reduce pressure to follow expensive trends, allowing students to focus on what really matters: education.

While some argue that uniforms restrict individuality, this ignores the fact that self-expression comes from actions, ideas and achievements—not clothing. Schools are places of learning, not fashion shows.

For these reasons, school uniforms create a more focused, inclusive environment and should be valued.`,
    grade9: `Good morning. Today, I want to challenge the idea that school uniforms limit students—and instead suggest that they support them.

Uniforms remove a silent but powerful pressure. When clothing is no longer a competition, students are free to focus on learning rather than appearance. No one is judged for wearing the wrong brand or the same outfit twice. Equality becomes visible.

Critics argue that uniforms restrict individuality. However, true individuality is shown through ideas, effort and character—not fabric. A uniform does not silence a student's voice; it simply removes distractions.

If we want schools to be places of focus, fairness and opportunity, then uniforms are not the problem. They are part of the solution.`,
  }
);

// Task 7: Article on protecting the environment (L2-W02)
const TASK_7: EnglishExaminerPackTask = pack(
  [
    { id: 'L2-W02-1', label: 'Opening engages a general online audience', ao: 'AO5' },
    { id: 'L2-W02-2', label: 'Tone is informative, not aggressive', ao: 'AO5' },
    { id: 'L2-W02-3', label: 'I explain why protecting the environment matters', ao: 'AO5' },
    { id: 'L2-W02-4', label: 'At least one example or consequence', ao: 'AO5' },
    { id: 'L2-W02-5', label: 'Link environmental damage to real-world impact', ao: 'AO5' },
    { id: 'L2-W02-6', label: 'Clear introduction, development, conclusion', ao: 'AO5' },
    { id: 'L2-W02-7', label: 'Ending encourages action or reflection', ao: 'AO5' },
    { id: 'L2-W02-8', label: 'Ambitious but accessible vocabulary', ao: 'AO6' },
    { id: 'L2-W02-9', label: 'Sentence variety; accurate punctuation', ao: 'AO6' },
    { id: 'L2-W02-10', label: 'Careful spelling of key terms', ao: 'AO6' },
  ],
  `AO5: Clear viewpoint from the start; engaging, informative tone; balance facts, explanation, opinion; logical progression; strong call to action. Weaker: sound like speeches/essays; list facts without relevance; lack clear ending.

AO6: Confident sentence variety; accurate spelling of topic vocabulary; controlled punctuation (commas, colons).`,
  `**0–5 min:** Choose one clear viewpoint; pick 3 key points (e.g. climate, wildlife, future generations); decide what you want the reader to do.

**5–35 min:** Hook + overview → Problem explained → Consequences if ignored → Why action matters now → Call to action.

**35–45 min:** Remove repetition; sharpen verbs; strengthen final paragraph.`,
  {
    grade4: `Protecting the environment is important for everyone. The environment gives us clean air, water and food, so we need to look after it.

Pollution and litter damage nature and harm animals. When rubbish is left on the ground, it can end up in rivers and oceans. This causes problems for wildlife and makes places look unpleasant.

If we do not protect the environment, future generations will suffer. There will be fewer animals and more pollution.

Everyone should try to recycle, save energy and keep their area clean so the environment can be protected.`,
    grade6: `Protecting the environment is one of the most important issues facing the world today. Our planet provides everything we need to survive, yet human activity continues to damage it.

Pollution, deforestation and climate change all have serious consequences. Animals lose their habitats, air quality worsens and extreme weather becomes more common. These problems do not just affect nature — they affect people too.

If action is not taken now, future generations will face a world with fewer resources and more danger. Small actions, such as recycling and reducing energy use, can make a difference.

Protecting the environment is not just a choice; it is a responsibility we all share.`,
    grade8: `Protecting the environment has become urgent rather than optional. The natural world supports human life, yet it is increasingly damaged by pollution, waste and climate change.

The consequences of environmental neglect are already visible. Wildlife habitats are destroyed, oceans fill with plastic, and extreme weather events are becoming more frequent. These issues do not remain distant — they affect food supplies, health and living conditions.

Action matters because damage to the environment is often irreversible. Once ecosystems collapse, they cannot simply be rebuilt. Individual choices, combined with government action, can slow this damage and protect what remains.

If the environment is not protected now, the cost will be paid later. The responsibility lies with everyone.`,
    grade9: `Protecting the environment is no longer a distant concern; it is a pressing responsibility. The natural world supports every aspect of human life, yet it continues to be treated as expendable.

Environmental damage has consequences that extend far beyond nature itself. Rising sea levels threaten communities, pollution damages health, and the destruction of habitats pushes species towards extinction. These are not future problems — they are happening now.

What makes this issue so serious is its permanence. Once ecosystems are destroyed, recovery is slow or impossible. Every delay increases the damage, leaving fewer options for the future.

Protecting the environment requires both individual responsibility and collective action. If change does not happen now, the cost will not be paid by those causing the damage, but by those who inherit its effects.`,
  }
);

// Task 8: Letter to council (L2-W03)
const TASK_8: EnglishExaminerPackTask = pack(
  [
    { id: 'L2-W03-1', label: 'Formal opening and closing', ao: 'AO5' },
    { id: 'L2-W03-2', label: 'Polite but firm tone', ao: 'AO5' },
    { id: 'L2-W03-3', label: 'Problem clearly explained', ao: 'AO5' },
    { id: 'L2-W03-4', label: 'Impact on residents described', ao: 'AO5' },
    { id: 'L2-W03-5', label: 'Specific examples included', ao: 'AO5' },
    { id: 'L2-W03-6', label: 'Practical solution suggested', ao: 'AO5' },
    { id: 'L2-W03-7', label: 'Introduction states purpose; ending requests action', ao: 'AO5' },
    { id: 'L2-W03-8', label: 'Accurate spelling; correct commas and full stops', ao: 'AO6' },
    { id: 'L2-W03-9', label: 'No slang or contractions', ao: 'AO6' },
  ],
  `AO5: Formal, polite tone; clearly explain the issue; support with examples; suggest realistic solutions; end appropriately and professionally. Common mistakes: informal tone; aggressive language; no clear request.

AO6: Accurate paragraphing; correct sentence punctuation; formal vocabulary used correctly.`,
  `**0–5 min:** Decide the problem (litter, noise, lighting, transport); choose 2 effects on residents; suggest 1–2 realistic solutions.

**5–35 min:** Formal opening + purpose → Description of problem → Impact on community → Suggested solution → Formal closing.

**35–45 min:** Remove informal language; tighten sentences; improve closing paragraph.`,
  {
    grade4: `Dear Sir or Madam,

I am writing to complain about the litter problem in my area. There is rubbish on the streets and it is not being cleaned properly.

The litter makes the area look untidy and can be dangerous. It also attracts animals and smells bad.

I think more bins should be added and the streets should be cleaned more often.

Yours faithfully,
A Resident`,
    grade6: `Dear Sir or Madam,

I am writing to express my concern about the increasing amount of litter in my local area. Over recent months, rubbish has been left on pavements and in public spaces.

This issue affects residents by making the area look neglected and creating health risks. It also discourages people from using shared spaces.

I suggest installing additional bins and arranging more regular cleaning. This would improve the area for everyone.

Yours faithfully,
A Concerned Resident`,
    grade8: `Dear Sir or Madam,

I am writing to raise concerns regarding the ongoing problem of litter in my neighbourhood. Despite previous clean-up efforts, the issue continues to worsen.

Litter not only damages the appearance of the area but also poses health risks and harms wildlife. Many residents feel frustrated by the lack of lasting improvement.

I would recommend increasing the number of waste bins and improving waste collection schedules. These measures would help address the problem more effectively.

I look forward to your response.

Yours faithfully,
A Local Resident`,
    grade9: `Dear Sir or Madam,

I am writing to formally raise concerns about the persistent litter problem in my local area. Despite previous reports, the issue remains unresolved and continues to affect residents.

Public spaces are frequently left covered in rubbish, which damages the appearance of the neighbourhood and presents health and environmental risks. This has led to growing frustration among residents who take pride in their community.

To address this issue, I suggest increasing the number of waste bins and implementing more regular street cleaning. Clear signage encouraging responsible behaviour may also be effective.

I trust that the council will consider these concerns seriously and take appropriate action.

Yours faithfully,
A Local Resident`,
  }
);

// Task 9: Leaflet on online safety (L2-W04)
const TASK_9: EnglishExaminerPackTask = pack(
  [
    { id: 'L2-W04-1', label: 'Clear leaflet structure (headings/subheadings)', ao: 'AO5' },
    { id: 'L2-W04-2', label: 'Tone is friendly but serious', ao: 'AO5' },
    { id: 'L2-W04-3', label: 'Advice written directly to teenagers', ao: 'AO5' },
    { id: 'L2-W04-4', label: 'Covers at least 3 online risks', ao: 'AO5' },
    { id: 'L2-W04-5', label: 'Specific advice for each risk', ao: 'AO5' },
    { id: 'L2-W04-6', label: 'Explains why advice matters', ao: 'AO5' },
    { id: 'L2-W04-7', label: 'Clear introduction; ending reassures and empowers', ao: 'AO5' },
    { id: 'L2-W04-8', label: 'Clear, concise sentences', ao: 'AO6' },
    { id: 'L2-W04-9', label: 'Technical terms explained simply', ao: 'AO6' },
    { id: 'L2-W04-10', label: 'Accurate punctuation and spelling', ao: 'AO6' },
  ],
  `AO5: Clear, accessible tone; well-organised with headings/sections; direct, practical advice; tailored to teenage readers; balance warning with reassurance. Weaker: read like articles/speeches; vague advice; lack structure or headings.

AO6: Short, controlled sentences; accurate spelling of technical vocabulary; correct punctuation.`,
  `**0–5 min:** Identify audience (teenagers); choose 3 key risks (personal information, online strangers, cyberbullying/scams); decide clear headings.

**5–35 min:** Introduction (why online safety matters) → Risk 1 + advice → Risk 2 + advice → Risk 3 + advice → Reassuring conclusion.

**35–45 min:** Shorten long sentences; add bullet points if appropriate; check tone (helpful, not scary).`,
  {
    grade4: `**Staying Safe Online**

The internet is useful, but it can also be dangerous if you are not careful. Teenagers use the internet every day, so it is important to know how to stay safe.

**Personal Information**
Do not share personal details like your address or phone number online. This information can be used by strangers.

**Talking to People Online**
You should be careful when talking to people you do not know. Some people pretend to be someone else.

**Cyberbullying**
If someone sends hurtful messages, tell a trusted adult and block them.

Staying safe online helps you enjoy the internet without problems.`,
    grade6: `**Online Safety for Teenagers**

The internet is a big part of teenage life, but it is important to use it safely. Being aware of online risks can help prevent problems.

**Protect Your Personal Information**
Never share details such as your full name, address or school online. This information can be misused.

**Be Careful Who You Trust**
Not everyone online is honest about who they are. Avoid meeting people you only know online.

**Dealing with Cyberbullying**
If you experience cyberbullying, do not respond. Save evidence and report it to an adult or the website.

By following these steps, teenagers can stay safer while using the internet.`,
    grade8: `**Staying Safe Online: A Guide for Teenagers**

Using the internet is part of everyday life, but it also brings risks. Understanding these risks helps teenagers stay in control online.

**Think Before You Share**
Sharing personal information can make you vulnerable. Keep details like your location, school and passwords private to protect yourself.

**Online Strangers**
Some people online may not be who they claim to be. Avoid sharing personal information and never agree to meet someone without adult permission.

**Cyberbullying and Scams**
Cyberbullying can be upsetting and harmful. Block and report abusive users, and talk to someone you trust. Be cautious of messages asking for money or personal details.

Staying safe online is about making smart choices and knowing when to ask for help.`,
    grade9: `**Online Safety: Protecting Yourself in a Digital World**

The internet offers opportunities for learning and connection, but it also exposes teenagers to serious risks. Understanding how to stay safe online is essential.

**Protect Your Personal Information**
Personal details such as your address, school and passwords should never be shared online. Once information is shared, it can be difficult to control where it ends up.

**Be Cautious with Online Contacts**
Not everyone online is trustworthy. Some individuals create false identities to gain trust. Avoid private conversations with strangers and never agree to meet without adult involvement.

**Recognising and Responding to Online Harm**
Cyberbullying and scams are increasingly common. If you receive threatening or suspicious messages, do not respond. Block the user, report the behaviour and seek support from a trusted adult.

Staying safe online does not mean avoiding the internet — it means using it wisely, confidently and responsibly.`,
  }
);

// Task 10: Report on improving school facilities (L2-W05)
const TASK_10: EnglishExaminerPackTask = pack(
  [
    { id: 'L2-W05-1', label: 'Clear report structure; subheadings used appropriately', ao: 'AO5' },
    { id: 'L2-W05-2', label: 'Objective tone throughout', ao: 'AO5' },
    { id: 'L2-W05-3', label: 'Current issues explained clearly', ao: 'AO5' },
    { id: 'L2-W05-4', label: 'Impact on students described', ao: 'AO5' },
    { id: 'L2-W05-5', label: 'Suggestions are realistic and specific', ao: 'AO5' },
    { id: 'L2-W05-6', label: 'Introduction outlines purpose; conclusion summarises', ao: 'AO5' },
    { id: 'L2-W05-7', label: 'Accurate punctuation; no informal language', ao: 'AO6' },
    { id: 'L2-W05-8', label: 'Correct spelling', ao: 'AO6' },
  ],
  `AO5: Formal, objective tone; clearly structured with subheadings; present problems clearly; offer realistic, evidence-based solutions; avoid emotional language.

AO6: Accurate grammar and punctuation; formal vocabulary; clear paragraphing.`,
  `**0–5 min:** Identify 2–3 facilities issues (canteen, toilets, classrooms, outdoor space); note how each affects students; suggest realistic improvements.

**5–35 min:** Introduction (purpose) → Issue 1 + impact → Issue 2 + impact → Recommendations → Conclusion.

**35–45 min:** Remove opinionated language; tighten explanations; improve clarity of recommendations.`,
  {
    grade4: `**Report on School Facilities**

This report looks at ways to improve school facilities.

Some classrooms have broken equipment and old furniture. This makes lessons harder for students.

The toilets are not always clean and need to be checked more often.

The school could fix broken equipment and clean the toilets more regularly to improve facilities.`,
    grade6: `**Report on Improving School Facilities**

This report outlines areas where school facilities could be improved.

Some classrooms have outdated equipment, which affects learning. Students struggle to see boards or use computers properly.

In addition, the toilets are often overcrowded and not cleaned frequently enough.

Improvements could include repairing classroom equipment and increasing cleaning schedules. These changes would benefit students.`,
    grade8: `**Report on Improving School Facilities**

**Introduction**
This report examines current issues with school facilities and suggests possible improvements.

**Classroom Equipment**
Several classrooms have outdated or damaged equipment. This can disrupt lessons and reduce learning effectiveness.

**Toilet Facilities**
Toilets are frequently overcrowded and require more regular cleaning.

**Recommendations**
Repairing classroom equipment and improving cleaning schedules would improve the learning environment.

**Conclusion**
Improving facilities would support both student wellbeing and academic progress.`,
    grade9: `**Report on Improving School Facilities**

**Introduction**
This report has been written to assess current school facilities and recommend improvements that would benefit students and staff.

**Classroom Resources**
Some classrooms contain outdated or damaged equipment, which can disrupt lessons and reduce engagement. Updating these resources would improve teaching efficiency and student focus.

**Sanitation Facilities**
Toilet facilities are often overcrowded and require more frequent maintenance. This can negatively affect student comfort and hygiene.

**Recommendations**
It is recommended that classroom equipment is repaired or replaced and that cleaning schedules are reviewed to ensure facilities meet students' needs.

**Conclusion**
Addressing these issues would significantly improve the school environment and support learning.`,
  }
);

const EXAMINER_PACK_BY_TASK_ID: Record<string, EnglishExaminerPackTask> = {
  'L1-W01': TASK_1,
  'L1-W02': TASK_2,
  'L1-W03': TASK_3,
  'L1-W04': TASK_4,
  'L1-W05': TASK_5,
  'L2-W01': TASK_6,
  'L2-W02': TASK_7,
  'L2-W03': TASK_8,
  'L2-W04': TASK_9,
  'L2-W05': TASK_10,
};

export function getExaminerPackForTask(taskId: string): EnglishExaminerPackTask | undefined {
  return EXAMINER_PACK_BY_TASK_ID[taskId];
}

export { EXAMINER_PACK_BY_TASK_ID };
