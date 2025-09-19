#!/bin/bash

echo "=== Starting WhatsApp Food Ordering System ==="

# Navigate to project root
cd "$(dirname "$0")"

# Activate Python environment
source venv_hp/Scripts/activate || source venv_hp/bin/activate

# Start backend (FastAPI)
echo "Starting backend..."
cd backend
uvicorn main:app --reload --port 8000 &
BACKEND_PID=$!
cd ..

# Start frontend (React)
echo "Starting frontend..."
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

# Wait so both processes keep running
wait $BACKEND_PID $FRONTEND_PID
