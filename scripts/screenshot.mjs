import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';

const baseDir = path.resolve('dist');
const port = 5055;

fs.mkdirSync('screenshots', { recursive: true });

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.map': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  try {
    const cleanUrl = decodeURIComponent((req.url || '/').split('?')[0]);
    let filePath = path.join(baseDir, cleanUrl === '/' ? 'index.html' : cleanUrl.replace(/^\//, ''));
    filePath = path.normalize(filePath);
    if (!filePath.startsWith(baseDir)) {
      res.writeHead(403); res.end('Forbidden'); return;
    }
    if (!fs.existsSync(filePath)) {
      filePath = path.join(baseDir, 'index.html');
    }
    const ext = path.extname(filePath).toLowerCase();
    const mime = mimeTypes[ext] || 'application/octet-stream';
    fs.readFile(filePath, (err, data) => {
      if (err) { res.writeHead(500); res.end('Server Error'); return; }
      res.writeHead(200, { 'Content-Type': mime });
      res.end(data);
    });
  } catch (e) {
    res.writeHead(500); res.end('Server Error');
  }
});

await new Promise(resolve => server.listen(port, resolve));

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox','--disable-setuid-sandbox'] });
try {
  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle0', timeout: 60000 });

  // Desktop screenshot
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.waitForSelector('section');
  await page.screenshot({ path: 'screenshots/hero-desktop.png', fullPage: false });

  // Mobile screenshot
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'networkidle0' });
  await page.screenshot({ path: 'screenshots/hero-mobile.png', fullPage: false });
} finally {
  await browser.close();
  server.close();
}

console.log('Screenshots saved to screenshots/hero-desktop.png and screenshots/hero-mobile.png');