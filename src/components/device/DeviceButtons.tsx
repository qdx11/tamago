// 다마고치 A/B/C 버튼 컴포넌트

import { motion } from 'framer-motion';

interface DeviceButtonsProps {
  onPressA: () => void;
  onPressB: () => void;
  onPressC: () => void;
  labelA?: string;
  labelB?: string;
  labelC?: string;
}

interface ButtonConfig {
  label: string;
  displayLabel: string;
  color: string;
  shadow: string;
  onPress: () => void;
}

export function DeviceButtons({
  onPressA,
  onPressB,
  onPressC,
  labelA = 'A',
  labelB = 'B',
  labelC = 'C',
}: DeviceButtonsProps) {
  const buttons: ButtonConfig[] = [
    {
      label: 'A',
      displayLabel: labelA,
      color: '#ff6b6b',
      shadow: '0 4px 0 rgba(180,50,50,0.8), 0 6px 8px rgba(0,0,0,0.3)',
      onPress: onPressA,
    },
    {
      label: 'B',
      displayLabel: labelB,
      color: '#ffd93d',
      shadow: '0 4px 0 rgba(180,150,20,0.8), 0 6px 8px rgba(0,0,0,0.3)',
      onPress: onPressB,
    },
    {
      label: 'C',
      displayLabel: labelC,
      color: '#6bcff6',
      shadow: '0 4px 0 rgba(40,130,180,0.8), 0 6px 8px rgba(0,0,0,0.3)',
      onPress: onPressC,
    },
  ];

  return (
    <div className="flex justify-around items-center px-6 pt-4 pb-2">
      {buttons.map((btn) => (
        <div key={btn.label} className="flex flex-col items-center gap-1">
          <motion.button
            onClick={btn.onPress}
            className="w-12 h-12 rounded-full cursor-pointer select-none"
            style={{
              backgroundColor: btn.color,
              boxShadow: btn.shadow,
              border: 'none',
              outline: 'none',
            }}
            whileTap={{
              scale: 0.88,
              y: 3,
              boxShadow: '0 1px 0 rgba(0,0,0,0.3)',
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
          <span
            style={{
              fontSize: '7px',
              fontFamily: "'Press Start 2P', monospace",
              color: 'rgba(0,0,0,0.45)',
            }}
          >
            {btn.displayLabel}
          </span>
        </div>
      ))}
    </div>
  );
}
