import { useState, useCallback } from 'react';
import { GAME_CONFIG } from '../constants/gameConfig';

export const useBingoGame = () => {
  const [state, setState] = useState({
    currentNumber: null,
    previousNumbers: [],
    markedNumbers: new Set(),
    animate: false,
    enterEnabled: true,
    showLiniaCantada: false,
    showLiniaCantadaPersist: false,
    showQuinaMessage: false,
    showVideo: false,
    videoUrl: ''
  });

  const generateRandomNumber = useCallback(() => {
    if (!state.enterEnabled) return;

    const availableNumbers = Array.from(
      { length: GAME_CONFIG.BOARD_SIZE },
      (_, i) => i + 1
    ).filter(num => !state.markedNumbers.has(num));

    if (availableNumbers.length === 0) return;

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const newNumber = availableNumbers[randomIndex];

    setState(prev => ({
      ...prev,
      currentNumber: newNumber,
      previousNumbers: [prev.currentNumber, ...prev.previousNumbers].slice(0, GAME_CONFIG.PREVIOUS_NUMBERS_SHOWN),
      markedNumbers: new Set([...prev.markedNumbers, newNumber]),
      animate: true
    }));

    setTimeout(() => {
      setState(prev => ({ ...prev, animate: false }));
    }, GAME_CONFIG.ANIMATION_DURATION);
  }, [state.enterEnabled, state.markedNumbers]);

  return { state, setState, generateRandomNumber };
};