# ArchiAgent backend (development branch only)

Requires Node.js 20+. This standalone server is NOT deployed by GitHub Pages.

1. Deploy `backend/archiagent-server.mjs` on a trusted server behind an HTTPS reverse proxy.
2. Set server-only environment variables: `OPENAI_API_KEY`, optionally `OPENAI_MODEL`, `PORT`, and `ALLOWED_ORIGINS=https://www.archiatech.com`.
3. Run `node backend/archiagent-server.mjs` under a service manager. Bind remains localhost; reverse proxy HTTPS path `/api/archiagent` to localhost:8787.
4. Set frontend build variable `VITE_ARCHIAGENT_API_URL=https://<your-api-host>/api/archiagent`. This is a public URL, **never** a secret.
5. Test preflight, valid/invalid requests, rate limiting, upstream failure, mobile, and fallback before deployment.

Security notes: Origin allowlist is **not authentication**; add edge bot protection, reverse-proxy IP-based rate limits, logging without chat content, and monitoring before public launch. The built-in limiter uses socket IP and is process-local; when proxied, it may group all clients together. Do not put `OPENAI_API_KEY` in GitHub or any `VITE_*` variable. Rotate any previously exposed provider key. No production changes have been made.
