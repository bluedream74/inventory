from django.urls import path
from . import views

urlpatterns = [
    path('', views.PurchaseView.as_view()),
    path('<int:slip_id>', views.PurchaseView.as_view()),
    path('saveRow/<int:slip_id>', views.PurchaseView.save_row),
    path('deleteRow', views.PurchaseView.delete_row),
    # path('', views.OrderView.getOrder)
]
