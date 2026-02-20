import { useEffect, useState, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../db/client';
import { renderDiagram } from '../diagrams/engine';
import { CustomDiagramEngine } from '../diagrams/engine/customDiagramEngine';
import { useAdminView } from '../contexts/AdminViewContext';
import type { DiagramMetadata, DiagramTemplate, Diagram, DiagramOverrides, DiagramSchema } from '../types';

interface DiagramRendererProps {
  metadata: DiagramMetadata;
  className?: string;
  showWarnings?: boolean;
  /**
   * If true, force the rendered <svg> to fit its parent container (used for thumbnail previews).
   * This does not change any outer styling, only injects width/height/preserveAspectRatio on the root <svg>.
   */
  fitToContainer?: boolean;
}

const templateCache = new Map<string, DiagramTemplate>();
const assetCache = new Map<string, Diagram>();

export function DiagramRenderer({ metadata, className = '', showWarnings = false, fitToContainer = false }: DiagramRendererProps) {
  const adminView = useAdminView();
  const [template, setTemplate] = useState<DiagramTemplate | null>(null);
  const [asset, setAsset] = useState<Diagram | null>(null);
  const [loading, setLoading] = useState(() => !(metadata.mode === 'custom' && metadata.custom));
  const [error, setError] = useState<string | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadDiagram();
  }, [metadata.mode, metadata.templateId, metadata.diagramId, JSON.stringify(metadata.params), JSON.stringify(metadata.custom), adminView]);

  const loadDiagram = async () => {
    setError(null);
    setWarnings([]);

    try {
      if (metadata.mode === 'custom' && metadata.custom) {
        setLoading(false);
        return;
      }
      setLoading(true);
      if (metadata.mode === 'auto') {
        setLoading(false);
      } else if (metadata.mode === 'template' && metadata.templateId) {
        if (templateCache.has(metadata.templateId)) {
          setTemplate(templateCache.get(metadata.templateId)!);
        } else {
          const { data, error: fetchError } = await supabase
            .from('diagram_templates')
            .select('*')
            .eq('template_id', metadata.templateId)
            .single();

          if (fetchError) throw fetchError;

          const templateData: DiagramTemplate = {
            id: data.id,
            templateId: data.template_id,
            title: data.title,
            subjectId: data.subject_id,
            topicTags: data.topic_tags || [],
            baseCanvasData: data.base_canvas_data,
            baseSvgData: data.base_svg_data,
            width: data.width,
            height: data.height,
            anchors: data.anchors || {},
            schema: data.schema || {},
            createdAt: data.created_at,
            updatedAt: data.updated_at
          };

          templateCache.set(metadata.templateId, templateData);
          setTemplate(templateData);
        }
        setLoading(false);
      } else if (metadata.mode === 'asset' && metadata.diagramId) {
        if (adminView) {
          const draftOrLive = await adminView.getEffectiveDiagram(metadata.diagramId);
          setAsset(draftOrLive);
        } else if (assetCache.has(metadata.diagramId)) {
          setAsset(assetCache.get(metadata.diagramId)!);
        } else {
          const { data, error: fetchError } = await supabase
            .from('diagrams')
            .select('*')
            .eq('id', metadata.diagramId)
            .single();

          if (fetchError) throw fetchError;

          const assetData: Diagram = {
            id: data.id,
            title: data.title,
            subjectId: data.subject_id,
            diagramType: data.diagram_type,
            tags: data.tags || [],
            storageMode: data.storage_mode,
            canvasData: data.canvas_data || { elements: [] },
            svgData: data.svg_data,
            pngUrl: data.png_url,
            width: data.width,
            height: data.height,
            createdAt: data.created_at,
            updatedAt: data.updated_at
          };

          assetCache.set(metadata.diagramId, assetData);
          setAsset(assetData);
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error('Error loading diagram:', err);
      setError('Failed to load diagram');
      setLoading(false);
    }
  };

  const renderResult = useMemo(() => {
    if (metadata.mode === 'auto') {
      return renderDiagram(metadata);
    }

    if (metadata.mode === 'template' && template) {
      return {
        svg: applyOverridesToSvg(template.baseSvgData, metadata.overrides, template.schema),
        width: template.width || 0,
        height: template.height || 0,
        warnings: [] as string[],
      };
    }

    if ((metadata.mode === 'custom' || (metadata as any).custom) && (metadata as any).custom) {
      const engine = new CustomDiagramEngine((metadata as any).custom);
      const svg = engine.render();
      return {
        svg,
        width: (metadata as any).custom?.size?.width || 0,
        height: (metadata as any).custom?.size?.height || 0,
        warnings: showWarnings ? engine.getWarnings() : [],
      };
    }

    if (metadata.mode === 'asset' && asset) {
      return {
        svg: asset.svgData || '',
        width: asset.width || 0,
        height: asset.height || 0,
        warnings: [] as string[],
      };
    }

    return { svg: '', width: 0, height: 0, warnings: [] as string[] };
  }, [metadata.mode, metadata.templateId, metadata.diagramId, JSON.stringify(metadata.params), JSON.stringify(metadata.overrides), JSON.stringify(metadata.custom), template, asset]);

  const renderedSvg = renderResult.svg || '';

  useEffect(() => {
    setWarnings(renderResult.warnings || []);
  }, [JSON.stringify(renderResult.warnings || [])]);

  const fittedSvg = useMemo(() => {
    if (!fitToContainer) return renderedSvg;
    if (!renderedSvg) return renderedSvg;

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(renderedSvg, 'image/svg+xml');
      const svgEl = doc.querySelector('svg');
      if (!svgEl) return renderedSvg;

      svgEl.setAttribute('width', '100%');
      svgEl.setAttribute('height', '100%');
      if (!svgEl.getAttribute('preserveAspectRatio')) {
        svgEl.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      }

      return svgEl.outerHTML;
    } catch {
      return renderedSvg;
    }
  }, [fitToContainer, renderedSvg]);

  if (loading) {
    return (
      <div className={`diagram-renderer diagram-loading ${className}`}>
        <div className="animate-pulse bg-gray-200 rounded-lg" style={{ height: '300px' }} />
      </div>
    );
  }

  if (error || (!template && !asset && metadata.mode !== 'auto' && metadata.mode !== 'custom')) {
    if (showWarnings && error) {
      return (
        <div className="diagram-renderer-error bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
          <strong>Diagram Error:</strong> {error}
        </div>
      );
    }
    return null;
  }

  if (!fittedSvg) {
    if (showWarnings && warnings.length > 0) {
      return (
        <div className="diagram-renderer-warning bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-700">
          <strong>Diagram Warnings:</strong>
          <ul className="list-disc list-inside mt-2">
            {warnings.map((warning, idx) => (
              <li key={idx}>{warning}</li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  }

  const placement = metadata.placement || 'above';
  const placementClass = `diagram-placement-${placement}`;

  return (
    <div className={`diagram-renderer ${placementClass} ${className}`} ref={containerRef}>
      {showWarnings && warnings.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3 text-yellow-700 text-sm">
          <strong>Warnings:</strong>
          <ul className="list-disc list-inside mt-1">
            {warnings.map((warning, idx) => (
              <li key={idx}>{warning}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="diagram-container relative">
        {fittedSvg && (
          <div
            className="diagram-svg-wrapper"
            dangerouslySetInnerHTML={{ __html: fittedSvg }}
          />
        )}
        {metadata.caption && (
          <p className="diagram-caption">{metadata.caption}</p>
        )}
        {adminView?.isAdminView && metadata.mode === 'asset' && metadata.diagramId && (
          <Link
            to={`/admin/diagrams/${metadata.diagramId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-2 right-2 px-2 py-1 rounded bg-amber-500/90 text-white text-xs font-medium hover:bg-amber-600"
          >
            Edit diagram
          </Link>
        )}
      </div>
    </div>
  );
}

function applyOverridesToSvg(
  baseSvg: string,
  overrides?: DiagramOverrides,
  schema?: DiagramSchema
): string {
  if (!overrides) return baseSvg;

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(baseSvg, 'image/svg+xml');
    const svgElement = doc.querySelector('svg');

    if (!svgElement) return baseSvg;

    if (overrides.labels) {
      applyLabelOverrides(doc, overrides.labels, schema);
    }

    if (overrides.values) {
      applyValueOverrides(doc, overrides.values, schema);
    }

    if (overrides.visibility) {
      applyVisibilityOverrides(doc, overrides.visibility);
    }

    if (overrides.positions) {
      applyPositionOverrides(doc, overrides.positions, schema);
    }

    if (overrides.styles) {
      applyStyleOverrides(doc, overrides.styles);
    }

    const serializer = new XMLSerializer();
    return serializer.serializeToString(doc);
  } catch (err) {
    console.error('Error applying overrides:', err);
    return baseSvg;
  }
}

function applyLabelOverrides(
  doc: Document,
  labels: Record<string, string>,
  schema?: DiagramSchema
) {
  Object.entries(labels).forEach(([key, value]) => {
    const maxLen = schema?.labels?.[key]?.maxLen;
    const finalValue = maxLen ? value.substring(0, maxLen) : value;

    let elementId = key.startsWith('txt:') ? key : `txt:${key}`;
    let element = doc.getElementById(elementId);

    if (!element && !key.startsWith('txt:')) {
      element = doc.getElementById(key);
    }

    if (element) {
      const textNode = element.querySelector('text') || element;
      if (textNode.tagName === 'text' || textNode.tagName === 'tspan') {
        textNode.textContent = finalValue;
      }
    }
  });
}

function applyValueOverrides(
  doc: Document,
  values: Record<string, number | string>,
  schema?: DiagramSchema
) {
  Object.entries(values).forEach(([key, value]) => {
    const schemaEntry = schema?.values?.[key];
    let finalValue = value;

    if (schemaEntry && typeof value === 'number') {
      if (schemaEntry.min !== undefined && value < schemaEntry.min) {
        finalValue = schemaEntry.min;
      }
      if (schemaEntry.max !== undefined && value > schemaEntry.max) {
        finalValue = schemaEntry.max;
      }
    }

    const element = doc.getElementById(key);
    if (element) {
      const textNode = element.querySelector('text') || element;
      if (textNode.tagName === 'text' || textNode.tagName === 'tspan') {
        textNode.textContent = String(finalValue);
      }
    }
  });
}

function applyVisibilityOverrides(doc: Document, visibility: Record<string, boolean>) {
  Object.entries(visibility).forEach(([key, visible]) => {
    const element = doc.getElementById(key);
    if (element) {
      if (visible) {
        element.removeAttribute('display');
        element.style.display = '';
      } else {
        element.style.display = 'none';
      }
    }
  });
}

function applyPositionOverrides(
  doc: Document,
  positions: Record<string, { x: number; y: number }>,
  schema?: DiagramSchema
) {
  Object.entries(positions).forEach(([key, pos]) => {
    const elementId = key.startsWith('pt:') ? key : `pt:${key}`;
    const element = doc.getElementById(elementId);

    if (element) {
      if (element.tagName === 'circle') {
        element.setAttribute('cx', String(pos.x));
        element.setAttribute('cy', String(pos.y));
      } else if (element.tagName === 'text') {
        element.setAttribute('x', String(pos.x));
        element.setAttribute('y', String(pos.y));
      }

      const posSchema = schema?.positions?.[key];
      if (posSchema?.linkedText) {
        const linkedTextId = posSchema.linkedText.startsWith('txt:')
          ? posSchema.linkedText
          : `txt:${posSchema.linkedText}`;
        const linkedElement = doc.getElementById(linkedTextId);
        if (linkedElement && linkedElement.tagName === 'text') {
          linkedElement.setAttribute('x', String(pos.x));
          linkedElement.setAttribute('y', String(pos.y));
        }
      }
    }
  });
}

function applyStyleOverrides(doc: Document, styles: { highlight?: string[]; muted?: string[] }) {
  if (styles.highlight) {
    styles.highlight.forEach(id => {
      const element = doc.getElementById(id);
      if (element) {
        element.classList.add('diag-highlight');
      }
    });
  }

  if (styles.muted) {
    styles.muted.forEach(id => {
      const element = doc.getElementById(id);
      if (element) {
        element.classList.add('diag-muted');
      }
    });
  }
}

// Add this import at the top of the file:
// import { buildDiagramFromMetadata } from '../diagrams/engine/metadataDiagramBuilder';

// Add this new mode handler in the loadDiagram function:
// else if (metadata.mode === 'metadata' && metadata.shapes) {
//   const svgString = buildDiagramFromMetadata({
//     viewBox: metadata.viewBox,
//     width: metadata.width,
//     height: metadata.height,
//     backgroundColor: metadata.backgroundColor,
//     shapes: metadata.shapes,
//     params: metadata.params,
//   });
//   setSvgContent(svgString);
//   setLoading(false);
// }
