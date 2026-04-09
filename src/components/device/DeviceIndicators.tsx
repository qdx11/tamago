// LED 표시등 + 브랜드명 컴포넌트

import { motion } from 'framer-motion';

interface DeviceIndicatorsProps {
  needsAttention: boolean;
}

export function DeviceIndicators({ needsAttention }: DeviceIndicatorsProps) {
  return (
    <div className="flex items-center justify-between px-4 pb-2">
      {/* LED 표시등 */}
      <motion.div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: '#ff3b3b' }}
        animate={
          needsAttention
            ? { opacity: [1, 0.2, 1] }
            : { opacity: 0.25 }
        }
        transition={
          needsAttention
            ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' }
            : { duration: 0.3 }
        }
      />

      {/* 브랜드명 */}
      <span
        style={{
          fontSize: '7px',
          fontFamily: "'Press Start 2P', monospace",
          color: 'rgba(0,0,0,0.35)',
          letterSpacing: '0.18em',
        }}
      >
        TAMAGO
      </span>

      {/* 우측 균형용 빈 공간 */}
      <div className="w-3 h-3" />
    </div>
  );
}
