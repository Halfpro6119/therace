/**
 * Displays a diagram for flashcards.
 * For slugs with an animated version (osmosis, diffusion, etc.), shows the moving
 * diagram unless the user prefers reduced motion. When reduced motion is preferred,
 * renders the static diagram from the Science Lab blueprint (no static asset required).
 * For other slugs, uses static SVG assets from public/assets.
 */

import { useState } from 'react';
import { getFlashcardDiagramPath } from '../config/flashcardDiagramAssets';
import { getDiagramMetadataForSlug } from '../config/scienceLabDiagramMap';
import { getAnimatedDiagramComponent } from './AnimatedDiagrams';
import { hasAnimatedDiagram } from '../config/animatedDiagramSlugs';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { DiagramRenderer } from './DiagramRenderer';

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
}

export function FlashcardDiagram({
  slug,
  description,
  className = '',
  fitToContainer = false,
  showDescriptionWithImage = true,
}: FlashcardDiagramProps) {
  const [failed, setFailed] = useState(false);
  const reducedMotion = useReducedMotion();
  const AnimatedComponent = !reducedMotion ? getAnimatedDiagramComponent(slug) : null;
  const path = getFlashcardDiagramPath(slug);
  const diagramMetadata = getDiagramMetadataForSlug(slug);

  // Animated version when motion is allowed
  if (AnimatedComponent) {
    return (
      <div className={`flashcard-diagram ${fitToContainer ? 'flashcard-diagram-fit' : ''} ${className}`}>
        <div className={fitToContainer ? 'max-w-full max-h-full flex justify-center' : ''} style={fitToContainer ? { maxHeight: '200px' } : undefined}>
          <AnimatedComponent />
        </div>
        {showDescriptionWithImage && description && (
          <p className="text-xs leading-relaxed mt-2" style={{ color: 'rgb(var(--text-secondary))' }}>
            {description}
          </p>
        )}
      </div>
    );
  }

  // Reduced motion + slug has animated version → render static from blueprint (no asset needed)
  if (reducedMotion && hasAnimatedDiagram(slug) && diagramMetadata) {
    return (
      <div className={`flashcard-diagram ${fitToContainer ? 'flashcard-diagram-fit' : ''} ${className}`}>
        <div
          className={fitToContainer ? 'max-w-full flex justify-center items-center' : ''}
          style={fitToContainer ? { maxHeight: '200px', minHeight: '140px' } : undefined}
        >
          <DiagramRenderer metadata={diagramMetadata} fitToContainer={fitToContainer} />
        </div>
        {showDescriptionWithImage && description && (
          <p className="text-xs leading-relaxed mt-2" style={{ color: 'rgb(var(--text-secondary))' }}>
            {description}
          </p>
        )}
      </div>
    );
  }

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
      <img
        src={path}
        alt={description ?? `Diagram: ${slug}`}
        onError={() => setFailed(true)}
        className={fitToContainer ? 'max-w-full max-h-full w-auto h-auto object-contain' : ''}
        style={fitToContainer ? { maxHeight: '200px' } : undefined}
      />
      {showDescriptionWithImage && description && (
        <p className="text-xs leading-relaxed mt-2" style={{ color: 'rgb(var(--text-secondary))' }}>
          {description}
        </p>
      )}
    </div>
  );
}
