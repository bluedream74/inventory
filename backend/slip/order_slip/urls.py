from django.urls import path
from . import views

urlpatterns = [
    path('', views.OrderView.as_view()),
    path('<int:order_id>', views.OrderView.as_view()),
    path('saveRows/<int:order_id>', views.OrderView.save_rows),
    # path('', views.OrderView.getOrder)
]
