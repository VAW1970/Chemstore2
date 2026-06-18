# 📋 Instruções de Deploy - PythonAnywhere

## 🚀 Após Fazer Upload das Alterações

### 1. **No PythonAnywhere Dashboard**

Acesse: https://www.pythonanywhere.com/dashboard/

#### A. Recollect Static Files
```bash
# No console do PythonAnywhere:
cd /home/vaw/Chemstore2
source venv/bin/activate
python manage.py collectstatic --clear --noinput
```

#### B. Reload da Aplicação
1. Vá para aba **Web**
2. Clique no botão verde **Reload chemstore.pythonanywhere.com**
3. Aguarde a confirmação

---

### 2. **Verificação do Sidebar**

#### No Navegador (PC):
1. Acesse: https://vaw.pythonanywhere.com/admin/
2. Pressione **Ctrl+F5** (Windows) ou **Cmd+Shift+R** (Mac)
3. Inspecione o elemento (F12) e verifique:
   - Se o arquivo `jazzmin-custom.css` está carregando (status 200)
   - Se o tamanho do arquivo é ~14KB
   - Se não há erros 404

#### No Celular:
1. Acesse pelo navegador mobile
2. O sidebar deve:
   - Estar escondido inicialmente
   - Aparecer ao clicar no menu hamburger (☰)
   - Ter fundo azul com gradiente
   - Deslizar da esquerda para direita

---

### 3. **Troubleshooting**

#### Sidebar não está azul:
```bash
# Verifique se o CSS está sendo servido:
curl -I https://vaw.pythonanywhere.com/static/css/jazzmin-custom.css
```
- Deve retornar `HTTP/1.1 200 OK`
- Verifique o header `Content-Length` (deve ser ~14000 bytes)

#### Sidebar não aparece no mobile:
1. Verifique o console do navegador (F12 > Console)
2. Procure por erros JavaScript
3. Teste em diferentes larguras de tela (F12 > Device Toolbar)

#### Cache antigo:
```bash
# No PythonAnywhere console:
rm -rf /home/vaw/Chemstore2/staticfiles/*
python manage.py collectstatic --noinput
```

---

### 4. **Arquivos Críticos**

Estes arquivos devem estar atualizados no PythonAnywhere:

- ✅ `static/css/jazzmin-custom.css` (14KB)
- ✅ `templates/admin/base.html` (sem CSS inline)
- ✅ `chemstore/settings.py` (com `hide_apps: ['reagents']`)

---

### 5. **Comando Rápido de Deploy**

```bash
# Execute este comando após cada upload:
cd /home/vaw/Chemstore2 && source venv/bin/activate && python manage.py collectstatic --clear --noinput && echo "✅ Pronto! Faça Reload no dashboard."
```

---

### 6. **URLs de Teste**

- **Admin:** https://vaw.pythonanywhere.com/admin/
- **Relatório:** https://vaw.pythonanywhere.com/reagents/report/
- **Landing:** https://vaw.pythonanywhere.com/

---

## 🆘 Problemas Comuns

| Problema | Solução |
|----------|---------|
| Sidebar branco/cinza | Clear cache + Reload no dashboard |
| CSS não carrega (404) | Verifique permissões dos arquivos |
| Mobile não funciona | Teste em modo responsivo (F12) |
| Gradiente não aparece | Navegador pode não suportar (teste Chrome) |

---

**Última atualização:** 18/Jun/2026  
**Versão:** 2.0 (Com responsividade mobile)