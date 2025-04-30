#!/bin/sh
set -e

echo "▶︎ Running database migrations…"
yarn migrate

echo "▶︎ Seeding initial data…"
yarn seeder:run

echo "▶︎ Starting Nest API…"
exec node dist/main.js
