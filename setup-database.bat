@echo off
echo ========================================
echo ChemStore - Configuracao do Banco de Dados
echo ========================================

echo.
echo Este script vai configurar o PostgreSQL para o ChemStore
echo.

set /p DB_PASSWORD=Digite a senha do usuario 'postgres' do PostgreSQL:

echo.
echo Criando banco de dados 'chemstore'...

REM Criar banco de dados usando psql
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -h localhost -c "CREATE DATABASE chemstore;" <nul

if %errorlevel% neq 0 (
    echo ERRO: Nao foi possivel criar o banco de dados.
    echo Verifique se a senha esta correta e se o PostgreSQL esta rodando.
    pause
    exit /b 1
)

echo Banco de dados criado com sucesso!

echo.
echo Configurando arquivo .env...

REM Criar arquivo .env com as configuracoes
echo DATABASE_URL="postgresql://postgres:%DB_PASSWORD%@localhost:5432/chemstore?schema=public" > .env
echo JWT_SECRET="chemstore-super-secret-jwt-key-$(date +%s)" >> .env
echo NEXTAUTH_SECRET="chemstore-nextauth-secret-$(date +%s)" >> .env
echo NEXTAUTH_URL="http://localhost:3000" >> .env

echo Arquivo .env configurado!

echo.
echo Instalando dependencias e configurando Prisma...

REM Instalar dependencias se necessario
call npm install

REM Gerar cliente Prisma
call npx prisma generate

REM Executar migracoes
call npx prisma db push

REM Popular banco com dados iniciais
call npx prisma db seed

echo.
echo ========================================
echo Configuracao concluida com sucesso!
echo ========================================
echo.
echo Agora voce pode iniciar o servidor:
echo npm run dev
echo.
echo Credenciais de teste:
echo Admin: admin@chemstore.com / admin123
echo Usuario: user@chemstore.com / user123
echo.
pause


