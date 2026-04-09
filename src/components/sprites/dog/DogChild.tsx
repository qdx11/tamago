import { motion } from 'framer-motion';
import type { SpriteProps } from '../shared/spriteTypes';
import { PALETTES, POSTURE_OFFSET } from '../shared/palette';
import { useMoodAnimation } from '../shared/useMoodAnimation';

export function DogChild({ mood, path, size = 80 }: SpriteProps) {
  const p = PALETTES.dog[path];
  const o = POSTURE_OFFSET[path];
  const { animate, transition } = useMoodAnimation(mood);
  const filter = mood === 'sick' ? p.sickFilter : 'none';
  const hy = 34 + o.headY;

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={{ filter }}>
      <motion.g animate={animate} transition={transition} style={{ transformOrigin: '40px 48px' }}>
        {/* 몸통 */}
        <ellipse cx="40" cy="57" rx={15 + o.bodyRx} ry={13 + o.bodyRy} fill={p.body} />
        {/* 팔 */}
        <ellipse cx="25" cy="55" rx="5" ry="8" fill={p.body} transform="rotate(-10 25 55)" />
        <ellipse cx="55" cy="55" rx="5" ry="8" fill={p.body} transform="rotate(10 55 55)" />
        {/* 머리 */}
        <circle cx="40" cy={hy} r="17" fill={p.body} />
        {/* 귀 */}
        <ellipse cx="25" cy={hy - 4} rx="7" ry="12" fill={p.accent} transform={`rotate(-12 25 ${hy - 4})`} />
        <ellipse cx="55" cy={hy - 4} rx="7" ry="12" fill={p.accent} transform={`rotate(12 55 ${hy - 4})`} />
        {/* 눈 */}
        {mood === 'sleeping'
          ? <><line x1="33" y1={hy + 3} x2="37" y2={hy + 3} stroke={p.outline} strokeWidth="1.8" strokeLinecap="round"/><line x1="43" y1={hy + 3} x2="47" y2={hy + 3} stroke={p.outline} strokeWidth="1.8" strokeLinecap="round"/></>
          : mood === 'happy'
          ? <><path d={`M33 ${hy + 5} Q35 ${hy + 1} 37 ${hy + 5}`} fill="none" stroke={p.outline} strokeWidth="1.8"/><path d={`M43 ${hy + 5} Q45 ${hy + 1} 47 ${hy + 5}`} fill="none" stroke={p.outline} strokeWidth="1.8"/></>
          : <><circle cx="35" cy={hy + 3} r="2.5" fill={p.eyeColor}/><circle cx="45" cy={hy + 3} r="2.5" fill={p.eyeColor}/></>
        }
        {/* 코 */}
        <ellipse cx="40" cy={hy + 9} rx="3" ry="2" fill={p.outline} />
        {/* 잘 큰 전용: 반짝이 */}
        {path === 'thriving' && <path d="M58 22 L60 18 L62 22 L60 26 Z" fill="#f0e040" />}
        {/* 못 큰 전용: 밴드에이드 */}
        {path === 'neglected' && <rect x="34" y="52" width="12" height="5" rx="2" fill="#e8c080" stroke="#c09040" strokeWidth="0.8" />}
      </motion.g>
    </svg>
  );
}
