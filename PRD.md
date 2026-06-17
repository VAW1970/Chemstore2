# Chemstore - Product Requirement Document (PRD)

## Documento de Requisitos do Produto

---

**Versão:** 1.0  
**Data:** 10 de Junho de 2026  
**Status:** Aprovado para Desenvolvimento  
**Autor:** Equipe de Produto Chemstore  
**Stakeholders:** Equipe de Laboratório, TI, Gestão de Qualidade

---

## Sumário

1. [Visão Geral do Produto](#1-visão-geral-do-produto)
2. [Objetivos e Metas](#2-objetivos-e-metas)
3. [Escopo do Projeto](#3-escopo-do-projeto)
4. [Requisitos Funcionais](#4-requisitos-funcionais)
5. [Requisitos Não-Funcionais](#5-requisitos-não-funcionais)
6. [Arquitetura Técnica](#6-arquitetura-técnica)
7. [Modelos de Dados](#7-modelos-de-dados)
8. [Interface do Usuário](#8-interface-do-usuário)
9. [Fluxos de Processo](#9-fluxos-de-processo)
10. [Segurança e Compliance](#10-segurança-e-compliance)
11. [Plano de Sprints](#11-plano-de-sprints)
12. [Critérios de Aceitação](#12-critérios-de-aceitação)
13. [Riscos e Mitigações](#13-riscos-e-mitigações)
14. [Glossário](#14-glossário)

---

## 1. Visão Geral do Produto

### 1.1 Declaração da Visão

> O Chemstore é um sistema web moderno e intuitivo para gerenciamento completo de reagentes químicos em ambientes laboratoriais, oferecendo controle de validade, localização, responsáveis e relatórios profissionais com interface administrativa elegante e responsiva.

### 1.2 Problema que Resolve

| Problema Atual | Impacto | Solução do Chemstore |
|---|---|---|
| Controle de validade manual e propenso a erros | Reagentes vencidos sendo utilizados, comprometendo resultados | Alertas automáticos e filtros de vencimento em até 30 dias |
| Dificuldade em localizar reagentes no laboratório | Perda de tempo, desperdício de recursos | Sistema de localização por local, prateleira e setor |
| Falta de responsabilização por reagentes | Dificuldade de rastreabilidade | Vinculação de usuário responsável por cada reagente |
| Relatórios manuais e demorados | Decisões baseadas em dados desatualizados | Relatório automático em tempo real com estatísticas |
| Interface de administração antiquada | Baixa adoção do sistema, resistência dos usuários | Interface moderna com Jazzmin, responsiva e intuitiva |

### 1.3 Público-Alvo

- **Usuários Primários:** Técnicos de laboratório, pesquisadores, farmacêuticos
- **Usuários Secundários:** Gestores de qualidade, administradores de laboratório
- **Usuários Terciários:** Equipe de TI responsável pela manutenção do sistema

### 1.4 Proposta de Valor

> "Gerencie seus reagentes químicos com precisão, segurança e elegância. Do controle de validade aos relatórios profissionais, o Chemstore transforma a gestão do seu laboratório."

---

## 2. Objetivos e Metas

### 2.1 Objetivos de Negócio

- [ ] Reduzir em 90% o uso de reagentes vencidos no laboratório
- [ ] Diminuir em 70% o tempo de localização de reagentes
- [ ] Aumentar em 100% a rastreabilidade dos reagentes (usuário responsável)
- [ ] Eliminar relatórios manuais de inventário
- [ ] Atingir 95% de satisfação dos usuários com a interface

### 2.2 Objetivos Técnicos

- [ ] Sistema 100% responsivo (mobile, tablet, desktop)
- [ ] Tempo de resposta da interface admin < 2 segundos
- [ ] Relatório gerado em < 3 segundos para até 10.000 registros
- [ ] 100% de cobertura de autenticação em views sensíveis
- [ ] Zero dependências com vulnerabilidades críticas conhecidas

### 2.3 KPIs de Sucesso

| KPI | Meta | Frequência de Medição |
|---|---|---|
| Taxa de reagentes vencidos identificados | < 2% do total | Mensal |
| Tempo médio de localização de reagente | < 30 segundos | Trimestral |
| NPS (Net Promoter Score) do sistema | > 50 | Semestral |
| Uptime do sistema | > 99.5% | Contínuo |
| Tempo de onboarding de novo usuário | < 15 minutos | Por usuário |

---

## 3. Escopo do Projeto

### 3.1 Dentro do Escopo (In-Scope)

- [ ] Sistema completo em Django com app "reagents"
- [ ] Interface administrativa com Jazzmin
- [ ] Landing page pública com informações do sistema
- [ ] CRUD completo de reagentes químicos
- [ ] Controle de validade com filtros automáticos
- [ ] Sistema de localização (local, prateleira, setor)
- [ ] Vinculação de usuário responsável
- [ ] Relatório profissional com estatísticas e otimização para impressão
- [ ] Suporte a múltiplas unidades de medida
- [ ] Configuração de ícone e logo personalizados
- [ ] Autenticação e autorização de usuários
- [ ] Documentação de instalação e uso

### 3.2 Fora do Escopo (Out-of-Scope)

- [ ] Integração com sistemas de compras/procurement
- [ ] Controle de estoque com alertas de reposição automática
- [ ] Módulo de fichas de segurança (FISPQ/SDS)
- [ ] Notificações por e-mail/SMS de vencimento
- [ ] Aplicativo mobile nativo (iOS/Android)
- [ ] Suporte a múltiplos idiomas (i18n)
- [ ] API REST pública
- [ ] Dashboard analítico avançado com gráficos interativos
- [ ] Integração com leitores de código de barras/QR Code
- [ ] Módulo de controle de lotes e rastreabilidade por lote

### 3.3 Dependências Externas

| Dependência | Responsável | Status |
|---|---|---|
| Servidor para deploy | Equipe de TI | Pendente |
| Aprovação de segurança da informação | Gestão de Qualidade | Pendente |
| Treinamento dos usuários | Gestão de Laboratório | Pendente |
| Definição de política de backup | Equipe de TI | Pendente |

---

## 4. Requisitos Funcionais

### 4.1 RF-001: Gerenciamento de Reagentes

**Descrição:** O sistema deve permitir o cadastro, edição, visualização e exclusão de reagentes químicos.

**Critérios de Aceitação:**
- [ ] Campos obrigatórios: nome, quantidade, unidade, data de validade
- [ ] Campos opcionais: marca, localização (local, prateleira, setor), usuário responsável
- [ ] Validação de quantidade > 0
- [ ] Validação de data de validade não pode ser no passado no momento do cadastro
- [ ] Confirmação antes da exclusão
- [ ] Mensagens de sucesso/erro claras

**Prioridade:** Alta

### 4.2 RF-002: Controle de Validade

**Descrição:** O sistema deve identificar e destacar reagentes próximos ao vencimento ou já vencidos.

**Critérios de Aceitação:**
- [ ] Cálculo automático de dias até o vencimento
- [ ] Classificação visual: verde (normal), amarelo (vence em ≤30 dias), vermelho (vencido)
- [ ] Filtro "Expirando em 30 dias" na interface admin
- [ ] Ordenação por data de validade (mais próximos primeiro)
- [ ] Cálculo baseado na data atual do servidor (timezone-aware)

**Prioridade:** Alta

### 4.3 RF-003: Localização de Reagentes

**Descrição:** O sistema deve permitir o registro e busca de reagentes por localização física.

**Critérios de Aceitação:**
- [ ] Campos: local, prateleira, setor
- [ ] Busca combinada por localização
- [ ] Filtros individuais por campo de localização
- [ ] Visualização agrupada por setor

**Prioridade:** Média

### 4.4 RF-004: Responsabilidade por Usuário

**Descrição:** Cada reagente deve ter um usuário responsável vinculado.

**Critérios de Aceitação:**
- [ ] Campo usuário_responsável como ForeignKey para User
- [ ] Filtro por usuário responsável no admin
- [ ] Exibição do nome do responsável em todas as views
- [ ] Possibilidade de deixar sem responsável (null=True)

**Prioridade:** Média

### 4.5 RF-005: Landing Page

**Descrição:** Página inicial pública com apresentação do sistema e links de acesso.

**Critérios de Aceitação:**
- [ ] Design moderno com gradientes
- [ ] Visão geral das funcionalidades
- [ ] Links diretos para /admin/ e /reagents/report/
- [ ] Informações sobre tecnologias utilizadas
- [ ] Layout responsivo (mobile, tablet, desktop)
- [ ] Tempo de carregamento < 2 segundos

**Prioridade:** Média

### 4.6 RF-006: Relatório de Reagentes

**Descrição:** Relatório profissional com estatísticas e lista completa de reagentes.

**Critérios de Aceitação:**
- [ ] Acesso protegido por autenticação
- [ ] Estatísticas: total de reagentes, vencendo em 30 dias, vencidos
- [ ] Tabela com todas as informações dos reagentes
- [ ] Indicadores visuais de status de validade
- [ ] Botão de impressão integrado
- [ ] Otimização para impressão (@media print)
- [ ] Dados em tempo real (sem cache)

**Prioridade:** Alta

### 4.7 RF-007: Interface Administrativa Moderna

**Descrição:** Interface admin customizada com Jazzmin para melhor UX.

**Critérios de Aceitação:**
- [ ] Tema moderno e responsivo
- [ ] Sidebar collapsible
- [ ] Branding personalizado (nome "Chemstore")
- [ ] Ícone e logo customizados
- [ ] Configurações de tema acessíveis
- [ ] Compatível com todas as funcionalidades do admin Django

**Prioridade:** Média

### 4.8 RF-008: Suporte a Múltiplas Unidades

**Descrição:** O sistema deve suportar diferentes unidades de medida.

**Critérios de Aceitação:**
- [ ] Unidades suportadas: g, mL, kit, kg, un.
- [ ] Exibição da unidade junto com a quantidade
- [ ] Filtro por unidade no admin
- [ ] Validação de quantidade compatível com a unidade

**Prioridade:** Baixa

### 4.9 RF-009: Personalização Visual

**Descrição:** O sistema deve permitir a customização de ícone e logo.

**Critérios de Aceitação:**
- [ ] Suporte a arquivos em static/images/icon.png
- [ ] Suporte a arquivos em static/images/logo.png
- [ ] Formatos: PNG, ICO, SVG
- [ ] Fallback para defaults se não existirem
- [ ] Dimensões recomendadas: ícone 32x32 ou 64x64, logo 200x50

**Prioridade:** Baixa

---

## 5. Requisitos Não-Funcionais

### 5.1 Performance

| Requisito | Métrica | Prioridade |
|---|---|---|
| Tempo de resposta da landing page | < 2 segundos | Alta |
| Tempo de resposta do admin | < 2 segundos | Alta |
| Tempo de geração do relatório | < 3 segundos (até 10k registros) | Alta |
| Tempo de carregamento de página de lista | < 1.5 segundos | Média |
| Suporte a concorrência | 50 usuários simultâneos | Média |

### 5.2 Segurança

- [ ] Autenticação obrigatória para acesso ao admin e relatório
- [ ] Proteção CSRF em todos os formulários
- [ ] Sanitização de inputs do usuário
- [ ] Senhas armazenadas com hash seguro (PBKDF2)
- [ ] Sessões com timeout configurável
- [ ] Logs de acesso para auditoria
- [ ] Prevenção de SQL Injection (usar ORM Django)
- [ ] Prevenção de XSS (escapar templates)

### 5.3 Usabilidade

- [ ] Interface intuitiva, sem necessidade de treinamento formal
- [ ] Mensagens de erro claras e acionáveis
- [ ] Feedback visual para todas as ações (loading, sucesso, erro)
- [ ] Design responsivo (mobile-first)
- [ ] Contraste adequado para acessibilidade (WCAG 2.1 AA)
- [ ] Navegação consistente em todas as páginas

### 5.4 Confiabilidade

- [ ] Uptime mínimo de 99.5%
- [ ] Backup diário automático do banco de dados
- [ ] Recuperação de desastre com RPO < 24 horas
- [ ] Tratamento de exceções sem exposição de dados sensíveis

### 5.5 Manutenibilidade

- [ ] Código seguindo PEP 8
- [ ] Docstrings em todas as classes e métodos públicos
- [ ] Cobertura de testes unitários > 80%
- [ ] Documentação técnica completa
- [ ] Dependências atualizadas e sem vulnerabilidades críticas

### 5.6 Compatibilidade

| Navegador | Versão Mínima | Suporte |
|---|---|---|
| Google Chrome | 120+ | Completo |
| Mozilla Firefox | 120+ | Completo |
| Microsoft Edge | 120+ | Completo |
| Safari | 17+ | Completo |
| Chrome Mobile | 120+ | Completo |
| Safari Mobile | 17+ | Completo |

---

## 6. Arquitetura Técnica

### 6.1 Stack Tecnológica

```
┌─────────────────────────────────────────────────────────────┐
│                    CAMADA DE APRESENTAÇÃO                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │  Landing    │  │   Admin     │  │     Relatório       │  │
│  │   Page      │  │  (Jazzmin)  │  │      View           │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│         │                │                    │               │
│         └────────────────┼────────────────────┘               │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              CAMADA DE CONTROLE (Views)                  │ │
│  │  Django Views + Django Admin + Custom Filters           │ │
│  └─────────────────────────────────────────────────────────┘ │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              CAMADA DE MODELO (Models)                   │ │
│  │  Django ORM + Models (Reagent, User)                    │ │
│  └─────────────────────────────────────────────────────────┘ │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │              CAMADA DE DADOS                             │ │
│  │  SQLite (Desenvolvimento) / PostgreSQL (Produção)     │ │
│  └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Estrutura de Diretórios

```
chemstore/
├── chemstore/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
├── reagents/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── models.py
│   ├── views.py
│   ├── urls.py
│   ├── tests.py
│   ├── templates/
│   │   ├── reagents/
│   │   │   └── report.html
│   │   └── base.html
│   └── static/
│       └── reagents/
│           └── css/
│               └── report.css
├── static/
│   └── images/
│       ├── icon.png
│       └── logo.png
├── templates/
│   └── index.html
├── manage.py
├── requirements.txt
└── README.md
```

### 6.3 Dependências

| Pacote | Versão | Propósito |
|---|---|---|
| Django | >=5.0, <6.0 | Framework web principal |
| django-jazzmin | >=3.0 | Tema moderno para admin |
| Pillow | >=10.0 | Manipulação de imagens |
| python-dotenv | >=1.0 | Variáveis de ambiente |
| whitenoise | >=6.0 | Servir arquivos estáticos em produção |
| gunicorn | >=21.0 | WSGI server para produção |

---

## 7. Modelos de Dados

### 7.1 Diagrama ER

```
┌─────────────────────┐         ┌─────────────────────┐
│        User         │         │       Reagent       │
├─────────────────────┤         ├─────────────────────┤
│ PK id (int)         │◄────────┤ FK usuario_responsavel│
│ username (varchar)  │   1:N   │ PK id (int)         │
│ email (varchar)     │         │ nome (varchar)      │
│ first_name (varchar)│         │ marca (varchar)     │
│ last_name (varchar) │         │ quantidade (float)  │
│ is_staff (bool)     │         │ unidade (varchar)   │
│ is_active (bool)    │         │ data_validade (date)│
│ date_joined (dt)    │         │ localizacao_local   │
└─────────────────────┘         │ localizacao_prateleira│
                                │ localizacao_setor   │
                                │ data_verificacao (dt)│
                                └─────────────────────┘
```

### 7.2 Especificação do Modelo Reagent

| Campo | Tipo | Obrigatório | Default | Constraints |
|---|---|---|---|---|
| id | AutoField | Sim | auto | PK |
| nome | CharField(200) | Sim | - | - |
| marca | CharField(100) | Não | "" | blank=True |
| quantidade | FloatField | Sim | - | validators=[MinValueValidator(0)] |
| unidade | CharField(10) | Sim | "g" | choices=UNIDADES |
| data_validade | DateField | Sim | - | - |
| localizacao_local | CharField(100) | Não | "" | blank=True |
| localizacao_prateleira | CharField(50) | Não | "" | blank=True |
| localizacao_setor | CharField(100) | Não | "" | blank=True |
| usuario_responsavel | ForeignKey(User) | Não | null | on_delete=SET_NULL, null=True |
| data_verificacao | DateTimeField | Sim | auto_now | auto_now=True |

### 7.3 Choices de Unidade

| Valor | Display |
|---|---|
| "g" | "Gramas" |
| "mL" | "Mililitros" |
| "kit" | "Kit" |
| "kg" | "Quilogramas" |
| "un." | "Unidades" |

---

## 8. Interface do Usuário

### 8.1 Wireframes

#### 8.1.1 Landing Page

```
┌─────────────────────────────────────────────┐
│  [Logo]        Chemstore          [Login]  │
├─────────────────────────────────────────────┤
│                                             │
│     ┌─────────────────────────────────┐     │
│     │                                 │     │
│     │   Sistema de Gerenciamento      │     │
│     │   de Reagentes Químicos         │     │
│     │                                 │     │
│     │   [Acessar Admin] [Relatório]   │     │
│     │                                 │     │
│     └─────────────────────────────────┘     │
│                                             │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│   │  Card 1 │ │  Card 2 │ │  Card 3 │    │
│   │Controle │ │Relatório│ │Localização│   │
│   │Validade │ │Completo │ │Precisa   │   │
│   └─────────┘ └─────────┘ └─────────┘    │
│                                             │
│   Tecnologias: Django, Jazzmin, Bootstrap  │
│                                             │
├─────────────────────────────────────────────┤
│              © 2026 Chemstore              │
└─────────────────────────────────────────────┘
```

#### 8.1.2 Admin - Lista de Reagentes

```
┌─────────────────────────────────────────────┐
│  [≡] Chemstore    [🔍] [👤 Admin ▼]        │
├──────┬──────────────────────────────────────┤
│      │  Reagentes                           │
│ Home │  [+ Adicionar Reagente]              │
│      │                                      │
│Reagents│  Filtros: [Todos ▼] [Expirando ▼]  │
│      │                                      │
│Users │  ┌─────────────────────────────────┐ │
│      │  │ ☑ │ Nome │ Validade │ Status │ │
│      │  ├──┼──────┼──────────┼─────────┤ │
│      │  │ ☑ │ HCl  │ 15/08/26 │ 🟡 Aviso│ │
│      │  │ ☑ │ NaOH │ 01/01/25 │ 🔴 Venc.│ │
│      │  │ ☑ │ EtOH │ 01/01/27 │ 🟢 OK   │ │
│      │  └─────────────────────────────────┘ │
│      │                                      │
│      │  [📊 Relatório de Reagentes]         │
│      │                                      │
└──────┴──────────────────────────────────────┘
```

#### 8.1.3 Relatório de Reagentes

```
┌─────────────────────────────────────────────┐
│  [Logo Chemstore]         [🖨️ Imprimir]      │
├─────────────────────────────────────────────┤
│                                             │
│   Relatório de Reagentes Químicos           │
│   Gerado em: 10/06/2026 às 14:30            │
│                                             │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐      │
│   │  Total  │ │Vencendo │ │ Vencidos │      │
│   │   150   │ │   12    │ │    3     │      │
│   └─────────┘ └─────────┘ └─────────┘      │
│                                             │
│   ┌─────────────────────────────────────┐   │
│   │ Nome │ Marca │ Qtd │ Validade │ Status│
│   ├──────┼───────┼─────┼──────────┼───────┤
│   │ HCl  │ Synth │ 500g│ 15/08/26 │ 🟡    │
│   │ NaOH │ Vetec │ 1kg │ 01/01/25 │ 🔴    │
│   └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

### 8.2 Paleta de Cores

| Elemento | Cor | Hex |
|---|---|---|
| Primária | Azul Escuro | #1e3a5f |
| Secundária | Azul Médio | #2c5282 |
| Destaque | Azul Claro | #4299e1 |
| Sucesso (OK) | Verde | #48bb78 |
| Aviso (≤30 dias) | Amarelo/Laranja | #ed8936 |
| Perigo (Vencido) | Vermelho | #f56565 |
| Fundo | Branco/Cinza Claro | #f7fafc |
| Texto Principal | Cinza Escuro | #2d3748 |
| Texto Secundário | Cinza Médio | #718096 |

### 8.3 Tipografia

| Elemento | Fonte | Tamanho | Peso |
|---|---|---|---|
| Título Principal | Inter/System | 32px | 700 |
| Título Secundário | Inter/System | 24px | 600 |
| Corpo | Inter/System | 16px | 400 |
| Label | Inter/System | 14px | 500 |
| Dados Tabela | Inter/System | 14px | 400 |

---

## 9. Fluxos de Processo

### 9.1 Fluxo de Cadastro de Reagente

```
┌─────────┐    ┌─────────────┐    ┌──────────────┐    ┌──────────┐    ┌─────────┐
│ Usuário │───►│ Acessa Admin│───►│ Clica "Add"  │───►│ Preenche │───►│ Salva   │
│         │    │  /admin/    │    │  Reagente    │    │  Form    │    │         │
└─────────┘    └─────────────┘    └──────────────┘    └──────────┘    └────┬────┘
                                                                            │
                                                                            ▼
                                                                     ┌──────────┐
                                                                     │ Validação│
                                                                     │  Django  │
                                                                     └────┬─────┘
                                                                          │
                                                     ┌────────────────────┼────────────────────┐
                                                     │                    │                    │
                                                     ▼                    ▼                    ▼
                                              ┌──────────┐        ┌──────────┐          ┌──────────┐
                                              │  Válido  │        │ Inválido │          │  Erro    │
                                              │  Salva   │        │ Retorna  │          │  Mostra  │
                                              │  no BD   │        │  Form    │          │ Mensagem │
                                              └──────────┘        └──────────┘          └──────────┘
```

### 9.2 Fluxo de Geração do Relatório

```
┌─────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────┐
│ Usuário │───►│ Acessa       │───►│ Sistema      │───►│ Calcula      │───►│ Renderiza│
│         │    │ /reagents/   │    │ Verifica     │    │ Estatísticas │    │ Template │
│         │    │ /report/     │    │ Autenticação │    │ em Tempo Real│    │          │
└─────────┘    └──────────────┘    └──────┬───────┘    └──────────────┘    └────┬─────┘
                                          │                                      │
                                          ▼                                      ▼
                                    ┌──────────┐                          ┌──────────┐
                                    │Não Autent.│                          │  Exibe   │
                                    │ Redirect │                          │ Relatório│
                                    │  Login   │                          │  HTML    │
                                    └──────────┘                          └──────────┘
```

### 9.3 Fluxo de Verificação de Validade

```
┌─────────────┐    ┌──────────────┐    ┌─────────────────────────────────────────┐
│ Data Atual  │───►│ Compara com  │───►│          Resultado                      │
│ do Servidor │    │ data_validade│    │                                         │
└─────────────┘    └──────────────┘    │  data_validade < hoje    → VENCIDO (🔴) │
                                       │  0 < dias <= 30          → AVISO (🟡)   │
                                       │  dias > 30               → OK (🟢)       │
                                       └─────────────────────────────────────────┘
```

---

## 10. Segurança e Compliance

### 10.1 Políticas de Acesso

| Recurso | Administrador | Usuário Comum | Anônimo |
|---|---|---|---|
| Landing Page | ✅ | ✅ | ✅ |
| Admin Django | ✅ | ❌ | ❌ |
| CRUD Reagentes | ✅ | ❌ | ❌ |
| Relatório | ✅ | ✅ | ❌ |
| Configurações | ✅ | ❌ | ❌ |

### 10.2 Medidas de Segurança

- [ ] **Autenticação:** Django Authentication System com sessões seguras
- [ ] **Autorização:** Permissões baseadas em grupos (Django Groups)
- [ ] **CSRF:** Tokens CSRF em todos os formulários POST
- [ ] **XSS:** Escapamento automático de templates Django
- [ ] **SQL Injection:** Uso exclusivo do ORM Django, sem queries raw
- [ ] **Senhas:** Hash PBKDF2 com SHA-256, mínimo 8 caracteres
- [ ] **Headers de Segurança:** X-Content-Type-Options, X-Frame-Options, CSP
- [ ] **HTTPS:** Obrigatório em ambiente de produção
- [ ] **Logs:** Registro de login/logout e operações críticas

### 10.3 Compliance

- [ ] LGPD: Dados pessoais dos usuários protegidos
- [ ] Auditoria: Logs de todas as operações de escrita
- [ ] Backup: Política de backup diário
- [ ] Retenção: Dados mantidos conforme política institucional

---

## 11. Plano de Sprints

### Sprint 0: Preparação do Ambiente (Duração: 2 dias)

**Objetivo:** Configurar ambiente de desenvolvimento e estrutura base do projeto.

- [ ] **Tarefa 0.1:** Criar repositório Git e estrutura de branches (main, develop)
- [ ] **Tarefa 0.2:** Configurar ambiente virtual Python (venv)
- [ ] **Tarefa 0.3:** Instalar Django 5.x e criar projeto base
- [ ] **Tarefa 0.4:** Criar app Django "reagents"
- [ ] **Tarefa 0.5:** Configurar settings.py base (DEBUG, ALLOWED_HOSTS, DATABASES)
- [ ] **Tarefa 0.6:** Configurar estrutura de diretórios (static, templates, media)
- [ ] **Tarefa 0.7:** Criar arquivo requirements.txt com dependências iniciais
- [ ] **Tarefa 0.8:** Configurar .gitignore para arquivos sensíveis e temporários
- [ ] **Tarefa 0.9:** Criar README.md inicial com instruções básicas
- [ ] **Tarefa 0.10:** Realizar commit inicial e push para repositório remoto

**Entregável:** Projeto Django funcional com estrutura base configurada.

---

### Sprint 1: Modelos e Admin Base (Duração: 3 dias)

**Objetivo:** Implementar modelos de dados e interface administrativa básica.

- [ ] **Tarefa 1.1:** Definir modelo Reagent com todos os campos especificados
- [ ] **Tarefa 1.2:** Configurar choices para campo unidade (g, mL, kit, kg, un.)
- [ ] **Tarefa 1.3:** Configurar ForeignKey para User (usuario_responsavel) com on_delete=SET_NULL
- [ ] **Tarefa 1.4:** Adicionar Meta class com verbose_name, verbose_name_plural e ordering
- [ ] **Tarefa 1.5:** Implementar __str__ method para representação legível do reagente
- [ ] **Tarefa 1.6:** Criar migrações iniciais (makemigrations)
- [ ] **Tarefa 1.7:** Aplicar migrações no banco de dados (migrate)
- [ ] **Tarefa 1.8:** Registrar modelo Reagent no admin.py
- [ ] **Tarefa 1.9:** Configurar list_display no admin (nome, marca, quantidade, unidade, data_validade)
- [ ] **Tarefa 1.10:** Configurar list_filter no admin (unidade, data_validade)
- [ ] **Tarefa 1.11:** Configurar search_fields no admin (nome, marca)
- [ ] **Tarefa 1.12:** Configurar date_hierarchy no admin (data_validade)
- [ ] **Tarefa 1.13:** Testar CRUD completo via interface admin
- [ ] **Tarefa 1.14:** Criar superusuário para testes

**Entregável:** Modelo Reagent funcional com CRUD via Django Admin.

---

### Sprint 2: Filtros e Customização Admin (Duração: 3 dias)

**Objetivo:** Implementar filtros customizados e personalizar interface admin.

- [ ] **Tarefa 2.1:** Instalar e configurar django-jazzmin no requirements.txt
- [ ] **Tarefa 2.2:** Adicionar 'jazzmin' em INSTALLED_APPS (antes de 'django.contrib.admin')
- [ ] **Tarefa 2.3:** Configurar JAZZMIN_SETTINGS no settings.py (site_title, site_header, site_brand)
- [ ] **Tarefa 2.4:** Configurar tema e cores do Jazzmin
- [ ] **Tarefa 2.5:** Configurar sidebar e menu do Jazzmin
- [ ] **Tarefa 2.6:** Implementar ExpiringSoonFilter (SimpleListFilter)
- [ ] **Tarefa 2.7:** Definir lookups do filtro (expirando, vencidos, todos)
- [ ] **Tarefa 2.8:** Implementar queryset do filtro com cálculo de 30 dias
- [ ] **Tarefa 2.9:** Adicionar ExpiringSoonFilter ao list_filter do admin
- [ ] **Tarefa 2.10:** Testar filtro com dados de teste (reagentes vencidos, próximos, futuros)
- [ ] **Tarefa 2.11:** Implementar método para exibir badge de status no list_display
- [ ] **Tarefa 2.12:** Adicionar colorização condicional no admin (verde, amarelo, vermelho)
- [ ] **Tarefa 2.13:** Configurar fieldsets no admin para organização dos campos
- [ ] **Tarefa 2.14:** Adicionar help_text nos campos do modelo quando necessário

**Entregável:** Interface admin com Jazzmin, filtros customizados e colorização de status.

---

### Sprint 3: Landing Page (Duração: 3 dias)

**Objetivo:** Desenvolver página inicial pública com design moderno e responsivo.

- [ ] **Tarefa 3.1:** Criar template base.html com estrutura HTML5 e meta tags responsivas
- [ ] **Tarefa 3.2:** Configurar diretórios de templates em settings.py (DIRS)
- [ ] **Tarefa 3.3:** Criar view index() em views.py do app reagents
- [ ] **Tarefa 3.4:** Configurar URL da landing page em urls.py do projeto (path '')
- [ ] **Tarefa 3.5:** Desenvolver header com logo e navegação
- [ ] **Tarefa 3.6:** Desenvolver hero section com gradiente e call-to-action
- [ ] **Tarefa 3.7:** Desenvolver seção de funcionalidades com cards
- [ ] **Tarefa 3.8:** Desenvolver seção de tecnologias utilizadas
- [ ] **Tarefa 3.9:** Desenvolver footer com informações de copyright
- [ ] **Tarefa 3.10:** Implementar responsividade com media queries (mobile, tablet, desktop)
- [ ] **Tarefa 3.11:** Adicionar animações sutis (hover effects, transitions)
- [ ] **Tarefa 3.12:** Otimizar imagens e assets para performance
- [ ] **Tarefa 3.13:** Testar em diferentes navegadores e dispositivos
- [ ] **Tarefa 3.14:** Validar HTML e CSS (W3C)

**Entregável:** Landing page responsiva e funcional em http://127.0.0.1:8000/

---

### Sprint 4: Relatório de Reagentes (Duração: 4 dias)

**Objetivo:** Implementar relatório profissional com estatísticas e otimização para impressão.

- [ ] **Tarefa 4.1:** Criar view report() em views.py com decorador @login_required
- [ ] **Tarefa 4.2:** Configurar URL do relatório em urls.py do app (path 'report/')
- [ ] **Tarefa 4.3:** Implementar query para buscar todos os reagentes (Reagent.objects.all())
- [ ] **Tarefa 4.4:** Implementar cálculo de estatísticas (total, vencendo em 30 dias, vencidos)
- [ ] **Tarefa 4.5:** Implementar lógica de classificação de status para cada reagente
- [ ] **Tarefa 4.6:** Criar template report.html estendendo base.html
- [ ] **Tarefa 4.7:** Desenvolver header do relatório com logo e data de geração
- [ ] **Tarefa 4.8:** Desenvolver cards de estatísticas (total, vencendo, vencidos)
- [ ] **Tarefa 4.9:** Desenvolver tabela de reagentes com todas as colunas
- [ ] **Tarefa 4.10:** Implementar indicadores visuais de status (cores e ícones)
- [ ] **Tarefa 4.11:** Implementar botão de impressão com JavaScript (window.print())
- [ ] **Tarefa 4.12:** Criar CSS específico para impressão (@media print)
- [ ] **Tarefa 4.13:** Ocultar elementos desnecessários na impressão (botões, navegação)
- [ ] **Tarefa 4.14:** Configurar quebras de página e margens para impressão
- [ ] **Tarefa 4.15:** Testar impressão em diferentes navegadores
- [ ] **Tarefa 4.16:** Implementar ordenação da tabela (por nome, validade, status)
- [ ] **Tarefa 4.17:** Adicionar link/botão "Relatório de Reagentes" no admin
- [ ] **Tarefa 4.18:** Testar com grandes volumes de dados (performance)

**Entregável:** Relatório funcional, responsivo e otimizado para impressão.

---

### Sprint 5: Personalização Visual e Assets (Duração: 2 dias)

**Objetivo:** Implementar suporte a ícone e logo personalizados.

- [ ] **Tarefa 5.1:** Criar diretório static/images/ no projeto
- [ ] **Tarefa 5.2:** Configurar STATIC_ROOT e STATICFILES_DIRS em settings.py
- [ ] **Tarefa 5.3:** Criar ícone padrão (icon.png) em static/images/
- [ ] **Tarefa 5.4:** Criar logo padrão (logo.png) em static/images/
- [ ] **Tarefa 5.5:** Implementar lógica de fallback para ícone/logo padrão
- [ ] **Tarefa 5.6:** Configurar favicon no template base.html
- [ ] **Tarefa 5.7:** Configurar logo no header do Jazzmin (JAZZMIN_SETTINGS)
- [ ] **Tarefa 5.8:** Configurar logo na landing page
- [ ] **Tarefa 5.9:** Configurar logo no relatório
- [ ] **Tarefa 5.10:** Documentar processo de substituição de ícone/logo
- [ ] **Tarefa 5.11:** Testar com diferentes formatos (PNG, ICO, SVG)
- [ ] **Tarefa 5.12:** Verificar responsividade do logo em diferentes telas

**Entregável:** Sistema com suporte a branding personalizado e assets configurados.

---

### Sprint 6: Testes e Qualidade (Duração: 3 dias)

**Objetivo:** Garantir qualidade do código e funcionalidades através de testes.

- [ ] **Tarefa 6.1:** Configurar pytest e pytest-django
- [ ] **Tarefa 6.2:** Criar fixtures para dados de teste
- [ ] **Tarefa 6.3:** Escrever testes unitários para modelo Reagent
- [ ] **Tarefa 6.4:** Escrever testes para validação de campos (quantidade > 0, data futura)
- [ ] **Tarefa 6.5:** Escrever testes para método __str__ do modelo
- [ ] **Tarefa 6.6:** Escrever testes para ExpiringSoonFilter
- [ ] **Tarefa 6.7:** Escrever testes para view index (landing page)
- [ ] **Tarefa 6.8:** Escrever testes para view report (autenticação, conteúdo)
- [ ] **Tarefa 6.9:** Escrever testes de integração para fluxo completo de CRUD
- [ ] **Tarefa 6.10:** Executar testes e corrigir falhas
- [ ] **Tarefa 6.11:** Verificar cobertura de testes (mínimo 80%)
- [ ] **Tarefa 6.12:** Executar linting com flake8
- [ ] **Tarefa 6.13:** Corrigir violações de PEP 8
- [ ] **Tarefa 6.14:** Verificar segurança com bandit
- [ ] **Tarefa 6.15:** Verificar dependências com safety/pip-audit

**Entregável:** Suite de testes completa com cobertura ≥ 80% e código conforme PEP 8.

---

### Sprint 7: Documentação e Deploy (Duração: 2 dias)

**Objetivo:** Finalizar documentação e preparar para deploy.

- [ ] **Tarefa 7.1:** Atualizar README.md com descrição completa do projeto
- [ ] **Tarefa 7.2:** Documentar processo de instalação passo a passo
- [ ] **Tarefa 7.3:** Documentar configuração de variáveis de ambiente
- [ ] **Tarefa 7.4:** Documentar configuração de ícone e logo personalizados
- [ ] **Tarefa 7.5:** Documentar URLs de acesso e funcionalidades
- [ ] **Tarefa 7.6:** Criar documentação de troubleshooting comuns
- [ ] **Tarefa 7.7:** Configurar whitenoise para servir static files em produção
- [ ] **Tarefa 7.8:** Configurar ALLOWED_HOSTS para ambiente de produção
- [ ] **Tarefa 7.9:** Configurar DEBUG = False para produção
- [ ] **Tarefa 7.10:** Configurar SECRET_KEY via variável de ambiente
- [ ] **Tarefa 7.11:** Criar arquivo .env.example
- [ ] **Tarefa 7.12:** Configurar gunicorn para deploy
- [ ] **Tarefa 7.13:** Testar deploy local com gunicorn
- [ ] **Tarefa 7.14:** Criar checklist de verificação pré-deploy
- [ ] **Tarefa 7.15:** Realizar commit final e tag de versão (v1.0.0)

**Entregável:** Sistema documentado, testado e pronto para deploy em produção.

---

### Sprint 8: Revisão e Lançamento (Duração: 2 dias)

**Objetivo:** Revisão final, treinamento e lançamento do sistema.

- [ ] **Tarefa 8.1:** Revisão final do código (code review)
- [ ] **Tarefa 8.2:** Teste de aceitação com usuários-chave
- [ ] **Tarefa 8.3:** Coletar feedback dos usuários de teste
- [ ] **Tarefa 8.4:** Ajustes finais baseados no feedback
- [ ] **Tarefa 8.5:** Preparar material de treinamento (guia rápido)
- [ ] **Tarefa 8.6:** Realizar sessão de treinamento com usuários
- [ ] **Tarefa 8.7:** Configurar monitoramento e logs em produção
- [ ] **Tarefa 8.8:** Configurar backup automático do banco de dados
- [ ] **Tarefa 8.9:** Deploy em ambiente de produção
- [ ] **Tarefa 8.10:** Verificação pós-deploy (smoke tests)
- [ ] **Tarefa 8.11:** Comunicar lançamento aos stakeholders
- [ ] **Tarefa 8.12:** Agendar revisão pós-lançamento (1 semana)

**Entregável:** Sistema em produção, documentado e com usuários treinados.

---

## 12. Critérios de Aceitação

### 12.1 Critérios Gerais

- [ ] Todos os requisitos funcionais (RF-001 a RF-009) estão implementados e testados
- [ ] Todos os requisitos não-funcionais de performance são atendidos
- [ ] Cobertura de testes ≥ 80%
- [ ] Código segue PEP 8 sem violações críticas
- [ ] Documentação está completa e atualizada
- [ ] Sistema funciona em todos os navegadores suportados
- [ ] Sistema é responsivo em mobile, tablet e desktop

### 12.2 Critérios por Funcionalidade

| Funcionalidade | Critério de Aceitação | Status |
|---|---|---|
| Cadastro de Reagente | Consegue criar, editar, visualizar e excluir reagente | [ ] |
| Filtro de Validade | Filtro "Expirando em 30 dias" mostra apenas reagentes relevantes | [ ] |
| Landing Page | Carrega em < 2s, responsiva, links funcionais | [ ] |
| Relatório | Gera em < 3s, estatísticas corretas, impressão funciona | [ ] |
| Admin Jazzmin | Interface moderna, branding personalizado, filtros funcionais | [ ] |
| Autenticação | Login obrigatório para admin e relatório, logout funciona | [ ] |
| Personalização | Ícone e logo customizados aparecem corretamente | [ ] |

---

## 13. Riscos e Mitigações

| ID | Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|---|
| R001 | Atraso no desenvolvimento devido à complexidade do Jazzmin | Média | Médio | Reservar tempo extra na Sprint 2, consultar documentação oficial |
| R002 | Performance ruim do relatório com muitos registros | Baixa | Alto | Implementar paginação, otimizar queries com select_related |
| R003 | Incompatibilidade de navegadores com CSS moderno | Média | Médio | Testar em todos os navegadores suportados, usar fallbacks |
| R004 | Perda de dados por falha de backup | Baixa | Crítico | Configurar backup automático diário, testar restauração |
| R005 | Resistência dos usuários à nova interface | Média | Médio | Sessão de treinamento, material de apoio, coleta de feedback |
| R006 | Vulnerabilidades de segurança | Baixa | Crítico | Revisão de segurança, uso de dependências atualizadas, testes com bandit |
| R007 | Dependência do Jazzmin descontinuada | Baixa | Alto | Monitorar projeto, ter plano de migração para admin padrão |
| R008 | Dados de validade incorretos por timezone | Média | Alto | Usar timezone-aware datetimes, testar com diferentes timezones |

---

## 14. Glossário

| Termo | Definição |
|---|---|
| **Reagente** | Substância química utilizada em reações ou análises laboratoriais |
| **Validade** | Período em que o reagente mantém suas propriedades especificadas |
| **Jazzmin** | Tema moderno e responsivo para interface administrativa do Django |
| **CRUD** | Create, Read, Update, Delete — operações básicas de persistência |
| **MVT** | Model-View-Template — padrão de arquitetura do Django |
| **CSRF** | Cross-Site Request Forgery — tipo de ataque web mitigado por tokens |
| **XSS** | Cross-Site Scripting — tipo de ataque por injeção de scripts |
| **ORM** | Object-Relational Mapping — camada de abstração do banco de dados |
| **PEP 8** | Guia de estilo para código Python |
| **LGPD** | Lei Geral de Proteção de Dados — legislação brasileira |
| **FISPQ** | Ficha de Informações de Segurança de Produtos Químicos |
| **NPS** | Net Promoter Score — métrica de satisfação do cliente |
| **RPO** | Recovery Point Objective — objetivo de ponto de recuperação |
| **Smoke Test** | Teste rápido para verificar funcionalidades básicas após deploy |

---

## Histórico de Revisões

| Versão | Data | Autor | Alterações |
|---|---|---|---|
| 1.0 | 10/06/2026 | Equipe de Produto | Versão inicial do PRD |

---

## Aprovações

| Função | Nome | Assinatura | Data |
|---|---|---|---|
| Product Owner | | | |
| Tech Lead | | | |
| Stakeholder (Laboratório) | | | |

---

*Documento gerado em 10 de Junho de 2026. Este PRD é um documento vivo e pode ser atualizado conforme necessário durante o ciclo de desenvolvimento.*
