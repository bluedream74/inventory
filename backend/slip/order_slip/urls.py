from django.urls import path
from . import views

urlpatterns = [
    path('', views.OrderView.as_view()),
    path('<int:order_id>', views.OrderView.as_view()),
    path('saveRow/<int:order_id>', views.OrderView.save_row),
    path('deleteRow', views.OrderView.delete_row),
    # path('', views.OrderView.getOrder)
]
