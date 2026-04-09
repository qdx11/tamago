import { motion } from 'framer-motion';
import type { SpriteProps } from '../shared/spriteTypes';
import { PALETTES, POSTURE_OFFSET } from '../shared/palette';
import { useMoodAnimation } from '../shared/useMoodAnimation';

export function PandaChild({ mood, path, size = 80 }: SpriteProps) {
  const p = PALETTES.panda[path];
  const o = POSTURE_OFFSET[path];
  const { animate, transition } = useMoodAnimation(mood);
  const filter = mood === 'sick' ? p.sickFilter : 'none';
  const hy = 34 + o.headY;

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={{ filter }}>
      <motion.g animate={animate} transition={transition} style={{ transformOrigin: '40px 48px' }}>
        <ellipse cx="40" cy="58" rx={16 + o.bodyRx} ry={13 + o.bodyRy} fill={p.body} />
        <ellipse cx="23" cy="57" rx="6" ry="9" fill={p.accent} transform="rotate(-10 23 57)" />
        <ellipse cx="57" cy="57" rx="6" ry="9" fill={p.accent} transform="rotate(10 57 57)" />
        <circle cx="40" cy={hy} r="17" fill={p.body} />
        <circle cx="27" cy={hy - 13} r="10" fill={p.accent} />
        <circle cx="53" cy={hy - 13} r="10" fill={p.accent} />
        <circle cx="27" cy={hy - 13} r="7" fill={p.body} />
        <circle cx="53" cy={hy - 13} r="7" fill={p.body} />
        <ellipse cx="34" cy={hy + 2} rx="7" ry="5.5" fill={p.accent} />
        <ellipse cx="46" cy={hy + 2} rx="7" ry="5.5" fill={p.accent} />
        {mood === 'sleeping'
          ? <><line x1="30" y1={hy + 2} x2="37" y2={hy + 2} stroke={p.body} strokeWidth="1.8" strokeLinecap="round"/><line x1="43" y1={hy + 2} x2="50" y2={hy + 2} stroke={p.body} strokeWidth="1.8" strokeLinecap="round"/></>
          : mood === 'happy'
          ? <><path d={`M30 ${hy + 4} Q33.5 ${hy} 37 ${hy + 4}`} fill="none" stroke={p.body} strokeWidth="1.8"/><path d={`M43 ${hy + 4} Q46.5 ${hy} 50 ${hy + 4}`} fill="none" stroke={p.body} strokeWidth="1.8"/></>
          : <><circle cx="34" cy={hy + 2} r="3.5" fill={p.eyeColor}/><circle cx="46" cy={hy + 2} r="3.5" fill={p.eyeColor}/></>
        }
        <ellipse cx="40" cy={hy + 9} rx="4" ry="3" fill={p.accent} />
        <circle cx="40" cy={hy + 9} r="2.5" fill={p.body} />
        {path === 'thriving' && <path d="M58 24 L60 19 L62 24 L60 29 Z" fill="#f0e040" />}
        {path === 'neglected' && <rect x="34" y="53" width="12" height="5" rx="2" fill="#e8c080" stroke="#c09040" strokeWidth="0.8" />}
      </motion.g>
    </svg>
  );
}
