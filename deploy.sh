#!/bin/bash

echo "🚀 Deploy از GitHub..."

# Pull latest changes
git pull origin main

# Rebuild and restart
docker-compose down
docker-compose up -d --build

echo "✅ Deploy انجام شد!"
docker-compose ps
