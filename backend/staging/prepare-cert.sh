#!/bin/sh
set -eu
cd "$(dirname "$0")"
mkdir -p .certs
# Local test certificate only; never install into the machine's trust store.
openssl req -x509 -newkey rsa:2048 -nodes -days 2 \
  -keyout .certs/key.pem -out .certs/cert.pem \
  -subj '/CN=localhost' -addext 'subjectAltName=DNS:localhost,IP:127.0.0.1'
# Disposable test key must be readable by the unprivileged proxy container.
chmod 644 .certs/key.pem
