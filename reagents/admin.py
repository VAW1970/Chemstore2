from datetime import timedelta

from django.contrib import admin
from django.utils import timezone
from django.utils.safestring import mark_safe

from .models import Reagent


class ExpiringSoonFilter(admin.SimpleListFilter):
    title = 'Status de Validade'
    parameter_name = 'validade_status'

    def lookups(self, request, model_admin):
        return [
            ('vencidos', 'Vencidos'),
            ('expirando', 'Expirando em 30 dias'),
            ('ok', 'Válidos'),
        ]

    def queryset(self, request, queryset):
        hoje = timezone.now().date()
        limite = hoje + timedelta(days=30)
        if self.value() == 'vencidos':
            return queryset.filter(data_validade__lt=hoje)
        if self.value() == 'expirando':
            return queryset.filter(data_validade__gte=hoje, data_validade__lte=limite)
        if self.value() == 'ok':
            return queryset.filter(data_validade__gt=limite)
        return queryset


@admin.register(Reagent)
class ReagentAdmin(admin.ModelAdmin):
    list_display = [
        'nome', 'marca', 'quantidade_unidade', 'data_validade',
        'status_badge', 'localizacao_completa', 'usuario_responsavel',
    ]
    list_filter = [ExpiringSoonFilter, 'unidade', 'usuario_responsavel']
    search_fields = ['nome', 'marca']
    date_hierarchy = 'data_validade'
    ordering = ['data_validade']

    fieldsets = (
        ('Informações do Reagente', {
            'fields': ('nome', 'marca', 'quantidade', 'unidade'),
        }),
        ('Validade', {
            'fields': ('data_validade',),
        }),
        ('Localização', {
            'fields': ('localizacao_local', 'localizacao_prateleira', 'localizacao_setor'),
            'classes': ('collapse',),
            'description': 'Informações de localização física do reagente no laboratório.',
        }),
        ('Responsável', {
            'fields': ('usuario_responsavel',),
        }),
    )

    def quantidade_unidade(self, obj):
        return f'{obj.quantidade} {obj.get_unidade_display()}'
    quantidade_unidade.short_description = 'Quantidade'

    def localizacao_completa(self, obj):
        partes = [obj.localizacao_local, obj.localizacao_prateleira, obj.localizacao_setor]
        return ' - '.join(p for p in partes if p)
    localizacao_completa.short_description = 'Localização'

    def status_badge(self, obj):
        status = obj.status_validade
        styles = (
            'padding:2px 10px;border-radius:12px;'
            'font-size:12px;font-weight:bold;color:white;'
        )
        if status == 'vencido':
            html = f'<span style="background:#f56565;{styles}">VENCIDO</span>'
        elif status == 'aviso':
            html = f'<span style="background:#ed8936;{styles}">AVISO</span>'
        else:
            html = f'<span style="background:#48bb78;{styles}">OK</span>'
        return mark_safe(html)
    status_badge.short_description = 'Status'
