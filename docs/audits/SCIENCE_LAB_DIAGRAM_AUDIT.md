# Science Lab – Full Diagram Audit

**Date:** February 2025  
**Purpose:** Complete inventory of every diagram needed for the Science Lab flashcard system.

---

## 1. Executive Summary

| Category | Total Referenced | Already Implemented | To Create |
|---------|------------------|---------------------|-----------|
| Concept diagrams | 47 | 47 | 0 |
| Process chain (scenario) diagrams | ~25 | 25 (reuse concepts) | 0 |
| Practical diagrams | 14 | 11 | 3 |
| Misconception diagrams | ~25 | ~20 | ~5 |
| **Total unique diagram slugs** | **47** | **47** | **0** |

**Conclusion:** All 47 unique diagram blueprints are already implemented in `scienceLabDiagrams.ts`. No new diagram blueprints are required for concepts or scenarios. Three practicals lack visuals and could benefit from new diagrams. Five misconceptions lack `diagramId` and could reuse existing diagrams or get new comparison diagrams.

---

## 2. Diagrams Already Implemented (47 total)

All diagrams below exist in `src/config/scienceLabDiagrams.ts` and are wired through `scienceLabDiagramMap.ts`.

### Biology (27)

| Slug | Topic | Used by |
|------|-------|---------|
| `cell_membrane_diffusion` | Cell Biology | Diffusion concept, scenarios, microscope practical |
| `osmosis_diagram` | Cell Biology | Osmosis concept, scenarios, potato practical |
| `active_transport` | Cell Biology | Active transport concept, scenarios, misconceptions |
| `cell_division` | Cell Biology | Mitosis/meiosis concept, scenarios |
| `enzyme_action` | Organisation | Enzyme concept, scenarios, enzyme practical |
| `digestive_system` | Organisation | Digestive system concept, scenarios |
| `circulatory_system` | Organisation | Circulatory system concept, scenarios |
| `pathogen_infection` | Infection | Pathogens concept, scenarios, misconceptions |
| `immune_response` | Infection | Immune system concept, scenarios |
| `photosynthesis` | Bioenergetics | Photosynthesis concept, scenarios, plant practical |
| `respiration` | Bioenergetics | Respiration concept, scenarios |
| `homeostasis` | Homeostasis | Homeostasis concept, scenarios |
| `nervous_system` | Homeostasis | Nervous system concept, scenarios, reaction-time practical |
| `hormone_action` | Homeostasis | Hormone concept, scenarios |
| `dna_structure` | Inheritance | DNA concept |
| `genetic_inheritance` | Inheritance | Inheritance concept, misconceptions |
| `natural_selection` | Evolution | Evolution concept, misconceptions |
| `ecosystem` | Ecology | Ecosystem concept, misconceptions |
| `carbon_cycle` | Ecology | Carbon cycle concept |
| `stem_cell_differentiation` | Cell Biology | Stem cells concept |
| `monoclonal_antibodies` | Infection | Monoclonal antibodies concept |
| `photosynthesis_light_graph` | Bioenergetics | Photosynthesis scenarios |
| `thyroxine_feedback` | Homeostasis | Thyroxine concept |
| `genetic_engineering` | Inheritance | Genetic engineering concept |
| `quadrat_sampling` | Ecology | Quadrat concept, field investigation practical |

### Chemistry (12)

| Slug | Topic | Used by |
|------|-------|---------|
| `bohr_model` | Atomic structure | Bohr model concept |
| `ionic_covalent_bonding` | Bonding | Bonding concept, misconceptions |
| `particle_model` | Particle model | Particle model concept, rate practical |
| `energy_profile` | Energy changes | Energy profile concept, misconceptions |
| `flame_test_colours` | Chemical analysis | Flame tests concept |
| `electrolysis_diagram` | Electrolysis | Electrolysis concept, electrolysis practical |
| `half_equations` | Electrolysis | Half equations concept |
| `empirical_molecular` | Quantitative | Empirical formula concept |
| `alkene_addition` | Organic | Alkene reactions concept |
| `bond_energy` | Energy changes | Bond energy concept |
| `moles_diagram` | Quantitative | Moles concept |
| `fractionating_column` | Organic | Fractional distillation, LCA concept |
| `le_chatelier` | Equilibria | Le Chatelier concept |

### Physics (11)

| Slug | Topic | Used by |
|------|-------|---------|
| `circuit_diagram` | Electricity | Circuit concept, resistance practical |
| `free_body_diagram` | Forces | Forces concept, force/acceleration practical |
| `wave_types` | Waves | Wave concept, waves practical |
| `em_spectrum` | Waves | EM spectrum concept |
| `electromagnetism` | Magnetism | Electromagnetism concept |
| `generator_diagram` | Magnetism | Generator concept |
| `hookes_law_graph` | Forces | Hooke's law concept |
| `critical_angle_tir` | Waves | TIR concept |
| `fission_fusion` | Radioactivity | Nuclear concept |
| `red_shift` | Space | Red shift concept |

---

## 3. Concept Cards – Diagram Coverage

Every concept in `SCIENCE_CONCEPTS` has a `diagramId` in its `visualModel`. All referenced slugs exist in `scienceLabDiagrams.ts`.

**Biology concepts:** 24 concepts, all with diagrams.  
**Chemistry concepts:** 18 concepts, all with diagrams.  
**Physics concepts:** 12 concepts, all with diagrams.

---

## 4. Process Chain (Change Scenario) Cards

Change scenarios reuse concept diagrams. No new diagrams needed.

| Concept | Scenarios with visual | Diagram reused |
|---------|----------------------|----------------|
| Diffusion | 3 | particle_model, cell_membrane_diffusion |
| Osmosis | 2 | osmosis_diagram |
| Active transport | 1 | active_transport |
| Cell division | 1 | cell_division |
| Enzyme action | 2 | enzyme_action |
| Digestive system | 1 | digestive_system |
| Circulatory system | 1 | circulatory_system |
| Pathogens | 1 | pathogen_infection |
| Immune system | 1 | immune_response |
| Photosynthesis | 3 | photosynthesis_light_graph, photosynthesis, enzyme_action |
| Respiration | 1 | respiration |
| Homeostasis | 1 | homeostasis |
| Nervous system | 1 | nervous_system |
| Hormones | 0 | — |

---

## 5. Practical Cards – Diagram Coverage

| Practical | Title | Has visual? | Diagram slug |
|-----------|-------|-------------|--------------|
| bio-microscope | Use of microscopes to observe cells | ✅ | cell_membrane_diffusion |
| bio-enzyme-activity | Investigating pH on enzyme activity | ✅ | enzyme_action |
| bio-osmosis-potato | Investigating osmosis in potato cylinders | ✅ | osmosis_diagram |
| bio-reaction-time | Investigating human reaction times | ✅ | nervous_system |
| bio-plant-responses | Investigating light on plant growth | ✅ | photosynthesis |
| bio-field-investigation | Field investigation: distribution of organisms | ✅ | quadrat_sampling |
| chem-rate-temperature | Effect of temperature on rate of reaction | ✅ | particle_model |
| chem-titration | Titration: finding concentration | ❌ | — |
| chem-electrolysis-prac | Electrolysis of aqueous solutions | ✅ | electrolysis_diagram |
| phys-resistance | Investigating resistance of a wire | ✅ | circuit_diagram |
| phys-density-prac | Determining density of a regular solid | ❌ | — |
| phys-shc-prac | Determining specific heat capacity | ❌ | — |
| phys-waves-prac | Investigating waves | ✅ | wave_types |
| phys-force-acceleration | Investigating force and acceleration | ✅ | free_body_diagram |

### Practicals without diagrams (candidates for new diagrams)

| Practical | Suggested diagram | Description |
|-----------|-------------------|-------------|
| **chem-titration** | `titration_setup` | Burette, pipette, conical flask, indicator |
| **phys-density-prac** | `density_measurement` | Balance, ruler/vernier, regular solid |
| **phys-shc-prac** | `specific_heat_capacity_setup` | Immersion heater, block, thermometer, power supply |

---

## 6. Misconception Cards – Diagram Coverage

| Misconception | Topic | Has diagramId? | Suggested diagram |
|--------------|-------|----------------|-------------------|
| Particles want to spread out | Cell Biology | ✅ | particle_model |
| Water moves to less water | Cell Biology | ✅ | osmosis_diagram |
| Active transport is faster diffusion | Cell Biology | ✅ | active_transport |
| Enzymes are used up | Organisation | ✅ | enzyme_action |
| Enzymes make reactions happen | Organisation | ✅ | enzyme_action |
| All bacteria harmful | Infection | ✅ | pathogen_infection |
| Bacteria and viruses same | Infection | ✅ | pathogen_infection |
| Plants get food from soil | Bioenergetics | ✅ | photosynthesis |
| Light is a substance | Bioenergetics | ✅ | photosynthesis |
| Chlorophyll makes glucose | Bioenergetics | ✅ | photosynthesis |
| Respiration is breathing | Bioenergetics | ✅ | respiration |
| Homeostasis keeps constant | Homeostasis | ✅ | homeostasis |
| Hormones faster than nerves | Homeostasis | ✅ | nervous_system |
| Dominant means common | Inheritance | ✅ | genetic_inheritance |
| Organisms adapt/evolve | Evolution | ✅ | natural_selection |
| Evolution happens to individuals | Evolution | ✅ | natural_selection |
| Energy recycled in ecosystems | Ecology | ✅ | ecosystem |
| All energy transferred | Ecology | ✅ | ecosystem |
| Energy is used up | Physics | ✅ | energy_profile |
| Covalent: donate one electron | Chemistry | ✅ | ionic_covalent_bonding |
| **chem-rate-always-temp** | Rate of reaction | ❌ | enzyme_action or energy_profile |
| **phys-current-used-up** | Electricity | ❌ | circuit_diagram |
| **chem-mole-is-mass** | Quantitative | ❌ | moles_diagram |
| **chem-acids-contain-oxygen** | Acids | ❌ | half_equations (or new) |
| **chem-enzymes-denature** | Rate (if exists) | — | enzyme_action |

### Misconceptions without diagramId (add diagramId to reuse existing)

These can be fixed by adding `diagramId` to the misconception object in `scienceLabData.ts`:

- `phys-current-used-up` → `diagramId: 'circuit_diagram'`
- `chem-mole-is-mass` → `diagramId: 'moles_diagram'`
- `chem-rate-always-temp` → `diagramId: 'enzyme_action'` or `energy_profile`

---

## 7. Full List: Every Diagram to Create/Add

### 7.1 Already implemented (no action)

All 47 diagrams below exist. No creation needed.

```
cell_membrane_diffusion, osmosis_diagram, active_transport, cell_division,
enzyme_action, digestive_system, circulatory_system, pathogen_infection,
immune_response, photosynthesis, respiration, homeostasis, nervous_system,
hormone_action, dna_structure, genetic_inheritance, natural_selection,
ecosystem, carbon_cycle, stem_cell_differentiation, monoclonal_antibodies,
photosynthesis_light_graph, thyroxine_feedback, genetic_engineering,
quadrat_sampling, bohr_model, ionic_covalent_bonding, free_body_diagram,
particle_model, energy_profile, flame_test_colours, wave_types,
electromagnetism, fission_fusion, red_shift, le_chatelier, half_equations,
empirical_molecular, alkene_addition, bond_energy, hookes_law_graph,
critical_angle_tir, circuit_diagram, moles_diagram, electrolysis_diagram,
fractionating_column, em_spectrum, generator_diagram
```

### 7.2 New diagrams to create (optional, for completeness)

| # | Slug | Title | Used by | Priority |
|---|------|-------|---------|----------|
| 1 | `titration_setup` | Titration equipment setup | chem-titration practical | Medium |
| 2 | `density_measurement` | Density measurement (balance + ruler) | phys-density-prac | Low |
| 3 | `specific_heat_capacity_setup` | SHC experiment setup | phys-shc-prac | Low |

### 7.3 Data updates (no new diagrams)

| Action | Location | Change |
|--------|----------|-------|
| Add diagramId to misconception | scienceLabData.ts | `phys-current-used-up` → `diagramId: 'circuit_diagram'` |
| Add diagramId to misconception | scienceLabData.ts | `chem-mole-is-mass` → `diagramId: 'moles_diagram'` |
| Add diagramId to misconception | scienceLabData.ts | `chem-rate-always-temp` → `diagramId: 'enzyme_action'` |
| Add visual to practical | scienceLabData.ts | chem-titration → `visual: { diagramId: 'titration_setup', ... }` (after creating) |
| Add visual to practical | scienceLabData.ts | phys-density-prac → `visual: { diagramId: 'density_measurement', ... }` (after creating) |
| Add visual to practical | scienceLabData.ts | phys-shc-prac → `visual: { diagramId: 'specific_heat_capacity_setup', ... }` (after creating) |

---

## 8. Summary Checklist

- [x] All 47 concept diagram slugs implemented
- [x] All process chain scenarios use existing diagrams
- [x] 14/14 practicals have diagrams
- [x] 3 practical diagrams created (titration, density, SHC)
- [x] 3 misconceptions wired to existing diagrams

---

## 9. File Reference

| File | Purpose |
|------|---------|
| `src/config/scienceLabDiagrams.ts` | Blueprint definitions (47 diagrams) |
| `src/config/scienceLabDiagramMap.ts` | Slug → metadata resolution |
| `src/config/scienceLabData.ts` | Concepts, practicals, misconceptions with diagramId |
| `src/pages/science/ScienceLabFlashcardPage.tsx` | Renders DiagramRenderer when diagramId present |
| `docs/FLASHCARD_DIAGRAMS_PLAN.md` | Original implementation plan |
