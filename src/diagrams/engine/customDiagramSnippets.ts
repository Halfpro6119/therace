/**
 * Metadata-Only Diagram Snippets
 * 
 * Pre-built diagram blueprints that can be pasted directly into question metadata.
 * No template creation required - fully self-contained.
 */

import type { CustomDiagramBlueprint } from './customDiagramEngine';

export const DIAGRAM_SNIPPETS = {
  rightTriangle: {
    name: 'Right Triangle (Pythagoras)',
    description: 'Right triangle with labeled sides and right angle marker',
    blueprint: {
      version: 1,
      size: { width: 500, height: 400 },
      viewBox: '0 0 500 400',
      defs: {
        points: {
          A: { x: 100, y: 300 },
          B: { x: 400, y: 300 },
          C: { x: 400, y: 100 },
        },
        labels: {
          A: 'A',
          B: 'B',
          C: 'C',
        },
        values: {
          sideAB: 'c',
          sideBC: 'a',
          sideCA: 'b',
        },
      },
      layers: [
        {
          id: 'triangle',
          items: [
            {
              type: 'line',
              from: '@points.A',
              to: '@points.B',
              style: { stroke: '#000', strokeWidth: 2 },
            },
            {
              type: 'line',
              from: '@points.B',
              to: '@points.C',
              style: { stroke: '#000', strokeWidth: 2 },
            },
            {
              type: 'line',
              from: '@points.C',
              to: '@points.A',
              style: { stroke: '#000', strokeWidth: 2 },
            },
            {
              type: 'point',
              at: '@points.A',
              label: '@labels.A',
              labelOffset: { dx: -15, dy: 15 },
            },
            {
              type: 'point',
              at: '@points.B',
              label: '@labels.B',
              labelOffset: { dx: 15, dy: 15 },
            },
            {
              type: 'point',
              at: '@points.C',
              label: '@labels.C',
              labelOffset: { dx: 15, dy: -10 },
            },
            {
              type: 'rect',
              x: 385,
              y: 285,
              width: 15,
              height: 15,
              style: { stroke: '#000', fill: 'none', strokeWidth: 1 },
            },
            {
              type: 'text',
              text: '@values.sideAB',
              at: { x: 250, y: 330 },
              style: { fontSize: 14, fill: '#000' },
            },
            {
              type: 'text',
              text: '@values.sideBC',
              at: { x: 430, y: 200 },
              style: { fontSize: 14, fill: '#000' },
            },
            {
              type: 'text',
              text: '@values.sideCA',
              at: { x: 220, y: 180 },
              style: { fontSize: 14, fill: '#000' },
            },
          ],
        },
      ],
    } as CustomDiagramBlueprint,
  },

  parallelLines: {
    name: 'Parallel Lines with Transversal',
    description: 'Two parallel lines cut by a transversal with angle markers',
    blueprint: {
      version: 1,
      size: { width: 500, height: 350 },
      viewBox: '0 0 500 350',
      defs: {
        points: {
          A: { x: 50, y: 100 },
          B: { x: 450, y: 100 },
          C: { x: 50, y: 250 },
          D: { x: 450, y: 250 },
          E: { x: 150, y: 50 },
          F: { x: 350, y: 300 },
        },
        labels: {
          angle1: 'a',
          angle2: 'b',
        },
      },
      layers: [
        {
          id: 'lines',
          items: [
            {
              type: 'line',
              from: '@points.A',
              to: '@points.B',
              style: { stroke: '#000', strokeWidth: 2 },
            },
            {
              type: 'line',
              from: '@points.C',
              to: '@points.D',
              style: { stroke: '#000', strokeWidth: 2 },
            },
            {
              type: 'line',
              from: '@points.E',
              to: '@points.F',
              style: { stroke: '#000', strokeWidth: 2 },
            },
            {
              type: 'angleMarker',
              vertex: { x: 200, y: 100 },
              arm1: { x: 250, y: 100 },
              arm2: { x: 200, y: 150 },
              radius: 25,
              text: '@labels.angle1',
              style: { stroke: '#f00', fill: 'none', strokeWidth: 1 },
            },
            {
              type: 'angleMarker',
              vertex: { x: 200, y: 250 },
              arm1: { x: 250, y: 250 },
              arm2: { x: 200, y: 200 },
              radius: 25,
              text: '@labels.angle2',
              style: { stroke: '#f00', fill: 'none', strokeWidth: 1 },
            },
          ],
        },
      ],
    } as CustomDiagramBlueprint,
  },

  circleChord: {
    name: 'Circle with Chord',
    description: 'Circle with diameter, chord, and center point',
    blueprint: {
      version: 1,
      size: { width: 400, height: 400 },
      viewBox: '0 0 400 400',
      defs: {
        points: {
          center: { x: 200, y: 200 },
          A: { x: 100, y: 200 },
          B: { x: 300, y: 200 },
          C: { x: 250, y: 100 },
        },
        labels: {
          center: 'O',
          A: 'A',
          B: 'B',
          C: 'C',
        },
      },
      layers: [
        {
          id: 'circle',
          items: [
            {
              type: 'circle',
              cx: 200,
              cy: 200,
              r: 100,
              style: { stroke: '#000', fill: 'none', strokeWidth: 2 },
            },
            {
              type: 'line',
              from: '@points.A',
              to: '@points.B',
              style: { stroke: '#000', strokeWidth: 2 },
            },
            {
              type: 'line',
              from: '@points.A',
              to: '@points.C',
              style: { stroke: '#000', strokeWidth: 2 },
            },
            {
              type: 'line',
              from: '@points.B',
              to: '@points.C',
              style: { stroke: '#000', strokeWidth: 2 },
            },
            {
              type: 'point',
              at: '@points.center',
              label: '@labels.center',
              labelOffset: { dx: -15, dy: -10 },
            },
            {
              type: 'point',
              at: '@points.A',
              label: '@labels.A',
              labelOffset: { dx: -15, dy: 15 },
            },
            {
              type: 'point',
              at: '@points.B',
              label: '@labels.B',
              labelOffset: { dx: 15, dy: 15 },
            },
            {
              type: 'point',
              at: '@points.C',
              label: '@labels.C',
              labelOffset: { dx: 15, dy: -10 },
            },
          ],
        },
      ],
    } as CustomDiagramBlueprint,
  },

  numberLine: {
    name: 'Number Line with Inequality',
    description: 'Number line with marked points and inequality region',
    blueprint: {
      version: 1,
      size: { width: 500, height: 150 },
      viewBox: '0 0 500 150',
      defs: {
        points: {
          start: { x: 50, y: 75 },
          end: { x: 450, y: 75 },
          mark1: { x: 150, y: 75 },
          mark2: { x: 350, y: 75 },
        },
        labels: {
          mark1: '-2',
          mark2: '3',
        },
      },
      layers: [
        {
          id: 'numberline',
          items: [
            {
              type: 'line',
              from: '@points.start',
              to: '@points.end',
              style: { stroke: '#000', strokeWidth: 2 },
            },
            {
              type: 'tickMark',
              at: '@points.mark1',
              direction: 90,
              length: 10,
              style: { stroke: '#000', strokeWidth: 1 },
            },
            {
              type: 'tickMark',
              at: '@points.mark2',
              direction: 90,
              length: 10,
              style: { stroke: '#000', strokeWidth: 1 },
            },
            {
              type: 'point',
              at: '@points.mark1',
              r: 5,
              style: { stroke: '#f00', fill: '#f00' },
            },
            {
              type: 'point',
              at: '@points.mark2',
              r: 5,
              style: { stroke: '#f00', fill: '#f00' },
            },
            {
              type: 'line',
              from: '@points.mark1',
              to: '@points.mark2',
              style: { stroke: '#f00', strokeWidth: 4, opacity: 0.3 },
            },
            {
              type: 'text',
              text: '@labels.mark1',
              at: '@points.mark1',
              offset: { dx: 0, dy: 25 },
              style: { fontSize: 14, fill: '#000' },
            },
            {
              type: 'text',
              text: '@labels.mark2',
              at: '@points.mark2',
              offset: { dx: 0, dy: 25 },
              style: { fontSize: 14, fill: '#000' },
            },
          ],
        },
      ],
    } as CustomDiagramBlueprint,
  },

  coordinateAxes: {
    name: 'Coordinate Axes with Points',
    description: 'XY coordinate system with two points and connecting line',
    blueprint: {
      version: 1,
      size: { width: 500, height: 500 },
      viewBox: '0 0 500 500',
      defs: {
        points: {
          origin: { x: 50, y: 450 },
          pointA: { x: 150, y: 350 },
          pointB: { x: 350, y: 150 },
        },
        labels: {
          pointA: 'A(2, 2)',
          pointB: 'B(6, 8)',
        },
      },
      layers: [
        {
          id: 'axes',
          items: [
            {
              type: 'axes',
              origin: '@points.origin',
              xMax: 400,
              yMax: 400,
              style: { stroke: '#000', strokeWidth: 2 },
            },
            {
              type: 'grid',
              xStep: 50,
              yStep: 50,
              bounds: { x: 50, y: 50, width: 400, height: 400 },
              style: { stroke: '#ddd', strokeWidth: 0.5 },
            },
            {
              type: 'point',
              at: '@points.pointA',
              r: 5,
              label: '@labels.pointA',
              labelOffset: { dx: 0, dy: -15 },
              style: { stroke: '#f00', fill: '#f00' },
            },
            {
              type: 'point',
              at: '@points.pointB',
              r: 5,
              label: '@labels.pointB',
              labelOffset: { dx: 0, dy: -15 },
              style: { stroke: '#00f', fill: '#00f' },
            },
            {
              type: 'line',
              from: '@points.pointA',
              to: '@points.pointB',
              style: { stroke: '#999', strokeWidth: 1, dashArray: '5,5' },
            },
          ],
        },
      ],
    } as CustomDiagramBlueprint,
  },

  vennTwoSet: {
    name: 'Venn Diagram (2 Sets)',
    description: 'Two-set Venn diagram with labeled regions',
    blueprint: {
      version: 1,
      size: { width: 500, height: 400 },
      viewBox: '0 0 500 400',
      defs: {
        labels: {
          setA: 'A',
          setB: 'B',
          intersection: '∩',
        },
      },
      layers: [
        {
          id: 'venn',
          items: [
            {
              type: 'circle',
              cx: 180,
              cy: 200,
              r: 100,
              style: { stroke: '#000', fill: 'none', strokeWidth: 2 },
            },
            {
              type: 'circle',
              cx: 320,
              cy: 200,
              r: 100,
              style: { stroke: '#000', fill: 'none', strokeWidth: 2 },
            },
            {
              type: 'text',
              text: '@labels.setA',
              at: { x: 130, y: 200 },
              style: { fontSize: 18, fontWeight: 'bold', fill: '#000' },
            },
            {
              type: 'text',
              text: '@labels.setB',
              at: { x: 370, y: 200 },
              style: { fontSize: 18, fontWeight: 'bold', fill: '#000' },
            },
            {
              type: 'text',
              text: '@labels.intersection',
              at: { x: 250, y: 200 },
              style: { fontSize: 16, fill: '#f00' },
            },
          ],
        },
      ],
    } as CustomDiagramBlueprint,
  },
};

/**
 * Get all available snippets
 */
export function getAvailableSnippets() {
  return Object.entries(DIAGRAM_SNIPPETS).map(([key, value]) => ({
    id: key,
    name: value.name,
    description: value.description,
  }));
}

/**
 * Get a specific snippet blueprint
 */
export function getSnippetBlueprint(snippetId: string): CustomDiagramBlueprint | null {
  const snippet = DIAGRAM_SNIPPETS[snippetId as keyof typeof DIAGRAM_SNIPPETS];
  return snippet?.blueprint || null;
}
