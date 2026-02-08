# English Literature — Full GuidePost System (14 Tasks)

Literature is structured exactly how top students are trained and how examiners think. No shortcuts, no vague advice, no "quote → technique → effect" formula.

**Implementation:** Full pack content (checklist, mark scheme, step-by-step method, model answers Grade 4/6/8/9) lives in `src/config/englishLiteratureGuidePostData.ts` and is consumed by the Literature workspace.

---

## Overview

| Pillar | Tasks | Content |
|--------|-------|---------|
| **Seen Poetry (Anthology)** | P-S01, P-S03, P-C02, P-C03 | Single poem + comparison |
| **Unseen Poetry** | UP-02, UP-C02 | Analysis (Q1) + Comparison (Q2) |
| **Texts (Novels & Plays)** | M-03, ACC-01–03, JH-01–02, AIC-01–02 | Macbeth, A Christmas Carol, Jekyll & Hyde, An Inspector Calls |

Each task includes: examiner-faithful mark scheme (AO1/AO2/AO3), Grade 9 checklist, step-by-step method (~45 min), and full-length model answers (Grades 4, 6, 8, 9).

---

## Full Task List (14 Tasks)

### Seen Poetry — Single Poem

| ID | Poem | Question | Focus |
|----|------|----------|-------|
| **P-S01** | Ozymandias | How does the poet present power in Ozymandias? | power |
| **P-S03** | Kamikaze | How does the poet present memory in Kamikaze? | memory |

### Seen Poetry — Comparison

| ID | Poems | Question | Focus |
|----|-------|----------|-------|
| **P-C02** | Exposure, Bayonet Charge | Compare how conflict is presented in Exposure and Bayonet Charge. | conflict |
| **P-C03** | Checking Out Me History, Kamikaze | Compare how identity is explored in Checking Out Me History and Kamikaze. | identity |

### Unseen Poetry

| ID | Type | Question | Focus |
|----|------|----------|-------|
| **UP-02** | Analysis | How does the poet use language and structure to create a sense of tension? | language and structure, tension |
| **UP-C02** | Comparison | Compare how imagery is used in both poems. | imagery |

### Texts — Macbeth

| ID | Scope | Question | Focus |
|----|-------|----------|-------|
| **M-03** | whole | How does Shakespeare present guilt in the play as a whole? | guilt |

### Texts — A Christmas Carol

| ID | Scope | Question | Focus |
|----|-------|----------|-------|
| **ACC-01** | extract | How does Dickens present Scrooge as selfish in this extract? | Scrooge, selfishness |
| **ACC-02** | whole | How does Dickens present the theme of redemption? | redemption |
| **ACC-03** | whole | How does Dickens use the Cratchits to convey his message? | Cratchits, message |

### Texts — Jekyll and Hyde

| ID | Scope | Question | Focus |
|----|-------|----------|-------|
| **JH-01** | both | How does Stevenson present Hyde as frightening? | Hyde, fear |
| **JH-02** | whole | How does Stevenson explore duality through Jekyll? | duality |

### Texts — An Inspector Calls

| ID | Scope | Question | Focus |
|----|-------|----------|-------|
| **AIC-01** | whole | How does Priestley present responsibility in the play? | responsibility |
| **AIC-02** | whole | How does Priestley use the Inspector to convey his ideas? | Inspector, ideas |

---

## Standards (All Tasks)

- **Examiner-faithful** — What examiners reward, not vague advice
- **Short embedded quotations only** — No long block quotes
- **Methods linked to focus** — Techniques tied to the question
- **Context woven in** — Never bolted on
- **Grade 9** — Conceptual thinking + alternative interpretations
- **Comparison tasks** — Both poems in every paragraph

---

## Per-Task Pack Structure

Every task pack has four components:

1. **checklistItems** — 10–14 tickable Grade 9 items (AO1/AO2/AO3)
2. **markSchemeDetail** — AO1 (12), AO2 (12), AO3 (6) breakdown; top-band vs weak
3. **stepByStepMethod** — Time-boxed steps (total ~45 min)
4. **modelAnswers** — grade4, grade6, grade8, grade9 (full-length exemplars)

---

## App Integration

- **Seen Poetry** → `/english-campus/literature/poetry` lists P-S01, P-S03, P-C02, P-C03
- **Unseen Poetry** → `/english-campus/literature/unseen` lists UP-02, UP-C02
- **Set Texts** → `/english-campus/literature/texts` lists Macbeth, ACC, J&H, Inspector Calls tasks
- **Workspace** → `/english-campus/literature/task/:taskId` shows checklist, mark scheme, method, model answers when GuidePost exists

Tasks with full GuidePost content display a "GuidePost" badge. The workspace uses task-specific checklist, mark scheme, step-by-step method, and model answers when available.

---

*This document is the single source of truth for Literature GuidePost tasks. See `ENGLISH_CAMPUS_SPEC.md` §4 Literature Mode for the full English Campus structure.*
