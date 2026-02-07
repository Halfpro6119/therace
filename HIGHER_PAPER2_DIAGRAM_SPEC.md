# 📘 Higher Maths Paper 2 — Diagram Breakdown (Explicit)

Paper 2 is **calculator-based**. Diagrams are fewer, more complex, and more data-driven, but they **must exist** for:

- Trigonometry
- Geometry reasoning
- Statistics
- Graphical interpretation

This doc is the canonical mapping: which H2 questions need which diagram types, and what **new diagram capabilities** the system must support.

---

## 🔢 Number & Algebra — NO diagrams

**Questions:** H2-01 → H2-34

- No diagrams required.
- Calculator use, symbolic manipulation, numeric accuracy.
- **Correct to have no diagrams here.**

---

## 📊 Graphs & Functions (H2-35 → H2-50)

### Required diagram types

#### 🔹 Coordinate Grid (quadratic / function graphs)

**Used in:**

- **H2-37** — Sketch quadratic `y = (x − 2)² − 3`
- **H2-38** — *(Also has read-only variant; see prePlottedGraph)*
- **H2-47** — Sketch reciprocal graph `y = 1/x`

**Diagram primitive:**

```json
{
  "type": "coordinateGrid",
  "xRange": [-6, 6],
  "yRange": [-6, 6],
  "grid": true,
  "axes": true
}
```

Student **plots** the graph (interactive).

---

#### 🔹 Pre-plotted Graph (read-only) — **NEW CAPABILITY**

**Used in:**

- **H2-35** — Find turning point of `y = x² − 6x + 5`
- **H2-38** — Solve `x² − 6x + 5 = 0` using the graph
- **H2-73** — Find median from cumulative frequency curve *(statistical variant)*

**Behaviour:** Static graph rendered from metadata. Student **reads values**, does not plot.

**Diagram primitive (function graph):**

```json
{
  "type": "prePlottedGraph",
  "equation": "y = x^2 - 6x + 5",
  "highlight": ["turningPoint", "roots"]
}
```

**Template ID (golden config):** `math.graphs.pre_plotted.v1`

**System must support:**

- Rendering a curve from equation/metadata
- Optional highlights: turning point, roots, intercepts
- Read-only; no student drawing

---

## 📐 Geometry & Trigonometry (H2-51 → H2-66)

Diagrams are **essential** here.

### 🔺 Right-angled triangle (trig & Pythagoras)

**Used in:** H2-51, H2-52, H2-53, H2-54

**Diagram primitive:**

```json
{
  "type": "triangle",
  "rightAngle": true,
  "labels": {
    "hypotenuse": "unknown",
    "adjacent": 12,
    "opposite": "x"
  }
}
```

**Template:** `math.geometry.triangle.v1` (or triangle with `rightAngle` + labels)

---

### 🔺 Non–right-angled triangle (sine / cosine rule)

**Used in:** H2-55, H2-56, H2-57, H2-58

**Diagram primitive:**

```json
{
  "type": "triangle",
  "labels": {
    "a": 8,
    "b": 7,
    "C": "120°"
  }
}
```

Same `triangle` type; metadata drives sides/angles (no right angle).

---

### ⚪ Circle theorems

**Used in:** H2-61 (angle in semicircle), H2-62 (tangent–radius)

**Diagram primitive:**

```json
{
  "type": "circle",
  "center": "O",
  "radius": 5,
  "diameter": true,
  "tangentAt": "P",
  "angleMarkers": true
}
```

- H2-61: circle with **diameter** (angle in semicircle).
- H2-62: circle with **tangent** at a point (tangent–radius theorem).

**Templates:** `math.circle.basic.v1`, or specialised e.g. `math.circle_theorems.angle_in_semicircle.v1` where applicable.

---

### 🧭 Bearings

**Used in:** H2-65

**Diagram primitive:**

```json
{
  "type": "bearingDiagram",
  "points": ["A", "B"],
  "northLine": true,
  "bearing": "065°"
}
```

**Template:** `math.bearings.north_arrow.v1`

---

### ➡️ Vectors

**Used in:** H2-66

**Diagram primitive:**

```json
{
  "type": "vectorDiagram",
  "from": [2, -1],
  "to": [7, 3]
}
```

**Template:** `math.vectors.diagram.v1`

---

## 📊 Probability & Statistics (H2-67 → H2-80)

### 🌳 Tree diagrams

**Used in:** H2-68

**Diagram primitive:**

```json
{
  "type": "treeDiagram",
  "branches": 2,
  "replacement": false
}
```

**Template:** `math.probability.tree_diagram.v1`

---

### 🟢 Venn diagrams

**Used in:** H2-70, H2-71

**Diagram primitive:**

```json
{
  "type": "vennDiagram",
  "sets": 2
}
```

**Template:** `math.statistics.venn_two_set.v1`

---

### 📈 Statistical graphs

| Question   | Use case                    | Diagram type             |
|-----------|-----------------------------|---------------------------|
| H2-73     | Cumulative frequency → median | `cumulativeFrequency`   |
| H2-75     | Compare two box plots       | `boxPlot`                 |
| H2-76, 77 | Histogram (density / frequency) | `histogram`           |
| H2-78, 79 | Scatter: correlation, line of best fit | `scatterPlot`   |

**Primitives:**

```json
{ "type": "histogram", "classWidths": true }
```

```json
{ "type": "boxPlot" }
```

```json
{ "type": "scatterPlot", "lineOfBestFit": true }
```

**Templates:**

- `math.statistics.cumulative_frequency.v1`
- `math.statistics.boxplot.v1` (or comparison variant)
- `math.statistics.histogram.v1`
- `math.statistics.scatter_plot.v1`

---

## ✅ Summary — Why this is correct

- Paper 2 uses **fewer** diagrams than Paper 1.
- The diagrams it uses are:
  - **More complex**
  - **More information-dense**
  - **Essential for marks**

**System must support:**

1. **Static pre-plotted graphs** — `prePlottedGraph` / `math.graphs.pre_plotted.v1` (equation + optional highlights; student reads only).
2. **Interactive plotting** — `coordinateGrid` for sketch questions (H2-37, H2-47).
3. **Geometry diagrams driven by metadata** — triangle (right and non-right), circle (diameter, tangent), bearings, vectors.
4. **Statistics diagrams** — histogram, cumulative frequency, box plot, scatter (with optional line of best fit).

**Golden config:** `src/config/goldenMathsQuestions.ts` — H2 array uses `GoldenDiagramType` for each question; diagram engine resolves types to template IDs and params as above.
