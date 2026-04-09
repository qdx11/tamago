// Zustand 게임 상태 관리 스토어

import { create } from 'zustand';
import type { GameState, RandomEvent } from '../types/game';
import type { Action, AnimalType, EggType, PetStats } from '../types/pet';
import { EGG_TO_ANIMAL } from '../types/pet';
import { decayStats, applyAction, shouldDie, getNextStage, getInitialStats } from '../engine/petEngine';
import { updateCareScore, determineEvolutionPath } from '../engine/evolutionEngine';
import { rollRandomEvent, resolveEvent } from '../engine/eventEngine';
import { getDayNightPhase, TICK_INTERVAL_MS } from '../engine/timeEngine';
import { saveGame } from './persistence';

// 알 타입 5종 (랜덤 선택)
const EGG_TYPES: EggType[] = ['brown_spotted', 'orange_striped', 'white_fluffy', 'golden', 'black'];

// 랜덤 알 타입 선택
function randomEggType(): EggType {
  return EGG_TYPES[Math.floor(Math.random() * EGG_TYPES.length)];
}

interface GameStore extends GameState {
  // 새 게임 시작
  startNewGame: (name: string) => void;
  // 알 부화 (버튼 클릭)
  hatchEgg: () => void;
  // 행동 수행
  performAction: (action: Action) => void;
  // 게임 틱 진행 (게임루프 호출)
  advanceTick: () => void;
  // 이벤트 해결
  resolveActiveEvent: (responded: boolean) => void;
  // 사운드 토글
  toggleSound: () => void;
  // 메뉴 열기/닫기
  toggleMenu: () => void;
  // 메뉴 커서 이동
  navMenu: (direction: 'prev' | 'next') => void;
  // 현재 메뉴 선택 실행
  selectMenu: () => void;
  // 게임 초기화
  resetGame: () => void;
  // 알림 추가
  addNotification: (message: string) => void;
  // 알림 제거
  dismissNotification: () => void;
}

const initialState: GameState = {
  pet: null,
  phase: 'new_game',
  tick: 0,
  lastTickMs: Date.now(),
  dayNightPhase: getDayNightPhase(Date.now()),
  activeEvent: null,
  soundEnabled: true,
  menuOpen: false,
  menuIndex: 0,
  selectedAction: null,
  notificationQueue: [],
  version: 1,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  startNewGame: (name: string) => {
    const eggType = randomEggType();
    const animalType: AnimalType = EGG_TO_ANIMAL[eggType];

    set({
      pet: {
        id: `pet_${Date.now()}`,
        name,
        animalType,
        eggType,
        stage: 'egg',
        path: 'normal',
        stats: getInitialStats(),
        ageInTicks: 0,
        stageEnteredAtTick: 0,
        isSleeping: false,
        isSick: false,
        lastActionAt: {},
        careScore: 70,
        bornAt: Date.now(),
      },
      phase: 'egg',
      tick: 0,
      lastTickMs: Date.now(),
    });
  },

  hatchEgg: () => {
    const { pet } = get();
    if (!pet || pet.stage !== 'egg') return;

    set(state => ({
      pet: state.pet ? {
        ...state.pet,
        stage: 'baby',
        stageEnteredAtTick: state.tick,
        stats: getInitialStats(),
      } : null,
      phase: 'playing',
    }));
  },

  performAction: (action: Action) => {
    const state = get();
    const { pet, tick } = state;
    if (!pet || pet.stage === 'dead' || pet.stage === 'egg') return;

    const result = applyAction(pet, action, tick);
    if (!result) {
      // 쿨다운 중
      get().addNotification('아직 쿨다운 중이에요!');
      return;
    }

    const updatedPet = {
      ...pet,
      stats: result.stats,
      careScore: Math.min(100, pet.careScore + result.carePoints),
      lastActionAt: { ...pet.lastActionAt, [action]: tick },
      isSleeping: action === 'sleep' ? true : pet.isSleeping,
      isSick: action === 'medicine' ? false : pet.isSick,
    };

    set({ pet: updatedPet, menuOpen: false });
  },

  advanceTick: () => {
    const state = get();
    const { pet, tick, activeEvent } = state;

    if (!pet || pet.stage === 'egg' || pet.stage === 'dead') return;
    if (activeEvent) return; // 이벤트 해결 대기 중엔 틱 정지

    const newTick = tick + 1;
    const now = Date.now();
    const dayNightPhase = getDayNightPhase(now);

    // 스탯 감소
    const decayedStats = decayStats(pet.stats, pet.stage, pet.isSleeping, 1);

    // 수면 중 자동 깨어나기 (sleep 스탯 100% 회복 시)
    const isStillSleeping = pet.isSleeping && decayedStats.sleep < 100;

    // 케어 점수 업데이트
    const newCareScore = updateCareScore(pet.careScore, decayedStats, 1);

    // 사망 체크
    if (shouldDie(decayedStats)) {
      set({
        pet: { ...pet, stats: decayedStats, stage: 'dead' },
        phase: 'dead',
      });
      saveGame({ ...state, pet: { ...pet, stats: decayedStats, stage: 'dead' }, phase: 'dead', tick: newTick });
      return;
    }

    // 단계 전환 체크
    const stageAge = newTick - pet.stageEnteredAtTick;
    const nextStage = getNextStage(pet.stage, stageAge);
    const newPath = nextStage ? determineEvolutionPath(newCareScore) : pet.path;

    // 랜덤 이벤트 롤
    const newEvent: RandomEvent | null = rollRandomEvent(pet, newTick);

    const updatedPet = {
      ...pet,
      stats: decayedStats,
      ageInTicks: pet.ageInTicks + 1,
      careScore: newCareScore,
      isSleeping: isStillSleeping,
      isSick: newEvent?.type === 'illness' ? true : pet.isSick,
      ...(nextStage ? {
        stage: nextStage,
        path: newPath,
        stageEnteredAtTick: newTick,
      } : {}),
    };

    const newState: Partial<GameStore> = {
      pet: updatedPet,
      tick: newTick,
      lastTickMs: now,
      dayNightPhase,
      activeEvent: newEvent,
    };

    if (nextStage) {
      newState.notificationQueue = [...state.notificationQueue, `${pet.name}이(가) 성장했어요! 🎉`];
    }

    set(newState);

    // 매 10틱마다 자동 저장
    if (newTick % 10 === 0) {
      saveGame({ ...state, ...newState } as GameState);
    }
  },

  resolveActiveEvent: (responded: boolean) => {
    const { activeEvent, pet } = get();
    if (!activeEvent || !pet) return;

    const penaltyStats = resolveEvent(activeEvent, responded);
    const hasEffects = Object.keys(penaltyStats).length > 0;

    set(state => {
      if (!hasEffects || !state.pet) return { activeEvent: null };

      // state.pet이 확정된 상태에서 stats를 직접 접근 (??  없이 명시적 처리)
      const current = state.pet.stats;
      const updatedStats: PetStats = {
        hunger:    Math.max(0, Math.min(100, current.hunger    + (penaltyStats.hunger    ?? 0))),
        happiness: Math.max(0, Math.min(100, current.happiness + (penaltyStats.happiness ?? 0))),
        health:    Math.max(0, Math.min(100, current.health    + (penaltyStats.health    ?? 0))),
        sleep:     Math.max(0, Math.min(100, current.sleep     + (penaltyStats.sleep     ?? 0))),
        hygiene:   Math.max(0, Math.min(100, current.hygiene   + (penaltyStats.hygiene   ?? 0))),
      };

      return {
        pet: { ...state.pet, stats: updatedStats },
        activeEvent: null,
      };
    });
  },

  toggleSound: () => set(state => ({ soundEnabled: !state.soundEnabled })),

  toggleMenu: () => set(state => ({ menuOpen: !state.menuOpen })),

  navMenu: (direction: 'prev' | 'next') => {
    const { phase } = get();
    if (phase !== 'playing' && phase !== 'stats') return;
    set(state => ({
      menuIndex: direction === 'prev'
        ? (state.menuIndex - 1 + 6) % 6
        : (state.menuIndex + 1) % 6,
    }));
  },

  selectMenu: () => {
    const { menuIndex, phase } = get();
    const MENU_ITEMS = ['feed', 'sleep', 'play', 'clean', 'medicine', 'stats'] as const;
    const item = MENU_ITEMS[menuIndex];

    if (item === 'stats') {
      // stats 페이즈에서 다시 OK → playing으로 복귀 (토글)
      set({ phase: phase === 'stats' ? 'playing' : 'stats' });
    } else {
      get().performAction(item);
      set({ phase: 'playing' });
    }
  },

  resetGame: () => {
    set(initialState);
  },

  addNotification: (message: string) => {
    set(state => ({ notificationQueue: [...state.notificationQueue, message] }));
  },

  dismissNotification: () => {
    set(state => ({ notificationQueue: state.notificationQueue.slice(1) }));
  },
}));

// 틱 간격 상수 재export
export { TICK_INTERVAL_MS };
