'use client';

import { useState } from 'react';

export default function OurStorySection() {
  const [showTraditions, setShowTraditions] = useState(false);

  return (
    <section id="story" className="traditional-lattice-bg" style={{ padding: '36px 20px 40px', textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-serif-royal)', fontSize: '0.82rem', letterSpacing: '4px', color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>
        O U R &nbsp; S T O R Y
      </div>

      <div style={{ width: '45px', height: '1.5px', background: 'var(--color-gold)', margin: '0 auto 16px' }}></div>

      <h2 style={{ fontFamily: 'var(--font-serif-classic)', fontSize: '2.1rem', color: '#24160e', fontWeight: 400, marginBottom: '16px', letterSpacing: '0.5px' }}>
        Two Hearts, One Journey
      </h2>

      <p style={{
        fontFamily: 'var(--font-serif-classic)',
        fontSize: '1.05rem',
        lineHeight: 1.7,
        color: '#554234',
        maxWidth: '440px',
        margin: '0 auto 28px',
        fontStyle: 'italic'
      }}>
        From a chance meeting to a beautiful friendship, and now to a lifetime together. 
        We are blessed to begin this new chapter of our lives and can&apos;t wait to celebrate with you.
      </p>

      {/* Poruwa Ceremony Watercolor Artwork */}
      <div style={{
        maxWidth: '420px',
        margin: '0 auto 20px',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1.5px solid rgba(198, 148, 70, 0.5)',
        boxShadow: '0 12px 35px rgba(36, 23, 15, 0.12)',
        background: '#fff'
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/images/poruwa-ceremony.jpg" 
          alt="Traditional Sri Lankan Poruwa Ceremony with Jasmine Floral Canopy"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      {/* Cultural Traditions Guide Button */}
      <div style={{ marginTop: '16px' }}>
        <button
          type="button"
          onClick={() => setShowTraditions(!showTraditions)}
          style={{
            background: 'none',
            border: '1px solid var(--color-gold)',
            color: 'var(--color-gold-dark)',
            padding: '8px 18px',
            borderRadius: '20px',
            fontSize: '0.82rem',
            fontFamily: 'var(--font-serif-royal)',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>🌸 Discover Poruwa Traditions</span>
          <span>{showTraditions ? '▲' : '▼'}</span>
        </button>

        {showTraditions && (
          <div style={{
            maxWidth: '460px',
            margin: '18px auto 0',
            textAlign: 'left',
            background: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(198, 148, 70, 0.35)',
            borderRadius: '12px',
            padding: '20px',
            boxShadow: '0 8px 24px rgba(36, 23, 15, 0.08)',
            animation: 'fadeIn 0.3s ease'
          }}>
            <h4 style={{ fontFamily: 'var(--font-serif-royal)', fontSize: '0.9rem', color: '#24160e', marginBottom: '12px', letterSpacing: '1px' }}>
              The Sacred Poruwa Siritha
            </h4>
            <ul style={{ listStyle: 'none', fontSize: '0.86rem', color: '#554234', lineHeight: 1.6 }}>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: 'var(--color-gold-dark)' }}>✦ Lighting the Traditional Pahana:</strong> Igniting the brass oil lamp to welcome illumination, good fortune, and new beginnings.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: 'var(--color-gold-dark)' }}>✦ Jayamangala Gatha:</strong> Sacred Pali stanzas sung by young girls wishing blessings and eternal happiness upon the couple.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong style={{ color: 'var(--color-gold-dark)' }}>✦ Tying the Pirith Nool:</strong> The little fingers of the couple are bound with sacred white thread, and blessed water is poured from a Kendiya.
              </li>
              <li>
                <strong style={{ color: 'var(--color-gold-dark)' }}>✦ Bulath Hurulla (Betel Leaves):</strong> Dropping sheaves of betel leaves to honor seven generations of ancestors and seek parents&apos; blessings.
              </li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
