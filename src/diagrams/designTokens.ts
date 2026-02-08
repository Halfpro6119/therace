/**
 * Shared design tokens for diagram templates (DIAGRAM_DESIGN_AUDIT).
 * Use these so all maths diagrams share a consistent, professional look.
 */

export const diagramTokens = {
  /** Structure lines: edges, axes, construction. Stroke 1.5–2px */
  structureStroke: '#64748b',
  structureStrokeWidth: 2,

  /** Vertex points: fill for circles at A, B, C */
  vertexFill: '#64748b',

  /** Vertex labels (A, B, C): 18px bold. Use vertexLabelFill in templates. */
  vertexLabelFontSize: 18,
  vertexLabelFontWeight: 'bold',
  vertexLabelFill: '#e2e8f0',

  /** Side lengths / measures: 15–16px regular */
  sideLabelFontSize: 15,
  sideLabelFontWeight: 'normal',
  sideLabelFill: '#94a3b8',

  /** Angle labels (e.g. "50°"): 15px medium */
  angleLabelFontSize: 15,
  angleLabelFontWeight: '500',
  angleLabelFill: '#dc2626',

  /** Angle arcs: same as angle color, 1–1.5px */
  angleArcStroke: '#dc2626',
  angleArcStrokeWidth: 1.5,

  /** Right-angle mark: small square at 90° */
  rightAngleStroke: '#64748b',
  rightAngleStrokeWidth: 1.5,

  /** Equal-side ticks (isosceles, etc.) */
  equalMarkStroke: '#64748b',
  equalMarkStrokeWidth: 1.5,

  /** Font stack used in all diagram text */
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
} as const;

/** Build a CSS block for diagram styles using tokens (for inline <style> in SVG). */
export function diagramStyleBlock(overrides: Record<string, string> = {}): string {
  const t = diagramTokens;
  const base = `
    .diagram-line, .diagram-triangle { fill: none; stroke: ${t.structureStroke}; stroke-width: ${t.structureStrokeWidth}; }
    .diagram-point { fill: ${t.vertexFill}; }
    .diagram-text { font-family: ${t.fontFamily}; font-size: ${t.vertexLabelFontSize}px; font-weight: ${t.vertexLabelFontWeight}; fill: ${t.vertexLabelFill}; }
    .diagram-text-side { font-family: ${t.fontFamily}; font-size: ${t.sideLabelFontSize}px; font-weight: ${t.sideLabelFontWeight}; fill: ${t.sideLabelFill}; text-anchor: middle; letter-spacing: 0.02em; }
    .diagram-text-angle { font-family: ${t.fontFamily}; font-size: ${t.angleLabelFontSize}px; font-weight: ${t.angleLabelFontWeight}; fill: ${t.angleLabelFill}; }
    .diagram-arc { stroke: ${t.angleArcStroke}; stroke-width: ${t.angleArcStrokeWidth}; fill: none; }
    .diagram-right-angle { stroke: ${t.rightAngleStroke}; stroke-width: ${t.rightAngleStrokeWidth}; fill: none; }
    .diagram-equal-mark { stroke: ${t.equalMarkStroke}; stroke-width: ${t.equalMarkStrokeWidth}; }
  `.replace(/\n\s+/g, '\n').trim();
  const extra = Object.entries(overrides).map(([k, v]) => `.${k} { ${v} }`).join('\n');
  return extra ? `${base}\n    ${extra}` : base;
}

/**
 * SVG path "d" for an angle arc at vertex (vx,vy) between directions to (p1x,p1y) and (p2x,p2y), with given radius.
 * Uses the smaller (interior) arc. SVG y is down.
 */
export function angleArcPath(
  vx: number,
  vy: number,
  p1x: number,
  p1y: number,
  p2x: number,
  p2y: number,
  radius: number
): string {
  const a1 = Math.atan2(p1y - vy, p1x - vx);
  const a2 = Math.atan2(p2y - vy, p2x - vx);
  let diff = a2 - a1;
  if (diff > Math.PI) diff -= 2 * Math.PI;
  if (diff < -Math.PI) diff += 2 * Math.PI;
  const largeArc = Math.abs(diff) > Math.PI ? 1 : 0;
  const sweep = diff >= 0 ? 1 : 0;
  const startX = vx + radius * Math.cos(a1);
  const startY = vy + radius * Math.sin(a1);
  const endX = vx + radius * Math.cos(a2);
  const endY = vy + radius * Math.sin(a2);
  return `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArc} ${sweep} ${endX} ${endY}`;
}
