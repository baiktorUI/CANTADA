import React from 'react';
import { MESSAGES } from '../constants/messages';
import './PreviousNumbers.css';

export const PreviousNumbers = ({ numbers, currentNumber, showQuinaMessage }) => {
  if (showQuinaMessage) {
    return <span className="han-cantat-quina">{MESSAGES.QUINA}</span>;
  }

  return (
    <div className="side-content">
      {numbers.map((number, index) => (
        <span key={`${number}-${index}`} className={`previous-number opacity-${index}`}>
          {number}
        </span>
      ))}
    </div>
  );
};