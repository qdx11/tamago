import { motion } from 'framer-motion';
import type { SpriteProps } from '../shared/spriteTypes';
import { PALETTES } from '../shared/palette';
import { useMoodAnimation } from '../shared/useMoodAnimation';

export function FoxBaby({ mood, path, size = 80 }: SpriteProps) {
  const p = PALETTES.fox[path];
  const { animate, transition } = useMoodAnimation(mood);
  const filter = mood === 'sick' ? p.sickFilter : 'none';

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={{ filter }}>
      <motion.g animate={animate} transition={transition} style={{ transformOrigin: '40px 45px' }}>
        <ellipse cx="40" cy="56" rx="13" ry="10" fill={p.body} />
        <circle cx="40" cy="38" r="16" fill={p.body} />
        {/* 넓은 삼각형 귀 */}
        <polygon points="26,28 18,12 36,22" fill={p.body} />
        <polygon points="54,28 62,12 44,22" fill={p.body} />
        <polygon points="27,27 21,15 34,22" fill={p.accent} />
        <polygon points="53,27 59,15 46,22" fill={p.accent} />
        {/* 흰색 볼 */}
        <ellipse cx="32" cy="42" rx="6" ry="5" fill="rgba(255,255,255,0.4)" />
        <ellipse cx="48" cy="42" rx="6" ry="5" fill="rgba(255,255,255,0.4)" />
        {mood === 'sleeping'
          ? <><line x1="34" y1="37" x2="38" y2="37" stroke={p.outline} strokeWidth="1.8" strokeLinecap="round"/><line x1="42" y1="37" x2="46" y2="37" stroke={p.outline} strokeWidth="1.8" strokeLinecap="round"/></>
          : mood === 'happy'
          ? <><path d="M34 39 Q36 35 38 39" fill="none" stroke={p.outline} strokeWidth="1.8"/><path d="M42 39 Q44 35 46 39" fill="none" stroke={p.outline} strokeWidth="1.8"/></>
          : <><circle cx="36" cy="37" r="2.5" fill={p.eyeColor}/><circle cx="44" cy="37" r="2.5" fill={p.eyeColor}/></>
        }
        <ellipse cx="40" cy="43" rx="3" ry="2" fill={p.outline} />
        {/* 꼬리 끝 흰색 */}
        <path d="M48 58 Q58 54 54 66" stroke={p.body} strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M52 64 Q56 62 54 68" stroke="#e8e8d8" strokeWidth="3" fill="none" strokeLinecap="round" />
      </motion.g>
    </svg>
  );
}
