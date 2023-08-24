from django.urls import path
from . import views

urlpatterns = [
    path('', views.CollectionView.as_view()),
    path('<int:slip_id>', views.CollectionView.as_view()),
    path('saveRows/<int:slip_id>', views.CollectionView.save_rows),
    # path('', views.OrderView.getOrder)
]
