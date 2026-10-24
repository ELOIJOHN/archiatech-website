// Configuration de la clé API YouTube
//
// La clé n'est JAMAIS écrite dans le code. Elle est lue depuis la variable
// d'environnement Vite VITE_YOUTUBE_API_KEY (voir .env.example).
//
// Sécurité : une variable VITE_* est embarquée dans le JavaScript public.
// La clé doit donc être restreinte dans Google Cloud Console :
//   - Restriction d'application : référents HTTP (https://www.archiatech.com/*)
//   - Restriction d'API : YouTube Data API v3 uniquement
//
// Chaîne YouTube : https://www.youtube.com/@ArchiatechMedia
// ID de chaîne   : UCtwJ6pMNI5QndQGeJWwkvYA

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || '';

export default YOUTUBE_API_KEY;
