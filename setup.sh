#!/bin/bash

echo "=== Setting up WhatsApp Food Ordering System ==="

# Navigate to project root
cd "$(dirname "$0")"

# 1. Create Python virtual environment
python -m venv venv_hp
source venv_hp/Scripts/activate || source venv_hp/bin/activate

# 2. Upgrade pip
pip install --upgrade pip

# 3. Install backend dependencies
pip install -r dependencies.txt

# 4. Setup database (if not exists)
if [ ! -f food_ordering.db ]; then
  echo "Creating SQLite database..."
  touch food_ordering.db
fi

# 5. Install frontend dependencies
cd frontend
npm install

echo "=== Setup completed successfully ==="
