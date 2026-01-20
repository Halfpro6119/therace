import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, BookOpen } from 'lucide-react';
import { papersDb } from '../db/papers';
import { useToast } from '../contexts/ToastContext';
import type { Paper, PaperWithQuestionCount } from '../types/papers';

export function PapersPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [papers, setPapers] = useState<PaperWithQuestionCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [subjectId] = useState('0d9b0cc0-1779-4097-a684-f41d5b994f50'); // Maths subject ID

  useEffect(() => {
    loadPapers();
  }, []);

  const loadPapers = async () => {
    try {
      setLoading(true);
      const data = await papersDb.getPapersWithCounts(subjectId);
      setPapers(data);
    } catch (error) {
      console.error('Error loading papers:', error);
      showToast('error', 'Failed to load papers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this paper?')) return;

    try {
      await papersDb.deletePaper(id);
      showToast('success', 'Paper deleted successfully');
      loadPapers();
    } catch (error) {
      console.error('Error deleting paper:', error);
      showToast('error', 'Failed to delete paper');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <BookOpen size={32} style={{ color: 'rgb(var(--accent))' }} />
          <h1 className="text-3xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            Exam Papers
          </h1>
        </div>
        <button
          onClick={() => navigate('/admin/papers/new')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors"
          style={{
            backgroundColor: 'rgb(var(--accent))',
            color: 'white',
          }}
        >
          <Plus size={20} />
          New Paper
        </button>
      </div>

      {loading ? (
        <div style={{ color: 'rgb(var(--text-secondary))' }}>Loading papers...</div>
      ) : papers.length === 0 ? (
        <div
          className="text-center py-12 rounded-lg border"
          style={{
            borderColor: 'rgb(var(--border))',
            backgroundColor: 'rgb(var(--surface))',
            color: 'rgb(var(--text-secondary))',
          }}
        >
          <BookOpen size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-lg">No papers created yet</p>
          <p className="text-sm mt-2">Create your first exam paper to get started</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {papers.map((paper) => (
            <div
              key={paper.id}
              className="p-4 rounded-lg border flex items-center justify-between"
              style={{
                borderColor: 'rgb(var(--border))',
                backgroundColor: 'rgb(var(--surface))',
              }}
            >
              <div className="flex-1">
                <h3 className="font-semibold text-lg" style={{ color: 'rgb(var(--text))' }}>
                  {paper.name}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                  <span>Paper {paper.paper_number}</span>
                  <span>•</span>
                  <span>{paper.questionCount} questions</span>
                  <span>•</span>
                  <span>
                    Calculator: {paper.calculator_allowed_default ? '✓ Allowed' : '✗ Not Allowed'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(`/admin/papers/${paper.id}`)}
                  className="p-2 rounded-lg hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: 'rgb(var(--accent) / 0.1)', color: 'rgb(var(--accent))' }}
                  title="Edit paper"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(paper.id)}
                  className="p-2 rounded-lg hover:opacity-80 transition-opacity"
                  style={{ backgroundColor: 'rgb(255, 0, 0 / 0.1)', color: 'rgb(239, 68, 68)' }}
                  title="Delete paper"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
