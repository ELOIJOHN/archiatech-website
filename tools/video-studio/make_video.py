#!/usr/bin/env python3
"""Studio vidéo ArchiAtech : fabrique une vidéo (diaporama + voix off + sous-titres + miniature) à partir d'un script JSON.

Usage : python3 make_video.py specs/ma-video.json [--voice piper|openai] [--out ./out]
Sorties (dossier out/<slug>/) : video.mp4, subtitles.srt, thumbnail.jpg, metadata.json
Conçu pour être léger : un seul processus, encodage x264 « veryfast », priorité basse, aucun modèle de transcription
(les sous-titres sont calculés à partir du texte et de la durée réelle de chaque voix).
"""
import argparse, base64, json, os, re, shutil, subprocess, sys, tempfile, time, urllib.request
from pathlib import Path

HERE = Path(__file__).resolve().parent
LOGO = HERE / "assets" / "logo-horizontal-white.png"
PIPER_MODEL = Path(os.environ.get("PIPER_MODEL", HERE / "models" / "fr_FR-siwis-medium.onnx"))
OPENAI_MODEL = os.environ.get("OPENAI_TTS_MODEL", "gpt-4o-mini-tts")
OPENAI_VOICE = os.environ.get("OPENAI_TTS_VOICE", "onyx")
W, H, FPS = 1920, 1080, 25

# Prononciation pour la synthèse vocale uniquement (les sous-titres gardent le texte d'origine).
PRONUNCIATION = [
    (r"archiatech\.com", "archi atèque point com"),
    (r"ArchiAtech", "Archi Atèque"),
    (r"\bAtech\b", "Atèque"),
    (r"RGPD", "R G P D"),
    (r"\bIA\b", "I A"),
    (r"\bn8n\b", "n huit n"),
    (r"\bIT\b", "I T"),
]


def sh(cmd, **kw):
    subprocess.run(cmd, check=True, **kw)


def speak_text(text):
    for pat, rep in PRONUNCIATION:
        text = re.sub(pat, rep, text)
    return text


def tts_piper(text, out_wav, model=None):
    model = HERE / "models" / f"{model}.onnx" if model else PIPER_MODEL
    if not model.exists():
        sys.exit(f"Modèle Piper introuvable : {model}")
    subprocess.run([sys.executable, "-m", "piper", "-m", str(model), "-f", str(out_wav)],
                   input=speak_text(text).encode(), check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def tts_openai(text, out_mp3, voice=None):
    key = os.environ.get("OPENAI_API_KEY")
    if not key:
        sys.exit("OPENAI_API_KEY absente : définissez-la dans l'environnement du worker.")
    body = json.dumps({"model": OPENAI_MODEL, "voice": voice or OPENAI_VOICE, "input": speak_text(text),
                       "instructions": "Voix posée et chaleureuse, français de France, rythme naturel, ton professionnel."}).encode()
    req = urllib.request.Request("https://api.openai.com/v1/audio/speech", data=body,
                                 headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=120) as r:
        Path(out_mp3).write_bytes(r.read())


def duration(path):
    out = subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)])
    return float(out.decode().strip())


CSS = """
*{box-sizing:border-box;margin:0;padding:0}
body{width:1920px;height:1080px;font-family:'Inter','DejaVu Sans',sans-serif;background:#fff;color:#111827;position:relative;overflow:hidden}
.band{position:absolute;left:0;top:0;width:100%;height:150px;background:linear-gradient(135deg,#F70D1A,#B8001C);display:flex;align-items:center;padding:0 96px}
.band img{height:78px}
.kicker{color:#F70D1A;font-weight:700;font-size:34px;letter-spacing:3px;text-transform:uppercase}
.main{position:absolute;left:96px;right:96px;top:230px;bottom:150px;display:flex;flex-direction:column;justify-content:center;gap:34px}
h1{font-size:96px;line-height:1.08;font-weight:800;letter-spacing:-2px}
h2{font-size:78px;line-height:1.12;font-weight:800;letter-spacing:-1px}
ul{list-style:none;display:flex;flex-direction:column;gap:22px;margin-top:10px}
li{font-size:52px;line-height:1.25;color:#374151;padding-left:56px;position:relative}
li:before{content:'';position:absolute;left:0;top:20px;width:22px;height:22px;border-radius:50%;background:#F70D1A}
.foot{position:absolute;left:0;bottom:0;width:100%;height:84px;background:#111827;color:#fff;display:flex;align-items:center;justify-content:space-between;padding:0 96px;font-size:30px}
.cta{background:#F70D1A;color:#fff;border-radius:24px;padding:28px 48px;font-size:56px;font-weight:800;display:inline-block;align-self:flex-start}
.avoid li:before{background:#111827}
"""


def slide_html(s, logo_b64, n, total, title):
    kicker = f'<div class="kicker">{s.get("kicker","")}</div>' if s.get("kicker") else ""
    head = f'<h1>{s["title"]}</h1>' if s.get("layout") in ("title", "cta") else f'<h2>{s["title"]}</h2>'
    bullets = "".join(f"<li>{b}</li>" for b in s.get("bullets", []))
    ul = f'<ul class="{s.get("style","")}">{bullets}</ul>' if bullets else ""
    cta = f'<div class="cta">{s["button"]}</div>' if s.get("button") else ""
    return (f"<html><head><meta charset='utf-8'><style>{CSS}</style></head><body>"
            f"<div class='band'><img src='data:image/png;base64,{logo_b64}'></div>"
            f"<div class='main'>{kicker}{head}{ul}{cta}</div>"
            f"<div class='foot'><span>www.archiatech.com</span><span>{n}/{total}</span></div></body></html>")


DLG_CSS = """
.cast{position:absolute;left:96px;right:96px;top:190px;height:560px;display:flex;justify-content:center;gap:120px}
.p{width:440px;text-align:center;opacity:.35;transform:scale(.92);filter:grayscale(.6)}
.p.on{opacity:1;transform:scale(1);filter:none}
.p img{width:360px;height:360px;object-fit:cover;border-radius:50%;border:10px solid #e5e7eb}
.p.on img{border-color:#F70D1A}
.p b{display:block;margin-top:18px;font-size:44px;color:#111827}
.p span{font-size:28px;color:#6b7280}
.say{position:absolute;left:96px;right:96px;top:790px;height:190px;display:flex;align-items:center;justify-content:center;text-align:center;font-size:48px;line-height:1.25;color:#111827;font-weight:600}
"""


def dialogue_html(s, spec, b64, n, total):
    cast = ""
    for key, sp in spec["speakers"].items():
        on = " on" if key == s["speaker"] else ""
        cast += (f"<div class='p{on}'><img src='data:image/jpeg;base64,{b64[key]}'><b>{sp['name']}</b><span>{sp.get('role','')}</span></div>")
    return (f"<html><head><meta charset='utf-8'><style>{CSS}{DLG_CSS}</style></head><body>"
            f"<div class='band'><img src='data:image/png;base64,{b64['_logo']}'></div>"
            f"<div class='cast'>{cast}</div><div class='say'>{s['text']}</div>"
            f"<div class='foot'><span>www.archiatech.com</span><span>Personnages générés par IA &nbsp;·&nbsp; {n}/{total}</span></div></body></html>")


def thumb_html(spec, logo_b64):
    t = spec.get("thumbnail_text") or spec["title"]
    return (f"<html><head><meta charset='utf-8'><style>{CSS}"
            "body{width:1280px;height:720px;background:linear-gradient(135deg,#F70D1A,#B8001C);color:#fff;display:flex;flex-direction:column;justify-content:center;padding:70px 80px;gap:30px}"
            "h1{font-size:120px;line-height:1.02;letter-spacing:-3px;max-width:1100px}"
            "img{height:70px;align-self:flex-start;margin-bottom:10px}.k{font-size:34px;font-weight:700;letter-spacing:3px;text-transform:uppercase;opacity:.9}"
            f"</style></head><body><img src='data:image/png;base64,{logo_b64}'><div class='k'>{spec.get('kicker','')}</div><h1>{t}</h1></body></html>")


def envelope(audio, n_frames):
    """Volume de la voix, image par image (0 à 1), pour animer le personnage qui parle."""
    import numpy as np
    raw = subprocess.check_output(["ffmpeg", "-loglevel", "error", "-i", str(audio), "-ac", "1", "-ar", "16000", "-f", "s16le", "-"])
    x = np.frombuffer(raw, dtype=np.int16).astype(np.float32) / 32768.0
    hop = 16000 / FPS
    env = np.array([np.sqrt(np.mean(x[int(i * hop):int((i + 1) * hop)] ** 2)) if int(i * hop) < len(x) else 0.0 for i in range(n_frames)])
    ref = np.percentile(env, 95) or 1.0
    env = np.clip(env / ref, 0, 1)
    sm = np.zeros_like(env)
    for i, v in enumerate(env):  # lissage : attaque rapide, retombée douce
        sm[i] = v if i == 0 else max(v, sm[i - 1] * 0.8)
    return sm


def animated_clip(base_png, tile_png, center, audio, dur, out):
    """Personnage qui parle : respiration, léger zoom et halo rouge qui suivent la voix."""
    import numpy as np
    from PIL import Image, ImageDraw, ImageFilter
    import math
    base = Image.open(base_png).convert("RGB")
    tile = Image.open(tile_png).convert("RGBA")
    n = int(round(dur * FPS))
    env = envelope(audio, n)
    cmd = ["nice", "-n", "10", "ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
           "-i", str(audio), "-af", "apad=pad_dur=0.5", "-t", f"{dur:.3f}", "-c:v", "libx264", "-preset", "veryfast", "-crf", "23",
           "-pix_fmt", "yuv420p", "-r", str(FPS), "-c:a", "aac", "-b:a", "128k", "-ar", "44100", "-ac", "2", str(out)]
    pr = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    cx, cy = center
    r0 = tile.width / 2
    for i in range(n):
        t = i / FPS
        a = float(env[i])
        frame = base.copy()
        # halo : un anneau rouge dont l'épaisseur suit la voix
        glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        g = ImageDraw.Draw(glow)
        rad = r0 + 8 + 26 * a
        g.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], outline=(247, 13, 26, int(70 + 150 * a)), width=int(6 + 10 * a))
        glow = glow.filter(ImageFilter.GaussianBlur(5 + 8 * a))
        frame.paste(glow, (0, 0), glow)
        # respiration + petit zoom quand la voix monte
        sc = 1.0 + 0.012 * (1 + math.sin(2 * math.pi * 0.35 * t)) / 2 + 0.03 * a
        size = int(round(tile.width * sc))
        tl = tile.resize((size, size), Image.LANCZOS)
        frame.paste(tl, (int(cx - size / 2), int(cy - size / 2 - 3 * a)), tl)
        pr.stdin.write(frame.tobytes())
    pr.stdin.close()
    pr.wait()


def split_sentences(text):
    parts = re.split(r"(?<=[.!?])\s+", text.strip())
    return [p for p in parts if p]


def srt_ts(t):
    ms = int(round(t * 1000))
    h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("spec")
    ap.add_argument("--voice", choices=["piper", "openai"], default=None)
    ap.add_argument("--out", default=str(HERE / "out"))
    a = ap.parse_args()
    spec = json.loads(Path(a.spec).read_text(encoding="utf-8"))
    voice = a.voice or spec.get("voice", "piper")
    slug = spec["slug"]
    out = Path(a.out) / slug
    out.mkdir(parents=True, exist_ok=True)
    t0 = time.time()
    logo_b64 = base64.b64encode(LOGO.read_bytes()).decode()
    work = Path(tempfile.mkdtemp(prefix=f"vid-{slug}-"))
    slides = spec["slides"]
    spk = spec.get("speakers", {})
    b64 = {"_logo": logo_b64}
    for k, v in spk.items():
        b64[k] = base64.b64encode((HERE / v["portrait"]).read_bytes()).decode()
    clips, srt, cursor, idx = [], [], 0.0, 1
    from playwright.sync_api import sync_playwright
    with sync_playwright() as p:
        browser = p.chromium.launch(args=["--no-sandbox"])
        page = browser.new_page(viewport={"width": W, "height": H})
        for i, s in enumerate(slides, 1):
            png = work / f"s{i}.png"
            if s.get("speaker"):
                s["narration"] = s["text"]
                page.set_content(dialogue_html(s, spec, b64, i, len(slides)))
            else:
                page.set_content(slide_html(s, logo_b64, i, len(slides), spec["title"]))
            page.wait_for_timeout(150)
            page.screenshot(path=str(png))
            tile = center = None
            if s.get("speaker") and spec.get("animate"):
                el = page.locator(".p.on img")
                bb = el.bounding_box()
                tile = work / f"t{i}.png"
                el.screenshot(path=str(tile), omit_background=True)
                center = (bb["x"] + bb["width"] / 2, bb["y"] + bb["height"] / 2)
            audio = work / (f"a{i}.wav" if voice == "piper" else f"a{i}.mp3")
            sp = spk.get(s.get("speaker"), {})
            if voice == "piper":
                tts_piper(s["narration"], audio, sp.get("piper_model"))
            else:
                tts_openai(s["narration"], audio, sp.get("openai_voice"))
            dur = duration(audio) + 0.5
            clip = work / f"c{i}.mp4"
            if tile is not None:
                animated_clip(png, tile, center, audio, dur, clip)
                clips.append(clip)
                sents = split_sentences(s["narration"]); total_chars = sum(len(x) for x in sents) or 1
                speech = dur - 0.5; c = cursor
                for x in sents:
                    d = speech * len(x) / total_chars
                    srt.append(f"{idx}\n{srt_ts(c)} --> {srt_ts(c + d)}\n{x}\n"); idx += 1; c += d
                cursor += dur
                continue
            sh(["nice", "-n", "10", "ffmpeg", "-y", "-loglevel", "error", "-loop", "1", "-framerate", str(FPS), "-i", str(png), "-i", str(audio),
                "-af", "apad=pad_dur=0.5", "-t", f"{dur:.3f}", "-c:v", "libx264", "-preset", "veryfast", "-crf", "23", "-tune", "stillimage",
                "-pix_fmt", "yuv420p", "-r", str(FPS), "-c:a", "aac", "-b:a", "128k", "-ar", "44100", "-ac", "2", str(clip)])
            clips.append(clip)
            sents = split_sentences(s["narration"])
            total_chars = sum(len(x) for x in sents) or 1
            speech = dur - 0.5
            c = cursor
            for x in sents:
                d = speech * len(x) / total_chars
                srt.append(f"{idx}\n{srt_ts(c)} --> {srt_ts(c + d)}\n{x}\n")
                idx += 1; c += d
            cursor += dur
        page.set_viewport_size({"width": 1280, "height": 720})
        page.set_content(thumb_html(spec, logo_b64)); page.wait_for_timeout(150)
        page.screenshot(path=str(out / "thumbnail.jpg"), type="jpeg", quality=90)
        browser.close()
    lst = work / "list.txt"
    lst.write_text("".join(f"file '{c}'\n" for c in clips))
    sh(["nice", "-n", "10", "ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", str(lst), "-c", "copy", "-movflags", "+faststart", str(out / "video.mp4")])
    (out / "subtitles.srt").write_text("\n".join(srt), encoding="utf-8")
    meta = {k: spec.get(k) for k in ("title", "description", "tags", "page_url")}
    meta.update({"slug": slug, "voice": voice, "duration_s": round(cursor, 1), "render_s": round(time.time() - t0, 1)})
    (out / "metadata.json").write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")
    shutil.rmtree(work, ignore_errors=True)
    print(json.dumps(meta, ensure_ascii=False))


if __name__ == "__main__":
    main()
