/**
 * Animated Osmosis: net movement of water from dilute → concentrated
 * through a partially permeable membrane.
 * Loops ~5s; respects same layout as scienceLabDiagrams osmosis_diagram.
 */

import { motion } from 'framer-motion';

const VIEW_BOX = '0 0 400 200';
const STROKE = '#1e293b';
const ACCENT = '#6366f1';
const DILUTE_FILL = 'rgba(147,197,253,0.25)';
const CONC_FILL = 'rgba(254,202,202,0.35)';
const WATER_FILL = 'rgba(99,102,241,0.35)';
const SOLUTE_FILL = 'rgba(100,116,139,0.5)';

const DURATION = 5;
const TRAVEL_LTR = 200; // px water moves left→right per cycle
const TRAVEL_RTL = -160; // px right→left (slower net)

const WATER_LTR = [
  { startX: 60, startY: 75 },
  { startX: 85, startY: 98 },
  { startX: 110, startY: 82 },
  { startX: 75, startY: 118 },
  { startX: 125, startY: 108 },
  { startX: 95, startY: 92 },
  { startX: 140, startY: 72 },
];
const WATER_RTL = [
  { startX: 300, startY: 95 },
  { startX: 270, startY: 115 },
];

export function AnimatedOsmosis() {
  return (
    <svg
      viewBox={VIEW_BOX}
      className="w-full h-auto"
      style={{ maxHeight: 200 }}
      aria-label="Osmosis: net movement of water from dilute to concentrated solution through a partially permeable membrane"
    >
      {/* Left compartment – dilute */}
      <rect x={30} y={50} width={140} height={100} rx={4} stroke={STROKE} fill={DILUTE_FILL} strokeWidth={1.5} />
      {/* Right compartment – concentrated */}
      <rect x={230} y={50} width={140} height={100} rx={4} stroke={STROKE} fill={CONC_FILL} strokeWidth={1.5} />
      {/* Membrane */}
      <line x1={170} y1={50} x2={170} y2={150} stroke={STROKE} strokeWidth={2} />

      {/* Solute particles (right side only – do not cross) */}
      <motion.circle
        cx={280}
        cy={85}
        r={7}
        fill={SOLUTE_FILL}
        stroke={STROKE}
        strokeWidth={1}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.circle
        cx={310}
        cy={110}
        r={7}
        fill={SOLUTE_FILL}
        stroke={STROKE}
        strokeWidth={1}
        animate={{ opacity: [1, 0.8, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />
      <motion.circle
        cx={260}
        cy={120}
        r={6}
        fill={SOLUTE_FILL}
        stroke={STROKE}
        strokeWidth={1}
        animate={{ opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />

      {/* Water particles: dilute → concentrated (left to right) */}
      {WATER_LTR.map(({ startX, startY }, i) => (
        <motion.g
          key={`ltr-${i}`}
          animate={{ x: [0, TRAVEL_LTR] }}
          transition={{
            duration: DURATION,
            repeat: Infinity,
            delay: i * 0.65,
            ease: 'linear',
          }}
        >
          <circle cx={startX} cy={startY} r={6} fill={WATER_FILL} stroke={ACCENT} strokeWidth={1} />
        </motion.g>
      ))}

      {/* Water particles: concentrated → dilute (right to left, fewer & slower) */}
      {WATER_RTL.map(({ startX, startY }, i) => (
        <motion.g
          key={`rtl-${i}`}
          animate={{ x: [0, TRAVEL_RTL] }}
          transition={{
            duration: DURATION * 1.3,
            repeat: Infinity,
            delay: 1.5 + i * 1.2,
            ease: 'linear',
          }}
        >
          <circle cx={startX} cy={startY} r={5} fill={WATER_FILL} stroke={ACCENT} strokeWidth={1} />
        </motion.g>
      ))}

      {/* Net flow arrow (subtle pulse) */}
      <defs>
        <marker id="osmosis-arrowhead" markerWidth={8} markerHeight={8} refX={6} refY={4} orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill={ACCENT} />
        </marker>
      </defs>
      <motion.line
        x1={155}
        y1={100}
        x2={185}
        y2={100}
        stroke={ACCENT}
        strokeWidth={2}
        markerEnd="url(#osmosis-arrowhead)"
        animate={{ opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Labels */}
      <text x={100} y={35} textAnchor="middle" fontSize={12} fill={STROKE} fontWeight={500}>Dilute</text>
      <text x={300} y={35} textAnchor="middle" fontSize={12} fill={STROKE} fontWeight={500}>Concentrated</text>
      <text x={200} y={175} textAnchor="middle" fontSize={10} fill="#64748b">Partially permeable membrane</text>
    </svg>
  );
}
