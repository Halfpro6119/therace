import { useRef, useEffect, useState } from 'react';
import { Pen, Eraser, Trash2, Undo2, Redo2, Grid3x3, Grid2x2, Square } from 'lucide-react';

interface DrawingCanvasProps {
  attemptId: string;
}

type Tool = 'pen' | 'highlighter' | 'eraser';
type GridType = 'none' | 'squared' | 'dotted';

interface DrawState {
  imageData: string;
  history: string[];
  historyIndex: number;
}

export function DrawingCanvas({ attemptId }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const strokesRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<Tool>('pen');
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(3);
  const [gridType, setGridType] = useState<GridType>('none');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const storageKey = `drawing_${attemptId}`;

  const compositeToDisplay = () => {
    const canvas = canvasRef.current;
    const strokes = strokesRef.current;
    if (!canvas || !strokes) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawGrid(ctx, canvas.width, canvas.height);
    ctx.drawImage(strokes, 0, 0);
  };

  const ensureLayers = () => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return false;
    const w = container.clientWidth;
    const h = Math.max(400, window.innerHeight * 0.5);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      if (!strokesRef.current) strokesRef.current = document.createElement('canvas');
      strokesRef.current.width = w;
      strokesRef.current.height = h;
    }
    return true;
  };

  useEffect(() => {
    if (!ensureLayers()) return;
    const strokes = strokesRef.current;
    if (!strokes) return;

    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        const state: DrawState = JSON.parse(saved);
        const img = new Image();
        img.onload = () => {
          const sCtx = strokes.getContext('2d');
          if (sCtx) {
            sCtx.clearRect(0, 0, strokes.width, strokes.height);
            sCtx.drawImage(img, 0, 0);
          }
          setHistory(state.history);
          setHistoryIndex(state.historyIndex);
          compositeToDisplay();
        };
        img.src = state.imageData;
      } catch (error) {
        console.error('Failed to load drawing:', error);
        compositeToDisplay();
      }
    } else {
      const sCtx = strokes.getContext('2d');
      if (sCtx) sCtx.clearRect(0, 0, strokes.width, strokes.height);
      compositeToDisplay();
      saveState();
    }
  }, [attemptId]);

  useEffect(() => {
    if (ensureLayers()) compositeToDisplay();
  }, [gridType]);

  const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    if (gridType === 'none') return;

    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;

    const spacing = gridType === 'squared' ? 20 : 10;

    if (gridType === 'squared') {
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
    } else if (gridType === 'dotted') {
      ctx.fillStyle = '#e5e7eb';
      for (let x = 0; x <= width; x += spacing) {
        for (let y = 0; y <= height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  };

  const saveState = () => {
    compositeToDisplay();
    const strokes = strokesRef.current;
    if (!strokes) return;

    const imageData = strokes.toDataURL('image/png');
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(imageData);

    if (newHistory.length > 50) {
      newHistory.shift();
    } else {
      setHistoryIndex(prev => prev + 1);
    }

    setHistory(newHistory);

    const state: DrawState = {
      imageData,
      history: newHistory,
      historyIndex: newHistory.length - 1
    };
    localStorage.setItem(storageKey, JSON.stringify(state));
  };

  const undo = () => {
    if (historyIndex <= 0) return;

    const strokes = strokesRef.current;
    if (!strokes) return;

    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);

    const img = new Image();
    img.onload = () => {
      const sCtx = strokes.getContext('2d');
      if (sCtx) {
        sCtx.clearRect(0, 0, strokes.width, strokes.height);
        sCtx.drawImage(img, 0, 0);
      }
      compositeToDisplay();
    };
    img.src = history[newIndex];
  };

  const redo = () => {
    if (historyIndex >= history.length - 1) return;

    const strokes = strokesRef.current;
    if (!strokes) return;

    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);

    const img = new Image();
    img.onload = () => {
      const sCtx = strokes.getContext('2d');
      if (sCtx) {
        sCtx.clearRect(0, 0, strokes.width, strokes.height);
        sCtx.drawImage(img, 0, 0);
      }
      compositeToDisplay();
    };
    img.src = history[newIndex];
  };

  const clearCanvas = () => {
    const strokes = strokesRef.current;
    if (!strokes) return;

    const sCtx = strokes.getContext('2d');
    if (sCtx) sCtx.clearRect(0, 0, strokes.width, strokes.height);
    compositeToDisplay();
    saveState();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    ensureLayers();
    const strokes = strokesRef.current;
    const ctx = strokes?.getContext('2d');
    if (!strokes || !ctx) return;

    ctx.beginPath();

    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      compositeToDisplay();
      saveState();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing && e.type !== 'mousedown' && e.type !== 'touchstart') return;

    const canvas = canvasRef.current;
    const strokes = strokesRef.current;
    const ctx = strokes?.getContext('2d');
    if (!canvas || !strokes || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = size * 3;
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.globalAlpha = 1;
    } else {
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = size;
      ctx.strokeStyle = color;
      ctx.globalAlpha = tool === 'highlighter' ? 0.3 : 1;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;

    compositeToDisplay();
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-3 border-b border-gray-200 dark:border-gray-700 flex-wrap">
        <div className="flex items-center gap-1 border border-gray-300 dark:border-gray-600 rounded-lg p-1">
          <button
            onClick={() => setTool('pen')}
            className={`p-2 rounded transition-colors ${
              tool === 'pen' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title="Pen"
          >
            <Pen className="w-4 h-4" />
          </button>
          <button
            onClick={() => { setTool('highlighter'); setColor('#ffeb3b'); }}
            className={`p-2 rounded transition-colors ${
              tool === 'highlighter' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title="Highlighter"
          >
            <Pen className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTool('eraser')}
            className={`p-2 rounded transition-colors ${
              tool === 'eraser' ? 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title="Eraser"
          >
            <Eraser className="w-4 h-4" />
          </button>
        </div>

        {tool !== 'eraser' && (
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-10 rounded border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
            title="Color"
          />
        )}

        <input
          type="range"
          min="1"
          max="10"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-24"
          title="Size"
        />

        <div className="flex items-center gap-1 border border-gray-300 dark:border-gray-600 rounded-lg p-1">
          <button
            onClick={() => setGridType('none')}
            className={`p-2 rounded transition-colors ${
              gridType === 'none' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title="No Grid"
          >
            <Square className="w-4 h-4" />
          </button>
          <button
            onClick={() => setGridType('squared')}
            className={`p-2 rounded transition-colors ${
              gridType === 'squared' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title="Squared Grid"
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setGridType('dotted')}
            className={`p-2 rounded transition-colors ${
              gridType === 'dotted' ? 'bg-gray-200 dark:bg-gray-700' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            title="Dotted Grid"
          >
            <Grid2x2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1" />

        <button
          onClick={undo}
          disabled={historyIndex <= 0}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Undo"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          onClick={redo}
          disabled={historyIndex >= history.length - 1}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Redo"
        >
          <Redo2 className="w-4 h-4" />
        </button>
        <button
          onClick={clearCanvas}
          className="p-2 rounded hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 transition-colors"
          title="Clear"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-hidden bg-white dark:bg-gray-900">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="cursor-crosshair touch-none"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}
