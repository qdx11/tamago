import { motion } from 'framer-motion';
import type { SpriteProps } from '../shared/spriteTypes';
import { PALETTES, POSTURE_OFFSET } from '../shared/palette';
import { useMoodAnimation } from '../shared/useMoodAnimation';

export function DogGrowth({ mood, path, size = 80 }: SpriteProps) {
  const p = PALETTES.dog[path];
  const o = POSTURE_OFFSET[path];
  const { animate, transition } = useMoodAnimation(mood);
  const filter = mood === 'sick' ? p.sickFilter : 'none';
  const hy = 30 + o.headY;

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={{ filter }}>
      <motion.g animate={animate} transition={transition} style={{ transformOrigin: '40px 50px' }}>
        {/* 꼬리 */}
        <path d={`M54 60 Q65 52 60 44`} stroke={p.accent} strokeWidth="5" fill="none" strokeLinecap="round" />
        {/* 몸통 */}
        <ellipse cx="40" cy="58" rx={17 + o.bodyRx} ry={14 + o.bodyRy} fill={p.body} />
        {/* 다리 */}
        <rect x="26" y="65" width="8" height="10" rx="4" fill={p.body} />
        <rect x="46" y="65" width="8" height="10" rx="4" fill={p.body} />
        {/* 팔 */}
        <ellipse cx="22" cy="56" rx="5" ry="9" fill={p.body} transform="rotate(-15 22 56)" />
        <ellipse cx="58" cy="56" rx="5" ry="9" fill={p.body} transform="rotate(15 58 56)" />
        {/* 머리 */}
        <circle cx="40" cy={hy} r="18" fill={p.body} />
        {/* 귀 */}
        <ellipse cx="24" cy={hy - 5} rx="8" ry="13" fill={p.accent} transform={`rotate(-15 24 ${hy - 5})`} />
        <ellipse cx="56" cy={hy - 5} rx="8" ry="13" fill={p.accent} transform={`rotate(15 56 ${hy - 5})`} />
        {/* 눈 */}
        {mood === 'sleeping'
          ? <><line x1="32" y1={hy + 3} x2="37" y2={hy + 3} stroke={p.outline} strokeWidth="2" strokeLinecap="round"/><line x1="43" y1={hy + 3} x2="48" y2={hy + 3} stroke={p.outline} strokeWidth="2" strokeLinecap="round"/></>
          : mood === 'happy'
          ? <><path d={`M32 ${hy + 5} Q34.5 ${hy + 1} 37 ${hy + 5}`} fill="none" stroke={p.outline} strokeWidth="2"/><path d={`M43 ${hy + 5} Q45.5 ${hy + 1} 48 ${hy + 5}`} fill="none" stroke={p.outline} strokeWidth="2"/></>
          : <><circle cx="34.5" cy={hy + 3} r="3" fill={p.eyeColor}/><circle cx="45.5" cy={hy + 3} r="3" fill={p.eyeColor}/></>
        }
        {/* 코 */}
        <ellipse cx="40" cy={hy + 10} rx="4" ry="2.5" fill={p.outline} />
        {path === 'thriving' && <><path d="M60 20 L62 15 L64 20 L62 25 Z" fill="#f0e040" /><path d="M56 16 L57 13 L58 16 L57 19 Z" fill="#f0e040" /></>}
        {path === 'neglected' && <rect x="34" y="53" width="12" height="5" rx="2" fill="#e8c080" stroke="#c09040" strokeWidth="0.8" />}
      </motion.g>
    </svg>
  );
}
