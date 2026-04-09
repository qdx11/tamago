import { motion } from 'framer-motion';
import type { SpriteProps } from '../shared/spriteTypes';
import { PALETTES, POSTURE_OFFSET } from '../shared/palette';
import { useMoodAnimation } from '../shared/useMoodAnimation';

export function DogMaturity({ mood, path, size = 80 }: SpriteProps) {
  const p = PALETTES.dog[path];
  const o = POSTURE_OFFSET[path];
  const { animate, transition } = useMoodAnimation(mood);
  const filter = mood === 'sick' ? p.sickFilter : 'none';
  const hy = 26 + o.headY;

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={{ filter }}>
      <motion.g animate={animate} transition={transition} style={{ transformOrigin: '40px 50px' }}>
        {/* 꼬리 */}
        <path d={`M55 62 Q68 50 62 38`} stroke={p.accent} strokeWidth="6" fill="none" strokeLinecap="round" />
        {/* 몸통 */}
        <ellipse cx="40" cy="59" rx={19 + o.bodyRx} ry={15 + o.bodyRy} fill={p.body} />
        {/* 다리 */}
        <rect x="23" y="67" width="9" height="12" rx="4.5" fill={p.body} />
        <rect x="48" y="67" width="9" height="12" rx="4.5" fill={p.body} />
        {/* 팔 */}
        <ellipse cx="19" cy="57" rx="6" ry="10" fill={p.body} transform="rotate(-18 19 57)" />
        <ellipse cx="61" cy="57" rx="6" ry="10" fill={p.body} transform="rotate(18 61 57)" />
        {/* 머리 */}
        <circle cx="40" cy={hy} r="19" fill={p.body} />
        {/* 귀 */}
        <ellipse cx="22" cy={hy - 6} rx="9" ry="14" fill={p.accent} transform={`rotate(-18 22 ${hy - 6})`} />
        <ellipse cx="58" cy={hy - 6} rx="9" ry="14" fill={p.accent} transform={`rotate(18 58 ${hy - 6})`} />
        {/* 눈 */}
        {mood === 'sleeping'
          ? <><line x1="31" y1={hy + 3} x2="36" y2={hy + 3} stroke={p.outline} strokeWidth="2.2" strokeLinecap="round"/><line x1="44" y1={hy + 3} x2="49" y2={hy + 3} stroke={p.outline} strokeWidth="2.2" strokeLinecap="round"/></>
          : mood === 'happy'
          ? <><path d={`M31 ${hy + 5} Q33.5 ${hy} 36 ${hy + 5}`} fill="none" stroke={p.outline} strokeWidth="2.2"/><path d={`M44 ${hy + 5} Q46.5 ${hy} 49 ${hy + 5}`} fill="none" stroke={p.outline} strokeWidth="2.2"/></>
          : <><circle cx="33.5" cy={hy + 3} r="3.5" fill={p.eyeColor}/><circle cx="46.5" cy={hy + 3} r="3.5" fill={p.eyeColor}/></>
        }
        {/* 코 */}
        <ellipse cx="40" cy={hy + 11} rx="4.5" ry="3" fill={p.outline} />
        {/* 잘 큰: 왕관 */}
        {path === 'thriving' && <path d="M28 20 L32 12 L36 18 L40 10 L44 18 L48 12 L52 20 Z" fill="#d4a820" stroke="#a07010" strokeWidth="1" />}
        {/* 못 큰: 반쯤 감긴 눈 + 축 처진 상태 */}
        {path === 'neglected' && mood !== 'sleeping' && mood !== 'happy' && <>
          <line x1="31" y1={hy + 1} x2="36" y2={hy + 4} stroke={p.outline} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <line x1="44" y1={hy + 1} x2="49" y2={hy + 4} stroke={p.outline} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </>}
      </motion.g>
    </svg>
  );
}
