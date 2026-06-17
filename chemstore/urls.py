from django.contrib import admin
from django.urls import include, path

from reagents.views import index

urlpatterns = [
    path('', index, name='landing'),
    path('admin/', admin.site.urls),
    path('reagents/', include('reagents.urls')),
]
