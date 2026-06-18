#!/usr/bin/env python
"""
Script para popular o banco de dados com reagentes químicos de exemplo.
"""

import os
import django
from datetime import timedelta, date
from random import choice, uniform, randint

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chemstore.settings')
django.setup()

from django.contrib.auth.models import User
from reagents.models import Reagent

# Limpar reagentes existentes
print("Limpando reagentes existentes...")
Reagent.objects.all().delete()

# Criar usuário de teste se não existir
print("Criando usuário de teste...")
usuario, created = User.objects.get_or_create(
    username='admin',
    defaults={'email': 'admin@chemstore.com', 'is_staff': True, 'is_superuser': True}
)
if created:
    usuario.set_password('admin')
    usuario.save()
    print("Usuário 'admin' criado com senha 'admin'")

# Dados de exemplo
REAGENTES = [
    # Ácidos
    {'nome': 'Ácido Sulfúrico', 'marca': 'Vetec', 'unidade': 'mL'},
    {'nome': 'Ácido Clorídrico', 'marca': 'Neon', 'unidade': 'mL'},
    {'nome': 'Ácido Nítrico', 'marca': 'Sigma-Aldrich', 'unidade': 'mL'},
    {'nome': 'Ácido Acético', 'marca': 'Dinâmica', 'unidade': 'mL'},
    {'nome': 'Ácido Fosfórico', 'marca': 'Merck', 'unidade': 'mL'},
    
    # Bases/Hidróxidos
    {'nome': 'Hidróxido de Sódio', 'marca': 'Neon', 'unidade': 'g'},
    {'nome': 'Hidróxido de Potássio', 'marca': 'Vetec', 'unidade': 'g'},
    {'nome': 'Hidróxido de Amônio', 'marca': 'Dinâmica', 'unidade': 'mL'},
    {'nome': 'Hidróxido de Cálcio', 'marca': 'Sigma-Aldrich', 'unidade': 'g'},
    
    # Solventes
    {'nome': 'Acetona', 'marca': 'Neon', 'unidade': 'mL'},
    {'nome': 'Etanol Absoluto', 'marca': 'Dinâmica', 'unidade': 'mL'},
    {'nome': 'Metanol', 'marca': 'Merck', 'unidade': 'mL'},
    {'nome': 'Acetato de Etila', 'marca': 'Vetec', 'unidade': 'mL'},
    {'nome': 'Hexano', 'marca': 'Sigma-Aldrich', 'unidade': 'mL'},
    {'nome': 'Diclorometano', 'marca': 'Neon', 'unidade': 'mL'},
    
    # Indicadores
    {'nome': 'Fenolftaleína', 'marca': 'Vetec', 'unidade': 'g'},
    {'nome': 'Azul de Bromotimol', 'marca': 'Sigma-Aldrich', 'unidade': 'g'},
    {'nome': 'Alaranjado de Metila', 'marca': 'Neon', 'unidade': 'g'},
    {'nome': 'Verde de Bromocresol', 'marca': 'Merck', 'unidade': 'g'},
    
    # Sais e Reagentes Gerais
    {'nome': 'Cloreto de Sódio', 'marca': 'Dinâmica', 'unidade': 'g'},
    {'nome': 'Sulfato de Cobre', 'marca': 'Neon', 'unidade': 'g'},
    {'nome': 'Nitrato de Prata', 'marca': 'Sigma-Aldrich', 'unidade': 'g'},
    {'nome': 'Carbonato de Sódio', 'marca': 'Vetec', 'unidade': 'g'},
    {'nome': 'Bicarbonato de Sódio', 'marca': 'Dinâmica', 'unidade': 'g'},
    {'nome': 'Cloreto de Potássio', 'marca': 'Merck', 'unidade': 'g'},
    {'nome': 'Sulfato de Magnésio', 'marca': 'Neon', 'unidade': 'g'},
    {'nome': 'Iodeto de Potássio', 'marca': 'Vetec', 'unidade': 'g'},
    
    # Padrões e Kits
    {'nome': 'Padrão de pH 4.0', 'marca': 'Merck', 'unidade': 'mL'},
    {'nome': 'Padrão de pH 7.0', 'marca': 'Merck', 'unidade': 'mL'},
    {'nome': 'Kit Teste de Dureza', 'marca': 'Alfa Chemistry', 'unidade': 'kit'},
]

MARCAS_ADICIONAIS = ['Fisher Scientific', 'LabSynth', 'Quimex', 'ProQuimica']
LOCAIS = ['Laboratório Principal', 'Estoques', 'Sala de Balanças', 'Câmara Fria']
PRATELEIRAS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2', 'E1', 'E2']
SETORES = ['Química Analítica', 'Química Orgânica', 'Controle de Qualidade', 'Pesquisa']

# Calcular datas
hoje = date.today()

print("\nCriando 30 reagentes...")
for i, dados in enumerate(REAGENTES, 1):
    # Status de validade variado
    if i <= 5:
        # Vencidos (5 itens)
        dias_para_vencer = -randint(1, 60)
    elif i <= 12:
        # Vencendo em breve (7 itens)
        dias_para_vencer = randint(1, 30)
    else:
        # Válidos (18 itens)
        dias_para_vencer = randint(31, 365)
    
    data_validade = hoje + timedelta(days=dias_para_vencer)
    
    # Quantidade aleatória
    if dados['unidade'] in ['g', 'kg']:
        quantidade = round(uniform(10, 500), 2) if dados['unidade'] == 'g' else round(uniform(0.5, 5), 2)
    elif dados['unidade'] == 'mL':
        quantidade = round(uniform(100, 5000), 2)
    elif dados['unidade'] == 'kit':
        quantidade = randint(1, 10)
    else:
        quantidade = round(uniform(10, 100), 2)
    
    # Criar reagente
    reagente = Reagent.objects.create(
        nome=dados['nome'],
        marca=dados['marca'] if randint(1, 10) > 2 else '',  # 20% sem marca
        quantidade=quantidade,
        unidade=dados['unidade'],
        data_validade=data_validade,
        localizacao_local=choice(LOCAIS),
        localizacao_prateleira=choice(PRATELEIRAS),
        localizacao_setor=choice(SETORES),
        usuario_responsavel=usuario if randint(1, 10) > 3 else None,  # 30% sem responsável
    )
    
    print(f"  {i:2d}. {reagente.nome} - Validade: {data_validade.strftime('%d/%m/%Y')} - Status: {reagente.status_validade.upper()}")

print(f"\n✅ Total de reagentes criados: {Reagent.objects.count()}")
print(f"   - Vencidos: {sum(1 for r in Reagent.objects.all() if r.status_validade == 'vencido')}")
print(f"   - Vencendo em 30 dias: {sum(1 for r in Reagent.objects.all() if r.status_validade == 'aviso')}")
print(f"   - Válidos: {sum(1 for r in Reagent.objects.all() if r.status_validade == 'ok')}")
print("\n🎉 Banco de dados populado com sucesso!")