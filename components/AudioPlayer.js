'use client';

import { useState, useRef, useEffect } from 'react';

export default function AudioPlayer({ isPlaying, onToggle }) {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.log('Audio autoplay prevented by browser policy:', err);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <>
      <audio 
        ref={audioRef} 
        src="/audio/wedding-melody.mp3" 
        loop 
        preload="auto" 
      />

      <button
        type="button"
        onClick={onToggle}
        className={`floating-music-btn ${isPlaying ? 'playing' : ''}`}
        title={isPlaying ? "Pause Wedding Music" : "Play Traditional Wedding Music"}
        aria-label="Toggle background wedding instrumental"
      >
        {isPlaying ? (
          <div className="music-wave">
            <div className="music-bar"></div>
            <div className="music-bar"></div>
            <div className="music-bar"></div>
          </div>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
        )}
      </button>
    </>
  );
}
