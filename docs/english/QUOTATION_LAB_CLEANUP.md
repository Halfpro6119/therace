# Literature Quotation Lab — Clean-Up & Optimisation (Implemented)

This document records the examiner-grade clean-up and optimisation applied to the Quotation Lab, aligned with the plan: **train selection not recall, reward precision not volume, build transferable quote use, create Grade 9 thinking habits.**

---

## 1. Quotation database & metadata

- **Quote quality standard**
  - Validation: `validateQuoteForQuality()` enforces ≤8 words (with poetry exception), 2+ themes, core meaning + context hook, Grade 9 insight or deployment tip.
  - Classification: `classifyQuoteTier()` assigns **anchor** | **support** | **archived**. Archived quotes are excluded from student-facing lists and drills.
- **Long quotations**
  - `QuotationLabQuote.fullTextRef` holds the full line for admin; students see only the short `quote` fragment. Long quotes can be stored with `fullTextRef` and a short `quote` for display.
- **Normalised metadata**
  - Types support: `quoteId`, `text` (as `quote`), `themes[]`, `methods[]` (purpose-based), `flexibilityScore` (1–5), `difficulty` (core | stretch), `bestFor[]` / `bestUsedFor[]`, `avoidIf[]`, `qualityTier`, `alternativeInterpretation`, `whyExaminersPrefer`.

---

## 2. Theme structure

- **Controlled themes**
  - `QUOTATION_LAB_THEME_IDS` and per-source theme usage remain; theme explosion is limited by quote quality (2+ themes per quote) and by prioritising 6–8 core themes per text in content design.
- **Theme transfer**
  - Quote detail and list show **“Also useful for → [Theme X]”** (from `quote.themes`). Gold quotes and anchor-first ordering in selection drills reinforce conceptual flexibility.

---

## 3. Drill system (selection & judgement, not memory)

- **Prioritised drill order**
  - Drills are ordered: **Quote Selection** → **Misuse Detection** → **Eliminate Weak** → **Explain** → **Upgrade** → **Link Two** → **Context Weave** → **Finish Analysis** → **Which AO**. Selection and misuse come first; no “finish the quote” or “who said this?” drill types exist.
- **Quote Selection (Best Fit)**
  - “Which quote best supports [idea]?” with 1 correct, 2–3 tempting wrongs. Anchor quotes preferred when generating. Wrong choice is recorded as misuse for analytics.
- **Misuse detection**
  - “Why would this quote score poorly here?” with options including: Over-simplified, No judgement, No development, Technique spotting only, Over-quoting, No focus, **Too narrative**, **No method**, **Too specific**, **Repeats the question**. Wrong selection records misuse for that quote.
- **Embed the quote (Micro-paragraph)**
  - Structural feedback: **dropped quotation** (no quote embedded), **floating quote** (quote not woven into sentence), **awkward embedding** (overlong quoted chunk). No full marking — structural feedback only.

---

## 4. UI (Exam Mode default, progressive disclosure)

- **Default student view = Exam Mode**
  - Quote detail: top section shows **quote**, **themes** (chips), **one-line meaning**. “Also useful for →” shown when multiple themes. Metadata (method, Grade 9, when to use, avoid) is in **expandable panels**.
  - Quote list: **Gold** badge on gold quotes; difficulty shown as Core / Stretch. Minimal cards.
- **Progressive disclosure**
  - Panels: What It Means, How It Works, Grade 9 Angle, “You could also argue…”, “Why examiners prefer this quote”, When to Use It. All collapsed by default after the Exam Mode block.

---

## 5. Grade 9 thinking

- **“You could also argue…”**
  - Shown for stretch quotes (or when `alternativeInterpretation` is set). Teaches alternative interpretation, not rote essays.
- **“Why examiners prefer this quote”**
  - Shown for anchor quotes (or when `whyExaminersPrefer` is set). Explains flexible language, symbolic payoff, links to structure.

---

## 6. Analytics & feedback

- **Misuse tracking**
  - When a student selects the wrong quote in Best Fit or Eliminate Weak, or gets Misuse Detection wrong, `storage.recordQuoteMisuse(sourceId, quoteId)` is called.
- **Quote confidence heatmap**
  - Progress page “Per quote” uses **green / amber / red**: green = confidently used (familiarity ≥2, no misuse), amber = partial (familiarity 1 or 1 misuse), red = avoided or misused (no familiarity or ≥2 misuses). Replaces vague “revise quotes” with clear signals.

---

## 7. Gold quotes & admin

- **Gold quotes**
  - `GOLD_QUOTE_IDS` per source (8–12 per text). Gold quotes are shown **first** in Quote Lab and **prioritised** in generated selection drills. Students learn selectivity, not volume.
- **Quote audit / admin**
  - Data layer supports `qualityTier`, `quoteMisuseCount`, `quoteConfidence`. Admin UI (e.g. quote audit dashboard, lock/highlight gold) can be added on top of existing config and storage.

---

## 8. Final experience check

- Students are **not** rewarded for memorising 30 quotes: drills prioritise **choice** (selection, misuse, eliminate weak) and **embedding** (micro-paragraph feedback).
- Every drill type mirrors an exam decision: which quote fits best, why a use is weak, how to embed and analyse.
- Grade 9 features (alternative read, why examiners prefer) are **aspirational** and in expandable sections so they don’t overwhelm.

If a feature doesn’t improve **quote choice**, **embedding**, or **analytical depth**, it has been removed, demoted, or hidden behind progressive disclosure.
