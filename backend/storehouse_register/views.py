from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from .serializers import StorehouseSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Storehouse
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
# Create your views here.

@permission_classes([AllowAny])
class StorehouseView(APIView):
    
    def get(self, request):
        storehouses = Storehouse.objects.all().order_by('id')
        serializer = StorehouseSerializer(storehouses,  many=True)
        return Response({'storehouses': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data)
        newStorehouse = Storehouse(
            code = request.data['code'],
            name = request.data['name'],
            phone = request.data['phone'],
            address = request.data['address']
        )
        newStorehouse.save()

        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    
    def delete(self, request, id):
        print(id)
        delStorehouse = Storehouse.objects.get( id=id )
        delStorehouse.delete()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    def put(self, request, id):
        print(id)
        editStorehouse = Storehouse.objects.get(id=id)
        editStorehouse.code = request.data['code']
        editStorehouse.name = request.data['name']
        editStorehouse.phone = request.data['phone']
        editStorehouse.address = request.data['address']
        editStorehouse.save()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'Product edited successfully',
        }
        return Response(response, status=status_code)
