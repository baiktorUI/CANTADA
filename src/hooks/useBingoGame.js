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

  // Nueva función: seleccionar un número específico haciendo clic
  const selectNumber = useCallback((number) => {
    // No hacer nada si el número ya está marcado o si está mostrando Quina
    if (state.markedNumbers.has(number) || state.showQuinaMessage) return;

    setState(prev => ({
      ...prev,
      currentNumber: number,
      previousNumbers: prev.currentNumber 
        ? [prev.currentNumber, ...prev.previousNumbers].slice(0, GAME_CONFIG.PREVIOUS_NUMBERS_SHOWN)
        : prev.previousNumbers,
      markedNumbers: new Set([...prev.markedNumbers, number]),
      animate: true
    }));

    setTimeout(() => {
      setState(prev => ({ ...prev, animate: false }));
    }, GAME_CONFIG.ANIMATION_DURATION);
  }, [state.markedNumbers, state.showQuinaMessage]);

  return { state, setState, selectNumber };
};
