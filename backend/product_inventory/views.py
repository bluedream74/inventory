from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from product_inventory.models import ProductInventory
from django.db.models import Sum
from product_register.models import Product
from size_register.models import Size
from slip.order_slip.models import OrderItem
from slip.purchaseorder_slip.models import PurchaseorderItem
@permission_classes([AllowAny])
class ProductInventoryView(APIView):  
    @api_view(['GET'])
    @permission_classes([AllowAny])
    def get_ledger(request):
        result = ProductInventory.objects.filter(state=True).values('product', 'size').annotate(
            total_quantity=Sum('quantity'), 
            total_in = Sum('in_quantity'),
            total_out = Sum('out_quantity'),
        )
        for obj in result:
            product = Product.objects.get(pk=obj['product'])
            obj['product_code'] = product.code
            obj['product_name'] = product.name
            obj['max_price'] = product.max_cost

            size = Size.objects.get(pk=obj['size'])
            obj['size_code'] = size.code
            
            obj['total_order'] = OrderItem.objects.filter(product=product, size=size).aggregate(Sum('quantity'))['quantity__sum']
            obj['total_purchaseorder'] = PurchaseorderItem.objects.filter(product=product, size=size).aggregate(Sum('quantity'))['quantity__sum']
        print(result)
        status_code = status.HTTP_200_OK
        return Response(result, status=status_code)