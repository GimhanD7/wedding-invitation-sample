'use client';

import { useState } from 'react';

export default function LocationSection() {
  const [calendarChoiceOpen, setCalendarChoiceOpen] = useState(false);

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Nimesh+%26+Dilhani%27s+Wedding&dates=20261227T033000Z/20261227T173000Z&details=Celebration+of+the+marriage+of+Nimesh+and+Dilhani+in+traditional+Kandyan+style&location=The+Grand+Monarch%2C+Thalawathugoda%2C+Colombo%2C+Sri+Lanka`;

  const downloadIcsFile = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Nimesh and Dilhani//Wedding Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:wedding-nimesh-dilhani-20261227',
      'SUMMARY:Nimesh & Dilhani\'s Wedding (Poruwa Ceremony & Reception)',
      'DESCRIPTION:Celebrating the traditional Sri Lankan wedding of Nimesh and Dilhani at Grand Monarch, Colombo.',
      'LOCATION:The Grand Monarch, Thalawathugoda, Colombo, Sri Lanka',
      'DTSTART:20261227T033000Z',
      'DTEND:20261227T173000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Nimesh_Dilhani_Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="location" className="traditional-lattice-bg" style={{ padding: '38px 16px 42px', textAlign: 'center' }}>
      {/* Subtitle */}
      <div style={{
        fontFamily: 'var(--font-serif-royal)',
        fontSize: '0.82rem',
        letterSpacing: '4px',
        color: 'var(--color-gold)',
        textTransform: 'uppercase',
        marginBottom: '6px',
        fontWeight: 600
      }}>
        L O C A T I O N
      </div>

      {/* Main Heading */}
      <h2 style={{
        fontFamily: 'var(--font-serif-classic)',
        fontSize: '2.3rem',
        color: '#24160e',
        fontWeight: 400,
        marginBottom: '10px',
        letterSpacing: '0.5px'
      }}>
        Wedding Venue
      </h2>

      {/* Venue Name with Gold Pin */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        fontFamily: 'var(--font-serif-classic)',
        fontSize: '1.25rem',
        color: '#24160e',
        marginBottom: '2px'
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold-dark)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
        <span style={{ fontWeight: 600 }}>Grand Monarch, Colombo</span>
      </div>

      {/* City */}
      <div style={{
        fontFamily: 'var(--font-serif-classic)',
        fontStyle: 'italic',
        fontSize: '0.98rem',
        color: 'var(--color-gold-dark)',
        marginBottom: '22px'
      }}>
        Colombo, Sri Lanka
      </div>

      {/* Google Map Container with "Open in Maps" Overlay */}
      <div style={{
        position: 'relative',
        maxWidth: '480px',
        margin: '0 auto 22px',
        borderRadius: '18px',
        overflow: 'hidden',
        border: '1.5px solid rgba(198, 148, 70, 0.45)',
        boxShadow: '0 10px 30px rgba(36, 23, 15, 0.1)',
        background: '#e5e3df',
        height: '270px'
      }}>
        <iframe
          title="Grand Monarch Colombo Location"
          src="https://maps.google.com/maps?q=The+Grand+Monarch,+Thalawathugoda,+Colombo&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0, display: 'block' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />

        {/* Floating "Open in Maps" Button matching the screenshot */}
        <a
          href="https://maps.google.com/?q=The+Grand+Monarch,+Thalawathugoda,+Sri+Jayawardenepura+Kotte,+Colombo"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            background: '#ffffff',
            color: '#1a73e8',
            padding: '7px 14px',
            borderRadius: '6px',
            fontSize: '0.85rem',
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(0,0,0,0.22)',
            border: '1px solid #dadce0',
            zIndex: 10,
            transition: 'all 0.2s ease'
          }}
        >
          <span>Open in Maps</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>

      {/* Add to Calendar Card matching the screenshot */}
      <div 
        onClick={() => setCalendarChoiceOpen(!calendarChoiceOpen)}
        role="button"
        tabIndex={0}
        style={{
          maxWidth: '480px',
          margin: '0 auto',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(250, 245, 235, 0.95) 100%)',
          border: '1px solid rgba(198, 148, 70, 0.4)',
          borderRadius: '20px',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(36, 23, 15, 0.05)',
          transition: 'all 0.25s ease',
          textAlign: 'left'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Calendar Circular Icon */}
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #c89642 0%, #996e25 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 4px 10px rgba(184, 134, 40, 0.35)',
            flexShrink: 0
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
              <circle cx="8" cy="14" r="1" fill="currentColor"></circle>
              <circle cx="12" cy="14" r="1" fill="currentColor"></circle>
              <circle cx="16" cy="14" r="1" fill="currentColor"></circle>
              <circle cx="8" cy="18" r="1" fill="currentColor"></circle>
              <circle cx="12" cy="18" r="1" fill="currentColor"></circle>
            </svg>
          </div>

          <div>
            <div style={{
              fontFamily: 'var(--font-serif-classic)',
              fontSize: '1.15rem',
              color: '#24160e',
              fontWeight: 500
            }}>
              Add to Calendar
            </div>
            <div style={{
              fontSize: '0.85rem',
              color: '#7a6552',
              marginTop: '1px'
            }}>
              Save the date to your calendar
            </div>
          </div>
        </div>

        {/* Right Arrow Button */}
        <div style={{
          width: '34px',
          height: '34px',
          borderRadius: '50%',
          background: 'rgba(198, 148, 70, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--color-gold-dark)',
          flexShrink: 0,
          transition: 'transform 0.2s ease'
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </div>

      {/* Calendar options dropdown */}
      {calendarChoiceOpen && (
        <div style={{
          maxWidth: '480px',
          margin: '12px auto 0',
          background: '#ffffff',
          borderRadius: '14px',
          border: '1px solid rgba(198, 148, 70, 0.35)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          animation: 'fadeIn 0.25s ease'
        }}>
          <a
            href={googleCalendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              background: '#f8f5ee',
              color: '#24160e',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              border: '1px solid rgba(198, 148, 70, 0.3)'
            }}
          >
            <span>📅 Add to Google Calendar</span>
          </a>

          <button
            type="button"
            onClick={downloadIcsFile}
            style={{
              padding: '10px 16px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #c89642 0%, #996e25 100%)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <span>📥 Download iCal / Apple Calendar (.ics)</span>
          </button>
        </div>
      )}
    </section>
  );
}
