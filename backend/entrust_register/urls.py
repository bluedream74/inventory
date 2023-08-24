from django.urls import path
from . import views

urlpatterns = [
    path('', views.EntrustView.as_view()),
    path('<int:id>', views.EntrustView.as_view()),
    # path('edit', views.ProductView.editProduct, name='product_edit'),
]
