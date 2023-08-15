from django.urls import path
from . import views

urlpatterns = [
    path('', views.SeasonView.as_view()),
    path('<int:id>', views.SeasonView.as_view()),
    # path('edit', views.SeasonView.editSeason, name='season_edit'),
]