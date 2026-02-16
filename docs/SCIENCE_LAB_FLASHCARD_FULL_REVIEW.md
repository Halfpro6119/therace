# Science Lab Flashcards — Full Review & Improvement Suggestions

**Date:** February 2025  
**Scope:** Content quality, coverage, prompts, Quick Checks, diagrams, UX, and technical gaps  
**Purpose:** Actionable, specific improvements for the Science Lab flashcard system

---

## Executive Summary

The Science Lab flashcard system is **mature**: spaced repetition, Quick Checks, Bigger Tests, type-to-reveal, session persistence, and min-view feedback are in place. This review focuses on **content and coverage gaps** and **specific, implementable improvements**.

**Priority areas:**
1. **Application questions** — 23 of 59 concepts have dedicated CONCEPT_APPLICATION_QUESTIONS; 36 rely on scenario/topic fallback.
2. **Harder prompts** — 19 of 59 concepts have CONCEPT_HARDER_PROMPTS; expanding improves desirable difficulty.
3. **Diagram coverage** — 15 CLEAN slugs; many concepts use diagramIds that fall back to description-only.
4. **Paper/tier** — No filtering; Foundation/Higher and Paper 1/2 are not distinguished (document or implement).
5. **Vocabulary & key terms** — SCIENCE_VOCABULARY and unit regex could be extended for better key-term extraction.

---

## 1. CONCEPT_APPLICATION_QUESTIONS — Gaps & Additions

**Location:** `src/config/scienceLabFlashcards.ts` — `CONCEPT_APPLICATION_QUESTIONS` array

**Current:** 23 concepts have application-style MCQs. Remaining concepts get scenario-based or topic-fallback Quick Checks only.

**Concepts without a dedicated application question (high-value targets):**

| Subject   | Concept ID                        | Suggested question focus |
|-----------|-----------------------------------|---------------------------|
| Biology   | `bio-hormones`                    | Compare speed/location of hormone vs nerve response; insulin/glucagon roles |
| Biology   | `bio-dna-genes`                   | Gene → protein → characteristic; mutation outcome |
| Biology   | `bio-inheritance`                 | Punnett square outcome; heterozygous cross ratio |
| Biology   | `bio-evolution`                   | Natural selection steps; why variation matters |
| Biology   | `bio-ecosystems`                  | Energy loss between trophic levels; why food chains are short |
| Biology   | `bio-carbon-cycle`                | Role of decomposition/photosynthesis in carbon cycle |
| Biology   | `bio-energy-transfer`             | Why energy transfer is inefficient; 10% rule |
| Biology   | `bio-bioaccumulation`             | Why toxins accumulate at top of food chain |
| Biology   | `bio-stem-cells`                  | Where stem cells are found; differentiation |
| Biology   | `bio-monoclonal-antibodies`       | Use of monoclonal antibodies (e.g. pregnancy test, targeting) |
| Biology   | `bio-limiting-factors-quantitative` | Limiting factor from graph; interpreting rate curves |
| Biology   | `bio-thyroxine-feedback`          | Negative feedback: low thyroxine → what happens |
| Biology   | `bio-genetic-engineering-ethics`  | Ethical pros/cons of genetic modification |
| Biology   | `bio-biodiversity-sampling`      | Why random sampling; quadrat size / transect |
| Chemistry | `chem-atomic-structure`           | Proton/electron numbers; mass number vs atomic number |
| Chemistry | `chem-moles`                      | Moles from mass and Mr; balancing equations |
| Chemistry | `chem-concentration`              | Concentration = moles/volume; units g/dm³ or mol/dm³ |
| Chemistry | `chem-acids-bases`                | Neutralisation products; pH and H⁺/OH⁻ |
| Chemistry | `chem-energy-changes`              | Exothermic vs endothermic from energy profile |
| Chemistry | `chem-crude-oil`                  | Fractionating column order; uses of fractions |
| Chemistry | `chem-analysis`                   | Flame test or gas test identification |
| Chemistry | `chem-atmosphere`                 | Early vs current atmosphere; greenhouse effect |
| Chemistry | `chem-using-resources`            | LCA stages; recycling vs reuse |
| Chemistry | `chem-le-chatelier`               | Effect of temperature/pressure on equilibrium position |
| Chemistry | `chem-half-equations`             | Balancing half equations (electrons) |
| Chemistry | `chem-empirical-molecular`        | Empirical from % composition; molecular from empirical + Mr |
| Chemistry | `chem-alkenes-addition`           | Addition reaction: ethene + bromine; polymerisation |
| Chemistry | `chem-bond-energy-calculations`   | ΔH from bond energies (bonds in − bonds out) |
| Physics   | `phys-particle-model`             | Particle arrangement in solid/liquid/gas; density change |
| Physics   | `phys-specific-heat-capacity`     | Same heat to different masses; E = mcΔT |
| Physics   | `phys-atomic-structure`           | Alpha/beta/gamma penetration; isotope definition |
| Physics   | `phys-em-spectrum`                | Order of EM waves; uses/dangers of UV vs IR |
| Physics   | `phys-magnetism`                  | Field around wire; Fleming’s left-hand rule |
| Physics   | `phys-generator`                  | Induced p.d. when wire moves in field; a.c. from dynamo |
| Physics   | `phys-hookes-law-limit`           | Limit of proportionality; elastic vs plastic |
| Physics   | `phys-critical-angle-tir`        | TIR when angle > critical; optical fibre |
| Physics   | `phys-nuclear-fission-fusion`     | Fission: neutron in, energy out; fusion: light nuclei |
| Physics   | `phys-red-shift-big-bang`         | Red shift and receding galaxies; Hubble’s law |

**Suggested format for new entries** (add to `CONCEPT_APPLICATION_QUESTIONS`):

```ts
// Example: bio-hormones
{
  conceptId: 'bio-hormones',
  question: 'A person needs a rapid response to remove their hand from a hot object. Why are hormones not suitable for this?',
  correctAnswer: 'Hormones travel in the blood and act more slowly; nerve impulses are electrical and much faster',
  distractors: [
    'Hormones only work on muscles',
    'Hormones are broken down by heat',
    'Nerve impulses are chemical and slower than hormones',
  ],
},
// Example: phys-particle-model
{
  conceptId: 'phys-particle-model',
  question: 'A fixed mass of gas is compressed at constant temperature. What happens to the density and why?',
  correctAnswer: 'Density increases – same number of particles in a smaller volume',
  distractors: [
    'Density decreases – particles get smaller',
    'Density stays the same – temperature is constant',
    'Density increases – more particles are created',
  ],
},
```

**Recommendation:** Add 10–15 high-impact application questions first (e.g. bio-hormones, bio-inheritance, bio-carbon-cycle, chem-moles, chem-le-chatelier, phys-particle-model, phys-atomic-structure, phys-magnetism). Then iterate to cover the rest.

---

## 2. CONCEPT_HARDER_PROMPTS — Expand for Desirable Difficulty

**Location:** `src/config/scienceLabFlashcards.ts` — `CONCEPT_HARDER_PROMPTS` map

**Current:** 19 concept IDs have harder prompts (topic name omitted). Used when `hash % 3 === 0` (~33% of concept cards).

**Concepts that would benefit from a harder prompt** (concept exists but no entry in CONCEPT_HARDER_PROMPTS):

- `bio-hormones` — e.g. "What type of signal travels in the blood and acts more slowly than a nerve impulse?"
- `bio-dna-genes` — e.g. "What is the relationship between a gene and a protein?"
- `bio-inheritance` — e.g. "If both parents are heterozygous for a recessive allele, what proportion of offspring could show the recessive phenotype?"
- `bio-evolution` — e.g. "What process leads to changes in the proportion of alleles in a population over time?"
- `bio-ecosystems` — e.g. "Why do food chains rarely have more than four or five trophic levels?"
- `bio-carbon-cycle` — e.g. "How does carbon in the atmosphere become part of a plant, then an animal, then return to the atmosphere?"
- `bio-energy-transfer` — e.g. "Why is only about 10% of energy passed to the next trophic level?"
- `bio-homeostasis` — already has application question; consider: "What do we call the maintenance of a stable internal environment?"
- `bio-stem-cells` — e.g. "What type of cell can differentiate into many different cell types?"
- `chem-atomic-structure` — e.g. "How do you find the number of neutrons in an atom from the periodic table?"
- `chem-moles` — e.g. "How many moles are in 8 g of oxygen gas (O₂)? (Mr = 32)"
- `chem-acids-bases` — e.g. "What are the products when an acid reacts with a base?"
- `chem-crude-oil` — e.g. "In the fractionating column, where do the smallest hydrocarbon molecules condense?"
- `phys-particle-model` — e.g. "Why does a gas fill its container but a solid does not?"
- `phys-specific-heat-capacity` — e.g. "Why does the same heater raise the temperature of water more slowly than the same mass of aluminium?"
- `phys-waves` — already has application question; consider harder prompt: "What is the relationship between wave speed, frequency and wavelength?"
- `phys-atomic-structure` — e.g. "Which type of nuclear radiation is stopped by a sheet of paper?"
- `phys-magnetism` — e.g. "How do you find the direction of the force on a current-carrying wire in a magnetic field?"

**Recommendation:** Add 12–15 of the above to `CONCEPT_HARDER_PROMPTS`. Prefer concepts that are exam-heavy and where omitting the topic name increases recall effort.

---

## 3. Diagram Coverage (CLEAN vs Description-Only)

**Location:** `src/config/scienceLabDiagramMap.ts` — `CLEAN_FLASHCARD_DIAGRAMS`  
**Data:** `src/config/scienceLabData.ts` — `visualModel.diagramId` / `scenario.visual.diagramId`

**Current CLEAN set (15):**  
cell_membrane_diffusion, osmosis_diagram, active_transport, enzyme_action, photosynthesis, respiration, particle_model, dna_structure, cell_division, homeostasis, digestive_system, circulatory_system, pathogen_infection, immune_response, nervous_system.

**Concepts using a diagramId not in CLEAN** (so they show description only on the front):

| diagramId used in data        | Subject(s) / concepts                    | Suggestion |
|------------------------------|------------------------------------------|------------|
| hormone_action               | bio-hormones                             | Add to CLEAN if blueprint is simple and readable; else keep description. |
| genetic_inheritance          | bio-inheritance                          | Add to CLEAN if a simple Punnett/flow exists in scienceLabDiagrams. |
| natural_selection            | bio-evolution                            | Add to CLEAN if blueprint is uncluttered. |
| ecosystem                    | bio-ecosystems, bio-energy-transfer      | Add to CLEAN if single clear food-chain/flow. |
| carbon_cycle                  | bio-carbon-cycle; chem-atmosphere       | Add to CLEAN if one clear cycle diagram exists. |
| energy_profile               | chem-rate-reaction, chem-energy-changes, phys-specific-heat-capacity | Often graph-like; either add simple blueprint or leave as description. |
| stem_cell_differentiation    | bio-stem-cells                           | Add to CLEAN if simple. |
| monoclonal_antibodies        | bio-monoclonal-antibodies                | Add to CLEAN if simple. |
| photosynthesis_light_graph   | bio-photosynthesis (scenario)            | Graph; description may be enough. |
| thyroxine_feedback           | bio-thyroxine-feedback                    | Add to CLEAN if negative-feedback loop is clear. |
| genetic_engineering          | bio-genetic-engineering-ethics           | Add to CLEAN if simple. |
| quadrat_sampling             | bio-biodiversity-sampling                | Add to CLEAN if simple grid/transect. |
| bohr_model                   | chem-atomic-structure, phys-atomic-structure | Add to CLEAN if one shared blueprint works. |
| ionic_covalent_bonding       | chem-bonding                             | Add to CLEAN if diagram is clear. |
| circuit_diagram              | phys-electricity                         | Add to CLEAN if simple. |
| free_body_diagram            | phys-forces                              | Add to CLEAN if simple. |
| moles_diagram                | chem-moles, chem-concentration           | Add to CLEAN if simple. |
| half_equations               | chem-acids-bases, chem-half-equations    | Add to CLEAN if simple. |
| flame_test_colours           | chem-reactivity-series, chem-analysis    | Add to CLEAN if simple. |
| electrolysis_diagram        | chem-electrolysis                        | Add to CLEAN if simple. |
| fractionating_column         | chem-crude-oil, chem-using-resources     | Add to CLEAN if simple. |
| le_chatelier                 | chem-le-chatelier                        | Add to CLEAN if simple. |
| empirical_molecular          | chem-empirical-molecular                 | Add to CLEAN if simple. |
| alkene_addition              | chem-alkenes-addition                    | Add to CLEAN if simple. |
| bond_energy                  | chem-bond-energy-calculations           | Add to CLEAN if simple. |
| wave_types                   | phys-waves                               | Add to CLEAN if simple. |
| em_spectrum                  | phys-em-spectrum                         | Add to CLEAN if simple. |
| electromagnetism             | phys-magnetism                           | Add to CLEAN if simple. |
| generator_diagram            | phys-generator                           | Add to CLEAN if simple. |
| hookes_law_graph             | phys-hookes-law-limit                    | Graph; optional. |
| critical_angle_tir          | phys-critical-angle-tir                  | Add to CLEAN if simple. |
| fission_fusion               | phys-nuclear-fission-fusion             | Add to CLEAN if simple. |
| red_shift                    | phys-red-shift-big-bang                  | Add to CLEAN if simple. |

**Recommendation:**  
- Add 5–8 high-traffic diagrams to CLEAN first: e.g. `hormone_action`, `carbon_cycle`, `circuit_diagram`, `wave_types`, `em_spectrum`, `bohr_model`, `electrolysis_diagram`, `free_body_diagram`.  
- Ensure each has a simple, readable blueprint in `scienceLabDiagrams.ts` before adding to CLEAN.  
- Leave graph-heavy slugs (e.g. energy_profile, hookes_law_graph, photosynthesis_light_graph) as description-only unless a minimal diagram is added.

---

## 4. Paper / Tier Filtering

**Location:** `getFlashcardsByFilters` and generators in `src/config/scienceLabFlashcards.ts`; `SCIENCE_CONCEPTS` (and related) in `src/config/scienceLabData.ts`.

**Current:** No paper or tier filtering. All concepts, misconceptions, practicals, and equations for a subject are included.

**Options:**

- **A. Document as intentional**  
  In `SCIENCE_LAB_FLASHCARD_AUDIT.md` and/or in-app copy: "Science Lab flashcards show all content for the subject for revision; they are not restricted by paper or tier."

- **B. Add metadata and filter**  
  - Add optional `paper?: SciencePaper` and `tier?: ScienceTier` (or `tiers?: ScienceTier[]`) to concept/practical/equation (and optionally misconception) types.  
  - In `generateConceptFlashcards` (and the other generators), filter by `paper` and `tier` when provided.  
  - Ensure `getFlashcardsByFilters(subject, paper, tier)` passes `paper` and `tier` into generators and that topic lists respect them.

**Recommendation:** Start with (A). If you later need Foundation-only or Paper-1-only decks, implement (B) and backfill metadata for a subset of content first.

---

## 5. Vocabulary & Key-Term Extraction

**Location:** `src/config/scienceLabFlashcards.ts` — `SCIENCE_VOCABULARY` and `extractKeyTerms`.

**Current:**  
- `SCIENCE_VOCABULARY`: long list of phrases/terms; longer phrases matched first by iteration order.  
- Units: regex `\b(g|kg|mol|N|J|s|m\/s²|°C|V|A|Ω|Hz|m|cm|mm|μm|%|dm³)\b`.  
- Key terms capped at 8 per card.

**Suggestions:**

- Add terms that appear in concepts but may be missing: e.g. "negative feedback", "trophic level", "predator", "prey", "decomposer", "biodiversity", "quadrat", "transect", "equilibrium", "reversible reaction", "activation energy", "catalyst", "electrode", "anode", "cathode", "half equation", "empirical formula", "molecular formula", "critical angle", "total internal reflection", "red shift", "fission", "fusion", "isotope", "half-life", "limit of proportionality", "elastic deformation", "plastic deformation", "induced p.d.", "alternating current".
- Extend unit regex if needed: e.g. `Pa`, `kPa`, `W`, `kW`, `C` (coulomb), `F` (farad) — careful with `C`/`F` to avoid false positives.
- Keep cap at 8; ensure longer phrases are listed before shorter substrings in `SCIENCE_VOCABULARY` so "concentration gradient" is matched before "concentration".

---

## 6. Prompt Quality (Concept Cards)

**Location:** `getConceptPrompt` and concept `flashcardPrompt` in `scienceLabData.ts`.

**Observations:**

- **Templates:** 7–8 variants (e.g. "What is X and how does it work?", "Explain X in 1–2 sentences.") give good variety.
- **Custom `flashcardPrompt`:** Used for several concepts (e.g. bio-diffusion, bio-osmosis). These are strong; consider adding or refining for concepts that often confuse (e.g. bio-inheritance, bio-evolution, chem-moles).
- **Difficulty:** Harder prompts that omit the concept name are only used when both (hash % 3 === 0) and CONCEPT_HARDER_PROMPTS[id]. Expanding CONCEPT_HARDER_PROMPTS (Section 2) improves this without changing logic.

**Recommendation:**  
- Leave template set as is.  
- In `scienceLabData.ts`, add or tweak `flashcardPrompt` for 3–5 high-stakes concepts (e.g. inheritance, evolution, moles, particle model) so the front question is unambiguous and exam-style.

---

## 7. Quick Check Quality

**Location:** `generateQuickChecks` in `src/config/scienceLabFlashcards.ts`.

**Scenario-based MCQs:**  
- Correct answer is inferred from the last part of `scenario.explanation` (after `→`) or from "rate increases/decreases".  
- Distractors: generic ("The opposite effect occurs", "No change", "It depends on other factors").  

**Suggestion:** For 2–3 scenario checks per subject, add a dedicated "scenario application" entry (similar to CONCEPT_APPLICATION_QUESTIONS) with a concrete scenario and 3 plausible distractors, and link via `relatedFlashcardIds` so they are preferred over the generic inference.

**Misconception checks:**  
- "A student says X. What is the best correction?" with same-topic distractors.  
- Good; ensure `misconception` and `correctUnderstanding` are trimmed so truncation at 100 chars doesn’t cut mid-word.

**Process chain (drag order):**  
- Only for scenarios with 3+ steps.  
- Consider allowing 2-step chains where order is critical (e.g. receptor → CNS → effector) if the UI supports it.

---

## 8. Equation & Practical Cards

**Equations:**  
- Symbol cards, reverse card (concept → equation), and unit-trap cards are clear.  
- Optional: add one "word problem" style card per equation where the front is a short scenario (e.g. "A 2 kg mass moves at 3 m/s. What is its kinetic energy?") and the back shows the calculation. High effort; lower priority.

**Practicals:**  
- Purpose, variables, risk, graph cards are well scoped.  
- Consider one "method order" or "key step" card per practical (e.g. "What is the first step in …?") if exam questions often test sequence.

---

## 9. UX / Session Behaviour

**Already in place:** Min-view (1500 ms), "Think…" + progress, time limit (M:SS + auto-end), type-to-reveal, session option persistence, interleave + bigger tests after topic blocks, accessibility (aria-labels, aria-live, progressbar).

**Optional polish:**

- **Time limit:** Already enforced with a 1 s tick and `setSessionComplete` when remaining ≤ 0. No change required.
- **Again queue:** Cards rated 1 are re-queued; behaviour is correct.
- **Quick Check count:** Max 2 per card; topic fallback 1. Consider showing "1 application question" vs "1 scenario question" in UI for clarity (optional).

---

## 10. Summary: Prioritised Action List

| Priority | Action | File(s) | Effort | Status |
|----------|--------|---------|--------|--------|
| 1 | Add 10–15 CONCEPT_APPLICATION_QUESTIONS for uncovered concepts (biology: hormones, inheritance, carbon cycle; chemistry: moles, le-chatelier; physics: particle model, atomic structure, magnetism) | scienceLabFlashcards.ts | Medium | **Done** – 15 added (38/59 total) |
| 2 | Add 12–15 CONCEPT_HARDER_PROMPTS for concepts that lack them | scienceLabFlashcards.ts | Low | **Done** – 15 added (34 total) |
| 3 | Add 5–8 diagram slugs to CLEAN_FLASHCARD_DIAGRAMS (and ensure blueprints exist) | scienceLabDiagramMap.ts | Medium | **Done** – 8 added (23 CLEAN slugs) |
| 4 | Extend SCIENCE_VOCABULARY with missing terms; optionally extend unit regex | scienceLabFlashcards.ts | Low | **Done** – terms + W, kW, Pa, kPa |
| 5 | Document paper/tier behaviour (no filtering) in SCIENCE_LAB_FLASHCARD_AUDIT.md or in-app | docs | Low | **Done** – §2.2 documents as intentional |
| 6 | Add or refine flashcardPrompt for 3–5 high-stakes concepts in scienceLabData.ts | scienceLabData.ts | Low | **Done** – inheritance, evolution, moles, particle model |
| 7 | (Later) Add paper/tier metadata and filtering if product requires it | scienceLabData.ts, scienceLabFlashcards.ts | High | Deferred |

---

## 11. File Reference

| File | Purpose |
|------|---------|
| `src/config/scienceLabFlashcards.ts` | CONCEPT_HARDER_PROMPTS, CONCEPT_APPLICATION_QUESTIONS, SCIENCE_VOCABULARY, extractKeyTerms, getConceptPrompt, generateConceptFlashcards, generateQuickChecks, getFlashcardsByFilters, getFlashcardsGroupedByTopic |
| `src/config/scienceLabData.ts` | SCIENCE_CONCEPTS (visualModel.diagramId, flashcardPrompt, changeScenarios) |
| `src/config/scienceLabDiagramMap.ts` | CLEAN_FLASHCARD_DIAGRAMS, isCleanFlashcardDiagram |
| `src/config/scienceLabDiagrams.ts` | Diagram blueprints (add new or simplify for CLEAN) |
| `src/pages/science/ScienceLabFlashcardPage.tsx` | Session options, min-view, time limit, type-to-reveal, Quick Check phase |
| `docs/SCIENCE_LAB_FLASHCARD_AUDIT.md` | Inventory and architecture (update with paper/tier note) |

---

## 12. Related Docs

- `SCIENCE_LAB_FLASHCARD_AUDIT.md` — Content inventory, architecture, current gaps
- `FLASHCARD_FULL_AUDIT_2025_02.md` — Design, UX, cross-hub comparison
- `FLASHCARD_FULL_AUDIT_PAST_PAPER_SIMPLE_FUN.md` — Past-paper and simplification context
