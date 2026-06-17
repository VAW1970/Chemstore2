from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.utils import timezone

from .models import Reagent


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
        })

    context = {
        'reagentes': reagentes_com_status,
        'total': total,
        'vencidos': vencidos,
        'vencendo': vencendo,
        'data_geracao': timezone.now(),
    }
    return render(request, 'reagents/report.html', context)
