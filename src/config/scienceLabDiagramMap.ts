/**
 * Science Lab – maps diagram slugs to DiagramRenderer metadata
 * Uses mode: 'custom' with inline blueprints (no Supabase required)
 */

import type { DiagramMetadata } from '../types';
import * as diagrams from './scienceLabDiagrams';

type DiagramSlug = keyof typeof diagrams;

const DIAGRAM_BLUEPRINTS: Record<string, object> = diagrams as unknown as Record<string, object>;

/**
 * Diagrams with clean blueprints suitable for flashcards (simple, clear, not cluttered).
 * All other diagram slugs show description text only. Expanded per FLASHCARD_FULL_AUDIT.
 */
/** Per SCIENCE_LAB_FLASHCARD_FULL_REVIEW: high-traffic diagrams with clean blueprints. */
export const CLEAN_FLASHCARD_DIAGRAMS = new Set<string>([
  'cell_membrane_diffusion',
  'osmosis_diagram',
  'active_transport',
  'enzyme_action',
  'photosynthesis',
  'respiration',
  'particle_model',
  'dna_structure',
  'cell_division',
  'homeostasis',
  'digestive_system',
  'circulatory_system',
  'pathogen_infection',
  'immune_response',
  'nervous_system',
  // Expanded per FULL_REVIEW: hormone_action, carbon_cycle, circuit_diagram, wave_types, em_spectrum, bohr_model, electrolysis_diagram, free_body_diagram
  'hormone_action',
  'carbon_cycle',
  'circuit_diagram',
  'wave_types',
  'em_spectrum',
  'bohr_model',
  'electrolysis_diagram',
  'free_body_diagram',
]);

export function isCleanFlashcardDiagram(slug: string): boolean {
  return CLEAN_FLASHCARD_DIAGRAMS.has(slug);
}

/**
 * Get DiagramRenderer metadata for a diagram slug.
 * Returns null if slug is not found.
 */
export function getDiagramMetadataForSlug(slug: string): DiagramMetadata | null {
  const blueprint = DIAGRAM_BLUEPRINTS[slug];
  if (!blueprint || typeof blueprint !== 'object') return null;

  return {
    mode: 'custom',
    custom: blueprint as DiagramMetadata['custom'],
    placement: 'above',
  };
}

/**
 * Check if a diagram exists for the given slug
 */
export function hasDiagramForSlug(slug: string): boolean {
  return slug in DIAGRAM_BLUEPRINTS;
}
