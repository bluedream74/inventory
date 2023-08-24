from django.urls import path
from . import views

urlpatterns = [
    path('', views.PurchaseView.as_view()),
    path('<int:slip_id>', views.PurchaseView.as_view()),
    path('saveRows/<int:slip_id>', views.PurchaseView.save_rows),
    # path('', views.OrderView.getOrder)
]
