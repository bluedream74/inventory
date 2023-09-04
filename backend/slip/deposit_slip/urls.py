from django.urls import path
from . import views

urlpatterns = [
    path('', views.DepositView.as_view()),
    path('<int:slip_id>', views.DepositView.as_view()),
    path('saveRow/<int:slip_id>', views.DepositView.save_row),
    path('deleteRow', views.DepositView.delete_row),
    # path('', views.OrderView.getOrder)
]
