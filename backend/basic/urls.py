from .views import ColorView, ColorItemView, ProductView, SizeView, SeasonView, BrandView, ItemView, \
MaterialView, DeliveryView, ChargerView, ExhibitionView, DealerView, IncomingDepartmentView, OriginCountryView, \
StorehouseView, CustomerView, DeposittypeView
from django.urls import path
from rest_framework import routers

urlpatterns = [
    path('color/', ColorView.as_view()),
    path('color/<int:id>', ColorItemView.as_view()),
    path('product/', ProductView.as_view({'get': 'list', 'post': 'create'})),
    path('product/<int:pk>', ProductView.as_view({'get': 'retrieve', 'put': 'partial_update', 'delete': 'destroy'})),
    path('size/', SizeView.as_view({'get': 'list', 'post': 'create'})),
    path('size/<int:pk>', SizeView.as_view({'get': 'retrieve', 'put': 'partial_update', 'delete': 'destroy'})),
    path('season/', SeasonView.as_view({'get': 'list', 'post': 'create'})),
    path('season/<int:pk>', SeasonView.as_view({'get': 'retrieve', 'put': 'partial_update', 'delete': 'destroy'})),
    path('brand/', BrandView.as_view({'get': 'list', 'post': 'create'})),
    path('brand/<int:pk>', BrandView.as_view({'get': 'retrieve', 'put': 'partial_update', 'delete': 'destroy'})),
    path('item/', ItemView.as_view({'get': 'list', 'post': 'create'})),
    path('item/<int:pk>', ItemView.as_view({'get': 'retrieve', 'put': 'partial_update', 'delete': 'destroy'})),
    path('material/', MaterialView.as_view({'get': 'list', 'post': 'create'})),
    path('material/<int:pk>', MaterialView.as_view({'get': 'retrieve', 'put': 'partial_update', 'delete': 'destroy'})),
    path('delivery/', DeliveryView.as_view({'get': 'list', 'post': 'create'})),
    path('delivery/<int:pk>', DeliveryView.as_view({'get': 'retrieve', 'put': 'partial_update', 'delete': 'destroy'})),
    path('charger/', ChargerView.as_view({'get': 'list', 'post': 'create'})),
    path('charger/<int:pk>', ChargerView.as_view({'get': 'retrieve', 'put': 'partial_update', 'delete': 'destroy'})),
    path('exhibition/', ExhibitionView.as_view({'get': 'list', 'post': 'create'})),
    path('exhibition/<int:pk>', ExhibitionView.as_view({'get': 'retrieve', 'put': 'partial_update', 'delete': 'destroy'})),
    path('dealer/', DealerView.as_view({'get': 'list', 'post': 'create'})),
    path('dealer/<int:pk>', DealerView.as_view({'get': 'retrieve', 'put': 'partial_update', 'delete': 'destroy'})),
    path('incoming_department/', IncomingDepartmentView.as_view({'get': 'list', 'post': 'create'})),
    path('incoming_department/<int:pk>', IncomingDepartmentView.as_view({'get': 'retrieve', 'put': 'partial_update', 'delete': 'destroy'})),
    path('origin_country/', OriginCountryView.as_view({'get': 'list', 'post': 'create'})),
    path('origin_country/<int:pk>', OriginCountryView.as_view({'get': 'retrieve', 'put': 'partial_update', 'delete': 'destroy'})),
    path('storehouse/', StorehouseView.as_view({'get': 'list', 'post': 'create'})),
    path('storehouse/<int:pk>', StorehouseView.as_view({'get': 'retrieve', 'put': 'partial_update', 'delete': 'destroy'})),
    path('customer/', CustomerView.as_view({'get': 'list', 'post': 'create'})),
    path('customer/<int:pk>', CustomerView.as_view({'get': 'retrieve', 'put': 'partial_update', 'delete': 'destroy'})),
    path('deposittype/', DeposittypeView.as_view({'get': 'list', 'post': 'create'})),
    path('deposittype/<int:pk>', DeposittypeView.as_view({'get': 'retrieve', 'put': 'partial_update', 'delete': 'destroy'})),
]