// Standalone ArchiAgent API. Node.js 20+; no external dependencies.
// Run behind HTTPS reverse proxy; never expose provider secrets to the frontend.
import http from 'node:http';

const port = Number(process.env.PORT || 8787);
const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const allowedOrigins = new Set((process.env.ALLOWED_ORIGINS || 'https://www.archiatech.com').split(',').map(s => s.trim()).filter(Boolean));
const rate = new Map();
const prompt = 'Tu es Archi, assistant du site ArchIAtech. Réponds en français, avec concision et précision. Présente les services IA, automatisation, infrastructure et support IT. Ne promets pas de résultats chiffrés non vérifiés. Pour les devis, oriente vers le formulaire de contact.';

function reply(res, status, data, origin) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Vary': 'Origin',
    ...(origin && allowedOrigins.has(origin) ? { 'Access-Control-Allow-Origin': origin } : {}),
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin;
  if (req.url !== '/api/archiagent') return reply(res, 404, { error: 'Not found' }, origin);
  if (!origin || !allowedOrigins.has(origin)) return reply(res, 403, { error: 'Origin forbidden' });
  if (req.method === 'OPTIONS') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Vary': 'Origin' });
    return res.end();
  }
  if (req.method !== 'POST') return reply(res, 405, { error: 'Method not allowed' }, origin);
  if (!apiKey) return reply(res, 503, { error: 'Service not configured' }, origin);
  // Simple per-IP protection; add edge rate limits and bot protection in production.
  const ip = req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const recent = (rate.get(ip) || []).filter(t => now - t < 60_000);
  if (recent.length >= 12) return reply(res, 429, { error: 'Rate limit' }, origin);
  recent.push(now); rate.set(ip, recent);
  if (rate.size > 10000) rate.clear();
  try {
    let body = '';
    for await (const chunk of req) {
      body += chunk.toString('utf8');
      if (Buffer.byteLength(body) > 16_384) return reply(res, 413, { error: 'Request too large' }, origin);
    }
    const payload = JSON.parse(body);
    if (!Array.isArray(payload.messages) || payload.messages.length < 1 || payload.messages.length > 20 ||
        !payload.messages.every(m => ['user', 'assistant'].includes(m.role) && typeof m.content === 'string' && m.content.length <= 2000)) {
      return reply(res, 400, { error: 'Invalid messages' }, origin);
    }
    const upstream = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, messages: [{ role: 'system', content: prompt }, ...payload.messages], max_tokens: 400 }),
      signal: AbortSignal.timeout(15000),
    });
    if (!upstream.ok) return reply(res, 502, { error: 'AI provider unavailable' }, origin);
    const data = await upstream.json();
    const answer = data.choices?.[0]?.message?.content;
    if (typeof answer !== 'string') return reply(res, 502, { error: 'Invalid AI response' }, origin);
    return reply(res, 200, { reply: answer }, origin);
  } catch {
    return reply(res, 400, { error: 'Invalid request or upstream timeout' }, origin);
  }
});
server.listen(port, '127.0.0.1', () => console.log('ArchiAgent API listening on localhost:' + port));
