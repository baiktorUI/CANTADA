import React, { useEffect, useRef } from 'react';
import { CurrentNumber } from './components/CurrentNumber';
import { PreviousNumbers } from './components/PreviousNumbers';
import { VideoPanel } from './components/VideoPanel';
import { BingoBoard } from './components/BingoBoard';
import { useBingoGame } from './hooks/useBingoGame';
import { launchFireworks, launchSchoolPride, launchLineaCantada, stopConfetti } from './utils/confetti';
import { IMAGES } from './constants/images';
import { MESSAGES } from './constants/messages';
import './App.css';

const App = () => {
  const { state, setState, drawNextNumber } = useBingoGame();
  const fireworksIntervalRef = useRef(null);
  const schoolPrideAnimationRef = useRef(null);
  const liniaCantadaFireworksRef = useRef(null);

  // Log cuando se monta el componente
  useEffect(() => {
    console.log('App montado');
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      console.log('Tecla presionada:', event.key);
      
      const key = event.key.toLowerCase();

      if (key === 'l') {
        event.preventDefault();
        toggleLiniaCantada();
      } else if (key === 'q') {
        event.preventDefault();
        toggleQuinaMessage();
      } else if (key === 'enter') {
        event.preventDefault();
        console.log('Enter detectado, llamando drawNextNumber');
        drawNextNumber();
      }
    };

    const toggleLiniaCantada = () => {
      setState(prev => ({
        ...prev,
        showLiniaCantada: !prev.showLiniaCantada,
        showLiniaCantadaPersist: !prev.showLiniaCantadaPersist,
      }));
    };

    const toggleQuinaMessage = () => {
      setState(prev => ({
        ...prev,
        showQuinaMessage: !prev.showQuinaMessage,
        enterEnabled: !prev.enterEnabled,
        showLiniaCantada: !prev.showQuinaMessage && prev.showLiniaCantadaPersist,
      }));
    };

    console.log('Listener de teclado añadido');
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      console.log('Listener de teclado eliminado');
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [state.showLiniaCantadaPersist, drawNextNumber, setState]);

  useEffect(() => {
    if (state.showLiniaCantada) {
      launchLineaCantada(liniaCantadaFireworksRef);
    } else {
      stopConfetti(liniaCantadaFireworksRef, { current: null });
    }
  }, [state.showLiniaCantada]);

  useEffect(() => {
    if (state.showQuinaMessage) {
      launchFireworks(fireworksIntervalRef);
      launchSchoolPride(schoolPrideAnimationRef);
    } else {
      stopConfetti(fireworksIntervalRef, schoolPrideAnimationRef);
    }
  }, [state.showQuinaMessage]);

  return (
    <div className="app-container">
      <div className="current-number-box">
        <CurrentNumber
          number={state.currentNumber}
          animate={state.animate}
          showQuinaMessage={state.showQuinaMessage}
        />
      </div>

      <div className="side-box">
        <PreviousNumbers
          numbers={state.previousNumbers}
          currentNumber={state.currentNumber}
          showQuinaMessage={state.showQuinaMessage}
        />
      </div>

      <div className={`large-box ${state.showQuinaMessage ? 'highlight' : ''}`}>
        <BingoBoard
          markedNumbers={state.markedNumbers}
          showQuinaMessage={state.showQuinaMessage}
        />
      </div>

      <div className="small-box">
        {state.showQuinaMessage ? (
          <span className="han-cantat-quina">{MESSAGES.QUINA}</span>
        ) : (
          state.showLiniaCantada && (
            <span className={`linia-cantada ${state.showLiniaCantada ? 'show' : ''}`}>
              {MESSAGES.LINIA}
            </span>
          )
        )}
      </div>

      <div className="additional-box">
        <img src={IMAGES.logo} alt="Logo UuhQE" className="logo-image" />
      </div>
    </div>
  );
};

export default App;
