import React, { useState } from "react";
import { Play, X } from "lucide-react";

const serviceVideos = {
  "Support IT": "20251011_2138_SupportIT.mp4",
  "Conseil & Intégration IA": "20251011_2242_Conseil_Intégration IA.mp4",
  "Automatisation Workflows": "20251011_2259_Automatisation Workflows.mp4",
  "No Code / Low Code": "20251011_2313_NoCode_LowCode.mp4",
  "Formation & Accompagnement": "20251011_2323_Formation_Accompagnement.mp4",
  "Transformation Digitale": "20251011_2325_Transformation Digital.mp4",
};

export default function ServiceVideoButton({ serviceTitle, className = "" }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoFile = serviceVideos[serviceTitle];

  if (!videoFile) return null;

  return (
    <>
      <button
        onClick={() => setIsVideoOpen(true)}
        className={`btn-archiatech btn-archiatech-sm ${className}`}
      >
        <Play className="w-4 h-4" />
        Voir la vidéo
      </button>

      {/* Modal vidéo */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            {/* Bouton fermer */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 btn-archiatech-ghost rounded-full"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Vidéo */}
            <video
              src={`/videos/${videoFile}`}
              autoPlay
              controls
              className="w-full h-auto"
            />

            {/* Titre */}
            <div className="p-6 bg-gray-800">
              <h3 className="text-xl font-bold text-white">{serviceTitle}</h3>
              <p className="text-gray-300 mt-2">
                Découvrez nos solutions {serviceTitle.toLowerCase()}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
