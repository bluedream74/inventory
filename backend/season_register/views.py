from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from .serializers import SeasonSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Season
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
# Create your views here.

@permission_classes([AllowAny])
class SeasonView(APIView):
    
    def get(self, request):
        seasons = Season.objects.all().order_by('id')
        serializer = SeasonSerializer(seasons,  many=True)
        return Response({'seasons': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        newSeason = Season(
            code = request.data['code'],
            name = request.data['name']
        )
        newSeason.save()

        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    
    def delete(self, request, id):
        print(id)
        delSeason = Season.objects.get( id=id )
        delSeason.delete()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    def put(self, request, id):
        print(id)
        editSeason = Season.objects.get(id=id)
        editSeason.code = request.data['code']
        editSeason.name = request.data['name']
        editSeason.save()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'Product edited successfully',
        }
        return Response(response, status=status_code)
    