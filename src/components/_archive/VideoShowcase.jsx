import React, { useState } from "react";

const videos = [
  { id: 1, title: "Support IT", file: "20251011_2138_SupportIT.mp4" },
  { id: 2, title: "Conseil & Intégration IA", file: "20251011_2242_Conseil_Intégration IA.mp4" },
  { id: 3, title: "Automatisation Workflows", file: "20251011_2259_Automatisation Workflows.mp4" },
  { id: 4, title: "No Code / Low Code", file: "20251011_2313_NoCode_LowCode.mp4" },
  { id: 5, title: "Formation & Accompagnement", file: "20251011_2323_Formation_Accompagnement.mp4" },
  { id: 6, title: "Transformation Digitale", file: "20251011_2325_Transformation Digital.mp4" },
];

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState(videos[0]);

  return (
    <div className="w-full min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center p-6 space-y-6">
      
      {/* 🎞️ Section principale */}
      <div className="w-full max-w-5xl relative rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
        <video
          key={activeVideo.file}
          src={`/videos/${activeVideo.file}`}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-[60vh] object-cover transition-all duration-700 ease-in-out"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6">
          <h2 className="text-2xl font-semibold">{activeVideo.title}</h2>
        </div>
      </div>

      {/* 🎛️ Boutons de sélection */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl">
        {videos.map((video) => (
          <button
            key={video.id}
            onClick={() => setActiveVideo(video)}
            className={`p-3 rounded-xl border text-sm md:text-base transition-all duration-300
              ${activeVideo.id === video.id
                ? "btn-archiatech scale-105"
                : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white hover:border-[#E60023]/40"}`}
          >
            🎬 {video.title}
          </button>
        ))}
      </div>

      {/* 🔁 Miniatures en boucle */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 w-full max-w-5xl mt-6">
        {videos.map((video) => (
          <div key={video.id} className="relative overflow-hidden rounded-lg border border-gray-800">
            <video
              src={`/videos/${video.file}`}
              autoPlay
              loop
              muted
              playsInline
              className={`object-cover w-full h-28 opacity-60 hover:opacity-100 transition-all duration-500
                ${activeVideo.id === video.id ? "ring-4 ring-orange-500 opacity-100" : ""}`}
            />
            <div className="absolute bottom-1 left-1 text-xs bg-black/60 px-2 py-1 rounded">{video.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}