import React from 'react';
import { clsx } from 'clsx';
import { MESSAGES } from '../constants/messages';
import './CurrentNumber.css';

export const CurrentNumber = ({ number, animate, showQuinaMessage }) => {
  if (showQuinaMessage) {
    return <span className="han-cantat-quina">{MESSAGES.QUINA}</span>;
  }

  return (
    <div className={clsx('current-number', { 'animate-flash': animate })}>
      {number || '?'}
    </div>
  );
};