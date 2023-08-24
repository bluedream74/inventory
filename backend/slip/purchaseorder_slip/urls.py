from django.urls import path
from . import views

urlpatterns = [
    path('', views.PurchaseorderView.as_view()),
    path('<int:slip_id>', views.PurchaseorderView.as_view()),
    path('saveRows/<int:slip_id>', views.PurchaseorderView.save_rows),
    # path('', views.OrderView.getOrder)
]
