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
    def save_rows(request, slip_id):
        datas = request.data
        print(datas)
        for  data in datas:
            if(PurchaseItem.objects.filter(row_id = data['id'])):
                row = PurchaseItem.objects.get(row_id = data['id'])
                row.purchase = Purchase.objects.get(pk=slip_id)
                row.product_code = data['product_code']
                row.product_name = data['product_name']
                row.product_part_number = data['product_part_number']
                row.size_code = data['size_code']
                row.color_code = data['color_code']
                row.quantity = data['quantity']
                row.unit = data['unit']
                row.max_cost = data['max_cost']
                row.max_price = data['max_price']
                row.min_cost = data['min_cost']
                row.min_price = data['min_price']
                row.other = data['other']
                row.save()
            else:    
                newItem = PurchaseItem (
                    row_id = data['id'],
                    purchase = Purchase.objects.get(pk=slip_id),
                    product_code = data['product_code'],
                    product_name = data['product_name'],
                    product_part_number = data['product_part_number'],
                    size_code = data['size_code'],
                    color_code = data['color_code'],
                    quantity = data['quantity'],
                    unit = data['unit'],
                    max_cost = data['max_cost'],
                    max_price = data['max_price'],
                    min_cost = data['min_cost'],
                    min_price = data['min_price'],
                    other = data['other']
                )
                newItem.save()
        #Delete
        slipItems = PurchaseItem.objects.filter(purchase = Purchase.objects.get(pk=slip_id))
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