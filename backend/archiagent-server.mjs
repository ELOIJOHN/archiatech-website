// Node.js 20+. Provider secrets stay server-side. No deployment on import.
import http from 'node:http';
import { pathToFileURL } from 'node:url';

const prompt = 'Tu es Archi, assistant du site ArchIAtech. Réponds en français, avec concision et précision. Présente les services IA, automatisation, infrastructure et support IT. Ne promets pas de résultats chiffrés non vérifiés. Pour les devis, oriente vers le formulaire de contact.';
const object = value => value !== null && typeof value === 'object' && !Array.isArray(value);
export function createArchiAgentServer({
  apiKey = process.env.OPENAI_API_KEY,
  model = process.env.OPENAI_MODEL || 'gpt-4o-mini',
  allowedOrigins = (process.env.ALLOWED_ORIGINS || 'https://www.archiatech.com').split(',').map(s => s.trim()).filter(Boolean),
  fetchImpl = globalThis.fetch,
  now = Date.now,
  upstreamTimeoutMs = 15000,
  bodyTimeoutMs = 10000,
  rateLimit = 12,
  rateWindowMs = 60000,
  maxClients = 10000,
  maxConcurrent = 8,
} = {}) {
  const origins = new Set(allowedOrigins);
  const rate = new Map();
  let active = 0;
  const server = http.createServer(async (req, res) => {
    const origin = req.headers.origin;
    function reply(status, data, extra = {}) {
      if (res.destroyed || res.writableEnded) return;
      res.writeHead(status, {
        'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff', Vary: 'Origin',
        ...(origins.has(origin) ? { 'Access-Control-Allow-Origin': origin } : {}), ...extra,
      });
      res.end(data === null ? undefined : JSON.stringify(data));
    }
    const reject = (status, error, extra = {}) => {
      // Do not continue accepting an unbounded or slow rejected body.
      req.resume();
      reply(status, { error }, { Connection: 'close', ...extra });
    };
    if (req.url !== '/api/archiagent') return reject(404, 'Not found');
    if (!origin || !origins.has(origin)) return reject(403, 'Origin forbidden');
    if (req.method === 'OPTIONS') return reply(204, null, {
      'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type',
    });
    if (req.method !== 'POST') return reject(405, 'Method not allowed', { Allow: 'POST, OPTIONS' });
    if (!apiKey) return reject(503, 'Service not configured');
    // Intentionally ignore Forwarded/X-Forwarded-For: only the socket peer is trusted.
    const ip = req.socket.remoteAddress || 'unknown';
    const time = now();
    for (const [key, entry] of rate) if (time >= entry.reset) rate.delete(key);
    let entry = rate.get(ip);
    if (!entry) {
      if (rate.size >= maxClients) return reject(429, 'Rate limit', { 'Retry-After': String(Math.ceil(rateWindowMs / 1000)) });
      entry = { count: 0, reset: time + rateWindowMs };
      rate.set(ip, entry);
    }
    if (entry.count >= rateLimit) return reject(429, 'Rate limit', { 'Retry-After': String(Math.max(1, Math.ceil((entry.reset - time) / 1000))) });
    entry.count++;
    if (!/^application\/json(?:\s*;|\s*$)/i.test(req.headers['content-type'] || '') ||
        (req.headers['content-encoding'] && req.headers['content-encoding'] !== 'identity')) return reject(415, 'Expected uncompressed JSON');
    if (Number(req.headers['content-length']) > 16384) return reject(413, 'Request too large');
    if (active >= maxConcurrent) return reject(503, 'Service busy');
    active++;
    const controller = new AbortController();
    const disconnected = () => { if (!res.writableEnded) controller.abort(); };
    res.on('close', disconnected);
    let timer;
    try {
      let bytes = 0;
      const chunks = [];
      let bodyExpired = false;
      timer = setTimeout(() => { bodyExpired = true; reject(408, 'Request timeout'); req.destroy(); }, bodyTimeoutMs);
      let payload;
      try {
        for await (const chunk of req) {
          bytes += chunk.length;
          if (bytes > 16384) return reject(413, 'Request too large');
          chunks.push(chunk);
        }
        // Decode after concatenation, including UTF-8 code points split across chunks.
        payload = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(Buffer.concat(chunks)));
      } catch {
        if (!bodyExpired) reject(400, 'Invalid JSON');
        return;
      } finally { clearTimeout(timer); }
      if (!object(payload) || !Array.isArray(payload.messages) || payload.messages.length < 1 || payload.messages.length > 20 ||
          !payload.messages.every(m => object(m) && ['user', 'assistant'].includes(m.role) && typeof m.content === 'string' && m.content.trim().length > 0 && m.content.length <= 2000) ||
          payload.messages.at(-1).role !== 'user') return reject(400, 'Invalid messages');
      let expired = false;
      timer = setTimeout(() => { expired = true; controller.abort(); }, upstreamTimeoutMs);
      try {
        const upstream = await fetchImpl('https://api.openai.com/v1/chat/completions', {
          method: 'POST', redirect: 'error',
          headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
          body: JSON.stringify({ model, messages: [{ role: 'system', content: prompt }, ...payload.messages.map(({ role, content }) => ({ role, content }))], max_tokens: 400 }),
          signal: controller.signal,
        });
        if (!upstream.ok) { await upstream.body?.cancel(); return reply(502, { error: 'AI provider unavailable' }); }
        // Bound provider response memory as well as response time.
        const reader = upstream.body?.getReader();
        if (!reader) return reply(502, { error: 'Invalid AI response' });
        const parts = [];
        let size = 0;
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            size += value.length;
            if (size > 65536) { await reader.cancel(); return reply(502, { error: 'Invalid AI response' }); }
            parts.push(value);
          }
        } finally { reader.releaseLock(); }
        const data = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(Buffer.concat(parts)));
        const answer = data?.choices?.[0]?.message?.content;
        if (typeof answer !== 'string' || !answer.trim() || answer.length > 16000) return reply(502, { error: 'Invalid AI response' });
        reply(200, { reply: answer });
      } catch {
        reply(expired ? 504 : 502, { error: expired ? 'AI provider timeout' : 'AI provider unavailable' });
      }
    } finally {
      clearTimeout(timer);
      res.off('close', disconnected);
      active--;
    }
  });
  server.headersTimeout = 10000;
  server.requestTimeout = 20000;
  server.keepAliveTimeout = 5000;
  server.maxRequestsPerSocket = 100;
  return server;
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const port = Number(process.env.PORT || 8787);
  createArchiAgentServer().listen(port, '127.0.0.1', () => console.log('ArchiAgent API listening on localhost:' + port));
}
