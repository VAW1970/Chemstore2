# Chemstore - Sistema de Gerenciamento de Reagentes Químicos

[![Django](https://img.shields.io/badge/Django-5.x/6.x-0C4B33?style=for-the-badge&logo=django)](https://www.djangoproject.com/)
[![Python](https://img.shields.io/badge/Python-3.12+-3776AB?style=for-the-badge&logo=python)](https://www.python.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap)](https://getbootstrap.com/)

Sistema completo para controle de validade, localização e responsáveis por reagentes químicos em laboratórios.

## 🧪 Funcionalidades

- ✅ **Controle de Validade** - Alertas automáticos para reagentes vencidos ou próximos ao vencimento (≤30 dias)
- 📊 **Relatório Completo** - Estatísticas em tempo real, otimizado para impressão
- 📍 **Localização Precisa** - Sistema de localização por local, prateleira e setor
- 👤 **Responsáveis** - Associação de usuários responsáveis por cada reagente
- 🎨 **Interface Moderna** - Design system com cores semânticas e gradientes
- 📱 **Responsivo** - Funciona em desktops, tablets e celulares

## 🚀 Instalação

### Pré-requisitos

- Python 3.12 ou superior
- pip (gerenciador de pacotes Python)
- Virtualenv (recomendado)

### Passos

1. **Clone ou acesse o diretório do projeto:**
```bash
cd /home/valdiraw/Projetos/Chemstore2
```

2. **Crie e ative o ambiente virtual:**
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows
```

3. **Instale as dependências:**
```bash
pip install -r requirements.txt
```

4. **Execute o script de setup (opcional):**
```bash
chmod +x setup.sh
./setup.sh
```

Ou manualmente:
```bash
# Aplique as migrações
python manage.py makemigrations
python manage.py migrate

# Crie um superusuário
python manage.py createsuperuser

# (Opcional) Popule com dados de exemplo
python popular_reagentes.py
```

## ▶️ Executando o Servidor

```bash
source venv/bin/activate
python manage.py runserver
```

Acesse:
- **Landing Page:** http://127.0.0.1:8000/
- **Admin:** http://127.0.0.1:8000/admin/
- **Relatório:** http://127.0.0.1:8000/reagents/report/

## 🔐 Credenciais de Teste

Se executou `python popular_reagentes.py`:
- **Usuário:** `admin`
- **Senha:** `admin`

## 📁 Estrutura do Projeto

```
Chemstore2/
├── chemstore/              # Configurações do projeto Django
│   ├── settings.py         # Configurações (Jazzmin, apps, etc.)
│   ├── urls.py             # URLs principais
│   └── wsgi.py             # Configuração WSGI
├── reagents/               # App principal
│   ├── models.py           # Modelo Reagent
│   ├── admin.py            # Configuração do admin
│   ├── views.py            # Views (relatório, etc.)
│   └── templates/          # Templates do app
├── templates/              # Templates globais
│   ├── base.html           # Template base
│   └── index.html          # Landing page
├── static/                 # Arquivos estáticos
│   ├── css/
│   │   ├── design-system.css
│   │   └── jazzmin-custom.css
│   └── images/
│       ├── logo.svg
│       └── icon.svg
├── DESIGN_SISTEM.md        # Documentação do design system
├── popular_reagentes.py    # Script para popular banco de dados
└── README.md               # Este arquivo
```

## 🎨 Design System

O projeto utiliza um design system personalizado com:

### Cores
- **Primária:** `#1e3a5f` (Azul Profundo)
- **Secundária:** `#2c5282` (Azul Intermediário)
- **Accent:** `#4299e1` (Azul Vibrante)
- **Success:** `#48bb78` (Verde - OK)
- **Warning:** `#ed8936` (Laranja - Aviso)
- **Danger:** `#f56565` (Vermelho - Vencido)

### Componentes
- Gradientes químicos
- Badges com ícones
- Cards com hover effects
- Animações (float, glow, bubble)
- Sidebar personalizada

Consulte `DESIGN_SISTEM.md` para documentação completa.

## 🛠️ Stack Tecnológico

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| Django | 5.x/6.x | Framework web |
| Python | 3.12+ | Linguagem |
| Jazzmin | Latest | Admin theme |
| Bootstrap | 5.3.3 | CSS framework |
| Font Awesome | 6.5.1 | Ícones |
| SQLite | 3.x | Banco de dados (dev) |
| Gunicorn | Latest | WSGI server |
| WhiteNoise | Latest | Static files server |

## 📊 Comandos Úteis

### Popular banco de dados
```bash
python popular_reagentes.py
```
Cria 30 reagentes de exemplo com diferentes status de validade.

### Executar testes
```bash
python -m pytest reagents/tests.py -v --tb=short
```

### Verificar código (linting)
```bash
flake8 reagents/ chemstore/ --max-line-length=120 --exclude=migrations,venv,staticfiles
```

### Coletar estáticos (produção)
```bash
python manage.py collectstatic --noinput
```

## 🔒 Segurança

- CSRF protection habilitado
- XSS filter ativado
- Content-Type sniffing prevention
- X-Frame-Options: DENY
- Session cookie age: 12 horas

## 📱 Responsividade

O sistema é totalmente responsivo:
- **Desktop:** Layout completo com sidebar
- **Tablet:** Menu colapsável
- **Mobile:** Navegação hamburger menu

## 🖨️ Impressão

O relatório é otimizado para impressão:
- Formato A4 landscape
- Cores preservadas
- Elementos de UI ocultados
- Fonte ajustada para 9-11pt

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 👥 Autores

- **Chemstore Team**

## 🙏 Agradecimentos

- Django Community
- Jazzmin Theme
- Bootstrap Team
- Font Awesome

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Chemstore** - Sistema de Gerenciamento de Reagentes Químicos © 2026
