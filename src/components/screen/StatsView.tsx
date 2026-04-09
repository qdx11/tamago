// 스탯 바 전용 화면 (상태창 메뉴 선택 시 표시)

import type { PetStats } from '../../types/pet';

interface StatsViewProps {
  stats: PetStats;
  height?: number;
}

const STAT_ROWS: [keyof PetStats, string][] = [
  ['hunger',    '🍖'],
  ['happiness', '😊'],
  ['health',    '💊'],
  ['sleep',     '💤'],
  ['hygiene',   '🛁'],
];

export function StatsView({ stats, height = 140 }: StatsViewProps) {
  return (
    <div
      style={{
        height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '4px 8px',
        gap: 6,
      }}
    >
      {STAT_ROWS.map(([key, label]) => {
        const value = stats[key];
        const barColor = value > 50 ? '#0f380f' : value > 25 ? '#8b6914' : '#8b1414';
        return (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: '10px', width: '14px' }}>{label}</span>
            <div
              style={{
                flex: 1,
                height: '6px',
                borderRadius: '3px',
                backgroundColor: 'rgba(15,56,15,0.2)',
              }}
            >
              <div
                style={{
                  width: `${value}%`,
                  height: '100%',
                  borderRadius: '3px',
                  backgroundColor: barColor,
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
            <span
              style={{
                fontSize: '5px',
                color: '#0f380f',
                fontFamily: "'Press Start 2P', monospace",
                width: '18px',
                textAlign: 'right',
              }}
            >
              {Math.round(value)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
