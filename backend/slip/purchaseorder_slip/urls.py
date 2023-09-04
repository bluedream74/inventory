from django.urls import path
from . import views

urlpatterns = [
    path('', views.PurchaseorderView.as_view()),
    path('<int:slip_id>', views.PurchaseorderView.as_view()),
    path('saveRow/<int:slip_id>', views.PurchaseorderView.save_row),
    path('deleteRow', views.PurchaseorderView.delete_row),
    # path('', views.OrderView.getOrder)
]
