// 알 스프라이트 + 부화 애니메이션

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { EggType } from '../../types/pet';

interface EggSpriteProps {
  eggType: EggType;
  isHatching: boolean;
  onHatchComplete: () => void;
  size?: number;
}

// 알 타입별 색상
const EGG_COLORS: Record<EggType, { fill: string; spot: string }> = {
  brown_spotted:  { fill: '#c8956a', spot: '#7a4a28' },
  orange_striped: { fill: '#e87820', spot: '#c05010' },
  white_fluffy:   { fill: '#e8e8d0', spot: '#c0c0a8' },
  golden:         { fill: '#d4a820', spot: '#f0c840' },
  black:          { fill: '#383828', spot: '#484838' },
};

type HatchPhase = 'idle' | 'shaking' | 'cracked' | 'burst';

export function EggSprite({ eggType, isHatching, onHatchComplete, size = 80 }: EggSpriteProps) {
  const [phase, setPhase] = useState<HatchPhase>('idle');
  const colors = EGG_COLORS[eggType];

  useEffect(() => {
    if (!isHatching || phase !== 'idle') return;

    // 부화 시퀀스: 흔들기 → 균열 → 폭발
    setPhase('shaking');
    const t1 = setTimeout(() => setPhase('cracked'), 600);
    const t2 = setTimeout(() => setPhase('burst'), 1000);
    const t3 = setTimeout(() => onHatchComplete(), 1500);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [isHatching, phase, onHatchComplete]);

  const shakeVariants = {
    idle:    { rotate: [0] },
    shaking: { rotate: [-12, 12, -12, 12, -8, 8, 0] },
    cracked: { rotate: [-4, 4, -4, 4, 0] },
    burst:   { scale: [1, 1.3, 0], opacity: [1, 1, 0] },
  };

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <AnimatePresence>
        {phase !== 'burst' && (
          <motion.svg
            viewBox="0 0 80 80"
            width={size}
            height={size}
            animate={shakeVariants[phase]}
            transition={
              phase === 'shaking' ? { duration: 0.6, ease: 'easeInOut' } :
              phase === 'cracked' ? { duration: 0.4, ease: 'easeInOut' } :
              { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
            }
            style={{ transformOrigin: '40px 50px' }}
          >
            {/* 알 몸통 */}
            <ellipse cx="40" cy="46" rx="22" ry="28" fill={colors.fill} />

            {/* 알 타입별 무늬 */}
            {eggType === 'brown_spotted' && <>
              <circle cx="32" cy="40" r="3.5" fill={colors.spot} opacity="0.7" />
              <circle cx="48" cy="36" r="2.5" fill={colors.spot} opacity="0.7" />
              <circle cx="38" cy="54" r="3" fill={colors.spot} opacity="0.7" />
              <circle cx="44" cy="48" r="2" fill={colors.spot} opacity="0.7" />
            </>}
            {eggType === 'orange_striped' && <>
              <path d="M30 32 Q35 38 30 44" stroke={colors.spot} strokeWidth="2" fill="none" opacity="0.6" />
              <path d="M40 28 Q45 36 40 46" stroke={colors.spot} strokeWidth="2" fill="none" opacity="0.6" />
              <path d="M50 32 Q55 38 50 44" stroke={colors.spot} strokeWidth="2" fill="none" opacity="0.6" />
            </>}
            {eggType === 'white_fluffy' && <>
              <circle cx="34" cy="38" r="2" fill={colors.spot} opacity="0.5" />
              <circle cx="46" cy="42" r="2" fill={colors.spot} opacity="0.5" />
              <circle cx="36" cy="52" r="2.5" fill={colors.spot} opacity="0.5" />
              <circle cx="44" cy="34" r="1.5" fill={colors.spot} opacity="0.5" />
            </>}
            {eggType === 'golden' && <>
              <line x1="32" y1="30" x2="36" y2="34" stroke={colors.spot} strokeWidth="1.5" opacity="0.7" />
              <line x1="44" y1="28" x2="48" y2="32" stroke={colors.spot} strokeWidth="1.5" opacity="0.7" />
              <line x1="28" y1="44" x2="32" y2="48" stroke={colors.spot} strokeWidth="1.5" opacity="0.7" />
            </>}
            {eggType === 'black' && <>
              <circle cx="34" cy="40" r="2" fill={colors.spot} opacity="0.5" />
              <circle cx="46" cy="44" r="2.5" fill={colors.spot} opacity="0.5" />
              <circle cx="40" cy="52" r="1.5" fill={colors.spot} opacity="0.5" />
            </>}

            {/* 균열 (cracked 이후) */}
            {(phase === 'cracked') && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                <path d="M40 22 L38 30 L42 34 L36 42" stroke="#1a0f09" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <path d="M48 28 L46 36 L50 40" stroke="#1a0f09" strokeWidth="1" fill="none" strokeLinecap="round" />
              </motion.g>
            )}

            {/* 외곽선 */}
            <ellipse cx="40" cy="46" rx="22" ry="28" fill="none" stroke="#1a0f09" strokeWidth="1.5" />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* 폭발 파티클 */}
      {phase === 'burst' && (
        <svg viewBox="0 0 80 80" width={size} height={size} style={{ position: 'absolute', top: 0, left: 0 }}>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const tx = 40 + Math.cos(rad) * 30;
            const ty = 46 + Math.sin(rad) * 30;
            return (
              <motion.circle
                key={i}
                cx="40" cy="46" r="4"
                fill={i % 2 === 0 ? colors.fill : colors.spot}
                initial={{ cx: 40, cy: 46, opacity: 1, r: 4 }}
                animate={{ cx: tx, cy: ty, opacity: 0, r: 2 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.02 }}
              />
            );
          })}
        </svg>
      )}
    </div>
  );
}
