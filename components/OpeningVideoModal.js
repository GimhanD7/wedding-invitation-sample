'use client';

import { useState, useEffect, useRef } from 'react';

export default function OpeningVideoModal({ onOpenInvitation }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    // Check if on mobile view (width <= 768px or mobile user agent)
    const checkMobile = () => {
      const mobileWidth = window.innerWidth <= 768;
      const mobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      return mobileWidth || mobileUA;
    };

    const isMob = checkMobile();
    setIsMobile(isMob);

    // Show opening video on mobile view every time page is opened/reloaded
    if (isMob) {
      setIsOpen(true);
    }

    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleEnter = () => {
    setIsOpen(false);
    if (onOpenInvitation) {
      onOpenInvitation();
    }
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999,
        background: '#0d0704',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'hidden',
        animation: 'fadeIn 0.3s ease'
      }}
    >
      {/* Background Fullscreen Video of Couple Waiting */}
      <video
        ref={videoRef}
        src="/videos/wedding-couple-waiting.mp4"
        autoPlay
        playsInline
        loop
        muted={isMuted}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.92)'
        }}
      />

      {/* Subtle Dark Gradient Overlay for Readability */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(20, 12, 6, 0.45) 0%, rgba(20, 12, 6, 0.1) 40%, rgba(18, 10, 5, 0.85) 100%)',
          pointerEvents: 'none'
        }}
      />

      {/* Top Header Bar */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          padding: '20px 20px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {/* Monogram Badge */}
        <div style={{
          fontFamily: 'var(--font-serif-classic)',
          fontSize: '1.25rem',
          color: 'var(--color-gold-light)',
          letterSpacing: '2px',
          fontWeight: 600,
          textShadow: '0 2px 8px rgba(0,0,0,0.8)'
        }}>
          N <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>&amp;</span> D
        </div>

        {/* Skip / Enter Button */}
        <button
          type="button"
          onClick={handleEnter}
          style={{
            background: 'rgba(0, 0, 0, 0.45)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            color: '#ffffff',
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '0.78rem',
            fontFamily: 'var(--font-sans)',
            cursor: 'pointer',
            backdropFilter: 'blur(6px)'
          }}
        >
          Skip ✕
        </button>
      </div>

    

      {/* Bottom Invitation Card */}
      <div 
        style={{
          position: 'relative',
          zIndex: 10,
          width: '92%',
          maxWidth: '440px',
          marginBottom: '32px',
          padding: '24px 20px',
          borderRadius: '22px',
          background: 'rgba(26, 16, 9, 0.78)',
          border: '1.5px solid rgba(198, 148, 70, 0.55)',
          backdropFilter: 'blur(12px)',
          textAlign: 'center',
          boxShadow: '0 15px 40px rgba(0,0,0,0.6)',
          animation: 'fadeIn 0.5s ease'
        }}
      >
        <div style={{
          fontFamily: 'var(--font-serif-royal)',
          fontSize: '0.72rem',
          letterSpacing: '3px',
          color: 'var(--color-gold-bright)',
          textTransform: 'uppercase',
          fontWeight: 700,
          marginBottom: '6px'
        }}>
          YOU ARE CORDIALLY INVITED
        </div>

        <h1 style={{
          fontFamily: 'var(--font-serif-classic)',
          fontSize: '2.1rem',
          color: '#ffffff',
          fontWeight: 400,
          margin: '2px 0 6px',
          letterSpacing: '0.5px',
          textShadow: '0 2px 10px rgba(0,0,0,0.6)'
        }}>
          Nimesh <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>&amp;</span> Dilhani
        </h1>

        <p style={{
          fontFamily: 'var(--font-serif-classic)',
          fontStyle: 'italic',
          color: 'var(--color-gold-light)',
          fontSize: '0.92rem',
          marginBottom: '18px'
        }}>
          We are waiting to celebrate this blessed day with you
        </p>

        {/* Enter Celebration Button */}
        <button
          type="button"
          onClick={handleEnter}
          style={{
            width: '100%',
            padding: '14px 24px',
            borderRadius: '35px',
            background: 'linear-gradient(135deg, #d4a352 0%, #aa7728 100%)',
            color: '#1a1007',
            border: 'none',
            fontFamily: 'var(--font-serif-royal)',
            fontSize: '0.92rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 8px 25px rgba(212, 163, 82, 0.45)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'transform 0.2s ease'
          }}
        >
          <span>Open Invitation</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <div style={{
          fontSize: '0.74rem',
          color: '#bfa98e',
          marginTop: '12px',
          fontFamily: 'var(--font-sans)',
          letterSpacing: '1px'
        }}>
          December 27, 2026 &middot; Grand Monarch, Colombo
        </div>
      </div>
    </div>
  );
}
