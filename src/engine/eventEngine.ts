// 랜덤 이벤트 시스템

import type { Pet } from '../types/pet';
import type { RandomEvent } from '../types/game';

// 10가지 랜덤 이벤트 정의
const EVENTS: RandomEvent[] = [
  {
    id: 'illness',
    type: 'illness',
    description: '아파요! 약을 줘야 해요 💊',
    statEffects: { health: -20, happiness: -10 },
    requiresResponse: true,
    responseAction: 'medicine',
    penaltyEffects: { health: -15 },
  },
  {
    id: 'stomach_ache',
    type: 'illness',
    description: '배가 아파요! 약을 주세요 🤒',
    statEffects: { health: -15, hunger: -10 },
    requiresResponse: true,
    responseAction: 'medicine',
    penaltyEffects: { health: -10 },
  },
  {
    id: 'mood_boost',
    type: 'mood_boost',
    description: '오늘 날씨가 좋아서 기분이 최고예요! ☀️',
    statEffects: { happiness: +20 },
    requiresResponse: false,
  },
  {
    id: 'found_snack',
    type: 'mood_boost',
    description: '간식을 발견했어요! 냠냠 🍪',
    statEffects: { hunger: +15, happiness: +10 },
    requiresResponse: false,
  },
  {
    id: 'nightmare',
    type: 'mood_boost',
    description: '악몽을 꿨어요... 😱',
    statEffects: { happiness: -15, sleep: -10 },
    requiresResponse: false,
  },
  {
    id: 'hunger_spike',
    type: 'hunger_spike',
    description: '갑자기 엄청 배고파요! 먹이를 주세요 🍽️',
    statEffects: { hunger: -25 },
    requiresResponse: true,
    responseAction: 'feed',
    penaltyEffects: { hunger: -10, happiness: -5 },
  },
  {
    id: 'sunshine',
    type: 'surprise',
    description: '햇빛을 받아 건강해졌어요! 🌈',
    statEffects: { health: +15, happiness: +10 },
    requiresResponse: false,
  },
  {
    id: 'won_game',
    type: 'surprise',
    description: '게임에서 이겼어요! 신나요 🎉',
    statEffects: { happiness: +25 },
    requiresResponse: false,
  },
  {
    id: 'muddy',
    type: 'hunger_spike',
    description: '진흙탕에서 놀았어요! 씻겨주세요 🛁',
    statEffects: { hygiene: -30, happiness: +5 },
    requiresResponse: true,
    responseAction: 'clean',
    penaltyEffects: { hygiene: -15, health: -5 },
  },
  {
    id: 'sleepy',
    type: 'mood_boost',
    description: '너무 졸려요... 재워주세요 😴',
    statEffects: { sleep: -20, happiness: -5 },
    requiresResponse: true,
    responseAction: 'sleep',
    penaltyEffects: { sleep: -10 },
  },
];

// 틱당 이벤트 발생 확률 (0.5%)
const EVENT_PROBABILITY_PER_TICK = 0.005;

// 랜덤 이벤트 롤 (순수 함수)
export function rollRandomEvent(pet: Pet, _tick: number): RandomEvent | null {
  // 자는 중이거나 이미 아프면 이벤트 없음
  if (pet.isSleeping) return null;
  if (pet.stage === 'egg' || pet.stage === 'dead') return null;

  if (Math.random() > EVENT_PROBABILITY_PER_TICK) return null;

  // 현재 단계에 적합한 이벤트 필터링
  const availableEvents = EVENTS.filter(event => {
    // 아픈 상태에서 질병 이벤트는 제외
    if (pet.isSick && event.type === 'illness') return false;
    return true;
  });

  if (availableEvents.length === 0) return null;

  // 랜덤 선택
  return availableEvents[Math.floor(Math.random() * availableEvents.length)];
}

// 이벤트 해결 (응답 여부에 따른 효과 반환)
export function resolveEvent(
  event: RandomEvent,
  responded: boolean
): typeof event.statEffects {
  if (!responded && event.requiresResponse && event.penaltyEffects) {
    return event.penaltyEffects;
  }
  return {};
}
