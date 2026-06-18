from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.utils import timezone

from .models import Reagent


CATEGORIA_ICONES = {
    'acido': 'fa-flask',
    'base': 'fa-flask',
    'solvente': 'fa-eye-dropper',
    'indicador': 'fa-droplet',
    'reagente': 'fa-flask',
    'padrao': 'fa-flask',
}


def get_icone_categoria(nome):
    nome_lower = nome.lower()
    if 'ácido' in nome_lower or 'acid' in nome_lower:
        return 'fa-flask'
    elif 'base' in nome_lower or 'hidróxido' in nome_lower or 'hidroxido' in nome_lower:
        return 'fa-flask'
    elif 'solvente' in nome_lower or 'acetona' in nome_lower or 'etanol' in nome_lower:
        return 'fa-eye-dropper'
    elif 'indicador' in nome_lower or 'fenolftaleína' in nome_lower or 'fenolftaleina' in nome_lower:
        return 'fa-droplet'
    else:
        return 'fa-flask'


def index(request):
    return render(request, 'index.html')


@login_required
def report(request):
    reagentes = Reagent.objects.all().order_by('data_validade')

    total = reagentes.count()
    vencidos = sum(1 for r in reagentes if r.status_validade == 'vencido')
    vencendo = sum(1 for r in reagentes if r.status_validade == 'aviso')

    reagentes_com_status = []
    for r in reagentes:
        reagentes_com_status.append({
            'reagent': r,
            'status': r.status_validade,
            'dias': r.dias_para_vencer,
            'icone': get_icone_categoria(r.nome),
        })

    context = {
        'reagentes': reagentes_com_status,
        'total': total,
        'vencidos': vencidos,
        'vencendo': vencendo,
        'data_geracao': timezone.now(),
    }
    return render(request, 'reagents/report.html', context)
