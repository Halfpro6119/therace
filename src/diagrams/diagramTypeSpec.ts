/**
 * Diagram engine — supported diagram types
 *
 * The engine must support these canonical types. Each maps to a template
 * (by templateId) that implements the diagram. Use getTemplateIdForDiagramType()
 * when you have a canonical type name; use getTemplate() with that id to render.
 */

export const DIAGRAM_TYPE_COORDINATE_GRID = 'coordinateGrid';
export const DIAGRAM_TYPE_NUMBER_LINE = 'numberLine';
export const DIAGRAM_TYPE_TRIANGLE = 'triangle';
export const DIAGRAM_TYPE_POLYGON = 'polygon';
export const DIAGRAM_TYPE_CIRCLE = 'circle';
export const DIAGRAM_TYPE_COMPOUND_SHAPE = 'compoundShape';
export const DIAGRAM_TYPE_BAR_CHART = 'barChart';
export const DIAGRAM_TYPE_SCATTER_PLOT = 'scatterPlot';
export const DIAGRAM_TYPE_HISTOGRAM = 'histogram';
export const DIAGRAM_TYPE_BOX_PLOT = 'boxPlot';
export const DIAGRAM_TYPE_BEARING_DIAGRAM = 'bearingDiagram';
export const DIAGRAM_TYPE_VECTOR_DIAGRAM = 'vectorDiagram';
export const DIAGRAM_TYPE_PRE_PLOTTED_GRAPH = 'prePlottedGraph';
export const DIAGRAM_TYPE_CUMULATIVE_FREQUENCY = 'cumulativeFrequency';

/** Canonical diagram type ids the engine supports. */
export type DiagramTypeId =
  | typeof DIAGRAM_TYPE_COORDINATE_GRID
  | typeof DIAGRAM_TYPE_NUMBER_LINE
  | typeof DIAGRAM_TYPE_TRIANGLE
  | typeof DIAGRAM_TYPE_POLYGON
  | typeof DIAGRAM_TYPE_CIRCLE
  | typeof DIAGRAM_TYPE_COMPOUND_SHAPE
  | typeof DIAGRAM_TYPE_BAR_CHART
  | typeof DIAGRAM_TYPE_SCATTER_PLOT
  | typeof DIAGRAM_TYPE_HISTOGRAM
  | typeof DIAGRAM_TYPE_BOX_PLOT
  | typeof DIAGRAM_TYPE_BEARING_DIAGRAM
  | typeof DIAGRAM_TYPE_VECTOR_DIAGRAM
  | typeof DIAGRAM_TYPE_PRE_PLOTTED_GRAPH
  | typeof DIAGRAM_TYPE_CUMULATIVE_FREQUENCY;

/** Map from canonical diagram type to templateId in the engine registry. */
export const DIAGRAM_TYPE_TO_TEMPLATE_ID: Record<DiagramTypeId, string> = {
  [DIAGRAM_TYPE_COORDINATE_GRID]: 'math.graphs.coordinate_point.v1',
  [DIAGRAM_TYPE_NUMBER_LINE]: 'math.algebra.number_line.v1',
  [DIAGRAM_TYPE_TRIANGLE]: 'math.geometry.triangle.v1',
  [DIAGRAM_TYPE_POLYGON]: 'math.polygons.interior_exterior.v1',
  [DIAGRAM_TYPE_CIRCLE]: 'math.circle.basic.v1',
  [DIAGRAM_TYPE_COMPOUND_SHAPE]: 'math.geometry.compound_lshape.v1',
  [DIAGRAM_TYPE_BAR_CHART]: 'math.statistics.bar_chart.v1',
  [DIAGRAM_TYPE_SCATTER_PLOT]: 'math.statistics.scatter_plot.v1',
  [DIAGRAM_TYPE_HISTOGRAM]: 'math.statistics.histogram.v1',
  [DIAGRAM_TYPE_BOX_PLOT]: 'math.statistics.boxplot.v1',
  [DIAGRAM_TYPE_BEARING_DIAGRAM]: 'math.bearings.north_arrow.v1',
  [DIAGRAM_TYPE_VECTOR_DIAGRAM]: 'math.vectors.diagram.v1',
  [DIAGRAM_TYPE_PRE_PLOTTED_GRAPH]: 'math.graphs.pre_plotted.v1',
  [DIAGRAM_TYPE_CUMULATIVE_FREQUENCY]: 'math.statistics.cumulative_frequency.v1',
};

/** All supported diagram type ids in order. */
export const SUPPORTED_DIAGRAM_TYPES: DiagramTypeId[] = [
  DIAGRAM_TYPE_COORDINATE_GRID,
  DIAGRAM_TYPE_NUMBER_LINE,
  DIAGRAM_TYPE_TRIANGLE,
  DIAGRAM_TYPE_POLYGON,
  DIAGRAM_TYPE_CIRCLE,
  DIAGRAM_TYPE_COMPOUND_SHAPE,
  DIAGRAM_TYPE_BAR_CHART,
  DIAGRAM_TYPE_SCATTER_PLOT,
  DIAGRAM_TYPE_HISTOGRAM,
  DIAGRAM_TYPE_BOX_PLOT,
  DIAGRAM_TYPE_BEARING_DIAGRAM,
  DIAGRAM_TYPE_VECTOR_DIAGRAM,
  DIAGRAM_TYPE_PRE_PLOTTED_GRAPH,
  DIAGRAM_TYPE_CUMULATIVE_FREQUENCY,
];

export function getTemplateIdForDiagramType(typeId: DiagramTypeId): string {
  return DIAGRAM_TYPE_TO_TEMPLATE_ID[typeId] ?? typeId;
}

export function isSupportedDiagramType(id: string): id is DiagramTypeId {
  return SUPPORTED_DIAGRAM_TYPES.includes(id as DiagramTypeId);
}
