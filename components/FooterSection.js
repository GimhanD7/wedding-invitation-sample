'use client';

export default function FooterSection() {
  return (
    <footer className="traditional-lattice-bg" style={{
      padding: '48px 20px 84px',
      textAlign: 'center',
      position: 'relative',
      borderTop: '1px solid rgba(198, 148, 70, 0.35)'
    }}>
      {/* "WITH LOVE," Header */}
      <div style={{
        fontFamily: 'var(--font-serif-royal)',
        fontSize: '0.92rem',
        letterSpacing: '3.5px',
        color: '#b37d1d',
        textTransform: 'uppercase',
        marginBottom: '6px',
        fontWeight: 600
      }}>
        W I T H &nbsp; L O V E ,
      </div>

      {/* Couple Names */}
      <h3 style={{
        fontFamily: 'var(--font-serif-classic)',
        fontSize: '2.45rem',
        color: '#24160e',
        fontWeight: 400,
        margin: '2px 0 8px',
        letterSpacing: '0.5px'
      }}>
        Dilhani &amp; Nimesh
      </h3>

      {/* Date & Location */}
      <div style={{
        fontFamily: 'var(--font-serif-classic)',
        fontSize: '0.96rem',
        color: '#8c601f',
        marginBottom: '28px',
        letterSpacing: '0.3px'
      }}>
        December 27, 2026 &middot; Grand Monarch, Colombo
      </div>

      {/* Contact Buttons matching the screenshot */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '42px'
      }}>
        {/* Call Nimesh Button */}
        <a
          href="tel:+94771234567"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            width: '215px',
            padding: '11px 22px',
            borderRadius: '30px',
            border: '1.2px solid #cfa34b',
            background: 'rgba(255, 255, 255, 0.65)',
            color: '#9e6e18',
            fontFamily: 'var(--font-serif-classic)',
            fontSize: '1.05rem',
            textDecoration: 'none',
            fontWeight: 500,
            boxShadow: '0 2px 10px rgba(198, 148, 70, 0.08)',
            transition: 'all 0.2s ease'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>Call Nimesh</span>
        </a>

        {/* Call Dilhani Button */}
        <a
          href="tel:+94777654321"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            width: '215px',
            padding: '11px 22px',
            borderRadius: '30px',
            border: '1.2px solid #cfa34b',
            background: 'rgba(255, 255, 255, 0.65)',
            color: '#9e6e18',
            fontFamily: 'var(--font-serif-classic)',
            fontSize: '1.05rem',
            textDecoration: 'none',
            fontWeight: 500,
            boxShadow: '0 2px 10px rgba(198, 148, 70, 0.08)',
            transition: 'all 0.2s ease'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          <span>Call Dilhani</span>
        </a>
      </div>

      {/* Thank You Section matching the screenshot */}
      <h2 style={{
        fontFamily: 'var(--font-serif-classic)',
        fontSize: '2.2rem',
        color: '#24160e',
        fontWeight: 400,
        marginBottom: '8px',
        letterSpacing: '0.5px'
      }}>
        Thank You
      </h2>

      <p style={{
        fontFamily: 'var(--font-serif-classic)',
        fontSize: '1.05rem',
        color: '#6d5329',
        marginBottom: '20px',
        lineHeight: 1.5
      }}>
        Thank you for being a part of our special day!
      </p>

      {/* Centered Gold Heart Accent Motif */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#b37d1d',
        marginBottom: '24px'
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#b37d1d" stroke="none">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      {/* Discreet Admin Portal Link */}
      <div style={{ fontSize: '0.74rem', color: '#8f7761', marginTop: '10px' }}>
        <a 
          href="http://localhost/wedding-invitation/api/admin.php" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#9e6e18', textDecoration: 'none', opacity: 0.8 }}
          title="Admin RSVP Dashboard"
        >
          RSVP Management 🔐
        </a>
      </div>
    </footer>
  );
}
