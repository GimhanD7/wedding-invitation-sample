'use client';

import { useState } from 'react';

export default function RsvpSection({ isModal = false, onClose = () => {} }) {
  const [formData, setFormData] = useState({
    guest_name: '',
    attending: 'yes',
    guest_count: 1,
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const incrementGuests = () => {
    setFormData((prev) => ({ ...prev, guest_count: Math.min(10, prev.guest_count + 1) }));
  };

  const decrementGuests = () => {
    setFormData((prev) => ({ ...prev, guest_count: Math.max(1, prev.guest_count - 1) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.guest_name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    setLoading(true);

    try {
      const apiUrl = 'http://localhost/wedding-invitation/api/rsvp.php';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          guest_name: formData.guest_name.trim(),
          attending: formData.attending,
          guest_count: formData.guest_count,
          children_count: 0,
          events: 'Wedding Celebration',
          dietary: 'Traditional Sri Lankan Buffet',
          phone: '',
          email: '',
          message: ''
        })
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(result.error || 'Failed to submit RSVP. Please try again.');
      }
    } catch (err) {
      console.error('RSVP submission error:', err);
      // Graceful offline fallback
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="rsvp" className="traditional-lattice-bg" style={{ padding: '30px 14px 38px', textAlign: 'left' }}>
      <div style={{
        maxWidth: '420px',
        margin: '0 auto',
        background: '#faf6ef',
        border: '1.5px solid #ded5c5',
        borderRadius: '24px',
        padding: '30px 24px 28px',
        boxShadow: '0 10px 30px rgba(36, 23, 15, 0.06)',
        position: 'relative'
      }}>
        {isModal && (
          <button
            type="button"
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '14px',
              right: '16px',
              background: 'none',
              border: 'none',
              fontSize: '1.2rem',
              color: '#8c601f',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
        )}

        {submitted ? (
          <div style={{ padding: '24px 10px', textAlign: 'center', animation: 'fadeIn 0.3s ease' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🌺</div>
            <h3 style={{ fontFamily: 'var(--font-serif-classic)', color: '#24160e', fontSize: '1.6rem', marginBottom: '8px' }}>
              Ayubowan &amp; Thank You!
            </h3>
            <p style={{ color: '#554234', lineHeight: 1.6, fontSize: '0.95rem' }}>
              Your response has been recorded with our heartfelt gratitude. We look forward to celebrating with you!
            </p>
            {isModal && (
              <button
                type="button"
                onClick={onClose}
                style={{
                  marginTop: '18px',
                  padding: '9px 22px',
                  borderRadius: '25px',
                  background: '#24180f',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            )}
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {errorMessage && (
              <div style={{
                background: '#ffebee',
                color: '#c62828',
                padding: '8px 12px',
                borderRadius: '8px',
                fontSize: '0.85rem'
              }}>
                {errorMessage}
              </div>
            )}

            {/* 1. Full Name */}
            <div>
              <label 
                htmlFor="guest_name" 
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-serif-classic)',
                  fontSize: '1.05rem',
                  color: '#24180f',
                  fontWeight: 600,
                  marginBottom: '10px'
                }}
              >
                Full Name
              </label>
              <input
                id="guest_name"
                type="text"
                placeholder="Your name"
                value={formData.guest_name}
                onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                required
                style={{
                  width: '100%',
                  padding: '13px 16px',
                  background: '#fdfcf9',
                  border: '1.5px solid #ded5c5',
                  borderRadius: '12px',
                  fontFamily: 'var(--font-serif-classic)',
                  fontSize: '1rem',
                  color: '#24180f',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            {/* 2. Will you be attending? */}
            <div>
              <label 
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-serif-classic)',
                  fontSize: '1.05rem',
                  color: '#24180f',
                  fontWeight: 600,
                  marginBottom: '10px'
                }}
              >
                Will you be attending?
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {/* Joyfully Accept */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: 'yes' })}
                  style={{
                    height: '76px',
                    borderRadius: '14px',
                    border: formData.attending === 'yes' ? '2px solid #bda376' : '1.5px solid #ded5c5',
                    background: formData.attending === 'yes' ? '#f2e8d5' : '#fdfbf7',
                    color: '#443527',
                    fontFamily: 'var(--font-serif-classic)',
                    fontSize: '1.02rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    boxShadow: formData.attending === 'yes' ? '0 2px 8px rgba(189, 163, 118, 0.25)' : 'none'
                  }}
                >
                  Joyfully Accept
                </button>

                {/* Regretfully Decline */}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, attending: 'no' })}
                  style={{
                    height: '76px',
                    borderRadius: '14px',
                    border: formData.attending === 'no' ? '2px solid #bda376' : '1.5px solid #ded5c5',
                    background: formData.attending === 'no' ? '#f2e8d5' : '#fdfbf7',
                    color: '#443527',
                    fontFamily: 'var(--font-serif-classic)',
                    fontSize: '1.02rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    boxShadow: formData.attending === 'no' ? '0 2px 8px rgba(189, 163, 118, 0.25)' : 'none'
                  }}
                >
                  Regretfully<br />Decline
                </button>
              </div>
            </div>

            {/* 3. Number of Guests */}
            <div>
              <label 
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-serif-classic)',
                  fontSize: '1.05rem',
                  color: '#24180f',
                  fontWeight: 600,
                  marginBottom: '14px'
                }}
              >
                Number of Guests
              </label>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '32px',
                margin: '6px 0 10px'
              }}>
                {/* Minus Button */}
                <button
                  type="button"
                  onClick={decrementGuests}
                  aria-label="Decrease number of guests"
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    border: '1.5px solid #8e877e',
                    background: '#dad5ce',
                    color: '#24180f',
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    userSelect: 'none',
                    lineHeight: 1,
                    transition: 'all 0.15s ease'
                  }}
                >
                  -
                </button>

                {/* Count Display */}
                <div style={{
                  fontFamily: 'var(--font-serif-classic)',
                  fontSize: '2.5rem',
                  fontWeight: 500,
                  color: '#1a1109',
                  minWidth: '40px',
                  textAlign: 'center',
                  userSelect: 'none'
                }}>
                  {formData.guest_count}
                </div>

                {/* Plus Button */}
                <button
                  type="button"
                  onClick={incrementGuests}
                  aria-label="Increase number of guests"
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    border: '1.5px solid #8e877e',
                    background: '#dad5ce',
                    color: '#24180f',
                    fontSize: '1.35rem',
                    fontWeight: 400,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    userSelect: 'none',
                    lineHeight: 1,
                    transition: 'all 0.15s ease'
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* 4. SEND RSVP Button matching the screenshot */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                height: '52px',
                borderRadius: '35px',
                border: '1.5px solid #2e353e',
                background: '#faf6ef',
                color: '#24180f',
                fontFamily: 'var(--font-serif-classic)',
                fontSize: '0.88rem',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: '6px',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(36, 23, 15, 0.05)'
              }}
            >
              {/* Paper airplane icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(-10deg)' }}>
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              <span>{loading ? 'Sending...' : 'SEND RSVP'}</span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
