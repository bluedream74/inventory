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
    def save_rows(request, order_id):
        datas = request.data
        for  data in datas:
            if(OrderItem.objects.filter(row_id = data['id'])):
                row = OrderItem.objects.get(row_id = data['id'])
                row.order = Order.objects.get(pk=order_id)
                row.product_code = data['product_code']
                row.product_name = data['product_name']
                row.product_part_number = data['product_part_number']
                row.size_code = data['size_code']
                row.color_code = data['color_code']
                row.quantity = data['quantity']
                row.unit = data['unit']
                row.rate = data['rate']
                row.max_cost = data['max_cost']
                row.max_price = data['max_price']
                row.min_cost = data['min_cost']
                row.min_price = data['min_price']
                row.cost = data['cost']
                row.price = data['price']
                row.profit = data['profit']
                row.save()
                inventoryData = ProductInventory.objects.filter(orderitem = row)
                for inventory in inventoryData:
                    inventory.product_code = data['product_code']
                    inventory.product_name = data['product_name']
                    inventory.product_part_number = data['product_part_number']
                    inventory.size_code = data['size_code']
                    inventory.color_code = data['color_code']
                    inventory.unit = data['unit']
                    inventory.rate = data['rate']
                    inventory.max_cost = data['max_cost']
                    inventory.max_price = data['max_price']
                    inventory.min_cost = data['min_cost']
                    inventory.min_price = data['min_price']
                    inventory.cost = data['cost']
                    inventory.price = data['price']
                    inventory.storehouse_code = row.order.storehouse_code
                    inventory.dealer_code = row.order.dealer_code
                    inventory.global_rate = row.order.global_rate

                    inventory.order_date = row.date_created
                    inventory.order_quantity = data['quantity']
                    inventory.save()
            else:    
                newOrderItem = OrderItem (
                    row_id = data['id'],
                    order = Order.objects.get(pk=order_id),
                    product_code = data['product_code'],
                    product_name = data['product_name'],
                    product_part_number = data['product_part_number'],
                    size_code = data['size_code'],
                    color_code = data['color_code'],
                    quantity = data['quantity'],
                    unit = data['unit'],
                    rate = data['rate'],
                    max_cost = data['max_cost'],
                    max_price = data['max_price'],
                    min_cost = data['min_cost'],
                    min_price = data['min_price'],
                    cost = data['cost'],
                    price = data['price'],
                    profit = data['profit']
                )
                newOrderItem.save()
                newProductInventory = ProductInventory(
                    product_code = data['product_code'],
                    product_name = data['product_name'],
                    product_part_number = data['product_part_number'],
                    size_code = data['size_code'],
                    color_code = data['color_code'],
                    unit = data['unit'],
                    rate = data['rate'],
                    max_cost = data['max_cost'],
                    max_price = data['max_price'],
                    min_cost = data['min_cost'],
                    min_price = data['min_price'],
                    cost = data['cost'],
                    price = data['price'],
                    storehouse_code = newOrderItem.order.storehouse_code,
                    dealer_code = newOrderItem.order.dealer_code,
                    global_rate = newOrderItem.order.global_rate,

                    order_date = newOrderItem.date_created,
                    order_quantity = data['quantity'],
                    orderitem = newOrderItem
                )
                newProductInventory.save()
        #Delete
        orderItems = OrderItem.objects.filter(order = Order.objects.get(pk=order_id))
        if(len(datas) != len(orderItems)):
            for item in orderItems:
                if any(d['id'] == item.row_id for d in datas):
                    True
                else:
                    item.delete()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)