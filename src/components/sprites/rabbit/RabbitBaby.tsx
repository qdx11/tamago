import { motion } from 'framer-motion';
import type { SpriteProps } from '../shared/spriteTypes';
import { PALETTES } from '../shared/palette';
import { useMoodAnimation } from '../shared/useMoodAnimation';

export function RabbitBaby({ mood, path, size = 80 }: SpriteProps) {
  const p = PALETTES.rabbit[path];
  const { animate, transition } = useMoodAnimation(mood);
  const filter = mood === 'sick' ? p.sickFilter : 'none';

  return (
    <svg viewBox="0 0 80 80" width={size} height={size} style={{ filter }}>
      <motion.g animate={animate} transition={transition} style={{ transformOrigin: '40px 45px' }}>
        <ellipse cx="40" cy="56" rx="13" ry="10" fill={p.body} />
        <circle cx="40" cy="39" r="15" fill={p.body} />
        {/* 길고 얇은 귀 */}
        <ellipse cx="30" cy="20" rx="6" ry="16" fill={p.body} />
        <ellipse cx="50" cy="20" rx="6" ry="16" fill={p.body} />
        <ellipse cx="30" cy="20" rx="3.5" ry="13" fill={p.accent} />
        <ellipse cx="50" cy="20" rx="3.5" ry="13" fill={p.accent} />
        {mood === 'sleeping'
          ? <><line x1="34" y1="38" x2="38" y2="38" stroke={p.outline} strokeWidth="1.8" strokeLinecap="round"/><line x1="42" y1="38" x2="46" y2="38" stroke={p.outline} strokeWidth="1.8" strokeLinecap="round"/></>
          : mood === 'happy'
          ? <><path d="M34 40 Q36 36 38 40" fill="none" stroke={p.eyeColor} strokeWidth="1.8"/><path d="M42 40 Q44 36 46 40" fill="none" stroke={p.eyeColor} strokeWidth="1.8"/></>
          : <><circle cx="36" cy="38" r="2.5" fill={p.eyeColor}/><circle cx="44" cy="38" r="2.5" fill={p.eyeColor}/></>
        }
        <ellipse cx="40" cy="44" rx="3" ry="2" fill={p.eyeColor} opacity="0.5" />
        <circle cx="40" cy="39" r="15" fill="none" stroke={p.outline} strokeWidth="1" />
      </motion.g>
    </svg>
  );
}
