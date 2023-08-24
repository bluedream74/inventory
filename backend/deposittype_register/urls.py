from django.urls import path
from . import views

urlpatterns = [
     path('', views.DeposittypeView.as_view()),
     path('<int:id>', views.DeposittypeView.as_view()),
]
