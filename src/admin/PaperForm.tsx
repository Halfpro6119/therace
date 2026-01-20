import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { papersDb } from '../db/papers';
import { useToast } from '../contexts/ToastContext';
import type { Paper, CreatePaperInput, UpdatePaperInput } from '../types/papers';

export function PaperForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [subjectId] = useState('0d9b0cc0-1779-4097-a684-f41d5b994f50'); // Maths subject ID

  const [formData, setFormData] = useState({
    name: '',
    paperNumber: 1,
    calculatorAllowedDefault: false,
  });

  useEffect(() => {
    if (id) {
      loadPaper();
    }
  }, [id]);

  const loadPaper = async () => {
    try {
      const paper = await papersDb.getPaperById(id!);
      if (paper) {
        setFormData({
          name: paper.name,
          paperNumber: paper.paper_number,
          calculatorAllowedDefault: paper.calculator_allowed_default,
        });
      }
    } catch (error) {
      console.error('Error loading paper:', error);
      showToast('error', 'Failed to load paper');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (id) {
        // Update existing paper
        const updateData: UpdatePaperInput = {
          name: formData.name,
          calculator_allowed_default: formData.calculatorAllowedDefault,
        };
        await papersDb.updatePaper(id, updateData);
        showToast('success', 'Paper updated successfully');
      } else {
        // Create new paper
        const createData: CreatePaperInput = {
          subjectId,
          name: formData.name,
          paperNumber: formData.paperNumber,
          calculatorAllowedDefault: formData.calculatorAllowedDefault,
        };
        await papersDb.createPaper(createData);
        showToast('success', 'Paper created successfully');
      }
      navigate('/admin/papers');
    } catch (error) {
      console.error('Error saving paper:', error);
      showToast('error', 'Failed to save paper');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6" style={{ color: 'rgb(var(--text-secondary))' }}>
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button
        onClick={() => navigate('/admin/papers')}
        className="flex items-center gap-2 mb-6 px-3 py-2 rounded-lg hover:opacity-80 transition-opacity"
        style={{ color: 'rgb(var(--accent))' }}
      >
        <ArrowLeft size={20} />
        Back to Papers
      </button>

      <h1 className="text-3xl font-bold mb-8" style={{ color: 'rgb(var(--text))' }}>
        {id ? 'Edit Paper' : 'Create New Paper'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Paper Name */}
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
            Paper Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Paper 1 (Non-Calculator)"
            className="w-full px-4 py-2 rounded-lg border"
            style={{
              borderColor: 'rgb(var(--border))',
              backgroundColor: 'rgb(var(--surface))',
              color: 'rgb(var(--text))',
            }}
            required
          />
        </div>

        {/* Paper Number */}
        {!id && (
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'rgb(var(--text))' }}>
              Paper Number
            </label>
            <select
              value={formData.paperNumber}
              onChange={(e) => setFormData({ ...formData, paperNumber: parseInt(e.target.value) })}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                borderColor: 'rgb(var(--border))',
                backgroundColor: 'rgb(var(--surface))',
                color: 'rgb(var(--text))',
              }}
            >
              <option value={1}>Paper 1</option>
              <option value={2}>Paper 2</option>
              <option value={3}>Paper 3</option>
            </select>
          </div>
        )}

        {/* Calculator Allowed */}
        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.calculatorAllowedDefault}
              onChange={(e) =>
                setFormData({ ...formData, calculatorAllowedDefault: e.target.checked })
              }
              className="w-4 h-4 rounded"
            />
            <span style={{ color: 'rgb(var(--text))' }}>Calculator Allowed by Default</span>
          </label>
          <p className="text-sm mt-2" style={{ color: 'rgb(var(--text-secondary))' }}>
            Students can use calculators for this paper (can be overridden per question)
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 pt-6">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-opacity disabled:opacity-50"
            style={{
              backgroundColor: 'rgb(var(--accent))',
              color: 'white',
            }}
          >
            <Save size={20} />
            {saving ? 'Saving...' : 'Save Paper'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/papers')}
            className="px-6 py-2 rounded-lg font-medium border transition-colors"
            style={{
              borderColor: 'rgb(var(--border))',
              color: 'rgb(var(--text))',
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
