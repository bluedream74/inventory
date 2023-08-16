from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from .serializers import ColorSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Color
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
# Create your views here.

@permission_classes([AllowAny])
class ColorView(APIView):
    
    def get(self, request):
        colors = Color.objects.all().order_by('id')
        serializer = ColorSerializer(colors,  many=True)
        return Response({'colors': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data)
        newColor = Color(
            code = request.data['code'],
            name = request.data['name']
        )
        newColor.save()

        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    
    def delete(self, request, id):
        print(id)
        delColor = Color.objects.get( id=id )
        delColor.delete()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    def put(self, request, id):
        print(id)
        editColor = Color.objects.get(id=id)
        editColor.code = request.data['code']
        editColor.name = request.data['name']
        editColor.save()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'Product edited successfully',
        }
        return Response(response, status=status_code)
