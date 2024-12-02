import React from 'react';
import { MESSAGES } from '../constants/messages';
import './VideoPanel.css';

export const VideoPanel = ({ showVideo, videoUrl, showQuinaMessage }) => {
  if (showQuinaMessage) {
    return (
      <div className="video-box">
        <span className="han-cantat-quina">{MESSAGES.QUINA}</span>
      </div>
    );
  }

  if (!showVideo) return null;

  return (
    <div className="video-box">
      <video className="video-player" src={videoUrl} autoPlay controls />
    </div>
  );
};