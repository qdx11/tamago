import { motion } from 'framer-motion';
import type { SpriteProps } from '../shared/spriteTypes';
import { PALETTES } from '../shared/palette';
import { useMoodAnimation } from '../shared/useMoodAnimation';

export function DogBaby({ mood, path, size = 80 }: SpriteProps) {
  const p = PALETTES.dog[path];
  const { animate, transition } = useMoodAnimation(mood);
  const filter = mood === 'sick' ? p.sickFilter : 'none';

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={{ filter }}>
      <motion.g animate={animate} transition={transition} style={{ transformOrigin: '40px 45px' }}>
        {/* 몸통 */}
        <ellipse cx="40" cy="56" rx="14" ry="10" fill={p.body} />
        {/* 머리 */}
        <circle cx="40" cy="38" r="16" fill={p.body} />
        {/* 귀 (축 늘어진 플랩) */}
        <ellipse cx="26" cy="34" rx="7" ry="11" fill={p.accent} transform="rotate(-12 26 34)" />
        <ellipse cx="54" cy="34" rx="7" ry="11" fill={p.accent} transform="rotate(12 54 34)" />
        {/* 눈 */}
        {mood === 'sleeping'
          ? <><line x1="34" y1="37" x2="38" y2="37" stroke={p.outline} strokeWidth="1.8" strokeLinecap="round"/><line x1="42" y1="37" x2="46" y2="37" stroke={p.outline} strokeWidth="1.8" strokeLinecap="round"/></>
          : mood === 'happy'
          ? <><path d="M34 39 Q36 35 38 39" fill="none" stroke={p.outline} strokeWidth="1.8"/><path d="M42 39 Q44 35 46 39" fill="none" stroke={p.outline} strokeWidth="1.8"/></>
          : <><circle cx="36" cy="37" r="2.5" fill={p.eyeColor}/><circle cx="44" cy="37" r="2.5" fill={p.eyeColor}/></>
        }
        {/* 코 */}
        <ellipse cx="40" cy="43" rx="3" ry="2" fill={p.outline} />
        {/* 외곽선 */}
        <circle cx="40" cy="38" r="16" fill="none" stroke={p.outline} strokeWidth="1.2" />
      </motion.g>
    </svg>
  );
}
