from django.urls import path, include

urlpatterns = [
    path('order_slip/', include('slip.order_slip.urls')),
    path('sale_slip/', include('slip.sale_slip.urls')),
    path('consignment_slip/', include('slip.consignment_slip.urls')),
    path('deposit_slip/', include('slip.deposit_slip.urls')),
    path('purchaseorder_slip/', include('slip.purchaseorder_slip.urls')),
    path('purchase_slip/', include('slip.purchase_slip.urls')),
    path('collection_slip/', include('slip.collection_slip.urls')),
    path('payment_slip/', include('slip.payment_slip.urls'))
]
