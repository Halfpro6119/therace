import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTemplates, getTemplatesByCategory } from '../diagrams/engine';
import { DiagramRenderer } from '../components/DiagramRenderer';
import { Search, Filter, Eye, Copy } from 'lucide-react';
import type { DiagramMetadata } from '../types';

export function DiagramTemplatesHome() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const allTemplates = getAllTemplates();

  const categories = useMemo(() => {
    const cats = new Set(allTemplates.map(t => t.category));
    return ['all', ...Array.from(cats).sort()];
  }, [allTemplates]);

  const filteredTemplates = useMemo(() => {
    let filtered = allTemplates;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(t =>
        t.title.toLowerCase().includes(term) ||
        t.templateId.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [allTemplates, searchTerm, selectedCategory]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Diagram Templates Library
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Browse and manage {allTemplates.length} auto-render diagram templates for GCSE content
        </p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search templates by name, ID, or description..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="relative min-w-[200px]">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredTemplates.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No templates found matching your search criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredTemplates.map(template => (
            <TemplateCard key={template.templateId} template={template} />
          ))}
        </div>
      )}
    </div>
  );
}

function TemplateCard({ template }: { template: any }) {
  const [showPreview, setShowPreview] = useState(false);

  const metadata: DiagramMetadata = {
    mode: 'auto',
    templateId: template.templateId,
    params: {}
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(template.templateId);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            {template.title}
          </h3>
          <span className="px-2 py-1 text-xs font-medium rounded bg-blue-100 dark:bg-blue-900/30
                         text-blue-800 dark:text-blue-300 whitespace-nowrap">
            {template.category}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {template.description}
        </p>
        <div className="flex items-center gap-2">
          <code className="text-xs bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300
                         px-2 py-1 rounded font-mono flex-1 truncate">
            {template.templateId}
          </code>
          <button
            onClick={handleCopyId}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            title="Copy template ID"
          >
            <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div className="p-4">
        {showPreview ? (
          <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 mb-3">
            <DiagramRenderer metadata={metadata} showWarnings={true} />
          </div>
        ) : (
          <div className="bg-gray-50 dark:bg-gray-900 rounded p-4 mb-3 h-48 flex items-center justify-center">
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              Click preview to render
            </p>
          </div>
        )}

        <button
          onClick={() => setShowPreview(!showPreview)}
          className="w-full flex items-center justify-center gap-2 px-4 py-2
                   bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Eye className="w-4 h-4" />
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
      </div>

      <div className="px-4 pb-4">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <div className="mb-1">
            <span className="font-semibold">Schema:</span>{' '}
            {Object.keys(template.schema.labels || {}).length} labels,{' '}
            {Object.keys(template.schema.values || {}).length} values,{' '}
            {Object.keys(template.schema.visibility || {}).length} toggles
          </div>
        </div>
      </div>
    </div>
  );
}
