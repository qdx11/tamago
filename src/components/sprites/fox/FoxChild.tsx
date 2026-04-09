import { motion } from 'framer-motion';
import type { SpriteProps } from '../shared/spriteTypes';
import { PALETTES, POSTURE_OFFSET } from '../shared/palette';
import { useMoodAnimation } from '../shared/useMoodAnimation';

export function FoxChild({ mood, path, size = 80 }: SpriteProps) {
  const p = PALETTES.fox[path];
  const o = POSTURE_OFFSET[path];
  const { animate, transition } = useMoodAnimation(mood);
  const filter = mood === 'sick' ? p.sickFilter : 'none';
  const hy = 33 + o.headY;

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={{ filter }}>
      <motion.g animate={animate} transition={transition} style={{ transformOrigin: '40px 48px' }}>
        <path d="M50 62 Q60 56 56 68" stroke={p.body} strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M54 66 Q58 64 56 70" stroke="#e8e8d8" strokeWidth="3" fill="none" strokeLinecap="round" />
        <ellipse cx="40" cy="57" rx={15 + o.bodyRx} ry={12 + o.bodyRy} fill={p.body} />
        <ellipse cx="24" cy="55" rx="5" ry="8" fill={p.body} transform="rotate(-10 24 55)" />
        <ellipse cx="56" cy="55" rx="5" ry="8" fill={p.body} transform="rotate(10 56 55)" />
        <circle cx="40" cy={hy} r="17" fill={p.body} />
        <polygon points={`26,${hy - 7} 17,${hy - 22} 36,${hy - 13}`} fill={p.body} />
        <polygon points={`54,${hy - 7} 63,${hy - 22} 44,${hy - 13}`} fill={p.body} />
        <polygon points={`27,${hy - 8} 19,${hy - 20} 34,${hy - 12}`} fill={p.accent} />
        <polygon points={`53,${hy - 8} 61,${hy - 20} 46,${hy - 12}`} fill={p.accent} />
        <ellipse cx="30" cy={hy + 6} rx="7" ry="5" fill="rgba(255,255,255,0.35)" />
        <ellipse cx="50" cy={hy + 6} rx="7" ry="5" fill="rgba(255,255,255,0.35)" />
        {mood === 'sleeping'
          ? <><line x1="33" y1={hy + 3} x2="37" y2={hy + 3} stroke={p.outline} strokeWidth="1.8" strokeLinecap="round"/><line x1="43" y1={hy + 3} x2="47" y2={hy + 3} stroke={p.outline} strokeWidth="1.8" strokeLinecap="round"/></>
          : mood === 'happy'
          ? <><path d={`M33 ${hy + 5} Q35 ${hy + 1} 37 ${hy + 5}`} fill="none" stroke={p.outline} strokeWidth="1.8"/><path d={`M43 ${hy + 5} Q45 ${hy + 1} 47 ${hy + 5}`} fill="none" stroke={p.outline} strokeWidth="1.8"/></>
          : <><circle cx="35" cy={hy + 3} r="2.5" fill={p.eyeColor}/><circle cx="45" cy={hy + 3} r="2.5" fill={p.eyeColor}/></>
        }
        <ellipse cx="40" cy={hy + 9} rx="3" ry="2" fill={p.outline} />
        {path === 'thriving' && <path d="M58 22 L60 17 L62 22 L60 27 Z" fill="#f0e040" />}
        {path === 'neglected' && <rect x="34" y="52" width="12" height="5" rx="2" fill="#e8c080" stroke="#c09040" strokeWidth="0.8" />}
      </motion.g>
    </svg>
  );
}
