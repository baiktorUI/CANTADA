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

  // Seleccionar un número específico haciendo clic
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

  // Borrar la última selección
  const undoLastSelection = useCallback(() => {
    // No hacer nada si no hay número actual o si está mostrando Quina
    if (!state.currentNumber || state.showQuinaMessage) return;

    setState(prev => {
      // Crear nueva copia del Set sin el número actual
      const newMarkedNumbers = new Set(prev.markedNumbers);
      newMarkedNumbers.delete(prev.currentNumber);

      // El nuevo número actual es el primero de los anteriores (o null si no hay)
      const newCurrentNumber = prev.previousNumbers[0] || null;
      
      // Los nuevos números anteriores son los que quedan después de quitar el primero
      const newPreviousNumbers = prev.previousNumbers.slice(1);

      return {
        ...prev,
        currentNumber: newCurrentNumber,
        previousNumbers: newPreviousNumbers,
        markedNumbers: newMarkedNumbers,
        animate: false
      };
    });
  }, [state.currentNumber, state.showQuinaMessage]);

  return { state, setState, selectNumber, undoLastSelection };
};
