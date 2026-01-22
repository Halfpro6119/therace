/**
 * Blueprint Renderer Engine
 * 
 * Renders custom diagram templates defined in database blueprints.
 * Supports parameter resolution, expression evaluation, and shape primitives.
 */

export interface Point {
  x: number | string;
  y: number | string;
}

export interface Style {
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  fontSize?: number;
  fontFamily?: string;
  [key: string]: any;
}

export interface ShapeItem {
  id: string;
  type: string;
  [key: string]: any;
}

export interface Layer {
  id: string;
  z: number;
  items: ShapeItem[];
}

export interface Blueprint {
  version: number;
  viewBox: string;
  layers: Layer[];
}

/**
 * Expression resolver - safely evaluates {{path.to.value}} expressions
 */
export class ExpressionResolver {
  private params: Record<string, any>;
  private helpers: Record<string, Function>;

  constructor(params: Record<string, any>) {
    this.params = params;
    this.helpers = {
      degToRad: (deg: number) => (deg * Math.PI) / 180,
      radToDeg: (rad: number) => (rad * 180) / Math.PI,
      midpoint: (p1: Point, p2: Point) => ({
        x: (this.resolveValue(p1.x) + this.resolveValue(p2.x)) / 2,
        y: (this.resolveValue(p1.y) + this.resolveValue(p2.y)) / 2,
      }),
      distance: (p1: Point, p2: Point) => {
        const x1 = this.resolveValue(p1.x);
        const y1 = this.resolveValue(p1.y);
        const x2 = this.resolveValue(p2.x);
        const y2 = this.resolveValue(p2.y);
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
      },
      clamp: (x: number, min: number, max: number) => Math.max(min, Math.min(max, x)),
      add: (a: number, b: number) => a + b,
      sub: (a: number, b: number) => a - b,
      mul: (a: number, b: number) => a * b,
      div: (a: number, b: number) => (b !== 0 ? a / b : 0),
    };
  }

  /**
   * Resolve a value - can be a number, string, or {{expression}}
   */
  resolveValue(value: any): any {
    if (typeof value === 'number') return value;
    if (typeof value !== 'string') return value;

    // Check if it's an expression
    const match = value.match(/^\{\{(.+)\}\}$/);
    if (!match) return value;

    const expr = match[1];
    return this.evaluateExpression(expr);
  }

  /**
   * Evaluate an expression like "points.A.x" or "degToRad(45)"
   */
  private evaluateExpression(expr: string): any {
    try {
      // Check if it's a function call
      const funcMatch = expr.match(/^(\w+)\((.*)\)$/);
      if (funcMatch) {
        const [, funcName, argsStr] = funcMatch;
        const helper = this.helpers[funcName];
        if (!helper) {
          console.warn(`Unknown helper function: ${funcName}`);
          return null;
        }

        // Parse arguments
        const args = argsStr.split(',').map(arg => {
          const trimmed = arg.trim();
          // Recursively resolve arguments
          return this.resolveValue(trimmed);
        });

        return helper(...args);
      }

      // Otherwise it's a path like "points.A.x"
      const parts = expr.split('.');
      let current = this.params;

      for (const part of parts) {
        if (current === null || current === undefined) {
          console.warn(`Cannot resolve path: ${expr}`);
          return null;
        }
        current = current[part];
      }

      return current;
    } catch (error) {
      console.warn(`Error evaluating expression: ${expr}`, error);
      return null;
    }
  }

  /**
   * Resolve a point object with {{expressions}}
   */
  resolvePoint(point: Point): { x: number; y: number } {
    return {
      x: Number(this.resolveValue(point.x)) || 0,
      y: Number(this.resolveValue(point.y)) || 0,
    };
  }

  /**
   * Resolve style object with {{expressions}}
   */
  resolveStyle(style: Style): Style {
    const resolved: Style = {};
    for (const [key, value] of Object.entries(style)) {
      resolved[key] = this.resolveValue(value);
    }
    return resolved;
  }
}

/**
 * Blueprint Renderer - converts blueprint + params to SVG
 */
export class BlueprintRenderer {
  private blueprint: Blueprint;
  private params: Record<string, any>;
  private resolver: ExpressionResolver;

  constructor(blueprint: Blueprint, params: Record<string, any>) {
    this.blueprint = blueprint;
    this.params = params;
    this.resolver = new ExpressionResolver(params);
  }

  /**
   * Render blueprint to SVG string
   */
  render(): string {
    const { viewBox, layers } = this.blueprint;

    // Sort layers by z-index
    const sortedLayers = [...layers].sort((a, b) => a.z - b.z);

    const svgContent = sortedLayers
      .map(layer => this.renderLayer(layer))
      .join('\n');

    return `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">${svgContent}</svg>`;
  }

  /**
   * Render a single layer
   */
  private renderLayer(layer: Layer): string {
    const items = layer.items.map(item => this.renderShape(item)).join('\n');
    return `<g id="${layer.id}">${items}</g>`;
  }

  /**
   * Render a single shape
   */
  private renderShape(shape: ShapeItem): string {
    const { type, id, ...props } = shape;

    try {
      switch (type) {
        case 'line':
          return this.renderLine(id, props);
        case 'polyline':
          return this.renderPolyline(id, props);
        case 'polygon':
          return this.renderPolygon(id, props);
        case 'rect':
          return this.renderRect(id, props);
        case 'circle':
          return this.renderCircle(id, props);
        case 'ellipse':
          return this.renderEllipse(id, props);
        case 'text':
          return this.renderText(id, props);
        case 'arrow':
          return this.renderArrow(id, props);
        case 'arc':
          return this.renderArc(id, props);
        case 'angleMarker':
          return this.renderAngleMarker(id, props);
        case 'tickMark':
          return this.renderTickMark(id, props);
        case 'grid':
          return this.renderGrid(id, props);
        case 'axes':
          return this.renderAxes(id, props);
        default:
          console.warn(`Unknown shape type: ${type}`);
          return '';
      }
    } catch (error) {
      console.warn(`Error rendering shape ${id}:`, error);
      return '';
    }
  }

  private renderLine(id: string, props: any): string {
    const from = this.resolver.resolvePoint(props.from);
    const to = this.resolver.resolvePoint(props.to);
    const style = this.resolver.resolveStyle(props.style || {});
    const styleStr = this.styleToString(style);

    return `<line id="${id}" x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" ${styleStr} />`;
  }

  private renderPolyline(id: string, props: any): string {
    const points = props.points.map((p: Point) => this.resolver.resolvePoint(p));
    const pointsStr = points.map((p: any) => `${p.x},${p.y}`).join(' ');
    const style = this.resolver.resolveStyle(props.style || {});
    const styleStr = this.styleToString(style);

    return `<polyline id="${id}" points="${pointsStr}" ${styleStr} />`;
  }

  private renderPolygon(id: string, props: any): string {
    const points = props.points.map((p: Point) => this.resolver.resolvePoint(p));
    const pointsStr = points.map((p: any) => `${p.x},${p.y}`).join(' ');
    const style = this.resolver.resolveStyle(props.style || {});
    const styleStr = this.styleToString(style);

    return `<polygon id="${id}" points="${pointsStr}" ${styleStr} />`;
  }

  private renderRect(id: string, props: any): string {
    const x = Number(this.resolver.resolveValue(props.x)) || 0;
    const y = Number(this.resolver.resolveValue(props.y)) || 0;
    const width = Number(this.resolver.resolveValue(props.width)) || 0;
    const height = Number(this.resolver.resolveValue(props.height)) || 0;
    const rx = Number(this.resolver.resolveValue(props.rx)) || 0;
    const style = this.resolver.resolveStyle(props.style || {});
    const styleStr = this.styleToString(style);

    return `<rect id="${id}" x="${x}" y="${y}" width="${width}" height="${height}" rx="${rx}" ${styleStr} />`;
  }

  private renderCircle(id: string, props: any): string {
    const cx = Number(this.resolver.resolveValue(props.cx)) || 0;
    const cy = Number(this.resolver.resolveValue(props.cy)) || 0;
    const r = Number(this.resolver.resolveValue(props.r)) || 0;
    const style = this.resolver.resolveStyle(props.style || {});
    const styleStr = this.styleToString(style);

    return `<circle id="${id}" cx="${cx}" cy="${cy}" r="${r}" ${styleStr} />`;
  }

  private renderEllipse(id: string, props: any): string {
    const cx = Number(this.resolver.resolveValue(props.cx)) || 0;
    const cy = Number(this.resolver.resolveValue(props.cy)) || 0;
    const rx = Number(this.resolver.resolveValue(props.rx)) || 0;
    const ry = Number(this.resolver.resolveValue(props.ry)) || 0;
    const style = this.resolver.resolveStyle(props.style || {});
    const styleStr = this.styleToString(style);

    return `<ellipse id="${id}" cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" ${styleStr} />`;
  }

  private renderText(id: string, props: any): string {
    const text = String(this.resolver.resolveValue(props.text)) || '';
    const at = this.resolver.resolvePoint(props.at);
    const offset = props.offset || { dx: 0, dy: 0 };
    const dx = Number(this.resolver.resolveValue(offset.dx)) || 0;
    const dy = Number(this.resolver.resolveValue(offset.dy)) || 0;
    const style = this.resolver.resolveStyle(props.style || {});
    const styleStr = this.styleToString(style);

    return `<text id="${id}" x="${at.x + dx}" y="${at.y + dy}" ${styleStr}>${this.escapeHtml(text)}</text>`;
  }

  private renderArrow(id: string, props: any): string {
    const from = this.resolver.resolvePoint(props.from);
    const to = this.resolver.resolvePoint(props.to);
    const headSize = Number(this.resolver.resolveValue(props.headSize)) || 10;
    const style = this.resolver.resolveStyle(props.style || {});
    const styleStr = this.styleToString(style);

    // Calculate arrow head
    const angle = Math.atan2(to.y - from.y, to.x - from.x);
    const headPoints = [
      { x: to.x - headSize * Math.cos(angle - Math.PI / 6), y: to.y - headSize * Math.sin(angle - Math.PI / 6) },
      { x: to.x, y: to.y },
      { x: to.x - headSize * Math.cos(angle + Math.PI / 6), y: to.y - headSize * Math.sin(angle + Math.PI / 6) },
    ];

    const line = `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" ${styleStr} />`;
    const head = `<polygon points="${headPoints.map(p => `${p.x},${p.y}`).join(' ')}" ${styleStr} />`;

    return `<g id="${id}">${line}${head}</g>`;
  }

  private renderArc(id: string, props: any): string {
    const center = this.resolver.resolvePoint(props.center);
    const radius = Number(this.resolver.resolveValue(props.radius)) || 0;
    const startAngle = Number(this.resolver.resolveValue(props.startAngle)) || 0;
    const endAngle = Number(this.resolver.resolveValue(props.endAngle)) || 0;
    const style = this.resolver.resolveStyle(props.style || {});
    const styleStr = this.styleToString(style);

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

    return `<path id="${id}" d="${d}" ${styleStr} />`;
  }

  private renderAngleMarker(id: string, props: any): string {
    const vertex = this.resolver.resolvePoint(props.vertex);
    const arm1 = this.resolver.resolvePoint(props.arm1);
    const arm2 = this.resolver.resolvePoint(props.arm2);
    const radius = Number(this.resolver.resolveValue(props.radius)) || 20;
    const labelText = String(this.resolver.resolveValue(props.labelText)) || '';
    const style = this.resolver.resolveStyle(props.style || {});
    const styleStr = this.styleToString(style);

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

    const labelX = vertex.x + (radius + 15) * Math.cos(midAngle);
    const labelY = vertex.y + (radius + 15) * Math.sin(midAngle);

    const arc = `<path d="${d}" ${styleStr} />`;
    const label = labelText ? `<text x="${labelX}" y="${labelY}" text-anchor="middle" ${styleStr}>${this.escapeHtml(labelText)}</text>` : '';

    return `<g id="${id}">${arc}${label}</g>`;
  }

  private renderTickMark(id: string, props: any): string {
    const at = this.resolver.resolvePoint(props.at);
    const direction = Number(this.resolver.resolveValue(props.direction)) || 0;
    const length = Number(this.resolver.resolveValue(props.length)) || 10;
    const style = this.resolver.resolveStyle(props.style || {});
    const styleStr = this.styleToString(style);

    const dx = length * Math.cos((direction * Math.PI) / 180);
    const dy = length * Math.sin((direction * Math.PI) / 180);

    return `<line id="${id}" x1="${at.x}" y1="${at.y}" x2="${at.x + dx}" y2="${at.y + dy}" ${styleStr} />`;
  }

  private renderGrid(id: string, props: any): string {
    const xStep = Number(this.resolver.resolveValue(props.xStep)) || 10;
    const yStep = Number(this.resolver.resolveValue(props.yStep)) || 10;
    const bounds = props.bounds || { x: 0, y: 0, width: 800, height: 500 };
    const style = this.resolver.resolveStyle(props.style || { stroke: '#ddd', strokeWidth: 0.5 });
    const styleStr = this.styleToString(style);

    const lines: string[] = [];

    // Vertical lines
    for (let x = bounds.x; x <= bounds.x + bounds.width; x += xStep) {
      lines.push(`<line x1="${x}" y1="${bounds.y}" x2="${x}" y2="${bounds.y + bounds.height}" ${styleStr} />`);
    }

    // Horizontal lines
    for (let y = bounds.y; y <= bounds.y + bounds.height; y += yStep) {
      lines.push(`<line x1="${bounds.x}" y1="${y}" x2="${bounds.x + bounds.width}" y2="${y}" ${styleStr} />`);
    }

    return `<g id="${id}">${lines.join('')}</g>`;
  }

  private renderAxes(id: string, props: any): string {
    const origin = this.resolver.resolvePoint(props.origin);
    const xMax = Number(this.resolver.resolveValue(props.xMax)) || 100;
    const yMax = Number(this.resolver.resolveValue(props.yMax)) || 100;
    const style = this.resolver.resolveStyle(props.style || { stroke: '#000', strokeWidth: 2 });
    const styleStr = this.styleToString(style);

    const xAxis = `<line x1="${origin.x}" y1="${origin.y}" x2="${origin.x + xMax}" y2="${origin.y}" ${styleStr} />`;
    const yAxis = `<line x1="${origin.x}" y1="${origin.y}" x2="${origin.x}" y2="${origin.y - yMax}" ${styleStr} />`;

    return `<g id="${id}">${xAxis}${yAxis}</g>`;
  }

  /**
   * Convert style object to SVG style string
   */
  private styleToString(style: Style): string {
    const attrs: string[] = [];

    if (style.stroke) attrs.push(`stroke="${style.stroke}"`);
    if (style.strokeWidth) attrs.push(`stroke-width="${style.strokeWidth}"`);
    if (style.fill) attrs.push(`fill="${style.fill}"`);
    if (style.fontSize) attrs.push(`font-size="${style.fontSize}"`);
    if (style.fontFamily) attrs.push(`font-family="${style.fontFamily}"`);

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
}
