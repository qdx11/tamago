// 다마고치 LCD 화면 컴포넌트

interface DeviceScreenProps {
  children: React.ReactNode;
}

export function DeviceScreen({ children }: DeviceScreenProps) {
  return (
    // 화면 베젤 (어두운 프레임)
    <div
      className="rounded-lg mx-auto"
      style={{
        backgroundColor: '#1a1a1a',
        padding: '6px',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8), inset 0 -1px 2px rgba(255,255,255,0.05)',
      }}
    >
      {/* LCD 화면 */}
      <div
        className="relative overflow-hidden rounded"
        style={{
          width: '160px',
          height: '160px',
          backgroundColor: '#9bbc0f',
        }}
      >
        {/* 스캔라인 오버레이 */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
          }}
        />
        {/* 콘텐츠 */}
        <div className="relative z-20 w-full h-full flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
