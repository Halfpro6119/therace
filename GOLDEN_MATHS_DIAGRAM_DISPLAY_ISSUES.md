# Golden Maths — Diagram Display Issues

**Status:** All display issues listed below have been **fixed** in the diagram templates and question config (see implementation notes at the end).

This document lists questions where the **diagram was not displayed properly** or could be improved so that students can actually use it to answer the question. Issues fall into two categories:

1. **Missing axis scale/numbers** — Graphs show axes and labels but no numeric scale, so values cannot be read (e.g. “estimate y when x = 6” is impossible without knowing where 6 is).
2. **Diagram shows wrong or incomplete data** — The diagram type or parameters do not match the question (wrong dimensions, missing line of best fit, etc.). See also `GOLDEN_MATHS_DIAGRAM_LOGIC_ERRORS.md` for the full list of logic/parameter fixes.

---

## Part 1: Graphs with no axis numbers (display not usable)

These diagram templates draw axes and axis labels (e.g. “X Variable”, “Y Variable”) but **do not draw tick marks or numeric scale labels** on the axes. As a result, students cannot read off values, estimate from a line of best fit, or find gradients/roots from the graph.

### 1. Scatter plot — no scale on either axis

**Template:** `math.statistics.scatter_plot.v1` (`src/diagrams/templates/scatterPlot.ts`)

**What is wrong:**  
The scatter plot shows:
- X- and Y-axes with arrowheads  
- Axis labels (“X Variable”, “Y Variable”)  
- Grid lines and data points  

It does **not** show:
- Any numbers on the X-axis (so you cannot see where x = 6, 8, 10, etc.)  
- Any numbers on the Y-axis (so you cannot read y-values)  

**Why it matters:**  
Questions ask students to “use the line of best fit to estimate y when x = 6” or “describe correlation” or “identify the outlier”. Without a scale, they cannot locate x = 6, cannot read approximate y-values, and cannot give coordinates for the outlier.

**Affected question IDs:**

| ID     | Prompt (short) |
|--------|----------------|
| F2-13  | Describe correlation and identify outlier |
| H1-67  | Describe correlation |
| H1-68  | Identify an outlier |
| H2-78  | Scatter graph — describe correlation |
| H2-79  | Scatter graph — line of best fit estimate |
| H3-72  | Describe the correlation shown in the scatter graph |
| **H3-73** | **Use the line of best fit to estimate y when x = 6.** |
| H3-74  | Explain why the point at (10, 4) is an outlier |
| H3-80  | Evaluate claim that data proves a trend |

**How to improve:** *(Implemented)*

1. **Template change:** Added `visibility.showNumbers` (default `true`) and `visibility.showLineOfBestFit` (default `false`) to `scatterPlot.ts`.
2. **Rendering:** Axis numeric labels are drawn on both axes using `xMin`/`xMax`/`yMin`/`yMax` at integer steps (step 1 for range ≤ 16, else 2 or 5).
3. **Line of best fit:** When `showLineOfBestFit` is true, the least-squares line is drawn (dashed orange). H2-79 and H3-73 have `diagramParams: { ..., visibility: { showLineOfBestFit: true } }`.

---

### 2. Cumulative frequency curve — no scale on axes

**Template:** `math.statistics.cumulative_frequency.v1` (`src/diagrams/templates/cumulativeFrequency.ts`)

**What is wrong:**  
The diagram shows:
- X- and Y-axes with labels (“Upper class boundary”, “Cumulative frequency”)  
- Grid lines and the cumulative frequency curve  
- Optional median/quartile lines (e.g. “n/2”)  

It does **not** show:
- Numeric labels on the X-axis (upper class boundaries: 10, 20, 30, …)  
- Numeric labels on the Y-axis (cumulative frequency: 0, 20, 40, … 100)  

**Why it matters:**  
Students are asked to “use the cumulative frequency curve to estimate the median value” or “find the median from cumulative frequency curve”. To do that they must read the median (e.g. 50) on the y-axis and then read off the corresponding x-value. Without axis numbers, the graph is not usable.

**Affected question IDs:**

| ID     | Prompt (short) |
|--------|----------------|
| H2-73  | Find the median from cumulative frequency curve |
| H3-67  | Use the cumulative frequency curve to estimate the median value |

**How to improve:** *(Implemented)*

1. **Template change:** Added `visibility.showNumbers` (default `true`) to `cumulativeFrequency.ts`.
2. **Rendering:** Y-axis labels from 0 to `yMax` at steps of 10/20/25 depending on range; x-axis labels at each data point’s upper class boundary. Styling uses `diagram-text-small`, `text-anchor: end` for y, `text-anchor: middle` for x.

---

### 3. Pre-plotted graph (quadratic) — no scale on axes

**Template:** `math.graphs.pre_plotted.v1` (`src/diagrams/templates/prePlottedGraph.ts`)

**What is wrong:**  
The diagram shows:
- Axes with labels “x” and “y”  
- The curve (e.g. y = x² − 6x + 5)  
- Optional highlights (turning point, roots, y-intercept) with coordinates in text  

It does **not** show:
- Tick marks or numbers along the X-axis  
- Tick marks or numbers along the Y-axis  

**Why it matters:**  
Questions ask to “find the turning point”, “solve using the graph”, or “solve graphically”. The turning point and roots are sometimes shown as text, but a proper scale helps students verify readings and understand the graph. Without scale, the diagram is less clear and less like an exam-style graph.

**Affected question IDs:**

| ID     | Prompt (short) |
|--------|----------------|
| H2-35  | Find the turning point of y = x² − 6x + 5 |
| H2-38  | Solve x² − 6x + 5 = 0 using the graph |
| H3-34  | Solve graphically x² = 6x − 5 using the graph of y = x² − 6x + 5 |

**How to improve:** *(Implemented)*

1. **Template change:** Added `visibility.showNumbers` (default `true`) to `prePlottedGraph.ts`.
2. **Rendering:** Axis numeric labels at integer steps (step 1 for range ≤ 12, else 2 or 5) on both axes using `xMin`/`xMax`/`yMin`/`yMax`.

---

## Part 2: Other diagram display improvements

### 4. Line of best fit not drawn on scatter plot

**What is wrong:**  
For questions such as H2-79 (“Scatter graph — line of best fit estimate”) and H3-73 (“Use the line of best fit to estimate y when x = 6”), the scatter plot shows only points. The “line of best fit” is never drawn, so students are expected to mentally add it. That is harder and ambiguous.

**How to improve:** *(Implemented)*  
- Added `visibility.showLineOfBestFit` to the scatter plot template. When enabled, the least-squares line is drawn (dashed orange) from (xMin, predicted y) to (xMax, predicted y).  
- H2-79 and H3-73 have `diagramParams.visibility: { showLineOfBestFit: true }`.  
- Axis numbers are now drawn by default (see §1).

---

### 5. Coordinate grid / gradient questions

**Status:** Questions that use `coordinateGrid` (e.g. F2-07 “Find the gradient of the line”, F2-08, F1-18, H1-35) resolve to the template `math.graphs.coordinate_point.v1`, which **does** support `showNumbers` and draws a full set of axis labels. So these diagrams are not in the “no numbers” list. If any variant uses a different template (e.g. blank axes without numbers), that variant should be updated to show a scale.

---

## Summary table — display issues only

| Issue | Template | Affected questions | Status |
|-------|----------|-------------------|--------|
| No axis numbers | Scatter plot | F2-13, H1-67, H1-68, H2-78, H2-79, H3-72, **H3-73**, H3-74, H3-80 | ✅ Fixed: showNumbers + axis labels in `scatterPlot.ts` |
| No axis numbers | Cumulative frequency | H2-73, H3-67 | ✅ Fixed: showNumbers + axis labels in `cumulativeFrequency.ts` |
| No axis numbers | Pre-plotted graph | H2-35, H2-38, H3-34 | ✅ Fixed: showNumbers + axis labels in `prePlottedGraph.ts` |
| Line of best fit not drawn | Scatter plot | H2-79, H3-73 | ✅ Fixed: showLineOfBestFit in template; diagramParams set in `goldenMathsQuestions.ts` |

---

## Cross-reference: diagram logic errors

For cases where the **diagram shows the wrong data** (e.g. wrong triangle side lengths, wrong radius, wrong bearing, or missing sector angle), see **`GOLDEN_MATHS_DIAGRAM_LOGIC_ERRORS.md`**. That document covers parameter and template mismatches (e.g. 3-4-5 triangle vs 5-12-13, radius 6 vs 4, single bearing vs two legs). The present document focuses on **display** (missing scales and optional line of best fit) so that diagrams that are already logically correct become **usable** on screen.

---

## Implementation summary (all fixes applied)

- **`src/diagrams/templates/scatterPlot.ts`:** Added `showNumbers` (default true) and `showLineOfBestFit` (default false). Axis labels at integer steps; line of best fit drawn when enabled.
- **`src/diagrams/templates/cumulativeFrequency.ts`:** Added `showNumbers` (default true). Y-axis labels at 0, 10, 20, …; x-axis labels at each upper class boundary.
- **`src/diagrams/templates/prePlottedGraph.ts`:** Added `showNumbers` (default true). Axis labels at integer steps for x and y.
- **`src/config/goldenMathsQuestions.ts`:** H2-79 and H3-73 now include `visibility: { showLineOfBestFit: true }` in their `diagramParams`.
