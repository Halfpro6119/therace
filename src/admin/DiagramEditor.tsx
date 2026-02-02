import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Save, ArrowLeft, Undo, Redo, ZoomIn, ZoomOut, Maximize,
  Grid3x3, MousePointer, Minus, ArrowRight, Square, Circle,
  Type, Navigation, Eraser, Pentagon
} from 'lucide-react';
import { supabase } from '../db/client';
import type { Diagram, CanvasData, CanvasElement, CanvasElementType, Subject } from '../types';
import { useToast } from '../contexts/ToastContext';
import { useConfirm } from '../contexts/ConfirmContext';

type Tool = 'select' | 'line' | 'arrow' | 'rectangle' | 'circle' | 'text' | 'point' | 'freehand' | 'eraser' | 'polygon';

interface EditorState {
  canvasData: CanvasData;
  zoom: number;
  panX: number;
  panY: number;
  selectedElementIds: string[];
  currentTool: Tool;
  strokeColor: string;
  fillColor: string;
  strokeWidth: number;
  dashed: boolean;
  gridEnabled: boolean;
  snapToGrid: boolean;
}

export function DiagramEditor() {
  const { diagramId } = useParams<{ diagramId: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [diagram, setDiagram] = useState<Partial<Diagram>>({
    title: 'Untitled Diagram',
    diagramType: 'general',
    tags: [],
    storageMode: 'vector',
    width: 800,
    height: 600,
    canvasData: { elements: [] }
  });

  const [editorState, setEditorState] = useState<EditorState>({
    canvasData: { elements: [] },
    zoom: 1,
    panX: 0,
    panY: 0,
    selectedElementIds: [],
    currentTool: 'select',
    strokeColor: '#000000',
    fillColor: '#ffffff',
    strokeWidth: 2,
    dashed: false,
    gridEnabled: false,
    snapToGrid: false
  });

  const [history, setHistory] = useState<CanvasData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState<{ x: number; y: number } | null>(null);
  const [tempElement, setTempElement] = useState<CanvasElement | null>(null);
  const [polygonPoints, setPolygonPoints] = useState<{ x: number; y: number }[]>([]);
  const [polygonPreviewPoint, setPolygonPreviewPoint] = useState<{ x: number; y: number } | null>(null);
  const [angleConstraint, setAngleConstraint] = useState<number | null>(null);
  const [angleLabel, setAngleLabel] = useState<string>('');
  // Removed unused: showAngleDialog, setShowAngleDialog
  const [draggedVertex, setDraggedVertex] = useState<{ elementId: string; vertexIndex: number } | null>(null);
  const [hoveredVertex, setHoveredVertex] = useState<{ elementId: string; vertexIndex: number } | null>(null);
  const [selectionBox, setSelectionBox] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  const [editingText, setEditingText] = useState<{ elementId: string; value: string } | null>(null);
  const [groupDragStart, setGroupDragStart] = useState<{ x: number; y: number; originalElements: Map<string, CanvasElement> } | null>(null);

  useEffect(() => {
    loadData();
  }, [diagramId]);

  useEffect(() => {
    renderCanvas();
  }, [editorState, tempElement, polygonPoints, polygonPreviewPoint, hoveredVertex, draggedVertex, selectionBox]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (editingText) return;

      if (e.key === 'Escape' && polygonPoints.length > 0) {
        if (polygonPoints.length >= 2) {
          finishPolygon(false);
        } else {
          setPolygonPoints([]);
          setPolygonPreviewPoint(null);
        }
      }

      if ((e.key === 'Delete' || e.key === 'Backspace') && editorState.selectedElementIds.length > 0) {
        const newElements = editorState.canvasData.elements.filter(
          el => !editorState.selectedElementIds.includes(el.id)
        );
        const newCanvasData = { ...editorState.canvasData, elements: newElements };
        setEditorState(prev => ({ ...prev, canvasData: newCanvasData, selectedElementIds: [] }));
        addToHistory(newCanvasData);
      }

      // Arrow keys and WASD for moving selected elements
      if (editorState.selectedElementIds.length > 0) {
        let dx = 0;
        let dy = 0;
        const step = e.shiftKey ? 10 : 1;

        if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
          dx = -step;
        } else if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
          dx = step;
        } else if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') {
          dy = -step;
        } else if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') {
          dy = step;
        }

        if (dx !== 0 || dy !== 0) {
          e.preventDefault();
          const updatedElements = editorState.canvasData.elements.map(el => {
            if (editorState.selectedElementIds.includes(el.id)) {
              return moveElement(el, dx, dy);
            }
            return el;
          });

          const newCanvasData = { ...editorState.canvasData, elements: updatedElements };
          setEditorState(prev => ({ ...prev, canvasData: newCanvasData }));
          addToHistory(newCanvasData);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [polygonPoints, editorState.selectedElementIds, editorState.canvasData, editingText]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [subjectsRes] = await Promise.all([
        supabase.from('subjects').select('*').order('name')
      ]);

      if (subjectsRes.error) throw subjectsRes.error;
      setSubjects(subjectsRes.data || []);

      if (diagramId && diagramId !== 'new') {
        const { data, error } = await supabase
          .from('diagrams')
          .select('*')
          .eq('id', diagramId)
          .single();

        if (error) throw error;

        const loadedDiagram: Diagram = {
          ...data,
          tags: data.tags || [],
          canvasData: data.canvas_data || { elements: [] },
          svgData: data.svg_data,
          pngUrl: data.png_url,
          subjectId: data.subject_id,
          diagramType: data.diagram_type,
          storageMode: data.storage_mode,
          createdAt: data.created_at,
          updatedAt: data.updated_at
        };

        setDiagram(loadedDiagram);
        setEditorState(prev => ({
          ...prev,
          canvasData: loadedDiagram.canvasData,
          gridEnabled: loadedDiagram.canvasData.gridEnabled || false,
          snapToGrid: loadedDiagram.canvasData.snapToGrid || false
        }));
        setHistory([loadedDiagram.canvasData]);
        setHistoryIndex(0);
      } else {
        const initialData = { elements: [] };
        setHistory([initialData]);
        setHistoryIndex(0);
      }
    } catch (error) {
      console.error('Error loading diagram:', error);
      showToast('error', 'Failed to load diagram');
    } finally {
      setLoading(false);
    }
  };

  const moveElement = (element: CanvasElement, dx: number, dy: number): CanvasElement => {
    const moved = { ...element, x: element.x + dx, y: element.y + dy };

    // Update secondary coordinates for lines, arrows, and other multi-point elements
    if ((element.type === 'line' || element.type === 'arrow') && element.x2 !== undefined && element.y2 !== undefined) {
      moved.x2 = element.x2 + dx;
      moved.y2 = element.y2 + dy;
    }

    // Update polygon points
    if (element.type === 'polygon' && element.points) {
      moved.points = element.points.map(p => ({ x: p.x + dx, y: p.y + dy }));
    }

    // Update angle annotation points
    if (element.type === 'angle' && element.points) {
      moved.points = element.points.map(p => ({ x: p.x + dx, y: p.y + dy }));
    }

    return moved;
  };

  const addToHistory = useCallback((canvasData: CanvasData) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(canvasData);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const calculateAngleConstrainedPoint = (
    point1: { x: number; y: number },
    point2: { x: number; y: number },
    angle: number,
    distance: number
  ): { x: number; y: number } => {
    const prevAngle = Math.atan2(point2.y - point1.y, point2.x - point1.x);
    const newAngle = prevAngle + (angle * Math.PI / 180);
    return {
      x: point2.x + distance * Math.cos(newAngle),
      y: point2.y + distance * Math.sin(newAngle)
    };
  };

  const addAngleAnnotation = (angle: number, label: string) => {
    if (polygonPoints.length < 2) return;

    const lastPoint = polygonPoints[polygonPoints.length - 1];
    const prevPoint = polygonPoints[polygonPoints.length - 2];

    const angleElement: CanvasElement = {
      id: crypto.randomUUID(),
      type: 'angle',
      x: lastPoint.x,
      y: lastPoint.y,
      points: [prevPoint, lastPoint],
      angleValue: angle,
      text: label,
      arcRadius: 30,
      strokeColor: editorState.strokeColor,
      fillColor: 'transparent',
      strokeWidth: 1.5,
      zIndex: editorState.canvasData.elements.length
    };

    const newCanvasData = {
      ...editorState.canvasData,
      elements: [...editorState.canvasData.elements, angleElement]
    };

    setEditorState(prev => ({ ...prev, canvasData: newCanvasData }));
    addToHistory(newCanvasData);
  };

  const finishPolygon = (closed: boolean) => {
    if (polygonPoints.length < 2) {
      setPolygonPoints([]);
      setPolygonPreviewPoint(null);
      return;
    }

    const newElement: CanvasElement = {
      id: crypto.randomUUID(),
      type: 'polygon',
      x: polygonPoints[0].x,
      y: polygonPoints[0].y,
      points: [...polygonPoints],
      strokeColor: editorState.strokeColor,
      fillColor: closed ? editorState.fillColor : 'transparent',
      strokeWidth: editorState.strokeWidth,
      dashed: editorState.dashed,
      zIndex: editorState.canvasData.elements.length
    };

    const newCanvasData = {
      ...editorState.canvasData,
      elements: [...editorState.canvasData.elements, newElement]
    };

    setEditorState(prev => ({ ...prev, canvasData: newCanvasData }));
    addToHistory(newCanvasData);
    setPolygonPoints([]);
    setPolygonPreviewPoint(null);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setEditorState(prev => ({ ...prev, canvasData: history[newIndex] }));
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setEditorState(prev => ({ ...prev, canvasData: history[newIndex] }));
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - editorState.panX) / editorState.zoom;
    const y = (e.clientY - rect.top - editorState.panY) / editorState.zoom;

    const vertexHit = findPolygonVertexAtPoint(x, y);
    if (vertexHit && (editorState.currentTool === 'select' || editorState.currentTool === 'polygon')) {
      setDraggedVertex({ elementId: vertexHit.element.id, vertexIndex: vertexHit.vertexIndex });
      if (!editorState.selectedElementIds.includes(vertexHit.element.id)) {
        setEditorState(prev => ({ ...prev, selectedElementIds: [vertexHit.element.id] }));
      }
      return;
    }

    if (editorState.currentTool === 'select') {
      const clickedElement = findElementAtPoint(x, y);

      if (clickedElement) {
        if (editorState.selectedElementIds.includes(clickedElement.id)) {
          const originalElements = new Map<string, CanvasElement>();
          editorState.selectedElementIds.forEach(id => {
            const el = editorState.canvasData.elements.find(e => e.id === id);
            if (el) {
              originalElements.set(id, { ...el });
            }
          });
          setGroupDragStart({ x, y, originalElements });
        } else {
          setEditorState(prev => ({ ...prev, selectedElementIds: [clickedElement.id] }));
        }
      } else {
        setEditorState(prev => ({ ...prev, selectedElementIds: [] }));
        setSelectionBox({ x1: x, y1: y, x2: x, y2: y });
      }
    } else if (editorState.currentTool === 'polygon') {
      const snapDistance = 10 / editorState.zoom;

      if (polygonPoints.length > 0) {
        const firstPoint = polygonPoints[0];
        const distanceToFirst = Math.sqrt(
          Math.pow(x - firstPoint.x, 2) + Math.pow(y - firstPoint.y, 2)
        );

        if (distanceToFirst < snapDistance) {
          finishPolygon(true);
          return;
        }

        for (let i = 1; i < polygonPoints.length; i++) {
          const point = polygonPoints[i];
          const distance = Math.sqrt(
            Math.pow(x - point.x, 2) + Math.pow(y - point.y, 2)
          );

          if (distance < snapDistance) {
            setPolygonPoints([...polygonPoints, point]);
            finishPolygon(false);
            return;
          }
        }
      }

      setPolygonPoints([...polygonPoints, { x, y }]);
    } else if (editorState.currentTool !== 'eraser') {
      setIsDrawing(true);
      setDrawStart({ x, y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - editorState.panX) / editorState.zoom;
    const y = (e.clientY - rect.top - editorState.panY) / editorState.zoom;

    if (draggedVertex) {
      const element = editorState.canvasData.elements.find(el => el.id === draggedVertex.elementId);
      if (element && element.points) {
        const updatedPoints = [...element.points];
        updatedPoints[draggedVertex.vertexIndex] = { x, y };

        const updatedElement = { ...element, points: updatedPoints };
        const updatedElements = editorState.canvasData.elements.map(el =>
          el.id === draggedVertex.elementId ? updatedElement : el
        );

        setEditorState(prev => ({
          ...prev,
          canvasData: { ...prev.canvasData, elements: updatedElements }
        }));
      }
      return;
    }

    if (groupDragStart) {
      const dx = x - groupDragStart.x;
      const dy = y - groupDragStart.y;

      const updatedElements = editorState.canvasData.elements.map(el => {
        if (editorState.selectedElementIds.includes(el.id)) {
          const originalElement = groupDragStart.originalElements.get(el.id);
          if (originalElement) {
            return moveElement(originalElement, dx, dy);
          }
        }
        return el;
      });

      setEditorState(prev => ({
        ...prev,
        canvasData: { ...prev.canvasData, elements: updatedElements }
      }));
      return;
    }

    if (selectionBox) {
      setSelectionBox({ ...selectionBox, x2: x, y2: y });
      return;
    }

    const vertexHit = findPolygonVertexAtPoint(x, y);
    if (vertexHit && (editorState.currentTool === 'select' || editorState.currentTool === 'polygon')) {
      setHoveredVertex({ elementId: vertexHit.element.id, vertexIndex: vertexHit.vertexIndex });
    } else {
      setHoveredVertex(null);
    }

    if (editorState.currentTool === 'polygon' && polygonPoints.length > 0) {
      if (angleConstraint !== null && polygonPoints.length >= 2) {
        const lastPoint = polygonPoints[polygonPoints.length - 1];
        const prevPoint = polygonPoints[polygonPoints.length - 2];
        const distance = Math.sqrt(
          Math.pow(x - lastPoint.x, 2) + Math.pow(y - lastPoint.y, 2)
        );
        const constrainedPoint = calculateAngleConstrainedPoint(
          prevPoint,
          lastPoint,
          angleConstraint,
          distance
        );
        setPolygonPreviewPoint(constrainedPoint);
      } else {
        setPolygonPreviewPoint({ x, y });
      }
      return;
    }

    if (!isDrawing || !drawStart) return;

    const newElement = createElementFromTool(
      editorState.currentTool,
      drawStart.x,
      drawStart.y,
      x,
      y
    );

    setTempElement(newElement);
  };

  const handleMouseUp = () => {
    if (draggedVertex) {
      addToHistory(editorState.canvasData);
      setDraggedVertex(null);
      return;
    }

    if (groupDragStart) {
      addToHistory(editorState.canvasData);
      setGroupDragStart(null);
      return;
    }

    if (selectionBox) {
      const selectedIds = editorState.canvasData.elements
        .filter(el => isElementInSelectionBox(el, selectionBox))
        .map(el => el.id);
      setEditorState(prev => ({ ...prev, selectedElementIds: selectedIds }));
      setSelectionBox(null);
      return;
    }

    if (tempElement && isDrawing) {
      const newCanvasData = {
        ...editorState.canvasData,
        elements: [...editorState.canvasData.elements, tempElement]
      };
      setEditorState(prev => ({ ...prev, canvasData: newCanvasData }));
      addToHistory(newCanvasData);
      setTempElement(null);
    }
    setIsDrawing(false);
    setDrawStart(null);
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (editorState.currentTool !== 'select') return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - editorState.panX) / editorState.zoom;
    const y = (e.clientY - rect.top - editorState.panY) / editorState.zoom;

    const clickedElement = findElementAtPoint(x, y);
    if (clickedElement && clickedElement.type === 'text') {
      setEditingText({ elementId: clickedElement.id, value: clickedElement.text || '' });
    }
  };

  const createElementFromTool = (
    tool: Tool,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): CanvasElement => {
    const id = crypto.randomUUID();
    const zIndex = editorState.canvasData.elements.length;

    const baseElement = {
      id,
      strokeColor: editorState.strokeColor,
      fillColor: editorState.fillColor,
      strokeWidth: editorState.strokeWidth,
      dashed: editorState.dashed,
      zIndex
    };

    switch (tool) {
      case 'line':
        return {
          ...baseElement,
          type: 'line',
          x: x1,
          y: y1,
          x2,
          y2
        };
      case 'arrow':
        return {
          ...baseElement,
          type: 'arrow',
          x: x1,
          y: y1,
          x2,
          y2,
          arrowhead: true
        };
      case 'rectangle':
        return {
          ...baseElement,
          type: 'rectangle',
          x: Math.min(x1, x2),
          y: Math.min(y1, y2),
          width: Math.abs(x2 - x1),
          height: Math.abs(y2 - y1)
        };
      case 'circle':
        const radius = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        return {
          ...baseElement,
          type: 'circle',
          x: x1,
          y: y1,
          radius
        };
      case 'text':
        return {
          ...baseElement,
          type: 'text',
          x: x1,
          y: y1,
          text: 'Text',
          fontSize: 16,
          fontWeight: 'normal',
          textAlign: 'left'
        };
      case 'point':
        return {
          ...baseElement,
          type: 'point',
          x: x1,
          y: y1,
          radius: 4
        };
      default:
        return {
          ...baseElement,
          type: 'line',
          x: x1,
          y: y1,
          x2,
          y2
        };
    }
  };

  const isElementInSelectionBox = (element: CanvasElement, box: { x1: number; y1: number; x2: number; y2: number }): boolean => {
    const minX = Math.min(box.x1, box.x2);
    const maxX = Math.max(box.x1, box.x2);
    const minY = Math.min(box.y1, box.y2);
    const maxY = Math.max(box.y1, box.y2);

    switch (element.type) {
      case 'rectangle':
        const rectMinX = element.x;
        const rectMaxX = element.x + (element.width || 0);
        const rectMinY = element.y;
        const rectMaxY = element.y + (element.height || 0);
        return !(rectMaxX < minX || rectMinX > maxX || rectMaxY < minY || rectMinY > maxY);

      case 'circle':
        const radius = element.radius || 0;
        return !(element.x + radius < minX || element.x - radius > maxX ||
                element.y + radius < minY || element.y - radius > maxY);

      case 'line':
      case 'arrow':
        return isLineIntersectingBox(element.x, element.y, element.x2 || 0, element.y2 || 0, minX, minY, maxX, maxY);

      case 'polygon':
        if (!element.points || element.points.length === 0) return false;
        for (let i = 0; i < element.points.length; i++) {
          const p1 = element.points[i];
          const p2 = element.points[(i + 1) % element.points.length];
          if (isLineIntersectingBox(p1.x, p1.y, p2.x, p2.y, minX, minY, maxX, maxY)) {
            return true;
          }
        }
        return false;

      case 'text':
      case 'point':
        return element.x >= minX && element.x <= maxX && element.y >= minY && element.y <= maxY;

      default:
        return false;
    }
  };

  const isLineIntersectingBox = (
    x1: number, y1: number, x2: number, y2: number,
    boxMinX: number, boxMinY: number, boxMaxX: number, boxMaxY: number
  ): boolean => {
    if ((x1 >= boxMinX && x1 <= boxMaxX && y1 >= boxMinY && y1 <= boxMaxY) ||
        (x2 >= boxMinX && x2 <= boxMaxX && y2 >= boxMinY && y2 <= boxMaxY)) {
      return true;
    }

    const boxLines = [
      { x1: boxMinX, y1: boxMinY, x2: boxMaxX, y2: boxMinY },
      { x1: boxMaxX, y1: boxMinY, x2: boxMaxX, y2: boxMaxY },
      { x1: boxMaxX, y1: boxMaxY, x2: boxMinX, y2: boxMaxY },
      { x1: boxMinX, y1: boxMaxY, x2: boxMinX, y2: boxMinY }
    ];

    for (const boxLine of boxLines) {
      if (linesIntersect(x1, y1, x2, y2, boxLine.x1, boxLine.y1, boxLine.x2, boxLine.y2)) {
        return true;
      }
    }

    return false;
  };

  const linesIntersect = (
    x1: number, y1: number, x2: number, y2: number,
    x3: number, y3: number, x4: number, y4: number
  ): boolean => {
    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (denom === 0) return false;

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;

    return t >= 0 && t <= 1 && u >= 0 && u <= 1;
  };

  const findPolygonVertexAtPoint = (x: number, y: number): { element: CanvasElement; vertexIndex: number } | null => {
    const hitRadius = 8 / editorState.zoom;
    const elements = [...editorState.canvasData.elements].reverse();

    for (const element of elements) {
      if (element.type === 'polygon' && element.points && element.points.length > 0) {
        for (let i = 0; i < element.points.length; i++) {
          const point = element.points[i];
          const dx = x - point.x;
          const dy = y - point.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist <= hitRadius) {
            return { element, vertexIndex: i };
          }
        }
      }
    }
    return null;
  };

  const findElementAtPoint = (x: number, y: number): CanvasElement | null => {
    const elements = [...editorState.canvasData.elements].reverse();
    for (const element of elements) {
      if (isPointInElement(x, y, element)) {
        return element;
      }
    }
    return null;
  };

  const isPointInElement = (x: number, y: number, element: CanvasElement): boolean => {
    const tolerance = 5;

    switch (element.type) {
      case 'rectangle':
        return x >= element.x - tolerance &&
               x <= element.x + (element.width || 0) + tolerance &&
               y >= element.y - tolerance &&
               y <= element.y + (element.height || 0) + tolerance;
      case 'circle':
        const dx = x - element.x;
        const dy = y - element.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        return dist <= (element.radius || 0) + tolerance;
      case 'line':
      case 'arrow':
        return isPointNearLine(x, y, element.x, element.y, element.x2 || 0, element.y2 || 0, tolerance);
      default:
        return false;
    }
  };

  const isPointNearLine = (
    px: number,
    py: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    tolerance: number
  ): boolean => {
    const lineLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const dot = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / Math.pow(lineLength, 2);
    const closestX = x1 + dot * (x2 - x1);
    const closestY = y1 + dot * (y2 - y1);
    const distance = Math.sqrt(Math.pow(px - closestX, 2) + Math.pow(py - closestY, 2));
    return distance <= tolerance;
  };

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = editorState.canvasData.backgroundColor || '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(editorState.panX, editorState.panY);
    ctx.scale(editorState.zoom, editorState.zoom);

    if (editorState.gridEnabled) {
      drawGrid(ctx, canvas.width / editorState.zoom, canvas.height / editorState.zoom);
    }

    editorState.canvasData.elements.forEach(element => {
      drawElement(ctx, element, editorState.selectedElementIds.includes(element.id));
    });

    if (tempElement) {
      drawElement(ctx, tempElement, false);
    }

    if (polygonPoints.length > 0) {
      ctx.strokeStyle = editorState.strokeColor;
      ctx.fillStyle = editorState.fillColor;
      ctx.lineWidth = editorState.strokeWidth;
      if (editorState.dashed) {
        ctx.setLineDash([5, 5]);
      }

      ctx.beginPath();
      ctx.moveTo(polygonPoints[0].x, polygonPoints[0].y);
      for (let i = 1; i < polygonPoints.length; i++) {
        ctx.lineTo(polygonPoints[i].x, polygonPoints[i].y);
      }
      if (polygonPreviewPoint) {
        ctx.lineTo(polygonPreviewPoint.x, polygonPreviewPoint.y);
      }
      ctx.stroke();

      polygonPoints.forEach((point, index) => {
        ctx.fillStyle = index === 0 ? '#00ff00' : editorState.strokeColor;
        const vertexRadius = Math.max(editorState.strokeWidth * 1.5, 4);
        ctx.beginPath();
        ctx.arc(point.x, point.y, vertexRadius, 0, 2 * Math.PI);
        ctx.fill();
      });

      if (polygonPreviewPoint && polygonPoints.length > 0) {
        const firstPoint = polygonPoints[0];
        const distanceToFirst = Math.sqrt(
          Math.pow(polygonPreviewPoint.x - firstPoint.x, 2) +
          Math.pow(polygonPreviewPoint.y - firstPoint.y, 2)
        );
        const snapDistance = 10 / editorState.zoom;

        if (distanceToFirst < snapDistance) {
          ctx.strokeStyle = '#00ff00';
          ctx.lineWidth = 2;
          ctx.setLineDash([]);
          ctx.beginPath();
          ctx.arc(firstPoint.x, firstPoint.y, 8, 0, 2 * Math.PI);
          ctx.stroke();
        }
      }

      ctx.setLineDash([]);
    }

    if (selectionBox) {
      ctx.strokeStyle = '#0066ff';
      ctx.fillStyle = 'rgba(0, 102, 255, 0.1)';
      ctx.lineWidth = 2 / editorState.zoom;
      ctx.setLineDash([5 / editorState.zoom, 5 / editorState.zoom]);

      const x = Math.min(selectionBox.x1, selectionBox.x2);
      const y = Math.min(selectionBox.y1, selectionBox.y2);
      const width = Math.abs(selectionBox.x2 - selectionBox.x1);
      const height = Math.abs(selectionBox.y2 - selectionBox.y1);

      ctx.fillRect(x, y, width, height);
      ctx.strokeRect(x, y, width, height);
      ctx.setLineDash([]);
    }

    ctx.restore();
  };

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const gridSize = 20;
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;

    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  };

  const drawElement = (ctx: CanvasRenderingContext2D, element: CanvasElement, isSelected: boolean) => {
    ctx.strokeStyle = element.strokeColor;
    ctx.fillStyle = element.fillColor || 'transparent';
    ctx.lineWidth = element.strokeWidth;
    ctx.globalAlpha = element.opacity || 1;

    if (element.dashed) {
      ctx.setLineDash([5, 5]);
    } else {
      ctx.setLineDash([]);
    }

    switch (element.type) {
      case 'line':
      case 'arrow':
        ctx.beginPath();
        ctx.moveTo(element.x, element.y);
        ctx.lineTo(element.x2 || 0, element.y2 || 0);
        ctx.stroke();
        if (element.arrowhead) {
          drawArrowhead(ctx, element.x, element.y, element.x2 || 0, element.y2 || 0);
        }
        break;
      case 'rectangle':
        ctx.fillRect(element.x, element.y, element.width || 0, element.height || 0);
        ctx.strokeRect(element.x, element.y, element.width || 0, element.height || 0);
        break;
      case 'circle':
        ctx.beginPath();
        ctx.arc(element.x, element.y, element.radius || 0, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        break;
      case 'text':
        ctx.font = `${element.fontWeight || 'normal'} ${element.fontSize || 16}px sans-serif`;
        ctx.textAlign = element.textAlign as CanvasTextAlign || 'left';
        ctx.fillStyle = element.strokeColor;
        ctx.fillText(element.text || '', element.x, element.y);
        break;
      case 'point':
        ctx.beginPath();
        ctx.arc(element.x, element.y, element.radius || 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        break;
      case 'polygon':
        if (element.points && element.points.length > 1) {
          ctx.beginPath();
          ctx.moveTo(element.points[0].x, element.points[0].y);
          for (let i = 1; i < element.points.length; i++) {
            ctx.lineTo(element.points[i].x, element.points[i].y);
          }
          if (element.fillColor && element.fillColor !== 'transparent') {
            ctx.closePath();
            ctx.fill();
          }
          ctx.stroke();

          const vertexRadius = Math.max(element.strokeWidth * 1.5, 4);
          element.points.forEach((point, index) => {
            const isHovered = hoveredVertex?.elementId === element.id && hoveredVertex?.vertexIndex === index;
            const isDragged = draggedVertex?.elementId === element.id && draggedVertex?.vertexIndex === index;

            if (isHovered || isDragged) {
              ctx.fillStyle = '#0066ff';
              ctx.beginPath();
              ctx.arc(point.x, point.y, vertexRadius + 2, 0, 2 * Math.PI);
              ctx.fill();
            }

            ctx.fillStyle = element.strokeColor;
            ctx.beginPath();
            ctx.arc(point.x, point.y, vertexRadius, 0, 2 * Math.PI);
            ctx.fill();
          });
        }
        break;
      case 'angle':
        if (element.points && element.points.length >= 2 && element.angleValue !== undefined) {
          const point1 = element.points[0];
          const vertex = element.points[1];
          const arcRadius = element.arcRadius || 30;

          const angle1 = Math.atan2(point1.y - vertex.y, point1.x - vertex.x);
          const angle2 = angle1 + (element.angleValue * Math.PI / 180);

          ctx.beginPath();
          ctx.arc(vertex.x, vertex.y, arcRadius, angle1, angle2, element.angleValue < 0);
          ctx.stroke();

          if (element.text) {
            const midAngle = (angle1 + angle2) / 2;
            const labelRadius = arcRadius + 15;
            const labelX = vertex.x + labelRadius * Math.cos(midAngle);
            const labelY = vertex.y + labelRadius * Math.sin(midAngle);

            ctx.save();
            ctx.font = `${element.fontWeight || 'normal'} ${element.fontSize || 14}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = element.strokeColor;
            ctx.fillText(element.text, labelX, labelY);
            ctx.restore();
          }
        }
        break;
    }

    if (isSelected) {
      ctx.strokeStyle = '#0066ff';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 4]);

      const bounds = getElementBounds(element);
      ctx.strokeRect(bounds.x - 5, bounds.y - 5, bounds.width + 10, bounds.height + 10);
    }

    ctx.globalAlpha = 1;
    ctx.setLineDash([]);
  };

  const drawArrowhead = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const arrowLength = 10;
    const arrowAngle = Math.PI / 6;

    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(
      x2 - arrowLength * Math.cos(angle - arrowAngle),
      y2 - arrowLength * Math.sin(angle - arrowAngle)
    );
    ctx.moveTo(x2, y2);
    ctx.lineTo(
      x2 - arrowLength * Math.cos(angle + arrowAngle),
      y2 - arrowLength * Math.sin(angle + arrowAngle)
    );
    ctx.stroke();
  };

  const getElementBounds = (element: CanvasElement) => {
    switch (element.type) {
      case 'rectangle':
        return {
          x: element.x,
          y: element.y,
          width: element.width || 0,
          height: element.height || 0
        };
      case 'circle':
      case 'point':
        const r = element.radius || 0;
        return {
          x: element.x - r,
          y: element.y - r,
          width: r * 2,
          height: r * 2
        };
      case 'line':
      case 'arrow':
        const x1 = element.x;
        const y1 = element.y;
        const x2 = element.x2 || 0;
        const y2 = element.y2 || 0;
        return {
          x: Math.min(x1, x2),
          y: Math.min(y1, y2),
          width: Math.abs(x2 - x1),
          height: Math.abs(y2 - y1)
        };
      case 'polygon':
        if (element.points && element.points.length > 0) {
          const xs = element.points.map(p => p.x);
          const ys = element.points.map(p => p.y);
          const minX = Math.min(...xs);
          const maxX = Math.max(...xs);
          const minY = Math.min(...ys);
          const maxY = Math.max(...ys);
          return {
            x: minX,
            y: minY,
            width: maxX - minX,
            height: maxY - minY
          };
        }
        return { x: element.x, y: element.y, width: 0, height: 0 };
      case 'angle':
        const arcR = (element.arcRadius || 30) + 20;
        return {
          x: element.x - arcR,
          y: element.y - arcR,
          width: arcR * 2,
          height: arcR * 2
        };
      default:
        return { x: element.x, y: element.y, width: 0, height: 0 };
    }
  };

  const exportToSVG = (): string => {
    const elements = editorState.canvasData.elements;
    const width = diagram.width || 800;
    const height = diagram.height || 600;

    let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<rect width="100%" height="100%" fill="${editorState.canvasData.backgroundColor || '#ffffff'}"/>`;

    elements.forEach(element => {
      svg += elementToSVG(element);
    });

    svg += '</svg>';
    return svg;
  };

  const elementToSVG = (element: CanvasElement): string => {
    const stroke = element.strokeColor;
    const fill = element.fillColor || 'none';
    const strokeWidth = element.strokeWidth;
    const dashArray = element.dashed ? '5,5' : 'none';
    const opacity = element.opacity || 1;

    switch (element.type) {
      case 'line':
      case 'arrow':
        let svg = `<line x1="${element.x}" y1="${element.y}" x2="${element.x2}" y2="${element.y2}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-dasharray="${dashArray}" opacity="${opacity}"/>`;
        if (element.arrowhead) {
          const angle = Math.atan2((element.y2 || 0) - element.y, (element.x2 || 0) - element.x);
          const arrowLength = 10;
          const arrowAngle = Math.PI / 6;
          const x2 = element.x2 || 0;
          const y2 = element.y2 || 0;
          svg += `<polyline points="${x2},${y2} ${x2 - arrowLength * Math.cos(angle - arrowAngle)},${y2 - arrowLength * Math.sin(angle - arrowAngle)} ${x2 - arrowLength * Math.cos(angle + arrowAngle)},${y2 - arrowLength * Math.sin(angle + arrowAngle)}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="none"/>`;
        }
        return svg;
      case 'rectangle':
        return `<rect x="${element.x}" y="${element.y}" width="${element.width}" height="${element.height}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="${fill}" stroke-dasharray="${dashArray}" opacity="${opacity}"/>`;
      case 'circle':
        return `<circle cx="${element.x}" cy="${element.y}" r="${element.radius}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="${fill}" stroke-dasharray="${dashArray}" opacity="${opacity}"/>`;
      case 'text':
        return `<text x="${element.x}" y="${element.y}" font-size="${element.fontSize}" font-weight="${element.fontWeight}" text-anchor="${element.textAlign === 'center' ? 'middle' : element.textAlign === 'right' ? 'end' : 'start'}" fill="${stroke}" opacity="${opacity}">${element.text}</text>`;
      case 'point':
        return `<circle cx="${element.x}" cy="${element.y}" r="${element.radius}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="${fill}" opacity="${opacity}"/>`;
      case 'polygon':
        if (element.points && element.points.length > 1) {
          const pointsStr = element.points.map(p => `${p.x},${p.y}`).join(' ');
          return `<polyline points="${pointsStr}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="${fill}" stroke-dasharray="${dashArray}" opacity="${opacity}"/>`;
        }
        return '';
      case 'angle':
        if (element.points && element.points.length >= 2 && element.angleValue !== undefined) {
          const point1 = element.points[0];
          const vertex = element.points[1];
          const arcRadius = element.arcRadius || 30;
          const angle1 = Math.atan2(point1.y - vertex.y, point1.x - vertex.x);
          const angle2 = angle1 + (element.angleValue * Math.PI / 180);

          const startX = vertex.x + arcRadius * Math.cos(angle1);
          const startY = vertex.y + arcRadius * Math.sin(angle1);
          const endX = vertex.x + arcRadius * Math.cos(angle2);
          const endY = vertex.y + arcRadius * Math.sin(angle2);

          const largeArcFlag = Math.abs(element.angleValue) > 180 ? 1 : 0;
          const sweepFlag = element.angleValue > 0 ? 1 : 0;

          let svgStr = `<path d="M ${startX} ${startY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}" stroke="${stroke}" stroke-width="${strokeWidth}" fill="none" opacity="${opacity}"/>`;

          if (element.text) {
            const midAngle = (angle1 + angle2) / 2;
            const labelRadius = arcRadius + 15;
            const labelX = vertex.x + labelRadius * Math.cos(midAngle);
            const labelY = vertex.y + labelRadius * Math.sin(midAngle);
            svgStr += `<text x="${labelX}" y="${labelY}" font-size="${element.fontSize || 14}" font-weight="${element.fontWeight || 'normal'}" text-anchor="middle" dominant-baseline="middle" fill="${stroke}" opacity="${opacity}">${element.text}</text>`;
          }

          return svgStr;
        }
        return '';
      default:
        return '';
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const svgData = exportToSVG();
      const canvasData = {
        ...editorState.canvasData,
        gridEnabled: editorState.gridEnabled,
        snapToGrid: editorState.snapToGrid
      };

      const diagramData = {
        title: diagram.title,
        subject_id: diagram.subjectId,
        diagram_type: diagram.diagramType,
        tags: diagram.tags,
        storage_mode: diagram.storageMode,
        canvas_data: canvasData,
        svg_data: svgData,
        width: diagram.width,
        height: diagram.height
      };

      if (diagramId && diagramId !== 'new') {
        const { error } = await supabase
          .from('diagrams')
          .update(diagramData)
          .eq('id', diagramId);

        if (error) throw error;

        const { error: versionError } = await supabase.from('diagram_versions').insert({
          diagram_id: diagramId,
          version_number: Date.now(),
          canvas_data: canvasData,
          svg_data: svgData
        });

        if (versionError) console.error('Failed to save version:', versionError);
      } else {
        const { data, error } = await supabase
          .from('diagrams')
          .insert(diagramData)
          .select()
          .single();

        if (error) throw error;
        navigate(`/admin/diagrams/${data.id}`, { replace: true });
      }

      showToast('success', 'Diagram saved successfully');
    } catch (error) {
      console.error('Error saving diagram:', error);
      showToast('error', 'Failed to save diagram');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!diagramId || diagramId === 'new') return;

    const confirmed = await confirm({ title: 'Confirm', message: 'Delete this diagram? This cannot be undone.' });
    if (!confirmed) return;

    const { error } = await supabase.from('diagrams').delete().eq('id', diagramId);

    if (error) {
      showToast('error', 'Failed to delete diagram');
      return;
    }

    showToast('success', 'Diagram deleted');
    navigate('/admin/diagrams');
  };

  const deleteSelectedElement = () => {
    if (!editorState.selectedElementIds[0]) return;

    const newCanvasData = {
      ...editorState.canvasData,
      elements: editorState.canvasData.elements.filter(e => e.id !== editorState.selectedElementIds[0])
    };

    setEditorState(prev => ({ ...prev, canvasData: newCanvasData, selectedElementId: null }));
    addToHistory(newCanvasData);
  };

  const duplicateSelectedElement = () => {
    if (!editorState.selectedElementIds[0]) return;

    const element = editorState.canvasData.elements.find(e => e.id === editorState.selectedElementIds[0]);
    if (!element) return;

    const newElement = {
      ...element,
      id: crypto.randomUUID(),
      x: element.x + 20,
      y: element.y + 20,
      zIndex: editorState.canvasData.elements.length
    };

    const newCanvasData = {
      ...editorState.canvasData,
      elements: [...editorState.canvasData.elements, newElement]
    };

    setEditorState(prev => ({ ...prev, canvasData: newCanvasData, selectedElementId: newElement.id }));
    addToHistory(newCanvasData);
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading diagram...</div>;
  }

  const tools: { id: Tool; icon: any; label: string }[] = [
    { id: 'select', icon: MousePointer, label: 'Select' },
    { id: 'line', icon: Minus, label: 'Line' },
    { id: 'arrow', icon: ArrowRight, label: 'Arrow' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'polygon', icon: Pentagon, label: 'Polygon' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'point', icon: Navigation, label: 'Point' },
    { id: 'eraser', icon: Eraser, label: 'Eraser' }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/diagrams')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={diagram.title}
            onChange={(e) => setDiagram({ ...diagram, title: e.target.value })}
            className="text-xl font-semibold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2"
            placeholder="Diagram title"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
            title="Undo"
          >
            <Undo className="w-5 h-5" />
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50"
            title="Redo"
          >
            <Redo className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />

          <button
            onClick={() => setEditorState(prev => ({ ...prev, zoom: Math.min(prev.zoom + 0.1, 3) }))}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <span className="text-sm font-mono">{Math.round(editorState.zoom * 100)}%</span>
          <button
            onClick={() => setEditorState(prev => ({ ...prev, zoom: Math.max(prev.zoom - 0.1, 0.1) }))}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <button
            onClick={() => setEditorState(prev => ({ ...prev, zoom: 1, panX: 0, panY: 0 }))}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Fit to Screen"
          >
            <Maximize className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />

          <button
            onClick={() => setEditorState(prev => ({ ...prev, gridEnabled: !prev.gridEnabled }))}
            className={`p-2 rounded-lg transition-colors ${
              editorState.gridEnabled
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title="Toggle Grid"
          >
            <Grid3x3 className="w-5 h-5" />
          </button>

          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-20 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-2 space-y-2">
          {tools.map(tool => (
            <button
              key={tool.id}
              onClick={() => {
                setEditorState(prev => ({ ...prev, currentTool: tool.id }));
                if (tool.id !== 'polygon' && polygonPoints.length > 0) {
                  setPolygonPoints([]);
                  setPolygonPreviewPoint(null);
                }
              }}
              className={`w-full aspect-square flex flex-col items-center justify-center gap-1 rounded-lg transition-colors ${
                editorState.currentTool === tool.id
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              title={tool.label}
            >
              <tool.icon className="w-5 h-5" />
              <span className="text-[10px]">{tool.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 bg-gray-100 dark:bg-gray-900 p-8 overflow-auto">
          {polygonPoints.length > 0 && (
            <div className="mb-4 text-center">
              <div className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg">
                Click to add points • Click first point (green) to close • ESC to finish
              </div>
            </div>
          )}
          <div className="mx-auto relative" style={{ width: diagram.width, height: diagram.height }}>
            <canvas
              ref={canvasRef}
              width={diagram.width}
              height={diagram.height}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onDoubleClick={handleDoubleClick}
              className={`bg-white shadow-lg ${hoveredVertex || draggedVertex || groupDragStart ? 'cursor-move' : 'cursor-crosshair'}`}
            />
            {editingText && (() => {
              const element = editorState.canvasData.elements.find(el => el.id === editingText.elementId);
              if (!element) return null;

              const screenX = element.x * editorState.zoom + editorState.panX;
              const screenY = element.y * editorState.zoom + editorState.panY;

              return (
                <div
                  className="absolute"
                  style={{
                    left: `${screenX}px`,
                    top: `${screenY}px`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <input
                    type="text"
                    value={editingText.value}
                    onChange={(e) => setEditingText({ ...editingText, value: e.target.value })}
                    onBlur={() => {
                      const updatedElements = editorState.canvasData.elements.map(el =>
                        el.id === editingText.elementId ? { ...el, text: editingText.value } : el
                      );
                      const newCanvasData = { ...editorState.canvasData, elements: updatedElements };
                      setEditorState(prev => ({ ...prev, canvasData: newCanvasData }));
                      addToHistory(newCanvasData);
                      setEditingText(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.currentTarget.blur();
                      } else if (e.key === 'Escape') {
                        setEditingText(null);
                      }
                    }}
                    autoFocus
                    className="px-2 py-1 border-2 border-blue-500 rounded bg-white text-center"
                    style={{
                      fontSize: `${(element.fontSize || 16) * editorState.zoom}px`,
                      minWidth: '100px'
                    }}
                  />
                </div>
              );
            })()}
          </div>
        </div>

        <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
          <h3 className="font-semibold mb-4">Properties</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <select
                value={diagram.subjectId || ''}
                onChange={(e) => setDiagram({ ...diagram, subjectId: e.target.value || undefined })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900"
              >
                <option value="">None</option>
                {subjects.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Diagram Type</label>
              <input
                type="text"
                value={diagram.diagramType}
                onChange={(e) => setDiagram({ ...diagram, diagramType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900"
                placeholder="e.g., math-geometry"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
              <input
                type="text"
                value={diagram.tags?.join(', ')}
                onChange={(e) => setDiagram({
                  ...diagram,
                  tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900"
                placeholder="geometry, triangle"
              />
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h4 className="font-medium mb-3">Drawing Tools</h4>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">Stroke Color</label>
                  <input
                    type="color"
                    value={editorState.strokeColor}
                    onChange={(e) => setEditorState(prev => ({ ...prev, strokeColor: e.target.value }))}
                    className="w-full h-10 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Fill Color</label>
                  <input
                    type="color"
                    value={editorState.fillColor}
                    onChange={(e) => setEditorState(prev => ({ ...prev, fillColor: e.target.value }))}
                    className="w-full h-10 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Stroke Width</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={editorState.strokeWidth}
                    onChange={(e) => setEditorState(prev => ({ ...prev, strokeWidth: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{editorState.strokeWidth}px</span>
                </div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editorState.dashed}
                    onChange={(e) => setEditorState(prev => ({ ...prev, dashed: e.target.checked }))}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Dashed Line</span>
                </label>
              </div>
            </div>

            {editorState.currentTool === 'polygon' && polygonPoints.length >= 2 && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="font-medium mb-3">Angle Constraint</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Angle (degrees)</label>
                    <input
                      type="number"
                      value={angleConstraint || ''}
                      onChange={(e) => setAngleConstraint(e.target.value ? parseFloat(e.target.value) : null)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900"
                      placeholder="e.g., 90, 45, -60"
                    />
                    <p className="text-xs text-gray-500 mt-1">Leave empty for free drawing</p>
                  </div>

                  {angleConstraint !== null && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1">Angle Label</label>
                        <input
                          type="text"
                          value={angleLabel}
                          onChange={(e) => setAngleLabel(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900"
                          placeholder="e.g., 90°, θ, α"
                        />
                      </div>

                      <button
                        onClick={() => {
                          if (angleConstraint !== null) {
                            addAngleAnnotation(angleConstraint, angleLabel || `${angleConstraint}°`);
                          }
                        }}
                        className="w-full px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Add Angle Label
                      </button>

                      <button
                        onClick={() => {
                          setAngleConstraint(null);
                          setAngleLabel('');
                        }}
                        className="w-full px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                      >
                        Clear Constraint
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {editorState.selectedElementIds[0] && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="font-medium mb-3">Selected Element</h4>
                <div className="flex gap-2">
                  <button
                    onClick={duplicateSelectedElement}
                    className="flex-1 px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50"
                  >
                    Duplicate
                  </button>
                  <button
                    onClick={deleteSelectedElement}
                    className="flex-1 px-3 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}

            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <h4 className="font-medium mb-3">Layers</h4>
              <div className="space-y-1">
                {editorState.canvasData.elements.map((element, index) => (
                  <div
                    key={element.id}
                    onClick={() => setEditorState(prev => ({ ...prev, selectedElementId: element.id }))}
                    className={`px-3 py-2 rounded cursor-pointer ${
                      element.id === editorState.selectedElementIds[0]
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {element.type} {index + 1}
                  </div>
                ))}
              </div>
            </div>

            {diagramId && diagramId !== 'new' && (
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <button
                  onClick={handleDelete}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Diagram
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
