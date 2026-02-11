# Maths Mastery – Full Content Coverage Audit

**Purpose:** Assess whether **Higher** and **Foundation** GCSE Maths both have the full test content coverage required for exam-style practice (Edexcel, 3 papers, 80 marks per paper).

**Sources:** `src/config/goldenMathsTopicUnitSpec.ts`, `src/config/goldenMathsQuestions.ts`, `GOLDEN_MATHS_QUESTION_LIST.md`, `src/config/taxonomy/maths.ts`, `src/config/gcseScope.ts`, Maths Hub flow.

---

## 1. Summary Verdict

| Tier       | Full test content coverage? | Notes |
|-----------|------------------------------|--------|
| **Higher**   | **Yes**                      | 80 questions per paper; all curriculum areas covered with topic/unit specs. |
| **Foundation** | **Yes** (extended)    | Paper 1 (30), Paper 2 (35), Paper 3 (40). All papers meet or exceed the ~20–30 question target; extended for more practice. |

---

## 2. Reference: What “full” means

- **Exam structure (Edexcel):** 3 papers, 80 marks each, 1h 30m each. Paper 1 non-calculator; Papers 2 & 3 calculator.
- **Typical question count per paper:** ~20–28 questions (mix of 1–5 mark items). For in-app “full paper” practice, a reasonable target is **at least ~20–25 questions per paper** so students get exam-length and topic spread.
- **Curriculum areas (both tiers):** Number, Algebra, Ratio/Proportion, Geometry & Measures, Statistics, Probability. Foundation and Higher differ in depth and some topics (e.g. surds, circle theorems on Higher only).

---

## 3. Higher tier – coverage

### 3.1 Full-paper question counts

| Paper   | Golden IDs   | Count | Assessment |
|---------|---------------|-------|------------|
| Paper 1 | H1-01 – H1-80 | 80    | OK – exceeds typical paper length |
| Paper 2 | H2-01 – H2-80 | 80    | OK |
| Paper 3 | H3-01 – H3-80 | 80    | OK |

**Verdict:** Higher has **full test content coverage** for full-paper quizzes. 80 questions per paper is more than enough to build exam-length quizzes and allow variety.

### 3.2 Topic coverage (curriculum areas)

Topic specs in `goldenMathsTopicUnitSpec.ts` map to curriculum as follows:

| Paper | Topic specs | Curriculum areas covered |
|-------|-------------|---------------------------|
| 1     | Number & Indices; Algebra: Manipulation; Graphs & Coordinates; Geometry & Trigonometry; Probability & Statistics | Number, Algebra, Graphs, Geometry, Trig, Probability, Statistics |
| 2     | Number, Rounding & Bounds; Algebra & Equations; Graphs & Functions; Geometry & Trigonometry; Probability & Statistics | Same breadth |
| 3     | Mixed Number & Ratio; Algebra & Equations; Graphs, Geometry & Trigonometry; Probability & Statistics | Ratio, Algebra, Graphs, Geometry, Trig, Probability, Statistics |

All main Edexcel Higher content areas are represented. Unit specs provide sub-topic drills (e.g. circle theorems, vectors, iteration).

### 3.3 Implementation

- `GOLDEN_TOPIC_SPECS` and `GOLDEN_UNIT_SPECS` include every H1/H2/H3 ID range.
- `goldenMathsQuestions.ts` defines all 240 Higher questions (H1, H2, H3 arrays).
- Maths Hub filters by tier and paper; full-paper quiz uses all prompts for that paper + tier from the DB (after golden seed).

**Higher conclusion:** Full test content coverage is present. No gaps for full-paper or topic/unit practice.

---

## 4. Foundation tier – coverage

### 4.1 Full-paper question counts

| Paper   | Golden IDs   | Count | Typical target | Assessment |
|---------|---------------|-------|-----------------|------------|
| Paper 1 | F1-01 – F1-30 | 30    | ~20–25+         | OK – extended |
| Paper 2 | F2-01 – F2-35 | 35    | ~20–25+         | OK – extended |
| Paper 3 | F3-01 – F3-40 | 40    | ~20–25+         | OK – extended |

**Total Foundation golden questions:** 105 (30 + 35 + 40).  
**Documentation:** `GOLDEN_MATHS_QUESTION_LIST.md` now states 30 mixed questions for Paper 3 and 25 for Paper 2; code and doc are aligned.

**Verdict:** Foundation **has** full test content coverage for full-paper quizzes. All three papers meet or exceed the ~20–25 question target.

### 4.2 Topic coverage (curriculum areas)

| Paper | Topic specs | Questions per topic | Notes |
|-------|-------------|----------------------|--------|
| 1     | Number & Arithmetic (10); Algebra (7); Graphs & Geometry (13) | 30 total | Good spread; F1 extended by 4 in Graphs & Geometry |
| 2     | Number (5); Algebra & Graphs (3); Geometry & Measures (4); Statistics (2); Foundation Paper 2 (mixed practice) (21) | 35 total | Extended mixed topic (F2-15–F2-35) |
| 3     | Foundation Paper 3 (mixed) (40) | 40 total | Extended mixed paper (F3-01–F3-40) |

Curriculum areas (Number, Algebra, Graphs, Geometry, Statistics, and mixed) are covered with sufficient depth for topic and full-paper practice.

### 4.3 Unit (sub-topic) coverage

- Unit specs exist for all Foundation topics: F1 (4 units; Graphs & Geometry unit F1-18–F1-30), F2 (5 units including “Mixed practice” F2-15–F2-35), F3 (1 unit F3-01–F3-40).
- Topic and unit quizzes are viable for all papers.

**Foundation conclusion:** Foundation has **full test content coverage**. All three papers have enough questions for exam-style full-paper practice; topic and unit specs are complete and aligned with the golden question list.

---

## 5. Comparison: Higher vs Foundation

| Aspect | Higher | Foundation |
|--------|--------|------------|
| Questions per paper (P1 / P2 / P3) | 80 / 80 / 80 | 30 / 35 / 40 |
| Total golden questions | 240 | 105 |
| Full-paper quiz viable? | Yes | Yes |
| Topic quizzes | 16 topics, all with enough questions | 9 topics; F1 Graphs & Geometry (13), F2 mixed (21), F3 mixed (40) |
| Unit quizzes | 16 units, 12–25 questions each | 10 units; F2 mixed (21), F3 mixed (40) |
| Meets ~20–30 per paper target? | Exceeds (80) | Yes (30, 35, 40) |

---

## 6. Taxonomy vs golden spec

- `src/config/taxonomy/maths.ts` defines a **single** maths taxonomy (Number, Algebra, Geometry, Statistics & Probability) with many question types and tags (e.g. p1, p2, p3). It is **not** tier-specific and is not the source of tier/paper question counts.
- The **source of truth** for “what counts as full paper / topic / unit” for Maths Mastery is the **golden** config: `goldenMathsTopicUnitSpec.ts` and `goldenMathsQuestions.ts`. The hub and quiz builder use golden IDs and tier/paper on prompts.
- No conflict for Higher or Foundation. Golden question counts are sufficient for both tiers.

---

## 7. Improvements – Foundation extensions (implemented)

Foundation was extended beyond the initial full-coverage target to give more practice and balance:

| Change | Before | After | Rationale |
|--------|--------|--------|-----------|
| **Paper 1** | 26 | **30** | +4 in Graphs & Geometry (trapezium area, mode, ordering decimals, negative product). Aligns P1 length with F3 and adds non-calculator drill. |
| **Paper 2** | 25 | **35** | +10 in mixed practice (F2-26–F2-35): standard form, % increase, line plot, expand/solve, cylinder volume, square area, mean, P(dice), simplify, pie fraction. |
| **Paper 3** | 30 | **40** | +10 in mixed (F3-31–F3-40): fraction of amount, solve, scale, factors, % increase, sequence, Pythagoras, division, P(three heads), surface area. |
| **Total Foundation** | 81 | **105** | More variety and longer full-paper/topic quizzes. |

**Spec updates:** Topic `f1-graphs-geometry` extended to F1-30; `f2-mixed` to F2-35; `f3-mixed` to F3-40. Corresponding units updated. `GOLDEN_MATHS_QUESTION_LIST.md` and this audit updated.

**Difficulty and marks (implemented):** Maths Mastery now uses difficulty grading and accurate marks. Each golden question has an optional difficulty 1–5 (default by tier: Foundation 2, Higher 3), stored in `prompt.meta.difficulty` when seeding; default marks are 1 for most types and 2 for proofShort, multiNumeric, tableFill, dragMatch. Quiz shows total marks and per-question difficulty when set; marks awarded are tracked and persisted on the attempt; the results page shows "X/Y marks" alongside accuracy and correct count.

**Possible future improvements (not yet done):**

- **F2 curriculum topics:** Number (5), Algebra & Graphs (3), Geometry (4), Statistics (2) are still thin for topic-only quizzes. Adding questions directly into those bands would require renumbering or new contiguous blocks (e.g. F2-36–F2-40 for Statistics).
- **Diagram coverage:** More Foundation questions could use existing diagram types (e.g. numberLine, triangle, pieChart) where appropriate.
- **Difficulty spread:** Tag or order questions by difficulty so “easier first” or targeted difficulty is possible in the hub later.

---

## 8. Recommendations

### 8.1 Foundation – full test content coverage (implemented)

The following were implemented:

1. **Foundation Paper 2 and Paper 3 question counts increased**  
   - F2: added F2-15 – F2-25 (11 questions) → 25 total. New topic “Foundation Paper 2 (mixed practice)” and unit “Mixed practice (number, algebra, geometry, statistics)”.  
   - F3: added F3-09 – F3-30 (22 questions) → 30 total. Topic “Foundation Paper 3 (mixed)” extended to F3-01 – F3-30; unit “Foundation Paper 3 (mixed problem solving)” added.

2. **Documentation updated**  
   `GOLDEN_MATHS_QUESTION_LIST.md` now shows F2-01 – F2-25 (25), F3-01 – F3-30 (30), and “30 mixed questions total for Paper 3”. Summary and unit/topic tables updated.

3. **Topic/unit spec updated**  
   `goldenMathsTopicUnitSpec.ts`: new topic `f2-mixed` (F2-15 – F2-25), extended `f3-mixed` to F3-30; new units `f2-mixed-practice` and `f3-mixed-full`.

### 8.2 No change required for Higher

- Higher already has full test content coverage (80 questions per paper, all curriculum areas, topic and unit specs). No code or spec changes needed for coverage.

### 8.3 Optional (both tiers)

- Add a short line in the Maths Hub or docs: e.g. “Aligned with Edexcel GCSE Maths (Foundation / Higher)” so users know the intended exam board and tier coverage.

---

## 9. Files referenced

| File | Role |
|------|------|
| `src/config/goldenMathsTopicUnitSpec.ts` | Topic and unit specs; question ID ranges by tier/paper |
| `src/config/goldenMathsQuestions.ts` | All golden question definitions (F1, F2, F3, H1, H2, H3) |
| `GOLDEN_MATHS_QUESTION_LIST.md` | Human-readable list and intended counts (e.g. “≈30” for F3) |
| `src/config/gcseScope.ts` | Maths subject, tier mode foundation_higher, 3 papers |
| `src/config/taxonomy/maths.ts` | Generic maths taxonomy (not tier-specific; not used for golden counts) |
| `src/pages/maths/MathsHubPage.tsx` | Tier/paper/mode selection; full-paper uses all prompts for paper+tier |

---

## 10. Conclusion

- **Higher:** Has the full test content coverage required. All three papers have 80 questions each; topic and unit coverage is complete.
- **Foundation:** Has **full test content coverage** (extended). Paper 1 (30), Paper 2 (35), and Paper 3 (40) give more practice per paper; topic and unit specs are complete and aligned with the golden question list.
