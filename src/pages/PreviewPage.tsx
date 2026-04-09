// 캐릭터 프리뷰 페이지 - /preview 로 접근

import { useState } from 'react';
import type { EvolutionPath, LifecycleStage } from '../types/pet';
import type { MoodType } from '../components/sprites/shared/spriteTypes';
import { PixelAnimalSprite } from '../components/sprites/shared/PixelSprite';
import { PALETTES } from '../components/sprites/shared/palette';
import { PIX } from '../components/sprites/shared/pixelData';

const ANIMALS = ['dog', 'cat', 'rabbit', 'fox', 'panda'] as const;
const STAGES: LifecycleStage[] = ['baby', 'childhood', 'growth', 'maturity'];
const PATHS: EvolutionPath[] = ['thriving', 'normal', 'neglected'];
const MOODS: MoodType[] = ['idle', 'happy', 'sleeping', 'sick'];

const STAGE_LABELS: Record<string, string> = {
  baby: '아기',
  childhood: '유년기',
  growth: '성장기',
  maturity: '성숙기',
};
const ANIMAL_LABELS: Record<string, string> = {
  dog: '🐶 강아지',
  cat: '🐱 고양이',
  rabbit: '🐰 토끼',
  fox: '🦊 여우',
  panda: '🐼 판다',
};
const PATH_LABELS: Record<string, string> = {
  thriving: '✨ 잘 큼',
  normal: '😊 보통',
  neglected: '😢 방치됨',
};
const MOOD_LABELS: Record<string, string> = {
  idle: '기본',
  happy: '행복',
  sleeping: '수면',
  sick: '아픔',
};

function getSpriteData(animal: string, stage: LifecycleStage) {
  const animalData = PIX[animal as keyof typeof PIX];
  const stageKey = stage as keyof typeof animalData;
  return animalData[stageKey];
}

export function PreviewPage() {
  const [selectedMood, setSelectedMood] = useState<MoodType>('idle');
  const [selectedPath, setSelectedPath] = useState<EvolutionPath>('normal');

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1a2e1a',
      color: '#9bbc0f',
      fontFamily: "'Press Start 2P', monospace",
      padding: '24px 16px',
    }}>
      {/* 헤더 */}
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '14px', marginBottom: '8px', color: '#9bbc0f' }}>
          TAMAGO
        </h1>
        <p style={{ fontSize: '7px', color: '#608860', marginBottom: '16px' }}>
          CHARACTER PREVIEW
        </p>
        <a href="/" style={{
          fontSize: '6px', color: '#608860',
          textDecoration: 'none', border: '1px solid #608860',
          padding: '4px 8px',
        }}>
          ← 게임으로
        </a>
      </div>

      {/* 무드 / 경로 선택 */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
        gap: '12px', marginBottom: '24px',
      }}>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: '6px', color: '#608860', alignSelf: 'center' }}>무드:</span>
          {MOODS.map(m => (
            <button key={m} onClick={() => setSelectedMood(m)} style={{
              fontSize: '6px', padding: '4px 8px', cursor: 'pointer', border: 'none',
              backgroundColor: selectedMood === m ? '#9bbc0f' : '#2d4a2d',
              color: selectedMood === m ? '#1a2e1a' : '#9bbc0f',
              fontFamily: "'Press Start 2P', monospace",
            }}>
              {MOOD_LABELS[m]}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: '6px', color: '#608860', alignSelf: 'center' }}>성장:</span>
          {PATHS.map(p => (
            <button key={p} onClick={() => setSelectedPath(p)} style={{
              fontSize: '6px', padding: '4px 8px', cursor: 'pointer', border: 'none',
              backgroundColor: selectedPath === p ? '#9bbc0f' : '#2d4a2d',
              color: selectedPath === p ? '#1a2e1a' : '#9bbc0f',
              fontFamily: "'Press Start 2P', monospace",
            }}>
              {PATH_LABELS[p]}
            </button>
          ))}
        </div>
      </div>

      {/* 캐릭터 그리드 - 동물별 섹션 */}
      {ANIMALS.map(animal => {
        const palette = PALETTES[animal as keyof typeof PALETTES][selectedPath];
        return (
          <div key={animal} style={{ marginBottom: '32px' }}>
            <h2 style={{
              fontSize: '9px', color: '#9bbc0f', marginBottom: '12px',
              borderBottom: '1px solid #2d4a2d', paddingBottom: '6px',
            }}>
              {ANIMAL_LABELS[animal]}
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              gap: '12px',
            }}>
              {STAGES.map(stage => {
                const data = getSpriteData(animal, stage);
                return (
                  <div key={stage} style={{
                    backgroundColor: '#9bbc0f',
                    border: '2px solid #608860',
                    padding: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                  }}>
                    <PixelAnimalSprite
                      data={data}
                      mood={selectedMood}
                      body={palette.body}
                      accent={palette.accent}
                      outline={palette.outline}
                      sickFilter={palette.sickFilter}
                      size={64}
                    />
                    <span style={{ fontSize: '5px', color: '#0f380f' }}>
                      {STAGE_LABELS[stage]}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* 푸터 */}
      <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '5px', color: '#3a5a3a' }}>
        TAMAGO © 2026
      </div>
    </div>
  );
}
