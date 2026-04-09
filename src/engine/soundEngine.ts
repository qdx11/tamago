// Web Audio API 기반 효과음 엔진 (외부 파일 없음)

import type { SoundType } from '../types/game';

let audioCtx: AudioContext | null = null;

// 첫 사용자 제스처 시 AudioContext 초기화
export function initAudio(): void {
  if (!audioCtx) {
    try {
      audioCtx = new AudioContext();
    } catch {
      console.warn('[SoundEngine] AudioContext 초기화 실패');
    }
  }
}

// 간단한 비프음 생성 (주파수, 길이, 파형 타입)
function beep(
  frequency: number,
  duration: number,
  type: OscillatorType = 'square',
  volume = 0.15
): void {
  if (!audioCtx) return;
  try {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + duration);
  } catch {
    // 오디오 오류는 조용히 무시
  }
}

// 멜로디 시퀀스 재생
function melody(notes: { freq: number; delay: number; duration: number }[]): void {
  notes.forEach(({ freq, delay, duration }) => {
    setTimeout(() => beep(freq, duration), delay);
  });
}

// 사운드 타입별 효과음 재생
export function playSound(type: SoundType, enabled: boolean): void {
  if (!enabled || !audioCtx) return;

  switch (type) {
    case 'feed':
      melody([
        { freq: 523, delay: 0,   duration: 0.1 },
        { freq: 659, delay: 100, duration: 0.1 },
      ]);
      break;
    case 'play':
      melody([
        { freq: 659, delay: 0,   duration: 0.08 },
        { freq: 784, delay: 80,  duration: 0.08 },
        { freq: 988, delay: 160, duration: 0.12 },
      ]);
      break;
    case 'sleep':
      beep(330, 0.3, 'sine', 0.1);
      break;
    case 'clean':
      melody([
        { freq: 784, delay: 0,   duration: 0.08 },
        { freq: 659, delay: 80,  duration: 0.08 },
      ]);
      break;
    case 'medicine':
      melody([
        { freq: 440, delay: 0,   duration: 0.08 },
        { freq: 392, delay: 100, duration: 0.15 },
      ]);
      break;
    case 'levelup':
      melody([
        { freq: 523, delay: 0,   duration: 0.08 },
        { freq: 659, delay: 100, duration: 0.08 },
        { freq: 784, delay: 200, duration: 0.08 },
        { freq: 1047,delay: 300, duration: 0.2  },
      ]);
      break;
    case 'hatch':
      melody([
        { freq: 784, delay: 0,   duration: 0.1 },
        { freq: 988, delay: 120, duration: 0.1 },
        { freq: 1175,delay: 240, duration: 0.2 },
      ]);
      break;
    case 'alert':
      melody([
        { freq: 880, delay: 0,   duration: 0.08 },
        { freq: 880, delay: 150, duration: 0.08 },
      ]);
      break;
    case 'death':
      melody([
        { freq: 330, delay: 0,   duration: 0.2 },
        { freq: 277, delay: 250, duration: 0.2 },
        { freq: 220, delay: 500, duration: 0.4 },
      ]);
      break;
  }
}
