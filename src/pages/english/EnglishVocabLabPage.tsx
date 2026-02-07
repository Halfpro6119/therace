import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, BookMarked, SpellCheck, Type, ArrowUpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const THEME_PACKS = [
  { id: 'power', name: 'Power', color: '#EF4444' },
  { id: 'conflict', name: 'Conflict', color: '#F59E0B' },
  { id: 'identity', name: 'Identity', color: '#8B5CF6' },
  { id: 'persuasion', name: 'Persuasion', color: '#0EA5E9' },
  { id: 'nature', name: 'Nature', color: '#10B981' },
];

const MODES = [
  { id: 'spell', label: 'Spell from definition', icon: SpellCheck, desc: 'Definition shown → you type the word' },
  { id: 'meaning', label: 'Meaning from word', icon: Type, desc: 'Word shown → you choose or type the meaning' },
  { id: 'sentence', label: 'Use it in a sentence', icon: Type, desc: 'Optional: write a sentence using the word' },
  { id: 'upgrade', label: 'Upgrade word', icon: ArrowUpCircle, desc: 'Replace basic word with ambitious alternative' },
];

export function EnglishVocabLabPage() {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => navigate('/english-campus')}
          className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
          aria-label="Back"
        >
          <ChevronLeft size={24} style={{ color: 'rgb(var(--text))' }} />
        </button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'rgb(var(--text))' }}>
            Vocab Lab
          </h1>
          <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
            High-level vocabulary, spelling, and usage
          </p>
        </div>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border p-4"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <h2 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'rgb(var(--text))' }}>
          <BookMarked size={20} />
          Theme pack
        </h2>
        <div className="flex flex-wrap gap-2">
          {THEME_PACKS.map(theme => (
            <button
              key={theme.id}
              type="button"
              onClick={() => setSelectedTheme(selectedTheme === theme.id ? null : theme.id)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition"
              style={{
                background: selectedTheme === theme.id ? theme.color : 'rgb(var(--surface-2))',
                color: selectedTheme === theme.id ? 'white' : 'rgb(var(--text))',
              }}
            >
              {theme.name}
            </button>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="rounded-xl border p-4"
        style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
      >
        <h2 className="font-bold mb-3" style={{ color: 'rgb(var(--text))' }}>
          Mode
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {MODES.map(m => {
            const Icon = m.icon;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMode(selectedMode === m.id ? null : m.id)}
                className={`rounded-lg border p-4 text-left flex items-start gap-3 ${selectedMode === m.id ? 'ring-2' : ''}`}
                style={{
                  background: 'rgb(var(--surface-2))',
                  borderColor: selectedMode === m.id ? 'rgb(var(--accent))' : 'rgb(var(--border))',
                }}
              >
                <Icon size={22} style={{ color: 'rgb(var(--accent))' }} />
                <div>
                  <p className="font-medium text-sm" style={{ color: 'rgb(var(--text))' }}>
                    {m.label}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgb(var(--text-secondary))' }}>
                    {m.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </motion.section>

      {(selectedTheme || selectedMode) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border p-4 text-center"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
            Practice player for &quot;{selectedMode === 'spell' ? 'Spell from definition' : MODES.find(m => m.id === selectedMode)?.label}&quot;
            {selectedTheme && ` · ${THEME_PACKS.find(t => t.id === selectedTheme)?.name}`} will load here. Add word banks and logic in a follow-up.
          </p>
          <button type="button" className="btn-primary" disabled>
            Start practice (coming soon)
          </button>
        </motion.div>
      )}

      <p className="text-sm" style={{ color: 'rgb(var(--muted))' }}>
        Tracking: weak words list, daily set, and mastery per theme can be wired to local storage or backend.
      </p>
    </div>
  );
}
