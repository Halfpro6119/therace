# Plan: Moving Visual Diagrams (Animated Science Lab)

**Date:** February 2025  
**Goal:** Plan moving/animated visuals for key science concepts, starting with Osmosis as a “visual model” that shows process over time.

---

## 1. Osmosis – Moving Visual Spec

**Concept:** Osmosis is the **net movement of water molecules** from a **dilute solution** to a **concentrated solution** through a **partially permeable membrane**.

### 1.1 Layout (same as current static diagram)

- **Left compartment:** Dilute solution (more water, fewer solute particles) – e.g. light blue fill.
- **Right compartment:** Concentrated solution (less water, more solute) – e.g. light red/pink fill.
- **Centre:** Vertical line = partially permeable membrane (water can pass; solute cannot).
- **Labels:** “Dilute” (left), “Concentrated” (right), “Partially permeable membrane” (below centre).

### 1.2 Animation Design

| Element | Behaviour | Purpose |
|--------|------------|---------|
| **Water molecules (small circles, left side)** | Several small circles (e.g. 6–8) drift slowly **left → right** (toward membrane, then through it). Stagger their start so it looks like a steady flow. | Shows water moving from dilute → concentrated. |
| **Water molecules (right side)** | Fewer circles; optionally 1–2 moving **right → left** (slower/smaller) to imply “both directions, but net flow is dilute → concentrated”. | Emphasises *net* movement, not one-way only. |
| **Net flow indicator** | A single arrow (dilute → concentrated) can pulse or stay static; if animated, a subtle “flow” effect (e.g. dashed line moving) along the arrow. | Reinforces direction of net water movement. |
| **Membrane** | Static or very subtle “pore” hint (e.g. small gaps that water dots pass through). No need to animate the membrane itself. | Keeps focus on water movement. |
| **Loop** | Animation loops seamlessly (e.g. 4–6 s loop). No “reset” jerk—either continuous drift or smooth cycle. | Works on flashcards and in Concept Lab without distraction. |

### 1.3 Optional Enhancements

- **Level change (advanced):** Over many loops, left side level could drop slightly and right side rise (then reset), to show dilution/concentration change over time. Adds complexity; can be Phase 2.
- **Solute particles:** A few larger dots on the right (solute) that **do not** cross the membrane—static or gently jittering in place. Makes “partially permeable” obvious.

### 1.4 Technical Notes for Osmosis

- **Animated SVG:** Water circles can use `<animateMotion>` along a path from left compartment → through centre → right compartment; or CSS `animation` with `transform: translateX()`.
- **React-driven:** Store (x, y) or progress (0–1) per particle; update in `requestAnimationFrame` or Framer Motion; draw circles in SVG or canvas. Easiest to keep in sync with existing `viewBox` and styling.

---

## 2. Other Diagrams That Would Benefit From Moving Visuals

Candidates are chosen from existing Science Lab blueprints and concepts. Rationale: the concept is a **process** or **movement** that static art cannot fully convey.

| Diagram / Concept | Why animation helps | Suggested animation |
|-------------------|---------------------|----------------------|
| **Cell membrane diffusion** | “High → low concentration” is a process. | Particles (solute) drift from high-conc side to low-conc side through membrane; a few moving the other way (slower) to show random motion + net direction. |
| **Active transport** | “Against the gradient” and “ATP” are dynamic. | One particle moving **low → high** (against gradient); optional “ATP” burst or pulse when particle is picked up/released by carrier. |
| **Particle model (solid/liquid/gas)** | Motion differs by state. | **Solid:** particles vibrate in place. **Liquid:** particles drift and slide. **Gas:** particles move quickly in straight lines, bounce off walls. |
| **Wave types** | Transverse/longitudinal are moving disturbances. | **Transverse:** wave shape moves right (or oscillates in place). **Longitudinal:** compression/rarefaction regions shift along the line. |
| **Enzyme action** | Substrate binds and products leave. | Substrate shape moves into active site; brief “complex”; products move away. Optional induced-fit “squeeze”. |
| **Photosynthesis** | Inputs → process → outputs over time. | Light rays (or photons) into leaf; CO₂ + H₂O arrows in; glucose + O₂ appearing or flowing out. Can be a short loop. |
| **Homeostasis / negative feedback** | Signal flow and “return to normal”. | Arrows or tokens moving: Stimulus → Receptor → Coordination → Effector → Response; dashed line “feedback” animates back to start. |
| **Nervous system** | Impulse travels along pathway. | A pulse or dot moving: Stimulus → Receptor → sensory neuron → CNS → motor neuron → Effector. |
| **Pathogen infection** | Entry → replication → damage. | Pathogen enters; duplicates (1 → 2 → 4); then “toxins/damage” or symptom icon appears. |
| **Immune response** | Pathogen → detection → antibodies → destruction. | Pathogen; WBC “detects”; antibodies appear and bind; pathogen “destroyed” (fade or break apart). |
| **Carbon cycle** | Flow of carbon between reservoirs. | Small tokens or arrows moving: atmosphere ↔ plants (photosynthesis/respiration); plants → decomposition. Loop. |
| **Fission/fusion** | Nuclei split or combine. | **Fission:** neutron hits large nucleus; it splits into two smaller + neutrons. **Fusion:** two small nuclei approach and merge into one. |
| **Circuit (current)** | Current is flow. | Dots or a “flow” effect moving around the loop (conventional current direction). |
| **Electrolysis** | Ions move to electrodes; products form. | Cations drifting to cathode, anions to anode; optional bubbles or product forming at electrodes. |
| **Red shift** | Wavelengths “stretch” with motion. | Spectrum lines moving from “lab” position to “stretched” (red) position; or a simple arrow showing stretch. |
| **DNA replication (if added)** | Strands separate; new strands build. | Double helix “unzips”; new strands growing along templates. |

---

## 3. Priority Order for Moving Diagrams

| Priority | Diagram | Rationale |
|----------|---------|-----------|
| **P1** | Osmosis | Explicitly requested; core biology; “net movement” is inherently dynamic. |
| **P2** | Cell membrane diffusion | Same family as osmosis; “net movement” high → low. |
| **P3** | Particle model (solid/liquid/gas) | Fundamental; motion *is* the concept. |
| **P4** | Active transport | Contrast with diffusion; “against gradient” is dynamic. |
| **P5** | Wave types | Transverse/longitudinal are hard to “get” from a single static frame. |
| **P6** | Enzyme action | Lock-and-key / induced fit is a sequence. |
| **P7** | Homeostasis / nervous system | Signal flow benefits from a moving path. |
| **P8** | Others (photosynthesis, immune, carbon cycle, fission/fusion, circuit, electrolysis, red shift) | As time permits; all process-based. |

---

## 4. Implementation Options

### 4.1 Animated SVG (SMIL / CSS)

- **Pros:** No JS required for play; works in `<img>` if same-origin; small file size; can export from design tools.
- **Cons:** SMIL has patchy support in some older browsers; complex animations get messy; harder to drive from React (e.g. play/pause, speed).
- **Best for:** Osmosis, diffusion, wave types—self-contained, looped, no interaction.

### 4.2 React + SVG (state + requestAnimationFrame or Framer Motion)

- **Pros:** Full control; same styling as `CustomDiagramBlueprint`; can pause, speed up, or trigger from flashcard flip; one codebase for static + animated.
- **Cons:** More code; need an “animated” variant of the diagram component (e.g. `AnimatedFlashcardDiagram` or `FlashcardDiagram` with `animated={true}`).
- **Best for:** Diagrams that might be paused on “answer” or used in Concept Lab with controls.

### 4.3 Lottie (JSON animations)

- **Pros:** Rich animations from After Effects; small JSON; good player support.
- **Cons:** Design in AE (or similar) required; less flexible for “data-driven” tweaks (e.g. number of particles).
- **Best for:** Polished, narrative-style animations (e.g. pathogen infection story).

### 4.4 Recommendation

- **Short term:** Implement **Osmosis** (and optionally **diffusion**) as **animated SVG** (CSS or SMIL) so they work with current `FlashcardDiagram` + static asset path (e.g. `osmosis_diagram.svg` → replace with animated version, or add `osmosis_diagram_animated.svg` and switch when “moving” is desired).
- **Medium term:** Add an **animated diagram** pipeline: either (a) React component that renders the same layout as `scienceLabDiagrams` but with motion (e.g. `AnimatedOsmosis`, `AnimatedDiffusion`), or (b) a convention that certain slugs load an animated SVG when available (e.g. `slug.animated.svg` or `slug.svg` with `<animate>` inside).
- **UX:** Prefer **autoplay, loop, no sound**; optional “pause” button for accessibility. Respect `prefers-reduced-motion` (show static diagram when user requests reduced motion).

---

## 5. Accessibility and UX

- **Reduced motion:** If `prefers-reduced-motion: reduce`, show the static diagram (current blueprint or static SVG) instead of the animated one.
- **Flashcards:** Animation should loop quietly; no need to pause on flip unless design decision is to “freeze” on answer.
- **Concept Lab / standalone:** Same animation can be reused; optional caption: “Net movement of water: dilute → concentrated”.

---

## 6. Summary

| Item | Action |
|------|--------|
| **Osmosis** | Define moving diagram: water molecules drifting dilute → concentrated through membrane; optional solute fixed on right; net-flow arrow; loop 4–6 s. |
| **Other moving diagrams** | Prioritise diffusion, particle model, active transport, wave types, enzyme, homeostasis/nervous, then others. |
| **Implementation** | Start with animated SVG for Osmosis (and diffusion) to drop into existing asset flow; consider React-driven animation for control and consistency with blueprints. |
| **A11y** | Honour `prefers-reduced-motion` with static fallback. |

This plan extends the existing [FLASHCARD_DIAGRAMS_PLAN.md](./FLASHCARD_DIAGRAMS_PLAN.md) by taking “Animated diagrams” out of “Out of Scope” and turning them into a concrete design and implementation plan.

---

## 7. Implementation Status – Full Integration (Done)

- **Animated components** (React + Framer Motion): `AnimatedOsmosis`, `AnimatedDiffusion`, `AnimatedParticleModel`, `AnimatedActiveTransport` in `src/components/AnimatedDiagrams/`.
- **Config:** `src/config/animatedDiagramSlugs.ts` – `hasAnimatedDiagram(slug)` and `getAnimatedDiagramComponent(slug)`. `src/config/scienceLabDiagramMap.ts` – `getDiagramMetadataForSlug(slug)` for static blueprint rendering.
- **Hook:** `src/hooks/useReducedMotion.ts` – `prefers-reduced-motion: reduce` disables animated diagrams.
- **FlashcardDiagram (full integration):**
  - **Motion allowed + slug has animated version** → render animated React component.
  - **Reduced motion + slug has animated version** → render static diagram from Science Lab blueprint via `DiagramRenderer` + `getDiagramMetadataForSlug(slug)` (no static SVG asset required).
  - **All other slugs** → static SVG from `getFlashcardDiagramPath(slug)` (or description if asset missing).
- **DiagramRenderer:** Custom mode (`metadata.mode === 'custom'`) skips loading state and renders blueprint synchronously so the reduced-motion static fallback appears immediately.
- **Where it appears:** Science Lab Flashcards (front and back) and Concept Lab (visual model + scenario diagrams) use `FlashcardDiagram` with `slug` / `fitToContainer` / `description`; no extra wiring needed.
