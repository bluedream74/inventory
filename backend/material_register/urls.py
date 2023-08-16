from django.urls import path
from . import views

urlpatterns = [
    path('', views.MaterialtView.as_view()),
    path('<int:id>', views.MaterialtView.as_view()),
    # path('edit', views.ProductView.editProduct, name='product_edit'),
]
