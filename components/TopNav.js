'use client';

export default function TopNav({ currentSection, totalSections, onNavigate, isAudioPlaying, onToggleAudio }) {
  return (
    <nav className="top-nav-bar" aria-label="Main Navigation">
      {/* Left Back Arrow Button */}
      <button 
        type="button" 
        className="nav-icon-btn" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Return to Top"
        aria-label="Return to top of page"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      {/* Center Diamond Ornament matching Screenshot 1 */}
      <div className="ornament-diamond-divider" style={{ width: 'auto', margin: '0 10px', flex: 1, maxWidth: '160px' }}>
        <div className="ornament-line"></div>
        <div className="ornament-diamond"></div>
        <div className="ornament-line"></div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Page / Section Indicator Pill matching Screenshot 1 */}
        <div className="page-indicator-pill">
          <button 
            type="button" 
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: 'inherit', padding: '2px' }}
            onClick={() => onNavigate('prev')}
            title="Previous Section"
            aria-label="Previous Section"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <span style={{ fontFamily: 'var(--font-sans)', letterSpacing: '1px', fontSize: '0.85rem' }}>
            {currentSection} / {totalSections}
          </span>

          <button 
            type="button" 
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', color: 'inherit', padding: '2px' }}
            onClick={() => onNavigate('next')}
            title="Next Section"
            aria-label="Next Section"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {/* Music Button */}
        <button 
          type="button" 
          className={`nav-icon-btn ${isAudioPlaying ? 'active-audio' : ''}`}
          onClick={onToggleAudio}
          title={isAudioPlaying ? "Mute Traditional Music" : "Play Traditional Music"}
          aria-label="Toggle background music"
          style={{ width: '34px', height: '34px' }}
        >
          {isAudioPlaying ? (
            <div className="music-wave">
              <div className="music-bar"></div>
              <div className="music-bar"></div>
              <div className="music-bar"></div>
            </div>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}
