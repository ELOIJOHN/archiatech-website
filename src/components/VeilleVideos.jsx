import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { VEILLE_VIDEOS_API_URL } from '../config/videos';

// Vidéos d'autres chaînes : le lecteur YouTube (mode sans cookies) ne se charge qu'au clic.
export default function VeilleVideos() {
  const [activeId, setActiveId] = useState(null);
  const [veilleVideos, setVeilleVideos] = useState([]);

  // Vidéos récentes validées par ArchiAtech (agent de veille n8n) ; section masquée s'il n'y en a pas.
  useEffect(() => {
    let cancelled = false;
    fetch(VEILLE_VIDEOS_API_URL)
      .then((r) => (r.ok ? r.json() : { videos: [] }))
      .then((data) => {
        if (!cancelled && Array.isArray(data.videos)) setVeilleVideos(data.videos);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  if (veilleVideos.length === 0) return null;

  return (
    <section id="veille-videos" className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-[#F70D1A] font-semibold text-xs sm:text-sm uppercase tracking-wider">Veille</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 mb-3">Veille vidéo</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Une sélection de vidéos récentes d'autres chaînes, choisies pour leur intérêt sur l'IA, l'automatisation et le numérique.
            Ces contenus appartiennent à leurs auteurs.
          </p>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {veilleVideos.map((v) => (
            <li key={v.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="relative aspect-video bg-black">
                {activeId === v.id ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${v.id}?rel=0&autoplay=1`}
                    title={v.title}
                    allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveId(v.id)}
                    aria-label={`Lire la vidéo : ${v.title}`}
                    className="group absolute inset-0 w-full h-full"
                  >
                    <img src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`} alt="" loading="lazy" className="w-full h-full object-cover" />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                      <span className="w-14 h-14 rounded-full bg-[#F70D1A] flex items-center justify-center shadow-lg">
                        <Play className="w-6 h-6 text-white ml-0.5" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col gap-2">
                <h3 className="font-semibold text-gray-900 leading-snug">{v.title}</h3>
                {v.summary && <p className="text-sm text-gray-600 leading-relaxed">{v.summary}</p>}
                <p className="text-sm text-gray-500 mt-auto">
                  Source :{' '}
                  {v.authorUrl ? (
                    <a href={v.authorUrl} target="_blank" rel="noopener noreferrer" className="text-[#F70D1A] hover:underline">
                      {v.author}
                    </a>
                  ) : (
                    v.author
                  )}{' '}
                  sur YouTube
                </p>
              </div>
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-500 text-center mt-6">
          La lecture d'une vidéo charge le lecteur YouTube (mode sans cookies).
        </p>
      </div>
    </section>
  );
}
