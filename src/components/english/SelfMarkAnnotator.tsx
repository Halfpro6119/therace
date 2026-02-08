import { useRef, useCallback, useState } from 'react';
import { Highlighter, Underline, Check, MessageSquarePlus } from 'lucide-react';
import type { SelfMarkAnnotations, SelfMarkSpan, SelfMarkTick, SelfMarkNote } from '../../types/englishCampus';

function getSelectionOffsets(root: HTMLElement): { start: number; end: number } | null {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;
  const range = sel.getRangeAt(0);
  if (!root.contains(range.startContainer) || !root.contains(range.endContainer)) return null;

  const getOffset = (node: Node, offset: number): number => {
    const span = node.nodeType === Node.TEXT_NODE
      ? (node.parentElement?.closest('[data-start]') as HTMLElement | null)
      : (node as HTMLElement).closest?.('[data-start]');
    if (!span) return 0;
    const segStart = parseInt(span.getAttribute('data-start') ?? '0', 10);
    if (node.nodeType === Node.TEXT_NODE) return segStart + offset;
    return segStart;
  };

  const start = getOffset(range.startContainer, range.startOffset);
  const end = getOffset(range.endContainer, range.endOffset);
  return start <= end ? { start, end } : { start: end, end: start };
}

interface Segment {
  kind: 'text';
  start: number;
  end: number;
  highlight: boolean;
  underline: boolean;
}
interface TickEl {
  kind: 'tick';
  position: number;
}
interface NoteEl {
  kind: 'note';
  position: number;
  text: string;
}
type SegmentEl = Segment | TickEl | NoteEl;

function buildSegments(content: string, annotations: SelfMarkAnnotations): SegmentEl[] {
  const len = content.length;
  const positions = new Set<number>([0, len]);
  annotations.spans.forEach(s => {
    positions.add(Math.max(0, s.start));
    positions.add(Math.min(len, s.end));
  });
  annotations.ticks.forEach(t => {
    const p = Math.max(0, Math.min(len, t.position));
    positions.add(p);
    positions.add(p + 1);
  });
  annotations.notes.forEach(n => {
    const p = Math.max(0, Math.min(len, n.position));
    positions.add(p);
    positions.add(p + 1);
  });
  const sorted = Array.from(positions).filter(p => p <= len).sort((a, b) => a - b);

  const result: SegmentEl[] = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    const start = sorted[i];
    const end = sorted[i + 1];
    if (start >= end) continue;
    const highlight = annotations.spans.some(s => s.type === 'highlight' && s.start <= start && s.end >= end);
    const underline = annotations.spans.some(s => s.type === 'underline' && s.start <= start && s.end >= end);
    result.push({ kind: 'text', start, end, highlight, underline });
    annotations.ticks.forEach(t => { if (t.position + 1 === end) result.push({ kind: 'tick', position: t.position }); });
    annotations.notes.forEach(n => { if (n.position + 1 === end) result.push({ kind: 'note', position: n.position, text: n.text }); });
  }
  return result;
}

const defaultAnnotations: SelfMarkAnnotations = { spans: [], ticks: [], notes: [] };

interface SelfMarkAnnotatorProps {
  content: string;
  annotations: SelfMarkAnnotations;
  onChange: (annotations: SelfMarkAnnotations) => void;
  readOnly?: boolean;
}

export function SelfMarkAnnotator({ content, annotations, onChange, readOnly }: SelfMarkAnnotatorProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [noteInput, setNoteInput] = useState('');
  const [notePosition, setNotePosition] = useState<number | null>(null);
  const [selection, setSelection] = useState<{ start: number; end: number } | null>(null);

  const ann = annotations ?? defaultAnnotations;

  const captureSelection = useCallback(() => {
    if (!rootRef.current) return;
    const off = getSelectionOffsets(rootRef.current);
    setSelection(off);
  }, []);

  const applySpan = useCallback((type: 'highlight' | 'underline') => {
    if (!selection || selection.start >= selection.end) return;
    const span: SelfMarkSpan = { start: selection.start, end: selection.end, type };
    onChange({
      ...ann,
      spans: [...ann.spans, span],
    });
    setSelection(null);
  }, [ann, selection, onChange]);

  const addTick = useCallback(() => {
    if (!selection) return;
    const position = selection.end;
    onChange({
      ...ann,
      ticks: [...ann.ticks, { position }],
    });
    setSelection(null);
  }, [ann, selection, onChange]);

  const openNoteAtSelection = useCallback(() => {
    if (!selection) return;
    setNotePosition(selection.end);
    setNoteInput('');
  }, [selection]);

  const saveNote = useCallback(() => {
    if (notePosition === null) return;
    const text = noteInput.trim();
    if (text) {
      onChange({
        ...ann,
        notes: [...ann.notes, { position: notePosition, text }],
      });
    }
    setNotePosition(null);
    setNoteInput('');
  }, [ann, notePosition, noteInput, onChange]);

  const cancelNote = useCallback(() => {
    setNotePosition(null);
    setNoteInput('');
  }, []);

  const segments = buildSegments(content, ann);
  const hasSelection = selection && selection.start < selection.end;

  return (
    <div className="space-y-3">
      {!readOnly && (
        <div
          className="flex flex-wrap items-center gap-2 p-2 rounded-lg border"
          style={{ background: 'rgb(var(--surface-2))', borderColor: 'rgb(var(--border))' }}
        >
          <span className="text-xs font-medium mr-1" style={{ color: 'rgb(var(--text-secondary))' }}>
            Select text, then:
          </span>
          <button
            type="button"
            onClick={() => applySpan('highlight')}
            disabled={!hasSelection}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm font-medium disabled:opacity-50"
            style={{ background: 'rgba(34,197,94,0.2)', color: 'rgb(22,163,74)' }}
            title="Highlight selection"
          >
            <Highlighter size={16} />
            Highlight
          </button>
          <button
            type="button"
            onClick={() => applySpan('underline')}
            disabled={!hasSelection}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm font-medium disabled:opacity-50"
            style={{ background: 'rgba(34,197,94,0.2)', color: 'rgb(22,163,74)' }}
            title="Underline selection"
          >
            <Underline size={16} />
            Underline
          </button>
          <button
            type="button"
            onClick={addTick}
            disabled={!selection}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm font-medium disabled:opacity-50"
            style={{ background: 'rgba(34,197,94,0.2)', color: 'rgb(22,163,74)' }}
            title="Add green tick at end of selection"
          >
            <Check size={16} />
            Add tick
          </button>
          <button
            type="button"
            onClick={openNoteAtSelection}
            disabled={!selection}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-sm font-medium disabled:opacity-50"
            style={{ background: 'rgba(34,197,94,0.2)', color: 'rgb(22,163,74)' }}
            title="Add feedback note"
          >
            <MessageSquarePlus size={16} />
            Add note
          </button>
        </div>
      )}

      {notePosition !== null && (
        <div
          className="flex flex-wrap items-center gap-2 p-3 rounded-xl border"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <label className="text-sm font-medium" style={{ color: 'rgb(var(--text))' }}>
            Green pen note:
          </label>
          <input
            type="text"
            value={noteInput}
            onChange={e => setNoteInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') saveNote(); if (e.key === 'Escape') cancelNote(); }}
            placeholder="e.g. Strong opening"
            className="flex-1 min-w-[200px] rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2"
            style={{ background: 'rgb(var(--bg))', borderColor: 'rgb(var(--border))', color: 'rgb(var(--text))' }}
            autoFocus
          />
          <button type="button" onClick={saveNote} className="btn-primary text-sm">
            Save note
          </button>
          <button type="button" onClick={cancelNote} className="btn-ghost text-sm">
            Cancel
          </button>
        </div>
      )}

      <div
        ref={rootRef}
        onMouseUp={readOnly ? undefined : captureSelection}
        onTouchEnd={readOnly ? undefined : captureSelection}
        className="rounded-xl border p-4 min-h-[220px] text-base leading-relaxed select-text"
        style={{
          background: 'rgb(var(--surface))',
          borderColor: 'rgb(var(--border))',
          color: 'rgb(var(--text))',
        }}
      >
        {content ? (
          segments.map((el, i) => {
            if (el.kind === 'text') {
              const text = content.slice(el.start, el.end);
              return (
                <span
                  key={`${el.start}-${el.end}-${i}`}
                  data-start={el.start}
                  data-end={el.end}
                  className={
                    (el.highlight ? 'bg-emerald-200/60 dark:bg-emerald-500/25' : '') +
                    (el.underline ? ' underline decoration-emerald-500 decoration-2' : '')
                  }
                >
                  {text}
                </span>
              );
            }
            if (el.kind === 'tick') {
              return (
                <span key={`tick-${el.position}-${i}`} className="inline-flex align-middle mx-0.5" aria-hidden>
                  <Check size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0" strokeWidth={2.5} />
                </span>
              );
            }
            return (
              <span
                key={`note-${el.position}-${i}`}
                className="inline-flex align-middle mx-1 px-1.5 py-0.5 rounded text-xs font-medium border border-emerald-400/50 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200"
                title={el.text}
              >
                📝 {el.text}
              </span>
            );
          })
        ) : (
          <p className="text-sm" style={{ color: 'rgb(var(--muted))' }}>
            No content to annotate.
          </p>
        )}
      </div>
    </div>
  );
}
