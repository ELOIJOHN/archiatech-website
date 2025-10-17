import React, { useState } from "react";

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

  return (
    <div className="w-full bg-gray-950 text-white flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">

      {/* 🎞️ Section principale */}
      <div className="w-full max-w-7xl relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
        <video
          key={activeVideo.file}
          src={`${import.meta.env.BASE_URL}videos/${activeVideo.file}`}
          autoPlay
          loop
          muted
          playsInline
          className="w-full aspect-video object-contain bg-black transition-all duration-700 ease-in-out"
        />
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
            className="relative overflow-hidden rounded-md sm:rounded-lg border border-gray-800 cursor-pointer hover:border-[#E60023]/50 transition-all"
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