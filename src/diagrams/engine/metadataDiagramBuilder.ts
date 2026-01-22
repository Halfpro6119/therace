/**
 * Metadata-Driven Diagram Builder
 * 
 * Creates custom diagrams directly from metadata without needing templates.
 * Supports inline shape definitions, overlays, and dynamic rendering.
 */

export interface MetadataShape {
  id: string;
  type: 'line' | 'polyline' | 'polygon' | 'rect' | 'circle' | 'ellipse' | 'text' | 'arrow' | 'arc' | 'angleMarker' | 'tickMark' | 'grid' | 'axes';
  [key: string]: any;
}

export interface MetadataDiagramConfig {
  viewBox?: string;
  width?: number;
  height?: number;
  backgroundColor?: string;
  shapes: MetadataShape[];
  params?: Record<string, any>;
}

/**
 * Build SVG from metadata configuration
 */
export function buildDiagramFromMetadata(config: MetadataDiagramConfig): string {
  const viewBox = config.viewBox || '0 0 800 500';
  const [x, y, w, h] = viewBox.split(' ').map(Number);
  const width = config.width || w || 800;
  const height = config.height || h || 500;
  const bgColor = config.backgroundColor || 'white';

  const shapesHtml = config.shapes
    .map(shape => renderMetadataShape(shape, config.params || {}))
    .filter(Boolean)
    .join('\n');

  return `
    <svg 
      viewBox="${viewBox}" 
      width="${width}" 
      height="${height}" 
      xmlns="http://www.w3.org/2000/svg"
      style="background-color: ${bgColor};"
    >
      ${shapesHtml}
    </svg>
  `.trim();
}

/**
 * Render a single shape from metadata
 */
function renderMetadataShape(shape: MetadataShape, params: Record<string, any>): string {
  const { type, id, ...props } = shape;

  try {
    switch (type) {
      case 'line':
        return renderLine(id, props, params);
      case 'polyline':
        return renderPolyline(id, props, params);
      case 'polygon':
        return renderPolygon(id, props, params);
      case 'rect':
        return renderRect(id, props, params);
      case 'circle':
        return renderCircle(id, props, params);
      case 'ellipse':
        return renderEllipse(id, props, params);
      case 'text':
        return renderText(id, props, params);
      case 'arrow':
        return renderArrow(id, props, params);
      case 'arc':
        return renderArc(id, props, params);
      case 'angleMarker':
        return renderAngleMarker(id, props, params);
      case 'tickMark':
        return renderTickMark(id, props, params);
      case 'grid':
        return renderGrid(id, props, params);
      case 'axes':
        return renderAxes(id, props, params);
      default:
        console.warn(`Unknown shape type: ${type}`);
        return '';
    }
  } catch (error) {
    console.warn(`Error rendering shape ${id}:`, error);
    return '';
  }
}

// Helper functions
function resolveValue(value: any, params: Record<string, any>): any {
  if (typeof value === 'number') return value;
  if (typeof value !== 'string') return value;

  // Check if it's a parameter reference like "params.x" or "{{params.x}}"
  const paramMatch = value.match(/^\{\{(.+)\}\}$/) || value.match(/^(.+)$/);
  if (!paramMatch) return value;

  const expr = paramMatch[1];
  const parts = expr.split('.');
  let current = params;

  for (const part of parts) {
    if (current === null || current === undefined) return value;
    current = current[part];
  }

  return current !== undefined ? current : value;
}

function resolvePoint(point: any, params: Record<string, any>): { x: number; y: number } {
  return {
    x: Number(resolveValue(point.x, params)) || 0,
    y: Number(resolveValue(point.y, params)) || 0,
  };
}

function styleToString(style: Record<string, any>): string {
  const attrs: string[] = [];
  if (style.stroke) attrs.push(`stroke="${style.stroke}"`);
  if (style.strokeWidth) attrs.push(`stroke-width="${style.strokeWidth}"`);
  if (style.fill) attrs.push(`fill="${style.fill}"`);
  if (style.fontSize) attrs.push(`font-size="${style.fontSize}"`);
  if (style.fontFamily) attrs.push(`font-family="${style.fontFamily}"`);
  if (style.opacity) attrs.push(`opacity="${style.opacity}"`);
  return attrs.join(' ');
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, char => map[char]);
}

// Shape renderers
function renderLine(id: string, props: any, params: Record<string, any>): string {
  const from = resolvePoint(props.from, params);
  const to = resolvePoint(props.to, params);
  const style = styleToString(props.style || { stroke: '#000', strokeWidth: 2 });
  return `<line id="${id}" x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" ${style} />`;
}

function renderPolyline(id: string, props: any, params: Record<string, any>): string {
  const points = props.points.map((p: any) => resolvePoint(p, params));
  const pointsStr = points.map((p: any) => `${p.x},${p.y}`).join(' ');
  const style = styleToString(props.style || { stroke: '#000', fill: 'none' });
  return `<polyline id="${id}" points="${pointsStr}" ${style} />`;
}

function renderPolygon(id: string, props: any, params: Record<string, any>): string {
  const points = props.points.map((p: any) => resolvePoint(p, params));
  const pointsStr = points.map((p: any) => `${p.x},${p.y}`).join(' ');
  const style = styleToString(props.style || { stroke: '#000', fill: 'none' });
  return `<polygon id="${id}" points="${pointsStr}" ${style} />`;
}

function renderRect(id: string, props: any, params: Record<string, any>): string {
  const x = Number(resolveValue(props.x, params)) || 0;
  const y = Number(resolveValue(props.y, params)) || 0;
  const width = Number(resolveValue(props.width, params)) || 0;
  const height = Number(resolveValue(props.height, params)) || 0;
  const rx = Number(resolveValue(props.rx, params)) || 0;
  const style = styleToString(props.style || { stroke: '#000', fill: 'none' });
  return `<rect id="${id}" x="${x}" y="${y}" width="${width}" height="${height}" rx="${rx}" ${style} />`;
}

function renderCircle(id: string, props: any, params: Record<string, any>): string {
  const cx = Number(resolveValue(props.cx, params)) || 0;
  const cy = Number(resolveValue(props.cy, params)) || 0;
  const r = Number(resolveValue(props.r, params)) || 0;
  const style = styleToString(props.style || { stroke: '#000', fill: 'none' });
  return `<circle id="${id}" cx="${cx}" cy="${cy}" r="${r}" ${style} />`;
}

function renderEllipse(id: string, props: any, params: Record<string, any>): string {
  const cx = Number(resolveValue(props.cx, params)) || 0;
  const cy = Number(resolveValue(props.cy, params)) || 0;
  const rx = Number(resolveValue(props.rx, params)) || 0;
  const ry = Number(resolveValue(props.ry, params)) || 0;
  const style = styleToString(props.style || { stroke: '#000', fill: 'none' });
  return `<ellipse id="${id}" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" ${style} />`;
}

function renderText(id: string, props: any, params: Record<string, any>): string {
  const text = String(resolveValue(props.text, params)) || '';
  const at = resolvePoint(props.at, params);
  const offset = props.offset || { dx: 0, dy: 0 };
  const dx = Number(resolveValue(offset.dx, params)) || 0;
  const dy = Number(resolveValue(offset.dy, params)) || 0;
  const style = styleToString(props.style || { fontSize: 16, fill: '#000' });
  return `<text id="${id}" x="${at.x + dx}" y="${at.y + dy}" ${style}>${escapeHtml(text)}</text>`;
}

function renderArrow(id: string, props: any, params: Record<string, any>): string {
  const from = resolvePoint(props.from, params);
  const to = resolvePoint(props.to, params);
  const headSize = Number(resolveValue(props.headSize, params)) || 10;
  const style = styleToString(props.style || { stroke: '#000', strokeWidth: 2 });

  const angle = Math.atan2(to.y - from.y, to.x - from.x);
  const headPoints = [
    { x: to.x - headSize * Math.cos(angle - Math.PI / 6), y: to.y - headSize * Math.sin(angle - Math.PI / 6) },
    { x: to.x, y: to.y },
    { x: to.x - headSize * Math.cos(angle + Math.PI / 6), y: to.y - headSize * Math.sin(angle + Math.PI / 6) },
  ];

  const line = `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" ${style} />`;
  const head = `<polygon points="${headPoints.map(p => `${p.x},${p.y}`).join(' ')}" ${style} />`;

  return `<g id="${id}">${line}${head}</g>`;
}

function renderArc(id: string, props: any, params: Record<string, any>): string {
  const center = resolvePoint(props.center, params);
  const radius = Number(resolveValue(props.radius, params)) || 0;
  const startAngle = Number(resolveValue(props.startAngle, params)) || 0;
  const endAngle = Number(resolveValue(props.endAngle, params)) || 0;
  const style = styleToString(props.style || { stroke: '#000', fill: 'none' });

  const start = {
    x: center.x + radius * Math.cos((startAngle * Math.PI) / 180),
    y: center.y + radius * Math.sin((startAngle * Math.PI) / 180),
  };
  const end = {
    x: center.x + radius * Math.cos((endAngle * Math.PI) / 180),
    y: center.y + radius * Math.sin((endAngle * Math.PI) / 180),
  };

  const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
  const d = `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;

  return `<path id="${id}" d="${d}" ${style} />`;
}

function renderAngleMarker(id: string, props: any, params: Record<string, any>): string {
  const vertex = resolvePoint(props.vertex, params);
  const arm1 = resolvePoint(props.arm1, params);
  const arm2 = resolvePoint(props.arm2, params);
  const radius = Number(resolveValue(props.radius, params)) || 20;
  const labelText = String(resolveValue(props.labelText, params)) || '';
  const style = styleToString(props.style || { stroke: '#000', fill: 'none' });

  const angle1 = Math.atan2(arm1.y - vertex.y, arm1.x - vertex.x);
  const angle2 = Math.atan2(arm2.y - vertex.y, arm2.x - vertex.x);
  const midAngle = (angle1 + angle2) / 2;

  const arcStart = {
    x: vertex.x + radius * Math.cos(angle1),
    y: vertex.y + radius * Math.sin(angle1),
  };
  const arcEnd = {
    x: vertex.x + radius * Math.cos(angle2),
    y: vertex.y + radius * Math.sin(angle2),
  };

  const largeArc = Math.abs(angle2 - angle1) > Math.PI ? 1 : 0;
  const d = `M ${arcStart.x} ${arcStart.y} A ${radius} ${radius} 0 ${largeArc} 1 ${arcEnd.x} ${arcEnd.y}`;

  const arc = `<path d="${d}" ${style} />`;
  const label = labelText ? `<text x="${vertex.x + (radius + 15) * Math.cos(midAngle)}" y="${vertex.y + (radius + 15) * Math.sin(midAngle)}" text-anchor="middle" ${style}>${escapeHtml(labelText)}</text>` : '';

  return `<g id="${id}">${arc}${label}</g>`;
}

function renderTickMark(id: string, props: any, params: Record<string, any>): string {
  const at = resolvePoint(props.at, params);
  const direction = Number(resolveValue(props.direction, params)) || 0;
  const length = Number(resolveValue(props.length, params)) || 10;
  const style = styleToString(props.style || { stroke: '#000', strokeWidth: 1 });

  const dx = length * Math.cos((direction * Math.PI) / 180);
  const dy = length * Math.sin((direction * Math.PI) / 180);

  return `<line id="${id}" x1="${at.x}" y1="${at.y}" x2="${at.x + dx}" y2="${at.y + dy}" ${style} />`;
}

function renderGrid(id: string, props: any, params: Record<string, any>): string {
  const xStep = Number(resolveValue(props.xStep, params)) || 10;
  const yStep = Number(resolveValue(props.yStep, params)) || 10;
  const bounds = props.bounds || { x: 0, y: 0, width: 800, height: 500 };
  const style = styleToString(props.style || { stroke: '#ddd', strokeWidth: 0.5 });

  const lines: string[] = [];

  for (let x = bounds.x; x <= bounds.x + bounds.width; x += xStep) {
    lines.push(`<line x1="${x}" y1="${bounds.y}" x2="${x}" y2="${bounds.y + bounds.height}" ${style} />`);
  }

  for (let y = bounds.y; y <= bounds.y + bounds.height; y += yStep) {
    lines.push(`<line x1="${bounds.x}" y1="${y}" x2="${bounds.x + bounds.width}" y2="${y}" ${style} />`);
  }

  return `<g id="${id}">${lines.join('')}</g>`;
}

function renderAxes(id: string, props: any, params: Record<string, any>): string {
  const origin = resolvePoint(props.origin, params);
  const xMax = Number(resolveValue(props.xMax, params)) || 100;
  const yMax = Number(resolveValue(props.yMax, params)) || 100;
  const style = styleToString(props.style || { stroke: '#000', strokeWidth: 2 });

  const xAxis = `<line x1="${origin.x}" y1="${origin.y}" x2="${origin.x + xMax}" y2="${origin.y}" ${style} />`;
  const yAxis = `<line x1="${origin.x}" y1="${origin.y}" x2="${origin.x}" y2="${origin.y - yMax}" ${style} />`;

  return `<g id="${id}">${xAxis}${yAxis}</g>`;
}
