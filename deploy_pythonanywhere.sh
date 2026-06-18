#!/bin/bash
# Script de Deploy para PythonAnywhere
# Execute este script após cada atualização no PythonAnywhere

echo "🚀 Deploy Chemstore - PythonAnywhere"
echo "======================================"

# Ativar ambiente virtual
echo "📦 Ativando ambiente virtual..."
source venv/bin/activate

# Coletar estáticos (limpando cache antigo)
echo "🧹 Limpando e coletando arquivos estáticos..."
python manage.py collectstatic --clear --noinput

# Verificar tamanho do CSS
echo ""
echo "📊 Verificando arquivos CSS..."
ls -lh staticfiles/css/jazzmin-custom.css*

# Mensagens finais
echo ""
echo "✅ Deploy concluído!"
echo ""
echo "⚠️  IMPORTANTE - PythonAnywhere:"
echo "1. Vá para Dashboard > Web"
echo "2. Clique em 'Reload chemstore.pythonanywhere.com'"
echo "3. Limpe o cache do navegador (Ctrl+F5)"
echo ""
echo "🔍 Se o sidebar ainda não aparecer:"
echo "- Verifique o console do navegador (F12)"
echo "- Confira se há erros 404 para arquivos CSS"
echo "- Tente aba anônima/privada"
echo ""