from django.urls import path
from . import views

urlpatterns = [
    path('', views.PaymentView.as_view()),
    path('<int:slip_id>', views.PaymentView.as_view()),
    path('saveRow/<int:slip_id>', views.PaymentView.save_row),
    path('deleteRow', views.PaymentView.delete_row),
    # path('', views.OrderView.getOrder)
]
