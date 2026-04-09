import { motion } from 'framer-motion';
import type { SpriteProps } from '../shared/spriteTypes';
import { PALETTES, POSTURE_OFFSET } from '../shared/palette';
import { useMoodAnimation } from '../shared/useMoodAnimation';

export function FoxMaturity({ mood, path, size = 80 }: SpriteProps) {
  const p = PALETTES.fox[path];
  const o = POSTURE_OFFSET[path];
  const { animate, transition } = useMoodAnimation(mood);
  const filter = mood === 'sick' ? p.sickFilter : 'none';
  const hy = 24 + o.headY;

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={{ filter }}>
      <motion.g animate={animate} transition={transition} style={{ transformOrigin: '40px 50px' }}>
        <path d="M57 64 Q70 50 64 36" stroke={p.body} strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M61 58 Q68 50 64 40" stroke="#e8e8d8" strokeWidth="5" fill="none" strokeLinecap="round" />
        <ellipse cx="40" cy="59" rx={19 + o.bodyRx} ry={15 + o.bodyRy} fill={p.body} />
        <rect x="22" y="67" width="10" height="12" rx="5" fill={p.body} />
        <rect x="48" y="67" width="10" height="12" rx="5" fill={p.body} />
        <ellipse cx="18" cy="57" rx="6" ry="11" fill={p.body} transform="rotate(-18 18 57)" />
        <ellipse cx="62" cy="57" rx="6" ry="11" fill={p.body} transform="rotate(18 62 57)" />
        <circle cx="40" cy={hy} r="20" fill={p.body} />
        <polygon points={`24,${hy - 11} 13,${hy - 30} 35,${hy - 17}`} fill={p.body} />
        <polygon points={`56,${hy - 11} 67,${hy - 30} 45,${hy - 17}`} fill={p.body} />
        <polygon points={`25,${hy - 12} 15,${hy - 28} 34,${hy - 16}`} fill={p.accent} />
        <polygon points={`55,${hy - 12} 65,${hy - 28} 46,${hy - 16}`} fill={p.accent} />
        <ellipse cx="28" cy={hy + 7} rx="9" ry="6" fill="rgba(255,255,255,0.28)" />
        <ellipse cx="52" cy={hy + 7} rx="9" ry="6" fill="rgba(255,255,255,0.28)" />
        {mood === 'sleeping'
          ? <><line x1="30" y1={hy + 3} x2="36" y2={hy + 3} stroke={p.outline} strokeWidth="2.2" strokeLinecap="round"/><line x1="44" y1={hy + 3} x2="50" y2={hy + 3} stroke={p.outline} strokeWidth="2.2" strokeLinecap="round"/></>
          : mood === 'happy'
          ? <><path d={`M30 ${hy + 6} Q33 ${hy + 1} 36 ${hy + 6}`} fill="none" stroke={p.outline} strokeWidth="2.2"/><path d={`M44 ${hy + 6} Q47 ${hy + 1} 50 ${hy + 6}`} fill="none" stroke={p.outline} strokeWidth="2.2"/></>
          : <><circle cx="33" cy={hy + 3} r="3.5" fill={p.eyeColor}/><circle cx="47" cy={hy + 3} r="3.5" fill={p.eyeColor}/></>
        }
        <ellipse cx="40" cy={hy + 12} rx="4.5" ry="3" fill={p.outline} />
        {path === 'thriving' && <path d="M26 20 L30 11 L34 18 L38 10 L42 18 L46 11 L50 20 Z" fill="#d4a820" stroke="#a07010" strokeWidth="1" />}
        {path === 'neglected' && mood !== 'sleeping' && mood !== 'happy' && <>
          <line x1="30" y1={hy + 1} x2="36" y2={hy + 4} stroke={p.outline} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <line x1="44" y1={hy + 1} x2="50" y2={hy + 4} stroke={p.outline} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </>}
      </motion.g>
    </svg>
  );
}
