import { useEffect, useState } from 'react';
import { db, supabase } from '../db/client';
import { Prompt, Subject, Unit, Topic, Diagram, DiagramMetadata, Paper } from '../types';
import { FileText, Edit2, Trash2, Search, Filter, X, Plus } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';
import { useConfirm } from '../contexts/ConfirmContext';
import { DiagramParamsEditor } from './DiagramParamsEditor';
import { PaperSelector } from './components/PaperSelector';

export function PromptsPage() {
  const { showToast } = useToast();
  const { confirm } = useConfirm();
  const [loading, setLoading] = useState(true);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [papers, setPapers] = useState<Paper[]>([]);
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState<string>('');
  const [filterType, setFilterType] = useState<string>('');
  const [filterPaper, setFilterPaper] = useState<string>('');
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [subjectsData, promptsData, diagramsRes] = await Promise.all([
        db.getSubjects(),
        db.getAllPrompts(),
        supabase.from('diagrams').select('*').order('title')
      ]);

      setSubjects(subjectsData);
      setPrompts(promptsData);

      if (diagramsRes.data) {
        setDiagrams(diagramsRes.data.map(d => ({
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
        })));
      }

      const unitsPromises = subjectsData.map(s => db.getUnits(s.id));
      const topicsPromises = subjectsData.map(s => db.getTopics(s.id));
      const papersPromises = subjectsData.map(s => db.listPapersBySubject(s.id));
      const [unitsData, topicsData, papersData] = await Promise.all([
        Promise.all(unitsPromises),
        Promise.all(topicsPromises),
        Promise.all(papersPromises),
      ]);

      setUnits(unitsData.flat());
      setTopics(topicsData.flat());
      setPapers(papersData.flat());
    } catch (error) {
      console.error('Failed to load data:', error);
      showToast('error', 'Failed to load prompts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (prompt: Prompt) => {
    if (!await confirm(`Delete prompt: "${prompt.question}"?`)) return;

    try {
      await db.deletePrompt(prompt.id);
      showToast('success', 'Prompt deleted successfully');
      await loadData();
    } catch (error) {
      console.error('Failed to delete prompt:', error);
      showToast('error', 'Failed to delete prompt');
    }
  };

  const handleSave = async () => {
    if (!editingPrompt) return;

    const filteredAnswers = editingPrompt.answers.filter(a => a.trim());
    if (filteredAnswers.length === 0) {
      showToast('error', 'At least one answer is required');
      return;
    }

    try {
      await db.updatePrompt(editingPrompt.id, {
        ...editingPrompt,
        answers: filteredAnswers
      });
      showToast('success', 'Prompt updated successfully');
      setEditingPrompt(null);
      await loadData();
    } catch (error) {
      console.error('Failed to update prompt:', error);
      showToast('error', 'Failed to update prompt');
    }
  };

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = !searchQuery ||
      prompt.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.explanation?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = !filterSubject || prompt.subjectId === filterSubject;
    const matchesType = !filterType || prompt.type === filterType;
    const matchesPaper = !filterPaper || prompt.paperId === filterPaper;
    return matchesSearch && matchesSubject && matchesType && matchesPaper;
  });

  const getSubjectName = (id: string) => subjects.find(s => s.id === id)?.name || 'Unknown';
  const getUnitName = (id: string) => units.find(u => u.id === id)?.name || 'Unknown';
  const getTopicName = (id: string) => topics.find(t => t.id === id)?.name || 'Unknown';

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Prompts</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage quiz questions and prompts ({filteredPrompts.length} total)
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search prompts..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">All Subjects</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <select
            value={filterPaper}
            onChange={(e) => setFilterPaper(e.target.value)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">All Papers</option>
            {papers
              .filter(p => !filterSubject || p.subjectId === filterSubject)
              .sort((a,b) => a.paperNumber - b.paperNumber)
              .map(p => (
                <option key={p.id} value={p.id}>Paper {p.paperNumber}</option>
              ))}
          </select>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">All Types</option>
            <option value="short">Short Answer</option>
            <option value="long">Long Answer</option>
            <option value="multiple-choice">Multiple Choice</option>
            <option value="true-false">True/False</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700">
              <tr className="text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Question</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Unit</th>
                <th className="px-4 py-3">Topic</th>
                <th className="px-4 py-3">Paper</th>
                <th className="px-4 py-3">Answers</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPrompts.map(prompt => (
                <tr key={prompt.id} className="text-sm hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs font-medium">
                      {prompt.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-w-md">
                    <div className="truncate text-gray-900 dark:text-white">{prompt.question}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {getSubjectName(prompt.subjectId)}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {getUnitName(prompt.unitId)}
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {getTopicName(prompt.topicId)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded text-xs font-medium">
                      {prompt.paperId ? (() => {
                        const paper = papers.find(p => p.id === prompt.paperId);
                        return paper ? `Paper ${paper.paperNumber}` : 'Unknown';
                      })() : 'None'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                    {prompt.answers.length}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingPrompt(prompt)}
                        className="p-1.5 hover:bg-blue-100 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(prompt)}
                        className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPrompts.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No prompts found
          </div>
        )}
      </div>

      {editingPrompt && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Prompt</h2>
              <button
                onClick={() => setEditingPrompt(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Question
                </label>
                <textarea
                  value={editingPrompt.question}
                  onChange={(e) => setEditingPrompt({ ...editingPrompt, question: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Type
                </label>
                <select
                  value={editingPrompt.type}
                  onChange={(e) => setEditingPrompt({ ...editingPrompt, type: e.target.value as any })}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="short">Short Answer</option>
                  <option value="long">Long Answer</option>
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="true-false">True/False</option>
                </select>


              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Paper (optional)
                </label>
                <select
                  value={editingPrompt.paperId || ''}
                  onChange={(e) => setEditingPrompt({
                    ...editingPrompt,
                    paperId: e.target.value ? e.target.value : undefined
                  })}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <option value="">None</option>
                  {papers
                    .filter(p => p.subjectId === editingPrompt.subjectId)
                    .sort((a, b) => a.paperNumber - b.paperNumber)
                    .map((paper) => (
                      <option key={paper.id} value={paper.id}>
                        Paper {paper.paperNumber}: {paper.name}
                      </option>
                    ))}
                </select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Assign this prompt to a specific paper so it appears in Paper Master Quizzes.
                </p>
              </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Correct Answers
                </label>
                <div className="space-y-2">
                  {editingPrompt.answers.map((answer, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={answer}
                        onChange={(e) => {
                          const newAnswers = [...editingPrompt.answers];
                          newAnswers[index] = e.target.value;
                          setEditingPrompt({
                            ...editingPrompt,
                            answers: newAnswers
                          });
                        }}
                        className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder={`Answer ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newAnswers = editingPrompt.answers.filter((_, i) => i !== index);
                          setEditingPrompt({
                            ...editingPrompt,
                            answers: newAnswers.length > 0 ? newAnswers : ['']
                          });
                        }}
                        className="px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setEditingPrompt({
                        ...editingPrompt,
                        answers: [...editingPrompt.answers, '']
                      });
                    }}
                    className="w-full px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Answer
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Hint (optional)
                </label>
                <textarea
                  value={editingPrompt.hint || ''}
                  onChange={(e) => setEditingPrompt({ ...editingPrompt, hint: e.target.value || undefined })}
                  rows={2}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Explanation
                </label>
                <textarea
                  value={editingPrompt.explanation || ''}
                  onChange={(e) => setEditingPrompt({ ...editingPrompt, explanation: e.target.value || undefined })}
                  rows={3}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPrompt.meta?.calculatorAllowed === true}
                    onChange={(e) => setEditingPrompt({
                      ...editingPrompt,
                      meta: {
                        ...editingPrompt.meta,
                        calculatorAllowed: e.target.checked
                      }
                    })}
                    className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Calculator Allowed
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      Show calculator in the Maths Toolkit for this prompt
                    </p>
                  </div>
                </label>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <DiagramParamsEditor
                  metadata={editingPrompt.meta?.diagram as DiagramMetadata}
                  onChange={(diagram) => {
                    const newMeta = { ...editingPrompt.meta };
                    if (diagram) {
                      newMeta.diagram = diagram;
                    } else {
                      delete newMeta.diagram;
                    }
                    setEditingPrompt({
                      ...editingPrompt,
                      meta: newMeta
                    });
                  }}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingPrompt(null)}
                  className="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
