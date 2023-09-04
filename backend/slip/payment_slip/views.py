from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import PaymentSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Payment, PaymentItem
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view
from datetime import datetime
from slip.purchase_slip.models import PurchaseItem, Purchase
from product_inventory.models import ProductInventory
from django.http  import HttpResponse

@permission_classes([AllowAny])
class PaymentView(APIView):
    
    def get(self, request):
        payments = Payment.objects.all().order_by('id')
        serializer = PaymentSerializer(payments,  many=True)
        return Response({'payments': serializer.data}, status=status.HTTP_200_OK)
    def post(self, request):
        data = request.data
        print(data)
        newSlip = Payment(
            no= data['no'],
            slip_date= str(data['slip_date']),
            supplier_code= data['supplier_code'],
            last_payment_date= data['last_payment_date'],
            last_payment= data['last_payment'],
            expected_date= data['expected_date'],
            remain_payment= data['remain_payment'],
            purchase= Purchase.objects.get(pk=data['purchase']),
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
        editSlip = Payment.objects.get(pk=slip_id)
        editSlip.slip_date= str(data['slip_date'])
        editSlip.supplier_code= data['supplier_code']
        editSlip.last_payment_date= data['last_payment_date']
        editSlip.last_payment= data['last_payment']
        editSlip.expected_date= data['expected_date']
        editSlip.remain_payment= data['remain_payment']
        editSlip.purchase= Purchase.objects.get(pk=data['purchase'])
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
        Payment.objects.get(pk=slip_id).delete()
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
        if(PaymentItem.objects.filter(row_id = data['id'])):
                row = PaymentItem.objects.get(row_id = data['id'])
                row.payment_price = data['payment_price']
                row.payment_date = datetime.fromisoformat(data['payment_date']).strftime("%Y-%m-%d")
                row.other = data['other']
                row.save()
        else:    
            newItem = PaymentItem (
                row_id = data['id'],
                payment = Payment.objects.get(pk=slip_id),
                purchaseItem = PurchaseItem.objects.get(row_id = data['id']),
                payment_price = data['payment_price'],
                payment_date = datetime.fromisoformat(data['payment_date']).strftime("%Y-%m-%d"),
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
            deleteItem = PaymentItem.objects.get(row_id = request.data['row_id'])
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