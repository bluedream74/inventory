from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from .serializers import ChargerSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Charger
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
# Create your views here.

@permission_classes([AllowAny])
class ChargerView(APIView):
    
    def get(self, request):
        chargers = Charger.objects.all().order_by('id')
        serializer = ChargerSerializer(chargers,  many=True)
        return Response({'chargers': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data)
        newCharger = Charger(
            code = request.data['code'],
            name = request.data['name'],
            phone = request.data['phone'],
            address = request.data['address']
        )
        newCharger.save()

        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    
    def delete(self, request, id):
        print(id)
        delCharger = Charger.objects.get( id=id )
        delCharger.delete()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    def put(self, request, id):
        print(id)
        editCharger = Charger.objects.get(id=id)
        editCharger.code = request.data['code']
        editCharger.name = request.data['name']
        editCharger.phone = request.data['phone']
        editCharger.address = request.data['address']
        editCharger.save()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'Product edited successfully',
        }
        return Response(response, status=status_code)
