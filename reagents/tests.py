from datetime import date, timedelta

from django.contrib.auth.models import User
from django.test import RequestFactory, TestCase
from django.urls import reverse

from .admin import ExpiringSoonFilter, ReagentAdmin
from .models import Reagent


class ReagentModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='labtech', password='testpass123'
        )
        self.reagent_ok = Reagent.objects.create(
            nome='Etanol',
            marca='Synth',
            quantidade=500,
            unidade='mL',
            data_validade=date.today() + timedelta(days=365),
            usuario_responsavel=self.user,
        )
        self.reagent_expiring = Reagent.objects.create(
            nome='HCl',
            marca='Vetec',
            quantidade=200,
            unidade='mL',
            data_validade=date.today() + timedelta(days=15),
        )
        self.reagent_expired = Reagent.objects.create(
            nome='NaOH',
            marca='Sigma',
            quantidade=1,
            unidade='kg',
            data_validade=date.today() - timedelta(days=5),
        )

    def test_str_representation(self):
        self.assertEqual(str(self.reagent_ok), 'Etanol (500mL)')

    def test_str_with_different_unit(self):
        r = Reagent.objects.create(
            nome='Kit DNA', quantidade=2, unidade='kit',
            data_validade=date.today() + timedelta(days=100),
        )
        self.assertEqual(str(r), 'Kit DNA (2kit)')

    def test_dias_para_vencer_ok(self):
        self.assertEqual(self.reagent_ok.dias_para_vencer, 365)

    def test_dias_para_vencer_expiring(self):
        self.assertEqual(self.reagent_expiring.dias_para_vencer, 15)

    def test_dias_para_vencer_expired(self):
        self.assertEqual(self.reagent_expired.dias_para_vencer, -5)

    def test_status_validade_ok(self):
        self.assertEqual(self.reagent_ok.status_validade, 'ok')

    def test_status_validade_aviso(self):
        self.assertEqual(self.reagent_expiring.status_validade, 'aviso')

    def test_status_validade_vencido(self):
        self.assertEqual(self.reagent_expired.status_validade, 'vencido')

    def test_status_validade_exactly_30_days(self):
        r = Reagent.objects.create(
            nome='Teste30',
            quantidade=10,
            unidade='g',
            data_validade=date.today() + timedelta(days=30),
        )
        self.assertEqual(r.status_validade, 'aviso')

    def test_status_validade_31_days(self):
        r = Reagent.objects.create(
            nome='Teste31',
            quantidade=10,
            unidade='g',
            data_validade=date.today() + timedelta(days=31),
        )
        self.assertEqual(r.status_validade, 'ok')

    def test_default_unidade_is_g(self):
        r = Reagent.objects.create(
            nome='Teste',
            quantidade=100,
            data_validade=date.today() + timedelta(days=100),
        )
        self.assertEqual(r.unidade, 'g')

    def test_usuario_responsavel_can_be_null(self):
        self.assertIsNone(self.reagent_expiring.usuario_responsavel)

    def test_ordering_by_data_validade(self):
        reagentes = list(Reagent.objects.all())
        self.assertEqual(reagentes[0], self.reagent_expired)
        self.assertEqual(reagentes[1], self.reagent_expiring)
        self.assertEqual(reagentes[2], self.reagent_ok)

    def test_marca_blank_default(self):
        r = Reagent.objects.create(
            nome='SemMarca',
            quantidade=50,
            data_validade=date.today() + timedelta(days=100),
        )
        self.assertEqual(r.marca, '')

    def test_localizacao_fields_blank(self):
        r = Reagent.objects.create(
            nome='SemLoc',
            quantidade=10,
            data_validade=date.today() + timedelta(days=100),
        )
        self.assertEqual(r.localizacao_local, '')
        self.assertEqual(r.localizacao_prateleira, '')
        self.assertEqual(r.localizacao_setor, '')


class ExpiringSoonFilterTest(TestCase):
    def setUp(self):
        self.reagent_ok = Reagent.objects.create(
            nome='OK Reagent',
            quantidade=100,
            unidade='g',
            data_validade=date.today() + timedelta(days=60),
        )
        self.reagent_expiring = Reagent.objects.create(
            nome='Expiring Reagent',
            quantidade=50,
            unidade='mL',
            data_validade=date.today() + timedelta(days=10),
        )
        self.reagent_expired = Reagent.objects.create(
            nome='Expired Reagent',
            quantidade=1,
            unidade='kg',
            data_validade=date.today() - timedelta(days=10),
        )

    def test_filter_vencidos(self):
        filter_obj = ExpiringSoonFilter(
            RequestFactory().get('/?validade_status=vencidos'),
            {'validade_status': ['vencidos']},
            Reagent, ReagentAdmin,
        )
        qs = filter_obj.queryset(None, Reagent.objects.all())
        self.assertEqual(qs.count(), 1)
        self.assertEqual(qs.first(), self.reagent_expired)

    def test_filter_expirando(self):
        filter_obj = ExpiringSoonFilter(
            RequestFactory().get('/?validade_status=expirando'),
            {'validade_status': ['expirando']},
            Reagent, ReagentAdmin,
        )
        qs = filter_obj.queryset(None, Reagent.objects.all())
        self.assertEqual(qs.count(), 1)
        self.assertEqual(qs.first(), self.reagent_expiring)

    def test_filter_ok(self):
        filter_obj = ExpiringSoonFilter(
            RequestFactory().get('/?validade_status=ok'),
            {'validade_status': ['ok']},
            Reagent, ReagentAdmin,
        )
        qs = filter_obj.queryset(None, Reagent.objects.all())
        self.assertEqual(qs.count(), 1)
        self.assertEqual(qs.first(), self.reagent_ok)

    def test_filter_all_returns_all(self):
        filter_obj = ExpiringSoonFilter(
            RequestFactory().get('/'), {}, Reagent, ReagentAdmin,
        )
        qs = filter_obj.queryset(None, Reagent.objects.all())
        self.assertEqual(qs.count(), 3)


class IndexViewTest(TestCase):
    def test_index_returns_200(self):
        response = self.client.get(reverse('landing'))
        self.assertEqual(response.status_code, 200)

    def test_index_uses_correct_template(self):
        response = self.client.get(reverse('landing'))
        self.assertTemplateUsed(response, 'index.html')

    def test_index_contains_chemstore(self):
        response = self.client.get(reverse('landing'))
        self.assertContains(response, 'Chemstore')


class ReportViewTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='reporter', password='testpass123'
        )
        self.reagent = Reagent.objects.create(
            nome='TestReagent',
            marca='TestBrand',
            quantidade=100,
            unidade='g',
            data_validade=date.today() + timedelta(days=100),
        )

    def test_report_requires_login(self):
        response = self.client.get(reverse('reagents:report'))
        self.assertEqual(response.status_code, 302)
        self.assertIn('login', response.url)

    def test_report_accessible_after_login(self):
        self.client.login(username='reporter', password='testpass123')
        response = self.client.get(reverse('reagents:report'))
        self.assertEqual(response.status_code, 200)

    def test_report_uses_correct_template(self):
        self.client.login(username='reporter', password='testpass123')
        response = self.client.get(reverse('reagents:report'))
        self.assertTemplateUsed(response, 'reagents/report.html')

    def test_report_contains_statistics(self):
        self.client.login(username='reporter', password='testpass123')
        response = self.client.get(reverse('reagents:report'))
        self.assertContains(response, 'Total de Reagentes')
        self.assertContains(response, 'Vencendo')
        self.assertContains(response, 'Vencidos')

    def test_report_contains_reagent_data(self):
        self.client.login(username='reporter', password='testpass123')
        response = self.client.get(reverse('reagents:report'))
        self.assertContains(response, 'TestReagent')

    def test_report_shows_zero_when_empty(self):
        Reagent.objects.all().delete()
        self.client.login(username='reporter', password='testpass123')
        response = self.client.get(reverse('reagents:report'))
        self.assertContains(response, 'Nenhum reagente cadastrado')


class CRUDIntegrationTest(TestCase):
    def setUp(self):
        self.admin_user = User.objects.create_superuser(
            username='admin2', password='adminpass123',
            email='admin@test.com',
        )

    def test_admin_can_create_reagent(self):
        self.client.login(username='admin2', password='adminpass123')
        self.client.post('/admin/reagents/reagent/add/', {
            'nome': 'Novo Reagente',
            'marca': 'Nova Marca',
            'quantidade': '100',
            'unidade': 'g',
            'data_validade': (
                date.today() + timedelta(days=365)
            ).strftime('%Y-%m-%d'),
            'localizacao_local': 'Laboratório A',
            'localizacao_prateleira': 'P1',
            'localizacao_setor': 'Química',
        })
        self.assertEqual(Reagent.objects.count(), 1)
        self.assertEqual(Reagent.objects.first().nome, 'Novo Reagente')

    def test_admin_can_list_reagents(self):
        Reagent.objects.create(
            nome='ListTest',
            quantidade=50,
            unidade='mL',
            data_validade=date.today() + timedelta(days=100),
        )
        self.client.login(username='admin2', password='adminpass123')
        response = self.client.get('/admin/reagents/reagent/')
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'ListTest')

    def test_admin_can_delete_reagent(self):
        r = Reagent.objects.create(
            nome='DeleteTest',
            quantidade=10,
            unidade='g',
            data_validade=date.today() + timedelta(days=100),
        )
        self.client.login(username='admin2', password='adminpass123')
        self.client.post(
            f'/admin/reagents/reagent/{r.pk}/delete/', {'post': 'yes'}
        )
        self.assertEqual(Reagent.objects.count(), 0)
