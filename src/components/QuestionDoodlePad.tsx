/**
 * QUESTION DOODLE PAD
 *
 * An infinite canvas for doodling under the question. Strokes stored as vectors
 * in world coordinates; pan and zoom to explore. Undo/redo, persist per session.
 */

import { useRef, useEffect, useState, useCallback } from 'react';
import { Pen, Eraser, Trash2, Undo2, Redo2, Move, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface Stroke {
  tool: 'pen' | 'eraser';
  size: number;
  points: { x: number; y: number }[];
}

interface StoredState {
  version: 2;
  strokes: Stroke[];
  historyIndex: number;
}

export interface QuestionDoodlePadProps {
  /** Unique key for this quiz session (e.g. quizId + startTime). One pad per session. */
  sessionId: string;
  /** Optional fixed height in px. Default 280. */
  height?: number;
  /** Optional class name for the wrapper. */
  className?: string;
}

type Tool = 'pen' | 'eraser' | 'pan';

const STORAGE_PREFIX = 'doodle_pad_';
const DEFAULT_HEIGHT = 280;
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 4;
const ZOOM_STEP_BUTTON = 0.08;
const ZOOM_STEP_WHEEL = 0.015;
const GRID_SPACING = 20;
const DEFAULT_PEN_SIZE = 2;
const DEFAULT_ERASER_SIZE = 16;
const PAPER_LIGHT = '#faf9f6';
const PAPER_DARK = 'rgb(39 39 42)';
const GRID_LIGHT = 'rgba(0,0,0,0.06)';
const GRID_DARK = 'rgba(255,255,255,0.06)';
/** High-contrast ink so pen is clearly visible on the paper (canvas does not resolve CSS variables). */
const INK_LIGHT = '#1e293b';
const INK_DARK = '#f1f5f9';

const MAX_HISTORY = 50;

export function QuestionDoodlePad({ sessionId, height = DEFAULT_HEIGHT, className = '' }: QuestionDoodlePadProps) {
  const strokesCanvasRef = useRef<HTMLCanvasElement>(null);
  const inkLayerRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [tool, setTool] = useState<Tool>('pen');
  const [penSize, setPenSize] = useState(DEFAULT_PEN_SIZE);
  const [eraserSize, setEraserSize] = useState(DEFAULT_ERASER_SIZE);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const isDarkRef = useRef(false);

  const storageKey = `${STORAGE_PREFIX}${sessionId}`;

  const getCssBg = useCallback(() => {
    if (typeof document === 'undefined') return PAPER_LIGHT;
    const root = document.documentElement;
    const isDark = root.classList.contains('dark');
    isDarkRef.current = isDark;
    return isDark ? PAPER_DARK : PAPER_LIGHT;
  }, []);

  const getGridColor = useCallback(() => (isDarkRef.current ? GRID_DARK : GRID_LIGHT), []);

  const persistState = useCallback((s: Stroke[], idx: number) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ version: 2, strokes: s, historyIndex: idx }));
    } catch {
      // ignore
    }
  }, [storageKey]);

  const visibleStrokes = strokes.slice(0, historyIndex + 1);

  const render = useCallback(() => {
    const canvas = strokesCanvasRef.current;
    const vp = viewportRef.current;
    if (!canvas || !vp) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const vw = vp.clientWidth;
    const vh = vp.clientHeight;
    if (vw <= 0 || vh <= 0) return;

    const cw = vw * dpr;
    const ch = vh * dpr;
    canvas.width = cw;
    canvas.height = ch;
    canvas.style.width = `${vw}px`;
    canvas.style.height = `${vh}px`;

    const worldLeft = -pan.x / zoom;
    const worldRight = (vw - pan.x) / zoom;
    const worldTop = -pan.y / zoom;
    const worldBottom = (vh - pan.y) / zoom;

    ctx.save();
    ctx.setTransform(dpr * zoom, 0, 0, dpr * zoom, dpr * pan.x, dpr * pan.y);

    ctx.fillStyle = getCssBg();
    ctx.fillRect(worldLeft, worldTop, worldRight - worldLeft, worldBottom - worldTop);

    const gridColor = getGridColor();
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1 / zoom;
    const xStart = Math.floor(worldLeft / GRID_SPACING) * GRID_SPACING;
    const xEnd = Math.ceil(worldRight / GRID_SPACING) * GRID_SPACING;
    const yStart = Math.floor(worldTop / GRID_SPACING) * GRID_SPACING;
    const yEnd = Math.ceil(worldBottom / GRID_SPACING) * GRID_SPACING;
    for (let x = xStart; x <= xEnd; x += GRID_SPACING) {
      ctx.beginPath();
      ctx.moveTo(x, worldTop);
      ctx.lineTo(x, worldBottom);
      ctx.stroke();
    }
    for (let y = yStart; y <= yEnd; y += GRID_SPACING) {
      ctx.beginPath();
      ctx.moveTo(worldLeft, y);
      ctx.lineTo(worldRight, y);
      ctx.stroke();
    }

    ctx.restore();

    if (!inkLayerRef.current) inkLayerRef.current = document.createElement('canvas');
    const ink = inkLayerRef.current;
    ink.width = cw;
    ink.height = ch;
    const inkCtx = ink.getContext('2d');
    if (!inkCtx) return;
    inkCtx.clearRect(0, 0, cw, ch);
    inkCtx.save();
    inkCtx.setTransform(dpr * zoom, 0, 0, dpr * zoom, dpr * pan.x, dpr * pan.y);

    inkCtx.lineCap = 'round';
    inkCtx.lineJoin = 'round';
    const inkColor = isDarkRef.current ? INK_DARK : INK_LIGHT;
    for (const s of visibleStrokes) {
      if (s.points.length < 2) continue;
      if (s.tool === 'eraser') {
        inkCtx.globalCompositeOperation = 'destination-out';
        inkCtx.strokeStyle = 'rgba(0,0,0,1)';
        inkCtx.lineWidth = s.size / zoom;
      } else {
        inkCtx.globalCompositeOperation = 'source-over';
        inkCtx.strokeStyle = inkColor;
        inkCtx.lineWidth = s.size / zoom;
      }
      inkCtx.beginPath();
      inkCtx.moveTo(s.points[0].x, s.points[0].y);
      for (let i = 1; i < s.points.length; i++) inkCtx.lineTo(s.points[i].x, s.points[i].y);
      inkCtx.stroke();
    }
    inkCtx.globalCompositeOperation = 'source-over';

    if (currentStroke && currentStroke.points.length >= 2) {
      inkCtx.strokeStyle = inkColor;
      inkCtx.lineWidth = currentStroke.size / zoom;
      if (currentStroke.tool === 'eraser') {
        inkCtx.globalCompositeOperation = 'destination-out';
        inkCtx.strokeStyle = 'rgba(0,0,0,1)';
      }
      inkCtx.beginPath();
      inkCtx.moveTo(currentStroke.points[0].x, currentStroke.points[0].y);
      for (let i = 1; i < currentStroke.points.length; i++) inkCtx.lineTo(currentStroke.points[i].x, currentStroke.points[i].y);
      inkCtx.stroke();
      inkCtx.globalCompositeOperation = 'source-over';
    }

    inkCtx.restore();

    ctx.drawImage(ink, 0, 0);
  }, [pan, zoom, visibleStrokes, currentStroke, getCssBg, getGridColor]);

  useEffect(() => {
    render();
  }, [render]);

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const ro = new ResizeObserver(() => render());
    ro.observe(vp);
    return () => ro.disconnect();
  }, [render]);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved);
      if (parsed.version === 2 && Array.isArray(parsed.strokes)) {
        setStrokes(parsed.strokes);
        setHistoryIndex(Math.min(parsed.historyIndex ?? parsed.strokes.length - 1, parsed.strokes.length - 1));
      }
    } catch {
      // ignore legacy formats
    }
  }, [sessionId, storageKey]);

  const clearCanvas = useCallback(() => {
    setStrokes([]);
    setHistoryIndex(-1);
    setCurrentStroke(null);
    persistState([], -1);
  }, [persistState]);

  const undo = useCallback(() => {
    if (historyIndex < 0) return;
    const newIdx = historyIndex - 1;
    setHistoryIndex(newIdx);
    persistState(strokes, newIdx);
  }, [strokes, historyIndex, persistState]);

  const redo = useCallback(() => {
    if (historyIndex >= strokes.length - 1) return;
    const newIdx = historyIndex + 1;
    setHistoryIndex(newIdx);
    persistState(strokes, newIdx);
  }, [strokes, historyIndex, persistState]);

  const getCoords = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      const viewport = viewportRef.current;
      if (!viewport) return null;
      const rect = viewport.getBoundingClientRect();
      let clientX: number;
      let clientY: number;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      const vx = clientX - rect.left;
      const vy = clientY - rect.top;
      return {
        x: (vx - pan.x) / zoom,
        y: (vy - pan.y) / zoom,
      };
    },
    [pan, zoom]
  );

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (tool === 'pan') return;
    const coords = getCoords(e);
    if (!coords) return;

    e.preventDefault();
    containerRef.current?.focus({ preventScroll: true });
    setCurrentStroke({
      tool,
      size: tool === 'eraser' ? eraserSize : penSize,
      points: [coords],
    });
    setIsDrawing(true);
  };

  const startPan = (e: React.MouseEvent | React.TouchEvent) => {
    if (tool !== 'pan') return;
    e.preventDefault();
    const viewport = viewportRef.current;
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    let clientX: number;
    let clientY: number;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    panStartRef.current = {
      startVx: clientX - rect.left,
      startVy: clientY - rect.top,
      startPanX: pan.x,
      startPanY: pan.y,
    };
    setIsPanning(true);
  };

  const doPan = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!isPanning) return;
      const viewport = viewportRef.current;
      if (!viewport) return;
      const rect = viewport.getBoundingClientRect();
      let clientX: number;
      let clientY: number;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }
      const vx = clientX - rect.left;
      const vy = clientY - rect.top;
      const { startVx, startVy, startPanX, startPanY } = panStartRef.current;
      setPan({
        x: startPanX + (vx - startVx),
        y: startPanY + (vy - startVy),
      });
    },
    [isPanning]
  );

  const stopPan = useCallback(() => {
    setIsPanning(false);
  }, []);

  useEffect(() => {
    if (!isPanning) return;
    const onMove = (e: MouseEvent | TouchEvent) => doPan(e);
    const onUp = () => stopPan();
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [isPanning, doPan, stopPan]);

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (tool === 'pan' || (!isDrawing && e.type !== 'mousedown' && e.type !== 'touchstart')) return;
    const coords = getCoords(e);
    if (!coords) return;

    e.preventDefault();
    setCurrentStroke((prev) => {
      if (!prev) return prev;
      const last = prev.points[prev.points.length - 1];
      if (Math.abs(last.x - coords.x) < 0.5 && Math.abs(last.y - coords.y) < 0.5) return prev;
      return { ...prev, points: [...prev.points, coords] };
    });
  };

  const stopDrawing = useCallback(() => {
    if (!isDrawing) return;
    setIsDrawing(false);
    setCurrentStroke((prev) => {
      if (!prev || prev.points.length < 2) return null;
      setStrokes((s) => {
        const newStrokes = s.slice(0, historyIndex + 1);
        newStrokes.push(prev);
        const trimmed = newStrokes.length > MAX_HISTORY ? newStrokes.slice(-MAX_HISTORY) : newStrokes;
        setHistoryIndex(trimmed.length - 1);
        persistState(trimmed, trimmed.length - 1);
        return trimmed;
      });
      return null;
    });
  }, [isDrawing, historyIndex, persistState]);

  const zoomIn = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const newZoom = Math.min(MAX_ZOOM, zoom + ZOOM_STEP_BUTTON);
    const scale = newZoom / zoom;
    setPan((p) => ({
      x: cx - (cx - p.x) * scale,
      y: cy - (cy - p.y) * scale,
    }));
    setZoom(newZoom);
  }, [zoom]);

  const zoomOut = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const newZoom = Math.max(MIN_ZOOM, zoom - ZOOM_STEP_BUTTON);
    const scale = newZoom / zoom;
    setPan((p) => ({
      x: cx - (cx - p.x) * scale,
      y: cy - (cy - p.y) * scale,
    }));
    setZoom(newZoom);
  }, [zoom]);

  const resetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const viewport = viewportRef.current;
      if (!viewport) return;
      const rect = viewport.getBoundingClientRect();
      const vx = e.clientX - rect.left;
      const vy = e.clientY - rect.top;
      const delta = Math.max(-0.05, Math.min(0.05, -e.deltaY * 0.002));
      setZoom((z) => {
        const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z + delta));
        const scale = newZoom / z;
        setPan((p) => ({
          x: vx - (vx - p.x) * scale,
          y: vy - (vy - p.y) * scale,
        }));
        return newZoom;
      });
    },
    []
  );

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    viewport.addEventListener('wheel', handleWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // Keyboard shortcuts: Ctrl+Z (undo), Ctrl+Y / Ctrl+Shift+Z (redo) when pad has focus
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handler = (e: KeyboardEvent) => {
      if (!e.ctrlKey && !(e.shiftKey && e.key === 'z')) return;
      if (e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) redo();
        else undo();
      } else if (e.key === 'y') {
        e.preventDefault();
        redo();
      }
    };
    el.addEventListener('keydown', handler);
    return () => el.removeEventListener('keydown', handler);
  }, [undo, redo]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="group"
      aria-label="Scratch pad"
      className={`rounded-xl overflow-hidden border outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-1 ${className}`}
      style={{
        background: 'rgb(var(--surface-2))',
        borderColor: 'rgb(var(--border))',
      }}
    >
      <div
        className="flex items-center gap-2 px-3 py-2 border-b"
        style={{ borderColor: 'rgb(var(--border))' }}
      >
        <span className="text-sm font-medium mr-1" style={{ color: 'rgb(var(--text-secondary))' }}>
          Scratch pad
        </span>
        <div className="flex items-center gap-1 rounded-lg p-0.5" style={{ background: 'rgb(var(--surface))' }}>
          <button
            type="button"
            onClick={() => setTool('pen')}
            className={`p-2 rounded-md transition-colors ${
              tool === 'pen'
                ? 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title="Pen"
          >
            <Pen className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setTool('eraser')}
            className={`p-2 rounded-md transition-colors ${
              tool === 'eraser'
                ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title="Eraser"
          >
            <Eraser className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setTool('pan')}
            className={`p-2 rounded-md transition-colors ${
              tool === 'pan'
                ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title="Pan (move)"
          >
            <Move className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-center gap-0.5 rounded-lg p-0.5" style={{ background: 'rgb(var(--surface))' }}>
          <button
            type="button"
            onClick={zoomOut}
            disabled={zoom <= MIN_ZOOM}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="px-2 text-xs tabular-nums" style={{ color: 'rgb(var(--text-secondary))' }}>
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={zoomIn}
            disabled={zoom >= MAX_ZOOM}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={resetView}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Reset view"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
        {tool === 'pen' && (
          <input
            type="range"
            min="1"
            max="6"
            value={penSize}
            onChange={(e) => setPenSize(Number(e.target.value))}
            className="w-20 h-2 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            title="Pen size"
          />
        )}
        {tool === 'eraser' && (
          <input
            type="range"
            min="8"
            max="40"
            value={eraserSize}
            onChange={(e) => setEraserSize(Number(e.target.value))}
            className="w-20 h-2 rounded-lg appearance-none cursor-pointer accent-red-500"
            title="Eraser size"
          />
        )}
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            onClick={undo}
            disabled={historyIndex < 0}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={redo}
            disabled={historyIndex >= strokes.length - 1}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={clearCanvas}
            className="p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
            title="Clear"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div
        ref={viewportRef}
        className="relative overflow-hidden touch-none"
        style={{ height: `${height}px`, background: 'rgb(var(--surface))' }}
        role="application"
      >
        <canvas
          ref={strokesCanvasRef}
          onMouseDown={(e) => (tool === 'pan' ? startPan(e) : startDrawing(e))}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={(e) => (tool === 'pan' ? startPan(e) : startDrawing(e))}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="block w-full h-full touch-none"
          style={{
            width: '100%',
            height: '100%',
            cursor: tool === 'pan' ? (isPanning ? 'grabbing' : 'grab') : 'crosshair',
          }}
        />
      </div>
    </div>
  );
}
