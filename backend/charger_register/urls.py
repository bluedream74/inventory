from django.urls import path
from . import views

urlpatterns = [
    path('', views.ChargerView.as_view()),
    path('<int:id>', views.ChargerView.as_view()),
    # path('edit', views.ProductView.editProduct, name='product_edit'),
]
