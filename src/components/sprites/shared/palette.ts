// 동물별 + 진화경로별 색상 팔레트

import type { AnimalType, EvolutionPath } from '../../../types/pet';

export interface PaletteSet {
  body: string;
  accent: string;
  outline: string;
  eyeColor: string;
  sickFilter: string;
}

type AnimalPalettes = Record<EvolutionPath, PaletteSet>;

export const PALETTES: Record<AnimalType, AnimalPalettes> = {
  dog: {
    thriving:  { body: '#4a3728', accent: '#c8a46e', outline: '#1a0f09', eyeColor: '#1a0f09', sickFilter: 'hue-rotate(90deg) saturate(0.5)' },
    normal:    { body: '#6b5040', accent: '#b8986a', outline: '#1a0f09', eyeColor: '#1a0f09', sickFilter: 'hue-rotate(90deg) saturate(0.5)' },
    neglected: { body: '#8a7060', accent: '#a08060', outline: '#2a1f1a', eyeColor: '#2a1f1a', sickFilter: 'hue-rotate(90deg) saturate(0.5)' },
  },
  cat: {
    thriving:  { body: '#e8a050', accent: '#f0c878', outline: '#1a0f09', eyeColor: '#1a6030', sickFilter: 'hue-rotate(90deg) saturate(0.5)' },
    normal:    { body: '#d09060', accent: '#e0b878', outline: '#1a0f09', eyeColor: '#1a6030', sickFilter: 'hue-rotate(90deg) saturate(0.5)' },
    neglected: { body: '#b88870', accent: '#c8a080', outline: '#2a1a10', eyeColor: '#2a4020', sickFilter: 'hue-rotate(90deg) saturate(0.5)' },
  },
  rabbit: {
    thriving:  { body: '#e8e0d0', accent: '#f0d0c0', outline: '#2a1a1a', eyeColor: '#8a2020', sickFilter: 'hue-rotate(90deg) saturate(0.5)' },
    normal:    { body: '#d0c8b8', accent: '#e0c0b0', outline: '#2a1a1a', eyeColor: '#8a2020', sickFilter: 'hue-rotate(90deg) saturate(0.5)' },
    neglected: { body: '#b8b0a0', accent: '#c8a898', outline: '#2a2020', eyeColor: '#602020', sickFilter: 'hue-rotate(90deg) saturate(0.5)' },
  },
  fox: {
    thriving:  { body: '#c85820', accent: '#f0a030', outline: '#1a0808', eyeColor: '#1a0808', sickFilter: 'hue-rotate(90deg) saturate(0.5)' },
    normal:    { body: '#b84818', accent: '#d89020', outline: '#1a0808', eyeColor: '#1a0808', sickFilter: 'hue-rotate(90deg) saturate(0.5)' },
    neglected: { body: '#a06040', accent: '#b88040', outline: '#201008', eyeColor: '#201008', sickFilter: 'hue-rotate(90deg) saturate(0.5)' },
  },
  panda: {
    thriving:  { body: '#e8e8e0', accent: '#181818', outline: '#101010', eyeColor: '#101010', sickFilter: 'hue-rotate(90deg) saturate(0.5)' },
    normal:    { body: '#d8d8d0', accent: '#202020', outline: '#101010', eyeColor: '#101010', sickFilter: 'hue-rotate(90deg) saturate(0.5)' },
    neglected: { body: '#c0c0b8', accent: '#383838', outline: '#181818', eyeColor: '#181818', sickFilter: 'hue-rotate(90deg) saturate(0.5)' },
  },
};

// 진화경로별 자세 오프셋 (못 큰 캐릭터는 구부정하게)
export const POSTURE_OFFSET: Record<EvolutionPath, { headY: number; bodyRx: number; bodyRy: number }> = {
  thriving:  { headY: 0,  bodyRx: 0,  bodyRy: 0  },
  normal:    { headY: 2,  bodyRx: 1,  bodyRy: -1 },
  neglected: { headY: 6,  bodyRx: 4,  bodyRy: -2 },
};
