from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from django.db import models
from django.utils import timezone


UNIDADES = [
    ('g', 'Gramas'),
    ('mL', 'Mililitros'),
    ('kit', 'Kit'),
    ('kg', 'Quilogramas'),
    ('un.', 'Unidades'),
]


class Reagent(models.Model):
    nome = models.CharField(max_length=200, verbose_name='Nome')
    marca = models.CharField(max_length=100, blank=True, default='', verbose_name='Marca')
    quantidade = models.FloatField(validators=[MinValueValidator(0)], verbose_name='Quantidade')
    unidade = models.CharField(max_length=10, choices=UNIDADES, default='g', verbose_name='Unidade')
    data_validade = models.DateField(verbose_name='Data de Validade')
    localizacao_local = models.CharField(max_length=100, blank=True, default='', verbose_name='Local')
    localizacao_prateleira = models.CharField(max_length=50, blank=True, default='', verbose_name='Prateleira')
    localizacao_setor = models.CharField(max_length=100, blank=True, default='', verbose_name='Setor')
    usuario_responsavel = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name='Usuário Responsável',
    )
    data_verificacao = models.DateTimeField(auto_now=True, verbose_name='Data de Verificação')

    class Meta:
        verbose_name = 'Reagente'
        verbose_name_plural = 'Reagentes'
        ordering = ['data_validade']

    def __str__(self):
        return f'{self.nome} ({self.quantidade}{self.unidade})'

    @property
    def dias_para_vencer(self):
        hoje = timezone.now().date()
        return (self.data_validade - hoje).days

    @property
    def status_validade(self):
        dias = self.dias_para_vencer
        if dias < 0:
            return 'vencido'
        elif dias <= 30:
            return 'aviso'
        return 'ok'
