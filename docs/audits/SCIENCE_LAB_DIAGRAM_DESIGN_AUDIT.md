# Science Lab Diagram Design Audit

**Date:** February 2025  
**Purpose:** Full design audit of Science Lab diagrams with actionable improvements for professional, useful visual models.

---

## 1. Executive Summary

| Category | Finding | Priority |
|----------|---------|----------|
| **Design system** | No unified palette; hardcoded hex colors | High |
| **Typography** | Inconsistent font sizes (9–12px); no hierarchy | High |
| **Theme support** | White background only; no dark mode | Medium |
| **Visual clarity** | Several diagrams text-heavy or ambiguous | High |
| **Educational value** | Some diagrams lack key labels/annotations | High |
| **Brand alignment** | Colors don't match Grade9 Sprint palette | Medium |

**Recommendation:** Implement a unified design system, improve 15–20 high-impact diagrams, and add theme-aware rendering.

---

## 2. Current State Analysis

### 2.1 Design System Gaps

**Current STYLE object (scienceLabDiagrams.ts):**
```ts
stroke: '#333', strokeLight: '#666', fill: 'none',
fillLight: 'rgba(100, 150, 255, 0.2)', text: { fontSize: 12, fill: '#333' },
arrow: { stroke: '#0ea5e9', strokeWidth: 2 }
```

**Issues:**
- Generic grays (#333, #666) instead of brand colors
- Blue (#0ea5e9) not aligned with accent (indigo #6366f1)
- No semantic color tokens (success, danger, warning)
- Single text size; no hierarchy for titles vs labels vs captions

### 2.2 Diagram-by-Diagram Audit

| Diagram | Issues | Suggested Improvements |
|---------|--------|------------------------|
| **cell_membrane_diffusion** | Membrane line thin; particles uniform | Add "Membrane" label; vary particle opacity for depth |
| **osmosis_diagram** | H₂O placement cramped | Add water droplet icons; clearer dilute/concentrated contrast |
| **active_transport** | "ATP" label small; gradient unclear | Enlarge ATP; add gradient arrow annotation |
| **cell_division** | Mitosis/meiosis flow readable | Add chromosome count (2n→2n, 2n→n) |
| **enzyme_action** | Good structure | Add "Product" label; active site highlight |
| **digestive_system** | Abbreviations (S.I., L.I.) | Spell out Small/Large intestine |
| **circulatory_system** | Artery/vein colors good | Add capillary exchange detail |
| **pathogen_infection** | Flow clear | Add "Replication" step label |
| **immune_response** | Good | — |
| **photosynthesis** | Text-heavy | Add leaf icon; light rays visual |
| **respiration** | Anaerobic cramped | Separate aerobic/anaerobic visually |
| **homeostasis** | Feedback loop good | Add "↓" for negative feedback |
| **nervous_system** | CNS box small | Enlarge; add "Motor neuron" |
| **hormone_action** | Clear | — |
| **dna_structure** | Helix abstract | Add base pair labels (A-T, G-C) |
| **genetic_inheritance** | Punnett layout | Add parent alleles above/side |
| **natural_selection** | Text-only flow | Add variation icons (different shapes) |
| **ecosystem** | Arrows unclear | Add energy flow direction; trophic labels |
| **carbon_cycle** | Arrows overlap | Separate photosynthesis/respiration paths |
| **stem_cell_differentiation** | Clear | — |
| **monoclonal_antibodies** | Good | — |
| **photosynthesis_light_graph** | Missing axis labels | Add "Rate of photosynthesis", "Light intensity" |
| **thyroxine_feedback** | Good | — |
| **genetic_engineering** | Text-only | Add plasmid/gene icons |
| **quadrat_sampling** | Grid clear | Add "Random placement" note |
| **bohr_model** | Nucleus/electrons clear | Add "n=1, n=2" labels |
| **ionic_covalent_bonding** | Covalent overlap unclear | Separate diagrams; shared pair clearer |
| **free_body_diagram** | F/W labels; missing N | Add normal force; label F as applied |
| **particle_model** | Good | Add "Vibrate" vs "Move freely" |
| **energy_profile** | Ea/ΔH present | Add axis labels (Energy, Progress) |
| **flame_test_colours** | Colours good | Add flame shape; element symbols |
| **wave_types** | Longitudinal unclear | Show compression/rarefaction bands |
| **electromagnetism** | Field lines | Add arrow direction on lines |
| **fission_fusion** | Good | Add neutron for fission |
| **red_shift** | Good | — |
| **le_chatelier** | Text-only | Add equilibrium arrows diagram |
| **half_equations** | Text-only | Add anode/cathode icons |
| **empirical_molecular** | Text-only | Add flowchart boxes |
| **alkene_addition** | Text-only | Add C=C structure |
| **bond_energy** | Graph present | Add axis labels |
| **hookes_law_graph** | Good | Add "Elastic limit" |
| **critical_angle_tir** | Ray unclear | Add normal; angle θc |
| **circuit_diagram** | Good | — |
| **moles_diagram** | Clear | — |
| **electrolysis_diagram** | Good | — |
| **fractionating_column** | Good | — |
| **em_spectrum** | Good | Add wavelength direction |
| **generator_diagram** | Good | — |
| **titration_setup** | Good | — |
| **density_measurement** | Good | — |
| **specific_heat_capacity_setup** | Good | — |

---

## 3. Design System Specification

### 3.1 Color Palette (Grade9 Sprint Aligned)

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `stroke` | #1e293b (slate-800) | #e2e8f0 | Primary lines |
| `strokeLight` | #64748b | #94a3b8 | Secondary/dashed |
| `accent` | #6366f1 (indigo) | #818cf8 | Arrows, highlights |
| `success` | #22c55e | #4ade80 | Positive, products |
| `danger` | #ef4444 | #f87171 | Negative, reactants |
| `warning` | #f59e0b | #fbbf24 | Caution, energy |
| `fillLight` | rgba(99,102,241,0.12) | rgba(129,140,248,0.15) | Soft fills |

### 3.2 Typography Scale

| Level | Size | Weight | Use |
|-------|------|--------|-----|
| Title | 14px | 600 | Diagram titles |
| Label | 12px | 500 | Primary labels |
| Caption | 10px | 400 | Secondary, annotations |
| Tiny | 9px | 400 | Axis labels, footnotes |

### 3.3 Spacing & Sizing

- Minimum diagram size: 280×120 (flashcard back)
- Preferred: 400×200 for concepts
- Padding: 20px from edges for text
- Arrow head size: 8px standard, 6px for dense diagrams

---

## 4. Implementation Priorities

### Phase 1: Design System (Immediate)
1. Create `SCIENCE_DIAGRAM_STYLE` with brand-aligned tokens
2. Add `text-anchor="middle"` for centered labels
3. Support `currentColor` or CSS variables for theme

### Phase 2: High-Impact Diagram Improvements
1. **Graphs:** photosynthesis_light_graph, energy_profile, hookes_law_graph, bond_energy — add axis labels
2. **Process flows:** ecosystem, carbon_cycle — clearer arrows and labels
3. **Wave types:** Fix longitudinal representation
4. **Critical angle TIR:** Add normal, θc label
5. **Text-heavy:** le_chatelier, half_equations, genetic_engineering — add visual structure

### Phase 3: Theme Support
1. CustomDiagramEngine: Accept theme context or use `currentColor`
2. SVG background: `transparent` or `var(--surface)` for dark mode
3. CSS: `.dark .diagram-svg-wrapper svg` overrides

---

## 5. Checklist

- [x] Unified SCIENCE_DIAGRAM_STYLE in scienceLabDiagrams.ts
- [x] Axis labels on all graph-type diagrams
- [x] Clear arrows and labels on process diagrams
- [x] Wave types longitudinal fix
- [x] Critical angle TIR normal + θc
- [x] Digestive system: spell out S.I./L.I.
- [x] Ecosystem: energy flow direction
- [x] Dark mode SVG background
- [x] Text hierarchy (title/label/caption)

---

## 6. Implementation Summary (Feb 2025)

### Changes Made

1. **Design system** (`scienceLabDiagrams.ts`)
   - New `STYLE` object with brand-aligned tokens: `stroke`, `strokeLight`, `accent`, `success`, `danger`, `warning`
   - Typography scale: `text`, `textLabel`, `textCaption`, `textTiny` with `textAnchor: 'middle'`

2. **CustomDiagramEngine**
   - Added `textAnchor` to `ShapeStyle` and `styleToString`
   - SVG background set to `transparent` for theme inheritance

3. **Diagram improvements**
   - **cell_membrane_diffusion**: Accent-colored particles, fillLight
   - **digestive_system**: "Small intestine" / "Large intestine" spelled out
   - **ecosystem**: Energy flow arrows, trophic labels, semantic colors
   - **photosynthesis_light_graph**: Axis labels, accent curve
   - **energy_profile**: "Energy" / "Progress of reaction" axis labels
   - **wave_types**: Longitudinal C/R (compression/rarefaction) labels
   - **critical_angle_tir**: Normal line, θc arc label
   - **hookes_law_graph**: "Elastic limit" label
   - **bond_energy**: Axis labels
   - **particle_model**, **bohr_model**: STYLE.accent for electrons

4. **Dark mode** (`index.css`)
   - `.dark .diagram-svg-wrapper` uses light background (slate-50) so dark strokes remain readable

### Full Implementation (Feb 2025 – All Design Changes)

5. **All 47 diagrams updated** with:
   - STYLE tokens (textLabel, textCaption, textTiny) throughout
   - Brand-aligned colors (accent, success, danger, warning)
   - Audit improvements: osmosis (water circles), active transport (ATP label), cell division (2n/n), enzyme (accent substrate), circulatory (O₂/CO₂), pathogen (Replication), photosynthesis (leaf + light), respiration (aerobic/anaerobic boxes), homeostasis (↓ negative feedback), nervous (CNS box, motor neuron), hormone (success target), DNA (A-T/G-C), genetic inheritance (proper Punnett with parent alleles), natural selection (variation circles), carbon cycle (Plants box, arrows), stem cell/monoclonal (accent), genetic engineering (flowchart boxes), quadrat (random placement), bohr (n=1/n=2), ionic/covalent (separate boxes), free body (N force), particle (Vibrate/Move freely), flame test (flame shapes), electromagnetism (field arrows), fission (neutron n), le_chatelier (equation box), half_equations (anode/cathode boxes), empirical (flowchart), alkene (C=C), em_spectrum (λ arrow)
