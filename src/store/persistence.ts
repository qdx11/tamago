// LocalStorage 저장/불러오기 (오류 방어 처리 포함)

import type { GameState } from '../types/game';

const SAVE_KEY = 'tamago_save';
const CURRENT_VERSION = 1;

// 게임 상태 저장
export function saveGame(state: GameState): void {
  try {
    const payload = JSON.stringify({ ...state, version: CURRENT_VERSION });
    localStorage.setItem(SAVE_KEY, payload);
  } catch (err) {
    // 저장 실패 (용량 초과, 비공개 브라우징 등) - 조용히 처리
    console.warn('[Persistence] 저장 실패:', err);
  }
}

// 게임 상태 불러오기
export function loadGame(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    // 기본 유효성 검사
    if (!parsed || typeof parsed !== 'object') return null;
    if (!parsed.pet || !parsed.phase) return null;

    // 버전 마이그레이션 (향후 확장용)
    if (parsed.version !== CURRENT_VERSION) {
      console.warn('[Persistence] 저장 파일 버전 불일치, 초기화합니다.');
      return null;
    }

    // 구버전 세이브 호환 (menuIndex 없을 경우 기본값)
    if (typeof parsed.menuIndex !== 'number') parsed.menuIndex = 0;

    return parsed as GameState;
  } catch (err) {
    console.warn('[Persistence] 불러오기 실패:', err);
    return null;
  }
}

// 저장 파일 삭제 (게임 초기화)
export function clearSave(): void {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    // 무시
  }
}

// 저장 파일 존재 여부 확인
export function hasSave(): boolean {
  try {
    return localStorage.getItem(SAVE_KEY) !== null;
  } catch {
    return false;
  }
}
