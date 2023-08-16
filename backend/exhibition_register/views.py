from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from .serializers import ExhibitionSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Exhibition
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
# Create your views here.

@permission_classes([AllowAny])
class ExhibitionView(APIView):
    
    def get(self, request):
        exhibitions = Exhibition.objects.all().order_by('id')
        serializer = ExhibitionSerializer(exhibitions,  many=True)
        return Response({'exhibitions': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data)
        newExhibition = Exhibition(
            code = request.data['code'],
            name = request.data['name']
        )
        newExhibition.save()

        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    
    def delete(self, request, id):
        print(id)
        delExhibition = Exhibition.objects.get( id=id )
        delExhibition.delete()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    def put(self, request, id):
        print(id)
        editExhibition = Exhibition.objects.get(id=id)
        editExhibition.code = request.data['code']
        editExhibition.name = request.data['name']
        editExhibition.save()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'Product edited successfully',
        }
        return Response(response, status=status_code)
