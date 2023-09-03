from django.urls import path
from . import views

urlpatterns = [
    path('', views.SaleView.as_view()),
    path('<int:slip_id>', views.SaleView.as_view()),
    path('saveRow/<int:slip_id>', views.SaleView.save_row),
    path('deleteRow', views.SaleView.delete_row),
    # path('', views.OrderView.getOrder)
]
