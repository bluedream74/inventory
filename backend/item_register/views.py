from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from .serializers import ItemSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Item
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
# Create your views here.

@permission_classes([AllowAny])
class ItemView(APIView):
    
    def get(self, request):
        items = Item.objects.all().order_by('id')
        serializer = ItemSerializer(items,  many=True)
        return Response({'items': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data)
        newItem = Item(
            code = request.data['code'],
            name = request.data['name']
        )
        newItem.save()

        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    
    def delete(self, request, id):
        print(id)
        delItem = Item.objects.get( id=id )
        delItem.delete()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    def put(self, request, id):
        print(id)
        editItem = Item.objects.get(id=id)
        editItem.code = request.data['code']
        editItem.name = request.data['name']
        editItem.save()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'Product edited successfully',
        }
        return Response(response, status=status_code)
