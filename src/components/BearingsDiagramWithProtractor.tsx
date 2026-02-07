/**
 * Wraps a bearings diagram with an overlay protractor that snaps to the diagram grid
 * (viewBox 0 0 500 500, origin at A (250, 350)). Users can drag to measure the bearing
 * and the value snaps to 1°; optional sync with the numeric answer field.
 */

import { DiagramRenderer } from './DiagramRenderer';
import { BearingProtractorOverlay } from './questions/BearingProtractorOverlay';
import type { DiagramMetadata } from '../types';

const BEARINGS_TEMPLATE_ID = 'math.bearings.north_arrow.v1';

export interface BearingsDiagramWithProtractorProps {
  metadata: DiagramMetadata;
  /** Current answer value (e.g. from quiz state) */
  value?: string;
  /** Called when user selects an angle so it can fill the answer field */
  onChange?: (degrees: number) => void;
  disabled?: boolean;
  className?: string;
}

export function BearingsDiagramWithProtractor({
  metadata,
  value,
  onChange,
  disabled = false,
  className = '',
}: BearingsDiagramWithProtractorProps) {
  const showDegreeGrid = metadata?.params?.visibility?.showDegreeGrid === true;

  return (
    <div
      className={`bearing-diagram-with-protractor relative w-full max-w-[500px] aspect-square ${className}`}
      style={{ marginBottom: '0.5rem' }}
    >
      <div className="absolute inset-0">
        <DiagramRenderer metadata={metadata} fitToContainer />
      </div>
      <div className="absolute inset-0" aria-hidden>
        <BearingProtractorOverlay
          value={value}
          onChange={(deg) => onChange?.(deg)}
          disabled={disabled}
          showGrid={showDegreeGrid}
        />
      </div>
    </div>
  );
}

export function isBearingsDiagram(metadata: DiagramMetadata | undefined): boolean {
  return metadata?.templateId === BEARINGS_TEMPLATE_ID;
}
