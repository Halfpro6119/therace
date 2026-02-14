/**
 * Science Lab – slugs that have an animated (moving) diagram version.
 * When these are shown and the user does not prefer reduced motion,
 * FlashcardDiagram renders the React animated component instead of the static SVG.
 */

export const ANIMATED_DIAGRAM_SLUGS: readonly string[] = [
  'osmosis_diagram',
  'cell_membrane_diffusion',
  'particle_model',
  'active_transport',
] as const;

export type AnimatedDiagramSlug = (typeof ANIMATED_DIAGRAM_SLUGS)[number];

export function hasAnimatedDiagram(slug: string): slug is AnimatedDiagramSlug {
  return ANIMATED_DIAGRAM_SLUGS.includes(slug as AnimatedDiagramSlug);
}
