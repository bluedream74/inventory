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
    path('api/admin/', admin.site.urls),
    path('api/product_register/', include('product_register.urls')),
    path('api/color_register/', include('color_register.urls')),
    path('api/season_register/', include('season_register.urls')),
    path('api/brand_register/', include('brand_register.urls')),
    path('api/material_register/', include('material_register.urls')),
    path('api/size_register/', include('size_register.urls')),
    path('api/delivery_register/', include('delivery_register.urls')),
    path('api/origin_country_register/', include('origin_country_register.urls')),
    path('api/item_register/', include('item_register.urls')),
    path('api/factory_register/', include('factory_register.urls')),
    
    path('api/storehouse_register/', include('storehouse_register.urls')),
    path('api/charger_register/', include('charger_register.urls')),
    path('api/dealer_register/', include('dealer_register.urls')),
    path('api/exhibition_register/', include('exhibition_register.urls')),
    
    path('api/incomingDepartment_register/', include('incomingDepartment_register.urls')),
    path('api/deposittype_register/',include('deposittype_register.urls')),
    path('api/entrust_register/', include('entrust_register.urls')),
    path('api/slip/', include('slip.urls')),
    path('api/product_inventory/', include('product_inventory.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
