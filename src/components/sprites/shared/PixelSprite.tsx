// 픽셀 스프라이트 렌더러 - 16×16 픽셀맵 → SVG rect

import React from 'react';
import { motion } from 'framer-motion';
import type { MoodType } from './spriteTypes';
import type { SpriteFrameData } from './pixelData';
import { useMoodAnimation } from './useMoodAnimation';

export interface PixelAnimalSpriteProps {
  data: SpriteFrameData;
  mood: MoodType;
  body: string;
  accent: string;
  outline: string;
  sickFilter: string;
  size: number;
}

// 팔레트 키 → hex 색상
function resolveColor(ch: string, body: string, accent: string, outline: string): string | null {
  switch (ch) {
    case 'B': return body;
    case 'A': return accent;
    case 'K': return outline;
    case 'N': return '#e08080';
    case '.': return null;
    default:  return null;
  }
}

// 'E' 픽셀 위치 수집
function findEyePixels(map: readonly string[]): Array<{ x: number; y: number }> {
  const result: Array<{ x: number; y: number }> = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === 'E') result.push({ x, y });
    }
  }
  return result;
}

export function PixelAnimalSprite({
  data, mood, body, accent, outline, sickFilter, size,
}: PixelAnimalSpriteProps) {
  const { animate, transition } = useMoodAnimation(mood);
  const filter = mood === 'sick' ? sickFilter : 'none';

  const eyePixels = findEyePixels(data.map);

  // 기본 픽셀 rects (눈 제외)
  const rects: React.ReactNode[] = [];
  for (let y = 0; y < data.map.length; y++) {
    const row = data.map[y];
    for (let x = 0; x < row.length; x++) {
      const ch = row[x];
      if (ch === 'E') continue;
      const color = resolveColor(ch, body, accent, outline);
      if (color) {
        rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} />);
      }
    }
  }

  // 눈 렌더링
  const eyeElements: React.ReactNode[] = [];
  if (eyePixels.length >= 2) {
    const sorted = [...eyePixels].sort((a, b) => a.x - b.x);
    const half = Math.floor(sorted.length / 2);
    const leftGroup  = sorted.slice(0, half);
    const rightGroup = sorted.slice(half);

    const lx = leftGroup.reduce((s, p) => s + p.x, 0) / leftGroup.length + 0.5;
    const ly = leftGroup[0].y + 0.5;
    const rx = rightGroup.reduce((s, p) => s + p.x, 0) / rightGroup.length + 0.5;
    const ry = rightGroup[0].y + 0.5;
    const hw = (leftGroup.length * 0.6);

    const ec = outline;

    if (mood === 'idle' || mood === 'sick') {
      eyePixels.forEach(ep => {
        eyeElements.push(
          <rect key={`e${ep.x}${ep.y}`} x={ep.x} y={ep.y} width={1} height={1} fill={ec} />
        );
      });
    } else if (mood === 'happy') {
      // ^ 모양 눈 (위로 휜 호)
      eyeElements.push(
        <path key="lh"
          d={`M ${lx - hw} ${ly + 0.4} Q ${lx} ${ly - 0.6} ${lx + hw} ${ly + 0.4}`}
          stroke={ec} strokeWidth="0.4" fill="none" strokeLinecap="round" />,
        <path key="rh"
          d={`M ${rx - hw} ${ry + 0.4} Q ${rx} ${ry - 0.6} ${rx + hw} ${ry + 0.4}`}
          stroke={ec} strokeWidth="0.4" fill="none" strokeLinecap="round" />,
      );
    } else if (mood === 'sleeping') {
      // ─ 모양 눈
      eyeElements.push(
        <line key="ls" x1={lx - hw} y1={ly} x2={lx + hw} y2={ly}
          stroke={ec} strokeWidth="0.4" strokeLinecap="round" />,
        <line key="rs" x1={rx - hw} y1={ry} x2={rx + hw} y2={ry}
          stroke={ec} strokeWidth="0.4" strokeLinecap="round" />,
      );
    }
  }

  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      style={{ imageRendering: 'pixelated', filter }}
    >
      <motion.g animate={animate} transition={transition} style={{ transformOrigin: '8px 8px' }}>
        {rects}
        {eyeElements}
      </motion.g>
    </svg>
  );
}
