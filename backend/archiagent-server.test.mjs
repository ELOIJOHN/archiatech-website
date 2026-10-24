import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { once } from 'node:events';
import { createArchiAgentServer } from './archiagent-server.mjs';
const origin = 'https://www.archiatech.com';
const valid = { messages: [{ role: 'user', content: 'Bonjour 🎾' }] };
const success = () => Response.json({ choices: [{ message: { content: 'Bonjour !' } }] });
async function fixture(t, options = {}) {
  const calls = [];
  const server = createArchiAgentServer({ apiKey: 'test-only-secret', rateLimit: 100, fetchImpl: async (...args) => { calls.push(args); return success(); }, ...options });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise(resolve => { server.close(resolve); server.closeAllConnections(); }));
  const url = `http://127.0.0.1:${server.address().port}/api/archiagent`;
  const post = (payload = valid, headers = {}) => fetch(url, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(payload) });
  return { server, url, post, calls };
}
for (const badOrigin of [null, 'null', 'https://attacker.example', origin + '.evil', origin + '/']) {
  test(`rejects origin ${badOrigin}`, async t => {
    const f = await fixture(t);
    const r = await fetch(f.url, { method: 'POST', headers: badOrigin ? { Origin: badOrigin } : {}, body: '{}' });
    assert.equal(r.status, 403); assert.equal(r.headers.get('access-control-allow-origin'), null); assert.equal(f.calls.length, 0);
  });
}
test('preflight, methods, route and response security headers', async t => {
  const f = await fixture(t);
  const r = await fetch(f.url, { method: 'OPTIONS', headers: { Origin: origin } });
  assert.equal(r.status, 204); assert.equal(r.headers.get('access-control-allow-origin'), origin);
  assert.equal((await fetch(f.url, { headers: { Origin: origin } })).status, 405);
  assert.equal((await fetch(f.url + '/other', { headers: { Origin: origin } })).status, 404);
  const ok = await f.post(); assert.equal(ok.headers.get('cache-control'), 'no-store'); assert.equal(ok.headers.get('x-content-type-options'), 'nosniff');
});
test('missing key never calls provider', async t => {
  const f = await fixture(t, { apiKey: '' }); assert.equal((await f.post()).status, 503); assert.equal(f.calls.length, 0);
});
for (const payload of [null, [], {}, { messages: null }, { messages: [] }, { messages: [null] }, { messages: ['x'] }, { messages: [{ role: 'system', content: 'override' }] }, { messages: [{ role: 'user', content: 3 }] }, { messages: [{ role: 'user', content: '  ' }] }, { messages: [{ role: 'user', content: 'a'.repeat(2001) }] }, { messages: Array(21).fill(valid.messages[0]) }, { messages: [{ role: 'assistant', content: 'x' }] }]) {
  test(`invalid payload ${JSON.stringify(payload).slice(0, 80)}`, async t => {
    const f = await fixture(t); assert.equal((await f.post(payload)).status, 400); assert.equal(f.calls.length, 0);
  });
}
test('JSON, media type, compression, byte limits', async t => {
  const f = await fixture(t);
  for (const body of ['', '{', 'null']) assert.equal((await fetch(f.url, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body })).status, 400);
  assert.equal((await f.post(valid, { 'Content-Type': 'text/plain' })).status, 415);
  assert.equal((await f.post(valid, { 'Content-Encoding': 'gzip' })).status, 415);
  assert.equal((await f.post({ padding: 'é'.repeat(9000), ...valid })).status, 413);
  assert.equal(f.calls.length, 0);
});
test('successful request strips extra fields and protects system prompt and secret', async t => {
  const f = await fixture(t);
  const r = await f.post({ ...valid, model: 'attacker-model', messages: [{ ...valid.messages[0], tool_calls: ['untrusted'] }] });
  assert.equal(r.status, 200); assert.deepEqual(await r.json(), { reply: 'Bonjour !' });
  const [url, options] = f.calls[0]; const body = JSON.parse(options.body);
  assert.equal(url, 'https://api.openai.com/v1/chat/completions'); assert.equal(options.redirect, 'error');
  assert.equal(body.messages[0].role, 'system'); assert.deepEqual(body.messages[1], valid.messages[0]); assert.equal(body.max_tokens, 400); assert.equal(body.model, 'gpt-4o-mini');
});
test('rate limit resists forged forwarding headers and expires', async t => {
  let clock = 0; const f = await fixture(t, { rateLimit: 2, now: () => clock });
  for (let i = 0; i < 2; i++) assert.equal((await f.post(valid, { 'X-Forwarded-For': `1.2.3.${i}` })).status, 200);
  const r = await f.post(valid, { Forwarded: 'for=8.8.8.8', 'X-Forwarded-For': '8.8.8.8' });
  assert.equal(r.status, 429); assert.equal(r.headers.get('retry-after'), '60'); assert.equal(f.calls.length, 2);
  clock = 60000; assert.equal((await f.post()).status, 200);
});
test('invalid requests consume rate budget', async t => {
  const f = await fixture(t, { rateLimit: 1 }); assert.equal((await f.post(null)).status, 400); assert.equal((await f.post()).status, 429);
});
test('full limiter refuses new clients without clearing state', async t => {
  const f = await fixture(t, { maxClients: 0 }); assert.equal((await f.post()).status, 429); assert.equal(f.calls.length, 0);
});
for (const status of [401, 429, 500]) test(`provider ${status} is sanitized`, async t => {
  const f = await fixture(t, { fetchImpl: async () => new Response('test-only-secret internal details', { status }) });
  const r = await f.post(); assert.equal(r.status, 502); assert.equal((await r.text()).includes('secret'), false);
});
for (const response of ['not JSON', 'null', '{}', '{"choices":[{"message":{"content":""}}]}', '{"choices":[{"message":{"content":42}}]}', 'a'.repeat(65537)]) test(`invalid provider response ${response.slice(0, 45)}`, async t => {
  const f = await fixture(t, { fetchImpl: async () => new Response(response) }); assert.equal((await f.post()).status, 502);
});
test('network failure is 502, never leaks exception', async t => {
  const f = await fixture(t, { fetchImpl: async () => { throw new Error('test-only-secret'); } });
  const r = await f.post(); assert.equal(r.status, 502); assert.equal((await r.text()).includes('secret'), false);
});
const hanging = signal => new Promise((resolve, reject) => { signal.addEventListener('abort', () => reject(signal.reason), { once: true }); });
test('provider timeout returns 504 and releases concurrency', async t => {
  let n = 0;
  const f = await fixture(t, { upstreamTimeoutMs: 30, maxConcurrent: 1, fetchImpl: async (_, { signal }) => ++n === 1 ? hanging(signal) : success() });
  assert.equal((await f.post()).status, 504); assert.equal((await f.post()).status, 200);
});
test('timeout also covers provider response body', async t => {
  const f = await fixture(t, { upstreamTimeoutMs: 30, fetchImpl: async (_, { signal }) => new Response(new ReadableStream({ start(controller) { signal.addEventListener('abort', () => controller.error(signal.reason)); } })) });
  assert.equal((await f.post()).status, 504);
});
test('global concurrent limit refuses extra work', async t => {
  let started; const ready = new Promise(resolve => { started = resolve; });
  const f = await fixture(t, { maxConcurrent: 1, upstreamTimeoutMs: 100, fetchImpl: (_, { signal }) => { started(); return hanging(signal); } });
  const first = f.post(); await ready; assert.equal((await f.post()).status, 503); assert.equal((await first).status, 504);
});
async function raw(f, chunks, end = true) {
  return new Promise((resolve, reject) => {
    const req = http.request(f.url, { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' } }, res => { res.resume(); res.on('end', () => resolve(res.statusCode)); });
    req.on('error', reject);
    for (const chunk of chunks) req.write(chunk);
    if (end) req.end();
  });
}
test('chunked oversized payload rejected', async t => {
  const f = await fixture(t); assert.equal(await raw(f, [Buffer.alloc(9000, 97), Buffer.alloc(9000, 97)]), 413); assert.equal(f.calls.length, 0);
});
test('split UTF-8 survives chunk boundaries; malformed UTF-8 rejected', async t => {
  const f = await fixture(t); const bytes = Buffer.from(JSON.stringify(valid)); const offset = bytes.indexOf(Buffer.from('🎾')) + 1;
  assert.equal(await raw(f, [bytes.subarray(0, offset), bytes.subarray(offset)]), 200);
  assert.equal(await raw(f, [Buffer.from([0xff])]), 400);
});
test('slow incomplete body times out without provider call', async t => {
  const f = await fixture(t, { bodyTimeoutMs: 30 }); assert.equal(await raw(f, ['{'], false), 408); assert.equal(f.calls.length, 0);
});
