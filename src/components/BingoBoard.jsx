import React from 'react';
import { clsx } from 'clsx';
import { GAME_CONFIG } from '../constants/gameConfig';
import './BingoBoard.css';

export const BingoBoard = ({ markedNumbers, showQuinaMessage }) => {
  const numbers = Array.from({ length: GAME_CONFIG.BOARD_SIZE }, (_, i) => i + 1);

  return (
    <div className="bingo-board">
      {numbers.map(number => (
        <div
          key={number}
          className={clsx('bingo-number', {
            marked: markedNumbers.has(number),
            faded: showQuinaMessage && !markedNumbers.has(number)
          })}
        >
          {number}
        </div>
      ))}
    </div>
  );
};