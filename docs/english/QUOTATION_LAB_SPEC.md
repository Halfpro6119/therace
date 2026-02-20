# Literature Section — Quotation Lab
## Full Implementation Guide (Grade 9 Engine)

Production-ready spec for developers, AI agents, and curriculum leads. Operational, not conceptual.

---

## 1️⃣ Purpose (Why This Exists)

The Quotation Lab solves the biggest GCSE Literature problem:

- Students either memorise too many quotes with no understanding
- Or understand themes but panic under timed conditions

The Quotation Lab trains:
- **Selective quotation** — which quote fits best
- **Flexible deployment** — use one quote for multiple ideas
- **Micro-analysis** — 4–5 sentence paragraphs, not essays
- **Examiner-level judgement** — when to use, when not to

**This is not a memory tool. It is a thinking tool.**

---

## 2️⃣ Core Design Principles

**Principle 1: Fewer Quotes, Used Better**
- 12–20 quotes per text / poem cluster
- Each quote must support multiple themes
- Every quote must justify its existence

**Principle 2: Quotes Are Tools, Not Facts**
Students must learn: when to use, why it works, when not to use.

**Principle 3: Drills > Memorisation**
Every quote must feed at least 3 drills.

---

## 3️⃣ Quotation Lab Structure (Top Level)

```
Literature
 └── Quotation Lab
     ├── By Text
     │    ├── Macbeth
     │    ├── A Christmas Carol
     │    ├── Jekyll & Hyde
     │    └── An Inspector Calls
     ├── By Poetry Cluster
     │    └── Power & Conflict
     ├── By Theme
     │    ├── Power
     │    ├── Guilt
     │    ├── Identity
     │    └── Responsibility
     └── Drills
```

Students can enter from any route: text-first, theme-first, exam-question-first learners.

---

## 4️⃣ Quote Object (Data Model)

Every quote stored with rich metadata:

```json
{
  "quoteId": "MAC-GUILT-04",
  "text": "Will all great Neptune's ocean wash this blood clean from my hand?",
  "source": "Macbeth",
  "location": "Act 2 Scene 2",
  "themes": ["guilt", "violence", "conscience"],
  "methods": ["hyperbole", "imagery", "mythological allusion"],
  "coreMeaning": "Guilt is overwhelming and irreversible",
  "grade9Insight": "Guilt is framed as cosmic, not personal",
  "contextHook": "Jacobean beliefs about sin and divine punishment",
  "bestUsedFor": ["guilt essays", "moral consequence arguments", "psychological collapse"],
  "commonMisuse": "Over-quoting the whole line instead of embedding",
  "difficulty": "core"
}
```

---

## 5️⃣ Student Experience (Quote View)

When a student opens a quote, **four collapsible panels**:

| Panel | Content |
|-------|---------|
| **Panel 1: What It Means** | Plain-English explanation, one sentence max |
| **Panel 2: How It Works** | Method → purpose, no technique spotting |
| **Panel 3: Why Examiners Love It** | When it earns top marks, what questions it fits |
| **Panel 4: Grade 9 Angle** | Conceptual or alternative reading, optional but powerful |

---

## 6️⃣ Drill System (Core Engine)

Each quote feeds multiple drill types.

| Drill | Prompt / Task | Skill |
|-------|---------------|-------|
| **A: Quote Selection** | Which quote best supports [idea]? 4 options, justify in 1 sentence | AO1 judgement |
| **B: One-Sentence Analysis** | Explain how this quote presents [theme]. Max 20 words, must include judgement | AO2 precision |
| **C: Upgrade the Analysis** | Upgrade weak response to Grade 6 → 8 → 9 | Vertical progression |
| **D: Link Two Quotes** | Link one from Act 1 and one from Act 5 to show change | Structure + development |
| **E: Eliminate the Weak Quote** | Remove narrative, overlong, off-focus quotes | Examiner filtering |

---

## 7️⃣ Model Answer Integration

Quotation Lab is wired into the 14 GuidePost packs:
- Each model paragraph is tagged internally
- Quotes used in Grade 8/9 models become priority quotes
- Drills are generated from real model writing

---

## 8️⃣ Micro-Paragraph Builder

Students practise 4–5 sentence paragraphs, not essays.

**Inputs:** question focus, one quote, one method

**Outputs:** AO1 argument, AO2 purpose, AO3 woven context, judgement

**AI checks:** quote length, relevance, conceptual depth

---

## 9️⃣ Progress & Mastery Tracking

- **Per text:** quote familiarity heatmap, theme coverage map
- **Per AO:** AO1 strength, AO2 depth, AO3 integration
- **Grade ceiling indicator:** e.g. "Currently writing at Grade 7 because AO2 lacks judgement."

---

## 🔟 Exam Mode Integration

When students enter a Literature exam task:
- Relevant quotes are surfaced subtly (2–3 strategic reminders)
- No full quote lists
- Prevents dependency while reducing panic

---

## 1️⃣1️⃣ Teacher / Admin Controls

Admins can: add/edit quotes, tag themes, flag "Grade 9 essential" quotes, disable weak quotes.

---

## 1️⃣2️⃣ Quality Control Rules (Non-Negotiable)

A quote cannot be added unless:
- It supports 2+ themes
- It has a Grade 9 insight
- It appears in or could appear in a top-band response

---

## 1️⃣3️⃣ Why This System Works

**Most platforms:** test recall, reward memorisation.

**This system:** trains judgement, builds flexibility, mirrors examiner thinking.

Students stop asking "What quotes do I need?" and start thinking "Which quote fits best here?" — **that is Grade 9 behaviour.**

---

## 1️⃣4️⃣ Next Optional Extensions

When ready:

- **Language Quotation Lab** — Non-fiction rhetoric, selective quotation for Language Paper 1/2 Section A
- **Automatic quote suggestions** — During writing, suggest relevant Quotation Lab quotes based on focus
- **Timed "Quote Panic" drills** — Timed quote-selection under pressure
- **Personalised quote pruning** — AI-suggested quote set based on weak themes and AO gaps

---

## ✅ Final Status

You now have:

- A complete Literature Quotation Lab spec
- Drill logic (A–E: Selection, One-Sentence, Upgrade, Link Two, Eliminate Weak)
- Data models (quote object, drill types, progress)
- Integration with existing GuidePost packs (strategic quotes in exam mode)
