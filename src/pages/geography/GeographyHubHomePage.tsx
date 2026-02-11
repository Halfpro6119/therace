import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Globe, BookOpen, Lightbulb, Target, Map, FileQuestion, BarChart3, Compass, Layers } from 'lucide-react';
import { storage } from '../../utils/storage';
import { getGeographySectionsForSelection } from '../../config/geographyHubData';

const ACCENT = '#0D9488';

export function GeographyHubHomePage() {
  const navigate = useNavigate();
  const selection = storage.getGeographyOptionSelection();
  const sections = selection ? getGeographySectionsForSelection(selection) : [];

  const modes = [
    { id: 'concept', title: 'Concept lab', description: 'Processes, interrelationships & management', icon: Lightbulb, path: '/geography-hub/concept-lab' },
    { id: 'flashcard', title: 'Key terms & flashcards', description: 'Definitions, processes, case study facts', icon: BookOpen, path: '/geography-hub/flashcard' },
    { id: 'quick-check', title: 'Quick check', description: 'Micro-assessments', icon: Target, path: '/geography-hub/quick-check' },
    { id: 'skills-lab', title: 'Skills lab', description: 'Map, graph, numerical & statistical skills', icon: BarChart3, path: '/geography-hub/skills-lab' },
    { id: 'issue-lab', title: 'Issue lab', description: 'Paper 3 – synoptic evaluation', icon: FileQuestion, path: '/geography-hub/issue-lab' },
    { id: 'fieldwork-lab', title: 'Fieldwork lab', description: 'Enquiry process & unfamiliar context', icon: Compass, path: '/geography-hub/fieldwork-lab' },
    { id: 'question-lab', title: 'Question lab', description: 'Describe, explain, assess, evaluate', icon: FileQuestion, path: '/geography-hub/question-lab' },
    { id: 'revision-map', title: 'Revision map', description: 'Your options and progress', icon: Layers, path: '/geography-hub/revision-map' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl p-6 sm:p-8 border shadow-sm"
        style={{
          background: `linear-gradient(135deg, ${ACCENT} 0%, #0F766E 50%, #115E59 100%)`,
          borderColor: 'transparent',
        }}
      >
        <button
          type="button"
          onClick={() => navigate('/subjects')}
          className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium mb-4"
        >
          <ChevronLeft size={18} />
          Back to Subjects
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Geography Hub</h1>
        <p className="text-white/90 text-sm sm:text-base">
          AQA GCSE Geography 8035 – Physical, human & geographical skills
        </p>
      </motion.section>

      {!selection ? (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-6 border shadow-sm"
          style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
        >
          <h2 className="text-lg font-bold mb-2" style={{ color: 'rgb(var(--text))' }}>
            Choose your options
          </h2>
          <p className="text-sm mb-4" style={{ color: 'rgb(var(--text-secondary))' }}>
            Select your Living world option (Desert or Cold), Physical landscapes (two from Coastal, River, Glacial), and Resource (Food, Water, or Energy) as per your school&apos;s entry.
          </p>
          <button
            type="button"
            onClick={() => navigate('/geography-hub/option-select')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-white"
            style={{ background: ACCENT }}
          >
            <Globe size={18} />
            Select options
          </button>
        </motion.section>
      ) : (
        <>
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6 border shadow-sm"
            style={{ background: 'rgb(var(--surface))', borderColor: 'rgb(var(--border))' }}
          >
            <h2 className="text-lg font-bold mb-3" style={{ color: 'rgb(var(--text))' }}>
              Your options
            </h2>
            <ul className="space-y-1.5 text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
              <li>Living world: <span className="font-medium" style={{ color: 'rgb(var(--text))' }}>{selection.livingWorld === 'desert' ? 'Hot deserts' : 'Cold environments'}</span></li>
              <li>Physical landscapes: <span className="font-medium" style={{ color: 'rgb(var(--text))' }}>{selection.physicalLandscapes.map((l) => l.charAt(0).toUpperCase() + l.slice(1)).join(', ')}</span></li>
              <li>Resource: <span className="font-medium" style={{ color: 'rgb(var(--text))' }}>{selection.resource.charAt(0).toUpperCase() + selection.resource.slice(1)}</span></li>
            </ul>
            <button
              type="button"
              onClick={() => navigate('/geography-hub/option-select')}
              className="mt-3 text-sm font-medium"
              style={{ color: ACCENT }}
            >
              Change options
            </button>
          </motion.section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold" style={{ color: 'rgb(var(--text))' }}>
              Learning modes
            </h2>
            <div className="grid gap-4">
              {modes.map((mode, index) => (
                <motion.button
                  key={mode.id}
                  type="button"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => navigate(mode.path)}
                  className="w-full rounded-2xl p-5 text-left border shadow-sm hover:shadow-md transition-all flex items-center justify-between"
                  style={{
                    background: 'rgb(var(--surface))',
                    borderColor: 'rgb(var(--border))',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl" style={{ background: `${ACCENT}20` }}>
                      <mode.icon size={24} style={{ color: ACCENT }} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold mb-0.5" style={{ color: 'rgb(var(--text))' }}>
                        {mode.title}
                      </h3>
                      <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                        {mode.description}
                      </p>
                    </div>
                  </div>
                  <ChevronLeft size={20} style={{ color: 'rgb(var(--text-secondary))', transform: 'rotate(180deg)' }} />
                </motion.button>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
