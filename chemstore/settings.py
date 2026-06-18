import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-#6xp4po$4&z&=20u8$-%4m^esxpa*@ja1)wj+muxqu(0r=@gfy')

DEBUG = os.environ.get('DEBUG', 'True').lower() in ('true', '1', 'yes')

ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', 'localhost,127.0.0.1').split(',')

INSTALLED_APPS = [
    'jazzmin',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'reagents',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'chemstore.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'chemstore.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator', 'OPTIONS': {'min_length': 8}},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'pt-br'

TIME_ZONE = 'America/Sao_Paulo'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'

STATICFILES_DIRS = [
    BASE_DIR / 'static',
]

STATIC_ROOT = BASE_DIR / 'staticfiles'

STORAGES = {
    'default': {
        'BACKEND': 'django.core.files.storage.FileSystemStorage',
    },
    'staticfiles': {
        'BACKEND': 'whitenoise.storage.CompressedStaticFilesStorage',
    },
}

# Forçar Django a usar arquivos estáticos atualizados
STATICFILES_STORAGE = 'whitenoise.storage.CompressedStaticFilesStorage'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

JAZZMIN_SETTINGS = {
    'site_title': 'Chemstore',
    'site_header': 'Chemstore',
    'site_brand': 'Chemstore',
    'site_logo': 'images/logo.svg',
    'login_logo': 'images/logo.svg',
    'login_logo_dark': 'images/logo.svg',
    'site_icon': 'images/icon.svg',
    'welcome_sign': 'Bem-vindo ao Chemstore',
    'copyright': 'Chemstore',
    'search_model': ['reagents.Reagent'],
    'user_avatar': None,
    'menu_title': '',
    'menu_collapsible': True,
    'show_ui_builder': False,
    'custom_css': 'css/jazzmin-custom.css',
    'order_with_respect_to': ['auth'],
    'icons': {
        'auth.User': 'fa-solid fa-user',
        'auth.Group': 'fa-solid fa-users',
    },
    'default_icon_parents': 'fa-solid fa-folder',
    'default_icon_children': 'fa-solid fa-circle',
    'related_modal_active': False,
    'hide_apps': ['reagents'],
    'custom_links': {
        'Dashboard': [
            {
                'name': 'Reagentes',
                'url': 'admin:reagents_reagent_changelist',
                'icon': 'fa-solid fa-flask',
                'permissions': ['auth.view_user'],
            },
            {
                'name': 'Relatório',
                'url': '/reagents/report/',
                'icon': 'fa-solid fa-file-alt',
                'permissions': ['auth.view_user'],
            },
        ],
    },
    'topmenu_links': [
        {'name': 'Início', 'url': 'admin:index', 'permissions': ['auth.view_user']},
        {'name': 'Relatório', 'url': '/reagents/report/', 'permissions': ['auth.view_user']},
        {'name': 'Site', 'url': '/', 'permissions': ['auth.view_user']},
    ],
}

JAZZMIN_UI_TWEAKS = {
    'theme': 'default',
    'default_theme_mode': 'light',
    'show_theme': False,
    'custom_styles': [
        'css/jazzmin-custom.css',
    ],
    'custom_js': None,
    'use_no_ui_slider': False,
    'actions_stickytop': False,
}

SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
SESSION_COOKIE_AGE = 43200
