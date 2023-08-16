from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from .serializers import BrandSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Brand
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
# Create your views here.

@permission_classes([AllowAny])
class BrandView(APIView):
    
    def get(self, request):
        brands = Brand.objects.all().order_by('id')
        serializer = BrandSerializer(brands,  many=True)
        return Response({'brands': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data)
        newBrand = Brand(
            code = request.data['code'],
            name = request.data['name'],
            name_export = request.data['name_export']
        )
        newBrand.save()

        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    
    def delete(self, request, id):
        print(id)
        delBrand = Brand.objects.get( id=id )
        delBrand.delete()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    def put(self, request, id):
        print(id)
        editBrand = Brand.objects.get(id=id)
        editBrand.code = request.data['code']
        editBrand.name = request.data['name']
        editBrand.name_export = request.data['name_export']
        editBrand.save()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'Product edited successfully',
        }
        return Response(response, status=status_code)
    