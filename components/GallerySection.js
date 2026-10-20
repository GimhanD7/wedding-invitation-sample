'use client';

import { useState } from 'react';

export default function GallerySection() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const photos = [
    {
      src: '/images/gallery-beach.jpg',
      alt: 'Nimesh & Dilhani at Sri Lankan golden hour beach',
      caption: 'Sunset smiles along the southern coastline'
    },
    {
      src: '/images/gallery-1.jpg',
      alt: 'Pre-wedding photoshoot candid moments',
      caption: 'A tender glance that started it all'
    },
    {
      src: '/images/gallery-2.jpg',
      alt: 'Romantic coastal breeze memories',
      caption: 'Adventures and memories by the ocean'
    },
    {
      src: '/images/gallery-3.jpg',
      alt: 'Lush greenery and tropical nature',
      caption: 'Surrounded by the green tranquility of Kandy'
    },
    {
      src: '/images/gallery-4.jpg',
      alt: 'Rustic warmth and laughter',
      caption: 'Every moment filled with joy and laughter'
    },
    {
      src: '/images/gallery-5.jpg',
      alt: 'Serene lakeside embrace',
      caption: 'Counting the days until forever begins'
    }
  ];

  const openLightbox = (index) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = (e) => {
    e.stopPropagation();
    setSelectedPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <section id="gallery" className="traditional-lattice-bg" style={{ padding: '38px 16px 44px', textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-serif-royal)', fontSize: '0.82rem', letterSpacing: '4px', color: 'var(--color-gold)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>
        G A L L E R Y
      </div>

      <h2 style={{ fontFamily: 'var(--font-serif-classic)', fontSize: '2.1rem', color: '#24160e', fontWeight: 400, marginBottom: '8px', letterSpacing: '0.5px' }}>
        Our Moments
      </h2>

      {/* Heart ornament motif matching screenshot */}
      <div className="ornament-diamond-divider" style={{ margin: '8px 0 24px' }}>
        <div className="ornament-line"></div>
        <div style={{ color: 'var(--color-gold)', fontSize: '1rem', lineHeight: 1 }}>❤</div>
        <div className="ornament-line"></div>
      </div>

      {/* 6 Photos Grid */}
      <div className="gallery-grid">
        {photos.map((item, idx) => (
          <div 
            key={idx} 
            className="gallery-thumb"
            onClick={() => openLightbox(idx)}
            role="button"
            tabIndex={0}
            aria-label={`View photo ${idx + 1}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={item.src} 
              alt={item.alt}
              loading="lazy"
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '6px 8px',
              background: 'linear-gradient(transparent, rgba(20, 12, 7, 0.75))',
              color: '#ffffff',
              fontSize: '0.72rem',
              fontStyle: 'italic',
              textAlign: 'center',
              textShadow: '0 1px 3px rgba(0,0,0,0.8)'
            }}>
              Tap to view
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <div className="modal-overlay" onClick={closeLightbox}>
          <div 
            style={{ position: 'relative', maxWidth: '640px', width: '92%', textAlign: 'center' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeLightbox}
              style={{
                position: 'absolute',
                top: '-42px',
                right: '0',
                background: 'rgba(255, 255, 255, 0.25)',
                border: 'none',
                color: '#ffffff',
                fontSize: '1.4rem',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>

            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: '2px solid var(--color-gold)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
              background: '#000'
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={photos[selectedPhotoIndex].src} 
                alt={photos[selectedPhotoIndex].alt}
                style={{ width: '100%', maxHeight: '72vh', objectFit: 'contain', display: 'block' }}
              />
            </div>

            <p style={{
              color: 'var(--color-gold-light)',
              fontFamily: 'var(--font-serif-classic)',
              fontStyle: 'italic',
              marginTop: '12px',
              fontSize: '1rem'
            }}>
              {photos[selectedPhotoIndex].caption}
            </p>

            {/* Navigation arrows */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px' }}>
              <button
                type="button"
                onClick={prevPhoto}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  border: '1px solid var(--color-gold)',
                  borderRadius: '20px',
                  padding: '6px 16px',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                ← Previous
              </button>
              <span style={{ color: '#aaa', fontSize: '0.85rem', alignSelf: 'center' }}>
                {selectedPhotoIndex + 1} / {photos.length}
              </span>
              <button
                type="button"
                onClick={nextPhoto}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  border: '1px solid var(--color-gold)',
                  borderRadius: '20px',
                  padding: '6px 16px',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
