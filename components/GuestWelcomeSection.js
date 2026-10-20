'use client';

import { useState, useEffect } from 'react';

export default function GuestWelcomeSection() {
  const [guestName, setGuestName] = useState('Mr. / Mrs. & Family');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Read dynamic guest name from URL query params (e.g. ?to=Kasun+Perera or ?guest=...)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const nameParam = params.get('to') || params.get('guest') || params.get('name');
      if (nameParam && nameParam.trim()) {
        setGuestName(nameParam.trim());
      }
    }
  }, []);

  return (
    <section 
      id="guest-welcome" 
      className="traditional-lattice-bg"
      style={{
        padding: '36px 18px 42px',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(198, 148, 70, 0.35)',
        textAlign: 'left'
      }}
    >
      {/* Floating subtle flower petal decorations matching the screenshot */}
      <div style={{ position: 'absolute', top: '15px', right: '40px', opacity: 0.35, pointerEvents: 'none' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#e5989b">
          <circle cx="12" cy="8" r="4"/>
          <circle cx="8" cy="12" r="4"/>
          <circle cx="16" cy="12" r="4"/>
          <circle cx="12" cy="16" r="4"/>
          <circle cx="12" cy="12" r="2.5" fill="#fec5bb"/>
        </svg>
      </div>
      <div style={{ position: 'absolute', bottom: '35px', left: '15px', opacity: 0.3, pointerEvents: 'none' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#889f77">
          <path d="M12 2C8 6 6 12 12 22C18 12 16 6 12 2Z"/>
        </svg>
      </div>

      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
        {/* Top Tag with Leaf Icon */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'var(--font-serif-royal)',
          fontSize: '0.74rem',
          letterSpacing: '2.5px',
          color: '#5b7352',
          textTransform: 'uppercase',
          fontWeight: 700,
          marginBottom: '10px'
        }}>
          {/* Leaf Icon SVG */}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#69855e" stroke="none">
            <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.52-11 4 4.54 1.5 7.54 4.5 7.54 4.5S17 9 17 8z"/>
          </svg>
          <span>WE REQUEST THE HONOR OF YOUR PRESENCE</span>
        </div>

        {/* Heading with Gold Underline */}
        <h2 style={{
          fontFamily: 'var(--font-serif-classic)',
          fontSize: '2.2rem',
          color: '#221710',
          fontWeight: 400,
          lineHeight: 1.2,
          margin: '2px 0 6px',
          letterSpacing: '0.3px'
        }}>
          Dear Honorable Guests,
        </h2>

        {/* Gold Underline */}
        <div style={{
          width: '56px',
          height: '2.5px',
          background: '#d49b28',
          marginBottom: '16px'
        }}></div>

        {/* Invitation Message Body */}
        <p style={{
          fontFamily: 'var(--font-serif-classic)',
          fontSize: '1rem',
          lineHeight: 1.65,
          color: '#564436',
          marginBottom: '26px'
        }}>
          Together with our families, we joyfully invite you to share in our celebration of love, commitment, and marriage. Your presence and warm blessings on this auspicious day would mean the world to us.
        </p>

        {/* Main Content Layout: VIP Guest Card & Polaroid Photo Frames */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '28px'
        }}>
          {/* "EXCLUSIVELY INVITED" VIP Guest Card matching the screenshot */}
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1.2px solid #e8decb',
            borderLeft: '6px solid #e5a429',
            padding: '20px 22px',
            boxShadow: '0 8px 24px rgba(36, 23, 15, 0.06)',
            position: 'relative'
          }}>
            {/* Top Card Label */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '10px'
            }}>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                letterSpacing: '2px',
                color: '#8c7b6d',
                textTransform: 'uppercase',
                fontWeight: 700
              }}>
                EXCLUSIVELY INVITED
              </span>

              {/* Click to edit helper button */}
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                title="Change guest name"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#b3822a',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontFamily: 'var(--font-sans)'
                }}
              >
                <span>✎</span>
                <span>{isEditing ? 'Save' : 'Edit'}</span>
              </button>
            </div>

            {/* Guest Name in Golden Cursive Calligraphy */}
            {isEditing ? (
              <div style={{ margin: '8px 0 12px' }}>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Enter guest name"
                  autoFocus
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid #d49b28',
                    fontFamily: "'Great Vibes', cursive",
                    fontSize: '1.8rem',
                    color: '#d18a1a',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            ) : (
              <div 
                onClick={() => setIsEditing(true)}
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: '2.5rem',
                  lineHeight: 1.25,
                  color: '#d18a1a',
                  margin: '4px 0 10px',
                  cursor: 'pointer',
                  wordBreak: 'break-word',
                  textShadow: '0 1px 2px rgba(209, 138, 26, 0.15)'
                }}
                title="Click to edit guest name"
              >
                {guestName}
              </div>
            )}

            {/* Thin Divider Line */}
            <div style={{ width: '100%', height: '1px', background: '#f0e6d6', margin: '10px 0 10px' }}></div>

            {/* Footnote instruction */}
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.76rem',
              color: '#8c7b6d',
              fontStyle: 'italic',
              lineHeight: 1.45,
              margin: 0
            }}>
              * This link is customized specially for you. Please confirm your attendance in the RSVP section below.
            </p>
          </div>

          {/* Overlapping Polaroid Photo Cards matching the screenshot */}
          <div style={{
            position: 'relative',
            height: '280px',
            maxWidth: '340px',
            margin: '10px auto 14px',
            width: '100%'
          }}>
            {/* Back Polaroid: Ancient Ruins / Nature scenic shoot */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '10px',
              width: '180px',
              background: '#ffffff',
              padding: '9px 9px 24px',
              borderRadius: '3px',
              boxShadow: '0 12px 28px rgba(0, 0, 0, 0.15)',
              transform: 'rotate(-7deg)',
              transition: 'transform 0.3s ease',
              border: '1px solid #f0eae1'
            }}>
              <div style={{ width: '100%', height: '185px', overflow: 'hidden', background: '#eae4d9' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/images/gallery-3.jpg" 
                  alt="Pre-wedding moments among ancient pillars"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Front Polaroid: Close-up laughing couple with handwritten script caption */}
            <div style={{
              position: 'absolute',
              top: '0px',
              right: '12px',
              width: '190px',
              background: '#ffffff',
              padding: '9px 9px 28px',
              borderRadius: '3px',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.22)',
              transform: 'rotate(5deg)',
              transition: 'transform 0.3s ease',
              border: '1px solid #f0eae1',
              zIndex: 2,
              textAlign: 'center'
            }}>
              <div style={{ width: '100%', height: '175px', overflow: 'hidden', background: '#eae4d9' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="/images/gallery-beach.jpg" 
                  alt="Nimesh and Dilhani smiling in romantic celebration"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Handwritten script caption matching screenshot */}
              <div style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: '1.5rem',
                color: '#c6851f',
                lineHeight: 1.1,
                marginTop: '10px'
              }}>
                Love &amp; Devotion
              </div>

              <div style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.65rem',
                letterSpacing: '1.8px',
                color: '#8e7e72',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginTop: '3px'
              }}>
                DECEMBER 27, 2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
