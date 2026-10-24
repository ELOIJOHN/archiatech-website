#!/bin/sh
set -eu
cd "$(dirname "$0")/../.."
VITE_ARCHIAGENT_API_URL=/api/archiagent npm run build
sh backend/staging/prepare-cert.sh
# Reset this dedicated test stack so prior runs cannot consume the rate budget.
docker compose -f backend/staging/compose.yaml down
trap 'docker compose -f backend/staging/compose.yaml down' EXIT INT TERM
docker compose -f backend/staging/compose.yaml up -d
docker compose -f backend/staging/compose.yaml exec -T proxy nginx -t
node --test backend/staging/e2e.test.mjs
