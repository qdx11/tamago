// 펫 스프라이트 전용 화면

import type { Pet } from '../../types/pet';
import { PetSprite } from '../sprites/PetSprite';

interface PetViewProps {
  pet: Pet;
  height?: number;
}

export function PetView({ pet, height = 140 }: PetViewProps) {
  return (
    <div
      style={{
        height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
      }}
    >
      <div
        style={{
          fontSize: '6px',
          color: '#0f380f',
          fontFamily: "'Press Start 2P', monospace",
        }}
      >
        {pet.name} · {pet.stage}
      </div>
      <PetSprite pet={pet} size={72} />
    </div>
  );
}
