// 상단 메뉴 아이콘 바 - A◀/C▶ 탐색, B=OK 선택

interface MenuBarProps {
  menuIndex: number;  // 0~5
}

const MENU_ICONS = ['🍖', '💤', '🎮', '🚿', '💊', '📊'] as const;

export function MenuBar({ menuIndex }: MenuBarProps) {
  return (
    <div
      style={{
        display: 'flex',
        height: '20px',
        borderBottom: '1px solid rgba(15,56,15,0.3)',
        backgroundColor: 'rgba(155,188,15,0.3)',
        flexShrink: 0,
      }}
    >
      {MENU_ICONS.map((icon, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            backgroundColor: i === menuIndex ? '#0f380f' : 'transparent',
            transition: 'background-color 0.1s',
          }}
        >
          {icon}
        </div>
      ))}
    </div>
  );
}
