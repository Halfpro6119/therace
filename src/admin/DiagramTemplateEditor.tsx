import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Eye, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../db/client';
import { useToast } from '../contexts/ToastContext';
import { DiagramRenderer } from '../components/DiagramRenderer';
import type { DiagramTemplate, Subject, DiagramSchema, DiagramAnchors, DiagramMetadata } from '../types';

export function DiagramTemplateEditor() {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const [formData, setFormData] = useState({
    templateId: '',
    title: '',
    subjectId: '',
    topicTags: [] as string[],
    baseSvgData: '',
    width: 800,
    height: 600
  });

  const [anchors, setAnchors] = useState<DiagramAnchors>({
    points: [],
    text: [],
    lines: [],
    marks: [],
    groups: []
  });

  const [schema, setSchema] = useState<DiagramSchema>({
    labels: {},
    values: {},
    visibility: {},
    positions: {},
    styles: { highlight: [], muted: [] }
  });

  const [previewOverrides, setPreviewOverrides] = useState('{}');
  const [newTag, setNewTag] = useState('');
  const [newSchemaKey, setNewSchemaKey] = useState('');
  const [activeSchemaTab, setActiveSchemaTab] = useState<'labels' | 'values' | 'visibility' | 'positions'>('labels');

  useEffect(() => {
    loadData();
  }, [templateId]);

  const loadData = async () => {
    setLoading(true);
    try {
      const subjectsRes = await supabase.from('subjects').select('*').order('name');
      if (subjectsRes.error) throw subjectsRes.error;
      setSubjects(subjectsRes.data || []);

      if (templateId && templateId !== 'new') {
        const { data, error } = await supabase
          .from('diagram_templates')
          .select('*')
          .eq('id', templateId)
          .single();

        if (error) throw error;

        setFormData({
          templateId: data.template_id,
          title: data.title,
          subjectId: data.subject_id || '',
          topicTags: data.topic_tags || [],
          baseSvgData: data.base_svg_data,
          width: data.width,
          height: data.height
        });

        setAnchors(data.anchors || {
          points: [],
          text: [],
          lines: [],
          marks: [],
          groups: []
        });

        setSchema(data.schema || {
          labels: {},
          values: {},
          visibility: {},
          positions: {},
          styles: { highlight: [], muted: [] }
        });
      }
    } catch (error) {
      console.error('Error loading data:', error);
      showToast('error', 'Failed to load template');
    } finally {
      setLoading(false);
    }
  };

  const validateTemplateId = (id: string): boolean => {
    const pattern = /^[a-z]+\.[a-z_]+\.[a-z_]+\.v\d+$/;
    return pattern.test(id);
  };

  const handleSave = async () => {
    if (!formData.templateId.trim()) {
      showToast('error', 'Template ID is required');
      return;
    }

    if (!validateTemplateId(formData.templateId)) {
      showToast('error', 'Template ID must follow pattern: subject.topic.name.vN');
      return;
    }

    if (!formData.title.trim()) {
      showToast('error', 'Title is required');
      return;
    }

    if (!formData.baseSvgData.trim()) {
      showToast('error', 'SVG data is required');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        template_id: formData.templateId,
        title: formData.title,
        subject_id: formData.subjectId || null,
        topic_tags: formData.topicTags,
        base_svg_data: formData.baseSvgData,
        width: formData.width,
        height: formData.height,
        anchors: anchors,
        schema: schema
      };

      if (templateId && templateId !== 'new') {
        const { error } = await supabase
          .from('diagram_templates')
          .update(payload)
          .eq('id', templateId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('diagram_templates')
          .insert(payload);

        if (error) throw error;
      }

      showToast('success', 'Template saved successfully');
      navigate('/admin/diagram-templates');
    } catch (error: any) {
      console.error('Error saving template:', error);
      if (error.code === '23505') {
        showToast('error', 'Template ID already exists');
      } else {
        showToast('error', 'Failed to save template');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.topicTags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        topicTags: [...prev.topicTags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      topicTags: prev.topicTags.filter(t => t !== tag)
    }));
  };

  const handleAddSchemaEntry = () => {
    if (!newSchemaKey.trim()) return;

    const key = newSchemaKey.trim();

    if (activeSchemaTab === 'labels') {
      setSchema(prev => ({
        ...prev,
        labels: {
          ...prev.labels,
          [key]: { default: '', maxLen: 50 }
        }
      }));
    } else if (activeSchemaTab === 'values') {
      setSchema(prev => ({
        ...prev,
        values: {
          ...prev.values,
          [key]: { default: 0, min: 0, max: 100, type: 'number' }
        }
      }));
    } else if (activeSchemaTab === 'visibility') {
      setSchema(prev => ({
        ...prev,
        visibility: {
          ...prev.visibility,
          [key]: { default: true }
        }
      }));
    } else if (activeSchemaTab === 'positions') {
      setSchema(prev => ({
        ...prev,
        positions: {
          ...prev.positions,
          [key]: { default: { x: 0, y: 0 } }
        }
      }));
    }

    setNewSchemaKey('');
  };

  const handleRemoveSchemaEntry = (category: string, key: string) => {
    setSchema(prev => {
      const updated = { ...prev };
      if (category === 'labels' && updated.labels) {
        delete updated.labels[key];
      } else if (category === 'values' && updated.values) {
        delete updated.values[key];
      } else if (category === 'visibility' && updated.visibility) {
        delete updated.visibility[key];
      } else if (category === 'positions' && updated.positions) {
        delete updated.positions[key];
      }
      return updated;
    });
  };

  const previewMetadata: DiagramMetadata = {
    mode: 'template',
    templateId: formData.templateId,
    placement: 'above',
    overrides: previewOverrides ? JSON.parse(previewOverrides) : undefined
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/admin/diagram-templates')}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {templateId === 'new' ? 'New Diagram Template' : 'Edit Diagram Template'}
            </h1>
            <p className="text-gray-600 mt-1">Configure reusable diagram with override schema</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <Eye className="w-5 h-5" />
            {showPreview ? 'Hide' : 'Show'} Preview
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Template'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Template ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.templateId}
                  onChange={(e) => setFormData(prev => ({ ...prev, templateId: e.target.value }))}
                  placeholder="math.circle_theorems.angle_in_semicircle.v1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Format: subject.topic.name.vN
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Angle in a Semicircle"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select
                  value={formData.subjectId}
                  onChange={(e) => setFormData(prev => ({ ...prev, subjectId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">None</option>
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Topic Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    placeholder="circle-theorems"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.topicTags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-sm"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-indigo-900"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                  <input
                    type="number"
                    value={formData.width}
                    onChange={(e) => setFormData(prev => ({ ...prev, width: parseInt(e.target.value) || 800 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                  <input
                    type="number"
                    value={formData.height}
                    onChange={(e) => setFormData(prev => ({ ...prev, height: parseInt(e.target.value) || 600 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              SVG Data <span className="text-red-500">*</span>
            </h2>
            <textarea
              value={formData.baseSvgData}
              onChange={(e) => setFormData(prev => ({ ...prev, baseSvgData: e.target.value }))}
              placeholder="<svg>...</svg>"
              rows={12}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-2">
              Use element IDs with prefixes: pt:, txt:, ln:, mk:, grp:
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Override Schema</h2>

            <div className="flex gap-2 mb-4 border-b border-gray-200">
              {(['labels', 'values', 'visibility', 'positions'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveSchemaTab(tab)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    activeSchemaTab === tab
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSchemaKey}
                  onChange={(e) => setNewSchemaKey(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSchemaEntry())}
                  placeholder={`Enter ${activeSchemaTab} key...`}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                />
                <button
                  onClick={handleAddSchemaEntry}
                  className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {activeSchemaTab === 'labels' && schema.labels && Object.entries(schema.labels).map(([key, config]) => (
                  <div key={key} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm font-medium">{key}</span>
                      <button
                        onClick={() => handleRemoveSchemaEntry('labels', key)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="number"
                      value={config.maxLen || 50}
                      onChange={(e) => setSchema(prev => ({
                        ...prev,
                        labels: {
                          ...prev.labels,
                          [key]: { ...config, maxLen: parseInt(e.target.value) || 50 }
                        }
                      }))}
                      placeholder="Max length"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                ))}

                {activeSchemaTab === 'values' && schema.values && Object.entries(schema.values).map(([key, config]) => (
                  <div key={key} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm font-medium">{key}</span>
                      <button
                        onClick={() => handleRemoveSchemaEntry('values', key)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        value={config.min || 0}
                        onChange={(e) => setSchema(prev => ({
                          ...prev,
                          values: {
                            ...prev.values,
                            [key]: { ...config, min: parseFloat(e.target.value) || 0 }
                          }
                        }))}
                        placeholder="Min"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                      <input
                        type="number"
                        value={config.max || 100}
                        onChange={(e) => setSchema(prev => ({
                          ...prev,
                          values: {
                            ...prev.values,
                            [key]: { ...config, max: parseFloat(e.target.value) || 100 }
                          }
                        }))}
                        placeholder="Max"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      />
                    </div>
                  </div>
                ))}

                {activeSchemaTab === 'visibility' && schema.visibility && Object.entries(schema.visibility).map(([key, config]) => (
                  <div key={key} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                    <span className="font-mono text-sm font-medium">{key}</span>
                    <button
                      onClick={() => handleRemoveSchemaEntry('visibility', key)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {activeSchemaTab === 'positions' && schema.positions && Object.entries(schema.positions).map(([key, config]) => (
                  <div key={key} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-sm font-medium">{key}</span>
                      <button
                        onClick={() => handleRemoveSchemaEntry('positions', key)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={config.linkedText || ''}
                      onChange={(e) => setSchema(prev => ({
                        ...prev,
                        positions: {
                          ...prev.positions,
                          [key]: { ...config, linkedText: e.target.value }
                        }
                      }))}
                      placeholder="Linked text ID (optional)"
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {showPreview && formData.baseSvgData && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Test Overrides (JSON)
                </label>
                <textarea
                  value={previewOverrides}
                  onChange={(e) => setPreviewOverrides(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono text-sm"
                />
              </div>
              {formData.templateId && (
                <DiagramRenderer metadata={previewMetadata} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
