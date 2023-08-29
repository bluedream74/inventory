from django.urls import path
from . import views

urlpatterns = [
    path('get_ledger/', views.ProductInventoryView.get_ledger),
    # path('', views.OrderView.getOrder)
]
