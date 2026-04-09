import { motion } from 'framer-motion';
import type { SpriteProps } from '../shared/spriteTypes';
import { PALETTES, POSTURE_OFFSET } from '../shared/palette';
import { useMoodAnimation } from '../shared/useMoodAnimation';

export function CatChild({ mood, path, size = 80 }: SpriteProps) {
  const p = PALETTES.cat[path];
  const o = POSTURE_OFFSET[path];
  const { animate, transition } = useMoodAnimation(mood);
  const filter = mood === 'sick' ? p.sickFilter : 'none';
  const hy = 33 + o.headY;

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={{ filter }}>
      <motion.g animate={animate} transition={transition} style={{ transformOrigin: '40px 48px' }}>
        <path d="M48 62 Q60 56 56 70" stroke={p.body} strokeWidth="5" fill="none" strokeLinecap="round" />
        <ellipse cx="40" cy="57" rx={15 + o.bodyRx} ry={12 + o.bodyRy} fill={p.body} />
        <ellipse cx="24" cy="55" rx="5" ry="8" fill={p.body} transform="rotate(-10 24 55)" />
        <ellipse cx="56" cy="55" rx="5" ry="8" fill={p.body} transform="rotate(10 56 55)" />
        <circle cx="40" cy={hy} r="17" fill={p.body} />
        <polygon points={`26,${hy - 8} 22,${hy - 22} 33,${hy - 14}`} fill={p.body} />
        <polygon points={`54,${hy - 8} 58,${hy - 22} 47,${hy - 14}`} fill={p.body} />
        <polygon points={`27,${hy - 9} 24,${hy - 20} 32,${hy - 13}`} fill={p.accent} />
        <polygon points={`53,${hy - 9} 56,${hy - 20} 48,${hy - 13}`} fill={p.accent} />
        {mood === 'sleeping'
          ? <><line x1="33" y1={hy + 3} x2="37" y2={hy + 3} stroke={p.outline} strokeWidth="1.8" strokeLinecap="round"/><line x1="43" y1={hy + 3} x2="47" y2={hy + 3} stroke={p.outline} strokeWidth="1.8" strokeLinecap="round"/></>
          : mood === 'happy'
          ? <><path d={`M33 ${hy + 5} Q35 ${hy + 1} 37 ${hy + 5}`} fill="none" stroke={p.eyeColor} strokeWidth="1.8"/><path d={`M43 ${hy + 5} Q45 ${hy + 1} 47 ${hy + 5}`} fill="none" stroke={p.eyeColor} strokeWidth="1.8"/></>
          : <><ellipse cx="35" cy={hy + 3} rx="2" ry="3" fill={p.eyeColor}/><ellipse cx="45" cy={hy + 3} rx="2" ry="3" fill={p.eyeColor}/></>
        }
        <polygon points={`40,${hy + 8} 38,${hy + 11} 42,${hy + 11}`} fill={p.outline} />
        <line x1="25" y1={hy + 10} x2="35" y2={hy + 10} stroke={p.outline} strokeWidth="0.8" opacity="0.5" />
        <line x1="45" y1={hy + 10} x2="55" y2={hy + 10} stroke={p.outline} strokeWidth="0.8" opacity="0.5" />
        {path === 'thriving' && <path d="M58 22 L60 17 L62 22 L60 27 Z" fill="#f0e040" />}
        {path === 'neglected' && <rect x="34" y="52" width="12" height="5" rx="2" fill="#e8c080" stroke="#c09040" strokeWidth="0.8" />}
      </motion.g>
    </svg>
  );
}
