// 기분별 Framer Motion 애니메이션 훅

import type { TargetAndTransition, Transition } from 'framer-motion';
import type { MoodType } from './spriteTypes';

interface MoodAnimation {
  animate: TargetAndTransition;
  transition: Transition;
}

export function useMoodAnimation(mood: MoodType): MoodAnimation {
  switch (mood) {
    case 'happy':
      return {
        animate: { y: [0, -8, 0], rotate: [-3, 3, -3] },
        transition: { duration: 0.45, repeat: Infinity, ease: 'easeInOut' },
      };
    case 'sleeping':
      return {
        animate: { y: [0, -1.5, 0] },
        transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
      };
    case 'sick':
      return {
        animate: { rotate: [-2, 2, -2] },
        transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
      };
    case 'idle':
    default:
      return {
        animate: { y: [0, -3, 0] },
        transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
      };
  }
}
