'use client';

export default function HeroSection() {
  return (
    <section id="hero" className="traditional-lattice-bg" style={{ padding: '24px 16px 14px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Top Diamond Ornament matching Screenshot 1 */}
      <div className="ornament-diamond-divider" style={{ margin: '0 auto 12px' }}>
        <div className="ornament-line"></div>
        <div className="ornament-diamond"></div>
        <div className="ornament-line"></div>
      </div>

      {/* Main Couple Name */}
      <h1 className="couple-title">
        Nimesh <span className="ampersand">&amp;</span> Dilhani
      </h1>

      {/* Middle Diamond Ornament matching Screenshot 1 */}
      <div className="ornament-diamond-divider" style={{ margin: '8px 0 16px' }}>
        <div className="ornament-line"></div>
        <div className="ornament-diamond"></div>
        <div className="ornament-line"></div>
      </div>

      {/* Formal Wedding Invitation Text */}
      <p className="invitation-quote">
        Request the honour of your presence<br />
        at the celebration of their marriage
      </p>

      {/* Day of Week */}
      <div className="day-badge">
        S U N D A Y
      </div>

      {/* Date */}
      <div className="wedding-date-hero">
        27th December 2026
      </div>

      {/* Time & Venue */}
      <div className="wedding-details-hero">
        AT 10:30 AM<br />
        <span style={{ color: 'var(--color-gold-dark)', fontWeight: 700 }}>GRAND MONARCH, COLOMBO</span>
      </div>

      {/* Traditional Kandyan Couple Transparent Cutout matching Screenshot 1 */}
      <div style={{ position: 'relative', maxWidth: '330px', margin: '15px auto 0' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/images/Tr1.png" 
          alt="Nimesh and Dilhani in Traditional Sri Lankan Kandyan Wedding Attire"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            margin: '0 auto',
            filter: 'drop-shadow(0 15px 25px rgba(36, 23, 15, 0.16))'
          }}
        />

        {/* Botanical floral accents at bottom corners matching screenshot */}
        <div style={{
          position: 'absolute',
          bottom: '0px',
          left: '-20px',
          width: '90px',
          height: '90px',
          pointerEvents: 'none',
          opacity: 0.95
        }}>
          <svg viewBox="0 0 120 120" fill="none">
            <g transform="translate(10, 10)">
              <circle cx="45" cy="45" r="24" fill="#faf0dd" stroke="#c69446" strokeWidth="1" strokeOpacity="0.4"/>
              <circle cx="38" cy="40" r="16" fill="#f5e1be" stroke="#c69446" strokeWidth="1" strokeOpacity="0.4"/>
              <circle cx="42" cy="42" r="8" fill="#e7bc6e" fillOpacity="0.7"/>
              <path d="M15 75 Q 35 45, 60 55 Q 40 85, 15 75 Z" fill="#889f77" fillOpacity="0.65"/>
              <path d="M5 60 Q 25 35, 45 48 Q 28 72, 5 60 Z" fill="#9db48c" fillOpacity="0.6"/>
              <path d="M45 75 Q 65 55, 80 70 Q 60 90, 45 75 Z" fill="#758c65" fillOpacity="0.5"/>
            </g>
          </svg>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '0px',
          right: '-20px',
          width: '90px',
          height: '90px',
          pointerEvents: 'none',
          opacity: 0.95,
          transform: 'scaleX(-1)'
        }}>
          <svg viewBox="0 0 120 120" fill="none">
            <g transform="translate(10, 10)">
              <circle cx="45" cy="45" r="24" fill="#faf0dd" stroke="#c69446" strokeWidth="1" strokeOpacity="0.4"/>
              <circle cx="38" cy="40" r="16" fill="#f5e1be" stroke="#c69446" strokeWidth="1" strokeOpacity="0.4"/>
              <circle cx="42" cy="42" r="8" fill="#e7bc6e" fillOpacity="0.7"/>
              <path d="M15 75 Q 35 45, 60 55 Q 40 85, 15 75 Z" fill="#889f77" fillOpacity="0.65"/>
              <path d="M5 60 Q 25 35, 45 48 Q 28 72, 5 60 Z" fill="#9db48c" fillOpacity="0.6"/>
              <path d="M45 75 Q 65 55, 80 70 Q 60 90, 45 75 Z" fill="#758c65" fillOpacity="0.5"/>
            </g>
          </svg>
        </div>
      </div>

      {/* Scroll Down Prompt */}
      <div className="scroll-cue" style={{ marginTop: '10px' }}>
        <span>S C R O L L</span>
        <div className="scroll-cue-arrow"></div>
      </div>
    </section>
  );
}
