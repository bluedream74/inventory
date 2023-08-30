from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import SaleSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Sale, SaleItem
from slip.order_slip.models import OrderItem
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from datetime import datetime
from product_inventory.models import ProductInventory

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
            order_no = data['order_no']
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
        editSlip.order_no = data['order_no']
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
    def save_rows(request, slip_id):
        datas = request.data
        for  data in datas:
            if(SaleItem.objects.filter(row_id = data['id'])):
                row = SaleItem.objects.get(row_id = data['id'])
                row.sale = Sale.objects.get(pk=slip_id)
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
                row.save()
                productInventories = ProductInventory.objects.filter(saleitem=row)
                for productInventory in productInventories:
                    productInventory.sale_date = row.sale.slip_date
                    productInventory.sale_quantity = data['quantity']
                    productInventory.save()
            else:    
                newItem = SaleItem (
                    row_id = data['id'],
                    sale = Sale.objects.get(pk=slip_id),
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
                )
                newItem.save()
                orderItem = OrderItem.objects.get(row_id = data['id'])
                print(orderItem)
                newProductInventory = ProductInventory.objects.get(orderitem=orderItem)
                newProductInventory.sale_date = newItem.sale.slip_date
                newProductInventory.sale_quantity = data['quantity']
                newProductInventory.quantity = int(productInventory.quantity) - int(row.quantity)
                newProductInventory.saleitem = newItem
                newProductInventory.save()
        #Delete
        slipItems = SaleItem.objects.filter(sale = Sale.objects.get(pk=slip_id))
        if(len(datas) != len(slipItems)):
            for item in slipItems:
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