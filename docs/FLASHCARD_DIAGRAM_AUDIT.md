# Flashcard Diagram Audit & Improvement Plan

**Date:** February 2025  
**Goal:** Fix weak, unprofessional diagrams and make them help students remember more effectively.

---

## 1. Audit Findings

### 1.1 Current Architecture

| Source | When Used | Count | Quality |
|--------|-----------|-------|---------|
| **Animated** (React + Framer Motion) | 4 slugs, when motion allowed | 4 | Good – shows process |
| **Static SVG** (public/assets) | All other slugs with path | 47+ | Variable – often minimal |
| **Blueprint** (CustomDiagramEngine) | Only reduced-motion fallback for animated slugs | 4 | Good – never used for most |
| **Description only** | When no diagram exists | Fallback | No visual aid |

**Critical finding:** Blueprints in `scienceLabDiagrams.ts` are **never used** for 47+ diagrams. `FlashcardDiagram` prefers static `<img src>` when the path exists, so all non-animated diagrams use hand-crafted SVGs that vary in quality.

### 1.2 Problems

1. **Minimal visual content** – Diagrams like `photosynthesis.svg` are ~14 lines: a triangle, arrow, ellipse. No clear input/output labels, no hierarchy.
2. **Static = less memorable** – Research shows animated diagrams improve recall for processes (diffusion, osmosis, enzyme action). Only 4 concepts get animation.
3. **Inconsistent design** – Mix of blueprints, static SVGs, and animated components. No unified visual language.
4. **Cramped presentation** – 200px max height on flashcard; diagrams feel squeezed.
5. **Weak memory aids** – No mnemonics, no dual-coding emphasis, no chunking cues. Key terms not highlighted.
6. **Duplication** – Blueprints and static SVGs often duplicate each other (e.g. enzyme_action); changes must be made twice.

### 1.3 Learning Science – Why Current Diagrams Fail

| Principle | Current State | Desired |
|-----------|---------------|---------|
| **Dual coding** | Text description separate from diagram; diagram rarely reinforces key terms | Integrate labels with diagram; caption reinforces retrieval |
| **Process visualization** | Static circles/arrows; no sense of movement or change | Animate where process matters (diffusion, enzyme, etc.) |
| **Chunking** | Flat layout; no grouping | Clear regions: inputs → process → outputs |
| **Elaboration** | Minimal connections to prior knowledge | Explicit labels (e.g. "against gradient", "ATP required") |
| **Concrete examples** | Abstract shapes only | Where possible, recognizable forms (leaf, heart, DNA helix) |

---

## 2. Implementation Plan

### Phase 1: Blueprint-First Rendering (Immediate)

**Goal:** Use programmatic blueprints as the primary source for all diagrams that have them.

1. **Update `FlashcardDiagram`** – When `diagramMetadata` exists (blueprint for slug), render `DiagramRenderer` instead of static img. Fall back to img only when no blueprint.
2. **Rationale:** Blueprints are maintained in code, styled consistently, and can be improved in one place. Static assets become fallback for slugs without blueprints.

**Files:** `src/components/FlashcardDiagram.tsx`

### Phase 2: Presentation Improvements (Immediate)

**Goal:** Make diagrams more prominent and readable on flashcards.

1. **Increase diagram area** – Raise max height from 200px to 260px; add min-height for consistency.
2. **Improve container** – Ensure diagram has adequate padding, rounded corners, subtle border so it reads as a distinct "learning object."
3. **Caption as memory cue** – When description is shown, style it as a retrieval prompt (e.g. bold key terms).

**Files:** `src/components/FlashcardDiagram.tsx`, `src/index.css`, `src/pages/science/ScienceLabFlashcardPage.tsx`

### Phase 3: Blueprint Design Enhancements (High Priority)

**Goal:** Add memory-aiding elements to high-impact diagrams.

1. **Photosynthesis** – Add explicit INPUTS / OUTPUTS labels; color-code (green = products, yellow = light); equation text.
2. **Respiration** – Same input/output structure; aerobic vs anaerobic clear visual separation.
3. **Enzyme action** – Numbered steps (1. Substrate binds 2. Reaction 3. Products released); "Enzyme unchanged" callout.
4. **DNA structure** – Add "Sugar-phosphate backbone" label; base pair rules (A–T, G–C) more prominent.
5. **Diffusion / Osmosis** – Ensure gradient arrow and "net movement" are visually dominant.

**Files:** `src/config/scienceLabDiagrams.ts`

### Phase 4: Expand Animated Diagrams (Medium Effort)

**Goal:** Add animation to 3–5 more high-value process concepts.

**Candidates:**
- `enzyme_action` – Substrate binding, products releasing
- `photosynthesis` – Light → chlorophyll → products flow
- `respiration` – Glucose → ATP (aerobic path)
- `dna_structure` – Optional subtle helix effect (low priority)

**Files:** New components in `src/components/AnimatedDiagrams/`, `animatedDiagramSlugs.ts`, `AnimatedDiagrams/index.tsx`

### Phase 5: Back-of-Card Diagrams (Optional)

**Goal:** Show reinforcing diagram on answer side for process/chain cards when helpful.

- Extend `ScienceFlashcard.back` with `visual?: { diagramId, description }`
- Render on back when present
- Use for: process chains, practical method steps

---

## 3. Summary

| Phase | Scope | Effort | Impact |
|-------|-------|--------|--------|
| 1 | Blueprint-first rendering | ~30 min | High – unifies source, enables improvement |
| 2 | Presentation (size, styling) | ~20 min | Medium – better readability |
| 3 | Blueprint design enhancements | 1–2 hrs | High – direct recall improvement |
| 4 | Expand animations | 2–4 hrs | High – process concepts benefit most |
| 5 | Back-of-card diagrams | ~1 hr | Medium |

**Recommended order:** Phase 1 → 2 → 3 (implement now). Phase 4–5 as follow-up.
