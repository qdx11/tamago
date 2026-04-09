// 진화 경로 결정 로직

import type { PetStats } from '../types/pet';
import { EVOLUTION_THRESHOLDS, type EvolutionPath } from '../types/pet';

// 케어 점수로 진화 경로 결정
export function determineEvolutionPath(careScore: number): EvolutionPath {
  if (careScore >= EVOLUTION_THRESHOLDS.thriving) return 'thriving';
  if (careScore >= EVOLUTION_THRESHOLDS.normal) return 'normal';
  return 'neglected';
}

// 케어 점수 업데이트 (스탯 평균 기반 롤링 계산)
export function updateCareScore(
  currentScore: number,
  stats: PetStats,
  tickDelta: number
): number {
  const avgStats = (
    stats.hunger +
    stats.happiness +
    stats.health +
    stats.sleep +
    stats.hygiene
  ) / 5;

  // 롤링 가중 평균: 현재 점수 90% + 현재 스탯 10%
  const weight = Math.min(tickDelta * 0.001, 0.1);
  return currentScore * (1 - weight) + avgStats * weight;
}
