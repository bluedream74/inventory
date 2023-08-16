from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from .serializers import DealerSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Dealer
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
# Create your views here.

@permission_classes([AllowAny])
class DealerView(APIView):
    
    def get(self, request):
        dealers = Dealer.objects.all().order_by('id')
        serializer = DealerSerializer(dealers,  many=True)
        return Response({'dealers': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data['due_date'][0:10])
        newDealer = Dealer(
            code = request.data['code'],
            name = request.data['name'],
            due_date = request.data['due_date'][0:10],
            phone = request.data['phone'],
            address = request.data['address']
        )
        newDealer.save()

        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    
    def delete(self, request, id):
        print(id)
        delDealer = Dealer.objects.get( id=id )
        delDealer.delete()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    def put(self, request, id):
        print(id)
        editDealer = Dealer.objects.get(id=id)
        editDealer.code = request.data['code']
        editDealer.name = request.data['name']
        editDealer.due_date = request.data['due_date'][0:10]
        editDealer.phone = request.data['phone']
        editDealer.address = request.data['address']
        editDealer.save()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'Product edited successfully',
        }
        return Response(response, status=status_code)
