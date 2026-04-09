// 스프라이트 공통 타입 정의

import type { EvolutionPath } from '../../../types/pet';

export type MoodType = 'idle' | 'happy' | 'sleeping' | 'sick';

export interface SpriteProps {
  mood: MoodType;
  path: EvolutionPath;
  size?: number; // 기본값 80px
}
