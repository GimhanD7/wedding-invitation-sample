'use client';

import { useState, useEffect } from 'react';

export default function CountdownSection() {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 67,
    hours: 11,
    minutes: 35,
    seconds: 47,
  });

  useEffect(() => {
    setMounted(true);
    // Wedding Date: 27th December 2026, 10:30 AM (Colombo Time GMT+5:30)
    const targetDate = new Date('2026-12-27T10:30:00+05:30').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (num) => String(num).padStart(2, '0');

  return (
    <section id="countdown" className="dark-espresso-bg countdown-section">
      {/* Top Diamond Ornament */}
      <div className="ornament-diamond-divider">
        <div className="ornament-line"></div>
        <div className="ornament-diamond"></div>
        <div className="ornament-line"></div>
      </div>

      <h2 className="countdown-title">
        Counting Down to the Wedding
      </h2>

      {/* 4 Cards Grid */}
      <div className="countdown-grid">
        <div className="countdown-card">
          <div className="corner-diamond corner-top-left"></div>
          <div className="corner-diamond corner-bottom-right"></div>
          <div className="countdown-num">{mounted ? timeLeft.days : 67}</div>
          <div className="countdown-label">Days</div>
        </div>

        <div className="countdown-card">
          <div className="corner-diamond corner-top-left"></div>
          <div className="corner-diamond corner-bottom-right"></div>
          <div className="countdown-num">{mounted ? pad(timeLeft.hours) : '11'}</div>
          <div className="countdown-label">Hours</div>
        </div>

        <div className="countdown-card">
          <div className="corner-diamond corner-top-left"></div>
          <div className="corner-diamond corner-bottom-right"></div>
          <div className="countdown-num">{mounted ? pad(timeLeft.minutes) : '35'}</div>
          <div className="countdown-label">Min</div>
        </div>

        <div className="countdown-card">
          <div className="corner-diamond corner-top-left"></div>
          <div className="corner-diamond corner-bottom-right"></div>
          <div className="countdown-num">{mounted ? pad(timeLeft.seconds) : '47'}</div>
          <div className="countdown-label">Sec</div>
        </div>
      </div>

      {/* Bottom Diamond Ornament */}
      <div className="ornament-diamond-divider" style={{ marginTop: '28px' }}>
        <div className="ornament-line"></div>
        <div className="ornament-diamond"></div>
        <div className="ornament-line"></div>
      </div>
    </section>
  );
}
