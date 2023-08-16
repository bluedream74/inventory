from django.urls import path, include

urlpatterns = [
    path('order_slip/', include('slip.order_slip.urls'))
]
