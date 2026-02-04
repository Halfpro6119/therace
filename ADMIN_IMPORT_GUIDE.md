# Admin Import & Question Rendering Guide (LLM Reference)

This document describes how questions are imported and rendered in the GCSE Revision App so an LLM can generate valid import payloads, debug import/rendering issues, or extend the system.

---

## 1. High-Level Flow

```
Import (JSON/CSV) → Parse & Normalize → DB (prompts table)
                                              ↓
Quiz Player loads prompts → normalizeQuestion(prompt) → NormalizedQuestion
                                              ↓
QuestionRenderer → type-specific UI (ShortQuestion, MCQQuestion, …) → User answers
                                              ↓
grade(normalizedQuestion, userResponse) → GradeResult (correct/incorrect, marks)
```

- **Import**: Admin pastes JSON or CSV; the app parses, normalizes, and optionally creates subject/unit/topic, then inserts rows into `prompts`.
- **Rendering**: Each prompt is normalized once per display; the result drives which UI component is shown and how answers are collected.
- **Grading**: The same normalized model and a typed `UserResponse` are passed to `grade()` for deterministic correct/incorrect and marks.

---

## 2. Two Import Paths

### 2.1 Bulk Import (ImportPage – CSV or JSON)

- **Entry**: Admin → Import (Bulk) → paste CSV or JSON.
- **Parsing**:
  - **CSV**: `importUtils.parseCSV()` – headers (e.g. `subject`, `examBoard`, `unit`, `topic`, `type`, `question`, `answers`). Answers can be pipe-separated in one cell.
  - **JSON**: `importUtils.parseImportJsonPrompts()` – expects array or wrapper `{ "questions": [...] }` / `{ "prompts": [...] }` / `{ "data": [...] }`.
- **Row shape**: `ImportPromptRow` – subject, examBoard, unit, topic, type, question, answers (string[]), hint, explanation, calculatorAllowed, drawingRecommended, diagram fields, tier, paperId, paperNumber.
- **Persistence**: `importUtils.importPrompts()` – finds or creates subject/unit/topic by name, then `db.createPrompt()` per row. Diagram metadata goes into `meta.diagram`; type-specific data is **not** expanded here (Bulk Import is mostly short-answer + diagram; for MCQ/fill/match/label use Enhanced JSON or CSV with type-specific columns).

### 2.2 Enhanced JSON Import (JsonImportPageEnhanced)

- **Entry**: Admin → JSON Import (enhanced) → select subject (and optional default paper) → paste JSON.
- **Parsing**: `jsonNormalizer.parseQuestionsJson()` – accepts:
  - A single question object
  - An array of question objects
  - Wrapper: `{ "questions": [...] }`, `{ "prompts": [...] }`, or `{ "data": [...] }`
- **Per-item normalization**: `jsonNormalizer.normalizeQuestion()` – produces `NormalizedQuestion` (admin schema) with: prompt, answersAccepted, fullSolution, hint, marks, calculatorAllowed, drawingRecommended, type, unitId, topicId, explanation, meta, diagram.
- **Important**: This path uses **admin** `NormalizedQuestion` from `jsonNormalizer.ts`, which is a different type from the **runtime** `NormalizedQuestion` in `questionEngine`. The enhanced page does **not** run `importEnhancements` or the question-engine normalizer; it passes `normalized.prompt`, `normalized.answersAccepted`, `normalized.meta`, etc., straight to `db.createPrompt()`. So for MCQ/fill/match/label you must put type-specific data inside `meta.questionData` in the JSON (see section 4).
- **Persistence**: Subject/unit/topic are **not** created from the JSON; admin must pick an existing subject. unitId/topicId from JSON can be IDs or empty (often empty in practice). Each item is inserted via `db.createPrompt()` with subjectId = selected subject.

---

## 3. Runtime Model (Rendering & Grading)

After a prompt is loaded from the DB, the **runtime** pipeline is:

1. **Normalize**: `questionEngine.normalizeQuestion(prompt)` → `NormalizedQuestion` (see `questionEngine/types.ts`).
2. **Validate**: `questionEngine.validateNormalizedQuestion(q)` → errors/warnings; if errors, the UI shows “Unable to render this question.”
3. **Render**: `QuestionRenderer` switches on `q.type` and renders one of: `ShortQuestion`, `MCQQuestion`, `FillQuestion`, `MatchQuestion`, `LabelQuestion` (from `components/questions/QuestionTypes.tsx`).
4. **Answer shape**: The component calls `onChange(value)`. All grading uses the same shapes:
   - **short**: `value` = string (trimmed text).
   - **mcq**: `value` = string (choice key, e.g. `"A"`).
   - **fill**: `value` = string[] (one string per blank).
   - **match**: `value` = object mapping leftId → rightId (e.g. `{ "1": "A", "2": "C" }`); internally normalized to a string like `"1A,2C"` for comparison.
   - **label**: `value` = object mapping targetId → labelId (e.g. `{ "T1": "L1", "T2": "L2" }`).
5. **Grade**: `questionEngine.grade(normalizedQuestion, userResponse)` returns `GradeResult` (isCorrect, marksAwarded, maxMarks, feedback.summary, feedback.correctAnswer, mistakeTags, normalizedUserAnswer). The quiz player uses `gradeFromRenderer(prompt, value)` which normalizes the prompt and converts `value` to `UserResponse` then calls `grade()`.

So for **rendering** and **grading** the source of truth is the runtime `NormalizedQuestion`: id, subject_id, unit_id, topic_id, paper_id, tier, type, question, answersAccepted (string[]), marks, explanation, hint, calculatorAllowed, drawingRecommended, meta.questionData, meta.diagram.

---

## 4. Question Types and Required Data

Supported `type` values: `short`, `mcq`, `fill`, `match`, `label`.

### 4.1 short

- **DB**: `type: "short"`, `question`, `answers` (array of accepted strings). Optional in `meta.questionData`: caseSensitive, trim, numericTolerance, acceptEquivalentFractions.
- **Rendering**: Single text input; user submits one string.
- **Grading**: Compares user text to each accepted answer (trim, optional case-insensitive, optional numeric tolerance / equivalent fractions).
- **Import**: In JSON use `question` or `prompt`, `answers` (array or pipe-separated string). No need for `meta.questionData` unless you want options.

### 4.2 mcq

- **DB**: `type: "mcq"`, `question`, `answers` (e.g. `["A"]` for single correct key). **Required** in `meta.questionData`: `choices` = array of `{ key: string, text: string }` (e.g. `{ key: "A", text: "Carbon dioxide" }`). Optional: multiSelect, randomizeOrder.
- **Rendering**: List of choices; user selects one key (or multiple if multiSelect). Value to grader is the selected key(s); single is a string.
- **Grading**: Correct if selected key is in `answers`.
- **Import**: Either provide `meta.questionData.choices` in JSON, or use the **Bulk/Import enhancements** row format: choiceA, choiceB, choiceC, choiceD, correctChoice. The runtime normalizer (`questionEngine/normalizeQuestion.ts`) can build `choices` from flat `choiceA`…`choiceF` or from `raw.choices` array.

### 4.3 fill

- **DB**: `type: "fill"`, `question` (use placeholders like `___` for blanks), `answers` can be used as fallback. **Required** in `meta.questionData`: `blanks` (number). Accepted answers: either `acceptedPerBlank` (array of arrays, one per blank) or `acceptedSets` (same idea), or legacy `acceptedComposite` / single `answers` for one blank.
- **Rendering**: One input per blank; value = string[].
- **Grading**: Each blank checked against the corresponding set of accepted strings (trim, optional case sensitivity).
- **Import**: Set `meta.questionData.blanks` and optionally `acceptedPerBlank` or `acceptedSets`. Number of `___` in the question text should match `blanks` (validated with a warning otherwise).

### 4.4 match

- **DB**: `type: "match"`, `question`, `answers` (e.g. one string `"1A,2C,3B"` meaning left 1→A, 2→C, 3→B). **Required** in `meta.questionData`: `leftItems`, `rightItems` – arrays of `{ id: string, text: string }`. Optional: allowMultiple, randomizeRight.
- **Rendering**: Two columns; user matches left id → right id. Value = object `{ leftId: rightId, ... }`.
- **Grading**: User mapping is normalized to a string like `"1A,2C,3B"` and compared to `answers[0]`.
- **Import**: Provide `meta.questionData.leftItems` and `meta.questionData.rightItems`, and `answers` as the correct mapping string or equivalent.

### 4.5 label

- **DB**: `type: "label"`, `question`, `answers` (e.g. one JSON string of target→label mapping). **Required** in `meta.questionData`: `labels` (array of `{ id, text }`), `targets` (array of `{ id, x, y, prompt? }` – x,y typically 0–100). Optional: diagramId, dragAndDrop, diagramMetadata.
- **Rendering**: Diagram with drop targets; user assigns label id to target id. Value = object `{ targetId: labelId }`.
- **Grading**: Compare JSON.stringify(user mapping) to stored correct mapping.
- **Import**: Provide `meta.questionData.labels` and `meta.questionData.targets`; store correct mapping in `answers[0]`.

---

## 5. Field Aliases and Normalization (Runtime)

The **runtime** normalizer (`questionEngine/normalizeQuestion.ts`) accepts a DB-style or import-style object and:

- **IDs**: subjectId/subject_id, unitId/unit_id, topicId/topic_id, paperId/paper_id.
- **Question text**: `question` (preferred).
- **Answers**: `answers` – array or comma/pipe-separated string → `answersAccepted` (trimmed, de-duped).
- **Type**: `type` → one of short, mcq, fill, match, label; default `short`.
- **Marks**: `marks` or `meta.marks`, default 1.
- **Meta**: `meta.questionData` and `meta.diagram` preserved; legacy/flat fields are merged into `questionData` per type (e.g. choiceA…choiceF → choices, matchLeft/matchRight → leftItems/rightItems, labelBank → labels).

So when **creating prompts via API or JSON import**, you can use either camelCase or snake_case for these and the runtime will still normalize correctly for display and grading.

---

## 6. Diagram Metadata

Diagrams are optional and live in `meta.diagram` (or legacy `diagram_metadata`). Supported in import and runtime:

- **mode**: `"auto"` | `"template"` | `"asset"`.
- **templateId**: string (e.g. `"angleInSemicircle"`).
- **placement**: `"above"` | `"inline"` | `"below"` | `"side"`.
- **caption**, **alt**: strings.
- **params**: object for template parameters.

In **Bulk Import** (importUtils), diagram can be provided via row fields: diagramMode, diagramTemplateId, diagramPlacement, diagramCaption, diagramAlt, diagramParamsJson (or diagramCustomJson for custom). In **Enhanced JSON** (jsonNormalizer), use a `diagram` object with mode, templateId, placement, caption, alt, params; it is normalized and stored in the normalized question’s `diagram` field and then passed into `meta` when creating the prompt.

---

## 7. Validation

- **Bulk Import**: `importUtils.validateImportRows()` – requires subject, examBoard, unit, topic, question, at least one answer, and type in [short, mcq, fill, match, label]. Does not validate type-specific `meta.questionData`.
- **Enhanced JSON**: `jsonNormalizer.validateQuestion()` – requires non-empty prompt and at least one answer; warnings for missing solution, marks &lt; 1, diagram without templateId in auto mode.
- **Runtime**: `questionEngine.validateNormalizedQuestion()` – type-specific: e.g. MCQ requires ≥2 choices and answersAccepted containing a choice key; fill requires blanks ≥ 1 and optional acceptedPerBlank/acceptedComposite; match/label require leftItems/rightItems or labels/targets. If there are errors, the quiz UI shows “Unable to render this question.”

---

## 8. Minimal JSON Examples for Import

Use these with **Enhanced JSON Import** (subject selected in UI). Unit/topic can be omitted (empty) if the app only needs subject-level assignment.

**Short:**
```json
{
  "question": "What is the capital of France?",
  "answers": ["Paris", "paris"],
  "type": "short",
  "explanation": "Paris is the capital."
}
```

**MCQ (must have meta.questionData.choices when using Enhanced JSON):**
```json
{
  "question": "Which gas do plants absorb?",
  "type": "mcq",
  "answers": ["A"],
  "meta": {
    "questionData": {
      "choices": [
        { "key": "A", "text": "Carbon dioxide" },
        { "key": "B", "text": "Oxygen" },
        { "key": "C", "text": "Nitrogen" }
      ]
    }
  }
}
```

**Fill:**
```json
{
  "question": "Photosynthesis requires ___ and water to produce glucose.",
  "type": "fill",
  "answers": ["carbon dioxide", "CO2"],
  "meta": {
    "questionData": {
      "blanks": 1,
      "acceptedSets": [["carbon dioxide", "CO2"]]
    }
  }
}
```

**Match:**
```json
{
  "question": "Match the organelle to its function.",
  "type": "match",
  "answers": ["1A,2C,3B"],
  "meta": {
    "questionData": {
      "leftItems": [
        { "id": "1", "text": "Mitochondria" },
        { "id": "2", "text": "Chloroplast" },
        { "id": "3", "text": "Nucleus" }
      ],
      "rightItems": [
        { "id": "A", "text": "Controls cell" },
        { "id": "B", "text": "Produces energy" },
        { "id": "C", "text": "Photosynthesis" }
      ]
    }
  }
}
```

**Label:**
```json
{
  "question": "Label the diagram.",
  "type": "label",
  "answers": ["{\"T1\":\"L1\",\"T2\":\"L2\"}"],
  "meta": {
    "questionData": {
      "labels": [{ "id": "L1", "text": "Nucleus" }, { "id": "L2", "text": "Membrane" }],
      "targets": [{ "id": "T1", "x": 50, "y": 30 }, { "id": "T2", "x": 50, "y": 70 }]
    }
  }
}
```

**Short with diagram (Enhanced JSON):**
```json
{
  "question": "What is the angle in a semicircle?",
  "answers": ["90"],
  "type": "short",
  "diagram": {
    "mode": "template",
    "templateId": "angleInSemicircle",
    "placement": "above",
    "caption": "Angle in Semicircle"
  }
}
```

---

## 9. CSV (Bulk Import) Columns

For **Bulk Import** CSV, typical headers:

- subject, examBoard, unit, topic, type, question, answers (pipe-separated if multiple)
- hint, explanation, calculatorAllowed, drawingRecommended
- tier (higher | foundation | empty)
- paperId or paper_number (1, 2, or 3)
- diagramMode, diagramTemplateId, diagramPlacement, diagramCaption, diagramAlt, diagramParamsJson (or diagramCustomJson)

Type-specific data for MCQ/fill/match/label can be passed in CSV as JSON in a column (e.g. metaJson) only if the Bulk Import path is extended to merge that into `meta`; currently the most reliable way to import complex types is Enhanced JSON with full `meta.questionData`.

---

## 10. Key Files (for LLM or developers)

| Concern | File(s) |
|--------|--------|
| Question type definitions | `src/types/questionTypes.ts` |
| Runtime normalized model | `src/utils/questionEngine/types.ts` |
| Runtime normalizer | `src/utils/questionEngine/normalizeQuestion.ts` |
| Runtime validation | `src/utils/questionEngine/validate.ts` |
| Grading | `src/utils/questionEngine/grade.ts` |
| Renderer | `src/components/QuestionRenderer.tsx`, `src/components/questions/QuestionTypes.tsx` |
| Registry (handlers per type) | `src/utils/questionRegistry/registry.ts`, `handlers.ts` |
| Bulk Import parse & persist | `src/admin/importUtils.ts` |
| Enhanced JSON parse | `src/admin/jsonNormalizer.ts` |
| Enhanced JSON UI | `src/admin/JsonImportPageEnhanced.tsx` |
| Type-specific import helpers | `src/admin/importEnhancements.ts` |
| DB create prompt | `src/db/client.ts` (createPrompt), `src/types/index.ts` (Prompt) |

---

## 11. Summary for LLM

- Use **short** for free-text; provide `question` and `answers` (array or pipe-separated).
- Use **mcq** only when you can set `meta.questionData.choices` (and `answers` = correct key(s)); otherwise the runtime validator will error and the question won’t render.
- Use **fill** with `meta.questionData.blanks` and optional `acceptedPerBlank`/`acceptedSets`; question text often uses `___` for blanks.
- Use **match** with `meta.questionData.leftItems` and `rightItems`, and `answers` as one mapping string (e.g. `"1A,2C,3B"`).
- Use **label** with `meta.questionData.labels` and `targets`, and `answers` as the correct mapping (e.g. JSON string).
- For **Enhanced JSON Import**, always include type-specific data in `meta.questionData`; the page does not run the same legacy flattening as Bulk Import.
- **Rendering** and **grading** both use the runtime `NormalizedQuestion` from `questionEngine.normalizeQuestion(prompt)`; ensure stored prompts have the right `type` and `meta.questionData` so validation passes and the correct UI component is used.
