'use client';

import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import GuestWelcomeSection from '@/components/GuestWelcomeSection';
import CountdownSection from '@/components/CountdownSection';
import OurStorySection from '@/components/OurStorySection';
import CelebrateWithUsSection from '@/components/CelebrateWithUsSection';
import LocationSection from '@/components/LocationSection';
import GallerySection from '@/components/GallerySection';
import RsvpSection from '@/components/RsvpSection';
import GuestbookSection from '@/components/GuestbookSection';
import FooterSection from '@/components/FooterSection';
import AudioPlayer from '@/components/AudioPlayer';
import OpeningVideoModal from '@/components/OpeningVideoModal';

export default function WeddingInvitationPage() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [manualVideoOpen, setManualVideoOpen] = useState(false);

  const toggleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  const handleOpenFromVideo = () => {
    setIsAudioPlaying(true);
    setManualVideoOpen(false);
  };

  return (
    <main className="wedding-app-wrapper">
      {/* Opening Video on Mobile Arrival (Couple Waiting) */}
      <OpeningVideoModal onOpenInvitation={handleOpenFromVideo} />

      {/* Manual Opening Video Modal if Re-triggered */}
      {manualVideoOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999 }}>
          <OpeningVideoModal onOpenInvitation={handleOpenFromVideo} />
        </div>
      )}

      {/* Outer Card Gold Frame */}
      <div className="card-outer-border">
        <div className="card-inner-border">
          {/* Section 1: Hero Invitation Card */}
          <HeroSection onWatchVideo={() => setManualVideoOpen(true)} />

          {/* Section 1.5: Guest Welcome & Personalized Invitation Card */}
          <GuestWelcomeSection />

          {/* Section 2: Countdown Timer */}
          <CountdownSection />

          {/* Section 3: Our Story & Poruwa Ceremony */}
          <OurStorySection />

          {/* Section 4: Schedule / Celebrate With Us */}
          <CelebrateWithUsSection />

          {/* Section 5: Wedding Venue & Location (Google Maps + Add to Calendar) */}
          <LocationSection />

          {/* Section 6: Gallery / Our Moments */}
          <GallerySection />

          {/* Section 7: RSVP Form (Connected to PHP/MySQL) */}
          <RsvpSection />

          {/* Section 8: Guestbook Wishes & Blessings Wall */}
          <GuestbookSection />

          {/* Footer */}
          <FooterSection />
        </div>
      </div>

      {/* Floating Action RSVP Pill (matching the screenshot) */}
      <button 
        type="button"
        className="floating-rsvp-pill"
        onClick={() => {
          const rsvpEl = document.getElementById('rsvp');
          if (rsvpEl) {
            rsvpEl.scrollIntoView({ behavior: 'smooth' });
          } else {
            setShowRsvpModal(true);
          }
        }}
        aria-label="RSVP to wedding"
      >
        <span>RSVP Now</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>

      {/* Floating Audio Player Widget */}
      <AudioPlayer 
        isPlaying={isAudioPlaying}
        onToggle={toggleAudio}
      />

      {/* Quick RSVP Modal if triggered */}
      {showRsvpModal && (
        <div className="modal-overlay" onClick={() => setShowRsvpModal(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '500px' }}>
            <RsvpSection isModal={true} onClose={() => setShowRsvpModal(false)} />
          </div>
        </div>
      )}
    </main>
  );
}
