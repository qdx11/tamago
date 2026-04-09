// 게임 상태 관련 타입 정의

import type { Pet, PetStats, Action } from './pet';

export type GamePhase = 'new_game' | 'egg' | 'playing' | 'menu' | 'stats' | 'sleeping' | 'event' | 'dead' | 'minigame';

export type DayNightPhase = 'dawn' | 'day' | 'dusk' | 'night';

export type SoundType = 'feed' | 'play' | 'clean' | 'sleep' | 'medicine' | 'levelup' | 'alert' | 'hatch' | 'death';

export interface RandomEvent {
  id: string;
  type: 'illness' | 'mood_boost' | 'hunger_spike' | 'surprise';
  description: string;
  statEffects: Partial<PetStats>;
  requiresResponse: boolean;
  responseAction?: Action;
  // 응답 안 했을 때 추가 패널티
  penaltyEffects?: Partial<PetStats>;
}

export interface GameState {
  pet: Pet | null;
  phase: GamePhase;
  tick: number;
  lastTickMs: number;
  dayNightPhase: DayNightPhase;
  activeEvent: RandomEvent | null;
  soundEnabled: boolean;
  menuOpen: boolean;
  menuIndex: number;        // 0~5, 현재 선택된 메뉴 인덱스
  selectedAction: Action | null;
  notificationQueue: string[];
  version: number; // 저장 파일 마이그레이션용
}
