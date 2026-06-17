from django.urls import path

from . import views

app_name = 'reagents'

urlpatterns = [
    path('report/', views.report, name='report'),
]
