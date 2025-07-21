#!/bin/bash

# Fail on error
set -e

# Replace placeholders in pgpass
envsubst </pgpass.template >/pgpass
chmod 600 /pgpass

# Replace placeholders in servers.json
envsubst </servers.json.template >/pgadmin4/servers.json

# Run pgAdmin entrypoint
# exec /usr/local/bin/docker-entrypoint.sh
exec /entrypoint.sh