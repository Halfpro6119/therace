/**
 * Admin View Context: draft-aware data and Save / Cancel / Push live actions.
 * Used only under /admin-view when admin is authenticated.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { db, supabase } from '../db/client';
import type { Prompt, Diagram } from '../types';
import { useToast } from './ToastContext';

export type ContentDraftEntityType = 'prompt' | 'diagram';

export interface ContentDraftEntry {
  entityType: ContentDraftEntityType;
  entityId: string;
  updatedAt: string;
  /** Short preview (question snippet or diagram title) for the drafts list. */
  preview?: string;
}

interface AdminViewContextValue {
  isAdminView: boolean;
  /** When in admin view, prefix for in-app links (e.g. '/admin-view'). */
  basePath: string;
  /** Get a single prompt; returns draft if present, else live. */
  getEffectivePrompt: (promptId: string) => Promise<Prompt | null>;
  /** Get multiple prompts with draft overrides. */
  getEffectivePrompts: (promptIds: string[]) => Promise<Prompt[]>;
  /** Get diagram; returns draft if present, else live. */
  getEffectiveDiagram: (diagramId: string) => Promise<Diagram | null>;
  saveDraft: (entityType: ContentDraftEntityType, entityId: string, payload: Record<string, unknown>) => Promise<void>;
  cancelDraft: (entityType: ContentDraftEntityType, entityId: string) => Promise<void>;
  pushDraftLive: (entityType: ContentDraftEntityType, entityId: string) => Promise<void>;
  /** List all drafts for toolbar/badge. */
  draftEntries: ContentDraftEntry[];
  refreshDraftEntries: () => Promise<void>;
  /** List recent publish events (for "revert" UI). */
  getPublishHistory: (limit?: number) => Promise<{ id: string; entityType: ContentDraftEntityType; entityId: string; publishedAt: string; previewText: string | null }[]>;
  /** Restore live content to the state before a publish; removes the history entry. */
  revertPublish: (historyId: string) => Promise<void>;
}

const AdminViewContext = createContext<AdminViewContextValue | null>(null);

function normalizePromptFromDraft(draft: Record<string, unknown>, live: Prompt | null): Prompt {
  const base = live ?? (draft as Prompt);
  return {
    id: (draft.id as string) ?? base.id,
    subjectId: (draft.subjectId as string) ?? base.subjectId,
    unitId: (draft.unitId as string) ?? base.unitId,
    topicId: (draft.topicId as string) ?? base.topicId,
    type: (draft.type as Prompt['type']) ?? base.type,
    question: (draft.question as string) ?? base.question,
    answers: Array.isArray(draft.answers) ? (draft.answers as string[]) : base.answers,
    marks: draft.marks !== undefined ? (draft.marks as number) : base.marks,
    timeAllowanceSec: draft.timeAllowanceSec !== undefined ? (draft.timeAllowanceSec as number) : base.timeAllowanceSec,
    hint: draft.hint !== undefined ? (draft.hint as string) : base.hint,
    explanation: draft.explanation !== undefined ? (draft.explanation as string) : base.explanation,
    paperId: draft.paperId !== undefined ? (draft.paperId as string) : base.paperId,
    tier: draft.tier !== undefined ? (draft.tier as Prompt['tier']) : base.tier,
    calculatorAllowed: draft.calculatorAllowed !== undefined ? (draft.calculatorAllowed as boolean) : base.calculatorAllowed,
    meta: (draft.meta as Prompt['meta']) ?? base.meta,
    diagram_metadata: (draft.diagram_metadata as Prompt['diagram_metadata']) ?? base.diagram_metadata,
  };
}

function normalizeDiagramFromDraft(draft: Record<string, unknown>): Diagram {
  return {
    id: draft.id as string,
    title: (draft.title as string) ?? '',
    subjectId: draft.subjectId as string | undefined,
    diagramType: (draft.diagramType as string) ?? 'general',
    tags: Array.isArray(draft.tags) ? (draft.tags as string[]) : [],
    storageMode: (draft.storageMode as Diagram['storageMode']) ?? 'vector',
    canvasData: (draft.canvasData as Diagram['canvasData']) ?? { elements: [] },
    svgData: draft.svgData as string | undefined,
    pngUrl: draft.pngUrl as string | undefined,
    width: (draft.width as number) ?? 800,
    height: (draft.height as number) ?? 600,
    createdAt: (draft.createdAt as string) ?? new Date().toISOString(),
    updatedAt: (draft.updatedAt as string) ?? new Date().toISOString(),
  };
}

export function AdminViewProvider({ children }: { children: ReactNode }) {
  const { showToast } = useToast();
  const [draftEntries, setDraftEntries] = useState<ContentDraftEntry[]>([]);

  const refreshDraftEntries = useCallback(async () => {
    try {
      const [promptDrafts, diagramDrafts] = await Promise.all([
        db.getDraftsByEntityType('prompt'),
        db.getDraftsByEntityType('diagram'),
      ]);
      const entries: ContentDraftEntry[] = [
        ...promptDrafts.map((d) => ({
          entityType: 'prompt' as const,
          entityId: d.entityId,
          updatedAt: d.updatedAt,
          preview: typeof d.draftJson?.question === 'string' ? d.draftJson.question.slice(0, 100).trim() + (d.draftJson.question.length > 100 ? '…' : '') : undefined,
        })),
        ...diagramDrafts.map((d) => ({
          entityType: 'diagram' as const,
          entityId: d.entityId,
          updatedAt: d.updatedAt,
          preview: typeof d.draftJson?.title === 'string' ? d.draftJson.title : undefined,
        })),
      ];
      setDraftEntries(entries);
    } catch (e) {
      console.error('Failed to refresh draft entries:', e);
    }
  }, []);

  const getEffectivePrompt = useCallback(
    async (promptId: string): Promise<Prompt | null> => {
      const [live, draft] = await Promise.all([
        db.getPrompt(promptId),
        db.getDraft('prompt', promptId),
      ]);
      if (draft && typeof draft === 'object') {
        return normalizePromptFromDraft(draft as Record<string, unknown>, live ?? null);
      }
      return live ?? null;
    },
    []
  );

  const getEffectivePrompts = useCallback(async (promptIds: string[]): Promise<Prompt[]> => {
    if (promptIds.length === 0) return [];
    const live = await db.getPromptsByIds(promptIds);
    const draftMap = new Map<string, Record<string, unknown>>();
    await Promise.all(
      promptIds.map(async (id) => {
        const d = await db.getDraft('prompt', id);
        if (d && typeof d === 'object') draftMap.set(id, d as Record<string, unknown>);
      })
    );
    const liveMap = new Map(live.map((p) => [p.id, p]));
    return promptIds.map((id) => {
      const draft = draftMap.get(id);
      const livePrompt = liveMap.get(id) ?? null;
      if (draft) return normalizePromptFromDraft(draft, livePrompt);
      return livePrompt;
    }).filter(Boolean) as Prompt[];
  }, []);

  const getEffectiveDiagram = useCallback(async (diagramId: string): Promise<Diagram | null> => {
    const draft = await db.getDraft('diagram', diagramId);
    if (draft && typeof draft === 'object') {
      return normalizeDiagramFromDraft(draft as Record<string, unknown>);
    }
    const { data, error } = await supabase
      .from('diagrams')
      .select('*')
      .eq('id', diagramId)
      .maybeSingle();
    if (error) throw error;
    if (!data) return null;
    return {
      id: data.id,
      title: data.title,
      subjectId: data.subject_id,
      diagramType: data.diagram_type,
      tags: data.tags || [],
      storageMode: data.storage_mode,
      canvasData: data.canvas_data || { elements: [] },
      svgData: data.svg_data,
      pngUrl: data.png_url,
      width: data.width,
      height: data.height,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }, []);

  const saveDraft = useCallback(
    async (entityType: ContentDraftEntityType, entityId: string, payload: Record<string, unknown>) => {
      await db.saveDraft(entityType, entityId, payload);
      showToast('success', 'Draft saved');
      await refreshDraftEntries();
    },
    [showToast, refreshDraftEntries]
  );

  const cancelDraft = useCallback(
    async (entityType: ContentDraftEntityType, entityId: string) => {
      await db.deleteDraft(entityType, entityId);
      showToast('success', 'Changes discarded');
      await refreshDraftEntries();
    },
    [showToast, refreshDraftEntries]
  );

  const pushDraftLive = useCallback(
    async (entityType: ContentDraftEntityType, entityId: string) => {
      await db.pushDraftLive(entityType, entityId);
      showToast('success', 'Changes published live');
      await refreshDraftEntries();
    },
    [showToast, refreshDraftEntries]
  );

  const getPublishHistory = useCallback(async (limit = 100) => {
    const rows = await db.getPublishHistory(limit);
    return rows.map((r) => ({ id: r.id, entityType: r.entityType, entityId: r.entityId, publishedAt: r.publishedAt, previewText: r.previewText }));
  }, []);

  const revertPublish = useCallback(
    async (historyId: string) => {
      await db.revertPublish(historyId);
      showToast('success', 'Reverted to previous version');
    },
    [showToast]
  );

  useEffect(() => {
    refreshDraftEntries();
  }, [refreshDraftEntries]);

  const value = useMemo<AdminViewContextValue>(
    () => ({
      isAdminView: true,
      basePath: '/admin-view',
      getEffectivePrompt,
      getEffectivePrompts,
      getEffectiveDiagram,
      saveDraft,
      cancelDraft,
      pushDraftLive,
      draftEntries,
      refreshDraftEntries,
      getPublishHistory,
      revertPublish,
    }),
    [
      getEffectivePrompt,
      getEffectivePrompts,
      getEffectiveDiagram,
      saveDraft,
      cancelDraft,
      pushDraftLive,
      draftEntries,
      refreshDraftEntries,
      getPublishHistory,
      revertPublish,
    ]
  );

  return (
    <AdminViewContext.Provider value={value}>
      {children}
    </AdminViewContext.Provider>
  );
}

export function useAdminView(): AdminViewContextValue | null {
  return useContext(AdminViewContext);
}

export function useIsAdminView(): boolean {
  const ctx = useContext(AdminViewContext);
  return ctx?.isAdminView ?? false;
}
