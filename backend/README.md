# ArchiAgent backend — audit branch, not deployed

Node.js 20+. Start with `node backend/archiagent-server.mjs`; tests: `npm run test:archiagent`. The test suite uses ephemeral loopback ports and a simulated provider, no credentials or paid calls. Importing the module does not open a port.

Server-only configuration: `OPENAI_API_KEY`, optional `OPENAI_MODEL`, `PORT` (8787), `ALLOWED_ORIGINS` (comma-separated, default https://www.archiatech.com). The server binds to 127.0.0.1. Never use a VITE variable for secrets. The frontend public endpoint variable remains `VITE_ARCHIAGENT_API_URL`.

## Protections

- Exact Origin allowlist; POST/OPTIONS only; no-store and nosniff responses.
- Uncompressed application/json, 16 KiB raw byte limit (including chunked bodies), strict UTF-8 decoding, 10-second body deadline.
- 1–20 messages, user/assistant roles only, nonblank strings up to 2000 characters, final user message required. Only role/content forwarded; server owns system prompt, model and token budget.
- 12 requests per socket peer per fixed 60-second window, including malformed requests; expired entries removed, maximum 10,000 peers, refusal on saturation without clearing existing budgets. Retry-After included.
- Forwarded and X-Forwarded-For are always ignored. By default only the socket peer identifies a client. Optional server-only `TRUSTED_PROXIES` lists exact peer IPs (no CIDRs): only those peers may supply one valid `X-Real-IP`. The proxy MUST overwrite that header, and direct backend access must remain blocked. The isolated fixture trusts only 127.0.0.1. Never add a public/untrusted peer.
- A separate 120-request/minute global budget per process bounds distributed clients. Both budgets include invalid POST requests after origin/media routing checks and reset on restart.
- Maximum 8 simultaneous body/provider operations per process; provider deadline 15 seconds includes response body, response capped at 64 KiB, redirects forbidden. Client disconnect cancels upstream work.
- 400 invalid JSON/messages, 408 client body timeout, 413 oversized request, 415 media/encoding, 429 rate limit, 503 missing configuration/busy, 502 provider/network/format failure, 504 provider timeout. No provider details, secrets or conversation logs returned.

## Remaining public-launch prerequisites

Origin is not authentication: non-browser clients can forge it. In-memory limits are not shared across workers and reset on restart. A trusted HTTPS reverse proxy must add bot protection, per-client limits, global spend quotas, request size/time limits and monitoring without chat content. Rotate any previously exposed provider key. Validate a staging end-to-end chatbot flow before considering production.

No hosting, proxy, production secret, main branch or deployment is changed by this work. GitHub Actions only runs isolated tests on the audit branch.

## Reproducible HTTPS/browser test environment

See [staging/README.md](staging/README.md). `npm run test:archiagent:e2e` builds the actual site, generates a disposable certificate, starts a dedicated local Docker stack, tests Chrome → nginx → backend → simulated provider, and shuts the stack down. No real provider credentials are read by the fixture. [Audit results](staging/AUDIT.md) distinguish measured test behavior from unverified production settings.
