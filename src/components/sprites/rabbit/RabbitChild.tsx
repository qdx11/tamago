import { motion } from 'framer-motion';
import type { SpriteProps } from '../shared/spriteTypes';
import { PALETTES, POSTURE_OFFSET } from '../shared/palette';
import { useMoodAnimation } from '../shared/useMoodAnimation';

export function RabbitChild({ mood, path, size = 80 }: SpriteProps) {
  const p = PALETTES.rabbit[path];
  const o = POSTURE_OFFSET[path];
  const { animate, transition } = useMoodAnimation(mood);
  const filter = mood === 'sick' ? p.sickFilter : 'none';
  const hy = 38 + o.headY;

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={{ filter }}>
      <motion.g animate={animate} transition={transition} style={{ transformOrigin: '40px 50px' }}>
        <ellipse cx="40" cy="58" rx={14 + o.bodyRx} ry={12 + o.bodyRy} fill={p.body} />
        <ellipse cx="24" cy="56" rx="5" ry="8" fill={p.body} transform="rotate(-10 24 56)" />
        <ellipse cx="56" cy="56" rx="5" ry="8" fill={p.body} transform="rotate(10 56 56)" />
        <circle cx="40" cy={hy} r="16" fill={p.body} />
        <ellipse cx="30" cy={hy - 18} rx="6" ry="18" fill={p.body} />
        <ellipse cx="50" cy={hy - 18} rx="6" ry="18" fill={p.body} />
        <ellipse cx="30" cy={hy - 18} rx="3.5" ry="14" fill={p.accent} />
        <ellipse cx="50" cy={hy - 18} rx="3.5" ry="14" fill={p.accent} />
        {mood === 'sleeping'
          ? <><line x1="33" y1={hy + 3} x2="37" y2={hy + 3} stroke={p.outline} strokeWidth="1.8" strokeLinecap="round"/><line x1="43" y1={hy + 3} x2="47" y2={hy + 3} stroke={p.outline} strokeWidth="1.8" strokeLinecap="round"/></>
          : mood === 'happy'
          ? <><path d={`M33 ${hy + 5} Q35 ${hy + 1} 37 ${hy + 5}`} fill="none" stroke={p.eyeColor} strokeWidth="1.8"/><path d={`M43 ${hy + 5} Q45 ${hy + 1} 47 ${hy + 5}`} fill="none" stroke={p.eyeColor} strokeWidth="1.8"/></>
          : <><circle cx="35" cy={hy + 3} r="2.5" fill={p.eyeColor}/><circle cx="45" cy={hy + 3} r="2.5" fill={p.eyeColor}/></>
        }
        <ellipse cx="40" cy={hy + 9} rx="3" ry="2" fill={p.eyeColor} opacity="0.5" />
        {path === 'thriving' && <path d="M58 28 L60 23 L62 28 L60 33 Z" fill="#f0e040" />}
        {path === 'neglected' && <rect x="34" y="53" width="12" height="5" rx="2" fill="#e8c080" stroke="#c09040" strokeWidth="0.8" />}
      </motion.g>
    </svg>
  );
}
