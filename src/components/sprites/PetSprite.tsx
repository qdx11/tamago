// 펫 스프라이트 라우터 - (animalType, stage, path, mood) → 올바른 SVG 컴포넌트

import type { Pet, AnimalType, LifecycleStage } from '../../types/pet';
import type { SpriteProps, MoodType } from './shared/spriteTypes';
import { ZzzOverlay } from './ZzzOverlay';

// 강아지
import { DogBaby } from './dog/DogBaby';
import { DogChild } from './dog/DogChild';
import { DogGrowth } from './dog/DogGrowth';
import { DogMaturity } from './dog/DogMaturity';
// 고양이
import { CatBaby } from './cat/CatBaby';
import { CatChild } from './cat/CatChild';
import { CatGrowth } from './cat/CatGrowth';
import { CatMaturity } from './cat/CatMaturity';
// 토끼
import { RabbitBaby } from './rabbit/RabbitBaby';
import { RabbitChild } from './rabbit/RabbitChild';
import { RabbitGrowth } from './rabbit/RabbitGrowth';
import { RabbitMaturity } from './rabbit/RabbitMaturity';
// 여우
import { FoxBaby } from './fox/FoxBaby';
import { FoxChild } from './fox/FoxChild';
import { FoxGrowth } from './fox/FoxGrowth';
import { FoxMaturity } from './fox/FoxMaturity';
// 판다
import { PandaBaby } from './panda/PandaBaby';
import { PandaChild } from './panda/PandaChild';
import { PandaGrowth } from './panda/PandaGrowth';
import { PandaMaturity } from './panda/PandaMaturity';

type SpriteComponent = React.ComponentType<SpriteProps>;

// (동물 종류, 단계) → 스프라이트 컴포넌트 매핑
const SPRITE_MAP: Record<AnimalType, Partial<Record<LifecycleStage, SpriteComponent>>> = {
  dog:    { baby: DogBaby,    childhood: DogChild,    growth: DogGrowth,    maturity: DogMaturity    },
  cat:    { baby: CatBaby,    childhood: CatChild,    growth: CatGrowth,    maturity: CatMaturity    },
  rabbit: { baby: RabbitBaby, childhood: RabbitChild, growth: RabbitGrowth, maturity: RabbitMaturity },
  fox:    { baby: FoxBaby,    childhood: FoxChild,    growth: FoxGrowth,    maturity: FoxMaturity    },
  panda:  { baby: PandaBaby,  childhood: PandaChild,  growth: PandaGrowth,  maturity: PandaMaturity  },
};

// 펫 상태에서 기분 도출
function deriveMood(pet: Pet): MoodType {
  if (pet.isSleeping) return 'sleeping';
  if (pet.isSick) return 'sick';
  if (pet.stats.happiness > 70) return 'happy';
  return 'idle';
}

// 사망 스프라이트 (공통)
function DeadSprite({ size = 80 }: { size?: number }) {
  return (
    <svg viewBox="0 0 80 80" width={size} height={size}>
      {/* 묘비 */}
      <rect x="25" y="40" width="30" height="28" rx="3" fill="#606060" />
      <rect x="22" y="36" width="36" height="8" rx="4" fill="#707070" />
      <ellipse cx="40" cy="36" rx="18" ry="20" fill="#808080" />
      <text x="40" y="52" textAnchor="middle" fontSize="7" fill="#e0e0e0" fontFamily="sans-serif">R.I.P</text>
      <ellipse cx="40" cy="68" rx="20" ry="4" fill="#404040" opacity="0.5" />
    </svg>
  );
}

interface PetSpriteProps {
  pet: Pet;
  size?: number;
}

export function PetSprite({ pet, size = 80 }: PetSpriteProps) {
  const mood = deriveMood(pet);

  // 사망 처리
  if (pet.stage === 'dead') {
    return <DeadSprite size={size} />;
  }

  // 스프라이트 컴포넌트 조회
  const SpriteComp = SPRITE_MAP[pet.animalType]?.[pet.stage];

  if (!SpriteComp) {
    // 폴백: 알 단계이거나 매핑 없을 때 간단한 원
    return (
      <svg viewBox="0 0 80 80" width={size} height={size}>
        <circle cx="40" cy="40" r="20" fill="#606060" />
        <circle cx="33" cy="37" r="3" fill="#1a1a1a" />
        <circle cx="47" cy="37" r="3" fill="#1a1a1a" />
      </svg>
    );
  }

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <SpriteComp mood={mood} path={pet.path} size={size} />
      {mood === 'sleeping' && <ZzzOverlay />}
    </div>
  );
}
