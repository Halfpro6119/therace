/**
 * Animated (moving) diagram components for Science Lab.
 * Used when FlashcardDiagram slug has an animated version and user does not prefer reduced motion.
 */

import type { ComponentType } from 'react';
import { hasAnimatedDiagram, type AnimatedDiagramSlug } from '../../config/animatedDiagramSlugs';
import { AnimatedOsmosis } from './AnimatedOsmosis';
import { AnimatedDiffusion } from './AnimatedDiffusion';
import { AnimatedParticleModel } from './AnimatedParticleModel';
import { AnimatedActiveTransport } from './AnimatedActiveTransport';

const ANIMATED_DIAGRAM_MAP: Record<AnimatedDiagramSlug, ComponentType<object>> = {
  osmosis_diagram: AnimatedOsmosis,
  cell_membrane_diffusion: AnimatedDiffusion,
  particle_model: AnimatedParticleModel,
  active_transport: AnimatedActiveTransport,
};

export function getAnimatedDiagramComponent(slug: string): ComponentType<object> | null {
  if (!hasAnimatedDiagram(slug)) return null;
  return ANIMATED_DIAGRAM_MAP[slug] ?? null;
}

export { AnimatedOsmosis } from './AnimatedOsmosis';
export { AnimatedDiffusion } from './AnimatedDiffusion';
export { AnimatedParticleModel } from './AnimatedParticleModel';
export { AnimatedActiveTransport } from './AnimatedActiveTransport';
