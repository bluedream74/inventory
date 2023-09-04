from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import OrderSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem
from product_inventory.models import ProductInventory
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from datetime import datetime
from size_register.models import Size
from color_register.models import Color
from product_register.models import Product
from django.http import HttpResponse
@permission_classes([AllowAny])
class OrderView(APIView):
    
    def get(self, request):
        orders = Order.objects.all().order_by('id')
        serializer = OrderSerializer(orders,  many=True)
        return Response({'orders': serializer.data}, status=status.HTTP_200_OK)
    def post(self, request):
        data = request.data
        newOrder = Order(
            no= data['No'],
            slip_date= datetime.fromisoformat(data['slipDate']).strftime("%Y-%m-%d"),
            delivery_date=  datetime.fromisoformat(data['deliveryDate']).strftime("%Y-%m-%d"),
            shopping_date=  datetime.fromisoformat(data['shoppingDate']).strftime("%Y-%m-%d"),
            delivery_place_code= data['deliveryPlaceCode'],
            storehouse_code= data['storehouseCode'],
            global_rate= data['globalRate'],
            charger_code= data['chargerCode'],
            receiver_code= data['receiverCode'],
            exhibition_code= data['exhibitionCode'],
            dealer_code = data['dealerCode'],
            status= data['status']
        )
        newOrder.save()
        if (newOrder.no == '新規登録'):
            newOrder.no = str(newOrder.pk).zfill(6)
            newOrder.save()
        status_code = status.HTTP_200_OK
        response = {

            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    def put(self, request, order_id):
        data = request.data
        editSlip = Order.objects.get(pk=order_id)
        print(data)
        editSlip.slip_date= datetime.fromisoformat(data['slipDate']).strftime("%Y-%m-%d")
        editSlip.delivery_date=  datetime.fromisoformat(data['deliveryDate']).strftime("%Y-%m-%d")
        editSlip.shopping_date=  datetime.fromisoformat(data['shoppingDate']).strftime("%Y-%m-%d")
        editSlip.delivery_place_code= data['deliveryPlaceCode']
        editSlip.storehouse_code= data['storehouseCode']
        editSlip.global_rate= data['globalRate']
        editSlip.charger_code= data['chargerCode']
        editSlip.receiver_code= data['receiverCode']
        editSlip.exhibition_code= data['exhibitionCode']
        editSlip.dealer_code = data['dealerCode']
        editSlip.status= data['status']
        editSlip.save()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    def delete(self, request, order_id):
        Order.objects.get(pk=order_id).delete()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    @api_view(['POST'])
    @permission_classes([AllowAny]) 
    def save_row(request, order_id):
        data = request.data
        if(OrderItem.objects.filter(row_id = data['id'])):
            row = OrderItem.objects.get(row_id = data['id'])
            row.order = Order.objects.get(pk=order_id)
            row.product = Product.objects.get(pk=data['product'])
            row.size = Size.objects.get(pk=data['size'])
            row.color = Color.objects.get(pk=data['color'])
            row.quantity = data['quantity']
            row.unit = data['unit']
            row.rate = data['rate']
            row.cost = data['cost']
            row.price = data['price']
            row.profit = data['profit']
            row.save()
            
        else:    
            newOrderItem = OrderItem (
                row_id = data['id'],
                order = Order.objects.get(pk=order_id),
                product = Product.objects.get(pk=data['product']),
                size = Size.objects.get(pk=data['size']),
                color = Color.objects.get(pk=data['color']),
                quantity = data['quantity'],
                unit = data['unit'],
                rate = data['rate'],
                cost = data['cost'],
                price = data['price'],
                profit = data['profit']
            )
            newOrderItem.save()
                
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
            deleteItem = OrderItem.objects.get(row_id = request.data['row_id'])
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