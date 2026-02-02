/**
 * Diagram Metadata Manager UI
 * 
 * Admin interface for creating, editing, and managing diagram metadata.
 * Supports bulk operations and metadata validation.
 */

import { useState, useEffect } from 'react';
import {  Upload, Download,  Search } from 'lucide-react';
import { supabase } from '../db/client';
import { useToast } from '../contexts/ToastContext';
import { useConfirm } from '../contexts/ConfirmContext';
import {
  createDiagramFromMetadata,
  saveDiagramMetadata,
  getDiagramMetadata,
  queryDiagramsByMetadata,
  exportDiagramMetadata,
  importDiagramMetadata,
  type DiagramCreationSpec
} from '../diagrams/metadata';
import type { Diagram, DiagramMetadata, Subject } from '../types';

interface MetadataUIState {
  diagrams: Diagram[];
  subjects: Subject[];
  loading: boolean;
  selectedDiagramId: string | null;
  editingMetadata: DiagramMetadata | null;
  searchQuery: string;
  filterMode: 'all' | 'auto' | 'template' | 'asset';
}

export function DiagramMetadataManager() {
  const { showToast } = useToast();
  // const { confirm } = useConfirm();
  const [state, setState] = useState<MetadataUIState>({
    diagrams: [],
    subjects: [],
    loading: true,
    selectedDiagramId: null,
    editingMetadata: null,
    searchQuery: '',
    filterMode: 'all'
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const [diagramsRes, subjectsRes] = await Promise.all([
        supabase.from('diagrams').select('*').order('updated_at', { ascending: false }),
        supabase.from('subjects').select('*').order('name')
      ]);

      if (diagramsRes.error) throw diagramsRes.error;
      if (subjectsRes.error) throw subjectsRes.error;

      const diagrams = (diagramsRes.data || []).map(d => ({
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

      setState(prev => ({
        ...prev,
        diagrams,
        subjects: subjectsRes.data || [],
        loading: false
      }));
    } catch (error) {
      console.error('Error loading data:', error);
      showToast('error', 'Failed to load diagrams');
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleSelectDiagram = async (diagramId: string) => {
    const metadata = await getDiagramMetadata(diagramId);
    setState(prev => ({
      ...prev,
      selectedDiagramId: diagramId,
      editingMetadata: metadata || {
        mode: 'auto',
        templateId: '',
        params: {}
      }
    }));
  };

  const handleSaveMetadata = async () => {
    if (!state.selectedDiagramId || !state.editingMetadata) return;

    try {
      const result = await saveDiagramMetadata(state.selectedDiagramId, state.editingMetadata);
      if (result.success) {
        showToast('success', 'Metadata saved successfully');
        setState(prev => ({
          ...prev,
          selectedDiagramId: null,
          editingMetadata: null
        }));
      } else {
        showToast('error', result.error || 'Failed to save metadata');
      }
    } catch (error) {
      showToast('error', 'Error saving metadata');
    }
  };

  const handleCreateFromMetadata = async () => {
    if (!state.selectedDiagramId || !state.editingMetadata) return;

    const diagram = state.diagrams.find(d => d.id === state.selectedDiagramId);
    if (!diagram) return;

    try {
      const spec: DiagramCreationSpec = {
        title: diagram.title,
        metadata: state.editingMetadata,
        subjectId: diagram.subjectId,
        tags: diagram.tags
      };

      const result = await createDiagramFromMetadata(spec);
      if (result.success) {
        showToast('success', 'Diagram created from metadata');
      } else {
        showToast(result.errors.join(', '), 'error');
      }
    } catch (error) {
      showToast('error', 'Error creating diagram');
    }
  };

  const handleExportMetadata = async () => {
    try {
      const metadata = await exportDiagramMetadata();
      const json = JSON.stringify(metadata, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `diagram-metadata-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('success', 'Metadata exported successfully');
    } catch (error) {
      showToast('error', 'Error exporting metadata');
    }
  };

  const handleImportMetadata = async (file: File) => {
    try {
      const text = await file.text();
      const metadata = JSON.parse(text);
      const result = await importDiagramMetadata(metadata);
      showToast(
        `Imported ${result.success} diagrams, ${result.failed} failed`,
        result.failed === 0 ? 'success' : 'warning'
      );
      loadData();
    } catch (error) {
      showToast('error', 'Error importing metadata');
    }
  };

  const filteredDiagrams = state.diagrams.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (state.loading) {
    return <div className="p-8 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Diagram Metadata Manager</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage diagram metadata for automatic rendering
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportMetadata}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-5 h-5" />
            Export
          </button>
          <label className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer">
            <Upload className="w-5 h-5" />
            Import
            <input
              type="file"
              accept=".json"
              onChange={(e) => e.target.files?.[0] && handleImportMetadata(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Diagram List */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search diagrams..."
                  value={state.searchQuery}
                  onChange={(e) => setState(prev => ({ ...prev, searchQuery: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {filteredDiagrams.map(diagram => (
                <button
                  key={diagram.id}
                  onClick={() => handleSelectDiagram(diagram.id)}
                  className={`w-full text-left p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                    state.selectedDiagramId === diagram.id ? 'bg-blue-50 dark:bg-blue-900' : ''
                  }`}
                >
                  <p className="font-semibold text-sm">{diagram.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{diagram.diagramType}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Metadata Editor */}
        <div className="lg:col-span-2">
          {state.selectedDiagramId && state.editingMetadata ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-6">Edit Metadata</h2>

              {/* Mode Selection */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Mode</label>
                <select
                  value={state.editingMetadata.mode}
                  onChange={(e) => setState(prev => ({
                    ...prev,
                    editingMetadata: {
                      ...prev.editingMetadata!,
                      mode: e.target.value as any
                    }
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                >
                  <option value="auto">Auto (Template-based)</option>
                  <option value="template">Template</option>
                  <option value="asset">Asset</option>
                </select>
              </div>

              {/* Template ID */}
              {(state.editingMetadata.mode === 'auto' || state.editingMetadata.mode === 'template') && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">Template ID</label>
                  <input
                    type="text"
                    value={state.editingMetadata.templateId || ''}
                    onChange={(e) => setState(prev => ({
                      ...prev,
                      editingMetadata: {
                        ...prev.editingMetadata!,
                        templateId: e.target.value
                      }
                    }))}
                    placeholder="e.g., math.trig.right_triangle.v1"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                  />
                </div>
              )}

              {/* Placement */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Placement</label>
                <select
                  value={state.editingMetadata.placement || 'inline'}
                  onChange={(e) => setState(prev => ({
                    ...prev,
                    editingMetadata: {
                      ...prev.editingMetadata!,
                      placement: e.target.value as any
                    }
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                >
                  <option value="above">Above</option>
                  <option value="inline">Inline</option>
                  <option value="below">Below</option>
                  <option value="side">Side</option>
                </select>
              </div>

              {/* Caption */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Caption</label>
                <input
                  type="text"
                  value={state.editingMetadata.caption || ''}
                  onChange={(e) => setState(prev => ({
                    ...prev,
                    editingMetadata: {
                      ...prev.editingMetadata!,
                      caption: e.target.value
                    }
                  }))}
                  placeholder="Optional caption"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              </div>

              {/* Alt Text */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2">Alt Text</label>
                <textarea
                  value={state.editingMetadata.alt || ''}
                  onChange={(e) => setState(prev => ({
                    ...prev,
                    editingMetadata: {
                      ...prev.editingMetadata!,
                      alt: e.target.value
                    }
                  }))}
                  placeholder="Accessibility description"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleSaveMetadata}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Metadata
                </button>
                <button
                  onClick={handleCreateFromMetadata}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Create Diagram
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center text-gray-500">
              <p>Select a diagram to edit its metadata</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
