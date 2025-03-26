#!/bin/bash

# Navigate to the directory containing docker-compose.yml
cd "$(dirname "$0")"

# Start PostgreSQL container
docker-compose up -d

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
sleep 5

echo "PostgreSQL should be running now."
echo "Connection details:"
echo "  Host: localhost"
echo "  Port: 5432"
echo "  Database: syndiccheck"
echo "  Username: postgres"
echo "  Password: postgres"