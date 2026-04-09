import { motion } from 'framer-motion';
import type { SpriteProps } from '../shared/spriteTypes';
import { PALETTES } from '../shared/palette';
import { useMoodAnimation } from '../shared/useMoodAnimation';

export function PandaBaby({ mood, path, size = 80 }: SpriteProps) {
  const p = PALETTES.panda[path];
  const { animate, transition } = useMoodAnimation(mood);
  const filter = mood === 'sick' ? p.sickFilter : 'none';

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={{ filter }}>
      <motion.g animate={animate} transition={transition} style={{ transformOrigin: '40px 45px' }}>
        <ellipse cx="40" cy="56" rx="14" ry="11" fill={p.body} />
        <circle cx="40" cy="38" r="17" fill={p.body} />
        {/* 머리 위 둥근 귀 */}
        <circle cx="27" cy="25" r="9" fill={p.accent} />
        <circle cx="53" cy="25" r="9" fill={p.accent} />
        <circle cx="27" cy="25" r="6" fill={p.body} />
        <circle cx="53" cy="25" r="6" fill={p.body} />
        {/* 눈 주위 검은 패치 */}
        <ellipse cx="34" cy="36" rx="6" ry="5" fill={p.accent} />
        <ellipse cx="46" cy="36" rx="6" ry="5" fill={p.accent} />
        {mood === 'sleeping'
          ? <><line x1="31" y1="36" x2="37" y2="36" stroke={p.body} strokeWidth="1.8" strokeLinecap="round"/><line x1="43" y1="36" x2="49" y2="36" stroke={p.body} strokeWidth="1.8" strokeLinecap="round"/></>
          : mood === 'happy'
          ? <><path d="M31 38 Q34 34 37 38" fill="none" stroke={p.body} strokeWidth="1.8"/><path d="M43 38 Q46 34 49 38" fill="none" stroke={p.body} strokeWidth="1.8"/></>
          : <><circle cx="34" cy="36" r="3" fill={p.eyeColor}/><circle cx="46" cy="36" r="3" fill={p.eyeColor}/></>
        }
        <ellipse cx="40" cy="44" rx="4" ry="3" fill={p.accent} />
        <circle cx="40" cy="44" r="2" fill={p.body} />
      </motion.g>
    </svg>
  );
}
