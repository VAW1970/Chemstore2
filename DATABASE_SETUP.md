# 🗄️ Guia de Configuração do Banco de Dados - ChemStore

## 📋 Pré-requisitos

- PostgreSQL instalado e rodando
- Senha do usuário `postgres` conhecida

## 🚀 Configuração Rápida (Recomendado)

### Windows

1. **Execute o script automático**:
   ```bash
   # Clique duas vezes no arquivo ou execute:
   .\setup-database.bat
   ```

2. **Siga as instruções**:
   - Digite a senha do PostgreSQL quando solicitada
   - O script fará tudo automaticamente

### Linux/Mac

1. **Configure o arquivo .env**:
   ```bash
   cp env.example .env
   # Edite o .env com sua senha do PostgreSQL
   nano .env
   ```

2. **Execute os comandos**:
   ```bash
   # Criar banco de dados
   createdb chemstore

   # Instalar dependências
   npm install

   # Configurar Prisma
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

## 🔧 Configuração Manual (Alternativa)

### 1. Criar Banco de Dados

#### Opção A: pgAdmin
- Abra pgAdmin
- Conecte ao servidor PostgreSQL
- Clique com botão direito em "Databases"
- Selecione "Create > Database"
- Nome: `chemstore`
- Owner: `postgres`

#### Opção B: Linha de Comando
```bash
# Conectar como superusuário
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -h localhost

# Criar banco
CREATE DATABASE chemstore;

# Sair
\q
```

### 2. Configurar Arquivo .env

Edite o arquivo `.env` na raiz do projeto:

```env
# Substitua 'sua_senha_aqui' pela senha real do PostgreSQL
DATABASE_URL="postgresql://postgres:sua_senha_aqui@localhost:5432/chemstore?schema=public"

# JWT (mantenha como está para desenvolvimento)
JWT_SECRET="chemstore-super-secret-jwt-key-2024-change-this-in-production"
NEXTAUTH_SECRET="chemstore-nextauth-secret-2024-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Executar Configuração Prisma

```bash
# Instalar dependências (se não fez ainda)
npm install

# Gerar cliente Prisma
npx prisma generate

# Criar tabelas no banco
npx prisma db push

# Popular com dados de exemplo
npx prisma db seed
```

## ✅ Verificar Instalação

### Testar Conexão
```bash
# Deve mostrar as tabelas criadas
npx prisma studio
```

### Iniciar Aplicação
```bash
npm run dev
```

### Credenciais de Teste
- **Admin**: admin@chemstore.com / admin123
- **Usuário**: user@chemstore.com / user123

## 🔍 Solução de Problemas

### Erro: "Can't reach database server"
- Verifique se PostgreSQL está rodando: `Get-Service postgresql-x64-18`
- Teste conexão: `"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -h localhost`

### Erro: "Authentication failed"
- Verifique a senha no arquivo `.env`
- Certifique-se que está usando o usuário `postgres`

### Erro: "Database does not exist"
- Execute: `npx prisma db push` para criar as tabelas

### Porta 5432 ocupada
- Verifique se outro PostgreSQL está rodando
- Ou mude a porta no arquivo `.env` e reinicie o PostgreSQL

## 📞 Suporte

Se encontrar problemas, verifique:
1. PostgreSQL está instalado e rodando
2. Senha está correta no `.env`
3. Porta 5432 não está bloqueada por firewall
4. Usuário tem permissões para criar bancos de dados


