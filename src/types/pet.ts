// 펫 관련 핵심 타입 정의

export type AnimalType = 'dog' | 'cat' | 'rabbit' | 'fox' | 'panda';

export type EggType = 'brown_spotted' | 'orange_striped' | 'white_fluffy' | 'golden' | 'black';

export type LifecycleStage = 'egg' | 'baby' | 'childhood' | 'growth' | 'maturity' | 'dead';

// 케어 점수에 따른 진화 경로
// thriving: 70점 이상 (잘 큰)
// normal: 35~69점 (보통)
// neglected: 35점 미만 (못 큰)
export type EvolutionPath = 'thriving' | 'normal' | 'neglected';

export interface PetStats {
  hunger: number;     // 0-100, 시간이 지나면 감소 (0 = 배고픔)
  happiness: number;  // 0-100, 시간이 지나면 감소
  health: number;     // 0-100, 질병 이벤트로 감소
  sleep: number;      // 0-100, 밤에 더 빨리 감소
  hygiene: number;    // 0-100, 천천히 감소
}

export interface Pet {
  id: string;
  name: string;
  animalType: AnimalType;
  eggType: EggType;
  stage: LifecycleStage;
  path: EvolutionPath;
  stats: PetStats;
  ageInTicks: number;           // 태어난 이후 총 틱 수
  stageEnteredAtTick: number;   // 현재 단계 진입 시점 틱
  isSleeping: boolean;
  isSick: boolean;
  lastActionAt: Partial<Record<Action, number>>;
  careScore: number;            // 누적 케어 점수 (0-100)
  bornAt: number;               // 부화 시각 (ms timestamp)
}

export type Action = 'feed' | 'play' | 'sleep' | 'clean' | 'medicine';

// 알 종류와 동물 타입 매핑
export const EGG_TO_ANIMAL: Record<EggType, AnimalType> = {
  brown_spotted: 'dog',
  orange_striped: 'cat',
  white_fluffy: 'rabbit',
  golden: 'fox',
  black: 'panda',
};

// 단계별 필요 틱 수 (틱 = 3초)
// 아기: 6시간 = 7,200틱
// 유년기: 15시간 = 18,000틱
// 성장기: 18시간 = 21,600틱
export const STAGE_TICK_THRESHOLDS: Record<string, number> = {
  baby: 7200,       // 6시간
  childhood: 18000, // 15시간
  growth: 21600,    // 18시간
};

// 케어 점수 기반 진화 경로 결정 임계값
export const EVOLUTION_THRESHOLDS = {
  thriving: 70,
  normal: 35,
};
