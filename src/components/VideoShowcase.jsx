import React, { useState, useRef } from "react";

const videos = [
  { id: 1, title: "Support IT", file: "20251011_2138_SupportIT.mp4" },
  { id: 2, title: "Conseil & Intégration IA", file: "20251011_2242_Conseil_Integration IA.mp4" },
  { id: 3, title: "Automatisation Workflows", file: "20251011_2259_Automatisation Workflows.mp4" },
  { id: 4, title: "No Code / Low Code", file: "20251011_2313_NoCode_LowCode.mp4" },
  { id: 5, title: "Formation & Accompagnement", file: "20251011_2323_Formation_Accompagnement.mp4" },
  { id: 6, title: "Transformation Digitale", file: "20251011_2325_Transformation Digital.mp4" },
];

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState(videos[0]);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="w-full bg-gray-950 text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      <style>
        {`
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

      {/* 🎞️ Section principale - Cadre Lumineux Spectaculaire */}
      <div className="w-full max-w-7xl video-container-spectacular">
        <video
          ref={videoRef}
          key={activeVideo.file}
          src={`${import.meta.env.BASE_URL}videos/${activeVideo.file}`}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full aspect-video object-contain bg-black transition-all duration-700 ease-in-out"
        />
        
        {/* Icône Rouge - Indicateur d'état */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '12px',
          height: '12px',
          backgroundColor: '#ff0000',
          borderRadius: '50%',
          zIndex: 10,
          boxShadow: '0 0 8px rgba(255, 0, 0, 0.6)',
          animation: 'pulse 2s infinite'
        }} />

        {/* Bouton Son - Coin inférieur droit */}
        <button
          onClick={toggleMute}
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            width: '50px',
            height: '50px',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            border: '2px solid #ffffff',
            borderRadius: '50%',
            color: '#ffffff',
            fontSize: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            zIndex: 10,
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

        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 sm:p-4 md:p-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">{activeVideo.title}</h2>
        </div>
      </div>

      {/* 🔁 Miniatures en boucle */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3 w-full max-w-7xl">
        {videos.map((video) => (
          <div
            key={video.id}
            onClick={() => setActiveVideo(video)}
            className="relative overflow-hidden rounded-md sm:rounded-lg border-2 border-[#E60023] cursor-pointer hover:border-[#E60023] transition-all shadow-[0_0_10px_rgba(230,0,35,0.3)] hover:shadow-[0_0_15px_rgba(230,0,35,0.5)]"
          >
            <video
              src={`${import.meta.env.BASE_URL}videos/${video.file}`}
              autoPlay
              loop
              muted
              playsInline
              className={`object-cover w-full aspect-video opacity-60 hover:opacity-100 transition-all duration-500
                ${activeVideo.id === video.id ? "ring-2 sm:ring-4 ring-[#E60023] opacity-100" : ""}`}
            />
            <div className="absolute bottom-0.5 left-0.5 sm:bottom-1 sm:left-1 text-[10px] sm:text-xs bg-black/70 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">{video.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}