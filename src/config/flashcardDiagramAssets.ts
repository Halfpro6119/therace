/**
 * Science Lab – static diagram assets for flashcards
 * Each diagram is a hand-crafted SVG file in public/assets/diagrams/science-lab/
 *
 * Add slugs here as you create each diagram. Until a slug is added, the flashcard
 * will show the description text only.
 */

/** Slugs that have a corresponding SVG file. Replace SVG files with hand-crafted versions as you create them. */
export const FLASHCARD_DIAGRAM_SLUGS: readonly string[] = [
  'active_transport',
  'alkene_addition',
  'bohr_model',
  'bond_energy',
  'carbon_cycle',
  'cell_division',
  'cell_membrane_diffusion',
  'circuit_diagram',
  'circulatory_system',
  'critical_angle_tir',
  'density_measurement',
  'digestive_system',
  'dna_structure',
  'ecosystem',
  'element_box_atomic_mass',
  'electrolysis_diagram',
  'electromagnetism',
  'em_spectrum',
  'empirical_molecular',
  'energy_profile',
  'enzyme_action',
  'fission_fusion',
  'flame_test_colours',
  'fractionating_column',
  'free_body_diagram',
  'generator_diagram',
  'genetic_engineering',
  'genetic_inheritance',
  'half_equations',
  'homeostasis',
  'hookes_law_graph',
  'hormone_action',
  'immune_response',
  'ionic_covalent_bonding',
  'le_chatelier',
  'moles_diagram',
  'monoclonal_antibodies',
  'natural_selection',
  'nervous_system',
  'osmosis_diagram',
  'particle_model',
  'pathogen_infection',
  'photosynthesis',
  'photosynthesis_light_graph',
  'quadrat_sampling',
  'red_shift',
  'respiration',
  'specific_heat_capacity_setup',
  'stem_cell_differentiation',
  'thyroxine_feedback',
  'titration_setup',
  'wave_types',
] as const;

const ASSET_BASE = '/assets/diagrams/science-lab';

/**
 * Get the asset path for a diagram slug.
 * Returns null if no diagram has been created for this slug yet.
 */
export function getFlashcardDiagramPath(slug: string): string | null {
  if (!FLASHCARD_DIAGRAM_SLUGS.includes(slug)) return null;
  return `${ASSET_BASE}/${slug}.svg`;
}

/**
 * Check if a diagram asset exists for the given slug
 */
export function hasFlashcardDiagram(slug: string): boolean {
  return FLASHCARD_DIAGRAM_SLUGS.includes(slug);
}
