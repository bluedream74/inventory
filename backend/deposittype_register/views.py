from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from .serializers import DeposittypeSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import Deposittype
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny

@permission_classes([AllowAny])
class DeposittypeView(APIView):

    def get(self, request):
        print(request.data)
        deposittypes = Deposittype.objects.all().order_by('id')
        serializer = DeposittypeSerializer(deposittypes, many=True)
        return Response({'deposittypes': serializer.data}, status= status.HTTP_200_OK)
    
    def post(self, request):
        print(request.data)
        newDeposittype = Deposittype(
            code = request.data['code'],
            name = request.data['name']
        )
        newDeposittype.save()

        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered successfully'
        }
        return Response(response, status=status_code)
    def delete(self, request, id):
        print(id)
        delDeposittype = Deposittype.objects.get( id=id )
        delDeposittype.delete()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered successfully'
        }
        return Response(response, status=status_code)
    def put(self, request, id):
        print(id)
        editDeposittype = Deposittype.objects.get( id=id)
        editDeposittype.code = request.data['code']
        editDeposittype.name = request.data['name']
        editDeposittype.save()
        status_code= status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'Product edited successfully',
        }
        return Response(response, status=status_code)
