# Golden Maths — Questions Missing Context (Ill-Defined)

This document lists questions in the golden maths bank where the **prompt does not state what the student is supposed to find, calculate, or show**. Like the example in the image: *"Apply the angle in a semicircle theorem"* with no instruction such as *"to find the size of angle C"* — so the student is told *what method to use* but not *what the question is*.

**Criteria:** The prompt names a method, theorem, or task but **does not include a clear ask** (e.g. "find …", "calculate …", "show that …", "state the value of …"). Such questions are ill-defined and don’t make full sense without that context.

---

## Category 1: “Apply/Use [theorem or method]” with no ask

These prompts tell the student to apply a theorem or use a method but never say **what to find or show**. A correct formulation would add something like “to find the size of angle C” or “to find the angle at the circumference”.

| ID     | Current prompt                                   | Type   | Diagram | Issue | Status |
|--------|--------------------------------------------------|--------|---------|--------|--------|
| **H2-61** | Apply the angle in a semicircle theorem to find the size of angle C. | numeric | circle  | ~~No ask.~~ | ✅ Complete |
| **H3-46** | Apply the angle in a semicircle theorem to find the size of angle C. | numeric | circle  | ~~Same as image: no ask.~~ | ✅ Complete |

**Suggested fix (both):**  
Rewrite to include the task, e.g.  
*“Apply the angle in a semicircle theorem to find the size of angle C.”*  
or  
*“Use the angle in a semicircle theorem. Find the size of the angle at C.”*

---

## Category 2: “Find [quantity]” with no specification

These say “find” something but don’t specify **which** quantity (e.g. which angle, which probability, which value). The diagram or resource might imply it, but the wording alone is vague.

| ID     | Current prompt                         | Type    | Diagram       | Issue | Status |
|--------|----------------------------------------|---------|---------------|--------|--------|
| **F2-07**  | Find the gradient of the line.         | graphRead | coordinateGrid | ~~Doesn’t say “of the line”.~~ | ✅ Complete |
| **F2-14**  | Find the fraction of the circle represented by the shaded sector. | numeric   | pieChart     | ~~Ambiguous.~~ | ✅ Complete |
| **F1-26**  | Read the frequency for each category from the bar chart. | numeric   | barChart     | ~~Doesn’t say which values.~~ | ✅ Complete |
| **H2-71**  | Find P(B) from the Venn diagram.       | numeric   | vennDiagram  | ~~Doesn't say which probability.~~ | ✅ Complete |
| **H3-73**  | Use the line of best fit to estimate y when x = 6. | numeric | scatterPlot | ~~Doesn’t say which value.~~ | ✅ Complete |

**Suggested fix:**  
Add the missing specification, e.g.  
- F2-07: *“Find the gradient of the line.”*  
- F2-14: *“Find the fraction of the circle represented by the shaded sector.”*  
- F1-26: *“Read the frequency for each category from the bar chart.”* (or specify categories)  
- H2-71: *“Find P(A) from the Venn diagram.”* (or the required probability)  
- H3-73: *“Use the line of best fit to estimate y when x = 6.”* (or the given scenario)

---

## Category 3: “Find/Complete from [resource]” with no target

The prompt refers to a resource (table, diagram) but doesn’t clearly state what to find or complete (e.g. which statistic, which cells, which labels).

| ID     | Current prompt                    | Type     | Diagram | Issue | Status |
|--------|-----------------------------------|----------|---------|--------|--------|
| **F1-25**  | Find the mean of the data from the frequency table. | numeric  | none    | ~~Vague.~~ | ✅ Complete |
| **H3-67**  | Use the cumulative frequency curve to estimate the median value. | graphRead | cumulativeFrequency | ~~Could state quantity.~~ | ✅ Complete |

All listed questions have been fixed; prompts now state the task clearly.

---

## Summary table (all)

| ID     | Prompt (short)                              | Category | Fix priority | Status       |
|--------|---------------------------------------------|----------|--------------|--------------|
| H2-61  | Apply the angle in a semicircle theorem to find the size of angle C. | 1 | High         | ✅ Complete  |
| H3-46  | Apply the angle in a semicircle theorem to find the size of angle C. | 1 | High         | ✅ Complete  |
| F2-07  | Find the gradient of the line.               | 2        | Medium       | ✅ Complete  |
| F2-14  | Find the fraction of the circle represented by the shaded sector. | 2 | Medium       | ✅ Complete  |
| F1-26  | Read the frequency for each category from the bar chart. | 2 | Medium       | ✅ Complete  |
| H2-71  | Find P(B) from the Venn diagram.            | 2        | Medium       | ✅ Complete  |
| H3-73  | Use the line of best fit to estimate y when x = 6. | 2 | Medium       | ✅ Complete  |
| F1-25  | Find the mean of the data from the frequency table. | 3 | Medium       | ✅ Complete  |
| H3-67  | Use the cumulative frequency curve to estimate the median value. | 3 | Low (minor)  | ✅ Complete  |

---

## Reference: good examples (clear ask)

For comparison, prompts that **do** state a clear task:

- *“Use Pythagoras to find the hypotenuse”* — find the hypotenuse.
- *“Apply the angle in a semicircle theorem to find the size of angle C”* — find the size of angle C.
- *“Tangent meets radius at 90°. Given angle at centre 65°, find the angle between tangent and chord”* — find a specific angle.
- *“Find the probability from a Venn diagram”* → better as *“Find P(A∪B) from the Venn diagram.”*

When editing prompts, ensure each one includes **what** the student should find, calculate, show, or state.
