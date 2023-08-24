from django.urls import path
from . import views

urlpatterns = [
    path('', views.PaymentView.as_view()),
    path('<int:slip_id>', views.PaymentView.as_view()),
    path('saveRows/<int:slip_id>', views.PaymentView.save_rows),
    # path('', views.OrderView.getOrder)
]
