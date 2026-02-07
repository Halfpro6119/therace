# Golden Maths — Diagram Logic Errors

This document lists all questions in the maths golden list where the **diagram does not match the question text** (wrong dimensions, angles, or template). For each we state: what the diagram should show, what it currently shows, and how to fix it so the diagram renders with correct logic.

**Convention:** Side **a** is opposite angle A (side BC), **b** opposite B (side AC), **c** opposite C (side AB). Standard triangle template `math.geometry.triangle.v1` uses `sideAB`, `sideBC`, `sideAC` (c, a, b).

---

## 1. H3-41 — Cosine rule (a = 7, b = 9, C = 120°)

| Field | Detail |
|-------|--------|
| **Prompt** | In a triangle, a = 7 cm, b = 9 cm, C = 120°. Find side c. |
| **Current issue** | Diagram uses generic triangle template `math.geometry.triangle.v1` with **default sides 3, 4, 5** (right-angled). Question specifies **a = 7, b = 9, C = 120°** (obtuse angle at C). So the diagram shows a 3–4–5 right triangle instead of a 7–9–120° triangle. |
| **Diagram should show** | Triangle with side a = 7 cm, side b = 9 cm, included angle C = 120° (obtuse), and side c either shown as “?” or computed (~14.0 cm). |
| **How to fix** | Use the **cosine rule** template and pass question-specific params. In `goldenMathsQuestions.ts` for H3-41 add: `diagramParams: { templateId: 'math.trig.cosine_rule_triangle.v1', values: { sideA: 7, sideB: 9, angleC: 120 } }`. Optionally set `sideC: 0` or omit so it shows “?”. |

---

## 2. H3-40 — Ladder (4 m from wall, 6 m ladder)

| Field | Detail |
|-------|--------|
| **Prompt** | A ladder leans against a wall. The foot is 4 m from the wall and the ladder is 6 m long. Find the angle it makes with the ground. |
| **Current issue** | Diagram uses generic triangle with **default 3, 4, 5**. Question specifies **adjacent = 4 m, hypotenuse = 6 m** (right-angled). So sides shown are wrong. |
| **Diagram should show** | Right-angled triangle: horizontal 4 m (ground), hypotenuse 6 m (ladder), vertical height √(36−16) m; angle between ground and ladder marked (answer ~41.8°). |
| **How to fix** | Either: (1) Add `diagramParams` for generic triangle with `values: { sideAB: 6, sideBC: 4.47, sideAC: 4 }` (with side lengths consistent with 4 and 6), or (2) Use right-triangle template `math.trig.right_triangle.v1` with lengths/angle derived from 4 and 6 (if that template supports side lengths). Prefer params that give **adjacent = 4, hypotenuse = 6** so the diagram matches the question. |

---

## 3. H2-51 — Pythagoras (5 cm, 12 cm → hypotenuse)

| Field | Detail |
|-------|--------|
| **Prompt** | In a right-angled triangle the two shorter sides are 5 cm and 12 cm. Find the length of the hypotenuse (Pythagoras). |
| **Current issue** | No `diagramParams`; generic triangle defaults to **3, 4, 5**. Question requires **5, 12, 13**. |
| **Diagram should show** | Right-angled triangle with sides **5 cm, 12 cm, 13 cm** (13 as hypotenuse). |
| **How to fix** | Add `diagramParams: { values: { sideAB: 13, sideBC: 12, sideAC: 5 } }` (or equivalent labelling so the two shorter sides are 5 and 12 and the hypotenuse 13). |

---

## 4. H2-52 — Pythagoras (hypotenuse 10, one side 6)

| Field | Detail |
|-------|--------|
| **Prompt** | In a right-angled triangle the hypotenuse is 10 cm and one shorter side is 6 cm. Find the other shorter side using Pythagoras. |
| **Current issue** | No `diagramParams`; diagram shows **3, 4, 5**. Question requires **6, 8, 10**. |
| **Diagram should show** | Right-angled triangle with sides **6 cm, 8 cm, 10 cm** (10 as hypotenuse). |
| **How to fix** | Add `diagramParams: { values: { sideAB: 10, sideBC: 8, sideAC: 6 } }` (hypotenuse 10, shorter sides 6 and 8). |

---

## 5. H2-53 — sin 42° = x/9

| Field | Detail |
|-------|--------|
| **Prompt** | In a right triangle, sin 42° = x/9. Find x. |
| **Current issue** | Uses generic triangle (default 3, 4, 5). Question implies **hypotenuse 9**, one angle **42°**, and **x** as opposite side (~6.02). |
| **Diagram should show** | Right-angled triangle with hypotenuse 9, one acute angle 42°, and the side opposite that angle labelled (e.g. x). |
| **How to fix** | Use right-triangle template `math.trig.right_triangle.v1` with angle 42° and scale so hypotenuse = 9 (if template supports it), or add diagramParams that produce a right triangle consistent with sin 42° = x/9. |

---

## 6. H2-54 — tan θ = 5/12

| Field | Detail |
|-------|--------|
| **Prompt** | Find an angle using tan θ = 5/12. |
| **Current issue** | Generic triangle default (3, 4, 5). Question implies **opposite = 5, adjacent = 12** and angle θ. |
| **Diagram should show** | Right-angled triangle with opposite 5, adjacent 12, and angle θ marked. |
| **How to fix** | Use `math.trig.right_triangle.v1` with dimensions giving opposite 5 and adjacent 12 (e.g. angle ≈ 22.6°), or add diagramParams to the generic triangle so two perpendicular sides are 5 and 12. |

---

## 7. H2-55 — Sine rule (A=40°, B=60°, a=10)

| Field | Detail |
|-------|--------|
| **Prompt** | Triangle: A=40°, B=60°, side a=10 cm. Use sine rule to find side b. |
| **Current issue** | No `diagramParams`; generic triangle shows 3, 4, 5. Question specifies **angles A=40°, B=60°** and **side a=10**. |
| **Diagram should show** | Triangle with angle A=40°, angle B=60°, side a (BC)=10 cm; side b to be found. |
| **How to fix** | Add `diagramParams: { templateId: 'math.trig.sine_rule_triangle.v1', values: { sideA: 10, angleA: 40, angleB: 60 } }` (and optionally angleC and sideB for consistency). |

---

## 8. H2-56 — Cosine rule (a=7, b=9, C=50°)

| Field | Detail |
|-------|--------|
| **Prompt** | Triangle: sides a=7 cm, b=9 cm, C=50°. Use cosine rule to find side c. |
| **Current issue** | No `diagramParams`; diagram defaults to 3, 4, 5. Question specifies **a=7, b=9, C=50°**. |
| **Diagram should show** | Triangle with sides a=7, b=9, included angle C=50°, side c shown or “?”. |
| **How to fix** | Add `diagramParams: { templateId: 'math.trig.cosine_rule_triangle.v1', values: { sideA: 7, sideB: 9, angleC: 50 } }`. |

---

## 9. H2-57 — Cosine rule (sides 5, 7, 9; angle opposite 9)

| Field | Detail |
|-------|--------|
| **Prompt** | Triangle: sides 5 cm, 7 cm, 9 cm. Find angle opposite 9 cm using cosine rule. |
| **Current issue** | No `diagramParams`; diagram shows 3, 4, 5. Question requires **all three sides 5, 7, 9** and the angle opposite the 9 cm side. |
| **Diagram should show** | Triangle with sides 5, 7, 9 (with 9 clearly associated to one angle). |
| **How to fix** | Add `diagramParams: { values: { sideAB: 9, sideBC: 7, sideAC: 5 } }` so that side AB = 9 (angle C is opposite side c=9). Labels can be chosen so “angle opposite 9” is unambiguous. |

---

## 10. H2-58 — Area ½ab sin C (8, 11, 42°)

| Field | Detail |
|-------|--------|
| **Prompt** | Find the area of a triangle with sides 8 cm and 11 cm and included angle 42° (½ab sin C). |
| **Current issue** | No `diagramParams`; generic triangle shows 3, 4, 5. Question specifies **two sides 8 and 11** and **included angle 42°**. |
| **Diagram should show** | Triangle with two sides 8 cm and 11 cm and the included angle 42° marked. |
| **How to fix** | Add `diagramParams: { templateId: 'math.trig.cosine_rule_triangle.v1', values: { sideA: 8, sideB: 11, angleC: 42 } }` (sideC can be 0 or omitted so it’s not misleading). |

---

## 11. H2-59 — Sector arc length (radius 6, angle 80°)

| Field | Detail |
|-------|--------|
| **Prompt** | Find the arc length of a sector with radius 6 cm and angle 80°. |
| **Current issue** | Diagram uses `math.circle.basic.v1` (full circle, radius configurable). Default radius is 6, so **radius is correct**, but the diagram does **not** show a **sector of 80°**; it shows a full circle. |
| **Diagram should show** | Circle with radius 6 cm and a **sector** of **80°** clearly indicated (e.g. two radii and arc). |
| **How to fix** | Either: (1) Add a sector angle parameter to the circle template and pass `values: { radius: 6 }, ... sectorAngle: 80`, or (2) Introduce a “sector” diagram template and use it for this and H2-60, H3-43, H3-44. Until then, add `diagramParams: { values: { radius: 6 } }` and document that the diagram does not show the sector angle (or add a note in the question that the sector angle is 80°). |

---

## 12. H2-60 — Sector area (radius 5, angle 120°)

| Field | Detail |
|-------|--------|
| **Prompt** | Find the area of a sector with radius 5 cm and angle 120°. |
| **Current issue** | Circle template **default radius is 6**; question says **5 cm**. No sector angle shown. |
| **Diagram should show** | Circle with **radius 5 cm** and a **sector of 120°**. |
| **How to fix** | Add `diagramParams: { values: { radius: 5 } }` so at least the radius is correct. If the circle template supports a sector angle, add it (e.g. 120). Otherwise document that sector angle is not shown or add a dedicated sector template. |

---

## 13. H2-61 — Angle in a semicircle

| Field | Detail |
|-------|--------|
| **Prompt** | Apply circle theorem (angle in semicircle). |
| **Current issue** | Seed logic detects “semicircle” and uses `math.circle_theorems.angle_in_semicircle.v1`. **No numeric mismatch**; diagram type is appropriate. |
| **Diagram should show** | Semicircle (diameter) with a point on the circumference and angle 90° at that point. |
| **How to fix** | None required for logic; optional tuning of labels/position if desired. |

---

## 14. H2-62 — Tangent–radius (angle at centre 65°)

| Field | Detail |
|-------|--------|
| **Prompt** | Tangent meets radius at 90°. Given angle at centre 65°, find the angle between tangent and chord. |
| **Current issue** | Seed uses `math.circle_theorems.tangent_radius.v1`. Template shows tangent perpendicular to radius but does **not** expose an “angle at centre” (e.g. 65°) in its schema. So the **65°** from the question is not shown on the diagram. |
| **Diagram should show** | Circle with radius, tangent at 90°, and chord such that the **angle at the centre** is **65°** (and the requested angle between tangent and chord is 32.5°). |
| **How to fix** | Extend the tangent–radius template with a parameter for “angle at centre” (e.g. 65) and pass it via diagramParams, or add a note in the question that the angle at the centre is 65°. |

---

## 15. H2-63 — Similar triangles (4 cm and 10 cm)

| Field | Detail |
|-------|--------|
| **Prompt** | Similar triangles: corresponding sides 4 cm and 10 cm. Find the scale factor (small to large). |
| **Current issue** | Diagram type is `triangle`; engine uses generic triangle (3, 4, 5). Question requires **two similar triangles** with corresponding sides **4 cm and 10 cm** (scale factor 2.5). |
| **Diagram should show** | Two similar triangles with one pair of corresponding sides labelled 4 cm and 10 cm. |
| **How to fix** | Use similar-triangles template: add `diagramParams: { templateId: 'math.geometry.similar_triangles.v1', values: { sideAB: 4, sideDE: 10, scaleFactor: 2.5 } }` (or equivalent so one triangle has side 4 and the other 10 on corresponding sides). |

---

## 16. F2-09 — Circumference (radius 6 cm)

| Field | Detail |
|-------|--------|
| **Prompt** | Radius = 6 cm. Find circumference (1 dp). |
| **Current issue** | Circle template default radius is **6**; question says 6 cm. **Match.** |
| **Diagram should show** | Circle with radius 6 cm. |
| **How to fix** | Optional: add `diagramParams: { values: { radius: 6 }, labels: { radiusLabel: '6 cm' } }` for explicit label. |

---

## 17. F2-10 — Area (radius 4 cm)

| Field | Detail |
|-------|--------|
| **Prompt** | Radius = 4 cm. Find area. |
| **Current issue** | Circle template **default radius is 6**; question says **4 cm**. Diagram shows wrong radius. |
| **Diagram should show** | Circle with **radius 4 cm**. |
| **How to fix** | Add `diagramParams: { values: { radius: 4 }, labels: { radiusLabel: '4 cm' } }`. |

---

## 18. H3-43 — Sector arc length (radius 9, angle 110°)

| Field | Detail |
|-------|--------|
| **Prompt** | A sector has radius 9 cm and angle 110°. Find the arc length. |
| **Current issue** | Circle template default radius is **6**; question says **9 cm**. No sector angle; diagram is a full circle. |
| **Diagram should show** | Circle with **radius 9 cm** and a **sector of 110°**. |
| **How to fix** | Add `diagramParams: { values: { radius: 9 }, labels: { radiusLabel: '9 cm' } }`. If the template supports a sector angle, add 110. Otherwise document that the sector angle is 110° or extend the template. |

---

## 19. H3-44 — Sector area (same as Question 43)

| Field | Detail |
|-------|--------|
| **Prompt** | Find the area of the sector in Question 43. |
| **Current issue** | Same as H3-43: radius should be **9 cm**, sector **110°**; default circle is 6 and no sector. |
| **Diagram should show** | Same as H3-43: radius 9 cm, sector 110°. |
| **How to fix** | Same as H3-43: `diagramParams: { values: { radius: 9 }, labels: { radiusLabel: '9 cm' } }` and sector angle if supported. |

---

## 20. H3-46 — Angle in a semicircle

| Field | Detail |
|-------|--------|
| **Prompt** | Apply the angle in a semicircle theorem. |
| **Current issue** | Seed selects angle-in-semicircle template. **Appropriate.** |
| **Diagram should show** | Semicircle with angle 90° at circumference. |
| **How to fix** | None required. |

---

## 21. H3-47 — Tangent–radius (56° at centre)

| Field | Detail |
|-------|--------|
| **Prompt** | Tangent meets radius at 90°. Chord subtends 56° at centre. Find angle between tangent and chord. |
| **Current issue** | Tangent–radius template is used but does not show the **56°** at the centre. |
| **Diagram should show** | Tangent perpendicular to radius, chord subtending **56°** at centre; angle between tangent and chord = 28°. |
| **How to fix** | As for H2-62: add an “angle at centre” (or chord angle) parameter to the template and pass 56 via diagramParams. |

---

## 22. F2-12 — Bearing 065°

| Field | Detail |
|-------|--------|
| **Prompt** | Bearing of B from A is 065°. Draw and find angle. |
| **Current issue** | No `diagramParams`; bearings template **default bearing is 45°**. Question states **065°**. |
| **Diagram should show** | Bearing of B from A = **065°**. |
| **How to fix** | Add `diagramParams: { values: { bearing: 65 } }`. |

---

## 23. H2-65 — Two legs (10 km @ 050°, 6 km @ 140°)

| Field | Detail |
|-------|--------|
| **Prompt** | Ship sails 10 km on bearing 050°, then 6 km on bearing 140°. Find distance from start. |
| **Current issue** | Diagram type is `bearingDiagram`; template `math.bearings.north_arrow.v1` has a **single** bearing and distance. Question has **two legs**: 10 km at 050°, then 6 km at 140°. Diagram cannot show both legs. |
| **Diagram should show** | Two segments: first 10 km on 050°, second 6 km on 140°, from the same start (or from end of first leg). |
| **How to fix** | Either: (1) Add a “two-leg bearing” template that accepts two (bearing, distance) pairs and use it for this question, or (2) Keep current diagram and add a note that the diagram is illustrative (e.g. one leg only), or (3) Omit diagram for this question (`diagram: 'none'`) until a two-leg template exists. |

---

## 24. H3-53 — Two legs (12 km @ 040°, 8 km @ 130°)

| Field | Detail |
|-------|--------|
| **Prompt** | A ship sails 12 km on a bearing of 040°, then 8 km on a bearing of 130°. Find the distance from its starting point. |
| **Current issue** | Same as H2-65: bearings template shows only **one** bearing/distance; question has **two legs** (12 km @ 040°, 8 km @ 130°). |
| **Diagram should show** | Two legs: 12 km at 040°, then 8 km at 130°. |
| **How to fix** | Same as H2-65: new two-leg bearing template, or `diagram: 'none'`, or accept diagram as illustrative only. |

---

## Summary table

| ID     | Diagram type   | Main issue | Fix (short) |
|--------|----------------|------------|-------------|
| H3-41  | triangle       | 3-4-5 vs 7, 9, 120° | Use cosine rule template + sideA=7, sideB=9, angleC=120 |
| H3-40  | triangle       | 3-4-5 vs 4 m, 6 m ladder | Params for 4, 6 (and right angle) or right-triangle template |
| H2-51  | triangle       | 3-4-5 vs 5, 12, 13 | diagramParams sideAB=13, sideBC=12, sideAC=5 |
| H2-52  | triangle       | 3-4-5 vs 6, 8, 10 | diagramParams sideAB=10, sideBC=8, sideAC=6 |
| H2-53  | triangle       | 3-4-5 vs sin 42°=x/9 | Right triangle template with angle 42°, hypotenuse 9 |
| H2-54  | triangle       | 3-4-5 vs tan θ=5/12 | Right triangle 5, 12 (and angle) |
| H2-55  | triangle       | 3-4-5 vs A=40°, B=60°, a=10 | Sine rule template + params |
| H2-56  | triangle       | 3-4-5 vs 7, 9, C=50° | Cosine rule template + params |
| H2-57  | triangle       | 3-4-5 vs 5, 7, 9 | diagramParams sideAB=9, sideBC=7, sideAC=5 |
| H2-58  | triangle       | 3-4-5 vs 8, 11, 42° | Cosine rule template sideA=8, sideB=11, angleC=42 |
| H2-59  | circle         | No sector 80° (radius 6 OK) | Sector param or new sector template; radius 6 explicit |
| H2-60  | circle         | Radius 6 vs 5; no sector 120° | diagramParams radius: 5; sector if supported |
| H2-62  | circle         | Tangent–radius OK; 65° at centre not shown | Add angle-at-centre param to template |
| H2-63  | triangle       | Single triangle vs similar 4 & 10 | Similar-triangles template + params |
| F2-10  | circle         | Radius 6 vs 4 | diagramParams radius: 4, radiusLabel: '4 cm' |
| H3-43  | circle         | Radius 6 vs 9; no sector 110° | diagramParams radius: 9; sector 110° if supported |
| H3-44  | circle         | Same as H3-43 | Same as H3-43 |
| H3-47  | circle         | 56° at centre not shown | Angle-at-centre param (like H2-62) |
| F2-12  | bearingDiagram | Bearing 45° vs 065° | diagramParams bearing: 65 |
| H2-65  | bearingDiagram | Single leg vs two legs | Two-leg template or diagram: 'none' |
| H3-53  | bearingDiagram | Single leg vs two legs | Same as H2-65 |

---

## Implementation notes

- **Triangle:** Generic template is `math.geometry.triangle.v1` (sides `sideAB`, `sideBC`, `sideAC`). Specialised templates: `math.trig.cosine_rule_triangle.v1` (sideA, sideB, angleC), `math.trig.sine_rule_triangle.v1` (sideA, angleA, angleB, …), `math.trig.right_triangle.v1` (angle).
- **Circle:** `math.circle.basic.v1` has `values.radius` and labels; no sector angle in current schema.
- **Bearings:** `math.bearings.north_arrow.v1` has single `bearing` and `distance`; no second leg.
- Override template per question via `diagramParams.templateId` in `goldenMathsQuestions.ts`; other keys (e.g. `values`, `visibility`) are merged into diagram params at seed time in `goldenQuestionSeed.ts`.
