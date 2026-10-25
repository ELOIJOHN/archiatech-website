# Studio vidéo ArchiAtech
`python3 make_video.py specs/<slug>.json [--voice piper|openai] [--out dossier]` → video.mp4, subtitles.srt, thumbnail.jpg, metadata.json.
Voix : Piper (gratuit, local) par défaut ; OpenAI si `OPENAI_API_KEY` est défini dans l'environnement du worker.
Docker : `docker build -t video-worker .` puis `docker run --rm --cpus 2 --memory 3g -v /srv/video/out:/out video-worker /studio/specs/x.json --out /out`.
