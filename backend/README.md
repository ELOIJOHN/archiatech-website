# ArchiAgent backend — audit branch, not deployed

Node.js 20+. Start with `node backend/archiagent-server.mjs`; tests: `node --test backend/archiagent-server.test.mjs`. The test suite uses ephemeral loopback ports and a simulated provider, no credentials or paid calls. Importing the module does not open a port.

Server-only configuration: `OPENAI_API_KEY`, optional `OPENAI_MODEL`, `PORT` (8787), `ALLOWED_ORIGINS` (comma-separated, default https://www.archiatech.com). The server binds to 127.0.0.1. Never use a VITE variable for secrets. The frontend public endpoint variable remains `VITE_ARCHIAGENT_API_URL`.

## Protections

- Exact Origin allowlist; POST/OPTIONS only; no-store and nosniff responses.
- Uncompressed application/json, 16 KiB raw byte limit (including chunked bodies), strict UTF-8 decoding, 10-second body deadline.
- 1–20 messages, user/assistant roles only, nonblank strings up to 2000 characters, final user message required. Only role/content forwarded; server owns system prompt, model and token budget.
- 12 requests per socket peer per fixed 60-second window, including malformed requests; expired entries removed, maximum 10,000 peers, refusal on saturation without clearing existing budgets. Retry-After included.
- Forwarded and X-Forwarded-For intentionally ignored. Behind a proxy, all clients may share a budget. Do not trust arbitrary forwarding headers to fix this: configure per-client rate limits at the trusted edge before public launch.
- Maximum 8 simultaneous body/provider operations per process; provider deadline 15 seconds includes response body, response capped at 64 KiB, redirects forbidden. Client disconnect cancels upstream work.
- 400 invalid JSON/messages, 408 client body timeout, 413 oversized request, 415 media/encoding, 429 rate limit, 503 missing configuration/busy, 502 provider/network/format failure, 504 provider timeout. No provider details, secrets or conversation logs returned.

## Remaining public-launch prerequisites

Origin is not authentication: non-browser clients can forge it. In-memory limits are not shared across workers and reset on restart. A trusted HTTPS reverse proxy must add bot protection, per-client limits, global spend quotas, request size/time limits and monitoring without chat content. Rotate any previously exposed provider key. Validate a staging end-to-end chatbot flow before considering production.

No hosting, proxy, production secret, main branch or deployment is changed by this work. GitHub Actions only runs isolated tests on the audit branch.
