// Preproduction only: no production-site origin, no trusted forwarding headers.
import { createHash, timingSafeEqual } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { createArchiAgentServer } from '../archiagent-server.mjs';

const assets = new Map([
  ['/', ['text/html; charset=utf-8', readFileSync(new URL('./index.html', import.meta.url))]],
  ['/preview.js', ['text/javascript; charset=utf-8', readFileSync(new URL('./preview.js', import.meta.url))]],
]);
const digest = text => createHash('sha256').update(text).digest();
export function previewConfig(env = process.env) {
  const origin = new URL(env.RENDER_EXTERNAL_URL || '');
  if (origin.protocol !== 'https:' || origin.username || origin.password || origin.pathname !== '/' || origin.search || origin.hash) {
    throw new Error('RENDER_EXTERNAL_URL must be an HTTPS origin');
  }
  if (!env.PREVIEW_ACCESS_TOKEN || env.PREVIEW_ACCESS_TOKEN.length < 32) throw new Error('PREVIEW_ACCESS_TOKEN must contain at least 32 characters');
  if (!env.OPENAI_API_KEY?.trim()) throw new Error('OPENAI_API_KEY is required server-side');
  const port = Number(env.PORT || 10000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT');
  return { origin: origin.origin, token: env.PREVIEW_ACCESS_TOKEN, apiKey: env.OPENAI_API_KEY, model: env.OPENAI_MODEL || 'gpt-4o-mini', port };
}

export function createPreviewServer(config, { fetchImpl = globalThis.fetch } = {}) {
  const tokenHash = digest(config.token);
  const server = createArchiAgentServer({
    apiKey: config.apiKey, model: config.model, allowedOrigins: [config.origin],
    trustedProxies: [], rateLimit: 12, globalRateLimit: 12, maxConcurrent: 2, fetchImpl,
  });
  const apiHandler = server.listeners('request')[0];
  server.removeAllListeners('request');
  server.on('request', (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Strict-Transport-Security', 'max-age=86400');
    res.setHeader('Content-Security-Policy', "default-src 'none'; script-src 'self'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'");
    const respond = (status, content, type = 'text/plain; charset=utf-8') => {
      req.resume();
      res.writeHead(status, { 'Content-Type': type, Connection: 'close' });
      res.end(content);
    };
    if (req.method === 'GET' && req.url === '/healthz') return respond(200, 'ok');
    const asset = assets.get(req.url);
    if (req.method === 'GET' && asset) return respond(200, asset[1], asset[0]);
    if (req.url !== '/api/archiagent') return respond(404, 'Not found');
    const authorization = req.headers.authorization;
    if (typeof authorization !== 'string' || !authorization.startsWith('Bearer ') ||
        !timingSafeEqual(digest(authorization.slice(7)), tokenHash)) {
      return respond(401, '{"error":"Preview access required"}', 'application/json; charset=utf-8');
    }
    return apiHandler(req, res);
  });
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const config = previewConfig();
  const server = createPreviewServer(config);
  server.listen(config.port, '0.0.0.0', () => console.log('ArchiAgent preproduction listening'));
  process.on('SIGTERM', () => {
    server.close();
    setTimeout(() => server.closeAllConnections(), 20000).unref();
  });
}
