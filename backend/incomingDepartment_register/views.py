from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from .serializers import IncomingDepartmentSerializer
from rest_framework.response import Response
from rest_framework import status
from .models import incomingDepartment
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny

@permission_classes([AllowAny])
class IncomingDepartmentView(APIView):

    def get(self, request):
        incomingDepartments = incomingDepartment.objects.all().order_by('id')
        serializer = IncomingDepartmentSerializer(incomingDepartments, many=True)
        return Response({'incomingDepartments' : serializer.data}, status=status.HTTP_200_OK)
    
    def post(self, request):
        print(request.data)
        newIncomingDepartment = incomingDepartment(
            code = request.data['code'],
            name = request.data['name'],
            phone = request.data['phone'],
            address = request.data['address'],
            due_date = request.data['due_date']
        )
        newIncomingDepartment.save()

        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered successfully',
        }
        return Response(response, status=status_code)
    
    def delete(self, request, id):
        print(id)
        delIncomingDepartment = incomingDepartment.objects.get( id=id )
        delIncomingDepartment.delete()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered successfully'
        }
        return Response(response, status=status_code)
    def put(self, request, id):
        print(id)
        editIncomingDepartment = incomingDepartment.objects.get(id=id)
        editIncomingDepartment.code = request.data['code']
        editIncomingDepartment.name = request.data['name']
        editIncomingDepartment.phone = request.data['phone']
        editIncomingDepartment.address = request.data['address']
        editIncomingDepartment.due_date = request.data['due_date']
        editIncomingDepartment.save()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'Product edited successfully'
        }
        return Response(response, status=status_code)
