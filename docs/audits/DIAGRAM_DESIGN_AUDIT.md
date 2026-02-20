# Diagram Visual Design Audit

## Current State (from screenshot and codebase)

- **Layout**: Triangle with vertices A, B, C; angles 50° and 60° shown; angle at C unmarked.
- **Background**: Dark surface (`rgb(var(--surface))` in a dark theme), which makes the diagram feel “app-like” rather than textbook.
- **Lines**: Bright blue (`#3b82f6`) with a visible **neon glow** (`drop-shadow(0 0 3px rgba(59, 130, 246, 0.5))`) applied globally in CSS to all lines, paths, circles, and text.
- **Vertices**: Small circles with light blue fill and the same glow.
- **Labels**: Light blue/white text with a subtle glow; sans-serif, mixed font sizes (14–20px across templates).
- **Angle arcs**: Present in sine/cosine rule templates; **no arc indicators** in the reference image—only numeric labels, which is less clear for teaching.

---

## Issues That Reduce a “Professional” Feel

1. **Glow is too strong**  
   The hologram/neon effect on every stroke and label reads as decorative rather than authoritative. Textbook and exam diagrams use clean strokes and no glow.

2. **Inconsistent styling across templates**  
   - Vertex dots: `#60a5fa` in `triangle.ts`, `#cbd5e1` in sine/cosine/right.  
   - Side text: `#94a3b8` in `triangle.ts`, `#60a5fa` in others.  
   - Font sizes: 14px, 16px, 17px, 18px, 20px with no clear hierarchy.

3. **Angle at C not marked**  
   When two angles are shown (e.g. 50°, 60°), the third angle is implied but not drawn. For clarity, either show an arc at C or make “only two angles” a deliberate, consistent choice with a small note.

4. **No arc where angles are shown**  
   The reference shows only numeric labels (50°, 60°) with no arc. Arcs reinforce which angle is which and look more professional.

5. **Background depends on theme**  
   Diagrams are transparent SVG on a themed container. For print and consistency, an explicit light fill (or optional diagram background) would make them reproducible and more “document-like.”

6. **Stroke overrides in CSS**  
   Global overrides (`stroke: #3b82f6 !important`) force one look and make it hard for templates to express semantic differences (e.g. construction vs given lines). A lighter hand would allow template-level control.

7. **Text weight**  
   Global `font-weight: 600` on all diagram text can make labels compete with each other; a clear hierarchy (e.g. vertex labels bold, measures regular) would look more polished.

---

## Recommended Design Improvements

### 1. Tone down or remove the glow (high impact)

- **Option A (recommended):** Remove the drop-shadow on lines and shapes; keep a very subtle shadow on text only if needed for legibility (e.g. `drop-shadow(0 0 1px rgba(0,0,0,0.15))`).
- **Option B:** Use a much subtler glow (e.g. `0 0 1px` with low opacity) so diagrams stay readable and “clean” while keeping a slight digital feel.

### 2. Use a consistent, professional palette

- **Primary structure (edges, outline):** Single neutral (e.g. `#475569` or `#64748b`) at 1.5–2px. Avoid forcing bright blue on every line.
- **Vertex markers:** One consistent fill (e.g. `#64748b` or a soft blue) and optional thin stroke; no glow.
- **Text:**  
  - Vertex labels (A, B, C): one weight/size (e.g. 18px bold).  
  - Measures (sides, angles): slightly smaller (e.g. 15–16px), regular weight, distinct color (e.g. `#475569` for sides, `#dc2626` or `#b91c1c` for angles if you want a traditional red).
- **Angle arcs:** Same stroke as angle color, 1–1.5px, no fill.

### 3. Standardise typography

- Define a small set of classes or design tokens:  
  - **Vertex label:** e.g. 18px, bold, one color.  
  - **Side length / measure:** 15px, regular, secondary color.  
  - **Angle label:** 15px, medium, angle color.  
- Use the same `font-family` everywhere (you already use a system stack; keep it).

### 4. Always pair angle labels with arcs

- Where an angle value is shown (e.g. 50°, 60°), draw a small arc at that vertex so the angle is unambiguous.
- Ensure arc radius and label position are consistent across triangle templates (sine rule, cosine rule, generic triangle, isosceles, etc.).

### 5. Explicit diagram background (optional)

- Add an optional `<rect>` behind the diagram in SVG, or a wrapper background in CSS, e.g. `#fafafa` or `#ffffff`, so that:
  - Print and PDFs look consistent.  
  - Diagrams don’t “disappear” on light themes or when embedded elsewhere.

### 6. Reduce global overrides; favour template-level control

- Prefer setting stroke/fill in the SVG templates (or via a small shared “diagram tokens” object) and use CSS only for:
  - Container (padding, max-width, background if desired).  
  - Optional, minimal enhancement (e.g. very subtle text shadow for contrast), not full stroke/color override.

### 7. Small UX polish

- **Vertex label offset:** Ensure labels sit just outside the vertex (consistent 12–18px offset) so they don’t overlap the sides.
- **Right-angle mark:** Keep the small square; ensure stroke weight and colour match the rest of the diagram (e.g. same neutral as edges).
- **Equal side ticks:** Keep them; use the same stroke as angle arcs or structure lines for consistency.

---

## Summary

| Area            | Current                         | Recommended                          |
|-----------------|----------------------------------|--------------------------------------|
| Glow            | Strong blue on all elements      | Remove or very subtle (text only)    |
| Line stroke     | Bright blue, 2.5px, overridden   | Neutral gray, 1.5–2px, template-set |
| Vertices        | Blue fill + glow                 | Solid fill, optional thin stroke     |
| Typography      | Mixed 14–20px, all semi-bold     | 2–3 sizes, clear hierarchy           |
| Angle arcs      | Missing in some diagrams         | Always show where angle is labelled   |
| Background      | Transparent / theme-dependent    | Optional explicit light background   |
| Overrides       | Heavy `!important` in CSS        | Prefer template-controlled styles   |

Applying these will make the diagrams feel more like **clear, printable teaching diagrams** while keeping them readable and on-brand in the app.

---

## Design tokens (for template consistency)

Use these in diagram templates so all maths diagrams feel unified:

| Role            | Color (hex)  | Stroke/weight      | Notes                    |
|-----------------|-------------|---------------------|--------------------------|
| Structure lines | `#64748b`   | 1.5–2px             | Edges, axes, construction |
| Vertex points   | `#64748b`   | fill, optional 1px stroke | Small circles at A, B, C |
| Vertex labels   | `#e2e8f0` (dark bg) / `#1e293b` (light) | 18px bold | A, B, C |
| Side lengths    | `#94a3b8`   | 15–16px regular     | e.g. "5 cm", "a = 8"     |
| Angle labels    | `#f87171` or `#dc2626` | 15px medium | e.g. "50°"        |
| Angle arcs      | same as angle label | 1–1.5px, no fill  | Small arc at vertex       |
| Right-angle mark| `#64748b` or `#3b82f6` | 1.5px          | Small square              |

---

## Implementation status (full)

All audit recommendations are implemented:

1. **Glow removed** – `src/index.css`: no drop-shadow on lines, circles, paths, rects, polygons. Only a very subtle text shadow for legibility (and dark-mode variant).

2. **Consistent palette** – Shared design tokens in `src/diagrams/designTokens.ts`: structure lines `#64748b` 2px, vertex points `#64748b`, vertex labels 18px bold `#e2e8f0`, side lengths 15px regular `#94a3b8`, angle labels 15px medium `#dc2626`, angle arcs 1.5px, right-angle and equal marks `#64748b` (no glow).

3. **Typography** – All diagram templates use token font sizes and weights; triangle/trig templates use `diagramStyleBlock()` from tokens.

4. **Angle arcs** – Templates that show angle values now draw a matching arc: `triangleBasicAngles.ts` (arcs at A, B, C), `isoscelesTriangle.ts` (arcs at A, B, C). Sine/cosine/right already had arcs; now use token styles.

5. **Print background** – `@media print` in `src/index.css` sets `.diagram-container` to `#fff` and `.diagram-svg-wrapper` to `#fafafa` for consistent print/PDF.

6. **No global overrides** – CSS no longer overrides stroke or fill; styling is template- and token-driven.

7. **Templates updated** – All geometry and chart templates use the token palette (structure/vertex `#64748b`, measures `#94a3b8`, angles/median `#dc2626`).

8. **Helper** – `angleArcPath()` in `designTokens.ts` draws the interior angle arc; used by triangle templates that display angles.
