from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import ProductSerializer
from .models import Product
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from rest_framework.response import Response
from rest_framework import status
from .models import Product
import os
import datetime
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
# Create your views here.

@permission_classes([AllowAny])
class ProductView(APIView):
    
    def get(self, request):
        products = Product.objects.all().order_by('id')
        serializer = ProductSerializer(products,  many=True)
        return Response({'products': serializer.data}, status=status.HTTP_200_OK)

    def post(self, request):
        print(request.data)
        image = request.FILES.get('image_url')
        # image_url = ''
        # if (image) :
        #     timestamp = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
        #     filename = f"{timestamp}_{image.name}"
        #     fs = FileSystemStorage(location=settings.PRODUCT_ROOT)
        #     fs.save(filename, image)
        #     image_url = settings.PRODUCT_URL+(filename)
        newProduct = Product(
            image_url = image,
            image_mode = request.data['image_mode'],
            code = request.data['code'],
            part_number = request.data['part_number'],
            name = request.data['name'],
            ancient_time = request.data['ancient_time'],
            price = request.data['price']
        )
        newProduct.save()

        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    
    def delete(self, request, id):
        print(id)
        delProduct = Product.objects.get( id=id )
        delProduct.delete()
        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'User registered  successfully',
        }
        return Response(response, status=status_code)
    def put(self, request, id):
        print(id)
        edit_product = Product.objects.get(id=id)
        edit_product.image_url = request.FILES.get('image_url')
        edit_product.image_mode = request.data['image_mode']
        edit_product.code = request.data['code']
        edit_product.part_number = request.data['part_number']
        edit_product.name = request.data['name']
        edit_product.ancient_time = request.data['ancient_time']
        edit_product.price = request.data['price']

        edit_product.save()

        status_code = status.HTTP_200_OK
        response = {
            'success': 'True',
            'status code': status_code,
            'type': 'Product edited successfully',
        }
        return Response(response, status=status_code)
