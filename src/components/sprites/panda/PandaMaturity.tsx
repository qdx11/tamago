import { motion } from 'framer-motion';
import type { SpriteProps } from '../shared/spriteTypes';
import { PALETTES, POSTURE_OFFSET } from '../shared/palette';
import { useMoodAnimation } from '../shared/useMoodAnimation';

export function PandaMaturity({ mood, path, size = 80 }: SpriteProps) {
  const p = PALETTES.panda[path];
  const o = POSTURE_OFFSET[path];
  const { animate, transition } = useMoodAnimation(mood);
  const filter = mood === 'sick' ? p.sickFilter : 'none';
  const hy = 25 + o.headY;

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={{ filter }}>
      <motion.g animate={animate} transition={transition} style={{ transformOrigin: '40px 50px' }}>
        <ellipse cx="40" cy="60" rx={20 + o.bodyRx} ry={15 + o.bodyRy} fill={p.body} />
        <rect x="22" y="68" width="10" height="13" rx="5" fill={p.accent} />
        <rect x="48" y="68" width="10" height="13" rx="5" fill={p.accent} />
        <ellipse cx="17" cy="58" rx="8" ry="12" fill={p.accent} transform="rotate(-18 17 58)" />
        <ellipse cx="63" cy="58" rx="8" ry="12" fill={p.accent} transform="rotate(18 63 58)" />
        <circle cx="40" cy={hy} r="20" fill={p.body} />
        <circle cx="25" cy={hy - 17} r="13" fill={p.accent} />
        <circle cx="55" cy={hy - 17} r="13" fill={p.accent} />
        <circle cx="25" cy={hy - 17} r="9" fill={p.body} />
        <circle cx="55" cy={hy - 17} r="9" fill={p.body} />
        <ellipse cx="32" cy={hy + 2} rx="9" ry="7" fill={p.accent} />
        <ellipse cx="48" cy={hy + 2} rx="9" ry="7" fill={p.accent} />
        {mood === 'sleeping'
          ? <><line x1="28" y1={hy + 2} x2="36" y2={hy + 2} stroke={p.body} strokeWidth="2.2" strokeLinecap="round"/><line x1="44" y1={hy + 2} x2="52" y2={hy + 2} stroke={p.body} strokeWidth="2.2" strokeLinecap="round"/></>
          : mood === 'happy'
          ? <><path d={`M28 ${hy + 6} Q32 ${hy} 36 ${hy + 6}`} fill="none" stroke={p.body} strokeWidth="2.2"/><path d={`M44 ${hy + 6} Q48 ${hy} 52 ${hy + 6}`} fill="none" stroke={p.body} strokeWidth="2.2"/></>
          : <><circle cx="32" cy={hy + 2} r="4.5" fill={p.eyeColor}/><circle cx="48" cy={hy + 2} r="4.5" fill={p.eyeColor}/></>
        }
        <ellipse cx="40" cy={hy + 12} rx="5.5" ry="4" fill={p.accent} />
        <circle cx="40" cy={hy + 12} r="3.5" fill={p.body} />
        {path === 'thriving' && <path d="M25 20 L29 11 L33 18 L37 10 L43 18 L47 11 L51 20 Z" fill="#d4a820" stroke="#a07010" strokeWidth="1" />}
        {path === 'neglected' && mood !== 'sleeping' && mood !== 'happy' && <>
          <line x1="28" y1={hy} x2="36" y2={hy + 3} stroke={p.outline} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <line x1="44" y1={hy} x2="52" y2={hy + 3} stroke={p.outline} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </>}
      </motion.g>
    </svg>
  );
}
