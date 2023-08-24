from django.urls import path
from . import views

urlpatterns = [
    path('', views.DepositView.as_view()),
    path('<int:slip_id>', views.DepositView.as_view()),
    path('saveRows/<int:slip_id>', views.DepositView.save_rows),
    # path('', views.OrderView.getOrder)
]
