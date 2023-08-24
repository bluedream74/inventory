from django.urls import path
from . import views

urlpatterns = [
    path('', views.IncomingDepartmentView.as_view()),
    path('<int:id>', views.IncomingDepartmentView.as_view)
]
