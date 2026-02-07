# Higher Maths Papers 1, 2 & 3 — Questions Not Fully Functional / Not Operating as Intended

This document lists every **Higher** tier **Paper 1, 2, or 3** maths question that is either **not fully functional** or **does not yet operate as intended**.  
Source: `src/config/goldenMathsQuestions.ts`, `QuestionRenderer`, `grade.ts`, and diagram/type support.

---

## Summary

| Paper | Not fully functional (count) | Reason categories |
|-------|-----------------------------|--------------------|
| **Paper 1** | 0 | All listed questions now have fixed answers/diagramParams or dedicated UI. |
| **Paper 2** | 0 | All listed questions now have fixed answers/diagramParams or dedicated UI. |
| **Paper 3** | 0 | All listed questions now have fixed answers/diagramParams or dedicated UI. |

**Total: 0** higher-tier questions in this list remain non-functional. All 87 previously listed have been addressed in config and/or dedicated UI.

---

### Implementation status (recent fixes)

- **Fixed answers added** so auto-grading works for many previously empty-answer questions: prompts were made specific (e.g. fixed dimensions, data, or ratios) and model answers added in `goldenMathsQuestions.ts`. Examples: H1-52 (trapezium area 28), H1-64–66 (mean/median/range with fixed data), H1-73–80 (probability/short/proofShort with accepted answers), H2-51–60, H2-62–67, H2-72–80, H3-47, H3-53, H3-58–60, H3-66–80.
- **Short / proofShort / open-ended**: multiple accepted answers (e.g. correlation, box plot comparison, bias, outlier) so sensible responses can be marked correct. **Mark scheme grading**: for proofShort/open-ended, `questionData.markScheme` can list criteria with `keywords` and/or `keyNumbers` and `marks` per criterion; marks are summed (capped at maxMarks) for each matched criterion.
- **graphPlot / geometryConstruct**: **Fully implemented.** Dedicated UI: `CoordinateGridInput` (SVG coordinate grid; click to plot points, polyline for graphPlot, draggable triangle for geometryConstruct). Grading: `gradeCoordinatePlot()` compares submitted `points` to `questionData.expectedPoints` with `coordinateTolerance` (default 0.6). Golden questions H1-37, H1-51, H2-37, H2-47, H3-51 have `questionData.expectedPoints` set; seed passes `questionData` into prompt meta. Submit pipeline validates `points.length > 0`; fallback to short-text grading when `expectedPoints` is missing.
- **inequalityPlot (H2-27, H3-24)**: multiple accepted forms added (e.g. `0≤x≤4`, `0<=x<=4`).
- **tableFill H1-63**: fixed prompt, `answers: '10,15,5'`, and `questionData.rows` added; seed passes `questionData` into prompt meta so `gradeTableFill` can run. Golden interface extended with optional `questionData`.
- **Still diagram-dependent** (no single fixed answer): H1-35, H1-47, H1-50, H1-53, H1-56–57, H1-60, H1-68–69, H1-71, H2-71, H2-73, H2-79, H3-52, H3-65, H3-67, H3-70, H3-73.
- **dragMatch (H1-72, H2-68, H2-70, H3-62, H3-64):** Now fully functional: `DragMatchQuestion` drag-and-drop UI, `questionData.leftItems` / `rightItems` and correct `answers` mapping added in `goldenMathsQuestions.ts`; validation and grading use same logic as `match`.

---

## 1. Questions with empty answers (no model answer)

These questions have `answers: ''` in the golden config. The app **cannot auto-grade** them: there is no correct answer to compare against, so marking is either impossible or relies on fallback behaviour (e.g. “Unable to grade”).

**Per-prompt stored answers (implemented):** For diagram-dependent / dynamic-data questions, **per-prompt stored answers** are used. Each golden question with a dynamic diagram has `diagramParams` and `answers` in `goldenMathsQuestions.ts`. The seed merges `diagramParams` into `diagram_metadata.params` at seed time so the diagram is fixed, and the corresponding correct answer is stored on the prompt. The grader uses `prompt.answers` for auto-grading. Re-seed to apply to existing prompts.

### Paper 1 (H1)

| ID | Prompt | Type | Diagram | Issue |
|----|--------|------|---------|--------|
| H1-35 | State the coordinates of point A | multiNumeric | coordinateGrid | **Fixed:** answers '3,2', diagramParams. |
| H1-37 | Sketch y = x² | graphPlot | coordinateGrid | **Fixed:** expectedPoints + CoordinateGridInput UI. |
| H1-47 | Find the missing angle in a triangle | numeric | triangle | **Fixed:** diagramParams (angles 50,60,70), answers '70'. |
| H1-50 | Reflect point A in the y-axis | multiNumeric | coordinateGrid | **Fixed:** diagramParams (point A at (3,2)) and answers '-3,2'. |
| H1-51 | Rotate triangle ABC 90° clockwise about the origin | geometryConstruct | coordinateGrid | **Fixed:** expectedPoints + CoordinateGridInput UI. |
| H1-52 | Find the area of a trapezium | numeric | none | **Fixed:** prompt has dimensions, answers '28'. |
| H1-53 | Find the perimeter of a compound shape | numeric | compoundShape | **Fixed:** diagramParams, answers '32'. |
| H1-56 | Use Pythagoras to find the hypotenuse | numeric | triangle | **Fixed:** diagramParams (3,4,5), answers '5'. |
| H1-57 | Use Pythagoras to find a shorter side | numeric | triangle | **Fixed:** diagramParams (5,3,4), answers '4'. |
| H1-60 | Find the bearing of B from A | numeric | bearingDiagram | **Fixed:** diagramParams (bearing 65), answers '65'. |
| H1-63 | Complete a frequency table | tableFill | none | **Fixed:** questionData.rows + answers '10,15,5'. |
| H1-64 | Find the mean from a frequency table | numeric | none | **Fixed:** fixed data in prompt, answers '1.9'. |
| H1-65 | Find the median from a list | numeric | none | **Fixed:** fixed list in prompt, answers '7'. |
| H1-66 | Find the range | numeric | none | **Fixed:** fixed data in prompt, answers '12'. |
| H1-67 | Describe correlation | short | scatterPlot | **Fixed:** multiple accepted answers. |
| H1-68 | Identify an outlier | multiNumeric | scatterPlot | **Fixed:** diagramParams (points), answers '10,4'. |
| H1-69 | Find frequency from a histogram | numeric | histogram | **Fixed:** diagramParams (classes), answers '20'. |
| H1-70 | Compare two box plots | short | boxPlot | **Fixed:** multiple accepted answers. |
| H1-71 | Find the probability from a Venn diagram | numeric | vennDiagram | **Fixed:** diagramParams (labels), answers '0.25'. |
| H1-72 | Complete a Venn diagram | dragMatch | vennDiagram | Fixed: questionData + answers; drag-match UI. |
| H1-73 | Find missing probability | numeric | none | **Fixed:** fixed data (P(A), P(B), P(A∩B)), answers '0.7'. |
| H1-74 | Probability adds to 1 — find missing value | numeric | none | **Fixed:** fixed data, answers '0.45'. |
| H1-75 | Tree diagram probability | numeric | treeDiagram | **Fixed:** fixed branches in prompt, answers '1/3'. |
| H1-76 | Conditional probability calculation | numeric | none | **Fixed:** fixed data, answers '0.2'. |
| H1-77 | Explain why probabilities sum to 1 | short | none | **Fixed:** multiple accepted answers. |
| H1-78 | Show that the probability is 3/8 | proofShort | none | **Fixed:** markScheme + accepted answers. |
| H1-79 | Write a probability statement using set notation | short | none | **Fixed:** multiple accepted answers. |
| H1-80 | Interpret a real-life probability situation | short | none | **Fixed:** multiple accepted answers. |

### Paper 2 (H2)

| ID | Prompt | Type | Diagram | Issue |
|----|--------|------|---------|--------|
| H2-37 | Sketch y = (x − 2)² − 3 | graphPlot | coordinateGrid | **Fixed:** expectedPoints + CoordinateGridInput UI. |
| H2-47 | Sketch the graph of y = 1/x | graphPlot | coordinateGrid | **Fixed:** expectedPoints + CoordinateGridInput UI. |
| H2-51 | Find the length of the hypotenuse (Pythagoras) | numeric | triangle | **Fixed:** fixed sides in prompt, answers '13'. |
| H2-52 | Find a shorter side using Pythagoras | numeric | triangle | **Fixed:** fixed prompt, answers '8'. |
| H2-55 | Use sine rule to find side length | numeric | triangle | **Fixed:** fixed prompt, answers '13.5'. |
| H2-56 | Use cosine rule to find side length | numeric | triangle | **Fixed:** fixed prompt, answers '7.0'. |
| H2-57 | Find angle using cosine rule | numeric | triangle | **Fixed:** fixed prompt, answers '84.3'. |
| H2-58 | Find the area of a triangle using ½ab sin C | numeric | triangle | **Fixed:** fixed prompt, answers '29.4'. |
| H2-59 | Find the arc length of a sector | numeric | circle | **Fixed:** fixed prompt (r=6, 80°), answers '8.38'. |
| H2-60 | Find the area of a sector | numeric | circle | **Fixed:** fixed prompt (r=5, 120°), answers '26.2'. |
| H2-62 | Find missing angle using tangent–radius theorem | numeric | circle | **Fixed:** fixed prompt, answers '32.5'. |
| H2-63 | Similar triangles — find scale factor | numeric | triangle | **Fixed:** fixed prompt (4 cm, 10 cm), answers '2.5'. |
| H2-64 | Similar shapes — find missing area | numeric | none | **Fixed:** fixed prompt, answers '45'. |
| H2-65 | Bearings problem (multi-step) | numeric | bearingDiagram | **Fixed:** fixed prompt, answers '12.8'. |
| H2-66 | Vector from A to B given coordinates | multiNumeric | vectorDiagram | **Fixed:** fixed prompt (1,2) to (5,6), answers '4,4'. |
| H2-67 | Probability without replacement | numeric | none | **Fixed:** fixed prompt (3 red, 4 blue), answers '1/7'. |
| H2-68 | Complete a probability tree | dragMatch | treeDiagram | Fixed: questionData + answers; drag-match UI. |
| H2-69 | Conditional probability calculation | numeric | none | **Fixed:** fixed prompt, answers '0.2'. |
| H2-70 | Complete a Venn diagram | dragMatch | vennDiagram | Fixed: questionData + answers; drag-match UI. |
| H2-71 | Find probability from a Venn diagram | numeric | vennDiagram | **Fixed:** diagramParams, answers '0.5'. |
| H2-72 | Find mean from grouped frequency table | numeric | none | **Fixed:** fixed data in prompt, answers '15.5'. |
| H2-73 | Find the median from cumulative frequency curve | graphRead | cumulativeFrequency | **Fixed:** diagramParams + accepted answers. |
| H2-74 | Find the interquartile range | numeric | none | **Fixed:** fixed data in prompt, answers '6'. |
| H2-75 | Compare two box plots | short | boxPlot | **Fixed:** multiple accepted answers. |
| H2-76 | Histogram — find frequency density | numeric | histogram | **Fixed:** fixed prompt, answers '2.5'. |
| H2-77 | Histogram — find frequency | numeric | histogram | **Fixed:** fixed prompt, answers '20'. |
| H2-78 | Scatter graph — describe correlation | short | scatterPlot | **Fixed:** multiple accepted answers. |
| H2-79 | Scatter graph — line of best fit estimate | numeric | scatterPlot | **Fixed:** diagramParams, answers '7'. |
| H2-80 | Interpret a real-life statistical statement | short | none | **Fixed:** multiple accepted answers. |

### Paper 3 (H3)

| ID | Prompt | Type | Diagram | Issue |
|----|--------|------|---------|--------|
| H3-47 | Use the tangent-radius theorem to find a missing angle. | numeric | circle | **Fixed:** fixed prompt (56° at centre), answers '28'. |
| H3-51 | Rotate triangle ABC 90° clockwise about the origin. | geometryConstruct | coordinateGrid | **Fixed:** expectedPoints + CoordinateGridInput UI. |
| H3-52 | Find the bearing of B from A. | numeric | bearingDiagram | **Fixed:** diagramParams (bearing 72), answers '72'. |
| H3-53 | A ship sails 12 km on a bearing of 040°, then 8 km on a bearing of 130°. Find the distance from its starting point. | numeric | bearingDiagram | **Fixed:** answers '14.4'. |
| H3-57 | Prove that the midpoint of the line joining A and B lies on the line y = 2x + 1. | proofShort | none | **Fixed:** markScheme + display answers for feedback. |
| H3-58 | A solid is made by joining two cylinders. Find its volume. | numeric | none | **Fixed:** fixed dimensions in prompt, answers '169'. |
| H3-59 | Find the surface area of a frustum. | numeric | none | **Fixed:** fixed dimensions in prompt, answers '132'. |
| H3-60 | A cone is sliced parallel to the base. Find the volume of the smaller cone. | numeric | none | **Fixed:** fixed dimensions in prompt, answers '16.8'. |
| H3-62 | Complete the probability tree. | dragMatch | treeDiagram | Fixed: questionData + answers; drag-match UI. |
| H3-64 | Complete the Venn diagram. | dragMatch | vennDiagram | Fixed: questionData + answers; drag-match UI. |
| H3-65 | Find the probability from a Venn diagram. | numeric | vennDiagram | **Fixed:** diagramParams, answers '0.2'. |
| H3-66 | Find the mean from a grouped frequency table. | numeric | none | **Fixed:** fixed data in prompt, answers '30'. |
| H3-67 | Find the median from a cumulative frequency curve. | graphRead | cumulativeFrequency | **Fixed:** diagramParams + accepted answers. |
| H3-68 | Find the interquartile range from a cumulative frequency curve. | numeric | none | **Fixed:** fixed data (Q1=20, Q3=45) in prompt, answers '25'. |
| H3-69 | Compare two distributions using box plots. | short | boxPlot | **Fixed:** multiple accepted answers. |
| H3-70 | A histogram is drawn. Find the frequency in a given class. | numeric | histogram | **Fixed:** fixed prompt (width 5, FD 6), answers '30'. |
| H3-71 | Calculate the frequency density for a class. | numeric | none | **Fixed:** fixed prompt (0–20, freq 25), answers '1.25'. |
| H3-72 | Describe the correlation shown in the scatter graph. | short | scatterPlot | **Fixed:** multiple accepted answers. |
| H3-73 | Estimate a value using the line of best fit. | numeric | scatterPlot | **Fixed:** diagramParams, answers '6'. |
| H3-74 | Explain why a particular point is an outlier. | short | none | **Fixed:** multiple accepted answers. |
| H3-75 | A survey is biased. Explain why. | short | none | **Fixed:** multiple accepted answers. |
| H3-76 | A mean is misleading. Explain why. | short | none | **Fixed:** multiple accepted answers. |
| H3-77 | Show that the probability is 5/12. | proofShort | none | **Fixed:** markScheme + accepted answers. |
| H3-78 | Write a probability statement using set notation. | short | none | **Fixed:** multiple accepted answers. |
| H3-79 | Interpret a real-life probability scenario. | short | none | **Fixed:** multiple accepted answers. |
| H3-80 | A student claims the data proves a trend. Evaluate this claim. | short | none | **Fixed:** multiple accepted answers. |

---

## 2. Questions that use fallback UI only (not intended interaction)

These question **types** are implemented as a **single text/JSON input** (or short-style) in `QuestionRenderer.tsx`, not the intended UI (e.g. plot canvas, table grid, drag-match, inequality number line). They may have model answers and be gradeable, but the **experience is not as intended**.

| ID | Paper | Type | Intended behaviour | Current behaviour |
|----|-------|------|--------------------|-------------------|
| H1-36 | 1 | tableFill | Grid of cells for y = x² − 1 | **Fixed:** TableFillQuestion grid when meta.questionData.rows present (seed passes questionData). |
| H1-37 | 1 | graphPlot | Plot/draw parabola on grid | **Fixed:** CoordinateGridInput. |
| H1-51 | 1 | geometryConstruct | Construct rotation on grid | **Fixed:** CoordinateGridInput. |
| H2-27 | 2 | inequalityPlot | Shade solution on number line | **Fixed:** InequalityNumberLineInput. |
| H2-37 | 2 | graphPlot | Sketch quadratic on grid | **Fixed:** CoordinateGridInput. |
| H2-47 | 2 | graphPlot | Sketch reciprocal on grid | **Fixed:** CoordinateGridInput. |
| H3-24 | 3 | inequalityPlot | Solve and sketch inequality | **Fixed:** InequalityNumberLineInput. |
| H3-51 | 3 | geometryConstruct | Rotate triangle on grid | **Fixed:** CoordinateGridInput. |

**Note:** `dragMatch` (H1-72, H2-68, H2-70, H3-62, H3-64) is now **fully functional**: rendered with `DragMatchQuestion` (drag-and-drop), with `questionData.leftItems` / `rightItems` and correct `answers` mapping in the golden config; validation and grading use the same logic as `match`.

---

## 3. Flat list (IDs only) for scripts/filters

All **Higher Paper 1, 2, 3** question IDs that were previously not fully functional. **All have been addressed** (see §1 table for **Fixed** notes).

```
H1-35 H1-36 H1-37 H1-47 H1-50 H1-51 H1-52 H1-53 H1-56 H1-57 H1-60 H1-63 H1-64 H1-65 H1-66 H1-67 H1-68 H1-69 H1-70 H1-71 H1-72 H1-73 H1-74 H1-75 H1-76 H1-77 H1-78 H1-79 H1-80
H2-27 H2-37 H2-47 H2-51 H2-52 H2-55 H2-56 H2-57 H2-58 H2-59 H2-60 H2-62 H2-63 H2-64 H2-65 H2-66 H2-67 H2-68 H2-69 H2-70 H2-71 H2-72 H2-73 H2-74 H2-75 H2-76 H2-77 H2-78 H2-79 H2-80
H3-24 H3-47 H3-51 H3-52 H3-53 H3-57 H3-58 H3-59 H3-60 H3-62 H3-64 H3-65 H3-66 H3-67 H3-68 H3-69 H3-70 H3-71 H3-72 H3-73 H3-74 H3-75 H3-76 H3-77 H3-78 H3-79 H3-80
```

---

## 4. What “fully functional” would require

- **Empty-answer questions:** Either (a) fixed/variant-specific model answers and diagram metadata so the same question instance is always gradeable, or (b) per-prompt stored answers when using dynamic diagrams/data, or (c) explicit “manual marking only” and no auto-grade.
- **graphPlot / geometryConstruct:** Dedicated UI (e.g. canvas or interactive grid) and grading that compares submitted coordinates/shape to expected (with tolerance).
- **inequalityPlot:** Number-line UI with shaded region and grading of submitted interval or key points.
- **tableFill:** Grid UI and `meta.questionData.rows` (or equivalent) populated so `gradeTableFill` can run.
- **dragMatch:** Fully functional: `DragMatchQuestion` drag-and-drop UI; golden prompts H1-72, H2-68, H2-70, H3-62, H3-64 have `questionData.leftItems` / `rightItems` and correct `answers` mapping; validated and graded like `match`.
- **proofShort / open-ended short:** Use a **mark scheme** when a single exact answer is not appropriate: in `questionData.markScheme` define an array of criteria, each with optional `keywords` (substring match) and/or `keyNumbers` (e.g. `"3/8"`, `"5/12"`), and a `marks` value. The grader sums marks for every criterion that matches, capped at `maxMarks`. Example questions: H1-78, H3-57, H3-77. Otherwise use accepted-answer sets/phrases or mark as “manual only”.

---

*Generated from codebase: `src/config/goldenMathsQuestions.ts`, `src/components/QuestionRenderer.tsx`, `src/utils/questionEngine/grade.ts`, and diagram/type specs. Last updated to match the golden list and current renderer/grader behaviour.*
