import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Download } from 'lucide-react';
import { supabase } from '../db/client';
import { useToast } from '../contexts/ToastContext';
import { DiagramRenderer } from '../components/DiagramRenderer';
import { getAllTemplates } from '../diagrams/engine';

const ENGINE_TEMPLATE_IDS = new Set(getAllTemplates().map(t => t.templateId));
import type { DiagramTemplate, DiagramMetadata, DiagramEngineTemplate } from '../types';

interface DisplayTemplate extends DiagramTemplate {
  isEngineTemplate?: boolean;
  description?: string;
}

export function DiagramTemplateDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [template, setTemplate] = useState<DisplayTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const [copying, setCopying] = useState(false);

  useEffect(() => {
    loadTemplate();
  }, [id]);

  const loadTemplate = async () => {
    setLoading(true);
    try {
      if (!id) throw new Error('No template ID provided');

      // Check if it's an engine template
      if (id.startsWith('engine-')) {
        const templateId = id.replace('engine-', '');
        const engineTemplates = getAllTemplates();
        const engineTemplate = engineTemplates.find(t => t.templateId === templateId);

        if (!engineTemplate) throw new Error('Template not found');

        const converted = convertEngineTemplate(engineTemplate);
        setTemplate(converted);
      } else {
        // Load from database
        const { data, error } = await supabase
          .from('diagram_templates')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (!data) throw new Error('Template not found');

        setTemplate({
          id: data.id,
          templateId: data.template_id,
          title: data.title,
          subjectId: data.subject_id,
          subjectKey: data.subject_key,
          topicTags: data.topic_tags || [],
          engineMode: data.engine_mode || 'template',
          baseCanvasData: data.base_canvas_data,
          baseSvgData: data.base_svg_data,
          width: data.width,
          height: data.height,
          anchors: data.anchors || {},
          schema: data.schema || {},
          defaults: data.defaults || {},
          createdAt: data.created_at,
          updatedAt: data.updated_at,
          isEngineTemplate: false
        });
      }
    } catch (error) {
      console.error('Error loading template:', error);
      showToast('error', 'Failed to load template');
      navigate('/admin/diagram-templates');
    } finally {
      setLoading(false);
    }
  };

  const convertEngineTemplate = (engineTemplate: DiagramEngineTemplate): DisplayTemplate => {
    const topicTags = generateTopicTags(engineTemplate.templateId);
    const subjectKey = getSubjectKey(engineTemplate.category);

    return {
      id: `engine-${engineTemplate.templateId}`,
      templateId: engineTemplate.templateId,
      title: engineTemplate.title,
      description: engineTemplate.description,
      subjectId: undefined,
      subjectKey: subjectKey,
      topicTags: topicTags,
      engineMode: 'auto',
      baseCanvasData: undefined,
      baseSvgData: undefined,
      width: 500,
      height: 400,
      anchors: {},
      schema: engineTemplate.schema,
      defaults: extractDefaults(engineTemplate),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isEngineTemplate: true
    };
  };

  const extractDefaults = (template: DiagramEngineTemplate): Record<string, any> => {
    const defaults: Record<string, any> = {
      labels: {},
      values: {},
      visibility: {},
      positions: {}
    };

    if (template.schema.labels) {
      for (const [key, config] of Object.entries(template.schema.labels)) {
        if (config.default !== undefined) {
          defaults.labels[key] = config.default;
        }
      }
    }

    if (template.schema.values) {
      for (const [key, config] of Object.entries(template.schema.values)) {
        if (config.default !== undefined) {
          defaults.values[key] = config.default;
        }
      }
    }

    if (template.schema.visibility) {
      for (const [key, config] of Object.entries(template.schema.visibility)) {
        if (config.default !== undefined) {
          defaults.visibility[key] = config.default;
        }
      }
    }

    if (template.schema.positions) {
      for (const [key, config] of Object.entries(template.schema.positions)) {
        if (config.default) {
          defaults.positions[key] = config.default;
        }
      }
    }

    return defaults;
  };

  const generateTopicTags = (templateId: string): string[] => {
    const tags: string[] = [];
    const parts = templateId.split('.');
    if (parts.length >= 2) {
      tags.push(parts[1]);
    }
    if (parts.length >= 3) {
      tags.push(parts[2]);
    }
    return tags;
  };

  const getSubjectKey = (category: string): string => {
    const categoryMap: Record<string, string> = {
      'geometry': 'math',
      'graphs': 'math',
      'statistics': 'math',
      'algebra': 'math',
      'physics': 'physics',
      'chemistry': 'chemistry',
      'biology': 'biology'
    };
    return categoryMap[category] || 'math';
  };

  const handleDuplicate = async () => {
    if (!template) return;

    setCopying(true);
    try {
      const newTemplateId = `${template.templateId}.copy`;
      const { error } = await supabase
        .from('diagram_templates')
        .insert({
          template_id: newTemplateId,
          title: `${template.title} (Copy)`,
          subject_id: template.subjectId || null,
          subject_key: template.subjectKey,
          topic_tags: template.topicTags,
          engine_mode: template.engineMode,
          base_canvas_data: template.baseCanvasData,
          base_svg_data: template.baseSvgData,
          width: template.width,
          height: template.height,
          anchors: template.anchors,
          schema: template.schema,
          defaults: template.defaults
        });

      if (error) throw error;

      showToast('success', 'Template duplicated');
      navigate('/admin/diagram-templates');
    } catch (error) {
      console.error('Error duplicating template:', error);
      showToast('error', 'Failed to duplicate template');
    } finally {
      setCopying(false);
    }
  };

  const handleDownloadSVG = async () => {
    if (!template || template.engineMode !== 'auto') return;

    try {
      const result = await import('../diagrams/engine').then(m => 
        m.renderDiagram({
          mode: 'auto',
          templateId: template.templateId,
          params: template.defaults || {}
        })
      );

      const svg = result.svg;
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${template.templateId}.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      showToast('success', 'SVG downloaded');
    } catch (error) {
      console.error('Error downloading SVG:', error);
      showToast('error', 'Failed to download SVG');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Template not found</h1>
          <button
            onClick={() => navigate('/admin/diagram-templates')}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Back to Templates
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={() => navigate('/admin/diagram-templates')}
        className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Templates
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{template.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 font-mono">{template.templateId}</p>
              {template.description && (
                <p className="text-gray-600 dark:text-gray-400 mt-2">{template.description}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {(template.engineMode === 'auto' || ENGINE_TEMPLATE_IDS.has(template.templateId)) && (
                <button
                  onClick={handleDownloadSVG}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <Download className="w-4 h-4" />
                  Download SVG
                </button>
              )}
              <button
                onClick={handleDuplicate}
                disabled={copying}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                <Copy className="w-4 h-4" />
                {copying ? 'Copying...' : 'Duplicate'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-8 flex items-center justify-center min-h-96">
                {(template.engineMode === 'auto' || ENGINE_TEMPLATE_IDS.has(template.templateId)) ? (
                  <DiagramRenderer
                    metadata={{
                      mode: 'auto',
                      templateId: template.templateId,
                      params: template.defaults || {}
                    } as DiagramMetadata}
                    showWarnings={true}
                  />
                ) : template.baseSvgData ? (
                  <div dangerouslySetInnerHTML={{ __html: template.baseSvgData }} />
                ) : (
                  <div className="text-gray-400 text-center">
                    <p className="text-lg">No preview available</p>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Subject</h3>
                <p className="text-gray-600 dark:text-gray-400">{template.subjectKey}</p>
              </div>

              {template.topicTags.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {template.topicTags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Type</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {template.isEngineTemplate ? 'Engine Template' : 'Custom Template'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Mode</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {template.engineMode === 'auto' ? 'Auto-render' : 'Static'}
                </p>
              </div>

              {template.schema && Object.keys(template.schema).length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Parameters</h3>
                  <div className="space-y-2 text-sm">
                    {template.schema.labels && Object.keys(template.schema.labels).length > 0 && (
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">
                          <span className="font-medium">Labels:</span> {Object.keys(template.schema.labels).join(', ')}
                        </p>
                      </div>
                    )}
                    {template.schema.values && Object.keys(template.schema.values).length > 0 && (
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">
                          <span className="font-medium">Values:</span> {Object.keys(template.schema.values).join(', ')}
                        </p>
                      </div>
                    )}
                    {template.schema.visibility && Object.keys(template.schema.visibility).length > 0 && (
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">
                          <span className="font-medium">Visibility:</span> {Object.keys(template.schema.visibility).join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
