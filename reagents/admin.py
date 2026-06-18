from datetime import timedelta

from django.contrib import admin
from django.utils import timezone
from django.utils.safestring import mark_safe

from .models import Reagent


HTML_DESCRIPTIONS = {
    'reagente': mark_safe('<i class="fa-solid fa-flask text-primary"></i> Dados básicos do reagente químico'),
    'validade': mark_safe('<i class="fa-solid fa-clock text-warning"></i> Controle de validade com alertas automáticos'),
    'localizacao': mark_safe('<i class="fa-solid fa-map-pin text-success"></i> Informações de localização física no laboratório'),
    'responsavel': mark_safe('<i class="fa-solid fa-user text-info"></i> Usuário responsável pelo acompanhamento'),
}


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
        'icone_nome', 'marca', 'quantidade_unidade', 'data_validade',
        'status_badge', 'localizacao_completa', 'usuario_responsavel',
    ]
    list_filter = [ExpiringSoonFilter, 'unidade', 'usuario_responsavel']
    search_fields = ['nome', 'marca', 'localizacao_setor', 'localizacao_local']
    date_hierarchy = 'data_validade'
    ordering = ['data_validade']
    list_per_page = 20

    fieldsets = (
        ('Informações do Reagente', {
            'fields': ('nome', 'marca', 'quantidade', 'unidade'),
            'description': HTML_DESCRIPTIONS['reagente'],
        }),
        ('Validade', {
            'fields': ('data_validade',),
            'description': HTML_DESCRIPTIONS['validade'],
        }),
        ('Localização', {
            'fields': ('localizacao_local', 'localizacao_prateleira', 'localizacao_setor'),
            'classes': ('collapse',),
            'description': HTML_DESCRIPTIONS['localizacao'],
        }),
        ('Responsável', {
            'fields': ('usuario_responsavel',),
            'description': HTML_DESCRIPTIONS['responsavel'],
        }),
    )

    def quantidade_unidade(self, obj):
        return f'{obj.quantidade} {obj.get_unidade_display()}'
    quantidade_unidade.short_description = 'Quantidade'
    quantidade_unidade.admin_order_field = 'quantidade'

    def icone_nome(self, obj):
        icone = 'fa-flask'
        nome_lower = obj.nome.lower()
        if 'ácido' in nome_lower or 'acid' in nome_lower:
            icone = 'fa-flask'
        elif 'base' in nome_lower or 'hidróxido' in nome_lower or 'hidroxido' in nome_lower:
            icone = 'fa-flask'
        elif 'solvente' in nome_lower or 'acetona' in nome_lower or 'etanol' in nome_lower:
            icone = 'fa-eye-dropper'
        elif 'indicador' in nome_lower:
            icone = 'fa-droplet'
        return mark_safe(f'<i class="fa-solid {icone}" style="color:#4299e1;margin-right:8px;"></i>{obj.nome}')
    icone_nome.short_description = 'Reagente'
    icone_nome.admin_order_field = 'nome'

    def localizacao_completa(self, obj):
        partes = [obj.localizacao_local, obj.localizacao_prateleira, obj.localizacao_setor]
        return ' - '.join(p for p in partes if p)
    localizacao_completa.short_description = 'Localização'

    def status_badge(self, obj):
        status = obj.status_validade
        styles = (
            'padding:4px 12px;border-radius:8px;'
            'font-size:12px;font-weight:600;color:white;'
            'text-transform:uppercase;letter-spacing:0.3px;'
            'box-shadow:0 2px 4px rgba(0,0,0,0.1);'
        )
        icons = {
            'vencido': '<i class="fa-solid fa-circle-xmark"></i> ',
            'aviso': '<i class="fa-solid fa-triangle-exclamation"></i> ',
            'ok': '<i class="fa-solid fa-circle-check"></i> ',
        }
        colors = {
            'vencido': 'background:linear-gradient(135deg, #f56565, #e53e3e);',
            'aviso': 'background:linear-gradient(135deg, #ed8936, #dd6b20);',
            'ok': 'background:linear-gradient(135deg, #48bb78, #38a169);',
        }
        icon = icons.get(status, '')
        color = colors.get(status, colors['ok'])
        labels = {
            'vencido': 'VENCIDO',
            'aviso': 'AVISO',
            'ok': 'OK',
        }
        label = labels.get(status, 'OK')
        html = f'<span style="{color}{styles}">{icon}{label}</span>'
        return mark_safe(html)
    status_badge.short_description = 'Status'
