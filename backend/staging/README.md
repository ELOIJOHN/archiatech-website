# Isolated ArchiAgent test environment

This is a local reference configuration, **not a production deployment**. The repository supplied no existing reverse-proxy configuration. No running production proxy or certificate has been inspected or modified.

## Run

Requirements: Node 22+, npm, Docker Compose, OpenSSL supporting `-addext`, and Google Chrome. On macOS the test defaults to `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`; elsewhere set `CHROME_PATH` to the installed executable.

```sh
PUPPETEER_SKIP_DOWNLOAD=true npm ci --ignore-scripts
npm run test:archiagent
npm run test:archiagent:e2e
```

The E2E runner builds with `VITE_ARCHIAGENT_API_URL=/api/archiagent`, generates a two-day self-signed certificate, recreates **only** the `archiagent-audit` Compose project, checks nginx configuration, runs tests, and tears down containers/network even when tests fail. Do not run two copies simultaneously. Ports 18080/18443 must be free. It does not run `npm deploy` or access production. First use downloads pinned nginx/Node images. A normal build without the environment variable retains the existing local-response mode.

For manual inspection, run the build and certificate commands in `run-e2e.sh`, then `docker compose -f backend/staging/compose.yaml up -d`; open https://localhost:18443. Stop with the same Compose file and `down`.

## Boundaries

- Published ports bind only to host 127.0.0.1. Backend binds 127.0.0.1 inside the proxy's network namespace and has no published port.
- Dedicated Docker bridge; read-only filesystems/mounts, no capabilities, no privilege escalation, unprivileged users, memory and process limits. This bridge does **not** provide a general outbound firewall. Isolation from the real provider comes from an injected simulated fetch and a fixed dummy key; no environment file or real secret is loaded. Browser tests abort external website requests.
- Local certificate and key are ignored by Git and never installed in the host trust store. The disposable key is readable by the unprivileged test container. The browser accepts this local self-signed certificate only in its temporary test profile; HTTP tests validate it with an explicitly supplied CA.
- nginx uses TLS 1.2/1.3, fixed HTTP→HTTPS redirect, HSTS, no-store, nosniff, exact CORS allowlist, 16 KiB body limit, per-IP/global rate and connection limits. It overwrites X-Real-IP and strips other forwarding headers, cookies and authorization. Rate limiting includes OPTIONS. No retries of paid POST requests.
- POST body streaming lets the backend enforce its absolute 10-second deadline. nginx read/send limits are inactivity timeouts; they are not total-duration deadlines.
- API 429 responses remain readable by the allowed browser origin and include Retry-After. Access logs contain only status, method and elapsed time, never prompts or query strings.
- Tests reset the stack before each full run because rate budgets persist during a process lifetime. Outputs in `results/` are ignored by Git.

## Before any production proposal

Replace localhost endpoints and certificates; inspect the actual DNS/CDN/proxy chain and renewal mechanism. Set `TRUSTED_PROXIES` only to the exact controlled peer and require its header overwrite. With multiple backend workers, enforce shared quotas at the edge/store. Set a provider-side spending limit and monitoring; origin validation is not authentication or bot protection. A challenge/authentication mechanism and durable spending budget require deployment-specific decisions. Validate a real-provider staging response separately with explicitly provisioned credentials; none were used here. Do not copy the disposable certificate, dummy provider or local origin into production.
