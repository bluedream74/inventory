from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets
from .models import Product, Size, Color, Season, Brand, Item, Material, Delivery, Charger, Exhibition, \
Dealer, IncomingDepartment, OriginCountry, Storehouse, Customer, Deposittype
from .serializers import ProductSerializer, ColorSerializer, SizeSerializer, SeasonSerializer, \
BrandSerializer, ItemSerializer, MaterialSerializer, DeliverySerializer, ChargerSerializer, \
ExhibitionSerializer, DealerSerializer, IncomingDepartmentSerializer, OriginCountrySerializer, \
StorehouseSerializer, CustomerSerializer, DeposittypeSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import get_object_or_404

# Create your views here.
# class Product
class ColorView(APIView):
    permission_classes = (AllowAny, )

    def get(self, request):
        colors = Color.objects.all()
        serializer = ColorSerializer(colors, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ColorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status': 'success',
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'status': 'error',
                'data': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

class ColorItemView(APIView):
    permission_classes = (AllowAny, )
    
    def get(self, request, id):
        instance = get_object_or_404(Color, id=id)
        serializer = ColorSerializer(instance)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, id):
        instance = get_object_or_404(Color, id=id)
        serializer = ColorSerializer(instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status': 'success',
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                'status': 'success',
                'data': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, id):
        instance = get_object_or_404(Color, id=id)
        instance.delete()
        return Response({
            'status': 'success',
            'data': 'Color Deleted'
        }, status=status.HTTP_200_OK)
    
class ProductView(viewsets.ModelViewSet):
    permission_classes = (AllowAny, )
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

class SizeView(viewsets.ModelViewSet):
    permission_classes = (AllowAny, )
    serializer_class = SizeSerializer
    queryset = Size.objects.all()

class SeasonView(viewsets.ModelViewSet):
    permission_classes = (AllowAny, )
    serializer_class = SeasonSerializer
    queryset = Season.objects.all()

class BrandView(viewsets.ModelViewSet):
    permission_classes = (AllowAny, )
    serializer_class = BrandSerializer
    queryset = Brand.objects.all()

class ItemView(viewsets.ModelViewSet):
    permission_classes = (AllowAny, )
    serializer_class = ItemSerializer
    queryset = Item.objects.all()

class MaterialView(viewsets.ModelViewSet):
    permission_classes = (AllowAny, )
    serializer_class = MaterialSerializer
    queryset = Material.objects.all()

class DeliveryView(viewsets.ModelViewSet):
    permission_classes = (AllowAny, )
    serializer_class = DeliverySerializer
    queryset = Delivery.objects.all()

class ChargerView(viewsets.ModelViewSet):
    permission_classes = (AllowAny, )
    serializer_class = ChargerSerializer
    queryset = Charger.objects.all()

class ExhibitionView(viewsets.ModelViewSet):
    permission_classes = (AllowAny, )
    serializer_class = ExhibitionSerializer
    queryset = Exhibition.objects.all()

class DealerView(viewsets.ModelViewSet):
    permission_classes = (AllowAny, )
    serializer_class = DealerSerializer
    queryset = Dealer.objects.all()

class IncomingDepartmentView(viewsets.ModelViewSet):
    permission_classes = (AllowAny, )
    serializer_class = IncomingDepartmentSerializer
    queryset = IncomingDepartment.objects.all()

class OriginCountryView(viewsets.ModelViewSet):
    permission_classes = (AllowAny, )
    serializer_class = OriginCountrySerializer
    queryset = OriginCountry.objects.all()

class StorehouseView(viewsets.ModelViewSet):
    permission_classes = (AllowAny, )
    serializer_class = StorehouseSerializer
    queryset = Storehouse.objects.all()

class CustomerView(viewsets.ModelViewSet):
    permission_classes = (AllowAny, )
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()

class DeposittypeView(viewsets.ModelViewSet):
    permission_classes = (AllowAny, )
    serializer_class = DeposittypeSerializer
    queryset = Deposittype.objects.all()