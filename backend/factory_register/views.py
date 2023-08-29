from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from .serializers import FactorySerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Factory
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
# Create your views here.

@permission_classes([AllowAny])
class FactorytView(APIView):
    
    def get(self, request):
        factories = Factory.objects.all().order_by('id')
        serializer = FactorySerializer(factories,  many=True)
        return Response({'factories': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data)
        newFactory = Factory(
            code = request.data['code'],
            name = request.data['name'],
            tel = request.data['tel'],
            phone = request.data['phone']
        )
        newFactory.save()

        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    
    def delete(self, request, id):
        print(id)
        delFactory = Factory.objects.get( id=id )
        delFactory.delete()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    def put(self, request, id):
        print(id)
        editFactory = Factory.objects.get(id=id)
        editFactory.code = request.data['code']
        editFactory.name = request.data['name']
        editFactory.tel = request.data['tel']
        editFactory.phone = request.data['phone']
        editFactory.save()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'Product edited successfully',
        }
        return Response(response, status=status_code)
    