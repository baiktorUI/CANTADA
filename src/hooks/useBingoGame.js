import { useState, useCallback } from 'react';
import { GAME_CONFIG } from '../constants/gameConfig';

export const useBingoGame = () => {
  const [state, setState] = useState({
    currentNumber: null,
    previousNumbers: [],
    markedNumbers: new Set(),
    remainingNumbers: Array.from({ length: GAME_CONFIG.BOARD_SIZE }, (_, i) => i + 1),
    animate: false,
    enterEnabled: true,
    showLiniaCantada: false,
    showLiniaCantadaPersist: false,
    showQuinaMessage: false,
    showVideo: false,
    videoUrl: ''
  });

  // Función para sacar el siguiente número aleatorio con Enter
  const drawNextNumber = useCallback(() => {
    console.log('drawNextNumber llamado');
    console.log('Números restantes:', state.remainingNumbers.length);

    // Si no quedan números, reiniciar el juego
    if (state.remainingNumbers.length === 0) {
      console.log('Reiniciando juego - todos los números cantados');
      setState({
        currentNumber: null,
        previousNumbers: [],
        markedNumbers: new Set(),
        remainingNumbers: Array.from({ length: GAME_CONFIG.BOARD_SIZE }, (_, i) => i + 1),
        animate: false,
        enterEnabled: true,
        showLiniaCantada: false,
        showLiniaCantadaPersist: false,
        showQuinaMessage: false,
        showVideo: false,
        videoUrl: ''
      });
      return;
    }

    // Seleccionar número aleatorio de los restantes
    const randomIndex = Math.floor(Math.random() * state.remainingNumbers.length);
    const selectedNumber = state.remainingNumbers[randomIndex];
    
    console.log('Número seleccionado:', selectedNumber);

    setState(prev => {
      // Crear nuevo array sin el número seleccionado
      const newRemainingNumbers = prev.remainingNumbers.filter((_, idx) => idx !== randomIndex);
      
      return {
        ...prev,
        currentNumber: selectedNumber,
        previousNumbers: [selectedNumber, ...prev.previousNumbers].slice(0, GAME_CONFIG.PREVIOUS_NUMBERS_SHOWN),
        markedNumbers: new Set([...prev.markedNumbers, selectedNumber]),
        remainingNumbers: newRemainingNumbers,
        animate: true
      };
    });

    // Desactivar animación después de un tiempo
    setTimeout(() => {
      setState(prev => ({ ...prev, animate: false }));
    }, GAME_CONFIG.ANIMATION_DURATION);
  }, [state.remainingNumbers]);

  return { state, setState, drawNextNumber };
};
