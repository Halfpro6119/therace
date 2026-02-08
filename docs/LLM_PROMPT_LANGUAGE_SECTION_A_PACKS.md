# LLM Prompt: Generate Language Section A Reading Packs (All 8 Tasks)

**Purpose:** Copy this entire prompt into any LLM. It will produce full examiner-pack content (checklist, mark scheme, step-by-step method, model answers Grade 4/6/8/9) for all 8 GCSE English Language Section A reading tasks. You can paste the output straight back for integration into the codebase.

---

## Instructions to the LLM

You are an expert GCSE English Language examiner. Produce **full examiner packs** for all 8 Language Section A reading tasks below. Each pack has four components:

1. **checklistItems** — 8–12 tickable items (Grade 9 focus)
2. **markSchemeDetail** — What top-band and weak answers do; which AOs apply
3. **stepByStepMethod** — Time-boxed steps (total ~12–15 min per question; these are short responses)
4. **modelAnswers** — grade4, grade6, grade8, grade9 (short paragraph responses, not full essays)

**Critical differences from Literature/40-mark writing:**
- Section A questions are **8 or 12 marks**; responses are **1–3 paragraphs** (approx. 80–200 words).
- **AOs vary by question:** AO1 (read/understand), AO2 (analyse language/structure), AO3 (compare writers), AO4 (evaluate). Not AO5/AO6.
- Model answers must be **short** — what a student would write in 12–15 minutes.
- L1 questions = single source/extract. L2 questions = two sources (Source A and Source B).

**Standards:**
- **Grade 4:** Clear point, one simple method or quote, basic effect.
- **Grade 6:** Clear argument, 1–2 methods named, some evidence, coherent.
- **Grade 8:** Sustained analysis, methods linked to effect, evaluative where needed.
- **Grade 9:** Perceptive, precise terminology, subtle effects; alternative reading where appropriate.

---

## THE 8 TASKS

### Task 1: L1-A01
- **Prompt:** Explain how the writer creates tension in this extract.
- **Focus:** language + structure
- **Type:** analysisShort
- **Source:** Single extract (Paper 1)
- **Marks:** 8
- **AOs:** AO2 (analyse language and structure)

### Task 2: L1-A02
- **Prompt:** How does the writer describe the setting to interest the reader?
- **Focus:** imagery, sensory language
- **Type:** analysisShort
- **Source:** Single extract
- **Marks:** 8
- **AOs:** AO2

### Task 3: L1-A03
- **Prompt:** How does the writer structure the opening of the text?
- **Focus:** openings, shifts, withholding information
- **Type:** analysisShort
- **Source:** Single extract
- **Marks:** 8
- **AOs:** AO2

### Task 4: L1-A04
- **Prompt:** To what extent do you agree that the writer makes the character seem dangerous?
- **Focus:** evaluation + evidence
- **Type:** evaluation
- **Source:** Single extract
- **Marks:** 12
- **AOs:** AO4 (evaluate)

### Task 5: L2-A01
- **Prompt:** What impressions do you get of the writer's viewpoint in Source A?
- **Focus:** viewpoint, perspective, attitude
- **Type:** analysisShort
- **Source:** Source A only
- **Marks:** 8
- **AOs:** AO1, AO3 (understand and infer viewpoint)

### Task 6: L2-A02
- **Prompt:** How does the writer use language to influence the reader in Source B?
- **Focus:** language, persuasion, effect
- **Type:** analysisShort
- **Source:** Source B only
- **Marks:** 8
- **AOs:** AO2

### Task 7: L2-A03
- **Prompt:** Compare how the writers present similar ideas in Source A and Source B.
- **Focus:** comparison, methods, ideas
- **Type:** comparison
- **Source:** Both sources
- **Marks:** 12
- **AOs:** AO3

### Task 8: L2-A04
- **Prompt:** To what extent do you agree that both writers present the topic positively?
- **Focus:** evaluation, comparison, evidence
- **Type:** evaluation
- **Source:** Both sources
- **Marks:** 12
- **AOs:** AO4

---

## OUTPUT FORMAT

Produce **8 separate packs**, one per task. For each pack, output the following structure. Use the exact keys so the content can be pasted into TypeScript/JSON.

### Per-task structure

```json
{
  "taskId": "L1-A01",
  "checklistItems": [
    { "id": "L1-A01-1", "label": "I identify specific methods that create tension", "ao": "AO2" },
    ...
  ],
  "markSchemeDetail": "AO2 (8 marks): Top-band... Weak: ...",
  "stepByStepMethod": "Step 1 (2 min): ... Step 2 (3 min): ... Step 3 (8 min): ... Step 4 (2 min): ...",
  "modelAnswers": {
    "grade4": "The writer creates tension by...",
    "grade6": "...",
    "grade8": "...",
    "grade9": "..."
  }
}
```

### Checklist rules
- **id:** `{TASK_ID}-{number}` (e.g. L1-A01-1, L2-A03-5)
- **label:** First person, short sentence
- **ao:** AO1 | AO2 | AO3 | AO4 as appropriate
- **Count:** 8–12 items per task

### Mark scheme rules
- Name the relevant AO(s) and marks
- Say what top-band does and what weak answers do
- End with: `Weak: [short list]`
- Single source (L1): focus on AO2 or AO4
- Two sources (L2): include AO3 where relevant

### Step-by-step method rules
- **Total time: ~12–15 minutes** (not 45)
- Format: `Step 1 (2 min): ... Step 2 (3 min): ... Step 3 (8 min): Write. Step 4 (2 min): Check.`
- Be specific to the question focus

### Model answers rules
- **Length:** Grade 4: ~80–120 words. Grade 6: ~100–150. Grade 8: ~150–200. Grade 9: ~180–220.
- **Structure:** 1–3 short paragraphs
- Use **placeholder evidence** (e.g. "phrases like '…' suggest…") since no real extract is given — the format "the writer's use of X suggests Y" is fine
- For L2 comparison/evaluation tasks, reference "Source A" and "Source B" or "both writers"

---

## REQUESTED OUTPUT

Produce all 8 packs in order: L1-A01, L1-A02, L1-A03, L1-A04, L2-A01, L2-A02, L2-A03, L2-A04.

For each task, output:

1. A heading: `## L1-A01` (or the relevant task ID)
2. The question prompt
3. The full JSON object for that pack

**Example opening:**

```
## L1-A01
**Question:** Explain how the writer creates tension in this extract.

{
  "taskId": "L1-A01",
  "checklistItems": [ ... ],
  "markSchemeDetail": "...",
  "stepByStepMethod": "...",
  "modelAnswers": { "grade4": "...", "grade6": "...", "grade8": "...", "grade9": "..." }
}
```

Then repeat for L1-A02, L1-A03, L1-A04, L2-A01, L2-A02, L2-A03, L2-A04.

If you cannot output valid JSON, use **clear markdown sections** (## Checklist, ## Mark scheme, etc.) with the same content so a human can copy it into the codebase.

---

## Checklist before submitting

- [ ] All 8 tasks have checklist, mark scheme, method, model answers
- [ ] Model answers are SHORT (80–220 words), not essay-length
- [ ] L2 tasks reference both sources where relevant
- [ ] AOs match question type (AO2 for analysis, AO4 for evaluation, AO3 for comparison)
- [ ] Step-by-step method totals ~12–15 minutes per task
- [ ] Checklist IDs follow pattern {TASK_ID}-1, {TASK_ID}-2, etc.

---

*Copy everything above the line into your LLM. Paste the output back for integration into `englishLanguageReadingPackData.ts` or equivalent.*
