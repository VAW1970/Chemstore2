# Design System — Chemstore

Sistema de Gerenciamento de Reagentes Químicos

---

## 🎨 Identidade Visual

### Paleta de Cores

#### Cores Primárias
```
--primary:      #1e3a5f  (Azul Profundo — Confiança, Profissionalismo)
--secondary:    #2c5282  (Azul Intermediário — Estabilidade)
--accent:       #4299e1  (Azul Vibrante — Inovação, Tecnologia)
```

#### Cores de Status (Semânticas)
```
--success:      #48bb78  (Verde — OK, Dentro da Validade)
--warning:      #ed8936  (Laranja — Aviso, Vencendo em ≤30 dias)
--danger:       #f56565  (Vermelho — Vencido, Ação Required)
```

#### Cores Neutras
```
--bg:           #f7fafc  (Fundo Claro)
--text:         #2d3748  (Texto Primário)
--text-muted:   #718096  (Texto Secundário)
--white:        #ffffff
```

### Tipografia

**Fonte Principal:** `-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif`

**Hierarquia:**
- **Títulos:** `font-weight: 700` (Bold)
- **Subtítulos:** `font-weight: 600` (Semi-bold)
- **Corpo:** `font-weight: 400` (Regular)
- **Labels:** `font-weight: 500` (Medium)

**Tamanhos:**
```
Hero Title:     2.75rem (44px)
Section Title:  2rem (32px)
Card Title:     1.25rem (20px)
Body:           1rem (16px)
Small:          0.9rem (14.4px)
Caption:        0.85rem (13.6px)
```

---

## 🧩 Componentes

### 1. Navbar Chemstore

**Propriedades:**
- Background: `--primary` (#1e3a5f)
- Altura: `auto` com padding `0.75rem 0`
- Sombra: `0 2px 10px rgba(0,0,0,0.15)`
- Logo: Ícone `fa-flask` + texto branco

**Estados:**
- Links: `rgba(255,255,255,0.85)` → hover: `#fff`

---

### 2. Hero Section

**Gradiente:** `linear-gradient(135deg, --primary 0%, --secondary 50%, --accent 100%)`

**Animação:**
```css
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.1); opacity: 1; }
}
```

**Botões:**
- **Primary (Light):** Fundo branco, texto primário
- **Outline:** Borda 2px branca, fundo transparente, hover: `rgba(255,255,255,0.15)`
- **Border-radius:** `50px` (Pill)
- **Padding:** `0.75rem 2rem`
- **Efeito hover:** `translateY(-2px)` + sombra

---

### 3. Feature Cards

**Estrutura:**
- Background: `#fff`
- Border: `1px solid #e2e8f0`
- Border-radius: `12px`
- Padding: `2rem 1.5rem`
- Sombra hover: `0 10px 30px rgba(0,0,0,0.08)`
- Transform hover: `translateY(-5px)`

**Ícones:**
- Tamanho: `70x70px`
- Border-radius: `50%`
- Cores por categoria:
  - **Validade:** `--danger` (vermelho)
  - **Relatório:** `--accent` (azul)
  - **Localização:** `--success` (verde)

---

### 4. Tech Badges

**Estilo:**
- Background: `#fff`
- Border: `1px solid #e2e8f0`
- Border-radius: `50px`
- Padding: `0.6rem 1.25rem`
- Hover: `scale(1.05)`

---

### 5. Stat Cards (Relatório)

**Gradientes:**
```css
.stat-total:   linear-gradient(135deg, #1e3a5f, #2c5282)
.stat-warning: linear-gradient(135deg, #ed8936, #dd6b20)
.stat-danger:  linear-gradient(135deg, #f56565, #e53e3e)
```

**Propriedades:**
- Border-radius: `12px`
- Padding: `1.5rem`
- Sombra: `0 4px 15px rgba(0,0,0,0.1)`
- Número: `2.5rem`, `font-weight: 700`
- Label: `0.9rem`, `opacity: 0.9`

---

### 6. Tabela de Reagentes

**Cabeçalho:**
- Background: `#1e3a5f`
- Texto: uppercase, `letter-spacing: 0.5px`
- Font-size: `0.85rem`

**Linhas por Status:**
```css
.status-vencido: background-color: rgba(245, 101, 101, 0.08)
.status-aviso:   background-color: rgba(237, 137, 54, 0.08)
.status-ok:      background-color: rgba(72, 187, 120, 0.05)
```

**Badges:**
- Font-size: `0.75rem`
- Padding: `0.35em 0.75em`
- Cores: `bg-danger`, `bg-warning`, `bg-success`

---

## 🎭 Ícones (Font Awesome 6.5.1)

### Principais
```
fa-flask            → Logo / Reagentes
fa-clock            → Validade
fa-chart-bar        → Relatório
fa-map-marker-alt   → Localização
fa-file-alt         → Relatório (nav)
fa-print            → Imprimir
fa-sign-in-alt      → Login
fa-home             → Início
fa-lock             → Admin
fa-user             → Usuário
fa-shield-halved    → Segurança
fa-server           → Backend
fa-database         → Banco de Dados
fa-wind             → WhiteNoise
fa-palette          → Jazzmin
fa-bootstrap        → Bootstrap
fa-python           → Django/Python
```

---

## 🧪 Elementos Visuais Químicos

### Padrões Sugeridos

**Gradientes Químicos:**
```css
/* Reagente Seguro */
background: linear-gradient(135deg, #48bb78, #38a169)

/* Reagente em Aviso */
background: linear-gradient(135deg, #ed8936, #dd6b20)

/* Reagente Vencido */
background: linear-gradient(135deg, #f56565, #e53e3e)

/* Elemento Inerte */
background: linear-gradient(135deg, #718096, #4a5568)
```

**Efeitos de Fundo (Opcional):**
```css
/* Padrão Molecular */
background-image: 
  radial-gradient(circle at 20% 30%, rgba(66, 153, 225, 0.1) 0%, transparent 50%),
  radial-gradient(circle at 80% 70%, rgba(72, 187, 120, 0.1) 0%, transparent 50%);

/* Grade de Laboratório */
background-image: 
  linear-gradient(rgba(30, 58, 95, 0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(30, 58, 95, 0.03) 1px, transparent 1px);
background-size: 20px 20px;
```

**Animações Químicas:**
```css
/* Efeito de Bolha */
@keyframes bubble {
  0%, 100% { transform: translateY(0); opacity: 0; }
  50% { opacity: 0.5; }
  100% { transform: translateY(-100px); opacity: 0; }
}

/* Efeito de Dissolução */
@keyframes dissolve {
  0% { opacity: 1; filter: blur(0); }
  100% { opacity: 0; filter: blur(10px); }
}
```

---

## 📐 Layout & Grid

### Breakpoints (Bootstrap 5)
```
xs:  <576px   (mobile)
sm:  ≥576px   (tablet grande)
md:  ≥768px   (tablet)
lg:  ≥992px   (desktop)
xl:  ≥1200px  (desktop grande)
xxl: ≥1400px  (desktop extra)
```

### Espaçamento

**Padding de Seções:**
- Desktop: `5rem 0`
- Mobile: `3rem 0`

**Gap entre Cards:** `1.5rem` (g-4)

**Container:** Max-width responsivo do Bootstrap 5

---

## 🖱️ Estados de Interação

### Hover
- **Cards:** `translateY(-5px)` + sombra aumentada
- **Botões:** `translateY(-2px)` + sombra
- **Badges:** `scale(1.05)`
- **Links:** aumento de opacidade/cor

### Focus
- Utilizar focus ring padrão do Bootstrap 5
- Outline acessível em todos os elementos interativos

### Active
- Manter feedback visual consistente com a paleta

---

## 📊 Status de Validade (Sistema Semântico)

### Cores e Significados

| Status   | Cor       | Dias para Vencer | Background (Tabela)         | Badge        |
|----------|-----------|------------------|-----------------------------|--------------|
| **OK**   | Verde     | > 30 dias        | `rgba(72, 187, 120, 0.05)`  | `bg-success` |
| **Aviso**| Laranja   | ≤ 30 dias        | `rgba(237, 137, 54, 0.08)`  | `bg-warning` |
| **Vencido**| Vermelho| < 0 dias         | `rgba(245, 101, 101, 0.08)` | `bg-danger`  |

### Ícones de Status
```
✅ OK       → fa-check-circle (verde)
⚠️ Aviso    → fa-exclamation-triangle (laranja)
❌ Vencido  → fa-times-circle (vermelho)
```

---

## 🖨️ Impressão (Relatório)

### Configurações
```css
@media print {
  - Ocultar navbar e botões de ação
  - Fonte: 11pt
  - Página: A4 landscape
  - Margens: 1.5cm
  - Manter cores de status com `-webkit-print-color-adjust: exact`
  - Remover sombras e efeitos hover
  - Bordas sutis em stat cards
}
```

---

## 🌙 Modo Escuro (Jazzmin Admin)

**Configuração:**
```python
JAZZMIN_UI_TWEAKS = {
    'default_theme_mode': 'dark',
    'show_theme': False,
}
```

**Cores Ajustadas:**
- Background: Tons escuros de azul/cinza
- Texto: Branco/cinza claro
- Manter contraste de status (verde/laranja/vermelho)

---

## 📱 Responsividade

### Ajustes Mobile

**Hero:**
- Título: `2rem` → `1.65rem`
- Padding: `3rem 0 2.5rem`
- Botões: `display: block`, `width: 80%`, centralizados

**Features:**
- Padding: `3rem 0`
- Cards empilhados (col-12)

**Tabela:**
- Scroll horizontal ativado
- Fonte reduzida para `9pt` na impressão

---

## 🎯 Princípios de Design

### 1. Clareza
- Status visível imediatamente por cores
- Ícones universais e reconhecíveis
- Tipografia legível

### 2. Confiança
- Paleta azul (profissionalismo, ciência)
- Layout limpo e organizado
- Informações hierarquizadas

### 3. Segurança
- Alertas visuais fortes para vencimento
- Contraste adequado para acessibilidade
- Feedback claro de ações

### 4. Modernidade
- Gradientes sutis
- Sombras suaves
- Bordas arredondadas
- Animações discretas

---

## 🧪 Inspirações Visuais

### Laboratório Moderno
- **Superfícies:** Limpas, brancas, reflexivas
- **Iluminação:** Fria, azulada
- **Organização:** Sistemática, etiquetada
- **Segurança:** Cores de alerta padronizadas

### Elementos Químicos
- **Tabela Periódica:** Grid, cores por categoria
- **Frascos:** Transparência, rótulos claros
- **Líquidos:** Gradientes, profundidade
- **Reações:** Mudança de cor como feedback

---

## 🔄 Próximas Melhorias Sugeridas

### Visuais
- [ ] Adicionar ícones específicos por tipo de reagente (ácido, base, solvente, etc.)
- [ ] Implementar tooltips com informações adicionais
- [ ] Adicionar animação de loading com tema químico
- [ ] Criar ilustrações SVG de frascos/equipamentos

### Funcionais
- [ ] Gráficos de distribuição por status
- [ ] Timeline de vencimentos
- [ ] Códigos de cores por categoria química
- [ ] QR Code para etiquetagem de frascos

### Acessibilidade
- [ ] Testar contraste com WCAG AA/AAA
- [ ] Adicionar skip links
- [ ] Garantir navegação por teclado
- [ ] Labels ARIA em elementos dinâmicos

---

## 📚 Referências

- **Bootstrap 5.3:** https://getbootstrap.com/docs/5.3/
- **Font Awesome 6.5:** https://fontawesome.com/icons
- **Django Jazzmin:** https://github.com/farridav/django-jazzmin
- **Material Design:** https://material.io/design
- **WCAG 2.1:** https://www.w3.org/WAI/WCAG21/quickref/

---

**Versão:** 1.0  
**Última atualização:** Junho 2026  
**Autor:** Chemstore Team