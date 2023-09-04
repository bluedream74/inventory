from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import DepositSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Deposit, DepositItem
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from datetime import datetime
from slip.sale_slip.models import SaleItem
from product_inventory.models import ProductInventory
from slip.sale_slip.models import Sale, SaleItem
from django.http import HttpResponse

@permission_classes([AllowAny])
class DepositView(APIView):
    
    def get(self, request):
        deposits = Deposit.objects.all().order_by('id')
        serializer = DepositSerializer(deposits,  many=True)
        return Response({'deposits': serializer.data}, status=status.HTTP_200_OK)
    def post(self, request):
        data = request.data
        print(data)
        newSlip = Deposit(
            no= data['no'],
            slip_date= str(data['slip_date']),
            dealer_code= data['dealer_code'],
            last_invoice_date= data['last_invoice_date'],
            last_invoice= data['last_invoice'],
            expected_date= data['expected_date'],
            remain_invoice= data['remain_invoice'],
            sale = Sale.objects.get(pk=data['sale']),
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
        editSlip = Deposit.objects.get(pk=slip_id)
        editSlip.slip_date= str(data['slip_date'])
        editSlip.dealer_code= data['dealer_code']
        editSlip.last_invoice_date= data['last_invoice_date']
        editSlip.last_invoice= data['last_invoice']
        editSlip.expected_date= data['expected_date']
        editSlip.remain_invoice= data['remain_invoice']
        editSlip.sale= Sale.objects.get(pk=data['sale'])
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
        Deposit.objects.get(pk=slip_id).delete()
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
        print(data)
        if(DepositItem.objects.filter(row_id = data['id'])):
                row = DepositItem.objects.get(row_id = data['id'])
                row.deposit_price = data['deposit_price']
                row.deposit_date = datetime.fromisoformat(data['deposit_date']).strftime("%Y-%m-%d")
                row.other = data['other']
                row.save()
        else:    
            newItem = DepositItem (
                row_id = data['id'],
                deposit = Deposit.objects.get(pk=slip_id),
                saleItem = SaleItem.objects.get(row_id = data['id']),
                deposit_price = data['deposit_price'],
                deposit_date = datetime.fromisoformat(data['deposit_date']).strftime("%Y-%m-%d"),
                other = data['other']
            )
            newItem.save()
            
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
            deleteItem = DepositItem.objects.get(row_id = request.data['row_id'])
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