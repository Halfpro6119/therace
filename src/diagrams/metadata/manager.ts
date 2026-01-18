/**
 * Diagram Metadata Manager
 * 
 * Handles CRUD operations for diagram metadata in the database.
 * Manages metadata persistence, versioning, and retrieval.
 */

import { supabase } from '../../db/client';
import type { DiagramMetadata, Diagram } from '../../types';

export interface DiagramMetadataRecord {
  id: string;
  diagramId: string;
  metadata: DiagramMetadata;
  version: number;
  createdAt: string;
  updatedAt: string;
}

export interface MetadataQueryOptions {
  mode?: 'auto' | 'template' | 'asset';
  templateId?: string;
  subjectId?: string;
  limit?: number;
  offset?: number;
}

/**
 * Save diagram metadata to database
 * Creates or updates metadata record
 */
export async function saveDiagramMetadata(
  diagramId: string,
  metadata: DiagramMetadata
): Promise<{ success: boolean; error?: string }> {
  try {
    // Check if metadata already exists
    const { data: existing } = await supabase
      .from('diagram_metadata')
      .select('id, version')
      .eq('diagram_id', diagramId)
      .single();

    if (existing) {
      // Update existing metadata
      const { error } = await supabase
        .from('diagram_metadata')
        .update({
          metadata,
          version: existing.version + 1,
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id);

      if (error) throw error;
    } else {
      // Create new metadata record
      const { error } = await supabase
        .from('diagram_metadata')
        .insert({
          diagram_id: diagramId,
          metadata,
          version: 1
        });

      if (error) throw error;
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Retrieve diagram metadata from database
 */
export async function getDiagramMetadata(
  diagramId: string
): Promise<DiagramMetadata | null> {
  try {
    const { data, error } = await supabase
      .from('diagram_metadata')
      .select('metadata')
      .eq('diagram_id', diagramId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Not found - return null
        return null;
      }
      throw error;
    }

    return data?.metadata || null;
  } catch (error) {
    console.error('Error retrieving metadata:', error);
    return null;
  }
}

/**
 * Query diagrams by metadata criteria
 */
export async function queryDiagramsByMetadata(
  options: MetadataQueryOptions
): Promise<Diagram[]> {
  try {
    let query = supabase
      .from('diagram_metadata')
      .select('diagram_id, metadata');

    // Apply filters
    if (options.mode) {
      query = query.eq('metadata->mode', `"${options.mode}"`);
    }

    if (options.templateId) {
      query = query.eq('metadata->templateId', `"${options.templateId}"`);
    }

    // Apply pagination
    if (options.limit) {
      query = query.limit(options.limit);
    }
    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) throw error;

    // Fetch full diagram data
    if (!data || data.length === 0) return [];

    const diagramIds = data.map(d => d.diagram_id);
    const { data: diagrams, error: diagramError } = await supabase
      .from('diagrams')
      .select('*')
      .in('id', diagramIds);

    if (diagramError) throw diagramError;

    return (diagrams || []).map(d => ({
      ...d,
      tags: d.tags || [],
      canvasData: d.canvas_data || { elements: [] },
      svgData: d.svg_data,
      pngUrl: d.png_url,
      subjectId: d.subject_id,
      diagramType: d.diagram_type,
      storageMode: d.storage_mode,
      createdAt: d.created_at,
      updatedAt: d.updated_at
    }));
  } catch (error) {
    console.error('Error querying diagrams:', error);
    return [];
  }
}

/**
 * Get metadata history/versions
 */
export async function getDiagramMetadataHistory(
  diagramId: string,
  limit: number = 10
): Promise<DiagramMetadataRecord[]> {
  try {
    const { data, error } = await supabase
      .from('diagram_metadata_history')
      .select('*')
      .eq('diagram_id', diagramId)
      .order('version', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return (data || []).map(record => ({
      id: record.id,
      diagramId: record.diagram_id,
      metadata: record.metadata,
      version: record.version,
      createdAt: record.created_at,
      updatedAt: record.updated_at
    }));
  } catch (error) {
    console.error('Error retrieving metadata history:', error);
    return [];
  }
}

/**
 * Delete diagram metadata
 */
export async function deleteDiagramMetadata(
  diagramId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('diagram_metadata')
      .delete()
      .eq('diagram_id', diagramId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Bulk save metadata for multiple diagrams
 */
export async function saveDiagramMetadataBatch(
  records: Array<{ diagramId: string; metadata: DiagramMetadata }>
): Promise<{ success: number; failed: number; errors: string[] }> {
  const results = await Promise.all(
    records.map(record => saveDiagramMetadata(record.diagramId, record.metadata))
  );

  const success = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  const errors = results.filter(r => r.error).map(r => r.error!);

  return { success, failed, errors };
}

/**
 * Export diagram metadata as JSON
 */
export async function exportDiagramMetadata(
  diagramIds?: string[]
): Promise<Record<string, DiagramMetadata>> {
  try {
    let query = supabase
      .from('diagram_metadata')
      .select('diagram_id, metadata');

    if (diagramIds && diagramIds.length > 0) {
      query = query.in('diagram_id', diagramIds);
    }

    const { data, error } = await query;

    if (error) throw error;

    const result: Record<string, DiagramMetadata> = {};
    (data || []).forEach(record => {
      result[record.diagram_id] = record.metadata;
    });

    return result;
  } catch (error) {
    console.error('Error exporting metadata:', error);
    return {};
  }
}

/**
 * Import diagram metadata from JSON
 */
export async function importDiagramMetadata(
  metadata: Record<string, DiagramMetadata>
): Promise<{ success: number; failed: number; errors: string[] }> {
  const records = Object.entries(metadata).map(([diagramId, meta]) => ({
    diagramId,
    metadata: meta
  }));

  return saveDiagramMetadataBatch(records);
}
