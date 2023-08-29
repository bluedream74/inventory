from django.urls import path
from . import views

urlpatterns = [
    path('', views.SaleView.as_view()),
    path('<int:slip_id>', views.SaleView.as_view()),
    path('saveRows/<int:slip_id>', views.SaleView.save_rows),
    # path('', views.OrderView.getOrder)
]
