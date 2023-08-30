from django.urls import path
from . import views

urlpatterns = [
    path('', views.FactorytView.as_view()),
    path('<int:id>', views.FactorytView.as_view()),
    # path('edit', views.ProductView.editProduct, name='product_edit'),
]
