import { motion } from 'framer-motion';
import type { SpriteProps } from '../shared/spriteTypes';
import { PALETTES } from '../shared/palette';
import { useMoodAnimation } from '../shared/useMoodAnimation';

export function CatBaby({ mood, path, size = 80 }: SpriteProps) {
  const p = PALETTES.cat[path];
  const { animate, transition } = useMoodAnimation(mood);
  const filter = mood === 'sick' ? p.sickFilter : 'none';

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={{ filter }}>
      <motion.g animate={animate} transition={transition} style={{ transformOrigin: '40px 45px' }}>
        <ellipse cx="40" cy="56" rx="13" ry="10" fill={p.body} />
        <circle cx="40" cy="38" r="16" fill={p.body} />
        {/* 뾰족한 귀 */}
        <polygon points="26,26 22,14 33,20" fill={p.body} />
        <polygon points="54,26 58,14 47,20" fill={p.body} />
        <polygon points="27,25 24,16 32,21" fill={p.accent} />
        <polygon points="53,25 56,16 48,21" fill={p.accent} />
        {/* 눈 */}
        {mood === 'sleeping'
          ? <><line x1="34" y1="37" x2="38" y2="37" stroke={p.outline} strokeWidth="1.8" strokeLinecap="round"/><line x1="42" y1="37" x2="46" y2="37" stroke={p.outline} strokeWidth="1.8" strokeLinecap="round"/></>
          : mood === 'happy'
          ? <><path d="M34 39 Q36 35 38 39" fill="none" stroke={p.eyeColor} strokeWidth="1.8"/><path d="M42 39 Q44 35 46 39" fill="none" stroke={p.eyeColor} strokeWidth="1.8"/></>
          : <><ellipse cx="36" cy="37" rx="2" ry="3" fill={p.eyeColor}/><ellipse cx="44" cy="37" rx="2" ry="3" fill={p.eyeColor}/></>
        }
        {/* 코 + 수염 */}
        <polygon points="40,41 38,44 42,44" fill={p.outline} />
        <line x1="26" y1="43" x2="35" y2="43" stroke={p.outline} strokeWidth="0.8" opacity="0.6" />
        <line x1="45" y1="43" x2="54" y2="43" stroke={p.outline} strokeWidth="0.8" opacity="0.6" />
        {/* 꼬리 */}
        <path d="M48 60 Q56 56 54 68" stroke={p.body} strokeWidth="4" fill="none" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}
