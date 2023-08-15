from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from .serializers import SizeSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Size
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
# Create your views here.

@permission_classes([AllowAny])
class SizeView(APIView):
    
    def get(self, request):
        sizes = Size.objects.all().order_by('id')
        serializer = SizeSerializer(sizes,  many=True)
        return Response({'sizes': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data)
        newSize = Size(
            code = request.data['code'],
            name = request.data['name']
        )
        newSize.save()

        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    
    def delete(self, request, id):
        print(id)
        delSize = Size.objects.get( id=id )
        delSize.delete()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    def put(self, request, id):
        print(id)
        editSize = Size.objects.get(id=id)
        editSize.code = request.data['code']
        editSize.name = request.data['name']
        editSize.save()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'Product edited successfully',
        }
        return Response(response, status=status_code)
    