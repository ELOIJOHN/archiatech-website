"""Génère les images de partage (1200x630) par page dans public/images/og/.
Usage : python3 scripts/generate-og.py   (nécessite playwright + node ; à relancer si les titres changent)"""
import base64, json, pathlib, subprocess
from playwright.sync_api import sync_playwright

root = pathlib.Path(__file__).resolve().parent.parent
data = json.loads(subprocess.check_output(['node', '-e', """
import('./src/data/site-pages.js').then(m=>console.log(JSON.stringify(m.pages.filter(p=>['service','about','contact'].includes(p.type)).map(p=>({path:p.path,h1:p.h1,summary:p.summary})))))
"""], cwd=root))
logo = base64.b64encode((root/'public/images/logo-horizontal-white.png').read_bytes()).decode()
out = root/'public/images/og'; out.mkdir(parents=True, exist_ok=True)
tpl = """<html><body style="margin:0;width:1200px;height:630px;background:linear-gradient(135deg,#E60023 0%,#B8001C 100%);font-family:Inter,'DejaVu Sans',sans-serif;color:#fff;display:flex;flex-direction:column;justify-content:space-between;padding:64px 72px;box-sizing:border-box">
<img src="data:image/png;base64,@LOGO@" style="height:72px;width:auto;align-self:flex-start">
<div><div style="font-size:@SIZE@px;font-weight:800;line-height:1.1;letter-spacing:-1px">@H1@</div>
<div style="font-size:30px;line-height:1.4;margin-top:24px;opacity:.92;max-width:980px">@SUM@</div></div>
<div style="font-size:26px;font-weight:600;opacity:.9">www.archiatech.com &nbsp;·&nbsp; IA souveraine · Automatisation · Support IT</div></body></html>"""
esc = lambda s: s.replace('&','&amp;').replace('<','&lt;')
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width':1200,'height':630})
    for d in data:
        slug = d['path'].strip('/').split('/')[-1]
        size = 64 if len(d['h1']) < 40 else 54
        summ = d['summary'].split('. ')[0].rstrip('.') + '.'
        pg.set_content(tpl.replace('@LOGO@',logo).replace('@SIZE@',str(size)).replace('@H1@',esc(d['h1'])).replace('@SUM@',esc(summ)))
        pg.screenshot(path=str(out/f'{slug}.jpg'), type='jpeg', quality=88)
        print('ok', slug)
    b.close()
