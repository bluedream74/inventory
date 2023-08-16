from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from .serializers import MaterialSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Material
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
# Create your views here.

@permission_classes([AllowAny])
class MaterialtView(APIView):
    
    def get(self, request):
        materials = Material.objects.all().order_by('id')
        serializer = MaterialSerializer(materials,  many=True)
        return Response({'materials': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data)
        newMaterial = Material(
            code = request.data['code'],
            name = request.data['name']
        )
        newMaterial.save()

        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    
    def delete(self, request, id):
        print(id)
        delMaterial = Material.objects.get( id=id )
        delMaterial.delete()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    def put(self, request, id):
        print(id)
        editMaterial = Material.objects.get(id=id)
        editMaterial.code = request.data['code']
        editMaterial.name = request.data['name']
        editMaterial.save()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'Product edited successfully',
        }
        return Response(response, status=status_code)
    