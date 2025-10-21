import React, { useState } from 'react';
import SimpleVideoPlayer from './SimpleVideoPlayer';

export default function VideoSection() {
  const [selectedVideo, setSelectedVideo] = useState(0);

  const videoThumbnails = [
    {
      id: 0,
      title: "Support IT",
      description: "Grâce à ArchiAtech, notre IT est fluide. Nos équipes peuvent enfin travailler sereinement.",
      thumbnail: "👨‍💼",
      category: "Support IT"
    },
    {
      id: 1,
      title: "Conseil & Intégration IA",
      description: "Découvrez comment l'IA transforme votre entreprise",
      thumbnail: "👥",
      category: "IA"
    },
    {
      id: 2,
      title: "Automatisation Workflows",
      description: "Optimisez vos processus métier",
      thumbnail: "👩‍💻",
      category: "Automatisation"
    },
    {
      id: 3,
      title: "No Code / Low Code",
      description: "Développez sans coder",
      thumbnail: "👨‍💻",
      category: "No Code"
    },
    {
      id: 4,
      title: "Formation & Accompagnement",
      description: "Formez vos équipes aux nouvelles technologies",
      thumbnail: "👩‍🏫",
      category: "Formation"
    },
    {
      id: 5,
      title: "Transformation Digitale",
      description: "Transformez votre entreprise",
      thumbnail: "🔵",
      category: "Digital"
    }
  ];

  return (
    <section style={{
      background: '#000000',
      padding: '4rem 0',
      minHeight: '100vh'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        {/* Titre de la section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#ffffff',
            marginBottom: '1rem',
            lineHeight: 1.2
          }}>
            Découvrez nos solutions
          </h2>
          <p style={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '1.125rem',
            color: '#b0b0b0',
            lineHeight: 1.6,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Regardez nos démonstrations vidéo et découvrez comment ArchiAtech peut transformer votre entreprise
          </p>
        </div>

        {/* Lecteur vidéo principal */}
        <div style={{ marginBottom: '2rem' }}>
          <SimpleVideoPlayer />
        </div>

        {/* Miniatures des vidéos */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          {videoThumbnails.map((video, index) => (
            <div
              key={video.id}
              onClick={() => setSelectedVideo(video.id)}
              style={{
                background: selectedVideo === video.id ? '#e34040' : '#1a1a1a',
                borderRadius: '8px',
                padding: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: selectedVideo === video.id ? '2px solid #e34040' : '2px solid #E60023',
                boxShadow: selectedVideo === video.id ? '0 0 15px rgba(227, 64, 64, 0.6)' : '0 0 10px rgba(230, 0, 35, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                if (selectedVideo !== video.id) {
                  e.target.style.background = '#2a2a2a';
                  e.target.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedVideo !== video.id) {
                  e.target.style.background = '#1a1a1a';
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              {/* Icône de lecture */}
              <div style={{
                position: 'absolute',
                top: '8px',
                left: '8px',
                background: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px'
              }}>
                ▶️
              </div>

              {/* Thumbnail */}
              <div style={{
                width: '100%',
                height: '100px',
                background: '#333',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                marginBottom: '0.75rem',
                backgroundImage: `linear-gradient(135deg, #333 0%, #555 100%)`
              }}>
                {video.thumbnail}
              </div>

              {/* Titre */}
              <h3 style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: selectedVideo === video.id ? '#ffffff' : '#ffffff',
                marginBottom: '0.5rem',
                lineHeight: 1.3
              }}>
                {video.title}
              </h3>

              {/* Catégorie */}
              <div style={{
                fontSize: '0.75rem',
                color: selectedVideo === video.id ? '#ffffff' : '#b0b0b0',
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {video.category}
              </div>

              {/* Indicateur de sélection */}
              {selectedVideo === video.id && (
                <div style={{
                  position: 'absolute',
                  bottom: '8px',
                  right: '8px',
                  width: '8px',
                  height: '8px',
                  background: '#ffffff',
                  borderRadius: '50%'
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Description de la vidéo sélectionnée */}
        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
          padding: '1.5rem',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <p style={{
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '1rem',
            color: '#ffffff',
            lineHeight: 1.6,
            margin: 0
          }}>
            {videoThumbnails[selectedVideo].description}
          </p>
        </div>
      </div>
    </section>
  );
}