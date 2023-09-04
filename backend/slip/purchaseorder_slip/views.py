from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import PurchaseorderSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Purchaseorder, PurchaseorderItem
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from size_register.models import Size
from color_register.models import Color
from product_register.models import Product
from product_inventory.models import ProductInventory
from django.http  import HttpResponse
@permission_classes([AllowAny])
class PurchaseorderView(APIView):
    
    def get(self, request):
        purchaseorders = Purchaseorder.objects.all().order_by('id')
        serializer = PurchaseorderSerializer(purchaseorders,  many=True)
        return Response({'purchaseorders': serializer.data}, status=status.HTTP_200_OK)
    def post(self, request):
        data = request.data
        print(data)
        newSlip = Purchaseorder(
            no= data['no'],
            slip_date= str(data['slip_date']),
            delivery_date= str(data['delivery_date']),
            cost_category= str(data['cost_category']),
            factory_code= data['factory_code'],
            storehouse_code= data['storehouse_code'],
            charger_code= data['charger_code'],
            status= data['status'],
            other= data['other']
        )
        newSlip.save()
        if (newSlip.no == '新規登録'):
            newSlip.no = str(newSlip.pk).zfill(6)
            newSlip.save()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    def put(self, request, slip_id):
        data = request.data
        print(data)
        editSlip = Purchaseorder.objects.get(pk=slip_id)
        editSlip.slip_date= str(data['slip_date'])
        editSlip.delivery_date= str(data['delivery_date'])
        editSlip.cost_category= str(data['cost_category'])
        editSlip.factory_code= data['factory_code']
        editSlip.storehouse_code= data['storehouse_code']
        editSlip.charger_code= data['charger_code']
        editSlip.status= data['status']
        editSlip.other= data['other']
        editSlip.save()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    def delete(self, request, slip_id):
        Purchaseorder.objects.get(pk=slip_id).delete()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    @api_view(['POST'])
    @permission_classes([AllowAny])
    def save_row(request, slip_id):
        data = request.data
        try:
            if(PurchaseorderItem.objects.filter(row_id = data['id'])):
                
                row = PurchaseorderItem.objects.get(row_id = data['id'])
                row.purchaseorder = Purchaseorder.objects.get(pk=slip_id)
                row.product = Product.objects.get(pk=data['product'])
                row.size = Size.objects.get(pk=data['size'])
                row.color = Color.objects.get(pk=data['color'])
                row.quantity = data['quantity']
                row.unit = data['unit']
                row.save()
                print(data, row)
            else:    
                newItem = PurchaseorderItem (
                    row_id = data['id'],
                    purchaseorder = Purchaseorder.objects.get(pk=slip_id),
                    product = Product.objects.get(pk=data['product']),
                    size= Size.objects.get(pk=data['size']),
                    color = Color.objects.get(pk=data['color']),
                    quantity = data['quantity'],
                    unit = data['unit']
                )
                newItem.save()
        except Exception as e:
            return HttpResponse(f'An error occurred: {str(e)}')
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    
    @api_view(['POST'])
    @permission_classes([AllowAny])
    def delete_row(request):
        try:
            deleteItem = PurchaseorderItem.objects.get(row_id = request.data['row_id'])
            deleteItem.delete()
        except Exception as e:
            return HttpResponse(f'An error occurred: {str(e)}')
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    