import test from 'node:test';
import assert from 'node:assert/strict';
import https from 'node:https';
import http from 'node:http';
import { readFile, mkdir } from 'node:fs/promises';
import puppeteer from 'puppeteer';
const origin = 'https://localhost:18443';
const ca = await readFile(new URL('./.certs/cert.pem', import.meta.url));
const valid = JSON.stringify({ messages: [{ role: 'user', content: 'Bonjour 🎾' }] });
function request({ path = '/api/archiagent', method = 'POST', body = valid, headers = {}, tls = {}, plain = false } = {}) {
  return new Promise((resolve, reject) => {
    const req = (plain ? http : https).request({ hostname: 'localhost', port: plain ? 18080 : 18443, path, method, ca, ...tls,
      headers: { Origin: origin, 'Content-Type': 'application/json', ...headers } }, res => {
      let data = ''; res.setEncoding('utf8'); res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, data }));
    });
    req.setTimeout(25000, () => req.destroy(new Error('test timeout')));
    req.on('error', reject); req.end(body);
  });
}
test('isolated browser → HTTPS nginx → real backend → simulated provider', async t => {
  const browser = await puppeteer.launch({
    executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true, acceptInsecureCerts: true,
  });
  t.after(() => browser.close());
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  let stall = false;
  page.on('request', r => {
    if (stall && r.url() === origin + '/api/archiagent') return;
    return r.resourceType() !== 'media' && (r.url().startsWith(origin + '/') || r.url().startsWith('data:')) ? r.continue() : r.abort();
  });
  await page.goto(origin, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('[aria-label="Ouvrir le chat avec Archi"]');
  await page.click('[aria-label="Ouvrir le chat avec Archi"]');
  const input = 'input[placeholder="Tapez votre message..."]';
  await page.waitForSelector(input);
  const send = async message => {
    await page.waitForFunction(sel => !document.querySelector(sel).disabled, {}, input);
    await page.type(input, message);
    await page.click('[aria-label="Envoyer le message"]');
    await page.waitForFunction(sel => !document.querySelector(sel).disabled, { timeout: 30000 }, input);
  };
  await t.test('visible reply traverses complete stack; input enforces 2000 characters', async () => {
    await send('Bonjour');
    assert.ok(await page.evaluate(() => document.body.innerText.includes('Test isolé reçu : Bonjour')));
    assert.equal(await page.$eval(input, el => el.maxLength), 2000);
  });
  await t.test('provider failure is visibly unavailable rather than a fabricated success', async () => {
    await send('TEST_PROVIDER_FAILURE');
    assert.ok(await page.evaluate(() => document.body.innerText.includes('Le service est momentanément indisponible.')));
    assert.equal(await page.evaluate(() => document.body.innerText.includes('private provider failure')), false);
  });
  await t.test('HTML returned through provider renders as text', async () => {
    await send('<img src=x onerror=alert(1)>');
    assert.ok(await page.evaluate(() => document.body.innerText.includes('Test isolé reçu : <img src=x onerror=alert(1)>')));
    assert.equal(await page.$('img[src="x"]'), null);
  });
  await t.test('stalled browser request times out and restores input', async () => {
    stall = true;
    const started = Date.now();
    await send('Test délai');
    assert.ok(Date.now() - started >= 19000);
    assert.ok(await page.evaluate(() => document.body.innerText.includes('Le service est momentanément indisponible.')));
  });
  await mkdir(new URL('./results/', import.meta.url), { recursive: true });
  await page.screenshot({ path: new URL('./results/chat.png', import.meta.url).pathname });
});
test('HTTP redirects to fixed HTTPS authority, even with forged Host', async () => {
  const r = await request({ plain: true, headers: { Host: 'attacker.example' } });
  assert.equal(r.status, 308); assert.equal(r.headers.location, origin + '/api/archiagent');
});
test('TLS 1.2 and 1.3 work; obsolete TLS 1.1 is rejected', async () => {
  for (const version of ['TLSv1.2', 'TLSv1.3']) {
    assert.equal((await request({ method: 'GET', path: '/', body: '', tls: { minVersion: version, maxVersion: version } })).status, 200);
  }
  await assert.rejects(request({ tls: { minVersion: 'TLSv1.1', maxVersion: 'TLSv1.1' } }));
});
test('exact CORS allowlist, methods, routes and error security headers', async () => {
  for (const value of ['', 'null', origin + '.evil', 'https://attacker.example']) {
    const r = await request({ headers: { Origin: value } });
    assert.equal(r.status, 403); assert.equal(r.headers['access-control-allow-origin'], undefined);
    assert.equal(r.headers['strict-transport-security'], 'max-age=86400');
    assert.equal(r.headers['x-content-type-options'], 'nosniff');
  }
  assert.equal((await request({ method: 'GET', body: '' })).status, 405);
  assert.equal((await request({ path: '/api/unknown' })).status, 404);
  const r = await request({ method: 'OPTIONS', body: '', headers: { 'Access-Control-Request-Method': 'POST', 'Access-Control-Request-Headers': 'content-type' } });
  assert.equal(r.status, 204); assert.equal(r.headers['access-control-allow-origin'], origin);
  assert.equal(r.headers['access-control-allow-headers'], 'Content-Type');
  assert.equal(r.headers['access-control-allow-credentials'], undefined);
});
test('proxy rejects oversized body and backend rejects compressed/non-JSON content', async () => {
  assert.equal((await request({ body: 'a'.repeat(17000), headers: { 'Content-Length': '17000' } })).status, 413);
  assert.equal((await request({ headers: { 'Content-Encoding': 'gzip' } })).status, 415);
  assert.equal((await request({ headers: { 'Content-Type': 'text/plain' } })).status, 415);
});
test('request burst is bounded despite forged forwarding headers; 429 remains CORS readable', async () => {
  const responses = [];
  for (let i = 0; i < 20; i++) responses.push(await request({ headers: { 'X-Forwarded-For': `192.0.2.${i}`, 'X-Real-IP': `192.0.2.${i}`, Forwarded: `for=192.0.2.${i}` } }));
  assert.ok(responses.some(r => r.status === 200));
  assert.ok(responses.filter(r => r.status === 429).length >= 8);
  const r = responses.find(r => r.status === 429);
  assert.equal(r.headers['access-control-allow-origin'], origin);
  assert.equal(r.headers['retry-after'], '60');
  assert.equal(r.headers['cache-control'], 'no-store');
});
