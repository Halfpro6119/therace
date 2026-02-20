# GCSE Further Maths Questions — Gold List

This document is the single source of truth for the hard-coded GCSE Further Maths mastery question set. It lists every question with prompt text, question type, diagram requirements, and implementation notes.

**Style:** AQA/Edexcel-style; original questions (not from past papers).  
**Use:** Build into the app for Further Maths; generate diagrams from metadata where possible; use a small set of reusable diagram primitives.

---

## New Question Types for Further Maths

These types extend the existing question type system:

| Type | Description | Answer format | Implementation note |
|------|-------------|---------------|----------------------|
| **matrixInput** | Enter matrix entries in grid form | 2D array of numbers | New type: grid of inputs; accepts matrix format like `[[a,b],[c,d]]` |
| **vectorDiagram** | Drag vector arrows / input coordinates | Array of vector coordinates | New type: interactive vector visualization; submit coordinates |
| **functionMachine** | Composition / inverse flow visualiser | Function expression | Uses existing `functionMachine` diagram template; answer is expression |

**Schema / codebase:**  
- Added `matrixInput`, `vectorDiagram`, and `functionMachine` to `QuestionType` union
- These types normalize to `short` or `expression` until dedicated handlers exist
- The `functionMachine` diagram template already exists in the codebase

---

## Core Further Maths — Mastery List (FM01-FM20)

### Algebra & Quadratics

| ID | Question | Type | Diagram | Notes |
|----|----------|------|---------|-------|
| **FM01** | Solve x² + 6x − 7 = 0 by completing the square. | multiNumeric | none | Completing square method. |
| **FM02** | Rewrite y = x² − 8x + 3 in the form y = (x − a)² + b. | expression | none | Vertex form conversion. |
| **FM03** | How many real solutions does 2x² − 3x + 5 = 0 have? | numeric | none | Discriminant interpretation. |

### Functions

| ID | Question | Type | Diagram | Notes |
|----|----------|------|---------|-------|
| **FM04** | f(x)=2x+3, g(x)=x². Find fg(x). | expression | none | Function composition. |
| **FM05** | Find f⁻¹(x) for f(x)=3x−5. | expression | none | Inverse function. |
| **FM06** | Why must x ≥ 0 for f(x)=√x to have an inverse? | short | none | Domain restriction understanding. |

### Graphs & Transformations

| ID | Question | Type | Diagram | Notes |
|----|----------|------|---------|-------|
| **FM07** | Describe the transformation from y=x² to y=(x−3)²+4. | short | none | Transformation description. |
| **FM08** | Sketch y = x³ − 2x. | graphPlot | coordinate grid | Cubic graph sketching. |
| **FM09** | Solve x² = 3x + 4 using a graph. | graphRead | graph | Graphical solution. |

### Surds

| ID | Question | Type | Diagram | Notes |
|----|----------|------|---------|-------|
| **FM10** | Simplify √72. | expression | none | Surd simplification. |
| **FM11** | Rationalise: 5 / (3 − √2) | expression | none | Rationalising denominator. |

### Matrices

| ID | Question | Type | Diagram | Notes |
|----|----------|------|---------|-------|
| **FM12** | Find A+B where A=[[2,1],[0,3]] and B=[[1,4],[5,2]]. | matrixInput | none | Matrix addition. |
| **FM13** | Find AB for A=[[1,2],[3,4]] and B=[[0,1],[2,3]]. | matrixInput | none | Matrix multiplication. |
| **FM14** | Describe the transformation matrix [[0,−1],[1,0]]. | short | none | Matrix transformation interpretation. |

### Binomial Expansion

| ID | Question | Type | Diagram | Notes |
|----|----------|------|---------|-------|
| **FM15** | Expand (1 + 3x)³. | expression | none | Binomial expansion. |
| **FM16** | Expand (2 − x)⁴. | expression | none | Binomial expansion with negative term. |

### Circle Geometry

| ID | Question | Type | Diagram | Notes |
|----|----------|------|---------|-------|
| **FM17** | Find the centre and radius of x² + y² − 6x + 4y = 12. | multiNumeric | none | Circle equation in standard form. |
| **FM18** | Find gradient of tangent to x² + y² = 25 at (3,4). | numeric | none | Tangent gradient using implicit differentiation. |

### Vectors

| ID | Question | Type | Diagram | Notes |
|----|----------|------|---------|-------|
| **FM19** | Find vector AB given A(2,−1) and B(7,3). | multiNumeric | none | Column vector calculation. |
| **FM20** | Prove that midpoints of a trapezium's diagonals lie on a straight line. | proofShort | none | Vector proof using coordinate geometry. |

---

## Advanced / Grade 8–9 Extension (FM21-FM25)

### Algebraic Proof

| ID | Question | Type | Diagram | Notes |
|----|----------|------|---------|-------|
| **FM21** | Prove that n³−n is always divisible by 6. | proofShort | none | Divisibility proof using factorisation. |

### Iteration

| ID | Question | Type | Diagram | Notes |
|----|----------|------|---------|-------|
| **FM22** | Use iteration to solve x = cos(x). Start x₀ = 1. | numeric | none | Iteration method. Calculator allowed. |

### Calculus Intro

| ID | Question | Type | Diagram | Notes |
|----|----------|------|---------|-------|
| **FM23** | Differentiate y = 4x³ − 2x² + 6x. | expression | none | Basic differentiation. |
| **FM24** | Find stationary points of y = x³ − 3x² + 2. | multiNumeric | none | Stationary points via differentiation. |

### Advanced Functions

| ID | Question | Type | Diagram | Notes |
|----|----------|------|---------|-------|
| **FM25** | Find (fg)⁻¹(x) for f(x)=x+1, g(x)=2x. | expression | none | Composite inverse function. |

---

## Implementation Notes

### Question Type Mapping

- **numeric** → Uses `short` with `meta.questionData.numericTolerance`
- **multiNumeric** → Multiple numeric fields; accepts comma-separated or array format
- **expression** → Algebraic expressions; accepts equivalent forms (e.g., `(x-4)²-13` or `(x-4)^2-13`)
- **short** → Text answers with flexible matching
- **graphPlot** → Interactive graph plotting; uses coordinate grid template
- **graphRead** → Reading values from graphs; uses graph templates
- **matrixInput** → Matrix entry grid; accepts matrix format `[[a,b],[c,d]]`
- **proofShort** → Structured proof answers; accepts multiple valid explanations
- **vectorDiagram** → Vector visualization (can use multiNumeric for coordinates initially)

### Diagram Templates Used

- `math.graphs.axes_blank.v1` - Blank coordinate grid for graphPlot questions
- `math.graphs.linear_axes_line.v1` - Graph with axes and line for graphRead questions
- `math.algebra.function_machine.v1` - Function machine diagram (already exists)

### Import Instructions

The questions are stored in `FURTHER_MATHS_GOLD_QUESTIONS.json` and can be imported using the existing JSON import functionality in the admin panel.

---

## File Structure

- **FURTHER_MATHS_GOLD_QUESTIONS.json** - Complete JSON file with all 25 questions
- **FURTHER_MATHS_QUESTIONS_GOLD_LIST.md** - This documentation file

---

## Next Steps

1. Import the JSON file using the admin JSON import page
2. Ensure the subject "Further Maths" exists in the database
3. Create units and topics as needed (Algebra, Geometry, Number, etc.)
4. For matrixInput and vectorDiagram types, UI components can be added later; they currently normalize to short/expression
