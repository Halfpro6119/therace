/**
 * Learning Superpowers Hub – Evidence-based learning methods from the Grade 9 Design Plan
 * §3A: Dual-Code Flip, Concept Bridge, Mistake Museum, Memory Palace, Explain Like I'm 11,
 * Confidence Calibration, Worked Example Fade, Compare & Contrast Matrix, Schema Builder,
 * Retrieval Before Relearn
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Link2,
  Home,
  MessageCircle,
  ListOrdered,
  Columns,
  GitBranch,
  Brain,
  RotateCcw,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
} from 'lucide-react';
import {
  DualCodeFlip,
  ConceptBridge,
  MemoryPalace,
  ExplainLikeIm11,
  WorkedExampleFade,
  CompareContrastMatrix,
  SchemaBuilder,
  RetrievalBeforeRelearn,
  MistakeMuseum,
} from '../components/learning';

const SUPERPOWERS = [
  {
    id: 'concept-bridge',
    title: 'Concept Bridge',
    icon: Link2,
    description: 'Link two concepts and explain the connection. Builds elaboration and synthesis.',
    color: '#6366F1',
  },
  {
    id: 'memory-palace',
    title: 'Memory Palace',
    icon: Home,
    description: 'Place items in rooms, then recall. Method of loci for lists.',
    color: '#8B5CF6',
  },
  {
    id: 'explain-like-11',
    title: "Explain Like I'm 11",
    icon: MessageCircle,
    description: 'Feynman technique: explain so a Year 6 student would get it.',
    color: '#EC4899',
  },
  {
    id: 'worked-example-fade',
    title: 'Worked Example Fade',
    icon: ListOrdered,
    description: 'First steps given, you complete the rest. Worked examples + completion.',
    color: '#F59E0B',
  },
  {
    id: 'compare-contrast',
    title: 'Compare & Contrast Matrix',
    icon: Columns,
    description: "Drag statements to Same / Concept A / Concept B. Elaboration + discrimination.",
    color: '#10B981',
  },
  {
    id: 'schema-builder',
    title: 'Schema Builder',
    icon: GitBranch,
    description: 'Build the big picture. Drag concepts into hierarchy or flow.',
    color: '#06B6D4',
  },
  {
    id: 'retrieval-before-relearn',
    title: 'Retrieval Before Relearn',
    icon: Brain,
    description: "Before we show you — what do you remember? Primes the brain even if wrong.",
    color: '#3B82F6',
  },
  {
    id: 'dual-code-flip',
    title: 'Dual-Code Flip',
    icon: RotateCcw,
    description: 'See diagram → describe; see text → sketch. Words + images together.',
    color: '#0EA5E9',
  },
  {
    id: 'mistake-museum',
    title: 'Mistake Museum',
    icon: AlertCircle,
    description: 'Common wrong answers with why students think this and why it\'s wrong.',
    color: '#EF4444',
  },
];

export function LearningSuperpowersPage() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
      <button
        type="button"
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-sm font-medium mb-6"
        style={{ color: 'rgb(var(--text-secondary))' }}
      >
        <ArrowLeft size={16} />
        Back to subjects
      </button>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="p-3 rounded-xl"
            style={{ background: 'rgb(var(--accent) / 0.15)' }}
          >
            <Zap size={28} style={{ color: 'rgb(var(--accent))' }} />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'rgb(var(--text))' }}>
              Learning Superpowers
            </h1>
            <p className="text-sm sm:text-base mt-0.5" style={{ color: 'rgb(var(--text-secondary))' }}>
              Evidence-based methods from cognitive science. Try each one.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-3">
        {SUPERPOWERS.map((sp) => {
          const Icon = sp.icon;
          const isExpanded = expanded === sp.id;
          return (
            <motion.div
              key={sp.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border overflow-hidden"
              style={{
                background: 'rgb(var(--surface))',
                borderColor: 'rgb(var(--border))',
              }}
            >
              <button
                type="button"
                onClick={() => setExpanded(isExpanded ? null : sp.id)}
                className="w-full flex items-center justify-between p-4 text-left"
                style={{ background: 'rgb(var(--surface-2) / 0.3)' }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ background: `${sp.color}20` }}
                  >
                    <Icon size={20} style={{ color: sp.color }} />
                  </div>
                  <div>
                    <h2 className="font-bold" style={{ color: 'rgb(var(--text))' }}>
                      {sp.title}
                    </h2>
                    <p className="text-sm" style={{ color: 'rgb(var(--text-secondary))' }}>
                      {sp.description}
                    </p>
                  </div>
                </div>
                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 pt-0 border-t" style={{ borderColor: 'rgb(var(--border))' }}>
                      {sp.id === 'concept-bridge' && (
                        <ConceptBridge
                          conceptA="Photosynthesis"
                          conceptB="Respiration"
                          modelConnection="Both involve energy transfer: photosynthesis stores light energy as glucose; respiration releases that energy for cells. They are reverse processes in terms of inputs and outputs."
                          onSubmit={() => {}}
                        />
                      )}
                      {sp.id === 'memory-palace' && (
                        <MemoryPalace
                          title="5 Pillars of Islam"
                          items={[
                            { id: '1', label: 'Shahada' },
                            { id: '2', label: 'Salah' },
                            { id: '3', label: 'Zakat' },
                            { id: '4', label: 'Sawm' },
                            { id: '5', label: 'Hajj' },
                          ]}
                          rooms={[
                            { id: 'hall', name: 'Hall', icon: '🚪' },
                            { id: 'kitchen', name: 'Kitchen', icon: '🍳' },
                            { id: 'living', name: 'Living room', icon: '🛋️' },
                            { id: 'bedroom', name: 'Bedroom', icon: '🛏️' },
                            { id: 'bathroom', name: 'Bathroom', icon: '🚿' },
                          ]}
                          enableRecall
                        />
                      )}
                      {sp.id === 'explain-like-11' && (
                        <ExplainLikeIm11
                          concept="Diffusion"
                          context="Biology"
                          modelExplanation="Imagine dropping food colouring into water. The colour slowly spreads out until the whole glass is the same colour. That's diffusion — particles moving from where there are lots to where there are fewer, until it's even."
                          onSubmit={() => {}}
                        />
                      )}
                      {sp.id === 'worked-example-fade' && (
                        <WorkedExampleFade
                          title="Solve 2x + 5 = 13"
                          problem="Find the value of x."
                          steps={[
                            { id: '1', content: 'Subtract 5 from both sides: 2x = 8', given: true },
                            { id: '2', content: 'Divide both sides by 2: x = 4', given: true },
                            { id: '3', content: 'Check: 2(4) + 5 = 13 ✓', given: false, modelAnswer: 'Substitute x = 4 back: 2(4) + 5 = 8 + 5 = 13' },
                          ]}
                        />
                      )}
                      {sp.id === 'compare-contrast' && (
                        <CompareContrastMatrix
                          conceptA="Diffusion"
                          conceptB="Osmosis"
                          statements={[
                            { id: '1', text: 'Movement of particles', correctColumn: 'same' },
                            { id: '2', text: 'Down a concentration gradient', correctColumn: 'same' },
                            { id: '3', text: 'Water only', correctColumn: 'conceptB' },
                            { id: '4', text: 'Any particles', correctColumn: 'conceptA' },
                            { id: '5', text: 'Through a partially permeable membrane', correctColumn: 'conceptB' },
                          ]}
                        />
                      )}
                      {sp.id === 'schema-builder' && (
                        <SchemaBuilder
                          title="Cell → Organism"
                          layout="hierarchy"
                          centralConcept="Organisation"
                          nodes={[
                            { id: 'cell', label: 'Cell' },
                            { id: 'tissue', label: 'Tissue' },
                            { id: 'organ', label: 'Organ' },
                            { id: 'system', label: 'System' },
                            { id: 'organism', label: 'Organism' },
                          ]}
                          slots={[
                            { id: 'l1', label: 'Level 1 (smallest)' },
                            { id: 'l2', label: 'Level 2' },
                            { id: 'l3', label: 'Level 3' },
                            { id: 'l4', label: 'Level 4' },
                            { id: 'l5', label: 'Level 5 (largest)' },
                          ]}
                          correctMapping={{
                            cell: 'l1',
                            tissue: 'l2',
                            organ: 'l3',
                            system: 'l4',
                            organism: 'l5',
                          }}
                        />
                      )}
                      {sp.id === 'retrieval-before-relearn' && (
                        <RetrievalBeforeRelearn
                          prompt="What are the stages of mitosis?"
                          hint="Think about what happens to the chromosomes."
                          content={
                            <div className="text-sm space-y-2" style={{ color: 'rgb(var(--text))' }}>
                              <p><strong>Prophase</strong> — chromosomes condense, nuclear envelope breaks down</p>
                              <p><strong>Metaphase</strong> — chromosomes line up at equator</p>
                              <p><strong>Anaphase</strong> — chromatids pulled to poles</p>
                              <p><strong>Telophase</strong> — two nuclei form, cytokinesis</p>
                            </div>
                          }
                        />
                      )}
                      {sp.id === 'dual-code-flip' && (
                        <DualCodeFlip
                          diagram={
                            <div className="text-center p-4">
                              <div className="w-24 h-24 mx-auto rounded-full border-4 flex items-center justify-center text-2xl" style={{ borderColor: 'rgb(var(--accent))' }}>
                                H₂O
                              </div>
                              <p className="text-xs mt-2" style={{ color: 'rgb(var(--text-secondary))' }}>Water molecule</p>
                            </div>
                          }
                          text={<p className="text-center p-4">A water molecule: two hydrogen atoms bonded to one oxygen atom. The oxygen is slightly negative, the hydrogens slightly positive.</p>}
                          diagramPrompt="What do you see? Describe the structure."
                          textPrompt="Sketch a water molecule in your own way."
                        />
                      )}
                      {sp.id === 'mistake-museum' && (
                        <MistakeMuseum
                          title="Common mistakes: Photosynthesis"
                          items={[
                            {
                              wrongAnswer: 'Plants breathe in CO₂ and breathe out O₂',
                              whyStudentsThinkThis: 'We learn that plants "produce" oxygen, so it sounds like breathing.',
                              whyItsWrong: "Respiration and photosynthesis are different. Plants do both: they release O₂ from photosynthesis (splitting water) and take in O₂ for respiration.",
                              correctApproach: 'In photosynthesis, plants take in CO₂ and water; they produce glucose and O₂. The O₂ comes from splitting water, not from "breathing out" CO₂.',
                            },
                          ]}
                        />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
