from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from .serializers import EntrustSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Entrust
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
# Create your views here.

@permission_classes([AllowAny])
class EntrustView(APIView):
    
    def get(self, request):
        entrusts = Entrust.objects.all().order_by('id')
        serializer = EntrustSerializer(entrusts,  many=True)
        return Response({'entrusts': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data)
        newEntrust = Entrust(
            code = request.data['code'],
            name = request.data['name'],
            phone = request.data['phone'],
            address = request.data['address']
        )
        newEntrust.save()

        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    
    def delete(self, request, id):
        print(id)
        delEntrust = Entrust.objects.get( id=id )
        delEntrust.delete()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    def put(self, request, id):
        print(id)
        editEntrust = Entrust.objects.get(id=id)
        editEntrust.code = request.data['code']
        editEntrust.name = request.data['name']
        editEntrust.phone = request.data['phone']
        editEntrust.address = request.data['address']
        editEntrust.save()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'Product edited successfully',
        }
        return Response(response, status=status_code)
