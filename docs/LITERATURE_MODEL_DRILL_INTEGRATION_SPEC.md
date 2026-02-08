# Literature Model–Drill Integration Spec

**Core idea:** Model answers are not "finished products" — they are drill maps. Each model answer becomes a source of drills, a benchmark, and a progression ladder.

---

## Principle

Every model answer (Grade 4 / 6 / 8 / 9) should be deconstructible into drills. Students don't just read models — they **extract**, **rebuild**, **upgrade**, **remix**.

---

## Layer 1 — Tagging Model Answers for Drills

Each paragraph in every model answer gets hidden metadata tags (not shown to students).

**Example (internal tagging):**

```json
{
  "task": "P-S01",
  "grade": 9,
  "paragraph": 2,
  "focus": "power",
  "drillTargets": ["AO2-purpose", "structure", "alternative-interpretation"],
  "keyQuote": "king of kings"
}
```

This allows the system to:
- pull drills from real exam answers
- target weaknesses precisely

---

## Layer 2 — Drills Generated from Model Answers

### Drill Type 1: Quote Extraction Drill

From a Grade 9 paragraph:

- **Prompt:** Highlight the shortest possible quotation that supports the idea of power as illusion.
- **Why:** Forces selectivity, prevents over-quoting, trains examiner judgement.

### Drill Type 2: Paragraph Skeleton Drill

Student sees a Grade 9 paragraph with parts removed:

> "Shelley presents power as __________. The phrase '________' suggests __________, which implies __________."

Student must rebuild: argument, quote, AO2 purpose.

### Drill Type 3: Grade Upgrade Drill

Student is shown:
- Grade 6 paragraph
- Grade 9 paragraph hidden

**Task:** Upgrade this Grade 6 paragraph so it would be marked in the top band.

**Rubric enforced:** conceptual shift, judgement added, context woven.

### Drill Type 4: AO Mapping Drill

Student highlights sentences and labels: AO1, AO2, AO3.

Then answers: *Which AO is weakest in this paragraph and why?*

Builds examiner literacy.

---

## Layer 3 — Micro-Rewrites Inside Models

Every model answer can be broken into micro-tasks.

**Example (Macbeth – guilt):**

From Grade 9 model: *"Blood imagery symbolises guilt as permanent and inescapable."*

**Micro-Drills:**
- Rewrite using a different method (structure instead of imagery)
- Rewrite without the word guilt
- Rewrite as a comparison (Macbeth vs Lady Macbeth)

Each takes 2–3 minutes but builds flexibility.

---

## Layer 4 — Paragraph Builder Linked to Models

When students open the Grade 9 Micro-Paragraph Builder:
- The app pulls: the question, a Grade 9 paragraph
- Hides the middle
- Student must reconstruct it using their own words

AI checks: quote length, relevance, AO balance, conceptual clarity.

Feedback references the actual model paragraph, not generic advice.

---

## Layer 5 — "Study → Drill → Write" Loop

Each Literature task has a closed mastery loop:

1. Read Grade 8/9 model
2. Complete 3–5 drills derived from that model
3. Write own paragraph
4. Compare side-by-side with model
5. Upgrade once

This is how Grade 9 becomes repeatable, not accidental.

---

## Layer 6 — Progress Signals Tied to Models

Progress is model-anchored, not abstract.

**Examples:**
- "You can now replicate 82% of Grade 9 AO2 patterns"
- "You select Grade-9-level quotations but lack judgement"
- "Your paragraph structure now matches top-band models"

Students know exactly what they're missing.

---

## App Integration

| Component | Implementation |
|-----------|----------------|
| Literature workspace | "Drills from this model" button → navigates to model-derived drills for this task |
| Model Drills page | Shows quote extraction, paragraph skeleton, grade upgrade, AO mapping drills for task |
| Quotation Lab | Can link to Literature tasks (e.g. P-S01 → Ozymandias, M-03 → Macbeth) |
| Progress | Model-anchored signals (AO patterns, quotation level, structure match) |

---

## Why This Is Elite

**Most platforms:** show model answers, hope students absorb them.

**This system:** pulls drills out of the models, trains thinking patterns, makes Grade 9 behaviour explicit and repeatable.

- Weaker students climb safely
- Strong students stop plateauing
- Confidence replaces panic
