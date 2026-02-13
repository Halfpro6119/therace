# Fully Autonomous Grade 9 — Design & Functional Plan

**Date:** 13 February 2025  
**Purpose:** A complete design and functional blueprint for making each GCSE subject **fully autonomous** — students use only this app to achieve Grade 9 across the board.  
**Scope:** All subjects in `gcseScope.ts`.  
**Focus:** How questions are presented, what diagrams are needed, and what features/functions are required. **Creative and ambitious.**  
**Content alignment:** This plan incorporates all quantified content targets from `FULLY_AUTONOMOUS_GRADE_9_CONTENT_PLAN.md`.

---

## 1. Executive Summary (Content + Design)

| Subject | Exam Board | Spec | Current State | Target for Grade 9 |
|--------|------------|------|---------------|--------------------|
| **Maths** | Edexcel | 1MA1 | Ultra sufficient | Maintain; add Further Maths & Statistics |
| **Biology** | AQA | 8461 | Ultra sufficient | Maintain; add stretch content |
| **Chemistry** | AQA | 8462 | Ultra sufficient | Maintain; add stretch content |
| **Physics** | AQA | 8463 | Ultra sufficient | Maintain; add stretch content |
| **Combined Science** | AQA | 8464/8465 | Partial | Add 6-paper flow + combined-specific content |
| **English Language** | AQA | 8700 | Ultra sufficient | Maintain |
| **English Literature** | AQA | 8702 | Ultra sufficient | Add more poetry + optional texts |
| **History** | AQA | 8145 | Ultra sufficient | Maintain |
| **Geography** | AQA | 8035 | Adequate | Major expansion |
| **Religious Studies** | AQA | 8062 | Adequate | Major expansion |
| **Business Studies** | AQA / Edexcel | 8132 / 1BS0 | Adequate | Major expansion |
| **Psychology** | AQA | 8182 (GCSE) | ⚠️ Mismatch | Align to GCSE 8182; expand content |
| **Health & Social Care** | Edexcel | 2HS01/2HS02 | Adequate | Expand Units 3–4 |
| **Computer Science** | AQA / OCR | 8525 / J277 | Adequate | Align spec; expand per unit |
| **French** | AQA | 8658 | None | Full build |
| **Spanish** | AQA | 8698 | None | Full build |
| **Further Maths** | Edexcel | — | None | Full build or remove |
| **Statistics** | AQA / Edexcel | — | None | Full build or remove |
| **Vocab Lab** | — | — | Partial | Complete all modes |

---

## 2. Exam Board Landscape & Spec Alignment

| Subject | Primary Spec | Alternative | Recommendation |
|---------|--------------|-------------|-----------------|
| Maths | Edexcel 1MA1 | AQA 8300 | Keep Edexcel (current) |
| Sciences | AQA 8461/62/63 | Edexcel, OCR | Keep AQA |
| English | AQA 8700/8702 | Edexcel, OCR | Keep AQA |
| History | AQA 8145 | Edexcel, OCR | Keep AQA |
| Geography | AQA 8035 | Edexcel A, OCR B | Keep AQA |
| Religious Studies | AQA 8062 | Edexcel, OCR | Keep AQA |
| Business | AQA 8132 | Edexcel 1BS0 | Align to AQA; or support both |
| Psychology | AQA 8182 (GCSE) | — | **Align to GCSE 8182** (audit says A-level 7182 — fix) |
| Health | Edexcel 2HS01/02 | WJEC | Keep Edexcel |
| Computer Science | AQA 8525 | OCR J277 | Align to AQA 8525 (new spec 2025); reconcile gcseScope |
| French / Spanish | AQA 8658/8698 | Edexcel, OCR | AQA (new MFL spec 2025) |

### Grade 9 Content Principles (Ofqual / Exam Boards)

Grade 9 requires: comprehensive knowledge across full specification; sustained, coherent argument and evaluation; application to unfamiliar contexts; precise use of specialist terminology; synthesis across topics; nuanced analysis (not just description).

Content must therefore include: full spec coverage (no gaps); stretch/extension material beyond grade 5; model answers at Grade 8/9 level; unfamiliar-context practice; evaluation and "to what extent" practice; common misconceptions explicitly addressed.

---

## 3. Design Philosophy: The Grade 9 Student Journey

A Grade 9 student needs:
1. **Zero ambiguity** — Clear, exam-style presentation from day one
2. **Progressive scaffolding** — From recall → application → evaluation → synthesis
3. **Rich feedback** — Not just right/wrong, but *why* and *how to improve*
4. **Visual literacy** — Diagrams, graphs, and visuals that mirror real exams
5. **Personalisation** — Content adapts to their options, gaps, and pace
6. **Exam simulation** — Timed papers, calculator rules, mark schemes, examiner thinking

---

## 3A. Dual Coding & High-Impact Learning Methods — Making This the Greatest Education App

*Evidence-based pedagogy from cognitive science, applied systematically across every subject.*

### Dual Coding: Words + Images, Never Either Alone

**Principle:** The brain processes verbal and visual information in separate channels. When both channels are used together — and they *reinforce* rather than *duplicate* — retention and transfer improve dramatically (Paivio, Mayer, Clark & Paivino).

**Implementation across the app:**

| Rule | Application |
|------|-------------|
| **Every concept gets a visual** | No "text-only" concept cards. Every core idea has: (a) verbal explanation, (b) diagram/schematic/image that shows the *structure* or *process*, (c) optional animation for change-over-time (e.g. reaction, cycle). |
| **Visuals add information** | Don't just illustrate the text — the diagram should show relationships, flow, or hierarchy that words alone can't. E.g. "Diffusion" + diagram of concentration gradient with arrows; "Trinity" + three interlocking circles showing distinct-yet-one. |
| **Synchronised presentation** | Audio + visual together (e.g. narration of diagram labels); or text + diagram side-by-side; never sequential "read then see" when both are needed. |
| **Student-generated dual coding** | "Draw your own" mode: after learning, student sketches or annotates a diagram; compare to model. "Explain this diagram in words" — reverse dual coding. |
| **Icon + label** | Every key term has a consistent icon/symbol; when the term appears in text, the icon appears in the margin. Builds recognition across channels. |

**Subject-specific dual-coding examples:**

- **Maths:** Formula + geometric interpretation (e.g. completing the square → visual of square + rectangle); graph + "what does this point mean in words?"
- **Science:** Process (e.g. photosynthesis) → diagram with stages + one-sentence caption per stage; equation + particle diagram
- **History:** Timeline + "in one sentence, what happened here?"; causation diagram (arrows) + written explanation
- **English:** Structure diagram (opening, rising action, climax) + extract with highlighted sections; AO2 language + colour-coded annotations
- **Geography:** Map + data overlay; process diagram (longshore drift) + before/after photos
- **RS:** Belief web (central belief, branches) + scripture quote; argument map (premises → conclusion) + written evaluation

---

### High-Impact Learning Methods (Dunlosky et al., 2013 + Beyond)

| Method | What It Is | How We Implement It |
|--------|------------|----------------------|
| **Retrieval practice** | Recalling information strengthens memory more than re-reading | Every concept: "Cover and recall" before "Reveal"; quiz before unlock; "What do you remember?" before new content. |
| **Spaced repetition** | Revisiting at increasing intervals | Algorithm: 1 day → 3 days → 1 week → 2 weeks; "You last saw this 12 days ago — ready to test?" |
| **Elaborative interrogation** | "Why does X work?" | After every correct answer: "Why is that right?" (optional); "Explain to a Year 8" prompt. |
| **Self-explanation** | Explaining steps while solving | "As you work, say what you're doing" (voice or text); "What's your next step and why?" |
| **Interleaving** | Mix topics instead of blocking | Topic drill: 30% from current topic, 70% from previous topics; "Mixed mastery" mode. |
| **Concrete examples** | Abstract + multiple varied examples | Every abstract concept: "Example 1: …", "Example 2: …", "Now try: [unfamiliar context]". |
| **Worked examples** | Full solution with commentary | "Watch this solution" — step-by-step with "Why this step?"; fade to completion (first steps given, last steps for student). |
| **Practice testing** | Low-stakes tests | Quick checks, Fix-It drills, "Do you know it?" 1–5 question bursts; no penalty for wrong — just feedback. |
| **Chunking** | Group related items | "These 3 ideas go together"; "Chunk 1" / "Chunk 2" navigation; "You've mastered Chunk 1 — move to Chunk 2?" |
| **Metacognition** | Thinking about thinking | "How confident are you?" before answer; "What made this hard?" after; "What will you do differently next time?" |
| **Feynman technique** | Teach it simply | "Explain [concept] to a friend who hasn't studied it" — free text; compare to model; "Where did you get stuck?" |
| **Varied practice** | Same skill, different contexts | "Apply this to 3 different scenarios"; "Same concept, different question type". |
| **Desirable difficulty** | Hard enough to struggle, not fail | "Stretch" questions; "Just beyond your comfort zone"; "I'm stuck" → hint (not answer) → retry. |

---

### Unique App Features: "Learning Superpowers"

| Feature | Description | Learning Science |
|---------|-------------|------------------|
| **Dual-Code Flip** | Tap to flip: see diagram → "What do you see?" → type; see text → "Draw this" | Dual coding + retrieval |
| **Concept Bridge** | "Link these two concepts" — drag and explain the connection | Elaboration + synthesis |
| **Mistake Museum** | Curated "common wrong answers" with "Why students think this" and "Why it's wrong" | Metacognition + misconception correction |
| **Memory Palace** | For lists (e.g. 5 pillars of Islam): "Place each in a room" — drag to room; recall later | Method of loci + dual coding |
| **Explain Like I'm 11** | After every concept: "Explain this so an 11-year-old would get it" | Feynman technique |
| **Confidence Calibration** | Before answer: "How sure are you?" (1–5); after: "You said 4 — were you right?" | Metacognition |
| **Interleave Roulette** | "Random topic from your weak list" — one question, instant feedback | Interleaving + spaced retrieval |
| **Worked Example Fade** | First 2 steps shown, rest blank; student completes; "What would the next step be?" | Worked examples + completion |
| **Compare & Contrast Matrix** | Two concepts side-by-side; "What's the same? What's different?" — drag statements | Elaboration + discrimination |
| **Schema Builder** | "Build the big picture" — drag concepts into a hierarchy or flow diagram | Chunking + organization |
| **Retrieval Before Relearn** | "Before we show you, what do you remember?" — even if wrong, primes the brain | Retrieval practice |
| **Spaced Review Queue** | "3 items due today" — algorithm-driven; "You're due for [concept] — 2 min?" | Spaced repetition |

---

### Cognitive Load Theory — Keep It Light

| Principle | Application |
|-----------|-------------|
| **Split attention** | Avoid text + diagram separated; integrate (labels on diagram, not floating). |
| **Redundancy** | Don't duplicate: if diagram says it, text doesn't repeat verbatim. |
| **Segmenting** | Complex processes: "Part 1 of 4" — one chunk at a time. |
| **Pre-training** | Teach key terms before complex explanation. |
| **Modality** | Use both visual and auditory when possible (e.g. narration of diagram). |

---

### Emotional & Motivational Design

| Element | Implementation |
|---------|----------------|
| **Growth mindset** | "Mistakes are how we learn"; "You're building your brain"; "This is hard — that's how you know it's working"; never "You got it wrong." |
| **Mastery framing** | "You've mastered 12 of 20 concepts in this topic"; "3 more to go"; progress visible. |
| **Safe failure** | No punishment for wrong answers; "Let's see what went wrong"; "Try again with a hint." |
| **Celebration** | "Streak!", "Personal best!", "You just retrieved something from 2 weeks ago!" |
| **Autonomy** | "What do you want to work on?"; "Choose your path"; "Skip or persist?" |

---

## Cross-Cutting Features (All Subjects)

### 1. **Smart Study Path**
- **Onboarding:** Student selects exam board, tier (where applicable), and option choices (Geography landscapes, History options, RS religions/themes, etc.)
- **Gap analysis:** After first diagnostic, app highlights weak topics and suggests a personalised sequence
- **Adaptive pacing:** "You're strong on X — ready for stretch?" vs "Y needs more practice before moving on"
- **Time-to-exam countdown:** Adjusts recommended daily minutes and prioritises high-weight topics
- **Spaced Review Queue:** "3 items due today" — algorithm-driven retrieval; "You're due for [concept] — 2 min?"
- **Interleave Roulette:** "Random weak topic" — one question, instant feedback; prevents blocking

### 2. **Question Presentation Framework**
- **Consistent layout:** Question number, marks, command word highlighted, stimulus (text/diagram) above the line, answer space below
- **Dual coding built-in:** Every question with a diagram: text + image side-by-side; labels on diagram, not floating
- **Mark allocation visible:** "4 marks" shown so students learn to write enough
- **Command word glossary:** Hover/tap on "Evaluate", "Assess", "Describe" → quick definition + example
- **Stimulus-first:** For reading/extract questions, stimulus is always visible; answer area scrolls independently
- **Retrieval before reveal:** "Before we show you the answer — what do you remember?" (optional)
- **Accessibility:** Font size toggle, high-contrast mode, text-to-speech for extracts

### 3. **Feedback Architecture**
- **Immediate:** Correct/incorrect with brief reason; **never punitive** — "Let's see what went wrong"
- **Elaborative:** "Why is that right?" / "Why did that go wrong?" — optional deep dive
- **Deferred:** After submission, full mark scheme + model answer (Grade 4/6/8/9) + "What examiners look for"
- **AI examiner mode:** Simulated band-level feedback with specific targets (per `ENGLISH_AI_FEEDBACK_PROMPT_GUIDELINES.md`)
- **Fix-It drill:** Missed questions only, with **spaced re-testing** (algorithm: 1d → 3d → 1w)
- **Mistake Museum:** "Many students choose X because… but the correct approach is…"

### 4. **Progress & Motivation**
- **Mastery per topic:** 0–100% with clear "Ready for exam" threshold (e.g. 80%)
- **Confidence calibration:** "How sure were you?" before answer; "Were you right?" after — builds metacognition
- **XP and streaks:** Consistent across all subjects; "You just retrieved something from 2 weeks ago!"
- **Badges:** "First full paper", "10 in a row", "Evaluation master", "Diagram decoder", "Dual-Code Master", "Retrieval Champion"
- **Growth mindset framing:** "Mistakes are how we learn"; "This is hard — that's how you know it's working"
- **Leaderboards (optional):** Anonymous, by school/cohort if configured

---

## Subject-by-Subject Plan

Each subject below has a **complete, self-contained design plan** including: content targets, question presentation, diagrams, functions, Learning Superpowers integration, and subject-specific creative methods.

### Subject Quick Reference

| § | Subject | Spec | Key Sections |
|---|---------|------|--------------|
| 4 | Maths | Edexcel 1MA1 | 4.1–4.7 |
| 5 | Science Lab (Bio, Chem, Phys) | AQA 8461/62/63 | 5.1–5.7 |
| 6 | Combined Science | AQA 8464/8465 | 6.1–6.6 |
| 7 | English Language | AQA 8700 | 7.1–7.7 |
| 8 | English Literature | AQA 8702 | 8.1–8.7 |
| 9 | History | AQA 8145 | 9.1–9.7 |
| 10 | Geography | AQA 8035 | 10.1–10.7 |
| 11 | Religious Studies | AQA 8062 | 11.1–11.7 |
| 12 | Business | AQA 8132 / Edexcel 1BS0 | 12.1–12.7 |
| 13 | Psychology | AQA 8182 (GCSE) | 13.1–13.7 |
| 14 | Health & Social Care | Edexcel 2HS01/02 | 14.1–14.7 |
| 15 | Computer Science | AQA 8525 | 15.1–15.7 |
| 16 | French & Spanish | AQA 8658/8698 | 16.1–16.7 |
| 17 | Further Maths & Statistics | Edexcel / AQA | 17.1–17.3 |
| 18 | Vocab Lab | Cross-subject | 18.1–18.4 |

---

## 4. Maths (Edexcel 1MA1)

**Spec:** Edexcel 1MA1 | **Papers:** 3 (Non-calc, Calc, Calc) | **Tiers:** Foundation, Higher

### 4.1 Content Targets (from Content Plan)

| Content Type | Current | Target | Gap |
|--------------|---------|--------|-----|
| Golden questions | 345 | 345 | 0 |
| Full paper quizzes | ✅ | ✅ | 0 |
| Topic drills | ✅ | ✅ | 0 |
| Further Maths | 0 | Full spec | Full build |
| Statistics | 0 | Full spec | Full build |

**Grade 9 focus:** Problem-solving, multi-step reasoning, unfamiliar contexts. Current content sufficient if question bank includes stretch items.

### 4.2 Question Presentation

| Question Type | Presentation | Features |
|---------------|--------------|----------|
| **Short answer (1–3 marks)** | Clean white space, question number + marks top-right, diagram (if any) centred | Inline answer box; instant check or "Submit batch" |
| **Multi-step (4–6 marks)** | Split into sub-parts (a), (b), (c) with marks per part | Show working space; optional "Show next part" to avoid overwhelm |
| **Full paper** | Exam-style: 80 questions (Higher) or 30–40 (Foundation), calculator toggle per paper | Timer, calculator lock for Paper 1, "Pause" saves state |
| **Topic drill** | 5–15 questions from one topic, mixed difficulty | "I'm stuck" → hint (not answer); "Skip" → goes to Fix-It |

**Creative additions:**
- **"Examiner's eye" mode:** After submitting, overlay shows where marks would be awarded (green ticks) and where they were lost (red crosses) with brief notes
- **Working-out capture:** Optional photo/upload of handwritten working for AI feedback (future)
- **Common error trap:** After wrong answer, show "Many students choose X because… but the correct approach is…"

**Dual coding & learning methods:**
- **Formula + geometric interpretation:** Every formula paired with a diagram (e.g. completing the square → visual of square + rectangle; quadratic graph → "What does this point mean in words?")
- **Worked example fade:** First 2 steps shown, student completes rest; "What would the next step be?"
- **Dual-Code Flip:** See diagram → "What do you see?" → type; see equation → "Sketch this" (graph/shape)
- **Interleaving:** Topic drill = 30% current topic, 70% from previous; "Mixed mastery" mode
- **Retrieval before relearn:** "Before we show you the method — what do you remember?"

### 4.3 Diagrams Required

| Diagram Type | Use Case | Status / Gap |
|--------------|----------|--------------|
| Triangles (sine, cosine, basic, isosceles, right) | Trigonometry | ✅ Exists |
| Circle theorems, angle in semicircle | Geometry | ✅ Exists |
| Bearings, vectors | Vectors, bearings | ✅ Exists |
| Number line, axes, graphs (linear, quadratic) | Algebra, graphs | ✅ Exists |
| Histogram, bar chart, scatter, boxplot, cumulative frequency | Statistics | ✅ Exists |
| Cuboid, compound shapes, Pythagoras | Geometry, measures | ✅ Exists |
| Tree diagrams, Venn | Probability | ✅ Exists |
| **Ratio/scale diagrams** | Scale drawing, maps | ❌ Add |
| **Loci** | Locus constructions | ❌ Add |
| **Transformations overlay** | Reflection, rotation, enlargement — show before/after | ❌ Add (interactive) |
| **Graph with movable point** | Gradient, tangent, area under curve | ❌ Add (interactive) |

**Design:** Use existing `designTokens.ts`; all new diagrams professional, print-ready, no neon glow.

### 4.4 Functions & Features

| Feature | Description |
|--------|-------------|
| **Calculator simulator** | In-app calculator for Paper 2/3 that matches exam rules (no symbolic, no stored programs) |
| **Formula sheet** | Toggle to show/hide formula sheet (Foundation gets one; Higher doesn't for most) |
| **Topic → question mapping** | Every question tagged; "Weak on quadratics" → drill only quadratics |
| **Golden question bank** | 345 questions; filter by topic, tier, paper, difficulty |
| **Fix-It drill** | Missed questions only; re-ordered by topic for spaced practice |
| **Full paper + Topic practice** | Both modes; topic practice shows topic name per question |
| **Personal best + mastery chip** | Per paper/topic; visible on results page |

### 4.5 Maths — Learning Superpowers Integration

| Where | Superpowers | Content / Trigger |
|-------|-------------|-------------------|
| Topic drill intro | Retrieval Before Relearn | "Before we show the method — what do you remember?" for each topic |
| Question feedback | Mistake Museum | After wrong answer: "Many students choose X because…" |
| Formula cards | Dual-Code Flip | Formula + geometric interpretation; "Sketch this" / "What do you see?" |
| Multi-step questions | Worked Example Fade | First 2 steps given, student completes; "What would the next step be?" |
| Mixed mastery | Interleave Roulette | 30% current topic, 70% previous — built into topic drill |
| Before answer | Confidence Calibration | "How sure are you?" 1–5 |

### 4.6 Maths — Creative Methods

| Method | Purpose |
|--------|---------|
| **Examiner's eye overlay** | Shows where marks would be awarded/lost after submission |
| **Common error trap** | "Many students choose X because… but the correct approach is…" |
| **Graph + "What does this point mean in words?"** | Dual coding: visual → verbal retrieval |

### 4.7 Maths — Diagram Priorities (from Master List)

| Diagram | Priority |
|---------|----------|
| Ratio/scale, Loci, Transformations overlay, Graph with movable point | P2 |

---

## 5. Science Lab (Biology, Chemistry, Physics — AQA 8461/62/63)

**Specs:** AQA 8461 (Biology), 8462 (Chemistry), 8463 (Physics) | **Papers:** 2 per subject | **Tiers:** Foundation, Higher

### 5.1 Content Targets (from Content Plan)

| Subject | Concepts | Questions | Practicals | Misconceptions | Target |
|---------|----------|-----------|------------|----------------|--------|
| Biology | 20 | 22 | 6 | 17 | Add 5–10 stretch concepts; 10+ Grade 9-style questions |
| Chemistry | 13 | 12 | 3 | 9 | Add 5 stretch concepts; 8+ Grade 9 questions |
| Physics | 11 | 9 | 5 | 6 | Add 4 stretch concepts; 8+ Grade 9 questions |

**Combined Science:** Add 6-paper structure; combined-specific questions (shorter, synoptic); map content to Papers 1–6.

### 5.2 Question Presentation

| Mode | Presentation | Features |
|------|--------------|----------|
| **Concept Lab** | Card flip: term → definition; "Core idea" + visual model + misconceptions | Confidence rating (1–3); progress bar; "Change scenario" (e.g. "If temperature increases…") |
| **Quick Check** | MC, drag-order, true/false; 3–5 per sub-topic | Instant feedback; "Why?" expandable; unlocks Question Lab when passed |
| **Question Lab** | 1–6 mark questions; some with diagrams/data | Text input; optional "Method mark breakdown" for 4–6 markers |
| **Practical Lab** | Variables, method, risks, data table, graph, evaluation | Step-by-step; drag to order method; plot points on graph; evaluate "reliability" |
| **Equation Lab** | Symbol, unit, rearrange, substitute | Multiple choice for rearrange; numeric input for calc |
| **Misconception Lab** | "Many students think X. Why is this wrong?" | Free text; compare to model; no strict marking — reflection focus |

**Creative additions:**
- **"Data dive"**: Real or realistic data (e.g. enzyme rate vs pH); student selects graph type, plots, interprets — mirrors Paper 2 data questions
- **"Practical simulator"**: Step-through of required practical with photos/diagrams; "What would you measure here?" "What safety precaution?"
- **"Stretch scenario"**: Unfamiliar context (e.g. new organism, new reaction) — tests application, not just recall
- **"Compare and contrast"**: Side-by-side two concepts (e.g. diffusion vs osmosis); drag statements to correct column

**Dual coding & learning methods:**
- **Process + diagram + caption:** Every process (photosynthesis, electrolysis, reflex arc) = diagram with stages + one-sentence caption per stage; equation + particle diagram
- **Concept Bridge:** "Link these two concepts" — e.g. respiration + photosynthesis; drag and explain the connection
- **Explain Like I'm 11:** After every concept: "Explain this so an 11-year-old would get it" (Feynman technique)
- **Schema Builder:** "Build the big picture" — drag concepts into hierarchy (e.g. cell → tissue → organ → system)
- **Concrete examples:** Every abstract concept: "Example 1: …", "Example 2: …", "Now try: [unfamiliar organism/reaction]"
- **Segmenting:** Complex processes in "Part 1 of 4" — one chunk at a time to reduce cognitive load

### 5.3 Diagrams Required

| Subject | Diagram Type | Use Case |
|---------|--------------|----------|
| **Biology** | Cell structure (animal, plant) | Cell biology |
| | Digestive system, heart, lungs | Organisation |
| | Neuron, reflex arc | Homeostasis |
| | DNA double helix, inheritance diagram | Inheritance |
| | Food web, carbon cycle, water cycle | Ecology |
| | Microscope field of view | Required practical |
| **Chemistry** | Atom structure (Bohr, electron shells) | Atomic structure |
| | Ionic/covalent bonding diagrams | Bonding |
| | Periodic table (highlight groups) | Periodic table |
| | Reactivity series | Metals |
| | Electrolysis cell | Electrolysis |
| | Energy profile (exo/endo) | Energy changes |
| | Fractionating column | Organic chemistry |
| **Physics** | Circuit (series, parallel) | Electricity — ✅ Exists |
| | Force diagrams (free body) | Forces |
| | Wave diagram (longitudinal, transverse) | Waves |
| | Ray diagrams (lens, mirror) | Light |
| | Pendulum, spring | Energy, motion |
| | Magnet field lines | Magnetism |
| | Solar system, orbit | Space |

**Design:** Extend `scienceTemplates.ts`; biology/chemistry need many new templates. Style: clean, textbook-like, labelled, optional interactive labels (click to reveal).

### 5.4 Functions & Features

| Feature | Description |
|--------|-------------|
| **Flashcard → Quick Check → Question Lab gating** | Must complete flashcards (e.g. 70% confidence) + pass quick check to unlock quiz |
| **Topic mastery** | Per topic; aggregate from flashcard + quick check + question lab |
| **Method Mark Trainer** | For 4–6 mark questions: break down into idea/method/precision marks; show where marks are lost |
| **Required practical tracker** | Checklist of all 21 (Combined) / 28 (Triple) practicals; link to Practical Lab tasks |
| **Equation sheet** | Physics equation sheet (given in exam); practice with and without |
| **Combined Science mode** | 6-paper structure; combined-specific questions (shorter, synoptic); student selects Triple vs Combined at start |
| **Stretch content** | Grade 9-style questions; extension concepts beyond core spec |

### 5.5 Science Lab — Learning Superpowers Integration

| Where | Superpowers | Content / Trigger |
|-------|-------------|-------------------|
| Concept Lab | Explain Like I'm 11 | ✅ Already embedded; extend to all concepts |
| Concept Lab | Concept Bridge | "Link photosynthesis & respiration"; "Link electrolysis & bonding" |
| Concept Lab | Schema Builder | Cell → tissue → organ → system; reactivity series; energy transfers |
| Concept Lab | Compare & Contrast Matrix | Diffusion vs osmosis; exothermic vs endothermic; series vs parallel |
| Concept Lab | Retrieval Before Relearn | "Before we show you — what do you remember about mitosis?" |
| Quick Check / Question Lab | Mistake Museum | Per-topic misconception cards |
| Process diagrams | Dual-Code Flip | Diagram → describe; text → sketch (e.g. reflex arc, electrolysis) |
| Practical Lab | Worked Example Fade | Method steps: first 2 given, student completes |

### 5.6 Science Lab — Creative Methods

| Method | Purpose |
|--------|---------|
| **Data dive** | Real data; student selects graph type, plots, interprets |
| **Stretch scenario** | Unfamiliar context (new organism, new reaction) — tests application |
| **Change scenario** | "If temperature increases…" — tests transfer |
| **Practical simulator** | Step-through of required practical; "What would you measure here?" |

### 5.7 Science Lab — Diagram Priorities (from Master List)

| Subject | Diagrams | Priority |
|---------|----------|----------|
| Biology | Cell, digestive system, heart, neuron, DNA, food web, carbon cycle, microscope | P0 |
| Chemistry | Atom, bonding, periodic table, electrolysis, energy profile, fractionating column | P0 |
| Physics | Force diagrams, waves, ray diagrams, pendulum, magnet, solar system | P0 |

---

## 6. Combined Science (AQA 8464/8465)

**Spec:** AQA 8464/8465 | **Papers:** 6 (2 Bio, 2 Chem, 2 Phys) | **Tiers:** Foundation, Higher

### 6.1 Content Targets (from Content Plan)

- **6-paper structure** — Papers 1–6 (2 Bio, 2 Chem, 2 Phys); combined-specific questions (shorter, synoptic)
- **Map content to Papers 1–6** — All topics from Triple mapped; no "triple only" content
- **Synoptic questions** — e.g. "Using your knowledge of both biology and chemistry…"

### 6.2 Structural Difference from Triple

- **6 papers** instead of 6 (2 Bio, 2 Chem, 2 Phys) — same content, shorter papers, fewer marks per question
- **Synoptic questions** — e.g. "Using your knowledge of both biology and chemistry…"
- **Combined-specific content** — Some topics trimmed; no "triple only" content

### 6.3 Question Presentation

- Same as Science Lab but:
  - **Paper selector:** 1–6 with clear labels (Bio 1, Bio 2, Chem 1, etc.)
  - **Shorter question sets** — e.g. 15–20 per paper vs 40+
  - **Synoptic practice** — Dedicated "Cross-topic" mode: questions that span two sciences
  - **Combined equation sheet** — Different from Triple; show correct one

### 6.4 Diagrams

- Reuse all Science Lab diagrams; no new ones needed.

### 6.5 Functions & Features

| Feature | Description |
|--------|-------------|
| **6-paper dashboard** | Clear grid: Papers 1–6; progress per paper |
| **Synoptic question bank** | Tagged "synoptic"; filter for revision |
| **Combined vs Triple toggle** | At onboarding; affects content and equation sheet |
| **Unified progress** | Single "Science" progress bar that aggregates all 6 papers |

### 6.6 Combined Science — Subject-Specific Notes

- Reuses all Science Lab diagrams; no new diagrams needed
- Same Learning Superpowers as Science Lab (§5.5); same Creative methods (§5.6)
- Distinct: 6-paper dashboard, synoptic question bank, combined equation sheet

---

## 7. English Language (AQA 8700)

**Spec:** AQA 8700 | **Papers:** 2 (Fiction + Non-fiction) | **Tier:** Single

### 7.1 Content Targets (from Content Plan)

| Content | Current | Target |
|---------|---------|--------|
| Paper 1 Section A (Reading) | 4 tasks | Maintain |
| Paper 1 Section B (Writing) | 5 tasks | Maintain |
| Paper 2 Section A (Reading) | 4 tasks | Maintain |
| Paper 2 Section B (Writing) | 5 tasks | Maintain |
| Model answers | Present | Add 2–3 Grade 9 model answers per task |

### 7.2 Question Presentation

| Section | Presentation | Features |
|--------|--------------|----------|
| **Section A (Reading)** | Extract at top (scrollable, fixed in view); questions below with marks | Highlight tool on extract; "Evidence" button to tag a quote before answering |
| **Section B (Writing)** | Prompt + optional image; full-screen writing area | Word count; paragraph guides; checklist (Top Band Coverage) |
| **Task types** | Paper 1: Analysis, structure, evaluation; Paper 2: Viewpoint, comparison, evaluation | Command word hints; mark scheme per question |

**Creative additions:**
- **"Examiner's annotations"**: Model answer with marginal notes: "Here the student uses a topic sentence" / "Evidence embedded"
- **"Upgrade this sentence"**: Given a Grade 4 sentence, student rewrites for Grade 6/8 — then compare to model
- **"Evidence hunter"**: For reading questions, student highlights 3 quotes before answering; app checks if they're relevant
- **"Timed burst"**: 5 min to plan, 10 min to write — mimics exam pressure

**Dual coding & learning methods:**
- **Structure diagram + extract:** "How does the writer structure?" — timeline/flow diagram + extract with highlighted sections; AO2 language + colour-coded annotations
- **Compare & Contrast Matrix:** Two texts side-by-side; "What's the same? What's different?" — drag statements
- **Worked example fade:** Model paragraph with first 2 sentences; student completes; "What would the next sentence do?"
- **Retrieval before write:** "Before you write — list 3 techniques you'll use" (planning as retrieval)
- **Icon + AO:** Every AO (AO1, AO2, AO3, AO4) has consistent icon; appears in margin when relevant

### 7.3 Diagrams Required

| Diagram Type | Use Case |
|--------------|----------|
| **Structure diagram** | For "How does the writer structure the text?" — timeline or flow showing beginning/middle/end, shifts |
| **Comparison grid** | For "Compare how the writers present X" — two columns, student fills similarities/differences |
| **AO mapping** | Visual showing which AOs are tested in each question (AO1, AO2, AO3, AO4) |

**Design:** Simple, pedagogical — not decorative. Help students see structure.

### 7.4 Functions & Features

| Feature | Description |
|--------|-------------|
| **Examiner pack per task** | Checklist, mark scheme, method, Grade 4/6/8/9 models |
| **Self-mark vs AI examiner** | Self-mark: student selects band, sees model; AI: simulated feedback with targets |
| **"Improve this draft"** | After feedback, one-click return to workspace with draft loaded |
| **Reading + Writing balance** | Dashboard shows both; "Suggested path" guides through all 18 tasks |
| **SPaG tracker** | For writing, flag common errors; link to Vocab Lab |
| **Draft history** | Save multiple drafts; compare Draft 1 vs Draft 2 |

### 7.5 English Language — Learning Superpowers Integration

| Where | Superpowers | Content / Trigger |
|-------|-------------|-------------------|
| Reading tasks | Compare & Contrast Matrix | Two texts side-by-side; drag statements to Same / Text A / Text B |
| Writing tasks | Worked Example Fade | Model paragraph: first 2 sentences given, student completes |
| Planning | Retrieval Before Relearn | "Before you write — list 3 techniques you'll use" |
| Structure questions | Dual-Code Flip | Structure diagram + extract with highlighted sections |
| Model answers | Mistake Museum | "Many students write X; examiners want Y because…" |

### 7.6 English Language — Creative Methods

| Method | Purpose |
|--------|---------|
| **Examiner's annotations** | Model answer with marginal notes: "Topic sentence here" |
| **Evidence hunter** | Highlight 3 quotes before answering; app checks relevance |
| **Upgrade this sentence** | Grade 4 → Grade 6/8 rewrite; compare to model |
| **Timed burst** | 5 min to plan, 10 min to write — mimics exam pressure |

### 7.7 English Language — Diagram Priorities

| Diagram | Priority |
|---------|----------|
| Structure diagram, comparison grid, AO mapping | P1 |

---

## 8. English Literature (AQA 8702)

**Spec:** AQA 8702 | **Papers:** 2 (Shakespeare + 19thC novel; Modern + poetry) | **Tier:** Single

### 8.1 Content Targets (from Content Plan)

| Content | Current | Target |
|---------|---------|--------|
| Set texts | Macbeth, ACC, J&H, AIC | Add 2–3 more optional texts (e.g. Romeo & Juliet, Pride & Prejudice) |
| Poetry | 6 tasks | Add 4–6 more seen/unseen; full anthology coverage |
| GuidePost packs | All 15 tasks | Maintain; add Grade 9 model answers |

### 8.2 Question Presentation

| Component | Presentation | Features |
|-----------|--------------|----------|
| **Extract + whole text** | Extract shown; "Whole text" link opens full text (or key scenes) | Quotation bank per text; "Best fit" drill |
| **Poetry** | Poem(s) displayed; question below | Single poem, comparison, or unseen |
| **Essay** | 30–40 min task; plan + write | Checklist (themes, characters, context); model by grade |

**Creative additions:**
- **"Quotation Lab"**: Drill quotes by theme/character; "Explain this quote", "Upgrade this analysis", "Link two quotes"
- **"Context injector"**: When writing, suggest relevant context (e.g. "Jacobean audience believed…") — student weaves in
- **"Comparison connector"**: For poetry comparison, suggest linking phrases: "Similarly…", "In contrast…"
- **"Character arc"**: Visual timeline of character change; student annotates key moments
- **"Theme web"**: Central theme, branches to characters/events/quotes — interactive revision tool

**Dual coding & learning methods:**
- **Plot timeline + "What happens?"**: Key events with "In one sentence?" — retrieval
- **Character map + quote:** Relationship diagram + "Which quote shows this?"
- **Compare & Contrast Matrix:** Two poems; two characters; form/structure/language grid
- **Schema Builder:** "Build the theme web" — drag characters, events, quotes to central theme
- **Memory Palace:** For key quotes — "Place each in a scene from the play"
- **Explain Like I'm 11:** "Explain this theme so someone who hasn't read it would get it"

### 8.3 Diagrams Required

| Diagram Type | Use Case |
|--------------|----------|
| **Plot timeline** | Macbeth, ACC, J&H, AIC — key events in order |
| **Character relationship map** | Macbeth/Lady Macbeth; Scrooge/ghosts; Jekyll/Hyde |
| **Theme overlap** | Venn or matrix: which themes appear in which texts |
| **Poetry comparison grid** | Form, structure, language, ideas — side by side |
| **Context timeline** | Historical events relevant to set texts (e.g. Victorian London for ACC) |

### 8.4 Functions & Features

| Feature | Description |
|--------|-------------|
| **GuidePost packs** | Per task: checklist, mark scheme, method, model answers |
| **Set text selector** | Student picks their texts (Macbeth or Romeo & Juliet; ACC or Pride & Prejudice; etc.) |
| **Quotation Lab** | By text, theme, character; multiple drill types |
| **Model Drills** | "Match this paragraph to a grade" / "What makes this Grade 9?" |
| **Seen + Unseen poetry** | Full anthology coverage; unseen with comparison |
| **Option-aware** | Only show tasks for student's chosen texts |

### 8.5 English Literature — Learning Superpowers Integration

| Where | Superpowers | Content / Trigger |
|-------|-------------|-------------------|
| Literature concepts | Explain Like I'm 11 | "Explain this theme so someone who hasn't read it would get it" |
| Quotation Lab | Memory Palace | "Place each quote in a scene from the play" |
| Theme/character | Schema Builder | Build theme web: central theme, branches to characters/events/quotes |
| Two texts/poems | Compare & Contrast Matrix | Form, structure, language, ideas — side by side |
| Model answers | Mistake Museum | "Many students write X; examiners want Y because…" |

### 8.6 English Literature — Creative Methods

| Method | Purpose |
|--------|---------|
| **Quotation Lab** | Drill quotes by theme/character; "Explain", "Upgrade", "Link two" |
| **Context injector** | Suggest relevant context when writing (e.g. "Jacobean audience…") |
| **Comparison connector** | For poetry comparison, suggest linking phrases: "Similarly…", "In contrast…" |
| **Character arc** | Visual timeline of character change; student annotates key moments |
| **Theme web** | Central theme, branches to characters/events/quotes — interactive revision |

### 8.7 English Literature — Diagram Priorities

| Diagram | Priority |
|---------|----------|
| Plot timeline, character map, theme web, context timeline, poetry comparison grid | P1 |

---

## 9. History Hub (AQA 8145)

**Spec:** AQA 8145 | **Papers:** 3 (Period study, Wider world, Modern depth) | **Tier:** Single

### 9.1 Content Targets (from Content Plan)

| Content | Current | Target |
|---------|---------|--------|
| 16 options | Full | Maintain |
| Source/interpretation labs | ✅ | Add 2–3 Grade 9 model answers per option |
| Question lab | ✅ | Add "sustained argument" prompts |

### 9.2 Question Presentation

| Question Type | Presentation | Features |
|---------------|--------------|----------|
| **Source analysis** | Source (text/image) at top; questions below | "Content" vs "Provenance" vs "Context" prompts; mark allocation |
| **Interpretation** | Two interpretations shown; "How far do you agree?" | Highlight differences; plan both sides |
| **Describe/Explain** | 4–8 mark recall/explanation | Structured answer space; "Key terms to include" hint |
| **Essay (16–20 mark)** | Question + bullet points; extended writing | Plan grid; "Sustained argument" checklist |
| **Historic environment** | Source + site info; questions | Map/image of site where helpful |

**Creative additions:**
- **"Source surgeon"**: Annotate a source — circle evidence for "content", underline for "provenance"
- **"Interpretation duel"**: Two historians' views; student writes "Historian A would say… because…; Historian B would say… because…"
- **"Timeline zoom"**: Interactive timeline; zoom into period; place events; "What came before this that caused it?"
- **"Key term injector"**: When writing, suggest spec terms they haven't used yet
- **"Essay skeleton"**: Template: Intro (argument) → Para 1 (point + evidence) → Para 2 → Para 3 → Conclusion — drag to reorder

**Dual coding & learning methods:**
- **Timeline + "In one sentence"**: Every event on timeline has "What happened here?" — retrieval; causation diagram (arrows) + written explanation
- **Concept Bridge:** "Link these two events" — drag and explain cause-effect; "How did X lead to Y?"
- **Memory Palace (optional):** For key dates/events: "Place each in a room" — method of loci for lists
- **Compare & Contrast Matrix:** Two interpretations side-by-side; "What's the same? What's different?"
- **Schema Builder:** "Build the causation web" — drag events into cause-effect flow
- **Elaborative interrogation:** "Why did this happen?" after every correct recall

### 9.3 Diagrams Required

| Diagram Type | Use Case |
|--------------|----------|
| **Timeline** | Per period study; key events, colour-coded by theme |
| **Source analysis grid** | Content / Provenance / Context — structured breakdown |
| **Interpretation comparison** | Two columns; similarities/differences |
| **Map** | For historic environment; location of site, key features |
| **Cause-effect flow** | Event → causes → consequences |
| **Essay plan template** | Intro, 3–4 paragraphs, conclusion — drag-and-drop |

### 9.4 Functions & Features

| Feature | Description |
|--------|-------------|
| **16-option selector** | Period study, wider world, thematic, British depth — student picks their options |
| **Source Lab** | Dedicated source practice; content, provenance, context |
| **Interpretation Lab** | Two interpretations; assess, compare, evaluate |
| **Question Lab** | All question types; filter by option, type |
| **Historic environment** | 12 sites; source packs, site info, questions |
| **Key terms + concept cards** | Per option; flashcard-style |
| **Grade 9 model answers** | For essay and source questions |

### 9.5 History — Learning Superpowers Integration

| Where | Superpowers | Content / Trigger |
|-------|-------------|-------------------|
| Timeline / events | Retrieval Before Relearn | "Before we show you — what happened here?" per event |
| Source analysis | Compare & Contrast Matrix | Two interpretations; drag to Same / Interpretation A / B |
| Causation | Concept Bridge | "Link these two events" — drag and explain cause-effect |
| Key dates/lists | Memory Palace | "Place each event in a room" (method of loci) |
| Essay planning | Schema Builder | Build causation web: events → causes → consequences |
| Key terms | Explain Like I'm 11 | "Explain [concept] so a Year 8 would get it" |

### 9.6 History — Creative Methods

| Method | Purpose |
|--------|---------|
| **Source surgeon** | Annotate source — circle content, underline provenance |
| **Interpretation duel** | Two historians' views; student writes both sides |
| **Timeline zoom** | Interactive timeline; "What came before this that caused it?" |
| **Essay skeleton** | Template: Intro → Para 1 → Para 2 → Para 3 → Conclusion — drag to reorder |
| **Key term injector** | When writing, suggest spec terms they haven't used yet |

### 9.7 History — Diagram Priorities

| Diagram | Priority |
|---------|----------|
| Timeline, source grid, interpretation comparison, cause-effect, essay plan | P1 |

---

## 10. Geography Hub (AQA 8035)

**Spec:** AQA 8035 | **Papers:** 3 (Physical, Human, Fieldwork & skills) | **Tier:** Single

### 10.1 Content Targets (from Content Plan)

| Content Type | Current | Target | Gap |
|--------------|---------|--------|-----|
| Concepts | 18 | 50+ (2–6 per section) | 32+ |
| Key terms | 35 | 300+ (full spec + case study) | 265+ |
| Quick checks | 18 | 120+ (3–5 per sub-topic) | 102+ |
| Skills tasks | 5 | 25+ (map, graph, numerical, statistical) | 20+ |
| Issue scenarios | 3 | 5 | 2 |
| Fieldwork tasks | 5 | 4–6 | 0–1 |
| Question lab | 16 | 50+ | 34+ |
| Case studies | Partial | 12+ named (LIC/NEE city, UK city, LIC/NEE country, coastal, flood, glacial, rainforest, desert/cold, etc.) | 8+ |

### 10.2 Question Presentation

| Question Type | Presentation | Features |
|---------------|--------------|----------|
| **Map skills** | OS map extract or simplified map; questions on grid ref, direction, distance | Zoom, scale bar; "Measure" tool |
| **Graph/data** | Chart, graph, or table; interpret, describe, compare | Interactive: hover for values; "Describe the trend" scaffold |
| **Case study** | Named location; "Using a case study you have studied…" | Case study cards; "Recall" vs "Apply" questions |
| **Issue evaluation** | Pre-release style; resource booklet + decision question | Multi-page; "Stakeholder" view |
| **Fieldwork** | Enquiry context; hypothesis, method, data, conclusion | Step-by-step; "What would you measure?" |

**Creative additions:**
- **"Map decoder"**: Annotate map — mark relief, land use, settlement pattern; then answer questions
- **"Graph builder"**: Given data, student chooses graph type and plots; then interprets
- **"Case study deep dive"**: LIC city, UK city, tectonic hazard, etc. — full fact file + application questions
- **"Decision maker"**: Issue evaluation — student takes role of planner; justify decision with evidence
- **"Fieldwork simulator"**: Virtual fieldwork — photos, data collection sheet; analyse results

**Dual coding & learning methods:**
- **Map + data overlay:** Choropleth, thematic map + "What does this show?"; process diagram (longshore drift) + before/after photos
- **Compare & Contrast Matrix:** LIC vs HIC city; two management strategies; drag statements to correct column
- **Schema Builder:** "Build the case study" — drag facts (location, causes, impacts, management) into structure
- **Concrete examples:** Every process: "Example 1: Somerset Levels…", "Example 2: [different location]"
- **Retrieval before case study:** "Before we show you — what do you remember about [Rio/Bristol]?"
- **Dual-Code Flip:** See map → "What do you see?"; see data → "Which graph type fits?"

### 10.3 Diagrams Required

| Diagram Type | Use Case |
|--------------|----------|
| **Map (simplified OS)** | Grid ref, direction, distance, relief |
| **Choropleth / thematic map** | Development, hazards, etc. |
| **Cross-section** | River valley, coastline, glacial landscape |
| **Process diagram** | Longshore drift, hydrological cycle, plate boundary |
| **Graph types** | Line, bar, pie, scatter, triangular (employment) |
| **Hydrograph** | Storm vs normal; lag time, peak discharge |
| **Urban model** | Burgess, Hoyt — land use zones |
| **DTM** | Demographic transition model stages |
| **Case study location map** | Where is Rio? Where is the Somerset Levels? |

### 10.4 Functions & Features

| Feature | Description |
|--------|-------------|
| **Option selector** | Living world: Hot deserts OR Cold; Landscapes: 2 from Coastal, River, Glacial; Resource: Food OR Water OR Energy |
| **Skills Lab** | Map, graph, numerical, statistical — dedicated practice |
| **Issue scenarios** | Coastal, flood, energy — pre-release style |
| **Fieldwork tasks** | Two enquiries; physical + human; contrasting |
| **Case study bank** | 12+ named case studies; full coverage |
| **Quick check + Question Lab** | Per section; 3–5 quick checks per sub-topic |
| **Key terms** | 300+; full spec + case study terms |

### 10.5 Geography — Learning Superpowers Integration

| Where | Superpowers | Content / Trigger |
|-------|-------------|-------------------|
| Case studies | Retrieval Before Relearn | "Before we show you — what do you remember about [Rio/Bristol]?" |
| Processes | Compare & Contrast Matrix | LIC vs HIC city; two management strategies |
| Case study structure | Schema Builder | Drag facts (location, causes, impacts, management) into structure |
| Map/data | Dual-Code Flip | See map → "What do you see?"; see data → "Which graph type fits?" |
| Concrete examples | Varied practice | "Example 1: Somerset Levels…", "Example 2: [different location]" |

### 10.6 Geography — Creative Methods

| Method | Purpose |
|--------|---------|
| **Map decoder** | Annotate map — relief, land use, settlement pattern |
| **Graph builder** | Given data, student chooses graph type and plots |
| **Case study deep dive** | LIC city, UK city, tectonic hazard — full fact file + application |
| **Decision maker** | Issue evaluation — student as planner; justify with evidence |
| **Fieldwork simulator** | Virtual fieldwork — photos, data collection sheet; analyse results |

### 10.7 Geography — Diagram Priorities

| Diagram | Priority |
|---------|----------|
| Map, choropleth, cross-section, process diagrams, hydrograph, urban model, DTM | P1 |

---

## 11. Religious Studies Hub (AQA 8062)

**Spec:** AQA 8062 | **Papers:** 2 | **Tier:** Single

### 11.1 Content Targets (from Content Plan)

| Content Type | Current | Target | Gap |
|--------------|---------|--------|-----|
| Belief concepts (per religion) | ~5 | 8–15 | 3–10 per religion |
| Scripture cards | ~35 | 60+ | 25+ |
| Contrasting views | ~10 | 30+ (6–10 per theme) | 20+ |
| Quick check | ~25 | 80+ | 55+ |
| Short answer (1–2–4–5) | Present | 15–25 per religion, 10–15 per theme | Expand |
| Extended writing (12-mark) | Present | 4–6 per religion, 3–5 per theme | Expand |
| Philosophical arguments (Theme C) | Minimal | 5 full arguments | 5 |

### 11.2 Question Presentation

| Question Type | Presentation | Features |
|---------------|--------------|----------|
| **1–2 mark** | Short recall | Single line or MC |
| **4–5 mark** | Explain, describe | Structured; "Two beliefs…", "Two ways…" |
| **12 mark** | Evaluate, discuss | Essay; "One view… Another view… Conclusion" scaffold |
| **Scripture** | Quote + question | Quote shown; "What does this teach about…?" |
| **Contrasting views** | Theme question | "Christians believe… Humanists believe…" |

**Creative additions:**
- **"Scripture unpacker"**: Given a quote, student identifies: What does it teach? Which belief? How might it influence a believer?
- **"View builder"**: For 12-mark, build two views with evidence; then write conclusion
- **"Philosophy explorer"**: Theme C — Design, First Cause; step through argument; identify strengths/weaknesses
- **"Religious literacy"**: Key terms per religion; "What does Tawhid mean?" with scripture link

**Dual coding & learning methods:**
- **Belief web + scripture:** Central belief (e.g. Trinity) + branches to teachings, practices; each branch links to scripture quote
- **Argument map:** Design/First Cause — premise → premise → conclusion; "Where is the weakness?"
- **Memory Palace:** For 5 Pillars, 4 Noble Truths, etc. — "Place each in a room"; recall later
- **Compare & Contrast Matrix:** Two religions on one theme; "What's the same? What's different?"
- **Explain Like I'm 11:** "Explain [belief] so someone of another faith would understand"
- **View builder:** For 12-mark — build two views with evidence; then write conclusion (chunking)

### 11.3 Diagrams Required

| Diagram Type | Use Case |
|--------------|----------|
| **Belief web** | Central belief (e.g. Trinity); branches to teachings, practices |
| **Theme matrix** | Themes A–F; religions down; contrasting views |
| **Argument map** | Design argument: premise → premise → conclusion |
| **Scripture card** | Quote + reference + key teaching |
| **Comparison grid** | Two religions on one theme — beliefs, practices |

### 11.4 Functions & Features

| Feature | Description |
|--------|-------------|
| **Religion + theme selector** | 2 religions, 4 themes (or 2 + G, H for textual) |
| **Belief concepts** | 8–15 per religion; flashcard + explain |
| **Scripture cards** | 60+; quote, reference, teaching |
| **Contrasting views** | 6–10 per theme; religious vs non-religious |
| **Quick check** | 80+; 1–2–4–5 mark style |
| **12-mark practice** | 4–6 per religion, 3–5 per theme; full scaffold |
| **Philosophical arguments** | Theme C: 5 full arguments with evaluation |

### 11.5 Religious Studies — Learning Superpowers Integration

| Where | Superpowers | Content / Trigger |
|-------|-------------|-------------------|
| Beliefs (5 Pillars, etc.) | Memory Palace | "Place each in a room" — method of loci |
| 12-mark views | Compare & Contrast Matrix | Two religions on one theme; drag to Same / Religion A / B |
| Belief explanation | Explain Like I'm 11 | "Explain [belief] so someone of another faith would understand" |
| Argument evaluation | Schema Builder | Design argument: premise → premise → conclusion |
| View builder | Chunking | Build two views with evidence; then write conclusion |

### 11.6 Religious Studies — Creative Methods

| Method | Purpose |
|--------|---------|
| **Scripture unpacker** | Given a quote, identify: What does it teach? Which belief? How might it influence a believer? |
| **Philosophy explorer** | Theme C — Design, First Cause; step through argument; identify strengths/weaknesses |
| **Religious literacy** | Key terms per religion; "What does Tawhid mean?" with scripture link |

### 11.7 Religious Studies — Diagram Priorities

| Diagram | Priority |
|---------|----------|
| Belief web, theme matrix, argument map | P1 |

---

## 12. Business Hub (AQA 8132 / Edexcel 1BS0)

**Spec:** AQA 8132 / Edexcel 1BS0 | **Papers:** 2 | **Tier:** Single

### 12.1 Content Targets (from Content Plan)

| Content Type | Current | Target | Gap |
|--------------|---------|--------|-----|
| Concepts | 33 | 33+ | Met |
| Glossary | 75 | 130+ | 55 |
| Quick checks | 43 | 120+ | 77 |
| Case studies | 5 | 15–20 | 10–15 |
| Calculations | 7 | 8+ | 1 |
| Evaluation prompts | 18 | 25+ | 7 |

### 12.2 Question Presentation

| Question Type | Presentation | Features |
|---------------|--------------|----------|
| **Calculation** | Scenario + numbers; calculate | Break-even, profit, cash flow, ratios |
| **Explain** | Scenario; "Explain one advantage…" | 2–4 marks; key terms highlighted |
| **Evaluate** | Scenario; "Evaluate whether…" | 6–9 marks; both sides + conclusion |
| **Case study** | Extended scenario; multi-part | Real business names; apply concepts |

**Creative additions:**
- **"Calculation coach"**: Step-by-step; "First identify fixed costs…" — student fills each step
- **"Break-even visualiser"**: Interactive graph; move price/cost; see break-even point shift
- **"Stakeholder view"**: Given decision, student writes from perspective of worker, customer, shareholder
- **"Business in the news"**: Short scenarios based on real events; apply concepts

**Dual coding & learning methods:**
- **Break-even chart + scenario:** Graph with fixed/variable/revenue + "What happens if price rises?" (interactive)
- **Cash flow + months:** Visual bar chart + "Which month is the problem?" — retrieval
- **Compare & Contrast Matrix:** Two business types; two strategies; drag advantages/disadvantages
- **Concrete examples:** Every concept with 2–3 real business scenarios
- **Worked example fade:** Calculation — first step given, student completes
- **Schema Builder:** "Build the marketing mix" — drag 4 Ps into structure

### 12.3 Diagrams Required

| Diagram Type | Use Case |
|--------------|----------|
| **Break-even chart** | Fixed cost, variable cost, revenue lines; break-even point |
| **Cash flow forecast** | In/out by month; net, opening, closing |
| **Organisation chart** | Hierarchical, flat; span of control |
| **Marketing mix** | 4 Ps; annotate for given business |
| **Product life cycle** | Stages; extension strategies |
| **Decision tree** | Expand or not; outcomes |
| **Supply/demand** | Price, quantity; shift curves |

### 12.4 Functions & Features

| Feature | Description |
|--------|-------------|
| **Glossary** | 130+ terms; searchable |
| **Calculation lab** | Break-even, profit, margin, ratios, cash flow |
| **Case studies** | 15–20; varied business types |
| **Quick check** | 120+; 3–5 per sub-topic |
| **Evaluation prompts** | 25+; "Evaluate the importance of…" |
| **Option support** | AQA and Edexcel content where different |

### 12.5 Business — Learning Superpowers Integration

| Where | Superpowers | Content / Trigger |
|-------|-------------|-------------------|
| Calculations | Worked Example Fade | Break-even, cash flow — first step given, student completes |
| Concepts | Compare & Contrast Matrix | Two business types; two strategies; advantages/disadvantages |
| Marketing mix | Schema Builder | "Build the marketing mix" — drag 4 Ps into structure |
| Break-even | Dual-Code Flip | Graph + "What happens if price rises?" (interactive) |
| Case studies | Concrete examples | Every concept with 2–3 real business scenarios |

### 12.6 Business — Creative Methods

| Method | Purpose |
|--------|---------|
| **Calculation coach** | Step-by-step; "First identify fixed costs…" — student fills each step |
| **Break-even visualiser** | Interactive graph; move price/cost; see break-even point shift |
| **Stakeholder view** | Given decision, student writes from perspective of worker, customer, shareholder |
| **Business in the news** | Short scenarios based on real events; apply concepts |

### 12.7 Business — Diagram Priorities

| Diagram | Priority |
|---------|----------|
| Break-even chart, cash flow, org chart, product life cycle, supply/demand | P1 |

---

## 13. Psychology Hub (AQA GCSE 8182)

**Spec:** AQA 8182 (GCSE) | **Papers:** 2 (Cognition & Behaviour; Social Context) | **Tier:** Single

**Critical:** Align to GCSE 8182, not A-level 7182. Audit `psychologyHubData.ts` against AQA 8182; replace or supplement A-level content with GCSE content.

### 13.1 Content Targets (from Content Plan)

**GCSE 8182 Paper 1 (Cognition & Behaviour):** Memory, Perception, Development, Research methods  
**GCSE 8182 Paper 2 (Social Context):** Social influence, Language thought & communication, Brain & neuropsychology, Psychological problems

| Content Type | Current (A-level?) | GCSE Target | Gap |
|--------------|-------------------|-------------|-----|
| Concepts | ~15 | 25+ (all GCSE topics) | 10+ |
| Key studies | 8 | 15+ (GCSE spec studies) | 7+ |
| Quick checks | 11 | 40+ | 29+ |
| Question lab | 9 | 25+ | 16+ |

### 13.2 Question Presentation

| Topic | Presentation | Features |
|-------|--------------|----------|
| **Memory, Perception, Development** | Concept + study; MC and short answer | Key study summary; "What did Loftus & Palmer find?" |
| **Research methods** | Scenario; design a study, identify IV/DV, etc. | Structured; "Identify the IV" |
| **Social influence** | Study + application | "How might this explain…?" |
| **Psychological problems** | Definition, causes, treatments | Compare approaches |
| **Brain & neuropsychology** | Diagram + function | Label, explain |

**Creative additions:**
- **"Study evaluator"**: Given a study, rate strengths/weaknesses; compare to mark scheme
- **"Design your own"**: Scenario; student designs study (IV, DV, method); compare to model
- **"Apply it"**: "A teacher wants to improve recall. Using your knowledge of memory, suggest…"
- **"Issues and debates"**: Nature/nurture, ethics — apply to studies

**Dual coding & learning methods:**
- **Model + diagram:** Multi-store model, working memory — diagram with labels; "What happens at each stage?" (retrieval)
- **Study design flowchart:** IV → DV → method; "Identify the IV" — visual + question
- **Compare & Contrast Matrix:** Gregory vs Gibson; two studies on same topic
- **Concept Bridge:** "Link memory and revision" — how does the research apply?
- **Explain Like I'm 11:** "Explain [study] so a non-psychologist would get it"
- **Worked example fade:** "Design a study" — first 2 steps given, student completes

### 13.3 Diagrams Required

| Diagram Type | Use Case |
|--------------|----------|
| **Multi-store model** | Sensory, STM, LTM; arrows |
| **Working memory model** | Central executive, phonological loop, etc. |
| **Brain diagram** | Regions; function labels |
| **Neuron** | Structure; synaptic transmission |
| **Study design flowchart** | IV → DV; control; procedure |
| **Perception diagram** | Gregory vs Gibson — optional |

### 13.4 Functions & Features

| Feature | Description |
|--------|-------------|
| **GCSE topic alignment** | Memory, Perception, Development, Research methods; Social influence, Language, Brain, Psychological problems |
| **Key studies** | 15+; summary, findings, evaluation |
| **Study evaluator** | Strengths, weaknesses, ethics |
| **Quick check** | 40+ |
| **Question lab** | 25+; all question types |
| **Research methods** | Design, IV/DV, sampling, ethics |

### 13.5 Psychology — Learning Superpowers Integration

| Where | Superpowers | Content / Trigger |
|-------|-------------|-------------------|
| Concept Lab | Explain Like I'm 11 | "Explain [study] so a non-psychologist would get it" |
| Concept Lab | Concept Bridge | "Link memory and revision" — how does the research apply? |
| Concept Lab | Compare & Contrast Matrix | Gregory vs Gibson; two studies on same topic |
| Study design | Worked Example Fade | "Design a study" — first 2 steps given, student completes |
| Models | Dual-Code Flip | Multi-store model diagram → "What happens at each stage?" |
| Misconceptions | Mistake Museum | Per-topic: "Many students think X because…" |

### 13.6 Psychology — Creative Methods

| Method | Purpose |
|--------|---------|
| **Study evaluator** | Rate strengths/weaknesses; compare to mark scheme |
| **Design your own** | Scenario; student designs study (IV, DV, method); compare to model |
| **Apply it** | "A teacher wants to improve recall. Using your knowledge of memory, suggest…" |
| **Issues and debates** | Nature/nurture, ethics — apply to studies |

### 13.7 Psychology — Diagram Priorities

| Diagram | Priority |
|---------|----------|
| Multi-store model, working memory, brain, neuron, study design flowchart | P0 |

---

## 14. Health & Social Care (Edexcel 2HS01/02)

**Spec:** Edexcel 2HS01/02 | **Papers:** 2 | **Tier:** Single

### 14.1 Content Targets (from Content Plan)

| Content Type | Current | Target | Gap |
|--------------|---------|--------|-----|
| Concepts | 11 | 22+ | 11+ |
| Terms | 22 | 80+ | 58+ |
| Quick checks | 10 | 80+ | 70+ |
| Case studies | 4 | 12+ | 8+ |
| Investigation scaffolds | 2 | 4–6 | 2–4 |
| Unit 3–4 content | Light | Full | Major |

### 14.2 Question Presentation

| Question Type | Presentation | Features |
|---------------|--------------|----------|
| **Life stages** | PIES (Physical, Intellectual, Emotional, Social) | Drag to match; explain development |
| **Case study** | Scenario; individual or group | Apply concepts; care values |
| **Investigation** | Plan an investigation | Hypothesis, method, ethics |
| **Care values** | Scenario; "How would you demonstrate…?" | Dignity, respect, etc. |

**Creative additions:**
- **"Life stage timeline"**: Drag events to correct life stage; explain impact
- **"Care value in action"**: Video or scenario; "Where is the care worker demonstrating respect?"
- **"Investigation scaffold"**: Step-by-step; hypothesis → variables → method → ethics
- **"Case study unpacker"**: Given scenario, identify needs, suggest support

**Dual coding & learning methods:**
- **Life stage timeline + PIES:** Visual timeline with Physical, Intellectual, Emotional, Social at each stage
- **Maslow + scenario:** Pyramid + "Which need is unmet here?" — application
- **Care value wheel + scenario:** "Where is the care worker demonstrating respect?" — visual + question
- **Compare & Contrast Matrix:** Two life stages; two care values
- **Concrete examples:** Every concept with 2–3 service user scenarios
- **Schema Builder:** "Build the investigation" — hypothesis → method → ethics

### 14.3 Diagrams Required

| Diagram Type | Use Case |
|--------------|----------|
| **Life stage timeline** | Infancy → Later adulthood; PIES per stage |
| **Maslow's hierarchy** | Needs pyramid |
| **Care value wheel** | Dignity, respect, etc. |
| **Investigation flowchart** | Hypothesis → method → analysis |
| **Service provision map** | NHS, social care, voluntary — who does what |

### 14.4 Functions & Features

| Feature | Description |
|--------|-------------|
| **Unit 1–4 coverage** | Full content; Units 3–4 expanded for double award |
| **Life stages** | 6 stages; PIES for each |
| **Case studies** | 12+; varied service users |
| **Investigation scaffolds** | 4–6; full structure |
| **Care value scenarios** | Multiple per value |
| **Quick check** | 80+ |

### 14.5 Health & Social Care — Learning Superpowers Integration

| Where | Superpowers | Content / Trigger |
|-------|-------------|-------------------|
| Life stages | Compare & Contrast Matrix | Two life stages; two care values |
| Investigation | Schema Builder | "Build the investigation" — hypothesis → method → ethics |
| Maslow | Dual-Code Flip | Pyramid + "Which need is unmet here?" — application |
| Care values | Concrete examples | Every concept with 2–3 service user scenarios |
| Case studies | Retrieval Before Relearn | "Before we show you — what support would you suggest?" |

### 14.6 Health & Social Care — Creative Methods

| Method | Purpose |
|--------|---------|
| **Life stage timeline** | Drag events to correct life stage; explain impact |
| **Care value in action** | Video or scenario; "Where is the care worker demonstrating respect?" |
| **Investigation scaffold** | Step-by-step; hypothesis → variables → method → ethics |
| **Case study unpacker** | Given scenario, identify needs, suggest support |

### 14.7 Health & Social Care — Diagram Priorities

| Diagram | Priority |
|---------|----------|
| Life stage timeline, Maslow, care value wheel, investigation flowchart | P2 |

---

## 15. Compute Lab (AQA 8525)

**Spec:** AQA 8525 | **Papers:** 2 (Computational thinking; Programming) | **Tier:** Single

**Note:** gcseScope lists OCR; implementation plan uses AQA 8525. Reconcile: use AQA 8525 (new spec, first teaching 2025) or OCR J277.

### 15.1 Content Targets (from Content Plan) — Per Unit

| Unit | Concepts | Glossary | Quick Check | Algorithm/Code/Calc/Logic/SQL | Question Lab |
|------|----------|----------|-------------|-------------------------------|-------------|
| 3.1 Algorithms | 3–4 | 15+ | 15+ | 8–10 trace | 10+ |
| 3.2 Programming | 8+ | 40+ | 40+ | 15–20 code | 10+ |
| 3.3 Data representation | 6+ | 25+ | 25+ | 15–20 calc | 10+ |
| 3.4 Computer systems | 6+ | 30+ | 25+ | 10–15 logic | 10+ |
| 3.5 Networks | 3+ | 15+ | 15+ | — | 5+ |
| 3.6 Cyber security | 3+ | 15+ | 15+ | — | 5+ |
| 3.7 SQL | 2+ | 10+ | 10+ | 10–15 SQL | 5+ |
| 3.8 Ethical/legal | 2+ | 10+ | 10+ | — | 5+ |

### 15.2 Question Presentation

| Mode | Presentation | Features |
|------|--------------|----------|
| **Trace table** | Code/pseudo-code + table | Step through; fill in variable values |
| **Code writing** | Scenario; write program (Python/C#/VB) | Syntax highlighting; run (if in-browser) |
| **Logic circuit** | Build circuit from expression | Drag gates; see truth table |
| **SQL** | Database schema + question | Write SELECT, INSERT, UPDATE, DELETE |
| **Calculation** | Binary, hex, file size | Numeric input; show working |
| **MCQ** | Theory | Instant feedback |

**Creative additions:**
- **"Trace animator"**: Step through algorithm; watch variables update
- **"Pseudo-code to code"**: Given AQA pseudo-code, convert to Python
- **"Logic builder"**: Drag AND, OR, NOT; build circuit; test inputs
- **"SQL explorer"**: Given database, explore with queries; then answer exam-style question
- **"Test data selector"**: Given program, choose normal, boundary, erroneous — justify

**Dual coding & learning methods:**
- **Trace table + code:** Code on left, trace table on right; "Fill in the next row" (synchronised dual coding)
- **Flowchart + pseudo-code:** Same algorithm in both forms; "Which step does this shape represent?"
- **Schema Builder:** "Build the TCP/IP layers" — drag protocols into correct layer
- **Worked example fade:** Trace table — first 3 rows given, student completes
- **Concrete examples:** "This program does X — what would happen if we changed Y?"
- **Retrieval before code:** "Before we show you — what does this algorithm do?"

### 15.3 Diagrams Required

| Diagram Type | Use Case |
|--------------|----------|
| **Flowchart** | Algorithm representation |
| **Trace table** | Variable values per step |
| **Logic circuit** | AND, OR, NOT, XOR gates |
| **Truth table** | For logic expressions |
| **CPU diagram** | ALU, control unit, registers, bus |
| **Fetch-execute cycle** | Step-by-step |
| **Network diagram** | LAN, WAN; devices |
| **TCP/IP layers** | Application, transport, internet, link |
| **Database schema** | Tables, keys, relationships |
| **Binary/hex conversion** | Place value diagram |
| **Huffman tree** | Compression |
| **Bitmap** | Pixel grid; colour depth |

### 15.4 Functions & Features

| Feature | Description |
|--------|-------------|
| **Algorithm lab** | Trace tables; 8–10 per algorithm type |
| **Programming lab** | Code tasks; 15–20; Python focus (AQA allows choice) |
| **Calculation lab** | Binary, hex, file size, sound |
| **Logic lab** | Truth tables, circuits |
| **SQL lab** | 10–15 queries |
| **Concept lab** | Per unit; 3–8 concepts each |
| **Question lab** | 50+ across units |

### 15.5 Compute Lab — Learning Superpowers Integration

| Where | Superpowers | Content / Trigger |
|-------|-------------|-------------------|
| Trace tables | Worked Example Fade | First 3 rows given, student completes |
| TCP/IP layers | Schema Builder | "Build the TCP/IP layers" — drag protocols into correct layer |
| Algorithms | Retrieval Before Relearn | "Before we show you — what does this algorithm do?" |
| Flowchart + pseudo | Dual-Code Flip | Same algorithm in both forms; "Which step does this shape represent?" |
| Concrete examples | Varied practice | "This program does X — what would happen if we changed Y?" |

### 15.6 Compute Lab — Creative Methods

| Method | Purpose |
|--------|---------|
| **Trace animator** | Step through algorithm; watch variables update |
| **Pseudo-code to code** | Given AQA pseudo-code, convert to Python |
| **Logic builder** | Drag AND, OR, NOT; build circuit; test inputs |
| **SQL explorer** | Given database, explore with queries; then answer exam-style question |
| **Test data selector** | Given program, choose normal, boundary, erroneous — justify |

### 15.7 Compute Lab — Diagram Priorities

| Diagram | Priority |
|---------|----------|
| Flowchart, CPU, Fetch-execute, network, TCP/IP, Huffman tree, database schema | P1 |

---

## 16. French & Spanish (AQA 8658/8698)

**Specs:** AQA 8658 (French), 8698 (Spanish) | **Papers:** 4 (Listening, Speaking, Reading, Writing) | **Tiers:** Foundation, Higher

**Status:** No content yet. Full build required. **New MFL spec (2025):** Vocabulary lists, grammar, themes defined by DfE. Align to AQA 8658 (French), 8698 (Spanish).

### 16.1 Content Targets (from Content Plan) — Per Language

| Content Type | Target (per language) |
|--------------|------------------------|
| Vocabulary (Foundation) | 1,200+ words (spec-defined) |
| Vocabulary (Higher) | 1,700+ words |
| Grammar concepts | Full spec (tenses, agreement, structures) |
| Theme content | 3 themes × 4 topics (Identity, Local/national/global, Future) |
| Listening practice | 20+ tasks (Foundation + Higher) |
| Reading practice | 20+ tasks |
| Writing tasks | 15+ (photo, 40-word, 90-word, 150-word) |
| Speaking prep | Role-play, photo card, conversation prompts |
| Translation | English ↔ French/Spanish (sentence + passage) |

### 16.2 Question Presentation

| Skill | Presentation | Features |
|-------|--------------|----------|
| **Listening** | Audio clip; questions (MC, short answer) | Play, pause, replay; transcript toggle after |
| **Reading** | Text; questions | Highlight; vocabulary lookup |
| **Writing** | Photo, 40-word, 90-word, 150-word | Word count; checklist (tense, opinion, etc.) |
| **Speaking** | Role-play, photo card, conversation | Prompt cards; record (future) or written prep |
| **Translation** | Sentence or passage | EN→TL or TL→EN |
| **Vocabulary** | Theme-based | Flashcard; spell; meaning; use in sentence |

**Creative additions:**
- **"Shadow speaking"**: Listen and repeat; fluency practice
- **"Sentence builder"**: Drag words to form correct sentence; grammar focus
- **"Context cards"**: Theme (Identity, Local, Future); sub-topics; vocab + example sentences
- **"Exam-style tasks"**: Foundation vs Higher; 4 papers each; full task types
- **"Common error trap"**: "Many students write X; the correct form is Y because…"

**Dual coding & learning methods:**
- **Tense timeline + example:** Visual timeline (present, past, future) + example sentence per tense; "When do we use this?"
- **Verb conjugation grid + icon:** Each tense has icon; appears when that form is used
- **Sentence builder:** Drag words to form correct sentence — visual + verbal
- **Memory Palace:** For theme vocabulary — "Place each word in a room" (Identity, Local, Future)
- **Retrieval before reveal:** "Before we show you — what does this mean?"
- **Concrete examples:** Every grammar point: "Example 1: …", "Example 2: …", "Now you try"
- **Shadow speaking:** Listen + repeat — auditory + motor; fluency practice

### 16.3 Diagrams Required

| Diagram Type | Use Case |
|--------------|----------|
| **Tense timeline** | Present, past, future — when to use |
| **Verb conjugation grid** | Regular -er, -ir, -re (French); -ar, -er, -ir (Spanish) |
| **Theme map** | Identity, Local, Future; sub-topics |
| **Question word poster** | Qui, quand, où, etc. |
| **Comparison grid** | Similar words (e.g. por/para) |

### 16.4 Functions & Features

| Feature | Description |
|--------|-------------|
| **Vocabulary** | 1,200 (Foundation) / 1,700 (Higher) per spec |
| **Grammar** | Tenses, agreement, structures — full spec |
| **Listening** | 20+ tasks; Foundation + Higher |
| **Reading** | 20+ tasks |
| **Writing** | 15+; photo, 40, 90, 150 word |
| **Speaking prep** | Role-play prompts, photo cards, conversation themes |
| **Translation** | Sentence + passage |
| **Theme filter** | Identity, Local/national/global, Future |

### 16.5 French & Spanish — Learning Superpowers Integration

| Where | Superpowers | Content / Trigger |
|-------|-------------|-------------------|
| Theme vocabulary | Memory Palace | "Place each word in a room" (Identity, Local, Future) |
| Vocabulary drill | Retrieval Before Relearn | "Before we show you — what does this mean?" |
| Grammar | Dual-Code Flip | Tense timeline + example; "When do we use this?" |
| Sentence builder | Schema Builder | Drag words to form correct sentence — visual + verbal |
| Common errors | Mistake Museum | "Many students write X; the correct form is Y because…" |
| Concrete examples | Varied practice | Every grammar point: "Example 1…", "Example 2…", "Now you try" |

### 16.6 French & Spanish — Creative Methods

| Method | Purpose |
|--------|---------|
| **Shadow speaking** | Listen and repeat; fluency practice |
| **Context cards** | Theme (Identity, Local, Future); sub-topics; vocab + example sentences |
| **Exam-style tasks** | Foundation vs Higher; 4 papers each; full task types |
| **Common error trap** | "Many students write X; the correct form is Y because…" |

### 16.7 French & Spanish — Diagram Priorities

| Diagram | Priority |
|---------|----------|
| Tense timeline, conjugation grid, theme map, question word poster | P0 |

---

## 17. Further Maths & Statistics

**Spec:** Edexcel (Further Maths) / AQA or Edexcel (Statistics) | **Status:** Placeholder — full build or remove from scope

### 17.1 If Built — Design Principles

- **Further Maths**: Algebra, functions, calculus intro, matrices, vectors — similar to Maths but stretch content
- **Statistics**: Data, probability, distributions — more stats-focused than Maths
- **Question presentation**: Same as Maths; diagrams for distributions, Venn, tree
- **Functions**: Topic drill, full paper, Fix-It

### 17.2 If Built — Subject-Specific Integration

- **Learning Superpowers:** Same as Maths (§4.5) — Retrieval Before Relearn, Mistake Museum, Dual-Code Flip, Worked Example Fade, Interleave Roulette
- **Creative methods:** Same as Maths (§4.6)
- **Diagram priorities:** Distributions, Venn, tree diagrams — P2

### 17.3 Recommendation

- **Short term:** Remove from "Maths Mastery" marketing until content ready
- **Long term:** Full build if demand exists; otherwise deprioritise

---

## 18. Vocab Lab (Cross-Subject)

**Scope:** English, Science, and other subject vocabulary | **Modes:** Spell, Meaning, Use in sentence, Upgrade, Common mistake

### 18.1 Content Targets (from Content Plan)

| Mode | Current | Target |
|------|---------|--------|
| Spell from meaning | ✅ Implemented | Maintain |
| Meaning from word | Types only; not in session UI | Add to session UI |
| Use in sentence | Types only | Add |
| Upgrade word | Types only | Add |
| Common mistake hint | Stored but not shown | Surface in session |

### 18.2 Modes (Complete All)

| Mode | Presentation | Status |
|------|--------------|--------|
| **Spell from meaning** | Definition → type word | ✅ Implemented |
| **Meaning from word** | Word → select definition | ❌ Add to session UI |
| **Use in sentence** | Word → write sentence | ❌ Add |
| **Upgrade word** | Basic word → suggest better | ❌ Add |
| **Common mistake hint** | Show common confusion | ❌ Surface in session |

**Dual coding & learning methods:**
- **Word + image + sentence:** Every vocab item: word + image + example sentence (triple encoding)
- **Icon + meaning:** Consistent icon per word type (noun, verb, adj); appears in margin
- **Retrieval practice:** Spell from meaning, meaning from word — core retrieval modes
- **Spaced repetition:** Algorithm-driven; "You're due for [word]"
- **Use in sentence:** Production = deeper encoding than recognition
- **Common mistake hint:** "Many students confuse X and Y because…" — metacognition

### 18.3 Functions & Features

- **Theme packs**: Link to English, Science, etc.
- **Spaced repetition**: Already present
- **Fix-It, Streak Sprint**: Already present
- **Integration**: From English writing result — "Improve vocabulary" → Vocab Lab with relevant set

### 18.4 Vocab Lab — Subject-Specific Notes

- **Learning Superpowers:** Retrieval practice (spell, meaning), Spaced repetition, Mistake Museum (common mistake hint)
- **Dual coding:** Word + image + sentence (triple encoding); icon per word type
- **Integration points:** English writing → "Improve vocabulary" → Vocab Lab; theme packs link to subject hubs

---

## 19. Grade 9 Content Checklist (Per Subject)

For each subject, content must include (from Content Plan §6 + §3A):

- [ ] **Full spec coverage** — every topic/sub-topic from specification
- [ ] **Dual coding** — every concept has verbal + visual; visuals add information, don't duplicate
- [ ] **Key terms glossary** — all required terminology with definitions + consistent icons
- [ ] **Concept explanations** — core ideas with diagrams where helpful
- [ ] **Common misconceptions** — explicitly addressed
- [ ] **Quick check / recall** — 3–5+ items per sub-topic
- [ ] **Application practice** — case studies, scenarios, unfamiliar contexts
- [ ] **Evaluation practice** — "assess", "evaluate", "to what extent"
- [ ] **Model answers** — at least Grade 8/9 level for extended questions
- [ ] **Stretch content** — beyond grade 5 where spec allows
- [ ] **Option-aware** — filter by student's chosen options (Geography, History, RS, etc.)

---

## 20. Exam Board Spec References (Content Creation)

| Subject | Primary Spec | Key Links |
|---------|--------------|-----------|
| Maths | Edexcel 1MA1 | [Edexcel GCSE Maths](https://qualifications.pearson.com/en/qualifications/edexcel-gcses/mathematics-2015.html) |
| Biology | AQA 8461 | [AQA GCSE Biology](https://www.aqa.org.uk/subjects/science/gcse/biology-8461) |
| Chemistry | AQA 8462 | [AQA GCSE Chemistry](https://www.aqa.org.uk/subjects/science/gcse/chemistry-8462) |
| Physics | AQA 8463 | [AQA GCSE Physics](https://www.aqa.org.uk/subjects/science/gcse/physics-8463) |
| Combined | AQA 8464/8465 | [AQA Combined Science](https://www.aqa.org.uk/subjects/science/gcse/combined-science-trilogy-8464) |
| English Language | AQA 8700 | [AQA English Language](https://www.aqa.org.uk/subjects/english/gcse/english-language-8700) |
| English Literature | AQA 8702 | [AQA English Literature](https://www.aqa.org.uk/subjects/english/gcse/english-literature-8702) |
| History | AQA 8145 | [AQA History](https://www.aqa.org.uk/subjects/history/gcse/history-8145) |
| Geography | AQA 8035 | [AQA Geography](https://www.aqa.org.uk/subjects/geography/gcse/geography-8035) |
| Religious Studies | AQA 8062 | [AQA RS A](https://www.aqa.org.uk/subjects/religious-studies/gcse/religious-studies-a-8062) |
| Business | AQA 8132 | [AQA Business](https://www.aqa.org.uk/subjects/business/gcse/business-8132) |
| Psychology | AQA 8182 | [AQA GCSE Psychology](https://www.aqa.org.uk/subjects/psychology/gcse/psychology-8182) |
| Health | Edexcel 2HS01/02 | [Edexcel Health & Social Care](https://qualifications.pearson.com/en/qualifications/edexcel-gcses/health-and-social-care-2017.html) |
| Computer Science | AQA 8525 | [AQA Computer Science](https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525) |
| French | AQA 8658 | [AQA French](https://www.aqa.org.uk/subjects/languages/gcse/french-8658) |
| Spanish | AQA 8698 | [AQA Spanish](https://www.aqa.org.uk/subjects/languages/gcse/spanish-8698) |

---

## 21. Implementation Priority Matrix (Content Plan Aligned)

**P0 — Critical (Blocking "fully autonomous" claim):**

| # | Subject | Action | Content Scope |
|---|---------|--------|---------------|
| 1 | **Psychology** | Align to GCSE 8182 | Replace or supplement A-level content with GCSE topics |
| 2 | **Combined Science** | Add 6-paper flow | Combined-specific structure; 6 papers; synoptic combined questions |
| 3 | **French & Spanish** | Build Languages Hub | Vocab, grammar, themes, listening/reading/writing/speaking per spec |
| 4 | **Further Maths & Statistics** | Build or remove | Either full content per spec or remove from scope |

**P1 — High Impact (Adequate → Ultra Sufficient):**

| # | Subject | Action | Content Scope |
|---|---------|--------|---------------|
| 5 | **Geography** | Major expansion | +32 concepts, +265 terms, +102 quick checks, +20 skills tasks, +34 question lab, +8 case studies |
| 6 | **Religious Studies** | Major expansion | +3–10 concepts per religion, +25 scripture, +20 contrasting views, +55 quick checks, +philosophical arguments |
| 7 | **Business** | Expansion | +55 glossary, +77 quick checks, +10–15 case studies, +7 evaluation prompts |
| 8 | **Vocab Lab** | Complete modes | Meaning-from-word, use-in-sentence, upgrade-word, common-mistake hint |

**P2 — Full Coverage:**

| # | Subject | Action | Content Scope |
|---|---------|--------|---------------|
| 9 | **Health** | Expand Units 3–4 | +11 concepts, +58 terms, +70 quick checks, +8 case studies, +2–4 investigation scaffolds |
| 10 | **Compute Lab** | Audit & expand | Per-unit content density to implementation plan targets |
| 11 | **Science (Triple)** | Add stretch | 5–10 stretch concepts per subject; 8–10 Grade 9-style questions each |
| 12 | **English Literature** | Optional expansion | More poetry; 2–3 optional set texts |

**Estimated content effort (from Content Plan):**
- P0: 4–6 months (Languages, Combined, Psychology alignment, Further/Stats)
- P1: 3–4 months (Geography, RS, Business, Vocab)
- P2: 2–3 months (Health, Compute, Science stretch, English optional)

---

## 22. Diagram Master List (New Builds)

**Dual-coding principle:** Every diagram must pair with verbal content; the diagram should show structure, process, or relationships that words alone cannot. Labels on diagram, not floating. No redundant text that merely repeats the diagram.

Consolidated list of diagrams to add across all subjects:

| Subject | Diagram | Priority |
|---------|---------|----------|
| Maths | Ratio/scale, Loci, Transformations overlay, Graph with movable point | P2 |
| Biology | Cell, digestive system, heart, neuron, DNA, food web, carbon cycle, microscope | P0 |
| Chemistry | Atom, bonding, periodic table, electrolysis, energy profile, fractionating column | P0 |
| Physics | Force diagrams, waves, ray diagrams, pendulum, magnet, solar system | P0 |
| English | Structure diagram, comparison grid, AO mapping | P1 |
| Literature | Plot timeline, character map, theme web, context timeline | P1 |
| History | Timeline, source grid, interpretation comparison, cause-effect, essay plan | P1 |
| Geography | Map, cross-section, process diagrams, hydrograph, urban model, DTM | P1 |
| RS | Belief web, theme matrix, argument map | P1 |
| Business | Break-even, cash flow, org chart, product life cycle, supply/demand | P1 |
| Psychology | Multi-store model, working memory, brain, neuron | P0 |
| Health | Life stage timeline, Maslow, care value wheel | P2 |
| Compute | Flowchart, CPU, Fetch-execute, network, TCP/IP, Huffman tree | P1 |
| MFL | Tense timeline, conjugation grid, theme map | P0 |

---

## 23. Conclusion

To make this app **fully autonomous for Grade 9** and **the greatest education app on the planet** (content + design + function + learning science):

1. **Content (from Content Plan):** Fix mismatches (Psychology → GCSE 8182; Computer Science → AQA 8525); build French, Spanish, Further Maths, Statistics (or remove); add Combined Science 6-paper flow; expand Geography, RS, Business, Health, Compute to quantified targets; complete Vocab Lab modes; add stretch content to Science, History, English.
2. **Design consistency**: Every subject uses the same question presentation framework, feedback architecture, and progress system.
3. **Dual coding everywhere**: Words + images, never either alone; every concept has a visual that adds information; student-generated dual coding (draw, explain); icon + label for key terms.
4. **High-impact learning methods**: Retrieval practice, spaced repetition, elaborative interrogation, self-explanation, interleaving, worked examples, Feynman technique, metacognition — built into every subject (see §3A).
5. **Learning Superpowers**: Dual-Code Flip, Concept Bridge, Mistake Museum, Memory Palace, Explain Like I'm 11, Confidence Calibration, Interleave Roulette, Schema Builder — unique features that make learning stick.
6. **Cognitive load management**: Segmenting, pre-training, integrated text+diagram, no redundancy.
7. **Emotional design**: Growth mindset, safe failure, mastery framing, celebration.
8. **Diagram investment**: 50+ new diagrams across subjects; professional, print-ready, interactive where it adds value.
9. **Option awareness**: Geography, History, RS, Literature — student choices filter content from day one.
10. **Creative features**: Examiner's eye, evidence hunter, study evaluator, decision maker — not just "answer the question" but "think like an examiner."
11. **Content density**: Meet or exceed all quantified targets in §4–18 (Content Targets per subject).

**The vision:** A student opens the app, selects their subjects and options, and is guided through a personalised path from zero to Grade 9 — with no external resources required. Every interaction is designed using dual coding and evidence-based learning methods. This plan (design + function + learning science) and the Content Plan together define the complete blueprint for the greatest education app on the planet.

---

## 24. Implementation Status (Updated 13 Feb 2025)

### Cross-Cutting Features — Implemented

| Feature | Status | Location |
|---------|--------|----------|
| **Smart Study Path** | ✅ Implemented | `StudyPathContext.tsx`, `StudyPathDashboard.tsx` — exam date, weak topics, spaced due, adaptive pacing |
| **Spaced Review Queue** | ✅ Implemented | `SpacedReviewQueue.tsx` — "3 items due today" |
| **Interleave Roulette** | ✅ Implemented | `InterleaveRoulette.tsx` — random weak topic |
| **Question Presentation Framework** | ✅ Implemented | `QuestionPresentationFrame.tsx` — marks, command word, stimulus, answer area |
| **Mistake Museum** | ✅ Implemented | `MistakeMuseum.tsx` — common wrong answers with "why students think this" |
| **Confidence Calibration** | ✅ Implemented | `ConfidenceCalibration.tsx` — "How sure are you?" 1–5 |
| **Feedback Message** | ✅ Implemented | `FeedbackMessage.tsx` — growth mindset framing |
| **Dual-Code Flip** | ✅ Implemented | `DualCodeFlip.tsx` — diagram ↔ text retrieval |
| **Vocab Lab modes** | ✅ Implemented | Spell, Meaning from word, Use in sentence, Upgrade word — `EnglishVocabSetDetailPage`, `EnglishVocabSessionPage` |
| **Common mistake hint** | ✅ Implemented | Surfaces `common_misspellings` in Vocab Lab when wrong |

### Subject-Specific — Implemented

| Subject | Status | Notes |
|---------|--------|-------|
| **Combined Science** | ✅ 6-paper flow | `ScienceLabCombinedSciencePage.tsx` |
| **Psychology** | ✅ GCSE 8182 aligned | `psychologyHubData.ts` — Memory, Perception, Development, Research methods; Social influence, Language, Brain, Psychological problems |
| **Languages Hub** | ✅ Vocabulary mode | `LanguagesHubVocabularyPage.tsx` — spell, meaning, sentence; 30 words French, 28 Spanish |
| **gcseScope** | ✅ Updated | Combined Science 6 papers; Computer Science AQA 8525; Psychology GCSE 8182 |

### Learning Superpowers — All Implemented (Feb 2025)

| Feature | Status | Location |
|---------|--------|----------|
| **Concept Bridge** | ✅ Implemented | `ConceptBridge.tsx` — link two concepts, explain connection |
| **Memory Palace** | ✅ Implemented | `MemoryPalace.tsx` — place items in rooms, recall |
| **Explain Like I'm 11** | ✅ Implemented | `ExplainLikeIm11.tsx` — Feynman technique; embedded in Science Concept Lab |
| **Worked Example Fade** | ✅ Implemented | `WorkedExampleFade.tsx` — first steps given, student completes |
| **Compare & Contrast Matrix** | ✅ Implemented | `CompareContrastMatrix.tsx` — drag statements to Same/A/B |
| **Schema Builder** | ✅ Implemented | `SchemaBuilder.tsx` — drag concepts into hierarchy/flow |
| **Retrieval Before Relearn** | ✅ Implemented | `RetrievalBeforeRelearn.tsx` — "What do you remember?" before reveal |
| **Learning Superpowers Hub** | ✅ Implemented | `LearningSuperpowersPage.tsx` — `/learning-superpowers` with all 9 tools |
| **Integration** | ✅ Implemented | Subjects page card; Command Palette; Science Concept Lab (Explain Like I'm 11) |

### Learning Superpowers — Full Subject Integration (Feb 2025)

| Subject | Status | Notes |
|---------|--------|-------|
| **History** | ✅ Implemented | ConceptLabSuperpowersSection added to Concept Cards; HISTORY_SUPERPOWERS config (BA-cc1, AB-cc1, BC-cc1); Concept Bridge, Schema Builder, Compare & Contrast |
| **Business** | ✅ Expanded | Mistake Museum, Worked Example Fade (break-even); more concepts with superpowers |
| **Geography** | ✅ Expanded | Mistake Museum; nh-2 (plate tectonics Schema Builder), coast-1 (Retrieval) |
| **Health** | ✅ Expanded | Mistake Museum; c-2.1-hierarchy (Maslow Explain Like I'm 11) |
| **Compute** | ✅ Expanded | Mistake Museum; c-3.4.5-cpu, c-3.3.1-bases (Compare & Contrast) |
| **Religious Studies** | ✅ Expanded | Mistake Museum; chr-trinity, chr-nature-god (Explain Like I'm 11, Compare & Contrast) |
| **Command Palette** | ✅ Updated | Spaced Review Queue, Interleave Roulette added for access from any page |

### Remaining (Content & Future)

- **Geography, RS, Business** — Content expansion (concepts, terms, quick checks) per quantified targets
- **Health Units 3–4** — Expand content
- **Compute Lab** — Per-unit content density
- **French/Spanish** — Expand to 1,200+ (Foundation) / 1,700+ (Higher) words; add Grammar, Listening, Reading, Writing, Speaking, Translation modes
- **Further Maths & Statistics** — Build or remove from scope
- **Diagrams** — 50+ new diagrams per §22

---

## 25. Learning Superpowers Integration Plan — Every Subject, Greatest Learning Platform

**Purpose:** Ensure every subject uses the Learning Superpowers methods and other creative, evidence-based approaches so this app becomes the greatest learning platform on the planet. No subject left behind.

**Principle:** Learning Superpowers are not optional extras — they are the *default way* students engage with concepts. Each subject has a tailored mix; the hub homepage and concept labs surface them contextually.

**Subject-specific details:** Full integration plans, creative methods, and diagram priorities are now in each subject's section (§4.5–§18.4). This section provides the quick-reference matrix and implementation approach.

---

### 25.1 Integration Matrix — Superpower ↔ Subject (Quick Reference)

| Superpower | Maths | Science | English Lang | English Lit | History | Geography | RS | Business | Psychology | Health | Compute | MFL |
|------------|:-----:|:------:|:------------:|:-----------:|:-------:|:---------:|:--:|:--------:|:----------:|:------:|:-------:|:---:|
| **Concept Bridge** | ✓ | ✓✓ | ✓ | ✓✓ | ✓✓ | ✓ | ✓ | ✓ | ✓✓ | ✓ | ✓ | ✓ |
| **Memory Palace** | ✓ | ✓ | ✓ | ✓✓ | ✓✓ | ✓ | ✓✓ | ✓ | ✓ | ✓ | ✓ | ✓✓ |
| **Explain Like I'm 11** | ✓ | ✓✓ | ✓ | ✓✓ | ✓ | ✓ | ✓✓ | ✓ | ✓✓ | ✓ | ✓ | ✓ |
| **Worked Example Fade** | ✓✓ | ✓ | ✓✓ | ✓ | — | ✓ | ✓ | ✓✓ | ✓✓ | ✓ | ✓✓ | ✓ |
| **Compare & Contrast Matrix** | ✓ | ✓✓ | ✓✓ | ✓✓ | ✓✓ | ✓✓ | ✓✓ | ✓✓ | ✓✓ | ✓✓ | ✓ | ✓ |
| **Schema Builder** | ✓ | ✓✓ | ✓ | ✓✓ | ✓✓ | ✓✓ | ✓ | ✓✓ | ✓ | ✓✓ | ✓✓ | ✓ |
| **Retrieval Before Relearn** | ✓✓ | ✓✓ | ✓✓ | ✓ | ✓✓ | ✓✓ | ✓ | ✓ | ✓ | ✓ | ✓✓ | ✓✓ |
| **Dual-Code Flip** | ✓✓ | ✓✓ | ✓ | ✓ | ✓ | ✓✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Mistake Museum** | ✓✓ | ✓✓ | ✓✓ | ✓✓ | ✓ | ✓ | ✓ | ✓ | ✓✓ | ✓ | ✓ | ✓ |
| **Confidence Calibration** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Interleave Roulette** | ✓✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Spaced Review Queue** | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

*✓✓ = Primary / high impact for this subject; ✓ = Secondary / contextual use*

**Full subject-by-subject integration details:** See §4.5 (Maths), §5.5 (Science), §7.5 (English Language), §8.5 (English Literature), §9.5 (History), §10.5 (Geography), §11.5 (RS), §12.5 (Business), §13.5 (Psychology), §14.5 (Health), §15.5 (Compute), §16.5 (MFL).

---

### 25.2 Implementation Priority (Phased Rollout)

| Phase | Scope | Subjects | Effort |
|-------|-------|----------|--------|
| **P0 — Foundation** | Embed 2–3 superpowers per Concept Lab | Science (expand), Psychology, Business, Geography, Health, Compute | 2–3 weeks |
| **P1 — Deep integration** | Add subject-specific content (Mistake Museum items, Schema Builder configs, etc.) | All hubs with Concept Labs | 3–4 weeks |
| **P2 — Question Lab & creative** | Integrate into question feedback, add creative features | Maths, English, History, Science, Psychology | 4–6 weeks |
| **P3 — MFL & cross-cutting** | Languages Hub; Confidence Calibration everywhere; Interleave Roulette per subject | Languages, all subjects | 2–3 weeks |

---

### 25.3 Technical Approach

1. **Shared config:** Create `learningSuperpowersConfig.ts` — maps `subjectId` + `context` (concept-lab, question-lab, etc.) → which superpowers to show and with what default content.
2. **Concept Lab wrapper:** A reusable `ConceptLabWithSuperpowers` wrapper that:
   - Renders concept content
   - Injects superpowers based on config (e.g. after concept: Explain Like I'm 11, then optional Concept Bridge if linked concepts exist)
   - Accepts `subjectId`, `conceptId`, `linkedConcepts[]`, `misconceptions[]`
3. **Subject data enrichment:** Each subject's concept/glossary data gains optional fields: `explainLike11Model`, `conceptBridgePairs`, `compareContrastStatements`, `schemaBuilderConfig`, `mistakeMuseumItems`, `retrievalPrompt`.
4. **"Try a superpower" CTA:** From any concept or question, a subtle "Strengthen this — try Concept Bridge" or "Explain like you're 11" that opens the superpower with pre-filled context.

---

### 25.4 Success Criteria — Greatest Learning Platform

- [ ] **Every Concept Lab** uses at least 2 Learning Superpowers (Explain Like I'm 11 + one other)
- [ ] **Every subject** has at least 1 Compare & Contrast Matrix and 1 Schema Builder config
- [ ] **Maths, Science, English** have Mistake Museum items for top 5 misconceptions per major topic
- [ ] **Memory Palace** is available for list-heavy content (RS, Literature, History, MFL)
- [ ] **Retrieval Before Relearn** appears before revealing answers in concept flows
- [ ] **Worked Example Fade** appears in calculation/procedure-heavy subjects (Maths, Business, Compute, Science practicals)
- [ ] **Dual-Code Flip** appears wherever diagrams + text are core (Science, Geography, Compute, Maths)
- [ ] **Confidence Calibration** is available (or default) before high-stakes checks
- [ ] **Interleave Roulette** and **Spaced Review Queue** are accessible from every hub
- [ ] **Creative features** (examiner's eye, evidence hunter, study evaluator, etc.) are implemented per subject where specified

---

### 25.5 Content Requirements for Integration

To integrate superpowers, each subject needs **content**:

| Superpower | Content Needed |
|------------|----------------|
| **Explain Like I'm 11** | `modelExplanation` per concept (simple, Year 6-friendly) |
| **Concept Bridge** | Pairs of concepts + `modelConnection` (e.g. photosynthesis ↔ respiration) |
| **Compare & Contrast Matrix** | `conceptA`, `conceptB`, `statements[]` with `correctColumn` |
| **Schema Builder** | `nodes[]`, `slots[]`, `correctMapping`, `layout` (hierarchy/flow) |
| **Memory Palace** | `items[]` (e.g. 5 Pillars), `rooms[]` (default or custom) |
| **Worked Example Fade** | `steps[]` with `given: true/false`, `modelAnswer` for completion |
| **Retrieval Before Relearn** | `prompt`, `hint`, `content` (what to reveal after) |
| **Mistake Museum** | `items[]`: wrongAnswer, whyStudentsThinkThis, whyItsWrong, correctApproach |
| **Dual-Code Flip** | `diagram` (React node), `text`, `diagramPrompt`, `textPrompt` |

**Action:** Audit each subject's data files; add these fields where missing. Start with Science (already has Explain Like I'm 11), then Psychology, then Business/Geography/Health/Compute.

---

### 25.6 Creative Methods — Subject Reference

Subject-specific creative methods are documented in each subject's section (§4.6 Maths, §5.6 Science, §7.6 English Language, §8.6 English Literature, §9.6 History, §10.6 Geography, §11.6 RS, §12.6 Business, §13.6 Psychology, §14.6 Health, §15.6 Compute, §16.6 MFL).

**Principle:** Each subject should have at least 2–3 creative methods that go beyond "answer the question" — they make students *think like examiners*, *apply to unfamiliar contexts*, and *build transferable skills*.
