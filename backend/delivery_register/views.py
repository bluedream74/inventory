from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from .serializers import DeliverySerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Delivery
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
# Create your views here.

@permission_classes([AllowAny])
class DeliverytView(APIView):
    
    def get(self, request):
        deliveries = Delivery.objects.all().order_by('id')
        serializer = DeliverySerializer(deliveries,  many=True)
        return Response({'deliveries': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data)
        newDelivery = Delivery(
            code = request.data['code'],
            name = request.data['name']
        )
        newDelivery.save()

        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    
    def delete(self, request, id):
        print(id)
        delDelivery = Delivery.objects.get( id=id )
        delDelivery.delete()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    def put(self, request, id):
        print(id)
        editDelivery = Delivery.objects.get(id=id)
        editDelivery.code = request.data['code']
        editDelivery.name = request.data['name']
        editDelivery.save()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'Product edited successfully',
        }
        return Response(response, status=status_code)
    