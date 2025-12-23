import React from 'react';
import { clsx } from 'clsx';
import { GAME_CONFIG } from '../constants/gameConfig';
import './BingoBoard.css';

export const BingoBoard = ({ markedNumbers, showQuinaMessage, onNumberClick }) => {
  const numbers = Array.from({ length: GAME_CONFIG.BOARD_SIZE }, (_, i) => i + 1);

  const handleClick = (number) => {
    // Solo permitir clic si el número no está marcado y no se muestra Quina
    if (!markedNumbers.has(number) && !showQuinaMessage && onNumberClick) {
      onNumberClick(number);
    }
  };

  return (
    <div className="bingo-board">
      {numbers.map(number => (
        <div
          key={number}
          className={clsx('bingo-number', {
            marked: markedNumbers.has(number),
            faded: showQuinaMessage && !markedNumbers.has(number),
            clickable: !markedNumbers.has(number) && !showQuinaMessage
          })}
          onClick={() => handleClick(number)}
        >
          {number}
        </div>
      ))}
    </div>
  );
};
