"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
# from rest_framework import routers
from product_register import views
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('admin/', admin.site.urls),
    path('product_register/', include('product_register.urls')),
    path('color_register/', include('color_register.urls')),
    path('season_register/', include('season_register.urls')),
    path('brand_register/', include('brand_register.urls')),
    path('material_register/', include('material_register.urls')),
    path('size_register/', include('size_register.urls')),
    path('delivery_register/', include('delivery_register.urls')),
    path('origin_country_register/', include('origin_country_register.urls')),

    path('storehouse_register/', include('storehouse_register.urls')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
