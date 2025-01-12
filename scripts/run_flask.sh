#!/bin/bash
set -e

echo "Activating virtual environment..."
source ../.venv/bin/activate || { echo "Failed to activate virtual environment"; exit 1; }

echo "Installing dependencies..."
pip install -r ../backend/requirements.txt || { echo "Failed to install requirements"; exit 1; }

echo "Starting Flask application..."
cd ../backend || { echo "Failed to navigate to backend directory"; exit 1; }
flask run
