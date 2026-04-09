import { motion } from 'framer-motion';
import type { SpriteProps } from '../shared/spriteTypes';
import { PALETTES, POSTURE_OFFSET } from '../shared/palette';
import { useMoodAnimation } from '../shared/useMoodAnimation';

export function RabbitMaturity({ mood, path, size = 80 }: SpriteProps) {
  const p = PALETTES.rabbit[path];
  const o = POSTURE_OFFSET[path];
  const { animate, transition } = useMoodAnimation(mood);
  const filter = mood === 'sick' ? p.sickFilter : 'none';
  const hy = 28 + o.headY;

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={{ filter }}>
      <motion.g animate={animate} transition={transition} style={{ transformOrigin: '40px 50px' }}>
        <ellipse cx="40" cy="60" rx={18 + o.bodyRx} ry={14 + o.bodyRy} fill={p.body} />
        <rect x="23" y="68" width="9" height="12" rx="4.5" fill={p.body} />
        <rect x="48" y="68" width="9" height="12" rx="4.5" fill={p.body} />
        <ellipse cx="19" cy="58" rx="6" ry="10" fill={p.body} transform="rotate(-18 19 58)" />
        <ellipse cx="61" cy="58" rx="6" ry="10" fill={p.body} transform="rotate(18 61 58)" />
        <circle cx="40" cy={hy} r="19" fill={p.body} />
        <ellipse cx="28" cy={hy - 26} rx="8" ry="23" fill={p.body} />
        <ellipse cx="52" cy={hy - 26} rx="8" ry="23" fill={p.body} />
        <ellipse cx="28" cy={hy - 26} rx="5" ry="19" fill={p.accent} />
        <ellipse cx="52" cy={hy - 26} rx="5" ry="19" fill={p.accent} />
        {mood === 'sleeping'
          ? <><line x1="31" y1={hy + 3} x2="36" y2={hy + 3} stroke={p.outline} strokeWidth="2.2" strokeLinecap="round"/><line x1="44" y1={hy + 3} x2="49" y2={hy + 3} stroke={p.outline} strokeWidth="2.2" strokeLinecap="round"/></>
          : mood === 'happy'
          ? <><path d={`M31 ${hy + 6} Q33.5 ${hy + 1} 36 ${hy + 6}`} fill="none" stroke={p.eyeColor} strokeWidth="2.2"/><path d={`M44 ${hy + 6} Q46.5 ${hy + 1} 49 ${hy + 6}`} fill="none" stroke={p.eyeColor} strokeWidth="2.2"/></>
          : <><circle cx="33.5" cy={hy + 3} r="3.5" fill={p.eyeColor}/><circle cx="46.5" cy={hy + 3} r="3.5" fill={p.eyeColor}/></>
        }
        <ellipse cx="40" cy={hy + 12} rx="4" ry="3" fill={p.eyeColor} opacity="0.5" />
        {path === 'thriving' && <path d="M27 20 L31 11 L35 18 L39 10 L43 18 L47 11 L51 20 Z" fill="#d4a820" stroke="#a07010" strokeWidth="1" />}
        {path === 'neglected' && mood !== 'sleeping' && mood !== 'happy' && <>
          <line x1="31" y1={hy + 1} x2="36" y2={hy + 4} stroke={p.outline} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <line x1="44" y1={hy + 1} x2="49" y2={hy + 4} stroke={p.outline} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </>}
      </motion.g>
    </svg>
  );
}
