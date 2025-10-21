import React, { useState } from 'react';

export default function SimpleVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    alert(`Vidéo ${isPlaying ? 'en pause' : 'en lecture'} !`);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    alert(`Son ${isMuted ? 'activé' : 'coupé'} !`);
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  return (
    <div className="video-container-spectacular" style={{
      background: '#000000',
      borderRadius: '16px',
      overflow: 'visible',
      position: 'relative',
      maxWidth: '800px',
      margin: '0 auto',
      zIndex: 10,
      // Styles inline pour garantir la visibilité
      border: '4px solid #E60023',
      boxShadow: '0 0 20px rgba(230, 0, 35, 0.7), 0 0 40px rgba(230, 0, 35, 0.5), 0 0 80px rgba(230, 0, 35, 0.3), 0 15px 50px rgba(0, 0, 0, 0.4)',
      animation: 'glow-pulse 2.5s ease-in-out infinite'
    }}>
      <style>
        {`
          @keyframes pulse {
            0% { 
              opacity: 1; 
              transform: scale(1);
            }
            50% { 
              opacity: 0.7; 
              transform: scale(1.1);
            }
            100% { 
              opacity: 1; 
              transform: scale(1);
            }
          }
          
          @keyframes glow-pulse {
            0% { 
              box-shadow: 
                0 0 20px rgba(230, 0, 35, 0.7),
                0 0 40px rgba(230, 0, 35, 0.5),
                0 0 80px rgba(230, 0, 35, 0.3),
                0 15px 50px rgba(0, 0, 0, 0.4);
              transform: scale(1);
            }
            50% { 
              box-shadow: 
                0 0 30px rgba(230, 0, 35, 1.2),
                0 0 60px rgba(230, 0, 35, 0.8),
                0 0 120px rgba(230, 0, 35, 0.5),
                0 15px 50px rgba(0, 0, 0, 0.6);
              transform: scale(1.02);
            }
            100% { 
              box-shadow: 
                0 0 20px rgba(230, 0, 35, 0.7),
                0 0 40px rgba(230, 0, 35, 0.5),
                0 0 80px rgba(230, 0, 35, 0.3),
                0 15px 50px rgba(0, 0, 0, 0.4);
              transform: scale(1);
            }
          }
          
          .video-container-spectacular {
            border: 4px solid #E60023;
            border-radius: 16px;
            position: relative;
            overflow: visible;
            z-index: 10;
            backdrop-filter: blur(2px);
            transition: all 0.3s ease;
            animation: glow-pulse 2.5s ease-in-out infinite;
          }
          
          .video-container-spectacular::before {
            content: '';
            position: absolute;
            top: -8px;
            left: -8px;
            right: -8px;
            bottom: -8px;
            border: 2px solid rgba(255, 0, 0, 0.6);
            border-radius: 20px;
            z-index: -1;
          }
          
          .video-container-spectacular::after {
            content: '';
            position: absolute;
            top: -12px;
            left: -12px;
            right: -12px;
            bottom: -12px;
            border: 1px solid rgba(255, 0, 0, 0.3);
            border-radius: 24px;
            z-index: -2;
          }
          
          .video-container-spectacular:hover {
            transform: scale(1.02);
            box-shadow: 
              0 0 30px rgba(230, 0, 35, 1.2),
              0 0 60px rgba(230, 0, 35, 0.8),
              0 0 120px rgba(230, 0, 35, 0.5),
              0 15px 50px rgba(0, 0, 0, 0.6);
          }
        `}
      </style>
      {/* Zone vidéo */}
      <div style={{
        width: '100%',
        height: '450px',
        background: 'linear-gradient(135deg, #111 0%, #333 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        {/* Logo Sora */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '8px 12px',
          borderRadius: '6px',
          fontWeight: 'bold',
          color: '#000',
          fontSize: '14px',
          zIndex: 10
        }}>
          Sora
        </div>

        {/* Icône Rouge - Indicateur d'état */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '12px',
          height: '12px',
          backgroundColor: '#ff0000',
          borderRadius: '50%',
          zIndex: 20,
          boxShadow: '0 0 8px rgba(255, 0, 0, 0.6)',
          animation: 'pulse 2s infinite'
        }} />

        {/* Bouton Play/Pause central - TRÈS VISIBLE */}
        <button
          onClick={togglePlay}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '4px solid #ffffff',
            background: '#e34040',
            color: 'white',
            fontSize: '40px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 30px rgba(227, 64, 64, 0.8), 0 0 0 4px rgba(255, 255, 255, 0.3)',
            zIndex: 20,
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.background = '#ff0000';
            e.target.style.boxShadow = '0 10px 40px rgba(227, 64, 64, 1), 0 0 0 6px rgba(255, 255, 255, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.background = '#e34040';
            e.target.style.boxShadow = '0 8px 30px rgba(227, 64, 64, 0.8), 0 0 0 4px rgba(255, 255, 255, 0.3)';
          }}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>

        {/* Sous-titres */}
        <div style={{
          position: 'absolute',
          bottom: '80px',
          left: '20px',
          right: '20px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '16px 20px',
          borderRadius: '8px',
          fontSize: '18px',
          lineHeight: '1.4',
          zIndex: 10
        }}>
          Grâce à ArchiAtech, notre IT est fluide. Nos équipes peuvent enfin travailler sereinement.
        </div>

        {/* Label Support IT */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          background: 'rgba(255, 255, 255, 0.9)',
          color: '#000',
          padding: '8px 16px',
          borderRadius: '6px',
          fontSize: '14px',
          fontWeight: '600',
          zIndex: 10
        }}>
          Support IT
        </div>

        {/* Bouton Son - Coin inférieur droit */}
        <button
          onClick={toggleMute}
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            width: '50px',
            height: '50px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            border: '2px solid #ffffff',
            borderRadius: '50%',
            color: '#ffffff',
            fontSize: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            zIndex: 20,
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            e.target.style.transform = 'scale(1.1)';
            e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.7)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.5)';
          }}
        >
          {isMuted ? '🔇' : '🔊'}
        </button>
      </div>

      {/* Barre de contrôles - ULTRA VISIBLE */}
      <div style={{
        background: '#000000',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        borderTop: '3px solid #e34040'
      }}>
        {/* Bouton Play/Pause */}
        <button
          onClick={togglePlay}
          style={{
            background: '#e34040',
            border: '3px solid #ffffff',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '12px 20px',
            borderRadius: '10px',
            transition: 'all 0.2s ease',
            fontWeight: 'bold',
            minWidth: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(227, 64, 64, 0.6)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#ff0000';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = '#e34040';
            e.target.style.transform = 'scale(1)';
          }}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>

        {/* Barre de progression */}
        <div style={{
          flex: 1,
          height: '8px',
          background: '#333',
          borderRadius: '4px',
          cursor: 'pointer',
          position: 'relative',
          border: '2px solid #555'
        }}>
          <div style={{
            height: '100%',
            background: '#e34040',
            borderRadius: '4px',
            width: '30%',
            boxShadow: '0 0 10px rgba(227, 64, 64, 0.5)'
          }} />
        </div>

        {/* Temps */}
        <div style={{
          color: '#e34040',
          fontSize: '16px',
          fontFamily: 'monospace',
          minWidth: '100px',
          textAlign: 'center',
          fontWeight: 'bold',
          background: 'rgba(227, 64, 64, 0.2)',
          padding: '8px 12px',
          borderRadius: '6px',
          border: '2px solid #e34040'
        }}>
          1:23 / 3:45
        </div>

        {/* Contrôle du volume */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button
            onClick={toggleMute}
            style={{
              background: '#e34040',
              border: '3px solid #ffffff',
              color: '#ffffff',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '12px',
              borderRadius: '10px',
              transition: 'all 0.2s ease',
              minWidth: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              boxShadow: '0 6px 20px rgba(227, 64, 64, 0.6)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#ff0000';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#e34040';
              e.target.style.transform = 'scale(1)';
            }}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            style={{
              width: '100px',
              height: '8px',
              background: '#333',
              outline: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              border: '2px solid #e34040'
            }}
          />
        </div>
      </div>
    </div>
  );
}
