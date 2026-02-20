# Chemistry Diagram Audit – Full Audit & Creative Solutions

**Date:** February 2025  
**Scope:** All chemistry-related Science Lab diagrams in `scienceLabDiagrams.ts`  
**Goal:** Identify messy or unclear diagrams and propose clean, well-designed fixes.

---

## 1. Executive Summary

| Finding | Impact |
|--------|--------|
| **Bohr model**: Label overlap, unbalanced electrons, inconsistent shell weight | High – flagship atomic structure card |
| **Ionic/covalent**: Shared pair and ion labels cramped; no atom symbols in covalent | Medium |
| **Flame test**: Flame shapes uniform; no colour labels (Li=red, etc.) | Medium |
| **Le Chatelier, half equations, empirical, alkene**: Text-heavy; minimal visual structure | Medium |
| **Bond energy / energy profile**: Axis labels present but graph could be clearer | Low |
| **Moles, electrolysis, fractionating column**: Functional but could be more scannable | Low |

**Recommendation:** Fix Bohr model first (high visibility), then apply design principles to other chemistry diagrams.

---

## 2. Diagram-by-Diagram Audit

### 2.1 Bohr model (`bohr_model`) — **PRIORITY FIX**

**Current issues (from user screenshot and code):**
- **Label placement:** `n=1` is at (130, 48), directly above centre and very close to the top electron and the n=1 orbit → visual clutter and overlap.
- **n=2 label:** At (130, 92), sitting between the two shells so it’s unclear which shell it refers to.
- **Electron distribution:** One electron on n=1 at 12 o’clock only; three on n=2 at 3, 9, 6 o’clock. Inner shell looks unbalanced; outer could use 120° spacing for clarity.
- **Line weight:** Both orbits use `strokeWidth: 2`, but the larger radius of n=2 makes it appear thicker; reads as inconsistent.
- **Nucleus:** r=20 can feel large relative to the orbits; slightly smaller reads more “textbook”.

**Creative solutions:**
1. **Labels outside orbits, no overlap**  
   Place `n=1` and `n=2` on the **left** of the diagram, just outside the corresponding orbit (e.g. short horizontal line or gap from orbit to label). Use the same small font; ensure no label crosses an electron or the nucleus.
2. **Consistent orbit weight**  
   Use the same `strokeWidth` for both orbits (e.g. 1.5 or 2). If you want emphasis on n=2, use a subtle difference (e.g. 1.5 vs 2) and a short caption “shell 2” so it’s clearly intentional.
3. **Balanced electrons**  
   Keep 1 electron on n=1 (e.g. top). Place 3 electrons on n=2 at **120° apart** (e.g. 30°, 150°, 270°) so the outer shell looks symmetrical and doesn’t crowd the inner.
4. **Slightly smaller nucleus**  
   Reduce nucleus radius from 20 to 16–18 so the shells and electrons read as the focus.
5. **Optional: small arc + label**  
   For maximum clarity, add a small arc on one side of each shell and place the label at the end of the arc (like angle labels in geometry diagrams).

**Implementation:** See Section 4; applied in `scienceLabDiagrams.ts` for `bohr_model`.

---

### 2.2 Ionic / covalent bonding (`ionic_covalent_bonding`)

**Issues:**
- Ionic side: Na⁺, arrow, Cl⁻ is clear but the box is tight; “Ionic: electron transfer” runs close to the ions.
- Covalent: two circles with a single line for the shared pair; no atom symbols (e.g. H, Cl or C, O); “Covalent: shared pair” is generic.

**Creative solutions:**
1. **Ionic:** Slightly larger box or more padding; add a tiny “e⁻” near the arrow to show transfer.
2. **Covalent:** Add atom symbols inside or next to each circle (e.g. “H” and “H” for H₂, or “C” and “O” for CO). Use a double line or bold segment for the shared pair.
3. **Layout:** Add a thin vertical divider between the two panels and a small heading above each (“Ionic” / “Covalent”) so the two concepts are clearly separated.

---

### 2.3 Flame test colours (`flame_test_colours`)

**Issues:**
- All flame shapes are the same triangle; real flame tests have different colours but similar shape, so the diagram could still vary size or add a slight inner “core” for depth.
- No explicit colour names (e.g. “Li crimson”, “Na yellow”), so learners must infer from fill.

**Creative solutions:**
1. Add a small text label under each flame with colour name (e.g. “Crimson”, “Yellow”, “Lilac”, “Brick”, “Green/blue”).
2. Use a subtle inner fill or gradient (lighter at bottom, darker at tip) so flames don’t look flat.
3. Keep element symbols (Li, Na, K, Ca, Cu) above the flames; ensure font size is consistent and readable.

---

### 2.4 Le Chatelier (`le_chatelier`)

**Issues:**
- One equation box “A + B ⇌ C + D” and text “Disturbance → shift opposes” / “Equilibrium” – very text-heavy with little visual structure.

**Creative solutions:**
1. Add a simple **equilibrium arrow diagram**: two horizontal arrows (⇌) with a small “stress” arrow pointing in one direction and a “shift” arrow in the opposite direction.
2. Use two small boxes: “Before disturbance” and “After shift” with a right arrow between them.
3. Add a minimal graph: “Concentration” vs “Time” with a step (disturbance) and a curve showing shift back toward equilibrium.

---

### 2.5 Half equations (`half_equations`)

**Issues:**
- Anode and cathode boxes with equations are clear but visually flat; “Oxidation” / “Reduction” sit below with no strong link to the electrodes.

**Creative solutions:**
1. Add a simple **cell diagram** between the two: a vertical line (salt bridge) or “|” and a short “e⁻ flow” arrow from anode to cathode.
2. Use a single container (e.g. rounded rect) with “Anode” on the left and “Cathode” on the right, and a central “Electrolyte” or “e⁻” arrow.
3. Give anode and cathode distinct background tints (e.g. warm for oxidation, cool for reduction) and a small icon (e.g. “+” and “−”) in the corner of each box.

---

### 2.6 Empirical / molecular formula (`empirical_molecular`)

**Issues:**
- Flow is “Mass % → moles → ratio” then “Empirical formula” then “Mr ÷ empirical mass = n → molecular” – all text in boxes; no diagram metaphor.

**Creative solutions:**
1. **Flowchart:** Three connected boxes with arrows: “Mass %” → “Moles (÷Ar)” → “Ratio” → “Empirical”; then one arrow down to “× n (from Mr)” → “Molecular”.
2. Add a simple **example strip**: e.g. “e.g. CH₂O → C₂H₄O₂” in a muted colour so the flow is concrete.
3. Use a small “balance” or “formula” icon in the first box to signal “from mass data”.

---

### 2.7 Alkene addition (`alkene_addition`)

**Issues:**
- C=C with arrow to “Ethene + Br₂ → …” etc. The double bond is shown but the rest is text.

**Creative solutions:**
1. Draw a **simple product structure** (e.g. Br–C–C–Br with C single bonds) after the arrow so addition is visually clear.
2. Use a second row: “Ethene” [C=C] “+ Br₂” → [Br–C–C–Br] with labels “Addition”.
3. Add a small “π bond breaks” callout near the double bond so the mechanism is hinted at.

---

### 2.8 Bond energy / energy profile (`bond_energy`, `energy_profile`)

**Issues:**
- Axes and curves are present; “ΔH”, “Ea” are labelled. Bond energy graph is minimal; energy profile is clearer but could use a light fill under the curve (reactants → products).

**Creative solutions:**
1. **Bond energy:** Add “Bonds broken” (positive) and “Bonds formed” (negative) with a small +/- or colour hint (e.g. red for endothermic, blue for exothermic).
2. **Energy profile:** Light fill under the curve (e.g. semi-transparent accent) and a short “Activation energy” double-arrow from reactants to peak.
3. Ensure “Energy” and “Reaction progress” (or “Progress of reaction”) are always present and legible.

---

### 2.9 Moles diagram (`moles_diagram`)

**Issues:**
- “Mass (g) → ÷ Mr → Moles → × Mr → Mass (g)” is clear but dense; “÷ Mr” and “× Mr” float above the arrow and could be confused with labels for the boxes.

**Creative solutions:**
1. Put “÷ Mr” and “× Mr” inside the arrows (e.g. in a small rounded badge on the arrow) or directly under the arrow with a smaller font.
2. Use three **nodes**: [Mass] → [Moles] → [Mass] with operation labels under each arrow.
3. Add a single example: “e.g. 18 g H₂O ÷ 18 = 1 mol” in caption style.

---

### 2.10 Electrolysis diagram (`electrolysis_diagram`)

**Issues:**
- Cathode (−) and Anode (+) are clear; cations/anions arrows are present. Electrode boxes could be slightly larger; “Battery” is small.

**Creative solutions:**
1. Add a **+ and −** on the battery terminals and match with “Cathode (−)” and “Anode (+)” so polarity is unmistakable.
2. Draw a minimal **solution level** (horizontal line) inside the cell so it reads as “in solution”.
3. Use a single caption: “Cations move to cathode; anions to anode” to reinforce the diagram.

---

### 2.11 Fractionating column (`fractionating_column`)

**Issues:**
- Column with Gases, Petrol, Kerosene, Diesel, Crude oil is clear but plain; no temperature gradient or “cooler at top” hint.

**Creative solutions:**
1. Add a **temperature axis** (e.g. “Cool” at top, “Hot” at bottom) on one side of the column.
2. Use a light **gradient fill** (cool colour at top, warm at bottom) inside the column.
3. Add short **horizontal “outlet” lines** for each fraction so it looks like a real column with draw-off points.

---

## 3. Cross-Cutting Design Principles

Apply these to **all** chemistry diagrams to avoid “messy” visuals:

| Principle | Application |
|-----------|-------------|
| **Label clearance** | No text overlapping curves, dots, or other labels. Use external placement or leader lines. |
| **Consistent line weight** | Same strokeWidth for the same type of element (e.g. all orbits, all bonds) unless hierarchy is intentional. |
| **Balanced layout** | Symmetry where appropriate (e.g. electrons on a shell at 120°); avoid “all on one side”. |
| **Hierarchy** | Title/label > caption > footnote; use font size and weight from STYLE (textLabel, textCaption, textTiny). |
| **Colour semantics** | Use STYLE.chem (and success/danger/warning) consistently; don’t introduce one-off hex values. |
| **White space** | Padding between diagram edge and labels; avoid cramming text in the well. |
| **One idea per diagram** | If a card needs two concepts (e.g. ionic and covalent), separate panels or two diagrams. |

---

## 4. Bohr Model Implementation (Done)

The following changes were applied in `scienceLabDiagrams.ts` for `bohr_model`:

1. **Orbits:** Both shells use `strokeWidth: 1.5` for consistent visual weight.
2. **Nucleus:** Radius reduced from 20 to 17 so it doesn’t dominate.
3. **Labels:**  
   - `n=1` moved to the **left**, just outside the inner orbit: (130 − 48 − 14, 130) = (68, 130).  
   - `n=2` moved to the **left**, just outside the outer orbit: (130 − 75 − 14, 130) = (41, 130).  
   Text-anchor middle so they sit cleanly to the left of centre; no overlap with electrons or orbits.
4. **Electrons:**  
   - n=1: one electron kept at top (130, 52).  
   - n=2: three electrons at 120° spacing: 30°, 150°, 270° (right, upper-left, bottom) so the outer shell is balanced and clearly distinct from n=1.
5. **“Nucleus” caption:** Kept at bottom centre; unchanged.

Result: Clean, textbook-style Bohr diagram with no label/electron overlap, consistent strokes, and clear shell hierarchy.

---

## 5. Checklist for Future Chemistry Diagrams

- [ ] **Bohr model** – Applied (labels, weights, electrons, nucleus size).
- [ ] **Ionic/covalent** – Add atom symbols, e⁻ hint, panel divider.
- [ ] **Flame test** – Add colour names, optional inner flame detail.
- [ ] **Le Chatelier** – Add equilibrium arrow or before/after sketch.
- [ ] **Half equations** – Add cell sketch or e⁻ flow between anode/cathode.
- [ ] **Empirical/molecular** – Flowchart with example.
- [ ] **Alkene** – Add product structure or π-break callout.
- [ ] **Bond energy / energy profile** – Optional fill, clearer Ea/ΔH.
- [ ] **Moles** – Clearer operation labels on arrows.
- [ ] **Electrolysis** – Battery ±, solution level, one-line caption.
- [ ] **Fractionating column** – Temperature hint, gradient or outlets.

---

## 6. References

- `src/config/scienceLabDiagrams.ts` – All diagram blueprints.
- `src/diagrams/engine/customDiagramEngine.ts` – Supported shapes: circle, line, arc, text, arrow, path, rect, polygon, etc.
- `docs/audits/SCIENCE_LAB_DIAGRAM_DESIGN_AUDIT.md` – Design system and typography.
- `docs/specs/SCIENCE_LAB_FLASHCARD_DIAGRAM_DESIGN.md` – Flashcard well and hierarchy.
