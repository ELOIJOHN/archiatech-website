import React, { useState, useEffect } from "react";
import { VIDEOS_API_URL } from '../config/videos';

// Liste de secours : affichée si l'API n'est pas joignable. La liste réelle se gère dans n8n
// (table videos_site_archiatech) : voir le rapport dans Obsidian.
const FALLBACK_VIDEOS = [
  { type: "file", title: "Support IT", file: "20251011_2138_SupportIT.mp4" },
  { type: "file", title: "Conseil & Intégration IA", file: "20251011_2242_Conseil_Integration IA.mp4" },
  { type: "file", title: "Automatisation Workflows", file: "20251011_2259_Automatisation Workflows.mp4" },
  { type: "file", title: "No Code / Low Code", file: "20251011_2313_NoCode_LowCode.mp4" },
  { type: "file", title: "Formation & Accompagnement", file: "20251011_2323_Formation_Accompagnement.mp4" },
  { type: "file", title: "Transformation Digitale", file: "20251011_2325_Transformation Digital.mp4" },
].map((v, i) => ({ ...v, key: `demo-${i}` }));

// Image d'aperçu : une photo par vidéo, pour ne rien télécharger avant le clic.
const posterOf = (v) =>
  v.type === "youtube"
    ? `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`
    : encodeURI(`${import.meta.env.BASE_URL}videos/posters/${String(v.file || "").replace(/\.(mp4|webm)$/i, ".jpg")}`);

const videoKey = (v, i) => (v.type === "youtube" ? `yt-${v.id}` : `file-${v.file || i}`);
const isValid = (v) =>
  v && typeof v.title === "string" &&
  ((v.type === "file" && /^[\w .()&-]+\.(mp4|webm)$/i.test(v.file || "")) ||
    (v.type === "youtube" && /^[\w-]{11}$/.test(v.id || "")));

export default function VideoShowcase() {
  const [videos, setVideos] = useState(FALLBACK_VIDEOS);
  const [activeVideo, setActiveVideo] = useState(FALLBACK_VIDEOS[0]);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(VIDEOS_API_URL)
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((data) => {
        const list = (Array.isArray(data?.videos) ? data.videos : []).filter(isValid).map((v, i) => ({ ...v, key: videoKey(v, i) }));
        if (!cancelled && list.length > 0) {
          setVideos(list);
          setActiveVideo(list[0]);
        }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="w-full bg-gray-950 text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
      <style>
        {`
          @keyframes glow-pulse {
            0% { 
              box-shadow: 
                0 0 20px rgba(247,13,26, 0.7),
                0 0 40px rgba(247,13,26, 0.5),
                0 0 80px rgba(247,13,26, 0.3),
                0 15px 50px rgba(0, 0, 0, 0.4);
              transform: scale(1);
            }
            50% { 
              box-shadow: 
                0 0 30px rgba(247,13,26, 1.2),
                0 0 60px rgba(247,13,26, 0.8),
                0 0 120px rgba(247,13,26, 0.5),
                0 15px 50px rgba(0, 0, 0, 0.6);
              transform: scale(1.02);
            }
            100% { 
              box-shadow: 
                0 0 20px rgba(247,13,26, 0.7),
                0 0 40px rgba(247,13,26, 0.5),
                0 0 80px rgba(247,13,26, 0.3),
                0 15px 50px rgba(0, 0, 0, 0.4);
              transform: scale(1);
            }
          }
          
          .video-container-spectacular {
            border: 4px solid #F70D1A;
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
              0 0 30px rgba(247,13,26, 1.2),
              0 0 60px rgba(247,13,26, 0.8),
              0 0 120px rgba(247,13,26, 0.5),
              0 15px 50px rgba(0, 0, 0, 0.6);
          }
        `}
      </style>

      {/* 🎞️ Section principale - Cadre Lumineux Spectaculaire */}
      <div className="w-full max-w-7xl video-container-spectacular">
        {!playing ? (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Lire la vidéo : ${activeVideo.title}`}
            className="group relative block w-full aspect-video overflow-hidden rounded-[12px] bg-black"
          >
            <img src={posterOf(activeVideo)} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10" aria-hidden="true" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 sm:h-20 sm:w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#F70D1A] shadow-lg transition-transform group-hover:scale-110" aria-hidden="true">
              <svg viewBox="0 0 24 24" className="h-8 w-8 sm:h-10 sm:w-10 fill-white ml-1"><path d="M8 5v14l11-7z" /></svg>
            </span>
          </button>
        ) : activeVideo.type === "youtube" ? (
          <iframe
            key={activeVideo.key}
            src={`https://www.youtube-nocookie.com/embed/${activeVideo.id}?rel=0&autoplay=1`}
            title={activeVideo.title}
            allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="w-full aspect-video bg-black rounded-[12px]"
          />
        ) : (
          <video
            key={activeVideo.key}
            src={`${import.meta.env.BASE_URL}videos/${activeVideo.file}`}
            autoPlay
            controls
            playsInline
            preload="auto"
            className="w-full aspect-video object-contain bg-black rounded-[12px]"
          />
        )}

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

        <div className={`${playing || activeVideo.type === "youtube" ? "hidden" : ""} pointer-events-none absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 sm:p-4 md:p-6`}>
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">{activeVideo.title}</h3>
        </div>
      </div>
      {activeVideo.type === "youtube" && (
        <h3 className="w-full max-w-7xl text-lg sm:text-xl font-semibold">{activeVideo.title}</h3>
      )}

      {/* Miniatures : une image par vidéo, la vidéo ne se charge qu'au clic */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3 w-full max-w-7xl">
        {videos.map((video) => (
          <button
            type="button"
            key={video.key}
            onClick={() => { setActiveVideo(video); setPlaying(true); }}
            aria-label={`Lire : ${video.title}`}
            aria-current={activeVideo.key === video.key}
            className={`relative overflow-hidden rounded-md sm:rounded-lg border-2 border-[#F70D1A] cursor-pointer transition-all shadow-[0_0_10px_rgba(247,13,26,0.3)] hover:shadow-[0_0_15px_rgba(247,13,26,0.5)] ${activeVideo.key === video.key ? "ring-2 sm:ring-4 ring-[#F70D1A]" : ""}`}
          >
            <img
              src={posterOf(video)}
              alt=""
              loading="lazy"
              className={`object-cover w-full aspect-video transition-opacity duration-300 ${activeVideo.key === video.key ? "opacity-100" : "opacity-70 hover:opacity-100"}`}
            />
            {video.type === "youtube" && (
              <span className="absolute top-1 right-1 text-[10px] bg-[#F70D1A] px-1.5 py-0.5 rounded">YouTube</span>
            )}
            <div className="absolute bottom-0.5 left-0.5 sm:bottom-1 sm:left-1 text-[10px] sm:text-xs bg-black/70 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-left">{video.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
