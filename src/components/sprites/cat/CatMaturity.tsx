import { motion } from 'framer-motion';
import type { SpriteProps } from '../shared/spriteTypes';
import { PALETTES, POSTURE_OFFSET } from '../shared/palette';
import { useMoodAnimation } from '../shared/useMoodAnimation';

export function CatMaturity({ mood, path, size = 80 }: SpriteProps) {
  const p = PALETTES.cat[path];
  const o = POSTURE_OFFSET[path];
  const { animate, transition } = useMoodAnimation(mood);
  const filter = mood === 'sick' ? p.sickFilter : 'none';
  const hy = 25 + o.headY;

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={{ filter }}>
      <motion.g animate={animate} transition={transition} style={{ transformOrigin: '40px 50px' }}>
        <path d="M55 64 Q68 52 64 38" stroke={p.body} strokeWidth="7" fill="none" strokeLinecap="round" />
        <ellipse cx="40" cy="59" rx={19 + o.bodyRx} ry={15 + o.bodyRy} fill={p.body} />
        <rect x="22" y="67" width="10" height="12" rx="5" fill={p.body} />
        <rect x="48" y="67" width="10" height="12" rx="5" fill={p.body} />
        <ellipse cx="18" cy="57" rx="6" ry="11" fill={p.body} transform="rotate(-18 18 57)" />
        <ellipse cx="62" cy="57" rx="6" ry="11" fill={p.body} transform="rotate(18 62 57)" />
        <circle cx="40" cy={hy} r="20" fill={p.body} />
        <polygon points={`25,${hy - 12} 20,${hy - 30} 34,${hy - 18}`} fill={p.body} />
        <polygon points={`55,${hy - 12} 60,${hy - 30} 46,${hy - 18}`} fill={p.body} />
        <polygon points={`26,${hy - 13} 22,${hy - 28} 33,${hy - 17}`} fill={p.accent} />
        <polygon points={`54,${hy - 13} 58,${hy - 28} 47,${hy - 17}`} fill={p.accent} />
        {mood === 'sleeping'
          ? <><line x1="30" y1={hy + 3} x2="36" y2={hy + 3} stroke={p.outline} strokeWidth="2.2" strokeLinecap="round"/><line x1="44" y1={hy + 3} x2="50" y2={hy + 3} stroke={p.outline} strokeWidth="2.2" strokeLinecap="round"/></>
          : mood === 'happy'
          ? <><path d={`M30 ${hy + 6} Q33 ${hy + 1} 36 ${hy + 6}`} fill="none" stroke={p.eyeColor} strokeWidth="2.2"/><path d={`M44 ${hy + 6} Q47 ${hy + 1} 50 ${hy + 6}`} fill="none" stroke={p.eyeColor} strokeWidth="2.2"/></>
          : <><ellipse cx="33" cy={hy + 3} rx="3" ry="4" fill={p.eyeColor}/><ellipse cx="47" cy={hy + 3} rx="3" ry="4" fill={p.eyeColor}/></>
        }
        <polygon points={`40,${hy + 10} 37,${hy + 15} 43,${hy + 15}`} fill={p.outline} />
        <line x1="22" y1={hy + 12} x2="34" y2={hy + 12} stroke={p.outline} strokeWidth="0.8" opacity="0.5" />
        <line x1="46" y1={hy + 12} x2="58" y2={hy + 12} stroke={p.outline} strokeWidth="0.8" opacity="0.5" />
        {path === 'thriving' && <path d="M26 22 L30 13 L34 20 L38 12 L42 20 L46 13 L50 22 Z" fill="#d4a820" stroke="#a07010" strokeWidth="1" />}
        {path === 'neglected' && mood !== 'sleeping' && mood !== 'happy' && <>
          <line x1="30" y1={hy + 1} x2="36" y2={hy + 4} stroke={p.outline} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <line x1="44" y1={hy + 1} x2="50" y2={hy + 4} stroke={p.outline} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </>}
      </motion.g>
    </svg>
  );
}
