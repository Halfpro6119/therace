# LLM prompt: Generate a full Literature GuidePost pack

Use this prompt with an LLM to generate **one** full GuidePost pack for a GCSE English Literature task. The pack must include: **checklist**, **mark scheme**, **step-by-step method**, and **model answers (Grade 4, 6, 8, 9)**. Output should be examiner-faithful and match the standard in `ENGLISH_LITERATURE_GUIDEPOST.md`.

---

## Instructions to the LLM

You are an expert GCSE English Literature examiner and curriculum designer. Your task is to produce a **full GuidePost pack** for a single Literature question. The pack will be used in an app where students see a tickable checklist, mark scheme, step-by-step method, and model answers at four grades.

**Standards to follow:**
- **Examiner-faithful**: Describe what examiners actually reward (AO1/AO2/AO3) and what weak answers do. No vague advice.
- **Grade 9 thinking**: Checklist and models should encourage a critical voice, alternative interpretations, and conceptual focus—not a rigid "quote → technique → effect" formula.
- **Precise wording**: Use short, embedded quotations in model answers; link methods to the question focus; weave context in where relevant (don’t bolt it on).
- **Clear grade progression**:
  - **Grade 4**: Clear understanding, limited depth; simple vocabulary; some relevant quotes.
  - **Grade 6**: Clear argument, some method analysis; named techniques; coherent structure.
  - **Grade 8**: Sustained argument, strong AO2; development across the response; context linked to meaning.
  - **Grade 9**: Perceptive, conceptual, critical; alternative interpretations; confident critical voice; context strengthens argument.

**Task types and what to emphasise:**
- **Seen poetry comparison**: Compare both poems in every paragraph; no separate "Poem A then Poem B" blocks; comparative connectives; context for both poets.
- **Seen poetry single**: Focus on the question concept (e.g. conflict, power); imagery, structure, sound; context explains the poet’s message.
- **Unseen analysis (Q1)**: Interpretation of the poem; methods linked to the emotion/idea in the question; structural shifts; tentative language ("suggests", "implies").
- **Unseen comparison (Q2)**: Both poems in every paragraph; similarities and differences; judgement about which is more powerful or effective.
- **Set text (extract or whole)**: Use extract as springboard; track development across the play/novel; AO3 (context) woven in; precise quotations.

---

## INPUT (fill in for the task you want)

Provide the following about the task:

```
TASK_ID: [e.g. P-S01, P-C02, M-03, ACC-01]
TASK_TYPE: [seen-single | seen-comparison | unseen-analysis | unseen-comparison | text]
QUESTION_PROMPT: [The exact exam-style question, e.g. "How does the poet present power in Ozymandias?"]
FOCUS: [The theme/concept in the question, e.g. power, conflict, memory, identity, ambition, guilt]
TEXT(s): [Poem name(s) or set text, e.g. "Ozymandias" or "Exposure and Bayonet Charge" or "Macbeth" or "A Christmas Carol"]
SCOPE (if set text): [extract | whole | both]
```

**Example input:**

```
TASK_ID: P-S01
TASK_TYPE: seen-single
QUESTION_PROMPT: How does the poet present power in Ozymandias?
FOCUS: power
TEXT(s): Ozymandias (Shelley)
SCOPE (if set text): N/A
```

---

## OUTPUT FORMAT

Produce the pack in the following structure. Use the **exact** keys so the content can be dropped into code (e.g. TypeScript).

### 1. Checklist

A list of **Grade 9** tickable items. Each item has:
- **id**: `{TASK_ID}-{number}` (e.g. `P-S01-1`, `P-S01-2`, …). Use numbers 1, 2, 3, …
- **label**: One short sentence in first person, e.g. "I define what power means in this question".
- **ao**: Optional. One of `AO1`, `AO2`, `AO3` where it clearly fits (argument/evidence → AO1; methods → AO2; context → AO3).

Include roughly **10–14** items covering:
- Argument / focus on the question
- Evidence (short, embedded quotations; selecting for impact)
- Methods (language, structure, form where relevant; link to focus)
- Context (integrated, explains meaning)
- Grade 9 thinking (alternative interpretations, critical voice)

**Example (shortened):**

```json
"checklistItems": [
  { "id": "P-S01-1", "label": "I define what power means in this question", "ao": "AO1" },
  { "id": "P-S01-2", "label": "I use short, precise quotations", "ao": "AO1" },
  { "id": "P-S01-3", "label": "I analyse language AND structure", "ao": "AO2" },
  { "id": "P-S01-4", "label": "I link methods directly to power", "ao": "AO2" },
  { "id": "P-S01-5", "label": "Context is woven in, not bolted on", "ao": "AO3" },
  { "id": "P-S01-6", "label": "I include an alternative interpretation", "ao": "AO1" }
]
```

### 2. Mark scheme

One string (paragraphs allowed). Must include:
- **AO1 (12 marks)**: What top-band does (e.g. focus on question, embedded quotations, argument) and what weak answers do (e.g. retelling, long quotes).
- **AO2 (12 marks)**: What top-band does (analyse methods with purpose, structure/form, terminology) and what weak answers do (listing techniques, ignoring structure).
- **AO3 (6 marks)** (for seen poetry and set text): What top-band does (context woven in, linked to meaning) and what weak answers do (context paragraph, irrelevant dates).
- A single closing line listing **Weak:** [short list of weak habits].

Keep it concise (about 4–6 lines of prose plus the Weak line). Use newlines `\n` if outputting as a string for code.

**Example (shortened):**

```
AO1 (12 marks): Response & Evidence — Maintain focus on the question; use short, embedded quotations; develop a clear argument.
AO2 (12 marks): Language, Form & Structure — Analyse methods with purpose; link techniques to power; comment on structure and form.
AO3 (6 marks): Context — Woven in, not bolted on; linked to meaning; selective.

Weak: retelling the poem; long quotations; listing techniques; context paragraph.
```

### 3. Step-by-step method

One string. **Time-boxed** steps that a top student would follow (e.g. 2 min define concept, 5 min plan, 30 min write, 5 min upgrade). Use a format like:

- `Step 1 (2 min): ...`
- `Step 2 (5 min): ...`
- `Step 3 (5 min): ...`
- `Step 4 (30 min): ...`
- `Step 5 (5 min): ...`

Total about **45 minutes**. Be specific to the question (e.g. "Define power = political authority; control over others; temporary vs lasting").

**Example (shortened):**

```
Step 1 (2 min): Define power = political authority; arrogance; temporary vs lasting; legacy.
Step 2 (5 min): Choose 3 paragraph ideas — e.g. the statue and inscription; the contrast with the desert; Shelley's message.
Step 3 (5 min): Plan each paragraph: point about power; quotation; method; effect; context link.
Step 4 (30 min): Introduction (argument); 3–4 analytical paragraphs; short conclusion.
Step 5 (5 min): Tighten quotations; add one alternative reading; improve topic sentences.
```

### 4. Model answers

Four full-length model answers: **grade4**, **grade6**, **grade8**, **grade9**. Each is one string (multiple paragraphs allowed; use `\n\n` between paragraphs).

- **Length**: About **3–4 short paragraphs** for Grade 4; **3–4 paragraphs** for 6 and 8; **3–5 paragraphs** for 9. Exam-realistic (roughly 200–350 words for 4, up to 350–400 for 9).
- **Quotations**: Short and embedded (e.g. "the 'colossal wreck'" not long block quotes).
- **Grade 4**: Clear, simple, some method; may name one or two techniques.
- **Grade 6**: Clear argument; named techniques; some link to focus.
- **Grade 8**: Sustained argument; strong AO2; context linked to meaning.
- **Grade 9**: Perceptive and conceptual; alternative interpretation where appropriate; critical voice; context deepens argument.

**Example keys:**

```json
"modelAnswers": {
  "grade4": "...",
  "grade6": "...",
  "grade8": "...",
  "grade9": "..."
}
```

---

## Full output shape (for code)

Produce a single JSON object that matches this shape (so it can be pasted into `englishLiteratureGuidePostData.ts` or converted to it):

```json
{
  "checklistItems": [ { "id": "...", "label": "...", "ao": "AO1" | "AO2" | "AO3" }, ... ],
  "markSchemeDetail": "AO1...\nAO2...\nAO3...\n\nWeak: ...",
  "stepByStepMethod": "Step 1 (2 min): ...\nStep 2 (5 min): ...\n...",
  "modelAnswers": {
    "grade4": "Paragraph one...\n\nParagraph two...",
    "grade6": "...",
    "grade8": "...",
    "grade9": "..."
  }
}
```

If the LLM cannot output valid JSON, produce **four clear sections** in markdown (## Checklist, ## Mark scheme, ## Step-by-step method, ## Model answers) with the same content so a human can copy it into the codebase.

---

## Checklist before submitting

- [ ] Checklist has 10–14 items; each `id` is `{TASK_ID}-{number}`.
- [ ] Mark scheme names AO1, AO2, AO3 and says what top-band and weak answers do.
- [ ] Method is time-boxed and totals about 45 minutes; steps are specific to the question.
- [ ] Model answers are exam-length (roughly 200–400 words); Grade 9 has a critical voice and (where appropriate) an alternative interpretation.
- [ ] All quotations in model answers are short and embedded; no long block quotes.
- [ ] For comparison tasks, both poems are used in every paragraph in the models.
- [ ] For set texts, context (AO3) is mentioned in the mark scheme and in at least the Grade 8 and 9 models.

---

*Use this prompt once per task. The list of tasks that still need a pack is in `ENGLISH_TASKS_LACKING_FULL_PACK.md`.*
