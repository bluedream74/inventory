from .views import OrderSlipView
from django.urls import path
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'order_slip', OrderSlipView, basename='user')
urlpatterns = router.urls