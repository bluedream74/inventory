from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import PurchaseSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Purchase, PurchaseItem
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from datetime import datetime
from slip.purchaseorder_slip.models import PurchaseorderItem, Purchaseorder
from product_inventory.models import ProductInventory
from size_register.models import Size
from color_register.models import Color
from product_register.models import Product
from django.http  import HttpResponse
@permission_classes([AllowAny])
class PurchaseView(APIView):
    
    def get(self, request):
        purchases = Purchase.objects.all().order_by('id')
        serializer = PurchaseSerializer(purchases,  many=True)
        return Response({'purchases': serializer.data}, status=status.HTTP_200_OK)
    def post(self, request):
        data = request.data
        print(data)
        newSlip = Purchase(
            no= data['no'],
            slip_date= str(data['slip_date']),
            delivery_date= str(data['delivery_date']),
            crash_credit= str(data['crash_credit']),
            cost_category= str(data['cost_category']),
            factory_code= data['factory_code'],
            storehouse_code= data['storehouse_code'],
            charger_code= data['charger_code'],
            purchaseorder= Purchaseorder.objects.get(pk=data['purchaseorder']),
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
        editSlip = Purchase.objects.get(pk=slip_id)
        editSlip.slip_date= str(data['slip_date'])
        editSlip.delivery_date= str(data['delivery_date'])
        editSlip.crash_credit= str(data['crash_credit'])
        editSlip.cost_category= str(data['cost_category'])
        editSlip.factory_code= data['factory_code']
        editSlip.storehouse_code= data['storehouse_code']
        editSlip.charger_code= data['charger_code']
        editSlip.purchaseorder= Purchaseorder.objects.get(pk=data['purchaseorder'])
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
        Purchase.objects.get(pk=slip_id).delete()
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
            if(PurchaseItem.objects.filter(row_id = data['id'])):
                row = PurchaseItem.objects.get(row_id = data['id'])
                row.purchase = Purchase.objects.get(pk=slip_id)
                row.product = Product.objects.get(pk=data['product'])
                row.size = Size.objects.get(pk=data['size'])
                row.color = Color.objects.get(pk=data['color'])
                row.quantity = data['quantity']
                row.unit = data['unit']
                row.purchaseorderItem = PurchaseorderItem.objects.get(row_id = data['id'])
                row.save()
                try: 
                    editInventory  = ProductInventory.objects.filter(purchaseItem = row, state = True).last()
                    old_in_quantity = editInventory.in_quantity
                    old_quantity = editInventory.quantity
                    editInventory.in_quantity = data['quantity']
                    editInventory.quantity = old_quantity - old_in_quantity +  data['quantity']   
                    editInventory.save()
                except Exception as e:
                    False

            else:    
                newItem = PurchaseItem (
                    row_id = data['id'],
                    purchase = Purchase.objects.get(pk=slip_id),
                    product = Product.objects.get(pk=data['product']),
                    size= Size.objects.get(pk=data['size']),
                    color = Color.objects.get(pk=data['color']),
                    quantity = data['quantity'],
                    unit = data['unit'],
                    purchaseorderItem = PurchaseorderItem.objects.get(row_id = data['id'])
                )
                newItem.save()
                quantity = 0
                try:
                    inventories = ProductInventory.objects.filter(
                        product = Product.objects.get(pk=data['product']),
                        size= Size.objects.get(pk=data['size']),
                        color = Color.objects.get(pk=data['color']),
                        state = True
                    )
                    
                    if(inventories):
                        quantity = inventories.last().quantity
                        for inven  in inventories:
                            inven.state = False
                            inven.save()
                except Exception as e:
                    False
                newInventory = ProductInventory(
                    product = Product.objects.get(pk=data['product']),
                    size= Size.objects.get(pk=data['size']),
                    color = Color.objects.get(pk=data['color']),
                    in_quantity = data['quantity'],
                    unit = data['unit'],
                    quantity = quantity + data['quantity'],
                    purchaseItem = newItem,
                    state = True
                )
                newInventory.save()
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
            deleteItem = PurchaseItem.objects.get(row_id = request.data['row_id'])
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