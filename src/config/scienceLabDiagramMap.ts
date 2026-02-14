/**
 * Science Lab – maps diagram slugs to DiagramRenderer metadata
 * Uses mode: 'custom' with inline blueprints (no Supabase required)
 */

import type { DiagramMetadata } from '../types';
import * as diagrams from './scienceLabDiagrams';

type DiagramSlug = keyof typeof diagrams;

const DIAGRAM_BLUEPRINTS: Record<string, object> = diagrams as unknown as Record<string, object>;

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
