import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';

const port = 18787;
const base = 'http://127.0.0.1:' + port + '/api/archiagent';
const allowed = 'https://www.archiatech.com';
const child = spawn(process.execPath, ['backend/archiagent-server.mjs'], {
  env: { ...process.env, PORT: String(port), OPENAI_API_KEY: '', ALLOWED_ORIGINS: allowed },
  stdio: 'ignore',
});

async function ready() {
  for (let i = 0; i < 40; i++) {
    try { await fetch(base); return; } catch { await delay(100); }
  }
  throw new Error('Test server did not start');
}

try {
  await ready();
  await test('rejects untrusted Origin', async () => {
    const r = await fetch(base, { method: 'POST', headers: { Origin: 'https://attacker.example' }, body: '{}' });
    assert.equal(r.status, 403);
    assert.equal(r.headers.get('access-control-allow-origin'), null);
  });
  await test('rejects missing Origin', async () => {
    const r = await fetch(base, { method: 'POST', body: '{}' });
    assert.equal(r.status, 403);
  });
  await test('accepts allowed CORS preflight', async () => {
    const r = await fetch(base, { method: 'OPTIONS', headers: { Origin: allowed, 'Access-Control-Request-Method': 'POST' } });
    assert.equal(r.status, 204);
    assert.equal(r.headers.get('access-control-allow-origin'), allowed);
  });
  await test('rejects GET', async () => {
    const r = await fetch(base, { headers: { Origin: allowed } });
    assert.equal(r.status, 405);
  });
  await test('does not call provider without a server-side key', async () => {
    const r = await fetch(base, { method: 'POST', headers: { Origin: allowed, 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'user', content: 'Bonjour' }] }) });
    assert.equal(r.status, 503);
  });
} finally {
  child.kill();
}
