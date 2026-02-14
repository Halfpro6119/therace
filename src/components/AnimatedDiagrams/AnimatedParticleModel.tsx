/**
 * Animated Particle Model: solid (vibrate), liquid (drift), gas (fast movement).
 * Matches scienceLabDiagrams particle_model layout (400×120).
 */

import { motion } from 'framer-motion';

const VIEW_BOX = '0 0 400 120';
const STROKE = '#1e293b';
const ACCENT = '#6366f1';
const FILL = 'rgba(99,102,241,0.4)';

export function AnimatedParticleModel() {
  return (
    <svg
      viewBox={VIEW_BOX}
      className="w-full h-auto"
      style={{ maxHeight: 140 }}
      aria-label="Particle model: solid vibrate in place, liquid drift, gas move freely"
    >
      {/* Solid */}
      <text x={70} y={30} textAnchor="middle" fontSize={12} fill={STROKE} fontWeight={500}>Solid</text>
      {[
        [50, 70],
        [80, 65],
        [70, 95],
      ].map(([cx, cy], i) => (
        <motion.g key={`s-${i}`}>
          <motion.circle
            cx={cx}
            cy={cy}
            r={8}
            fill={FILL}
            stroke={ACCENT}
            strokeWidth={1}
            animate={{
              x: [0, 3, -2, 2, 0],
              y: [0, -2, 2, -1, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        </motion.g>
      ))}
      <text x={70} y={115} textAnchor="middle" fontSize={9} fill="#64748b">Vibrate</text>

      {/* Liquid */}
      <text x={200} y={30} textAnchor="middle" fontSize={12} fill={STROKE} fontWeight={500}>Liquid</text>
      {[
        [180, 70],
        [210, 75],
        [195, 95],
      ].map(([cx, cy], i) => (
        <motion.g key={`l-${i}`}>
          <motion.circle
            cx={cx}
            cy={cy}
            r={8}
            fill={FILL}
            stroke={ACCENT}
            strokeWidth={1}
            animate={{
              x: [0, 15, -10, 8, -5, 0],
              y: [0, -5, 8, -3, 6, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          />
        </motion.g>
      ))}

      {/* Gas */}
      <text x={330} y={30} textAnchor="middle" fontSize={12} fill={STROKE} fontWeight={500}>Gas</text>
      {[
        [280, 60],
        [320, 90],
        [300, 110],
      ].map(([cx, cy], i) => (
        <motion.g key={`g-${i}`}>
          <motion.circle
            cx={cx}
            cy={cy}
            r={8}
            fill={FILL}
            stroke={ACCENT}
            strokeWidth={1}
            animate={{
              x: [0, 25, -30, 20, -15, 0],
              y: [0, -15, 20, -10, 15, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.25,
              ease: 'linear',
            }}
          />
        </motion.g>
      ))}
      <text x={330} y={115} textAnchor="middle" fontSize={9} fill="#64748b">Move freely</text>
    </svg>
  );
}
