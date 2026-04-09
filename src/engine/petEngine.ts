// 펫 핵심 로직: 스탯 감소, 행동 적용, 단계 전환 판정

import type { Pet, PetStats, Action, LifecycleStage } from '../types/pet';
import { STAGE_TICK_THRESHOLDS } from '../types/pet';

// 케어 포인트 보상 상수 (스탯 평균 기준 임계값과 보상량)
// 낮을 때 돌봐주면 더 높은 보상 → 게임 밸런스 조정 시 여기만 수정
const CARE_POINTS = {
  LOW_STAT_THRESHOLD: 30,   // 스탯 평균 이 이하면 "긴급 케어"
  MID_STAT_THRESHOLD: 60,   // 스탯 평균 이 이하면 "보통 케어"
  HIGH_REWARD: 15,          // 긴급 케어 보상 (스탯 낮을 때)
  MID_REWARD: 8,            // 보통 케어 보상
  LOW_REWARD: 3,            // 여유 케어 보상 (스탯 높을 때)
} as const;

// 단계별 틱당 스탯 감소량
const DECAY_RATES: Record<LifecycleStage, Partial<PetStats>> = {
  egg:      { hunger: 0,    happiness: 0,    sleep: 0,    hygiene: 0,    health: 0 },
  baby:     { hunger: -1.5, happiness: -1.0, sleep: -0.8, hygiene: -0.5, health: 0 },
  childhood:{ hunger: -2.0, happiness: -1.5, sleep: -1.0, hygiene: -0.8, health: 0 },
  growth:   { hunger: -2.5, happiness: -2.0, sleep: -1.5, hygiene: -1.0, health: 0 },
  maturity: { hunger: -3.0, happiness: -2.5, sleep: -2.0, hygiene: -1.5, health: -0.2 },
  dead:     { hunger: 0,    happiness: 0,    sleep: 0,    hygiene: 0,    health: 0 },
};

// 행동별 스탯 변화량
const ACTION_EFFECTS: Record<Action, Partial<PetStats>> = {
  feed:     { hunger: +30, happiness: +5 },
  play:     { happiness: +25, sleep: -5 },
  sleep:    { sleep: +40, health: +5 },
  clean:    { hygiene: +35, happiness: +5 },
  medicine: { health: +40, happiness: -10 },
};

// 행동별 쿨다운 (틱 수)
const ACTION_COOLDOWNS: Record<Action, number> = {
  feed:     20,   // ~1분
  play:     15,
  sleep:    30,
  clean:    30,
  medicine: 40,
};

function clamp(value: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, value));
}

// 틱당 스탯 감소 적용 (순수 함수)
export function decayStats(
  stats: PetStats,
  stage: LifecycleStage,
  isSleeping: boolean,
  tickDelta: number
): PetStats {
  const rates = DECAY_RATES[stage];
  const sleepMultiplier = isSleeping ? 0.1 : 1; // 자는 중엔 거의 감소 안 함

  return {
    hunger:    clamp(stats.hunger    + (rates.hunger    ?? 0) * tickDelta * sleepMultiplier),
    happiness: clamp(stats.happiness + (rates.happiness ?? 0) * tickDelta * sleepMultiplier),
    sleep:     clamp(stats.sleep     + (rates.sleep     ?? 0) * tickDelta),
    hygiene:   clamp(stats.hygiene   + (rates.hygiene   ?? 0) * tickDelta * sleepMultiplier),
    health:    clamp(stats.health    + (rates.health    ?? 0) * tickDelta),
  };
}

// 행동 적용 (순수 함수)
// 쿨다운 중이면 null 반환
export function applyAction(
  pet: Pet,
  action: Action,
  currentTick: number
): { stats: PetStats; carePoints: number } | null {
  const lastUsed = pet.lastActionAt[action] ?? -999;
  if (currentTick - lastUsed < ACTION_COOLDOWNS[action]) {
    return null; // 쿨다운 중
  }

  const effects = ACTION_EFFECTS[action];
  const newStats: PetStats = {
    hunger:    clamp((pet.stats.hunger    ?? 0) + (effects.hunger    ?? 0)),
    happiness: clamp((pet.stats.happiness ?? 0) + (effects.happiness ?? 0)),
    sleep:     clamp((pet.stats.sleep     ?? 0) + (effects.sleep     ?? 0)),
    hygiene:   clamp((pet.stats.hygiene   ?? 0) + (effects.hygiene   ?? 0)),
    health:    clamp((pet.stats.health    ?? 0) + (effects.health    ?? 0)),
  };

  // 케어 점수 보너스: 스탯이 낮을 때 돌봐주면 더 높은 점수
  const avgStatBefore = Object.values(pet.stats).reduce((a, b) => a + b, 0) / 5;
  const carePoints =
    avgStatBefore < CARE_POINTS.LOW_STAT_THRESHOLD ? CARE_POINTS.HIGH_REWARD :
    avgStatBefore < CARE_POINTS.MID_STAT_THRESHOLD ? CARE_POINTS.MID_REWARD :
    CARE_POINTS.LOW_REWARD;

  return { stats: newStats, carePoints };
}

// 사망 조건 확인
export function shouldDie(stats: PetStats): boolean {
  if (stats.health <= 0) return true;
  const criticalCount = Object.values(stats).filter(v => v <= 0).length;
  return criticalCount >= 2;
}

// 단계 전환 확인
// 누적 단계 내 틱(stageAge)이 임계값을 넘으면 다음 단계 반환
export function getNextStage(stage: LifecycleStage, stageAgeTicks: number): LifecycleStage | null {
  switch (stage) {
    case 'egg':
      return null; // 알은 버튼 클릭으로 부화
    case 'baby':
      return stageAgeTicks >= STAGE_TICK_THRESHOLDS.baby ? 'childhood' : null;
    case 'childhood':
      return stageAgeTicks >= STAGE_TICK_THRESHOLDS.childhood ? 'growth' : null;
    case 'growth':
      return stageAgeTicks >= STAGE_TICK_THRESHOLDS.growth ? 'maturity' : null;
    default:
      return null;
  }
}

// 초기 스탯 (아기 부화 시)
export function getInitialStats(): PetStats {
  return {
    hunger:    80,
    happiness: 70,
    health:    100,
    sleep:     90,
    hygiene:   100,
  };
}

// 쿨다운 잔여 틱 반환
export function getCooldownRemaining(pet: Pet, action: Action, currentTick: number): number {
  const lastUsed = pet.lastActionAt[action] ?? -999;
  return Math.max(0, ACTION_COOLDOWNS[action] - (currentTick - lastUsed));
}
