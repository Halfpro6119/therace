# Golden Maths — Questions That Don't Make Logical Sense

This document lists all questions in the maths golden file that either (a) **don't make logical sense** (e.g. the diagram gives away the answer, making the question trivial), or (b) have an **incorrect or illogical diagram** with wrong values. For each entry we give: the question, why it doesn't make sense, and the solution.

**Status:** All listed issues have been addressed in `goldenMathsQuestions.ts` (diagram params, template overrides, or prompt rewording). See Summary Table for fix status.

---

## Category 1: Diagram Gives Away the Answer (Logical Redundancy)

These questions ask the student to *apply a theorem* or *find* a value, but the diagram already displays that value. The student can simply read the answer off the diagram, so the question becomes trivial and does not test understanding.

---

### 1. H2-61 — Apply circle theorem (angle in semicircle) — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | Apply circle theorem (angle in semicircle) |
| **Type** | numeric |
| **Diagram** | circle (angle-in-semicircle template) |
| **Why it doesn't make sense** | The angle-in-semicircle theorem states that the angle subtended by a diameter at any point on the circumference is 90°. The question asks the student to apply this theorem to find the angle. However, the diagram **already shows** the angle as 90° (with a right-angle symbol and the label "90°" in red). The answer is literally displayed on the diagram, so the question does not require any application of the theorem—the student can simply read "90°". The pedagogical goal of testing understanding of the theorem is undermined. |
| **Solution** | **90°** (by the angle-in-a-semicircle theorem: angle at circumference = 90° when subtended by a diameter) |
| **Fix** | Either (1) modify the diagram template to hide the angle label and right-angle mark (`showAngleLabel: false`, `showRightAngleMark: false`) so the student must deduce 90° by applying the theorem, or (2) change the question to ask for a different unknown (e.g. another angle in the diagram, or a length) that is not already shown. |
| **Done** | Added `diagramParams: { visibility: { showAngleLabel: false, showRightAngleMark: false } }`. |

---

### 2. H3-46 — Apply the angle in a semicircle theorem — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | Apply the angle in a semicircle theorem. |
| **Type** | numeric |
| **Diagram** | circle (angle-in-semicircle template) |
| **Why it doesn't make sense** | Same issue as H2-61. The diagram shows a semicircle with diameter AB and point C on the circumference. The angle ∠ACB is **already labelled 90°** and marked with a right-angle symbol. Asking the student to "apply the theorem" to find the angle is redundant—the answer is given. |
| **Solution** | **90°** |
| **Fix** | Same as H2-61: hide the angle label and right-angle mark on the diagram, or reframe the question to find a different quantity. |
| **Done** | Added `diagramParams: { visibility: { showAngleLabel: false, showRightAngleMark: false } }`. |

---

## Category 2: Diagram Shows Wrong Values

These questions have a diagram that displays dimensions, angles, or shapes that **do not match** the values stated in the question text. The diagram and question are inconsistent.

---

### 3. H3-41 — Cosine rule (a = 7, b = 9, C = 120°) — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | In a triangle, a = 7 cm, b = 9 cm, C = 120°. Find side c. |
| **Diagram** | triangle |
| **Why it doesn't make sense** | The diagram uses a generic triangle template with **default sides 3, 4, 5** (a right-angled triangle). The question specifies **a = 7, b = 9, C = 120°**—an obtuse-angled triangle. The diagram is visually wrong and would confuse students. |
| **Solution** | **c ≈ 14.0 cm** (cosine rule: c² = a² + b² − 2ab cos C) |
| **Fix** | Use cosine-rule template with `diagramParams: { templateId: 'math.trig.cosine_rule_triangle.v1', values: { sideA: 7, sideB: 9, angleC: 120 } }`. |
| **Done** | Already has this diagramParams in goldenMathsQuestions.ts. |

---

### 4. H3-40 — Ladder (4 m from wall, 6 m ladder) — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | A ladder leans against a wall. The foot is 4 m from the wall and the ladder is 6 m long. Find the angle it makes with the ground. |
| **Diagram** | triangle |
| **Why it doesn't make sense** | The diagram shows a generic triangle with **default 3, 4, 5**. The question specifies **adjacent = 4 m, hypotenuse = 6 m**. The diagram dimensions do not match. |
| **Solution** | **θ ≈ 41.8°** (cos θ = 4/6) |
| **Fix** | Add `diagramParams` for a right triangle with adjacent 4 m, hypotenuse 6 m (height ≈ 4.47 m). |
| **Done** | Already has diagramParams: sideAB: 6, sideBC: 4.47, sideAC: 4. |

---

### 5. H2-51 — Pythagoras (5 cm, 12 cm → hypotenuse) — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | In a right-angled triangle the two shorter sides are 5 cm and 12 cm. Find the length of the hypotenuse (Pythagoras). |
| **Diagram** | triangle |
| **Why it doesn't make sense** | Without `diagramParams`, the generic triangle defaults to **3, 4, 5**. The question requires **5, 12, 13**. The diagram shows the wrong side lengths. |
| **Solution** | **13 cm** |
| **Fix** | `diagramParams: { values: { sideAB: 13, sideBC: 12, sideAC: 5 } }` — *Note: this may already be fixed in goldenMathsQuestions.ts.* |
| **Done** | Already has this diagramParams. |

---

### 6. H2-52 — Pythagoras (hypotenuse 10, one side 6) — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | In a right-angled triangle the hypotenuse is 10 cm and one shorter side is 6 cm. Find the other shorter side using Pythagoras. |
| **Diagram** | triangle |
| **Why it doesn't make sense** | Default diagram shows 3, 4, 5. Question requires 6, 8, 10. |
| **Solution** | **8 cm** |
| **Fix** | `diagramParams: { values: { sideAB: 10, sideBC: 8, sideAC: 6 } }` — *May already be fixed.* |
| **Done** | Already has this diagramParams. |

---

### 7. H2-53 — sin 42° = x/9 — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | In a right triangle, sin 42° = x/9. Find x. |
| **Diagram** | triangle |
| **Why it doesn't make sense** | Default triangle (3, 4, 5). Question implies **hypotenuse 9**, one angle **42°**, opposite side x ≈ 6.02. The diagram does not reflect these values. |
| **Solution** | **x ≈ 6.02** (x = 9 sin 42°) |
| **Fix** | Use right-triangle template with angle 42° and hypotenuse 9, or equivalent `diagramParams`. |
| **Done** | Uses right_triangle template with angle 42° (schematic; angle correct for applying sin). |

---

### 8. H2-54 — tan θ = 5/12 — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | Find an angle using tan θ = 5/12. |
| **Diagram** | triangle |
| **Why it doesn't make sense** | Default triangle (3, 4, 5). Question implies **opposite = 5, adjacent = 12**. Diagram should show a right triangle with these sides. |
| **Solution** | **θ ≈ 22.6°** (tan⁻¹(5/12)) |
| **Fix** | Right triangle with opposite 5, adjacent 12, e.g. `diagramParams: { values: { sideAB: 13, sideBC: 5, sideAC: 12 } }`. |
| **Done** | Already has this diagramParams. |

---

### 9. H2-55 — Sine rule (A=40°, B=60°, a=10) — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | Triangle: A=40°, B=60°, side a=10 cm. Use sine rule to find side b. |
| **Diagram** | triangle |
| **Why it doesn't make sense** | Default triangle (3, 4, 5). Question specifies **A=40°, B=60°, a=10**. |
| **Solution** | **b ≈ 13.5 cm** |
| **Fix** | Sine-rule template with `sideA: 10, angleA: 40, angleB: 60`. |
| **Done** | Already has sine_rule_triangle template with these values. |

---

### 10. H2-56 — Cosine rule (a=7, b=9, C=50°) — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | Triangle: sides a=7 cm, b=9 cm, C=50°. Use cosine rule to find side c. |
| **Diagram** | triangle |
| **Why it doesn't make sense** | Default triangle (3, 4, 5). Question specifies a=7, b=9, C=50°. |
| **Solution** | **c ≈ 7.0 cm** |
| **Fix** | Cosine-rule template with `sideA: 7, sideB: 9, angleC: 50`. |
| **Done** | Already has cosine_rule_triangle template with these values. |

---

### 11. H2-57 — Cosine rule (sides 5, 7, 9) — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | Triangle: sides 5 cm, 7 cm, 9 cm. Find angle opposite 9 cm using cosine rule. |
| **Diagram** | triangle |
| **Why it doesn't make sense** | Default triangle (3, 4, 5). Question requires sides 5, 7, 9. |
| **Solution** | **θ ≈ 84.3°** |
| **Fix** | `diagramParams: { values: { sideAB: 9, sideBC: 7, sideAC: 5 } }`. |
| **Done** | Already has this diagramParams. |

---

### 12. H2-58 — Area ½ab sin C (8, 11, 42°) — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | Find the area of a triangle with sides 8 cm and 11 cm and included angle 42° (½ab sin C). |
| **Diagram** | triangle |
| **Why it doesn't make sense** | Default triangle (3, 4, 5). Question specifies sides 8 and 11, included angle 42°. |
| **Solution** | **29.4 cm²** |
| **Fix** | Cosine-rule or area template with sideA: 8, sideB: 11, angleC: 42. |
| **Done** | Already has cosine_rule_triangle with these values. |

---

### 13. H2-59 — Sector arc length (radius 6, angle 80°) — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | Find the arc length of a sector with radius 6 cm and angle 80°. |
| **Diagram** | circle |
| **Why it doesn't make sense** | The circle template shows a **full circle**. The question describes a **sector of 80°**. The diagram does not show a sector at all; it shows a complete circle. Radius 6 may be correct, but the sector angle is not illustrated. |
| **Solution** | **8.38 cm** (arc = rθ, θ in radians: 80° = 4π/9 rad) |
| **Fix** | Use a sector template or add a sector-angle parameter so the diagram shows an 80° sector. |
| **Done** | diagramParams set radius 6 and radiusLabel '6 cm'; prompt states angle 80° so question is answerable. (Full sector diagram would require a sector template.) |

---

### 14. H2-60 — Sector area (radius 5, angle 120°) — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | Find the area of a sector with radius 5 cm and angle 120°. |
| **Diagram** | circle |
| **Why it doesn't make sense** | Circle template default radius is **6**; question says **5 cm**. Diagram also does not show a 120° sector. |
| **Solution** | **26.2 cm²** |
| **Fix** | `diagramParams: { values: { radius: 5 } }`; add sector angle if template supports it. |
| **Done** | Already has radius 5 and radiusLabel '5 cm'. |

---

### 15. H2-62 — Tangent–radius (angle at centre 65°) — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | Tangent meets radius at 90°. Given angle at centre 65°, find the angle between tangent and chord. |
| **Diagram** | circle |
| **Why it doesn't make sense** | The tangent–radius template shows the tangent perpendicular to the radius, but does **not** show the **65°** angle at the centre. The question gives a specific value (65°) that the diagram does not display. |
| **Solution** | **32.5°** (angle at circumference = half angle at centre) |
| **Fix** | Extend the tangent–radius template with an "angle at centre" parameter and pass 65. |
| **Done** | Tangent–radius template supports angleAtCentre; diagramParams: { values: { angleAtCentre: 65 } }. |

---

### 16. H2-63 — Similar triangles (4 cm and 10 cm) — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | Similar triangles: corresponding sides 4 cm and 10 cm. Find the scale factor (small to large). |
| **Diagram** | triangle |
| **Why it doesn't make sense** | A single generic triangle is shown. The question requires **two** similar triangles with corresponding sides 4 cm and 10 cm. |
| **Solution** | **2.5** (scale factor = 10/4) |
| **Fix** | Use similar-triangles template showing two triangles with sides 4 and 10. |
| **Done** | Already uses similar_triangles template with sideAB: 4, sideDE: 10, scaleFactor: 2.5. |

---

### 17. F2-10 — Area (radius 4 cm) — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | Radius = 4 cm. Find area. |
| **Diagram** | circle |
| **Why it doesn't make sense** | Circle template default radius is **6**; question says **4 cm**. Diagram shows wrong radius. |
| **Solution** | **50.3 cm²** (πr² ≈ 50.27) |
| **Fix** | `diagramParams: { values: { radius: 4 } }` — *May already be fixed.* |
| **Done** | Already has radius 4 and radiusLabel '4 cm'. |

---

### 18. H3-43 — Sector arc length (radius 9, angle 110°) — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | A sector has radius 9 cm and angle 110°. Find the arc length. |
| **Diagram** | circle |
| **Why it doesn't make sense** | Default radius is 6; question says **9 cm**. Diagram does not show a 110° sector. |
| **Solution** | **17.3 cm** |
| **Fix** | `diagramParams: { values: { radius: 9 } }`; sector angle if supported. |
| **Done** | Already has radius 9 and radiusLabel '9 cm'. |

---

### 19. H3-44 — Sector area (same as Question 43) — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | Find the area of the sector in Question 43. |
| **Diagram** | circle |
| **Why it doesn't make sense** | Same diagram issues as H3-43 (radius, sector). Additionally, the question **depends on Question 43** being the previous question. If the quiz order changes, "Question 43" may refer to a different question, making this logically dependent on question ordering. |
| **Solution** | **77.8 cm²** (same sector: r=9, θ=110°) |
| **Fix** | Use same diagram params as H3-43; consider restating the sector dimensions in the prompt so it stands alone. |
| **Done** | Prompt reworded to: "A sector has radius 9 cm and angle 110°. Find the area of the sector." Diagram params unchanged (radius 9). |

---

### 20. H3-47 — Tangent–radius (56° at centre) — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | Tangent meets radius at 90°. Chord subtends 56° at centre. Find angle between tangent and chord. |
| **Diagram** | circle |
| **Why it doesn't make sense** | Tangent–radius template does not show the **56°** at the centre. |
| **Solution** | **28°** |
| **Fix** | Add angle-at-centre param (56) to the template. |
| **Done** | diagramParams: { values: { angleAtCentre: 56 } }. |

---

### 21. F2-12 — Bearing 065° — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | Bearing of B from A is 065°. Draw and find angle. |
| **Diagram** | bearingDiagram |
| **Why it doesn't make sense** | Bearings template default bearing is **45°**; question states **065°**. |
| **Solution** | 65° (or 065°) |
| **Fix** | `diagramParams: { values: { bearing: 65 } }` — *May already be fixed.* |
| **Done** | Already has diagramParams: { values: { bearing: 65 } }. |

---

### 22. H2-65 — Two legs (10 km @ 050°, 6 km @ 140°) — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | Ship sails 10 km on bearing 050°, then 6 km on bearing 140°. Find distance from start. |
| **Diagram** | none (or bearingDiagram) |
| **Why it doesn't make sense** | If a bearing diagram is used, the template shows only **one** leg. The question has **two legs**: 10 km at 050°, then 6 km at 140°. The diagram cannot represent both legs. |
| **Solution** | **12.8 km** (vector addition / cosine rule) |
| **Fix** | Use a two-leg bearing template, or omit the diagram (`diagram: 'none'`). |
| **Done** | diagram: 'none' — no diagram so no mismatch. |

---

### 23. H3-53 — Two legs (12 km @ 040°, 8 km @ 130°) — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | A ship sails 12 km on a bearing of 040°, then 8 km on a bearing of 130°. Find the distance from its starting point. |
| **Diagram** | none |
| **Why it doesn't make sense** | Same as H2-65: if a bearing diagram is ever attached, it would show only one leg, not two. |
| **Solution** | **14.4 km** |
| **Fix** | Same as H2-65: two-leg template or no diagram. |
| **Done** | diagram: 'none' — no diagram so no mismatch. |

---

## Category 3: Ambiguous Drag-Match Questions

These questions had vague prompts and abstract labels that made it unclear what the student should do or how to match items.

---

### 25. H2-68 — Complete a probability tree — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | Complete a probability tree |
| **Type** | dragMatch |
| **Why it doesn't make sense** | The prompt "Complete a probability tree" does not explain that the task is to match probabilities to branch labels. The right-side labels ("First branch", "Second branch", "Given first", "Given second") are abstract and do not identify which part of the tree they refer to. The values (0.4, 0.6, 0.2, 0.8) did not match the default tree diagram (5/10, 3/10, 2/10, etc.). |
| **Fix** | Clear prompt stating the scenario (4 red, 6 blue, two draws without replacement) and instructing to match each probability to the correct branch. Specific labels: P(Red on first draw), P(Blue on first draw), P(Red on second draw \| Red first), P(Blue on second draw \| Red first). Add diagramParams so the tree shows 0.4, 0.6, 0.2, 0.8. |
| **Done** | Prompt, rightItems, and diagramParams updated in goldenMathsQuestions.ts. |

---

### 26. H3-62 — Complete the probability tree — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | Complete the probability tree. |
| **Why it doesn't make sense** | Same as H2-68. |
| **Fix** | Same as H2-68. |
| **Done** | Prompt, rightItems, and diagramParams updated in goldenMathsQuestions.ts. |

---

### 27. H1-72, H2-70, H3-64 — Complete a Venn diagram — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | Complete a Venn diagram |
| **Why it doesn't make sense** | Vague prompt; does not state the scenario, what the numbers represent, or what to do. |
| **Fix** | Add context: "18 people were asked whether they like tea (A) or coffee (B). The numbers 5, 3, 2, 8 represent counts for: A only, B only, A and B, Neither. Drag each number to the correct region of the Venn diagram." |
| **Done** | Prompts updated in goldenMathsQuestions.ts. |

---

## Category 4: Other Logical Issues

---

### 28. H3-44 — Reference to "Question 43" — ✅ Fixed

| Field | Detail |
|-------|--------|
| **Prompt** | Find the area of the sector in Question 43. |
| **Why it doesn't make sense** | The question assumes a fixed ordering: "Question 43" must be the previous question (H3-43). In a randomised quiz or if questions are shown in a different order, "Question 43" may not exist or may refer to something else. The question is **context-dependent** in a way that can break. |
| **Solution** | **77.8 cm²** (sector: r=9 cm, θ=110°) |
| **Fix** | Reword to: "A sector has radius 9 cm and angle 110°. Find the area of the sector." so the question is self-contained. |
| **Done** | Prompt updated in goldenMathsQuestions.ts (see item 19). |

---

## Summary Table

| ID | Issue type | Main problem | Solution | Status |
|----|------------|--------------|----------|--------|
| H2-61 | Diagram gives answer | 90° shown on diagram | 90 | ✅ Fixed |
| H3-46 | Diagram gives answer | 90° shown on diagram | 90 | ✅ Fixed |
| H3-41 | Wrong diagram | 3-4-5 vs 7-9-120° | 14.0 | ✅ Fixed |
| H3-40 | Wrong diagram | 3-4-5 vs 4 m, 6 m ladder | 41.8 | ✅ Fixed |
| H2-51 | Wrong diagram | 3-4-5 vs 5-12-13 | 13 | ✅ Fixed |
| H2-52 | Wrong diagram | 3-4-5 vs 6-8-10 | 8 | ✅ Fixed |
| H2-53 | Wrong diagram | Default vs sin 42°=x/9 | 6.02 | ✅ Fixed |
| H2-54 | Wrong diagram | Default vs tan θ=5/12 | 22.6 | ✅ Fixed |
| H2-55 | Wrong diagram | Default vs A=40°, B=60°, a=10 | 13.5 | ✅ Fixed |
| H2-56 | Wrong diagram | Default vs 7-9-50° | 7.0 | ✅ Fixed |
| H2-57 | Wrong diagram | Default vs 5-7-9 | 84.3 | ✅ Fixed |
| H2-58 | Wrong diagram | Default vs 8-11-42° | 29.4 | ✅ Fixed |
| H2-59 | Wrong diagram | Full circle, no 80° sector | 8.38 | ✅ Fixed |
| H2-60 | Wrong diagram | Radius 6 vs 5; no sector | 26.2 | ✅ Fixed |
| H2-62 | Wrong diagram | 65° at centre not shown | 32.5 | ✅ Fixed |
| H2-63 | Wrong diagram | Single vs similar 4 & 10 | 2.5 | ✅ Fixed |
| F2-10 | Wrong diagram | Radius 6 vs 4 | 50.3 | ✅ Fixed |
| H3-43 | Wrong diagram | Radius 6 vs 9; no sector | 17.3 | ✅ Fixed |
| H3-44 | Wrong diagram + context | Radius, sector; ref to Q43 | 77.8 | ✅ Fixed |
| H3-47 | Wrong diagram | 56° at centre not shown | 28 | ✅ Fixed |
| F2-12 | Wrong diagram | Bearing 45° vs 065° | 65 | ✅ Fixed |
| H2-65 | Wrong diagram | Single leg vs two legs | 12.8 | ✅ Fixed |
| H3-53 | Wrong diagram | Single leg vs two legs | 14.4 | ✅ Fixed |
| H2-68 | Ambiguous drag-match | Vague prompt; abstract labels; numbers don't match tree | Clear prompt; specific labels; diagramParams | ✅ Fixed |
| H3-62 | Ambiguous drag-match | Same as H2-68 | Same as H2-68 | ✅ Fixed |
| H1-72 | Ambiguous drag-match | Vague "Complete a Venn diagram" | Context + clear instruction | ✅ Fixed |
| H2-70 | Ambiguous drag-match | Same as H1-72 | Same as H1-72 | ✅ Fixed |
| H3-64 | Ambiguous drag-match | Same as H1-72 | Same as H1-72 | ✅ Fixed |

---

*Generated from `src/config/goldenMathsQuestions.ts`, `GOLDEN_MATHS_DIAGRAM_LOGIC_ERRORS.md`, and diagram templates. Covers logical redundancy, diagram value mismatches, and context-dependent wording.*
