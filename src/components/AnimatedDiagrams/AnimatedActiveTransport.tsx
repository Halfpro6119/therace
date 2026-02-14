/**
 * Animated Active Transport: particle moves low → high (against gradient)
 * with carrier protein and optional ATP pulse.
 */

import { motion } from 'framer-motion';

const VIEW_BOX = '0 0 400 200';
const STROKE = '#1e293b';
const SUCCESS = '#22c55e';
const LOW_FILL = 'rgba(148,163,184,0.15)';
const HIGH_FILL = 'rgba(99,102,241,0.12)';
const CARRIER_FILL = 'rgba(34,197,94,0.2)';
const PARTICLE_FILL = 'rgba(99,102,241,0.5)';

const DURATION = 4;

export function AnimatedActiveTransport() {
  return (
    <svg
      viewBox={VIEW_BOX}
      className="w-full h-full min-h-[200px]"
      aria-label="Active transport: particle moving against concentration gradient with ATP"
    >
      <rect x={30} y={50} width={140} height={100} rx={4} stroke={STROKE} fill={LOW_FILL} strokeWidth={1.5} />
      <rect x={230} y={50} width={140} height={100} rx={4} stroke={STROKE} fill={HIGH_FILL} strokeWidth={1.5} />
      <rect x={165} y={70} width={70} height={60} rx={8} stroke={SUCCESS} fill={CARRIER_FILL} strokeWidth={1.5} />

      {/* Particle moving low → high (right to left in diagram = against gradient) */}
      <motion.g
        animate={{ x: [0, -170] }}
        transition={{
          duration: DURATION,
          repeat: Infinity,
          repeatDelay: 0.8,
          ease: 'easeInOut',
        }}
      >
        <circle cx={240} cy={100} r={8} fill={PARTICLE_FILL} stroke={STROKE} strokeWidth={1} />
      </motion.g>

      {/* ATP pulse glow */}
      <motion.text
        x={200}
        y={58}
        textAnchor="middle"
        fontSize={14}
        fill={STROKE}
        fontWeight={600}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
      >
        ATP
      </motion.text>

      <defs>
        <marker id="active-arrowhead" markerWidth={8} markerHeight={8} refX={6} refY={4} orient="auto">
          <polygon points="0 0, 8 4, 0 8" fill={SUCCESS} />
        </marker>
      </defs>
      <line x1={230} y1={100} x2={200} y2={100} stroke={SUCCESS} strokeWidth={2} markerEnd="url(#active-arrowhead)" />

      <text x={100} y={100} textAnchor="middle" fontSize={12} fill={STROKE} fontWeight={500}>Low</text>
      <text x={300} y={100} textAnchor="middle" fontSize={12} fill={STROKE} fontWeight={500}>High</text>
      <text x={200} y={175} textAnchor="middle" fontSize={10} fill="#64748b">Against gradient</text>
    </svg>
  );
}
