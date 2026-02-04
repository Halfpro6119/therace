/**
 * QUESTION DOODLE PAD
 *
 * A compact drawing area shown underneath the question so users can
 * visualise and doodle as if they had paper in front of them.
 * Uses pen and eraser tools; state is persisted per quiz session.
 */

import { useRef, useEffect, useState, useCallback } from 'react';
import { Pen, Eraser, Trash2 } from 'lucide-react';

export interface QuestionDoodlePadProps {
  /** Unique key for this quiz session (e.g. quizId + startTime). One pad per session. */
  sessionId: string;
  /** Optional fixed height in px. Default 280. */
  height?: number;
  /** Optional class name for the wrapper. */
  className?: string;
}

type Tool = 'pen' | 'eraser';

const STORAGE_PREFIX = 'doodle_pad_';
const DEFAULT_HEIGHT = 280;
const DEFAULT_PEN_SIZE = 2;
const DEFAULT_ERASER_SIZE = 16;
const PAPER_LIGHT = '#faf9f6';
const PAPER_DARK = 'rgb(39 39 42)';
const GRID_LIGHT = 'rgba(0,0,0,0.06)';
const GRID_DARK = 'rgba(255,255,255,0.06)';

export function QuestionDoodlePad({ sessionId, height = DEFAULT_HEIGHT, className = '' }: QuestionDoodlePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<Tool>('pen');
  const [penSize, setPenSize] = useState(DEFAULT_PEN_SIZE);
  const [eraserSize, setEraserSize] = useState(DEFAULT_ERASER_SIZE);
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

  const drawPaperBackground = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.fillStyle = getCssBg();
      ctx.fillRect(0, 0, width, height);
      const gridColor = getGridColor();
      const spacing = 20;
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      for (let x = 0; x <= width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    },
    [getCssBg, getGridColor]
  );

  // Init canvas size and load saved image
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = canvas.parentElement;
    if (!container) return;

    const dpr = window.devicePixelRatio || 1;
    const w = container.clientWidth;
    const h = height;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.scale(dpr, dpr);

    drawPaperBackground(ctx, w, h);

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, w, h);
        };
        img.src = saved;
      } catch {
        // ignore invalid saved state
      }
    }
  }, [sessionId, height, storageKey, drawPaperBackground]);

  const saveToStorage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const data = canvas.toDataURL('image/png');
      localStorage.setItem(storageKey, data);
    } catch {
      // ignore quota etc.
    }
  }, [storageKey]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    ctx.clearRect(0, 0, w, h);
    drawPaperBackground(ctx, w, h);
    saveToStorage();
  }, [drawPaperBackground, saveToStorage]);

  const getCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    let clientX: number;
    let clientY: number;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const coords = getCoords(e);
    if (!canvas || !ctx || !coords) return;

    e.preventDefault();
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing && e.type !== 'mousedown' && e.type !== 'touchstart') return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const coords = getCoords(e);
    if (!canvas || !ctx || !coords) return;

    e.preventDefault();

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.lineWidth = eraserSize;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.strokeStyle = 'rgb(var(--text))';
      ctx.lineWidth = penSize;
    }

    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveToStorage();
    }
  };

  return (
    <div
      className={`rounded-xl overflow-hidden border ${className}`}
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
        <button
          type="button"
          onClick={clearCanvas}
          className="ml-auto p-2 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
          title="Clear"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div
        className="relative overflow-hidden"
        style={{ height: `${height}px`, background: 'rgb(var(--surface))' }}
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="cursor-crosshair touch-none block w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}
