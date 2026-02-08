# English Campus – Full Feature Specification

This document defines the **English Campus** as a standalone hub inside the app. It is entirely separate from other subject areas (e.g. Maths) and is built around the loop: **Task → Plan → Write → Mark → Improve → Track Progress**.

---

## 1. English Campus Structure Overview

English Campus has **three pillars**:

| Pillar | Description |
|--------|-------------|
| **Language Mode** | GCSE English Language Paper 1 & Paper 2 |
| **Literature Mode** | Poetry (Seen + Unseen) + Texts (novels/plays) |
| **Vocab Lab** | High-level vocabulary, spelling, and usage |

---

## 2. Entry Flow

### English Campus Home

- **Big mode cards** (primary navigation):
  - Language Mode
  - Literature Mode
  - Vocab Lab
- **Quick stats strip**:
  - Writing streak
  - Last score (AI or self-mark)
  - Current targets (e.g. “More structural shifts”, “More embedded quotations”)
- **“Continue where you left off”** button

---

## 3. Language Mode Structure

### A) Language Dashboard

- **Toggle:** Paper 1 / Paper 2
- **“Start a task”** – pulls from database
- **“My drafts”** – history + improvements
- **“Skills heatmap”** – AO + techniques

### B) Task Types (Database-driven)

**Paper 1 (Creative)**

- Description (image or scenario)
- Narrative (story prompt)

**Paper 2 (Transactional)**

- Speech / article / letter / leaflet / report
- Audience + purpose baked in

**Per task:**

- Prompt + stimulus
- Time recommendation
- Unique mark scheme for that task
- Grade 4–9 model answers

### C) Writing Workspace (Core Screen)

**Layout** (consistent so users learn it):

- Main writing editor
- Word count + paragraph count + timer
- **Buttons:**
  - Top Band Checklist (interactive tick list)
  - Model Answers (grades 4–9)
  - Mark Scheme (task-specific)
  - Optional: “Plan” panel toggle

### D) Checklists (Interactive)

**Two layers:**

1. **Quick checklist** – 10–12 key items  
2. **Deep checklist** – AO-linked  

**Behaviour:**

- Ticking items updates **“Top Band Coverage %”**
- Shows what’s missing before submission

### E) Marking & Feedback (Two paths)

**Self-mark mode**

- Student chooses level/band per AO
- Writes “What I did well / what I’ll improve”
- Saves reflection

**AI examiner mode**

- Outputs:
  - Band/level estimate + marks
  - AO breakdown (AO5/6 for Language writing)
  - Strengths + specific targets
  - 2–3 rewrite suggestions (“upgrade this paragraph by…”)

### F) Improve Loop

- After feedback:
  - **“Rewrite mode”** generates a new draft version
  - **Compare drafts** side-by-side
  - Track improvement over attempts

---

## 4. Literature Mode Structure

Literature splits into **three lanes**.

### A) Seen Poetry (Anthology Diary)

**Source:** Grade-9 task content, mark schemes, checklists, and model answers (Grades 4–9) are in `docs/ENGLISH_LITERATURE_GUIDEPOST.md` — Chunk 1 (comparison) and Chunk 2 (single poem).

**Poetry Library**

- Poems displayed like a journal/diary
- Each poem page includes:
  - Summary
  - Themes
  - Key quotes
  - Methods (language/structure/form)
  - Context notes
  - Student notes + highlights
  - “Compare with…” suggestions

**Compare Tasks**

- Choose poem A + poem B (or system recommends)
- Question appears exam-style
- Workspace includes:
  - Quote picker (from both poems)
  - Methods checklist (AO2)
  - Model paragraphs + model answers by grade

### B) Unseen Poetry

**Source:** Unseen Q1 (single poem) and Q2 (comparison) — mark schemes, checklists, methods, and Grade 4–9 models in `docs/ENGLISH_LITERATURE_GUIDEPOST.md` — Chunk 3.

**Unseen Task Flow**

1. Read poem
2. Quick annotation prompts (tone, imagery, shifts)
3. Write analysis
4. Optional comparison with second unseen poem

**Features:**

- “Planning box”
- “Methods bank” (metaphor, volta, caesura, etc.)
- Mark scheme button + models

### C) Texts (Novels/Plays)

**Source:** Macbeth (extract + whole text, ambition; Lady Macbeth character) — full GuidePost in `docs/ENGLISH_LITERATURE_GUIDEPOST.md` — Chunk 4. Extend with ACC, J&H, Inspector Calls using same structure.

**Texts Library**

- Macbeth, A Christmas Carol, Jekyll & Hyde, An Inspector Calls (extend later)
- Each text page:
  - Characters
  - Themes
  - Key quote bank
  - Context + writer intentions
  - Common question types

**Text Tasks**

- Exam-style prompts (character/theme/extract)
- Workspace includes:
  - Extract panel (if used)
  - Quote bank toggle
  - AO checklist (AO1/AO2/AO3)
  - Model responses grade 4–9

### D) Quotation Lab (Lit Drill)

A practice sub-mode:

- Recall quote from prompt
- Fill missing words
- Match quote → theme
- Identify method in a quote
- Spaced repetition based on weaknesses

---

## 5. Vocab Lab Structure

### A) Vocab Home

- Choose **“Theme pack”** (Power, Conflict, Identity, Persuasion, etc.)
- Choose **mode**:
  - Spell from meaning
  - Meaning from word
  - Use it in a sentence (optional)
  - Upgrade word (basic → ambitious)

### B) Core Mode: Spell from Definition

**Flow:**

1. Definition shown
2. Student types spelling
3. Instant feedback
4. “Common mistake” hint (silent letters, doubled consonants, etc.)

### C) Tracking

- Weak words list
- Daily set
- Mastery per theme

---

## 6. Shared Systems Across All Modes

### A) Task Generator (Database)

- Language/Lit tasks selected from a **fixed bank**
- Filter by:
  - Paper
  - Difficulty band
  - Focus (description / persuasion / comparison / character)

### B) Model Answer System

Every task has:

- Grade 4 / 6 / 8 / 9 samples
- Highlighted features + comments

### C) Mark Scheme System

Every task includes:

- Rubric view (bands)
- AO breakdown
- “What this question rewards” summary

### D) Progress & Analytics

Track:

- Streaks (writing consistency)
- AO heatmaps (AO1/2/3 or AO5/6)
- Checklist completion patterns
- Improvements over drafts

### E) “Targets” System

- After marking, save **1–3 targets** (e.g. “Embed quotations”, “Analyse effects, not just spot techniques”, “Use structural shifts”)
- Targets appear in the next task sidebar

---

## 7. Recommended Screen Map

```
English Campus
├── Home
├── Language
│   ├── Dashboard
│   ├── Task Player (write)
│   ├── Results (AO breakdown)
│   └── Draft History / Compare drafts
├── Literature
│   ├── Poetry Diary
│   ├── Compare Task Player
│   ├── Unseen Task Player
│   ├── Texts Library
│   └── Quotation Lab
└── Vocab Lab
    ├── Theme packs
    ├── Practice player
    └── Weak words
```

---

## 8. “Top Notch” Differentiators

If these **five** are included, the product is positioned as elite:

1. **Interactive checklists tied to AOs** – users see coverage and gaps before submitting.
2. **Model answers by grade with highlights** – clear exemplars at 4, 6, 8, 9 with annotations.
3. **Dual marking (self + AI)** – reflection plus examiner-style feedback.
4. **Draft improvement + compare versions** – rewrite flow and side-by-side comparison.
5. **AO heatmaps + target system** – visual progress and persistent, actionable targets.

---

*This spec defines the full English Campus functionality as a separate section of the app.*
