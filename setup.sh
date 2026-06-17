#!/bin/bash
set -e

echo "=== Chemstore - Configuração do Ambiente ==="

python3 -m venv venv
source venv/bin/activate

pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate

echo ""
echo "=== Criando superusuário ==="
python manage.py createsuperuser

echo ""
echo "=== Configuração concluída! ==="
echo "Execute: source venv/bin/activate && python manage.py runserver"
echo "Aplicação:  http://127.0.0.1:8000/"
echo "Admin:      http://127.0.0.1:8000/admin/"
echo "Relatório:  http://127.0.0.1:8000/reagents/report/"
