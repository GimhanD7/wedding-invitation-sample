'use client';

export default function CelebrateWithUsSection() {
  const events = [
    {
      title: 'Poruwa Ceremony',
      time: '9:00 AM',
      date: '27 Dec 2026',
      location: 'Residence',
      details: 'Traditional Kandyan Poruwa rituals & blessings',
      icon: (
        // Traditional Sri Lankan Brass Oil Lamp (Pahana) SVG
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {/* Flame */}
          <path d="M12 2C12 2 10.5 4 10.5 5.5C10.5 6.3 11.2 7 12 7C12.8 7 13.5 6.3 13.5 5.5C13.5 4 12 2 12 2Z" fill="currentColor"/>
          {/* Top tier plate */}
          <line x1="8" y1="8" x2="16" y2="8"/>
          {/* Central stem */}
          <line x1="12" y1="8" x2="12" y2="19"/>
          {/* Lower tier plate */}
          <line x1="6" y1="13" x2="18" y2="13"/>
          {/* Base */}
          <path d="M8 21C8 19 16 19 16 21H8Z"/>
          <line x1="6" y1="21" x2="18" y2="21"/>
        </svg>
      )
    },
    {
      title: 'Wedding Ceremony',
      time: '10:30 AM',
      date: '27 Dec 2026',
      location: 'Grand Monarch, Colombo',
      details: 'Official marriage registration & rings',
      icon: (
        // Interlocking wedding rings with diamond SVG
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="13" r="5" />
          <circle cx="15" cy="13" r="5" />
          {/* Diamond on ring */}
          <path d="M15 5L16.5 7L15 9L13.5 7Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      title: 'Reception',
      time: '12:30 PM',
      date: '27 Dec 2026',
      location: 'Grand Monarch, Colombo',
      details: 'Banquet lunch, toasts, cake & dancing',
      icon: (
        // Champagne glasses toast SVG
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 3L6 11C6 12.5 7.5 13.5 9 13.5C10.5 13.5 12 12.5 12 11L10 3H8Z" />
          <line x1="9" y1="13.5" x2="9" y2="20" />
          <line x1="6" y1="20" x2="12" y2="20" />
          <path d="M16 3L14 11C14 12.5 15.5 13.5 17 13.5C18.5 13.5 20 12.5 20 11L18 3H16Z" />
          <line x1="17" y1="13.5" x2="17" y2="20" />
          <line x1="14" y1="20" x2="20" y2="20" />
        </svg>
      )
    },
    {
      title: 'After Party',
      time: '7:00 PM',
      date: '27 Dec 2026',
      location: 'Grand Monarch, Colombo',
      details: 'Evening cocktails, DJ & celebrations',
      icon: (
        // Celebration cake SVG
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {/* Cake tiers */}
          <path d="M7 16H17V21H7V16Z" />
          <path d="M9 11H15V16H9V11Z" />
          {/* Candle & Flame */}
          <line x1="12" y1="8" x2="12" y2="11" />
          <circle cx="12" cy="7" r="1.5" fill="currentColor"/>
          <path d="M5 21H19" />
        </svg>
      )
    }
  ];

  // Function to create and download .ics calendar file
  const downloadCalendarFile = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Nimesh and Dilhani//Wedding Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:wedding-nimesh-dilhani-20261227',
      'SUMMARY:Nimesh & Dilhani\'s Wedding (Poruwa Ceremony & Reception)',
      'DESCRIPTION:Celebrating the traditional Sri Lankan wedding of Nimesh and Dilhani at Grand Monarch, Colombo.',
      'LOCATION:The Grand Monarch, Sri Jayawardenepura Kotte, Colombo, Sri Lanka',
      'DTSTART:20261227T033000Z',
      'DTEND:20261227T173000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Nimesh_Dilhani_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="itinerary" className="traditional-lattice-bg" style={{ padding: '38px 16px 42px', textAlign: 'center' }}>
      <h2 style={{ fontFamily: 'var(--font-serif-classic)', fontSize: '2.1rem', color: '#24160e', fontWeight: 400, marginBottom: '24px', letterSpacing: '0.5px' }}>
        Celebrate With Us
      </h2>

      {/* 4 Arched Event Cards Grid */}
      <div className="schedule-grid">
        {events.map((evt, idx) => (
          <div key={idx} className="schedule-card">
            <div className="schedule-icon-wrap">
              {evt.icon}
            </div>

            <div className="schedule-event-title">
              {evt.title}
            </div>

            <div className="schedule-time">
              {evt.date}<br />
              <strong style={{ color: '#24160e' }}>{evt.time}</strong>
            </div>

            <div className="schedule-location">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{evt.location}</span>
            </div>

            <div style={{ fontSize: '0.78rem', color: '#766050', marginTop: '6px', fontStyle: 'italic' }}>
              {evt.details}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons: Google Maps & Add to Calendar */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '28px' }}>
        <a 
          href="https://maps.google.com/?q=The+Grand+Monarch,+Sri+Jayawardenepura+Kotte" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '25px',
            background: 'linear-gradient(135deg, #24170f 0%, #3a2517 100%)',
            color: 'var(--color-gold-light)',
            border: '1px solid var(--color-gold)',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-serif-royal)',
            letterSpacing: '1px',
            textDecoration: 'none',
            fontWeight: 600,
            boxShadow: '0 4px 12px rgba(36, 23, 15, 0.15)',
            transition: 'all 0.2s ease'
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
          </svg>
          <span>Open in Google Maps</span>
        </a>

        <button 
          type="button"
          onClick={downloadCalendarFile}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '25px',
            background: 'rgba(255, 255, 255, 0.9)',
            color: 'var(--color-gold-dark)',
            border: '1px solid var(--color-gold)',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-serif-royal)',
            letterSpacing: '1px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            transition: 'all 0.2s ease'
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span>Add to Calendar</span>
        </button>
      </div>
    </section>
  );
}
