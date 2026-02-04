# GCSE Maths Questions — Gold List (Foundation & Higher)

This document is the single source of truth for the hard-coded GCSE Maths mastery question set. It lists every question by tier (Foundation / Higher), with prompt text, question type, diagram requirements, marks, time estimates, and complete implementation details.

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

## Foundation Maths — Hard-coded mastery list

### Number & arithmetic

| ID | Prompt | Type | Marks | Time (sec) | Diagram | Notes |
|----|--------|------|-------|------------|---------|-------|
| **F01** | Work out: 18 − 3 × (4 + 2) | numeric | 1 | 45 | none | BIDMAS. Answer: 0 |
| **F02** | Calculate 4.8 ÷ 0.6 | numeric | 1 | 30 | none | Answer: 8 |
| **F03** | Find 3/5 of 240 | numeric | 2 | 45 | none | Answer: 144 |
| **F04** | Write 12/18 in its simplest form. | numeric (or fill) | 1 | 30 | none | Accept "2/3" or numerator/denominator blanks. |
| **F05** | Find 12% of £250 | numeric | 2 | 45 | none | Answer: £30 |
| **F06** | A price increases from £80 to £92. Find the percentage increase. | numeric | 3 | 90 | none | Answer: 15% |
| **F07** | Split £72 in the ratio 5 : 3 | multiNumeric (two boxes) | 3 | 75 | none | First box: larger share, second: smaller (e.g. 45, 27). |
| **F08** | Write 3,400,000 in standard form. | fill (e.g. a × 10^n) or short | 2 | 45 | none | Answer: 3.4 × 10⁶ |

### Algebra basics

| ID | Prompt | Type | Marks | Time (sec) | Diagram | Notes |
|----|--------|------|-------|------------|---------|-------|
| **F09** | Evaluate 2x + 7 when x = −4 | numeric | 2 | 45 | none | Answer: -1 |
| **F10** | Simplify: 3a + 5a − 2 | expression | 2 | 45 | none | Answer: 8a − 2 |
| **F11** | Solve: x − 9 = 15 | numeric | 2 | 45 | none | Answer: 24 |
| **F12** | Solve: 4x + 3 = 27 | numeric | 2 | 60 | none | Answer: 6 |
| **F13** | Expand: 3(2x − 5) | expression | 2 | 45 | none | Answer: 6x − 15 |
| **F14** | Factorise: 6x + 9 | expression | 2 | 45 | none | Answer: 3(2x + 3) |

### Graphs & coordinates

| ID | Prompt | Type | Marks | Time (sec) | Diagram Metadata | Notes |
|----|--------|------|-------|------------|------------------|-------|
| **F15** | Write down the coordinates of point P. | multiNumeric | 2 | 60 | ```json<br>{<br>  "mode": "auto",<br>  "templateId": "math.graphs.coordinate_point.v1",<br>  "params": {<br>    "labels": { "xLabel": "x", "yLabel": "y", "pointLabel": "P" },<br>    "values": { "xMin": -5, "xMax": 5, "yMin": -5, "yMax": 5, "pointX": 3, "pointY": 2 },<br>    "visibility": { "showGrid": true, "showNumbers": true, "showPoint": true, "highlightPoint": true }<br>  },<br>  "placement": "inline"<br>}``` | Answer: (3, 2) |
| **F16** | Complete the table for y = 2x − 1 when x = −1, 0, 2, 4. | tableFill | 3 | 90 | none | Table in question text. Answers: -3, -1, 3, 7 |
| **F17** | Plot (0,1) and (4,9) and draw the line. | graphPlot | 3 | 90 | ```json<br>{<br>  "mode": "auto",<br>  "templateId": "math.graphs.linear_axes_line.v1",<br>  "params": {<br>    "labels": { "xLabel": "x", "yLabel": "y" },<br>    "values": { "gradient": 2, "intercept": 1 },<br>    "visibility": { "showGrid": true, "showLine": false, "showPoints": true },<br>    "positions": { "point1": { "x": 0.1, "y": 0.55 }, "point2": { "x": 0.7, "y": 0.45 } }<br>  },<br>  "placement": "inline"<br>}``` | If no graph drawing: use "find equation of line given two points". |
| **F18** | Two angles on a straight line are (3x + 10)° and (2x + 30)°. Find x. | numeric | 3 | 75 | ```json<br>{<br>  "mode": "auto",<br>  "templateId": "math.geometry.straight_line_angles.v1",<br>  "params": {<br>    "labels": { "angle1Label": "(3x + 10)°", "angle2Label": "(2x + 30)°" },<br>    "values": { "angle1": 100, "angle2": 80 },<br>    "visibility": { "showLine": true, "showAngleArcs": true, "showAngleLabels": true }<br>  },<br>  "placement": "inline"<br>}``` | Answer: x = 28 |

### Geometry & measures

| ID | Prompt | Type | Marks | Time (sec) | Diagram Metadata | Notes |
|----|--------|------|-------|------------|------------------|-------|
| **F19** | A triangle has angles 52° and 71°. Find the third angle. | numeric | 2 | 60 | ```json<br>{<br>  "mode": "auto",<br>  "templateId": "math.triangle.basic_angles.v1",<br>  "params": {<br>    "labels": { "A": "A", "B": "B", "C": "C" },<br>    "values": { "angleA": 52, "angleB": 71, "angleC": 57 },<br>    "visibility": { "showAngleA": true, "showAngleB": true, "showAngleC": false }<br>  },<br>  "placement": "inline"<br>}``` | Answer: 57° |
| **F20** | Find the area of a triangle with base 12 cm and height 7 cm. | numeric | 2 | 60 | ```json<br>{<br>  "mode": "auto",<br>  "templateId": "math.trig.right_triangle.v1",<br>  "params": {<br>    "labels": { "A": "A", "B": "B", "C": "C", "adjacent": "12 cm", "opposite": "7 cm" },<br>    "values": { "angle": 30 },<br>    "visibility": { "showRightAngleMark": true, "showSideLabels": true, "showAngleLabel": false }<br>  },<br>  "placement": "inline"<br>}``` | Answer: 42 cm² |
| **F21** | Find the perimeter of an L-shape. | numeric | 3 | 90 | ```json<br>{<br>  "mode": "auto",<br>  "templateId": "math.geometry.compound_lshape.v1",<br>  "params": {<br>    "labels": { "A": "A", "B": "B", "C": "C", "D": "D", "E": "E", "F": "F" },<br>    "values": { "width1": 8, "height1": 4, "width2": 4, "height2": 6, "unit": "cm" },<br>    "visibility": { "showSideLengths": true, "showVertexLabels": true }<br>  },<br>  "placement": "inline"<br>}``` | Example: 36 cm (varies by dimensions) |
| **F22** | A cuboid is 8 cm by 5 cm by 3 cm. Find its volume. | numeric | 2 | 45 | none (optional cuboid) | Answer: 120 cm³ |
| **F23** | Radius is 6 cm. Find the circumference. Give answer to 1 dp. | numeric (rounding rule) | 3 | 75 | ```json<br>{<br>  "mode": "auto",<br>  "templateId": "math.circle.basic.v1",<br>  "params": {<br>    "labels": { "O": "O", "radiusLabel": "6 cm" },<br>    "values": { "radius": 6 },<br>    "visibility": { "showCenter": true, "showRadius": true, "showRadiusLabel": true }<br>  },<br>  "placement": "inline"<br>}``` | Calculator allowed. Answer: 37.7 cm |

### Probability & statistics

| ID | Prompt | Type | Marks | Time (sec) | Diagram Metadata | Notes |
|----|--------|------|-------|------------|------------------|-------|
| **F24** | A bag has 5 red, 3 blue, 2 green counters. Find P(blue). | short or fill | 2 | 45 | none | Answer: 3/10 or 0.3 |
| **F25** | Find the mean from a small frequency table. | numeric | 3 | 90 | none (table in question text) | Example: mean = 4.2 |
| **F26** | Read values and compare from a bar chart. | short or numeric | 3 | 90 | ```json<br>{<br>  "mode": "auto",<br>  "templateId": "math.statistics.bar_chart.v1",<br>  "params": {<br>    "labels": { "xAxisLabel": "Category", "yAxisLabel": "Frequency" },<br>    "values": { "categories": ["A", "B", "C", "D"], "frequencies": [12, 8, 15, 10], "yMax": 20 },<br>    "visibility": { "showGrid": true, "showValues": true, "showLabels": true }<br>  },<br>  "placement": "inline"<br>}``` | Read and compare values |
| **F27** | Describe the correlation and spot an outlier. | short | 3 | 90 | ```json<br>{<br>  "mode": "auto",<br>  "templateId": "math.statistics.scatter_plot.v1",<br>  "params": {<br>    "labels": { "xAxisLabel": "X Variable", "yAxisLabel": "Y Variable" },<br>    "values": {<br>      "points": [<br>        { "x": 2, "y": 3 }, { "x": 4, "y": 5 }, { "x": 5, "y": 6 },<br>        { "x": 7, "y": 8 }, { "x": 8, "y": 9 }, { "x": 10, "y": 4 }<br>      ],<br>      "xMin": 0, "xMax": 12, "yMin": 0, "yMax": 10<br>    },<br>    "visibility": { "showGrid": true, "showPoints": true, "highlightOutlier": true }<br>  },<br>  "placement": "inline"<br>}``` | Answer: positive correlation, outlier at (10, 4) |

---

## Higher Maths — Hard-coded mastery list

### Algebra (grade 6–9)

| ID | Prompt | Type | Marks | Time (sec) | Diagram | Notes |
|----|--------|------|-------|------------|---------|-------|
| **H01** | Expand and simplify: (2x − 3)(x + 5) | expression | 3 | 90 | none | Answer: 2x² + 7x − 15 |
| **H02** | Factorise: x² + 7x + 10 | expression | 2 | 75 | none | Answer: (x + 2)(x + 5) |
| **H03** | Solve: x² + 7x + 10 = 0 | multiNumeric (two solutions) | 3 | 90 | none | Answers: x = -2, x = -5 |
| **H04** | Solve: 3x² − 5x − 2 = 0. Give answers to 2 dp. | multiNumeric | 4 | 120 | none | Calculator. Answers: x = 2.00, x = -0.33 |
| **H05** | Solve: 2x + y = 11 and x − y = 1 | multiNumeric | 4 | 120 | none | Answers: x = 4, y = 3 |
| **H06** | Solve simultaneously: y = x² and y = 2x + 3 | multiNumeric | 4 | 120 | Optional graph (see below) | Answers: x = -1, x = 3 (and y values) |
| **H07** | Solve: 3x − 7 < 11 | numeric or short ("x < 6") | 3 | 75 | Optional number line (see below) | Answer: x < 6 |
| **H08** | Solve: x² − 5x + 6 > 0 | short (interval notation) | 4 | 120 | Optional sign chart/graph | Answer: x < 2 or x > 3 |
| **H09** | Make x the subject: y = 3x − 4 | expression | 3 | 90 | none | Answer: x = (y + 4)/3 |
| **H10** | Simplify: (x² − 9)/(x² + 3x) | expression | 3 | 90 | none | Answer: (x − 3)/x |

**H06 Diagram (optional):**
```json
{
  "mode": "auto",
  "templateId": "math.graphs.quadratic_linear.v1",
  "params": {
    "labels": { "xLabel": "x", "yLabel": "y" },
    "values": {
      "quadraticCoeff": 1,
      "linearGradient": 2,
      "linearIntercept": 3,
      "xMin": -5,
      "xMax": 5,
      "yMin": -2,
      "yMax": 10
    },
    "visibility": {
      "showGrid": true,
      "showQuadratic": true,
      "showLinear": true,
      "showIntersectionPoints": true
    }
  },
  "placement": "inline"
}
```

**H07 Diagram (optional):**
```json
{
  "mode": "auto",
  "templateId": "math.algebra.number_line.v1",
  "params": {
    "labels": { "label": "x" },
    "values": { "min": -5, "max": 10, "value": 6, "strict": true },
    "visibility": { "showNumbers": true, "showArrow": true, "showOpenCircle": true }
  },
  "placement": "inline"
}
```

### Ratio, proportion, standard form

| ID | Prompt | Type | Marks | Time (sec) | Diagram | Notes |
|----|--------|------|-------|------------|---------|-------|
| **H11** | y is directly proportional to x. When x = 4, y = 18. Find y when x = 10. | numeric | 3 | 90 | none | Answer: 45 |
| **H12** | y is inversely proportional to x. When x = 5, y = 12. Find y when x = 8. | numeric | 3 | 90 | none | Answer: 7.5 |
| **H13** | (3.2×10⁵) ÷ (8×10²) in standard form. | fill or short | 3 | 75 | none | Answer: 4 × 10² |

### Graphs, sequences, functions

| ID | Prompt | Type | Marks | Time (sec) | Diagram | Notes |
|----|--------|------|-------|------------|---------|-------|
| **H14** | Find the gradient of the line through (−2, 7) and (4, −5). | numeric | 3 | 90 | none | Answer: -2 |
| **H15** | Find the equation of the line with gradient 3 passing through (2, −1). | expression | 3 | 90 | none | Answer: y = 3x − 7 |
| **H16** | For y = x² − 6x + 5, find the turning point. | multiNumeric | 4 | 120 | none | Answer: (3, −4) or x=3, y=−4 |
| **H17** | Find the nth term of: 5, 9, 13, 17, … | expression | 3 | 90 | none | Answer: 4n + 1 |
| **H18** | Find the nth term of: 1, 4, 9, 16, … | expression | 3 | 90 | none | Answer: n² |

### Geometry & trigonometry (Higher)

| ID | Prompt | Type | Marks | Time (sec) | Diagram Metadata | Notes |
|----|--------|------|-------|------------|------------------|-------|
| **H19** | In a circle, AB is a diameter and C is a point on the circle. Find ∠ACB. | numeric | 3 | 90 | ```json<br>{<br>  "mode": "auto",<br>  "templateId": "math.circle_theorems.angle_in_semicircle.v1",<br>  "params": {<br>    "labels": { "A": "A", "B": "B", "C": "C", "O": "O" },<br>    "positions": { "C": { "x": 0.5, "y": 0.2 } },<br>    "visibility": { "showCenter": true, "showAngleLabel": true, "showRightAngleMark": true }<br>  },<br>  "placement": "inline"<br>}``` | Answer: 90° |
| **H20** | A tangent touches a circle at P. OP is a radius. What is the angle between OP and the tangent? | numeric | 2 | 60 | ```json<br>{<br>  "mode": "auto",<br>  "templateId": "math.circle_theorems.tangent_radius.v1",<br>  "params": {<br>    "labels": { "O": "O", "A": "P", "T": "T" },<br>    "visibility": { "showRightAngle": true, "showCenter": true }<br>  },<br>  "placement": "inline"<br>}``` | Answer: 90° |
| **H21** | Two triangles are similar. Find the missing side length. | numeric | 4 | 120 | ```json<br>{<br>  "mode": "auto",<br>  "templateId": "math.geometry.similar_triangles.v1",<br>  "params": {<br>    "labels": {<br>      "triangle1": { "A": "A", "B": "B", "C": "C" },<br>      "triangle2": { "D": "D", "E": "E", "F": "F" }<br>    },<br>    "values": {<br>      "triangle1": { "sideAB": 6, "sideBC": 8, "sideAC": 10 },<br>      "triangle2": { "sideDE": 9, "sideEF": 12, "sideDF": null },<br>      "scaleFactor": 1.5<br>    },<br>    "visibility": { "showSideLengths": true, "showCorrespondingAngles": true, "showScaleFactor": false }<br>  },<br>  "placement": "inline"<br>}``` | Example answer: 15 |
| **H22** | A right triangle has legs 7 cm and 24 cm. Find the hypotenuse. | numeric | 3 | 90 | none | Answer: 25 cm |
| **H23** | In a right triangle, angle = 38°, adjacent = 12 cm. Find hypotenuse. | numeric | 4 | 120 | ```json<br>{<br>  "mode": "auto",<br>  "templateId": "math.trig.right_triangle.v1",<br>  "params": {<br>    "labels": { "A": "A", "B": "B", "C": "C", "adjacent": "12 cm", "hypotenuse": "?" },<br>    "values": { "angle": 38 },<br>    "visibility": { "showRightAngleMark": true, "showSideLabels": true, "showAngleLabel": true }<br>  },<br>  "placement": "inline"<br>}``` | Calculator. Answer: 15.2 cm (1 dp) |
| **H24** | In triangle ABC, a = 8, A = 35°, B = 72°. Find b. | numeric | 4 | 120 | ```json<br>{<br>  "mode": "auto",<br>  "templateId": "math.trig.sine_rule_triangle.v1",<br>  "params": {<br>    "labels": { "A": "A", "B": "B", "C": "C" },<br>    "values": { "sideA": 8, "angleA": 35, "angleB": 72, "angleC": 73, "sideB": null, "sideC": null },<br>    "visibility": { "showSideLengths": true, "showAngles": true, "showAngleArcs": true }<br>  },<br>  "placement": "inline"<br>}``` | Calculator. Answer: 13.3 (1 dp) |
| **H25** | Find the length of side c when a = 7, b = 9, angle C = 120°. | numeric | 4 | 120 | ```json<br>{<br>  "mode": "auto",<br>  "templateId": "math.trig.cosine_rule_triangle.v1",<br>  "params": {<br>    "labels": { "A": "A", "B": "B", "C": "C" },<br>    "values": { "sideA": 7, "sideB": 9, "sideC": null, "angleC": 120 },<br>    "visibility": { "showSideLengths": true, "showAngleC": true, "showAngleArc": true }<br>  },<br>  "placement": "inline"<br>}``` | Calculator. Answer: 14.0 (1 dp) |

### Probability & statistics (Higher depth)

| ID | Prompt | Type | Marks | Time (sec) | Diagram Metadata | Notes |
|----|--------|------|-------|------------|------------------|-------|
| **H26** | Two draws without replacement; find probability of two reds. | numeric | 4 | 120 | Optional tree diagram (see below) | Answer: 2/9 |
| **H27** | Given P(A)=0.6, P(B)=0.5, P(A∩B)=0.3, find P(A\|B). | numeric | 3 | 90 | none | Answer: 0.6 |
| **H28** | Find frequency from histogram bars with unequal class widths. | numeric or tableFill | 4 | 120 | ```json<br>{<br>  "mode": "auto",<br>  "templateId": "math.statistics.histogram.v1",<br>  "params": {<br>    "labels": { "xAxisLabel": "Time (minutes)", "yAxisLabel": "Frequency Density" },<br>    "values": {<br>      "classes": [<br>        { "start": 0, "end": 10, "frequency": 20, "frequencyDensity": 2 },<br>        { "start": 10, "end": 20, "frequency": 30, "frequencyDensity": 3 },<br>        { "start": 20, "end": 40, "frequency": 40, "frequencyDensity": 2 },<br>        { "start": 40, "end": 60, "frequency": 30, "frequencyDensity": 1.5 }<br>      ],<br>      "yMax": 4<br>    },<br>    "visibility": { "showGrid": true, "showFrequencies": false, "showFrequencyDensity": true }<br>  },<br>  "placement": "inline"<br>}``` | Calculate frequency from density × width |
| **H29** | Compare distributions using median and IQR. | short | 4 | 120 | ```json<br>{<br>  "mode": "auto",<br>  "templateId": "math.statistics.boxplot.v1",<br>  "params": {<br>    "values": { "min": 5, "q1": 15, "median": 25, "q3": 35, "max": 50 },<br>    "visibility": { "showLabels": true, "showValues": true }<br>  },<br>  "placement": "inline"<br>}``` | Compare medians and IQRs |

**H26 Diagram (optional):**
```json
{
  "mode": "auto",
  "templateId": "math.probability.tree_diagram.v1",
  "params": {
    "labels": { "firstDraw": "First Draw", "secondDraw": "Second Draw" },
    "values": {
      "branches": [
        { "label": "Red", "probability": "5/10" },
        { "label": "Blue", "probability": "3/10" },
        { "label": "Green", "probability": "2/10" }
      ],
      "secondBranches": {
        "Red": [
          { "label": "Red", "probability": "4/9" },
          { "label": "Blue", "probability": "3/9" },
          { "label": "Green", "probability": "2/9" }
        ]
      }
    },
    "visibility": { "showProbabilities": true, "showOutcomes": true }
  },
  "placement": "inline"
}
```

### Grade 9–style reasoning

| ID | Prompt | Type | Marks | Time (sec) | Diagram | Notes |
|----|--------|------|-------|------------|---------|-------|
| **H30** | Prove that the square of any odd number is odd. | proofShort | 5 | 180 | none | Structured proof required |
| **H31** | Show that (n+1)(n+2) is always even. | proofShort | 4 | 150 | none | Algebraic proof |
| **H32** | Population increases by 3% each year. Start 40,000. Find after 5 years. | numeric | 4 | 120 | none | Calculator. Answer: 46,371 (nearest whole) |

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
- Right triangle: `math.trig.right_triangle.v1`
- Box plot: `math.statistics.boxplot.v1`
- Basic triangle angles: `math.triangle.basic_angles.v1`

### Diagrams to add (if missing)

- **Compound shape (L-shape):** `math.geometry.compound_lshape.v1` - rectilinear polygon with side length labels
- **Bar chart:** `math.statistics.bar_chart.v1` - vertical bars with categories
- **Scatter plot:** `math.statistics.scatter_plot.v1` - points on coordinate grid
- **Histogram:** `math.statistics.histogram.v1` - bars with unequal class widths
- **Coordinate grid with point:** `math.graphs.coordinate_point.v1` - axes + single labelled point
- **Straight line angles:** `math.geometry.straight_line_angles.v1` - line with two adjacent angles
- **Circle basic:** `math.circle.basic.v1` - circle with radius marked
- **Number line:** `math.algebra.number_line.v1` - number line with inequality visualization
- **Similar triangles:** `math.geometry.similar_triangles.v1` - two similar triangles side-by-side
- **Sine rule triangle:** `math.trig.sine_rule_triangle.v1` - triangle with sides and angles
- **Cosine rule triangle:** `math.trig.cosine_rule_triangle.v1` - triangle with sides and angle
- **Tree diagram:** `math.probability.tree_diagram.v1` - probability tree
- **Quadratic + linear:** `math.graphs.quadratic_linear.v1` - quadratic and linear graph intersection

---

## Tier and topic mapping (for import)

Map each question to the Maths taxonomy (see `src/config/taxonomy/maths.ts`):

- **Foundation** → `tier: 'foundation'`; assign to appropriate unit/topic (Number, Algebra, Geometry, Statistics & Probability).
- **Higher** → `tier: 'higher'`; same units/topics.
- **Calculator** → Set `calculatorAllowed: true` for F23, H04, H23, H24, H25, H32; default from paper (1 = no calc, 2/3 = calc).

### Marks allocation summary

- **1 mark:** Simple calculations, basic recall (F01, F02, F04)
- **2 marks:** Standard procedures, single-step problems (F03, F05, F09-F14, F19-F20, F22, F24)
- **3 marks:** Multi-step problems, reasoning (F06-F07, F15-F18, F21, F23, F26-F27, H01-H03, H07, H09-H10, H11-H15, H17-H18, H19-H20, H22, H27)
- **4 marks:** Complex problems, extended reasoning (H04-H06, H08, H16, H21, H23-H25, H28-H29, H31-H32)
- **5 marks:** Proof and extended reasoning (H30)

### Time allocation summary

- **30-45 seconds:** Simple recall, basic calculations (F01-F02, F04)
- **45-60 seconds:** Standard procedures (F03, F05, F09-F14, F19-F20, F22, F24)
- **60-90 seconds:** Multi-step problems (F15-F18, F21, F23, F26-F27, H01-H03, H07, H09-H15, H17-H20, H22, H27)
- **90-120 seconds:** Complex problems (H04-H06, H08, H16, H21, H23-H25, H28-H29, H31-H32)
- **120-180 seconds:** Extended reasoning and proof (H30)

**Total Foundation time:** ~1,800 seconds (30 minutes)  
**Total Higher time:** ~2,400 seconds (40 minutes)

Use the **ID** (F01–F27, H01–H32) as a stable external key for each gold question when creating prompts in the DB or in seed data.
