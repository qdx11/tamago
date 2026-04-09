// 버튼 타이밍 미니게임 - ❗ 나오면 B(OK) 버튼!

import { useState, useEffect, useRef } from 'react';

interface MiniGameProps {
  externalPress: number;   // App에서 B버튼 누를 때마다 증가
  onComplete: (success: boolean) => void;
}

type RoundState = 'waiting' | 'prompt' | 'success' | 'fail';

// 라운드별 반응 시간 (ms)
const ROUND_TIME_LIMITS = [2000, 1500, 1000] as const;
const TOTAL_ROUNDS = 3;

export function MiniGame({ externalPress, onComplete }: MiniGameProps) {
  const [round, setRound] = useState(1);
  const [roundState, setRoundState] = useState<RoundState>('waiting');
  const [timeLeft, setTimeLeft] = useState(0);
  const [resultMsg, setResultMsg] = useState('');

  const scoreRef = useRef(0);
  const roundStateRef = useRef<RoundState>('waiting');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const completedRef = useRef(false);

  function clearAllTimers() {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (countdownRef.current) clearInterval(countdownRef.current);
    timerRef.current = null;
    countdownRef.current = null;
  }

  function scheduleNextRound(currentRound: number, currentScore: number) {
    timerRef.current = setTimeout(() => {
      if (currentRound >= TOTAL_ROUNDS) {
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete(currentScore >= 2);
        }
      } else {
        setRound(currentRound + 1);
      }
    }, 800);
  }

  function showPrompt(r: number) {
    const limit = ROUND_TIME_LIMITS[r - 1];
    roundStateRef.current = 'prompt';
    setRoundState('prompt');
    setTimeLeft(limit);

    countdownRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 100) {
          clearAllTimers();
          const newScore = scoreRef.current;
          roundStateRef.current = 'fail';
          setRoundState('fail');
          setResultMsg('⏱ 늦었어요!');
          scheduleNextRound(round, newScore);
          return 0;
        }
        return prev - 100;
      });
    }, 100);
  }

  // 라운드 시작
  useEffect(() => {
    completedRef.current = false;
    roundStateRef.current = 'waiting';
    setRoundState('waiting');
    setResultMsg('');

    const delay = 800 + Math.random() * 1200;
    timerRef.current = setTimeout(() => {
      showPrompt(round);
    }, delay);

    return () => clearAllTimers();
  }, [round]);

  // B버튼 입력 감지
  useEffect(() => {
    if (externalPress === 0) return;
    if (roundStateRef.current !== 'prompt') return;

    clearAllTimers();
    const newScore = scoreRef.current + 1;
    scoreRef.current = newScore;
    roundStateRef.current = 'success';
    setRoundState('success');
    setResultMsg('👍 성공!');
    scheduleNextRound(round, newScore);
  }, [externalPress]);

  const timeRatio = ROUND_TIME_LIMITS[round - 1] > 0
    ? timeLeft / ROUND_TIME_LIMITS[round - 1]
    : 0;

  return (
    <div
      style={{
        height: 140,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
      }}
    >
      {/* 라운드 표시 */}
      <div
        style={{
          fontSize: '6px',
          fontFamily: "'Press Start 2P', monospace",
          color: '#0f380f',
        }}
      >
        ROUND {round} / {TOTAL_ROUNDS}
      </div>

      {/* 점수 */}
      <div
        style={{
          fontSize: '5px',
          fontFamily: "'Press Start 2P', monospace",
          color: 'rgba(15,56,15,0.6)',
        }}
      >
        {'⭐'.repeat(scoreRef.current)}{'☆'.repeat(TOTAL_ROUNDS - scoreRef.current)}
      </div>

      {/* 메인 프롬프트 */}
      <div
        style={{
          fontSize: roundState === 'prompt' ? '40px' : '28px',
          minHeight: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'font-size 0.1s',
        }}
      >
        {roundState === 'waiting' && '...'}
        {roundState === 'prompt' && '❗'}
        {roundState === 'success' && '⭕'}
        {roundState === 'fail' && '❌'}
      </div>

      {/* 결과 메시지 */}
      <div
        style={{
          fontSize: '6px',
          fontFamily: "'Press Start 2P', monospace",
          color: '#0f380f',
          minHeight: '10px',
        }}
      >
        {resultMsg}
      </div>

      {/* 타이머 바 */}
      <div
        style={{
          width: '80%',
          height: '4px',
          backgroundColor: 'rgba(15,56,15,0.2)',
          borderRadius: '2px',
          visibility: roundState === 'prompt' ? 'visible' : 'hidden',
        }}
      >
        <div
          style={{
            width: `${timeRatio * 100}%`,
            height: '100%',
            borderRadius: '2px',
            backgroundColor: timeLeft > 800 ? '#0f380f' : '#8b1414',
            transition: 'width 0.1s linear',
          }}
        />
      </div>

      {/* 안내 */}
      {roundState === 'waiting' && (
        <div
          style={{
            fontSize: '5px',
            fontFamily: "'Press Start 2P', monospace",
            color: 'rgba(15,56,15,0.5)',
            textAlign: 'center',
          }}
        >
          ❗ 나오면<br />B 버튼!
        </div>
      )}
    </div>
  );
}
