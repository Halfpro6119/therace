/**
 * Displays a diagram for flashcards.
 * Priority: 1) Animated (when motion allowed), 2) Blueprint (programmatic SVG), 3) Static asset, 4) Description only.
 * Blueprint-first ensures consistent, improvable diagrams that aid memory.
 */

import { useState } from 'react';
import { getFlashcardDiagramPath } from '../config/flashcardDiagramAssets';
import { getDiagramMetadataForSlug } from '../config/scienceLabDiagramMap';
import { getAnimatedDiagramComponent } from './AnimatedDiagrams';
import { hasAnimatedDiagram } from '../config/animatedDiagramSlugs';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { DiagramRenderer } from './DiagramRenderer';

/** Minimum space for diagram so it displays without cutting off */
const DIAGRAM_MIN_HEIGHT = 260;

interface FlashcardDiagramProps {
  /** Diagram slug (e.g. cell_membrane_diffusion) */
  slug: string;
  /** Fallback text when diagram is missing or fails to load. Shown below image when showDescriptionWithImage is true. */
  description?: string;
  /** Additional CSS class for the container */
  className?: string;
  /** If true, constrain the diagram to fit its container */
  fitToContainer?: boolean;
  /** If true, show description below the image when diagram loads. Use false when parent shows description separately. */
  showDescriptionWithImage?: boolean;
  /** If true, use static blueprint only (no animated component). Use on long sessions to avoid memory/RAF buildup from Framer Motion. */
  preferStatic?: boolean;
}

export function FlashcardDiagram({
  slug,
  description,
  className = '',
  fitToContainer = false,
  showDescriptionWithImage = true,
  preferStatic = false,
}: FlashcardDiagramProps) {
  const [failed, setFailed] = useState(false);
  const reducedMotion = useReducedMotion();
  const AnimatedComponent = !preferStatic && !reducedMotion ? getAnimatedDiagramComponent(slug) : null;
  const path = getFlashcardDiagramPath(slug);
  const diagramMetadata = getDiagramMetadataForSlug(slug);

  const diagramContainerStyle = fitToContainer
    ? { minHeight: `${DIAGRAM_MIN_HEIGHT}px`, flex: 1 }
    : undefined;

  const Caption = description && showDescriptionWithImage ? (
    <p className="flashcard-diagram-caption mt-4 font-medium" style={{ color: 'rgb(var(--text-secondary))' }}>
      {description}
    </p>
  ) : null;

  // 1. Animated version when motion is allowed
  if (AnimatedComponent) {
    return (
      <div className={`flashcard-diagram ${fitToContainer ? 'flashcard-diagram-fit' : ''} ${className}`}>
        <div
          className={fitToContainer ? 'max-w-full flex justify-center items-center' : ''}
          style={diagramContainerStyle}
        >
          <AnimatedComponent />
        </div>
        {Caption}
      </div>
    );
  }

  // 2. Blueprint-first: use programmatic diagram when available (better consistency, memory aids)
  if (diagramMetadata) {
    const GRAPH_ARIA: Record<string, string> = {
      photosynthesis_temperature_graph: 'Graph: rate of photosynthesis versus temperature. Curve rises to optimum at 35°C then falls due to denaturation.',
      photosynthesis_light_graph: 'Graph: rate of photosynthesis versus light intensity. Rate rises then plateaus where another factor limits.',
      photosynthesis_co2_graph: 'Graph: rate of photosynthesis versus carbon dioxide concentration. Rate rises then plateaus when light or temperature limits.',
      enzyme_activity_temperature_graph: 'Graph: enzyme activity versus temperature. Bell curve with optimum around 37°C; denaturation above.',
      enzyme_activity_ph_graph: 'Graph: enzyme activity versus pH. Optimum around pH 7.',
      diffusion_rate_temperature_graph: 'Graph: diffusion rate versus temperature. Rate increases as temperature rises; faster particles.',
      hookes_law_graph: 'Graph: force versus extension. Linear region shows Hooke\'s law; elastic limit marked where curve bends.',
    };
    const ariaLabel = GRAPH_ARIA[slug];
    const wrapperProps = ariaLabel ? { role: 'img' as const, 'aria-label': ariaLabel } : {};
    return (
      <div className={`flashcard-diagram ${fitToContainer ? 'flashcard-diagram-fit' : ''} ${className}`}>
        <div
          className={fitToContainer ? 'max-w-full flex justify-center items-center' : ''}
          style={diagramContainerStyle}
          {...wrapperProps}
        >
          <DiagramRenderer metadata={diagramMetadata} fitToContainer={fitToContainer} />
        </div>
        {Caption}
      </div>
    );
  }

  // 3. Fallback: static asset when no blueprint exists
  if (!path) {
    return description ? (
      <p className={`text-sm leading-relaxed ${className}`} style={{ color: 'rgb(var(--text-secondary))' }}>
        {description}
      </p>
    ) : null;
  }

  if (failed) {
    return description ? (
      <p className={`text-sm leading-relaxed ${className}`} style={{ color: 'rgb(var(--text-secondary))' }}>
        {description}
      </p>
    ) : null;
  }

  return (
    <div className={`flashcard-diagram ${fitToContainer ? 'flashcard-diagram-fit' : ''} ${className}`}>
      <div
        className={fitToContainer ? 'max-w-full flex justify-center items-center' : ''}
        style={diagramContainerStyle}
      >
        <img
          src={path}
          alt={description ?? `Diagram: ${slug}`}
          onError={() => setFailed(true)}
          className={fitToContainer ? 'max-w-full max-h-full w-auto h-auto object-contain' : ''}
          style={fitToContainer ? { flex: 1, minHeight: `${DIAGRAM_MIN_HEIGHT}px` } : undefined}
        />
      </div>
      {Caption}
    </div>
  );
}
