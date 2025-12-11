# ChemStore - Sistema de Gerenciamento de Estoque de Reagentes Químicos

## 📋 Descrição

O ChemStore é um sistema completo de gerenciamento de estoque de reagentes químicos desenvolvido em JavaScript. O sistema oferece controle rigoroso de inventário com foco em segurança, rastreabilidade e eficiência operacional em ambientes laboratoriais.

## 🚀 Funcionalidades Principais

### 🔐 Sistema de Autenticação
- **Login seguro** com dois níveis de acesso:
  - **Administrador**: Acesso completo ao sistema
  - **Usuário**: Acesso limitado às operações básicas
- Controle de permissões por módulo

### 📊 Gerenciamento de Estoque
Controle completo dos reagentes químicos com os seguintes campos:

- **Nome do Reagente**: Identificação clara do produto
- **Marca**: Fabricante ou marca comercial
- **Quantidade**: Controle numérico do estoque
- **Unidade**: Medida (kg, L, unidades, etc.)
- **Data de Validade**: Controle de prazo de validade
- **Localização**: Posicionamento físico no laboratório
- **Prateleira**: Número ou identificação da prateleira
- **Setor**: Área específica do laboratório
- **Usuário**: Responsável pelo registro/manutenção
- **Verificação**: Status de conferência do item

### 📈 Dashboard Interativo
- **Visualização em tempo real** do status dos reagentes
- **Sistema de alertas visuais** por cores:
  - 🟢 **Válido**: Reagentes dentro do prazo
  - 🟡 **Por vencer**: Reagentes com validade em até 30 dias
  - 🔴 **Vencido**: Reagentes com validade expirada
- **Relatórios dinâmicos** e gráficos de acompanhamento

### 🖨️ Recursos de Impressão
- **Relatórios personalizáveis** em formato A4
- **Impressão otimizada** para documentos oficiais
- **Layouts profissionais** para inventários e relatórios

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js com Express.js
- **Banco de Dados**: MongoDB / PostgreSQL
- **Autenticação**: JWT (JSON Web Tokens)
- **Interface**: Bootstrap / Material Design
- **Relatórios**: PDF.js ou similar

## 📦 Instalação

### Pré-requisitos
- Node.js (versão 18 ou superior)
- PostgreSQL (versão 12 ou superior) - [Download](https://www.postgresql.org/download/windows/)
- Git

### Configuração do PostgreSQL

1. **Instale o PostgreSQL** para Windows
2. **Durante a instalação**, anote a senha do usuário `postgres`
3. **Verifique se o serviço está rodando**:
   ```bash
   # Abra PowerShell como Administrador
   Get-Service postgresql-x64-18  # (ajuste o nome se necessário)
   ```
4. **Certifique-se que o status é "Running"**

### Passos para Instalação

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/chemstore.git
   cd chemstore
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o banco de dados**
   ```bash
   # Copie o arquivo de configuração
   cp env.example .env

   # Edite as configurações do banco de dados no arquivo .env
   # Exemplo:
   # DATABASE_URL="postgresql://username:password@localhost:5432/chemstore?schema=public"
   # JWT_SECRET="your-super-secret-jwt-key-here"
   ```

4. **Configure o banco de dados**
   ```bash
   # Opção 1: Script automático (Windows)
   setup-database.bat

   # Opção 2: Configuração manual
   # a) Abra pgAdmin ou psql
   # b) Execute: CREATE DATABASE chemstore;
   # c) Configure o arquivo .env com sua senha
   # d) Execute os comandos abaixo:

   # Gere o cliente Prisma
   npm run db:generate

   # Execute as migrações
   npm run db:push

   # Popule o banco com dados iniciais
   npm run db:seed
   ```

5. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

6. **Acesse o sistema**
   ```
   http://localhost:3000
   ```

### Usuários Padrão
Após executar o seed, o sistema criará automaticamente:
- **Admin**: admin@chemstore.com / senha: admin123
- **Usuário**: user@chemstore.com / senha: user123

## 🔧 Configuração

### Usuários Padrão
Após a instalação, o sistema cria automaticamente:
- **Admin**: admin@chemstore.com / senha: admin123
- **Usuário**: user@chemstore.com / senha: user123

⚠️ **Importante**: Altere as senhas padrão após o primeiro acesso!

### Configurações do Sistema
- **Alerta de vencimento**: 30 dias (configurável)
- **Formato de data**: DD/MM/YYYY
- **Unidades padrão**: kg, L, unidades
- **Setores**: Configuráveis pelo administrador

## 📖 Como Usar

### Para Administradores
1. **Acesse o sistema** com credenciais de admin
2. **Gerencie usuários** no painel administrativo
3. **Configure setores e localizações**
4. **Monitore relatórios** de uso do sistema

### Para Usuários
1. **Faça login** no sistema
2. **Visualize o dashboard** com status dos reagentes
3. **Registre novos reagentes** no estoque
4. **Atualize quantidades** conforme uso
5. **Imprima relatórios** quando necessário

## 📋 Estrutura do Projeto

```
chemstore/
├── public/              # Arquivos estáticos
│   ├── css/
│   ├── js/
│   └── images/
├── src/
│   ├── controllers/     # Controladores da aplicação
│   ├── models/         # Modelos de dados
│   ├── routes/         # Definições de rotas
│   ├── middleware/     # Middlewares personalizados
│   ├── utils/          # Utilitários
│   └── views/          # Templates/views
├── config/             # Configurações
├── tests/              # Testes automatizados
├── docs/               # Documentação adicional
├── package.json
├── README.md
└── .env.example
```

## 🔒 Segurança

- **Criptografia de senhas** usando bcrypt
- **Tokens JWT** para sessões seguras
- **Validação de entrada** em todas as operações
- **Logs de auditoria** para rastreamento de ações
- **Backup automático** do banco de dados

## 📊 Relatórios Disponíveis

- **Inventário geral** por setor
- **Relatório de vencimentos** (próximos 30 dias)
- **Histórico de movimentações** por reagente
- **Relatório de uso** por usuário
- **Etiquetas para impressão** (formato A4)

## 🐛 Solução de Problemas

### Problemas Comuns

1. **Erro de conexão com banco de dados**
   - Verifique as configurações no arquivo `.env`
   - Confirme se o serviço de banco está rodando

2. **Erro de permissão**
   - Verifique se o usuário tem nível adequado
   - Contate o administrador do sistema

3. **Problemas de impressão**
   - Verifique se o navegador tem permissões para imprimir
   - Use Chrome/Firefox para melhor compatibilidade

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte técnico ou dúvidas:
- Email: suporte@chemstore.com
- Documentação: [Wiki do Projeto](https://github.com/seu-usuario/chemstore/wiki)

---

**⚠️ Aviso Importante**: Este sistema lida com substâncias químicas. Sempre siga os protocolos de segurança do seu laboratório e consulte a legislação local sobre armazenamento e manipulação de produtos químicos.
