import { motion } from 'framer-motion';
import type { SpriteProps } from '../shared/spriteTypes';
import { PALETTES, POSTURE_OFFSET } from '../shared/palette';
import { useMoodAnimation } from '../shared/useMoodAnimation';

export function PandaGrowth({ mood, path, size = 80 }: SpriteProps) {
  const p = PALETTES.panda[path];
  const o = POSTURE_OFFSET[path];
  const { animate, transition } = useMoodAnimation(mood);
  const filter = mood === 'sick' ? p.sickFilter : 'none';
  const hy = 30 + o.headY;

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={{ filter }}>
      <motion.g animate={animate} transition={transition} style={{ transformOrigin: '40px 50px' }}>
        <ellipse cx="40" cy="59" rx={18 + o.bodyRx} ry={14 + o.bodyRy} fill={p.body} />
        <rect x="26" y="66" width="9" height="11" rx="4.5" fill={p.accent} />
        <rect x="45" y="66" width="9" height="11" rx="4.5" fill={p.accent} />
        <ellipse cx="20" cy="57" rx="7" ry="10" fill={p.accent} transform="rotate(-15 20 57)" />
        <ellipse cx="60" cy="57" rx="7" ry="10" fill={p.accent} transform="rotate(15 60 57)" />
        <circle cx="40" cy={hy} r="18" fill={p.body} />
        <circle cx="26" cy={hy - 15} r="11" fill={p.accent} />
        <circle cx="54" cy={hy - 15} r="11" fill={p.accent} />
        <circle cx="26" cy={hy - 15} r="8" fill={p.body} />
        <circle cx="54" cy={hy - 15} r="8" fill={p.body} />
        <ellipse cx="33" cy={hy + 2} rx="8" ry="6.5" fill={p.accent} />
        <ellipse cx="47" cy={hy + 2} rx="8" ry="6.5" fill={p.accent} />
        {mood === 'sleeping'
          ? <><line x1="29" y1={hy + 2} x2="37" y2={hy + 2} stroke={p.body} strokeWidth="2" strokeLinecap="round"/><line x1="43" y1={hy + 2} x2="51" y2={hy + 2} stroke={p.body} strokeWidth="2" strokeLinecap="round"/></>
          : mood === 'happy'
          ? <><path d={`M29 ${hy + 5} Q33 ${hy} 37 ${hy + 5}`} fill="none" stroke={p.body} strokeWidth="2"/><path d={`M43 ${hy + 5} Q47 ${hy} 51 ${hy + 5}`} fill="none" stroke={p.body} strokeWidth="2"/></>
          : <><circle cx="33" cy={hy + 2} r="4" fill={p.eyeColor}/><circle cx="47" cy={hy + 2} r="4" fill={p.eyeColor}/></>
        }
        <ellipse cx="40" cy={hy + 10} rx="5" ry="3.5" fill={p.accent} />
        <circle cx="40" cy={hy + 10} r="3" fill={p.body} />
        {path === 'thriving' && <><path d="M60 18 L62 13 L64 18 L62 23 Z" fill="#f0e040" /><path d="M56 14 L57 11 L58 14 L57 17 Z" fill="#f0e040" /></>}
        {path === 'neglected' && <rect x="34" y="54" width="12" height="5" rx="2" fill="#e8c080" stroke="#c09040" strokeWidth="0.8" />}
      </motion.g>
    </svg>
  );
}
