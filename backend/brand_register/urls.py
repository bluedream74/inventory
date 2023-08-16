from django.urls import path
from . import views

urlpatterns = [
    path('', views.BrandView.as_view()),
    path('<int:id>', views.BrandView.as_view()),
]
