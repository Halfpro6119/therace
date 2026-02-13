/**
 * MFL Speaking Prep – Role-play, photo card, conversation prompts
 */
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Mic, MessageSquare, Image } from 'lucide-react';
import { LANGUAGES, THEMES } from '../../config/languagesHubData';
import { getRolePlayPrompts, getPhotoCards } from '../../config/mflSpeakingData';
import type { LanguageId } from '../../config/languagesHubData';

type TabId = 'roleplay' | 'photocard';

export function LanguagesHubSpeakingPage() {
  const navigate = useNavigate();
  const { languageId } = useParams<{ languageId: string }>();
  const lang = languageId as LanguageId;
  const language = LANGUAGES.find((l) => l.id === lang);

  const [tab, setTab] = useState<TabId>('roleplay');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const rolePlays = lang && (lang === 'french' || lang === 'spanish') ? getRolePlayPrompts(lang) : [];
  const photoCards = lang && (lang === 'french' || lang === 'spanish') ? getPhotoCards(lang) : [];

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
          <Mic size={28} className="inline mr-2" />
          Speaking Prep
        </h1>
        <p className="text-white/90 text-sm sm:text-base">
          Role-play, photo card, conversation – prepare for the exam
        </p>
      </motion.section>

      <div className="flex gap-2 border-b" style={{ borderColor: 'rgb(var(--border))' }}>
        <button
          type="button"
          onClick={() => setTab('roleplay')}
          className="px-4 py-2 text-sm font-medium border-b-2 -mb-px"
          style={{
            borderColor: tab === 'roleplay' ? language.color : 'transparent',
            color: tab === 'roleplay' ? language.color : 'rgb(var(--text-secondary))',
          }}
        >
          <MessageSquare size={16} className="inline mr-2" />
          Role-play
        </button>
        <button
          type="button"
          onClick={() => setTab('photocard')}
          className="px-4 py-2 text-sm font-medium border-b-2 -mb-px"
          style={{
            borderColor: tab === 'photocard' ? language.color : 'transparent',
            color: tab === 'photocard' ? language.color : 'rgb(var(--text-secondary))',
          }}
        >
          <Image size={16} className="inline mr-2" />
          Photo card
        </button>
      </div>

      {tab === 'roleplay' && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>Role-play scenarios</h2>
          {rolePlays.map((rp) => {
            const theme = THEMES.find((t) => t.id === rp.themeId);
            const isExpanded = expandedId === rp.id;
            return (
              <motion.div
                key={rp.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border overflow-hidden"
                style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : rp.id)}
                  className="w-full p-5 text-left flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold" style={{ color: 'rgb(var(--text))' }}>{rp.scenario}</h3>
                    <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{theme?.title}</p>
                  </div>
                  <ChevronLeft
                    size={20}
                    className="transition-transform"
                    style={{ transform: isExpanded ? 'rotate(-90deg)' : 'rotate(0)', color: 'rgb(var(--text-secondary))' }}
                  />
                </button>
                {isExpanded && (
                  <div className="px-5 pb-5 pt-0 border-t" style={{ borderColor: 'rgb(var(--border))' }}>
                    <div className="space-y-4 mt-4">
                      {rp.prompts.map((prompt, i) => (
                        <div key={i}>
                          <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--text-secondary))' }}>Prompt {i + 1}: {prompt}</p>
                          <p className="text-sm p-3 rounded-lg" style={{ background: 'rgb(var(--success))15', color: 'rgb(var(--success))' }}>
                            Model: {rp.modelResponses[i]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </section>
      )}

      {tab === 'photocard' && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>Photo card questions</h2>
          {photoCards.map((pc) => {
            const theme = THEMES.find((t) => t.id === pc.themeId);
            const isExpanded = expandedId === pc.id;
            return (
              <motion.div
                key={pc.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl border overflow-hidden"
                style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : pc.id)}
                  className="w-full p-5 text-left flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold" style={{ color: 'rgb(var(--text))' }}>Photo card • {theme?.title}</h3>
                    <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>{pc.tier}</p>
                  </div>
                  <ChevronLeft
                    size={20}
                    className="transition-transform"
                    style={{ transform: isExpanded ? 'rotate(-90deg)' : 'rotate(0)', color: 'rgb(var(--text-secondary))' }}
                  />
                </button>
                {isExpanded && (
                  <div className="px-5 pb-5 pt-0 border-t" style={{ borderColor: 'rgb(var(--border))' }}>
                    <div className="space-y-4 mt-4">
                      {pc.questions.map((q, i) => (
                        <div key={i}>
                          <p className="text-sm font-medium mb-1" style={{ color: 'rgb(var(--text))' }}>{q}</p>
                          <p className="text-sm p-3 rounded-lg" style={{ background: 'rgb(var(--success))15', color: 'rgb(var(--success))' }}>
                            Model: {pc.modelAnswers[i]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </section>
      )}
    </div>
  );
}
