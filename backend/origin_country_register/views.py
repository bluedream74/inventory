from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from .serializers import OrigincountrySerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Origincountry
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
# Create your views here.

@permission_classes([AllowAny])
class OrigincountrytView(APIView):
    
    def get(self, request):
        origincountries = Origincountry.objects.all().order_by('id')
        serializer = OrigincountrySerializer(origincountries,  many=True)
        return Response({'origincountries': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data)
        newOrigincountry = Origincountry(
            code = request.data['code'],
            name = request.data['name']
        )
        newOrigincountry.save()

        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    
    def delete(self, request, id):
        print(id)
        delOrigincountry = Origincountry.objects.get( id=id )
        delOrigincountry.delete()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    def put(self, request, id):
        print(id)
        editOrigincountry = Origincountry.objects.get(id=id)
        editOrigincountry.code = request.data['code']
        editOrigincountry.name = request.data['name']
        editOrigincountry.save()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'Product edited successfully',
        }
        return Response(response, status=status_code)
    