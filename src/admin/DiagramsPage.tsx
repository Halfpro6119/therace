import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Trash2, Copy, Edit, Image as ImageIcon, Clock } from 'lucide-react';
import { supabase } from '../db/client';
import type { Diagram, Subject } from '../types';
import { useToast } from '../contexts/ToastContext';
import { useConfirm } from '../contexts/ConfirmContext';

export function DiagramsPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [diagramsRes, subjectsRes] = await Promise.all([
        supabase.from('diagrams').select('*').order('updated_at', { ascending: false }),
        supabase.from('subjects').select('*').order('name')
      ]);

      if (diagramsRes.error) throw diagramsRes.error;
      if (subjectsRes.error) throw subjectsRes.error;

      setDiagrams(diagramsRes.data?.map(d => ({
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
      })) || []);

      setSubjects(subjectsRes.data || []);
    } catch (error) {
      console.error('Error loading data:', error);
      showToast('error', 'Failed to load diagrams');
    } finally {
      setLoading(false);
    }
  };

  const getUsageCount = async (diagramId: string): Promise<number> => {
    const { data, error } = await supabase.rpc('count_diagram_usage', { diagram_uuid: diagramId });
    if (error) {
      console.error('Error counting usage:', error);
      return 0;
    }
    return data || 0;
  };

  const handleDelete = async (diagram: Diagram) => {
    const usageCount = await getUsageCount(diagram.id);

    const message = usageCount > 0
      ? `This diagram is used by ${usageCount} prompt${usageCount > 1 ? 's' : ''}. Delete anyway?`
      : `Delete "${diagram.title}"?`;

    const confirmed = await confirm({ title: 'Confirm', message });
    if (!confirmed) return;

    const { error } = await supabase.from('diagrams').delete().eq('id', diagram.id);

    if (error) {
      showToast('error', 'Failed to delete diagram');
      return;
    }

    showToast('success', 'Diagram deleted');
    loadData();
  };

  const handleDuplicate = async (diagram: Diagram) => {
    const { error } = await supabase.from('diagrams').insert({
      title: `${diagram.title} (Copy)`,
      subject_id: diagram.subjectId,
      diagram_type: diagram.diagramType,
      tags: diagram.tags,
      storage_mode: diagram.storageMode,
      canvas_data: diagram.canvasData,
      svg_data: diagram.svgData,
      png_url: diagram.pngUrl,
      width: diagram.width,
      height: diagram.height
    });

    if (error) {
      showToast('error', 'Failed to duplicate diagram');
      return;
    }

    showToast('success', 'Diagram duplicated');
    loadData();
  };

  const filteredDiagrams = diagrams.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = !filterSubject || d.subjectId === filterSubject;
    const matchesType = !filterType || d.diagramType === filterType;
    return matchesSearch && matchesSubject && matchesType;
  });

  const diagramTypes = Array.from(new Set(diagrams.map(d => d.diagramType)));

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading diagrams...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Diagram Library</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage reusable diagram templates
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/diagrams/new')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Diagram
        </button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search diagrams by title or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
          />
        </div>

        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
        >
          <option value="">All Subjects</option>
          {subjects.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
        >
          <option value="">All Types</option>
          {diagramTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {filteredDiagrams.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold mb-2">No diagrams found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {searchQuery || filterSubject || filterType
              ? 'Try adjusting your filters'
              : 'Get started by creating your first diagram'}
          </p>
          {!searchQuery && !filterSubject && !filterType && (
            <button
              onClick={() => navigate('/admin/diagrams/new')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Diagram
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiagrams.map(diagram => (
            <DiagramCard
              key={diagram.id}
              diagram={diagram}
              subjects={subjects}
              onEdit={() => navigate(`/admin/diagrams/${diagram.id}`)}
              onDelete={() => handleDelete(diagram)}
              onDuplicate={() => handleDuplicate(diagram)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface DiagramCardProps {
  diagram: Diagram;
  subjects: Subject[];
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

function DiagramCard({ diagram, subjects, onEdit, onDelete, onDuplicate }: DiagramCardProps) {
  const [usageCount, setUsageCount] = useState<number | null>(null);

  useEffect(() => {
    loadUsageCount();
  }, [diagram.id]);

  const loadUsageCount = async () => {
    const { data } = await supabase.rpc('count_diagram_usage', { diagram_uuid: diagram.id });
    setUsageCount(data || 0);
  };

  const subject = subjects.find(s => s.id === diagram.subjectId);
  const updatedAt = new Date(diagram.updatedAt);
  const relativeTime = getRelativeTime(updatedAt);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        {diagram.svgData ? (
          <div
            className="max-w-full max-h-full"
            dangerouslySetInnerHTML={{ __html: diagram.svgData }}
          />
        ) : (
          <ImageIcon className="w-16 h-16 text-gray-400" />
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{diagram.title}</h3>

        <div className="flex items-center gap-2 mb-3 text-sm text-gray-600 dark:text-gray-400">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded">
            {diagram.diagramType}
          </span>
          {subject && (
            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
              {subject.name}
            </span>
          )}
        </div>

        {diagram.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {diagram.tags.slice(0, 3).map((tag, i) => (
              <span key={i} className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
                {tag}
              </span>
            ))}
            {diagram.tags.length > 3 && (
              <span className="text-xs px-2 py-0.5 text-gray-500">
                +{diagram.tags.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {relativeTime}
          </div>
          {usageCount !== null && (
            <div>{usageCount} use{usageCount !== 1 ? 's' : ''}</div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={onDuplicate}
            className="flex items-center justify-center px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Duplicate"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="flex items-center justify-center px-3 py-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}
