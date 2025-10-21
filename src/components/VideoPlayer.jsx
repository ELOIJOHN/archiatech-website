import React, { useState, useRef } from 'react';

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      background: '#000000',
      borderRadius: '12px',
      overflow: 'hidden',
      position: 'relative',
      maxWidth: '800px',
      margin: '0 auto',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
    }}>
      {/* Vidéo principale */}
      <div style={{ position: 'relative', width: '100%', height: '450px' }}>
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#111',
          backgroundImage: 'linear-gradient(135deg, #111 0%, #333 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px',
          color: '#666',
          position: 'relative'
        }}>
          <div style={{
            textAlign: 'center',
            color: '#999'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '1rem' }}>🎬</div>
            <div style={{ fontSize: '18px' }}>Vidéo de démonstration ArchiAtech</div>
            <div style={{ fontSize: '14px', marginTop: '0.5rem', color: '#666' }}>
              Cliquez sur les contrôles pour interagir
            </div>
          </div>
        </div>

      {/* Overlay de contrôle au centre - toujours visible */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 2
      }}>
        <button
          onClick={togglePlay}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '3px solid #ffffff',
            background: '#e34040',
            color: 'white',
            fontSize: '32px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            boxShadow: '0 6px 25px rgba(227, 64, 64, 0.6), 0 0 0 2px rgba(255, 255, 255, 0.2)',
            opacity: 1,
            zIndex: 20
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.background = 'rgba(227, 64, 64, 1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.background = 'rgba(227, 64, 64, 0.9)';
          }}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>
      </div>

        {/* Logo en haut à gauche */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 2,
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '8px 12px',
          borderRadius: '6px',
          fontWeight: 'bold',
          color: '#000',
          fontSize: '14px'
        }}>
          ArchiAtech
        </div>

        {/* Sous-titres en bas */}
        <div style={{
          position: 'absolute',
          bottom: '60px',
          left: '20px',
          right: '20px',
          zIndex: 2,
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '12px 16px',
          borderRadius: '6px',
          fontSize: '16px',
          lineHeight: '1.4'
        }}>
          Grâce à ArchiAtech, notre IT est fluide. Nos équipes peuvent enfin travailler sereinement.
        </div>

        {/* Label en bas à gauche */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          zIndex: 2,
          background: 'rgba(255, 255, 255, 0.9)',
          color: '#000',
          padding: '6px 12px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '500'
        }}>
          Support IT
        </div>
      </div>

      {/* Barre de contrôles en bas - toujours visible */}
      <div style={{
        background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 100%)',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 15,
        borderTop: '2px solid rgba(227, 64, 64, 0.3)',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Bouton Play/Pause */}
        <button
          onClick={togglePlay}
          style={{
            background: '#e34040',
            border: '2px solid #ffffff',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '10px 16px',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
            fontWeight: 'bold',
            minWidth: '50px',
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(227, 64, 64, 0.4)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(227, 64, 64, 1)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(227, 64, 64, 0.8)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>

        {/* Barre de progression */}
        <div style={{
          flex: 1,
          height: '4px',
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '2px',
          cursor: 'pointer',
          position: 'relative'
        }} onClick={handleSeek}>
          <div style={{
            height: '100%',
            background: '#e34040',
            borderRadius: '2px',
            width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
            transition: 'width 0.1s ease'
          }} />
        </div>

        {/* Temps */}
        <div style={{
          color: 'white',
          fontSize: '12px',
          fontFamily: 'monospace',
          minWidth: '80px',
          textAlign: 'center'
        }}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

        {/* Contrôle du volume */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={toggleMute}
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              border: '2px solid #ffffff',
              color: '#000',
              fontSize: '18px',
              cursor: 'pointer',
              padding: '10px',
              borderRadius: '8px',
              transition: 'all 0.2s ease',
              minWidth: '50px',
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
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
              width: '80px',
              height: '6px',
              background: 'rgba(255, 255, 255, 0.3)',
              outline: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
              appearance: 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
}
