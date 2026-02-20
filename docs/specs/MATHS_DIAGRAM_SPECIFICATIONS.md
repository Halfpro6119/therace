# GCSE Maths Diagram Specifications

This document provides exact specifications for all diagrams required by the Maths Gold List questions (F01–F27, H01–H32). Each entry includes the question ID, template to use (existing or new), and exact parameters.

---

## Foundation Questions Requiring Diagrams

### F15: Coordinates of point P

**Question:** "Write down the coordinates of point P."

**Template:** `math.graphs.coordinate_point.v1` *(NEW - to create)*

**Specification:**
```json
{
  "mode": "auto",
  "templateId": "math.graphs.coordinate_point.v1",
  "params": {
    "labels": {
      "xLabel": "x",
      "yLabel": "y",
      "pointLabel": "P"
    },
    "values": {
      "xMin": -5,
      "xMax": 5,
      "yMin": -5,
      "yMax": 5,
      "pointX": 3,
      "pointY": 2
    },
    "visibility": {
      "showGrid": true,
      "showNumbers": true,
      "showPoint": true,
      "highlightPoint": true
    }
  },
  "placement": "inline"
}
```

**Implementation Notes:**
- Extend `axesBlank` template to add a single labelled point
- Point should be visually distinct (filled circle, different color)
- Point label "P" positioned near the point
- Grid and axis labels required

---

### F17: Plot points and draw line

**Question:** "Plot (0,1) and (4,9) and draw the line."

**Template:** `math.graphs.linear_axes_line.v1` *(EXISTING)*

**Specification:**
```json
{
  "mode": "auto",
  "templateId": "math.graphs.linear_axes_line.v1",
  "params": {
    "labels": {
      "xLabel": "x",
      "yLabel": "y"
    },
    "values": {
      "gradient": 2,
      "intercept": 1
    },
    "visibility": {
      "showGrid": true,
      "showLine": true,
      "showPoints": true
    },
    "positions": {
      "point1": { "x": 0.1, "y": 0.55 },
      "point2": { "x": 0.7, "y": 0.45 }
    }
  },
  "placement": "inline"
}
```

**Alternative (if graphPlot type not implemented):**
- Use blank axes and ask for equation: "Find the equation of the line passing through (0,1) and (4,9)."
- Template: `math.graphs.axes_blank.v1` with two points marked

---

### F18: Angles on a straight line

**Question:** "Two angles on a straight line are (3x + 10)° and (2x + 30)°. Find x."

**Template:** `math.geometry.straight_line_angles.v1` *(NEW - to create)*

**Specification:**
```json
{
  "mode": "auto",
  "templateId": "math.geometry.straight_line_angles.v1",
  "params": {
    "labels": {
      "angle1Label": "(3x + 10)°",
      "angle2Label": "(2x + 30)°"
    },
    "values": {
      "angle1": 100,
      "angle2": 80
    },
    "visibility": {
      "showLine": true,
      "showAngleArcs": true,
      "showAngleLabels": true
    }
  },
  "placement": "inline"
}
```

**Implementation Notes:**
- Horizontal line with two adjacent angles
- Angle arcs (curved lines) showing the angles
- Labels positioned near each angle arc
- Answer: x = 28

---

### F19: Triangle angle sum

**Question:** "A triangle has angles 52° and 71°. Find the third angle."

**Template:** `math.triangle.basic_angles.v1` *(EXISTING)*

**Specification:**
```json
{
  "mode": "auto",
  "templateId": "math.triangle.basic_angles.v1",
  "params": {
    "labels": {
      "A": "A",
      "B": "B",
      "C": "C"
    },
    "values": {
      "angleA": 52,
      "angleB": 71,
      "angleC": 57
    },
    "visibility": {
      "showAngleA": true,
      "showAngleB": true,
      "showAngleC": false
    }
  },
  "placement": "inline"
}
```

**Answer:** 57° (180 - 52 - 71)

---

### F20: Area of triangle

**Question:** "Find the area of a triangle with base 12 cm and height 7 cm."

**Template:** `math.trig.right_triangle.v1` *(EXISTING - modified)*

**Specification:**
```json
{
  "mode": "auto",
  "templateId": "math.trig.right_triangle.v1",
  "params": {
    "labels": {
      "A": "A",
      "B": "B",
      "C": "C",
      "adjacent": "12 cm",
      "opposite": "7 cm"
    },
    "values": {
      "angle": 30
    },
    "visibility": {
      "showRightAngleMark": true,
      "showSideLabels": true,
      "showAngleLabel": false
    }
  },
  "placement": "inline"
}
```

**Alternative:** Create `math.geometry.triangle_area.v1` with explicit base/height markers

---

### F21: Perimeter of L-shape

**Question:** "Find the perimeter of an L-shape."

**Template:** `math.geometry.compound_lshape.v1` *(NEW - to create)*

**Specification:**
```json
{
  "mode": "auto",
  "templateId": "math.geometry.compound_lshape.v1",
  "params": {
    "labels": {
      "A": "A",
      "B": "B",
      "C": "C",
      "D": "D",
      "E": "E",
      "F": "F"
    },
    "values": {
      "width1": 8,
      "height1": 4,
      "width2": 4,
      "height2": 6,
      "unit": "cm"
    },
    "visibility": {
      "showSideLengths": true,
      "showVertexLabels": true
    }
  },
  "placement": "inline"
}
```

**Example dimensions:**
- Outer rectangle: 8 cm × 10 cm
- Inner cutout: 4 cm × 6 cm (top-right)
- Side lengths: 8, 4, 6, 4, 4, 10 (total = 36 cm)

**Implementation Notes:**
- L-shaped polygon (rectilinear)
- All external side lengths labeled
- Vertex labels optional but helpful
- Answer varies by specific dimensions provided

---

### F22: Volume of cuboid

**Question:** "A cuboid is 8 cm by 5 cm by 3 cm. Find its volume."

**Template:** `math.geometry.cuboid.v1` *(EXISTING - pythagorasCuboid exists, may need simple version)*

**Specification:**
```json
{
  "mode": "auto",
  "templateId": "math.geometry.cuboid.v1",
  "params": {
    "labels": {
      "length": "8 cm",
      "width": "5 cm",
      "height": "3 cm"
    },
    "values": {
      "length": 8,
      "width": 5,
      "height": 3
    },
    "visibility": {
      "showDimensions": true,
      "showHiddenEdges": true
    }
  },
  "placement": "inline"
}
```

**Answer:** 120 cm³

**Note:** Check if `pythagorasCuboid` can be adapted or create simpler version

---

### F23: Circumference of circle

**Question:** "Radius is 6 cm. Find the circumference. Give answer to 1 dp."

**Template:** `math.circle.basic.v1` *(NEW - to create)*

**Specification:**
```json
{
  "mode": "auto",
  "templateId": "math.circle.basic.v1",
  "params": {
    "labels": {
      "O": "O",
      "radiusLabel": "6 cm"
    },
    "values": {
      "radius": 6
    },
    "visibility": {
      "showCenter": true,
      "showRadius": true,
      "showRadiusLabel": true
    }
  },
  "placement": "inline"
}
```

**Answer:** 37.7 cm (to 1 dp)

**Implementation Notes:**
- Circle with center O
- Radius line from center to edge
- Radius length labeled
- Simple, clean diagram

---

### F26: Bar chart interpretation

**Question:** "Read values and compare from a bar chart."

**Template:** `math.statistics.bar_chart.v1` *(NEW - to create)*

**Specification:**
```json
{
  "mode": "auto",
  "templateId": "math.statistics.bar_chart.v1",
  "params": {
    "labels": {
      "xAxisLabel": "Category",
      "yAxisLabel": "Frequency"
    },
    "values": {
      "categories": ["A", "B", "C", "D"],
      "frequencies": [12, 8, 15, 10],
      "yMax": 20
    },
    "visibility": {
      "showGrid": true,
      "showValues": true,
      "showLabels": true
    }
  },
  "placement": "inline"
}
```

**Implementation Notes:**
- Vertical bars
- Categories on x-axis
- Frequency on y-axis
- Grid lines for easy reading
- Values can be shown on bars or read from axis

---

### F27: Scatter graph correlation

**Question:** "Describe the correlation and spot an outlier."

**Template:** `math.statistics.scatter_plot.v1` *(NEW - to create)*

**Specification:**
```json
{
  "mode": "auto",
  "templateId": "math.statistics.scatter_plot.v1",
  "params": {
    "labels": {
      "xAxisLabel": "X Variable",
      "yAxisLabel": "Y Variable"
    },
    "values": {
      "points": [
        { "x": 2, "y": 3 },
        { "x": 4, "y": 5 },
        { "x": 5, "y": 6 },
        { "x": 7, "y": 8 },
        { "x": 8, "y": 9 },
        { "x": 10, "y": 4 }
      ],
      "xMin": 0,
      "xMax": 12,
      "yMin": 0,
      "yMax": 10
    },
    "visibility": {
      "showGrid": true,
      "showPoints": true,
      "highlightOutlier": true
    }
  },
  "placement": "inline"
}
```

**Implementation Notes:**
- Points plotted on coordinate grid
- Positive correlation with one outlier (last point)
- Outlier can be highlighted in different color
- Answer: positive correlation, outlier at (10, 4)

---

## Higher Questions Requiring Diagrams

### H06: Simultaneous equations (optional graph)

**Question:** "Solve simultaneously: y = x² and y = 2x + 3"

**Template:** `math.graphs.quadratic_linear.v1` *(NEW - to create)*

**Specification:**
```json
{
  "mode": "auto",
  "templateId": "math.graphs.quadratic_linear.v1",
  "params": {
    "labels": {
      "xLabel": "x",
      "yLabel": "y"
    },
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

**Answer:** x = -1, x = 3 (and corresponding y values)

**Note:** Optional - question can be solved algebraically without diagram

---

### H07: Inequality on number line

**Question:** "Solve: 3x − 7 < 11"

**Template:** `math.algebra.number_line.v1` *(NEW - to create)*

**Specification:**
```json
{
  "mode": "auto",
  "templateId": "math.algebra.number_line.v1",
  "params": {
    "labels": {
      "label": "x"
    },
    "values": {
      "min": -5,
      "max": 10,
      "value": 6,
      "strict": true
    },
    "visibility": {
      "showNumbers": true,
      "showArrow": true,
      "showOpenCircle": true
    }
  },
  "placement": "inline"
}
```

**Answer:** x < 6

**Implementation Notes:**
- Number line with tick marks
- Open circle at x = 6 (strict inequality)
- Arrow pointing left (less than)
- Answer: x < 6

---

### H19: Angle in semicircle

**Question:** "In a circle, AB is a diameter and C is a point on the circle. Find ∠ACB."

**Template:** `math.circle_theorems.angle_in_semicircle.v1` *(EXISTING)*

**Specification:**
```json
{
  "mode": "auto",
  "templateId": "math.circle_theorems.angle_in_semicircle.v1",
  "params": {
    "labels": {
      "A": "A",
      "B": "B",
      "C": "C",
      "O": "O"
    },
    "positions": {
      "C": { "x": 0.5, "y": 0.2 }
    },
    "visibility": {
      "showCenter": true,
      "showAngleLabel": true,
      "showRightAngleMark": true
    }
  },
  "placement": "inline"
}
```

**Answer:** 90° (angle in semicircle theorem)

---

### H20: Tangent-radius theorem

**Question:** "A tangent touches a circle at P. OP is a radius. What is the angle between OP and the tangent?"

**Template:** `math.circle_theorems.tangent_radius.v1` *(EXISTING)*

**Specification:**
```json
{
  "mode": "auto",
  "templateId": "math.circle_theorems.tangent_radius.v1",
  "params": {
    "labels": {
      "O": "O",
      "A": "P",
      "T": "T"
    },
    "visibility": {
      "showRightAngle": true,
      "showCenter": true
    }
  },
  "placement": "inline"
}
```

**Answer:** 90°

---

### H21: Similar triangles

**Question:** "Two triangles are similar. Find the missing side length."

**Template:** `math.geometry.similar_triangles.v1` *(NEW - to create)*

**Specification:**
```json
{
  "mode": "auto",
  "templateId": "math.geometry.similar_triangles.v1",
  "params": {
    "labels": {
      "triangle1": { "A": "A", "B": "B", "C": "C" },
      "triangle2": { "D": "D", "E": "E", "F": "F" }
    },
    "values": {
      "triangle1": { "sideAB": 6, "sideBC": 8, "sideAC": 10 },
      "triangle2": { "sideDE": 9, "sideEF": 12, "sideDF": null },
      "scaleFactor": 1.5
    },
    "visibility": {
      "showSideLengths": true,
      "showCorrespondingAngles": true,
      "showScaleFactor": false
    }
  },
  "placement": "inline"
}
```

**Example:**
- Triangle 1: sides 6, 8, 10
- Triangle 2: sides 9, 12, ? (scale factor 1.5)
- Answer: 15

**Implementation Notes:**
- Two triangles side-by-side
- Corresponding sides labeled
- Missing side marked with "?"
- Corresponding angles marked (e.g., arcs)

---

### H23: Right triangle trigonometry

**Question:** "In a right triangle, angle = 38°, adjacent = 12 cm. Find hypotenuse."

**Template:** `math.trig.right_triangle.v1` *(EXISTING)*

**Specification:**
```json
{
  "mode": "auto",
  "templateId": "math.trig.right_triangle.v1",
  "params": {
    "labels": {
      "A": "A",
      "B": "B",
      "C": "C",
      "adjacent": "12 cm",
      "hypotenuse": "?"
    },
    "values": {
      "angle": 38
    },
    "visibility": {
      "showRightAngleMark": true,
      "showSideLabels": true,
      "showAngleLabel": true
    }
  },
  "placement": "inline"
}
```

**Answer:** 15.2 cm (to 1 dp) - using cos(38°) = adjacent/hypotenuse

---

### H24: Sine rule triangle

**Question:** "In triangle ABC, a = 8, A = 35°, B = 72°. Find b."

**Template:** `math.trig.sine_rule_triangle.v1` *(NEW - to create)*

**Specification:**
```json
{
  "mode": "auto",
  "templateId": "math.trig.sine_rule_triangle.v1",
  "params": {
    "labels": {
      "A": "A",
      "B": "B",
      "C": "C"
    },
    "values": {
      "sideA": 8,
      "angleA": 35,
      "angleB": 72,
      "angleC": 73,
      "sideB": null,
      "sideC": null
    },
    "visibility": {
      "showSideLengths": true,
      "showAngles": true,
      "showAngleArcs": true
    }
  },
  "placement": "inline"
}
```

**Answer:** b ≈ 13.3 (using sine rule: a/sin A = b/sin B)

**Implementation Notes:**
- Triangle with all vertices labeled
- Side a = 8 opposite angle A = 35°
- Angle B = 72° shown
- Missing side b to find

---

### H25: Cosine rule triangle

**Question:** "Find the length of side c when a = 7, b = 9, angle C = 120°."

**Template:** `math.trig.cosine_rule_triangle.v1` *(NEW - to create)*

**Specification:**
```json
{
  "mode": "auto",
  "templateId": "math.trig.cosine_rule_triangle.v1",
  "params": {
    "labels": {
      "A": "A",
      "B": "B",
      "C": "C"
    },
    "values": {
      "sideA": 7,
      "sideB": 9,
      "sideC": null,
      "angleC": 120
    },
    "visibility": {
      "showSideLengths": true,
      "showAngleC": true,
      "showAngleArc": true
    }
  },
  "placement": "inline"
}
```

**Answer:** c ≈ 14.0 (using cosine rule: c² = a² + b² - 2ab cos C)

---

### H26: Tree diagram (optional)

**Question:** "Two draws without replacement; find probability of two reds."

**Template:** `math.probability.tree_diagram.v1` *(NEW - to create)*

**Specification:**
```json
{
  "mode": "auto",
  "templateId": "math.probability.tree_diagram.v1",
  "params": {
    "labels": {
      "firstDraw": "First Draw",
      "secondDraw": "Second Draw"
    },
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
    "visibility": {
      "showProbabilities": true,
      "showOutcomes": true
    }
  },
  "placement": "inline"
}
```

**Answer:** (5/10) × (4/9) = 20/90 = 2/9

**Note:** Optional - can be solved without diagram

---

### H28: Histogram

**Question:** "Find frequency from histogram bars with unequal class widths."

**Template:** `math.statistics.histogram.v1` *(NEW - to create)*

**Specification:**
```json
{
  "mode": "auto",
  "templateId": "math.statistics.histogram.v1",
  "params": {
    "labels": {
      "xAxisLabel": "Time (minutes)",
      "yAxisLabel": "Frequency Density"
    },
    "values": {
      "classes": [
        { "start": 0, "end": 10, "frequency": 20, "frequencyDensity": 2 },
        { "start": 10, "end": 20, "frequency": 30, "frequencyDensity": 3 },
        { "start": 20, "end": 40, "frequency": 40, "frequencyDensity": 2 },
        { "start": 40, "end": 60, "frequency": 30, "frequencyDensity": 1.5 }
      ],
      "yMax": 4
    },
    "visibility": {
      "showGrid": true,
      "showFrequencies": false,
      "showFrequencyDensity": true
    }
  },
  "placement": "inline"
}
```

**Implementation Notes:**
- Bars with unequal widths
- Frequency density on y-axis
- Students calculate frequency = frequency density × class width
- Example: class 20-40 has width 20, frequency density 2, so frequency = 40

---

### H29: Box plots comparison

**Question:** "Compare distributions using median and IQR."

**Template:** `math.statistics.boxplot.v1` *(EXISTING)*

**Specification:**
```json
{
  "mode": "auto",
  "templateId": "math.statistics.boxplot.v1",
  "params": {
    "values": {
      "min": 5,
      "q1": 15,
      "median": 25,
      "q3": 35,
      "max": 50
    },
    "visibility": {
      "showLabels": true,
      "showValues": true
    }
  },
  "placement": "inline"
}
```

**For comparison questions, create two box plots side-by-side:**

```json
{
  "mode": "auto",
  "templateId": "math.statistics.boxplot_comparison.v1",
  "params": {
    "values": {
      "dataset1": { "min": 5, "q1": 15, "median": 25, "q3": 35, "max": 50 },
      "dataset2": { "min": 10, "q1": 20, "median": 30, "q3": 40, "max": 55 }
    },
    "labels": {
      "dataset1Label": "Group A",
      "dataset2Label": "Group B"
    },
    "visibility": {
      "showLabels": true,
      "showValues": true
    }
  },
  "placement": "inline"
}
```

**Answer:** Compare medians and IQRs (e.g., Group B has higher median, similar IQR)

---

## New Templates to Create

### Priority 1 (Required for Gold List)

1. **`math.graphs.coordinate_point.v1`**
   - Coordinate grid with single labelled point
   - Used by: F15

2. **`math.geometry.straight_line_angles.v1`**
   - Straight line with two adjacent angles
   - Used by: F18

3. **`math.geometry.compound_lshape.v1`**
   - L-shaped compound rectilinear shape with side lengths
   - Used by: F21

4. **`math.circle.basic.v1`**
   - Simple circle with radius marked
   - Used by: F23

5. **`math.statistics.bar_chart.v1`**
   - Vertical bar chart
   - Used by: F26

6. **`math.statistics.scatter_plot.v1`**
   - Scatter plot with points
   - Used by: F27

7. **`math.algebra.number_line.v1`**
   - Number line with inequality visualization
   - Used by: H07

8. **`math.geometry.similar_triangles.v1`**
   - Two similar triangles side-by-side
   - Used by: H21

9. **`math.trig.sine_rule_triangle.v1`**
   - Triangle with sides and angles for sine rule
   - Used by: H24

10. **`math.trig.cosine_rule_triangle.v1`**
    - Triangle with sides and angle for cosine rule
    - Used by: H25

11. **`math.statistics.histogram.v1`**
    - Histogram with unequal class widths
    - Used by: H28

### Priority 2 (Optional/Enhancement)

12. **`math.graphs.quadratic_linear.v1`**
    - Quadratic and linear graph intersection
    - Used by: H06 (optional)

13. **`math.probability.tree_diagram.v1`**
    - Probability tree diagram
    - Used by: H26 (optional)

14. **`math.statistics.boxplot_comparison.v1`**
    - Two box plots side-by-side for comparison
    - Used by: H29 (enhancement)

---

## Template Schema Pattern

All new templates should follow this structure:

```typescript
export const templateName: DiagramEngineTemplate = {
  templateId: 'math.category.template_name.v1',
  title: 'Human-Readable Title',
  description: 'What this template does',
  category: 'graphs' | 'geometry' | 'trigonometry' | 'statistics' | 'algebra' | 'probability',
  schema: {
    labels: {
      // String labels with defaults and maxLen
      labelName: { default: 'Default', maxLen: 20 }
    },
    values: {
      // Numeric values with defaults, type, min, max
      valueName: { default: 0, type: 'number', min: -100, max: 100 }
    },
    positions: {
      // Normalized coordinates (0-1) for points
      pointName: { default: { x: 0.5, y: 0.5 }, normalized: true }
    },
    visibility: {
      // Boolean flags for showing/hiding elements
      showElement: { default: true }
    }
  },
  render: (params: DiagramParams): DiagramRenderResult => {
    // SVG generation logic
    return {
      svg: '<svg>...</svg>',
      width: 500,
      height: 400,
      warnings: []
    };
  }
};
```

---

## Implementation Checklist

- [x] Create `math.graphs.coordinate_point.v1` template
- [x] Create `math.geometry.straight_line_angles.v1` template
- [x] Create `math.geometry.compound_lshape.v1` template
- [x] Create `math.circle.basic.v1` template
- [x] Create `math.statistics.bar_chart.v1` template
- [x] Create `math.statistics.scatter_plot.v1` template
- [x] Create `math.algebra.number_line.v1` template
- [x] Create `math.geometry.similar_triangles.v1` template
- [x] Create `math.trig.sine_rule_triangle.v1` template
- [x] Create `math.trig.cosine_rule_triangle.v1` template
- [x] Create `math.statistics.histogram.v1` template
- [x] Register all new templates in `src/diagrams/engine/registry.ts`
- [ ] Test each template with the exact parameters specified above
- [ ] Update question prompts to reference correct template IDs

---

## Notes

- **Status:** All Priority 1 and Priority 2 diagram templates are implemented and registered in `src/diagrams/engine/registry.ts`. The quadratic–linear graph uses a scaled y-origin for the x-axis when 0 is in range.
- All diagrams should use consistent styling (see existing templates for CSS classes)
- Colors: axes/lines `#94a3b8`, highlights `#60a5fa`, text `#e2e8f0`
- Font: system font stack (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`)
- Grid opacity: 0.2 for subtle background
- Point markers: 4-5px radius circles
- Text sizes: 14-18px for labels, 12-14px for small text
