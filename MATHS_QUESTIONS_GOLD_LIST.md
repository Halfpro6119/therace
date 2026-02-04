# GCSE Maths Questions — Gold List (Foundation & Higher)

This document is the single source of truth for the hard-coded GCSE Maths mastery question set. It lists every question by tier (Foundation / Higher), with prompt text, question type, diagram requirements, and implementation notes.

**Style:** AQA/Edexcel-style; original questions (not from past papers).  
**Use:** Build into the app for Foundation and Higher; generate diagrams from metadata where possible; use a small set of reusable diagram primitives.

---

## New question types (Maths-specific)

These types extend the existing `short | mcq | fill | match | label` set. Add them to the schema and implement handlers (or fallback to `short` until full UI exists).

| Type | Description | Answer format | Implementation note |
|------|-------------|---------------|----------------------|
| **numeric** | Single number with tolerance for rounding | One number | Use `short` with `meta.questionData.numericTolerance` (e.g. 0.01 or 0.5). Already supported via short. |
| **multiNumeric** | Two or more numeric fields (e.g. x = __, y = __) | Array of numbers | New type: multiple inputs; grade each field with optional tolerance. |
| **expression** | Algebraic form; accept equivalent expressions | String (simplified form) | New type: needs simplifier or equivalence rules; can start as `short` with multiple accepted strings. |
| **tableFill** | Fill a table / frequency table / values | 2D array of strings/numbers | New type: grid of inputs; accept sets per cell. |
| **orderSteps** | Sort lines of working into correct order | Ordered list of step IDs | New type: drag to reorder; compare sequence. |
| **graphPlot** | Plot points / draw line by dragging | Coordinates or line params | New type: interactive canvas; submit key values. |
| **graphRead** | Read value(s) from provided graph/diagram | Number(s) or short text | Can use `short` or `multiNumeric` with diagram; type clarifies intent. |
| **geometryConstruct** | Drawing canvas; construct/mark angles; submit key values | Numeric or short | New type: canvas + submit values. |
| **proofShort** | Structured proof with sentence stems | Text / structured blocks | New type: multi-part text or fill-in-stems; can start as `short`. |
| **dragMatch** | Match items by dragging (not typing mapping) | Same as `match`: mapping object | UI variant of `match`; same data model, different interaction. |

**Schema / codebase:**  
- Add these literals to `QuestionType` (or a separate `MathsQuestionType` union) so the gold list can reference them.  
- **numeric:** Already covered by `short` + `numericTolerance`. You can add a type alias `numeric` that normalizes to `short` and sets `numericTolerance` default.  
- **multiNumeric**, **expression**, **tableFill**, **orderSteps**, **graphPlot**, **graphRead**, **geometryConstruct**, **proofShort**, **dragMatch:** Add as new types; in normalizer/renderer/grade, treat unknown types as `short` until dedicated handlers exist.

---

## Diagram requirements cheat-sheet

Keep diagrams to a few reusable primitives. Prefer generating from metadata.

| Primitive | Description | Existing template ID (if any) | Use for |
|-----------|-------------|------------------------------|---------|
| **Coordinate grid** | Axes, tick marks, points, optional line | `math.graphs.axes_blank.v1`, `math.graphs.linear_axes_line.v1` | F15, F17, graphRead, graphPlot |
| **Circle theorem** | Circle, centre, chords/diameter, tangent, angle marks | `math.circle_theorems.angle_in_semicircle.v1`, `math.circle_theorems.tangent_radius.v1` | H19, H20 |
| **Triangles** | Polygon + side labels + angle markers | `math.triangles.right_triangle.v1`, `triangleBasicAngles`, etc. | F19, F20, H21–H25 |
| **Compound shape** | Rect/polyline with side lengths | *(Add if missing: compound rectilinear L-shape)* | F21 |
| **Charts** | Bar chart, scatter, histogram, box plot | `boxPlot` in graphsAndStats; add bar, scatter, histogram as needed | F26, F27, H28, H29 |

---

## Foundation Maths — Hard-coded mastery list

### Number & arithmetic

| ID | Prompt | Type | Diagram | Notes |
|----|--------|------|---------|-------|
| **F01** | Work out: 18 − 3 × (4 + 2) | numeric | none | BIDMAS. |
| **F02** | Calculate 4.8 ÷ 0.6 | numeric | none | |
| **F03** | Find 3/5 of 240 | numeric | none | |
| **F04** | Write 12/18 in its simplest form. | numeric (or fill) | none | Accept "2/3" or numerator/denominator blanks. |
| **F05** | Find 12% of £250 | numeric | none | |
| **F06** | A price increases from £80 to £92. Find the percentage increase. | numeric | none | |
| **F07** | Split £72 in the ratio 5 : 3 | multiNumeric (two boxes) | none | First box: larger share, second: smaller (e.g. 45, 27). |
| **F08** | Write 3,400,000 in standard form. | fill (e.g. a × 10^n) or short | none | |

### Algebra basics

| ID | Prompt | Type | Diagram | Notes |
|----|--------|------|---------|-------|
| **F09** | Evaluate 2x + 7 when x = −4 | numeric | none | |
| **F10** | Simplify: 3a + 5a − 2 | expression | none | |
| **F11** | Solve: x − 9 = 15 | numeric | none | |
| **F12** | Solve: 4x + 3 = 27 | numeric | none | |
| **F13** | Expand: 3(2x − 5) | expression | none | |
| **F14** | Factorise: 6x + 9 | expression | none | |

### Graphs & coordinates

| ID | Prompt | Type | Diagram | Notes |
|----|--------|------|---------|-------|
| **F15** | Write down the coordinates of point P. | multiNumeric | Coordinate grid with labelled point P (custom). Axes labelled, tick marks, P clearly marked. | Template: coordinate grid + single point. |
| **F16** | Complete the table for y = 2x − 1 when x = −1, 0, 2, 4. | tableFill | none | Table in question text or generated. |
| **F17** | Plot (0,1) and (4,9) and draw the line. | graphPlot | Coordinate grid | If no graph drawing: use “find equation of line given two points” (Higher-style). |
| **F18** | Two angles on a straight line are (3x + 10)° and (2x + 30)°. Find x. | numeric | Optional: straight line with two adjacent angles labelled. | |

### Geometry & measures

| ID | Prompt | Type | Diagram | Notes |
|----|--------|------|---------|-------|
| **F19** | A triangle has angles 52° and 71°. Find the third angle. | numeric | Optional triangle | |
| **F20** | Find the area of a triangle with base 12 cm and height 7 cm. | numeric | Optional right-angle height marker | |
| **F21** | Find the perimeter of an L-shape. | numeric | Compound rectilinear shape with side lengths (custom). | Primitive: compound shape. |
| **F22** | A cuboid is 8 cm by 5 cm by 3 cm. Find its volume. | numeric | Optional cuboid | |
| **F23** | Radius is 6 cm. Find the circumference. Give answer to 1 dp. | numeric (rounding rule) | Circle with radius marked | Calculator allowed. |

### Probability & statistics

| ID | Prompt | Type | Diagram | Notes |
|----|--------|------|---------|-------|
| **F24** | A bag has 5 red, 3 blue, 2 green counters. Find P(blue). | short or fill | none | e.g. "3/10" or fraction fill. |
| **F25** | Find the mean from a small frequency table. | numeric | none (table in question text) | |
| **F26** | Read values and compare from a bar chart. | short or numeric | Bar chart (diagram required) | graphRead / bar chart primitive. |
| **F27** | Describe the correlation and spot an outlier. | short | Scatter plot | Scatter diagram required. |

---

## Higher Maths — Hard-coded mastery list

### Algebra (grade 6–9)

| ID | Prompt | Type | Diagram | Notes |
|----|--------|------|---------|-------|
| **H01** | Expand and simplify: (2x − 3)(x + 5) | expression | none | |
| **H02** | Factorise: x² + 7x + 10 | expression | none | |
| **H03** | Solve: x² + 7x + 10 = 0 | multiNumeric (two solutions) | none | |
| **H04** | Solve: 3x² − 5x − 2 = 0. Give answers to 2 dp. | multiNumeric | none | Calculator. |
| **H05** | Solve: 2x + y = 11 and x − y = 1 | multiNumeric | none | x, y. |
| **H06** | Solve simultaneously: y = x² and y = 2x + 3 | multiNumeric | Optional graph | x (and optionally y) solutions. |
| **H07** | Solve: 3x − 7 < 11 | numeric or short ("x < 6") | Optional number line | |
| **H08** | Solve: x² − 5x + 6 > 0 | short (interval notation) | Optional sign chart/graph | |
| **H09** | Make x the subject: y = 3x − 4 | expression | none | |
| **H10** | Simplify: (x² − 9)/(x² + 3x) | expression | none | |

### Ratio, proportion, standard form

| ID | Prompt | Type | Diagram | Notes |
|----|--------|------|---------|-------|
| **H11** | y is directly proportional to x. When x = 4, y = 18. Find y when x = 10. | numeric | none | |
| **H12** | y is inversely proportional to x. When x = 5, y = 12. Find y when x = 8. | numeric | none | |
| **H13** | (3.2×10⁵) ÷ (8×10²) in standard form. | fill or short | none | |

### Graphs, sequences, functions

| ID | Prompt | Type | Diagram | Notes |
|----|--------|------|---------|-------|
| **H14** | Find the gradient of the line through (−2, 7) and (4, −5). | numeric | none | |
| **H15** | Find the equation of the line with gradient 3 passing through (2, −1). | expression | none | |
| **H16** | For y = x² − 6x + 5, find the turning point. | multiNumeric | none | (3, −4) or x=3, y=−4. |
| **H17** | Find the nth term of: 5, 9, 13, 17, … | expression | none | |
| **H18** | Find the nth term of: 1, 4, 9, 16, … | expression | none | n². |

### Geometry & trigonometry (Higher)

| ID | Prompt | Type | Diagram | Notes |
|----|--------|------|---------|-------|
| **H19** | In a circle, AB is a diameter and C is a point on the circle. Find ∠ACB. | numeric | Circle, diameter AB, point C; angle at C highlighted. | Template: `math.circle_theorems.angle_in_semicircle.v1`. |
| **H20** | A tangent touches a circle at P. OP is a radius. What is the angle between OP and the tangent? | numeric | Circle, centre O, radius OP, tangent at P | Template: `math.circle_theorems.tangent_radius.v1`. 90° |
| **H21** | Two triangles are similar. Find the missing side length. | numeric | Two triangles with corresponding sides labelled | Custom diagram. |
| **H22** | A right triangle has legs 7 cm and 24 cm. Find the hypotenuse. | numeric | none | 25. |
| **H23** | In a right triangle, angle = 38°, adjacent = 12 cm. Find hypotenuse. | numeric | Right triangle with angle marked | Calculator. SOHCAHTOA. |
| **H24** | In triangle ABC, a = 8, A = 35°, B = 72°. Find b. | numeric | Triangle with labels | Calculator. Sine rule. |
| **H25** | Find the length of side c when a = 7, b = 9, angle C = 120°. | numeric | none | Calculator. Cosine rule. |

### Probability & statistics (Higher depth)

| ID | Prompt | Type | Diagram | Notes |
|----|--------|------|---------|-------|
| **H26** | Two draws without replacement; find probability of two reds. | numeric | Optional tree diagram | |
| **H27** | Given P(A)=0.6, P(B)=0.5, P(A∩B)=0.3, find P(A\|B). | numeric | none | |
| **H28** | Find frequency from histogram bars with unequal class widths. | numeric or tableFill | Histogram required | |
| **H29** | Compare distributions using median and IQR. | short | Box plot(s) | |

### Grade 9–style reasoning

| ID | Prompt | Type | Diagram | Notes |
|----|--------|------|---------|-------|
| **H30** | Prove that the square of any odd number is odd. | proofShort | none | |
| **H31** | Show that (n+1)(n+2) is always even. | proofShort | none | |
| **H32** | Population increases by 3% each year. Start 40,000. Find after 5 years. | numeric | none | Calculator. |

---

## Implementation mapping

### Question types → current schema

- **numeric** → Use `type: 'short'` with `meta.questionData.numericTolerance` (e.g. 0.01). Optionally add alias `numeric` that normalizes to this.
- **multiNumeric** → New type. Store accepted answers as array of arrays or JSON string; grade each field with optional tolerance. UI: multiple number inputs.
- **expression** → Start as `short` with multiple `answersAccepted` (e.g. "6a−2", "6a - 2"). Later: expression equivalence.
- **tableFill** → New type. `meta.questionData` could have `rows`, `cols`, `acceptedPerCell` (2D array). UI: grid of inputs.
- **orderSteps** → New type. `meta.questionData.steps` (array of { id, text }); `answersAccepted` = correct order string e.g. "A,B,C,D".
- **graphPlot** → New type. Submit coordinates or equation; optional diagram template for grid.
- **graphRead** → Use `short` or `multiNumeric` with `meta.diagram` (graph image/template). Type hint for UI.
- **geometryConstruct** → New type. Diagram + submit key values (numeric/short).
- **proofShort** → New type or `short` with long accepted text / structured stems.
- **dragMatch** → Same as `match`; `meta.questionData.dragAndDrop: true` or separate type for drag UI.

### Diagram template IDs (existing)

- Coordinate grid (blank): `math.graphs.axes_blank.v1`
- Linear axes + line: `math.graphs.linear_axes_line.v1`
- Angle in semicircle: `math.circle_theorems.angle_in_semicircle.v1`
- Tangent–radius: `math.circle_theorems.tangent_radius.v1`
- Right triangle: (see `rightTriangle` in registry)
- Box plot: (see `boxPlot` in `graphsAndStats`)

### Diagrams to add (if missing)

- **Compound shape (L-shape):** rectilinear polygon with side length labels; params: list of segment lengths and orientations.
- **Bar chart / scatter / histogram:** extend `graphsAndStats` or add new templates with metadata-driven data.
- **Coordinate grid with one labelled point P:** axes + one point; params: P coordinates, axis bounds.

---

## Tier and topic mapping (for import)

Map each question to the Maths taxonomy (see `src/config/taxonomy/maths.ts`):

- **Foundation** → `tier: 'foundation'`; assign to appropriate unit/topic (Number, Algebra, Geometry, Statistics & Probability).
- **Higher** → `tier: 'higher'`; same units/topics.
- **Calculator** → Set `calculatorAllowed: true` for F23, H04, H23, H24, H25, H32; default from paper (1 = no calc, 2/3 = calc).

Use the **ID** (F01–F27, H01–H32) as a stable external key for each gold question when creating prompts in the DB or in seed data.
