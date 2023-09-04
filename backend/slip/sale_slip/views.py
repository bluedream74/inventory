from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import SaleSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Sale, SaleItem
from slip.order_slip.models import OrderItem, Order
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from datetime import datetime
from product_inventory.models import ProductInventory
from size_register.models import Size
from color_register.models import Color
from product_register.models import Product
from django.http import HttpResponse

@permission_classes([AllowAny])
class SaleView(APIView):
    
    def get(self, request):
        sales = Sale.objects.all().order_by('id')
        serializer = SaleSerializer(sales,  many=True)
        return Response({'sales': serializer.data}, status=status.HTTP_200_OK)
    def post(self, request):
        data = request.data
        print(data)
        newSlip = Sale(
            no= data['no'],
            spenden_no= str(data['spenden_no']),
            slip_date= str(data['slip_date']),
            expected_shipping_date= str(data['expected_shipping_date']),
            arrival_date= str(data['arrival_date']),
            invoice_date= str(data['invoice_date']),
            shipping_date= str(data['shipping_date']),
            cash_credit= data['cash_credit'],
            delivery_code= data['delivery_code'],
            storehouse_code= data['storehouse_code'],
            global_rate= int(data['global_rate']),
            charger_code= data['charger_code'],
            maker_code= data['maker_code'],
            exhibition_code= data['exhibition_code'],
            dealer_code= data['dealer_code'],
            status= data['status'],
            other= data['other'],
            order = Order.objects.get(pk = data['order'])
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
        editSlip = Sale.objects.get(pk=slip_id)
        editSlip.spenden_no = data['spenden_no']
        editSlip.slip_date= str(data['slip_date'])
        editSlip.expected_shipping_date= str(data['expected_shipping_date'])
        editSlip.arrival_date= str(data['arrival_date'])
        editSlip.invoice_date= str(data['invoice_date'])
        editSlip.shipping_date= str(data['shipping_date'])
        editSlip.cash_credit = data['cash_credit']
        editSlip.delivery_code= data['delivery_code']
        editSlip.storehouse_code= data['storehouse_code']
        editSlip.global_rate= int(data['global_rate'])
        editSlip.charger_code= data['charger_code']
        editSlip.maker_code = data['maker_code']
        editSlip.exhibition_code= data['exhibition_code']
        editSlip.dealer_code = data['dealer_code']
        editSlip.status= data['status']
        editSlip.other= data['other']
        editSlip.order = Order.objects.get(pk = data['order'])
        editSlip.save()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    def delete(self, request, slip_id):
        Sale.objects.get(pk=slip_id).delete()
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
        if(SaleItem.objects.filter(row_id = data['id'])):
            row = SaleItem.objects.get(row_id = data['id'])
            row.product = Product.objects.get(pk=data['product'])
            row.size = Size.objects.get(pk=data['size'])
            row.color = Color.objects.get(pk=data['color'])
            row.quantity = data['quantity']
            row.unit = data['unit']
            row.rate = data['rate']
            row.cost = data['cost']
            row.price = data['price']
            row.save()
            try: 
                editInventory  = ProductInventory.objects.filter(saleItem = row, state = True).last()
                print(editInventory)
                old_out_quantity = editInventory.out_quantity
                old_quantity = editInventory.quantity
                editInventory.out_quantity = data['quantity']
                editInventory.quantity = old_quantity + old_out_quantity -  data['quantity']   
                editInventory.save()
            except Exception as e:
                False
        else:    
            newItem = SaleItem (
                row_id = data['id'],
                sale = Sale.objects.get(pk=slip_id),
                orderItem = OrderItem.objects.get(row_id = data['id']),
                product = Product.objects.get(pk=data['product']),
                size= Size.objects.get(pk=data['size']),
                color = Color.objects.get(pk=data['color']),
                quantity = data['quantity'],
                unit = data['unit'],
                rate = data['rate'],
                cost = data['cost'],
                price = data['price'],
            )
            newItem.save()
            print(data)
            quantity = 0
            try:
                inventories = ProductInventory.objects.filter(
                    product = Product.objects.get(pk=data['product']),
                    size= Size.objects.get(pk=data['size']),
                    color = Color.objects.get(pk=data['color']),
                    state = True
                )
                if(inventories):
                    print(inventories)
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
                out_quantity = data['quantity'],
                unit = data['unit'],
                quantity = quantity - data['quantity'],
                saleItem = newItem,
                state = True
            )
            newInventory.save()
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
            deleteItem = SaleItem.objects.get(row_id = request.data['row_id'])
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