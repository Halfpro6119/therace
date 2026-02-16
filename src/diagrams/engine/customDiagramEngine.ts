/**
 * Custom Diagram Engine
 * 
 * Renders fully custom diagrams from metadata without requiring templates.
 * Supports shape primitives and reference resolution (@points.A, @labels.B, etc.)
 */

export interface Point {
  x: number;
  y: number;
}

export interface CustomDiagramDefs {
  points?: Record<string, Point>;
  labels?: Record<string, string>;
  values?: Record<string, string | number>;
}

export interface ShapeStyle {
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  fontSize?: number;
  fontWeight?: string | number;
  fontFamily?: string;
  dashArray?: string;
  opacity?: number;
  textAnchor?: 'start' | 'middle' | 'end';
}

export interface ShapeItem {
  type: string;
  [key: string]: any;
}

export interface CustomDiagramLayer {
  id: string;
  items: ShapeItem[];
}

export interface CustomDiagramBlueprint {
  version: number;
  size?: { width: number; height: number };
  viewBox?: string;
  background?: { grid?: boolean; axes?: boolean };
  defs?: CustomDiagramDefs;
  layers: CustomDiagramLayer[];
}

/**
 * Reference resolver - resolves @points.A, @labels.B, @values.x, etc.
 */
class ReferenceResolver {
  private defs: CustomDiagramDefs;

  constructor(defs: CustomDiagramDefs = {}) {
    this.defs = defs;
  }

  /**
   * Resolve a reference like "@points.A" or "@labels.B"
   */
  resolve(ref: any): any {
    if (typeof ref !== 'string') return ref;
    if (!ref.startsWith('@')) return ref;

    const parts = ref.substring(1).split('.');
    if (parts.length < 2) return ref;

    const [category, ...path] = parts;
    let current = (this.defs as any)[category];

    for (const part of path) {
      if (current === null || current === undefined) return ref;
      current = current[part];
    }

    return current !== undefined ? current : ref;
  }

  /**
   * Resolve a point reference or direction vector
   * "@points.A" => { x, y }
   * "@points.C->@points.A" => direction vector from C to A
   */
  resolvePoint(ref: any): Point {
    if (typeof ref === 'object' && ref !== null && 'x' in ref && 'y' in ref) {
      return { x: Number(ref.x) || 0, y: Number(ref.y) || 0 };
    }

    if (typeof ref !== 'string') return { x: 0, y: 0 };

    // Check for direction vector syntax: "@points.C->@points.A"
    if (ref.includes('->')) {
      const [fromRef, toRef] = ref.split('->');
      const from = this.resolvePoint(fromRef);
      const to = this.resolvePoint(toRef);
      return {
        x: to.x - from.x,
        y: to.y - from.y,
      };
    }

    const resolved = this.resolve(ref);
    if (typeof resolved === 'object' && resolved !== null && 'x' in resolved && 'y' in resolved) {
      return { x: Number(resolved.x) || 0, y: Number(resolved.y) || 0 };
    }

    return { x: 0, y: 0 };
  }

  /**
   * Resolve a string that may contain references
   */
  resolveString(str: any): string {
    if (typeof str !== 'string') return String(str || '');
    return this.resolve(str) || str;
  }
}

/**
 * Custom Diagram Engine - renders SVG from metadata blueprint
 */
export class CustomDiagramEngine {
  private blueprint: CustomDiagramBlueprint;
  private resolver: ReferenceResolver;
  private warnings: string[] = [];

  constructor(blueprint: CustomDiagramBlueprint) {
    this.blueprint = blueprint;
    this.resolver = new ReferenceResolver(blueprint.defs);
  }

  /**
   * Render blueprint to SVG string
   */
  render(): string {
    try {
      const size = this.blueprint.size || { width: 800, height: 500 };
      const viewBox = this.blueprint.viewBox || `0 0 ${size.width} ${size.height}`;

      const layersHtml = this.blueprint.layers
        .map(layer => this.renderLayer(layer))
        .join('\n');

      return `
        <svg 
          viewBox="${viewBox}" 
          width="${size.width}" 
          height="${size.height}" 
          xmlns="http://www.w3.org/2000/svg"
          style="background-color: transparent;"
        >
          ${layersHtml}
        </svg>
      `.trim();
    } catch (error) {
      console.warn('Error rendering custom diagram:', error);
      this.warnings.push(`Render error: ${error}`);
      return this.renderFallback();
    }
  }

  /**
   * Get warnings (admin only)
   */
  getWarnings(): string[] {
    return this.warnings;
  }

  /**
   * Render a single layer
   */
  private renderLayer(layer: CustomDiagramLayer): string {
    const items = layer.items
      .map(item => this.renderShape(item))
      .filter(Boolean)
      .join('\n');

    return `<g id="${layer.id}">${items}</g>`;
  }

  /**
   * Render a single shape
   */
  private renderShape(shape: ShapeItem): string {
    const { type, ...props } = shape;

    try {
      switch (type) {
        case 'line':
          return this.renderLine(props);
        case 'polyline':
          return this.renderPolyline(props);
        case 'polygon':
          return this.renderPolygon(props);
        case 'rect':
          return this.renderRect(props);
        case 'circle':
          return this.renderCircle(props);
        case 'ellipse':
          return this.renderEllipse(props);
        case 'point':
          return this.renderPoint(props);
        case 'text':
          return this.renderText(props);
        case 'arrow':
          return this.renderArrow(props);
        case 'arc':
          return this.renderArc(props);
        case 'path':
          return this.renderPath(props);
        case 'angleMarker':
          return this.renderAngleMarker(props);
        case 'tickMark':
          return this.renderTickMark(props);
        case 'grid':
          return this.renderGrid(props);
        case 'axes':
          return this.renderAxes(props);
        default:
          this.warnings.push(`Unknown shape type: ${type}`);
          return '';
      }
    } catch (error) {
      this.warnings.push(`Error rendering ${type}: ${error}`);
      return '';
    }
  }

  // Shape renderers
  private renderLine(props: any): string {
    const from = this.resolver.resolvePoint(props.from);
    const to = this.resolver.resolvePoint(props.to);
    const style = this.styleToString(props.style || { stroke: '#000', strokeWidth: 2 });
    return `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" ${style} />`;
  }

  private renderPolyline(props: any): string {
    const points = (props.points || []).map((p: any) => this.resolver.resolvePoint(p));
    const pointsStr = points.map((p: Point) => `${p.x},${p.y}`).join(' ');
    const style = this.styleToString(props.style || { stroke: '#000', fill: 'none' });
    return `<polyline points="${pointsStr}" ${style} />`;
  }

  private renderPolygon(props: any): string {
    const points = (props.points || []).map((p: any) => this.resolver.resolvePoint(p));
    const pointsStr = points.map((p: Point) => `${p.x},${p.y}`).join(' ');
    const style = this.styleToString(props.style || { stroke: '#000', fill: 'none' });
    return `<polygon points="${pointsStr}" ${style} />`;
  }

  private renderRect(props: any): string {
    const x = Number(this.resolver.resolve(props.x)) || 0;
    const y = Number(this.resolver.resolve(props.y)) || 0;
    const width = Number(this.resolver.resolve(props.width)) || 0;
    const height = Number(this.resolver.resolve(props.height)) || 0;
    const rx = Number(this.resolver.resolve(props.rx)) || 0;
    const style = this.styleToString(props.style || { stroke: '#000', fill: 'none' });
    return `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${rx}" ${style} />`;
  }

  private renderCircle(props: any): string {
    const cx = Number(this.resolver.resolve(props.cx)) || 0;
    const cy = Number(this.resolver.resolve(props.cy)) || 0;
    const r = Number(this.resolver.resolve(props.r)) || 0;
    const style = this.styleToString(props.style || { stroke: '#000', fill: 'none' });
    return `<circle cx="${cx}" cy="${cy}" r="${r}" ${style} />`;
  }

  private renderEllipse(props: any): string {
    const cx = Number(this.resolver.resolve(props.cx)) || 0;
    const cy = Number(this.resolver.resolve(props.cy)) || 0;
    const rx = Number(this.resolver.resolve(props.rx)) || 0;
    const ry = Number(this.resolver.resolve(props.ry)) || 0;
    const style = this.styleToString(props.style || { stroke: '#000', fill: 'none' });
    return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" ${style} />`;
  }

  private renderPoint(props: any): string {
    const at = this.resolver.resolvePoint(props.at);
    const r = Number(this.resolver.resolve(props.r)) || 4;
    const label = this.resolver.resolveString(props.label);
    const labelOffset = props.labelOffset || { dx: 0, dy: 0 };
    const style = this.styleToString(props.style || { stroke: '#000', fill: '#000' });

    let svg = `<circle cx="${at.x}" cy="${at.y}" r="${r}" ${style} />`;

    if (label) {
      const dx = Number(this.resolver.resolve(labelOffset.dx)) || 0;
      const dy = Number(this.resolver.resolve(labelOffset.dy)) || 0;
      const labelStyle = this.styleToString(props.labelStyle || { fontSize: 14, fill: '#000' });
      svg += `<text x="${at.x + dx}" y="${at.y + dy}" text-anchor="middle" ${labelStyle}>${this.escapeHtml(label)}</text>`;
    }

    return `<g>${svg}</g>`;
  }

  private renderText(props: any): string {
    const text = this.resolver.resolveString(props.text);
    const at = this.resolver.resolvePoint(props.at);
    const offset = props.offset || { dx: 0, dy: 0 };
    const dx = Number(this.resolver.resolve(offset.dx)) || 0;
    const dy = Number(this.resolver.resolve(offset.dy)) || 0;
    const style = this.styleToString(props.style || { fontSize: 16, fill: '#000' });
    return `<text x="${at.x + dx}" y="${at.y + dy}" ${style}>${this.escapeHtml(text)}</text>`;
  }

  private renderArrow(props: any): string {
    const from = this.resolver.resolvePoint(props.from);
    const to = this.resolver.resolvePoint(props.to);
    const headSize = Number(this.resolver.resolve(props.headSize)) || 10;
    const style = this.styleToString(props.style || { stroke: '#000', strokeWidth: 2 });

    const angle = Math.atan2(to.y - from.y, to.x - from.x);
    const headPoints = [
      { x: to.x - headSize * Math.cos(angle - Math.PI / 6), y: to.y - headSize * Math.sin(angle - Math.PI / 6) },
      { x: to.x, y: to.y },
      { x: to.x - headSize * Math.cos(angle + Math.PI / 6), y: to.y - headSize * Math.sin(angle + Math.PI / 6) },
    ];

    const line = `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" ${style} />`;
    const head = `<polygon points="${headPoints.map(p => `${p.x},${p.y}`).join(' ')}" ${style} />`;

    return `<g>${line}${head}</g>`;
  }

  private renderArc(props: any): string {
    const center = this.resolver.resolvePoint(props.center);
    const radius = Number(this.resolver.resolve(props.radius)) || 0;
    const startAngle = Number(this.resolver.resolve(props.startAngle)) || 0;
    const endAngle = Number(this.resolver.resolve(props.endAngle)) || 0;
    const style = this.styleToString(props.style || { stroke: '#000', fill: 'none' });

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

    return `<path d="${d}" ${style} />`;
  }

  private renderPath(props: any): string {
    const d = this.resolver.resolveString(props.d) || '';
    const style = this.styleToString(props.style || { stroke: '#000', fill: 'none' });
    return `<path d="${d}" ${style} />`;
  }

  private renderAngleMarker(props: any): string {
    const vertex = this.resolver.resolvePoint(props.vertex);
    const arm1 = this.resolver.resolvePoint(props.arm1);
    const arm2 = this.resolver.resolvePoint(props.arm2);
    const radius = Number(this.resolver.resolve(props.radius)) || 20;
    const text = this.resolver.resolveString(props.text);
    const style = this.styleToString(props.style || { stroke: '#000', fill: 'none' });

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
    const label = text ? `<text x="${vertex.x + (radius + 15) * Math.cos(midAngle)}" y="${vertex.y + (radius + 15) * Math.sin(midAngle)}" text-anchor="middle" ${style}>${this.escapeHtml(text)}</text>` : '';

    return `<g>${arc}${label}</g>`;
  }

  private renderTickMark(props: any): string {
    const at = this.resolver.resolvePoint(props.at);
    const direction = Number(this.resolver.resolve(props.direction)) || 0;
    const length = Number(this.resolver.resolve(props.length)) || 10;
    const style = this.styleToString(props.style || { stroke: '#000', strokeWidth: 1 });

    const dx = length * Math.cos((direction * Math.PI) / 180);
    const dy = length * Math.sin((direction * Math.PI) / 180);

    return `<line x1="${at.x}" y1="${at.y}" x2="${at.x + dx}" y2="${at.y + dy}" ${style} />`;
  }

  private renderGrid(props: any): string {
    const xStep = Number(this.resolver.resolve(props.xStep)) || 10;
    const yStep = Number(this.resolver.resolve(props.yStep)) || 10;
    const bounds = props.bounds || { x: 0, y: 0, width: 800, height: 500 };
    const style = this.styleToString(props.style || { stroke: '#ddd', strokeWidth: 0.5 });

    const lines: string[] = [];

    for (let x = bounds.x; x <= bounds.x + bounds.width; x += xStep) {
      lines.push(`<line x1="${x}" y1="${bounds.y}" x2="${x}" y2="${bounds.y + bounds.height}" ${style} />`);
    }

    for (let y = bounds.y; y <= bounds.y + bounds.height; y += yStep) {
      lines.push(`<line x1="${bounds.x}" y1="${y}" x2="${bounds.x + bounds.width}" y2="${y}" ${style} />`);
    }

    return `<g>${lines.join('')}</g>`;
  }

  private renderAxes(props: any): string {
    const origin = this.resolver.resolvePoint(props.origin);
    const xMax = Number(this.resolver.resolve(props.xMax)) || 100;
    const yMax = Number(this.resolver.resolve(props.yMax)) || 100;
    const style = this.styleToString(props.style || { stroke: '#000', strokeWidth: 2 });

    const xAxis = `<line x1="${origin.x}" y1="${origin.y}" x2="${origin.x + xMax}" y2="${origin.y}" ${style} />`;
    const yAxis = `<line x1="${origin.x}" y1="${origin.y}" x2="${origin.x}" y2="${origin.y - yMax}" ${style} />`;

    return `<g>${xAxis}${yAxis}</g>`;
  }

  /**
   * Convert style object to SVG attributes
   */
  private styleToString(style: ShapeStyle): string {
    const attrs: string[] = [];
    if (style.stroke) attrs.push(`stroke="${style.stroke}"`);
    if (style.strokeWidth) attrs.push(`stroke-width="${style.strokeWidth}"`);
    if (style.fill) attrs.push(`fill="${style.fill}"`);
    if (style.fontSize) attrs.push(`font-size="${style.fontSize}"`);
    if (style.fontWeight) attrs.push(`font-weight="${style.fontWeight}"`);
    if (style.fontFamily) attrs.push(`font-family="${this.escapeHtml(style.fontFamily)}"`);
    if (style.dashArray) attrs.push(`stroke-dasharray="${style.dashArray}"`);
    if (style.opacity) attrs.push(`opacity="${style.opacity}"`);
    if (style.textAnchor) attrs.push(`text-anchor="${style.textAnchor}"`);
    return attrs.join(' ');
  }

  /**
   * Escape HTML special characters
   */
  private escapeHtml(text: string): string {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, char => map[char]);
  }

  /**
   * Render fallback placeholder
   */
  private renderFallback(): string {
    return `
      <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="380" height="180" fill="#f5f5f5" stroke="#ccc" stroke-width="2" />
        <text x="200" y="110" text-anchor="middle" font-size="14" fill="#999">
          Diagram unavailable
        </text>
      </svg>
    `.trim();
  }
}
