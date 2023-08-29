from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from product_inventory.models import ProductInventory
from django.db.models import Sum

@permission_classes([AllowAny])
class ProductInventoryView(APIView):  
    @api_view(['GET'])
    @permission_classes([AllowAny])
    def get_ledger(request):
        result = ProductInventory.objects.values('product_code', 'product_name', 'max_price', 'size_code').annotate(
            total_quantity=Sum('quantity'), 
            total_order = Sum('order_quantity'),
            total_purchaseorder = Sum('purcaseorder_quantity'),
            total_in = Sum('purchase_quantity'),
            total_out = Sum('sale_quantity')
        )
        status_code = status.HTTP_200_OK
        return Response(result, status=status_code)