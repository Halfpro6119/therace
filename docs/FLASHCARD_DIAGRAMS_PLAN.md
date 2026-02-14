# Plan: Add Diagrams to Science Lab Flashcards

**Date:** February 2025  
**Goal:** Add all necessary diagrams to flashcard cards so learners see visual aids instead of (or in addition to) text descriptions.

---

## 1. Current State

### 1.1 Flashcard Display

- **ScienceLabFlashcardPage** renders `currentCard.front.visual?.description` as **text only** – no actual diagram image is shown.
- The `diagramId` field exists in the flashcard type and is passed through from concepts, but it is **never used** for rendering.
- **DiagramRenderer** exists and supports:
  - `mode: 'asset'` + `diagramId` (UUID) → fetches from Supabase `diagrams` table
  - `mode: 'template'` + `templateId` → fetches from `diagram_templates`
  - `mode: 'auto'` → programmatic rendering

### 1.2 ID Mismatch

- **Science Lab** uses human-readable slugs: `cell_membrane_diffusion`, `osmosis_diagram`, `photosynthesis`, etc.
- **Supabase diagrams** use UUIDs for `id`.
- There is **no mapping** from slug → UUID. Diagrams in the admin may use different identifiers.

### 1.3 Card Types & Diagram Coverage

| Card Type       | Count (approx) | Has diagramId | Has description only | No visual |
|-----------------|----------------|---------------|----------------------|-----------|
| Concept         | ~50            | ~35           | ~15                  | 0         |
| Process chain   | ~40            | 0             | 0                    | ~40       |
| Misconception   | ~30            | 0             | 0                    | ~30       |
| Practical       | ~60            | 0             | 0                    | ~60       |
| Equation        | ~80            | 0             | N/A (equation text)  | 0         |

---

## 2. Implementation Plan

### Phase 1: Wire Up Diagram Rendering (Foundation)

**Goal:** Make flashcards actually render diagrams when `diagramId` exists.

1. **Add diagram slug → UUID mapping**
   - Create `src/config/scienceLabDiagramMap.ts` mapping slugs to Supabase diagram UUIDs.
   - Populate as diagrams are created in admin.
   - Alternative: Add a `slug` or `external_id` column to `diagrams` table and query by that.

2. **Update ScienceLabFlashcardPage**
   - When `currentCard.front.visual?.type === 'diagram'` (or `graph`) and `diagramId` exists:
     - Resolve slug → UUID via map (or fetch by slug if DB supports it).
     - Render `<DiagramRenderer metadata={{ mode: 'asset', diagramId: resolvedUuid }} />` instead of/in addition to description text.
   - Fallback: If diagram fails to load, show `description` as text (current behaviour).

3. **Handle loading/error states**
   - Show a placeholder or skeleton while diagram loads.
   - On error, show description only.

**Files to modify:**
- `src/pages/science/ScienceLabFlashcardPage.tsx`
- New: `src/config/scienceLabDiagramMap.ts` (or extend diagram metadata)

---

### Phase 2: Create Missing Diagrams for Concepts

**Goal:** Ensure every concept card that references a diagramId has a corresponding diagram in the system.

**Biology concepts with diagramId (need diagrams created):**

| Slug                     | Topic          | Description |
|--------------------------|----------------|-------------|
| cell_membrane_diffusion  | Cell Biology   | Particle diagram: high → low concentration |
| osmosis_diagram          | Cell Biology   | Water through membrane |
| active_transport         | Cell Biology   | Carrier proteins, ATP |
| cell_division            | Cell Biology   | Mitosis vs meiosis |
| enzyme_action            | Organisation   | Lock-and-key / induced fit |
| digestive_system         | Organisation   | Digestive tract |
| circulatory_system       | Organisation   | Heart, blood vessels |
| pathogen_infection      | Infection      | Pathogen entry, replication |
| immune_response          | Infection      | Antibodies, lymphocytes |
| photosynthesis           | Bioenergetics  | Light + CO₂ → glucose |
| respiration              | Bioenergetics  | Glucose → ATP |
| homeostasis              | Homeostasis    | Negative feedback loop |
| nervous_system           | Homeostasis    | Stimulus → receptor → CNS → effector |
| hormone_action           | Homeostasis    | Gland → hormone → target |
| dna_structure            | Inheritance    | Double helix, bases |
| genetic_inheritance      | Inheritance    | Punnett square |
| natural_selection        | Evolution      | Variation, selection |
| ecosystem                | Ecology        | Food web, trophic levels |
| carbon_cycle             | Ecology        | Carbon flow |
| stem_cell_differentiation| Cell Biology   | Stem cell → specialised |
| monoclonal_antibodies    | Infection      | Hybridoma, antibodies |
| photosynthesis_light_graph | Bioenergetics | Light intensity vs rate |
| thyroxine_feedback       | Homeostasis    | Thyroid feedback |
| genetic_engineering      | Inheritance    | Recombinant DNA |
| quadrat_sampling         | Ecology        | Quadrat method |

**Concepts with description but no diagramId (candidates for new diagrams):**

- Bohr model (Chemistry)
- Ionic/covalent bonding (Chemistry)
- Free body diagram (Physics)
- Particle model (Chemistry)
- Energy profile (Chemistry)
- Flame test colours (Chemistry)
- Wave types (Physics)
- Electromagnetism (Physics)
- Fission/fusion (Physics)
- Red shift (Physics)
- … and others (see `scienceLabData.ts`)

**Action:** Use Admin → Diagrams to create each diagram. Store UUID in `scienceLabDiagramMap.ts` keyed by slug.

---

### Phase 3: Add Diagrams to Process Chain Cards

**Goal:** Add visuals to scenario cards where a diagram would help.

- **Source:** `concept.changeScenarios` – each has `prompt` and `explanation`.
- **Approach:** Add optional `diagramId` or `visual` to change scenarios in `scienceLabData.ts`.
- **Examples:**
  - "What happens to diffusion rate if temperature increases?" → particle speed diagram
  - "What happens to a plant cell in pure water?" → turgid vs plasmolysed diagram
  - "What happens if respiration is inhibited?" → ATP / active transport diagram

**Action:** Identify high-value scenarios, create diagrams, add `visual: { diagramId, description }` to scenario objects, update `generateConceptFlashcards` to pass through.

---

### Phase 4: Add Diagrams to Practical Cards

**Goal:** Add equipment setup, method steps, or graph examples to practical flashcards.

- **Purpose card:** Optional diagram of equipment or setup.
- **Variables card:** Diagram showing IV, DV, controlled.
- **Risk card:** Diagram of hazard + control (e.g. Bunsen safety).
- **Graph card:** Example graph (e.g. rate vs temperature).

**Action:** Add `visual` to practical objects in `scienceLabData.ts`, create diagrams in admin, update `generatePracticalFlashcards`.

---

### Phase 5: Add Diagrams to Misconception Cards

**Goal:** Use "wrong vs right" comparison diagrams where helpful.

- **Example:** "Particles want to spread out" → diagram showing random motion (no intent).
- **Example:** "Active transport is faster diffusion" → diagram showing gradient direction + ATP.

**Action:** Add optional `diagramId` to misconception objects, create comparison diagrams, update `generateMisconceptionFlashcards`.

---

### Phase 6: Back-of-Card Diagrams (Optional)

**Goal:** Show diagrams on the answer side when they reinforce the explanation.

- Extend `ScienceFlashcard.back` with optional `visual?: { diagramId, description }`.
- Render on back when present.
- Use for: process chains, practical method steps, misconception corrections.

---

## 3. Diagram Creation Strategy

### 3.1 Diagram Types

- **SVG/canvas** – Use Diagram Editor (Admin → Diagrams) for interactive creation.
- **Static PNG** – Upload if SVG is not practical.
- **Template-based** – Use `diagram_templates` for parameterised diagrams (e.g. different values).

### 3.2 Naming Convention

- Slug: `{topic_snake_case}_{concept}` (e.g. `cell_biology_diffusion`).
- Title: Human-readable (e.g. "Cell membrane diffusion").
- Tags: Subject, topic, card type for discoverability.

### 3.3 Priority Order

1. **High impact:** Concept cards with existing diagramId but no diagram in DB (Phase 2).
2. **Quick wins:** Concepts with description-only – convert to simple diagrams (Phase 2).
3. **Process chains:** Top 10–15 most-used scenarios (Phase 3).
4. **Practicals:** Required practicals with clear visual need (Phase 4).
5. **Misconceptions:** Where diagram clearly shows wrong vs right (Phase 5).

---

## 4. Technical Checklist

- [ ] Create `scienceLabDiagramMap.ts` (slug → UUID).
- [ ] Update `ScienceLabFlashcardPage` to render `DiagramRenderer` when `diagramId` present.
- [ ] Add loading/error fallback for diagram render.
- [ ] Extend `ScienceConcept.visualModel` / `changeScenarios` if needed.
- [ ] Extend `SciencePractical` with optional `visual`.
- [ ] Extend `ScienceMisconception` with optional `diagramId`.
- [ ] Extend `ScienceFlashcard.back` with optional `visual` (if Phase 6).
- [ ] Create diagrams in Admin for all Phase 2 concept slugs.
- [ ] Populate diagram map with UUIDs after creation.
- [ ] Test: Biology, Chemistry, Physics flashcard modes with diagrams.

---

## 5. Out of Scope (For Later)

- Diagram generation via AI.
- User-uploaded diagrams.
- Animated diagrams (beyond static SVG/PNG).
- Diagrams for Equation cards (equation text is sufficient for now).

---

## 6. Summary

| Phase | Scope                          | Effort  | Impact |
|-------|--------------------------------|---------|--------|
| 1     | Wire up rendering + map       | 1–2 days| High   |
| 2     | Create concept diagrams       | 3–5 days| High   |
| 3     | Process chain diagrams        | 1–2 days| Medium |
| 4     | Practical diagrams            | 2–3 days| Medium |
| 5     | Misconception diagrams        | 1–2 days| Medium |
| 6     | Back-of-card diagrams         | 1 day   | Low    |

**Recommended order:** Phase 1 → Phase 2 (Biology first) → Phase 3 → Phase 4 → Phase 5 → Phase 6 if desired.
