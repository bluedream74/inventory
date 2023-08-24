from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import ConsignmentSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Consignment, ConsignmentItem
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from datetime import datetime

@permission_classes([AllowAny])
class ConsignmentView(APIView):
    
    def get(self, request):
        consignments = Consignment.objects.all().order_by('id')
        serializer = ConsignmentSerializer(consignments,  many=True)
        return Response({'consignments': serializer.data}, status=status.HTTP_200_OK)
    def post(self, request):
        data = request.data
        print(data)
        newSlip = Consignment(
            no= data['no'],
            slip_date= str(data['slip_date']),
            entrust_code= data['entrust_code'],
            storehouse_code= data['storehouse_code'],
            global_rate= int(data['global_rate']),
            charger_code= data['charger_code'],
            exhibition_code= data['exhibition_code'],
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
        editSlip = Consignment.objects.get(pk=slip_id)
        editSlip.slip_date= str(data['slip_date'])
        editSlip.entrust_code= data['entrust_code']
        editSlip.storehouse_code= data['storehouse_code']
        editSlip.global_rate= int(data['global_rate'])
        editSlip.charger_code= data['charger_code']
        editSlip.exhibition_code= data['exhibition_code']
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
        Consignment.objects.get(pk=slip_id).delete()
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
            if(ConsignmentItem.objects.filter(row_id = data['id'])):
                row = ConsignmentItem.objects.get(row_id = data['id'])
                row.consignment = Consignment.objects.get(pk=slip_id)
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
            else:    
                newItem = ConsignmentItem (
                    row_id = data['id'],
                    consignment = Consignment.objects.get(pk=slip_id),
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
        #Delete
        slipItems = ConsignmentItem.objects.filter(consignment = Consignment.objects.get(pk=slip_id))
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