'use client';

import { useState, useEffect } from 'react';

export default function GuestbookSection() {
  const [wishes, setWishes] = useState([]);
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('Friend');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const relationshipList = [
    'Friend & Well-wisher',
    'Bride\'s Family',
    'Groom\'s Family',
    'University / School Friend',
    'Colleague',
    'Relative'
  ];

  const fetchWishes = async () => {
    try {
      const res = await fetch('http://localhost/wedding-invitation/api/wishes.php');
      const data = await res.json();
      if (data.success && data.wishes) {
        setWishes(data.wishes);
      }
    } catch (err) {
      console.log('Fetching wishes fallback:', err);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handlePostWish = async (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setLoading(true);
    setSuccess('');

    try {
      const res = await fetch('http://localhost/wedding-invitation/api/wishes.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, relationship, message })
      });
      const data = await res.json();
      if (data.success) {
        setSuccess('Subha Mangalam! Your blessing has been added.');
        setName('');
        setMessage('');
        fetchWishes();
      }
    } catch (err) {
      console.error(err);
      // Local optimistic update
      const localWish = {
        id: Date.now(),
        name,
        relationship,
        message,
        likes: 1,
        created_at: new Date().toISOString()
      };
      setWishes([localWish, ...wishes]);
      setSuccess('Subha Mangalam! Your blessing has been recorded.');
      setName('');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (id) => {
    try {
      await fetch('http://localhost/wedding-invitation/api/wishes.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'like', id })
      });
      setWishes((prev) =>
        prev.map((w) => (w.id === id ? { ...w, likes: (w.likes || 0) + 1 } : w))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section id="guestbook" className="traditional-lattice-bg" style={{ padding: '38px 16px 48px', textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-serif-royal)', fontSize: '0.82rem', letterSpacing: '4px', color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>
        G U E S T B O O K
      </div>

      <h2 style={{ fontFamily: 'var(--font-serif-classic)', fontSize: '2.1rem', color: '#24160e', fontWeight: 400, marginBottom: '6px' }}>
        Warm Blessings &amp; Wishes
      </h2>

      <p style={{ fontFamily: 'var(--font-serif-classic)', fontStyle: 'italic', color: '#685141', fontSize: '0.95rem', marginBottom: '24px' }}>
        Leave a traditional blessing or message for the couple
      </p>

      {/* Input Form Card */}
      <div style={{
        maxWidth: '460px',
        margin: '0 auto 32px',
        background: '#ffffff',
        border: '1px solid rgba(198, 148, 70, 0.45)',
        borderRadius: '14px',
        padding: '22px 18px',
        boxShadow: '0 8px 24px rgba(36, 23, 15, 0.06)'
      }}>
        {success && (
          <div style={{ background: '#f4fbf5', color: '#2e7d32', border: '1px solid #c8e6c9', padding: '10px', borderRadius: '8px', marginBottom: '14px', fontSize: '0.88rem' }}>
            {success}
          </div>
        )}

        <form onSubmit={handlePostWish}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '10px', marginBottom: '12px' }}>
            <input
              type="text"
              placeholder="Your Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="form-select"
            >
              {relationshipList.map((rel, idx) => (
                <option key={idx} value={rel}>{rel}</option>
              ))}
            </select>
          </div>

          <textarea
            placeholder="Write your blessings for Nimesh &amp; Dilhani (e.g. Subha Mangalam!)..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="form-textarea"
            style={{ minHeight: '70px', marginBottom: '12px' }}
            required
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '11px',
              borderRadius: '25px',
              background: 'linear-gradient(135deg, #c69446 0%, #a47225 100%)',
              color: '#ffffff',
              border: 'none',
              fontFamily: 'var(--font-serif-royal)',
              fontSize: '0.85rem',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Posting Blessing...' : 'Send Your Blessing ✨'}
          </button>
        </form>
      </div>

      {/* Wishes List */}
      <div style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {wishes.map((w) => (
          <div
            key={w.id}
            style={{
              background: '#ffffff',
              border: '1px solid rgba(198, 148, 70, 0.35)',
              borderRadius: '12px',
              padding: '16px 18px',
              textAlign: 'left',
              boxShadow: '0 4px 14px rgba(36, 23, 15, 0.04)',
              transition: 'transform 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div>
                <strong style={{ color: '#24160e', fontSize: '0.95rem' }}>{w.name}</strong>
                <span style={{ fontSize: '0.75rem', color: '#8c601f', background: 'rgba(198, 148, 70, 0.1)', padding: '2px 8px', borderRadius: '10px', marginLeft: '8px' }}>
                  {w.relationship}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleLike(w.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#e53935',
                  cursor: 'pointer',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
                title="Send a heart"
              >
                <span>❤️</span>
                <span style={{ color: '#666', fontWeight: 600 }}>{w.likes || 0}</span>
              </button>
            </div>

            <p style={{ fontFamily: 'var(--font-serif-classic)', fontStyle: 'italic', color: '#4a372b', fontSize: '0.92rem', lineHeight: 1.5 }}>
              &ldquo;{w.message}&rdquo;
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
