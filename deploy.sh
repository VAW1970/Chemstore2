#!/bin/bash
set -e

echo "=== Chemstore - Deploy com Gunicorn ==="

source venv/bin/activate

export DEBUG=False
export SECRET_KEY=${SECRET_KEY:-$(python -c "import secrets; print(secrets.token_urlsafe())")}
export ALLOWED_HOSTS=${ALLOWED_HOSTS:-localhost,127.0.0.1}

python manage.py collectstatic --noinput
python manage.py migrate

echo "Iniciando Gunicorn na porta 8000..."
gunicorn chemstore.wsgi:application --bind 0.0.0.0:8000 --workers 3
