FROM mcr.microsoft.com/playwright/python:v1.48.0-jammy
RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg curl fonts-dejavu fonts-inter && rm -rf /var/lib/apt/lists/*
RUN pip install --no-cache-dir piper-tts==1.2.0 playwright==1.48.0
WORKDIR /studio
RUN mkdir -p models && \
    curl -fsSL -o models/fr_FR-siwis-medium.onnx https://huggingface.co/rhasspy/piper-voices/resolve/main/fr/fr_FR/siwis/medium/fr_FR-siwis-medium.onnx && \
    curl -fsSL -o models/fr_FR-siwis-medium.onnx.json https://huggingface.co/rhasspy/piper-voices/resolve/main/fr/fr_FR/siwis/medium/fr_FR-siwis-medium.onnx.json
COPY make_video.py ./
COPY assets ./assets
COPY specs ./specs
ENTRYPOINT ["python3", "make_video.py"]
