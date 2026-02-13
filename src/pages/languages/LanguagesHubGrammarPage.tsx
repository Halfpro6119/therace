/**
 * MFL Grammar Lab – Tenses, structures, conjugation
 */
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, FileText, AlertTriangle } from 'lucide-react';
import { LANGUAGES } from '../../config/languagesHubData';
import { getGrammarConcepts } from '../../config/mflGrammarData';
import type { LanguageId } from '../../config/languagesHubData';
import type { MflGrammarConcept } from '../../types/mflLab';

export function LanguagesHubGrammarPage() {
  const navigate = useNavigate();
  const { languageId } = useParams<{ languageId: string }>();
  const lang = languageId as LanguageId;
  const language = LANGUAGES.find((l) => l.id === lang);

  const [selectedConcept, setSelectedConcept] = useState<MflGrammarConcept | null>(null);

  const concepts = lang && (lang === 'french' || lang === 'spanish') ? getGrammarConcepts(lang) : [];
  const currentIndex = selectedConcept ? concepts.findIndex((c) => c.id === selectedConcept.id) : -1;
  const prevConcept = currentIndex > 0 ? concepts[currentIndex - 1] : null;
  const nextConcept = currentIndex >= 0 && currentIndex < concepts.length - 1 ? concepts[currentIndex + 1] : null;

  if (!language || !['french', 'spanish'].includes(lang || '')) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <p style={{ color: 'rgb(var(--text))' }}>Invalid language.</p>
        <button type="button" onClick={() => navigate('/languages-hub')} className="mt-4 text-sm font-medium" style={{ color: 'rgb(var(--primary))' }}>
          Back to Languages
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{
          background: `linear-gradient(135deg, ${language.color} 0%, ${language.color}99 50%, ${language.color}66 100%)`,
          borderColor: 'transparent',
        }}
      >
        <button
          type="button"
          onClick={() => navigate(`/languages-hub/${lang}`)}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to {language.name}
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          <FileText size={28} className="inline mr-2" />
          Grammar Lab
        </h1>
        <p className="text-white/90 text-sm sm:text-base">
          Tenses, agreement, structures – {language.name} (AQA {language.spec})
        </p>
      </motion.section>

      {!selectedConcept ? (
        <section className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
            Select a concept
          </h2>
          <div className="space-y-4">
            {concepts.map((concept, index) => (
              <motion.button
                key={concept.id}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => setSelectedConcept(concept)}
                className="w-full rounded-xl p-6 text-left border shadow-sm hover:shadow-md transition-all"
                style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
                      {concept.title}
                    </h3>
                    <p className="text-sm line-clamp-2" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {concept.coreIdea}
                    </p>
                  </div>
                  <ChevronRight size={20} style={{ color: 'rgb(var(--text-secondary))' }} />
                </div>
              </motion.button>
            ))}
          </div>
        </section>
      ) : (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 border"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              onClick={() => setSelectedConcept(prevConcept!)}
              disabled={!prevConcept}
              className="flex items-center gap-2 text-sm font-medium disabled:opacity-40"
              style={{ color: 'rgb(var(--text-secondary))' }}
            >
              <ChevronLeft size={18} />
              Previous
            </button>
            <button
              type="button"
              onClick={() => setSelectedConcept(nextConcept!)}
              disabled={!nextConcept}
              className="flex items-center gap-2 text-sm font-medium disabled:opacity-40"
              style={{ color: 'rgb(var(--text-secondary))' }}
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>

          <h2 className="text-xl font-bold mb-4" style={{ color: 'rgb(var(--text))' }}>
            {selectedConcept.title}
          </h2>
          {selectedConcept.tense && (
            <p className="text-sm mb-3" style={{ color: 'rgb(var(--muted))' }}>
              {selectedConcept.tense}
            </p>
          )}
          <p className="mb-6" style={{ color: 'rgb(var(--text))' }}>
            {selectedConcept.coreIdea}
          </p>

          {selectedConcept.conjugation && selectedConcept.conjugation.length > 0 && (
            <div className="mb-6 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ borderBottom: '2px solid rgb(var(--border))' }}>
                    <th className="text-left py-2 px-3" style={{ color: 'rgb(var(--text-secondary))' }}>Pronoun</th>
                    <th className="text-left py-2 px-3" style={{ color: 'rgb(var(--text-secondary))' }}>Ending</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedConcept.conjugation.map((row) => (
                    <tr key={row.pronoun} style={{ borderBottom: '1px solid rgb(var(--border))' }}>
                      <td className="py-2 px-3 font-medium" style={{ color: 'rgb(var(--text))' }}>{row.pronoun}</td>
                      <td className="py-2 px-3" style={{ color: 'rgb(var(--text))' }}>{row.form}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-sm font-bold mb-2" style={{ color: 'rgb(var(--text-secondary))' }}>Examples</h3>
            <ul className="list-disc list-inside space-y-1" style={{ color: 'rgb(var(--text))' }}>
              {selectedConcept.examples.map((ex, i) => (
                <li key={i}>{ex}</li>
              ))}
            </ul>
          </div>

          {selectedConcept.commonMistake && (
            <div
              className="rounded-xl p-4 flex gap-3"
              style={{ background: 'rgb(var(--danger))15', borderColor: 'rgb(var(--danger))30', border: '1px solid' }}
            >
              <AlertTriangle size={20} style={{ color: 'rgb(var(--danger))', flexShrink: 0 }} />
              <div>
                <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--danger))' }}>Common mistake</p>
                <p className="text-sm mb-1" style={{ color: 'rgb(var(--text))' }}>{selectedConcept.commonMistake}</p>
                {selectedConcept.correctForm && (
                  <p className="text-sm font-medium" style={{ color: 'rgb(var(--success))' }}>✓ {selectedConcept.correctForm}</p>
                )}
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={() => setSelectedConcept(null)}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ background: 'rgb(var(--surface-2))', color: 'rgb(var(--text))' }}
            >
              Back to list
            </button>
          </div>
        </motion.section>
      )}
    </div>
  );
}
