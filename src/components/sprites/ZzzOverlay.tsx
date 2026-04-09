// 수면 중 ZZZ 오버레이 애니메이션

import { motion } from 'framer-motion';

export function ZzzOverlay() {
  const zzzItems = [
    { text: 'z', size: 8,  delay: 0,   x: 52, y: 30 },
    { text: 'Z', size: 11, delay: 0.5, x: 58, y: 22 },
    { text: 'Z', size: 14, delay: 1.0, x: 64, y: 14 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 30 }}>
      {zzzItems.map((item, i) => (
        <motion.span
          key={i}
          style={{
            position: 'absolute',
            left: `${item.x}px`,
            top: `${item.y}px`,
            fontSize: `${item.size}px`,
            fontFamily: "'Press Start 2P', monospace",
            color: '#0f380f',
            opacity: 0,
          }}
          animate={{ y: [0, -15], opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: item.delay,
            ease: 'easeOut',
          }}
        >
          {item.text}
        </motion.span>
      ))}
    </div>
  );
}
