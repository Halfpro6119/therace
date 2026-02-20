# AQA GCSE French & Spanish (8658/8698) — Full Implementation Plan

**Purpose:** Make the Languages Hub fully autonomous for Grade 9 — students use only this app to achieve top grades in GCSE French and Spanish.  
**Specifications:** AQA 8658 (French), AQA 8698 (Spanish) | **Papers:** 4 (Listening, Speaking, Reading, Writing) | **Tiers:** Foundation, Higher  
**Date:** February 2025.

**Full design context:** See `FULLY_AUTONOMOUS_GRADE_9_DESIGN_AND_FUNCTIONAL_PLAN.md` §16 and `FULLY_AUTONOMOUS_GRADE_9_CONTENT_PLAN.md` §3.11.

---

## 1. AQA MFL Topic List (Summary)

### 1.1 Assessment Structure

| Paper | Title | Foundation | Higher | Weight |
|-------|--------|------------|--------|--------|
| **Paper 1** | Listening | 35 min, 40 marks | 45 min, 50 marks | 25% |
| **Paper 2** | Speaking | 7–9 min, 60 marks | 10–12 min, 60 marks | 25% |
| **Paper 3** | Reading | 45 min, 60 marks | 1 hour, 60 marks | 25% |
| **Paper 4** | Writing | 1 hour, 50 marks | 1 hr 15 min, 60 marks | 25% |

**Tier:** Students take all four papers at same tier (Foundation = grades 1–5; Higher = grades 4–9).

### 1.2 Themes (DfE-defined, AQA-aligned)

| Theme | Sub-topics |
|-------|------------|
| **Theme 1: Identity and culture** | Me, my family and friends; Technology in everyday life; Free-time activities; Customs and festivals |
| **Theme 2: Local, national, international and global areas of interest** | Home, town, neighbourhood and region; Social issues; Global issues; Travel and tourism |
| **Theme 3: Current and future study and employment** | My studies; Life at school/college; Education post-16; Jobs, career choices and ambitions |

### 1.3 Paper-Specific Task Types

**Listening (Paper 1):** Section A (questions in English); Section B (questions in target language). MC, short answer, gap-fill.

**Speaking (Paper 2):** Role-play (15 marks); Photo card (15 marks); General conversation (30 marks).

**Reading (Paper 3):** Section A (English questions); Section B (target language questions); Section C (translation TL→EN: 35+ words Foundation, 50+ Higher).

**Writing (Paper 4):**  
- **Foundation:** Photo (4 sentences, 8 marks); Short passage (40 words, 16 marks); Translation EN→TL (35+ words, 10 marks); Structured writing (90 words, 16 marks).  
- **Higher:** Structured writing (90 words, 16 marks); Open-ended (150 words, 32 marks); Translation EN→TL (50+ words, 12 marks).

---

## 2. Full Content Targets (from Content Plan)

| Content Type | Target (per language) | Current | Gap |
|--------------|------------------------|---------|-----|
| Vocabulary (Foundation) | 1,200+ words | French ~272, Spanish ~264 | ~930+ each |
| Vocabulary (Higher) | 1,700+ words | Included in above | Extend Foundation set |
| Grammar concepts | Full spec (tenses, agreement, structures) | 0 | Full build |
| Theme content | 3 themes × 4 topics | Themes defined | Sub-topic content |
| Listening practice | 20+ tasks (F + H) | 0 | 20+ |
| Reading practice | 20+ tasks | 0 | 20+ |
| Writing tasks | 15+ (photo, 40, 90, 150 word) | 0 | 15+ |
| Speaking prep | Role-play, photo card, conversation prompts | 0 | Full build |
| Translation | EN↔TL (sentence + passage) | 0 | Full build |

---

## 3. Grammar Scope (Full Spec)

### 3.1 French (AQA 8658)

**Tenses:** Present, perfect (passé composé), imperfect, future, conditional, pluperfect (limited).  
**Structures:** Negation (ne…pas, ne…jamais, etc.); questions (intonation, est-ce que, inversion); comparatives/superlatives; relative pronouns (qui, que, où); direct/indirect object pronouns; reflexive verbs; après + infinitive; avant de + infinitive; si + present → future; si + imperfect → conditional.  
**Agreement:** Adjective agreement (gender, number); past participle with être/avoir.  
**Key verbs:** avoir, être, aller, faire, pouvoir, vouloir, devoir, savoir, connaître; regular -er, -ir, -re.

### 3.2 Spanish (AQA 8698)

**Tenses:** Present, preterite, imperfect, future, conditional, perfect (haber + past participle).  
**Structures:** Negation (no, nunca, etc.); questions (¿…?, qué, cuándo, dónde, etc.); comparatives/superlatives; relative pronouns (que, quien, donde); direct/indirect object pronouns; reflexive verbs; por/para; ser/estar; gustar-type verbs.  
**Agreement:** Adjective agreement (gender, number); past participle agreement.  
**Key verbs:** ser, estar, tener, ir, hacer, poder, querer, deber, saber; regular -ar, -er, -ir; key irregulars (ir, ser, estar, tener, etc.).

---

## 4. Design Principles for Effective & Engaging Learning

- **Four skills parity:** Listening, Reading, Writing, Speaking — each has dedicated practice modes. No skill neglected.
- **Tier-aware:** Foundation vs Higher content clearly labelled; students can filter or be recommended by tier.
- **Theme-first navigation:** Content organised by Identity, Local/national/global, Future — matches exam structure.
- **Grammar in context:** Grammar taught via theme vocabulary and example sentences; not isolated drills only.
- **Exam-style from day one:** Task types mirror real papers (photo card, 40-word, 90-word, 150-word, role-play, translation).
- **Dual coding:** Tense timeline, conjugation grid, theme map — every concept has visual + verbal.
- **Reuse app patterns:** Mirror Vocab Lab, Science Lab, English Campus — config-driven content, progress, gating.

---

## 5. Proposed Learning Hub: Languages Hub (Extended)

**Current:** `/languages-hub` → home; `/languages-hub/:lang` → language choice; `/languages-hub/:lang/vocabulary` → vocabulary mode (spell, meaning, sentence).

**Target structure:**

| Route | Purpose |
|-------|---------|
| `/languages-hub` | Home — choose French or Spanish |
| `/languages-hub/:lang` | Language dashboard — Vocabulary, Grammar, Listening, Reading, Writing, Speaking, Translation |
| `/languages-hub/:lang/vocabulary` | Vocabulary Lab — theme filter, tier filter, modes (spell, meaning, sentence, upgrade) |
| `/languages-hub/:lang/grammar` | Grammar Lab — tenses, structures, conjugation, Mistake Museum |
| `/languages-hub/:lang/listening` | Listening Lab — tasks by theme/tier; audio + questions |
| `/languages-hub/:lang/reading` | Reading Lab — texts + questions; vocabulary lookup |
| `/languages-hub/:lang/writing` | Writing Lab — photo, 40-word, 90-word, 150-word; checklist, model answers |
| `/languages-hub/:lang/speaking` | Speaking Prep — role-play prompts, photo cards, conversation themes |
| `/languages-hub/:lang/translation` | Translation Lab — EN→TL, TL→EN; sentence + passage |

---

## 6. Learning Modes (Effective & Engaging)

### 6.1 Vocabulary Lab (Existing — Extend)

**Current:** Spell from meaning, meaning from word, use in sentence (partial).  
**Extend:**
- **Spell from meaning:** ✅ Implemented — maintain; add common mistake hint (e.g. "Many students spell *famille* with one *l*").
- **Meaning from word:** Add to session UI (currently types only).
- **Use in sentence:** Word → student writes sentence in target language → compare to model.
- **Upgrade word:** Basic word → suggest better (e.g. *très bien* → *excellent*).
- **Theme filter:** Identity, Local/national/global, Future.
- **Tier filter:** Foundation only / Foundation + Higher.
- **Spaced repetition:** "You're due for [word]" — algorithm-driven.

**Content:** Expand to 1,200+ Foundation, 1,700+ Higher per language. Source: AQA vocabulary lists (DfE-defined).

### 6.2 Grammar Lab (New)

**Purpose:** Build understanding of tenses, agreement, and structures before applying in writing/speaking.

**Content per concept:**
- **Core idea:** When to use (e.g. "Passé composé = completed action in the past").
- **Conjugation grid:** Visual table (je, tu, il/elle, nous, vous, ils/elles).
- **Example sentences:** 2–3 per tense/structure.
- **Common errors:** Mistake Museum — "Many students write X; correct is Y because…"
- **Dual-Code Flip:** Tense timeline + example; "When do we use this?"

**Coverage:** Present, perfect, imperfect, future, conditional (French); present, preterite, imperfect, future, conditional (Spanish); key structures (negation, questions, pronouns, comparatives).

**Modes:**
- **Conjugation drill:** Given pronoun + infinitive → type conjugated form.
- **Choose the tense:** Given sentence in English → select correct tense.
- **Sentence builder:** Drag words to form correct sentence (grammar focus).
- **Mistake Museum:** "What's wrong with this?" — identify and correct.

### 6.3 Listening Lab (New)

**Purpose:** Practise understanding spoken language; exam-style tasks.

**Content:**
- **Audio clips:** 20+ tasks per language (Foundation + Higher).
- **Question types:** MC, short answer, gap-fill, true/false.
- **Transcript toggle:** After attempt — reveal transcript for self-check.
- **Theme filter:** Identity, Local, Future.
- **Playback:** Play, pause, replay (per question or full clip).

**Technical:** Pre-recorded audio (MP3/WebM) or TTS for lower-fidelity; store in `public/audio/mfl/` or use CDN.

**Coverage:** 10+ Foundation, 10+ Higher per language.

### 6.4 Reading Lab (New)

**Purpose:** Practise understanding written language; exam-style tasks.

**Content:**
- **Texts:** 20+ passages per language (Foundation + Higher).
- **Question types:** MC, short answer, gap-fill, "find the phrase", inference.
- **Vocabulary lookup:** Hover/tap word → meaning (optional).
- **Theme filter:** Identity, Local, Future.
- **Translation (TL→EN):** Integrated — some tasks are translation from passage.

**Coverage:** 10+ Foundation, 10+ Higher per language.

### 6.5 Writing Lab (New)

**Purpose:** Practise photo, 40-word, 90-word, 150-word tasks; checklist and model answers.

**Task types:**
| Task | Foundation | Higher | Marks |
|------|------------|--------|-------|
| Photo (4 sentences) | ✓ | — | 8 |
| Short passage (40 words) | ✓ | — | 16 |
| Structured (90 words) | ✓ | ✓ | 16 |
| Open-ended (150 words) | — | ✓ | 32 |
| Translation EN→TL | ✓ (35+ words) | ✓ (50+ words) | 10/12 |

**Features:**
- **Photo card:** Image + 4 bullet prompts → student writes 4 sentences.
- **40-word:** 4 bullet points → ~40 words total.
- **90-word:** 4 detailed bullets → ~90 words.
- **150-word:** 2 detailed bullets → ~150 words.
- **Word count:** Live counter.
- **Checklist:** Tense, opinion, reason, connective — tick before submit.
- **Model answers:** Grade 4, 6, 8, 9 samples per task.
- **AI feedback (future):** Band estimate, targets, rewrite suggestions.

**Content:** 15+ writing tasks per language (mix of photo, 40, 90, 150).

### 6.6 Speaking Prep (New)

**Purpose:** Prepare for role-play, photo card, conversation — written prep (no live recording initially).

**Content:**
- **Role-play prompts:** 15+ scenarios per language (e.g. "Buy a train ticket", "Order in a café").
- **Photo cards:** 15+ images + prompts (Foundation + Higher).
- **Conversation themes:** Identity, Local, Future — sub-topics with suggested questions and model answers.
- **Preparation time:** Simulate 12 min prep (Higher) — show card, prepare notes, then "practise" (written or verbal).

**Modes:**
- **Role-play builder:** Given scenario, student writes likely responses.
- **Photo card prep:** Given image + questions, student writes answers.
- **Conversation prompt bank:** "What do you think about…?" — model answers.

**Future:** Recording (browser MediaRecorder) for self-assessment; AI pronunciation feedback (stretch).

### 6.7 Translation Lab (New)

**Purpose:** Practise EN→TL and TL→EN; sentence and passage level.

**Content:**
- **EN→TL:** 50+ sentences (Foundation), 30+ passages (35–50 words).
- **TL→EN:** 50+ sentences, 30+ passages.
- **Theme filter:** Identity, Local, Future.
- **Tier:** Foundation (shorter) vs Higher (longer, more complex).

**Features:**
- **Type translation:** Student types in target language (or English for TL→EN).
- **Model translation:** Reveal after attempt.
- **Common errors:** "Many students translate X as Y; correct is Z because…"
- **Grammar focus:** Highlight key structures (e.g. "This sentence needs the perfect tense").

---

## 7. Content Plan (By Mode)

| Mode | French | Spanish | Notes |
|------|--------|---------|------|
| **Vocabulary** | 1,200 F / 1,700 H | 1,200 F / 1,700 H | Expand from ~270/264 |
| **Grammar concepts** | 25+ | 25+ | Tenses, structures, agreement |
| **Listening tasks** | 20+ | 20+ | 10 F + 10 H each |
| **Reading tasks** | 20+ | 20+ | 10 F + 10 H each |
| **Writing tasks** | 15+ | 15+ | Photo, 40, 90, 150 |
| **Role-play prompts** | 15+ | 15+ | By theme |
| **Photo cards** | 15+ | 15+ | F + H |
| **Conversation themes** | 3 × 4 | 3 × 4 | Full coverage |
| **Translation (EN→TL)** | 80+ | 80+ | Sentence + passage |
| **Translation (TL→EN)** | 80+ | 80+ | Sentence + passage |

---

## 8. Technical Implementation Outline

### 8.1 Routes and Entry

- **Existing:** `/languages-hub`, `/languages-hub/:lang`, `/languages-hub/:lang/vocabulary`.
- **Add:** `/languages-hub/:lang/grammar`, `/languages-hub/:lang/listening`, `/languages-hub/:lang/reading`, `/languages-hub/:lang/writing`, `/languages-hub/:lang/speaking`, `/languages-hub/:lang/translation`.
- **Language dashboard:** Update `LanguagesHubLanguagePage.tsx` to show all mode cards (Vocabulary ✅, Grammar, Listening, Reading, Writing, Speaking, Translation).

### 8.2 Data and Types

**Types** (e.g. `src/types/mflLab.ts`):
- `MflGrammarConcept`, `MflListeningTask`, `MflReadingTask`, `MflWritingTask`, `MflRolePlayPrompt`, `MflPhotoCard`, `MflTranslationTask`.
- Extend `MflVocabItem` with `commonMistake?: string`, `example?: string`.

**Config** (extend `src/config/languagesHubData.ts` or new files):
- `GRAMMAR_CONCEPTS_FRENCH`, `GRAMMAR_CONCEPTS_SPANISH` — tense/structure, conjugation, examples, misconception.
- `LISTENING_TASKS_FRENCH`, `LISTENING_TASKS_SPANISH` — audio URL, transcript, questions, theme, tier.
- `READING_TASKS_FRENCH`, `READING_TASKS_SPANISH` — text, questions, theme, tier.
- `WRITING_TASKS_FRENCH`, `WRITING_TASKS_SPANISH` — type, prompt, bullets, model answers (G4/6/8/9).
- `ROLE_PLAY_PROMPTS_FRENCH`, `ROLE_PLAY_PROMPTS_SPANISH` — scenario, prompts, model.
- `PHOTO_CARDS_FRENCH`, `PHOTO_CARDS_SPANISH` — image URL, questions, model answers.
- `TRANSLATION_TASKS_FRENCH`, `TRANSLATION_TASKS_SPANISH` — direction, source, model, theme, tier.

### 8.3 Storage and Progress

- **Progress:** Per language: vocabulary mastery %, grammar concepts completed, listening/reading/writing/speaking/translation tasks completed.
- **Gating:** Optional — unlock Writing Lab when Vocabulary + Grammar basics done.
- Reuse `storage.ts`, `subjectStats.ts` patterns.

### 8.4 Specialised Components

- **Audio player:** `<audio>` with play/pause/replay; transcript toggle.
- **Writing workspace:** Similar to `EnglishWritingWorkspacePage` — editor, word count, checklist, model answers.
- **Sentence builder:** Drag-and-drop words to form sentence (Schema Builder style).
- **Conjugation grid:** Interactive table — fill-in or reveal.
- **Tense timeline:** Visual diagram (present | past | future) — Dual-Code Flip.

### 8.5 Reuse from Existing Codebase

- **Vocabulary:** `LanguagesHubVocabularyPage`, `getMflVocab`, `VOCAB_FRENCH`, `VOCAB_SPANISH`.
- **Flashcard/Spell:** Similar to Vocab Lab spell-from-meaning.
- **Writing:** `EnglishWritingWorkspacePage` — layout, word count, checklist.
- **Question types:** MC, short answer — reuse from Science Lab, QuizPlayer.
- **Learning Superpowers:** Memory Palace (theme vocab), Mistake Museum (grammar), Retrieval Before Relearn (vocab), Dual-Code Flip (tense timeline).

---

## 9. Phasing (Suggested)

| Phase | Scope | Outcome |
|-------|--------|---------|
| **1** | Extend vocabulary to 500+ per language; add meaning-from-word and use-in-sentence to session UI | Vocabulary Lab complete for core modes |
| **2** | Grammar Lab: types, config; 10 concepts French, 10 Spanish; conjugation grid, tense timeline diagrams | Grammar Lab skeleton |
| **3** | Vocabulary expansion to 1,200 Foundation (per language) | Foundation vocab target met |
| **4** | Listening Lab: 5 tasks French, 5 Spanish (Foundation); audio + questions UI | Listening Lab proof of concept |
| **5** | Reading Lab: 5 tasks French, 5 Spanish (Foundation); text + questions UI | Reading Lab proof of concept |
| **6** | Writing Lab: 5 tasks per language (photo, 40-word, 90-word); workspace, checklist, model answers | Writing Lab proof of concept |
| **7** | Speaking Prep: role-play prompts, photo cards (5 each); conversation theme content | Speaking Prep skeleton |
| **8** | Translation Lab: 20 EN→TL, 20 TL→EN per language | Translation Lab proof of concept |
| **9** | Expand all modes to targets (20+ listening, 20+ reading, 15+ writing, 15+ role-play, 15+ photo, 80+ translation each) | Content targets met |
| **10** | Higher tier content; vocabulary to 1,700; polish, progress, "next step" recommendations | Full Grade 9 ready |

---

## 10. Diagrams Required (from Design Plan §16.3)

| Diagram | Priority | Use Case |
|---------|----------|----------|
| Tense timeline | P0 | Present, past, future — when to use each |
| Verb conjugation grid | P0 | Regular -er/-ir/-re (FR); -ar/-er/-ir (ES) |
| Theme map | P0 | Identity, Local, Future — sub-topics |
| Question word poster | P1 | Qui, quand, où (FR); Quién, cuándo, dónde (ES) |
| Comparison grid | P1 | por/para (ES); similar confusions (FR) |

---

## 11. Learning Superpowers Integration (from Design Plan §16.5)

| Where | Superpower | Content / Trigger |
|-------|------------|-------------------|
| Theme vocabulary | Memory Palace | "Place each word in a room" (Identity, Local, Future) |
| Vocabulary drill | Retrieval Before Relearn | "Before we show you — what does this mean?" |
| Grammar | Dual-Code Flip | Tense timeline + example; "When do we use this?" |
| Sentence builder | Schema Builder | Drag words to form correct sentence |
| Common errors | Mistake Museum | "Many students write X; the correct form is Y because…" |
| Concrete examples | Varied practice | Every grammar point: "Example 1…", "Example 2…", "Now you try" |

---

## 12. Creative Methods (from Design Plan §16.6)

| Method | Purpose |
|--------|---------|
| **Shadow speaking** | Listen and repeat; fluency practice (future: with audio) |
| **Context cards** | Theme (Identity, Local, Future); sub-topics; vocab + example sentences |
| **Exam-style tasks** | Foundation vs Higher; 4 papers each; full task types |
| **Common error trap** | "Many students write X; the correct form is Y because…" |

---

## 13. References

- [AQA GCSE French 8658 — Specification at a glance](https://www.aqa.org.uk/subjects/languages/gcse/french-8658/specification-at-a-glance)
- [AQA GCSE Spanish 8698 — Specification at a glance](https://www.aqa.org.uk/subjects/languages/gcse/spanish-8698/specification-at-a-glance)
- [AQA GCSE French — Subject content](https://www.aqa.org.uk/subjects/languages/gcse/french-8658/subject-content)
- [AQA GCSE Spanish — Subject content](https://www.aqa.org.uk/subjects/languages/gcse/spanish-8698/subject-content)
- In-repo: `src/config/languagesHubData.ts`, `src/pages/languages/`, `FULLY_AUTONOMOUS_GRADE_9_DESIGN_AND_FUNCTIONAL_PLAN.md` §16, `FULLY_AUTONOMOUS_GRADE_9_CONTENT_PLAN.md` §3.11

---

*This plan gives a complete map from the AQA French/Spanish specifications to a structured, engaging Languages Hub that covers all four skills, grammar, vocabulary, and exam-style tasks, aligning with the app's existing patterns and the Grade 9 design philosophy.*
