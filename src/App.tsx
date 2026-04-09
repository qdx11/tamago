// 다마고치 게임 메인 앱

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore, TICK_INTERVAL_MS } from './store/gameStore';
import { loadGame } from './store/persistence';
import { DeviceShell } from './components/device/DeviceShell';
import { DeviceScreen } from './components/device/DeviceScreen';
import { DeviceButtons } from './components/device/DeviceButtons';
import { DeviceIndicators } from './components/device/DeviceIndicators';
import { EggSprite } from './components/sprites/EggSprite';
import { PetSprite } from './components/sprites/PetSprite';

// ── 알 화면 ──

function EggScreen({ onHatch }: { onHatch: () => void }) {
  const [isHatching, setIsHatching] = useState(false);
  const pet = useGameStore(s => s.pet);
  if (!pet) return null;

  const handleTap = () => {
    if (!isHatching) setIsHatching(true);
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full gap-2 cursor-pointer"
      onClick={handleTap}
    >
      <EggSprite
        eggType={pet.eggType}
        isHatching={isHatching}
        onHatchComplete={onHatch}
        size={72}
      />
      {!isHatching && (
        <p style={{ fontSize: '6px', color: '#0f380f', fontFamily: "'Press Start 2P', monospace", textAlign: 'center', lineHeight: '1.6' }}>
          TAP TO<br />HATCH!
        </p>
      )}
    </div>
  );
}

function PlayingScreen() {
  const pet = useGameStore(s => s.pet);
  if (!pet) return null;

  const statBars = [
    { label: '🍖', value: pet.stats.hunger },
    { label: '😊', value: pet.stats.happiness },
    { label: '💊', value: pet.stats.health },
    { label: '💤', value: pet.stats.sleep },
    { label: '🛁', value: pet.stats.hygiene },
  ];

  return (
    <div className="flex flex-col items-center justify-between w-full h-full p-2">
      {/* 펫 이름 + 단계 */}
      <div style={{ fontSize: '6px', color: '#0f380f', fontFamily: "'Press Start 2P', monospace" }}>
        {pet.name} · {pet.stage}
      </div>

      {/* 실제 SVG 펫 스프라이트 */}
      <PetSprite pet={pet} size={80} />

      {/* 스탯 바 */}
      <div className="flex flex-col gap-1 w-full px-1">
        {statBars.map(({ label, value }) => (
          <div key={label} className="flex items-center gap-1">
            <span style={{ fontSize: '8px' }}>{label}</span>
            <div className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: '#0f380f33' }}>
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${value}%`,
                  backgroundColor: value > 50 ? '#0f380f' : value > 25 ? '#8b6914' : '#8b1414',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeadScreen({ onReset }: { onReset: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full gap-2 cursor-pointer"
      onClick={onReset}
    >
      <div className="text-3xl">👻</div>
      <p style={{ fontSize: '6px', color: '#0f380f', fontFamily: "'Press Start 2P', monospace", textAlign: 'center', lineHeight: '1.8' }}>
        R.I.P.<br /><br />TAP TO<br />RESTART
      </p>
    </div>
  );
}

// ── 새 게임 이름 입력 폼 ──

function NewGameForm({ onStart }: { onStart: (name: string) => void }) {
  const [name, setName] = useState('');

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="flex flex-col items-center gap-6 p-8 rounded-[2rem]"
        style={{ backgroundColor: '#b8e0b0', width: '288px' }}
      >
        <h1
          style={{
            fontSize: '14px',
            fontFamily: "'Press Start 2P', monospace",
            color: '#0f380f',
            lineHeight: '1.6',
            textAlign: 'center',
          }}
        >
          TAMAGO
        </h1>
        <p style={{ fontSize: '7px', fontFamily: "'Press Start 2P', monospace", color: '#2d5a27', textAlign: 'center', lineHeight: '2' }}>
          나만의 동물 친구를<br />키워보세요!
        </p>
        <input
          type="text"
          maxLength={8}
          placeholder="이름 입력..."
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && name.trim() && onStart(name.trim())}
          className="w-full rounded px-3 py-2 outline-none text-center"
          style={{
            backgroundColor: '#9bbc0f',
            border: '2px solid #0f380f',
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '10px',
            color: '#0f380f',
          }}
        />
        <motion.button
          onClick={() => name.trim() && onStart(name.trim())}
          className="w-full py-3 rounded-xl cursor-pointer"
          style={{
            backgroundColor: name.trim() ? '#2d5a27' : '#8aab84',
            color: '#9bbc0f',
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '9px',
            border: 'none',
          }}
          whileTap={{ scale: 0.95 }}
        >
          시작하기 🥚
        </motion.button>
      </motion.div>
    </div>
  );
}

// ── 메인 앱 ──

function App() {
  const { phase, pet, startNewGame, hatchEgg, performAction, advanceTick, resetGame } = useGameStore();

  // 저장된 게임 불러오기
  useEffect(() => {
    const saved = loadGame();
    if (saved && saved.pet) {
      useGameStore.setState(saved);
    }
  }, []);

  // 게임 루프 (phase가 playing/sleeping/event일 때만)
  useEffect(() => {
    const activePhasees = ['playing', 'menu', 'sleeping', 'event'];
    if (!activePhasees.includes(phase)) return;

    const id = setInterval(advanceTick, TICK_INTERVAL_MS);
    return () => clearInterval(id);
  }, [phase, advanceTick]);

  // 탭 숨김/복귀 시 게임 일시정지
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) return;
      // 복귀 시 최대 5틱 보상 (advanceTick 내부에서 처리)
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // 주의 필요 여부 (LED 깜박임)
  const needsAttention = pet
    ? Object.values(pet.stats).some(v => v < 30) || pet.isSick
    : false;

  // 새 게임 화면
  if (phase === 'new_game') {
    return <NewGameForm onStart={startNewGame} />;
  }

  // 버튼 핸들러
  const handleA = () => {
    if (phase === 'egg') hatchEgg();
    else if (phase === 'dead') resetGame();
    else performAction('feed');
  };

  const handleB = () => {
    if (phase === 'egg') hatchEgg();
    else if (phase === 'dead') resetGame();
    else performAction('play');
  };

  const handleC = () => {
    if (phase === 'egg') hatchEgg();
    else if (phase === 'dead') resetGame();
    else performAction('clean');
  };

  // 버튼 라벨 (단계별)
  const btnLabels = phase === 'egg' || phase === 'dead'
    ? { a: 'TAP', b: 'TAP', c: 'TAP' }
    : { a: 'FEED', b: 'PLAY', c: 'BATH' };

  return (
    <DeviceShell>
      <DeviceIndicators needsAttention={needsAttention} />
      <DeviceScreen>
        {phase === 'egg' && <EggScreen onHatch={hatchEgg} />}
        {(phase === 'playing' || phase === 'menu' || phase === 'event') && <PlayingScreen />}
        {phase === 'dead' && <DeadScreen onReset={resetGame} />}
      </DeviceScreen>
      <DeviceButtons
        onPressA={handleA}
        onPressB={handleB}
        onPressC={handleC}
        labelA={btnLabels.a}
        labelB={btnLabels.b}
        labelC={btnLabels.c}
      />
    </DeviceShell>
  );
}

export default App;
