# Science Lab Content — Audit vs AQA GCSE Standards

**Date:** February 2025  
**Scope:** All Science Lab content (concepts, questions, practicals, equations, misconceptions) compared to AQA GCSE specifications 8461 (Biology), 8462 (Chemistry), 8463 (Physics).  
**Purpose:** Identify alignment, gaps, and opportunities to match AQA standards.

---

## 1. Specification Reference

| Subject   | AQA spec   | Paper structure        | Our topic naming |
|-----------|------------|------------------------|------------------|
| Biology   | 8461       | Paper 1: 4.1–4.4; Paper 2: 4.5–4.7 | Matches (title case) |
| Chemistry | 8462       | Paper 1: 4.1–4.6; Paper 2: 4.7–4.10 | Matches; "Bonding" used for 4.2 |
| Physics   | 8463       | Paper 1: 4.1–4.4; Paper 2: 4.5–4.8 | Matches; "Energy stores and transfers" for 4.1 |

**AQA topic lists (subject content):**

- **Biology:** 4.1 Cell biology → 4.2 Organisation → 4.3 Infection and response → 4.4 Bioenergetics → 4.5 Homeostasis and response → 4.6 Inheritance, variation and evolution → 4.7 Ecology → 4.8 Key ideas.
- **Chemistry:** 4.1 Atomic structure and the periodic table → 4.2 Bonding, structure, and the properties of matter → 4.3 Quantitative chemistry → 4.4 Chemical changes → 4.5 Energy changes → 4.6 The rate and extent of chemical change → 4.7 Organic chemistry → 4.8 Chemical analysis → 4.9 Chemistry of the atmosphere → 4.10 Using resources → 4.11 Key ideas.
- **Physics:** 4.1 Energy → 4.2 Electricity → 4.3 Particle model of matter → 4.4 Atomic structure → 4.5 Forces → 4.6 Waves → 4.7 Magnetism and electromagnetism → 4.8 Space physics (physics only) → 4.9 Key ideas.

---

## 2. Content Counts (Current)

Approximate counts from `scienceLabData.ts`. Concepts include core + stretch (e.g. stem cells, Le Chatelier, Space physics).

| Content type       | Biology | Chemistry | Physics | Source |
|--------------------|---------|-----------|---------|--------|
| **Concepts**       | ~27     | ~18       | ~14     | SCIENCE_CONCEPTS (incl. stretch) |
| **Questions**      | ~22+    | ~12+      | ~9+     | SCIENCE_QUESTIONS (core + grade 9 + combined) |
| **Practicals**     | 6       | 3         | 5       | SCIENCE_PRACTICALS |
| **Equations**      | 3       | 3         | 9       | SCIENCE_EQUATIONS |
| **Misconceptions** | 21      | 11        | 6       | SCIENCE_MISCONCEPTIONS |
| **Method mark breakdowns** | 6 | 1 | 0 | METHOD_MARK_BREAKDOWNS |

Concept counts include stretch/grade-9 concepts (e.g. bio-stem-cells, bio-bioaccumulation, chem-le-chatelier, phys-space-physics).

---

## 3. Topic Coverage vs AQA

### 3.1 Biology (8461)

| AQA topic (spec)                    | Paper | Concepts | Questions | Practicals | Equations | Misconceptions | Verdict |
|-------------------------------------|-------|----------|-----------|------------|-----------|----------------|---------|
| 4.1 Cell biology                    | 1     | 4        | 4+        | 2          | 1 (magnification) | 3 | ✅ Aligned |
| 4.2 Organisation                    | 1     | 3        | 3+        | 1          | 2 (%, rate) | 2 | ✅ Aligned |
| 4.3 Infection and response         | 1     | 2        | 2+        | —          | —         | 2 | ✅ Aligned |
| 4.4 Bioenergetics                   | 1     | 2        | 3+        | —          | —         | 4 | ✅ Aligned |
| 4.5 Homeostasis and response        | 2     | 3        | 3+        | 2          | —         | 2 | ✅ Aligned |
| 4.6 Inheritance, variation, evolution | 2  | 3        | 3+        | —          | —         | 3 | ✅ Aligned |
| 4.7 Ecology                         | 2     | 2        | 2+        | 1          | —         | 2 | ✅ Aligned |

**Stretch / extra:** Bioenergetics and Organisation stretch (bio-limiting-factors-quantitative, bio-energy-transfer); Cell biology (bio-stem-cells); Infection (bio-monoclonal-antibodies); Homeostasis (bio-thyroxine-feedback); Inheritance (bio-genetic-engineering-ethics); Ecology (bio-bioaccumulation, bio-biodiversity-sampling). All are within or adjacent to AQA spec content.

**Conclusion:** All seven AQA Biology topic areas are covered with concepts, questions, and supporting content. Stretch content is appropriate for higher tier / grade 9.

---

### 3.2 Chemistry (8462)

| AQA topic (spec)                          | Paper | Concepts | Questions | Practicals | Equations | Misconceptions | Verdict |
|------------------------------------------|-------|----------|-----------|------------|-----------|----------------|---------|
| 4.1 Atomic structure and the periodic table | 1 | 1        | 0         | —          | —         | —              | ⚠️ Light |
| 4.2 Bonding, structure, and properties  | 1     | 1        | 1         | —          | —         | 1              | ✅ Aligned |
| 4.3 Quantitative chemistry              | 1     | 2        | 2+        | —          | 2         | 1              | ✅ Aligned |
| 4.4 Chemical changes                     | 1     | 3        | 3+        | 2          | —         | 2              | ✅ Aligned |
| 4.5 Energy changes                       | 1     | 1        | 1+        | —          | —         | 1              | ✅ Aligned |
| 4.6 Rate and extent of chemical change  | 1/2   | 1        | 1+        | 1          | 1         | 1              | ✅ Aligned |
| 4.7 Organic chemistry                    | 2     | 1        | 1+        | —          | —         | 1              | ✅ Aligned |
| 4.8 Chemical analysis                    | 2     | 1        | 1         | —          | —         | —              | ✅ Aligned |
| 4.9 Chemistry of the atmosphere          | 2     | 1        | 1+        | —          | —         | 1              | ✅ Aligned |
| 4.10 Using resources                     | 2     | 1        | 1         | —          | —         | —              | ✅ Aligned |

**Stretch:** Rate/equilibrium (chem-le-chatelier), Chemical changes (chem-half-equations), Quantitative (chem-empirical-molecular), Organic (chem-alkenes-addition), Energy (chem-bond-energy-calculations). Aligned to spec.

**Gap:** 4.1 Atomic structure has one concept (chem-atomic-structure) and no dedicated exam-style question. Consider adding at least one short question (e.g. atomic model, periodic table, electron configuration).

**Conclusion:** All 10 AQA Chemistry topics are present. Atomic structure is the only topic with minimal question coverage.

---

### 3.3 Physics (8463)

| AQA topic (spec)                | Paper | Concepts | Questions | Practicals | Equations | Misconceptions | Verdict |
|----------------------------------|-------|----------|-----------|------------|-----------|----------------|---------|
| 4.1 Energy                       | 1     | 1        | 1+        | —          | 3 (E_k, GPE, P) | 1 | ✅ Aligned |
| 4.2 Electricity                  | 1     | 1        | 1+        | 1          | 2 (V=IR, Q=It) | 1 | ✅ Aligned |
| 4.3 Particle model of matter     | 1     | 2        | 2+        | 2          | 2 (ρ, E=mcΔT) | 1 | ✅ Aligned |
| 4.4 Atomic structure              | 1     | 1        | 1+        | —          | —         | 1 | ✅ Aligned |
| 4.5 Forces                        | 2     | 1        | 1+        | 1          | 1 (F=ma)  | — | ✅ Aligned |
| 4.6 Waves                         | 2     | 2        | 1+        | 1          | 1 (v=fλ)  | 1 | ✅ Aligned |
| 4.7 Magnetism and electromagnetism| 2     | 2        | 1+        | —          | —         | 1 | ✅ Aligned |
| 4.8 Space physics (physics only)| 2     | 1 (stretch) | 0      | —          | —         | — | ✅ Stretch only |

**Conclusion:** All eight AQA Physics topic areas are covered. Space physics is present as stretch (phys-red-shift-big-bang); appropriate for physics-only route.

---

## 4. Required Practicals vs AQA

### 4.1 Biology 8461 — Required practicals (10)

AQA lists (summary): 1 Microscopy, 2 Microbiology (biology only), 3 Osmosis, 4 Enzymes, 5 Food tests, 6 Photosynthesis, 7 Reaction time, 8 Germination (biology only), 9 Field investigations, 10 Decay (biology only).

| AQA required practical | In Science Lab? | Our id / title |
|------------------------|-----------------|----------------|
| Microscopy             | ✅              | bio-microscopy |
| Microbiology           | ❌             | —              |
| Osmosis                | ✅              | bio-osmosis-potato |
| Enzymes                | ✅              | bio-enzyme-activity |
| Food tests              | ❌             | —              |
| Photosynthesis         | ❌             | (bio-plant-responses is plant tropisms, not rate of photosynthesis) |
| Reaction time          | ✅              | bio-reaction-time |
| Germination            | ❌             | —              |
| Field investigations   | ✅              | bio-field-investigation |
| Decay                   | ❌             | —              |

**Gaps:** Microbiology, Food tests, Photosynthesis (rate of photosynthesis investigation), Germination, Decay. Adding these would align with AQA’s full required practical list; Biology-only ones (2, 8, 10) can be lower priority if targeting Combined first.

---

### 4.2 Chemistry 8462 — Required practicals (8)

AQA: Making salts, Neutralisation (triple), Electrolysis, Temperature change (energy), Rates of reaction, Chromatography, Identification of ions (triple), Water purification.

| AQA required practical | In Science Lab? | Our id / title |
|------------------------|-----------------|----------------|
| Making salts           | ❌             | —              |
| Neutralisation         | ✅ (titration) | chem-titration |
| Electrolysis           | ✅             | chem-electrolysis-prac |
| Temperature change    | ❌             | —              |
| Rates of reaction      | ✅             | chem-rate-temperature |
| Chromatography         | ❌             | —              |
| Identification of ions | ❌             | —              |
| Water purification     | ❌             | —              |

**Gaps:** Making salts, Temperature change (energy changes), Chromatography, Identification of ions, Water purification. Titration covers neutralisation; rates covered by chem-rate-temperature.

---

### 4.3 Physics 8463 — Required practicals (10)

AQA: 1 Specific heat capacity, 2 Thermal insulation (physics only), 3 Resistance, 4 I–V characteristics, 5 Density, 6 Force and extension (spring), 7 Force and acceleration, 8 Waves (ripple tank), 9 Reflection/refraction (physics only), 10 Radiation and absorption (physics only).

| AQA required practical | In Science Lab? | Our id / title |
|------------------------|-----------------|----------------|
| 1 Specific heat capacity | ✅           | phys-shc-prac |
| 2 Thermal insulation    | ❌             | —              |
| 3 Resistance            | ✅             | phys-resistance |
| 4 I–V characteristics  | ❌             | —              |
| 5 Density               | ✅             | phys-density-prac |
| 6 Force and extension   | ❌             | —              |
| 7 Force and acceleration | ✅          | phys-force-acceleration |
| 8 Waves                 | ✅             | phys-waves-prac |
| 9 Reflection/refraction | ❌            | —              |
| 10 Radiation and absorption | ❌        | —              |

**Gaps:** Thermal insulation, I–V characteristics, Force and extension (spring), Reflection/refraction, Radiation and absorption. 6, 9, 10 are common exam foci; adding at least 6 (Hooke’s law) would align with AQA’s apparatus and techniques.

---

## 5. Equations vs AQA

### 5.1 Biology

AQA Biology does not provide a separate equation sheet; equations are in spec (e.g. magnification, percentage change, rate). Science Lab has: magnification, percentage change, rate (1/time). **Aligned.**

### 5.2 Chemistry

Equations are embedded in spec (moles, concentration, rate, etc.). Science Lab has: rate = 1/time, moles = mass/M_r, concentration = mass/volume. **Aligned** for core quantitative and rate.

### 5.3 Physics — AQA equation sheet (exam insert)

**In Science Lab equation lab:**  
V = IR, E_k = ½mv², density = m/V, E = mcΔT, v = fλ, F = ma, E_p = mgh, P = E/t, Q = It.

**On AQA sheet but not in equation lab (summary):**  
- Elastic potential energy E_e = ½ke²  
- Thermal energy for change of state E = mL  
- P = VI, P = I²R, E = QV  
- W = mg, W = Fs  
- a = Δv/t, v² − u² = 2as  
- p = F/A  
- T = 1/f  
- Magnification (in Biology equations)

**Recommendation:** Consider adding equation-lab entries for: **work done W = Fs**, **power P = VI** (or P = I²R), **weight W = mg**, and **T = 1/f** (waves). These are high frequency on papers. E = mL and E_e = ½ke² are lower priority but would improve full-spec alignment.

---

## 6. Working Scientifically & Mathematical Requirements

- **Working scientifically:** Not explicitly tagged in content; method mark breakdowns and practical evaluation questions support WS (e.g. planning, evaluating methods, conclusions).
- **Maths:** Unit traps, rearranging, and practice calculations in equations support AQA mathematical requirements (MS). No formal mapping of MS 1–5 to individual items.
- **Apparatus and techniques (AT):** Practicals reference equipment and methods but are not tagged by AT number. Optional improvement: add AT/WS tags to practicals for filtering and reporting.

---

## 7. Naming and Consistency

| Aspect | AQA | Science Lab | Note |
|--------|-----|-------------|------|
| Topic names | Sentence case (e.g. Cell biology) | Title case (Cell Biology) | Fine for UI |
| “Rate and extent of chemical change” | Full phrase | “Rate of reaction” / “Rate and extent of chemical change” in places | Unify to AQA phrase in config if desired |
| “Bonding, structure, and the properties of matter” | Full | “Bonding” | Acceptable shorthand |
| Paper numbering | 1 and 2 | 1 and 2 | Matches |

---

## 8. Prioritised Recommendations

| Priority | Action | Rationale |
|----------|--------|-----------|
| **P1** | Add Biology required practicals: **Food tests**, **Photosynthesis** (rate investigation) | High visibility in AQA papers; Trilogy and single Biology |
| **P2** | Add Physics required practical: **Force and extension (spring)** | Hooke’s law / AT 2; frequently assessed |
| **P3** | Add Chemistry required practicals: **Making salts**, **Chromatography**, **Water purification** | Core to 8462 and Trilogy |
| **P4** | Add 1–2 **Atomic structure (Chemistry)** questions | 4.1 currently has concept only |
| **P5** | Add equation lab entries for **W = Fs**, **P = VI** (or P = I²R), **W = mg**, **T = 1/f** | Common on AQA Physics papers |
| **P6** | Add Biology-only practicals if targeting single Biology: Microbiology, Germination, Decay | Completes 8461 list |
| **P7** | Add Physics-only practicals if targeting single Physics: Thermal insulation, I–V, Reflection/refraction, Radiation and absorption | Completes 8463 list |
| **P8** | Optionally tag practicals with AQA AT/WS references | Better alignment reporting and filtering |

---

## 9. Summary

- **Topics:** All AQA topic areas for Biology (7), Chemistry (10), and Physics (8) are covered with concepts and questions; only Chemistry 4.1 has weak question coverage.
- **Practicals:** About half of AQA required practicals are present per subject. Biggest gaps: Biology (Food tests, Photosynthesis, then Biology-only); Chemistry (Making salts, Chromatography, Water purification, Temperature change); Physics (Force and extension, then physics-only).
- **Equations:** Core equation-lab content matches AQA; adding a few high-frequency equations (work done, power, weight, period) would improve alignment.
- **Standards:** Content is appropriate for AQA 8461/8462/8463; stretch content is suitable for Higher tier and grade 9. Addressing the gaps above would bring the Science Lab to full AQA-standards alignment for required practicals and equation use.

---

## 10. File Reference

| File | Role |
|------|------|
| `src/config/scienceLabData.ts` | SCIENCE_CONCEPTS, SCIENCE_QUESTIONS, SCIENCE_PRACTICALS, SCIENCE_EQUATIONS, SCIENCE_MISCONCEPTIONS, METHOD_MARK_BREAKDOWNS |
| `src/config/scienceLabFlashcards.ts` | Flashcard generation, CONCEPT_APPLICATION_QUESTIONS, getFlashcardsGroupedByTopic |
| `src/config/scienceLabDiagramMap.ts` | CLEAN_FLASHCARD_DIAGRAMS |
| `src/types/scienceLab.ts` | Types and interfaces |
| `docs/SCIENCE_LAB_CONTENT_COVERAGE_AUDIT.md` | Earlier coverage audit (counts; this doc adds AQA mapping and gaps) |

---

## 11. Past Paper Resources (Creative Inspiration for Full GCSE Test)

The following AQA Biology past papers and mark schemes are used as creative inspiration for Full GCSE Test question style, command words, and mark-scheme wording. Questions in `SCIENCE_QUESTIONS` are written to match AQA 8461 style; they are not copied verbatim from these PDFs.

| Resource | Description |
|----------|-------------|
| `AQA-84611F-QP-JUN22.PDF` | Biology Paper 1 Foundation question paper (June 2022) |
| `AQA-84611F-MS-JUN22.PDF` | Biology Paper 1 Foundation mark scheme (June 2022) |
| `AQA-84611F-QP-JUN23.PDF` | Biology Paper 1 Foundation question paper (June 2023) |
| `AQA-84611F-MS-JUN23.PDF` | Biology Paper 1 Foundation mark scheme (June 2023) |
| `AQA-84611F-QP-JUN24-CR.PDF` | Biology Paper 1 Foundation question paper (June 2024) |
| `AQA-84611H-QP-JUN24-CR.PDF` | Biology Paper 1 Higher question paper (June 2024) |
| `AQA-84611H-MS-JUN24.PDF` | Biology Paper 1 Higher mark scheme (June 2024) |
| `AQA-84612F-QP-JUN23.PDF` | Biology Paper 2 Foundation question paper (June 2023) |
| `AQA-84612F-MS-JUN23.PDF` | Biology Paper 2 Foundation mark scheme (June 2023) |

**Location:** `Downloads\AQA Resources\Biology\` (or equivalent). AQA mark schemes use bold/underline for essential wording; "any two from" and "or" for acceptable alternatives. Full GCSE Test questions follow these conventions where applicable.

---

## 12. Related Docs

- [AQA GCSE Biology 8461 – Subject content](https://www.aqa.org.uk/subjects/science/gcse/biology-8461/specification/subject-content)
- [AQA GCSE Chemistry 8462 – Subject content](https://www.aqa.org.uk/subjects/science/gcse/chemistry-8462/specification/subject-content)
- [AQA GCSE Physics 8463 – Subject content](https://www.aqa.org.uk/subjects/science/gcse/physics-8463/specification/subject-content)
- [AQA GCSE Physics 8463 – Practical assessment](https://www.aqa.org.uk/subjects/physics/gcse/physics-8463/specification/practical-assessment)
- [AQA Physics equation sheet (Appendix)](https://www.aqa.org.uk/subjects/science/gcse/physics-8463/specification/appendix-a-physics-equations)
