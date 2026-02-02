import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, GripVertical, PlayCircle, X, Save } from 'lucide-react';
import { db } from '../db/client';
import { Playlist, Quiz } from '../types';

export function PlaylistsPage() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [allQuizzes, setAllQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null);
  const [playlistQuizzes, setPlaylistQuizzes] = useState<Quiz[]>([]);
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [playlistsData, subjects] = await Promise.all([
        db.getPlaylists(),
        db.getSubjects()
      ]);

      const quizzes: Quiz[] = [];
      for (const subject of subjects) {
        const subjectQuizzes = await db.getQuizzesBySubject(subject.id);
        quizzes.push(...subjectQuizzes);
      }

      setPlaylists(playlistsData);
      setAllQuizzes(quizzes);
    } catch (error) {
      console.error('Failed to load playlists:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePlaylist = () => {
    setEditingPlaylist({
      id: '',
      title: '',
      description: '',
      themeTag: '',
      isDaily: false,
      isFeatured: false,
      coverStyle: 'gradient',
      orderIndex: playlists.length,
      createdAt: new Date().toISOString(),
    });
    setPlaylistQuizzes([]);
    setShowEditor(true);
  };

  const handleEditPlaylist = async (playlist: Playlist) => {
    const quizzes = await db.getPlaylistQuizzes(playlist.id);
    setEditingPlaylist(playlist);
    setPlaylistQuizzes(quizzes);
    setShowEditor(true);
  };

  const handleSavePlaylist = async () => {
    if (!editingPlaylist) return;

    try {
      let savedPlaylist: Playlist;

      if (editingPlaylist.id) {
        await db.updatePlaylist(editingPlaylist.id, {
          title: editingPlaylist.title,
          description: editingPlaylist.description,
          themeTag: editingPlaylist.themeTag,
          isDaily: editingPlaylist.isDaily,
          isFeatured: editingPlaylist.isFeatured,
          coverStyle: editingPlaylist.coverStyle,
          orderIndex: editingPlaylist.orderIndex,
        });
        savedPlaylist = editingPlaylist;
        await db.removeAllQuizzesFromPlaylist(savedPlaylist.id);
      } else {
        savedPlaylist = await db.createPlaylist({
          title: editingPlaylist.title,
          description: editingPlaylist.description,
          themeTag: editingPlaylist.themeTag,
          isDaily: editingPlaylist.isDaily,
          isFeatured: editingPlaylist.isFeatured,
          coverStyle: editingPlaylist.coverStyle,
          orderIndex: editingPlaylist.orderIndex,
        });
      }

      for (let i = 0; i < playlistQuizzes.length; i++) {
        await db.addQuizToPlaylist(savedPlaylist.id, playlistQuizzes[i].id, i);
      }

      await loadData();
      setShowEditor(false);
      setEditingPlaylist(null);
      setPlaylistQuizzes([]);
    } catch (error) {
      console.error('Failed to save playlist:', error);
      alert('Failed to save playlist');
    }
  };

  const handleDeletePlaylist = async (playlistId: string) => {
    if (!confirm({ title: 'Confirm', message: 'Are you sure you want to delete this playlist?' })) return;

    try {
      await db.deletePlaylist(playlistId);
      await loadData();
    } catch (error) {
      console.error('Failed to delete playlist:', error);
      alert('Failed to delete playlist');
    }
  };

  const handleAddQuizToPlaylist = (quiz: Quiz) => {
    if (!playlistQuizzes.find(q => q.id === quiz.id)) {
      setPlaylistQuizzes([...playlistQuizzes, quiz]);
    }
  };

  const handleRemoveQuizFromPlaylist = (quizId: string) => {
    setPlaylistQuizzes(playlistQuizzes.filter(q => q.id !== quizId));
  };

  const handleMoveQuiz = (index: number, direction: 'up' | 'down') => {
    const newQuizzes = [...playlistQuizzes];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= newQuizzes.length) return;

    [newQuizzes[index], newQuizzes[targetIndex]] = [newQuizzes[targetIndex], newQuizzes[index]];
    setPlaylistQuizzes(newQuizzes);
  };

  if (loading) {
    return <div className="p-6">Loading playlists...</div>;
  }

  if (showEditor && editingPlaylist) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            {editingPlaylist.id ? 'Edit Playlist' : 'Create Playlist'}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={handleSavePlaylist}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Save size={18} />
              Save Playlist
            </button>
            <button
              onClick={() => {
                setShowEditor(false);
                setEditingPlaylist(null);
                setPlaylistQuizzes([]);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h2 className="text-xl font-bold">Playlist Details</h2>

              <div>
                <label className="block text-sm font-semibold mb-1">Title</label>
                <input
                  type="text"
                  value={editingPlaylist.title}
                  onChange={e => setEditingPlaylist({ ...editingPlaylist, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="Enter playlist title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Description</label>
                <textarea
                  value={editingPlaylist.description}
                  onChange={e => setEditingPlaylist({ ...editingPlaylist, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  rows={3}
                  placeholder="Enter playlist description"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Theme Tag</label>
                <input
                  type="text"
                  value={editingPlaylist.themeTag}
                  onChange={e => setEditingPlaylist({ ...editingPlaylist, themeTag: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                  placeholder="e.g., Speed Run, Exam Week"
                />
              </div>

              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingPlaylist.isFeatured}
                    onChange={e => setEditingPlaylist({ ...editingPlaylist, isFeatured: e.target.checked })}
                  />
                  <span className="text-sm font-semibold">Featured</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingPlaylist.isDaily}
                    onChange={e => setEditingPlaylist({ ...editingPlaylist, isDaily: e.target.checked })}
                  />
                  <span className="text-sm font-semibold">Daily</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Cover Style</label>
                <select
                  value={editingPlaylist.coverStyle}
                  onChange={e => setEditingPlaylist({ ...editingPlaylist, coverStyle: e.target.value as 'gradient' | 'image' | 'minimal' })}
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="gradient">Gradient</option>
                  <option value="minimal">Minimal</option>
                  <option value="image">Image</option>
                </select>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Add Quizzes</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {allQuizzes.map(quiz => (
                  <div
                    key={quiz.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="font-semibold">{quiz.title}</div>
                      <div className="text-sm text-gray-600">{quiz.description}</div>
                    </div>
                    <button
                      onClick={() => handleAddQuizToPlaylist(quiz)}
                      disabled={playlistQuizzes.find(q => q.id === quiz.id) !== undefined}
                      className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                        playlistQuizzes.find(q => q.id === quiz.id)
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {playlistQuizzes.find(q => q.id === quiz.id) ? 'Added' : 'Add'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">
              Playlist Quizzes ({playlistQuizzes.length})
            </h2>
            {playlistQuizzes.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No quizzes added yet. Add quizzes from the left panel.
              </div>
            ) : (
              <div className="space-y-2">
                {playlistQuizzes.map((quiz, index) => (
                  <div
                    key={quiz.id}
                    className="flex items-center gap-2 p-3 border rounded-lg bg-gray-50"
                  >
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => handleMoveQuiz(index, 'up')}
                        disabled={index === 0}
                        className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => handleMoveQuiz(index, 'down')}
                        disabled={index === playlistQuizzes.length - 1}
                        className="p-1 hover:bg-gray-200 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        ▼
                      </button>
                    </div>
                    <GripVertical size={18} className="text-gray-400" />
                    <div className="flex-1">
                      <div className="font-semibold">{quiz.title}</div>
                      <div className="text-sm text-gray-600">{quiz.description}</div>
                    </div>
                    <button
                      onClick={() => handleRemoveQuizFromPlaylist(quiz.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Playlists</h1>
        <button
          onClick={handleCreatePlaylist}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          Create Playlist
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {playlists.map(playlist => (
          <div key={playlist.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div
              className="h-32 flex items-center justify-center"
              style={{
                background: playlist.coverStyle === 'gradient'
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : '#f3f4f6'
              }}
            >
              <PlayCircle size={48} className="text-white" />
            </div>

            <div className="p-4 space-y-3">
              {playlist.themeTag && (
                <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full">
                  {playlist.themeTag}
                </span>
              )}

              <h3 className="font-bold text-lg">{playlist.title}</h3>

              {playlist.description && (
                <p className="text-sm text-gray-600 line-clamp-2">{playlist.description}</p>
              )}

              <div className="flex gap-2 text-xs">
                {playlist.isFeatured && (
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">Featured</span>
                )}
                {playlist.isDaily && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded">Daily</span>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleEditPlaylist(playlist)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Edit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePlaylist(playlist.id)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {playlists.length === 0 && (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <PlayCircle size={64} className="mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-bold mb-2">No playlists yet</h3>
          <p className="text-gray-600 mb-4">Create your first playlist to get started</p>
          <button
            onClick={handleCreatePlaylist}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Create Playlist
          </button>
        </div>
      )}
    </div>
  );
}
