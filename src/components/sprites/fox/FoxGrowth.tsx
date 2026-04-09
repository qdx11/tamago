import { motion } from 'framer-motion';
import type { SpriteProps } from '../shared/spriteTypes';
import { PALETTES, POSTURE_OFFSET } from '../shared/palette';
import { useMoodAnimation } from '../shared/useMoodAnimation';

export function FoxGrowth({ mood, path, size = 80 }: SpriteProps) {
  const p = PALETTES.fox[path];
  const o = POSTURE_OFFSET[path];
  const { animate, transition } = useMoodAnimation(mood);
  const filter = mood === 'sick' ? p.sickFilter : 'none';
  const hy = 29 + o.headY;

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={{ filter }}>
      <motion.g animate={animate} transition={transition} style={{ transformOrigin: '40px 50px' }}>
        <path d="M56 62 Q68 52 62 40" stroke={p.body} strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M60 56 Q66 52 62 44" stroke="#e8e8d8" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="40" cy="58" rx={17 + o.bodyRx} ry={14 + o.bodyRy} fill={p.body} />
        <rect x="25" y="65" width="8" height="10" rx="4" fill={p.body} />
        <rect x="47" y="65" width="8" height="10" rx="4" fill={p.body} />
        <ellipse cx="21" cy="56" rx="5" ry="9" fill={p.body} transform="rotate(-15 21 56)" />
        <ellipse cx="59" cy="56" rx="5" ry="9" fill={p.body} transform="rotate(15 59 56)" />
        <circle cx="40" cy={hy} r="18" fill={p.body} />
        <polygon points={`25,${hy - 9} 15,${hy - 26} 36,${hy - 15}`} fill={p.body} />
        <polygon points={`55,${hy - 9} 65,${hy - 26} 44,${hy - 15}`} fill={p.body} />
        <polygon points={`26,${hy - 10} 17,${hy - 24} 34,${hy - 14}`} fill={p.accent} />
        <polygon points={`54,${hy - 10} 63,${hy - 24} 46,${hy - 14}`} fill={p.accent} />
        <ellipse cx="29" cy={hy + 6} rx="8" ry="6" fill="rgba(255,255,255,0.3)" />
        <ellipse cx="51" cy={hy + 6} rx="8" ry="6" fill="rgba(255,255,255,0.3)" />
        {mood === 'sleeping'
          ? <><line x1="32" y1={hy + 3} x2="37" y2={hy + 3} stroke={p.outline} strokeWidth="2" strokeLinecap="round"/><line x1="43" y1={hy + 3} x2="48" y2={hy + 3} stroke={p.outline} strokeWidth="2" strokeLinecap="round"/></>
          : mood === 'happy'
          ? <><path d={`M32 ${hy + 5} Q34.5 ${hy + 1} 37 ${hy + 5}`} fill="none" stroke={p.outline} strokeWidth="2"/><path d={`M43 ${hy + 5} Q45.5 ${hy + 1} 48 ${hy + 5}`} fill="none" stroke={p.outline} strokeWidth="2"/></>
          : <><circle cx="34.5" cy={hy + 3} r="3" fill={p.eyeColor}/><circle cx="45.5" cy={hy + 3} r="3" fill={p.eyeColor}/></>
        }
        <ellipse cx="40" cy={hy + 10} rx="3.5" ry="2.5" fill={p.outline} />
        {path === 'thriving' && <><path d="M60 18 L62 13 L64 18 L62 23 Z" fill="#f0e040" /><path d="M56 14 L57 11 L58 14 L57 17 Z" fill="#f0e040" /></>}
        {path === 'neglected' && <rect x="34" y="53" width="12" height="5" rx="2" fill="#e8c080" stroke="#c09040" strokeWidth="0.8" />}
      </motion.g>
    </svg>
  );
}
