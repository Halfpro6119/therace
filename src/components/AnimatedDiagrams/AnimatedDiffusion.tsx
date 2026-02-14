/**
 * Animated Diffusion: net movement of particles from high concentration
 * to low concentration through a membrane. Some particles move the other way (slower).
 */

import { motion } from 'framer-motion';

const VIEW_BOX = '0 0 400 200';
const STROKE = '#1e293b';
const ACCENT = '#6366f1';
const HIGH_FILL = 'rgba(99,102,241,0.12)';
const LOW_FILL = 'rgba(148,163,184,0.15)';
const PARTICLE_FILL = 'rgba(99,102,241,0.5)';
const PARTICLE_LOW_FILL = 'rgba(100,116,139,0.35)';

const DURATION = 5;
const TRAVEL_HIGH_TO_LOW = 160;
const TRAVEL_LOW_TO_HIGH = -120;

const PARTICLES_HIGH_SIDE = [
  { x: 70, y: 80 },
  { x: 100, y: 90 },
  { x: 130, y: 70 },
  { x: 90, y: 120 },
  { x: 120, y: 110 },
  { x: 80, y: 95 },
  { x: 110, y: 85 },
];
const PARTICLES_LOW_SIDE = [
  { x: 250, y: 90 },
  { x: 290, y: 100 },
];

export function AnimatedDiffusion() {
  return (
    <svg
      viewBox={VIEW_BOX}
      className="w-full h-full min-h-[200px]"
      aria-label="Diffusion: net movement of particles from high to low concentration"
    >
      <rect x={20} y={40} width={180} height={120} rx={4} stroke={STROKE} fill={HIGH_FILL} strokeWidth={1.5} />
      <rect x={200} y={40} width={180} height={120} rx={4} stroke={STROKE} fill={LOW_FILL} strokeWidth={1.5} />
      <line x1={200} y1={40} x2={200} y2={160} stroke={STROKE} strokeWidth={2} />

      {/* High → low (main net movement) */}
      {PARTICLES_HIGH_SIDE.map(({ x, y }, i) => (
        <motion.g
          key={`htl-${i}`}
          animate={{ x: [0, TRAVEL_HIGH_TO_LOW] }}
          transition={{
            duration: DURATION,
            repeat: Infinity,
            delay: i * 0.6,
            ease: 'linear',
          }}
        >
          <circle cx={x} cy={y} r={6} fill={PARTICLE_FILL} stroke={ACCENT} strokeWidth={1} />
        </motion.g>
      ))}

      {/* Low → high (fewer, slower) */}
      {PARTICLES_LOW_SIDE.map(({ x, y }, i) => (
        <motion.g
          key={`lth-${i}`}
          animate={{ x: [0, TRAVEL_LOW_TO_HIGH] }}
          transition={{
            duration: DURATION * 1.4,
            repeat: Infinity,
            delay: 2 + i * 0.8,
            ease: 'linear',
          }}
        >
          <circle cx={x} cy={y} r={5} fill={PARTICLE_LOW_FILL} stroke={STROKE} strokeWidth={1} />
        </motion.g>
      ))}

      <defs>
        <marker id="diffusion-arrowhead" markerWidth={8} markerHeight={8} refX={6} refY={4} orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill={ACCENT} />
        </marker>
      </defs>
      <line x1={170} y1={100} x2={230} y2={100} stroke={ACCENT} strokeWidth={2} markerEnd="url(#diffusion-arrowhead)" />

      <text x={100} y={30} textAnchor="middle" fontSize={12} fill={STROKE} fontWeight={500}>High conc</text>
      <text x={280} y={30} textAnchor="middle" fontSize={12} fill={STROKE} fontWeight={500}>Low conc</text>
      <text x={200} y={175} textAnchor="middle" fontSize={10} fill="#64748b">Net movement →</text>
    </svg>
  );
}
