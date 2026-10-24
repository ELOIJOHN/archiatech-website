import test from 'node:test';
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import { EventEmitter } from 'node:events';
import { createPreviewServer, previewConfig } from './render/preview-server.mjs';
const origin = 'https://preview-example.onrender.com';
const token = 'test-access-code-0123456789-abcdef';
const env = { RENDER_EXTERNAL_URL: origin, PREVIEW_ACCESS_TOKEN: token, OPENAI_API_KEY: 'fake-provider-key' };
const valid = { messages: [{ role: 'user', content: 'Bonjour' }] };
function fixture(options = {}) {
  const calls = [];
  const server = createPreviewServer(previewConfig(env), { fetchImpl: async (url, options) => {
    calls.push({ url, options });
    return Response.json({ choices: [{ message: { content: '<b>Bonjour</b>' } }] });
  }, ...options });
  // Exercise the real request listeners without opening a socket. The CI also runs network/E2E suites.
  function request({ path = '/api/archiagent', method = 'POST', authorization = 'Bearer ' + token, requestOrigin = origin, body = valid, peer = '127.0.0.1', extra = {} } = {}) {
    return new Promise(resolve => {
      const req = Readable.from([Buffer.from(JSON.stringify(body))]);
      Object.assign(req, { url: path, method, socket: { remoteAddress: peer }, headers: { origin: requestOrigin, authorization, 'content-type': 'application/json', ...extra } });
      const res = new EventEmitter();
      const headers = {};
      Object.assign(res, {
        writableEnded: false, destroyed: false,
        setHeader: (key, value) => { headers[key.toLowerCase()] = value; },
        writeHead: (status, values) => { res.status = status; for (const [k, v] of Object.entries(values)) headers[k.toLowerCase()] = v; },
        end: content => { res.writableEnded = true; resolve({ status: res.status, headers, body: content?.toString() || '' }); },
      });
      server.emit('request', req, res);
    });
  }
  return { request, calls };
}
test('preview startup fails closed on missing secrets, unsafe origin or invalid port', () => {
  for (const override of [
    { OPENAI_API_KEY: '' }, { PREVIEW_ACCESS_TOKEN: '' }, { PREVIEW_ACCESS_TOKEN: 'short' },
    { RENDER_EXTERNAL_URL: '' }, { RENDER_EXTERNAL_URL: 'http://example.com' },
    { RENDER_EXTERNAL_URL: 'https://user:pass@example.com' }, { RENDER_EXTERNAL_URL: origin + '/path' },
    { RENDER_EXTERNAL_URL: origin + '?query=1' }, { PORT: '0' }, { PORT: 'NaN' }, { PORT: '65536' },
  ]) assert.throws(() => previewConfig({ ...env, ...override }));
  assert.equal(previewConfig(env).port, 10000);
  assert.equal(previewConfig({ ...env, PORT: '12345' }).port, 12345);
});
test('public preview assets never embed access token or provider key', async () => {
  const f = fixture();
  for (const path of ['/', '/preview.js']) {
    const r = await f.request({ path, method: 'GET', authorization: null });
    assert.equal(r.status, 200);
    assert.equal(r.body.includes(token), false); assert.equal(r.body.includes(env.OPENAI_API_KEY), false);
    assert.equal(r.headers['cache-control'], 'no-store');
    assert.match(r.headers['content-security-policy'], /frame-ancestors 'none'/);
    assert.equal(r.headers['x-robots-tag'], 'noindex, nofollow');
  }
  assert.equal(f.calls.length, 0);
});
test('health check reveals no configuration and makes no provider request', async () => {
  const f = fixture();
  const r = await f.request({ path: '/healthz', method: 'GET', authorization: null, requestOrigin: undefined });
  assert.equal(r.status, 200); assert.equal(r.body, 'ok'); assert.equal(f.calls.length, 0);
});
test('missing, incorrect, or forged access credentials never reach provider', async () => {
  const f = fixture();
  for (const authorization of [null, '', 'Bearer wrong', 'Basic ' + token, 'Bearer ' + token + ' ']) {
    const r = await f.request({ authorization, extra: { 'x-real-ip': '192.0.2.1', 'x-forwarded-for': '192.0.2.1' } });
    assert.equal(r.status, 401);
  }
  assert.equal(f.calls.length, 0);
});
test('valid access code does not bypass origin restriction, including production site', async () => {
  const f = fixture();
  for (const requestOrigin of ['', 'https://www.archiatech.com', origin + '.evil']) {
    assert.equal((await f.request({ requestOrigin })).status, 403);
  }
  assert.equal(f.calls.length, 0);
});
test('authenticated request uses actual backend contract and server-side provider key', async () => {
  const f = fixture();
  const r = await f.request();
  assert.equal(r.status, 200); assert.deepEqual(JSON.parse(r.body), { reply: '<b>Bonjour</b>' });
  assert.equal(f.calls[0].url, 'https://api.openai.com/v1/chat/completions');
  assert.equal(f.calls[0].options.headers.Authorization, 'Bearer ' + env.OPENAI_API_KEY);
  assert.equal(JSON.parse(f.calls[0].options.body).messages[0].role, 'system');
});
test('preview global quota stops distributed clients and forged headers', async () => {
  const f = fixture();
  for (let i = 1; i <= 12; i++) assert.equal((await f.request({ peer: `192.0.2.${i}` })).status, 200);
  const r = await f.request({ peer: '192.0.2.99', extra: { 'x-real-ip': '192.0.2.100' } });
  assert.equal(r.status, 429); assert.equal(f.calls.length, 12); assert.equal(r.headers['retry-after'], '60');
  assert.equal((await f.request({ path: '/healthz', method: 'GET' })).status, 200);
});
test('provider errors stay sanitized in preview', async () => {
  const f = fixture({ fetchImpl: async () => new Response('fake-provider-key', { status: 401 }) });
  const r = await f.request(); assert.equal(r.status, 502); assert.equal(r.body.includes(env.OPENAI_API_KEY), false);
});
test('unknown routes and methods cannot expose source files or health details', async () => {
  const f = fixture();
  for (const path of ['/render.yaml', '/.env', '/healthz?debug=true', '/../archiagent-server.mjs']) {
    assert.equal((await f.request({ path, method: 'GET' })).status, 404);
  }
  assert.equal((await f.request({ path: '/healthz' })).status, 404);
});
