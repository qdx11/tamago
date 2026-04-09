// 다마고치 플라스틱 케이스 외형 컴포넌트

interface DeviceShellProps {
  children: React.ReactNode;
}

export function DeviceShell({ children }: DeviceShellProps) {
  return (
    // 배경 (화면 중앙 배치)
    <div className="flex items-center justify-center min-h-screen p-4">
      {/* 외부 케이스 */}
      <div
        className="relative select-none"
        style={{
          backgroundColor: '#b8e0b0',
          borderRadius: '3rem',
          width: '288px',
          boxShadow:
            '0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.4)',
        }}
      >
        {/* 플라스틱 광택 오버레이 */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[3rem]"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%, rgba(0,0,0,0.05) 100%)',
          }}
        />

        {/* 케이스 내부 */}
        <div
          className="relative"
          style={{
            padding: '16px 16px 20px',
          }}
        >
          {/* 상단 장식: 스피커 점 3개 */}
          <div className="flex justify-center gap-1.5 mb-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
              />
            ))}
          </div>

          {/* 스트랩 구멍 (좌우 상단) */}
          <div
            className="absolute top-4 left-3 w-3 h-5 rounded-full"
            style={{
              backgroundColor: 'rgba(0,0,0,0.15)',
              border: '1px solid rgba(0,0,0,0.1)',
            }}
          />
          <div
            className="absolute top-4 right-3 w-3 h-5 rounded-full"
            style={{
              backgroundColor: 'rgba(0,0,0,0.15)',
              border: '1px solid rgba(0,0,0,0.1)',
            }}
          />

          {/* 내부 링 (조금 더 밝은 녹색) */}
          <div
            className="relative"
            style={{
              backgroundColor: '#a0d49a',
              borderRadius: '2rem',
              padding: '16px',
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.15)',
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
