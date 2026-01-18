import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Tag, Trash2, Copy, Edit, RefreshCw, Zap, Image as ImageIcon, Eye } from 'lucide-react';
import { supabase } from '../db/client';
import { useToast } from '../contexts/ToastContext';
import { useConfirm } from '../contexts/ConfirmContext';
import { seedAllDiagramTemplates } from './seedAllDiagramTemplates';
import { DiagramRenderer } from '../components/DiagramRenderer';
import { getAllTemplates } from '../diagrams/engine';
import type { DiagramTemplate, Subject, DiagramMetadata, DiagramEngineTemplate } from '../types';

interface DisplayTemplate extends DiagramTemplate {
  isEngineTemplate?: boolean;
}

export function DiagramTemplatesPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const engineTemplates = useState(() => getAllTemplates())[0];
  const engineTemplateIds = useState(() => new Set(engineTemplates.map(t => t.templateId)))[0];
  const [templates, setTemplates] = useState<DisplayTemplate[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSubject, setFilterSubject] = useState<string>('');
  const [filterTag, setFilterTag] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load database templates
      const [templatesRes, subjectsRes] = await Promise.all([
        supabase.from('diagram_templates').select('*').order('created_at', { ascending: false }),
        supabase.from('subjects').select('*').order('name')
      ]);

      if (templatesRes.error) throw templatesRes.error;
      if (subjectsRes.error) throw subjectsRes.error;

      const dbTemplates: DisplayTemplate[] = (templatesRes.data || []).map(t => ({
        id: t.id,
        templateId: t.template_id,
        title: t.title,
        subjectId: t.subject_id,
        subjectKey: t.subject_key,
        topicTags: t.topic_tags || [],
        engineMode: t.engine_mode || 'template',
        baseCanvasData: t.base_canvas_data,
        baseSvgData: t.base_svg_data,
        width: t.width,
        height: t.height,
        anchors: t.anchors || {},
        schema: t.schema || {},
        defaults: t.defaults || {},
        createdAt: t.created_at,
        updatedAt: t.updated_at,
        isEngineTemplate: false
      }));

      // Load engine templates
      const engineTemplateMap = new Map(dbTemplates.map(t => [t.templateId, t]));

      // Merge engine templates with database templates
      const mergedTemplates: DisplayTemplate[] = [
        ...dbTemplates,
        ...engineTemplates
          .filter(et => !engineTemplateMap.has(et.templateId))
          .map(et => convertEngineTemplate(et))
      ];

      // Sort by title
      mergedTemplates.sort((a, b) => a.title.localeCompare(b.title));

      setTemplates(mergedTemplates);
      setSubjects(subjectsRes.data || []);
    } catch (error) {
      console.error('Error loading templates:', error);
      showToast('error', 'Failed to load templates');
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

  const handleDelete = async (template: DisplayTemplate) => {
    if (template.isEngineTemplate) {
      showToast('error', 'Cannot delete engine templates. They are read-only.');
      return;
    }

    const confirmed = await confirm({
      title: `Delete template "${template.title}"?`,
      message: 'This action cannot be undone. Prompts using this template will lose their diagrams.',
      destructive: true
    });

    if (!confirmed) return;

    try {
      const { error } = await supabase
        .from('diagram_templates')
        .delete()
        .eq('id', template.id);

      if (error) throw error;

      showToast('success', 'Template deleted');
      loadData();
    } catch (error) {
      console.error('Error deleting template:', error);
      showToast('error', 'Failed to delete template');
    }
  };

  const handleDuplicate = async (template: DisplayTemplate) => {
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
      loadData();
    } catch (error) {
      console.error('Error duplicating template:', error);
      showToast('error', 'Failed to duplicate template');
    }
  };

  const handleSyncTemplates = async () => {
    const confirmed = await confirm({
      title: 'Sync Engine Templates?',
      message: 'This will add/update all diagram templates from the engine registry to the database.'
    });

    if (!confirmed) return;

    setSyncing(true);
    try {
      const result = await seedAllDiagramTemplates();

      if (result.success) {
        showToast(
          'success',
          `Synced successfully: ${result.inserted} added, ${result.updated} updated`
        );
      } else {
        showToast(
          'error',
          `Sync completed with errors: ${result.errors.length} errors`
        );
        console.error('Sync errors:', result.errors);
      }

      loadData();
    } catch (error) {
      console.error('Error syncing templates:', error);
      showToast('error', 'Failed to sync templates');
    } finally {
      setSyncing(false);
    }
  };

  const filteredTemplates = templates.filter(t => {
    const matchesSearch = !searchTerm ||
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.templateId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSubject = !filterSubject || t.subjectId === filterSubject;

    const matchesTag = !filterTag || t.topicTags.includes(filterTag);

    return matchesSearch && matchesSubject && matchesTag;
  });

  const allTags = Array.from(new Set(templates.flatMap(t => t.topicTags)));

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Diagram Templates</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {templates.length} templates - Reusable diagram structures with override support
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleSyncTemplates}
            disabled={syncing}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`} />
            {syncing ? 'Syncing...' : 'Sync to Database'}
          </button>
          <button
            onClick={() => navigate('/admin/diagram-templates/new')}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-5 h-5" />
            New Template
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Subjects</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>

          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map(template => {
            const subject = subjects.find(s => s.id === template.subjectId);

            return (
              <div key={template.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                  <div className="w-full h-40 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center overflow-hidden">
                    {(() => {
                      const canAutoRender = template.engineMode === 'auto' || engineTemplateIds.has(template.templateId);
                      return canAutoRender ? (
                      <DiagramRenderer
                        metadata={{
                          mode: 'auto',
                          templateId: template.templateId,
                          params: template.defaults || {}
                        } as DiagramMetadata}
                        showWarnings={false}
                        fitToContainer={true}
                      />
                    ) : template.baseSvgData ? (
                      <div dangerouslySetInnerHTML={{ __html: template.baseSvgData }} />
                    ) : (
                      <div className="text-gray-400 text-sm">No preview</div>
                    );
                    })()}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex-1">{template.title}</h3>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium flex items-center gap-1 whitespace-nowrap ${
                      template.isEngineTemplate
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        : template.engineMode === 'auto'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    }`}>
                      {template.isEngineTemplate ? (
                        <>
                          <Zap className="w-3 h-3" />
                          Engine
                        </>
                      ) : template.engineMode === 'auto' ? (
                        <>
                          <Zap className="w-3 h-3" />
                          Auto
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-3 h-3" />
                          Template
                        </>
                      )}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-mono mb-3 truncate">{template.templateId}</p>

                  {(subject || template.subjectKey) && (
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      Subject: {subject?.name || template.subjectKey}
                    </div>
                  )}

                  {template.topicTags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {template.topicTags.map(tag => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-xs"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={() => navigate(`/admin/diagram-templates/view/${template.id}`)}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    {!template.isEngineTemplate && (
                      <button
                        onClick={() => navigate(`/admin/diagram-templates/${template.id}`)}
                        className="flex items-center justify-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDuplicate(template)}
                      className="flex items-center justify-center gap-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    {!template.isEngineTemplate && (
                      <button
                        onClick={() => handleDelete(template)}
                        className="flex items-center justify-center gap-1 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredTemplates.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500">
              No templates found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
