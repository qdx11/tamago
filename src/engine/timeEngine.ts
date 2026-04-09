// 시간/낮밤 주기 엔진

import type { DayNightPhase } from '../types/game';

// 틱 간격 (3초 = 3000ms)
export const TICK_INTERVAL_MS = 3000;

// 실제 시계 기반 낮밤 주기 결정
export function getDayNightPhase(nowMs: number): DayNightPhase {
  const hour = new Date(nowMs).getHours();
  if (hour >= 5 && hour < 8)   return 'dawn';
  if (hour >= 8 && hour < 18)  return 'day';
  if (hour >= 18 && hour < 21) return 'dusk';
  return 'night';
}

// 낮밤에 따른 수면 감소 배율 (밤엔 2배 빨리 감소)
export function getSleepDecayMultiplier(phase: DayNightPhase): number {
  return phase === 'night' ? 2.0 : 1.0;
}

// 탭 숨김 후 복귀 시 틱 보상 계산 (최대 5틱 보상)
export function computeCatchupTicks(elapsedMs: number): number {
  const expectedTicks = Math.floor(elapsedMs / TICK_INTERVAL_MS);
  return Math.min(expectedTicks, 5);
}
