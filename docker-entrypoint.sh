#!/bin/sh
set -e

echo "🔍 Checking if migrations are needed..."

timeout=30
counter=0

while ! npx typeorm query "SELECT 1" -d dist/db/data-source.js > /dev/null 2>&1; do
  if [ $counter -eq $timeout ]; then
    echo "❌ Database connection timeout"
    exit 1
  fi
  echo "⏳ Waiting for database... ($counter/$timeout)"
  sleep 2
  counter=$((counter + 1))
done

echo "✅ Database connected!"

if ! npx typeorm query "SELECT * FROM migrations LIMIT 1" -d dist/db/data-source.js 2>/dev/null; then
    echo "🚀 First run - executing migrations..."
    npx typeorm migration:run -d dist/db/data-source.js
    echo "✅ Migrations completed!"
else
    echo "✅ Database is up to date - skipping migrations"
fi

echo "🏃 Starting NestJS application..."
exec "$@"