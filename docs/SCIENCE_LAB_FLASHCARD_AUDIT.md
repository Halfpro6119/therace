# Science Lab Flashcards — Complete Audit

**Date:** February 2025  
**Scope:** Full audit of Science Lab flashcard content, architecture, data sources, and UX  
**Purpose:** Single source of truth for flashcard inventory, gaps, and improvement priorities  
**Last updated:** February 2025 — Full implementation completed

---

## Executive Summary

The Science Lab flashcard system is **production-ready and feature-rich**. Content is derived from four sources (concepts, misconceptions, practicals, equations), supports spaced repetition, Quick Checks, Bigger Tests, and rich visuals.

**Implemented (from audit recommendations):**
- Min-view feedback: "Think…" + progress bar + seconds to reveal during 1500ms
- Time limit visibility: remaining time (M:SS) when sessionLimitMinutes set; auto-end on expiry
- Session option persistence: shuffle, due first, interleave, limit, time, type-to-reveal in localStorage
- Type-to-reveal: "Show answer" button for concept/equation cards when enabled
- Interleave + bigger test placement: bigger tests inserted after topic blocks when interleaving
- CONCEPT_HARDER_PROMPTS expanded (~33% of concept cards); CLEAN diagrams + immune_response, nervous_system + hormone_action, carbon_cycle, circuit_diagram, wave_types, em_spectrum, bohr_model, electrolysis_diagram, free_body_diagram (23 CLEAN slugs)
- CONCEPT_APPLICATION_QUESTIONS: 38/59 concepts (per SCIENCE_LAB_FLASHCARD_FULL_REVIEW implementation)

**Remaining gaps:** CONCEPT_APPLICATION_QUESTIONS expanded to 38/59 (per SCIENCE_LAB_FLASHCARD_FULL_REVIEW). Paper/tier: **documented as intentional** (see §2.2).

---

## 1. Content Inventory

### 1.1 Source Data Counts

| Source | Biology | Chemistry | Physics | Total |
|--------|---------|-----------|---------|-------|
| **Concepts** | 27 | 18 | 14 | **59** |
| **Misconceptions** | 19 | 11 | 5 | **35** |
| **Practicals** | 6 | 3 | 5 | **14** |
| **Equations** | 3 | 3 | 9 | **15** |

### 1.2 Generated Flashcard Types & Counts (per subject)

| Type | Generation Logic | Est. Cards per Subject |
|------|------------------|------------------------|
| **Concept** | 1 per concept | 59 total |
| **Process Chain** | 1 per `changeScenario` | ~60–80 (avg 1–3 per concept) |
| **Misconception** | 1 per misconception | 35 |
| **Practical** | 2–4 per practical (purpose, variables, risk, graph) | ~35–45 |
| **Equation** | N symbols + 1 reverse + 0–1 unit trap per equation | ~50–70 |

**Estimated total flashcards per subject:** ~240–290. **Combined (all subjects):** ~720–870 cards.

### 1.3 Topic Coverage by Subject

- **Biology:** Cell Biology, Organisation, Infection and Response, Bioenergetics, Homeostasis and Response, Inheritance, Evolution, Ecosystems, Carbon Cycle, Energy Transfer, Bioaccumulation, Stem Cells, Monoclonal Antibodies, Limiting Factors, Thyroxine Feedback, Genetic Engineering Ethics, Biodiversity Sampling
- **Chemistry:** Rate of Reaction, Atomic Structure, Bonding, Moles, Concentration, Acids & Bases, Reactivity Series, Electrolysis, Energy Changes, Crude Oil, Analysis, Atmosphere, Using Resources, Le Chatelier, Half Equations, Empirical/Molecular, Alkenes, Bond Energy Calculations
- **Physics:** Energy Stores, Particle Model, Specific Heat Capacity, Atomic Structure, Waves, EM Spectrum, Electricity, Forces, Magnetism, Generator, Hooke's Law, Critical Angle/TIR, Nuclear Fission/Fusion, Red Shift

---

## 2. Architecture & Data Flow

### 2.1 Generation Pipeline

```
SCIENCE_CONCEPTS, SCIENCE_MISCONCEPTIONS, SCIENCE_PRACTICALS, SCIENCE_EQUATIONS
  → getFlashcardsByFilters(subject, paper, tier, topic?)
  → generateConceptFlashcards() + generateMisconceptionFlashcards()
    + generatePracticalFlashcards() + generateEquationFlashcards()
  → getFlashcardsGroupedByTopic(…, options)
```

### 2.2 Paper/Tier Filtering — Documented as Intentional

**Finding:** Flashcard generation does **not** filter by paper or tier. All concepts, misconceptions, practicals, and equations for a subject are included regardless of Paper 1/2 or Foundation/Higher.

**Documented as intentional (per SCIENCE_LAB_FLASHCARD_FULL_REVIEW):** Science Lab flashcards show **all content for the subject for revision**; they are not restricted by paper or tier. This allows students to see and revise the full curriculum; topic and mode selection (e.g. topic tests, full GCSE) still respect paper/tier where applicable.

- **Implication:** A Foundation Biology student may see Higher-only material in the flashcard deck; this is by design for revision breadth.
- **Location:** `generateConceptFlashcards`, `generateMisconceptionFlashcards`, etc. in `src/config/scienceLabFlashcards.ts`
- **Data model:** `SCIENCE_CONCEPTS`, `SCIENCE_PRACTICALS`, `SCIENCE_EQUATIONS` have no `paper` or `tier` fields.
- **Future option:** If product requires Foundation-only or Paper-1-only decks, add optional `paper`/`tier` metadata to source data and filter in generators.

### 2.3 Key Functions

| Function | Purpose |
|----------|---------|
| `getFlashcardsByFilters(subject, paper, tier, topic?)` | All flashcards for subject (optionally by topic) |
| `getFlashcardsGroupedByTopic(…, options)` | Grouped by topic; supports shuffle, session limit, spaced rep, interleave |
| `getDueFlashcardCount(…, mastery)` | Count of cards due for review |
| `getQuickChecksForFlashcard(flashcardId, topic, quickChecks, useTopicFallback)` | Related Quick Checks after rating |
| `getBiggerTestQuestionsForTopic(…, count)` | 3–6 mark questions for topic |
| `getDaysUntilNextReview(level)` | 1/3/7 days for Again/Learn/Got it |

---

## 3. Content Quality Audit

### 3.1 Prompt Variety

| Mechanism | Coverage | Notes |
|-----------|----------|-------|
| **Templates** | All concept cards | 7 templates (hash % templates.length) |
| **CONCEPT_HARDER_PROMPTS** | 34 concepts | Used when hash % 3 === 0 → ~33% of concept cards (per FULL_REVIEW) |
| **Custom `flashcardPrompt`** | Per-concept override | Used where set; refined for inheritance, evolution, moles, particle model |

**CONCEPT_HARDER_PROMPTS covered:** bio-diffusion through phys-energy-stores, plus bio-hormones, bio-dna-genes, bio-inheritance, bio-evolution, bio-ecosystems, bio-carbon-cycle, bio-energy-transfer, bio-homeostasis, bio-stem-cells, chem-atomic-structure, chem-moles, chem-acids-bases, chem-crude-oil, phys-particle-model, phys-specific-heat-capacity, phys-waves, phys-atomic-structure, phys-magnetism.

### 3.2 Quick Check Coverage

| Source | Count | Notes |
|--------|-------|-------|
| **CONCEPT_APPLICATION_QUESTIONS** | 38 concept IDs | Application-style MCQs (per SCIENCE_LAB_FLASHCARD_FULL_REVIEW) |
| **Scenario checks** | All concepts with changeScenarios | "If X then what?" MCQs |
| **Misconception checks** | All misconceptions | "A student says X. What would you tell them?" |
| **Process chain (drag order)** | Scenarios with 3+ steps | Order the mechanism |

**Concept application coverage:** 38 of 59 concepts have dedicated CONCEPT_APPLICATION_QUESTIONS. Remaining concepts rely on scenario checks or topic fallback.

### 3.3 Diagram Coverage

| Set | Slugs (23) |
|-----|------------|
| **CLEAN_FLASHCARD_DIAGRAMS** | cell_membrane_diffusion, osmosis_diagram, active_transport, enzyme_action, photosynthesis, respiration, particle_model, dna_structure, cell_division, homeostasis, digestive_system, circulatory_system, pathogen_infection, immune_response, nervous_system, hormone_action, carbon_cycle, circuit_diagram, wave_types, em_spectrum, bohr_model, electrolysis_diagram, free_body_diagram |

- **Front:** Concepts with `diagramId` in CLEAN show rendered diagram; others show description only.
- **Back:** Process chain and misconception cards use `back.visual.diagramId` when set.

---

## 4. UX & Session Behavior

### 4.1 Session Options

| Option | Default | Notes |
|--------|---------|-------|
| Shuffle | Off | URL param `shuffle=1`; persisted in localStorage |
| Due first (spaced rep) | On | URL param `spaced=0`; persisted in localStorage |
| Interleave topics | Off | Merges all topics; persisted in localStorage |
| Type to reveal | Off | "Show answer" button for concept/equation cards; persisted in localStorage |
| Session limit | None | URL param `limit=10` or `limit=20`; persisted in localStorage |
| Time limit | None | URL param `minutes=5` or `minutes=10`; persisted in localStorage |

### 4.2 Flow

1. **Flashcard** → min 1500ms view → recall prompt → flip → rate 1/2/3
2. **Quick Check** (1–2) after rating when `getQuickChecksForFlashcard` returns matches
3. **Bigger Test** after last flashcard of topic (3–6 mark questions)
4. **Again queue** — cards rated 1 re-queued and shown before session end

### 4.3 Storage

- **Key:** `grade9sprint_science_lab_flashcard_mastery`
- **Structure:** `Record<flashcardId, FlashcardMastery>` with confidenceLevel, timesViewed, timesConfident, lastViewed, nextReviewDate, masteryPercent
- **Spaced rep:** nextReviewDate 1/3/7 days for Again/Learn/Got it

---

## 5. Issues & Gaps

### Implemented

| # | Item | Status |
|---|------|--------|
| ✓ | **Min-view feedback** | "Think…" + progress bar + seconds to reveal during 1500ms |
| ✓ | **Time limit visibility** | Remaining time (M:SS) when sessionLimitMinutes set; auto-end on expiry |
| ✓ | **Session option persistence** | Shuffle, due first, interleave, limit, time, type-to-reveal in localStorage |
| ✓ | **Type-to-reveal** | "Show answer" button for concept/equation cards when enabled |
| ✓ | **Interleave + bigger tests** | Bigger tests inserted after topic blocks when interleaving |
| ✓ | **CONCEPT_HARDER_PROMPTS** | Expanded; ~33% of concept cards use topic-omitted prompts |
| ✓ | **CLEAN diagrams** | Added immune_response, nervous_system; + hormone_action, carbon_cycle, circuit_diagram, wave_types, em_spectrum, bohr_model, electrolysis_diagram, free_body_diagram (23 slugs) |
| ✓ | **CONCEPT_APPLICATION_QUESTIONS** | 38/59 concepts (FULL_REVIEW implementation) |
| ✓ | **Paper/tier** | Documented as intentional: all content for revision |
| ✓ | **SCIENCE_VOCABULARY & units** | Extended with missing terms and W, kW, Pa, kPa |
| ✓ | **flashcardPrompt** | Refined for bio-inheritance, bio-evolution, chem-moles, phys-particle-model |

### Remaining Gaps

| # | Issue | Impact |
|---|-------|--------|
| 1 | **CONCEPT_APPLICATION_QUESTIONS coverage** | 38/59; 21 concepts still rely on scenario checks or topic fallback |
| 2 | **Diagram coverage** | Some concepts use diagramIds not yet in CLEAN (description-only on front) |

---

## 6. File Reference

| File | Purpose |
|------|---------|
| `src/config/scienceLabFlashcards.ts` | Card generation, grouping, Quick Checks, due count, session options |
| `src/config/scienceLabData.ts` | SCIENCE_CONCEPTS, SCIENCE_MISCONCEPTIONS, SCIENCE_PRACTICALS, SCIENCE_EQUATIONS |
| `src/config/scienceLabDiagramMap.ts` | CLEAN_FLASHCARD_DIAGRAMS, isCleanFlashcardDiagram |
| `src/pages/science/ScienceLabFlashcardPage.tsx` | Main UI: phases, rating, Quick Check, Bigger Test, again queue |
| `src/utils/storage.ts` | getFlashcardMastery, updateFlashcardMastery |
| `src/types/scienceLab.ts` | ScienceFlashcard, FlashcardMastery, FlashcardType |

---

## 7. Recommendations

### Completed

1. ~~**Expand CONCEPT_HARDER_PROMPTS**~~ — Done; ~33% of concept cards use topic-omitted prompts.
2. ~~**Add min-view feedback**~~ — "Think…" + progress bar + seconds to reveal.
3. ~~**Time limit visibility**~~ — Remaining time (M:SS) shown; auto-end on expiry.
4. ~~**Add CONCEPT_APPLICATION_QUESTIONS**~~ — Added bio-homeostasis, bio-nervous-system, phys-waves.
5. ~~**Session option persistence**~~ — Shuffle, due first, interleave, limit, time, type-to-reveal in localStorage.
6. ~~**Interleave + bigger test placement**~~ — Bigger tests inserted after topic blocks when interleaving.
7. ~~**Type-to-reveal**~~ — "Show answer" button for concept/equation cards when enabled.

### Remaining

1. **Paper/tier metadata** — If filtering is desired, add paper/tier to concepts, practicals, equations; filter in `getFlashcardsByFilters`.
2. **CONCEPT_APPLICATION_QUESTIONS** — Cover more high-value concepts (e.g. bio-hormones, phys-particle-model, phys-waves extended).

---

## 8. Related Docs

- `FLASHCARD_FULL_AUDIT_2025_02.md` — Design, UX, cross-hub comparison
- `FLASHCARD_DIAGRAMS_PLAN.md`, `FLASHCARD_DIAGRAM_AUDIT.md`
- `LEARN_MODE_MERGE_PLAN.md`
