import { motion } from 'framer-motion';
import type { SpriteProps } from '../shared/spriteTypes';
import { PALETTES, POSTURE_OFFSET } from '../shared/palette';
import { useMoodAnimation } from '../shared/useMoodAnimation';

export function RabbitGrowth({ mood, path, size = 80 }: SpriteProps) {
  const p = PALETTES.rabbit[path];
  const o = POSTURE_OFFSET[path];
  const { animate, transition } = useMoodAnimation(mood);
  const filter = mood === 'sick' ? p.sickFilter : 'none';
  const hy = 34 + o.headY;

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={{ filter }}>
      <motion.g animate={animate} transition={transition} style={{ transformOrigin: '40px 50px' }}>
        <ellipse cx="40" cy="59" rx={16 + o.bodyRx} ry={13 + o.bodyRy} fill={p.body} />
        <rect x="26" y="66" width="8" height="10" rx="4" fill={p.body} />
        <rect x="46" y="66" width="8" height="10" rx="4" fill={p.body} />
        <ellipse cx="22" cy="57" rx="5" ry="9" fill={p.body} transform="rotate(-15 22 57)" />
        <ellipse cx="58" cy="57" rx="5" ry="9" fill={p.body} transform="rotate(15 58 57)" />
        <circle cx="40" cy={hy} r="17" fill={p.body} />
        <ellipse cx="29" cy={hy - 22} rx="7" ry="20" fill={p.body} />
        <ellipse cx="51" cy={hy - 22} rx="7" ry="20" fill={p.body} />
        <ellipse cx="29" cy={hy - 22} rx="4" ry="16" fill={p.accent} />
        <ellipse cx="51" cy={hy - 22} rx="4" ry="16" fill={p.accent} />
        {mood === 'sleeping'
          ? <><line x1="32" y1={hy + 3} x2="37" y2={hy + 3} stroke={p.outline} strokeWidth="2" strokeLinecap="round"/><line x1="43" y1={hy + 3} x2="48" y2={hy + 3} stroke={p.outline} strokeWidth="2" strokeLinecap="round"/></>
          : mood === 'happy'
          ? <><path d={`M32 ${hy + 5} Q34.5 ${hy + 1} 37 ${hy + 5}`} fill="none" stroke={p.eyeColor} strokeWidth="2"/><path d={`M43 ${hy + 5} Q45.5 ${hy + 1} 48 ${hy + 5}`} fill="none" stroke={p.eyeColor} strokeWidth="2"/></>
          : <><circle cx="34.5" cy={hy + 3} r="3" fill={p.eyeColor}/><circle cx="45.5" cy={hy + 3} r="3" fill={p.eyeColor}/></>
        }
        <ellipse cx="40" cy={hy + 10} rx="3.5" ry="2.5" fill={p.eyeColor} opacity="0.5" />
        {path === 'thriving' && <><path d="M60 22 L62 17 L64 22 L62 27 Z" fill="#f0e040" /><path d="M56 18 L57 15 L58 18 L57 21 Z" fill="#f0e040" /></>}
        {path === 'neglected' && <rect x="34" y="54" width="12" height="5" rx="2" fill="#e8c080" stroke="#c09040" strokeWidth="0.8" />}
      </motion.g>
    </svg>
  );
}
