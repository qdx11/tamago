import { motion } from 'framer-motion';
import type { SpriteProps } from '../shared/spriteTypes';
import { PALETTES, POSTURE_OFFSET } from '../shared/palette';
import { useMoodAnimation } from '../shared/useMoodAnimation';

export function CatGrowth({ mood, path, size = 80 }: SpriteProps) {
  const p = PALETTES.cat[path];
  const o = POSTURE_OFFSET[path];
  const { animate, transition } = useMoodAnimation(mood);
  const filter = mood === 'sick' ? p.sickFilter : 'none';
  const hy = 29 + o.headY;

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={{ filter }}>
      <motion.g animate={animate} transition={transition} style={{ transformOrigin: '40px 50px' }}>
        <path d="M54 62 Q66 54 62 42" stroke={p.body} strokeWidth="6" fill="none" strokeLinecap="round" />
        <ellipse cx="40" cy="58" rx={17 + o.bodyRx} ry={14 + o.bodyRy} fill={p.body} />
        <rect x="25" y="65" width="8" height="10" rx="4" fill={p.body} />
        <rect x="47" y="65" width="8" height="10" rx="4" fill={p.body} />
        <ellipse cx="21" cy="57" rx="5" ry="9" fill={p.body} transform="rotate(-15 21 57)" />
        <ellipse cx="59" cy="57" rx="5" ry="9" fill={p.body} transform="rotate(15 59 57)" />
        <circle cx="40" cy={hy} r="18" fill={p.body} />
        <polygon points={`26,${hy - 10} 21,${hy - 26} 34,${hy - 16}`} fill={p.body} />
        <polygon points={`54,${hy - 10} 59,${hy - 26} 46,${hy - 16}`} fill={p.body} />
        <polygon points={`27,${hy - 11} 23,${hy - 24} 33,${hy - 15}`} fill={p.accent} />
        <polygon points={`53,${hy - 11} 57,${hy - 24} 47,${hy - 15}`} fill={p.accent} />
        {mood === 'sleeping'
          ? <><line x1="32" y1={hy + 3} x2="37" y2={hy + 3} stroke={p.outline} strokeWidth="2" strokeLinecap="round"/><line x1="43" y1={hy + 3} x2="48" y2={hy + 3} stroke={p.outline} strokeWidth="2" strokeLinecap="round"/></>
          : mood === 'happy'
          ? <><path d={`M32 ${hy + 5} Q34.5 ${hy + 1} 37 ${hy + 5}`} fill="none" stroke={p.eyeColor} strokeWidth="2"/><path d={`M43 ${hy + 5} Q45.5 ${hy + 1} 48 ${hy + 5}`} fill="none" stroke={p.eyeColor} strokeWidth="2"/></>
          : <><ellipse cx="34.5" cy={hy + 3} rx="2.5" ry="3.5" fill={p.eyeColor}/><ellipse cx="45.5" cy={hy + 3} rx="2.5" ry="3.5" fill={p.eyeColor}/></>
        }
        <polygon points={`40,${hy + 9} 37,${hy + 13} 43,${hy + 13}`} fill={p.outline} />
        {path === 'thriving' && <><path d="M60 18 L62 13 L64 18 L62 23 Z" fill="#f0e040" /><path d="M56 14 L57 11 L58 14 L57 17 Z" fill="#f0e040" /></>}
        {path === 'neglected' && <rect x="34" y="53" width="12" height="5" rx="2" fill="#e8c080" stroke="#c09040" strokeWidth="0.8" />}
      </motion.g>
    </svg>
  );
}
