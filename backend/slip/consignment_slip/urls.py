from django.urls import path
from . import views

urlpatterns = [
    path('', views.ConsignmentView.as_view()),
    path('<int:slip_id>', views.ConsignmentView.as_view()),
    path('saveRows/<int:slip_id>', views.ConsignmentView.save_rows),
    # path('', views.OrderView.getOrder)
]
