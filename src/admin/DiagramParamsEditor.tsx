import { useState, useEffect } from 'react';
import { Eye, AlertCircle, CheckCircle } from 'lucide-react';
import { getAllTemplates, validateDiagram } from '../diagrams/engine';
import { DiagramRenderer } from '../components/DiagramRenderer';
import type { DiagramMetadata, DiagramParams, DiagramEngineTemplate } from '../types';

interface DiagramParamsEditorProps {
  metadata?: DiagramMetadata;
  onChange: (metadata: DiagramMetadata | undefined) => void;
}

export function DiagramParamsEditor({ metadata, onChange }: DiagramParamsEditorProps) {
  const [mode, setMode] = useState<'none' | 'auto' | 'template' | 'asset'>(metadata?.mode || 'none');
  const [templateId, setTemplateId] = useState(metadata?.templateId || '');
  const [placement, setPlacement] = useState(metadata?.placement || 'above');
  const [caption, setCaption] = useState(metadata?.caption || '');
  const [alt, setAlt] = useState(metadata?.alt || '');
  const [params, setParams] = useState<DiagramParams>(metadata?.params || {});
  const [showPreview, setShowPreview] = useState(false);
  const [templates] = useState(getAllTemplates());
  const [selectedTemplate, setSelectedTemplate] = useState<DiagramEngineTemplate | null>(null);

  useEffect(() => {
    if (mode === 'auto' && templateId) {
      const template = templates.find(t => t.templateId === templateId);
      setSelectedTemplate(template || null);

      if (template && !metadata?.params) {
        const defaultParams: DiagramParams = {
          labels: {},
          positions: {},
          values: {},
          visibility: {}
        };

        if (template.schema.labels) {
          Object.entries(template.schema.labels).forEach(([key, config]) => {
            if (config.default !== undefined) {
              defaultParams.labels![key] = config.default;
            }
          });
        }

        if (template.schema.positions) {
          Object.entries(template.schema.positions).forEach(([key, config]) => {
            if (config.default) {
              defaultParams.positions![key] = config.default;
            }
          });
        }

        if (template.schema.values) {
          Object.entries(template.schema.values).forEach(([key, config]) => {
            if (config.default !== undefined) {
              defaultParams.values![key] = config.default;
            }
          });
        }

        if (template.schema.visibility) {
          Object.entries(template.schema.visibility).forEach(([key, config]) => {
            if (config.default !== undefined) {
              defaultParams.visibility![key] = config.default;
            }
          });
        }

        setParams(defaultParams);
      }
    }
  }, [mode, templateId, templates]);

  useEffect(() => {
    if (mode === 'none' || (mode === 'auto' && !templateId)) {
      onChange(undefined);
    } else {
      onChange({
        mode: mode as 'auto' | 'template' | 'asset',
        templateId,
        placement,
        caption: caption || undefined,
        alt: alt || undefined,
        params: mode === 'auto' ? params : undefined
      });
    }
  }, [mode, templateId, placement, caption, alt, params]);

  const handleLabelChange = (key: string, value: string) => {
    setParams(prev => ({
      ...prev,
      labels: { ...prev.labels, [key]: value }
    }));
  };

  const handleValueChange = (key: string, value: string | number) => {
    setParams(prev => ({
      ...prev,
      values: { ...prev.values, [key]: value }
    }));
  };

  const handleVisibilityChange = (key: string, value: boolean) => {
    setParams(prev => ({
      ...prev,
      visibility: { ...prev.visibility, [key]: value }
    }));
  };

  const handlePositionChange = (key: string, coord: 'x' | 'y', value: number) => {
    setParams(prev => ({
      ...prev,
      positions: {
        ...prev.positions,
        [key]: {
          ...(prev.positions?.[key] || { x: 0, y: 0 }),
          [coord]: value
        }
      }
    }));
  };

  const currentMetadata: DiagramMetadata = {
    mode: mode as 'auto',
    templateId,
    placement,
    caption: caption || undefined,
    alt: alt || undefined,
    params
  };

  const validation = mode === 'auto' && templateId ? validateDiagram(currentMetadata) : null;

  const categorizedTemplates = templates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, DiagramEngineTemplate[]>);

  if (mode === 'none') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Diagram Configuration</h3>
        <div className="space-y-3">
          <button
            onClick={() => setMode('auto')}
            className="w-full px-4 py-3 text-left bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors"
          >
            <div className="font-medium text-indigo-900">Auto-Render Diagram</div>
            <div className="text-sm text-indigo-700 mt-1">Generate diagram from parameters (recommended)</div>
          </button>
          <button
            onClick={() => setMode('template')}
            className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
          >
            <div className="font-medium text-gray-900">Use Template with Overrides</div>
            <div className="text-sm text-gray-700 mt-1">Apply overrides to stored SVG template</div>
          </button>
          <button
            onClick={() => setMode('asset')}
            className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
          >
            <div className="font-medium text-gray-900">Use Static Asset</div>
            <div className="text-sm text-gray-700 mt-1">Link to existing diagram asset</div>
          </button>
        </div>
      </div>
    );
  }

  if (mode !== 'auto') {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Diagram Configuration</h3>
          <button
            onClick={() => setMode('none')}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Change Mode
          </button>
        </div>
        <p className="text-gray-600">Mode "{mode}" is not yet fully supported in this editor. Use auto mode for now.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Auto-Render Diagram</h3>
          <button
            onClick={() => setMode('none')}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Remove Diagram
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Template
            </label>
            <select
              value={templateId}
              onChange={(e) => setTemplateId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select a template...</option>
              {Object.entries(categorizedTemplates).map(([category, categoryTemplates]) => (
                <optgroup key={category} label={category.charAt(0).toUpperCase() + category.slice(1)}>
                  {categoryTemplates.map(template => (
                    <option key={template.templateId} value={template.templateId}>
                      {template.title}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
            {selectedTemplate && (
              <p className="text-sm text-gray-600 mt-1">{selectedTemplate.description}</p>
            )}
          </div>

          {validation && (
            <div className={`p-3 rounded-lg ${validation.ok ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center gap-2">
                {validation.ok ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}
                <span className={`font-medium ${validation.ok ? 'text-green-900' : 'text-red-900'}`}>
                  {validation.ok ? 'Valid Configuration' : 'Validation Failed'}
                </span>
              </div>
              {validation.errors.length > 0 && (
                <ul className="list-disc list-inside mt-2 text-sm text-red-700">
                  {validation.errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                  ))}
                </ul>
              )}
              {validation.warnings.length > 0 && (
                <ul className="list-disc list-inside mt-2 text-sm text-yellow-700">
                  {validation.warnings.map((warning, idx) => (
                    <li key={idx}>{warning}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Placement</label>
              <select
                value={placement}
                onChange={(e) => setPlacement(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="above">Above Question</option>
                <option value="below">Below Question</option>
                <option value="side">Side (Desktop)</option>
                <option value="inline">Inline</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Caption (optional)</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Diagram is not to scale"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text (optional)</label>
            <input
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Description for screen readers"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {selectedTemplate && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Diagram Parameters</h3>

          <div className="space-y-6">
            {selectedTemplate.schema.labels && Object.keys(selectedTemplate.schema.labels).length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Labels</h4>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(selectedTemplate.schema.labels).map(([key, config]) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        {key} {config.required && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        type="text"
                        value={params.labels?.[key] || ''}
                        onChange={(e) => handleLabelChange(key, e.target.value)}
                        maxLength={config.maxLen}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTemplate.schema.values && Object.keys(selectedTemplate.schema.values).length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Values</h4>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(selectedTemplate.schema.values).map(([key, config]) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        {key} {config.required && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        type={config.type === 'number' ? 'number' : 'text'}
                        value={params.values?.[key] ?? ''}
                        onChange={(e) => handleValueChange(key, config.type === 'number' ? parseFloat(e.target.value) : e.target.value)}
                        min={config.min}
                        max={config.max}
                        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTemplate.schema.visibility && Object.keys(selectedTemplate.schema.visibility).length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Visibility</h4>
                <div className="space-y-2">
                  {Object.entries(selectedTemplate.schema.visibility).map(([key, config]) => (
                    <label key={key} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={params.visibility?.[key] ?? config.default ?? true}
                        onChange={(e) => handleVisibilityChange(key, e.target.checked)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700">{key}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {selectedTemplate.schema.positions && Object.keys(selectedTemplate.schema.positions).length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Positions (Normalized 0-1)</h4>
                <div className="space-y-3">
                  {Object.entries(selectedTemplate.schema.positions).map(([key, config]) => (
                    <div key={key} className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          {key} X {config.required && <span className="text-red-500">*</span>}
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="1"
                          value={params.positions?.[key]?.x ?? config.default?.x ?? 0}
                          onChange={(e) => handlePositionChange(key, 'x', parseFloat(e.target.value))}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          {key} Y
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="1"
                          value={params.positions?.[key]?.y ?? config.default?.y ?? 0}
                          onChange={(e) => handlePositionChange(key, 'y', parseFloat(e.target.value))}
                          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {templateId && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
            >
              <Eye className="w-4 h-4" />
              {showPreview ? 'Hide' : 'Show'} Preview
            </button>
          </div>
          {showPreview && (
            <DiagramRenderer metadata={currentMetadata} showWarnings={true} />
          )}
        </div>
      )}
    </div>
  );
}
